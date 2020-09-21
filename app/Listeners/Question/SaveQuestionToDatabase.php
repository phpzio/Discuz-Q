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

namespace App\Listeners\Question;

use App\Events\Post\Saved;
use App\Models\Question;
use App\Models\Thread;
use App\Models\UserWalletLog;
use App\Validators\QuestionValidator;
use Carbon\Carbon;
use Discuz\Contracts\Setting\SettingsRepository;
use Exception;
use Illuminate\Contracts\Events\Dispatcher as EventDispatcher;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;

class SaveQuestionToDatabase
{
    /**
     * @var EventDispatcher
     */
    protected $eventDispatcher;

    /**
     * @var QuestionValidator
     */
    protected $questionValidator;

    /**
     * @var ConnectionInterface
     */
    protected $connection;

    /**
     * @var SettingsRepository
     */
    protected $settings;

    public function __construct(EventDispatcher $eventDispatcher, QuestionValidator $questionValidator, ConnectionInterface $connection, SettingsRepository $settings)
    {
        $this->eventDispatcher = $eventDispatcher;
        $this->questionValidator = $questionValidator;
        $this->connection = $connection;
        $this->settings = $settings;
    }

    /**
     * @param Saved $event
     * @throws ValidationException
     * @throws Exception
     */
    public function handle(Saved $event)
    {
        $post = $event->post;
        $actor = $event->actor;
        $data = $event->data;

        if ($post->thread->type == Thread::TYPE_OF_QUESTION) {
            // 判断是否是创建
            if ($post->wasRecentlyCreated) {
                $questionData = Arr::get($data, 'relationships.question.data');
                if (empty($questionData)) {
                    throw new Exception(trans('post.post_question_missing_parameter')); // 问答缺失参数
                }

                /**
                 * Validator
                 * @see QuestionValidator
                 */
                $questionData['actor'] = $actor;
                $this->questionValidator->valid($questionData);
                $price = Arr::get($questionData, 'price');

                // Start Transaction
                $this->connection->beginTransaction();
                try {
                    // Create Question
                    $build = [
                        'thread_id' => $post->thread_id,
                        'user_id' => $actor->id,
                        'be_user_id' => Arr::get($questionData, 'be_user_id'),
                        'price' => $price,
                        'onlooker_unit_price' => $this->settings->get('site_onlooker_price'),
                        'is_onlooker' => $actor->can('canBeOnlooker') ? Arr::get($questionData, 'is_onlooker', true) : false,
                        'is_anonymous' => Arr::get($data, 'attributes.is_anonymous', false),
                        'expired_at' => Carbon::today()->addDays(Question::EXPIRED_DAY),
                    ];
                    $question = Question::build($build);
                    $question->save();

                    /**
                     * Update WalletLog relation question_id
                     * @var UserWalletLog $walletLog
                     */
                    $walletLog = UserWalletLog::query()->where([
                        'user_id' => $actor->id,
                        'order_id' => Arr::get($questionData, 'order_id', null),
                        'change_type' => UserWalletLog::TYPE_EXPEND_QUESTION,
                    ])->first();
                    $walletLog->question_id = $question->id;
                    $walletLog->save();

                    $this->connection->commit();
                } catch (Exception $e) {
                    $this->connection->rollback();
                }

                // TODO Question Send Notice
            }
        }
    }
}
