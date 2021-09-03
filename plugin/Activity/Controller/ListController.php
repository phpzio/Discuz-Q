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

namespace Plugin\Activity\Controller;


use Discuz\Base\DzqController;

class ListController extends DzqController
{

    public function main()
    {
        //分页获取报名用户列表
        $this->outPut(0, '', [
            [
                'userId' => 1,
                'avatar' => '',
                'nickname' => '昵称1'
            ],
            [
                'userId' => 1,
                'avatar' => '',
                'nickname' => '昵称2'
            ],
            [
                'userId' => 1,
                'avatar' => '',
                'nickname' => '昵称3'
            ],
            [
                'userId' => 1,
                'avatar' => '',
                'nickname' => '昵称4'
            ],
            [
                'userId' => 1,
                'avatar' => '',
                'nickname' => '昵称5'
            ]
        ]);
    }
}
