(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{QVpe:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"worth-mention-box"},[e("div",{staticClass:"worth-mention__default"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.settingStatus}},[e("el-table-column",{attrs:{prop:"date",label:"微信设置类型"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("i",{staticClass:"iconfont table-icon",class:n.row.icon}),t._v(" "),e("div",{staticClass:"table-con-box"},[e("p",[t._v(t._s(n.row.name))]),t._v(" "),e("p",[t._v(t._s(n.row.description))])])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"name",label:"状态",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.status?e("span",{staticClass:"iconfont iconicon_select"}):e("span",{staticClass:"iconfont iconicon_"})]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"address",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(n){return[n.row.status?e("div",[e("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.configClick(n.row.tag)}}},[t._v("配置")]),t._v(" "),e("el-button",{attrs:{size:"mini"},nativeOn:{click:function(e){return e.preventDefault(),t.loginSetting(n.$index,n.row.type,"0")}}},[t._v("关闭")])],1):e("el-button",{attrs:{size:"mini"},nativeOn:{click:function(e){return e.preventDefault(),t.loginSetting(n.$index,n.row.type,"1")}}},[t._v("开启")])]}}])})],1)],1)])},o=[];e.d(n,"a",(function(){return a})),e.d(n,"b",(function(){return o}))},Y29O:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=i(e("4gYi")),o=i(e("pNQN"));function i(t){return t&&t.__esModule?t:{default:t}}n.default={data:function(){return{loginStatus:"default",settingStatus:[{name:"公众号接口配置",type:"offiaccount_close",tag:"wx_offiaccount",description:"用户在微信内使用微信授权登录",status:"",icon:"iconH"},{name:"小程序微信授权登录",type:"miniprogram_close",tag:"wx_miniprogram",description:"用户在小程序使用微信授权登录",status:"",icon:"iconxiaochengxu"},{name:"PC端微信扫码登录",type:"oplatform_close",tag:"wx_oplatform",description:"用户在PC的网页使用微信扫码登录",status:"",icon:"iconweixin"}]}},created:function(){this.loadStatus()},methods:{loadStatus:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(n){console.log(n.readdata._data.passport),"0"==n.readdata._data.passport.offiaccount_close?t.settingStatus[0].status=!1:t.settingStatus[0].status=!0,"0"==n.readdata._data.passport.miniprogram_close?t.settingStatus[1].status=!1:t.settingStatus[1].status=!0,"0"==n.readdata._data.passport.oplatform_close?t.settingStatus[2].status=!1:t.settingStatus[2].status=!0})).catch((function(t){}))},configClick:function(t){this.$router.push({path:"/admin/worth-mentioning-config/h5wx",query:{type:t}})},loginSetting:function(t,n,e){"offiaccount_close"==n?this.changeSettings("offiaccount_close",e,"wx_offiaccount"):"miniprogram_close"==n?this.changeSettings("miniprogram_close",e,"wx_miniprogram"):this.changeSettings("oplatform_close",e,"wx_oplatform")},changeSettings:function(t,n,e){var a=this;this.appFetch({url:"settings",method:"post",data:{data:[{attributes:{key:t,value:n,tag:e}}]}}).then((function(t){a.$message({message:"修改成功",type:"success"}),a.loadStatus()})).catch((function(t){cthis.$message.error("修改失败")}))}},components:{Card:a.default,CardRow:o.default}}},dKQ8:function(t,n,e){"use strict";e.r(n);var a=e("kl61"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n.default=o.a},"e/0E":function(t,n,e){"use strict";e.r(n);var a=e("QVpe"),o=e("dKQ8");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);var s=e("KHd+"),c=Object(s.a)(o.default,a.a,a.b,!1,null,null,null);n.default=c.exports},kl61:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=i(e("QbLZ")),o=i(e("Y29O"));function i(t){return t&&t.__esModule?t:{default:t}}e("zt69"),n.default=(0,a.default)({name:"worth-mentioning-set-view"},o.default)}}]);