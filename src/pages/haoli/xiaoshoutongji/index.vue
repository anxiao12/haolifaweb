<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.customerName" @change="
            $refs.list.update(true)" placeholder="客户名称" style="width: 200px;">
            开始时间:
                <el-date-picker v-model="filter.startDate" type="date" value-format="yyyy-MM-dd" @change="$refs.list.update(true);" :editable="false" placeholder="选择年月日"></el-date-picker>结束时间:
                <el-date-picker v-model="filter.endDate" type="date" value-format="yyyy-MM-dd" @change="$refs.list.update(true);" :editable="false" placeholder="选择年月日"></el-date-picker>
            </div>
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff" @click="add">新增</btn> -->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/sum/saleContract/summary/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>客户名称</th>
                    <th>合同额</th>
                    <th>发货额</th>
                    <th>出货应收</th>
                    <th>开票应收</th>
                    <th>已收款</th>
                    <th>未开票</th>
                    <th>已开票</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.customerName }}</td>
                    <td>{{ item.contractAmount }}</td>
                    <td>{{ item.deliveryAmount }}</td>
                    <td>{{ item.deliveryNeedCollectAmount }}</td>
                    <td>{{ item.invoiceNeedCollectAmount }}</td>
                    <td>{{ item.collectedAmount }}</td>
                    <td>{{ item.needInvoiceAmount }}</td>
                    <td>{{ item.invoicedAmount }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="detail(item.customerName)">合同详情</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "khzb-list",
    components: { DataList },
    data() {
        return {
            filter: {
                customerName: "",
                startTime: "",
                endTime: ""
            },
        };
    },
    mounted() {
    },
    methods: {
        flush() {
            this.filter = {
                supplierName: "",
                startTime: "",
                endTime: ""
            };
            this.$refs.list.update(true);
        },
        detail(name){
            this.$router.push({path:"/order",query:{name:name}})
        }
    }
};
</script>

<style lang="less">
.page-invoice-list {
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

    //
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
