(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["process"],{"0406":function(t,e,s){},"13b8":function(t,e,s){"use strict";s("4f99")},"17af":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"process-prod flex-col"},[s("tab",{staticStyle:{margin:"0 20px"},model:{value:t.$route.name,callback:function(e){t.$set(t.$route,"name",e)},expression:"$route.name"}},[s("tab-item",{attrs:{href:"produceBase"},on:{click:function(e){return t.switchTab("/produceBase")}}},[t._v("审批")])],1),s("div",{staticClass:"flex-item scroll-y"},[s("div",{staticClass:"content"},[s("router-view")],1)])],1)},i=[],n=(s("8dee"),{name:"process-prod",methods:{switchTab:function(t){this.$router.replace({path:t,query:this.$route.query})}}}),r=n,c=(s("1a03"),s("cba8")),o=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=o.exports},"1a03":function(t,e,s){"use strict";s("2d22")},2147:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-manager"},[t._m(0),s("div",{staticClass:"flex-item scroll-y"},[t.flowList.length?s("table",{staticClass:"data-table"},[t._m(1),t._l(t.flowList,(function(e,a){return s("tr",[s("td",[t._v(t._s(e.id))]),s("td",[t._v(t._s(e.name))]),s("td",[t._v(t._s(e.description))]),s("td",[t._v(t._s(e.createTime))]),s("td",[s("a",{staticClass:"blue",attrs:{href:"javascript:;"},on:{click:function(s){return t.info(e.id)}}},[t._v("详情")])])])}))],2):t._e()])])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex-v-center tool-bar"},[s("div",{staticClass:"flex-item"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("th",{staticStyle:{width:"60px"}},[t._v("ID")]),s("th",[t._v("名称")]),s("th",[t._v("描述")]),s("th",[t._v("创建时间")]),s("th",{staticClass:"t-left",staticStyle:{width:"100px"}},[t._v("操作")])])}],n=s("9b68"),r={name:"page-manager",components:{DataList:n["a"]},data:function(){return{flowList:[]}},activated:function(){this.getList()},created:function(){this.getList()},methods:{getList:function(){var t=this;this.$http.get("/haolifa/flow/list/").then((function(e){t.flowList=e})).catch((function(e){t.$toast(e.msg||e.message)}))},info:function(t){this.$router.push("/process-manager/info?itemId=".concat(t))}}},c=r,o=(s("b671"),s("cba8")),l=Object(o["a"])(c,a,i,!1,null,null,null);e["default"]=l.exports},"222b":function(t,e,s){},"2a65":function(t,e,s){},"2d22":function(t,e,s){},"351c":function(t,e,s){"use strict";s("fcae")},"4f99":function(t,e,s){},"507d":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"process-prod flex-col"},[s("tab",{staticStyle:{margin:"0 20px"},model:{value:t.$route.name,callback:function(e){t.$set(t.$route,"name",e)},expression:"$route.name"}},[s("tab-item",{attrs:{href:"purchaseBase"},on:{click:function(e){return t.switchTab("/entrust")}}},[t._v("审批")])],1),s("div",{staticClass:"flex-item scroll-y"},[s("div",{staticClass:"content"},[s("router-view")],1)])],1)},i=[],n=(s("8dee"),{name:"process-prod",created:function(){},methods:{switchTab:function(t){this.$router.replace({path:t,query:this.$route.query})}}}),r=n,c=(s("b103"),s("cba8")),o=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=o.exports},"58be":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"process-prod flex-col"},[s("tab",{staticStyle:{margin:"0 20px"},model:{value:t.$route.name,callback:function(e){t.$set(t.$route,"name",e)},expression:"$route.name"}},[s("tab-item",{attrs:{href:"produceBase"},on:{click:function(e){return t.switchTab("/produceBase")}}},[t._v("审批")])],1),s("div",{staticClass:"flex-item scroll-y"},[s("div",{staticClass:"content"},[s("router-view")],1)])],1)},i=[],n=(s("8dee"),{name:"process-prod",methods:{switchTab:function(t){this.$router.replace({path:t,query:this.$route.query})}}}),r=n,c=(s("d29f"),s("cba8")),o=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=o.exports},"64e5":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"page-manager"},[t._m(0),s("div",{staticClass:"flex-item scroll-y"},[t.infoList.length?s("table",{staticClass:"data-table"},[t._m(1),t._l(t.infoList,(function(e,a){return s("tr",[s("td",[t._v(t._s(e.id))]),s("td",[t._v(t._s(e.stepName))]),s("td",[t._v(t._s(e.roleName))]),s("td",[t._v(t._s(e.userNames))]),s("td",[s("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(s){return t.allotRoles(e.stepId)}}},[t._v("审批分配")])],1)])}))],2):t._e()]),t.layer?s("layer",{attrs:{title:"分配审核权限",width:"450px"}},[s("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[s("label",[t._v("角色：")]),s("select",{directives:[{name:"model",rawName:"v-model",value:t.role.id,expression:"role.id"}],staticClass:"search-bar",on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.role,"id",e.target.multiple?s:s[0])},function(e){return t.rolesChange()}]}},t._l(t.roles,(function(e,a){return s("option",{domProps:{value:e.id}},[t._v(t._s(e.description))])})),0),s("div",[s("label",[t._v("人员：")]),s("ul",t._l(t.users,(function(e,a){return s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.checkUsers,expression:"checkUsers"}],attrs:{type:"checkbox"},domProps:{value:e.id,checked:Array.isArray(t.checkUsers)?t._i(t.checkUsers,e.id)>-1:t.checkUsers},on:{change:function(s){var a=t.checkUsers,i=s.target,n=!!i.checked;if(Array.isArray(a)){var r=e.id,c=t._i(a,r);i.checked?c<0&&(t.checkUsers=a.concat([r])):c>-1&&(t.checkUsers=a.slice(0,c).concat(a.slice(c+1)))}else t.checkUsers=n}}}),s("label",[t._v(t._s(e.realName))])])})),0)])]),s("div",{staticClass:"layer-btns"},[s("btn",{attrs:{flat:""},on:{click:t.cancel}},[t._v("取消")]),s("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"flex-v-center tool-bar"},[s("div",{staticClass:"flex-item"})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("tr",[s("th",{staticStyle:{width:"60px"}},[t._v("ID")]),s("th",[t._v("节点名称")]),s("th",[t._v("审核角色")]),s("th",[t._v("审核人")]),s("th",{staticClass:"t-left",staticStyle:{width:"100px"}},[t._v("操作")])])}],n=s("9b68"),r={name:"processmanager-info",components:{DataList:n["a"]},data:function(){return{allotForm:{flowId:0,stepId:0,roleId:0,userIds:""},flowId:0,layer:!1,roles:[],users:[],checkUsers:[],role:{id:"",name:""},infoList:[]}},activated:function(){var t=this.$route.query.itemId;this.flowId=t,this.allotForm.flowId=t,this.info(t),this.roleList()},created:function(){var t=this.$route.query.itemId;this.flowId=t,this.allotForm.flowId=t,this.info(t),this.roleList()},methods:{info:function(t){var e=this;this.$http.get("/haolifa/flow/steps/".concat(t)).then((function(t){e.infoList=t})).catch((function(t){e.$toast(t.msg||t.message)}))},allotRoles:function(t){this.layer=!0,this.allotForm.stepId=t},roleList:function(){var t=this;this.$http.get("/haolifa/flow/roles").then((function(e){t.roles=e,t.role.id=e[0].id,t.rolesChange()})).catch((function(e){t.$toast(e.msg||e.message)}))},rolesChange:function(){var t=this;this.$http.get("/haolifa/flow/users/".concat(this.role.id)).then((function(e){t.users=e})).catch((function(e){t.$toast(e.msg||e.message)}))},cancel:function(){this.layer=!1,this.checkUsers=[]},submit:function(){var t=this;this.allotForm.roleId=this.role.id;for(var e="",s=0;s<this.checkUsers.length;s++)e+=this.checkUsers[s]+",";this.allotForm.userIds=e.substr(0,e.length-1),this.$http.post("/haolifa/flow/allotPersons/",this.allotForm).then((function(e){t.layer=!1,t.checkUsers=[],t.info(t.flowId)})).catch((function(e){t.$toast(e.msg||e.message)}))}}},c=r,o=(s("66ce"),s("cba8")),l=Object(o["a"])(c,a,i,!1,null,null,null);e["default"]=l.exports},"66ce":function(t,e,s){"use strict";s("0406")},"96a6":function(t,e,s){},"9b68":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"data-list relative f-12"},[s("transition",{attrs:{name:"slide-y"}},[t.list.length?s("table",{staticClass:"data-table"},[t._t("header",(function(){return[s("tr",[s("th",[t._v("表头1")]),s("th",[t._v("表头2")])])]})),t._l(t.list,(function(e,a){return s("tr",{key:e.id},[t._t("item",(function(){return[s("td",[t._v("数据1")]),s("td",[t._v("数据2")])]}),{i:a,item:e,index:(t.pageNum-1)*t.pageSize+a+1})],2)}))],2):t._e()]),s("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?s("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?s("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():s("div",{staticStyle:{"margin-top":"100px"}},[s("no-data")],1)],1)},i=[];s("e680"),s("1bc78"),s("32ea");function n(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var r={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,s=this.method,a=this.url,i=this.pageSize,r=this.param;if(a){this.loading=!0;var c={pageSize:i};c[this.pageNumStr]=t;var o=Object.assign(c,r),l="get"===s?a+n(o):a;this.$http[s](l,o).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var s=e.$route.query;s.page=t.pageNum,e.$router.push({path:e.$route.path,query:s}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},c=r,o=(s("c8ea"),s("cba8")),l=Object(o["a"])(c,a,i,!1,null,null,null);e["a"]=l.exports},b103:function(t,e,s){"use strict";s("96a6")},b671:function(t,e,s){"use strict";s("222b")},c8ea:function(t,e,s){"use strict";s("2a65")},d29f:function(t,e,s){"use strict";s("e47d")},e47d:function(t,e,s){},e77b:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"process-prod flex-col"},[s("tab",{staticStyle:{margin:"0 20px"},model:{value:t.$route.name,callback:function(e){t.$set(t.$route,"name",e)},expression:"$route.name"}},[s("tab-item",{attrs:{href:"purchaseBase"},on:{click:function(e){return t.switchTab("/purchase")}}},[t._v("审批")])],1),s("div",{staticClass:"flex-item scroll-y"},[s("div",{staticClass:"content"},[s("router-view")],1)])],1)},i=[],n=(s("8dee"),s("a450"),{name:"process-prod",created:function(){console.log("log",this.$route.name)},methods:{switchTab:function(t){this.$router.replace({path:t,query:this.$route.query})}}}),r=n,c=(s("351c"),s("cba8")),o=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=o.exports},f52c:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"process-prod flex-col"},[s("tab",{staticStyle:{margin:"0 20px"},model:{value:t.$route.name,callback:function(e){t.$set(t.$route,"name",e)},expression:"$route.name"}},[s("tab-item",{attrs:{href:"replaceBase"},on:{click:function(e){return t.switchTab("/replaceBase")}}},[t._v("审批")])],1),s("div",{staticClass:"flex-item scroll-y"},[s("div",{staticClass:"content"},[s("router-view")],1)])],1)},i=[],n=(s("8dee"),{name:"process-prod",methods:{switchTab:function(t){this.$router.replace({path:t,query:this.$route.query})}}}),r=n,c=(s("13b8"),s("cba8")),o=Object(c["a"])(r,a,i,!1,null,null,null);e["default"]=o.exports},fcae:function(t,e,s){}}]);
//# sourceMappingURL=process.b6e7c085.js.map