(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{"/NNm":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=o(a("QbLZ")),i=o(a("JZuw")),n=o(a("dWbn"));function o(t){return t&&t.__esModule?t:{default:t}}a("E2jd"),e.default=(0,s.default)({name:"detailsView",components:{comHeader:i.default}},n.default)},"6BJd":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"circleCon"},[a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("comHeader",{attrs:{title:"详情",menuIconShow:!0}}),t._v(" "),t.themeShow?a("div",{staticClass:"content marBfixed"},[a("div",{staticClass:"cirPostCon"},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[""==t.themeCon.user._data.avatarUrl&&null==t.themeCon.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:t.themeCon.user._data.avatarUrl,alt:""}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("div",{staticClass:"perDet"},[a("div",{staticClass:"perName"},[t._v(t._s(t.themeCon.user._data.username))]),t._v(" "),a("div",{staticClass:"postTime"},[t._v(t._s(t.themeCon.user._data.createdAt))])])]),t._v(" "),a("div",{staticClass:"postOpera"},[a("span",{staticClass:"icon iconfont icon-top"})])]),t._v(" "),a("div",{staticClass:"postContent"},[t.themeCon.firstPost._data.content?a("a",{attrs:{href:"javascript:;"},domProps:{innerHTML:t._s(t.themeCon.firstPost._data.content)}},[t._v("22222")]):t._e()]),t._v(" "),a("div",{staticClass:"postImgBox"},[a("div",{staticClass:"postImgList"},[a("img",{staticClass:"postPictures",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("img",{staticClass:"postPictures",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}})])]),t._v(" "),a("div",{staticClass:"uploadFileList"},[a("a",{staticClass:"fileChi",attrs:{href:"javascript:;"}},[a("span",{staticClass:"icon iconfont icon-pdf"}),t._v(" "),a("span",{staticClass:"fileName"},[t._v("文档名称.doc")])])]),t._v(" "),a("div",{staticClass:"postDetBot"},[a("span",{staticClass:"readNum"},[t._v(t._s(t.themeCon._data.viewCount)+" 阅读")]),t._v(" "),a("div",{staticClass:"screen",on:{click:t.bindScreen}},[a("span",[t._v("管理")]),t._v(" "),a("span",{staticClass:"icon iconfont icon-down-menu jtGrayB"}),t._v(" "),t.showScreen?a("div",{staticClass:"themeList"},t._l(t.themeChoList,(function(e,s){return a("a",{key:s,attrs:{href:"javascript:;"},on:{click:function(a){return t.themeOpera(t.themeCon.firstPost._data.id,e.type,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v(t._s(e.typeWo))])})),0):t._e()]),t._v(" "),a("a",{staticClass:"postDetR",attrs:{href:"javascript:;"},on:{click:function(e){return t.themeOpera(t.themeCon.firstPost._data.id,1,t.themeCon.category._data.id,t.themeCon.firstPost._data.content)}}},[t._v("收藏")]),t._v(" "),a("a",{staticClass:"postDetR",attrs:{href:"javascript:;"},on:{click:t.shareTheme}},[t._v("分享")])])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"commentBox"},[t.themeCon.firstPost.likedUsers?a("div",{staticClass:"likeBox"},[a("span",{staticClass:"icon iconfont icon-praise-after"}),t._v(" "),t._l(t.themeCon.firstPost.likedUsers,(function(e){return a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.jumpPerDet(e.id)}}},[t._v(t._s(e._data.username+","))])})),t._v(" 等"),a("span",[t._v(t._s(t.themeCon.firstPost._data.likeCount))]),t._v("个人觉得很赞\n          ")],2):t._e(),t._v(" "),t.themeCon.rewardedUsers?a("div",{staticClass:"payPer"},[a("span",{staticClass:"icon iconfont icon-money"}),t._v(" "),t._l(t.themeCon.rewardedUsers,(function(e){return e.avatarUrl?a("img",{staticClass:"payPerHead",attrs:{src:e._data.avatarUrl}}):a("img",{staticClass:"payPerHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}})}))],2):t._e(),t._v(" "),t._l(t.themeCon.posts,(function(e){return a("div",[a("div",{staticClass:"commentPostDet"},[a("div",{staticClass:"postTop"},[a("div",{staticClass:"postPer"},[e.user._data.avatarUrl?a("img",{staticClass:"postHead",attrs:{src:e.user._data.avatarUrl}}):a("img",{staticClass:"postHead",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"}}),t._v(" "),a("div",{staticClass:"perDet"},[a("div",{staticClass:"perName"},[t._v(t._s(e.user._data.username))]),t._v(" "),a("div",{staticClass:"postTime"},[t._v(t._s(e._data.updatedAt))])])])]),t._v(" "),a("div",{staticClass:"postContent"},[a("a",{attrs:{href:"javascript:;"},domProps:{innerHTML:t._s(e._data.content)}})])]),t._v(" "),a("div",{staticClass:"commentOpera padT22"},[e._data.isLiked?a("a",{on:{click:function(a){return t.replyOpera(e._data.id,"2",e._data.isLiked)}}},[a("span",{staticClass:"icon iconfont icon-praise-after",class:{"icon-like":t.likedClass}}),t._v(t._s(e._data.likeCount))]):a("a",{on:{click:function(a){return t.replyOpera(e._data.id,"2",e._data.isLiked)}}},[a("span",{staticClass:"icon iconfont icon-like",class:{"icon-praise-after":t.likedClass}}),t._v(t._s(e._data.likeCount))]),t._v(" "),a("a",{staticClass:"icon iconfont icon-review",on:{click:function(a){return t.replyToJump(t.themeCon._data.id,e._data.id,e._data.content)}}})])])}))],2)]):t._e()],1)],1)},i=[];a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i}))},dWbn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n(a("y0A3")),i=n(a("VVfg"));function n(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{headBackShow:!0,rewardShow:!1,themeCon:!1,themeShow:!1,examineNum:"qqqq",rewardNumList:[{rewardNum:"0.01"},{rewardNum:"2"},{rewardNum:"5"},{rewardNum:"10"},{rewardNum:"20"},{rewardNum:"50"},{rewardNum:"88"},{rewardNum:"128"},{rewardNum:"666"}],qrcodeShow:!1,amountNum:"",codeUrl:"",showScreen:!1,request:!1,isliked:"",likedClass:"",imageShow:!1,index:1,firstpostImageList:[],isPayVal:"",isPaid:"",situation1:!1,loginBtnFix:!1,loginHide:!1,siteInfo:!1,siteUsername:"",joinedAt:"",sitePrice:"",username:"",roleList:[],loading:!1,finished:!1,isLoading:!1,pageIndex:1,pageLimit:20,offset:100}},created:function(){this.getInfo(),this.detailsLoad(),this.themeCon?this.themeShow=!0:this.themeShow=!1},computed:{themeId:function(){return this.$route.params.themeId}},methods:{getInfo:function(){var t=this;this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(e){console.log(e),t.siteInfo=e.readdata}))},getUser:function(){var t=this,e=i.default.getLItem("tokenId");this.appFetch({url:"users",method:"get",splice:"/"+e,data:{include:"groups"}}).then((function(e){t.username=e.readdata._data.username,t.isPaid=e.readdata._data.paid,t.roleList=e.readdata.groups,""==e.readdata._data.joinedAt||null==e.readdata._data.joinedAt?t.joinedAt=e.readdata._data.createdAt:t.joinedAt=e.readdata._data.joinedAt,null!=t.isPaid&&""!=t.isPaid&&t.detailIf(t.isPayVal,!1)}))},detailIf:function(t){if("public"==t){console.log("公开");var e=i.default.getLItem("Authorization",e);e?(console.log("公开，已登录"),this.loadThemeList(),this.loginBtnFix=!1,this.loginHide=!0):(console.log("公开，未登录"),this.loginBtnFix=!0,this.loginHide=!1)}},footFix:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;1==this.loginBtnFix&&(this.loginHide=!0,this.loginHide=t>80)},detailsLoad:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a="threads/"+this.themeId;return this.appFetch({url:a,method:"get",data:{"filter[isDeleted]":"no",include:["user","posts","posts.user","posts.likedUsers","posts.images","firstPost","firstPost.likedUsers","firstPost.images","firstPost.attachments","rewardedUsers","category"],"page[number]":this.pageIndex,"page[limit]":this.pageLimit}}).then((function(a){e&&(t.themeCon=[]),console.log(a),console.log("1234"),t.themeShow=!0,t.themeCon=a.readdata,t.themeCon=t.themeCon.concat(a.readdata.posts),t.loading=!1,t.finished=a.data.length<t.pageLimit,t.themeCon=a.readdata;var s=t.themeCon.firstPost.images.length;if(0!==s){for(var i=[],n=0;n<s;n++){i.push("https://2020.comsenz-service.com/api/attachments/"+t.themeCon.firstPost.images[n]._data.uuid)}t.firstpostImageList=i,console.log(1,t.firstpostImageList)}})).catch((function(e){t.loading&&1!==t.pageIndex&&t.pageIndex--,t.loading=!1}))},imageSwiper:function(){this.imageShow=!0},onChange:function(t){this.index=t+1},shareTheme:function(){var t=s.default.devApiUrl+"/pay-circle-con/"+this.themeId,e=document.createElement("input");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("Copy"),e.className="oInput",e.style.display="none",this.$toast.success("分享链接已复制成功")},signOut:function(){i.default.removeLItem("tokenId"),i.default.removeLItem("Authorization"),this.$router.push({path:"/login-user"})},loginJump:function(){this.$router.push({path:"/login-user"}),i.default.setLItem("themeId",this.themeId)},registerJump:function(){this.$router.push({path:"/sign-up"}),i.default.setLItem("themeId",this.themeId)},sitePayClick:function(t){var e=this;this.appFetch({url:"orderList",method:"post",data:{type:"1",thread_id:this.themeId,amount:t}}).then((function(a){var s=a.data.attributes.order_sn;e.orderPay(s,t)}))},bindScreen:function(){this.showScreen=!this.showScreen},themeOpera:function(t,e,a,s){var i=new Object;1==e?(i.isFavorite=!0,s="",this.themeOpeRequest(i,a)):2==e?(s="",this.themeOpeRequest(i,a),i.isEssence=!0):3==e?(s="",i.isSticky=!0,this.themeOpeRequest(i,a)):4==e?(i.isDeleted=!0,s="",this.themeOpeRequest(i,a),this.$router.push({path:"/circle",name:"circle"})):this.$router.push({path:"/post-topic",name:"post-topic",params:{themeId:this.themeId,postsId:t,themeContent:s}})},themeOpeRequest:function(t,e){var a="threads/"+this.themeId;this.appFetch({url:a,method:"patch",data:{data:{type:"threads",attributes:t},relationships:{category:{data:{type:"categories",id:e}}}}}).then((function(t){}))},replyOpera:function(t,e,a){var s=this,i=new Object;1==e?i.isDeleted=!0:2==e&&(i.isLiked=!a);var n="posts/"+t;this.appFetch({url:n,method:"patch",data:{data:{type:"posts",attributes:i}}}).then((function(t){s.$message("修改成功"),s.detailsLoad()}))},showRewardPopup:function(){this.rewardShow=!0},replyToJump:function(t,e,a){this.$router.push({path:"/reply-to-topic",name:"reply-to-topic",params:{themeId:t,replyQuote:a,replyId:e}})},rewardPay:function(t){var e=this;this.appFetch({url:"orderList",method:"post",data:{type:"2",thread_id:this.themeId,amount:t}}).then((function(a){var s=a.data.attributes.order_sn;e.orderPay(s,t)}))},orderPay:function(t,e){var a=this,s=this.appCommonH.isWeixin().isWeixin,i=this.appCommonH.isWeixin().isPhone,n="";1==s?(alert("微信支付"),n="12"):n=1==i?"11":"10";var o="trade/pay/order/"+t;this.appFetch({url:o,method:"post",data:{payment_type:n}}).then((function(t){s||(i?window.location.href=t.data.attributes.wechat_h5_link:(a.qrcodeShow=!0,a.amountNum=e,a.codeUrl=t.data.attributes.wechat_qrcode))}))},onLoad:function(){this.loading=!0,this.pageIndex++,this.detailsLoad()},onRefresh:function(){var t=this;this.pageIndex=1,this.detailsLoad(!0).then((function(){t.$toast("刷新成功"),t.finished=!1,t.isLoading=!1})).catch((function(e){t.$toast("刷新失败"),t.isLoading=!1}))}},mounted:function(){},beforeRouteLeave:function(t,e,a){a()}}},t3ll:function(t,e,a){"use strict";a.r(e);var s=a("6BJd"),i=a("uxeJ");for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);var o=a("KHd+"),r=Object(o.a)(i.default,s.a,s.b,!1,null,null,null);e.default=r.exports},uxeJ:function(t,e,a){"use strict";a.r(e);var s=a("/NNm"),i=a.n(s);for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);e.default=i.a}}]);