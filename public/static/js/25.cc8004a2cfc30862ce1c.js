(window.webpackJsonp=window.webpackJsonp||[]).push([[25,95],{DrXK:function(e,t,i){"use strict";i.r(t);var a=i("Yoo9"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t.default=n.a},Ey7k:function(e,t,i){"use strict";i.r(t);var a=i("Q0pR"),n=i("DrXK");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("iOK4");var s=i("KHd+"),r=Object(s.a)(n.default,a.a,a.b,!1,null,"745ddfb5",null);t.default=r.exports},FYko:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n=d(i("FyfS")),o=d(i("14Xm")),s=d(i("D3Ub")),r=d(i("JZuw")),c=d(i("y0A3")),u=d(i("6NK7"));function d(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{inviteList:[],choiceShow:!1,checkOperaStatus:!1,choList:[],getGroupNameById:{},choiceRes:{attributes:{name:"选择操作"}},loading:!1,finished:!1,isLoading:!1,pageIndex:1,offset:100,query:{},pageLimit:15,isWeixin:!1,isPhone:!1,viewportWidth:""}},components:{myInviteJoinHeader:r.default},created:(a=(0,s.default)(o.default.mark((function e(){return o.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.viewportWidth=window.innerWidth,this.isWeixin=u.default.isWeixin().isWeixin,this.isPhone=u.default.isWeixin().isPhone,e.next=5,this.getOperaType();case 5:this.query=this.$route.query,this.getInviteList();case 7:case"end":return e.stop()}}),e,this)}))),function(){return a.apply(this,arguments)}),methods:{toggle:function(e){this.$refs.checkboxes[e].toggle()},showChoice:function(){this.choiceShow=!this.choiceShow},setSelectVal:function(e){this.choiceShow=!1,this.checkOperaStatus=!0,this.choiceRes=e},getOperaType:function(){var e=this;return(0,s.default)(o.default.mark((function t(){var i,a,s,r,c,u,d;return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.appFetch({url:"groups",method:"get"});case 3:if(!(i=t.sent).errors){t.next=9;break}throw e.$toast.fail(i.errors[0].code),new Error(i.error);case 9:for(e.choList=i.data,a=!0,s=!1,r=void 0,t.prev=13,c=(0,n.default)(e.choList);!(a=(u=c.next()).done);a=!0)d=u.value,e.getGroupNameById[d.id]=d.attributes.name;t.next=21;break;case 17:t.prev=17,t.t0=t.catch(13),s=!0,r=t.t0;case 21:t.prev=21,t.prev=22,!a&&c.return&&c.return();case 24:if(t.prev=24,!s){t.next=27;break}throw r;case 27:return t.finish(24);case 28:return t.finish(21);case 29:t.next=34;break;case 31:t.prev=31,t.t1=t.catch(0),e.$toast("邀请码类型获取失败，请刷新重试");case 34:case"end":return t.stop()}}),t,e,[[0,31],[13,17,21,29],[22,,24,28]])})))()},getInviteList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,s.default)(o.default.mark((function i(){return o.default.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,e.appFetch({url:"invite",method:"get",data:{"page[number]":e.pageIndex,"page[limit]":e.pageLimit}}).then((function(i){if(i.errors)throw e.$toast.fail(i.errors[0].code),new Error(i.error);e.finished=i.readdata.length<e.pageLimit,t&&(e.inviteList=[]),console.log(e.pageIndex,"少时诵诗书"),e.loading=!1,e.inviteList=e.inviteList.concat(i.readdata)}));case 3:i.next=10;break;case 5:i.prev=5,i.t0=i.catch(0),console.error(i.t0,"邀请码列表获取失败"),e.$toast("邀请列表获取失败"),e.loading&&1!==e.pageIndex&&e.pageIndex--;case 10:case"end":return i.stop()}}),i,e,[[0,5]])})))()},checkSubmit:function(){var e=this;return(0,s.default)(o.default.mark((function t(){return o.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.checkOperaStatus){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,e.appFetch({url:"invite",method:"post",data:{data:{type:"invite",attributes:{group_id:parseInt(e.choiceRes.id)}}}});case 5:e.pageIndex=1,e.getInviteList(!0),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),console.error(t.t0,"checkSubmit");case 12:case"end":return t.stop()}}),t,e,[[2,9]])})))()},copyToClipBoard:function(e){if(0!==e._data.status){var t=document.createElement("textarea");t.style.position="absolute",t.style.opacity="0",t.style.height="0",t.textContent=c.default.baseUrl+"?code="+e._data.code+"&group_id="+e._data.group_id,this.$toast.success("邀请链接已复制成功"),document.body.appendChild(t),t.select(t,"链接链接");try{return document.execCommand("copy")}finally{document.body.removeChild(t)}}},resetDelete:function(e){var t=this;return(0,s.default)(o.default.mark((function i(){var a;return o.default.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:if(0!==e._data.status){i.next=2;break}return i.abrupt("return");case 2:return a=e._data.id,i.prev=3,i.next=6,t.appFetch({url:"invite",method:"delete",splice:"/"+a});case 6:if(!res.errors){i.next=11;break}throw t.$toast.fail(res.errors[0].code),new Error(res.error);case 11:t.checkSubmit();case 12:i.next=17;break;case 14:i.prev=14,i.t0=i.catch(3),t.$toast("邀请码操作失败！");case 17:case"end":return i.stop()}}),i,t,[[3,14]])})))()},onLoad:function(){this.loading=!0,this.pageIndex++,this.getInviteList()},onRefresh:function(){var e=this;this.pageIndex=1,this.getInviteList(!0).then((function(t){e.$toast("刷新成功"),e.isLoading=!1,e.finished=!1})).catch((function(t){e.$toast("刷新失败"),e.isLoading=!1}))}},mounted:function(){},beforeRouteLeave:function(e,t,i){i()}}},FyfS:function(e,t,i){e.exports={default:i("Rp86"),__esModule:!0}},Fzl4:function(e,t,i){},Jgvg:function(e,t,i){"use strict";i.r(t);var a=i("pvnC"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t.default=n.a},Q0pR:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("myInviteJoinHeader",{attrs:{title:"邀请加入"}}),e._v(" "),i("div",{staticClass:"content"},[i("van-list",{attrs:{finished:e.finished,offset:e.offset,"finished-text":"没有更多了","immediate-check":!1},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[i("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[i("div",{staticClass:"inviteBox"},[i("table",{staticClass:"inviteTable"},[i("tr",[i("th",[e._v("编号")]),e._v(" "),i("th",[e._v("邀请为")]),e._v(" "),i("th",[e._v("链接状态")]),e._v(" "),i("th",[e._v("链接操作")])]),e._v(" "),e._l(e.inviteList,(function(t,a){return i("tr",{key:a},[i("td",[e._v(e._s(t._data.id))]),e._v(" "),i("td",[e._v(e._s(e.getGroupNameById[t._data.group_id]))]),e._v(" "),i("td",[e._v(e._s(0===t._data.status?"已失效":"使用中"))]),e._v(" "),i("td",[i("a",{class:["copyA",0===t._data.status&&"font9"],attrs:{href:"javascript:;"},on:{click:function(i){return e.copyToClipBoard(t)}}},[e._v("复制")]),e._v(" "),i("a",{class:["invalidA",0===t._data.status&&"font9"],attrs:{href:"javascript:;"},on:{click:function(i){return e.resetDelete(t)}}},[e._v("置为无效")])])])}))],2)])])],1)],1),e._v(" "),i("div",{staticClass:"manageFootFixed",style:{width:e.isPhone||e.isWeixin?"100%":"640px",left:e.isPhone||e.isWeixin?"0":(e.viewportWidth-640)/2+"px"}},[i("div",{staticClass:"operaCho"},[i("div",{staticClass:"operaWo",on:{click:e.showChoice}},[i("span",[e._v(e._s(e.checkOperaStatus?e.choiceRes.attributes.name+" 邀请链接":e.choiceRes.attributes.name))]),e._v(" "),i("i",{staticClass:"icon iconfont icon-choice-item"})]),e._v(" "),e.choiceShow?i("ul",{staticClass:"operaChoList"},e._l(e.choList,(function(t,a){return i("li",{key:a,staticClass:"operaChoLi",on:{click:function(i){return i.stopPropagation(),e.setSelectVal(t)}}},[e._v(e._s(t.attributes.name)+" 邀请链接")])})),0):e._e()]),e._v(" "),i("button",{staticClass:"checkSubmit",on:{click:e.checkSubmit}},[e._v("生成")])])],1)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},QiNT:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,n=s(i("YEIV")),o=(i("ULRk"),s(i("+KBz")),s(i("VVfg")),s(i("6NK7")));function s(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){var e;return e={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:"",userId:""},(0,n.default)(e,"isfixNav",!1),(0,n.default)(e,"popupShow",!1),(0,n.default)(e,"current",0),(0,n.default)(e,"userDet",[]),(0,n.default)(e,"categories",[]),(0,n.default)(e,"siteInfo",!1),(0,n.default)(e,"username",""),(0,n.default)(e,"isPayVal",""),(0,n.default)(e,"isWeixin",!1),(0,n.default)(e,"isPhone",!1),(0,n.default)(e,"firstCategoriesId",""),(0,n.default)(e,"logo",!1),(0,n.default)(e,"viewportWidth",""),e},props:{userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1}},created:function(){this.viewportWidth=window.innerWidth,this.isWeixin=o.default.isWeixin().isWeixin,this.isPhone=o.default.isWeixin().isPhone,this.loadCategories()},watch:{isfixNav:function(e,t){this.isfixNav=e}},methods:(a={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var e=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(e-640)/2+"px"},loadCategories:function(){var e=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(t){e.siteInfo=t.readdata,t.readdata._data.set_site.site_logo&&(e.logo=t.readdata._data.set_site.site_logo),e.isPayVal=t.readdata._data.set_site.site_mode})),this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(t){console.log("2222"),console.log(t),e.categories=t.readdata,e.firstCategoriesId=t.readdata[0]._data.id,console.log(e.firstCategoriesId),e.$emit("update",e.firstCategoriesId),console.log("3456")}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(e){this.$emit("categoriesChoice",e)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,n.default)(a,"backUrl",(function(){window.history.go(-1)})),(0,n.default)(a,"LogOut",(function(){console.log("测试")})),(0,n.default)(a,"bindEvent",(function(e){1==e&&this.LogOut()})),a),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeDestroy:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},destroyed:function(){window.removeEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(e,t,i){window.removeEventListener("scroll",this.handleTabFix,!0),i()}}},Rp86:function(e,t,i){i("bBy9"),i("FlQf"),e.exports=i("fXsU")},Yoo9:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r(i("QbLZ")),n=r(i("omtG")),o=r(i("QiNT")),s=r(i("FYko"));function r(e){return e&&e.__esModule?e:{default:e}}i("iUmJ"),i("Fzl4"),t.default=(0,a.default)({name:"managementCirclesView",components:{Header:n.default}},o.default,s.default)},fXsU:function(e,t,i){var a=i("5K7Z"),n=i("fNZA");e.exports=i("WEpk").getIterator=function(e){var t=n(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return a(t.call(e))}},iOK4:function(e,t,i){"use strict";var a=i("xlaz");i.n(a).a},omtG:function(e,t,i){"use strict";i.r(t);var a=i("ttLC"),n=i("Jgvg");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);var s=i("KHd+"),r=Object(s.a)(n.default,a.a,a.b,!1,null,null,null);t.default=r.exports},pvnC:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(i("QbLZ")),n=s(i("QiNT")),o=s(i("IsPG"));function s(e){return e&&e.__esModule?e:{default:e}}i("E2jd"),t.default=(0,a.default)({name:"headerView",components:{Sidebar:o.default}},n.default)},ttLC:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",[i("van-popup",{staticClass:"sidebarWrap",style:{height:"100%",right:e.isPhone||e.isWeixin?"0":(e.viewportWidth-640)/2+"px"},attrs:{position:"right"},model:{value:e.popupShow,callback:function(t){e.popupShow=t},expression:"popupShow"}},[i("sidebar",{attrs:{isPayVal:e.isPayVal}})],1),e._v(" "),e.$route.meta.oneHeader?i("div",{staticClass:"headerBox"},[i("div",{directives:[{name:"show",rawName:"v-show",value:e.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet aaa"},[e.userInfoAvatarUrl?i("img",{staticClass:"inviteHead",attrs:{src:e.userInfoAvatarUrl,alt:""}}):i("img",{staticClass:"inviteHead",attrs:{src:e.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),e._v(" "),e.invitePerDet&&e.userInfoName?i("div",{staticClass:"inviteName",model:{value:e.userInfoName,callback:function(t){e.userInfoName=t},expression:"userInfoName"}},[e._v(e._s(e.userInfoName))]):i("div",{staticClass:"inviteName"},[e._v("该用户已被删除")]),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:e.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[e._v("邀请您加入")])]),e._v(" "),e.searchIconShow||e.menuIconShow?e._e():i("div",{staticClass:"headeGap"}),e._v(" "),e.searchIconShow||e.menuIconShow?i("div",{staticClass:"headOpe"},[i("span",{directives:[{name:"show",rawName:"v-show",value:e.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:e.searchJump}}),e._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:e.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape",attrs:{"is-link":""},on:{click:e.showPopup}})]):e._e(),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.logoShow,expression:"logoShow"}],staticClass:"logoBox"},[e.logo?i("img",{staticClass:"logo",attrs:{src:e.logo}}):i("img",{staticClass:"logo",attrs:{src:e.appConfig.staticBaseUrl+"/images/logo.png"}})]),e._v(" "),e.siteInfo?i("div",{directives:[{name:"show",rawName:"v-show",value:e.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[i("span",[e._v("主题："+e._s(e.siteInfo._data.other.count_threads))]),e._v(" "),i("span",[e._v("成员："+e._s(e.siteInfo._data.other.count_users))]),e._v(" "),e.siteInfo._data.set_site.site_author?i("span",[e._v("站长："+e._s(e.siteInfo._data.set_site.site_author.username))]):i("span",[e._v("站长：无")])]):e._e(),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:e.isfixNav},attrs:{id:"testNavBar"}},[i("van-tabs",{model:{value:e.navActi,callback:function(t){e.navActi=t},expression:"navActi"}},[i("van-tab",[i("span",{attrs:{slot:"title"},on:{click:function(t){return e.categoriesCho(0)}},slot:"title"},[e._v("\n              全部\n          ")])]),e._v(" "),e._l(e.categories,(function(t,a){return i("van-tab",{key:a},[i("span",{attrs:{slot:"title"},on:{click:function(i){return e.categoriesCho(t._data.id)}},slot:"title"},[e._v("\n              "+e._s(t._data.name)+"\n          ")])])}))],2)],1)]):e._e()],1)},n=[];i.d(t,"a",(function(){return a})),i.d(t,"b",(function(){return n}))},xlaz:function(e,t,i){}}]);