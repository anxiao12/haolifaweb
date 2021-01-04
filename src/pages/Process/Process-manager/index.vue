<template>
    <div class="page-manager">
        <div class="flex-v-center tool-bar">
            <!--<div class="flex-v-center search-bar" style="margin-right: 20px;">-->
            <!--<i class="icon f-20 c-8">search</i>-->
            <!--<input type="text" class="flex-item" placeholder="姓名" style="width: 200px;">-->
            <!--</div>-->
            <div class="flex-item"></div>
            <!--<router-link to="/user/add">-->
            <!--<btn class="b" flat color="#008eff">新增用户</btn>-->
            <!--</router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <table class="data-table" v-if="flowList.length">
                <tr>
                    <th style="width: 60px;">ID</th>
                    <th>名称</th>
                    <th>描述</th>
                    <th>创建时间</th>
                    <th class="t-left" style="width: 100px;">操作</th>
                </tr>
                <tr v-for="(item, i) in flowList">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.createTime}}</td>
                    <td>
                        <a href="javascript:;" class="blue" @click="info(item.id)">详情</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-manager",
    components: { DataList },
    data() {
        return {
            flowList: []
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList: function() {
            this.$http
                .get(`/haolifa/flow/list/`)
                .then(res => {
                    this.flowList = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        info: function(itemId) {
            this.$router.push(`/process-manager/info?itemId=${itemId}`);
        }
    }
};
</script>

<style lang="less">
.page-manager {
    //
}
</style>
