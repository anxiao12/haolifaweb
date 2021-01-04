(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["role"],{"6cae":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-role flex-col"},[i("div",{staticClass:"flex-v-center tool-bar"},[i("div",{staticClass:"flex-item"}),i("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(e){return t.$router.back()}}},[t._v("返回")])],1),i("div",{staticClass:"flex-item scroll-y"},[i("el-tree",{ref:"tree",attrs:{data:t.data,"node-key":"id",props:t.defaultProps}})],1),t.layer?i("layer",{attrs:{title:t.form.id?"编辑部门":"新增部门",width:"450px"}},[i("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[i("input-box",{attrs:{label:"角色名称",hint:"示例: ROLE_ADMIN"},model:{value:t.form.roleName,callback:function(e){t.$set(t.form,"roleName",e)},expression:"form.roleName"}}),i("input-box",{attrs:{label:"角色描述",hint:"示例: 管理员"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),i("select-box",{attrs:{filterable:"",list:t.depts,label:"部门"},model:{value:t.form.department.id,callback:function(e){t.$set(t.form.department,"id",e)},expression:"form.department.id"}})],1),i("div",{staticClass:"layer-btns"},[i("btn",{attrs:{flat:""},on:{click:t.cancel}},[t._v("取消")]),i("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],n=(i("4634"),i("9b68")),o={name:"page-role",components:{DataList:n["a"]},data:function(){return{layer:!1,list:[],depts:[],data:[],defaultProps:{label:"name",children:"childList"},form:{id:"",roleName:"",description:"",department:{id:""}}}},created:function(){this.getList()},watch:{layer:function(t){t&&!this.depts.length&&this.getDept()}},methods:{getList:function(){var t=this;this.$http.post("/haolifa/role/roleTree").then((function(e){t.data=e})).catch((function(e){t.$toast(e.message||e.msg)}))},getDept:function(){var t=this;this.$http.get("/haolifa/dept/list").then((function(e){e.forEach((function(t){t.value=t.id,t.text=t.deptName})),t.depts=e})).catch((function(e){t.$toast(e.message||e.msg)}))},menuEdit:function(t){this.$router.push({name:"role-edit",params:t})},edit:function(t){for(var e in this.form)"department"!==e?this.form[e]=t[e]:this.form.department={id:t.department.id};this.layer=!0},remove:function(t){var e=this,i=t.id;this.$confirm({title:"删除确认",text:"您确定要删除以下角色吗？<br><b>".concat(t.roleName,"</b>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("haolifa/role/"+i).then((function(t){e.$toast("删除成功"),e.getList()})).catch((function(t){e.$toast(t.message||t.msg)}))}})},cancel:function(){this.form.id=this.form.roleName=this.form.description="",this.layer=!1},vertify:function(){var t=this.form,e=t.roleName,i=t.description,a=t.department;return!!(e&&i&&a)||(this.$toast("请完整输入表单"),!1)},submit:function(){var t=this,e=this.form,i=""===e.id?"post":"put";if(this.vertify()){var a=JSON.parse(JSON.stringify(e));console.log(a),this.$http[i]("/haolifa/role",a).then((function(e){t.getList(),t.$toast("保存成功"),t.cancel()})).catch((function(e){t.$toast(e.message||e.msg)}))}}}},r=o,c=(i("be0e"),i("6691")),l=Object(c["a"])(r,a,s,!1,null,null,null);e["default"]=l.exports},"76ead":function(t,e,i){"use strict";var a=i("e2eb"),s=i.n(a);s.a},"7eca":function(t,e,i){"use strict";var a=i("e934"),s=i.n(a);s.a},"9b68":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"data-list relative f-12"},[i("transition",{attrs:{name:"slide-y"}},[t.list.length?i("table",{staticClass:"data-table"},[t._t("header",[i("tr",[i("th",[t._v("表头1")]),i("th",[t._v("表头2")])])]),t._l(t.list,(function(e,a){return i("tr",{key:e.id},[t._t("item",[i("td",[t._v("数据1")]),i("td",[t._v("数据2")])],{i:a,item:e,index:(t.pageNum-1)*t.pageSize+a+1})],2)}))],2):t._e()]),i("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?i("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?i("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():i("div",{staticStyle:{"margin-top":"100px"}},[i("no-data")],1)],1)},s=[];i("8f42"),i("4634"),i("ed8b");function n(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var o={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,i=this.method,a=this.url,s=this.pageSize,o=this.param;if(a){this.loading=!0;var r={pageSize:s};r[this.pageNumStr]=t;var c=Object.assign(r,o),l="get"===i?a+n(c):a;this.$http[i](l,c).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var i=e.$route.query;i.page=t.pageNum,e.$router.push({path:e.$route.path,query:i}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},r=o,c=(i("c8ea"),i("6691")),l=Object(c["a"])(r,a,s,!1,null,null,null);e["a"]=l.exports},a253:function(t,e,i){},ae3a:function(t,e,i){},be0e:function(t,e,i){"use strict";var a=i("ae3a"),s=i.n(a);s.a},c8ea:function(t,e,i){"use strict";var a=i("a253"),s=i.n(a);s.a},d638:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"page-role flex-col"},[i("div",{staticClass:"flex-v-center tool-bar"},[i("div",{staticClass:"flex-item"}),i("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(e){return t.showTree()}}},[t._v("角色预览")]),i("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(e){t.layer=!0}}},[t._v("新增角色")])],1),i("div",{staticClass:"flex-item scroll-y"},[i("transition",{attrs:{name:"slide-y"}},[t.list.length?i("table",{staticClass:"data-table"},[i("tr",[i("th",{staticStyle:{width:"60px"}},[t._v("序号")]),i("th",[t._v("角色描述")]),i("th",[t._v("角色名称")]),i("td",{staticStyle:{width:"100px","text-align":"right"}},[t._v("操作")])]),t._l(t.list,(function(e,a){return i("tr",{key:e.id},[i("td",[t._v(t._s(a+1))]),i("td",[t._v(t._s(e.description))]),i("td",[t._v(t._s(e.roleName||"-"))]),i("td",{staticClass:"t-right"},[i("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(i){return t.edit(e)}}},[t._v("编辑")]),t._v(" |\n                        "),i("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(i){return t.menuEdit(e)}}},[t._v("关联菜单")]),t._v(" |\n                        "),i("a",{staticClass:"red",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(i){return t.remove(e)}}},[t._v("删除")])])])}))],2):t._e()])],1),t.layer?i("layer",{attrs:{title:t.form.id?"编辑角色":"新增角色",width:"450px"}},[i("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[i("input-box",{attrs:{label:"角色名称",hint:"注：必须以ROLE_开头，示例: ROLE_ADMIN"},model:{value:t.form.roleName,callback:function(e){t.$set(t.form,"roleName",e)},expression:"form.roleName"}}),i("input-box",{attrs:{label:"角色描述",hint:"示例: 管理员"},model:{value:t.form.description,callback:function(e){t.$set(t.form,"description",e)},expression:"form.description"}}),i("input-box",{attrs:{label:"角色编号",hint:"示例: 字符串"},model:{value:t.form.roleNo,callback:function(e){t.$set(t.form,"roleNo",e)},expression:"form.roleNo"}})],1),i("div",{staticClass:"layer-btns"},[i("btn",{attrs:{flat:""},on:{click:t.cancel}},[t._v("取消")]),i("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],n=(i("4634"),i("9b68")),o={name:"page-role",components:{DataList:n["a"]},data:function(){return{layer:!1,list:[],depts:[],form:{id:"",roleName:"",description:"",roleNo:""}}},created:function(){this.getList()},watch:{layer:function(t){t&&!this.depts.length&&this.getDept()}},methods:{getList:function(){var t=this;this.$http.get("/haolifa/role").then((function(e){t.list=e})).catch((function(e){t.$toast(e.message||e.msg)}))},showTree:function(){this.$router.push("/role/tree")},getDept:function(){var t=this;this.$http.get("/haolifa/dept/list").then((function(e){e.forEach((function(t){t.value=t.id,t.text=t.deptName})),t.depts=e})).catch((function(e){t.$toast(e.message||e.msg)}))},menuEdit:function(t){this.$router.push({name:"role-edit",params:t})},edit:function(t){for(var e in this.form)"department"!==e?this.form[e]=t[e]:this.form.department={id:t.department.id};this.layer=!0},remove:function(t){var e=this,i=t.id;this.$confirm({title:"删除确认",text:"您确定要删除以下角色吗？<br><b>".concat(t.roleName,"</b>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("haolifa/role/"+i).then((function(t){e.$toast("删除成功"),e.getList()})).catch((function(t){e.$toast(t.message||t.msg)}))}})},cancel:function(){this.form.id=this.form.roleName=this.form.description="",this.layer=!1},vertify:function(){var t=this.form,e=t.roleName,i=t.description,a=t.roleNo;return!!(e&&i&&a)||(this.$toast("请完整输入表单"),!1)},submit:function(){var t=this,e=this.form,i=""===e.id?"post":"put";if(this.vertify()){var a=JSON.parse(JSON.stringify(e));console.log(a),this.$http[i]("/haolifa/role",a).then((function(e){t.getList(),t.$toast("保存成功"),t.cancel()})).catch((function(e){t.$toast(e.message||e.msg)}))}}}},r=o,c=(i("7eca"),i("6691")),l=Object(c["a"])(r,a,s,!1,null,null,null);e["default"]=l.exports},d680:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"apply-buy-add"},[i("div",{staticClass:"content"},[i("icon-btn",{staticClass:"mr-15",on:{click:function(e){return t.$router.back()}}},[t._v("arrow_back")]),i("div",{staticClass:"tflex-item",staticStyle:{display:"inline-block","font-size":"20px"}},[t._v("角色关联菜单")]),i("div",{staticClass:"flex"},[i("input-box",{staticClass:"flex-item",attrs:{disabled:"",label:"角色名称"},model:{value:t.description,callback:function(e){t.description=e},expression:"description"}})],1),i("p",[t._v("菜单选择")]),i("div",{staticClass:"flex"},[i("el-tree",{ref:"tree",attrs:{data:t.data,"node-click":t.nodeClick,"default-checked-keys":t.checkedList,"default-expanded-keys":t.checkedList,"node-key":"id","show-checkbox":"",props:t.defaultProps}})],1),i("div",{staticClass:"flex",staticStyle:{"margin-top":"20px"}},[i("btn",{staticClass:"mr-20",attrs:{big:""},on:{click:function(e){return t.submit()}}},[t._v("提交")]),i("btn",{attrs:{big:"",flat:""},on:{click:function(e){return t.$router.back()}}},[t._v("取消")])],1)],1),t.loading?i("layer",[i("div",{staticClass:"abs t-center",staticStyle:{padding:"20px"}},[i("loading",{attrs:{size:"30"}})],1)]):t._e()],1)},s=[],n=(i("c041"),{name:"notification-add",data:function(){return{defaultProps:{id:"id",label:"name",children:"childList"},loading:!1,description:"",id:"",data:[],checkedList:[]}},mounted:function(){var t=this.$route.params;this.id=t.id,this.description=t.description,this.getAllMenu(),this.getRoleMenu(this.id)},methods:{getRoleMenu:function(t){var e=this;this.$http.get("/haolifa/role/".concat(t,"/menu")).then((function(t){var i=t;e.checkedList=[];for(var a=0;a<i.length;a++)-1===i[a].code.indexOf("parent")&&(e.checkedList[a]=i[a].id);e.$refs.tree.setCheckedKeys(e.checkedList)})).catch((function(t){e.$toast(t.msg||t.message)}))},getAllMenu:function(){var t=this;this.$http.get("/haolifa/menu/menuTree").then((function(e){t.data=e})).catch((function(e){t.$toast(e.msg||e.message)}))},nodeClick:function(t){},submit:function(){var t=this;if(this.loading=!0,this.checkedList=this.$refs.tree.getCheckedKeys(),0!=this.checkedList.length){for(var e=[],i=0;i<this.checkedList.length;i++)e.push(parseInt(this.checkedList[i]));if(this.$refs.tree.getHalfCheckedKeys().length>0)for(var a=0;a<this.$refs.tree.getHalfCheckedKeys().length;a++)e.push(parseInt(this.$refs.tree.getHalfCheckedKeys()[a]));this.$http.post("/haolifa/role/".concat(this.id,"/menu"),e).then((function(e){t.loading=!1,t.$router.replace("/role")})).catch((function(e){t.loading=!1,t.$toast(e.msg||e.message)}))}else this.$toast("请至少选择一列菜单")}}}),o=n,r=(i("76ead"),i("6691")),c=Object(r["a"])(o,a,s,!1,null,null,null);e["default"]=c.exports},e2eb:function(t,e,i){},e934:function(t,e,i){}}]);
//# sourceMappingURL=role.2397203b.js.map