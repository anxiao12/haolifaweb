(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-141184b3"],{"0027":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-part-list"},[a("i",{staticClass:"icon icon-abs",on:{click:t.flush}},[t._v("autorenew")]),a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.contractOrderNo,expression:"filter.contractOrderNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"订单号"},domProps:{value:t.filter.contractOrderNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"contractOrderNo",e.target.value)}}}),t._v("\n            发货状态:\n            "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.filter.deliverStatus,expression:"filter.deliverStatus"}],staticClass:"f-14",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.filter,"deliverStatus",e.target.multiple?a:a[0])},function(e){return t.$refs.list.update(!0)}]}},[a("option",{attrs:{value:"-1"}},[t._v("全部")]),a("option",{attrs:{value:"0"}},[t._v("待发货")]),a("option",{attrs:{value:"1"}},[t._v("部分发货")]),a("option",{attrs:{value:"2"}},[t._v("发货完成")])])]),a("div",{staticClass:"flex-item"})]),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",attrs:{"page-num-str":"pageNum",param:t.filter,url:"/haolifa/delivery/noticeList",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.deliveryNo))]),a("td",[a("a",{staticClass:"fixed-length",attrs:{href:i.deliveryUrl,title:i.deliveryUrl}},[t._v(t._s(i.deliveryUrl))])]),a("td",[t._v(t._s(i.contractOrderNo))]),a("td",[t._v(t._s(t.deliverStatusList[i.deliverStatus]))]),a("td",[t._v(t._s(i.totalCount))]),a("td",[t._v(t._s(i.deliveredNumber))]),a("td",[t._v(t._s(t.statusList[i.auditResult]))]),a("td",[t._v(t._s(i.auditInfo))]),a("td",[t._v(t._s(i.auditTime))]),a("td",[t._v(t._s(i.createTime))]),a("td",[t._v(t._s(i.updateTime))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("发货通知单号")]),a("th",{staticStyle:{width:"50px"}},[t._v("发货通知单")]),a("th",[t._v("订单号")]),a("th",[t._v("发货状态")]),a("th",[t._v("订单总数量")]),a("th",[t._v("已发货数量")]),a("th",[t._v("审批结果")]),a("th",[t._v("审批信息")]),a("th",[t._v("审批时间")]),a("th",[t._v("创建时间")]),a("th",[t._v("更新时间")])])])],1)])},s=[],r=a("9b68"),n={name:"page-bills-list",components:{DataList:r["a"]},data:function(){return{filter:{deliverStatus:0,contractOrderNo:"",deliveryNo:"",auditResult:"1"},statusList:{0:"待审核",1:"审核通过",2:"审核不通过"},deliverStatusList:{0:"待发货",1:"部分发货",2:"发货完成"}}},methods:{flush:function(){this.filter={deliverStatus:0,contractOrderNo:"",deliveryNo:"",auditResult:"1"},this.$refs.list.update(!0)},edit:function(t){this.$router.push("/delivery-bills/edit?id=".concat(t))},addRecord:function(t){this.$router.push("/delivery-record/add?contractOrderNo=".concat(t.contractOrderNo,"&deliveryNoticeNo=").concat(t.deliveryNo))},remove:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下发货通知单吗？<br>".concat(t.deliveryNo),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("/haolifa/material/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update(!0)})).catch((function(t){e.$toast(t.msg)}))}})}}},l=n,o=(a("0b2c"),a("cba8")),c=Object(o["a"])(l,i,s,!1,null,null,null);e["default"]=c.exports},"0b2c":function(t,e,a){"use strict";a("50e6")},"2a65":function(t,e,a){},"50e6":function(t,e,a){},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",(function(){return[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]})),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",(function(){return[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])]}),{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},s=[];a("e680"),a("1bc78"),a("32ea");function r(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var n={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,s=this.pageSize,n=this.param;if(i){this.loading=!0;var l={pageSize:s};l[this.pageNumStr]=t;var o=Object.assign(l,n),c="get"===a?i+r(o):i;this.$http[a](c,o).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},l=n,o=(a("c8ea"),a("cba8")),c=Object(o["a"])(l,i,s,!1,null,null,null);e["a"]=c.exports},c8ea:function(t,e,a){"use strict";a("2a65")}}]);
//# sourceMappingURL=chunk-141184b3.0beb9e65.js.map