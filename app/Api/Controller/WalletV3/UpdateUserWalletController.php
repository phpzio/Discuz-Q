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

namespace App\Api\Controller\WalletV3;

use App\Commands\Wallet\UpdateUserWallet;
use App\Common\ResponseCode;
use App\Repositories\UserRepository;
use Discuz\Base\DzqController;
use Illuminate\Contracts\Bus\Dispatcher;

class UpdateUserWalletController extends DzqController
{
    protected $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    // 权限检查，是否为管理员
    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        return $userRepo->canUpdateUserWallet($this->user);
    }

    public function main()
    {
        $actor = $this->user;

        $data = [
            'userId' => $this->inPut('userId'),
            'operateType' => $this->inPut('operateType'),
            'operateAmount' => $this->inPut('operateAmount')  ,
            'walletStatus' => $this->inPut('walletStatus'),
            'operateReason' => $this->inPut('operateReason'),
        ];

        if(empty($data['userId'])){
            $this->outPut(ResponseCode::INVALID_PARAMETER, '缺少必要参数','');
        }

        $datas = $this->bus->dispatch(
            new UpdateUserWallet($data['userId'], $actor,$data)
        );

        $build = $this->camelData($datas);

        return $this->outPut(ResponseCode::SUCCESS,'', $build);

    }
}