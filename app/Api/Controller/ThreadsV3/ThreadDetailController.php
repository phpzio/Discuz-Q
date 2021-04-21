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
use App\Models\Group;
use App\Models\Post;
use App\Models\Thread;
use App\Models\ThreadTom;
use App\Models\User;
use Discuz\Base\DzqController;

class ThreadDetailController extends DzqController
{
    use ThreadTrait;

    public function main()
    {
        $threadId = $this->inPut('threadId');
        $thread = Thread::getOneActiveThread($threadId);
        $post = Post::getOneActivePost($threadId);
        if (!$thread || !$post) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND);
        }
        if (!$this->canViewThreadDetail($this->user, $thread['category_id'])) {
            $this->outPut(ResponseCode::UNAUTHORIZED);
        }
        $user = User::query()->where('id', $thread['user_id'])->first();
        $group = Group::getGroup($user['id']);
        $thread->increment('view_count');
        $result = $this->packThreadDetail($user, $group, $thread, $post, $this->getTomContent($thread), true);
        $this->outPut(ResponseCode::SUCCESS, '', $result);
    }

    private function getTomContent($thread)
    {
        $threadId = $thread->id;
        $threadTom = ThreadTom::query()
            ->where([
                'thread_id' => $threadId,
                'status' => ThreadTom::STATUS_ACTIVE
            ])->orderBy('key')->get()->toArray();
        $tomContent = [];
        foreach ($threadTom as $item) {
            $tomContent[$item['key']] = $this->buildTomJson($threadId, $item['tom_type'], $this->SELECT_FUNC, json_decode($item['value'], true));
        }
        return $tomContent;
    }
}