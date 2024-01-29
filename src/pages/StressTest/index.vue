<template>
    <div class="page-orders-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNumber" @change="$refs.list.update(true)"
                    placeholder="订单号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productNumber" @change="$refs.list.update(true)"
                    placeholder="产品编号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.result" @change="$refs.list.update(true)"
                    placeholder="结果" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.tester" @change="$refs.list.update(true)"
                    placeholder="测试人员" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.host" @change="$refs.list.update(true)"
                    placeholder="来源" style="width: 200px;">
                <!-- <select v-model="filter.orderStatus" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in orderStatusList" :value="item.value" v-bind:key="item.value">{{ item.text }}
                    </option>
                </select> -->
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <!-- <data-list ref="list" :param="filter" url="/haolifa/order-product/pageInfo" method="post"> -->
            <data-list ref="list" :param="filter" url="/haolifa/product/quality/inspection/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>产品编号</th>
                    <th>型号</th>
                    <th>口径</th>
                    <th>材质</th>
                    <th>颜色</th>
                    <th>公称压力</th>
                    <th>试验压力</th>
                    <th>允许压降</th>
                    <th>保压时间</th>
                    <th>测试设备</th>
                    <th>生产序号</th>
                    <th>生产班次</th>
                    <th>测试人员</th>
                    <th>产品备注</th>
                    <th>结果</th>
                    <th>来源</th>
                    <th>日期</th>
                    <th>时间</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.orderNumber }}</td>
                    <td>{{ item.productNumber }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.caliber }}</td>
                    <td>{{ item.material }}</td>
                    <td>{{ item.color }}</td>
                    <td>{{ item.nominalPressure }}</td>
                    <td>{{ item.testPressure }}</td>
                    <td>{{ item.allowablePressureDrop }}</td>
                    <td>{{ item.holdingTime }}</td>
                    <td>{{ item.testingEquipment }}</td>
                    <td>{{ item.productionNumber }}</td>
                    <td>{{ item.productionShift }}</td>
                    <td>{{ item.tester }}</td>
                    <td>{{ item.productRemarks }}</td>
                    <td>{{ item.result }}</td>
                    <td>{{ item.host }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.time }}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "stresstest-addList",
    components: { DataList },
    data() {
        return {
            filter: {
                "host": "",
                "orderNumber": "",
                "productNumber": "",
                "result": "",
                "tester": ""
            },
        };
    },
    created() {
    },
    methods: {
        flush() {
            this.filter = {
                "host": "",
                "orderNumber": "",
                "productNumber": "",
                "result": "",
                "tester": ""
            };
            this.$refs.list.update(true);
        },
    }
};
</script>

<style lang="less">
.page-orders-list {
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

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.metalwork-info {
    padding: 30px 20px;

    tr:first-child td {
        padding: 0;
        border: none;
    }

    th {
        font-weight: normal;
        color: #888;
    }

    td {
        color: #444;
    }

    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }

    .checkbox-list {
        flex-wrap: wrap;
    }

    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}

.order-info {

    th,
    td {
        white-space: unset !important;
    }
}
</style>