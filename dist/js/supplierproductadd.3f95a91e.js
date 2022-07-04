(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["supplierproductadd"],{2717:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-product-list"},[a("i",{staticClass:"icon icon-abs",on:{click:t.flush}},[t._v("autorenew")]),a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.supplierName,expression:"filter.supplierName",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"供应商名称"},domProps:{value:t.filter.supplierName},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"supplierName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.supplierNo,expression:"filter.supplierNo",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"供应商编号"},domProps:{value:t.filter.supplierNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"supplierNo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.materialGraphNo,expression:"filter.materialGraphNo",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"图号"},domProps:{value:t.filter.materialGraphNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"materialGraphNo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.materialName,expression:"filter.materialName",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"产品名称"},domProps:{value:t.filter.materialName},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"materialName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"flex-item"}),a("router-link",{attrs:{to:"/supplierproduct/add"}},[a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"}},[t._v("新增供应商产品")])],1)],1),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"pageNum",param:t.filter,url:"/haolifa/supplier-pro/list",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,r=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(r))]),a("td",[t._v(t._s(i.materialGraphNo))]),a("td",[t._v(t._s(i.materialName))]),a("td",[t._v(t._s(t.materialTypeList[i.materialType]))]),a("td",[t._v(t._s(i.materialClassifyName))]),a("td",[t._v(t._s(i.supplierName))]),a("td",[t._v(t._s(i.supplierNo))]),a("td",[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(i)}}},[t._v("编辑")]),t._v(" |\n                    "),a("a",{staticClass:"red",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.remove(i)}}},[t._v("删除")])])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("供货物料图号")]),a("th",[t._v("产品名称")]),a("th",[t._v("产品类型")]),a("th",[t._v("图号分类")]),a("th",[t._v("供应商")]),a("th",[t._v("供应商编号")]),a("th",{staticClass:"t-center",staticStyle:{width:"80px"}},[t._v("操作")])])])],1)])},r=[],s=a("9b68"),l={name:"page-product-list",components:{DataList:s["a"]},data:function(){return{filter:{supplierName:"",supplierNo:""},materialTypeList:["供货原料","其他原料","阀体","阀座","阀板","阀杆","通用零件","驱动","标准件"]}},created:function(){},methods:{flush:function(){this.filter={supplierName:"",supplierNo:""},this.$refs.list.update(!0)},edit:function(t){this.$router.push("/supplierproduct/edit?id=".concat(t.id))},remove:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下供应商产品吗？<br><b>".concat(t.materialName,"</b>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.get("/haolifa/supplier-pro/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update(!0)})).catch((function(t){e.$toast(t.msg)}))}})}}},n=l,o=(a("da87"),a("cba8")),u=Object(o["a"])(n,i,r,!1,null,null,null);e["default"]=u.exports},2881:function(t,e,a){},"2a65":function(t,e,a){},"64eb":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-product-add abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"title b f-18"},[t._v(t._s(t.form[0].id?"编辑":"新增")+"供应商产品")]),t._l(t.form,(function(e,i){return a("div",{key:i},[a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"供货物料图号"},model:{value:e.materialGraphNo,callback:function(a){t.$set(e,"materialGraphNo",a)},expression:"item.materialGraphNo"}}),a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"产品名称"},model:{value:e.materialName,callback:function(a){t.$set(e,"materialName",a)},expression:"item.materialName"}})],1),a("div",{staticClass:"flex-v-center"},[a("select-box",{staticStyle:{width:"25%"},attrs:{list:t.materialTypeList,label:"产品类型"},model:{value:e.materialType,callback:function(a){t.$set(e,"materialType",a)},expression:"item.materialType"}}),a("select-box",{staticClass:"flex-item ml-10 mr-10",attrs:{list:t.supplierList,label:"供应商"},model:{value:e.supplierNo,callback:function(a){t.$set(e,"supplierNo",a)},expression:"item.supplierNo"}})],1),t.form.length>1?a("icon-btn",{attrs:{small:""},on:{click:function(e){return t.removeForm(i)}}},[t._v("close")]):t._e()],1)})),a("div",[a("btn",{staticClass:"mr-20",attrs:{big:""},on:{click:t.addPro}},[t._v("添加产品")])],1),a("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[a("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),a("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)],2)])},r=[],s={name:"page-product-add",data:function(){return{form:[{id:"",annualProduction:"",mainCustomer:"",materialGraphNo:"",materialName:"",materialType:"",supplierNo:""}],materialTypeList:[{text:"供货原料",value:0},{text:"其他原料",value:1}],supplierList:[]}},computed:{canSubmit:function(){var t=this.form,e=!1;return t.map((function(t){e=t.materialName&&t.supplierNo})),e}},activated:function(){this.form=[{id:"",annualProduction:"",mainCustomer:"",materialGraphNo:"",materialName:"",materialType:"",supplierNo:""}],this.getSupplierList()},created:function(){this.getSupplierList()},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/supplier-pro/info/".concat(t)).then((function(t){for(var a in e.form)void 0!==e.form[a]&&(e.form[a]=t[a])})).catch((function(t){e.$toast(t.msg||t.message)}))},getSupplierList:function(){var t=this;this.$http.get("/haolifa/supplier/list-all").then((function(e){t.supplierList=e.map((function(t){return{value:t.suppilerNo,text:t.suppilerName}}))}))},cancel:function(){var t=this;this.$confirm({title:"您确定要离开此页面吗？",text:"您的表单将不会保存",color:"red",btns:["取消","离开"],yes:function(){t.$store.commit("DELMENUTABS","/supplierproduct/add"),t.$router.push("/supplierproduct/addList")}})},removeForm:function(t){this.form.splice(t,1)},addPro:function(){this.form.push({id:"",annualProduction:"",mainCustomer:"",materialGraphNo:"",materialName:"",materialType:"",supplierNo:""})},submit:function(){var t=this,e=this.form;this.loading=!0,this.$http.post("/haolifa/supplier-pro/save",e).then((function(e){t.$toast("添加成功"),t.loading=!1,t.$store.commit("DELMENUTABS","/supplierproduct/add"),t.$router.push("/supplierproduct/addList")})).catch((function(e){t.loading=!1,t.$toast(e.msg||e.message)}))}}},l=s,n=(a("cc3e"),a("cba8")),o=Object(n["a"])(l,i,r,!1,null,null,null);e["default"]=o.exports},"79ab":function(t,e,a){},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",(function(){return[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]})),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",(function(){return[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])]}),{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},r=[];a("e680"),a("1bc78"),a("32ea");function s(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var l={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,r=this.pageSize,l=this.param;if(i){this.loading=!0;var n={pageSize:r};n[this.pageNumStr]=t;var o=Object.assign(n,l),u="get"===a?i+s(o):i;this.$http[a](u,o).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},n=l,o=(a("c8ea"),a("cba8")),u=Object(o["a"])(n,i,r,!1,null,null,null);e["a"]=u.exports},c8ea:function(t,e,a){"use strict";a("2a65")},cc3e:function(t,e,a){"use strict";a("2881")},da87:function(t,e,a){"use strict";a("79ab")}}]);
//# sourceMappingURL=supplierproductadd.3f95a91e.js.map