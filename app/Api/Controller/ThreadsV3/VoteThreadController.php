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


use App\Common\CacheKey;
use App\Common\ResponseCode;
use App\Models\Thread;
use App\Models\ThreadTom;
use App\Models\ThreadVote;
use App\Models\ThreadVoteSubitem;
use App\Models\ThreadVoteUser;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Discuz\Base\DzqCache;
use Discuz\Base\DzqController;

class VoteThreadController extends DzqController
{

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $this->thread = Thread::query()
            ->where(['id' => $this->inPut('threadId')])
            ->first();
        if (empty($this->thread)) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND);
        }
        //判断帖子id与投票是否匹配
        $vote = $this->inPut('vote');
        $thread_vote = ThreadVote::query()->where(['thread_id',$this->thread->id, 'id' => $vote['id']])->whereNull('deleted_at')->first();
        if(empty($thread_vote)){
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND);
        }
        if($thread_vote->expired_at < Carbon::now())    $this->outPut(ResponseCode::INVALID_PARAMETER,'投票已过期');
        //判断是单选还是多选
        if($thread_vote->choice_type == 1 && count($vote['subitem_ids']) > 1)       $this->outPut(ResponseCode::INVALID_PARAMETER, '该投票是单选，不可多选');

        $hasPermission = $userRepo->canViewThreadDetail($this->user, $this->thread);
        if (! $hasPermission && $this->user->isGuest()) {
            $this->outPut(ResponseCode::JUMP_TO_LOGIN);
        }
        return $hasPermission;
    }

    public function main()
    {
        $thread_id = $this->inPut('threadId');
        $vote = $this->inPut('vote');
        $thread_vote_subitems_ids = ThreadVoteSubitem::query()->where('thread_vote_id', $vote['id'])->whereNull('deleted_at')->pluck('id')->toArray();
        $diff_subitems_ids = array_diff($vote['subitem_ids'], $thread_vote_subitems_ids);
        if(!empty($diff_subitems_ids)){
            $this->outPut(ResponseCode::INVALID_PARAMETER, '投票选项有误');
        }
        //查找已投票的ids
        $thread_vote_users_old_ids =ThreadVoteUser::query()->where(['user_id' => $this->user->id, 'thread_id' => $thread_id])->pluck('thread_vote_subitem_id')->toArray();
        $is_voted = array_intersect($thread_vote_users_old_ids, $thread_vote_subitems_ids);
        if(!empty($is_voted)){
            $this->outPut(ResponseCode::INVALID_PARAMETER, '已投票，不可再投');
        }
        $thread_vote_users = [];
        $now = Carbon::now();
        foreach ($vote['subitem_ids'] as $val){
            $thread_vote_users[] = [
                'user_id'   =>  $this->user->id,
                'thread_id' =>  $thread_id,
                'thread_vote_subitem_id'    =>  $val,
                'created_at'    =>  $now
            ];
        }
        $this->getDB()->beginTransaction();
        $res = $this->getDB()->table('thread_vote_users')->insert($thread_vote_users);
        if($res === false){
            $this->getDB()->rollBack();
            $this->outPut(ResponseCode::INTERNAL_ERROR, '投票出错');
        }
        //增加 投票次数
        $res = $this->getDB()->table('thread_vote_subitems')->whereIn('id', $vote['subitem_ids'])->increment('vote_count');
        if($res === false){
            $this->getDB()->rollBack();
            $this->outPut(ResponseCode::INTERNAL_ERROR, '投票选项增加票数出错');
        }
        //判断之前是否已投票，如果投了，如果没投就增加投票人数
        if(empty($is_voted)){
            $res = $this->getDB()->table('thread_votes')->where('id', $vote['id'])->increment('vote_users');
            if($res === false){
                $this->getDB()->rollBack();
                $this->outPut(ResponseCode::INTERNAL_ERROR, '增加投票人数出错');
            }
        }
        $this->getDB()->commit();
        $this->outPut(ResponseCode::SUCCESS);
    }

}
