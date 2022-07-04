<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true)" placeholder="委托单号" style="width: 200px;">
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
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
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="detail(item)">详情</a>
                        <a href="javascript:;" v-if="item.status == 0 || item.status == 4" style="margin-right: 3px" class="blue" @click="machine(item)">| 开始加工</a>
                        <!-- <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="stopMachine(item)">| 暂停</a> -->
                        <a href="javascript:;" v-if="item.status == 1 || item.status == 2" style="margin-right: 3px" class="blue" @click="completeMachine(item)">| 加工完成</a>
                        <!-- <a :href="`/haolifa/export/spray/excel/${item.sprayNo}`" download style="margin-right: 3px" class="blue">下载委托单</a> -->
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="addLayer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.name" class="flex-item mr-20" label="产品名称"></input-box>
                    <input-box v-model="form.graphNo" class="flex-item mr-20" label="图号"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.specifications" class="flex-item mr-20" label="规格"></input-box>
                    <input-box v-model="form.model" class="flex-item mr-20" label="型号"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.qty" class="flex-item mr-20" label="数量"></input-box>
                    <select-box v-model="form.workType" class="flex-item mr-20" :list="workTypeList" label="委托工种类别"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="completeLayer" title="新增自控委托质检记录" width="70%" style>
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
                        <div class="flex-item" style="text-align: center;line-height: 24px;">已添加质检记录</div>
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
                <div class="b f-18 flex-v-center ml-20" style="margin-bottom: 20px;">
                    <div class="flex-item" style="text-align: center;line-height: 24px;">添加质检记录</div>
                </div>
                <div class="flex">
                    <input-box v-model="inspectHistoryAdd.no" class="flex-item mr-20 ml-20" label="喷涂委托单号"></input-box>
                    <input-box v-model="inspectHistoryAdd.materialGraphName" class="flex-item mr-20 ml-20" label="名称"></input-box>
                    <input-box v-model="inspectHistoryAdd.materialGraphNo" class="flex-item mr-20 ml-20" label="图号"></input-box>
                </div>
                <div class="flex mt-15">
                    <input-box v-model="inspectHistoryAdd.testNumber" class="flex-item mr-20 ml-20" label="检测数量"></input-box>
                    <input-box v-model="inspectHistoryAdd.qualifiedNumber" class="flex-item mr-20 ml-20" label="合格数量"></input-box>
                    <input-box v-model="inspectHistoryAdd.unqualifiedNumber" class="flex-item mr-20 ml-20" label="不合格数量"></input-box>
                </div>
                <div class="flex mt-15">
                    <input-box v-model="inspectHistoryAdd.handlingSuggestion" class="flex-item mr-20 ml-20" label="处理意见"></input-box>
                    <input-box v-model="inspectHistoryAdd.remark" class="flex-item mr-20 ml-20" label="备注"></input-box>
                </div>
                <div class="flex" v-for="(item,index) in inspectHistoryAdd.reasonList" :key="index">
                    <input-box v-model="item.number" class="flex-item mr-20 ml-20" label="不合格数量"></input-box>
                    <input-box v-model="item.reason" class="flex-item mr-20 ml-20" label="不合格现象描述"></input-box>
                    <icon-btn small v-if="inspectHistoryAdd.reasonList.length > 1" @click="removeReason(index)">close</icon-btn>
                </div>
                <div style="padding-left:100px;">
                    <icon-btn bg small v-tooltip="'更多不合格数量及因'" @click="addReason">add</icon-btn>
                </div>
                <div class="flex">
                    <upload-box class="ml-20 mb-10" btnText="上传附件" :fileList="fileList" :onchange="uploadFile" :multiple="true" :onremove="removeFile" style="width: 50%"></upload-box>
                </div>
                <div class="layer-btns">
                    <btn flat @click="completeLayer=false">取消</btn>
                    <el-button size="mini" :loading="loading" type="primary" @click="complete">保存</el-button>
                </div>
            </div>
        </layer>
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
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import fileToBase64 from "@/utils/fileToBase64";
export default {
    name: "auto-control-list",
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
            spray: {
                planner: "",
                sprayNo: "",
                createTime: "",
                items: []
            },
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
            addLayer: false,
            form: {
                graphNo: "",
                id: "",
                model: "",
                name: "",
                qty: 0,
                specifications: "",
                workType: ""
            },
            loading: false,
            fileList: [],
            completeLayer: false,
            inspectHistoryAdd: {
                accessoryList: [
                    {
                        fileName: "",
                        fileUrl: ""
                    }
                ],
                autoControlId: "",
                handlingSuggestion: "",
                materialGraphName: "",
                materialGraphNo: "",
                no: "",
                qualifiedNumber: 0,
                reasonList: [
                    {
                        number: 0,
                        reason: ""
                    }
                ],
                remark: "",
                testNumber: 0,
                unqualifiedNumber: 0
            }
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
        add() {
            this.addLayer = true;
        },
        edit(item) {
            this.addLayer = true;
            this.form = {
                graphNo: item.graphNo,
                id: item.id,
                model: item.model,
                name: item.name,
                qty: item.qty,
                specifications: item.specifications,
                workType: item.workType + ""
            };
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/auto-control-entrust/update"
                : "/haolifa/auto-control-entrust/add";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.addLayer = false;
            this.form = {
                graphNo: "",
                id: "",
                model: "",
                name: "",
                qty: 0,
                specifications: "",
                workType: ""
            };
        },
        addSprayInspect(item) {
            this.inspectHistoryAdd = {
                accessoryList: [
                    {
                        fileName: "",
                        fileUrl: ""
                    }
                ],
                autoControlId: item.id,
                handlingSuggestion: "",
                materialGraphName: item.name,
                materialGraphNo: item.graphNo,
                no: item.entrustNo,
                qualifiedNumber: 0,
                reasonList: [
                    {
                        number: 0,
                        reason: ""
                    }
                ],
                remark: "",
                testNumber: 0,
                unqualifiedNumber: 0
            };
            this.fileList = [];
            this.sprayInfo(item);
            this.completeLayer = true;
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
        detail(item) {
            this.sprayInfo(item);
            this.layer = true;
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
        },
        addReason() {
            this.inspectHistoryAdd.reasonList.push({ number: "0", reason: "" });
        },
        removeReason(index) {
            this.inspectHistoryAdd.reasonList.splice(index, 1);
        },
        complete() {
            this.loading = true;
            this.$http
                .post(
                    `/haolifa/auto-control-entrust/inspect`,
                    this.inspectHistoryAdd
                )
                .then(res => {
                    this.loading = false;
                    this.$toast("添加成功");
                    this.completeLayer = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        uploadFile(file, fileList) {
            this.loading = true;
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
        removeFile(fileList, index) {
            return new Promise((resolve, reject) => {
                this.inspectHistoryAdd.accessoryList.splice(index, 1);
                resolve();
            });
        },
        //开始加工
        machine(item) {
            this.updateStatus(item.id, 1);
        },
        // 暂停加工
        stopMachine(item) {
            this.updateStatus(item.id, 4);
        },
        // 加工完成
        completeMachine(item) {
            this.$confirm({
                title: "加工完成确认",
                text: `您确定喷涂订单已加工完成？<br>${item.entrustNo}`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    if (item.qualifiedNumber < item.qty) {
                        let count = item.qty - item.qualifiedNumber;
                        this.$confirm({
                            title: "继续确认",
                            text:
                                "订单显示还有(" +
                                count +
                                ")个零件未完成，是否继续？",
                            color: "red",
                            btns: ["取消", "确认"],
                            yes: () => {
                                this.updateStatus(item.id, 3);
                            }
                        });
                    } else {
                        this.updateStatus(item.id, 3);
                    }
                }
            });
        },
        updateStatus(id, status) {
            this.$http
                .put(`/haolifa/auto-control-entrust/status/${id}/${status}`)
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        del(item) {
            this.$confirm({
                title: "删除完成确认",
                text: `您确定删除该自控委托单？<br>${item.entrustNo}`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/auto-control-entrust/del/${item.id}`)
                        .then(res => {
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
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
