<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                <btn class="ml-20" @click="exportExcel">导出</btn>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/entrust/list" method="post">
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
                    <th>规格</th>
                    <th>型号</th>
                    <th>数量</th>
                    <th>检验合格数</th>
                    <th>发起时间</th>
                    <th>状态</th>
                    <th>质检状态</th>
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
                    <td>{{item.specifications}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{rowStatusList[item.status-1].name}}</td>
                    <td>{{inspectStatusList[item.inspectStatus]}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.status == 2" style="margin-right: 3px" class="blue" @click="updateStatus(item,3)">开始加工</a>
                        <a href="javascript:;" v-if="item.status == 3 || item.status == 6" style="margin-right: 3px" class="blue" @click="updateStatus(item, 4)">加工完成</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="flex ml-20 mr-20">
                <date-picker v-model="form.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <date-picker v-model="form.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportLayer=false">取消</btn>
                <btn flat color="#008eff" @click="download()">确定</btn>
            </div>
        </layer>
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
                type: 2,
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
                { status: 2, name: "待加工" },
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" },
                { status: 6, name: "质检完成" }
            ],
            busTypeList: ["未选择", "订单需求", "生产库存"],
            workShopList: ["暂无", "内部车间1", "外部", "内部车间2"],
            exportLayer: false,
            form: {
                entryStatus: 0,
                type: 2,
                startDate: "",
                endDate: ""
            }
        };
    },
    methods: {
        flush() {
            this.filter = {
                type: 2,
                status: -1
            };
            this.$refs.list.update(true);
        },
        updateStatus(item, status) {
            if (item.outRoomStatus != 2) {
                this.$toast("该批零件还未出库，请及时办理出库手续！");
                return;
            }
            this.$confirm({
                title: "状态变更提示",
                text: status == 3 ? "确认开始加工？" : "确认加工完成？",
                color: "blue",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .get(
                            `/haolifa/entrust/updateStatus/${
                                item.entrustNo
                            }/${status}`
                        )
                        .then(res => {
                            this.$toast("状态变更成功");
                            this.$refs.list.update(true);
                        });
                }
            });
        },
        exportExcel() {
            this.exportLayer = true;
            this.form = {
                entryStatus: 2,
                type: 2,
                startDate: "",
                endDate: ""
            };
        },
        download() {
            if (!this.form.startDate) {
                this.$toast("请选择开始时间");
                return;
            }
            if (!this.form.endDate) {
                this.$toast("请选择结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/export/material-entry?type=2&startDate=${
                    this.form.startDate
                }&endDate=${this.form.endDate}&entryStatus=${
                    this.form.entryStatus
                }`
            );
            a.click();
            this.exportLayer = false;
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
