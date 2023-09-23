<template>
    <div class="abs page-login flex-center" style="justify-content: normal;">
        <div class="t-mt5" style="text-align:center;">
            <img src="../../assets/img/logo_title-1.png" style="width:80%;" />
        </div>
        <div class="t-mt10">
            <div class="loginBox">
                <h3 class="title">用户登录</h3>
                <form>
                    <div class="t-inputWrap">
                        <input type="text" v-model="username" autocomplete="off" placeholder="请输入用户名" />
                        <div class="inputIcon t-user"></div>
                    </div>
                    <div class="t-inputWrap">
                        <input type="password" v-model="password" autocomplete="off" @keydown.enter.native="login" placeholder="请输入密码" />
                        <div class="inputIcon t-password"></div>
                    </div>
                    <div class="t-inputWrap">
                        <input type="text" class="inputCode" autocomplete="off" v-model="imageCode" @keyup.enter="login" placeholder="请输入验证码" />
                        <div class="codeImg">
                            <img @click="getImageCode()" :src="authImg" alt />
                        </div>
                        <div class="inputIcon t-codeIcon"></div>
                    </div>
                </form>
                <div class="t-inputWrap">
                    <a href="javascript:;" class="loginBtn" :loading="loading" @click="login">登录</a>
                </div>
                <div class="t-inputWrap" style="text-align:right;">
                    <span style="color:#f36ca1" v-show="errorMsgFlag">{{errorMsg}}</span>
                    <a class="a f-13" v-tooltip:top="'请联系管理员修改密码'" style="color:rgb(178, 204, 239);">忘记密码？</a>
                    <span class="flex-item"></span>
                </div>
                <!-- <div class="flex-v-center">
        <img src="../../assets/img/logo_full.png" class="login-logo">
        <span class="flex-item c-a">山西好利智能化管理系统</span>
      </div>
      <div class="login-form">
        <div class="flex-v-center login-account" v-if="useCache">
          <avatar :src="account.avatar"/>
          <div class="flex-item">
            <div>{{account.name}}</div>
            <div class="c-a f-14">{{account.username}}</div>
          </div>
          <icon-btn :disabled="loading" @click="useCache=false;password=''" v-tooltip:top="'切换账号'">keyboard</icon-btn>
        </div>
        <form>
          <input-box v-model="username" :disabled="loading" label="用户名" type="text" v-show="!useCache"/>
          <input-box v-model="password" :disabled="loading" label="密码" type="password" @keydown.enter.native="login"/>
        </form>
        <div class="flex">
          <a class="a f-13 c-a" v-tooltip:top="'请联系管理员修改密码'">忘记密码？</a><span class="flex-item"></span>
          <btn big :loading="loading" @click="login">登录</btn>
        </div>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import { resetRouter } from "@/router";

export default {
    name: "page-login",
    data() {
        return {
            loading: false,
            useCache: true,
            username: "",
            password: "",
            imageCode: "",
            authImg: "",
            errorMsgFlag: false,
            errorMsg: ""
        };
    },
    computed: {
        account() {
            // let account = localStorage.account || ''
            // if (account) return JSON.parse(account)
            // else return null
            return {
                avatar:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534255652460&di=c1960d6d0555519030bd6083679589c5&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F8601a18b87d6277f784629f52a381f30e824fca3.jpg",
                name: "好利发",
                username: "haolifa"
            };
        }
    },
    created() {
        //登录时清空tab
        this.$store.commit("INITMENUTABS");
        this.getImageCode();
    },
    methods: {
        login() {
            const { username, password, imageCode } = this;
            this.loading = true;
            const fd = new FormData();
            fd.append("username", username);
            fd.append("password", password);
            fd.append("imageCode", imageCode);
            this.$http
                .post("/haolifa/login", fd)
                .then(res => {
                  console.log('res11',res)
                    res.menus.push("home");
                    this.errorMsgFlag = false;
                    this.$store.commit("LOGIN", res);
                    resetRouter(res.menus);
                    this.$router.replace("/");
                })
                .catch(e => {
                    this.loading = false;
                    this.errorMsgFlag = true;
                    this.errorMsg = e.message || e.msg;
                    this.$toast(e.message || e.msg || e);
                });
        },
        getImageCode() {
            let randomNum = Math.random();
            this.authImg = "/haolifa/code/image?" + randomNum;
        }
    }
};
</script>

<style lang="less">
.page-login {
    background: url("../../assets/img/login_bg.jpg") center / cover;
    flex-direction: column;
    .avatar {
        margin-right: 15px;
    }
    .login-logo {
        height: 30px;
        filter: grayscale(100%);
        opacity: 0.5;
        margin-right: 10px;
    }
    .login-account {
        padding: 20px 0;
    }
    .login-form {
        padding: 30px 0 10px 0;
    }
    .loginBox {
        background: url("../../assets/img/login.png") no-repeat;
        width: 400px;
        height: 445px;
        margin-left: 655px;
        overflow: hidden;
        h3 {
            font-size: 24px;
            color: #fff;
            margin-top: 60px;
            margin-bottom: 30px;
            text-align: center;
        }
        .t-inputWrap {
            width: 280px;
            margin: 15px auto;
            position: relative;
        }
        .t-inputWrap input {
            width: 100%;
            height: 45px;
            border: 1px solid #71a4e3;
            line-height: 45px;
            text-indent: 40px;
            font-size: 16px;
            color: #fff;
            outline: none;
            background-color: rgba(40, 111, 203, 0);
        }
        .t-inputWrap .inputIcon {
            width: 15px;
            height: 15px;
            position: absolute;
            left: 12px;
            top: 16px;
            background-image: url("../../assets/img/login_bg.png");
            background-repeat: no-repeat;
        }
        .t-inputWrap .t-user {
            background-position: left top;
        }
        .t-inputWrap .t-password {
            background-position: left -19px;
        }
        .t-inputWrap .t-codeIcon {
            background-position: left -37px;
        }
        .t-inputWrap .inputCode {
            width: 200px;
        }
        .t-inputWrap .codeImg {
            width: 74px;
            height: 43px;
            margin-top: 2px;
            float: right;
            background: #f1f1f1;
        }
        .t-inputWrap .codeImg img {
            width: 100%;
            height: 100%;
        }
        .t-inputWrap a.loginBtn {
            width: 100%;
            display: block;
            text-align: center;
            line-height: 45px;
            text-decoration: none;
            height: 45px;
            background: #46c0ff;
            color: #fff;
            font-size: 16px;
            transition: background 0.3s;
            -webkit-transition: background 0.3s;
        }
        .t-inputWrap a.loginBtn:hover {
            background: #32b4f7;
        }
    }
    input::-webkit-input-placeholder {
        color: #92bff9;
    }
    .t-mt10 {
        margin-top: 8%;
    }
    .t-mt5 {
        margin-top: 5%;
    }
    @media screen and (min-width: 960px) and (max-width: 1366px) {
        .t-mt5 {
            margin-top: 3%;
        }
        .t-mt10 {
            margin-top: 2%;
        }
    }
    @media screen and (min-width: 1367px) and (max-width: 1440px) {
        .t-mt5 {
            margin-top: 5%;
        }
        .t-mt10 {
            margin-top: 5%;
        }
    }
    @media screen and (width: 1600px) {
        .t-mt5 {
            margin-top: 5%;
        }
        .t-mt10 {
            margin-top: 5%;
        }
    }
}
</style>
