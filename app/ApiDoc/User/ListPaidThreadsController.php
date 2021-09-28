<?php
/**
 * @OA\Get(
 *     path="/api/v3/threads.paid",
 *     summary="查询已经购买帖子列表(已弃用)",
 *     description="查询已经购买帖子列表",
 *     tags={"个人中心"},
 *     @OA\Parameter(ref="#/components/parameters/bear_token"),
 *     @OA\Parameter(name="page",
 *          in="query",
 *          required=false,
 *          description = "页码",
 *          @OA\Schema(type="integer")
 *      ),
 *     @OA\Parameter(name="perPage",
 *          in="query",
 *          required=false,
 *          description = "每页数据条数,不传则默认20，最大值50",
 *          @OA\Schema(type="integer")
 *      ),
 *     @OA\Response(
 *          response=200,
 *          description="返回更新结果",
 *          @OA\JsonContent(
 *              allOf={
 *                  @OA\Schema(ref="#/components/schemas/dzq_layout"),
 *                  @OA\Schema(@OA\Property(property="Data",type="object",
 *                      @OA\Property(property="pageData",type="array",
 *                          @OA\Items(type="object",
 *                              @OA\Property(property="thread",type="object",description = "主题",
 *                                  @OA\Property(property="id",type="integer",description = "主题id"),
 *                                  @OA\Property(property="userId",type="integer",description = "用户id"),
 *                                  @OA\Property(property="lastPostedUserId",type="integer",description = "最近评论用户id"),
 *                                  @OA\Property(property="categoryId",type="integer",description = "分类id"),
 *                                  @OA\Property(property="type",type="integer",enum={0,1,2,3},description = "类型：0普通 1长文 2视频 3图片"),
 *                                  @OA\Property(property="title",type="string",description = "标题"),
 *                                  @OA\Property(property="price",type="string",description = "价格"),
 *                                  @OA\Property(property="attachmentPrice",type="string",description = "附件价格"),
 *                                  @OA\Property(property="freeWords",type="integer",description = "免费看着个数"),
 *                                  @OA\Property(property="postCount",type="integer",description = "评论次数"),
 *                                  @OA\Property(property="viewCount",type="integer",description = "阅读次数"),
 *                                  @OA\Property(property="rewardedCount",type="integer",description = "打赏数"),
 *                                  @OA\Property(property="paidCount",type="integer",description = "付费次数"),
 *                                  @OA\Property(property="shareCount",type="integer",description = "分享次数"),
 *                                  @OA\Property(property="longitude",type="string",description = "经度"),
 *                                  @OA\Property(property="latitude",type="string",description = "纬度"),
 *                                  @OA\Property(property="address",type="string",description = "地址"),
 *                                  @OA\Property(property="location",type="string",description = "位置"),
 *                                  @OA\Property(property="postedAt",type="string",format="datetime",default="2021-01-02 02:22:22",description = "最新评论时间"),
 *                                  @OA\Property(property="createdAt",type="string",format="datetime",default="2021-01-02 02:22:22",description = "创建时间"),
 *                                  @OA\Property(property="updatedAt",type="string",format="datetime",default="2021-01-02 02:22:22",description = "更新时间"),
 *                                  @OA\Property(property="deletedAt",type="string",format="datetime",default="2021-01-02 02:22:22",description = "删除时间"),
 *                                  @OA\Property(property="deletedUserId",type="integer",description = "删除者"),
 *                                  @OA\Property(property="isApproved",type="integer",description = "是否合法"),
 *                                  @OA\Property(property="isSticky",type="boolean",description = "是否置顶"),
 *                                  @OA\Property(property="isEssence",type="boolean",description = "是否加精"),
 *                                  @OA\Property(property="isSite",type="integer",description = "是否推荐到首页（0否 1是）"),
 *                                  @OA\Property(property="isAnonymous",type="boolean",description = "是否匿名 0否 1是"),
 *                                  @OA\Property(property="isDisplay",type="boolean",description = "是否显示 0否 1是"),
 *                                  @OA\Property(property="isRedPacket",type="integer",description = "是否添加红包，0未添加，1添加"),
 *                                  @OA\Property(property="isDraft",type="integer",description = "是否为草稿，0不是，1是"),
 *                                  @OA\Property(property="source",type="integer",description = "来源"),
 *                              ),
 *                              @OA\Property(property="post",type="object",description = "回复",
 *                                  @OA\Property(property="id",type="integer",description = "回复 id"),
 *                                  @OA\Property(property="userId",type="integer",description = "发表用户 id"),
 *                                  @OA\Property(property="threadId",type="integer",description = "关联主题 id"),
 *                                  @OA\Property(property="replyPostId",type="integer",description = "回复 id"),
 *                                  @OA\Property(property="replyUserId",type="integer",description = "回复用户 id"),
 *                                  @OA\Property(property="commentPostId",type="string",description = "评论回复 id"),
 *                                  @OA\Property(property="commentUserId",type="string",description = "评论回复用户 id"),
 *                                  @OA\Property(property="content",type="string",description = "内容"),
 *                                  @OA\Property(property="replyCount",type="integer",description = "关联回复数"),
 *                                  @OA\Property(property="likeCount",type="integer",description = "点赞数"),
 *                                  @OA\Property(property="isFirst",type="boolean",description = "是否首个回复"),
 *                                  @OA\Property(property="isComment",type="boolean",description = "是否是回复回帖的内容"),
 *                                  @OA\Property(property="isApproved",type="integer",description = "是否合法"),
 *                                  @OA\Property(property="canLike",type="boolean",description = "是否点赞"),
 *                              ),
 *                              @OA\Property(property="user",type="object",description = "用户信息",
 *                                  @OA\Property(property="pid",type="integer",description = "用户id"),
 *                                  @OA\Property(property="userName",type="string",description = "用户昵称"),
 *                                  @OA\Property(property="avatar",type="string",description = "用户头像"),
 *                                  @OA\Property(property="threadCount",type="integer",description = "主题数"),
 *                                  @OA\Property(property="followCount",type="integer",description = "关注数"),
 *                                  @OA\Property(property="fansCount",type="integer",description = "粉丝数"),
 *                                  @OA\Property(property="likedCount",type="integer",description = "点赞数"),
 *                                  @OA\Property(property="questionCount",type="integer",description = "提问数"),
 *                                  @OA\Property(property="isRealName",type="boolean",description = "是否实名"),
 *                              ),
 *                          ),
 *                      ),
 *                      @OA\Property(property="currentPage",type="integer",description="当前页"),
 *                      @OA\Property(property="perPage",type="integer",description="前端请求的预期每页显示条数"),
 *                      @OA\Property(property="firstPageUrl",type="string",description="第一页url"),
 *                      @OA\Property(property="nextPageUrl",type="string",description="下一页url"),
 *                      @OA\Property(property="prePageUrl",type="string",description="上一页url"),
 *                      @OA\Property(property="pageLength",type="integer",description="每页条数"),
 *                      @OA\Property(property="totalCount",type="integer",description="全部条数"),
 *                      @OA\Property(property="totalPage",type="integer",description="全部页数"),
 *                  )),
 *
 *          }))
 * )
 */