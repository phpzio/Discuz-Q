(window.webpackJsonp=window.webpackJsonp||[]).push([[49,101],{"+d9Z":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=a("YEIV"),o=(s=i)&&s.__esModule?s:{default:s};e.default={data:function(){var t;return t={thread:{},sitePrice:"",loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,offset:100},(0,o.default)(t,"thread",!1),(0,o.default)(t,"sitePrice",""),(0,o.default)(t,"themeCon",[]),(0,o.default)(t,"limitList",""),(0,o.default)(t,"allowRegister",""),t},computed:{themeId:function(){return this.$route.params.themeId},groupId:function(){return this.$route.params.groupId}},created:function(){this.myThread(),this.getInfo()},methods:{getInfo:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);t.siteInfo=e.readdata,e.readdata._data.set_site.site_author?t.siteUsername=e.readdata._data.set_site.site_author.username:t.siteUsername="暂无站长信息",t.sitePrice=e.readdata._data.set_site.site_price,t.allowRegister=e.readdata._data.set_reg.register_close})),this.appFetch({url:"groups",method:"get",splice:"/"+this.groupId,data:{include:["permission"]}}).then((function(e){if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);if(e.errors)throw t.$toast.fail(e.errors[0].code),new Error(e.error);console.log("000000"),console.log(e),t.limitList=e.readdata}))},myThread:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.appFetch({url:"threads",method:"get",splice:"/"+this.themeId,data:{include:["user","posts","posts.user","firstPost"]}}).then((function(a){if(a.errors)throw t.$toast.fail(a.errors[0].code),new Error(a.error);e&&(t.thread=[]),console.log("123"),console.log(a),t.thread=a.readdata,console.log(t.thread._data.createdAt),console.log("567")}))},loginJump:function(){this.$router.push({path:"/login-user"})},registerJump:function(){this.$router.push({path:"/sign-up"})},onRefresh:function(){var t=this;this.pageIndex=1,this.myThread(!0).then((function(){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}},mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(t,e,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},"3Umv":function(t,e,a){"use strict";a.r(e);var s=a("cSWr"),i=a.n(s);for(var o in s)"default"!==o&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e.default=i.a},Jgvg:function(t,e,a){"use strict";a.r(e);var s=a("pvnC"),i=a.n(s);for(var o in s)"default"!==o&&function(t){a.d(e,t,(function(){return s[t]}))}(o);e.default=i.a},QiNT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=n(a("YEIV")),o=(a("ULRk"),n(a("VVfg"))),r=n(a("6NK7"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){var t;return t={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:""},(0,i.default)(t,"isfixNav",!1),(0,i.default)(t,"popupShow",!1),(0,i.default)(t,"current",0),(0,i.default)(t,"userDet",[]),(0,i.default)(t,"categories",[]),(0,i.default)(t,"siteInfo",!1),(0,i.default)(t,"username",""),(0,i.default)(t,"isPayVal",""),(0,i.default)(t,"isWeixin",!1),(0,i.default)(t,"isPhone",!1),(0,i.default)(t,"firstCategoriesId",""),(0,i.default)(t,"logo",!1),(0,i.default)(t,"viewportWidth",""),(0,i.default)(t,"userId",""),(0,i.default)(t,"followDet",""),(0,i.default)(t,"followFlag",""),(0,i.default)(t,"intiFollowVal","0"),(0,i.default)(t,"noticeSum",0),t},props:{userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1},followShow:{logoShow:!1}},computed:{personUserId:function(){return this.$route.params.userId}},created:function(){this.userId=o.default.getLItem("tokenId"),console.log(this.userId,"登录用户id"),console.log(this.personUserId,"用户主页获取到的参数id"),this.viewportWidth=window.innerWidth,this.isWeixin=r.default.isWeixin().isWeixin,this.isPhone=r.default.isWeixin().isPhone,this.loadCategories(),this.followShow&&this.loadUserInfo(),this.loadUserInfo()},watch:{isfixNav:function(t,e){this.isfixNav=t}},methods:(s={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var t=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(t-640)/2+"px"},loadCategories:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){console.log(e.readdata._data.other),console.log("-------------------"),t.siteInfo=e.readdata,e.readdata._data.set_site.site_logo&&(t.logo=e.readdata._data.set_site.site_logo),t.isPayVal=e.readdata._data.set_site.site_mode})),this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(e){console.log("2222"),console.log(e),t.categories=e.readdata,t.firstCategoriesId=e.readdata[0]._data.id,console.log(t.firstCategoriesId),t.$emit("update",t.firstCategoriesId),console.log("3456")}))},loadUserInfo:function(){var t=this;this.appFetch({url:"users",method:"get",splice:"/"+this.userId,data:{}}).then((function(e){console.log(e,"00000000000&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&——————————————————————————————————————————"),console.log(e.readdata),e.data.attributes.typeUnreadNotifications.liked||(e.data.attributes.typeUnreadNotifications.liked=0),e.data.attributes.typeUnreadNotifications.replied||(e.data.attributes.typeUnreadNotifications.replied=0),e.data.attributes.typeUnreadNotifications.rewarded||(e.data.attributes.typeUnreadNotifications.rewarded=0),e.data.attributes.typeUnreadNotifications.system||(e.data.attributes.typeUnreadNotifications.system=0),t.noticeSum=e.data.attributes.typeUnreadNotifications.liked+e.data.attributes.typeUnreadNotifications.replied+e.data.attributes.typeUnreadNotifications.rewarded+e.data.attributes.typeUnreadNotifications.system,console.log(e.data.attributes.typeUnreadNotifications.liked,e.data.attributes.typeUnreadNotifications.replied,e.data.attributes.typeUnreadNotifications.rewarded,e.data.attributes.typeUnreadNotifications.system,"和"),t.followDet=e.readdata,"1"==e.readdata._data.follow?t.followFlag="已关注":"0"==e.readdata._data.follow&&(t.followFlag="关注TA")}))},followCli:function(t){console.log("参数",t);var e=new Object,a="";"0"==t?(console.log("未关注"),e.to_user_id=this.personUserId,a="post",this.intiFollowVal="1",console.log(this.intiFollowVal,"修改")):(console.log("已关注"),e.from_user_id=this.userId,e.to_user_id=this.personUserId,a="delete",this.intiFollowVal="0"),console.log(e,"33333333-----"),this.followRequest(a,e)},followRequest:function(t,e){var a=this;this.appFetch({url:"follow",method:t,data:{data:{type:"user_follow",attributes:e}}}).then((function(e){if(console.log(e,"987654"),e.errors)throw a.$toast.fail(e.errors[0].code),new Error(e.error);a.followFlag="delete"==t?"关注TA":"已关注"}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(t){this.$emit("categoriesChoice",t)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,i.default)(s,"backUrl",(function(){window.history.go(-1)})),(0,i.default)(s,"LogOut",(function(){console.log("测试")})),(0,i.default)(s,"bindEvent",(function(t){1==t&&this.LogOut()})),s),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},destroyed:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(t,e,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},RIP2:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("van-popup",{staticClass:"sidebarWrap",style:{height:"100%",right:t.isPhone||t.isWeixin?"0":(t.viewportWidth-640)/2+"px"},attrs:{position:"right"},model:{value:t.popupShow,callback:function(e){t.popupShow=e},expression:"popupShow"}},[a("sidebar",{attrs:{isPayVal:t.isPayVal}})],1),t._v(" "),t.$route.meta.oneHeader?a("div",{staticClass:"headerBox"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet aaa"},[t.userInfoAvatarUrl?a("img",{staticClass:"inviteHead",attrs:{src:t.userInfoAvatarUrl,alt:""}}):a("img",{staticClass:"inviteHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),t._v(" "),t.invitePerDet&&t.userInfoName?a("div",{staticClass:"inviteName",model:{value:t.userInfoName,callback:function(e){t.userInfoName=e},expression:"userInfoName"}},[t._v(t._s(t.userInfoName))]):a("div",{staticClass:"inviteName"},[t._v("该用户已被删除")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[t._v("邀请您加入")]),t._v(" "),t.followShow?a("div",{staticClass:"followBox"},[a("span",[t._v("关注："+t._s(t.followDet._data.followCount))]),t._v(" "),a("span",[t._v("被关注："+t._s(t.followDet._data.fansCount))]),t._v(" "),t.userId!=t.personUserId?a("a",{staticClass:"followOne",attrs:{href:"javascript:;",id:"followCli"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v(t._s(t.followFlag))]):t._e()]):t._e()]),t._v(" "),t.searchIconShow||t.menuIconShow?t._e():a("div",{staticClass:"headeGap"}),t._v(" "),t.searchIconShow||t.menuIconShow?a("div",{staticClass:"headOpe"},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:t.searchJump}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape relative",attrs:{"is-link":""},on:{click:t.showPopup}},[t.noticeSum>0?a("i",{staticClass:"noticeNew"}):t._e()])]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.logoShow,expression:"logoShow"}],staticClass:"logoBox"},[t.logo?a("img",{staticClass:"logo",attrs:{src:t.logo}}):a("img",{staticClass:"logo",attrs:{src:t.appConfig.staticBaseUrl+"/images/logo.png"}})]),t._v(" "),t.siteInfo?a("div",{directives:[{name:"show",rawName:"v-show",value:t.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[a("span",[t._v("主题："+t._s(t.siteInfo._data.other.count_threads))]),t._v(" "),a("span",[t._v("成员："+t._s(t.siteInfo._data.other.count_users))]),t._v(" "),t.siteInfo._data.set_site.site_author?a("span",[t._v("站长："+t._s(t.siteInfo._data.set_site.site_author.username))]):a("span",[t._v("站长：无")])]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:t.isfixNav},attrs:{id:"testNavBar"}},[a("van-tabs",{model:{value:t.navActi,callback:function(e){t.navActi=e},expression:"navActi"}},[a("van-tab",[a("span",{attrs:{slot:"title"},on:{click:function(e){return t.categoriesCho(0)}},slot:"title"},[t._v("\n              全部\n          ")])]),t._v(" "),t._l(t.categories,(function(e,s){return a("van-tab",{key:s},[a("span",{attrs:{slot:"title"},on:{click:function(a){return t.categoriesCho(e._data.id)}},slot:"title"},[t._v("\n              "+t._s(e._data.name)+"\n          ")])])}))],2)],1)]):t._e()],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))},cSWr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a("QbLZ")),i=n(a("+d9Z")),o=n(a("QiNT")),r=n(a("omtG"));function n(t){return t&&t.__esModule?t:{default:t}}e.default=(0,s.default)({name:"payCircleView",components:{Header:r.default}},o.default,i.default)},lifp:function(t,e,a){"use strict";a.r(e);var s=a("sj6B"),i=a("3Umv");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var r=a("KHd+"),n=Object(r.a)(i.default,s.a,s.b,!1,null,null,null);e.default=n.exports},omtG:function(t,e,a){"use strict";a.r(e);var s=a("RIP2"),i=a("Jgvg");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var r=a("KHd+"),n=Object(r.a)(i.default,s.a,s.b,!1,null,null,null);e.default=n.exports},pvnC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r(a("QbLZ")),i=r(a("QiNT")),o=r(a("IsPG"));function r(t){return t&&t.__esModule?t:{default:t}}a("iUmJ"),e.default=(0,s.default)({name:"headerView",components:{Sidebar:o.default}},i.default)},sj6B:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"circleCon"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("Header"),t._v(" "),t.thread?a("div",{staticClass:"circleCon"},[a("Header",{attrs:{logoShow:!0,perDetShow:!0,invitePerDet:!1,invitationShow:!1}}),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"cirPostCon"},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[t.thread.user&&t.thread.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:t.thread.user._data.avatarUrl,alt:""}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("div",{staticClass:"perDet"},[t.thread.user?a("div",{staticClass:"perName"},[t._v(t._s(t.thread.user._data.username))]):a("div",{staticClass:"perName"},[t._v("该用户已被删除")]),t._v(" "),t.thread._data.createdAt?a("div",{staticClass:"postTime"},[t._v(t._s(t.thread._data.createdAt))]):t._e()])])]),t._v(" "),a("div",{staticClass:"postContent"},[t.thread.firstPost._data.content?a("a",{attrs:{href:"javascript:;"},domProps:{innerHTML:t._s(t.thread.firstPost._data.content)}}):t._e()])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"loginOpera"},[a("a",{staticClass:"mustLogin",attrs:{href:"javascript:;"},on:{click:t.loginJump}},[t._v("已注册，登录")]),t._v(" "),t.allowRegister?a("a",{staticClass:"regiJoin",attrs:{href:"javascript:;"},on:{click:t.registerJump}},[t._v("立即注册并加入")]):t._e(),t._v(" "),a("p",{staticClass:"payMoney"},[t._v("￥"+t._s(t.sitePrice)+" / 永久有效")])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),t.limitList?a("div",{staticClass:"powerListBox"},[a("div",{staticClass:"powerTit"},[t._v("作为"+t._s(t.limitList._data.name)+"，您将获得以下权限")]),t._v(" "),a("div",{staticClass:"powerList"},[a("div",{staticClass:"powerClassify"},[t._v("权限列表")]),t._v(" "),t._l(t.limitList.permission,(function(e,s){return a("div",{},[e._data.permission&&"viewThreads"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看主题列表")]):t._e(),t._v(" "),e._data.permission&&"thread.viewPosts"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看主题")]):t._e(),t._v(" "),e._data.permission&&"createThread"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("发表主题")]):t._e(),t._v(" "),e._data.permission&&"thread.reply"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("回复主题")]):t._e(),t._v(" "),e._data.permission&&"attachment.create.0"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("上传附件")]):t._e(),t._v(" "),e._data.permission&&"attachment.create.1"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("上传图片")]):t._e(),t._v(" "),e._data.permission&&"attachment.view.0"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看附件")]):t._e(),t._v(" "),e._data.permission&&"attachment.view.1"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看图片")]):t._e(),t._v(" "),e._data.permission&&"viewUserList"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("站点会员列表")]):t._e(),t._v(" "),e._data.permission&&"attachment.delete"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除附件")]):t._e(),t._v(" "),e._data.permission&&"cash.create"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("申请提现")]):t._e(),t._v(" "),e._data.permission&&"order.create"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("创建订单")]):t._e(),t._v(" "),e._data.permission&&"thread.hide"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除主题")]):t._e(),t._v(" "),e._data.permission&&"thread.hidePosts"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除回复")]):t._e(),t._v(" "),e._data.permission&&"thread.favorite"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("帖子收藏")]):t._e(),t._v(" "),e._data.permission&&"thread.likePosts"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("帖子点赞")]):t._e(),t._v(" "),e._data.permission&&"user.view"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看某个用户信息权限")]):t._e(),t._v(" "),e._data.permission&&"viewSiteInfo"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("站点信息")]):t._e(),t._v(" "),e._data.permission&&"user.edit"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑用户状态")]):t._e(),t._v(" "),e._data.permission&&"group.edit"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑用户组")]):t._e(),t._v(" "),e._data.permission&&"createInvite"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("管理-邀请加入")]):t._e(),t._v(" "),e._data.permission&&"thread.batchEdit"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("批量管理主题")]):t._e(),t._v(" "),e._data.permission&&"thread.editPosts"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑")]):t._e(),t._v(" "),e._data.permission&&"thread.essence"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("加精")]):t._e(),t._v(" "),e._data.permission&&"thread.sticky"==e._data.permission?a("p",{staticClass:"powerChi"},[t._v("置顶")]):t._e()])}))],2)]):t._e()],1):t._e()],1)],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))}}]);