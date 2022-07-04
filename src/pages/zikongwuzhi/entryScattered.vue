<template>
    <div class="page-entryInfo-list">
        <div class="flex-v-center tool-bar"></div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/auto-control/entry-out-page-list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>名称</th>
                    <th>分类名称</th>
                    <th>型号</th>
                    <th>图号</th>
                    <th>规格</th>
                    <th>入库数量（正数）</th>
                    <th>入库时间</th>
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
                    <td>{{item.updateTime}}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "zikongwuzhiEntry",
    components: { DataList },
    data() {
        return {
            filter: {
                endDate: "",
                materialName: "",
                autoControlId: 0,
                startDate: "",
                type: 2
            }
        };
    },
    activated() {
        let { id } = this.$route.query;
        this.filter.autoControlId = +id;
        this.$refs.list.update(true);
    },
    created() {
        let { id } = this.$route.query;
        this.filter.autoControlId = +id;
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
