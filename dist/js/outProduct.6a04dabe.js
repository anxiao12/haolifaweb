(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["outProduct"],{"9a49":function(t,o,e){"use strict";e.r(o);e("7f7f");var a=function(){var t=this,o=t._self._c;return o("div",{staticClass:"page-outMaterial-form abs scroll-y"},[o("div",{staticClass:"form-content"},[o("div",{staticClass:"title b f-18"},[t._v("成品出库")]),o("div",{staticClass:"flex-v-center"},[o("input-box",{staticClass:"flex-item mr-10",attrs:{label:"成品名称",disabled:"disabled"},model:{value:t.name,callback:function(o){t.name=o},expression:"name"}}),o("input-box",{staticClass:"flex-item mr-10",attrs:{label:"成品号",disabled:"disabled"},model:{value:t.form.productNo,callback:function(o){t.$set(t.form,"productNo",o)},expression:"form.productNo"}})],1),o("div",{staticClass:"flex-v-center"},[o("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"客户名称"},model:{value:t.form.customerName,callback:function(o){t.$set(t.form,"customerName",o)},expression:"form.customerName"}}),o("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"客户代号"},model:{value:t.form.customerNo,callback:function(o){t.$set(t.form,"customerNo",o)},expression:"form.customerNo"}}),o("input-box",{staticClass:"flex-item mr-10",staticStyle:{width:"25%"},attrs:{label:"订单号"},model:{value:t.form.orderNo,callback:function(o){t.$set(t.form,"orderNo",o)},expression:"form.orderNo"}}),o("input-box",{staticClass:"flex-item mr-10",staticStyle:{width:"25%"},attrs:{label:"出库单价（销售单价）"},model:{value:t.form.price,callback:function(o){t.$set(t.form,"price",o)},expression:"form.price"}})],1),o("div",{staticClass:"flex-v-center"},[o("select-box",{staticClass:"mr-10",staticStyle:{width:"33%"},attrs:{list:t.roomList,label:"所属库房"},on:{change:t.getRoomId},model:{value:t.form.storeRoomId,callback:function(o){t.$set(t.form,"storeRoomId",o)},expression:"form.storeRoomId"}}),o("select-box",{staticClass:"mr-10",staticStyle:{width:"33%"},attrs:{list:t.rackListnew,label:"所属库位"},on:{change:t.getRackId},model:{value:t.form.storeRoomRackNo,callback:function(o){t.$set(t.form,"storeRoomRackNo",o)},expression:"form.storeRoomRackNo"}}),o("input-box",{staticClass:"mr-10",staticStyle:{width:"33%"},attrs:{label:"出库数量（负数）"},model:{value:t.form.quantity,callback:function(o){t.$set(t.form,"quantity",o)},expression:"form.quantity"}})],1),o("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[o("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),o("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)])])},s=[],i=(e("a481"),e("7514"),{name:"page-outMaterial-form",data:function(){return{form:{productNo:"",customerName:"",customerNo:"",orderNo:"",price:"",quantity:"",storeRoomId:"",storeRoomRackId:"",storeRoomRackNo:""},name:"",roomList:[],rackList:[],rackListnew:[]}},computed:{canSubmit:function(){var t=this.form;return t.productNo&&t.quantity}},created:function(){var t=this.$route.query,o=t.productNo,e=t.name;void 0!==o&&"outProduct"===this.$route.name&&this.getInfo(o,e),this.getRoomList(),this.getRoomRackList(),this.getRoomId(),this.getRackId()},activated:function(){var t=this.$route.query,o=t.productNo,e=t.name;void 0!==o&&"outProduct"===this.$route.name&&this.getInfo(o,e),this.getRoomList(),this.getRoomRackList(),this.getRoomId(),this.getRackId()},methods:{getRackId:function(){var t=this,o=this.rackList.find((function(o){return o.value===t.form.storeRoomRackNo}));this.form.storeRoomRackId=o?o.id:""},getRoomId:function(){var t=this,o=this.rackList.filter((function(o){return o.roomId===t.form.storeRoomId}));this.rackListnew=o},getRoomList:function(){var t=this;this.$http.get("/haolifa/store-room/listInfo?type=0").then((function(o){t.roomList=o.filter((function(t){return!t.isDelete})).map((function(t){return{value:t.roomNo,text:t.name}}))}))},getRoomRackList:function(){var t=this;this.$http.get("/haolifa/store-room/rack/pageInfo").then((function(o){t.rackList=o.list.filter((function(t){return!t.isDelete})).map((function(t){return{value:t.rackNo,text:t.rackName,roomId:t.storeRoomNo,id:t.id}}))}))},getInfo:function(t,o){var e=this;this.$http.get("/haolifa/product/getInfo/".concat(t)).then((function(a){for(var s in e.form)void 0!==e.form[s]&&(e.form.productNo=t),e.name=o})).catch((function(t){e.$toast(t.msg||t.message)}))},cancel:function(){this.$router.back()},submit:function(){var t=this,o=this.form;this.loading=!0;var e="put";this.$http[e]("/haolifa/store-room/entryOut/outMaterial",o).then((function(o){t.loading=!1,t.$router.replace("/storeproduct")})).catch((function(o){t.loading=!1,t.$toast(o.msg||o.message)}))}}}),r=i,c=(e("f1d6"),e("2877")),n=Object(c["a"])(r,a,s,!1,null,null,null);o["default"]=n.exports},e427:function(t,o,e){},f1d6:function(t,o,e){"use strict";e("e427")}}]);
//# sourceMappingURL=outProduct.6a04dabe.js.map