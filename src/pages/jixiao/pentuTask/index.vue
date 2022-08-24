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
                <input type="text" class="flex-item" v-model="filter.sprayNo" @change="$refs.list.update(true)" placeholder="喷涂加工号" style="width: 200px;">
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <!-- <router-link to="/spray/add?sprayNo=">
                <btn class="b" flat color="#008eff">新增喷涂委托</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/spray/forms" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>喷涂加工单号</th>
                    <th>计划人</th>
                    <th>总数量</th>
                    <th>检验合格数量</th>
                    <th>原图号</th>
                    <th>加工后图号</th>
                    <th>批次号</th>
                    <th>类别</th>
                    <th>状态</th>
                    <th>质检状态</th>
                    <th>发起时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.sprayNo}}</td>
                    <td>{{item.planner}}</td>
                    <td>{{item.totalNumber}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.orignGraphNo}}</td>
                    <td>{{item.sprayedGraphNo}}</td>
                    <td>{{item.batchNumber}}</td>
                    <td>{{busTypeList[item.busType]}}</td>
                    <td>{{rowStatusList[item.status].name}}</td>
                    <td>{{inspectStatusList[item.inspectStatus]}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="updateTask(item.sprayNo)" style="margin-right: 3px;">任务分配 |</a>
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="sprayInfo(item)">查看</a>
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
                            <td style="width: 10%;"></td>
                        </tr>
                        <tr>
                            <td style="border: none;" colspan="11" class="b" align="center">喷涂加工单</td>
                        </tr>
                        <tr>
                            <th colspan="11">喷涂单号：{{spray.sprayNo}}</th>
                        </tr>
                        <tr>
                            <th colspan="5">计划人：{{spray.planner}}</th>
                            <td colspan="6">日 期：{{spray.createTime}}</td>
                        </tr>
                        <tr style="border:thin">
                            <td colspan="1" class="b">序号</td>
                            <td colspan="1" class="b">零件名称</td>
                            <td colspan="1" class="b">零件图号</td>
                            <td colspan="1" class="b">型号</td>
                            <td colspan="1" class="b">规格</td>
                            <td colspan="1" class="b">材质</td>
                            <td colspan="1" class="b">数量</td>
                            <td colspan="1" class="b">喷涂颜色</td>
                            <td colspan="1" class="b">特殊要求</td>
                            <td colspan="1" class="b">完成时间</td>
                            <td colspan="1" class="b">备注</td>
                        </tr>
                        <tr style="border:thin" v-for="(item,i) in spray.items" :key="i">
                            <td colspan="1">{{i+1}}</td>
                            <td colspan="1">{{item.materialName}}</td>
                            <td colspan="1">{{item.materialGraphNo}}</td>
                            <td colspan="1">{{item.model}}</td>
                            <td colspan="1">{{item.specifications}}</td>
                            <td colspan="1">{{item.material}}</td>
                            <td colspan="1">{{item.number}}</td>
                            <td colspan="1">{{item.sprayColor}}</td>
                            <td colspan="1">{{item.specialRequires}}</td>
                            <td colspan="1">{{item.completeTime}}</td>
                            <td colspan="1">{{item.remark}}</td>
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
                                <th>喷涂单号</th>
                                <th>零件名称</th>
                                <th>零件原图号</th>
                                <th>零件图号</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>处理意见</th>
                                <th>不合格现象描述</th>
                            </tr>
                            <tr v-for="(item, i) in inspectHistory" :key="i">
                                <td>{{item.sprayNo}}</td>
                                <td>{{item.materialGraphName}}</td>
                                <td>{{item.originalGraphNo}}</td>
                                <td>{{item.materialGraphNo}}</td>
                                <td>{{item.testNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.handlingSuggestion}}</td>
                                <td>{{item.remark}}</td>
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
    name: "spray-produce-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            filter: {
                status: "1",
                type: 0
            },
            rowStatusList: [
                { status: 0, name: "待加工" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" }
            ],
            busTypeList: ["未选择", "订单需求", "生产库存"],
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
            spray: {
                planner: "",
                sprayNo: "",
                createTime: "",
                items: []
            },
            layerTable: false,
            tableData: [],
            form: { payOrderUserRelationProcedureList: [] },
            saveLoading: false
        };
    },
    methods: {
        flush() {
            this.filter = {
                status: 1,
                type: 0
            };
            this.$refs.list.update(true);
        },
        downloadForm(item) {
            this.$http.get(`/haolifa/export/spray/excel/${item.sprayNo}`);
        },
        // 编辑
        editForm(item) {
            this.$router.push({
                path: `/spray/edit?`,
                query: { sprayNo: item.sprayNo }
            });
        },
        updateTask(orderNo) {
            this.layerTable = true;
            this.loading = true;
            this.tableData = [];
            this.form = { payOrderUserRelationProcedureList: [] };
            this.$http
                .get(
                    `/haolifa/pay-working-procedure/assignTask?type=2&orderNo=` +
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
            /* let flag = false;
            this.form.payOrderUserRelationProcedureList.map(item => {
                if (!item.userId) {
                    flag = true;
                }
            });
            if (flag) {
                this.$toast("请选择人员");
                return;
            } */
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
                    this.$toast(e.msg || e.message);
                });
        },
        // 删除
        deleteInfo(item) {
            this.$http
                .delete(`/haolifa/spray/form/${item.sprayNo}`)
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //开始加工
        machine(item) {
            if (item.outRoomStatus != 2) {
                this.$toast("该批零件还未出库，请及时办理出库手续！");
                return;
            }
            this.updateStatus(item.sprayNo, 1);
        },
        // 暂停加工
        stopMachine(item) {
            this.updateStatus(item.sprayNo, 4);
        },
        // 加工完成
        completeMachine(item) {
            this.$confirm({
                title: "加工完成确认",
                text: `您确定喷涂订单已加工完成？<br>${item.sprayNo}`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    if (item.qualifiedNumber < item.totalNumber) {
                        let count = item.totalNumber - item.qualifiedNumber;
                        this.$confirm({
                            title: "继续确认",
                            text:
                                "订单显示还有(" +
                                count +
                                ")个零件未完成，是否继续？",
                            color: "red",
                            btns: ["取消", "确认"],
                            yes: () => {
                                this.updateStatus(item.sprayNo, 3);
                            }
                        });
                    } else {
                        this.updateStatus(item.sprayNo, 3);
                    }
                }
            });
        },
        updateStatus(sprayNo, status) {
            this.$http
                .put(`/haolifa/spray/status/${sprayNo}/${status}`)
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        // 查询详情
        sprayInfo(item) {
            // 查询详情：
            this.$http
                .get(`/haolifa/spray/form/${item.sprayNo}`)
                .then(res => {
                    this.spray = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            // 质检记录列表；
            this.$http
                .get(`/haolifa/spray/inspect/list/${item.sprayNo}`)
                .then(res => {
                    this.inspectHistory = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.layer = true;
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
