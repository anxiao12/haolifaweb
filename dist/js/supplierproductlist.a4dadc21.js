(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["supplierproductlist"],{"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},r=[];a("8f42"),a("4634"),a("ed8b");function s(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var l={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,r=this.pageSize,l=this.param;if(i){this.loading=!0;var n={pageSize:r};n[this.pageNumStr]=t;var o=Object.assign(n,l),u="get"===a?i+s(o):i;this.$http[a](u,o).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},n=l,o=(a("c8ea"),a("6691")),u=Object(o["a"])(n,i,r,!1,null,null,null);e["a"]=u.exports},a253:function(t,e,a){},a7ea:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-product-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.supplierName,expression:"filter.supplierName",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"供应商名称"},domProps:{value:t.filter.supplierName},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"supplierName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.supplierNo,expression:"filter.supplierNo",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"供应商编号"},domProps:{value:t.filter.supplierNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"supplierNo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.materialGraphNo,expression:"filter.materialGraphNo",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"图号"},domProps:{value:t.filter.materialGraphNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"materialGraphNo",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.filter.materialName,expression:"filter.materialName",modifiers:{trim:!0}}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"产品名称"},domProps:{value:t.filter.materialName},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"materialName",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"flex-item"})]),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"pageNum",param:t.filter,url:"/haolifa/supplier-pro/list",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,r=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(r))]),a("td",[t._v(t._s(i.materialGraphNo))]),a("td",[t._v(t._s(i.materialName))]),a("td",[t._v(t._s(t.materialTypeList[i.materialType]))]),a("td",[t._v(t._s(i.materialClassifyName))]),a("td",[t._v(t._s(i.supplierName))]),a("td",[t._v(t._s(i.supplierNo))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("供货物料图号")]),a("th",[t._v("产品名称")]),a("th",[t._v("产品类型")]),a("th",[t._v("图号分类")]),a("th",[t._v("供应商")]),a("th",[t._v("供应商编号")])])])],1)])},r=[],s=a("9b68"),l={name:"page-product-list",components:{DataList:s["a"]},data:function(){return{filter:{supplierName:"",supplierNo:""},materialTypeList:["供货原料","其他原料","阀体","阀座","阀板","阀杆","通用零件","驱动","标准件"]}},created:function(){console.log("")},methods:{edit:function(t){this.$router.push("/supplierproduct/edit?id=".concat(t.id))},remove:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下供应商产品吗？<br><b>".concat(t.materialName,"</b>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.get("/haolifa/supplier-pro/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update()})).catch((function(t){e.$toast(t.msg)}))}})}}},n=l,o=(a("aee4"),a("6691")),u=Object(o["a"])(n,i,r,!1,null,null,null);e["default"]=u.exports},aee4:function(t,e,a){"use strict";var i=a("f095"),r=a.n(i);r.a},c8ea:function(t,e,a){"use strict";var i=a("a253"),r=a.n(i);r.a},f095:function(t,e,a){}}]);
//# sourceMappingURL=supplierproductlist.a4dadc21.js.map