(window.webpackJsonp=window.webpackJsonp||[]).push([[28,82,83],{"/Zpk":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{id:1,checked:!0,result:[],checkBoxres:[],imageShow:!1,index:1,themeListResult:[],firstpostImageListResult:[],priview:[],showScreen:[],length:0,indexlist:-1,menuStatus:!1}},props:{themeList:{type:Array},replyTag:{replyTag:!1},isTopShow:{isTopShow:!1},isMoreShow:{isMoreShow:!1},ischeckShow:{ischeckShow:!1}},created:function(){var t=this;this.loadPriviewImgList(),this.forList(),document.addEventListener("click",(function(e){console.log("444");t.$refs.screenDiv;document.contains(e.target)&&(t.indexlist=-1)}))},watch:{themeList:function(t,e){this.themeList=t,this.themeListResult=t,this.loadPriviewImgList(),this.$forceUpdate()},deep:!0},methods:{userArr:function(t){var e=[];return t.forEach((function(t){e.push('<a  href="/home-page/'+t._data.id+'">'+t._data.username+"</a>")})),e.join(",")},forList:function(){},bindScreen:function(t,e){t==this.indexlist?this.indexlist=-1:this.indexlist=t},themeOpera:function(t,e,a,s){console.log(t,e,a,s);var i=new Object;3==e?(i.isEssence=!a,this.themeOpeRequest(t,i,"3",s)):4==e?(i.isSticky=!a,this.themeOpeRequest(t,i,"4",s)):5==e?(i.isDeleted=!0,this.themeOpeRequest(t,i,"5",s)):this.$router.push({path:"/edit-topic/"+this.themeId})},themeOpeRequest:function(t,e,a,s){var i=this;console.log(t,e,a,s),console.log("7890"),this.appFetch({url:"threads",method:"patch",splice:"/"+t,data:{data:{type:"threads",attributes:e}}}).then((function(t){if(t.errors)throw i.$toast.fail(t.errors[0].code),new Error(t.error);console.log(t),console.log("01234"),"3"==a?(i.essenceStatus=t.readdata._data.isEssence,i.themeList[s]._data.isEssence=i.essenceStatus):"4"==a?(i.stickyStatus=t.readdata._data.isSticky,i.themeList[s]._data.isSticky=i.stickyStatus):"5"==a&&(i.deletedStatus=t.readdata._data.isDeleted,i.themeList.splice(s,1))}))},replyOpera:function(t,e,a){var s=this,i=new Object;i.isLiked=status,this.appFetch({url:"posts",method:"patch",splice:"/"+t,data:{data:{type:"posts",attributes:i}}}).then((function(t){if(t.errors)throw s.$toast.fail(t.errors[0].code),new Error(t.error);s.likedStatus=t.readdata._data.isLiked,s.themeList[a].firstPost._data.isLiked=s.likedStatus,s.$toast.success("修改成功"),s.$emit("changeStatus",!0)}))},loadPriviewImgList:function(){var t=this.themeListResult.length;if(""==this.themeListResult||null==this.themeListResult)return!1;for(var e=0;e<t;e++){var a=[];if(this.themeListResult[e].firstPost.images)for(var s=0;s<this.themeListResult[e].firstPost.images.length;s++)a.push(this.themeListResult[e].firstPost.images[s]._data.thumbUrl);this.themeListResult[e].firstPost.imageList=a}},imageSwiper:function(t){this.loadPriviewImgList(),this.imageShow=!0,console.log(this.priview)},onChange:function(t){this.index=t+1},checkAll:function(){console.log(this.$refs),this.$refs.checkboxGroup.toggleAll(!0)},signOutDele:function(){this.$refs.checkboxGroup.toggleAll()},deleteAllClick:function(){this.$emit("deleteAll",this.result)},jumpThemeDet:function(t,e){e?this.$router.push({path:"/details/"+t}):this.$toast.fail("没有权限，请联系站点管理员")},jumpPerDet:function(t){this.$router.push({path:"/home-page/"+t})}},mounted:function(){document.addEventListener("click",this.disappear,!1)},destroyed:function(){document.addEventListener("click",this.disappear,!1)},beforeRouteLeave:function(t,e,a){a()}}},"4Njt":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=d(a("QbLZ"));a("Cpqr");var i=d(a("omtG")),n=(d(a("QiNT")),d(a("JZuw"))),o=d(a("CFQY")),r=d(a("aSTm")),c=d(a("/Zpk"));function d(t){return t&&t.__esModule?t:{default:t}}a("E2jd"),e.default=(0,s.default)({name:"my-collection-view",components:{comHeader:n.default,Header:i.default,ThemeDet:o.default}},r.default,{mSiteThemeDet:c.default})},"6JNq":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("van-popup",{staticClass:"sidebarWrap",style:{height:"100%"},attrs:{position:"right"},model:{value:t.popupShow,callback:function(e){t.popupShow=e},expression:"popupShow"}},[a("sidebar",{attrs:{isPayVal:t.isPayVal}})],1),t._v(" "),t.$route.meta.oneHeader?a("div",{staticClass:"headerBox"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet aaa"},[t.userInfoAvatarUrl?a("img",{staticClass:"inviteHead",attrs:{src:t.userInfoAvatarUrl,alt:""}}):a("img",{staticClass:"inviteHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),t._v(" "),t.invitePerDet&&t.userInfoName?a("div",{staticClass:"inviteName",model:{value:t.userInfoName,callback:function(e){t.userInfoName=e},expression:"userInfoName"}},[t._v(t._s(t.userInfoName))]):a("div",{staticClass:"inviteName"},[t._v("该用户已被删除")]),t._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:t.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[t._v("邀请您加入")])]),t._v(" "),t.searchIconShow||t.menuIconShow?t._e():a("div",{staticClass:"headeGap"}),t._v(" "),t.searchIconShow||t.menuIconShow?a("div",{staticClass:"headOpe"},[a("span",{directives:[{name:"show",rawName:"v-show",value:t.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:t.searchJump}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape",attrs:{"is-link":""},on:{click:t.showPopup}})]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.logoShow,expression:"logoShow"}],staticClass:"logoBox"},[t.logo?a("img",{staticClass:"logo",attrs:{src:t.logo}}):a("img",{staticClass:"logo",attrs:{src:t.appConfig.staticBaseUrl+"/images/logo.png"}})]),t._v(" "),t.siteInfo?a("div",{directives:[{name:"show",rawName:"v-show",value:t.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[a("span",[t._v("主题："+t._s(t.siteInfo._data.threads))]),t._v(" "),a("span",[t._v("成员："+t._s(t.siteInfo._data.members))]),t._v(" "),t.siteInfo._data.siteAuthor?a("span",[t._v("站长："+t._s(t.siteInfo._data.siteAuthor.username))]):a("span",[t._v("站长：无")])]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:t.isfixNav},attrs:{id:"testNavBar"}},[a("van-tabs",{model:{value:t.navActi,callback:function(e){t.navActi=e},expression:"navActi"}},t._l(t.categories,(function(e,s){return a("van-tab",{key:s},[a("span",{attrs:{slot:"title"},on:{click:function(a){return t.categoriesCho(e._data.id)}},slot:"title"},[t._v("\n              "+t._s(e._data.name)+"\n          ")])])})),1)],1)]):t._e()],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))},"8VtU":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"reply-my-box my-info-money-header"},[a("comHeader",{attrs:{title:"我的收藏"}}),t._v(" "),a("van-list",{attrs:{finished:t.finished,offset:t.offset,"finished-text":"没有更多了","immediate-check":!1},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"content"},[a("ThemeDet",{attrs:{themeList:t.collectionList,isMoreShow:!1}})],1)])],1)],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))},CFQY:function(t,e,a){"use strict";a.r(e);var s=a("wZM+"),i=a("DhNJ");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o=a("KHd+"),r=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);e.default=r.exports},DhNJ:function(t,e,a){"use strict";a.r(e);var s=a("xry+"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=i.a},Jgvg:function(t,e,a){"use strict";a.r(e);var s=a("pvnC"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=i.a},QiNT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=o(a("YEIV")),n=(a("ULRk"),o(a("+KBz")),o(a("VVfg")),o(a("6NK7")));function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){var t;return t={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:"",userId:""},(0,i.default)(t,"isfixNav",!1),(0,i.default)(t,"popupShow",!1),(0,i.default)(t,"current",0),(0,i.default)(t,"userDet",[]),(0,i.default)(t,"categories",[]),(0,i.default)(t,"siteInfo",!1),(0,i.default)(t,"username",""),(0,i.default)(t,"isPayVal",""),(0,i.default)(t,"isWeixin",!1),(0,i.default)(t,"isPhone",!1),(0,i.default)(t,"firstCategoriesId",""),(0,i.default)(t,"logo",!1),t},props:{userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1}},created:function(){this.isWeixin=n.default.isWeixin().isWeixin,this.isPhone=n.default.isWeixin().isPhone,this.loadCategories()},watch:{isfixNav:function(t,e){this.isfixNav=t}},methods:(s={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var t=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(t-640)/2+"px"},loadCategories:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){t.siteInfo=e.readdata,e.readdata._data.logo&&(t.logo=e.readdata._data.logo),t.isPayVal=e.readdata._data.siteMode})),this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(e){console.log("2222"),console.log(e),t.categories=e.readdata,t.firstCategoriesId=e.readdata[0]._data.id,console.log(t.firstCategoriesId),t.$emit("update",t.firstCategoriesId),console.log("3456")}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(t){this.$emit("categoriesChoice",t)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,i.default)(s,"backUrl",(function(){window.history.go(-1)})),(0,i.default)(s,"LogOut",(function(){console.log("测试")})),(0,i.default)(s,"bindEvent",(function(t){1==t&&this.LogOut()})),s),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},destroyed:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(t,e,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},YRWR:function(t,e,a){"use strict";a.r(e);var s=a("4Njt"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=i.a},aSTm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s(a("JZuw")),s(a("STKU")),s(a("/uo3")),s(a("3YLv"));function s(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{collectionList:[],list:[],loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,offset:100}},created:function(){this.imgUrl="../../../../../../../static/images/mytx.png",this.myCollection()},methods:{myCollection:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.appFetch({url:"collection",method:"get",data:{include:["user","firstPost","lastThreePosts","lastThreePosts.user","firstPost.likedUsers","rewardedUsers"],"page[number]":this.pageIndex,"page[limit]":this.pageLimit}}).then((function(a){if(a.errors)throw t.$toast.fail(a.errors[0].code),new Error(a.error);e&&(t.collectionList=[]),t.collectionList=t.collectionList.concat(a.readdata),t.loading=!1,t.finished=a.data.length<t.pageLimit})).catch((function(e){t.loading&&1!==t.pageIndex&&t.pageIndex--,t.loading=!1}))},onLoad:function(){this.loading=!0,this.pageIndex++,this.myCollection()},onRefresh:function(){var t=this;this.pageIndex=1,this.myCollection(!0).then((function(){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}}}},gX8P:function(t,e,a){"use strict";a.r(e);var s=a("8VtU"),i=a("YRWR");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o=a("KHd+"),r=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);e.default=r.exports},omtG:function(t,e,a){"use strict";a.r(e);var s=a("6JNq"),i=a("Jgvg");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o=a("KHd+"),r=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);e.default=r.exports},pvnC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(a("QbLZ")),i=o(a("QiNT")),n=o(a("IsPG"));function o(t){return t&&t.__esModule?t:{default:t}}a("E2jd"),e.default=(0,s.default)({name:"headerView",components:{Sidebar:n.default}},i.default)},"wZM+":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",[a("van-checkbox-group",{ref:"checkboxGroup",model:{value:t.result,callback:function(e){t.result=e},expression:"result"}},[t._l(t.themeList,(function(e,s){return a("div",{key:s},[a("div",{staticClass:"cirPostCon"},[a("div",{},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[e.user&&e.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:e.user._data.avatarUrl},on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"},on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}}),t._v(" "),a("div",{staticClass:"perDet"},[e.user?a("div",{staticClass:"perName",on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.user._data.username))]):a("div",{staticClass:"perName"},[t._v("该用户已被删除")]),t._v(" "),a("div",{staticClass:"postTime"},[t._v(t._s(t.$moment(e._data.createdAt).format("YYYY-MM-DD HH:mm")))])])]),t._v(" "),a("div",{staticClass:"postOpera"},[e._data.isSticky?a("span",{directives:[{name:"show",rawName:"v-show",value:t.isTopShow,expression:"isTopShow"}],staticClass:"icon iconfont icon-top"}):t._e(),t._v(" "),t.isMoreShow&&(e._data.canEssence||e._data.canSticky||e._data.canDelete||e._data.canEdit||e.firstPost._data.canLike)?a("div",{ref:"screenDiv",refInFor:!0,staticClass:"screen",on:{click:function(e){return e.stopPropagation(),t.bindScreen(s,e)}}},[a("div",{staticClass:"moreCli"},[a("span",{staticClass:"icon iconfont icon-more"})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.indexlist==s,expression:"indexlist==index"}],staticClass:"themeList"},[e.firstPost._data.canLike&&e.firstPost._data.isLiked?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.replyOpera(e.firstPost._data.id,2,e.firstPost._data.isLiked,s)}}},[t._v("取消点赞")]):t._e(),t._v(" "),e.firstPost._data.canLike&&!e.firstPost._data.isLiked?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.replyOpera(e.firstPost._data.id,2,e.firstPost._data.isLiked,s)}}},[t._v("点赞")]):t._e(),t._v(" "),e._data.canEssence&&e._data.isEssence?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(e._data.id,3,e._data.isEssence,s)}}},[t._v("取消加精")]):t._e(),t._v(" "),e._data.canEssence&&!e._data.isEssence?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(e._data.id,3,e._data.isEssence,s)}}},[t._v("加精")]):t._e(),t._v(" "),e._data.canSticky&&e._data.isSticky?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(e._data.id,4,e._data.isSticky,s)}}},[t._v("取消置顶")]):t._e(),t._v(" "),e._data.canSticky&&!e._data.isSticky?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(e._data.id,4,e._data.isSticky,s)}}},[t._v("置顶")]):t._e(),t._v(" "),e._data.canDelete?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(e._data.id,5)}}},[t._v("删除")]):t._e()])]):t._e()])]),t._v(" "),e.firstPost?a("div",{staticClass:"postContent"},[a("a",{domProps:{innerHTML:t._s(e.firstPost._data.contentHtml)},on:{click:function(a){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}})]):t._e(),t._v(" "),e.firstPost.imageList&&e.firstPost.imageList.length>0?a("div",{staticClass:"themeImgBox"},[a("div",{staticClass:"themeImgList moreImg"},t._l(e.firstPost.imageList,(function(s,i){return i<9?a("van-image",{key:i,staticClass:"themeImgChild",attrs:{fit:"cover","lazy-load":"",src:s},on:{click:function(a){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}}):t._e()})),1)]):t._e()]),t._v(" "),a("div",{staticClass:"operaBox"},[e.firstPost.likedUsers.length>0||e.rewardedUsers.length>0?a("div",{staticClass:"isrelationGap"}):t._e(),t._v(" "),e.firstPost.likedUsers.length>0?a("div",{staticClass:"likeBox"},[a("span",{staticClass:"icon iconfont icon-praise-after"}),t._v(" "),a("span",{domProps:{innerHTML:t._s(t.userArr(e.firstPost.likedUsers))}}),t._v(" "),e.firstPost._data.likeCount>10?a("i",[t._v(" 等"),a("span",[t._v(t._s(e.firstPost._data.likeCount))]),t._v("个人觉得很赞")]):t._e()]):t._e(),t._v(" "),e.rewardedUsers.length>0?a("div",{staticClass:"reward"},[a("span",{staticClass:"icon iconfont icon-money"}),t._v(" "),a("span",{domProps:{innerHTML:t._s(t.userArr(e.rewardedUsers))}})]):t._e(),t._v(" "),e.lastThreePosts.length>0&&e.firstPost.likedUsers.length>0||e.lastThreePosts.length>0&&e.rewardedUsers.length>0?a("div",{staticClass:"isrelationLine"}):t._e(),t._v(" "),e.lastThreePosts.length>0?a("div",{staticClass:"replyBox"},[t._l(e.lastThreePosts,(function(e){return a("div",{staticClass:"replyCon"},[e.user?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.user._data.username))]):a("a",{attrs:{href:"javascript:;"}},[t._v("该用户已被删除")]),t._v(" "),e._data.replyUserId?a("span",{staticClass:"font9",on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}},[t._v("回复")]):t._e(),t._v(" "),e._data.replyUserId&&e.replyUser?a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.jumpPerDet(e.user._data.id)}}},[t._v(t._s(e.replyUser._data.username))]):e._data.replyUserId&&!e.replyUser?a("a",{attrs:{href:"javascript:;"}},[t._v("该用户已被删除")]):t._e(),t._v(" "),a("span",{domProps:{innerHTML:t._s(e._data.contentHtml)}})])})),t._v(" "),e._data.postCount>4?a("a",{staticClass:"allReply",on:{click:function(a){return t.jumpThemeDet(e._data.id,e._data.canViewPosts)}}},[t._v("全部"+t._s(e._data.postCount-1)+"条回复"),a("span",{staticClass:"icon iconfont icon-right-arrow"})]):t._e()],2):t._e()]),t._v(" "),t.ischeckShow?a("van-checkbox",{ref:"checkboxes",refInFor:!0,staticClass:"memberCheck",attrs:{name:e._data.id}}):t._e()],1),t._v(" "),a("div",{staticClass:"gap"})])})),t._v(" "),t.ischeckShow?a("div",{staticClass:"manageFootFixed choFixed"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.checkAll}},[t._v("全选")]),t._v(" "),a("a",{attrs:{href:"javascript:;"},on:{click:t.signOutDele}},[t._v("取消全选")]),t._v(" "),a("button",{staticClass:"checkSubmit",on:{click:t.deleteAllClick}},[t._v("删除选中")])]):t._e()],2)],1),t._v(" "),a("van-image-preview",{attrs:{images:t.priview},on:{change:t.onChange},scopedSlots:t._u([{key:"index",fn:function(){return[t._v("第"+t._s(t.index)+"页")]},proxy:!0}]),model:{value:t.imageShow,callback:function(e){t.imageShow=e},expression:"imageShow"}})],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))},"xry+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a("QbLZ")),i=n(a("/Zpk"));function n(t){return t&&t.__esModule?t:{default:t}}a("E2jd"),e.default=(0,s.default)({name:"themeDetView"},i.default)}}]);