(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["department"],{"17e5":function(t,e,a){},"76ca":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-department flex-col"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-item"}),a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(e){return t.add()}}},[t._v("新增部门")])],1),a("div",{staticClass:"flex-item scroll-y"},[a("el-tree",{ref:"tree",attrs:{data:t.data,"node-click":t.nodeClick,"node-key":"id",props:t.defaultProps},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.node,n=e.data;return a("span",{staticClass:"custom-tree-node"},[a("span",[t._v(t._s(i.label))]),a("span",{staticClass:"tree-span"},[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return t.add(n)}}},[t._v("\n            新增\n          ")]),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return t.edit(n)}}},[t._v("\n            编辑\n          ")]),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(){return t.remove(i,n)}}},[t._v("\n            删除\n          ")])],1)])}}])})],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑部门":"新增部门",width:"400px"}},[a("div",{staticClass:"layer-text"},[a("input-box",{attrs:{label:"部门名称"},model:{value:t.form.deptName,callback:function(e){t.$set(t.form,"deptName",e)},expression:"form.deptName"}}),a("input-box",{attrs:{label:"部门编号"},model:{value:t.form.deptNo,callback:function(e){t.$set(t.form,"deptNo",e)},expression:"form.deptNo"}}),a("input-box",{attrs:{label:"备注","multi-line":""},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:t.cancel}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},n=[],s=(a("7cfd"),a("9b68")),o={name:"page-department",components:{DataList:s["a"]},data:function(){return{layer:!1,list:[],data:[],defaultProps:{label:"name",children:"childList"},form:{id:"",deptName:"",description:"",deptNo:"",pid:0}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.$http.get("/haolifa/dept/departmentTree").then((function(e){t.data=e})).catch((function(e){t.$toast(e.message||e.msg)}))},nodeClick:function(){},add:function(t){this.layer=!0,this.form.pid=t?t.id:0},edit:function(t){this.layer=!0,this.form.id=t.id,this.form.pid=t.parentId,this.form.deptName=t.name,this.form.description=t.description,this.form.deptNo=t.no},remove:function(t,e){var a=this,i=e.id;this.$confirm({title:"删除确认",text:"您确定要删除以下部门吗？<br><b>".concat(e.name,"</b>"),color:"red",btns:["取消","删除"],yes:function(){a.$http({method:"delete",url:"haolifa/dept/".concat(e.id),data:i,headers:{"Content-Type":"application/json"}}).then((function(t){a.$toast("删除成功"),a.getList()})).catch((function(t){a.$toast(t.message||t.msg)}))}})},cancel:function(){this.form.id=this.form.deptName=this.form.description=this.form.deptNo="",this.layer=!1},submit:function(){var t=this,e=this.form,a=""===e.id?"post":"put";this.$http[a]("/haolifa/dept",e).then((function(e){t.getList(),t.$toast("保存成功"),t.cancel(),t.form.id=t.form.deptName=t.form.description=t.deptNo=""})).catch((function(e){t.$toast(e.message||e.msg)}))}}},r=o,c=(a("ee5e"),a("6691")),l=Object(c["a"])(r,i,n,!1,null,null,null);e["default"]=l.exports},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},n=[];a("8f42"),a("4634"),a("ed8b");function s(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var o={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,n=this.pageSize,o=this.param;if(i){this.loading=!0;var r={pageSize:n};r[this.pageNumStr]=t;var c=Object.assign(r,o),l="get"===a?i+s(c):i;this.$http[a](l,c).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},r=o,c=(a("c8ea"),a("6691")),l=Object(c["a"])(r,i,n,!1,null,null,null);e["a"]=l.exports},a253:function(t,e,a){},c8ea:function(t,e,a){"use strict";var i=a("a253"),n=a.n(i);n.a},ee5e:function(t,e,a){"use strict";var i=a("17e5"),n=a.n(i);n.a}}]);
//# sourceMappingURL=department.ebedcc49.js.map