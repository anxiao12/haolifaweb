<template>
    <div>
        <div class="flex-v-center tool-bar">
            <i class="icon icon-abs" @click="flush">autorenew</i>
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true)" placeholder="机加工单号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.batchNumber" @change="$refs.list.update(true)" placeholder="批次号" style="width: 200px;">
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
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="inspectHistory.completeLayer" :title="'质检记录'" width="650px" style>
            <div class="flex">
                <input-box disabled="true" v-model="inspectHistory.purchaseNo" class="flex-item mr-20 ml-20" label="采购合同号"></input-box>
                <input-box disabled="true" v-model="inspectHistory.batchNumber" class="flex-item mr-20" label="批次号"></input-box>
            </div>
            <div class="flex mt-15">
                <input-box disabled="true" class="mt-15 ml-20" v-model="inspectHistory.materialGraphNo" label="物料图号"></input-box>
                <input-box disabled="true" v-model="inspectHistory.materialName" class="mr-20 mt-15 ml-20" label="物料名称"></input-box>
            </div>
            <div class="flex mt-15">
                <input-box v-model="inspectHistory.testNumber" class="flex-item mr-20 ml-20 mt-15" label="检测数量"></input-box>
                <input-box v-model="inspectHistory.unqualifiedNumber" class="flex-item mr-20 mt-15" label="不合格数量"></input-box>
                <input-box v-model="inspectHistory.qualifiedNumber" class="flex-item mr-20 mt-15" label="合格数量"></input-box>
            </div>
            <div class="flex mt-15">
                <input-box v-model="inspectHistory.handlingSuggestion" class="flex-item mr-20 ml-20 mt-15" label="处理意见"></input-box>
                <input-box v-model="inspectHistory.remark" class="flex-item mr-20 mt-15" label="不合格现象描述"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="inspectHistory.completeLayer=false">取消</btn>
                <btn flat color="#008eff" @click="complete()">保存</btn>
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
                            <td colspan="9" class="b">质检记录</td>
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
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "metalwork-list",
    components: { DataList },
    data() {
        return {
            inspectHistory: {
                completeLayer: false,
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
                supplierNo: ""
            },
            filter: {
                type: 3,
                entrustNo: "",
                status: -1,
                inspectStatus: -1
            },
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            rowStatusList: [
                { status: 3, name: "加工中" },
                { status: 4, name: "加工完成" },
                { status: 5, name: "审批不通过" }
                // { status: 6, name: "质检完成" }
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
            layer: false
        };
    },
    methods: {
        flush() {
            this.filter = {
                type: 3,
                entrustNo: "",
                status: -1,
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
                handlingSuggestion: this.inspectHistory.handlingSuggestion,
                inspectNo: this.inspectHistory.inspectNo,
                materialGraphName: this.inspectHistory.materialName,
                materialGraphNo: this.inspectHistory.materialGraphNo,
                qualifiedNumber: this.inspectHistory.qualifiedNumber,
                remark: this.inspectHistory.remark,
                testNumber: this.inspectHistory.testNumber,
                unqualifiedNumber: this.inspectHistory.unqualifiedNumber,
                type: 2, // 零件送检
                batchNumber: this.inspectHistory.batchNumber,
                purchaseNo: this.inspectHistory.purchaseNo,
                supplierName: this.inspectHistory.supplierName,
                supplierNo: this.inspectHistory.supplierNo
            };
            this.$http
                .post(`/haolifa/material-inspect/history/save`, save)
                .then(res => {
                    this.$toast("添加成功");
                    this.$refs.list.update(true);
                    this.inspectHistory.completeLayer = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        addInspectHistory(item) {
            this.inspectHistory.batchNumber = item.batchNumber;
            this.inspectHistory.purchaseNo = item.purchaseNo;
            this.inspectHistory.supplierName = item.supplierName;
            this.inspectHistory.supplierNo = item.supplierNo;
            this.inspectHistory.materialGraphNo = item.materialGraphNo;
            this.inspectHistory.materialName = item.materialGraphName;
            this.inspectHistory.inspectNo = item.entrustNo;
            this.inspectHistory.completeLayer = true;
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
select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}
</style>
