(window.webpackJsonp=window.webpackJsonp||[]).push([[48,100],{"7xHi":function(t,e,a){"use strict";a.r(e);var i=a("HhFM"),o=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e.default=o.a},HhFM:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(a("QbLZ")),o=r(a("omtG")),s=r(a("QiNT")),n=r(a("LqVO"));function r(t){return t&&t.__esModule?t:{default:t}}e.default=(0,i.default)({name:"circleInviteView",components:{Header:o.default}},s.default,n.default)},Jgvg:function(t,e,a){"use strict";a.r(e);var i=a("pvnC"),o=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e.default=o.a},LqVO:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{isfixNav:!1,loginBtnFix:!0,siteInfo:!1,roleId:"",roleResult:"",finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,allowRegister:""}},created:function(){this.roleId="10",this.loadSite()},methods:{loadSite:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(a){e&&(t.siteInfo=[]),t.siteInfo=a.readdata,t.allowRegister=a.readdata._data.set_reg.register_close})),this.appFetch({url:"groups",method:"get",splice:"/"+this.roleId,data:{}}).then((function(e){t.roleResult=e.readdata._data.name}))},logBtnFix:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.loginBtnFix=!(t>10)},loginJump:function(){this.$router.push({path:"login-user"})},registerJump:function(){this.$router.push({path:"sign-up"})},addClass:function(t,e){this.current=t;e.currentTarget},onRefresh:function(){var t=this;this.pageIndex=1,this.loadSite(!0).then((function(){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}},mounted:function(){window.addEventListener("scroll",this.logBtnFix,!0)},beforeRouteLeave:function(t,e,a){window.removeEventListener("scroll",this.logBtnFix,!0),a()}}},QiNT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,o=r(a("YEIV")),s=(a("ULRk"),r(a("VVfg"))),n=r(a("6NK7"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){var t;return t={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:""},(0,o.default)(t,"isfixNav",!1),(0,o.default)(t,"popupShow",!1),(0,o.default)(t,"current",0),(0,o.default)(t,"userDet",[]),(0,o.default)(t,"categories",[]),(0,o.default)(t,"siteInfo",!1),(0,o.default)(t,"username",""),(0,o.default)(t,"isPayVal",""),(0,o.default)(t,"isWeixin",!1),(0,o.default)(t,"isPhone",!1),(0,o.default)(t,"firstCategoriesId",""),(0,o.default)(t,"logo",!1),(0,o.default)(t,"viewportWidth",""),(0,o.default)(t,"userId",""),(0,o.default)(t,"followDet",""),(0,o.default)(t,"followFlag",""),(0,o.default)(t,"intiFollowVal","0"),(0,o.default)(t,"noticeSum",0),(0,o.default)(t,"intiFollowChangeVal","0"),(0,o.default)(t,"oldFollow",!1),(0,o.default)(t,"equalId",!1),t},props:{userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1},followShow:{logoShow:!1}},computed:{personUserId:function(){return this.$route.params.userId}},created:function(){this.userId=s.default.getLItem("tokenId"),this.userId==this.personUserId?this.equalId=!0:this.equalId=!1,this.viewportWidth=window.innerWidth,this.isWeixin=n.default.isWeixin().isWeixin,this.isPhone=n.default.isWeixin().isPhone,this.loadCategories(),this.followShow&&this.loadUserFollowInfo(),this.loadUserInfo()},watch:{isfixNav:function(t,e){this.isfixNav=t}},methods:(i={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var t=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(t-640)/2+"px"},loadCategories:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){t.siteInfo=e.readdata,e.readdata._data.set_site.site_logo&&(t.logo=e.readdata._data.set_site.site_logo),t.isPayVal=e.readdata._data.set_site.site_mode})),this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(e){t.categories=e.readdata,t.firstCategoriesId=e.readdata[0]._data.id,t.$emit("update",t.firstCategoriesId)}))},loadUserFollowInfo:function(){var t=this;this.appFetch({url:"users",method:"get",splice:"/"+this.personUserId,data:{}}).then((function(e){t.followDet=e.readdata,"1"==e.readdata._data.follow?t.followFlag="已关注":"0"==e.readdata._data.follow?t.followFlag="关注TA":t.followFlag="相互关注",t.intiFollowVal=e.readdata._data.follow}))},loadUserInfo:function(){var t=this;this.appFetch({url:"users",method:"get",splice:"/"+this.userId,data:{}}).then((function(e){e.data.attributes.typeUnreadNotifications.liked||(e.data.attributes.typeUnreadNotifications.liked=0),e.data.attributes.typeUnreadNotifications.replied||(e.data.attributes.typeUnreadNotifications.replied=0),e.data.attributes.typeUnreadNotifications.rewarded||(e.data.attributes.typeUnreadNotifications.rewarded=0),e.data.attributes.typeUnreadNotifications.system||(e.data.attributes.typeUnreadNotifications.system=0),t.noticeSum=e.data.attributes.typeUnreadNotifications.liked+e.data.attributes.typeUnreadNotifications.replied+e.data.attributes.typeUnreadNotifications.rewarded+e.data.attributes.typeUnreadNotifications.system}))},followCli:function(t){if(s.default.getLItem("Authorization")){var e=new Object,a="";"1"==t||"2"==t?(e.to_user_id=this.personUserId,a="delete",this.oldFollow=t):(e.to_user_id=this.personUserId,a="post"),this.followRequest(a,e,t)}else s.default.setSItem("beforeVisiting",this.$route.path),this.$router.push({path:"/login-user"})},followRequest:function(t,e,a){var i=this;this.appFetch({url:"follow",method:t,data:{data:{type:"user_follow",attributes:e}}}).then((function(e){if(e.errors)throw i.$toast.fail(e.errors[0].code),new Error(e.error);"delete"==t?i.intiFollowVal="0":"1"==i.oldFollow||"0"==i.oldFollow?i.intiFollowVal="1":i.intiFollowVal="2"}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(t){this.$emit("categoriesChoice",t)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,o.default)(i,"backUrl",(function(){window.history.go(-1)})),(0,o.default)(i,"LogOut",(function(){})),(0,o.default)(i,"bindEvent",(function(t){1==t&&this.LogOut()})),i),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},destroyed:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(t,e,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},gbXh:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.siteInfo?a("div",{staticClass:"circleCon"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("Header",{attrs:{searchIconShow:!1,perDetShow:!0,logoShow:!0,menuIconShow:!1,navShow:!1,invitePerDet:!0}}),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"circleInfo padB0 lastBorNone"},[a("h1",{staticClass:"cirInfoTit"},[t._v("站点简介")]),t._v(" "),a("p",{staticClass:"cirInfoWord"},[t._v(t._s(t.siteInfo._data.set_site.site_introduction))])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"powerListBox"},[a("div",{staticClass:"powerTit"},[t._v("作为"+t._s(t.roleResult)+"，您将获得以下权限")]),t._v(" "),a("div",{staticClass:"powerList"},[a("div",{staticClass:"powerClassify"},[t._v("帖子操作")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("查看主题")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("发图文帖")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("付费阅读帖")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("附件查看")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("回帖")])]),t._v(" "),a("div",{staticClass:"powerList"},[a("div",{staticClass:"powerClassify"},[t._v("站点前台管理")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("编辑站点")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("邀请加入")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("标签管理")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("用户管理")])]),t._v(" "),a("div",{staticClass:"powerList"},[a("div",{staticClass:"powerClassify"},[t._v("前台内容管理")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("置顶")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("加精")]),t._v(" "),a("p",{staticClass:"powerChi"},[t._v("删帖")])])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"loginOpera"},[a("a",{staticClass:"mustLogin",attrs:{href:"javascript:;"},on:{click:t.loginJump}},[t._v("已注册，登录")]),t._v(" "),t.allowRegister?a("a",{staticClass:"regiJoin",attrs:{href:"javascript:;"},on:{click:t.registerJump}},[t._v("接受邀请，注册")]):t._e(),t._v(" "),a("p",{staticClass:"payMoney"},[t._v("￥"+t._s(t.siteInfo._data.set_site.site_price)+" / 永久有效")])])],1)],1):t._e()},o=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return o}))},omtG:function(t,e,a){"use strict";a.r(e);var i=a("toE5"),o=a("Jgvg");for(var s in o)"default"!==s&&function(t){a.d(e,t,(function(){return o[t]}))}(s);var n=a("KHd+"),r=Object(n.a)(o.default,i.a,i.b,!1,null,null,null);e.default=r.exports},pvnC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(a("QbLZ")),o=n(a("QiNT")),s=n(a("IsPG"));function n(t){return t&&t.__esModule?t:{default:t}}a("iUmJ"),e.default=(0,i.default)({name:"headerView",components:{Sidebar:s.default}},o.default)},toE5:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("van-popup",{staticClass:"sidebarWrap",style:{height:"100%",right:t.isPhone||t.isWeixin?"0":(t.viewportWidth-640)/2+"px"},attrs:{position:"right"},model:{value:t.popupShow,callback:function(e){t.popupShow=e},expression:"popupShow"}},[a("sidebar",{attrs:{isPayVal:t.isPayVal}})],1),t._v(" "),t.$route.meta.oneHeader?a("div",{staticClass:"headerBox"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet aaa"},[t.userInfoAvatarUrl?a("img",{staticClass:"inviteHead",attrs:{src:t.userInfoAvatarUrl,alt:""}}):a("img",{staticClass:"inviteHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),t._v(" "),t.invitePerDet&&t.userInfoName?a("div",{staticClass:"inviteName",model:{value:t.userInfoName,callback:function(e){t.userInfoName=e},expression:"userInfoName"}},[t._v(t._s(t.userInfoName))]):a("div",{staticClass:"inviteName"},[t._v("该用户已被删除")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[t._v("邀请您加入")]),t._v(" "),t.followShow?a("div",{staticClass:"followBox"},[a("span",[t._v("关注："+t._s(t.followDet._data.followCount))]),t._v(" "),a("span",[t._v("被关注："+t._s(t.followDet._data.fansCount))]),t._v(" "),t.equalId||"0"!=t.intiFollowVal?t.equalId||"2"!=t.intiFollowVal?t.equalId||"1"!=t.intiFollowVal?a("a",{staticStyle:{display:"none"},attrs:{href:"javascript:;"}}):a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("已关注")]):a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("相互关注")]):a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.followCli(t.intiFollowVal)}}},[t._v("关注TA")])]):t._e()]),t._v(" "),t.searchIconShow||t.menuIconShow?t._e():a("div",{staticClass:"headeGap"}),t._v(" "),t.searchIconShow||t.menuIconShow?a("div",{staticClass:"headOpe"},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:t.searchJump}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape relative",attrs:{"is-link":""},on:{click:t.showPopup}},[t.noticeSum>0?a("i",{staticClass:"noticeNew"}):t._e()])]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.logoShow,expression:"logoShow"}],staticClass:"logoBox"},[t.logo?a("img",{staticClass:"logo",attrs:{src:t.logo}}):a("img",{staticClass:"logo",attrs:{src:t.appConfig.staticBaseUrl+"/images/logo.png"}})]),t._v(" "),t.siteInfo?a("div",{directives:[{name:"show",rawName:"v-show",value:t.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[a("span",[t._v("主题："+t._s(t.siteInfo._data.other.count_threads))]),t._v(" "),a("span",[t._v("成员："+t._s(t.siteInfo._data.other.count_users))]),t._v(" "),t.siteInfo._data.set_site.site_author?a("span",[t._v("站长："+t._s(t.siteInfo._data.set_site.site_author.username))]):a("span",[t._v("站长：无")])]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:t.isfixNav},attrs:{id:"testNavBar"}},[a("van-tabs",{model:{value:t.navActi,callback:function(e){t.navActi=e},expression:"navActi"}},[a("van-tab",[a("span",{attrs:{slot:"title"},on:{click:function(e){return t.categoriesCho(0)}},slot:"title"},[t._v("\n              全部\n          ")])]),t._v(" "),t._l(t.categories,(function(e,i){return a("van-tab",{key:i},[a("span",{attrs:{slot:"title"},on:{click:function(a){return t.categoriesCho(e._data.id)}},slot:"title"},[t._v("\n              "+t._s(e._data.name)+"\n          ")])])}))],2)],1)]):t._e()],1)},o=[];a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return o}))},vcW9:function(t,e,a){"use strict";a.r(e);var i=a("gbXh"),o=a("7xHi");for(var s in o)"default"!==s&&function(t){a.d(e,t,(function(){return o[t]}))}(s);var n=a("KHd+"),r=Object(n.a)(o.default,i.a,i.b,!1,null,null,null);e.default=r.exports}}]);