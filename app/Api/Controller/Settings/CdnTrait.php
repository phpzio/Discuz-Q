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

namespace App\Api\Controller\Settings;

use App\Common\ResponseCode;
use Discuz\Base\DzqLog;
use Discuz\Common\Utils;
use Discuz\Contracts\Setting\SettingsRepository;
use TencentCloud\Cdn\V20180606\Models\AddCdnDomainRequest;
use TencentCloud\Cdn\V20180606\Models\DeleteCdnDomainRequest;
use TencentCloud\Cdn\V20180606\Models\DescribeDomainsRequest;
use TencentCloud\Cdn\V20180606\Models\PurgePathCacheRequest;
use TencentCloud\Cdn\V20180606\Models\StartCdnDomainRequest;
use TencentCloud\Cdn\V20180606\Models\StopCdnDomainRequest;
use TencentCloud\Cdn\V20180606\Models\UpdateDomainConfigRequest;
use TencentCloud\Common\Credential;
use TencentCloud\Common\Profile\ClientProfile;
use TencentCloud\Common\Profile\HttpProfile;
use TencentCloud\Common\Exception\TencentCloudSDKException;
use TencentCloud\Cdn\V20180606\CdnClient;

trait CdnTrait
{
    /**
     * @var SettingsRepository
     */
    protected $settings;

    public $client;

    public function __construct(SettingsRepository $settings)
    {
        $this->settings = $settings;
    }

    protected function initCdnClient(): CdnClient
    {
        // https://console.cloud.tencent.com/api/explorer?Product=cdn&Version=2018-06-06&Action=AddCdnDomain&SignVersion=
        $secretId = $this->settings->get('qcloud_secret_id', 'qcloud');
        $secretKey = $this->settings->get('qcloud_secret_key', 'qcloud');

        $cred = new Credential($secretId, $secretKey);
        $httpProfile = new HttpProfile();
        $httpProfile->setEndpoint('cdn.tencentcloudapi.com');

        $clientProfile = new ClientProfile();
        $clientProfile->setHttpProfile($httpProfile);
        $this->client = new CdnClient($cred, '', $clientProfile);
        return $this->client;
    }

    protected function commonCdnDomain($type, $params, $errorMsg = '')
    {
        try {
            $this->initCdnClient();

            switch ($type) {
                case 'addCdnDomain':
                    $req = new AddCdnDomainRequest();
                    $action = 'AddCdnDomain';
                    break;
                case 'updateCdnDomain':
                    $req = new UpdateDomainConfigRequest();
                    $action = 'UpdateDomainConfig';
                    break;
                case 'deleteCdnDomain':
                    $req = new DeleteCdnDomainRequest();
                    $action = 'DeleteCdnDomain';
                    break;
                case 'startCdnDomain':
                    $req = new StartCdnDomainRequest();
                    $action = 'StartCdnDomain';
                    break;
                case 'stopCdnDomain':
                    $req = new StopCdnDomainRequest();
                    $action = 'StopCdnDomain';
                    break;
                case 'describeDomains':
                    $req = new DescribeDomainsRequest();
                    $action = 'DescribeDomains';
                    break;
                case 'purgeCdnPathCache':
                    $req = new PurgePathCacheRequest();
                    $action = 'PurgePathCache';
                    break;
                default:
                    $req = new UpdateDomainConfigRequest();
                    $action = 'UpdateDomainConfig';
                    break;
            }

            $req->fromJsonString(json_encode($params));

            $resp = $this->client->$action($req);

            return json_decode($resp->toJsonString(), true);
        } catch (TencentCloudSDKException $e) {
            $errorData = ['errorCode' => $e->getErrorCode(), 'errorMsg' => $e->getMessage(), 'type' => $type, 'params' => $params];
            DzqLog::error('cdntrait_api_error', $errorData);
            unset($errorData['params']);
            Utils::outPut(ResponseCode::EXTERNAL_API_ERROR, $e->getMessage(), $errorData);
        }
    }

