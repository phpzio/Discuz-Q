(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{Ibkn:function(t,s,a){"use strict";a.r(s);var e=a("wt7h"),i=a("SyFs");for(var r in i)"default"!==r&&function(t){a.d(s,t,(function(){return i[t]}))}(r);var o=a("KHd+"),n=Object(o.a)(i.default,e.a,e.b,!1,null,null,null);s.default=n.exports},SyFs:function(t,s,a){"use strict";a.r(s);var e=a("lytT"),i=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(s,t,(function(){return e[t]}))}(r);s.default=i.a},VGvU:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e,i=a("VVfg"),r=(e=i)&&e.__esModule?e:{default:e};s.default={data:function(){return{siteInfo:!1,username:"",joinedAt:"",expiredAt:"",isLoading:!1,roleList:[],groupId:"",limitList:"",moreMemberShow:""}},beforeCreate:function(){},created:function(){this.loadSite();r.default.getLItem("tokenId")},beforeMount:function(){},methods:{loadSite:function(){var t=this,s=r.default.getLItem("tokenId"),a=this.appFetch({url:"users",method:"get",splice:"/"+s,data:{include:"groups"}}).then((function(s){s.errors?t.$toast.fail(s.errors[0].code):(t.roleList=s.readdata.groups,t.groupId=s.readdata.groups[0]._data.id,""==s.readdata._data.joinedAt||null==s.readdata._data.joinedAt?t.joinedAt=s.readdata._data.createdAt:t.joinedAt=s.readdata._data.joinedAt,t.expiredAt=s.readdata._data.expiredAt),t.appFetch({url:"groups",method:"get",splice:"/"+t.groupId,data:{include:["permission"]}}).then((function(s){s.errors?t.$toast.fail(s.errors[0].code):t.limitList=s.readdata}))}));return this.appFetch({url:"forum",method:"get",data:{include:["users"]}}).then((function(s){s.errors?t.$toast.fail(s.errors[0].code):(t.siteInfo=s.readdata,t.moreMemberShow=s.readdata._data.other.can_viewUser_list,s.readdata._data.set_site.site_author&&(t.username=s.readdata._data.set_site.site_author.username))})),a},moreCilrcleMembers:function(){this.$router.push({path:"circle-members"})},membersJump:function(t){this.$router.push({path:"/home-page/"+t})},onRefresh:function(){var t=this;this.loadSite().then((function(s){t.$toast("刷新成功"),t.isLoading=!1,t.finished=!1})).catch((function(s){t.$toast("刷新失败"),t.isLoading=!1}))}},mounted:function(){},beforeRouteLeave:function(t,s,a){a()}}},lytT:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=o(a("QbLZ")),i=o(a("JZuw")),r=o(a("VGvU"));function o(t){return t&&t.__esModule?t:{default:t}}a("iUmJ"),a("N960"),s.default=(0,e.default)({name:"circleInfoView",components:{comHeader:i.default}},r.default)},wt7h:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"circleCon"},[a("comHeader",{attrs:{title:"站点信息"}}),t._v(" "),a("van-pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.isLoading,callback:function(s){t.isLoading=s},expression:"isLoading"}},[a("div",{staticClass:"content"},[t.siteInfo?a("div",[a("div",{staticClass:"circlePL"},[a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("站点名称")]),t._v(" "),a("span",{staticClass:"infoItemRight"},[t._v(t._s(t.siteInfo._data.set_site.site_name))])])]),t._v(" "),a("div",{staticClass:"circlePL"},[a("div",{staticClass:"circleLoBox"},[a("span",{staticClass:"circleIcon"},[t._v("站点图标")]),t._v(" "),t.siteInfo._data.set_site.site_logo?a("img",{staticClass:"circleLogo",attrs:{src:t.siteInfo._data.set_site.site_logo}}):a("img",{staticClass:"circleLogo",attrs:{src:t.appConfig.staticBaseUrl+"/images/logo.png"}})])]),t._v(" "),a("div",{staticClass:"circleInfo padB0 lastBorNone"},[a("h1",{staticClass:"cirInfoTit"},[t._v("站点简介")]),t._v(" "),a("p",{staticClass:"cirInfoWord"},[t._v(t._s(t.siteInfo._data.set_site.site_introduction))]),t._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("创建时间")]),t._v(" "),a("span",{staticClass:"infoItemRight"},[t._v(t._s(t.siteInfo._data.set_site.site_install))])]),t._v(" "),t.siteInfo._data.set_site.site_price||t.siteInfo._data.set_site.site_expire?a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("加入方式")]),t._v(" "),a("span",{staticClass:"infoItemRight"},[t._v("付费"+t._s(t.siteInfo._data.set_site.site_price)+"元，"+t._s("0"===t.siteInfo._data.set_site.site_expire||""===t.siteInfo._data.set_site.site_expire?"永久加入":"有效期自加入起"+t.siteInfo._data.set_site.site_expire+"天"))])]):t._e(),t._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("站长")]),t._v(" "),t.siteInfo._data.set_site.site_author?a("span",{staticClass:"infoItemRight"},[t._v(t._s(t.username))]):a("span",{staticClass:"infoItemRight"},[t._v("无")])]),t._v(" "),a("div",{staticClass:"infoItem"},[a("div",{staticClass:"overHide"},[a("span",{staticClass:"infoItemLeft"},[t._v("站点成员")]),t._v(" "),t.moreMemberShow?a("a",{staticClass:"infoItemRight lookMore",on:{click:t.moreCilrcleMembers}},[t._v("查看更多"),a("span",{staticClass:"icon iconfont icon-right-arrow"})]):t._e()]),t._v(" "),a("div",{staticClass:"circleMemberList"},t._l(t.siteInfo.users,(function(s,e){return""!==s._data.avatarUrl&&null!==s._data.avatarUrl?a("img",{key:s._data.avatarUrl,staticClass:"circleMember",attrs:{src:s._data.avatarUrl,alt:s._data.username}}):a("img",{staticClass:"circleMember",attrs:{src:t.appConfig.staticBaseUrl+"/images/noavatar.gif"},on:{click:function(a){return t.membersJump(s._data.id)}}})})),0)])]),t._v(" "),a("div",{staticClass:"gap"}),t._v(" "),a("div",{staticClass:"circleInfo padT0"},[a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("我的角色")]),t._v(" "),t._l(t.roleList,(function(s,e){return a("span",{staticClass:"infoItemRight"},[t._v(t._s(s._data.name))])}))],2),t._v(" "),a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("加入时间")]),t._v(" "),a("span",{staticClass:"infoItemRight"},[t._v(t._s(t.$moment(t.joinedAt).format("YYYY-MM-DD")))])]),t._v(" "),t.expiredAt?a("div",{staticClass:"infoItem"},[a("span",{staticClass:"infoItemLeft"},[t._v("有效期至")]),t._v(" "),a("span",{staticClass:"infoItemRight"},[t._v(t._s(t.$moment(t.expiredAt).format("YYYY-MM-DD")))])]):t._e()]),t._v(" "),t.limitList?a("div",{staticClass:"powerListBox"},[a("div",{staticClass:"powerTit"},[t._v("作为"+t._s(t.limitList._data.name)+"，您将获得以下权限")]),t._v(" "),a("div",{staticClass:"powerList"},[a("div",{staticClass:"powerClassify"},[t._v("权限列表")]),t._v(" "),t._l(t.limitList.permission,(function(s,e){return a("div",{},[s._data.permission&&"viewThreads"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看主题列表")]):t._e(),t._v(" "),s._data.permission&&"thread.viewPosts"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看主题")]):t._e(),t._v(" "),s._data.permission&&"createThread"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("发表主题")]):t._e(),t._v(" "),s._data.permission&&"thread.reply"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("回复主题")]):t._e(),t._v(" "),s._data.permission&&"attachment.create.0"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("上传附件")]):t._e(),t._v(" "),s._data.permission&&"attachment.create.1"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("上传图片")]):t._e(),t._v(" "),s._data.permission&&"attachment.view.0"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看附件")]):t._e(),t._v(" "),s._data.permission&&"attachment.view.1"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看图片")]):t._e(),t._v(" "),s._data.permission&&"viewUserList"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("站点会员列表")]):t._e(),t._v(" "),s._data.permission&&"attachment.delete"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除附件")]):t._e(),t._v(" "),s._data.permission&&"cash.create"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("申请提现")]):t._e(),t._v(" "),s._data.permission&&"order.create"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("创建订单")]):t._e(),t._v(" "),s._data.permission&&"thread.hide"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除主题")]):t._e(),t._v(" "),s._data.permission&&"thread.hidePosts"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("删除回复")]):t._e(),t._v(" "),s._data.permission&&"thread.favorite"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("帖子收藏")]):t._e(),t._v(" "),s._data.permission&&"thread.likePosts"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("帖子点赞")]):t._e(),t._v(" "),s._data.permission&&"user.view"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("查看某个用户信息权限")]):t._e(),t._v(" "),s._data.permission&&"viewSiteInfo"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("站点信息")]):t._e(),t._v(" "),s._data.permission&&"user.edit"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑用户状态")]):t._e(),t._v(" "),s._data.permission&&"group.edit"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑用户组")]):t._e(),t._v(" "),s._data.permission&&"createInvite"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("管理-邀请加入")]):t._e(),t._v(" "),s._data.permission&&"thread.batchEdit"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("批量管理主题")]):t._e(),t._v(" "),s._data.permission&&"thread.editPosts"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("编辑")]):t._e(),t._v(" "),s._data.permission&&"thread.essence"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("加精")]):t._e(),t._v(" "),s._data.permission&&"thread.sticky"==s._data.permission?a("p",{staticClass:"powerChi"},[t._v("置顶")]):t._e()])}))],2)]):t._e()]):t._e()])])],1)},i=[];a.d(s,"a",(function(){return e})),a.d(s,"b",(function(){return i}))}}]);