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
use App\Models\Order;
use App\Models\Post;
use App\Models\PostUser;
use App\Models\Sequence;
use App\Models\Thread;
use App\Models\ThreadTom;
use App\Models\ThreadUser;
use App\Models\User;
use App\Modules\ThreadTom\TomTrait;
use Discuz\Base\DzqController;

class ThreadListController extends DzqController
{

    use TomTrait;

    public function main()
    {
        $filter = $this->inPut('filter');
        $currentPage = $this->inPut('page');
        $perPage = $this->inPut('perPage');
        $sequence = $this->inPut('sequence');//默认首页
        if (empty($sequence)) {
            $threads = $this->getDefaultHomeThreads($filter, $currentPage, $perPage);
        } else {
            $threads = $this->getFilterThreads($filter, $currentPage, $perPage);
        }
        $threadList = $threads['pageData'];
        !$threads && $threadList = [];
        $userIds = array_unique(array_column($threadList, 'user_id'));
        $groups = GroupUser::instance()->getGroupInfo($userIds);
        $groups = array_column($groups, null, 'user_id');
        $users = User::instance()->getUsers($userIds);
        $users = array_column($users, null, 'id');
        $threadIds = array_column($threadList, 'id');

        $posts = Post::instance()->getPosts($threadIds);
        $postsByThreadId = array_column($posts, null, 'thread_id');
        $postIds = array_column($posts, 'id');

        $likedPostIds = PostUser::instance()->getPostIdsByUid($postIds, $this->user->id);

        //获取点赞列表
        $likeList = ThreadUser::query()->whereIn('thread_id', $threadIds)->where('type', ThreadUser::TYPE_LIKE)
            ->orderByDesc('created_at')->limit(2);
        //获取支付和打赏列表
        $orders = Order::query()->whereIn('thread_id', $threadIds)
            ->where('user_id', $this->user->id)
            ->where('status', Order::ORDER_STATUS_PAID)
            ->get()->toArray();


        $toms = ThreadTom::query()->whereIn('thread_id', $threadIds)->where('status', ThreadTom::STATUS_ACTIVE)->get();

        $inPutToms = [];
        foreach ($toms as $tom) {
            $inPutToms[$tom['thread_id']][$tom['key']] = [
                'threadId' => $tom['thread_id'],
                'tomId' => $tom['tom_type'],
                'operation' => $this->SELECT_FUNC,
                'body' => $tom['value']
            ];
        }

        $result = [];
        foreach ($threadList as $thread) {
            $userId = $thread['user_id'];
            $user = [
                'userName' => '匿名用户'
            ];
            if ((!$thread['is_anonymous'] && !empty($users[$userId])) || $this->user->id == $thread['user_id']) {
                $user = $this->getUserInfo($users[$userId]);
            }
            $group = [];
            if (!empty($groups[$userId])) {
                $group = $this->getGroupInfo($groups[$userId]);
            }
            $threadId = $thread['id'];
            $content = [
                'text' => Post::instance()->getContentSummary($postsByThreadId[$thread['id']]),
                'indexes' => null
            ];
            if (isset($inPutToms[$threadId])) {
                $content['indexes'] = $this->tomDispatcher($inPutToms[$threadId]);
            }
            $position = [
                'longitude' => $thread['longitude'],
                'latitude' => $thread['latitude'],
                'address' => $thread['address'],
                'location' => $thread['location']
            ];
            $result[] = [
                'user' => $user,
                'group' => $group,
                'threadId' => $threadId,
                'userId' => $thread['user_id'],
                'categoryId' => $thread['category_id'],
                'title' => $thread['title'],
                'summary' => $thread['summary'],
                'position' => $position,
                'isSticky' => $thread['is_sticky'],
                'isEssence' => $thread['is_essence'],
                'isAnonymous' => $thread['is_anonymous'],//匿名贴不传userid
                'isSite' => $thread['is_site'],
                'content' => $content
            ];
        }
        $threads['pageData'] = $result;
        $this->outPut(0, '', $threads);
    }

    private function getGroupInfo($group)
    {
        return [
            'id' => $group['group_id'],
            'groupName' => $group['groups']['name'],
            'groupIcon' => $group['groups']['icon'],
            'isDisplay' => $group['groups']['is_display']
        ];
    }

    private function getUserInfo($user)
    {
        return [
            'id' => $user['id'],
            'userName' => $user['username'],
            'avatar' => $user['avatar'],
            'threadCount' => $user['thread_count'],
            'followCount' => $user['follow_count'],
            'fansCount' => $user['fans_count'],
            'likedCount' => $user['liked_count'],
            'questionCount' => $user['question_count'],
            'isRealName' => !empty($user['realname']),
            'joinedAt' => date('Y-m-d H:i:s', strtotime($user['joined_at']))
        ];
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
        isset($filter['sticky']) && $stick = $filter['sticky'];
        isset($filter['essence']) && $essence = $filter['essence'];
        isset($filter['types']) && $types = $filter['types'];
        isset($filter['categoryids']) && $categoryids = $filter['categoryids'];
        isset($filter['sort']) && $sort = $filter['sort'];
        isset($filter['attention']) && $attention = $filter['attention'];
        $categoryids = Category::instance()->getValidCategoryIds($this->user, $categoryids);
        if (!$categoryids) {
            $this->outPut(ResponseCode::INVALID_PARAMETER, '没有浏览权限');
        }
        $threads = $this->getThreads();
        !empty($essence) && $threads = $threads->where('is_essence', $essence);

        if (!empty($types)) {
            $threads = $threads->leftJoin('thread_tag as tag', 'tag.thread_id', '=', 'th.user_id')
                ->whereIn('tag', $types);
        }

        if (!empty($sort)) {
            if ($sort == Thread::SORT_BY_THREAD) {//按照发帖时间排序
                $threads->orderByDesc('th.created_at');
            } else if ($sort == Thread::SORT_BY_POST) {//按照评论时间排序
                $threads->leftJoin('thread_hot as hot', 'th.id', '=', 'hot.thread_id');
                $threads->orderByDesc('hot.last_post_time');
            }
        }
        //关注
        if ($attention == 1 && !empty($this->user)) {
            $threads->leftJoin('user_follow as follow', 'follow.to_user_id', '=', 'th.user_id')
                ->where('follow.from_user_id', $this->user->id);
        }
        !empty($categoryids) && $threads->whereIn('category_id', $categoryids);
        $threads = $this->pagination($currentPage, $perPage, $threads);
        return $threads;
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
        $threads = $this->getThreads();
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

    private function getThreads()
    {
        return Thread::query()
            ->from('threads as th')
            ->whereNull('th.deleted_at')
            ->where('is_sticky', Thread::BOOL_NO)
            ->where('is_draft', Thread::IS_NOT_DRAFT)
            ->where('is_approved', Thread::APPROVED);
    }
}
