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

namespace App\Repositories;

use App\Api\Controller\Threads\ThreadTrait;
use App\Common\PermissionKey;
use App\Common\ResponseCode;
use App\Models\Attachment;
use App\Models\Group;
use App\Models\GroupUser;
use App\Models\Order;
use App\Models\Thread;
use App\Models\User;
use App\Settings\SettingsRepository;
use Carbon\Carbon;
use Discuz\Common\Utils;
use Discuz\Foundation\AbstractRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;

class UserRepository extends AbstractRepository
{
    use ThreadTrait;
    /**
     * Get a new query builder for the users table.
     *
     * @return Builder
     */
    public function query()
    {
        return User::query();
    }

    /**
     * Find a user by ID, optionally making sure it is visible to a certain
     * user, or throw an exception.
     *
     * @param int $id
     * @param User $actor
     * @return Builder|\Illuminate\Database\Eloquent\Model|User
     *
     * @throws ModelNotFoundException
     */
    public function findOrFail($id, User $actor = null)
    {
        $query = User::where('id', $id);

        return $this->scopeVisibleTo($query, $actor)->firstOrFail();
    }

    /**
     * Find a user by an identification (username or phone number).
     *
     * @param array $param
     * @return User|null
     */
    public function findByIdentification($param)
    {
        return User::where($param)->first();
    }

    /**
     * ?????? XXX || categoryX.XXX ?????????
     *
     * @param User $user
     * @param string $ability
     * @param null $categoryId
     * @return bool
     */
    private function checkCategoryPermission(User $user, string $ability, $categoryId = null)
    {
        $abilities = [$ability];

        if ($categoryId) {
            $abilities[] = 'category'.$categoryId.'.'.$ability;
        }

        return $user->hasPermission($abilities, false);
    }

