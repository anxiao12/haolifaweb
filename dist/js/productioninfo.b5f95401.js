(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["productioninfo"],{"417c":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-supplier-info abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"b f-18 flex-v-center",staticStyle:{"margin-bottom":"20px"}},[a("icon-btn",{staticClass:"mr-15",on:{click:function(e){return t.$router.back()}}},[t._v("arrow_back")]),a("div",{staticClass:"flex-item"},[t._v("收款记录")]),a("div",{staticClass:"flex-item ml-20"},[a("a",{staticClass:"a",staticStyle:{color:"#008eff"},attrs:{flat:"",href:"javascript:;"},on:{click:function(e){return t.addPay()}}},[t._v("新增收款记录")])])],1),a("table",{staticClass:"f-14"},[t._m(0),t._m(1),t._l(t.payList,(function(e){return a("tr",{key:e.id},[a("td",[t._v(t._s(e.orderNo))]),a("td",[t._v(t._s(e.invoiceNo))]),a("td",[t._v(t._s(e.amount.toLocaleString()))]),a("td",[t._v(t._s(e.payTime))]),a("td",[t._v(t._s(e.createUserId))]),a("td",[t._v(t._s(e.createTime))]),a("td",[t._v(t._s(e.updateTime))])])}))],2),a("div",{directives:[{name:"show",rawName:"v-show",value:t.addFlag,expression:"addFlag"}]},[a("div",{staticClass:"b",staticStyle:{margin:"20px 0 10px"}},[t._v("收款记录添加")]),a("div",{staticClass:"card flex",staticStyle:{"margin-top":"0"}},[a("div",{staticClass:"flex-item"},[a("div",{staticClass:"flex"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{disabled:"",hint:"必填",label:"合同订单号"},model:{value:t.order.orderNo,callback:function(e){t.$set(t.order,"orderNo",e)},expression:"order.orderNo"}}),a("input-box",{staticClass:"flex-item mr-10",attrs:{hint:"必填",label:"发票编号"},model:{value:t.order.invoiceNo,callback:function(e){t.$set(t.order,"invoiceNo",e)},expression:"order.invoiceNo"}}),a("input-box",{staticClass:"flex-item mr-10",attrs:{type:"number",hint:"必填",label:"总金额"},model:{value:t.order.amount,callback:function(e){t.$set(t.order,"amount",e)},expression:"order.amount"}})],1),a("div",{staticClass:"flex"},[a("date-picker",{staticClass:"flex-item mr-10",staticStyle:{"margin-right":"20px"},attrs:{hint:"必填",label:"收款日期"},model:{value:t.order.payTime,callback:function(e){t.$set(t.order,"payTime",e)},expression:"order.payTime"}}),a("div",{staticClass:"flex-item",staticStyle:{"line-height":"82px"}},[t._v("\n                            合同类型:\n                            "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.order.orderType,expression:"order.orderType"}],staticClass:"f-14 mr-10 select-form",staticStyle:{width:"70%"},attrs:{type:"number",hint:"必填",label:"合同类型"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.order,"orderType",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"1"}},[t._v("采购")]),a("option",{attrs:{value:"2"}},[t._v("生产")])]),a("i",{staticClass:"icon",staticStyle:{"margin-left":"-20px","pointer-events":"none"}},[t._v("arrow_drop_down")])])],1),a("div",{staticClass:"flex-item",staticStyle:{"text-align":"center"}},[a("button",{staticClass:"btn btn-sm",on:{click:function(e){return t.save()}}},[t._v("保存")])])])])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("td",{staticStyle:{width:"16%"}}),a("td",{staticStyle:{width:"16%"}}),a("td",{staticStyle:{width:"16%"}}),a("td",{staticStyle:{width:"16%"}}),a("td",{staticStyle:{width:"16%"}}),a("td",{staticStyle:{width:"20%"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("订单号")]),a("th",[t._v("发票编号")]),a("th",[t._v("总金额(￥)")]),a("th",[t._v("打款日期")]),a("th",[t._v("录入人")]),a("th",[t._v("创建日期")]),a("th",[t._v("更新日期")])])}],s={name:"purchsemanage-prodinfo",data:function(){return{loading:!1,info:{},itemList:[],orderUrl:"",detailFlag:!0,addFlag:!1,payList:{},order:{amount:"",orderNo:"",payTime:"",invoiceNo:"",orderType:1}}},created:function(){this.payClick()},methods:{payClick:function(){var t=this,e=this.$route.query.orderNo;this.order.orderNo=e,this.detailFlag=!1,this.payFlag=!0,this.$http.get("/haolifa/payment/list?orderNo=".concat(e)).then((function(e){t.payList=e})).catch((function(e){t.$toast(e.msg)}))},addPay:function(){this.detailFlag=!1,this.addFlag=!0},save:function(){var t=this;this.order.orderNo?this.order.amount?this.order.invoiceNo?this.order.payTime?(this.order.orderType=parseInt(this.order.orderType),this.$http.post("/haolifa/payment/save",this.order).then((function(e){t.$toast("提交成功"),t.order.amount="",t.order.payTime="",t.order.invoiceNo="",t.addFlag=!1,t.payClick(t.order.orderNo)})).catch((function(e){t.$toast(e.message||e.msg)}))):this.$toast("请选择收款日期"):this.$toast("请填写发票编号"):this.$toast("请填写总金额"):this.$toast("请填写合同订单号")}}},o=s,n=(a("d184"),a("6691")),l=Object(n["a"])(o,i,r,!1,null,null,null);e["default"]=l.exports},9079:function(t,e,a){},d184:function(t,e,a){"use strict";var i=a("9079"),r=a.n(i);r.a}}]);
//# sourceMappingURL=productioninfo.b5f95401.js.map