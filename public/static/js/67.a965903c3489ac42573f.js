(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"14lE":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(n("QbLZ"));n("Cpqr");var u=a(n("kwHM"));function a(t){return t&&t.__esModule?t:{default:t}}n("E2jd"),e.default=(0,r.default)({name:"my-notice"},u.default)},Cik8:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-notice-box my-info-money-header"},[n("MyNoticeHeader",{attrs:{title:"我的通知"}}),t._v(" "),n("main",{staticClass:"my-notice-main content"},t._l(t.num,(function(e,r){return n("van-cell",{key:r,attrs:{cless:"my-notice-cell","is-link":""},on:{click:function(n){return t.myJump(e.routerName)}}},[n("template",{staticClass:"my-notice-cell-template",slot:"title"},[n("span",{staticClass:"custom-title"},[t._v(t._s(e.title))]),t._v(" "),n("i",{directives:[{name:"show",rawName:"v-show",value:0!==e.number,expression:"item.number === 0 ? false:true"}],staticClass:"custom-title-icon",attrs:{type:"danger"}},[t._v(t._s(e.number))])])],2)})),1),t._v(" "),n("footer",{staticClass:"my-info-money-footer"})],1)},u=[];n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return u}))},Cpqr:function(t,e,n){},SE8h:function(t,e,n){"use strict";n.r(e);var r=n("Cik8"),u=n("rN9E");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);var i=n("KHd+"),o=Object(i.a)(u.default,r.a,r.b,!1,null,null,null);e.default=o.exports},kwHM:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,u=n("JZuw"),a=(r=u)&&r.__esModule?r:{default:r};e.default={data:function(){return{num:[{title:"回复我的",typeId:1,number:0,routerName:"reply"},{title:"打赏我的",typeId:3,number:0,routerName:"reward"},{title:"点赞我的",typeId:2,number:0,routerName:"like"}]}},mounted:function(){this.notice()},methods:{myJump:function(t){switch(t){case"reply":this.$router.push("/reply");break;case"reward":this.$router.push("/reward");break;case"like":this.$router.push("/like");break;default:this.$router.push("/")}},notice:function(){var t=this;this.appFetch({url:"noticeList",method:"get",standard:!1,data:{}}).then((function(e){console.log(e);var n=e.data;t.num=t.num.map((function(t){return t.number=n[t.typeId],console.log(t.number),t}))}))}},components:{MyNoticeHeader:a.default}}},rN9E:function(t,e,n){"use strict";n.r(e);var r=n("14lE"),u=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e.default=u.a}}]);