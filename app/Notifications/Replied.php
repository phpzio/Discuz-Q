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

namespace App\Notifications;

use App\Models\NotificationTiming;
use App\Models\Post;
use App\Models\User;
use App\Notifications\Messages\Database\RepliedMessage;
use App\Notifications\Messages\MiniProgram\RepliedMiniProgramMessage;
use App\Notifications\Messages\Sms\RepliedSmsMessage;
use App\Notifications\Messages\Wechat\RepliedWechatMessage;
use Discuz\Notifications\NotificationManager;

/**
 * 回复通知
 *
 * @package App\Notifications
 */
class Replied extends AbstractNotification
{
    public $actor;

    public $post;

    public $data;

    public $tplId = [
        'database'    => 'system.post.replied',
        'wechat'      => 'wechat.post.replied',
        'sms'         => 'sms.post.replied',
        'miniProgram' => 'miniprogram.post.replied',
    ];

    public function __construct(User $actor, Post $post, $data = [])
    {
        $this->setTemplate();

        $this->actor = $actor;
        $this->post = $post;
        $this->data = $data;
    }

    /**
     * 设置所有开启中的，要发送的模板
     * 查询到数据集合后，存放静态区域
     */
    protected function setTemplate()
    {
        self::getTemplate($this->tplId);
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        // 获取已开启的通知频道
        return $this->getNotificationChannels();
    }

    public function getTplModel($type)
    {
        return self::$tplData->where('notice_id', $this->tplId[$type])->first();
    }

    public function toDatabase($notifiable)
    {
        $message = app(RepliedMessage::class);
        $message->setData($this->getTplModel('database'), $this->actor, $this->post);

        return (new NotificationManager)->driver('database')->setNotification($message)->build();
    }

    public function toWechat($notifiable, $noticeTimingId = 0)
    {
        $this->data['receiveUserId'] = !empty($notifiable->id) ? $notifiable->id : 0;
        $this->data['noticeId'] = collect($this->getTplModel('wechat'))->get('notice_id');

        NotificationTiming::updateSendData($noticeTimingId, [
            'userId' => $this->actor->id,
            'contentData' =>[
                'id' => $this->post->id,
                'table' => get_class(new Post())
            ],
            'data' => $this->data
        ]);

        $message = app(RepliedWechatMessage::class);
        $message->setData($this->getTplModel('wechat'), $this->actor, $this->post, $this->data);

        return (new NotificationManager)->driver('wechat')->setNotification($message)->build();
    }

    public function toSms($notifiable)
    {
        $message = app(RepliedSmsMessage::class);
        $message->setData($this->getTplModel('sms'), $this->actor, $this->post, $this->data);

        return (new NotificationManager)->driver('sms')->setNotification($message)->build();
    }

    public function toMiniProgram($notifiable)
    {
        $message = app(RepliedMiniProgramMessage::class);
        $message->setData($this->getTplModel('miniProgram'), $this->actor, $this->post, $this->data);

        return (new NotificationManager)->driver('miniProgram')->setNotification($message)->build();
    }

}
