(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"1ff7":function(t,e,a){"use strict";a("98d9")},"31e4":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"abs page-login flex-center",staticStyle:{"justify-content":"normal"}},[t._m(0),e("div",{staticClass:"t-mt10"},[e("div",{staticClass:"loginBox"},[e("h3",{staticClass:"title"},[t._v("用户登录")]),e("form",[e("div",{staticClass:"t-inputWrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"text",autocomplete:"off",placeholder:"请输入用户名"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),e("div",{staticClass:"inputIcon t-user"})]),e("div",{staticClass:"t-inputWrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",autocomplete:"off",placeholder:"请输入密码"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}},nativeOn:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.login.apply(null,arguments)}}}),e("div",{staticClass:"inputIcon t-password"})]),e("div",{staticClass:"t-inputWrap"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.imageCode,expression:"imageCode"}],staticClass:"inputCode",attrs:{type:"text",autocomplete:"off",placeholder:"请输入验证码"},domProps:{value:t.imageCode},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.login.apply(null,arguments)},input:function(e){e.target.composing||(t.imageCode=e.target.value)}}}),e("div",{staticClass:"codeImg"},[e("img",{attrs:{src:t.authImg,alt:""},on:{click:function(e){return t.getImageCode()}}})]),e("div",{staticClass:"inputIcon t-codeIcon"})])]),e("div",{staticClass:"t-inputWrap"},[e("a",{staticClass:"loginBtn",attrs:{href:"javascript:;",loading:t.loading},on:{click:t.login}},[t._v("登录")])]),e("div",{staticClass:"t-inputWrap",staticStyle:{"text-align":"right"}},[e("span",{directives:[{name:"show",rawName:"v-show",value:t.errorMsgFlag,expression:"errorMsgFlag"}],staticStyle:{color:"#f36ca1"}},[t._v(t._s(t.errorMsg))]),e("a",{directives:[{name:"tooltip",rawName:"v-tooltip:top",value:"请联系管理员修改密码",expression:"'请联系管理员修改密码'",arg:"top"}],staticClass:"a f-13",staticStyle:{color:"rgb(178, 204, 239)"}},[t._v("忘记密码？")]),e("span",{staticClass:"flex-item"})])])])])},i=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"t-mt5",staticStyle:{"text-align":"center"}},[e("img",{staticStyle:{width:"80%"},attrs:{src:a("e856")}})])}],n=(a("a481"),a("a18c")),o={name:"page-login",data:function(){return{loading:!1,useCache:!0,username:"",password:"",imageCode:"",authImg:"",errorMsgFlag:!1,errorMsg:""}},computed:{account:function(){return{avatar:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534255652460&di=c1960d6d0555519030bd6083679589c5&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8601a18b87d6277f784629f52a381f30e824fca3.jpg",name:"好利发",username:"haolifa"}}},created:function(){this.$store.commit("INITMENUTABS"),this.getImageCode()},methods:{login:function(){var t=this,e=this.username,a=this.password,s=this.imageCode;this.loading=!0;var i=new FormData;i.append("username",e),i.append("password",a),i.append("imageCode",s),this.$http.post("/haolifa/login",i).then((function(e){e.menus.push("home"),t.errorMsgFlag=!1,t.$store.commit("LOGIN",e),Object(n["b"])(e.menus),t.$router.replace("/")})).catch((function(e){t.loading=!1,t.errorMsgFlag=!0,t.errorMsg=e.message||e.msg,t.$toast(e.message||e.msg||e)}))},getImageCode:function(){var t=Math.random();this.authImg="/haolifa/code/image?"+t}}},r=o,c=(a("e718"),a("2877")),l=Object(c["a"])(r,s,i,!1,null,null,null);e["default"]=l.exports},"98d9":function(t,e,a){},c8e7:function(t,e,a){},e718:function(t,e,a){"use strict";a("c8e7")},e856:function(t,e,a){t.exports=a.p+"img/logo_title-1.7b602709.png"},e9da:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"page-404 abs flex-center"},[e("div",{staticClass:"content"},[e("h1",[t._v("404")]),e("p",[t._v("找不到此页面："),e("span",[t._v(t._s(t.$route.path))])]),e("p",[e("router-link",{staticClass:"c-8 mr-15",on:{click:function(e){return t.$router.back()}}},[t._v("返回")]),e("router-link",{staticClass:"c-8",attrs:{to:"/"}},[t._v("回到首页")])],1)])])},i=[],n={name:"page-404"},o=n,r=(a("1ff7"),a("2877")),c=Object(r["a"])(o,s,i,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=login.23380a6a.js.map