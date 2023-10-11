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
            <div class="flex-item relative" style="width: 0;overflow-y: auto;">
                <div style="height:36px;background: #3a8ee630;">
                    <el-tabs v-model="$store.state.tab.tabIndex" type="card" closable @tab-remove="removeTab" size="mini" @tab-click="tabClick">
                        <el-tab-pane v-for="(item, i) in $store.state.tab.menuTabs" :key="i" :label="item.name" :name="item.url"></el-tab-pane>
                    </el-tabs>
                </div>
                <transition name="slide-y">
                    <keep-alive exclude="page-machineSet-list,machineToPurchase-order-list,machinesupply-list">
                        <router-view style="top:36px"/>
                    </keep-alive>
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
            leftOpen: true,
            editableTabsValue: "/"
        };
    },
    created() {},
    methods: {
        removeTab(val) {
            if (val == "/") return;
            this.$store.commit("DELMENUTABS", val);
            this.$router.push({
                path: this.$store.state.tab.menuTabs[
                    this.$store.state.tab.menuTabs.length - 1
                ].url
            });
        },
        tabClick(obj) {
            this.$router.push({ path: obj.name });
        }
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
    .el-tabs--card > .el-tabs__header {
        border: 0;
    }
}
</style>
