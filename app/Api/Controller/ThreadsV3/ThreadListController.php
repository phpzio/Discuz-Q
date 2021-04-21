<?php
/**
 * Copyright (C) 2021 Tencent Cloud.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

namespace App\Api\Controller\ThreadsV3;

use App\Common\ResponseCode;
use App\Models\Category;
use App\Models\GroupUser;
use App\Models\Post;
use App\Models\Sequence;
use App\Models\Thread;
use App\Models\ThreadTag;
use App\Models\ThreadTom;
use App\Models\User;
use Carbon\Carbon;
use Discuz\Base\DzqController;

class ThreadListController extends DzqController
{

    use ThreadTrait;

    public function main()
    {
        $filter = $this->inPut('filter');
        $currentPage = $this->inPut('page');
        $perPage = $this->inPut('perPage');
        $sequence = $this->inPut('sequence');//默认首页
        if (empty($sequence)) {
            $threads = $this->getFilterThreads($filter, $currentPage, $perPage);
        } else {
            $threads = $this->getDefaultHomeThreads($filter, $currentPage, $perPage);
        }
        $threadList = $threads['pageData'] ?? [];
        !$threads && $threadList = [];
        $threads['pageData'] = $this->getFullThreadData($threadList);
        $this->outPut(0, '', $threads);
    }

    private function getFullThreadData($threadList)
    {
        $userIds = array_unique(array_column($threadList, 'user_id'));
        $groups = GroupUser::instance()->getGroupInfo($userIds);
        $groups = array_column($groups, null, 'user_id');
        $users = User::instance()->getUsers($userIds);
        $users = array_column($users, null, 'id');
        $threadIds = array_column($threadList, 'id');
        $posts = Post::instance()->getPosts($threadIds);
        $postsByThreadId = array_column($posts, null, 'thread_id');
        $toms = ThreadTom::query()->whereIn('thread_id', $threadIds)->where('status', ThreadTom::STATUS_ACTIVE)->get();
        $inPutToms = [];
        $tags = [];
        ThreadTag::query()->whereIn('thread_id', $threadIds)->get()->each(function ($item) use (&$tags) {
            $tags[$item['thread_id']][] = $item->toArray();
        });
        foreach ($toms as $tom) {
            $inPutToms[$tom['thread_id']][$tom['key']] = $this->buildTomJson($tom['thread_id'], $tom['tom_type'], $this->SELECT_FUNC, json_decode($tom['value'], true));
        }
        $result = [];
        $linkString = '';
        foreach ($threadList as $thread) {
            $threadId = $thread['id'];
            $userId = $thread['user_id'];
            $user = empty($users[$userId]) ? false : $users[$userId];
            $group = empty($groups[$userId]) ? false : $groups[$userId];
            $post = empty($postsByThreadId[$threadId]) ? false : $postsByThreadId[$threadId];
            $tomInput = empty($inPutToms[$threadId]) ? false : $inPutToms[$threadId];
            $threadTags = [];
            isset($tags[$threadId]) && $threadTags = $tags[$threadId];
            $result[] = $this->packThreadDetail($user, $group, $thread, $post, $tomInput, false, $threadTags);
            $linkString .= ($thread['title'] . $post['content']);
        }
        list($search, $replace) = Thread::instance()->getReplaceString($linkString);
        foreach ($result as &$item) {
            $item['title'] = str_replace($search, $replace, $item['title']);
            $item['content']['text'] = str_replace($search, $replace, $item['content']['text']);
        }
        return $result;
    }

    function getFilterThreads($filter, $currentPage, $perPage)
    {
        if (empty($filter)) $filter = [];
        $this->dzqValidate($filter, [
            'sticky' => 'integer|in:0,1',
            'essence' => 'integer|in:0,1',
            'types' => 'array',
            'categoryids' => 'array',
            'sort' => 'integer|in:1,2,3',
            'attention' => 'integer|in:0,1',
        ]);
        $essence = null;
        $types = [];
        $categoryids = [];
        $sort = Thread::SORT_BY_THREAD;
        $attention = 0;
        $search = '';
        isset($filter['sticky']) && $stick = $filter['sticky'];
        isset($filter['essence']) && $essence = $filter['essence'];
        isset($filter['types']) && $types = $filter['types'];
        isset($filter['categoryids']) && $categoryids = $filter['categoryids'];
        isset($filter['sort']) && $sort = $filter['sort'];
        isset($filter['attention']) && $attention = $filter['attention'];
        isset($filter['search']) && $search = $filter['search'];
        $categoryids = Category::instance()->getValidCategoryIds($this->user, $categoryids);
        if (!$categoryids) {
            $this->outPut(ResponseCode::INVALID_PARAMETER, '没有浏览权限');
        }
        $threads = $this->getThreadsBuilder();
        !empty($essence) && $threads = $threads->where('is_essence', $essence);

        if (!empty($types)) {
            $threads = $threads->leftJoin('thread_tag as tag', 'tag.thread_id', '=', 'th.user_id')
                ->whereIn('tag', $types);
        }
        if (!empty($search)) {
            $threads = $threads->leftJoin('posts as post', 'th.id', '=', 'post.thread_id')
                ->addSelect('post.content')
                ->where(['post.is_first' => Post::FIRST_YES, 'post.is_approved' => Post::APPROVED_YES])
                ->whereNull('post.deleted_at')
                ->where('post.content', 'like', '%' . $search . '%');
        }
        $this->setFilterSort($threads, $sort);
        //关注
        if ($attention == 1 && !empty($this->user)) {
            $threads->leftJoin('user_follow as follow', 'follow.to_user_id', '=', 'th.user_id')
                ->where('follow.from_user_id', $this->user->id);
        }
        !empty($categoryids) && $threads->whereIn('category_id', $categoryids);
        $threads = $this->pagination($currentPage, $perPage, $threads);
        return $threads;
    }

    private function setFilterSort($threads, $sort)
    {
        if (!empty($sort)) {
            switch ($sort) {
                case Thread::SORT_BY_THREAD://按照发帖时间排序
                    $threads->orderByDesc('th.created_at');
                    break;
                case Thread::SORT_BY_POST://按照评论时间排序
                    $threads->orderByDesc('th.posted_at');
                    break;
                case Thread::SORT_BY_HOT://按照热度排序
                    $threads->whereBetween('th.created_at', [Carbon::parse('-7 days'), Carbon::now()]);
                    $threads->orderByDesc('th.view_count');
                    break;
                default:
                    $threads->orderByDesc('th.created_at');
                    break;
            }
        }
    }

    function getDefaultHomeThreads($filter, $currentPage, $perPage)
    {
        $sequence = Sequence::query()->first();
        if (empty($sequence)) return false;
        $categoryIds = [];
        !empty($sequence['category_ids']) && $categoryIds = explode(',', $sequence['category_ids']);
        $categoryIds = Category::instance()->getValidCategoryIds($this->user, $categoryIds);
        if (!$categoryIds) {
            $this->outPut(ResponseCode::INVALID_PARAMETER, '没有浏览权限');
        }

        if (empty($filter)) $filter = [];
        isset($filter['types']) && $types = $filter['types'];

        !empty($sequence['group_ids']) && $groupIds = explode(',', $sequence['group_ids']);
        !empty($sequence['user_ids']) && $userIds = explode(',', $sequence['user_ids']);
        !empty($sequence['topic_ids']) && $topicIds = explode(',', $sequence['topic_ids']);
        !empty($sequence['thread_ids']) && $threadIds = explode(',', $sequence['thread_ids']);
        !empty($sequence['block_user_ids']) && $blockUserIds = explode(',', $sequence['block_user_ids']);
        !empty($sequence['block_topic_ids']) && $blockTopicIds = explode(',', $sequence['block_topic_ids']);
        !empty($sequence['block_thread_ids']) && $blockThreadIds = explode(',', $sequence['block_thread_ids']);
        $threads = $this->getThreadsBuilder();
        if (!empty($categoryIds)) {
            $threads = $threads->whereIn('th.category_id', $categoryIds);
        }
        if (!empty($types)) {
            $threads = $threads->leftJoin('thread_tag as tag', 'tag.thread_id', '=', 'th.user_id')
                ->whereIn('tag', $types);
        }
        if (!empty($groupIds)) {
            $threads = $threads
                ->leftJoin('group_user as g1', 'g1.user_id', '=', 'th.user_id')
                ->whereIn('g1.group_id', $groupIds);
        }
        if (!empty($topicIds)) {
            $threads = $threads
                ->leftJoin('thread_topic as topic', 'topic.thread_id', '=', 'th.id')
                ->whereIn('topic.topic_id', $topicIds);
        }
        if (!empty($userIds)) {
            $threads = $threads->whereIn('th.user_id', $userIds);
        }
        if (!empty($threadIds)) {
            $threads = $threads->whereIn('th.id', $threadIds);
        }
        if (!empty($blockUserIds)) {
            $threads->whereNotExists(function ($query) use ($blockUserIds) {
                $query->whereIn('th.user_id', $blockUserIds);
            });
        }
        if (!empty($blockThreadIds)) {
            $threads->whereNotExists(function ($query) use ($blockThreadIds) {
                $query->whereIn('th.id', $blockThreadIds);
            });
        }
        if (!empty($blockTopicIds)) {
            $threads->whereNotExists(function ($query) use ($blockTopicIds) {
                $query->whereIn('topic.topic_id', $blockTopicIds);
            });
        }
        $threads = $threads->orderByDesc('th.created_at');
        return $this->pagination($currentPage, $perPage, $threads);
    }

    private function getThreadsBuilder()
    {
        return Thread::query()
            ->select('th.*')
            ->from('threads as th')
            ->whereNull('th.deleted_at')
            ->where('th.is_sticky', Thread::BOOL_NO)
            ->where('th.is_draft', Thread::IS_NOT_DRAFT)
            ->where('th.is_approved', Thread::APPROVED);

    }
}