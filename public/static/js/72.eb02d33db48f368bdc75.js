(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{"4QZA":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(r("QbLZ")),s=n(r("56wF"));function n(e){return e&&e.__esModule?e:{default:e}}r("zt69"),t.default=(0,a.default)({name:"sign-up-set-view"},s.default)},"56wF":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(r("4gYi")),s=n(r("pNQN"));function n(e){return e&&e.__esModule?e:{default:e}}t.default={data:function(){return{checked:"",pwdLength:"",checkList:[]}},created:function(){this.signUpSet()},methods:{signUpSet:function(){var e=this;this.appFetch({url:"forum",method:"get",data:{}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(e.checked=t.readdata._data.setreg.register_close,e.pwdLength=t.readdata._data.setreg.password_length,e.checkList=t.readdata._data.setreg.password_strength.split(","),console.log(e.checkList),console.log(t))}))},submission:function(){var e=this,t=(this.pwdLength,this.checkList.join(","));this.appFetch({url:"settings",method:"post",data:{data:[{attributes:{key:"register_close",value:this.checked,tag:"default"}},{attributes:{key:"password_length",value:this.pwdLength,tag:"default"}},{attributes:{key:"password_strength",value:t,tag:"default"}}]}}).then((function(t){console.log(t),t.errors?t.errors[0].detail?e.$message.error(t.errors[0].code+"\n"+t.errors[0].detail[0]):e.$message.error(t.errors[0].code):e.$message({message:"提交成功",type:"success"})}))}},components:{Card:a.default,CardRow:s.default}}},BFfc:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"sign-up-set-box"},[r("Card",{attrs:{header:"新用户注册："}},[r("CardRow",{attrs:{description:"设置是否允许游客注册成为会员"}},[r("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("允许新用户注册")])],1)],1),e._v(" "),r("Card",{attrs:{header:"注册密码最小长度："}},[r("CardRow",{attrs:{description:"新用户注册时密码最小长度，0或不填为不限制"}},[r("el-input",{attrs:{type:"number",clearable:""},model:{value:e.pwdLength,callback:function(t){e.pwdLength=t},expression:"pwdLength"}})],1)],1),e._v(" "),r("Card",{attrs:{header:"密码字符类型："}},[r("CardRow",{attrs:{description:"新用户注册时密码中必须存在所选字符类型，不选则为无限制"}},[r("el-checkbox-group",{model:{value:e.checkList,callback:function(t){e.checkList=t},expression:"checkList"}},[r("el-checkbox",{attrs:{label:"0"}},[e._v("数字")]),e._v(" "),r("el-checkbox",{attrs:{label:"1"}},[e._v("小写字母")]),e._v(" "),r("el-checkbox",{attrs:{label:"2"}},[e._v("符号")]),e._v(" "),r("el-checkbox",{attrs:{label:"3"}},[e._v("大写字母")])],1)],1)],1),e._v(" "),r("Card",{staticClass:"footer-btn"},[r("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.submission}},[e._v("提交")])],1)],1)},s=[];r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return s}))},"e+0/":function(e,t,r){"use strict";r.r(t);var a=r("BFfc"),s=r("pOCi");for(var n in s)"default"!==n&&function(e){r.d(t,e,(function(){return s[e]}))}(n);var c=r("KHd+"),o=Object(c.a)(s.default,a.a,a.b,!1,null,null,null);t.default=o.exports},pOCi:function(e,t,r){"use strict";r.r(t);var a=r("4QZA"),s=r.n(a);for(var n in a)"default"!==n&&function(e){r.d(t,e,(function(){return a[e]}))}(n);t.default=s.a}}]);