(window.webpackJsonp=window.webpackJsonp||[]).push([[39,79],{"2Imn":function(e,t,a){"use strict";a.r(t);var i=a("Efns"),s=a("PFY0");for(var n in s)"default"!==n&&function(e){a.d(t,e,(function(){return s[e]}))}(n);var o=a("KHd+"),r=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);t.default=r.exports},Efns:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"circleCon"},[a("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[e.siteInfo?a("div",[a("Header",{attrs:{logoShow:!0,perDetShow:!0}}),e._v(" "),a("div",{staticClass:"gap"}),e._v(" "),a("div",{staticClass:"circlePL"},[a("div",{staticClass:"circleLoBox"},[a("span",{staticClass:"circleIcon"},[e._v("站点图标")]),e._v(" "),e.siteInfo.logo?a("img",{staticClass:"circleLogo",attrs:{src:e.siteInfo._data.logo}}):a("img",{staticClass:"circleLogo",attrs:{src:e.appConfig.staticBaseUrl+"/images/logo.png"}})])]),e._v(" "),a("div",{staticClass:"circleInfo padB0 lastBorNone"},[a("h1",{staticClass:"cirInfoTit"},[e._v("站点简介")]),e._v(" "),a("p",{staticClass:"cirInfoWord"},[e._v(e._s(e.siteInfo._data.siteIntroduction))]),e._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[e._v("创建时间")]),e._v(" "),a("span",{staticClass:"infoItemRight"},[e._v(e._s(e.siteInfo._data.siteInstall))])]),e._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[e._v("加入方式")]),e._v(" "),a("span",{staticClass:"infoItemRight"},[e._v("付费"+e._s(e.siteInfo._data.sitePrice)+"元，有效期自加入起"+e._s(e.siteInfo._data.siteExpire)+"天")])]),e._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[e._v("站长")]),e._v(" "),a("span",{staticClass:"infoItemRight"},[e._v(e._s(e.siteUsername))])]),e._v(" "),a("div",{staticClass:"infoItem"},[a("div",{staticClass:"overHide"},[a("span",{staticClass:"infoItemLeft"},[e._v("站点成员")])]),e._v(" "),a("div",{staticClass:"circleMemberList"},e._l(e.siteInfo.users,(function(t,i){return""==t._data.avatarUrl&&null==t._data.avatarUrl?a("img",{key:i,staticClass:"circleMember",attrs:{src:t._data.avatarUrl,alt:""}}):a("img",{staticClass:"circleMember",attrs:{src:e.appConfig.staticBaseUrl+"/images/noavatar.gif"}})})),0)])]),e._v(" "),a("div",{staticClass:"gap"}),e._v(" "),a("div",{staticClass:"loginOpera"},[a("p",{staticClass:"welcomeUser"},[e._v("欢迎您，"+e._s(e.username)),a("a",{staticClass:"signOut",attrs:{href:"javascript:;"},on:{click:e.signOut}},[e._v("退出")])]),e._v(" "),a("a",{staticClass:"regiJoin",attrs:{href:"javascript:;"},on:{click:function(t){return e.sitePayClick(e.sitePrice)}}},[e._v("付费，获得成员权限")]),e._v(" "),a("p",{staticClass:"payMoney"},[e._v("￥"+e._s(e.sitePrice)+" / 永久有效")])])],1):e._e()])],1)},s=[];a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s}))},"F1+Y":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,s=a("omtG"),n=(i=s)&&i.__esModule?i:{default:i};t.default={data:function(){return{headOpeShow:!1,isfixNav:!1,current:0,siteInfo:!1,siteUsername:"",joinedAt:"",sitePrice:"",username:"",loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,offset:100}},components:{Header:n.default},created:function(){this.getInfo()},methods:{getInfo:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(a){t&&(e.siteInfo=[]),console.log(a),e.siteInfo=a.readdata,console.log(a.readdata._data.siteMode+"请求"),a.readdata._data.siteAuthor?e.siteUsername=a.readdata._data.siteAuthor.username:e.siteUsername="暂无站长信息",e.sitePrice=a.readdata._data.sitePrice}))},signOut:function(){browserDb.removeLItem("tokenId"),browserDb.removeLItem("Authorization"),this.$router.push({path:"/login-user"})},sitePayClick:function(e){var t=this;this.appFetch({url:"orderList",method:"post",data:{type:"1",thread_id:this.themeId,amount:e}}).then((function(a){var i=a.data.attributes.order_sn;t.orderPay(i,e)}))},orderPay:function(e,t){var a=this,i=this.appCommonH.isWeixin().isWeixin,s=this.appCommonH.isWeixin().isPhone,n="";1==i?(alert("微信支付"),n="12"):n=1==s?"11":"10";var o="trade/pay/order/"+e;this.appFetch({url:o,method:"post",data:{payment_type:n}}).then((function(e){i||(s?window.location.href=e.data.attributes.wechat_h5_link:(a.qrcodeShow=!0,a.amountNum=t,a.codeUrl=e.data.attributes.wechat_qrcode))}))},loginJump:function(){this.$router.push({path:"login-user"})},registerJump:function(){this.$router.push({path:"sign-up"})},onRefresh:function(){var e=this;this.pageIndex=1,this.getInfo(!0).then((function(){e.$toast("刷新成功"),e.finished=!1,e.isLoading=!1})).catch((function(t){e.$toast("刷新失败"),e.isLoading=!1}))}},mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(e,t,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},Jgvg:function(e,t,a){"use strict";a.r(t);var i=a("pvnC"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);t.default=s.a},PFY0:function(e,t,a){"use strict";a.r(t);var i=a("uwtL"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,(function(){return i[e]}))}(n);t.default=s.a},QiNT:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,s=o(a("YEIV")),n=(a("ULRk"),o(a("+KBz")),o(a("VVfg")),o(a("6NK7")));function o(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){var e;return e={headBackShow:!1,oneHeader:!1,twoHeader:!1,threeHeader:!1,fourHeader:!1,isfixNav:!1,isShow:!1,isHeadShow:!1,showHeader:!1,showMask:!1,title:"",navActi:0,perDet:{themeNum:"1222",memberNum:"1222",circleLeader:"站长名称"},avatarUrl:"",mobile:"",userId:""},(0,s.default)(e,"isfixNav",!1),(0,s.default)(e,"popupShow",!1),(0,s.default)(e,"current",0),(0,s.default)(e,"userDet",[]),(0,s.default)(e,"categories",[]),(0,s.default)(e,"siteInfo",!1),(0,s.default)(e,"username",""),(0,s.default)(e,"isPayVal",""),(0,s.default)(e,"isWeixin",!1),(0,s.default)(e,"isPhone",!1),(0,s.default)(e,"firstCategoriesId",""),e},props:{personInfo:{type:!1},userInfoAvatarUrl:{type:String},userInfoName:{type:String},headFixed:{headFixed:!1},invitePerDet:{invitePerDet:!1},searchIconShow:{searchIconShow:!1},menuIconShow:{menuIconShow:!1},navShow:{navShow:!1},invitationShow:{invitationShow:!1},perDetShow:{perDet:!1},logoShow:{logoShow:!1}},created:function(){this.isWeixin=n.default.isWeixin().isWeixin,this.isPhone=n.default.isWeixin().isPhone,this.loadCategories()},watch:{isfixNav:function(e,t){this.isfixNav=e}},methods:(i={limitWidth:function(){document.getElementById("testNavBar").style.width="640px";var e=window.innerWidth;document.getElementById("testNavBar").style.marginLeft=(e-640)/2+"px"},loadCategories:function(){var e=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(t){e.siteInfo=t.readdata,e.isPayVal=t.readdata._data.siteMode})),this.appFetch({url:"categories",method:"get",data:{include:[]}}).then((function(t){console.log("2222"),console.log(t),e.categories=t.readdata,e.firstCategoriesId=t.readdata[0]._data.id,console.log(e.firstCategoriesId),e.$emit("update",e.firstCategoriesId),console.log("3456")}))},backUrl:function(){window.history.go(-1)},showPopup:function(){this.popupShow=!0},categoriesCho:function(e){this.$emit("categoriesChoice",e)},searchJump:function(){this.$router.push({path:"/search"})},handleTabFix:function(){if(this.headFixed)if((window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>document.querySelector("#testNavBar").offsetTop)this.showHeader=!0,this.isfixNav=!0,1!=this.isWeixin&&1!=this.isPhone&&this.limitWidth();else{this.showHeader=!1,this.isfixNav=!1;window.innerWidth;document.getElementById("testNavBar").style.marginLeft="0px"}}},(0,s.default)(i,"backUrl",(function(){window.history.go(-1)})),(0,s.default)(i,"LogOut",(function(){console.log("测试")})),(0,s.default)(i,"bindEvent",(function(e){1==e&&this.LogOut()})),i),mounted:function(){window.addEventListener("scroll",this.handleTabFix,!0)},beforeRouteLeave:function(e,t,a){window.removeEventListener("scroll",this.handleTabFix,!0),a()}}},WdXv:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("van-popup",{staticClass:"sidebarWrap",style:{height:"100%"},attrs:{position:"right"},model:{value:e.popupShow,callback:function(t){e.popupShow=t},expression:"popupShow"}},[a("sidebar",{attrs:{isPayVal:e.isPayVal}})],1),e._v(" "),e.$route.meta.oneHeader?a("div",{staticClass:"headerBox"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.invitePerDet,expression:"invitePerDet"}],staticClass:"invitePerDet"},[e.personInfo?a("div",{},[e.userInfoAvatarUrl?a("img",{staticClass:"inviteHead",attrs:{src:e.userInfoAvatarUrl,alt:""}}):a("img",{staticClass:"inviteHead",attrs:{src:e.appConfig.staticBaseUrl+"/images/noavatar.gif",alt:"ssss"}}),e._v(" "),e.invitePerDet&&e.userInfoName?a("div",{staticClass:"inviteName",model:{value:e.userInfoName,callback:function(t){e.userInfoName=t},expression:"userInfoName"}},[e._v(e._s(e.userInfoName))]):a("div",{staticClass:"inviteName"},[e._v("该用户已被删除")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:e.invitationShow,expression:"invitationShow"}],staticClass:"inviteWo"},[e._v("邀请您加入")])]):e._e()]),e._v(" "),a("div",{staticClass:"headeGap"}),e._v(" "),e.searchIconShow||e.menuIconShow?a("div",{staticClass:"headOpe"},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.searchIconShow,expression:"searchIconShow"}],staticClass:"icon iconfont icon-search",on:{click:e.searchJump}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.menuIconShow,expression:"menuIconShow"}],staticClass:"icon iconfont icon-Shape",attrs:{"is-link":""},on:{click:e.showPopup}})]):e._e(),e._v(" "),e.siteInfo._data.logo?a("img",{directives:[{name:"show",rawName:"v-show",value:e.logoShow,expression:"logoShow"}],staticClass:"logo",attrs:{src:e.siteInfo._data.logo}}):a("img",{directives:[{name:"show",rawName:"v-show",value:e.logoShow,expression:"logoShow"}],staticClass:"logo",attrs:{src:e.appConfig.staticBaseUrl+"/images/logo.png"}}),e._v(" "),e.siteInfo?a("div",{directives:[{name:"show",rawName:"v-show",value:e.perDetShow,expression:"perDetShow"}],staticClass:"circleDet"},[a("span",[e._v("主题："+e._s(e.siteInfo._data.threads))]),e._v(" "),a("span",[e._v("成员："+e._s(e.siteInfo._data.members))]),e._v(" "),e.siteInfo._data.siteAuthor?a("span",[e._v("站长："+e._s(e.siteInfo._data.siteAuthor.username))]):a("span",[e._v("站长：无")])]):e._e(),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.navShow,expression:"navShow"}],staticClass:"navBox",class:{fixedNavBar:e.isfixNav},attrs:{id:"testNavBar"}},[a("van-tabs",{model:{value:e.navActi,callback:function(t){e.navActi=t},expression:"navActi"}},e._l(e.categories,(function(t,i){return a("van-tab",{key:i},[a("span",{attrs:{slot:"title"},on:{click:function(a){return e.categoriesCho(t._data.id)}},slot:"title"},[e._v("\n              "+e._s(t._data.name)+"\n          ")])])})),1)],1)]):e._e()],1)},s=[];a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return s}))},omtG:function(e,t,a){"use strict";a.r(t);var i=a("WdXv"),s=a("Jgvg");for(var n in s)"default"!==n&&function(e){a.d(t,e,(function(){return s[e]}))}(n);var o=a("KHd+"),r=Object(o.a)(s.default,i.a,i.b,!1,null,null,null);t.default=r.exports},pvnC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o(a("QbLZ")),s=o(a("QiNT")),n=o(a("IsPG"));function o(e){return e&&e.__esModule?e:{default:e}}a("E2jd"),t.default=(0,i.default)({name:"headerView",components:{Sidebar:n.default}},s.default)},uwtL:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r(a("QbLZ")),s=r(a("QiNT")),n=r(a("F1+Y")),o=r(a("omtG"));function r(e){return e&&e.__esModule?e:{default:e}}a("E2jd"),t.default=(0,i.default)({name:"payCircleView",components:{Header:o.default}},s.default,n.default)}}]);