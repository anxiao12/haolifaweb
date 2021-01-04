<template>
    <div class="page-material-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="20" :param="filter" url="/haolifa/entrust/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>机加工单号</th>
                    <th>采购合同号</th>
                    <th>批次号</th>
                    <th>车间类型</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <th>加工后图号</th>
                    <th>类别</th>
                    <th>数量</th>
                    <th>检验合格数</th>
                    <th>发起时间</th>
                    <th>状态</th>
                    <!--<th>质检状态</th>-->
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.entrustNo}}</td>
                    <td>{{item.purchaseNo}}</td>
                    <td>{{item.batchNumber}}</td>
                    <td>{{workShopList[item.workshopType]}}</td>
                    <td>{{item.materialGraphName}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.processedGraphNo}}</td>
                    <td>{{busTypeList[item.busType]}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{rowStatusList[item.status-1].name}}</td>
                    <!--<td>{{inspectStatusList[item.inspectStatus]}}</td>-->
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="edit(item)">车间选择 |</a>
                        <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="audtiNotPass(item)">不通过 |</a>
                        <a :href="`/haolifa/export/entrust/excel/${item.entrustNo}`" download style="margin-right: 3px" class="blue">下载委托单</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-machining-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 1,
                status: -1
            },
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            rowStatusList: [
                { status: 1, name: "待审批" },
                { status: 2, name: "待加工" },
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" },
                { status: 5, name: "审批不通过" },
                { status: 6, name: "质检完成" }
            ],
            statusList: [
                { status: -1, name: "全部" },
                { status: 1, name: "待审批" },
                { status: 2, name: "待加工" },
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" },
                { status: 5, name: "审批不通过" },
                { status: 6, name: "质检完成" }
            ],
            busTypeList: ["未选择", "订单需求", "生产库存"],
            workShopList: ["暂无", "内部车间1", "外部", "内部车间2"]
        };
    },
    methods: {
        audtiNotPass(item) {
            this.$confirm({
                title: "审批提示",
                text: "确认不通过该加工申请？",
                color: "blue",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .get(
                            `/haolifa/entrust/updateStatus/${item.entrustNo}/5`
                        )
                        .then(res => {
                            this.$toast("审核完成");
                            this.$refs.list.update();
                        });
                }
            });
        },
        edit(item) {
            this.$router.push(`/workcar/edit?id=${item.id}`);
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
select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}
</style>
