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

namespace App\Api\Controller\Attachment;

use App\Common\ResponseCode;
use App\Models\Attachment;
use App\Models\Thread;
use App\Repositories\AttachmentRepository;
use App\Repositories\UserRepository;
use App\Settings\SettingsRepository;
use Carbon\Carbon;
use Discuz\Base\DzqController;
use Exception;
use GuzzleHttp\Client as HttpClient;
use Illuminate\Contracts\Filesystem\Factory as Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;

class ResourceAttachmentController extends DzqController
{
    private $attachment;

    protected function checkRequestPermissions(UserRepository $userRepo)
    {
        return true;
    }

    public function __construct(AttachmentRepository $attachments, SettingsRepository $settings, Filesystem $filesystem)
    {
        $this->attachments = $attachments;
        $this->settings = $settings;
        $this->filesystem = $filesystem;
    }

    public function main()
    {
        $page = $this->inPut('page');
        $isAttachment = $this->inPut('isAttachment') ? $this->inPut('isAttachment') : 0;

        $user = $this->user;

        $attachment = $this->getAttachment($user);

        if ($attachment->is_remote) {
            $httpClient = new HttpClient();
            $url = $this->filesystem->disk('attachment_cos')->temporaryUrl($attachment->full_path, Carbon::now()->addDay());
            if ($page) {
                $url .= '&ci-process=doc-preview&page='.$page;
            }
            try {
                $response = $httpClient->get($url);
            } catch (Exception $e) {
                if (Str::contains($e->getMessage(), 'FunctionNotEnabled')) {
                    $this->outPut(ResponseCode::INVALID_PARAMETER, 'qcloud_file_preview_unset');
                } else {
                    $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, 'model_not_found');
                }
            }
            if ($response->getStatusCode() == 200) {
                if ($page) {
                    //??????
                    $data = [
                        'X-Total-Page' => $response->getHeader('X-Total-Page')[0],
                        'image' => 'data:image/jpeg;base64,'.base64_encode($response->getBody())
                    ];
                    $this->outPut(ResponseCode::SUCCESS, '', $data);
                } else {
                    //??????
                    if ($isAttachment) {
                        $header = [
                            'Content-Disposition' => 'attachment;filename=' . $attachment->file_name,
                        ];
                    } else {
                        $header = [
                            'Content-Type' => $attachment->file_type,
                            'Content-Disposition' => 'inline;filename=' . $attachment->file_name,
                        ];
                    }
                    $this->downloadFile($response->getBody(), $attachment->file_name, $header);
                }
            } else {
                $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, 'model_not_found');
            }
        } else {
            $filePath = storage_path('app/' . $attachment->full_path);

            // ????????????????????????
            if ($attachment->type == Attachment::TYPE_OF_IMAGE) {
                // ????????????????????????
                if (Arr::get($this->request->getQueryParams(), 'thumb') === 'true') {
                    $thumb = Str::replaceLast('.', '_thumb.', $filePath);

                    // ?????????????????????
                    if (! file_exists($thumb)) {
                        $img = (new ImageManager())->make($filePath);

                        $img->resize(Attachment::FIX_WIDTH, Attachment::FIX_WIDTH, function ($constraint) {
                            $constraint->aspectRatio();     // ???????????????
                            $constraint->upsize();          // ??????????????????
                        })->save($thumb);
                    }

                    $filePath = $thumb;
                }
                $this->downloadFile($filePath);
            }
            $this->downloadFile($filePath, $attachment->file_name);
        }
    }

    protected function getAttachment($actor)
    {
        $attachment = $this->attachment;

        $post = $attachment->post;

        Thread::setStateUser($actor);

        $thread = $post->thread;

        // ??????????????????
        if ($thread->price > 0 && ! $thread->is_paid) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, trans('order.order_post_not_found'));
        }

        // ????????????????????????
        if ($thread->attachment_price > 0 && ! $thread->is_paid_attachment) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, trans('order.order_post_not_found'));
        }

        return $attachment;
    }

    protected function downloadFile($filePath, $fileName='', $header = [], $readBuffer = 1024, $allowExt = ['jpeg', 'jpg', 'peg', 'gif', 'zip'])
    {
        //?????????????????????????????? ????????????
        if (!is_file($filePath) && !is_readable($filePath)) {
            $this->outPut(ResponseCode::RESOURCE_NOT_FOUND, '');
        }
        //????????????????????????????????????
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        if (!in_array($ext, $allowExt)) {
            $this->outPut(ResponseCode::UNAUTHORIZED, '');
        }
        //???????????????????????????
        if (!$fileName) {
            $fileName = basename($filePath);
        }
        //???????????????
        //????????????????????????????????????
        $contentType = isset($header['Content-Type']) ? $header['Content-Type'] : 'application/octet-stream';
        header('Content-Type: ' . $contentType);
        //???????????????????????????????????????????????????
        header('Accept-Ranges:bytes');
        //?????????????????????????????????
        $fileSize = filesize($filePath);//??? filesize ????????????2G ?????????php???????????????
        header('Content-Length:' . $fileSize); //?????????'Content-Length:' ???Accept-Length
        $contentDisposition = isset($header['Content-Disposition']) ? $header['Content-Disposition'] : 'attachment;filename=' . $fileName;
        //???????????????????????????
        header('Content-Disposition:' . $contentDisposition);//???????????????????????????????????????????????????
        //??????????????????
        $handle = fopen($filePath, 'rb');//?????????????????????rb???????????????

        while (!feof($handle)) { //????????????????????? ??????????????????????????????????????????$readBuffer?????????????????????
            echo fread($handle, $readBuffer);
        }
        fclose($handle);//??????????????????
        exit;
    }
}