    /**
     * ????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canCreateThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::CREATE_THREAD, $categoryId);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @return bool
     */
    public function canInsertImageToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_IMAGE);
    }

    /**
     * ????????????????????????
     */
    public function canInsertVoteToThread(User $user){
        return  $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_VOTE);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @return bool
     */
    public function canInsertVideoToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_VIDEO);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertAudioToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_AUDIO);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertAttachmentToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_ATTACHMENT);
    }

    public function canDeleteAttachment(User $user, $attachment)
    {
        if ($attachment->user_id == $user->id || $user->isAdmin()) {
            return true;
        }

        // ??????????????????????????????????????????????????????
        $postAttachmentTypes = [
            Attachment::TYPE_OF_FILE,
            Attachment::TYPE_OF_IMAGE,
            Attachment::TYPE_OF_AUDIO,
            Attachment::TYPE_OF_VIDEO,
        ];
        return true;

        // if (in_array($attachment->type, $postAttachmentTypes) && $this->canEditPost($user, $attachment->post)) {
        //     return true;
        // }
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertGoodsToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_GOODS);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertPayToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_PAY);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertRewardToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_REWARD);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertRedPacketToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_RED_PACKET);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canInsertPositionToThread(User $user)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_INSERT_POSITION);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canCreateThreadAnonymous(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_ALLOW_ANONYMOUS, $categoryId);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canViewThreads(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::VIEW_THREADS, $categoryId);
    }

    /**
     * ??????????????????????????????
     *
     * @param User $user
     * @param array|Thread $thread
     * @return bool
     */
    public function canFreeViewPosts(User $user, $thread)
    {
        // ???????????????????????????????????????
        return ($user->id == $thread['user_id'])
            || $this->checkCategoryPermission($user, PermissionKey::THREAD_FREE_VIEW_POSTS, $thread['category_id']);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @return bool
     */
    public function canFavoriteThread(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_FAVORITE);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @return bool
     */
    public function canLikePosts(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_LIKE_POSTS);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param null $categoryId
     * @return bool
     */
    public function canEssenceThread(User $user, $thread)
    {
        if (!$thread) {
            return false;
        }
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_ESSENCE, $thread['category_id']);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @return bool
     */
    public function canStickThread(User $user)
    {
        return $user->hasPermission(PermissionKey::THREAD_STICKY);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canEditThread(User $user, $thread)
    {
        if (!$thread) {
            return false;
        }

        if ($thread['is_draft'] == Thread::BOOL_YES) {
            if ($thread['user_id'] == $user->id) {
                return true;
            }
            if ($thread['is_approved'] == Thread::BOOL_NO && $user->isAdmin()) {
                return true;
            }
        } else {
            if ($user->isAdmin()) {
                return true;
            }
            if ($thread['user_id'] == $user->id) {
                if ($this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT_OWN, $thread['category_id']) ||
                    $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT, $thread['category_id'])) {
                    return true;
                }
            } else {
                return $thread['is_approved'] == Thread::BOOL_YES && $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT, $thread['category_id']);
            }
        }

        return false;
    }

    /**
     * ????????????????????????(??????)
     *
     * @param User $user
     * @param $categoryId
     * @return bool
     */
    public function canEditMyThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT_OWN, $categoryId);
    }

     /**
     * ????????????????????????(??????+??????)
     *
     * @param User $user
     * @param $categoryId
     * @return bool
     */
    public function canEditOthersThread(User $user, $categoryId = null)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_EDIT, $categoryId);
    }

    /**
     * ????????????????????????
     *
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canHideThread(User $user, $thread)
    {
        if (!$thread) {
            return false;
        }

        // ?????????????????????
        if (Arr::get($thread, 'is_draft') && (Arr::get($thread, 'user_id') == $user->id)) {
            return true;
        }

        return ($user->id === $thread['user_id'] && $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_OWN, $thread['category_id']))
            || $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE, $thread['category_id']);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param $categoryId
     * @return bool
     */
    public function canReplyThread(User $user, $categoryId)
    {
        return $this->checkCategoryPermission($user, PermissionKey::THREAD_REPLY, $categoryId);
    }

    public function canViewThreadDetail(User $user, $thread)
    {
        if (!$thread) {
            return false;
        }

        // ????????????????????????????????????????????????
        if (Arr::get($thread, 'is_approved') == Thread::UNAPPROVED) {
            return $thread['user_id'] == $user->id || $user->isAdmin();
        }

        // ?????????????????????????????????????????????????????????
        if ($thread['user_id'] == $user->id
            && (!Arr::get($thread, 'deleted_at') || Arr::get($thread, 'deleted_user_id') == $user->id)
        ) {
            return true;
        }

        // ?????????????????????
        if (Arr::get($thread, 'is_draft')) {
            return $thread['user_id'] == $user->id;
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_VIEW_POSTS, $thread['category_id']);
    }

    public function canViewListWallet(User $user)
    {
        return $user->hasPermission(PermissionKey::WALLET_VIEW_LIST);
    }

    public function canViewListLogs(User $user)
    {
        return $user->hasPermission(PermissionKey::WALLET_LOGS_VIEW_LIST);
    }

    public function canViewListCash(User $user)
    {
        return $user->hasPermission(PermissionKey::CASH_VIEW_LIST);
    }

    /**
     * ??????????????????
     *
     * @param User $user
     * @param $post
     * @return bool
     */
    public function canHidePost(User $user, $post)
    {
        if (!$post) {
            return false;
        }
        // ????????????????????????
        if ($post->is_first) {
            return $this->canEditThread($user, $post->thread);
        }

        // ????????????????????????????????????????????????????????????
        if ($post->user_id == $user->id && $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_OWN, $post->thread->category_id)) {
            return true;
        }

        return $this->checkCategoryPermission($user, PermissionKey::THREAD_HIDE_POSTS, $post->thread->category_id);
    }

    /**
     * ?????????????????????
     *
     * @param User $user
     * @param array $ids
     * @return bool
     */
    public function canDeleteGroup(User $user, $ids)
    {
        $groups = [
            Group::ADMINISTRATOR_ID,
            Group::BAN_ID,
            Group::UNPAID,
            Group::GUEST_ID,
            Group::MEMBER_ID,
        ];

        $disabled = array_intersect($groups, $ids);

        return empty($disabled) && $user->isAdmin();
    }

    public function canCreateGroup(User $user)
    {
        return $user->isAdmin();
    }

    public function canEditGroup(User $user)
    {
        return $user->isAdmin();
    }

    public function canListGroup(User $user)
    {
        return $user->isAdmin();
    }

    public function canCreateInviteUserScale(User $user)
    {
        return $user->hasPermission(PermissionKey::CREATE_INVITE_USER_SCALE);
    }


    public function canCreateInviteAdminUserScale(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * ????????????
     *
     * @param User $user
     * @return bool
     */
    public function canCreateOrder(User $user)
    {
        return $user->hasPermission(PermissionKey::ORDER_CREATE);
    }

    public function canPayOrder(User $user)
    {
        return $user->hasPermission(PermissionKey::TRADE_PAY_ORDER);
    }

    public function canCreateStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canDeleteStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canExportStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canViewStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canEditStopWord(User $user)
    {
        return $user->isAdmin();
    }

    public function canWalletPay(User $user)
    {
        return $user->status == 0 && $user->pay_password;
    }

    public function canCreateDialog(User $user)
    {
        return $user->hasPermission(PermissionKey::DIALOG_CREATE);
    }

    public function canCreateCash(User $user)
    {
        return $user->hasPermission(PermissionKey::CASH_CREATE);
    }

    public function canViewUser(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_VIEW);
    }

    public function canFollowUser(User $user)
    {
        return $user->hasPermission(PermissionKey::USER_FOLLOW_CREATE);
    }

    /**
     * ?????????????????????????????????
     */
    public function canCreateThreadWithCaptcha(User $user)
    {
        if ($user->isAdmin()) {
            return false;
        } else {
            return $user->hasPermission(PermissionKey::CREATE_THREAD_WITH_CAPTCHA);
        }
    }

    /**
     * ????????????????????????????????????
     */
    public function canCreateThreadNeedBindPhone(User $user)
    {
        if ($user->isAdmin()) {
            return false;
        } else {
            return $user->hasPermission(PermissionKey::PUBLISH_NEED_BIND_PHONE);
        }
    }

    /**
     * ????????????????????????????????????
     */
    public function canCreateThreadNeedBindWechat(User $user)
    {
        if ($user->isAdmin()) {
            return false;
        } else {
            return $user->hasPermission(PermissionKey::PUBLISH_NEED_BIND_WECHAT);
        }
    }

    /**
     * ??????????????????????????????
     */
    public function checkPublishPermission(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }

        $settings   = app(SettingsRepository::class);
        $wechat     = (bool)$settings->get('offiaccount_close', 'wx_offiaccount');
        $miniWechat = (bool)$settings->get('miniprogram_close', 'wx_miniprogram');
        $sms        = (bool)$settings->get('qcloud_sms', 'qcloud');
        if ($user->hasPermission(PermissionKey::PUBLISH_NEED_BIND_WECHAT) && ($wechat || $miniWechat)) {
            if (empty($user->wechat)) {
                Utils::outPut(ResponseCode::NEED_BIND_WECHAT, '??????????????????');
            }
        }

        if ($user->hasPermission(PermissionKey::PUBLISH_NEED_BIND_PHONE) && $sms) {
            if (empty($user->mobile)) {
                Utils::outPut(ResponseCode::NEED_BIND_PHONE, '?????????????????????');
            } else {
                if(preg_match("/^1[3-9]\d{9}$/", $user->getRawOriginal('mobile')) !== 1){
                    Utils::outPut(ResponseCode::MOBILE_FORMAT_ERROR);
                }
            }
        }
    }

    /**
     * ???????????????????????????
     */

    public function canCreateAvatar(User $user)
    {
        return $user->isAdmin();
    }
    public function canDeleteAvatar(User $user)
    {
        return $user->isAdmin();
    }



    public function canExportUser(User $user)
    {
        return $user->isAdmin();
    }


    public function canUserWallet(User $user)
    {
        return $user->isAdmin();
    }


    public function canUpdateUserWallet(User $user)
    {
        return $user->isAdmin();
    }


    public function canListUserScren(User $user)
    {
        return $user->isAdmin();
    }


    public function canUserStatus(User $user)
    {
        return $user->isAdmin();
    }

    /**
     * ?????? $user ??????????????????true???????????????false????????????
     * @param User $user
     * @return bool
     */
    public function isPaid(User $user): bool
    {
        $settings = app(SettingsRepository::class);
        $siteMode = $settings->get('site_mode');
        if ($siteMode == 'public'
            || $user->group_id == Group::ADMINISTRATOR_ID
            || $user->isAdmin()
        ) {
            return true;
        }
        if ($user->isGuest()) {
            return false;
        }

        $order = Order::query()->where([
            'status' => Order::ORDER_STATUS_PAID,
            'user_id' => $user->id
        ])  ->whereIn('type', [Order::ORDER_TYPE_REGISTER, Order::ORDER_TYPE_RENEW])
            ->orderByDesc('id')
            ->first();
        $now = time();
        if (!empty($order)
            && ((strtotime($order->expired_at) > $now)
                || (empty($order->expired_at) && empty($user->expired_at)))
        ){
            //????????????????????????????????????????????? users ?????? expired_at ??????????????? ??? group_user ?????? expiration_time ???????????????
            //???????????????????????????????????? user ??? expired_at ?????????????????????????????????
            if(empty($user->expired_at)){
                if(!empty($order->expired_at)){
                    $user->expired_at = $order->expired_at;
                }else{
                    $user->expired_at = Carbon::now()->addDays(365 * 99);
                }
                $user->save();
                $group_user = GroupUser::query()->where('user_id', $user->id)->first();
                if(empty($group_user->expiration_time)){
                    $group_user = $user->expired_at;
                    $group_user->save();
                }
            }
            return true;
        }

        if (!empty($user->expired_at) && strtotime($user->expired_at) > $now) {
            return true;
        }

        return false;
    }

    /**
     * ????????????????????????
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canViewThreadVideo(User $user, $thread):bool
    {
        if (!$thread) {
            return false;
        }

        if ($user->isAdmin()) {
            return true;
        } else {
            if ($thread['user_id'] == $user->id) {
                return true;
            }
            return $user->hasPermission(PermissionKey::THREAD_VIEW_VIDEO);
        }
    }

    /**
     * ????????????????????????
     * @param User $user
     * @param $thread
     * @return bool
     */
    public function canViewThreadAttachment(User $user, $thread):bool
    {
        if (!$thread) {
            return false;
        }

        if ($user->isAdmin()) {
            return true;
        } else {
            if ($thread['user_id'] == $user->id) {
                return true;
            }
            return $user->hasPermission(PermissionKey::THREAD_VIEW_ATTACHMENT);
        }
    }

    /**
     * ????????????????????????
     * @param User $user
     * @param $threadUserId
     * @return bool
     */
    public function canDownloadThreadAttachment(User $user, $threadUserId):bool
    {
        if ($user->isAdmin()) {
            return true;
        } else {
            if ($threadUserId == $user->id) {
                return true;
            }
            return $user->hasPermission(PermissionKey::THREAD_DOWNLOAD_ATTACHMENT);
        }
    }
}
