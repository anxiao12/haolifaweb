(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["partadd"],{"989d":function(t,a,e){},a7bd:function(t,a,e){"use strict";e.r(a);e("7f7f");var i=function(){var t=this,a=t._self._c;return a("div",{staticClass:"page-part-add abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"title b f-18"},[t._v(t._s(t.form.id?"编辑":"新增")+"零件")]),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"mr-10",staticStyle:{width:"50%"},attrs:{label:"名称"},model:{value:t.form.name,callback:function(a){t.$set(t.form,"name",a)},expression:"form.name"}}),a("select-box",{staticStyle:{width:"25%"},attrs:{list:t.parttypeList,label:"分类名称"},on:{change:t.typeId},model:{value:t.form.materialClassifyName,callback:function(a){t.$set(t.form,"materialClassifyName",a)},expression:"form.materialClassifyName"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"单位(如：根，个)"},model:{value:t.form.unit,callback:function(a){t.$set(t.form,"unit",a)},expression:"form.unit"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"mr-10",staticStyle:{width:"35%"},attrs:{label:"图号"},model:{value:t.form.graphNo,callback:function(a){t.$set(t.form,"graphNo",a)},expression:"form.graphNo"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"35%"},attrs:{label:"可替换图号"},model:{value:t.form.replaceGraphNos,callback:function(a){t.$set(t.form,"replaceGraphNos",a)},expression:"form.replaceGraphNos"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"30%"},attrs:{label:"型号"},model:{value:t.form.model,callback:function(a){t.$set(t.form,"model",a)},expression:"form.model"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"mr-10",staticStyle:{width:"35%"},attrs:{label:"配套数量"},model:{value:t.form.supportQuantity,callback:function(a){t.$set(t.form,"supportQuantity",a)},expression:"form.supportQuantity"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"35%"},attrs:{label:"安全库存"},model:{value:t.form.safeQuantity,callback:function(a){t.$set(t.form,"safeQuantity",a)},expression:"form.safeQuantity"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"30%"},attrs:{label:"安全库存系数"},model:{value:t.form.safetyFactor,callback:function(a){t.$set(t.form,"safetyFactor",a)},expression:"form.safetyFactor"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"规格"},model:{value:t.form.specifications,callback:function(a){t.$set(t.form,"specifications",a)},expression:"form.specifications"}}),a("input-box",{staticClass:"flex-item mr-10",staticStyle:{width:"25%"},attrs:{label:"实际单重"},model:{value:t.form.actualWeight,callback:function(a){t.$set(t.form,"actualWeight",a)},expression:"form.actualWeight"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"理论单重"},model:{value:t.form.theoreticalWeight,callback:function(a){t.$set(t.form,"theoreticalWeight",a)},expression:"form.theoreticalWeight"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"税率"},model:{value:t.form.taxRate,callback:function(a){t.$set(t.form,"taxRate",a)},expression:"form.taxRate"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"材料"},model:{value:t.form.material,callback:function(a){t.$set(t.form,"material",a)},expression:"form.material"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{"multi-line":"",label:"备注"},model:{value:t.form.remark,callback:function(a){t.$set(t.form,"remark",a)},expression:"form.remark"}})],1),a("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[a("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),a("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)])])},s=[],r=(e("7514"),{name:"page-part-add",data:function(){return{parttypeList:[],form:{id:"",actualWeight:"",replaceGraphNos:"",graphNo:"",material:"",materialClassifyId:"",materialClassifyName:"",model:"",name:"",price:"",remark:"",safeQuantity:"",safetyFactor:"",specifications:"",taxRate:"",theoreticalWeight:"",unit:"",supportQuantity:""}}},computed:{canSubmit:function(){var t=this.form;return t.name&&t.graphNo}},activated:function(){this.form={id:"",actualWeight:"",replaceGraphNos:"",graphNo:"",material:"",materialClassifyId:"",materialClassifyName:"",model:"",name:"",price:"",remark:"",safeQuantity:"",safetyFactor:"",specifications:"",taxRate:"",theoreticalWeight:"",unit:"",supportQuantity:""};var t=this.$route.query.id;void 0!==t&&"part-edit"===this.$route.name&&this.getInfo(t),this.getparttypeList(),this.typeId()},created:function(){var t=this.$route.query.id;void 0!==t&&"part-edit"===this.$route.name&&this.getInfo(t),this.getparttypeList(),this.typeId()},methods:{typeId:function(){var t=this,a=this.parttypeList.find((function(a){return a.value===t.form.materialClassifyName}));this.form.materialClassifyId=a?a.id:""},getparttypeList:function(){var t=this;this.$http.get("/haolifa/material/classify/pageInfo").then((function(a){t.parttypeList=a.list.filter((function(t){return!t.isDelete})).map((function(t){return{value:t.classifyName,text:t.classifyName,id:t.id}}))}))},getInfo:function(t){var a=this;this.$http.get("/haolifa/material/getInfo/".concat(t)).then((function(t){for(var e in a.form)void 0!==a.form[e]&&(a.form[e]=t[e])})).catch((function(t){a.$toast(t.msg||t.message)}))},cancel:function(){var t=this,a=this.form.id?"/part/edit":"/part/add";this.$confirm({title:"您确定要离开此页面吗？",text:"您的表单将不会保存",color:"red",btns:["取消","离开"],yes:function(){t.$store.commit("DELMENUTABS",a),t.$router.push("/part")}})},submit:function(){var t=this,a=this.form;this.loading=!0;var e=a.id?"put":"post",i=a.id?"/part/edit":"/part/add";this.$http[e]("/haolifa/material/".concat(a.id?"update":"save"),a).then((function(a){t.loading=!1,t.$store.commit("DELMENUTABS",i),t.$router.push("/part")})).catch((function(a){t.loading=!1,t.$toast(a.msg||a.message)}))}}}),l=r,o=(e("b969"),e("2877")),c=Object(o["a"])(l,i,s,!1,null,null,null);a["default"]=c.exports},b969:function(t,a,e){"use strict";e("989d")}}]);
//# sourceMappingURL=partadd.d385d533.js.map