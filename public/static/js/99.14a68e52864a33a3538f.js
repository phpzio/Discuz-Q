(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{"1PNB":function(t,e,a){"use strict";a.r(e);var n=a("Id16"),s=a.n(n);for(var c in n)"default"!==c&&function(t){a.d(e,t,(function(){return n[t]}))}(c);e.default=s.a},Id16:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c(a("QbLZ")),s=c(a("WUP+"));function c(t){return t&&t.__esModule?t:{default:t}}a("lpfh"),e.default=(0,n.default)({name:"tencent-cloud-set-view"},s.default)},KVfl:function(t,e,a){"use strict";a.r(e);var n=a("l/it"),s=a("1PNB");for(var c in s)"default"!==c&&function(t){a.d(e,t,(function(){return s[t]}))}(c);var o=a("KHd+"),u=Object(o.a)(s.default,n.a,n.b,!1,null,null,null);e.default=u.exports},"WUP+":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c(a("4gYi")),s=c(a("pNQN"));function c(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{tableData:[{name:"云API",type:"qcloud_close",description:"配置云API的密钥后，才可使用腾讯云的各项服务和能力",status:"",icon:"iconAPI",setFlag:!0},{name:"图片内容安全",type:"qcloud_cms_image",description:"请先配置云API，开通腾讯云图片内容安全服务，并确保有对应套餐包",status:"",icon:"icontupian",setFlag:!1},{name:"文本内容安全",type:"qcloud_cms_text",description:"请先配置云API，开通腾讯云文本内容安全服务，并确保有对应套餐包",status:"",icon:"iconwenben",setFlag:!1},{name:"短信",type:"qcloud_sms",description:"请先配置云API，开通腾讯云短信服务，并确保腾讯云账户的短信额度充足",status:"",icon:"iconduanxin",setFlag:!0},{name:"实名认证",type:"qcloud_faceid",description:"请先配置云API，开通腾讯云的人脸核身服务，并确保有对应资源包",status:"",icon:"iconshimingrenzheng",setFlag:!1},{name:"对象存储",type:"qcloud_cos",description:"请先配置云API，开通腾讯云的对象存储及数据万象服务，并确保有对应资源包",status:"",icon:"iconduixiangcunchu",setFlag:!0}]}},created:function(){this.tencentCloudStatus()},methods:{configClick:function(t){switch(t){case"qcloud_close":this.$router.push({path:"/admin/tencent-cloud-config/cloud",query:{type:t}});break;case"qcloud_sms":this.$router.push({path:"/admin/tencent-cloud-config/sms",query:{type:t}});break;case"qcloud_cos":this.$router.push({path:"/admin/tencent-cloud-config/cos",query:{type:t}});break;default:this.loginStatus="default"}},tencentCloudStatus:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){e.errors?t.$message.error(e.errors[0].code):(e.readdata._data.qcloud.qcloud_close?t.tableData[0].status=!0:t.tableData[0].status=!1,e.readdata._data.qcloud.qcloud_cms_image?t.tableData[1].status=!0:t.tableData[1].status=!1,e.readdata._data.qcloud.qcloud_cms_text?t.tableData[2].status=!0:t.tableData[2].status=!1,e.readdata._data.qcloud.qcloud_sms?t.tableData[3].status=!0:t.tableData[3].status=!1,e.readdata._data.qcloud.qcloud_faceid?t.tableData[4].status=!0:t.tableData[4].status=!1,e.readdata._data.qcloud.qcloud_cos?t.tableData[5].status=!0:t.tableData[5].status=!1)}))},loginSetting:function(t,e,a){"qcloud_close"==e?this.changeSettings("qcloud_close",a):"qcloud_cms_image"==e?this.changeSettings("qcloud_cms_image",a):"qcloud_cms_text"==e?this.changeSettings("qcloud_cms_text",a):"qcloud_sms"==e?this.changeSettings("qcloud_sms",a):"qcloud_faceid"==e?this.changeSettings("qcloud_faceid",a):"qcloud_cos"==e&&this.changeSettings("qcloud_cos",a)},changeSettings:function(t,e){var a=this;this.appFetch({url:"settings",method:"post",data:{data:[{attributes:{key:t,value:e,tag:"qcloud"}}]}}).then((function(t){t.errors?a.$message.error(t.errors[0].code):(a.$message({message:"修改成功",type:"success"}),a.tencentCloudStatus())})).catch((function(t){}))}},components:{Card:n.default,CardRow:s.default}}},"l/it":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"padding-top":"15PX"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"date",label:"腾讯云设置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"pay-set-type-box"},[a("i",{staticClass:"iconfont table-icon",class:e.row.icon}),t._v(" "),a("div",{staticClass:"table-con-box"},[a("p",[t._v(t._s(e.row.name))]),t._v(" "),a("p",[t._v(t._s(e.row.description))])])])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"状态",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[t.row.status?a("span",{staticClass:"iconfont iconicon_select"}):a("span",{staticClass:"iconfont iconicon_"})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"address",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.status?a("div",[e.row.setFlag&&"img"!==e.row.type&&"text"!==e.row.type&&"name"!==e.row.type?a("el-button",{attrs:{size:"mini"},on:{click:function(a){return t.configClick(e.row.type)}}},[t._v("\n              配置\n            ")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini"},nativeOn:{click:function(a){return a.preventDefault(),t.loginSetting(e.$index,e.row.type,"0")}}},[t._v("\n              关闭\n            ")])],1):a("el-button",{attrs:{size:"mini"},nativeOn:{click:function(a){return a.preventDefault(),t.loginSetting(e.$index,e.row.type,"1")}}},[t._v("开启\n          ")])]}}])})],1)],1)])},s=[];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return s}))}}]);