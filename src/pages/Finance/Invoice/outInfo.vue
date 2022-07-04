<template>
    <div class="page-outInfo-list">
        <div class="flex-v-center tool-bar"></div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/store-room/entryOut/pageInfo" method="get">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件号</th>
                    <th>订单号</th>
                    <th>批次号</th>
                    <th>零件购买单价</th>
                    <th>出库数量（负数）</th>
                    <th>领料部门</th>
                    <th>库房Id</th>
                    <th>库房货位Id</th>
                    <th>库房货位号</th>
                    <th>出库时间</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.materialBatchNo}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.receiveDepartment}}</td>
                    <td>{{item.storeRoomId}}</td>
                    <td>{{item.storeRoomRackId}}</td>
                    <td>{{item.storeRoomRackNo}}</td>
                    <td>{{item.createTime}}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-outInfo-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 2,
                operationType: 1,
                orderNo: ""
            }
        };
    },
    created() {
        let { orderNo } = this.$route.query;
        if (orderNo !== undefined) this.filter.orderNo = orderNo;
    },
    methods: {}
};
</script>

<style lang="less">
.page-outInfo-list {
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
