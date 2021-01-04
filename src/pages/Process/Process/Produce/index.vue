<template>
    <div class="process-prod flex-col">
        <tab v-model="$route.name" style="margin: 0 20px;">
            <tab-item href="produceBase" @click="switchTab('/produceBase')">审批</tab-item>
            <!--<tab-item href="purchaseNodes" @click="switchTab('/applybuy/nodes')">流程节点</tab-item>-->
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
    methods: {
        switchTab(path) {
            this.$router.replace({ path, query: this.$route.query });
        }
    }
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
