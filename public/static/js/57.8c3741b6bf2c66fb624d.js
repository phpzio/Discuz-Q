(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"03bQ":function(t,e,a){"use strict";a.r(e);var o=a("uBK9"),s=a("n9eR");for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);var r=a("KHd+"),i=Object(r.a)(s.default,o.a,o.b,!1,null,null,null);e.default=i.exports},"0owY":function(t,e,a){},dwjZ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(a("QbLZ"));a("0owY");var s=n(a("mHlf"));function n(t){return t&&t.__esModule?t:{default:t}}e.default=(0,o.default)({name:"user-rol-view"},s.default)},mHlf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(a("4gYi")),s=r(a("pNQN")),n=r(a("kAKY"));function r(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{tableData:[],alternateLength:0,radio:"",alternateRadio:"",radioName:"",deleteStatus:!0,multipleSelection:[],addStatus:!1}},methods:{handleSelectionChange:function(t){this.multipleSelection=t,this.multipleSelection.length>=1?this.deleteStatus=!1:this.deleteStatus=!0},radioChange:function(t){console.log(t),this.radioName=t._data.name,console.log(this.radio)},checkSelectable:function(t){switch(t._data.id){case"1":case"6":case"7":case"10":return!1;default:return!0}},addList:function(){this.alternateLength>=this.tableData.length&&this.tableData.push({_data:{name:"",type:"",color:"",icon:""}}),this.addStatus=!0,console.log(this.tableData)},submitClick:function(){if(this.addStatus&&this.multipleSelection.length>0)this.$message({showClose:!0,message:"新增用户角色未提交！请先提交，再操作其他角色",type:"warning"});else if(this.addStatus){for(var t={type:"groups",attributes:{name:""}},e=this.alternateLength;e<this.tableData.length;e++)t.attributes.name=this.tableData[e]._data.name;this.postGroups(t)}else if(this.multipleSelection.length>0){var a=[];this.multipleSelection.forEach((function(t){a.push({attributes:{name:t._data.name,id:t._data.id}})})),this.batchPatchGroup(a)}else this.radio!==this.alternateRadio?(console.log("修改默认级别"),this.singlePatchGroup(this.radio,this.radioName)):this.$message({showClose:!0,message:"操作选项错误，请重新选择 或 刷新页面(F5)",type:"warning"})},singleDelete:function(t,e){t>this.alternateLength-1?this.tableData.pop():this.singleDeleteGroup(e)},deleteClick:function(){var t={id:[]};this.multipleSelection.forEach((function(e){t.id.push(e._data.id)})),this.batchDeleteGroup(t)},getGroups:function(){var t=this;this.appFetch({url:"groups",method:"get",data:{}}).then((function(e){console.log(e),e.errors?t.$message.error(e.errors[0].code):(t.tableData=e.readdata,t.alternateLength=e.readdata.length,t.tableData.forEach((function(e){1==e._data.default&&(t.radio=e._data.id,t.alternateRadio=e._data.id)})))})).catch((function(t){console.log(t)}))},postGroups:function(t){var e=this;this.appFetch({url:"groups",method:"post",data:{data:t}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(e.$message({message:"提交成功！",type:"success"}),e.addStatus=!1,e.getGroups())})).catch((function(t){console.log(t)}))},singleDeleteGroup:function(t){var e=this;this.appFetch({url:"groups",method:"delete",splice:"/"+t,data:{}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(e.$message({message:"删除成功！",type:"success"}),e.getGroups())})).catch((function(t){console.log(t)}))},batchDeleteGroup:function(t){var e=this;this.appFetch({url:"groups",method:"delete",data:{data:t}}).then((function(t){t.errors?e.$message.error(t.errors[0].code):(e.$message({message:"删除成功！",type:"success"}),e.getGroups())})).catch((function(t){console.log(t)}))},singlePatchGroup:function(t,e){var a=this;this.appFetch({url:"groups",method:"patch",splice:"/"+t,data:{data:{attributes:{name:e,default:1}}}}).then((function(t){t.errors?a.$message.error(t.errors[0].code):(a.$message({message:"提交成功！",type:"success"}),a.getGroups())})).catch((function(t){console.log(t)}))},batchPatchGroup:function(t){var e=this;this.appFetch({url:"groups",method:"patch",data:{data:t}}).then((function(t){console.log(t),t.errors?e.$message.error(t.errors[0].code):(e.$message({message:"提交成功！",type:"success"}),e.getGroups())})).catch((function(t){console.log(t)}))}},created:function(){this.getGroups()},components:{Card:o.default,CardRow:s.default,TableContAdd:n.default}}},n9eR:function(t,e,a){"use strict";a.r(e);var o=a("dwjZ"),s=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);e.default=s.a},uBK9:function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-rol-box"},[a("div",{staticClass:"user-rol-table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",selectable:t.checkSelectable}}),t._v(" "),a("el-table-column",{attrs:{label:"级别名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{model:{value:e.row._data.name,callback:function(a){t.$set(e.row._data,"name",a)},expression:"scope.row._data.name"}})]}}])}),t._v(" "),a("el-table-column",{scopedSlots:t._u([{key:"default",fn:function(e){return["1"!==e.row._data.id?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.$router.push({path:"/admin/rol-permission",query:{id:e.row._data.id}})}}},[t._v("设置权限")]):t._e(),t._v(" "),"1"!==e.row._data.id&&"6"!==e.row._data.id&&"7"!==e.row._data.id&&"10"!==e.row._data.id?a("el-button",{attrs:{type:"text"},on:{click:function(a){return t.singleDelete(e.$index,e.row._data.id)}}},[t._v("删除")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"115"},scopedSlots:t._u([{key:"default",fn:function(e){return[1!=e.row._data.id&&"6"!==e.row._data.id&&"7"!==e.row._data.id?a("el-radio",{attrs:{label:e.row._data.id},on:{change:function(a){return t.radioChange(e.row)}},model:{value:t.radio,callback:function(e){t.radio=e},expression:"radio"}},[t._v("设为加入站点的默认级别")]):t._e()]}}])})],1)],1),t._v(" "),a("TableContAdd",{attrs:{cont:"新增"},on:{tableContAddClick:t.addList}}),t._v(" "),a("Card",{staticClass:"footer-btn"},[a("el-button",{attrs:{type:"primary",size:"medium"},on:{click:t.submitClick}},[t._v("提交")]),t._v(" "),a("el-button",{attrs:{size:"medium",disabled:t.deleteStatus},on:{click:t.deleteClick}},[t._v("删除")])],1)],1)},s=[];a.d(e,"a",(function(){return o})),a.d(e,"b",(function(){return s}))}}]);