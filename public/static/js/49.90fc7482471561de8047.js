(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{"4U6O":function(e,t,a){"use strict";var s=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page-box"},[t("el-pagination",{attrs:{"current-page":this.currentPags,"page-size":this.pageSize,layout:"total, prev, pager, next,jumper",total:this.total},on:{"current-change":this.handleCurrentChange}})],1)},i=[];a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}))},"57Wb":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r(a("QbLZ"));a("cajz");var i=r(a("EhDv"));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,s.default)({name:"reply-review-view"},i.default)},EhDv:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=o(a("4gYi")),i=o(a("Dt3C")),r=o(a("rWG0")),l=o(a("VVfg")),n=o(a("wd/R"));function o(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{searchUserName:"",keyWords:"",showSensitiveWords:!1,pageOptions:[{value:10,label:"每页显示10条"},{value:20,label:"每页显示20条"},{value:30,label:"每页显示30条"}],pageSelect:10,searchReview:[{value:0,label:"未审核"},{value:2,label:"已忽略"}],searchReviewSelect:0,categoriesList:[],categoriesListSelect:"",searchTime:[{value:1,label:"全部"},{value:2,label:"最近一周"},{value:3,label:"最近一个月"},{value:4,label:"最近三个月"}],searchTimeSelect:1,relativeTime:["",""],reasonForOperation:[{value:"无",label:"无"},{value:"广告/SPAM",label:"广告/SPAM"},{value:"恶意灌水",label:"恶意灌水"},{value:"违规内容",label:"违规内容"},{value:"文不对题",label:"文不对题"},{value:"重复发帖",label:"重复发帖"},{value:"我很赞同",label:"我很赞同"},{value:"精品文章",label:"精品文章"},{value:"原创内容",label:"原创内容"},{value:"其他",label:"其他"}],reasonForOperationSelect:1,appleAll:!1,themeList:[],currentPaga:1,total:0,pageCount:1,ignoreStatus:!0,submitForm:[]}},methods:{handleSelectionChange:function(e){this.multipleSelection=e,this.multipleSelection.length>=1?this.deleteStatus=!1:this.deleteStatus=!0},reasonForOperationChange:function(e,t){this.submitForm[t].attributes.message=e},handleCurrentChange:function(e){console.log(e),this.getPostsList(e)},postSearch:function(){this.ignoreStatus=2!==this.searchReviewSelect,this.getPostsList()},searchTimeChange:function(e){var t=new Date,a=new Date;switch(this.relativeTime=[],e){case 1:this.relativeTime.push("","");break;case 2:a.setTime(a.getTime()-6048e5),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 3:a.setTime(a.getTime()-2592e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;case 4:a.setTime(a.getTime()-7776e6),this.relativeTime.push(this.formatDate(t),this.formatDate(a));break;default:this.$message.error("搜索日期选择错误，请重新选择！或 刷新页面（F5）")}console.log("相对时间："+this.relativeTime)},submitClick:function(){console.log(this.submitForm),this.patchPostsBatch(this.submitForm)},radioChange:function(e,t){switch(e){case 0:this.submitForm[t].attributes.isApproved=1;break;case 1:this.submitForm[t].attributes.isDeleted=!0;break;case 2:this.submitForm[t].attributes.isApproved=2}},allOperationsSubmit:function(e){var t=this;switch(e){case 1:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isApproved=1}));break;case 2:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isDeleted=!0}));break;case 3:this.submitForm.forEach((function(e,a){t.submitForm[a].attributes.isApproved=2}))}this.patchPostsBatch(this.submitForm)},singleOperationSubmit:function(e,t,a,s){var i={type:"posts",attributes:{isApproved:0,isDeleted:!1}};switch(e){case 1:i.attributes.isApproved=1,this.patchPosts(i,a);break;case 2:i.attributes.isDeleted=!0,i.attributes.message=this.submitForm[s].attributes.message,this.patchPosts(i,a);break;case 3:i.attributes.isApproved=2,this.patchPosts(i,a);break;default:console.log("系统错误，请刷新页面")}console.log(i)},viewClick:function(e){var t=this.$router.resolve({path:"/details/"+e});window.open(t.href,"_blank")},editClick:function(e,t){console.log(e);var a=this.$router.resolve({name:"reply-to-topic",query:{themeId:e,replyId:t}});window.open(a.href,"_blank")},formatDate:function(e){return(0,n.default)(e).format("YYYY-MM-DD HH:mm")},getPostsList:function(e){var t=this;this.appFetch({url:"posts",method:"get",data:{include:["user","thread","thread.category","thread.firstPost"],"filter[isDeleted]":"no","filter[username]":this.searchUserName,"page[number]":e,"page[size]":this.pageSelect,"filter[q]":this.keyWords,"filter[isApproved]":this.searchReviewSelect,"filter[createdAtBegin]":this.relativeTime[1],"filter[createdAtEnd]":this.relativeTime[0],"filter[categoryId]":this.categoriesListSelect}}).then((function(e){console.log(e),t.themeList=[],t.submitForm=[],t.themeList=e.readdata,t.total=e.meta.postCount,t.pageCount=e.meta.pageCount,t.themeList.forEach((function(e,a){t.submitForm.push({Select:"无",radio:"",type:"posts",id:e._data.id,attributes:{isApproved:0,isDeleted:!1,message:""}})}))})).catch((function(e){console.log(e)}))},getCategories:function(){var e=this;this.appFetch({url:"categories",method:"get",data:{}}).then((function(t){e.categoriesList=[],t.data.forEach((function(t,a){e.categoriesList.push({name:t.attributes.name,id:t.id})}))})).catch((function(e){console.log(e)}))},patchPostsBatch:function(e){var t=this;this.appFetch({url:"postsBatch",method:"patch",data:{data:e}}).then((function(e){e.meta&&e.data?t.$message.error("操作失败！"):(t.getPostsList(Number(l.default.getLItem("currentPag"))||1),t.$message({message:"操作成功",type:"success"})),console.log(e)})).catch((function(e){}))},patchPosts:function(e,t){var a=this;this.appFetch({url:"posts",method:"patch",splice:"/"+t,data:{data:e}}).then((function(e){e.meta&&e.data?a.$message.error("操作失败！"):(a.getPostsList(Number(l.default.getLItem("currentPag"))||1),a.$message({message:"操作成功",type:"success"}))})).catch((function(e){console.log(e)}))}},created:function(){this.getCategories(),this.getPostsList(Number(l.default.getLItem("currentPag"))||1)},components:{Card:s.default,ContArrange:i.default,Page:r.default}}},FCu8:function(e,t,a){"use strict";a.r(t);var s=a("57Wb"),i=a.n(s);for(var r in s)"default"!==r&&function(e){a.d(t,e,(function(){return s[e]}))}(r);t.default=i.a},MTZ4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r(a("QbLZ"));a("twg7");var i=r(a("xlY0"));function r(e){return e&&e.__esModule?e:{default:e}}t.default=(0,s.default)({name:"page"},i.default)},Skey:function(e,t,a){"use strict";a.r(t);var s=a("V71B"),i=a("FCu8");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);var l=a("KHd+"),n=Object(l.a)(i.default,s.a,s.b,!1,null,null,null);t.default=n.exports},V71B:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"reply-review-box"},[a("Card",{attrs:{header:"搜索"}}),e._v(" "),a("div",{staticClass:"cont-review-header"},[a("div",{staticClass:"cont-review-header__lf"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("用户名：")]),e._v(" "),a("el-input",{attrs:{size:"medium",placeholder:"搜索用户名",clearable:""},model:{value:e.searchUserName,callback:function(t){e.searchUserName=t},expression:"searchUserName"}})],1),e._v(" "),a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("每页显示：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择每页显示"},model:{value:e.pageSelect,callback:function(t){e.pageSelect=t},expression:"pageSelect"}},e._l(e.pageOptions,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)]),e._v(" "),a("div",{staticClass:"cont-review-header__rt"},[a("div",[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("内容包含：")]),e._v(" "),a("el-input",{staticClass:"content-contains-input",attrs:{size:"medium",clearable:"",placeholder:"搜索关键词"},model:{value:e.keyWords,callback:function(t){e.keyWords=t},expression:"keyWords"}}),e._v(" "),a("el-checkbox",{model:{value:e.showSensitiveWords,callback:function(t){e.showSensitiveWords=t},expression:"showSensitiveWords"}},[e._v("显示敏感词")])],1),e._v(" "),a("div",{staticClass:"cont-review-header__rt-search"},[a("span",{staticClass:"cont-review-header__lf-title"},[e._v("搜索范围：")]),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择审核状态"},model:{value:e.searchReviewSelect,callback:function(t){e.searchReviewSelect=t},expression:"searchReviewSelect"}},e._l(e.searchReview,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-select",{attrs:{size:"medium",clearable:"",placeholder:"选择搜索分类"},model:{value:e.categoriesListSelect,callback:function(t){e.categoriesListSelect=t},expression:"categoriesListSelect"}},e._l(e.categoriesList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择搜索时间"},on:{change:e.searchTimeChange},model:{value:e.searchTimeSelect,callback:function(t){e.searchTimeSelect=t},expression:"searchTimeSelect"}},e._l(e.searchTime,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.postSearch}},[e._v("搜索")])],1)])]),e._v(" "),a("div",{staticClass:"cont-review-table"},[e._l(e.themeList,(function(t,s){return a("ContArrange",{key:t._data.id,attrs:{replyBy:t.user?t.user._data.username:"该用户被删除",themeName:t.thread.firstPost._data.content,finalPost:e.formatDate(t._data.createdAt),ip:t._data.ip}},[a("div",{staticClass:"cont-review-table__side",attrs:{slot:"side"},slot:"side"},[a("el-radio-group",{on:{change:function(t){return e.radioChange(t,s)}},model:{value:e.submitForm[s].radio,callback:function(t){e.$set(e.submitForm[s],"radio",t)},expression:"submitForm[index].radio"}},[a("el-radio",{attrs:{label:0}},[e._v("通过")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("删除")]),e._v(" "),2!==t._data.isApproved?a("el-radio",{attrs:{label:2,disabled:2===t._data.isApproved}},[e._v("忽略")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"cont-review-table__main",attrs:{slot:"main"},slot:"main"},[e._v("\n        "+e._s(t._data.content)+"\n      ")]),e._v(" "),a("div",{staticClass:"cont-review-table__footer",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"cont-review-table__footer__lf"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(1,t.thread.category._data.id,t._data.id)}}},[e._v("通过")]),e._v(" "),a("i"),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(2,t.thread.category._data.id,t._data.id,s)}}},[e._v("删除")]),e._v(" "),a("i"),e._v(" "),2!==t._data.isApproved?a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.singleOperationSubmit(3,t.thread.category._data.id,t._data.id)}}},[e._v("忽略")]):e._e()],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__rt"},[a("span",[e._v("操作理由：")]),e._v(" "),a("el-input",{attrs:{size:"medium",clearable:""},model:{value:e.submitForm[s].attributes.message,callback:function(t){e.$set(e.submitForm[s].attributes,"message",t)},expression:"submitForm[index].attributes.message"}}),e._v(" "),a("el-select",{attrs:{size:"medium",placeholder:"选择操作理由"},on:{change:function(t){return e.reasonForOperationChange(t,s)}},model:{value:e.submitForm[s].Select,callback:function(t){e.$set(e.submitForm[s],"Select",t)},expression:"submitForm[index].Select"}},e._l(e.reasonForOperation,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),e._v(" "),a("div",{staticClass:"cont-review-table__footer__bottom"},[a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.viewClick(t.thread._data.id)}}},[e._v("查看")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){return e.editClick(t.thread._data.id,t._data.id)}}},[e._v("编辑")])],1)])])})),e._v(" "),e.pageCount>1?a("Page",{attrs:{"current-page":e.currentPaga,"page-size":e.pageSelect,total:e.total},on:{"current-change":e.handleCurrentChange}}):e._e()],2),e._v(" "),a("div",{staticClass:"cont-review-footer footer-btn"},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.submitClick}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.allOperationsSubmit(1)}}},[e._v("全部通过")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.allOperationsSubmit(2)}}},[e._v("全部删除")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.ignoreStatus,expression:"ignoreStatus"}],attrs:{type:"text"},on:{click:function(t){return e.allOperationsSubmit(3)}}},[e._v("全部忽略")]),e._v(" "),a("el-checkbox",{model:{value:e.appleAll,callback:function(t){e.appleAll=t},expression:"appleAll"}},[e._v("将操作应用到其他所有页面")])],1)],1)},i=[];a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}))},lxGk:function(e,t,a){"use strict";a.r(t);var s=a("MTZ4"),i=a.n(s);for(var r in s)"default"!==r&&function(e){a.d(t,e,(function(){return s[e]}))}(r);t.default=i.a},rWG0:function(e,t,a){"use strict";a.r(t);var s=a("4U6O"),i=a("lxGk");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);var l=a("KHd+"),n=Object(l.a)(i.default,s.a,s.b,!1,null,null,null);t.default=n.exports},twg7:function(e,t,a){},xlY0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s,i=a("VVfg"),r=(s=i)&&s.__esModule?s:{default:s};t.default={data:function(){return{currentPags:this.currentPage}},props:{total:Number,pageSize:{type:Number,default:10},currentPage:{type:Number,default:1}},methods:{handleCurrentChange:function(e){r.default.setLItem("currentPag",e),this.$emit("current-change",e)}},beforeUpdate:function(){this.currentPags=Number(r.default.getLItem("currentPag"))||1,r.default.setLItem("currentPag",this.currentPags)},beforeDestroy:function(){r.default.setLItem("currentPag",1)},created:function(){this.currentPags=Number(r.default.getLItem("currentPag"))||1}}}}]);