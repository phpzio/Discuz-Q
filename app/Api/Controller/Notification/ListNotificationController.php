<?php

/**
 * Copyright (C) 2020 Tencent Cloud.
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

namespace App\Api\Controller\Notification;

use App\Common\ResponseCode;
use App\Common\Utils;
use App\Models\Post;
use App\Models\Thread;
use App\Models\User;
use App\Repositories\UserRepository;
use Discuz\Base\DzqController;
use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class ListNotificationController extends DzqController
{
    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $actor = $this->user;
        if ($actor->isGuest()) {
            $this->outPut(ResponseCode::JUMP_TO_LOGIN);
        }
        return true;
    }

    public function main()
    {
        $user = $this->user;
        $filters = $this->inPut('filter') ?: [];
        $page = $this->inPut('page') ?: 1;
        $perPage = $this->inPut('perPage') ?: 10;

        $pageData = $this->search($user, $filters, $perPage, $page);
        $pageData['pageData'] = $pageData['pageData']->map(function (DatabaseNotification $i) {
            return $this->formatData($i);
        });

        $this->outPut(ResponseCode::SUCCESS, '', $pageData);
    }

    public function search(User $user, $filters, $perPage, $page)
    {
        $type = Arr::get($filters, 'type');

        $query = $user->notifications()
            ->when($type, function ($query, $type) {
                return $query->whereIn('type', explode(',', $type));
            });

        $query->orderBy('created_at', 'desc');

        $pageData = $this->pagination($page, $perPage, $query->getQuery(), false);
        $data = $pageData['pageData'];

        // type markAsRead
        $user->unreadNotifications()->whereIn('type', explode(',', $type))->get()->markAsRead();

        /**
         * ?????? N+1 ??????
         * ????????????&??????
         */
        [$users, $threads] = $this->getUsersAndThreads($data, $type);

        /**
         * ????????????????????????
         */
        if ($type != 'system') {
            // ?????????????????????????????????????????????
            $data->map(function ($item) use ($users, $threads, $user, $type) {
                $user = $users->get(Arr::get($item->data, 'user_id'));
                if (!empty($user)) {
                    $item->user_name = $user->username;
                    $item->user_avatar = $user->avatar;
                    $item->realname = $user->realname;
                    $item->nickname = $user->nickname;
                }
                // ????????????????????????
                if (!empty($threadID = Arr::get($item->data, 'thread_id', 0))) {
                    // ???????????????????????????
                    if (!empty($threads->get($threadID))) {
                        $item->is_reply = 0;
                        $thread = $threads->get($threadID);
                        $item->thread_user_nickname = $thread->user->nickname;
                        $item->thread_user_avatar = $thread->user->avatar;
                        $item->thread_type = $thread->type;
                        $item->thread_is_approved = $thread->is_approved;
                        $item->thread_created_at = $thread->created_at;
                        $threadUser = $thread->user;
                        if (!empty($threadUser)) {
                            $item->thread_username = $threadUser->username;
                            $item->thread_user_groups = $threadUser->groups->pluck('name')->join(',');
                            /**
                             * ????????????????????????????????????
                             * @var Thread $thread
                             */
                            if ($thread->type == Thread::TYPE_OF_QUESTION && !empty($thread->question)) {
                                // ??????????????????????????????????????????????????????????????????????????????
                                if ($user->id == $thread->user_id && $thread->is_anonymous) {
                                    // ???????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????
                                    if (Str::contains($type, ['questioned', 'rewarded'])) {
                                        $item->user_name = $thread->isAnonymousName();
                                        $item->realname = $thread->isAnonymousName();
                                        $item->user_avatar = '';
                                        $item->isAnonymous = true;
                                    } elseif (Str::contains($type, ['related'])) {
                                        /**
                                         * ??????????????? @?????? ???????????????@?????????????????????????????????????????????????????????@???
                                         * (???????????????????????????@???????????????)
                                         */
                                        $postId = Arr::get($item->data, 'post_id');
                                        if ($postId == $thread->firstPost->id) {
                                            $item->user_name = $thread->isAnonymousName();
                                            $item->realname = $thread->isAnonymousName();
                                            $item->user_avatar = '';
                                            $item->isAnonymous = true;
                                        }
                                    }
                                }
                                // ??????????????????????????????
                                $item->thread_username = $thread->isAnonymousName();
                                $item->thread_user_groups = '';
                            }
                            //???????????????????????????
                            if ($item->type === 'threadrewarded') {
                                $item->user_name = $threadUser->username;
                                $item->user_avatar = $threadUser->avatar;
                                $item->realname = $threadUser->realname;
                                $item->nickname = $threadUser->nickname;
                                $itemData = $item->data;
                                $itemData['user_id'] = $threadUser->id;
                                $item->data = $itemData;
                            }
                        }
                    }
                }
                // ??????????????????????????????????????????
                if (Arr::has($item->data, 'reply_post_user_id') && Arr::get($item->data, 'reply_post_user_id') != 0) {
                    $replyPostUser = $users->get(Arr::get($item->data, 'reply_post_user_id'));
                    if (!empty($replyPostUser)) {
                        $item->reply_post_user_name = $replyPostUser->username;
                        //????????????????????????????????????1
                        $item->is_reply = 1;
                    }
                }
            });
        } else {
            // ?????????????????????????????????????????????
            $data->map(function ($item) use ($users, $threads, $user) {
                if (!empty($threadID = Arr::get($item, 'data.raw.thread_id', 0))) {
                    // ???????????????????????????
                    if (!empty($threads->get($threadID))) {
                        $thread = $threads->get($threadID);
                        $item->thread_is_approved = $thread->is_approved;
                        $item->thread_created_at = $thread->created_at;
                    }
                }
            });
        }

        $pageData['pageData'] = $data;

        return $pageData;
    }

    protected function getUsersAndThreads($data, $type)
    {
        if ($type == 'system') {
            $data->where('type', '=', $type);
            $pluck = 'raw.thread_id';
        } else {
            $data->where('type', '<>', $type);
            $pluck = 'thread_id';
        }

        // ???????????????
        $list = $data->pluck('data');

        // ?????? IDs
        $collectList = collect($list);
        $userIds = $collectList->pluck('user_id');
        $replyUserId = $collectList->pluck('reply_post_user_id');
        $userIds = $userIds->merge($replyUserId)->filter()->unique()->values();
        $users = User::query()->whereIn('id', $userIds)->get()->keyBy('id');

        // ?????? ID
        $threadIds = collect($list)->pluck($pluck)->filter()->unique()->values();
        // ????????????????????????????????????
        $with = ['user', 'user.groups', 'firstPost'];
        // ????????? question ??????????????????
        if ($type == 'questioned') {
            array_push($with, 'question');
        }
        $threads = Thread::with($with)->whereIn('id', $threadIds)->get()->keyBy('id');

        return [$users, $threads];
    }

    protected function formatData(DatabaseNotification $data)
    {
        $data->data = $this->changeNotificationData($data->data);
        $result = array_merge([
            'id' => $data->id,
            'type' => $data->type,
            'userId' => $data->notifiable_id,
            'readAt' => optional($data->read_at)->format('Y-m-d H:i:s'),
            'createdAt' => optional($data->created_at)->format('Y-m-d H:i:s'),
        ], Utils::arrayKeysToCamel($data->data));

        // ???????????????????????????
        if (!array_key_exists('replyPostId', $result)) {
            $result = array_merge($result, [
                'replyPostId' => 0,
            ]);
        } else {
            // ?????????????????????
            $result = array_merge($result, [
                'replyPostUserName' => $data->reply_post_user_name,
            ]);
        }

        // ??????????????????????????????
        $result = array_merge($result, [
//            'username' => $data->user_name ?: '',
            'userAvatar' => $data->user_avatar ?: '',
            'nickname' => $data->nickname ?: '',
            'isReal' => $this->getIsReal($data->realname),
//            'threadUsername' => $data->thread_username ?: '',
            'threadUserGroups' => $data->thread_user_groups ?: '',
            'threadCreatedAt' => optional($data->thread_created_at)->format('Y-m-d H:i:s'),
            'threadIsApproved' => $data->thread_is_approved ?: 0,
            'threadUserNickname' => $data->thread_user_nickname ?: '',
            'threadUserAvatar' => $data->thread_user_avatar ?: '',
            'isReply'   =>  $data->is_reply ?: 0
        ]);

        // ?????????????????????
        if (!empty($result['threadId'])) {
            $thAnonymous = Thread::query()->where('id', $result['threadId'])->first(['id','is_anonymous']);
            if (!empty($thAnonymous) && in_array($result['type'], ['threadrewarded']) && (bool)$thAnonymous->is_anonymous) {
                $result['isReal'] = false; // ?????????????????????
                $result['isAnonymous'] = true;
                $result['threadUsername'] = '????????????';
                $result['threadUserNickname'] = '????????????';
                $result['threadUserAvatar'] = '';
            }
        }

        return $result;
    }

    protected function changeNotificationData($data)
    {
        if (isset($data['post_id']) && !empty($data['post_id'])) {
            if (!strpos($data['post_content'], '[?????????]') &&
               !strpos($data['post_content'], '[?????????]')) {
                $data['post_content'] = Post::changeContent($data['post_content']);
            }

            $post = Post::query()->where('id', $data['post_id'])->first();
            if ($post['is_first'] == Post::FIRST_YES) {
                $data['post_content'] = Post::addTagToThreadContent($data['thread_id'], $data['post_content']);
                if (!empty($data['thread_title'])) {
                    $data['thread_title'] = Post::addTagToThreadContent($data['thread_id'], $data['thread_title']);
                }
            } else {
                $data['post_content'] = Post::addTagToPostContent($data['post_id'], $data['post_content']);
                if (!empty($data['thread_title'])) {
                    $data['thread_title'] = Post::addTagToPostContent($data['post_id'], $data['thread_title']);
                }
            }
        }
        if (isset($data['reply_post_id']) && !empty($data['reply_post_id'])) {
            $data['reply_post_content'] = Post::changeContent($data['reply_post_content']);
            $data['reply_post_content'] = Post::addTagToPostContent($data['reply_post_id'], $data['reply_post_content']);
        }

        if (isset($data['amount']) && isset($data['thread_id'])) {
            $data['content'] = Post::changeContent($data['content']);
            $data['content'] = Post::addTagToThreadContent($data['thread_id'], $data['content']);
            if (isset($data['thread_title']) && !empty($data['thread_title'])) {
                $data['thread_title'] = Post::changeContent($data['thread_title']);
                $data['thread_title'] = Post::addTagToThreadContent($data['thread_id'], $data['thread_title']);
            }
        }

        return $data;
    }

    /**
     * ??????????????????
     *
     * @param $realname
     *
     * @return string
     */
    protected function getIsReal($realname)
    {
        if (isset($realname) && $realname != null) {
            return true;
        } else {
            return false;
        }
    }
}
