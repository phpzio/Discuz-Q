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
use App\Models\Thread;
use App\Modules\ThreadTom\TomTrait;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Discuz\Base\DzqController;

class DeleteThreadController extends DzqController
{
    use TomTrait;

    private $thread;

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $this->thread = Thread::getOneActiveThread($this->inPut('threadId'));
        if (empty($thread)) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND);
        }
        $userRepo->canHideThread($this->user, $this->thread);
    }

    public function main()
    {
        $thread = $this->thread;
        $thread->deleted_at = Carbon::now();
        $thread->deleted_user_id = $this->user->id;
        if ($thread->save()) {
            $this->outPut(ResponseCode::SUCCESS);
        }
        $this->outPut(ResponseCode::DB_ERROR, '删除失败');
    }
}