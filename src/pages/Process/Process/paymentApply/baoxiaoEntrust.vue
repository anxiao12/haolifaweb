<template>
    <div class="process-prod flex-col">
        <div class="flex-item scroll-y">
            <div class="content">
                <div
                    class="p-p-base"
                    v-if="data"
                >
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
                                <span class="b">发 起 人：</span>
                                <span class="mr-15">{{data.initUserName}}</span>
                            </div>
                            <div class="node-title mb-10">
                                <span class="b">发起时间：</span>
                                <span>{{data.createTime}}</span>
                            </div>
                            <div class="node-title">
                                <span class="b">报销申请详情：</span>
                            </div>
                            <div
                                class="layer-text"
                                style="padding:0;"
                            >
                                <el-descriptions
                                    class="margin-top"
                                    :column="2"
                                    size="mini"
                                    border
                                >
                                    <el-descriptions-item>
                                        <template slot="label">报销金额</template>
                                        {{form.amount}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">户名</template>
                                        {{form.accountName}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">开户行</template>
                                        {{form.bankOfDeposit}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">卡号</template>
                                        {{form.cardNumber}}
                                    </el-descriptions-item>

                                    <el-descriptions-item>
                                        <template slot="label">报销日期</template>
                                        {{form.reimburseDate}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">备注摘要</template>
                                        {{form.remark}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">附件</template>
                                        <a
                                            :href="item.fileUrl"
                                            target="_blank"
                                            v-for="(item,i) in form.fileUrlList"
                                            :key="i"
                                        >{{item.fileName}}</a>
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">报销方式</template>
                                        {{form.reimburseType=="1"?"普通报销":"借款冲抵"}}
                                    </el-descriptions-item>
                                    <el-descriptions-item>
                                        <template slot="label">报销类别</template>
                                        {{form.type=="1"?"差旅报销":"费用报销"}}
                                    </el-descriptions-item>
                                    <el-descriptions-item v-if="form.reimburseType==2">
                                        <template slot="label">冲抵金额</template>
                                        {{form.offsetAmount}}
                                    </el-descriptions-item>
                                    <el-descriptions-item v-if="form.reimburseType==2">
                                        <template slot="label">借款</template>
                                        {{form.loanAmount}}
                                    </el-descriptions-item>
                                </el-descriptions>
                                <div v-if="form.type == 2">
                                    <el-table
                                        size="mini"
                                        border
                                        style="width: 100%"
                                        :data="form.reimburseCostDetailRSDTOList"
                                    >
                                        <el-table-column
                                            label="金额"
                                            prop="amount"
                                        ></el-table-column>
                                        <el-table-column
                                            label="单据张数"
                                            prop="docNum"
                                        ></el-table-column>
                                        <el-table-column
                                            label="费用类别"
                                            prop="subjectsTypeName"
                                        ></el-table-column>
                                        <el-table-column
                                            label="费用明细"
                                            prop="subjectCN"
                                        ></el-table-column>
                                        <el-table-column
                                            label="日期"
                                            prop="time"
                                        ></el-table-column>
                                        <el-table-column
                                            label="备注"
                                            prop="remark"
                                        ></el-table-column>
                                    </el-table>
                                </div>
                                <div v-if="form.type == 1">
                                    <el-table
                                        size="mini"
                                        border
                                        style="width: 100%"
                                        :data="form.reimburseTravelDetailRSDTOList"
                                    >
                                        <el-table-column
                                            label="金额"
                                            prop="projectAmount"
                                        ></el-table-column>
                                        <el-table-column
                                            label="单据张数"
                                            prop="projectDocNum"
                                        ></el-table-column>
                                        <el-table-column
                                            label="项目"
                                            prop="projectType"
                                        ></el-table-column>
                                        <el-table-column
                                            label="出发地"
                                            prop="depAddress"
                                        ></el-table-column>
                                        <el-table-column
                                            label="出发日期"
                                            prop="depTime"
                                        ></el-table-column>
                                        <el-table-column
                                            label="到达地"
                                            prop="arrAddress"
                                        ></el-table-column>
                                        <el-table-column
                                            label="到达日期"
                                            prop="arrTime"
                                        ></el-table-column>
                                        <el-table-column
                                            label="出差天数"
                                            prop="travelDays"
                                        ></el-table-column>
                                        <el-table-column
                                            label="出差补贴金额"
                                            prop="travelSubsidyAmount"
                                        ></el-table-column>
                                        <el-table-column
                                            label="交通工具"
                                            prop="vehicleCN"
                                        ></el-table-column>
                                        <el-table-column
                                            label="交通金额"
                                            prop="vehicleAmount"
                                        ></el-table-column>
                                        <el-table-column
                                            label="交通单据张数"
                                            prop="vehicleDocNum"
                                        ></el-table-column>
                                        <el-table-column
                                            label="备注"
                                            prop="remark"
                                        ></el-table-column>
                                    </el-table>
                                </div>
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
                                        <input-box
                                            v-model="handleStep.auditInfo"
                                            :multi-line="true"
                                            class="flex-item"
                                            label="审批意见"
                                            style="margin-right: 20px;"
                                        ></input-box>
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
                                    <div
                                        class="flex"
                                        style="margin-top:10px;"
                                    >
                                        <btn @click="handleStepM(1)">同意</btn>
                                        <btn
                                            class="ml-10"
                                            @click="handleStepM(0)"
                                        >不同意</btn>
                                        <btn
                                            class="ml-10"
                                            @click="backStepM()"
                                        >退回</btn>
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
                                            <a
                                                v-for="(file,index) in item.accessories"
                                                :key="index"
                                                :href="file.fileUrl"
                                            >{{file.fileName}}</a>
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
                                <div
                                    v-for="(item,i) in data.accessories"
                                    :key="i"
                                    style="margin-left:20px;margin-top:5px;"
                                >
                                    <div class="flex">
                                        <a
                                            :href="item.fileUrl"
                                            style="text-decoration:none ;out-line: none ;color:blue"
                                            target="_blank"
                                        >{{item.fileName}}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <layer
                        v-if="backStepLayer"
                        :title="'退回节点'"
                        width="450px"
                    >
                        <div class="node">
                            <div
                                class="node-item"
                                v-for="item in backSteps"
                            >
                                <radio-box
                                    v-model="handleStep.backStepId"
                                    :label="item.stepId"
                                ></radio-box>
                                {{item.stepName}}
                            </div>
                        </div>
                        <div class="layer-btns">
                            <btn
                                flat
                                @click="cancel()"
                            >取消</btn>
                            <btn
                                flat
                                color="#008eff"
                                @click="complete()"
                            >提交</btn>
                        </div>
                    </layer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import fileToBase64 from "../../../../utils/fileToBase64";
export default {
    name: "process-prod",
    data() {
        return {
            data: null,
            orderUrl: "/haolifa/export/purchaseOrder/",
            backStepLayer: false,
            auditResults: [
                { status: 0, name: "审核不通过" },
                { status: 1, name: "审核通过" },
                { status: 2, name: "退回" },
                { status: 3, name: "流程初始化" },
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
                accessorys: [],
            },
            backSteps: [],
            fileList: [],
            fileName: "",
            multiple: true,
            info: {},
            form: {},
        };
    },
    activated() {
        this.getData();
    },
    created() {},
    methods: {
        switchTab(path) {
            // this.$route.name = "purchaseNodes";
            this.$router.replace({ path, query: this.$route.query });
        },
        getData() {
            this.$http
                .get(`/haolifa/flowInstance/flow-history/${this.$route.query.instanceId}`)
                .then((res) => {
                    res.createTime = moment(res.createTime).format("YYYY-MM-DD HH:mm");
                    this.data = res;
                    this.handleStep.id = res.instanceId;
                    if (res.dealStep) {
                        this.handleStep.stepId = res.dealStep.stepId;
                    }
                    // this.orderUrl = this.orderUrl + res.formId;
                    this.$http.get(`/haolifa/finance/reimburseapply/info/${res.formId}`).then((result) => {
                        this.form = result;
                    });
                })
                .catch((e) => {
                    this.$toast(e.message || e.msg);
                });
        },
        handleStepM(auditResult) {
            this.handleStep.auditResult = auditResult;
            this.$http
                .post(`/haolifa/flowInstance/handleStep`, this.handleStep)
                .then((res) => {
                    this.$toast("处理成功");
                    this.handleStep.backStepId = null;
                    this.backStepLayer = false;
                    this.getData();
                    this.$store.commit("DELMENUTABS", "/jkfkEntrust");
                    this.$router.push("/");
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        uploadFile(file, fileList) {
            this.loading = true;
            this.loadingMsg = "正在上传";
            fileToBase64(file.source).then((base64Str) => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name,
                    })
                    .then((res) => {
                        this.handleStep.accessorys.push({
                            fileName: file.name,
                            fileUrl: res,
                        });
                        this.loading = false;
                    })
                    .catch((e) => {
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
                .then((res) => {
                    // console.log('backSteps', res);
                    if (res.length > 0) {
                        this.backSteps = res;
                        this.backStepLayer = true;
                    } else {
                        this.$toast("无可退回节点");
                    }
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        complete() {
            this.handleStepM(2);
        },
        cancel() {
            this.backStepLayer = false;
            this.handleStep.backStepId = null;
        },
    },
};
</script>

<style lang="less">
.process-prod {
    .content {
        max-width: 100%;
        margin: 0 auto;
    }
}
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
