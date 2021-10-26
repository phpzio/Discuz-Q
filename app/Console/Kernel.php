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

namespace App\Console;

use App\Console\Commands\AbnormalOrderDealCommand;
use App\Console\Commands\AttachmentAttributeUpdateCommand;
use App\Console\Commands\AttachmentClearCommand;
use App\Console\Commands\AvatarClearCommand;
use App\Console\Commands\FinanceCreateCommand;
use App\Console\Commands\GroupExpiredNoticeCommand;
use App\Console\Commands\InviteExpireCommand;
use App\Console\Commands\QueryWechatOrderConmmand;
use App\Console\Commands\QuestionClearCommand;
use App\Console\Commands\ThreadRewardExpireCommand;
use App\Console\Commands\RedPacketExpireCommand;
use App\Console\Commands\TranscodeVideoCommand;
use App\Console\Commands\CreateCrawlerDataCommand;
use App\Console\Commands\CreateCrawlerOfficialAccountDataCommand;
use App\Console\Commands\MonitorSystemTaskCommand;
use Discuz\Console\Kernel as ConsoleKernel;
use Illuminate\Console\Scheduling\Schedule;

class Kernel extends ConsoleKernel
{
    public $commands = [
        FinanceCreateCommand::class,
        AvatarClearCommand::class,
        AttachmentClearCommand::class,
        QueryWechatOrderConmmand::class,
        InviteExpireCommand::class,
        QuestionClearCommand::class,
        ThreadRewardExpireCommand::class,
        RedPacketExpireCommand::class,
        AbnormalOrderDealCommand::class,
        TranscodeVideoCommand::class,
        AttachmentAttributeUpdateCommand::class,
        CreateCrawlerDataCommand::class,
        MonitorSystemTaskCommand::class,
        CreateCrawlerOfficialAccountDataCommand::class,
        GroupExpiredNoticeCommand::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('finance:create')->daily();
        $schedule->command('order:query')->everyMinute()->withoutOverlapping();
        $schedule->command('invite:expire')->everyMinute()->withoutOverlapping();
        $schedule->command('reward:expire')->everyMinute()->withoutOverlapping();
        $schedule->command('redPacket:expire')->everyMinute()->withoutOverlapping();
        $schedule->command('abnormalOrder:clear')->everyMinute()->withoutOverlapping();
        $schedule->command('transcode:update')->everyFiveMinutes()->withoutOverlapping();
        $schedule->command('attachment:update')->everyFiveMinutes()->withoutOverlapping();
        $schedule->command('sendNotificationsRegularly:send')->everyMinute()->withoutOverlapping();

        // 维护清理
//        $schedule->command('clear:attachment')->daily();
//        $schedule->command('clear:video')->daily();
        $schedule->command('clear:question')->daily();
        $schedule->command('clear:thread_draft')->daily();
        $schedule->command('clear:session_token')->everyMinute();
        $schedule->command('crawlerData:create')->everyMinute();
        $schedule->command('crawlerOfficialAccountData:create')->everyMinute();
        $schedule->command('notificationTiming:clear')->daily();

        //监听定时任务
        $schedule->command('task:start')->everyMinute();
        $schedule->command('register:notice')->everyMinute();

        //用户组到期提醒
        $schedule->command('group:expiredNotice')->daily();
        //sitemap
        $schedule->command('add:Sitemap')->at('03:00');
    }
}
