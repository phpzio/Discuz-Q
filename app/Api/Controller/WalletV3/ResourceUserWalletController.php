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

namespace App\Api\Controller\WalletV3;

use App\Common\ResponseCode;
use App\Models\User;
use App\Repositories\UserWalletRepository;
use App\Settings\SettingsRepository;
use Discuz\Auth\AssertPermissionTrait;
use Discuz\Base\DzqController;
use Illuminate\Support\Arr;

class ResourceUserWalletController extends DzqController
{
    use AssertPermissionTrait;

    public $wallet;
    public $setting;

    public $include = [
    ];

    public function __construct(UserWalletRepository $wallet, SettingsRepository $setting)
    {
        $this->wallet = $wallet;
        $this->setting = $setting;
    }


    public function main()
    {

        $actor = $this->user;
        $this->assertRegistered($actor);
        $user_id = $this->inPut('uid');

        if (!$actor->isAdmin() && $actor->id != $user_id) {
             $this->outPut(ResponseCode::INTERNAL_ERROR, '权限错误', '');
        }

        if(!$user_id){
            $this->outPut(ResponseCode::INVALID_PARAMETER,'');
        }

        $query = User::query();
        $groupData = $query->where('id',$user_id)->first();
        if(empty($groupData)){
            $this->outPut(ResponseCode::INVALID_PARAMETER, 'ID为'.$user_id.'用户不存在');
        }

        $data = $this->wallet->findOrFail($user_id, $this->user);

        $data->cash_tax_ratio = $this->setting->get('cash_rate', 'cash', 0);

        $data = $this->camelData($data);

        return $this->outPut(ResponseCode::SUCCESS,'', $data);
    }


}