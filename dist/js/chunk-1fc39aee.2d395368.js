(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fc39aee"],{"0691":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-part-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.contractOrderNo,expression:"filter.contractOrderNo"}],staticClass:"flex-item",attrs:{type:"text",placeholder:"订单号"},domProps:{value:t.filter.contractOrderNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"contractOrderNo",e.target.value)}}}),a("select",{directives:[{name:"model",rawName:"v-model",value:t.filter.deliveryClassify,expression:"filter.deliveryClassify"}],on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.filter,"deliveryClassify",e.target.multiple?a:a[0])},function(e){return t.$refs.list.update(!0)}]}},[a("option",{attrs:{value:"0"}},[t._v("发货分类")]),t._l(t.classifyList,(function(e){return a("option",{key:e.value,domProps:{value:e.value}},[t._v(t._s(e.text))])}))],2),a("i",{staticClass:"icon",staticStyle:{"margin-left":"-20px","pointer-events":"none"}},[t._v("arrow_drop_down")])]),a("div",{staticClass:"flex-item"}),a("router-link",{attrs:{to:"/delivery-record/add"}},[a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"}},[t._v("新增发货记录")])],1)],1),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"pageNum",param:t.filter,url:"/haolifa/delivery/pageList",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item;return[a("td",[t._v(t._s(i.contractOrderNo))]),a("td",[t._v(t._s(i.deliveryNoticeNo))]),a("td",[t._v(t._s(t.classifyList[i.deliveryClassify-1].text))]),a("td",[t._v(t._s(i.deliveryTime))]),a("td",[t._v(t._s(i.customerNo))]),a("td",[t._v(t._s(i.productCount))]),a("td",[t._v(t._s(i.transportCompany))]),a("td",[t._v(t._s(i.collectProvince))]),a("td",[t._v(t._s(i.totalFee))]),a("td",[t._v(t._s(i.createTime))]),a("td",{staticClass:"t-right"},[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(i)}}},[t._v("编辑")])])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",[t._v("合同订单号")]),a("th",[t._v("发货通知单号")]),a("th",[t._v("发货分类")]),a("th",[t._v("发货日期/到货日期")]),a("th",[t._v("客户代号")]),a("th",[t._v("成品发货数量")]),a("th",[t._v("承运单位")]),a("th",[t._v("省市")]),a("th",[t._v("运费总金额")]),a("th",[t._v("创建时间")]),a("th",{staticClass:"t-right",staticStyle:{width:"80px"}},[t._v("操作")])])])],1)])},s=[],r=(a("7cfd"),a("9b68")),n={name:"page-delivery-record-list",components:{DataList:r["a"]},data:function(){return{classifyList:[],filter:{contractOrderNo:"",deliveryClassify:0}}},created:function(){this.getClassifyList()},methods:{edit:function(t){this.$router.push("/delivery-record/edit?id=".concat(t.id))},getClassifyList:function(){var t=this;this.$http.get("/haolifa/delivery/getClassifyList").then((function(e){t.classifyList=e.map((function(t){return{value:t.code,text:t.name}}))}))}}},l=n,o=(a("4b8d"),a("6691")),c=Object(o["a"])(l,i,s,!1,null,null,null);e["default"]=c.exports},"4b8d":function(t,e,a){"use strict";var i=a("cee6"),s=a.n(i);s.a},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},s=[];a("8f42"),a("4634"),a("ed8b");function r(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var n={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,s=this.pageSize,n=this.param;if(i){this.loading=!0;var l={pageSize:s};l[this.pageNumStr]=t;var o=Object.assign(l,n),c="get"===a?i+r(o):i;this.$http[a](c,o).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},l=n,o=(a("c8ea"),a("6691")),c=Object(o["a"])(l,i,s,!1,null,null,null);e["a"]=c.exports},a253:function(t,e,a){},c8ea:function(t,e,a){"use strict";var i=a("a253"),s=a.n(i);s.a},cee6:function(t,e,a){}}]);
//# sourceMappingURL=chunk-1fc39aee.2d395368.js.map