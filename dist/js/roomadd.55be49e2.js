(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["roomadd"],{"24fa":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nuclear-material-nuclear abs scroll-y"},[a("div",{staticClass:"node"},[t._m(0),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单编号：")]),a("span",{staticClass:"mr-15"},[t._v(t._s(t.orderInfo.orderContractNo))])]),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单附件：")]),a("span",[a("a",{staticClass:"a",staticStyle:{color:"#008eff"},attrs:{target:"_blank",href:t.orderInfo.orderContractUrl}},[t._v("下载")])])])]),t.preCheckMaterList.length>0?a("div",{staticClass:"mt-20"},[a("hr"),t._m(1),a("div",{staticClass:"node"},[a("div",{staticClass:"flex-item ml-20",staticStyle:{"overflow-x":"auto"}},[a("table",{staticClass:"data-table"},[t._m(2),t._l(t.preCheckMaterList,(function(e,r){return a("tr",[a("td",[t._v(t._s(e.materialName))]),a("td",[t._v(t._s(e.materialGraphNo))]),a("td",[t._v(t._s(e.model))]),a("td",[t._v(t._s(e.specifications))]),a("td",[t._v(t._s(e.price))]),a("td",[t._v(t._s(e.unit))]),a("td",[t._v(t._s(e.materialCount))]),a("td",[t._v(t._s(e.lackMaterialCount))]),a("td",[t._v(t._s(t.checkStatusList[e.checkStatus-1].text))]),a("td",[t._v(t._s(3==e.checkStatus?"是":"否"))]),a("td",[t._v(t._s(e.replaceMaterialGraphNo))]),a("td",[t._v(t._s(e.remark))])])}))],2)])])]):t._e()])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-10 mb-10"},[a("span",{staticClass:"f-20"},[t._v("基本信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-20 mb-10"},[a("span",{staticClass:"f-20"},[t._v("核料清单")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("物料名称")]),a("th",[t._v("物料图号")]),a("th",[t._v("型号")]),a("th",[t._v("规格")]),a("th",[t._v("单价")]),a("th",[t._v("单位")]),a("th",[t._v("需要数量")]),a("th",[t._v("缺少数量")]),a("th",[t._v("核料状态")]),a("th",[t._v("是否替换")]),a("th",[t._v("替换零件")]),a("th",[t._v("备注")])])}],o={name:"nuclear-material-nuclear",data:function(){return{checkStatusList:[{value:1,text:"成功"},{value:2,text:"待采购"},{value:3,text:"可替换"}],orderInfo:{orderContractNo:"",orderContractUrl:""},preCheckMaterList:[]}},activated:function(){var t=this.$route.query.orderNo;this.getInfo(t)},created:function(){var t=this.$route.query.orderNo;this.getInfo(t)},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/order-product/details?orderNo=".concat(t)).then((function(t){e.orderInfo.orderContractNo=t.orderContractNo,e.orderInfo.orderContractUrl=t.orderContractUrl})).catch((function(t){e.$toast(t.msg||t.message)})),this.$http.get("/haolifa/order-product/order-material?orderNo=".concat(t)).then((function(t){e.preCheckMaterList=t,console.log("处理过后",t)})).catch((function(t){}))}}},i=o,c=(a("bceb"),a("cba8")),n=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=n.exports},"34f6":function(t,e,a){"use strict";a("3d60")},"3d60":function(t,e,a){},"65b2":function(t,e,a){"use strict";a("7706")},7706:function(t,e,a){},"788b":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"abs scroll-y"},[a("div",{staticClass:"metalwork-info",staticStyle:{width:"100%",margin:"0 auto"}},[a("div",{staticClass:"b f-18 flex-v-center",staticStyle:{"margin-bottom":"20px"}},[a("icon-btn",{staticClass:"mr-15",on:{click:function(e){return t.$router.back()}}},[t._v("arrow_back")]),a("div",{staticClass:"flex-item"},[t._v("审批进度")])],1),a("div",{staticStyle:{"min-width":"1200px"}},t._l(t.list,(function(e,r){return a("div",{key:r,staticClass:"approve"},[a("p",[t._v(t._s(e.roleName))]),a("p",{class:4==e.auditResult?"button ccc":"button"},[t._v(t._s(e.stepName))]),r<t.list.length-1?a("span",[t._v("-----\x3e")]):t._e(),a("p",[t._v(t._s(t.status[e.auditResult])+t._s(e.auditTime))]),e.child.length>0?a("div",{staticClass:"approve",staticStyle:{position:"absolute",top:"123px"}},[a("div",{staticClass:"height-line"}),a("div",{staticClass:"bottom-arrows"}),a("p",[t._v(t._s(e.child[0].roleName))]),a("p",{class:4==e.child[0].auditResult?"button ccc":"button"},[t._v(t._s(e.child[0].stepName))]),a("p",[t._v(t._s(t.status[e.child[0].auditResult])+t._s(e.auditTime))]),a("div",{staticClass:"right-height-line"}),a("div",{staticClass:"top-arrows"})]):t._e()])})),0)])])},s=[],o={name:"nuclear-material-approveProgress",data:function(){return{list:[],status:{0:"审核不通过",1:"审核通过",3:"流程初始化",4:"未审核"}}},created:function(){this.getInfo(this.$route.query.formNo,this.$route.query.formId)},activated:function(){this.getInfo(this.$route.query.formNo,this.$route.query.formId)},methods:{getInfo:function(t,e){var a=this;console.log(t,e),this.$http.get("/haolifa/flowInstance/flow/progress?formNo=".concat(t,"&formId=").concat(e)).then((function(t){console.log(t),a.list=t})).catch((function(t){a.$toast(t.msg||t.message)}))}}},i=o,c=(a("b7a0"),a("cba8")),n=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=n.exports},8401:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nuclear-material-nuclear abs scroll-y"},[a("div",{staticClass:"node"},[a("icon-btn",{staticClass:"mr-15",on:{click:function(e){t.$store.commit("DELMENUTABS","/nuclear-replace-form"),t.$router.back()}}},[t._v("arrow_back")]),t._m(0),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单编号：")]),a("span",{staticClass:"mr-15"},[t._v(t._s(t.orderInfo.orderContractNo))])]),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单附件：")]),a("span",[a("a",{staticClass:"a",staticStyle:{color:"#008eff"},attrs:{target:"_blank",href:t.orderInfo.orderContractUrl}},[t._v("下载")])])])],1),t.replaceMaterList.length>0?a("div",{staticClass:"mt-20"},[a("hr"),t._m(1),a("div",{staticClass:"node"},[a("div",{staticClass:"flex-item scroll-y ml-20"},[a("table",{staticClass:"data-table"},[t._m(2),t._l(t.replaceMaterList,(function(e,r){return a("tr",[a("td",[t._v(t._s(e.id))]),a("td",[t._v(t._s(e.materialName))]),a("td",[t._v(t._s(e.materialGraphNo))]),a("td",[t._v(t._s(e.replaceMaterialGraphNo))]),a("td",[t._v(t._s(e.materialCount))]),a("td",[t._v(t._s(e.lackMaterialCount))]),a("td",[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(a){return t.auditProcess(e.id)}}},[t._v("审批进度")])])])}))],2)])])]):t._e()])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-10 mb-10"},[a("span",{staticClass:"f-20"},[t._v("基本信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-20 mb-10"},[a("span",{staticClass:"f-20"},[t._v("替换料清单")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("ID")]),a("th",[t._v("零件名称")]),a("th",[t._v("待替换图号")]),a("th",[t._v("替换图号")]),a("th",[t._v("需要数量")]),a("th",[t._v("缺少数量")]),a("th",[t._v("操作")])])}],o={name:"nuclear-material-nuclear",data:function(){return{checkStatusList:[{value:1,text:"成功"},{value:2,text:"待采购"},{value:3,text:"可替换"}],orderInfo:{orderContractNo:"",orderContractUrl:""},replaceMaterList:[]}},created:function(){var t=this.$route.query.orderNo;this.getInfo(t)},activated:function(){var t=this.$route.query.orderNo;this.getInfo(t)},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/order-product/details?orderNo=".concat(t)).then((function(t){e.orderInfo.orderContractNo=t.orderContractNo,e.orderInfo.orderContractUrl=t.orderContractUrl})).catch((function(t){e.$toast(t.msg||t.message)})),this.$http.get("/haolifa/order-product/replace-material-list?orderNo=".concat(t)).then((function(t){e.replaceMaterList=t,console.log("处理过后",t)})).catch((function(t){}))},auditProcess:function(t){this.$router.push("/nuclear-replace/approveProgress?formNo=''&formId=".concat(t))}}},i=o,c=(a("65b2"),a("cba8")),n=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=n.exports},"8cb2":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-room-add abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"title b f-18"},[t._v(t._s(t.form.id?"编辑":"新增")+"库房")]),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"库房名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"编号"},model:{value:t.form.roomNo,callback:function(e){t.$set(t.form,"roomNo",e)},expression:"form.roomNo"}}),a("select-box",{staticStyle:{width:"25%"},attrs:{list:t.typeList,label:"类型"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"地址"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{"multi-line":"",label:"描述"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),a("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[a("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),a("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)])])},s=[],o=(a("a450"),{name:"page-room-add",data:function(){return{typeList:[{text:"原料库",value:1},{text:"成品库",value:2}],form:{id:"",name:"",roomNo:"",address:"",remark:"",type:0}}},computed:{canSubmit:function(){var t=this.form;return t.name&&t.roomNo&&t.address}},activated:function(){var t=this.$route.query.id;void 0!==t&&"room-edit"===this.$route.name?this.getInfo(t):this.form={id:"",name:"",roomNo:"",address:"",remark:"",type:0}},created:function(){var t=this.$route.query.id;void 0!==t&&"room-edit"===this.$route.name&&this.getInfo(t)},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/store-room/getInfo/".concat(t)).then((function(t){for(var a in e.form)void 0!==e.form[a]&&(e.form[a]=t[a])})).catch((function(t){e.$toast(t.msg||t.message)}))},cancel:function(){var t=this;this.$confirm({title:"您确定要离开此页面吗？",text:"您的表单将不会保存",color:"red",btns:["取消","离开"],yes:function(){t.$store.commit("DELMENUTABS","/room/add"),t.$router.push("/room")}})},submit:function(){var t=this,e=this.form;this.loading=!0;var a=e.id?"put":"post";this.$http[a]("/haolifa/store-room/".concat(e.id?"update":"save"),e).then((function(e){t.loading=!1,t.$store.commit("DELMENUTABS","/room/add"),t.$router.push("/room")})).catch((function(e){t.loading=!1,t.$toast(e.msg||e.message)}))}}}),i=o,c=(a("c0e1"),a("cba8")),n=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=n.exports},a284:function(t,e,a){},b1e8:function(t,e,a){},b7a0:function(t,e,a){"use strict";a("b1e8")},bceb:function(t,e,a){"use strict";a("a284")},c0e1:function(t,e,a){"use strict";a("d4c8")},d4c8:function(t,e,a){},f00f:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"nuclear-material-nuclear abs scroll-y"},[a("div",{staticClass:"node"},[t._m(0),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单编号：")]),a("span",{staticClass:"mr-15"},[t._v(t._s(t.orderInfo.orderContractNo))])]),a("div",{staticClass:"mb-10"},[a("span",{staticClass:"b"},[t._v("订单附件：")]),a("span",[a("a",{staticClass:"a",staticStyle:{color:"#008eff"},attrs:{target:"_blank",href:t.orderInfo.orderContractUrl}},[t._v("下载")])])])]),a("div",{staticClass:"node mt-20"},[t._m(1),t._l(t.productInfos,(function(e,r){return a("div",{staticClass:"node"},[a("div",[a("div",{staticClass:"flex"},[t._v("成品号:"+t._s(e.productNo))]),a("div",{staticClass:"flex"},[t._v("成品型号："+t._s(e.productModel))]),a("div",{staticClass:"flex"},[t._v("物料描述："+t._s(e.materialDescription))]),a("div",{staticClass:"flex"},[t._v("规格："+t._s(e.specifications))]),a("div",{staticClass:"flex"},[t._v("数量："+t._s(e.productNumber))]),a("div",{staticClass:"flex"},[t._v("颜色："+t._s("null"==e.productColor?"":e.productColor))]),a("div",{staticClass:"flex"},[t._v("备注："+t._s(e.productRemark))])]),a("hr"),t._m(2,!0),t._l(e.listDTOS,(function(r){return a("div",{staticClass:"flex-item"},[a("div",[r.list.length>0?a("div",["fati"==r.type?a("div",[t._v("阀体")]):t._e(),"fazuo"==r.type?a("div",[t._v("阀座")]):t._e(),"faban"==r.type?a("div",[t._v("阀板")]):t._e(),"fagan"==r.type?a("div",[t._v("阀杆")]):t._e(),"tongyong"!=r.type?a("select",{domProps:{value:0},on:{change:function(a){return t.checkMater(a,r.type,e.id)}}},[a("option",{attrs:{value:"0"}},[t._v("请选择")]),t._l(r.list,(function(e,r){return a("option",{domProps:{value:JSON.stringify(e)}},[t._v(t._s(e.graphNo))])}))],2):t._e()]):t._e()])])}))],2)}))],2),a("div",{staticClass:"flex mt-20"},[a("el-button",{attrs:{type:"primary",loading:t.loadingFlag},on:{click:function(e){return t.nuclearing()}}},[t._v("开始核料")]),a("el-button",{attrs:{type:"primary",loading:t.nuclearCompleteFlag},on:{click:function(e){return t.nuclearComplete()}}},[t._v("核料完成")])],1),t.preCheckMaterList.length>0?a("div",{staticClass:"mt-20"},[a("hr"),t._m(3),a("div",{staticClass:"node"},[a("div",{staticClass:"flex-item scroll-y ml-20"},[a("table",{staticClass:"data-table"},[t._m(4),t._l(t.preCheckMaterList,(function(e,r){return a("tr",[a("td",[t._v(t._s(e.materialName))]),a("td",[t._v(t._s(e.materialGraphNo))]),a("td",[t._v(t._s(e.materialCount))]),a("td",[t._v(t._s(e.lackMaterialCount))]),a("td",[t._v(t._s(t.checkStatusList[e.checkStatus-1].text))]),a("td",[t._v(t._s(e.checkResultMsg))]),a("td",[t._v(t._s(null!=e.replaceGraphNoList&&e.replaceGraphNoList.length>0?"是":""))]),a("td",[null!=e.replaceGraphNoList&&e.replaceGraphNoList.length>0?a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(a){return t.replaceShow(e)}}},[t._v("替换")]):t._e()])])}))],2)])]),t.replaceLayer?a("layer",{attrs:{title:"替换料列表",width:"450px"}},[a("div",{staticClass:"node ml-10 mr-10"},t._l(t.replaceList,(function(e,r){return a("div",{staticClass:"flex"},[a("radio-box",{attrs:{label:e.materialGraphNo,name:"replace",text:e.materialGraphNo},on:{change:function(a){return t.changeReplace(e)}}})],1)})),0),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.replaceLayer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:function(e){return t.replaceComplete()}}},[t._v("保存")])],1)]):t._e()],1):t._e()])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-10 mb-10"},[a("span",{staticClass:"f-20"},[t._v("基本信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-10 mb-10"},[a("span",{staticClass:"f-20"},[t._v("成品核料信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-10 mb-10"},[a("span",[t._v("零件选择")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex-item mt-20 mb-10"},[a("span",{staticClass:"f-20"},[t._v("核料结果")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",[t._v("物料名称")]),a("th",[t._v("物料图号")]),a("th",[t._v("需要数量")]),a("th",[t._v("缺少数量")]),a("th",[t._v("核料状态")]),a("th",[t._v("核料结果")]),a("th",[t._v("可替换")]),a("th",[t._v("操作")])])}],o=(a("1bc78"),{name:"nuclear-material-nuclear",data:function(){return{replaceMaterNo:null,replaceList:[],replaceLayer:!1,replaceTemp:null,checkStatusList:[{value:1,text:"成功"},{value:2,text:"待采购"},{value:3,text:"可替换"}],productInfos:[],orderInfo:{orderContractNo:"",orderContractUrl:""},nuclearMater:[],preCheckMaterList:[],replaceMapping:[],loadingFlag:!1,nuclearCompleteFlag:!1}},activated:function(){var t=this.$route.query.orderNo;this.nuclearMater=[],this.getInfo(t)},created:function(){var t=this.$route.query.orderNo;this.getInfo(t)},methods:{changeReplace:function(t){this.replaceTemp=t},replaceShow:function(t){console.log("replace",t),this.replaceList=t.replaceGraphNoList,this.replaceMaterNo=t.materialGraphNo,this.replaceLayer=!0},replaceComplete:function(){var t=this;if(null!=this.replaceTemp&&""!=this.replaceTemp){this.replaceLayer=!1;var e=JSON.parse(JSON.stringify(this.replaceTemp));e.lackMaterialCount=0,e.replaceGraphNoList=[];var a=!0;this.replaceMapping.forEach((function(r){r.replaceMaterNo==t.replaceMaterNo&&(r.choseReplace=e,a=!1)})),a&&this.replaceMapping.push({replaceMaterNo:this.replaceMaterNo,choseReplace:e}),this.replaceMaterNo=null}else this.$toast("请选择可替换零件")},checkMater:function(t,e,a){var r=JSON.parse(t.target.value);this.nuclearMater.forEach((function(t){t.id==a&&t.listDTOS.forEach((function(t){"tongyong"!=t.type&&t.type==e&&"tongyong"!=t.type&&("0"==r?t.list=[]:(t.list=[],t.list.push(r)))}))}))},getInfo:function(t){var e=this;this.$http.get("/haolifa/order-product/details?orderNo=".concat(t)).then((function(t){e.orderInfo.orderContractNo=t.orderContractNo,e.orderInfo.orderContractUrl=t.orderContractUrl})).catch((function(t){e.$toast(t.msg||t.message)})),this.$http.get("/haolifa/order-product/pre-check-material?orderNo=".concat(t)).then((function(t){e.productInfos=JSON.parse(JSON.stringify(t)),e.nuclearMater=JSON.parse(JSON.stringify(t)),e.nuclearMater.forEach((function(t){t.listDTOS.forEach((function(t){"tongyong"!=t.type&&(t.list=[])}))})),console.log("处理过后",e.nuclearMater)})).catch((function(t){}))},nuclearing:function(){var t=this;this.loadingFlag=!0,this.$http.post("/haolifa/order-product/check-material?orderNo=".concat(this.orderInfo.orderContractNo),this.nuclearMater).then((function(e){t.preCheckMaterList=JSON.parse(JSON.stringify(e)),t.loadingFlag=!1})).catch((function(e){t.$toast(e.msg||e.message),t.loadingFlag=!1}))},nuclearComplete:function(){var t=this;this.nuclearCompleteFlag=!0;var e=JSON.parse(JSON.stringify(this.preCheckMaterList));e.forEach((function(e){null==e.replaceGraphNoList?e.replaceGraphNoList=[]:e.replaceGraphNoList.length>0&&(t.replaceMapping.length>0?t.replaceMapping.forEach((function(t){t.replaceMaterNo==e.materialGraphNo&&(e.replaceGraphNoList=[],e.replaceGraphNoList.push(t.choseReplace))})):e.replaceGraphNoList=[]),null==e.lackMaterialCount&&(e.lackMaterialCount=0)})),this.$http.post("/haolifa/order-product/pass-check-material",e).then((function(e){t.$toast("核料完成，清单已保存"),t.$store.commit("DELMENUTABS","/nuclear-material"),t.$router.push("/"),t.nuclearCompleteFlag=!1})).catch((function(e){t.$toast(e.msg||e.message),t.nuclearCompleteFlag=!1}))}}}),i=o,c=(a("34f6"),a("cba8")),n=Object(c["a"])(i,r,s,!1,null,null,null);e["default"]=n.exports}}]);
//# sourceMappingURL=roomadd.55be49e2.js.map