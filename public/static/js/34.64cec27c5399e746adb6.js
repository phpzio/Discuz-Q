(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"0nbY":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"foueHeadBox"},[r("div",{staticClass:"fourHeader"},[r("span",{staticClass:"icon iconfont icon-back headBack",on:{click:e.headerBack}}),e._v(" "),r("h1",{staticClass:"headTit"},[e._v(e._s(e.$route.meta.title))])]),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.serHide,expression:"serHide"}],staticClass:"serBox"},[r("input",{staticClass:"serInp",attrs:{type:"text",name:"",placeholder:"搜索"},on:{click:e.serToggle}})]),e._v(" "),r("form",{attrs:{action:"/"}},[r("van-search",{directives:[{name:"show",rawName:"v-show",value:e.serShow,expression:"serShow"}],ref:"serInp",staticClass:"searchCon",attrs:{placeholder:"搜索用户和主题",background:"#f8f8f8","show-action":""},on:{input:e.handleSearch,cancel:e.onCancel},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}})],1)]),e._v(" "),r("van-list",{attrs:{finished:e.finished,offset:e.offset,"finished-text":"没有更多了"},on:{load:e.onLoad},model:{value:e.loading,callback:function(t){e.loading=t},expression:"loading"}},[r("van-pull-refresh",{on:{refresh:e.onRefresh},model:{value:e.isLoading,callback:function(t){e.isLoading=t},expression:"isLoading"}},[r("div",{staticClass:"searchRes memberCheckList"},[r("van-checkbox-group",{model:{value:e.result,callback:function(t){e.result=t},expression:"result"}},[r("van-cell-group",e._l(e.userList,(function(t){return r("van-cell",{key:t._data.username,staticClass:"resUser",attrs:{clickable:""},on:{click:function(r){return e.toggle(t._data.id)}}},[r("img",{staticClass:"resUserHead",attrs:{src:t._data.avatarUrl,alt:""}}),e._v(" "),r("div",{staticClass:"resUserDet"},[r("span",{staticClass:"resUserName"},[e._v(e._s(t._data.username))]),e._v(" "),r("span",{staticClass:"userRole"},[e._v(e._s(t.groups[0]&&t.groups[0]._data.name))]),e._v(" "),r("van-checkbox",{ref:"checkboxes",refInFor:!0,staticClass:"memberCheck",attrs:{slot:"right-icon",name:t._data.username},slot:"right-icon"})],1)])})),1)],1)],1)])],1),e._v(" "),r("div",{staticClass:"manageFootFixed"},[r("div",{staticClass:"operaCho"},[r("div",{staticClass:"operaWo",on:{click:e.showChoice}},[r("span",[e._v(e._s(e.choiceRes.attributes.name))]),e._v(" "),r("i",{staticClass:"icon iconfont icon-choice-item"})]),e._v(" "),e.choiceShow?r("ul",{staticClass:"operaChoList"},e._l(e.choList,(function(t){return r("li",{key:t.id,staticClass:"operaChoLi",on:{click:function(r){return r.stopPropagation(),e.setSelectVal(t)}}},[e._v(e._s(t.attributes.name))])})),0):e._e()]),e._v(" "),r("button",{staticClass:"checkSubmit",on:{click:e.handleSubmit}},[e._v("提交")])])],1)},a=[];r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return a}))},"14Xm":function(e,t,r){e.exports=r("u938")},"4psX":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,a=i(r("14Xm")),o=i(r("D3Ub"));function i(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{result:[],checkList:[],userList:[],choiceShow:!1,checkOperaStatus:!1,choList:[],searchName:"",userParams:{"filter[name]":"","page[limit]":15,"page[number]":1},userLoadMoreStatus:!1,userLoadMorePageChange:!1,choiceRes:{attributes:{name:"选择操作"}},loading:!1,finished:!1,isLoading:!1,pageSize:"",pageIndex:1,offset:100,searchTimeout:null,serHide:!0,serShow:!1}},created:(n=(0,o.default)(a.default.mark((function e(){return a.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getOperaType();case 2:this.handleSearch();case 3:case"end":return e.stop()}}),e,this)}))),function(){return n.apply(this,arguments)}),methods:{serToggle:function(){this.serHide=!1,this.serShow=!0,this.$refs.serInp.focus()},onCancel:function(){},toggle:function(e){var t=this.userList.length;if(0!==t){for(var r=[],n=0;n<t;n++){this.userList[n]._data.id===e&&(this.userList[n].checkStatus=!this.userList[n].checkStatus),this.userList[n].checkStatus&&r.push(this.userList[n]._data.username)}this.result=r}},showChoice:function(){this.choiceShow=!this.choiceShow},setSelectVal:function(e){this.choiceShow=!1,this.checkOperaStatus=!0,this.choiceRes=e},handleSearch:function(e){var t=this;console.log(e,"0000000000"),this.searchName=e||"",this.userParams={"filter[name]":this.searchName,"page[limit]":15,"page[number]":1},clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout((function(){t.getSearchValUserList(!0)}),300)},getSearchValUserList:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return(0,o.default)(a.default.mark((function r(){var n,o;return a.default.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.appFetch({method:"get",url:"users",data:e.userParams});case 3:n=r.sent,t&&(e.userList=[]),e.userList=e.userList.concat(n.readdata).map((function(e,t){var r=e;return r.checkStatus=!1,r})),e.finished=n.readdata.length<e.userParams["page[limit]"],r.next=14;break;case 9:r.prev=9,r.t0=r.catch(0),console.error(r.t0,"membersManagementCon.js getSearchValUserList"),o=e.userParams["page[number]"],e.userLoadMorePageChange&&e.userParams["page[number]"]>1&&(e.userParams["page[number]"]=o-1);case 14:return r.prev=14,e.userLoadMorePageChange=!1,r.finish(14);case 17:case"end":return r.stop()}}),r,e,[[0,9,14,17]])})))()},getOperaType:function(){var e=this;return(0,o.default)(a.default.mark((function t(){var r;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.appFetch({url:"groups",method:"get"});case 3:r=t.sent,e.choList=r.data,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0,"membersManagementCon.js getOperaType");case 10:return t.prev=10,t.finish(10);case 12:case"end":return t.stop()}}),t,e,[[0,7,10,12]])})))()},handleSubmit:function(){var e=this;return(0,o.default)(a.default.mark((function t(){var r,n,o,i;return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.checkOperaStatus){t.next=4;break}return e.$toast("未选择操作类型"),t.abrupt("return");case 4:if(0!==e.result.length){t.next=7;break}return e.$toast("未选择用户"),t.abrupt("return");case 7:for(r=[],n=e.choiceRes.id,o=0,i=e.userList.length;o<i;o++)e.userList[o].checkStatus&&r.push({attributes:{id:e.userList[o]._data.id,groupId:n}});return t.next=12,e.appFetch({url:"users",method:"PATCH",data:{data:r}});case 12:e.result=[],e.getSearchValUserList(!0),t.next=20;break;case 16:t.prev=16,t.t0=t.catch(0),console.error(t.t0,"handleSubmit error"),e.$toast("修改成员状态失败");case 20:case"end":return t.stop()}}),t,e,[[0,16]])})))()},onLoad:function(){var e=this;return(0,o.default)(a.default.mark((function t(){return a.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log(e.finished,"finished"),e.userLoadMorePageChange=!0,e.loading=!0,e.userParams["page[number]"]++,t.next=7,e.getSearchValUserList();case 7:t.next=11;break;case 9:t.prev=9,t.t0=t.catch(0);case 11:return t.prev=11,e.loading=!1,t.finish(11);case 14:case"end":return t.stop()}}),t,e,[[0,9,11,14]])})))()},onRefresh:function(){this.pageIndex=1,this.result=[],this.getSearchValUserList(!0),this.$toast("刷新成功"),this.isLoading=!1,this.finished=!1},headerBack:function(){console.log("回退"),this.$router.go(-1)}},mounted:function(){},beforeRouteLeave:function(e,t,r){r()}}},D3Ub:function(e,t,r){"use strict";t.__esModule=!0;var n,a=r("4d7F"),o=(n=a)&&n.__esModule?n:{default:n};t.default=function(e){return function(){var t=e.apply(this,arguments);return new o.default((function(e,r){return function n(a,i){try{var s=t[a](i),c=s.value}catch(e){return void r(e)}if(!s.done)return o.default.resolve(c).then((function(e){n("next",e)}),(function(e){n("throw",e)}));e(c)}("next")}))}}},NrFY:function(e,t,r){"use strict";r.r(t);var n=r("0nbY"),a=r("fKpU");for(var o in a)"default"!==o&&function(e){r.d(t,e,(function(){return a[e]}))}(o);r("vudI");var i=r("KHd+"),s=Object(i.a)(a.default,n.a,n.b,!1,null,"5a2aa350",null);t.default=s.exports},"Y+eA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(r("QbLZ")),a=o(r("4psX"));function o(e){return e&&e.__esModule?e:{default:e}}r("E2jd"),t.default=(0,n.default)({name:"managementCirclesView",components:{}},a.default)},fKpU:function(e,t,r){"use strict";r.r(t);var n=r("Y+eA"),a=r.n(n);for(var o in n)"default"!==o&&function(e){r.d(t,e,(function(){return n[e]}))}(o);t.default=a.a},gxdN:function(e,t,r){},ls82:function(e,t){!function(t){"use strict";var r,n=Object.prototype,a=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"==typeof e,h=t.regeneratorRuntime;if(h)u&&(e.exports=h);else{(h=t.regeneratorRuntime=u?e.exports:{}).wrap=b;var l="suspendedStart",f="suspendedYield",d="executing",p="completed",v={},m={};m[i]=function(){return this};var g=Object.getPrototypeOf,y=g&&g(g(j([])));y&&y!==n&&a.call(y,i)&&(m=y);var w=k.prototype=x.prototype=Object.create(m);_.prototype=w.constructor=k,k.constructor=_,k[c]=_.displayName="GeneratorFunction",h.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===_||"GeneratorFunction"===(t.displayName||t.name))},h.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,k):(e.__proto__=k,c in e||(e[c]="GeneratorFunction")),e.prototype=Object.create(w),e},h.awrap=function(e){return{__await:e}},S(C.prototype),C.prototype[s]=function(){return this},h.AsyncIterator=C,h.async=function(e,t,r,n){var a=new C(b(e,t,r,n));return h.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},S(w),w[c]="Generator",w[i]=function(){return this},w.toString=function(){return"[object Generator]"},h.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},h.values=j,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&a.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=r)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,a){return s.type="throw",s.arg=e,t.next=n,a&&(t.method="next",t.arg=r),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=a.call(i,"catchLoc"),u=a.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),v},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=r),v}}}function b(e,t,r,n){var a=t&&t.prototype instanceof x?t:x,o=Object.create(a.prototype),i=new N(n||[]);return o._invoke=function(e,t,r){var n=l;return function(a,o){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw o;return R()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var s=E(i,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var c=L(e,t,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}(e,r,i),o}function L(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}function x(){}function _(){}function k(){}function S(e){["next","throw","return"].forEach((function(t){e[t]=function(e){return this._invoke(t,e)}}))}function C(e){var t;this._invoke=function(r,n){function o(){return new Promise((function(t,o){!function t(r,n,o,i){var s=L(e[r],e,n);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"==typeof u&&a.call(u,"__await")?Promise.resolve(u.__await).then((function(e){t("next",e,o,i)}),(function(e){t("throw",e,o,i)})):Promise.resolve(u).then((function(e){c.value=e,o(c)}),i)}i(s.arg)}(r,n,t,o)}))}return t=t?t.then(o,o):o()}}function E(e,t){var n=e.iterator[t.method];if(n===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=r,E(e,t),"throw"===t.method))return v;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=L(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,v;var o=a.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=r),t.delegate=null,v):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,v)}function P(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function N(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(P,this),this.reset(!0)}function j(e){if(e){var t=e[i];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(a.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=r,t.done=!0,t};return o.next=o}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this}()||Function("return this")())},u938:function(e,t,r){var n=function(){return this}()||Function("return this")(),a=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,o=a&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,e.exports=r("ls82"),a)n.regeneratorRuntime=o;else try{delete n.regeneratorRuntime}catch(e){n.regeneratorRuntime=void 0}},vudI:function(e,t,r){"use strict";var n=r("gxdN");r.n(n).a}}]);