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

return [
    // 旧模版变量
    '系统新用户注册通知' => [
        '{username}'  => '用户名',
        '{sitename}'  => '站点名称',
        '{groupname}' => '用户组',
    ],
    '系统注册审核通过通知' => [
        '{username}' => '用户名',
    ],
    '系统注册审核不通过通知' => [
        '{username}' => '用户名',
        '{reason}'   => '原因',
    ],
    '系统内容审核不通过通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
        '{reason}'   => '原因',
    ],
    '系统内容审核通过通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
    ],
    '系统内容删除通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
        '{reason}'   => '原因',
    ],
    '系统内容精华通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
    ],
    '系统内容置顶通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
    ],
    '系统内容修改通知' => [
        '{username}' => '用户名',
        '{content}'  => '内容',
    ],
    '系统用户禁用通知' => [
        '{username}' => '用户名',
        '{reason}'   => '原因',
    ],
    '系统用户解除禁用通知' => [
        '{username}' => '用户名',
    ],
    '系统用户角色调整通知' => [
        '{username}'     => '用户名',
        '{oldgroupname}' => '老用户组',
        '{newgroupname}' => '新用户组',
    ],

    // 新模版变量
    '微信新用户注册通知' => [
        '{$user_id}'              => '注册人 ID（用于站点第几名注册）',
        '{$user_name}'            => '用户名（注册人）',
        '{$user_mobile}'          => '用户手机号',
        '{$user_group}'           => '注册人用户组',
        '{$joined_at}'            => '付费加入时间',
        '{$expired_at}'           => '付费到期时间',
        '{$site_name}'            => '站点名称',
        '{$site_title}'           => '站点标题',
        '{$site_introduction}'    => '站点介绍',
        '{$site_mode}'            => '站点模式（付费/免费 (用于提示用户"付费加入该站点")）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信用户状态通知' => [
        '{$user_name}'            => '用户名',
        '{$user_mobile}'          => '用户手机号（不带 * 的）',
        '{$user_change_status}'   => '用户状态（改变的用户状态）',
        '{$user_original_status}' => '用户状态（原用户状态）',
        '{$reason}'               => '原因（默认字符串"无"）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信内容状态通知' => [
        '{$user_name}'            => '用户名（帖子创建人）',
        '{$actor_name}'           => '用户名（操作人，一般为管理员）',
        '{$message_change}'       => '修改帖子的内容（对应操作时，该字段有效）',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$thread_post_content}'  => '首贴内容',
        '{$reason}'               => '原因（默认字符串"无"）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信用户角色调整通知' => [
        '{$user_name}'            => '用户名（被更改人）',
        '{$group_original}'       => '原用户组名',
        '{$group_change}'         => '新用户组名',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信内容回复通知' => [
        '{$user_name}'            => '用户名（回复人）',
        '{$post_content}'         => '回复内容',
        '{$reply_post}'           => '被回复内容',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$thread_post_content}'  => '首贴内容',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信内容点赞通知' => [
        '{$user_name}'            => '用户名（点赞人）',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$thread_post_content}'  => '首贴内容',
        '{$post_content}'         => '帖子内容',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信内容支付通知' => [
        '{$user_name}'            => '用户名（支付人）',
        '{$order_sn}'             => '订单编号',
        '{$payment_sn}'           => '支付编号',
        '{$order_type_name}'      => '订单支付类型（打赏/付费主题/付费用户组/问答回答收入/问答围观收入/付费附件）',
        '{$actual_amount}'        => '实际获得金额',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信内容@通知' => [
        '{$user_name}'            => '用户名（发送人）',
        '{$post_content}'         => '@源帖子内容',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$thread_post_content}'  => '首贴内容',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信提现通知' => [
        '{$user_name}'            => '用户名（提现人）',
        '{$cash_sn}'              => '提现交易编号',
        '{$cash_charge}'          => '提现手续费',
        '{$cash_actual_amount}'   => '提现实际到账金额',
        '{$cash_apply_amount}'    => '提现申请金额',
        '{$cash_status}'          => '提现结果（待审核/审核通过/审核不通过/待打款/已打款/打款失败）',
        '{$cash_mobile}'          => '提现到账手机号码',
        '{$remark}'               => '备注或原因（默认"无"）',
        '{$trade_no}'             => '交易号',
        '{$cash_created_at}'      => '提现创建时间',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信分成收入通知' => [
        '{$user_name}'            => '用户名（被更改人的用户名）',
        '{$order_sn}'             => '订单编号',
        '{$payment_sn}'           => '支付编号',
        '{$order_type_name}'      => '订单支付类型（注册/打赏/付费主题/付费附件）',
        '{$boss_amount}'          => '上级实际分成金额',
        '{$title}'                => '主题标题/"注册站点"（如果是注册站点，该值是"注册站点"）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信问答提问或过期通知' => [
        '{$user_name}'            => '用户名（提问人姓名/匿名）',
        '{$be_user_name}'         => '用户名（被提问人）',
        '{$question_price}'       => '提问价格（也是解冻金额）',
        '{$question_created_at}'  => '提问创建时间',
        '{$question_expired_at}'  => '提问过期时间',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

    '微信问答回答通知' => [
        '{$user_name}'            => '用户名（回答人姓名）',
        '{$be_user_name}'         => '用户名（被提问人）',
        '{$question_content}'     => '回答的内容',
        '{$question_price}'       => '提问价格',
        '{$question_created_at}'  => '提问创建时间',
        '{$question_expired_at}'  => '提问过期时间',
        '{$thread_title}'         => '主题标题/首贴内容（如果有标题则是标题内容，没有则是首帖内容）',
        '{$notify_time}'          => '通知时间（时间格式: 20xx-xx-xx xx:xx:xx）',
    ],

];
