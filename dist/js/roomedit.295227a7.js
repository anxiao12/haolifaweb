(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["roomedit"],{"129b":function(t,e,a){},"3c90":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-room-add abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"title b f-18"},[t._v(t._s(t.form.id?"编辑":"新增")+"库房")]),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"库房名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"编号"},model:{value:t.form.roomNo,callback:function(e){t.$set(t.form,"roomNo",e)},expression:"form.roomNo"}}),a("select-box",{staticStyle:{width:"25%"},attrs:{list:t.typeList,label:"类型"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"地址"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{"multi-line":"",label:"描述"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),a("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[a("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),a("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)])])},s=[],r=(a("c041"),a("7cfd"),{name:"page-room-add",data:function(){return{typeList:[{text:"原料库",value:1},{text:"成品库",value:2}],form:{id:"",name:"",roomNo:"",address:"",remark:"",type:0}}},computed:{canSubmit:function(){var t=this.form;return t.name&&t.roomNo&&t.address}},created:function(){var t=this.$route.query.id;void 0!==t&&"room-edit"===this.$route.name&&this.getInfo(t)},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/store-room/getInfo/".concat(t)).then((function(t){for(var a in e.form)void 0!==e.form[a]&&(e.form[a]=t[a])})).catch((function(t){e.$toast(t.msg||t.message)}))},cancel:function(){var t=this;this.$confirm({title:"您确定要离开此页面吗？",text:"您的表单将不会保存",color:"red",btns:["取消","离开"],yes:function(){t.$router.back()}})},submit:function(){var t=this,e=this.form;this.loading=!0;var a=e.id?"put":"post";this.$http[a]("/haolifa/store-room/".concat(e.id?"update":"save"),e).then((function(e){t.loading=!1,t.$router.replace("/room")})).catch((function(e){t.loading=!1,t.$toast(e.msg||e.message)}))}}}),i=r,n=(a("af38"),a("6691")),c=Object(n["a"])(i,o,s,!1,null,null,null);e["default"]=c.exports},"774a":function(t,e,a){},"8cb2":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-room-add abs scroll-y"},[a("div",{staticClass:"form-content"},[a("div",{staticClass:"title b f-18"},[t._v(t._s(t.form.id?"编辑":"新增")+"库房")]),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"库房名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{staticClass:"mr-10",staticStyle:{width:"25%"},attrs:{label:"编号"},model:{value:t.form.roomNo,callback:function(e){t.$set(t.form,"roomNo",e)},expression:"form.roomNo"}}),a("select-box",{staticStyle:{width:"25%"},attrs:{list:t.typeList,label:"类型"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{label:"地址"},model:{value:t.form.address,callback:function(e){t.$set(t.form,"address",e)},expression:"form.address"}})],1),a("div",{staticClass:"flex-v-center"},[a("input-box",{staticClass:"flex-item mr-10",attrs:{"multi-line":"",label:"描述"},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),a("div",{staticClass:"flex-v-center",staticStyle:{margin:"20px 0"}},[a("btn",{staticClass:"mr-20",attrs:{big:"",disabled:!t.canSubmit},on:{click:t.submit}},[t._v("提交")]),a("btn",{staticClass:"mr-20",attrs:{big:"",flat:"",bg:""},on:{click:t.cancel}},[t._v("取消")])],1)])])},s=[],r=(a("c041"),a("7cfd"),{name:"page-room-add",data:function(){return{typeList:[{text:"原料库",value:1},{text:"成品库",value:2}],form:{id:"",name:"",roomNo:"",address:"",remark:"",type:0}}},computed:{canSubmit:function(){var t=this.form;return t.name&&t.roomNo&&t.address}},created:function(){var t=this.$route.query.id;void 0!==t&&"room-edit"===this.$route.name&&this.getInfo(t)},methods:{getInfo:function(t){var e=this;this.$http.get("/haolifa/store-room/getInfo/".concat(t)).then((function(t){for(var a in e.form)void 0!==e.form[a]&&(e.form[a]=t[a])})).catch((function(t){e.$toast(t.msg||t.message)}))},cancel:function(){var t=this;this.$confirm({title:"您确定要离开此页面吗？",text:"您的表单将不会保存",color:"red",btns:["取消","离开"],yes:function(){t.$router.back()}})},submit:function(){var t=this,e=this.form;this.loading=!0;var a=e.id?"put":"post";this.$http[a]("/haolifa/store-room/".concat(e.id?"update":"save"),e).then((function(e){t.loading=!1,t.$router.replace("/room")})).catch((function(e){t.loading=!1,t.$toast(e.msg||e.message)}))}}}),i=r,n=(a("c0e1"),a("6691")),c=Object(n["a"])(i,o,s,!1,null,null,null);e["default"]=c.exports},af38:function(t,e,a){"use strict";var o=a("129b"),s=a.n(o);s.a},c0e1:function(t,e,a){"use strict";var o=a("774a"),s=a.n(o);s.a}}]);
//# sourceMappingURL=roomedit.295227a7.js.map