    public function addCdnDomain(string $domain, array $origins, string $serverName)
    {
        return $this->commonCdnDomain('addCdnDomain', [
            'Domain' => $domain, // ????????????
            'ServiceType' => 'web', // ???????????????????????? web??????????????? download??????????????? media????????????????????????
            'Origin' => [
                'Origins' => $origins,// ????????????
                'OriginType' => 'ip',
                'ServerName' => $serverName, // ??????HOST
                'OriginPullProtocol' => 'follow'
            ],
            'Cache' => [
                'SimpleCache' => [
                    'CacheRules' => [
                        [
                            'CacheType' => 'all',
                            'CacheContents' => ['*'],
                            'CacheTime' => 2592000 // 30 * 24 * 60 * 60
                        ],[
                            'CacheType' => 'file',
                            'CacheContents' => ['php','jsp','asp','aspx'],
                            'CacheTime' => 0
                        ],[
                            'CacheType' => 'directory',
                            'CacheContents' => ['/apiv3'],
                            'CacheTime' => 0
                        ],[
                            'CacheType' => 'directory',
                            'CacheContents' => ['/api'],
                            'CacheTime' => 0
                        ],[
                            'CacheType' => 'directory',
                            'CacheContents' => ['/api/backAdmin'],
                            'CacheTime' => 0
                        ],[
                            'CacheType' => 'directory',
                            'CacheContents' => ['/static-admin'],
                            'CacheTime' => 0
                        ],[
                            'CacheType' => 'directory',
                            'CacheContents' => ['/admin'],
                            'CacheTime' => 0
                        ]
                    ]
                ]
            ]
        ], '???????????????CDN????????????');
    }

    public function updateCdnDomain(string $domain, array $origins, string $serverName, $serviceType = 'web', $originType = 'ip')
    {
        return $this->commonCdnDomain('updateCdnDomain', [
            'Domain' => $domain, // ????????????
            'ServiceType' => $serviceType, // ???????????????????????? web??????????????? download??????????????? media????????????????????????
            'Origin' => [
                'Origins' => $origins,// ????????????
                'OriginType' => $originType,
                'ServerName' => $serverName, // ??????HOST
                'OriginPullProtocol' => 'follow'
            ],
        ], '???????????????CDN????????????');
    }

    public function deleteCdnDomain($domain)
    {
        return $this->commonCdnDomain('deleteCdnDomain', ['Domain' => $domain], '????????????????????????');
    }

    public function startCdnDomain($domain)
    {
        return $this->commonCdnDomain('startCdnDomain', ['Domain' => $domain], '????????????????????????');
    }

    public function stopCdnDomain($domain)
    {
        return $this->commonCdnDomain('stopCdnDomain', ['Domain' => $domain,], '????????????????????????');
    }

    public function describeDomains($value)
    {
        return $this->commonCdnDomain('describeDomains', [
            'Filters' => [
                [
                    'Name' => 'domain',
                    'Value' => [$value]
                ]
            ]
        ], '??????????????????????????????');
    }

    public function getCdnDomainStatus($speedDomain)
    {
        $domains = $this->describeDomains($speedDomain);
        DzqLog::info('getCdnDomainStatus', $domains);
        if ($domains['TotalNumber'] != 0) {
            return $domains['Domains'][0]['Status'];
        }
        return 'deleted';
    }

    public function purgeCdnPathCache()
    {
        $speedDomain = $this->settings->get('qcloud_cdn_speed_domain', 'qcloud');
        $cdnDomainStatus = $this->getCdnDomainStatus($speedDomain);
        if (!empty($speedDomain) && $cdnDomainStatus == 'online') {
            return $this->commonCdnDomain('purgeCdnPathCache', [
                'Paths' => [
                    'http://'.$speedDomain,
                    'https://'.$speedDomain
                ],
                'FlushType' => 'delete'
            ], '??????CDN????????????');
        }
        return false;
    }
}
