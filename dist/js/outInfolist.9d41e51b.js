(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["outInfolist"],{"83b7":function(t,e,a){},"87bc":function(t,e,a){"use strict";var i=a("83b7"),s=a.n(i);s.a},"8a7c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-query-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.graphNo,expression:"filter.graphNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"图号"},domProps:{value:t.filter.graphNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"graphNo",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.model,expression:"filter.model"}],staticClass:"flex-item",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"型号"},domProps:{value:t.filter.model},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"model",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.specifications,expression:"filter.specifications"}],staticClass:"flex-item",staticStyle:{width:"100px"},attrs:{type:"text",placeholder:"规格"},domProps:{value:t.filter.specifications},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"specifications",e.target.value)}}}),a("select",{directives:[{name:"model",rawName:"v-model",value:t.filter.classifyId,expression:"filter.classifyId"}],staticClass:"f-14",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.filter,"classifyId",e.target.multiple?a:a[0])},function(e){return t.$refs.list.update(!0)}]}},[a("option",{attrs:{value:"0"}},[t._v("全部")]),t._l(t.classifyList,(function(e){return a("option",{key:e.value,domProps:{value:e.value}},[t._v(t._s(e.text))])}))],2),a("i",{staticClass:"icon",staticStyle:{"margin-left":"-20px","pointer-events":"none"}},[t._v("arrow_drop_down")])])]),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"pageNum",param:t.filter,url:"/haolifa/material/pageInfo",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.name))]),a("td",[t._v(t._s(i.graphNo))]),a("td",[t._v(t._s(i.model))]),a("td",[t._v(t._s(i.specifications))]),a("td",[t._v(t._s(i.currentQuantity))]),a("td",[t._v(t._s(i.lockQuantity))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("零件名称")]),a("th",[t._v("图号")]),a("th",[t._v("型号")]),a("th",[t._v("规格")]),a("th",[t._v("库存")]),a("th",[t._v("锁定数量")])])])],1)])},s=[],r=(a("7cfd"),a("9b68")),n={name:"material-query",components:{DataList:r["a"]},data:function(){return{classifyList:[],filter:{graphNo:"",model:"",specifications:"",classifyId:0}}},created:function(){this.getClassifyList()},methods:{getClassifyList:function(){var t=this;this.$http.get("/haolifa/material/classify/list").then((function(e){t.classifyList=e.map((function(t){return{value:t.id,text:t.classifyName}}))}))},remove:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下库房吗？<br><b>".concat(t.name,"</b>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("/haolifa/material/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update()})).catch((function(t){e.$toast(t.msg)}))}})}}},o=n,l=(a("87bc"),a("6691")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},9824:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-outInfo-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.orderNo,expression:"filter.orderNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"订单号"},domProps:{value:t.filter.orderNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"orderNo",e.target.value)}}})])]),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"currentPage",param:t.filter,url:"/haolifa/store-room/entryOut/pageInfo",method:"get"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.materialGraphNo))]),a("td",[t._v(t._s(i.orderNo))]),a("td",[t._v(t._s(i.materialBatchNo))]),a("td",[t._v(t._s(i.price))]),a("td",[t._v(t._s(i.quantity))]),a("td",[t._v(t._s(i.receiveDepartment))]),a("td",[t._v(t._s(i.storeRoomId))]),a("td",[t._v(t._s(i.storeRoomRackId))]),a("td",[t._v(t._s(i.storeRoomRackNo))]),a("td",[t._v(t._s(i.createTime))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("零件号")]),a("th",[t._v("订单号")]),a("th",[t._v("批次号")]),a("th",[t._v("零件购买单价")]),a("th",[t._v("出库数量（负数）")]),a("th",[t._v("领料部门")]),a("th",[t._v("库房Id")]),a("th",[t._v("库房货位Id")]),a("th",[t._v("库房货位号")]),a("th",[t._v("出库时间")])])])],1)])},s=[],r=(a("7cfd"),a("9b68")),n={name:"page-outInfo-list",components:{DataList:r["a"]},data:function(){return{filter:{type:2,operationType:1,materialGraphNo:"",orderNo:""},form:{materialGraphNo:"",orderNo:"",price:"",quantity:"",storeRoomId:"",storeRoomRackId:"",storeRoomRackNo:"",supplier:""}}},created:function(){var t=this.$route.query.graphNo;void 0!==t&&"outInfo-list"===this.$route.name&&(this.filter.materialGraphNo=t)},methods:{}},o=n,l=(a("e913"),a("6691")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},s=[];a("8f42"),a("4634"),a("ed8b");function r(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var n={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,s=this.pageSize,n=this.param;if(i){this.loading=!0;var o={pageSize:s};o[this.pageNumStr]=t;var l=Object.assign(o,n),c="get"===a?i+r(l):i;this.$http[a](c,l).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},o=n,l=(a("c8ea"),a("6691")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["a"]=c.exports},a253:function(t,e,a){},b94c:function(t,e,a){},c8ea:function(t,e,a){"use strict";var i=a("a253"),s=a.n(i);s.a},e913:function(t,e,a){"use strict";var i=a("b94c"),s=a.n(i);s.a}}]);
//# sourceMappingURL=outInfolist.9d41e51b.js.map