<template>
    <div>
        <div class="flex-v-center tool-bar">
            <i class="icon icon-abs" @click="flush">autorenew</i>
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true)" placeholder="机加工单号" style="width: 200px;" />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.processedGraphNo"
                    @change="$refs.list.update(true)"
                    placeholder="加工后图号"
                    style="width: 200px;"
                />
                <input type="text" class="flex-item" v-model="filter.batchNumber" @change="$refs.list.update(true)" placeholder="批次号" style="width: 200px;" />
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;margin-right:10px;pointer-events:none;">arrow_drop_down</i>
                质检状态：
                <select v-model="filter.inspectStatus" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in inspectStatusArr" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/entrust/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>机加工单号</th>
                    <th>采购合同号</th>
                    <th>批次号</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <th>加工后图号</th>
                    <th>数量</th>
                    <th>检验合格数量</th>
                    <th>不合格数量</th>
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
                    <td>{{item.materialGraphName}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.processedGraphNo}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.unqualifiedNumber}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{rowStatusList[item.status-3].name}}</td>
                    <td>{{inspectStatusList[item.inspectStatus]}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="info(item)">查看</a>
                        <a href="javascript:;" v-if="item.inspectStatus != 2" style="margin-right: 3px" class="blue" @click="addInspectHistory(item)">添加质检记录</a>
                        <a href="javascript:;" v-if="item.inspectStatus != 2" style="margin-right: 3px" class="blue" @click="updateEntrustStatus(item)">质检完成</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="completeLayer" :title="'添加质检记录'" width="70%" style>
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14">
                        <tr>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="b">机加工单</td>
                        </tr>
                        <tr>
                            <th colspan="3">机加工单号：{{entrust.entrustNo}}</th>
                            <td colspan="3">发起日期：{{entrust.createTime}}</td>
                        </tr>
                        <tr>
                            <th colspan="3">采购合同号：{{entrust.purchaseNo}}</th>
                            <td colspan="3">批次号：{{entrust.batchNumber}}</td>
                        </tr>
                        <tr>
                            <td colspan="1" class="b">采购合同编号</td>
                            <td colspan="1" class="b">批次号</td>
                            <td colspan="1" class="b">物料名称</td>
                            <td colspan="1" class="b">物料图号</td>
                            <td colspan="1" class="b">加工后图号</td>
                            <td colspan="1" class="b">数量</td>
                        </tr>
                        <tr>
                            <td colspan="1">{{entrust.purchaseNo}}</td>
                            <td colspan="1">{{entrust.batchNumber}}</td>
                            <td colspan="1">{{entrust.materialGraphName}}</td>
                            <td colspan="1">{{entrust.materialGraphNo}}</td>
                            <td colspan="1">{{entrust.processedGraphNo}}</td>
                            <td colspan="1">{{entrust.number}}</td>
                        </tr>
                    </table>
                </div>
                <div class="form-content metalwork-info">
                    <table class="data-table">
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
                            <td colspan="10" class="b">已添加质检记录</td>
                        </tr>
                        <tr>
                            <th>质检单号</th>
                            <th>类别</th>
                            <th>物料名称</th>
                            <th>加工后图号</th>
                            <th>检测数量</th>
                            <th>合格数量</th>
                            <th>不合格数量</th>
                            <th>处理意见</th>
                            <th>不合格现象描述</th>
                            <th>附件</th>
                        </tr>
                        <tr v-for="(item, i) in inspectHistory" :key="i">
                            <td>{{item.inspectNo}}</td>
                            <td>{{item.type == 1?'采购零件':'机加工零件'}}</td>
                            <td>{{item.materialGraphName}}</td>
                            <td>{{item.materialGraphNo}}</td>
                            <td>{{item.testNumber}}</td>
                            <td>{{item.qualifiedNumber}}</td>
                            <td>{{item.unqualifiedNumber}}</td>
                            <td>{{item.handlingSuggestion}}</td>
                            <td>{{item.reasonArr.toString()}}</td>
                            <td>
                                <div v-for="(obj,i) in item.accessoryList" :key="i">
                                    <a target="_blank" :href="obj.fileUrl">{{obj.fileName}}</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="flex">
                    <input-box :disabled="true" v-model="inspectHistoryAdd.purchaseNo" class="flex-item mr-20 ml-20" label="采购合同号"></input-box>
                    <input-box :disabled="true" v-model="inspectHistoryAdd.batchNumber" class="flex-item mr-20" label="批次号"></input-box>
                </div>
                <div class="flex mt-15">
                    <input-box :disabled="true" class="flex-item mt-15 ml-20" v-model="inspectHistoryAdd.materialGraphNo" label="物料图号"></input-box>
                    <input-box :disabled="true" v-model="inspectHistoryAdd.materialName" class="flex-item mr-20 mt-15 ml-20" label="物料名称"></input-box>
                </div>
                <div class="flex mt-15">
                    <input-box v-model="inspectHistoryAdd.testNumber" class="flex-item mr-20 ml-20 mt-15" label="检测数量"></input-box>
                    <input-box v-model="inspectHistoryAdd.qualifiedNumber" class="flex-item mr-20 mt-15" label="合格数量"></input-box>
                    <input-box v-model="inspectHistoryAdd.handlingSuggestion" class="flex-item mr-20 ml-20 mt-15" label="处理意见"></input-box>
                </div>
                <div class="flex" v-for="(item,index) in inspectHistoryAdd.reasonList" :key="index">
                    <input-box v-model="item.number" class="flex-item mr-20 ml-20" label="不合格数量"></input-box>
                    <input-box v-model="item.reason" class="flex-item" label="不合格现象描述"></input-box>
                    <icon-btn small v-if="inspectHistoryAdd.reasonList.length > 1" @click="removeReason(index)">close</icon-btn>
                </div>
                <div style="padding-left:100px;">
                    <icon-btn bg small v-tooltip="'更多不合格数量及因'" @click="addReason">add</icon-btn>
                </div>
                <div class="flex">
                    <upload-box
                        class="ml-20 mb-10"
                        btnText="上传附件"
                        :fileList="fileList"
                        :onchange="uploadFile"
                        :multiple="true"
                        :onremove="removeFile"
                        style="width: 50%"
                    ></upload-box>
                </div>
                <div class="layer-btns">
                    <btn flat @click="completeLayer=false">取消</btn>
                    <el-button size="mini" :loading="loading" type="primary" @click="complete">保存</el-button>
                </div>
            </div>
        </layer>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14">
                        <tr>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                            <td style="width: 20%;"></td>
                        </tr>
                        <tr>
                            <td colspan="6" class="b">机加工单</td>
                        </tr>
                        <tr>
                            <th colspan="3">机加工单号：{{entrust.entrustNo}}</th>
                            <td colspan="3">发起日期：{{entrust.createTime}}</td>
                        </tr>
                        <tr>
                            <th colspan="3">采购合同号：{{entrust.purchaseNo}}</th>
                            <td colspan="3">批次号：{{entrust.batchNumber}}</td>
                        </tr>
                        <tr>
                            <td colspan="1" class="b">采购合同编号</td>
                            <td colspan="1" class="b">批次号</td>
                            <td colspan="1" class="b">物料名称</td>
                            <td colspan="1" class="b">物料图号</td>
                            <td colspan="1" class="b">加工后图号</td>
                            <td colspan="1" class="b">数量</td>
                        </tr>
                        <tr>
                            <td colspan="1">{{entrust.purchaseNo}}</td>
                            <td colspan="1">{{entrust.batchNumber}}</td>
                            <td colspan="1">{{entrust.materialGraphName}}</td>
                            <td colspan="1">{{entrust.materialGraphNo}}</td>
                            <td colspan="1">{{entrust.processedGraphNo}}</td>
                            <td colspan="1">{{entrust.number}}</td>
                        </tr>
                    </table>
                </div>
                <div class="form-content metalwork-info">
                    <table class="data-table">
                        <tr>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 11%;"></td>
                            <td style="width: 12%;"></td>
                        </tr>
                        <tr>
                            <td colspan="10" class="b">质检记录</td>
                        </tr>
                        <tr>
                            <th>质检单号</th>
                            <th>类别</th>
                            <th>物料名称</th>
                            <th>加工后图号</th>
                            <th>检测数量</th>
                            <th>合格数量</th>
                            <th>不合格数量</th>
                            <th>处理意见</th>
                            <th>不合格现象描述</th>
                            <th>附件</th>
                        </tr>
                        <tr v-for="(item, i) in inspectHistory" :key="i">
                            <td>{{item.inspectNo}}</td>
                            <td>{{item.type == 1?'采购零件':'机加工零件'}}</td>
                            <td>{{item.materialGraphName}}</td>
                            <td>{{item.materialGraphNo}}</td>
                            <td>{{item.testNumber}}</td>
                            <td>{{item.qualifiedNumber}}</td>
                            <td>{{item.unqualifiedNumber}}</td>
                            <td>{{item.handlingSuggestion}}</td>
                            <td>{{item.reasonArr.toString()}}</td>
                            <td>
                                <div v-for="(obj,i) in item.accessoryList" :key="i">
                                    <a target="_blank" :href="obj.fileUrl">{{obj.fileName}}</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="layerTable" title="任务分配" width="90%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-table :data="tableData" v-loading="tableLoading" tooltip-effect="dark" style="width: 100%">
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
import fileToBase64 from "@/utils/fileToBase64";

export default {
    name: "metalwork-list",
    components: { DataList },
    data() {
        return {
            completeLayer: false,
            inspectHistory: {
                handlingSuggestion: "",
                inspectNo: "",
                materialName: "",
                materialGraphNo: "",
                qualifiedNumber: 0,
                remark: "",
                testNumber: 0,
                unqualifiedNumber: 0,
                batchNumber: "",
                purchaseNo: "",
                supplierName: "",
                supplierNo: "",
                accessoryList: []
            },
            inspectHistoryAdd: {
                handlingSuggestion: "",
                inspectNo: "",
                materialName: "",
                materialGraphNo: "",
                qualifiedNumber: 0,
                remark: "",
                testNumber: 0,
                unqualifiedNumber: 0,
                batchNumber: "",
                purchaseNo: "",
                supplierName: "",
                supplierNo: "",
                reasonList: [
                    {
                        number: "",
                        reason: ""
                    }
                ]
            },
            filter: {
                type: 3,
                entrustNo: "",
                status: -1,
                processedGraphNo: "",
                inspectStatus: -1
            },
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            rowStatusList: [
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" },
                { status: 5, name: "审批不通过" },
                { status: 6, name: "质检完成" }
            ],
            statusList: [
                { status: -1, name: "全部" },
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" }
                // { status: 6, name: "质检完成" }
            ],
            inspectStatusArr: [
                { status: -1, name: "全部" },
                { status: 1, name: "质检中" },
                { status: 2, name: "质检完成" }
            ],
            loading: false,
            entrustNo: "",
            entrust: {},
            items: [],
            fileList: [],
            layer: false,
            saveLoading:false,
            layerTable : false,
            tableLoading:false,
            tableData:[],
            form: { payOrderUserRelationProcedureList: [] },

        };
    },
    methods: {
        flush() {
            this.filter = {
                type: 3,
                entrustNo: "",
                status: -1,
                processedGraphNo: "",
                inspectStatus: -1
            };
            this.$refs.list.update(true);
        },
        info(item) {
            // this.$router.push(
            //     `/inspect-metalwork/info?id=${item.id}&inspectNo=${
            //         item.entrustNo
            //     }`
            // );
            this.layer = true;
            this.entrustNo = item.entrustNo;
            this.getInfo();
            this.getInspectHistory();
        },
        getInfo() {
            this.entrust = {};
            this.$http
                .get(`/haolifa/entrust/info/${this.entrustNo}`)
                .then(res => {
                    this.entrust = res;
                    this.entrust.createTime = res.createTime.substring(0, 10);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInspectHistory() {
            this.$http
                .get(`/haolifa/material-inspect/history/list/${this.entrustNo}`)
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
        },
        complete() {
            let save = {
                handlingSuggestion: this.inspectHistoryAdd.handlingSuggestion,
                inspectNo: this.inspectHistoryAdd.inspectNo,
                materialGraphName: this.inspectHistoryAdd.materialName,
                materialGraphNo: this.inspectHistoryAdd.materialGraphNo,
                qualifiedNumber: this.inspectHistoryAdd.qualifiedNumber,
                remark: this.inspectHistoryAdd.remark,
                testNumber: this.inspectHistoryAdd.testNumber,
                unqualifiedNumber: this.inspectHistoryAdd.unqualifiedNumber,
                type: 2, // 零件送检
                batchNumber: this.inspectHistoryAdd.batchNumber,
                purchaseNo: this.inspectHistoryAdd.purchaseNo,
                supplierName: this.inspectHistoryAdd.supplierName,
                supplierNo: this.inspectHistoryAdd.supplierNo,
                accessoryList: this.inspectHistoryAdd.accessoryList,
                reasonList: this.inspectHistoryAdd.reasonList
            };
            this.loading = true;
            this.$http
                .post(`/haolifa/material-inspect/history/save`, save)
                .then(res => {
                    this.loading = false;
                    this.$toast("添加成功");
                    this.$refs.list.update(true);
                    this.completeLayer = false;
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        uploadFile(file, fileList) {
            this.loading = true;
            this.loadingMsg = "正在上传";
            fileToBase64(file.source).then(base64Str => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name
                    })
                    .then(res => {
                        this.inspectHistoryAdd.accessoryList.push({
                            fileName: file.name,
                            fileUrl: res
                        });
                        this.loading = false;
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        removeFile(fileList, i) {
            return new Promise((resolve, reject) => {
                this.inspectHistoryAdd.accessoryList.splice(index, 1);
                resolve();
            });
        },
        addInspectHistory(item) {

            //弹出分配任务
            this.updateTask(item.entrustNo);

            this.resetInspectHistoryAdd();
            this.fileList = [];
            this.inspectHistoryAdd.batchNumber = item.batchNumber;
            this.inspectHistoryAdd.purchaseNo = item.purchaseNo;
            this.inspectHistoryAdd.supplierName = item.supplierName;
            this.inspectHistoryAdd.supplierNo = item.supplierNo;
            this.inspectHistoryAdd.materialGraphNo = item.processedGraphNo;
            this.inspectHistoryAdd.materialName = item.materialGraphName;
            this.inspectHistoryAdd.inspectNo = item.entrustNo;
            this.inspectHistoryAdd.accessoryList = [];
            this.completeLayer = true;
            this.entrustNo = item.entrustNo;
            this.getInfo();
            this.getInspectHistory();
        },
        updateTask(orderNo) {
            this.layerTable = true;
            this.tableLoading = true;
            this.tableData = [];
            this.form = { payOrderUserRelationProcedureList: [] };
            this.$http
                .get(
                    `/haolifa/pay-working-procedure/assignTask?type=3&orderNo=` +
                        orderNo
                )
                .then(res => {
                    this.tableLoading = false;
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
                    this.tableLoading = false;
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
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        updateEntrustStatus(item) {
            this.$http
                .get(`/haolifa/entrust/updateInspectStatus/${item.entrustNo}/2`)
                // .get(`/haolifa/entrust/updateStatus/${item.entrustNo}/6`)
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        resetInspectHistoryAdd() {
            this.inspectHistoryAdd = {
                handlingSuggestion: "",
                inspectNo: "",
                materialName: "",
                materialGraphNo: "",
                qualifiedNumber: 0,
                remark: "",
                testNumber: 0,
                unqualifiedNumber: 0,
                batchNumber: "",
                purchaseNo: "",
                supplierName: "",
                supplierNo: "",
                accessoryList: [],
                reasonList: [
                    {
                        number: "",
                        reason: ""
                    }
                ]
            };
        },
        addReason() {
            this.inspectHistoryAdd.reasonList.push({ number: "0", reason: "" });
        },
        removeReason(index) {
            this.inspectHistoryAdd.reasonList.splice(index, 1);
        }
    }
};
</script>

<style lang="less">
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.flex-v-center {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>
