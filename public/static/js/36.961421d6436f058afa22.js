(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{"3AWV":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(o("QbLZ"));o("iUmJ");var n=s(o("zkMY"));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(0,i.default)({name:"login-sign-up-footer"},n.default)},"9GjB":function(t,e,o){"use strict";o.r(e);var i=o("Fhwe"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,(function(){return i[t]}))}(s);e.default=n.a},Fhwe:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(o("QbLZ"));o("NdMT"),o("iUmJ");var n=s(o("JWhM"));function s(t){return t&&t.__esModule?t:{default:t}}e.default=(0,i.default)({name:"loging-phone-view"},n.default)},JWhM:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(o("JZuw")),n=r(o("UjaL")),s=o("L2JU"),a=r(o("VVfg"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{phone:"",sms:"",btnContent:"发送验证码",time:1,disabled:!1,isGray:!1,wxLoginShow:!0,phoneStatus:"",isOne:!1,siteMode:""}},components:{LoginHeader:i.default,LoginFooter:n.default},computed:(0,s.mapState)({status:function(t){return t.appSiteModule.status}}),methods:{loginUserClick:function(){this.$router.push({path:"/login-user"})},wxLoginClick:function(){this.$router.push({path:"/wx-login-bd"})},getCode:function(){var t=this;console.log(this.btnContent),this.appFetch({url:"sendSms",method:"post",data:{data:{attributes:{mobile:this.phone,type:"login"}}}}).then((function(e){console.log(e),e.errors?t.$toast.fail(e.errors[0].code):t.$toast.success("发送成功")})).catch((function(t){console.log(t)})),this.time=60,this.timer()},timer:function(){if(this.time>1){this.time--,this.btnContent=this.time+"s后重新获取",this.disabled=!0;var t=setTimeout(this.timer,1e3);this.isGray=!0}else 1==this.time&&(this.btnContent="获取验证码",clearTimeout(t),this.disabled=!1,this.isGray=!1)},phoneLoginClick:function(){var t=this;this.appFetch({url:"smsVerify",method:"post",data:{data:{attributes:{mobile:this.phone,code:this.sms,type:"login"}}}}).then((function(e){if(console.log(e),e.errors)t.$toast.fail(e.errors[0].code);else{t.$toast.success("登录成功");var o=e.data.attributes.access_token,i=e.data.id,n=e.data.attributes.refresh_token;a.default.setLItem("Authorization",o),a.default.setLItem("tokenId",i),a.default.setLItem("refreshToken",n),t.getUsers(i).then((function(e){e.readdata._data.paid?t.$router.push({path:"/"}):"pay"===t.siteMode?t.$router.push({path:"pay-circle-login"}):"public"===t.siteMode?t.$router.push({path:"/"}):console.log("缺少参数，请刷新页面")}))}})).catch((function(t){console.log(t)}))},getForum:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){console.log(e),e.errors?t.$toast.fail(e.errors[0].code):(t.phoneStatus=e.readdata._data.qcloud.qcloud_sms,t.siteMode=e.readdata._data.setsite.site_mode,a.default.setLItem("siteInfo",e.readdata))})).catch((function(t){console.log(t)}))},getUsers:function(t){var e=this;return this.appFetch({url:"users",method:"get",splice:"/"+t,headers:{Authorization:"Bearer "+a.default.getLItem("Authorization")},data:{include:["groups"]}}).then((function(t){if(console.log(t),!t.errors)return t;e.$toast.fail(t.errors[0].code)})).catch((function(t){console.log(t)}))}},mounted:function(){console.log(this.status)},created:function(){var t=this.appCommonH.isWeixin().isWeixin,e=this.appCommonH.isWeixin().isPhone;this.getForum(),!0===t?console.log("微信登录"):!0===e?(console.log("手机浏览器登录"),this.wxLoginShow=!1,this.isOne=!0):(console.log("pc登录"),this.isPC=!0)}}},NdMT:function(t,e,o){},Ra63:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("footer",{staticClass:"login-user-footer"},["login-user"===t.pageName||"login-phone"===t.pageName?[t.qcloudSms?o("span",{on:{click:t.retrieveClick}},[t._v("忘记密码？找回")]):t._e(),t._v(" "),t.registerClose&&t.qcloudSms?o("i"):t._e(),t._v(" "),t.registerClose?o("span",{on:{click:t.signUpClick}},[t._v("注册")]):t._e()]:"wx-login-bd"===t.pageName?[o("span",{on:{click:t.wxSignUpBdClick}},[t._v("没有账号？注册，绑定微信新账号")])]:"wx-sign-up-bd"===t.pageName?[o("span",{on:{click:t.wxLoginBdClick}},[t._v("已有账号？登录，微信绑定账号")])]:"sign-up"===t.pageName?[o("span",{on:{click:t.loginClick}},[t._v("已有账号立即登录")])]:"bind-phone"===t.pageName?[o("span",{on:{click:t.homeClick}},[t._v(t._s("pay"===t.siteMode?"跳过，进入支付费用":"跳过，进入首页"))])]:(t.pageName,[o("span")])],2)},n=[];o.d(e,"a",(function(){return i})),o.d(e,"b",(function(){return n}))},ReXb:function(t,e,o){"use strict";var i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-phone-box"},[o("LoginHeader"),t._v(" "),o("main",{staticClass:"login-phone-box-main"},[t._m(0),t._v(" "),o("div",{staticClass:"login-module-form"},[o("van-cell-group",[o("van-field",{attrs:{label:"手机号",placeholder:"请输入您的手机号"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t._v(" "),o("van-field",{attrs:{center:"",clearable:"",label:"验证码",placeholder:"请输入验证码"},model:{value:t.sms,callback:function(e){t.sms=e},expression:"sms"}},[o("van-button",{class:{grayBg:t.isGray},attrs:{slot:"button",size:"small",disabled:t.disabled,type:"default"},on:{click:t.getCode},slot:"button"},[t._v(t._s(t.btnContent))])],1)],1)],1),t._v(" "),o("div",{staticClass:"login-phone-btn"},[o("van-button",{attrs:{type:"primary"},on:{click:t.phoneLoginClick}},[t._v("登录")])],1),t._v(" "),o("div",{staticClass:"login-phone-method"},[o("div",{staticClass:"login-phone-method-box "},[o("van-divider",[t._v("其他登录方式")])],1),t._v(" "),o("div",{staticClass:"login-phone-method-icon"},[o("div",{staticClass:"login-phone-method-icon-box",class:{justifyCenter:t.isOne}},[o("i",{staticClass:"login-phone-method-icon-ring iconfont",on:{click:t.loginUserClick}},[o("span",{staticClass:"icon iconfont icon-yonghu",staticStyle:{color:"rgba(136, 136, 136, 1)"}})]),t._v(" "),o("i",{directives:[{name:"show",rawName:"v-show",value:t.wxLoginShow,expression:"wxLoginShow"}],staticClass:"login-phone-method-icon-ring iconfont",on:{click:t.wxLoginClick}},[o("span",{staticClass:"icon iconfont icon-weixin",staticStyle:{color:"rgba(136, 136, 136, 1)"}})])])])])]),t._v(" "),o("LoginFooter")],1)},n=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"login-module-title-box"},[e("p",{staticClass:"login-module-title"},[this._v("手机号登录")])])}];o.d(e,"a",(function(){return i})),o.d(e,"b",(function(){return n}))},UjaL:function(t,e,o){"use strict";o.r(e);var i=o("Ra63"),n=o("pz4+");for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);var a=o("KHd+"),r=Object(a.a)(n.default,i.a,i.b,!1,null,null,null);e.default=r.exports},"pz4+":function(t,e,o){"use strict";o.r(e);var i=o("3AWV"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,(function(){return i[t]}))}(s);e.default=n.a},rixG:function(t,e,o){"use strict";o.r(e);var i=o("ReXb"),n=o("9GjB");for(var s in n)"default"!==s&&function(t){o.d(e,t,(function(){return n[t]}))}(s);var a=o("KHd+"),r=Object(a.a)(n.default,i.a,i.b,!1,null,null,null);e.default=r.exports},zkMY:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,n=o("VVfg"),s=(i=n)&&i.__esModule?i:{default:i};e.default={data:function(){return{pageName:"login",siteMode:"",registerClose:!0,qcloudSms:!0}},methods:{retrieveClick:function(){this.$router.push("retrieve-pwd")},signUpClick:function(){this.$router.push("sign-up")},wxSignUpBdClick:function(){this.$router.push("/wx-sign-up-bd")},wxLoginBdClick:function(){this.$router.push("/wx-login-bd")},loginClick:function(){this.$router.push("/login-user")},homeClick:function(){switch(this.siteMode){case"pay":this.$router.push({path:"pay-the-fee"});break;case"public":this.$router.push({path:"/"});break;default:console.log("参数错误，请重新刷新页面")}},getForum:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){console.log(e),t.siteMode=e.readdata._data.setsite.site_mode,t.registerClose=e.readdata._data.setreg.register_close,t.qcloudSms=e.readdata._data.qcloud.qcloud_sms,s.default.setLItem("siteInfo",e.readdata)})).catch((function(t){console.log(t)}))}},created:function(){this.pageName=this.$router.history.current.name,this.getForum()}}}}]);