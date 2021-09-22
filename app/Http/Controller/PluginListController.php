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

namespace App\Http\Controller;

use App\Common\Utils;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class PluginListController implements RequestHandlerInterface
{

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $pluginList = \Discuz\Common\Utils::getPluginList();
        foreach ($pluginList as &$item) {
            $appId = $item['app_id'];
            $appName = $item['name_en'];
            unset($item['plugin_' . $appId]);
            unset($item['busi']);
            unset($item['routes']);
            //前端插件入口
            $item['plugin_trigger'] = Utils::getDzqDomain() . "/plugin/{$appName}/index.js";
        }
        \Discuz\Common\Utils::outPut(0, '', array_values($pluginList));
    }
}
