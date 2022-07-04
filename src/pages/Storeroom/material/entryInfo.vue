<template>
    <div class="page-entryInfo-list">
        <div class="flex-v-center tool-bar"></div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/store-room/entryOut/pageInfo" method="get">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件号</th>
                    <th>订单号</th>
                    <th>批次号</th>
                    <th>零件购买单价</th>
                    <th>入库数量（正数）</th>
                    <th>库房Id</th>
                    <th>库房货位Id</th>
                    <th>库房货位号</th>
                    <th>供应商</th>
                    <th>入库时间</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.materialBatchNo}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.storeRoomId}}</td>
                    <td>{{item.storeRoomRackId}}</td>
                    <td>{{item.storeRoomRackNo}}</td>
                    <td>{{item.supplier}}</td>
                    <td>{{item.createTime}}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-entryInfo-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 2,
                operationType: 2,
                materialGraphNo: ""
            },
            form: {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                quantity: "",
                storeRoomId: "",
                storeRoomRackId: "",
                storeRoomRackNo: "",
                supplier: ""
            }
        };
    },
    activated() {
        this.filter.materialGraphNo = "";
        let { graphNo } = this.$route.query;
        if (graphNo !== undefined && this.$route.name === "entryInfo-list")
            this.filter.materialGraphNo = graphNo;
        this.$refs.list.update(true);
    },
    created() {
        let { graphNo } = this.$route.query;
        if (graphNo !== undefined && this.$route.name === "entryInfo-list")
            this.filter.materialGraphNo = graphNo;
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
