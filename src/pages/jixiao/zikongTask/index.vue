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
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true)" placeholder="委托单号" style="width: 200px;">
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/auto-control-entrust/page" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>委托单号</th>
                    <th>数量</th>
                    <th>检验合格数量</th>
                    <th>图号</th>
                    <th>规格</th>
                    <th>名称</th>
                    <th>型号</th>
                    <th>状态</th>
                    <th>委托工种类别</th>
                    <th>质检状态</th>
                    <th>发起时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.entrustNo}}</td>
                    <td>{{item.qty}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.model}}</td>
                    <td>{{rowStatusList[item.status].name}}</td>
                    <td>{{item.workType}}</td>
                    <td>{{inspectStatusList[item.inspectStatus]}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="updateTask(item.entrustNo)" style="margin-right: 3px;">任务分配 |</a>
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="detail(item)">详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content page-supplier-info">
                    <table class="f-14">
                        <tr>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                        </tr>
                        <tr>
                            <td style="border: none;" colspan="10" class="b" align="center">自控委托单</td>
                        </tr>
                        <tr>
                            <th colspan="10">委托单号：{{spray.entrustNo}}</th>
                        </tr>
                        <tr>
                            <!-- <th colspan="5">计划人：{{spray.planner}}</th> -->
                            <td colspan="10">日 期：{{spray.createTime}}</td>
                        </tr>
                        <tr style="border:thin">
                            <td colspan="1" class="b">序号</td>
                            <td colspan="1" class="b">名称</td>
                            <td colspan="1" class="b">图号</td>
                            <td colspan="1" class="b">型号</td>
                            <td colspan="1" class="b">规格</td>
                            <td colspan="1" class="b">数量</td>
                            <td colspan="1" class="b">合格数</td>
                            <td colspan="1" class="b">状态</td>
                            <td colspan="1" class="b">质检状态</td>
                            <td colspan="1" class="b">工种类别</td>
                        </tr>
                        <tr style="border:thin">
                            <td colspan="1">1</td>
                            <td colspan="1">{{spray.name}}</td>
                            <td colspan="1">{{spray.graphNo}}</td>
                            <td colspan="1">{{spray.model}}</td>
                            <td colspan="1">{{spray.specifications}}</td>
                            <td colspan="1">{{spray.qty}}</td>
                            <td colspan="1">{{spray.qualifiedNumber}}</td>
                            <td colspan="1">{{rowStatusList[spray.status].name}}</td>
                            <td colspan="1">{{inspectStatusList[spray.inspectStatus]}}</td>
                            <td>{{spray.workType}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mt-15 ml-20 mr-20" v-if="inspectHistory.length" style="overflow-x: auto">
                    <div class="b f-18 flex-v-center ml-20" style="margin-bottom: 20px;">
                        <div class="flex-item" style="text-align: center;line-height: 24px;">质检记录</div>
                    </div>
                    <div class="flex-item scroll-y page-supplier-info" style="overflow-x: auto">
                        <table class="data-table">
                            <tr style="display:none">
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 12%;"></td>
                                <td style="width: 12%;"></td>
                            </tr>
                            <tr>
                                <th>单号</th>
                                <th>名称</th>
                                <th>图号</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>处理意见</th>
                                <th>附件</th>
                                <th>不合格现象描述</th>
                            </tr>
                            <tr v-for="(item, i) in inspectHistory" :key="i">
                                <td>{{item.no}}</td>
                                <td>{{item.materialGraphName}}</td>
                                <td>{{item.materialGraphNo}}</td>
                                <td>{{item.testNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.handlingSuggestion}}</td>
                                <td>
                                    <div v-for="(obj,i) in item.accessoryList" :key="i">
                                        <a target="_blank" :href="obj.fileUrl">{{obj.fileName}}</a>
                                    </div>
                                </td>
                                <td>{{item.reasonArr.toString()}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="layerTable" title="任务分配" width="90%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="orderNo" label="订单号"></el-table-column>
                    <el-table-column prop="postCapability" label="岗位能力名称"></el-table-column>
                    <el-table-column prop="postName" label="岗位(工序)名称"></el-table-column>
                    <el-table-column prop="postCode" label="岗位(工序)代码"></el-table-column>
                    <el-table-column label="人员选择">
                        <template slot-scope="scope">
                            <el-select size="mini" multiple v-model="form.payOrderUserRelationProcedureList[scope.row.number].userId" clearable>
                                <el-option v-for="(item,i) in scope.row.userList" :key="i" :label="item.userName" :value="item.userId"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="saveLoading" type="primary" @click="saveSelect">保存</el-button>
                <el-button class="mr-20" size="mini" @click="layerTable=false">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "spray-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            filter: {
                entrustNo: "",
                graphNo: "",
                inspectStatus: "-1",
                status: "-1",
                type: ""
            },
            rowStatusList: [
                { status: 0, name: "待加工" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" }
            ],
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            statusList: [
                { status: 0, name: "待加工" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" },
                { status: -1, name: "全部" }
            ],
            inspectHistory: [],
            busTypeList: ["未选择", "订单需求", "生产库存"],
            spray: {},
            workTypeArr: [
                "普通开关型电动执行器装配",
                "调节型电动执行器装配",
                "公共件准备工作",
                "气动蝶阀装配",
                "外调普通精巧型执行器装配",
                "外调精巧调节型执行器装配",
                "外调通用调节型执行器装配",
                "外调通用开关型执行器装配"
            ],
            workTypeList: [
                {
                    text: "普通开关型电动执行器装配",
                    value: "普通开关型电动执行器装配"
                },
                { text: "调节型电动执行器装配", value: "调节型电动执行器装配" },
                { text: "公共件准备工作", value: "公共件准备工作" },
                { text: "气动蝶阀装配", value: "气动蝶阀装配" },
                {
                    text: "外调普通精巧型执行器装配",
                    value: "外调普通精巧型执行器装配"
                },
                {
                    text: "外调精巧调节型执行器装配",
                    value: "外调精巧调节型执行器装配"
                },
                {
                    text: "外调通用调节型执行器装配",
                    value: "外调通用调节型执行器装配"
                },
                {
                    text: "外调通用开关型执行器装配",
                    value: "外调通用开关型执行器装配"
                }
            ],
            inspectHistory: [],
            loading: false,
            saveLoading: false,
            layerTable: false,
            tableData: [],
            form: { payOrderUserRelationProcedureList: [] }
        };
    },
    methods: {
        flush() {
            this.filter = {
                entrustNo: "",
                graphNo: "",
                inspectStatus: "-1",
                status: "-1",
                type: ""
            };
            this.$refs.list.update(true);
        },
        detail(item) {
            this.sprayInfo(item);
            this.layer = true;
        },
        updateTask(orderNo) {
            this.layerTable = true;
            this.loading = true;
            this.tableData = [];
            this.form = { payOrderUserRelationProcedureList: [] };
            this.$http
                .get(
                    `/haolifa/pay-working-procedure/assignTask?type=4&orderNo=` +
                        orderNo
                )
                .then(res => {
                    this.loading = false;
                    if (!res) {
                        return;
                    }
                    this.tableData = res;
                    this.tableData.map((item, index) => {
                        item.number = index;
                        this.form.payOrderUserRelationProcedureList.push({
                            id: item.id,
                            userId: item.userId ? item.userId : [],
                            productId: item.productId,
                            orderId: item.orderNo
                        });
                    });
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        saveSelect() {
            this.saveLoading = true;
            this.$http
                .post(`/haolifa/pay-working-procedure/saveTask`, this.form)
                .then(res => {
                    this.layerTable = false;
                    this.saveLoading = false;
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.saveLoading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        // 查询详情
        sprayInfo(item) {
            // 查询详情：
            this.$http
                .post(`/haolifa/auto-control-entrust/detail/${item.id}`)
                .then(res => {
                    this.spray = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            // 质检记录列表；
            this.$http
                .get(
                    `/haolifa/auto-control-entrust/inspect/list/${
                        item.entrustNo
                    }`
                )
                .then(res => {
                    this.inspectHistory = res;
                    this.inspectHistory.map(item => {
                        return (item.reasonArr = item.reasonList.map(obj => {
                            if (obj.number)
                                return (
                                    "数量:" +
                                    obj.number +
                                    ",原因:" +
                                    obj.reason +
                                    ";"
                                );
                        }));
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
.page-supplier-info {
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
</style>
