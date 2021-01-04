<template>
    <div class="p-p-base" v-if="data">
        <div class="node">
            <div class="flex-item mt-10 mb-10">
                <span class="f-20">基本信息</span>
            </div>
            <div class="node">
                <div class="node-title mb-10">
                    <span class="b">流程描述：</span>
                    <span class="mr-15">{{data.summary}}</span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">采购单号：</span>
                    <span class="mr-15">{{data.formNo}}</span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">发 起 人：</span>
                    <span class="mr-15">{{data.initUserName}}</span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">发起时间：</span>
                    <span>{{data.createTime}}</span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">待审批附件：</span>
                    <span style="margin-right:20px;">
                        <a class="a" target="_blank" flat style="color: #008eff" :href="orderUrl">下载采购订单</a>
                    </span>
                    <span>
                        <a target="_blank" flat style="color: #008eff" v-if="(orderUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="orderUrl">采购订单预览</a>
                        <a
                            target="_blank"
                            flat
                            style="color: #008eff"
                            v-if="!(orderUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                            :href="'http://view.officeapps.live.com/op/view.aspx?src='+ orderUrl"
                        >预览</a>
                        <!-- <a class="a" target="_blank" flat style="color: #008eff" :href="orderUrl">预览采购订单</a> -->
                    </span>
                </div>
            </div>
            <div v-if="data.dealStep">
                <div class="flex-item mt-10 mb-10">
                    <span class="f-20">审批栏</span>
                    <span class="f-10 ml-20">当前节点:{{data.dealStep.stepName}}</span>
                </div>
                <div class="node">
                    <div>
                        <div class="flex">
                            <input-box v-model="handleStep.auditInfo" :multi-line="true" class="flex-item" label="审批意见" style="margin-right: 20px;"></input-box>
                        </div>
                        <div class="flex">
                            <upload-box
                                btnText="附件上传"
                                :fileList="fileList"
                                :multiple="multiple"
                                :onchange="uploadFile"
                                :onremove="removeFile"
                                style="width: 50%"
                            ></upload-box>
                        </div>
                        <div class="flex" style="margin-top:10px;">
                            <btn @click="handleStepM(1)">同意</btn>
                            <btn class="ml-10" @click="handleStepM(0)">不同意</btn>
                            <btn class="ml-10" @click="backStepM()">退回</btn>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="data.historyInfos">
                <div class="flex-item mt-10 mb-10">
                    <span class="f-20">审批历史</span>
                </div>
                <div class="flex-item scroll-y">
                    <table class="data-table">
                        <tr>
                            <th style="width: 60px;">ID</th>
                            <th>实例ID</th>
                            <th>节点类型</th>
                            <th>节点名称</th>
                            <th>审核人</th>
                            <th>审核结果</th>
                            <th>意见</th>
                            <th>审核附件</th>
                        </tr>
                        <tr v-for="(item, i) in data.historyInfos">
                            <td>{{item.historyId}}</td>
                            <td>{{item.instanceId}}</td>
                            <td>{{item.auditResult == 3?'发起':'审批'}}</td>
                            <td>{{item.stepName}}</td>
                            <td>{{item.auditUserName}}</td>
                            <td>{{auditResults[item.auditResult].name}}</td>
                            <td>{{item.auditInfo}}</td>
                            <td v-if="item.accessories != null">
                                <a v-for="(file,index) in item.accessories" :key="index" :href="file.fileUrl">{{file.fileName}}</a>
                            </td>
                            <td v-else>无</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-if="data.accessories">
                <div class="flex-item mt-10 mb-10">
                    <span class="f-20">审批附件</span>
                </div>
                <div class="flex-item">
                    <div v-for="(item,i) in data.accessories" :key="i" style="margin-left:20px;margin-top:5px;">
                        <div class="flex">
                            <a :href="item.fileUrl" style="text-decoration:none ;out-line: none ;color:blue" target="_blank">{{item.fileName}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <layer v-if="backStepLayer" :title="'退回节点'" width="450px">
            <div class="node">
                <div class="node-item" v-for="item in backSteps">
                    <radio-box v-model="handleStep.backStepId" :label="item.stepId"></radio-box>
                    {{item.stepName}}
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel()">取消</btn>
                <btn flat color="#008eff" @click="complete()">提交</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import moment from "moment";
import fileToBase64 from "../../../../utils/fileToBase64";

export default {
    name: "p-p-base",
    data() {
        return {
            data: null,
            orderUrl: "/haolifa/export/purchaseOrder/",
            backStepLayer: false,
            auditResults: [
                { status: 0, name: "审核不通过" },
                { status: 1, name: "审核通过" },
                { status: 2, name: "退回" },
                { status: 3, name: "流程初始化" }
            ],
            handleStep: {
                id: 0,
                stepId: 0,
                auditInfo: "",
                allotUserId: null,
                auditResult: 1,
                formId: 0,
                formType: 0,
                backStepId: null,
                condition: true,
                accessorys: []
            },
            backSteps: [],
            fileList: [],
            fileName: "",
            multiple: true
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http
                .get(
                    `/haolifa/flowInstance/flow-history/${
                        this.$route.query.instanceId
                    }`
                )
                .then(res => {
                    res.createTime = moment(res.createTime).format(
                        "YYYY-MM-DD HH:mm"
                    );
                    this.data = res;
                    this.handleStep.id = res.instanceId;
                    if (res.dealStep) {
                        this.handleStep.stepId = res.dealStep.stepId;
                    }
                    // this.orderUrl = this.orderUrl + res.formId;
                    this.$http.get(`/haolifa/purchase-order/info/${res.formId}`).then(result=>{
                        this.orderUrl = result.order.fileUrl;
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        handleStepM(auditResult) {
            this.handleStep.auditResult = auditResult;
            this.$http
                .post(`/haolifa/flowInstance/handleStep`, this.handleStep)
                .then(res => {
                    this.$toast("处理成功");
                    this.handleStep.backStepId = null;
                    this.backStepLayer = false;
                    this.getData();
                })
                .catch(e => {
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
                        this.handleStep.accessorys.push({
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
        removeFile() {
            return new Promise((resolve, reject) => {
                this.handleStep.accessorys.splice(i, 1);
                resolve();
            });
        },
        backStepM() {
            this.$http
                .get(`/haolifa/flowInstance/backSteps/${this.handleStep.id}`)
                .then(res => {
                    // console.log('backSteps', res);
                    if (res.length > 0) {
                        this.backSteps = res;
                        this.backStepLayer = true;
                    } else {
                        this.$toast("无可退回节点");
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        complete() {
            this.handleStepM(2);
        },
        cancel() {
            this.backStepLayer = false;
            this.handleStep.backStepId = null;
        }
    }
};
</script>

<style lang="less">
.p-p-base {
    padding: 20px;
    .node {
        border: 1px solid #e6e6e6;
        padding: 15px;
        border-radius: 8px;
    }
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
}
</style>
