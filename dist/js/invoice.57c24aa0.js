(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["invoice"],{"003a":function(t,e,a){"use strict";var i=a("f778"),s=a.n(i);s.a},"0490":function(t,e,a){},"1a3f":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-orders-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.graphNo,expression:"filter.graphNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"图号"},domProps:{value:t.filter.graphNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"graphNo",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.name,expression:"filter.name"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"零件名称"},domProps:{value:t.filter.name},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"name",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.model,expression:"filter.model"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"型号"},domProps:{value:t.filter.model},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"model",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.specifications,expression:"filter.specifications"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"规格"},domProps:{value:t.filter.specifications},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"specifications",e.target.value)}}})]),a("div",{staticClass:"flex-item"}),a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:t.edit}},[t._v("新增")])],1),a("div",{staticClass:"flex-item"},[a("data-list",{ref:"list",attrs:{param:t.filter,url:"/haolifa/price/material/pageInfo",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.graphNo))]),a("td",[t._v(t._s(i.name))]),a("td",[t._v(t._s(i.model))]),a("td",[t._v(t._s(i.specifications))]),a("td",[t._v(t._s(i.materialClassifyName))]),a("td",[t._v(t._s(i.material))]),a("td",[t._v(t._s(i.unit))]),a("td",[t._v(t._s(i.actualWeight))]),a("td",[t._v(t._s(i.tonPrice))]),a("td",[t._v(t._s(i.taxRate))]),a("td",[t._v(t._s(i.blankCost))]),a("td",[t._v(t._s(i.blankCostTax))]),a("td",[t._v(t._s(i.sprayCost))]),a("td",[t._v(t._s(i.processCost))]),a("td",[t._v(t._s(i.price))]),a("td",[t._v(t._s(i.priceTax))]),a("td",{staticClass:"t-right"},[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(i)}}},[t._v("编辑|")]),a("a",{staticClass:"red",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.del(i)}}},[t._v("删除")])])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("图号")]),a("th",[t._v("零件名称")]),a("th",[t._v("型号")]),a("th",[t._v("规格")]),a("th",[t._v("零件分类名称")]),a("th",[t._v("材料")]),a("th",[t._v("单位")]),a("th",[t._v("单重")]),a("th",[t._v("吨价(元)")]),a("th",[t._v("税率")]),a("th",[t._v("毛坯费不含税(元)")]),a("th",[t._v("毛坯费含税(元)")]),a("th",[t._v("喷涂费(元)")]),a("th",[t._v("加工费(元)")]),a("th",[t._v("成品价不含税(元)")]),a("th",[t._v("成品价含税(元)")]),a("th",{staticClass:"t-right",staticStyle:{width:"80px"}},[t._v("操作")])])])],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑":"新增",width:"900px"}},[a("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"图号"},model:{value:t.form.graphNo,callback:function(e){t.$set(t.form,"graphNo",e)},expression:"form.graphNo"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"零件名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"型号"},model:{value:t.form.model,callback:function(e){t.$set(t.form,"model",e)},expression:"form.model"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"规格"},model:{value:t.form.specifications,callback:function(e){t.$set(t.form,"specifications",e)},expression:"form.specifications"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"零件分类名称"},model:{value:t.form.materialClassifyName,callback:function(e){t.$set(t.form,"materialClassifyName",e)},expression:"form.materialClassifyName"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"材料"},model:{value:t.form.material,callback:function(e){t.$set(t.form,"material",e)},expression:"form.material"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"单位"},model:{value:t.form.unit,callback:function(e){t.$set(t.form,"unit",e)},expression:"form.unit"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"单重"},model:{value:t.form.actualWeight,callback:function(e){t.$set(t.form,"actualWeight",e)},expression:"form.actualWeight"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"吨价(元)"},model:{value:t.form.tonPrice,callback:function(e){t.$set(t.form,"tonPrice",e)},expression:"form.tonPrice"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"加工费(元)"},model:{value:t.form.processCost,callback:function(e){t.$set(t.form,"processCost",e)},expression:"form.processCost"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"税率(%)"},on:{input:t.priceChange},model:{value:t.form.taxRate,callback:function(e){t.$set(t.form,"taxRate",e)},expression:"form.taxRate"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"成品价(含税)"},on:{input:t.priceChange},model:{value:t.form.priceTax,callback:function(e){t.$set(t.form,"priceTax",e)},expression:"form.priceTax"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"毛坯费(含税)"},on:{input:t.priceChange},model:{value:t.form.blankCostTax,callback:function(e){t.$set(t.form,"blankCostTax",e)},expression:"form.blankCostTax"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"喷涂费"},model:{value:t.form.sprayCost,callback:function(e){t.$set(t.form,"sprayCost",e)},expression:"form.sprayCost"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"成品价(不含税)"},model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",e)},expression:"form.price"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{type:"number",label:"毛坯费(不含税)"},model:{value:t.form.blankCost,callback:function(e){t.$set(t.form,"blankCost",e)},expression:"form.blankCost"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.layer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],r=(a("7cfd"),a("9b68")),l={name:"finished-price-list",components:{DataList:r["a"]},data:function(){return{layer:!1,form:{},filter:{graphNo:"",model:"",name:"",specifications:""}}},created:function(){},methods:{edit:function(t){this.form=t?JSON.parse(JSON.stringify(t)):{},this.layer=!0},vertify:function(){for(var t in this.form){var e=this.form[t];if(!e&&0!==e&&"id"!==t)return this.$toast("请输入完整信息"+t),!1}return!0},submit:function(){var t=this,e=this.form;e.id?this.$http.put("/haolifa/price/material/update",e).then((function(e){t.$refs.list.update(),t.layer=!1,t.$toast("保存成功")})).catch((function(e){t.$toast(e.message||e.meg)})):this.$http.post("/haolifa/price/material/save",e).then((function(e){t.$refs.list.update(),t.layer=!1,t.$toast("保存成功")})).catch((function(e){t.$toast(e.message||e.meg)}))},close:function(){this.layer=!1},del:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下零件价格吗？<br>".concat(t.name),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("/haolifa/price/material/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update()})).catch((function(t){e.$toast(t.msg)}))}})},priceChange:function(){console.log(11),this.form.taxRate&&this.form.priceTax?this.form.price=Math.round(100*+this.form.priceTax/(+this.form.taxRate/100+1))/100:this.form.price="",this.form.taxRate&&this.form.blankCostTax?this.form.blankCost=Math.round(100*+this.form.blankCostTax/(+this.form.taxRate/100+1))/100:this.form.blankCost=""}}},o=l,n=(a("fa30"),a("6691")),c=Object(n["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},"532e":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-orders-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.productNo,expression:"filter.productNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"产品ID"},domProps:{value:t.filter.productNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"productNo",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.productModel,expression:"filter.productModel"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"型号"},domProps:{value:t.filter.productModel},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"productModel",e.target.value)}}})]),a("div",{staticClass:"flex-item"}),a("btn",{staticClass:"b",attrs:{flat:"",color:"#008eff"},on:{click:t.edit}},[t._v("新增")])],1),a("div",{staticClass:"flex-item"},[a("data-list",{ref:"list",attrs:{param:t.filter,url:"/haolifa/price/product/pageInfo",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.productModel))]),a("td",[t._v(t._s(i.productNo))]),a("td",[t._v(t._s(i.exFactoryPrice))]),a("td",{staticClass:"t-right"},[a("a",{staticClass:"blue",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(i)}}},[t._v("编辑|")]),a("a",{staticClass:"red",staticStyle:{"margin-right":"3px"},attrs:{href:"javascript:;"},on:{click:function(e){return t.del(i)}}},[t._v("删除")])])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("标签属性（产品型号）")]),a("th",[t._v("产品ID")]),a("th",[t._v("出厂价格")]),a("th",{staticClass:"t-right",staticStyle:{width:"80px"}},[t._v("操作")])])])],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑":"新增",width:"900px"}},[a("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[a("input-box",{staticClass:"input-width",staticStyle:{width:"20%"},attrs:{label:"标签属性（产品型号）"},model:{value:t.form.productModel,callback:function(e){t.$set(t.form,"productModel",e)},expression:"form.productModel"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"60%"},attrs:{label:"产品ID"},model:{value:t.form.productNo,callback:function(e){t.$set(t.form,"productNo",e)},expression:"form.productNo"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"20%"},attrs:{label:"出厂价格"},model:{value:t.form.exFactoryPrice,callback:function(e){t.$set(t.form,"exFactoryPrice",e)},expression:"form.exFactoryPrice"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.layer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],r=a("9b68"),l={name:"finished-price-list",components:{DataList:r["a"]},data:function(){return{layer:!1,loading:!1,form:{},filter:{productNo:"",productModel:""},info:{}}},created:function(){},methods:{edit:function(t){this.form=t||{},this.layer=!0},vertify:function(){for(var t in this.form){var e=this.form[t];if(!e&&0!==e&&"id"!==t)return this.$toast("请输入完整信息"+t),!1}return!0},submit:function(){var t=this,e=this.form;e.id?this.$http.put("/haolifa/price/product/update",e).then((function(e){t.$refs.list.update(),t.layer=!1,t.$toast("保存成功")})).catch((function(e){t.$toast(e.message||e.meg)})):this.$http.post("/haolifa/price/product/save",e).then((function(e){t.$refs.list.update(),t.layer=!1,t.$toast("保存成功")})).catch((function(e){t.$toast(e.message||e.meg)}))},close:function(){this.layer=!1},del:function(t){var e=this;this.$confirm({title:"删除确认",text:"您确定要删除以下成品吗？<br>".concat(t.productNo),color:"red",btns:["取消","删除"],yes:function(){e.$http.delete("/haolifa/price/product/delete/".concat(t.id)).then((function(t){e.$toast("删除成功"),e.$refs.list.update()})).catch((function(t){e.$toast(t.msg)}))}})}}},o=l,n=(a("003a"),a("6691")),c=Object(n["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},"5a8c":function(t,e,a){},8418:function(t,e,a){"use strict";var i=a("0490"),s=a.n(i);s.a},8812:function(t,e,a){},"9b68":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-list relative f-12"},[a("transition",{attrs:{name:"slide-y"}},[t.list.length?a("table",{staticClass:"data-table"},[t._t("header",[a("tr",[a("th",[t._v("表头1")]),a("th",[t._v("表头2")])])]),t._l(t.list,(function(e,i){return a("tr",{key:e.id},[t._t("item",[a("td",[t._v("数据1")]),a("td",[t._v("数据2")])],{i:i,item:e,index:(t.pageNum-1)*t.pageSize+i+1})],2)}))],2):t._e()]),a("div",{staticClass:"flex-v-center",staticStyle:{"margin-top":"10px"}},[t.list.length?a("pagination",{staticClass:"mr-20",attrs:{page:t.pageNum,size:t.pageSize,total:t.total},on:{change:t.getList}}):t._e(),t.total?a("span",{staticClass:"f-12 c-6"},[t._v("共 "+t._s(t.total)+" 条数据")]):t._e()],1),t.list.length||t.loading?t._e():a("div",{staticStyle:{"margin-top":"100px"}},[a("no-data")],1)],1)},s=[];a("8f42"),a("4634"),a("ed8b");function r(t){return"?"+Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&")}var l={name:"data-list",props:{method:{type:String,default:"get"},url:{type:String,default:""},pageSize:{type:Number,default:20},param:{type:Object,default:function(){}},pageNumStr:{type:String,default:"pageNum"}},data:function(){return{pageNum:1,total:0,loading:!1,list:[]}},watch:{url:function(){this.update()},mehtod:function(){this.update()},pageSize:function(){this.update()},param:function(){this.update()}},created:function(){this.pageNum=this.$route.query.page||1,this.getList(this.pageNum)},methods:{getList:function(t){var e=this,a=this.method,i=this.url,s=this.pageSize,l=this.param;if(i){this.loading=!0;var o={pageSize:s};o[this.pageNumStr]=t;var n=Object.assign(o,l),c="get"===a?i+r(n):i;this.$http[a](c,n).then((function(t){e.list=t.list||[],e.pageNum=t.pageNum;var a=e.$route.query;a.page=t.pageNum,e.$router.push({path:e.$route.path,query:a}),e.total=t.total,e.loading=!1})).catch((function(t){e.loading=!1,e.$toast(t.message||t.msg||t)}))}},update:function(t){this.getList(t?1:this.pageNum)}}},o=l,n=(a("c8ea"),a("6691")),c=Object(n["a"])(o,i,s,!1,null,null,null);e["a"]=c.exports},a253:function(t,e,a){},c8ea:function(t,e,a){"use strict";var i=a("a253"),s=a.n(i);s.a},c937:function(t,e,a){"use strict";var i=a("8812"),s=a.n(i);s.a},d790:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-orders-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.productNo,expression:"filter.productNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"产品ID"},domProps:{value:t.filter.productNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"productNo",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.productModel,expression:"filter.productModel"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"型号"},domProps:{value:t.filter.productModel},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"productModel",e.target.value)}}})]),a("div",{staticClass:"flex-item"})]),a("div",{staticClass:"flex-item"},[a("data-list",{ref:"list",attrs:{param:t.filter,url:"/haolifa/price/product/pageInfo",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.productModel))]),a("td",[t._v(t._s(i.productNo))]),a("td",[t._v(t._s(i.exFactoryPrice))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("标签属性（产品型号）")]),a("th",[t._v("产品ID")]),a("th",[t._v("出厂价格")])])])],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑":"新增",width:"900px"}},[a("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"标签属性（产品型号）"},model:{value:t.form.productModel,callback:function(e){t.$set(t.form,"productModel",e)},expression:"form.productModel"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"产品ID"},model:{value:t.form.productNo,callback:function(e){t.$set(t.form,"productNo",e)},expression:"form.productNo"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"出厂价格"},model:{value:t.form.exFactoryPrice,callback:function(e){t.$set(t.form,"exFactoryPrice",e)},expression:"form.exFactoryPrice"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.layer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],r=a("9b68"),l={name:"finished-price-list",components:{DataList:r["a"]},data:function(){return{layer:!1,loading:!1,form:{},filter:{productNo:"",productModel:""},info:{}}}},o=l,n=(a("c937"),a("6691")),c=Object(n["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},dfe3:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-orders-list"},[a("div",{staticClass:"flex-v-center tool-bar"},[a("div",{staticClass:"flex-v-center search-bar",staticStyle:{"margin-right":"20px"}},[a("i",{staticClass:"icon f-20 c-8"},[t._v("search")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.graphNo,expression:"filter.graphNo"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"图号"},domProps:{value:t.filter.graphNo},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"graphNo",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.name,expression:"filter.name"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"零件名称"},domProps:{value:t.filter.name},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"name",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.model,expression:"filter.model"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"型号"},domProps:{value:t.filter.model},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"model",e.target.value)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.specifications,expression:"filter.specifications"}],staticClass:"flex-item",staticStyle:{width:"200px"},attrs:{type:"text",placeholder:"规格"},domProps:{value:t.filter.specifications},on:{change:function(e){return t.$refs.list.update(!0)},input:function(e){e.target.composing||t.$set(t.filter,"specifications",e.target.value)}}})]),a("div",{staticClass:"flex-item"})]),a("div",{staticClass:"flex-item"},[a("data-list",{ref:"list",attrs:{param:t.filter,url:"/haolifa/price/material/pageInfo",method:"post"},scopedSlots:t._u([{key:"item",fn:function(e){var i=e.item,s=e.index;return[a("td",{staticClass:"c-a"},[t._v(t._s(s))]),a("td",[t._v(t._s(i.graphNo))]),a("td",[t._v(t._s(i.name))]),a("td",[t._v(t._s(i.model))]),a("td",[t._v(t._s(i.specifications))]),a("td",[t._v(t._s(i.materialClassifyName))]),a("td",[t._v(t._s(i.material))]),a("td",[t._v(t._s(i.unit))]),a("td",[t._v(t._s(i.actualWeight))]),a("td",[t._v(t._s(i.tonPrice))]),a("td",[t._v(t._s(i.taxRate))]),a("td",[t._v(t._s(i.blankCost))]),a("td",[t._v(t._s(i.blankCostTax))]),a("td",[t._v(t._s(i.sprayCost))]),a("td",[t._v(t._s(i.processCost))]),a("td",[t._v(t._s(i.price))]),a("td",[t._v(t._s(i.priceTax))])]}}])},[a("tr",{attrs:{slot:"header"},slot:"header"},[a("th",{staticStyle:{width:"60px"}},[t._v("序号")]),a("th",[t._v("图号")]),a("th",[t._v("零件名称")]),a("th",[t._v("型号")]),a("th",[t._v("规格")]),a("th",[t._v("零件分类名称")]),a("th",[t._v("材料")]),a("th",[t._v("单位")]),a("th",[t._v("单重")]),a("th",[t._v("吨价(元)")]),a("th",[t._v("税率")]),a("th",[t._v("毛坯费不含税(元)")]),a("th",[t._v("毛坯费含税(元)")]),a("th",[t._v("喷涂费(元)")]),a("th",[t._v("加工费(元)")]),a("th",[t._v("成品价不含税(元)")]),a("th",[t._v("成品价含税(元)")])])])],1),t.layer?a("layer",{attrs:{title:t.form.id?"编辑":"新增",width:"900px"}},[a("div",{staticClass:"layer-text",staticStyle:{"padding-bottom":"50px"}},[a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"图号"},model:{value:t.form.graphNo,callback:function(e){t.$set(t.form,"graphNo",e)},expression:"form.graphNo"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"48%"},attrs:{label:"零件名称"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"型号"},model:{value:t.form.model,callback:function(e){t.$set(t.form,"model",e)},expression:"form.model"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"规格"},model:{value:t.form.specifications,callback:function(e){t.$set(t.form,"specifications",e)},expression:"form.specifications"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"零件分类名称"},model:{value:t.form.materialClassifyName,callback:function(e){t.$set(t.form,"materialClassifyName",e)},expression:"form.materialClassifyName"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"材料"},model:{value:t.form.material,callback:function(e){t.$set(t.form,"material",e)},expression:"form.material"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"单位"},model:{value:t.form.unit,callback:function(e){t.$set(t.form,"unit",e)},expression:"form.unit"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"单重"},model:{value:t.form.actualWeight,callback:function(e){t.$set(t.form,"actualWeight",e)},expression:"form.actualWeight"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"吨价(元)"},model:{value:t.form.tonPrice,callback:function(e){t.$set(t.form,"tonPrice",e)},expression:"form.tonPrice"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"毛坯费(元)"},model:{value:t.form.blankCost,callback:function(e){t.$set(t.form,"blankCost",e)},expression:"form.blankCost"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"加工费(元)"},model:{value:t.form.processCost,callback:function(e){t.$set(t.form,"processCost",e)},expression:"form.processCost"}}),a("input-box",{staticClass:"input-width",staticStyle:{width:"24%"},attrs:{label:"成品价(元)"},model:{value:t.form.productPrice,callback:function(e){t.$set(t.form,"productPrice",e)},expression:"form.productPrice"}})],1),a("div",{staticClass:"layer-btns"},[a("btn",{attrs:{flat:""},on:{click:function(e){t.layer=!1}}},[t._v("取消")]),a("btn",{attrs:{flat:"",color:"#008eff"},on:{click:t.submit}},[t._v("保存")])],1)]):t._e()],1)},s=[],r=a("9b68"),l={name:"finished-price-list",components:{DataList:r["a"]},data:function(){return{layer:!1,form:{},filter:{graphNo:"",model:"",name:"",specifications:""}}}},o=l,n=(a("8418"),a("6691")),c=Object(n["a"])(o,i,s,!1,null,null,null);e["default"]=c.exports},f778:function(t,e,a){},fa30:function(t,e,a){"use strict";var i=a("5a8c"),s=a.n(i);s.a}}]);
//# sourceMappingURL=invoice.57c24aa0.js.map