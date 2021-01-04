<template>
    <div class="page-main bg-f abs flex-col">
        <div class="top-bar bg-blue flex-v-center">
            <!-- <icon-btn class="c-f" @click="leftOpen=!leftOpen">menu</icon-btn> -->
            <router-link to="/" class="flex-v-center logo">
                <img src="../../assets/img/logo_full_white.png" alt="LOGO">
                <span class="f-20 c-f b w-320">好利信息化智能制造管控系统</span>
            </router-link>
            <span class="f-16 c-f" style="margin-left: 10px;">{{$route.meta.title}}</span>
            <div class="flex-item"></div>
            <account/>
        </div>
        <div class="flex-item flex" style="width: 100%;overflow: hidden;">
            <div class="left scroll-y" v-if="leftOpen" style="background: #f8f8f8;">
                <main-left/>
            </div>
            <div class="flex-item relative" style="width: 0;">
                <transition name="slide-y">
                    <router-view class="abs"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Account from "@/components/account";
import MainLeft from "./Left/";

export default {
    name: "page-main",
    components: { Account, MainLeft },
    data() {
        return {
            leftOpen: true
        };
    }
};
</script>

<style lang="less">
.page-main {
    .logo {
        line-height: 20px;
        margin-left: 5px;
        color: #d42101;
        img {
            height: 26px;
            vertical-align: top;
            margin-right: 15px;
            margin-bottom: 2px;
        }
    }
    .left {
        width: 250px;
        border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    td,
    th {
        white-space: nowrap;
    }
    .w-320 {
        width: 320px;
    }
}
</style>
