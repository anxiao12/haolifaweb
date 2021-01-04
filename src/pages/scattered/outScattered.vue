<template>
    <div class="page-entryInfo-list">
        <div class="flex-v-center tool-bar"></div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/sporadic/entry-out-page-list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>名称</th>
                    <th>分类名称</th>
                    <th>型号</th>
                    <th>图号</th>
                    <th>规格</th>
                    <th>出库数量（负数）</th>
                    <th>领料部门</th>
                    <th>出库时间</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.classifyName}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.receiveDepartment}}</td>
                    <td>{{item.updateTime}}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "scattered-out-list",
    components: { DataList },
    data() {
        return {
            filter: {
                endDate: "",
                materialName: "",
                sporadicId: 0,
                startDate: "",
                type: 1
            }
        };
    },
    created() {
        let { id } = this.$route.query;
        // if (id !== undefined && this.$route.name === "scattered-entry")
        this.filter.sporadicId = +id;
    },
    methods: {}
};
</script>

<style lang="less">
.page-entryInfo-list {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
    .scroll-y {
        padding-bottom: 40px;
    }
}
</style>
