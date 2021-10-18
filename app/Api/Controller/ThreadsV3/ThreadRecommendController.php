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
use App\Models\Post;
use App\Models\Thread;
use App\Models\ThreadTag;
use App\Modules\ThreadTom\TomConfig;
use App\Repositories\UserRepository;
use Discuz\Auth\Exception\PermissionDeniedException;
use Discuz\Base\DzqController;

class ThreadRecommendController extends DzqController
{
    use ThreadTrait;

    private $categoryIds = [];

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $filter = $this->inPut('filter') ?: [];
        $categoryIds = $filter['categoryids'] ?? [];
        $this->categoryIds = Category::instance()->getValidCategoryIds($this->user, $categoryIds);
        if (!$this->categoryIds) {
                throw new PermissionDeniedException('没有浏览权限');
        }
        return true;
    }

    public function main()
    {
        $perPage = $this->inPut('perPage') ? $this->inPut('perPage'):5;
        $threads = Thread::query()->select(['id', 'category_id', 'title','view_count','price','attachment_price','is_essence']);
        $threads = $threads
            ->where('is_essence', 1)
            ->where('is_draft', 0)
            ->where('is_approved',1)
            ->whereNull('deleted_at')
            ->whereNotNull('user_id')
            ->inRandomOrder()
            ->take($perPage)
            ->get();

        $threadIds = $threads->pluck('id')->toArray();
        $posts = Post::query()
            ->whereIn('thread_id', $threadIds)
            ->whereNull('deleted_at')
            ->where('is_first', Post::FIRST_YES)
            ->get()->pluck(null, 'thread_id');

        //获取主题标签
        $tags = [];
        $newTags = [];
        $tagList = Thread::getTagList();
        ThreadTag::query()->whereIn('thread_id', $threadIds)->get()->each(function ($item) use (&$tags, &$newTags) {
            $itemData = $item->toArray();
            $tags[$item['thread_id']][] = $itemData;
            $newTags[$item['thread_id']][$item['tag']][] = $itemData;
        });

        $data = [];
        // $linkString = '';
        foreach ($threads as $thread) {
            $title = $thread['title'];
            $threadid = $thread['id'];
            $contentTags = '';
            if (isset($posts[$threadid])) {
                $contentTags = Post::getContentTags($posts[$threadid]->content);
                if (empty($title)) {
                    $title = Post::instance()->getContentSummary($posts[$threadid]);
                }
            }
            $title = str_replace(PHP_EOL, "", $title);
            if (!empty($contentTags)) {
                $title = $title . $contentTags;
            }

            // $linkString .= $title;
            $threadTags = [];
            isset($tags[$threadid]) && $threadTags = $tags[$threadid];
            if (isset($newTags[$threadid])) {
                foreach ($tagList as $key => $value) {
                    $tagString = "[" . $value['name_cn'] . "]";
                    if (isset($newTags[$threadid][$key]) && strpos($title, $tagString) === false) {
                        $title = $title . $tagString;
                    }
                }
            }
            $data [] = [
                'threadId' => $thread['id'],
                'categoryId' => $thread['category_id'],
                'title' => $title,
                'displayTag'=>$this->getDisplayTagField($thread, $threadTags),
                'viewCount'=>$thread['view_count']
            ];
        }
        /*
        [$search, $replace] = Thread::instance()->getReplaceString($linkString);
        foreach ($data as &$item) {
            $item['title'] = str_replace($search, $replace, $item['title']);
        }
        */
        $this->outPut(ResponseCode::SUCCESS, '', $data);
    }
}
