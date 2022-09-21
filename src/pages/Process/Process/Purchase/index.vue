<template>
    <div class="process-prod flex-col">
        <tab
            v-model="$route.name"
            style="margin: 0 20px;"
        >
            <tab-item
                href="purchaseBase"
                @click="switchTab('/purchase')"
            >审批</tab-item>
            <!--<tab-item href="purchaseNodes" @click="switchTab('/purchaseNodes')">流程节点</tab-item>-->
        </tab>
        <div class="flex-item scroll-y">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "process-prod",
    created() {
        console.log("log", this.$route.name);
    },
    methods: {
        switchTab(path) {
            // this.$route.name = "purchaseNodes";
            this.$router.replace({ path, query: this.$route.query });
        },
    },
};
</script>

<style lang="less">
.process-prod {
    .content {
        max-width: 100%;
        margin: 0 auto;
    }
}
</style>
