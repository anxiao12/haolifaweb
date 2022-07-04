<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.demander" @change="
            $refs.list.update(true)" placeholder="需求方" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.supplierName" @change="
            $refs.list.update(true)" placeholder="供应方" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/payplansummary/getPayPlanList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>需求方</th>
                    <th>供应商</th>
                    <th>累计欠款额</th>
                    <th>累计订货额</th>
                    <th>累计入账额</th>
                    <th>已付货款</th>
                    <th>计划付款额</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.demander }}</td>
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.arrearPrice }}</td>
                    <td>{{ item.totalPrice }}</td>
                    <td>{{ item.entryPrice }}</td>
                    <td>{{ item.paidAccount }}</td>
                    <td>{{ item.applyAmount }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="detail(item)">详 情</a>
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
                supplierName: "",
                demander: ""
            }
        };
    },
    mounted() {
        this.getAccount();
    },
    methods: {
        flush() {
            this.filter = {
                supplierName: "",
                demander: ""
            };
            this.$refs.list.update(true);
        },
        detail(item) {
            this.$router.push({
                name: "/pay-planList",
                query: {
                    demander: item.demander,
                    supplierName: item.supplierName
                }
            });
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
