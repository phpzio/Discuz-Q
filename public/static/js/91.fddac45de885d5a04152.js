(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{"8nXa":function(t,e,a){"use strict";a.r(e);var s=a("zFIK"),o=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=o.a},hlrv:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wx-sign-up-bd-box"},[a("LoginHeader"),t._v(" "),a("main",{staticClass:"wx-sign-up-bd-main"},[t._m(0),t._v(" "),a("form",{staticClass:"wx-sign-up-bd-form",attrs:{action:""}},[a("van-cell-group",[a("van-field",{attrs:{clearable:"",label:"用户名",placeholder:"请输入您的用户名"},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}}),t._v(" "),a("van-field",{attrs:{type:"password",label:"密码",placeholder:"请填写密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),t._v(" "),a("div",{staticClass:"wx-sign-up-bd-btn"},[a("van-button",{attrs:{type:"primary"},on:{click:t.signUpBdClick}},[t._v("注册并绑定")])],1)]),t._v(" "),a("LoginFooter")],1)},o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wx-sign-up-bd-title-box"},[e("h2",{staticClass:"wx-sign-up-bd-title-box-h2"},[this._v("微信绑定账号")]),this._v(" "),e("div",{staticClass:"wx-sign-up-main-desc"},[this._v("您的微信号未绑定账号，请注册并绑定您的账号")])])}];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return o}))},nWjw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(a("JZuw")),o=i(a("UjaL")),n=i(a("VVfg")),r=i(a("6NK7"));function i(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{userName:"",password:"",phoneStatus:"",siteMode:"",openid:"",platform:""}},components:{LoginHeader:s.default,LoginFooter:o.default},methods:{signUpBdClick:function(){var t=this;this.appFetch({url:"register",method:"post",data:{data:{type:"users",attributes:{username:this.userName,password:this.password,openid:this.openid,platform:this.platform}}}}).then((function(e){if(console.log(e),e.errors)e.errors[0].detail?t.$toast.fail(e.errors[0].code+"\n"+e.errors[0].detail[0]):t.$toast.fail(e.errors[0].code);else{t.$toast.success("注册成功");var a=e.data.attributes.access_token,s=e.data.id,o=e.data.attributes.refresh_token;n.default.setLItem("Authorization",a),n.default.setLItem("tokenId",s),n.default.setLItem("refreshToken",o),t.getForum().then((function(){t.phoneStatus?t.$router.push({path:"bind-phone"}):"pay"===t.siteMode?t.$router.push({path:"pay-the-fee"}):"public"===t.siteMode?t.$router.push({path:"/"}):console.log("缺少参数，请刷新页面")}))}})).catch((function(t){console.log(t)}))},getForum:function(){var t=this;return this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){console.log(e),e.errors?t.$toast.fail(e.errors[0].code):(t.phoneStatus=e.readdata._data.qcloud.qcloud_sms,t.siteMode=e.readdata._data.setsite.site_mode)})).catch((function(t){console.log(t)}))}},created:function(){this.getForum(),this.openid=n.default.getLItem("openid");var t=r.default.isWeixin().isWeixin;this.platform=t?"mp":"dev"}}},oe1W:function(t,e,a){"use strict";a.r(e);var s=a("hlrv"),o=a("8nXa");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);var r=a("KHd+"),i=Object(r.a)(o.default,s.a,s.b,!1,null,null,null);e.default=i.exports},zFIK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a("QbLZ"));a("i4TU");var o=n(a("nWjw"));function n(t){return t&&t.__esModule?t:{default:t}}e.default=(0,s.default)({name:"wx-sign-up-bd"},o.default)}}]);