<template>
    <div class="page-material-list">
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
            <data-list ref="list" :page-size="20" :param="filter" url="/haolifa/spray/forms" method="post">
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
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="sprayInfo(item)">查看</a>
                        <a href="javascript:;" v-if="item.inspectStatus !=2" style="margin-right: 3px" class="blue" @click="completeInspect(item)">| 质检完成</a>
                        <a href="javascript:;" v-if="item.inspectStatus !=2" style="margin-right: 3px" class="blue" @click="addSprayInspect(item)">| 添加质检记录</a>
                    </td>
                </template>
            </data-list>
        </div>

        <layer v-if="completeLayer" title="新增喷涂质检记录" width="70%" style>
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
                            <td style="border: none;" colspan="11" class="b" align="center">喷涂加工单详情</td>
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
                                <th>喷涂单号</th>
                                <th>零件名称</th>
                                <th>零件原图号</th>
                                <th>零件图号</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>处理意见</th>
                                <th>附件</th>
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

                <div class="flex">
                    <input-box v-model="inspectHistoryAdd.sprayNo" class="flex-item mr-20 ml-20" label="喷涂委托单号"></input-box>
                    <select-box class="flex-item mr-20" :list="nameList" v-model="inspectHistoryAdd.materialGraphName" label="零件名称"></select-box>
                    <select-box class="flex-item mr-20" :list="arrList" v-model="inspectHistoryAdd.busType" disabled label="类型"></select-box>
                </div>
                <div class="flex mt-15">
                    <select-box class="flex-item mr-20 ml-20" :list="tuhaoList" v-model="inspectHistoryAdd.originalGraphNo" label="原图号"></select-box>
                    <input-box v-model="inspectHistoryAdd.materialGraphNo" class="flex-item mr-20" label="加工后图号"></input-box>
                    <input-box v-model="inspectHistoryAdd.batchNumber" class="flex-item mr-20" label="批次号"></input-box>
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
                                <th>附件</th>
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
    name: "spray-add-list",
    components: { DataList },
    data() {
        return {
            items: [],
            completeLayer: false,
            layer: false,
            filter: {
                type: 1,
                status: -1
            },
            rowStatusList: [
                { status: 0, name: "待审批" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" }
            ],
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            busTypeList: ["未选择", "订单需求", "生产库存"],
            statusList: [
                { status: 0, name: "待审批" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" },
                { status: -1, name: "全部" }
            ],
            arrList: [
                { value: "0", text: "未选择" },
                { value: "1", text: "订单需求" },
                { value: "2", text: "生产库存" }
            ],
            inspectHistoryAdd: {},
            spray: {
                planner: "",
                sprayNo: "",
                createTime: "",
                items: []
            },
            nameList: [],
            tuhaoList: [],
            fileList: [],
            loading: false,
            inspectHistory: []
        };
    },
    methods: {
        completeInspect(item) {
            this.updateStatus(item.sprayNo, 2);
        },
        complete() {
            this.loading = true;
            delete this.inspectHistoryAdd.busType;
            delete this.inspectHistoryAdd.batchNumber;
            this.$http
                .post(`/haolifa/spray/inspect`, this.inspectHistoryAdd)
                .then(res => {
                    this.loading = false;
                    this.$toast("添加成功");
                    this.completeLayer = false;
                    this.$refs.list.update();
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        addSprayInspect(item) {
            this.inspectHistoryAdd = {
                sprayNo: item.sprayNo,
                originalGraphNo: item.materialGraphNo,
                busType: item.busType + "",
                // materialGraphNo: item.sprayedGraphNo,
                // batchNumber: item.batchNumber,
                materialGraphName: "",
                testNumber: 0,
                qualifiedNumber: 0,
                unqualifiedNumber: 0,
                handlingSuggestion: "",
                accessoryList: [],
                remark: "",
                reasonList: [
                    {
                        number: "",
                        reason: ""
                    }
                ]
            };
            this.fileList = [];
            this.$http
                .get(`/haolifa/spray/form/${item.sprayNo}`)
                .then(res => {
                    this.nameList = res.items.map(item => {
                        return {
                            text: item.materialClassifyName,
                            value: item.materialClassifyName
                        };
                    });
                    this.tuhaoList = res.items.map(item => {
                        return {
                            text: item.materialGraphNo,
                            value: item.materialGraphNo
                        };
                    });
                    this.inspectHistoryAdd.batchNumber =
                        res.items[0].batchNumber;
                    this.inspectHistoryAdd.materialGraphNo =
                        res.items[0].sprayedGraphNo;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.sprayInfo(item);
            this.layer = false;
            this.completeLayer = true;
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
        updateStatus(sprayNo, status) {
            this.$http
                .put(`/haolifa/spray/inspectStatus/${sprayNo}/${status}`)
                // .put(`/haolifa/spray/status/${sprayNo}/${status}`)
                .then(res => {
                    this.$refs.list.update();
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
            this.layer = true;
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
