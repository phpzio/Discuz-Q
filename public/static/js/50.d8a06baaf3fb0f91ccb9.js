(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{Q3yS:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(a("JZuw"));a("cm59");var i=o(a("VVfg"));function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{sitePrice:"",siteExpire:"",orderSn:"",wxPayHref:"",qrcodeShow:!1,codeUrl:"",amountNum:"",payStatus:!1,payStatusNum:0,authorityList:""}},components:{PayHeader:n.default},methods:{leapFrogClick:function(){this.$router.push({path:"pay-circle-login"})},payClick:function(){var t=this,e=this.appCommonH.isWeixin().isWeixin,a=this.appCommonH.isWeixin().isPhone;e?(console.log("微信"),this.getOrderSn().then((function(){t.orderPay(12).then((function(){}))}))):a?(console.log("手机浏览器"),this.getOrderSn().then((function(){t.orderPay(11).then((function(e){t.wxPayHref=e.readdata._data.wechat_h5_link,window.location.href=t.wxPayHref}))}))):(console.log("pc"),this.getOrderSn().then((function(){t.orderPay(10).then((function(e){if(console.log(e),t.codeUrl="data:image/jpg;base64,"+e.readdata._data.wechat_qrcode,t.qrcodeShow=!0,t.payStatus&&t.payStatusNum<10)clearInterval(a);else var a=setInterval((function(){t.getUsersInfo()}),3e3)}))})))},getForum:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(e){console.log(e),t.sitePrice=e.readdata._data.setsite.site_price;var a=e.readdata._data.setsite.site_expire;switch(a){case"":case"0":t.siteExpire="永久有效";break;default:t.siteExpire="有效期自加入起"+a+"天"}})).catch((function(t){console.log(t)}))},getOrderSn:function(){var t=this;return this.appFetch({url:"orderList",method:"post",data:{type:1}}).then((function(e){console.log(e),t.orderSn=e.readdata._data.order_sn})).catch((function(t){console.log(t)}))},orderPay:function(t){return this.appFetch({url:"orderPay",method:"post",splice:"/"+this.orderSn,data:{payment_type:t}}).then((function(t){return console.log(t),t})).catch((function(t){console.log(t)}))},getUsersInfo:function(){var t=this;this.appFetch({url:"users",method:"get",splice:"/"+i.default.getLItem("tokenId"),data:{include:["groups"]}}).then((function(e){console.log(e),console.log(e.readdata._data.paid),t.payStatus=e.readdata._data.paid,t.payStatusNum=1,t.payStatus&&(t.qrcodeShow=!1,t.$router.push("/"),t.payStatusNum=11,clearInterval(pay))})).catch((function(t){console.log(t)}))},getUsers:function(t){return this.appFetch({url:"users",method:"get",splice:"/"+t,headers:{Authorization:"Bearer "+i.default.getLItem("Authorization")},data:{include:["groups"]}}).then((function(t){return console.log(t),t.readdata.groups[0]._data.id})).catch((function(t){console.log(t)}))},getAuthority:function(t){return this.appFetch({url:"authority",method:"get",splice:"/"+t,data:{include:["permission"]}}).then((function(t){return console.log(t),t})).catch((function(t){console.log(t)}))}},created:function(){var t=this;this.getForum(),this.getUsers(i.default.getLItem("tokenId")).then((function(e){t.getAuthority(e)})),this.amountNum=i.default.getLItem("siteInfo")._data.setsite.site_price}}},YXY0:function(t,e,a){"use strict";a.r(e);var n=a("eHCm"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e.default=i.a},cm59:function(t,e,a){},eHCm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(a("QbLZ"));a("i4TU");var i=o(a("Q3yS"));function o(t){return t&&t.__esModule?t:{default:t}}e.default=(0,n.default)({name:"pay-the-fee-view"},i.default)},i4TU:function(t,e,a){},iX2B:function(t,e,a){"use strict";a.r(e);var n=a("qCUt"),i=a("YXY0");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var s=a("KHd+"),r=Object(s.a)(i.default,n.a,n.b,!1,null,null,null);e.default=r.exports},qCUt:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pay-the-fee-box"},[a("PayHeader"),t._v(" "),a("main",{staticClass:"pay-the-fee-main"},[t._m(0),t._v(" "),a("van-button",{attrs:{type:"primary"},on:{click:t.payClick}},[t._v("立即付费,获得权限")]),t._v(" "),a("p",{staticClass:"pay-the-fee-title-footer"},[t._v("￥"+t._s(t.sitePrice)+" / "+t._s(t.siteExpire))])],1),t._v(" "),a("div",{staticClass:"pay-the-fee-permission"},[t._m(1),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"pay-the-fee-per-list-footer"},[a("p",{on:{click:t.leapFrogClick}},[t._v("跳过，进入首页")])])]),t._v(" "),a("van-popup",{staticClass:"qrCodeBox",attrs:{round:"","close-icon-position":"top-right",closeable:"","get-container":"body"},model:{value:t.qrcodeShow,callback:function(e){t.qrcodeShow=e},expression:"qrcodeShow"}},[a("span",{staticClass:"popupTit"},[t._v("立即支付")]),t._v(" "),a("div",{staticClass:"payNum"},[t._v("￥"),a("span",[t._v(t._s(t.amountNum))])]),t._v(" "),a("div",{staticClass:"payType"},[a("span",{staticClass:"typeLeft"},[t._v("支付方式")]),t._v(" "),a("span",{staticClass:"typeRight"},[a("i",{staticClass:"icon iconfont icon-wepay"}),t._v("微信支付")])]),t._v(" "),a("img",{staticClass:"qrCode",attrs:{src:t.codeUrl,alt:"微信支付二维码"}}),t._v(" "),a("p",{staticClass:"payTip"},[t._v("微信识别二维码支付")])])],1)},i=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-the-fee-titel"},[e("h2",[this._v("支付费用")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-the-fee-per-title"},[e("h3",[this._v("作为成员，您将获得以下权限")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pay-the-fee-per-list"},[e("div",{staticClass:"pay-the-fee-per-name"},[this._v("帖子操作")]),this._v(" "),e("p",[this._v("查看主题")]),this._v(" "),e("p",[this._v("发图文贴")])])}];a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return i}))}}]);