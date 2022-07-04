<template>
    <div class="page-supplier-manage flex-col mt-20 ml-20">
        <div class="flex-item scroll-y">
            <table class="data-table">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>文件名称</th>
                    <th>下载地址</th>
                </tr>
                <tr v-for="(item, index) in accessoryList">
                    <td>{{index}}</td>
                    <td>{{item.fileName}}</td>
                    <td>
                        <a class="fixed-length" :href="item.fileUrl" :title="item.fileUrl">{{item.fileUrl}}</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-supplier-manage",
    components: { DataList },
    data() {
        return {
            accessoryList: []
        };
    },
    activated() {
        this.accessoryList = [];
        this.getAccessory();
    },
    created() {
        this.getAccessory();
    },
    methods: {
        getAccessory() {
            const formNo = this.$route.query.formNo;
            this.$http
                .get(
                    `/haolifa/flowInstance/flow/accessoryInfo?formNo=${formNo}&formId=0`
                )
                .then(res => {
                    res.forEach(item => {
                        if (item.fileUrl != "") {
                            this.accessoryList.push(item);
                        }
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-supplier-manage {
    // height: 100%;
}
</style>