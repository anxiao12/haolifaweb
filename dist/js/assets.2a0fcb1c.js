(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["assets"],{"0d8d":function(t,e,a){"use strict";var i=a("5222"),s=a.n(i);s.a},5222:function(t,e,a){},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},s=[];a("8f42"),a("4634"),a("ed8b");function r(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var n={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,s=this.pageSize,n=this.param;if(i){this.loading=!0;var o={pageSize:s};o[this.pageNumStr]=t;var l=Object.assign(o,n),c="get"===a?i+r(l):i;this.$http[a](c,l).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},o=n,l=(a("c8ea"),a("6691")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["a"]=c.exports},a253:function(t,e,a){},c8ea:function(t,e,a){"use strict";var i=a("a253"),s=a.n(i);s.a},d687:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-assets"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.name,expression:"filter.name"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"设备名称"},domProps:{value:t.filter.name},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"name",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.productFactory,expression:"filter.productFactory"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"生产厂家"},domProps:{value:t.filter.productFactory},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"productFactory",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.equipmentNo,expression:"filter.equipmentNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"设备编号"},domProps:{value:t.filter.equipmentNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"equipmentNo",e.target.value)}}})]),a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:function(e){t.layer=!0}}},[t._v("添加设备")])],1),a("div",{staticClass:"flex-item scroll-y"},[a("data-list",{ref:"list",staticClass:"f-14",attrs:{param:t.filter,method:"post",url:"/haolifa/equipment/getList"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",[t._v(t._s(s))]),a("td",[t._v(t._s(i.name))]),a("td",[t._v(t._s(i.equipmentNo))]),a("td",[t._v(t._s(i.number))]),a("td",[t._v(t._s(t.allStatus[i.equipmentStatus].text))]),a("td",[t._v(t._s(i.productFactory))]),a("td",[t._v(t._s(i.servicedYears))]),a("td",{staticClass:"t-right"},[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(i)}}},[t._v("编辑")]),t._v(" |\n                    "),a("a",{staticClass:"red",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.remove(i)}}},[t._v("删除")])])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("设备名称")]),a("th",[t._v("设备编号")]),a("th",[t._v("数量")]),a("th",[t._v("设备状态")]),a("th",[t._v("生产厂家")]),a("th",[t._v("服役年限")]),a("th",{staticClass:"t-right",staticStyle:{width:"80px"}},[t._v("操作")])])])],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑设备":"新增设备",width:"60%"}},[a("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[a("input-box",{attrs:{label:"设备名称",hint:"必填"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{attrs:{label:"设备编号"},model:{value:t.form.equipmentNo,callback:function(e){t.$set(t.form,"equipmentNo",e)},expression:"form.equipmentNo"}}),a("div",{staticClass:"flex"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"设备数量",hint:"必填",type:"number"},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",e)},expression:"form.number"}}),a("select-box",{staticClass:"flex-item",attrs:{list:t.allStatus,hint:"必填",label:"设备状态"},model:{value:t.form.equipmentStatus,callback:function(e){t.$set(t.form,"equipmentStatus",e)},expression:"form.equipmentStatus"}})],1),a("div",{staticClass:"flex"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{type:"number",label:"采购金额"},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}}),a("date-picker",{staticClass:"flex-item mr-10",attrs:{label:"采购时间"},model:{value:t.form.purchaseTime,callback:function(e){t.$set(t.form,"purchaseTime",e)},expression:"form.purchaseTime"}})],1),a("input-box",{attrs:{type:"text",label:"生产厂家"},model:{value:t.form.productFactory,callback:function(e){t.$set(t.form,"productFactory",e)},expression:"form.productFactory"}}),a("input-box",{attrs:{type:"number",label:"服役年限"},model:{value:t.form.servicedYears,callback:function(e){t.$set(t.form,"servicedYears",e)},expression:"form.servicedYears"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.layer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],r=(a("7cfd"),a("9b68")),n={name:"page-assets",components:{DataList:r["a"]},data:function(){return{layer:!1,allStatus:[{value:0,text:"正常"},{value:1,text:"损坏待处理"},{value:2,text:"处理中"},{value:3,text:"处理完成"}],form:{id:"",name:"",number:"",price:"",purchaseTime:"",equipmentNo:"",equipmentStatus:0,productFactory:"",servicedYears:""},filter:{type:2,name:"",equipmentNo:"",productFactory:""}}},methods:{edit:function(t){for(var e in this.form)this.form[e]=t[e];this.layer=!0},vertify:function(){var t=this.form;return!(!t.name||!t.number||""===t.equipmentStatus)||(this.$toast("请输入必填信息"),!1)},submit:function(){var t=this;if(this.vertify()){var e=this.form;this.$http.post("/haolifa/equipment/"+(e.id?"update":"save"),e).then((function(e){t.$refs.list.update(),t.cancel(),t.$toast("保存成功")})).catch((function(e){t.$toast(e.message||e.meg)}))}},cancel:function(){this.form={id:"",name:"",number:"",equipmentNo:"",equipmentStatus:0,productFactory:"",servicedYears:""},this.layer=!1},remove:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下设备吗？<br>\n               <b>".concat(t.name,"</b><br>"),color:"red",btns:["取消","删除"],yes:function(){e.$http.get("/haolifa/equipment/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update()})).catch((function(t){e.$toast(t.msg||t.message)}))}})}}},o=n,l=(a("0d8d"),a("6691")),c=Object(l["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=assets.2a0fcb1c.js.map