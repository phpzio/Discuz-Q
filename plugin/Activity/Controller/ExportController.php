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

namespace Plugin\Activity\Controller;

use App\Common\DzqConst;
use App\Common\ResponseCode;
use App\Common\Utils;
use App\Exports\ActivityExport;
use App\Repositories\UserRepository;
use Discuz\Base\DzqController;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Plugin\Activity\Model\ActivityUser;
use Plugin\Activity\Model\ThreadActivity;

class ExportController extends DzqController
{
    use ActivityTrait;

    protected $bus;

    public function __construct(BusDispatcher $bus)
    {
        $this->bus = $bus;
    }

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        $check = $this->checkPermission($userRepo, true);
        if (!$check) {
            return  $check;
        }
        //还需要本人或者超管才能有权限
        if ($this->activity->user_id == $this->user->id || $this->user->isAdmin()) {
            return true;
        } else {
            return false;
        }
    }

    public function main()
    {
        $activityId = $this->inPut('activityId');
        $activity_users = ActivityUser::query()->where(['activity_id' => $activityId, 'status' => DzqConst::BOOL_YES])->get();
        $export_list = [];
        $column_map = [];
        foreach ($activity_users as $key=>$val) {
            $export_list[$key]['nickname'] = $val->user->nickname;
            $additional_info = json_decode($val->additional_info, 1);
            if(empty($column_map)){
                foreach ($additional_info as $k => $v){
                    $map_v = '';
                    switch ($k){
                        case in_array($k, array_keys(ThreadActivity::$addition_info_map)):
                            $map_v = ThreadActivity::$addition_map[ThreadActivity::$addition_info_map[$k]];
                            break;
                        default:
                            break;
                    }
                    $column_map[$k] = $map_v;
                }
                $column_map['nickname'] = '昵称';
            }
            ksort($additional_info);

            if (!empty($additional_info)) {
                foreach ($additional_info as $ko => $vo) {
                    $export_list[$key][$ko] = $vo;
                }
            }
        }

        $filename = $this->app->config('excel.root') . DIRECTORY_SEPARATOR . 'activity_excel.xlsx';
        //TODO 判断满足条件的excel是否存在,if exist 直接返回;
        $this->bus->dispatch(
            new ActivityExport($filename, $export_list, $column_map)
        );

        //检测下载文件是否存在 并且可读
        if (!is_file($filename) && !is_readable($filename)) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, '');
        }
        Utils::localexport($filename);

    }


}
