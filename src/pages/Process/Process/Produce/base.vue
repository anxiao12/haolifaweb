<template>
    <div class="p-p-base" v-if="data">
        <div class="node">
            <div class="flex-item mt-10 mb-10">
                <span class="f-20">基本信息</span>
                <btn @click="nuclear(data.formNo)" style="left: 74%;">核料清单查看</btn>
            </div>

            <div class="node">
                <div class="node-title mb-10">
                    <span class="b">流程描述：</span>
                    <span class="mr-15">{{data.summary}}</span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">生产订单号：</span>
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
                    <span>
                        <a class="a" flat style="color: #008eff" :href="orderUrl">下载生产订单</a>
                    </span>
                </div>
                <div class="node-title mb-10">
                    <span class="b">待审批附件预览：</span>
                    <span>
                        <a target="_blank" class="a" flat style="color: #008eff" :href="'http://view.officeapps.live.com/op/view.aspx?src='+ orderUrl">生产订单预览</a>
                    </span>
                </div>
            </div>
            <div v-if="data.dealStep">
                <div class="flex-item mt-10 mb-10">
                    <span class="f-20">审批栏</span>
                    <span class="f-10 ml-20">当前节点:{{data.dealStep.stepName}}</span>
                    <btn class="ml-10" v-if="dealStepId == 51" @click="addJishu">添加技术清单</btn>
                </div>
                <div class="node">
                    <div>
                        <div class="flex" v-if="dealStepId == 51">
                            <!-- <input-box v-model="updateInfo.technicalRequire" :multi-line="true" class="flex-item" label="技术清单说明" style="margin-right: 20px;"></input-box> -->
                            <table class="f-14 order-info">
                                <tr>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 400px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                </tr>
                                <tr>
                                    <td colspan="18" class="b">技术清单</td>
                                </tr>

                                <tr>
                                    <td colspan="1" rowspan="2">序号</td>
                                    <td colspan="1" rowspan="2">产品名称</td>
                                    <td colspan="1" rowspan="2">型号</td>
                                    <td colspan="1" rowspan="2">规格</td>
                                    <td colspan="1" rowspan="2">数量</td>
                                    <td colspan="1" rowspan="2">上法兰标准</td>
                                    <td colspan="3" rowspan="1">上法兰尺寸</td>
                                    <td colspan="5" rowspan="1">出轴尺寸</td>
                                    <td colspan="1" rowspan="2">静扭矩</td>
                                    <td colspan="1" rowspan="2">执行器型号</td>
                                    <td colspan="1" rowspan="2">备注</td>
                                    <td colspan="1" rowspan="2">操作</td>
                                </tr>
                                <tr>
                                    <td colspan="1" rowspan="1">连接孔</td>
                                    <td colspan="1" rowspan="1">角度</td>
                                    <td colspan="1" rowspan="1">中心距</td>
                                    <td colspan="1" rowspan="1">出轴型式</td>
                                    <td colspan="1" rowspan="1">出轴长度</td>
                                    <td colspan="1" rowspan="1">轴图号</td>
                                    <td colspan="1" rowspan="1">连接套</td>
                                    <td colspan="1" rowspan="1">过渡盘</td>
                                </tr>
                                <tr v-for="(val,index) in technicalRequire" :key="index">
                                    <td colspan="1">{{val.id}}</td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.productName"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.productModel"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.specifications"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.productNum"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.upperFlangeStandard	"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.connectingHole"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.angle"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.centerDistance"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.outputShaftType"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.outputShaftLength"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.axisDrawingNo"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.connectingSleeve"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.transitionPlate"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.staticTorque"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.actuatorModel"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <input-box type="text" v-model="val.remark"></input-box>
                                    </td>
                                    <td colspan="1">
                                        <el-button size="mini" icon="el-icon-circle-plus" type="primary" @click="addTechnicalRequire" circle></el-button>
                                        <el-button style="margin-left:0" size="mini" icon="el-icon-delete" type="danger" @click="delTechnicalRequire(index)" circle></el-button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div  v-if="dealStepId == 51" class="mt-20">
                        <el-button size="mini"   type="primary" @click="saveJishu" :loading="jishuLoading">保存技术清单</el-button>
                        </div>

                        <div class="flex" v-if="dealStepId > 51">
                            <!-- <input-box
                                :disabled="true"
                                v-model="updateInfo.technicalRequire"
                                :multi-line="true"
                                class="flex-item"
                                label="技术清单说明"
                                style="margin-right: 20px;"
                            ></input-box>-->
                            <table class="f-14 order-info">
                                <tr>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 400px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                    <td style="width: 100px;"></td>
                                </tr>
                                <tr>
                                    <td colspan="17" class="b">技术清单</td>
                                </tr>

                                <tr>
                                    <td colspan="1" rowspan="2">序号</td>
                                    <td colspan="1" rowspan="2">产品名称</td>
                                    <td colspan="1" rowspan="2">型号</td>
                                    <td colspan="1" rowspan="2">规格</td>
                                    <td colspan="1" rowspan="2">数量</td>
                                    <td colspan="1" rowspan="2">上法兰标准</td>
                                    <td colspan="3" rowspan="1">上法兰尺寸</td>
                                    <td colspan="5" rowspan="1">出轴尺寸</td>
                                    <td colspan="1" rowspan="2">静扭矩</td>
                                    <td colspan="1" rowspan="2">执行器型号</td>
                                    <td colspan="1" rowspan="2">备注</td>
                                </tr>
                                <tr>
                                    <td colspan="1" rowspan="1">连接孔</td>
                                    <td colspan="1" rowspan="1">角度</td>
                                    <td colspan="1" rowspan="1">中心距</td>
                                    <td colspan="1" rowspan="1">出轴型式</td>
                                    <td colspan="1" rowspan="1">出轴长度</td>
                                    <td colspan="1" rowspan="1">轴图号</td>
                                    <td colspan="1" rowspan="1">过渡盘</td>
                                    <td colspan="1" rowspan="1">连接套</td>
                                </tr>
                                <tr v-for="(val,index) in orderInfo.orderTechnicalDetaileds" :key="index">
                                    <td colspan="1">{{val.id}}</td>
                                    <td colspan="1">{{val.productName}}</td>
                                    <td colspan="1">{{val.productModel}}</td>
                                    <td colspan="1">{{val.specifications}}</td>
                                    <td colspan="1">{{val.productNum}}</td>
                                    <td colspan="1">{{val.upperFlangeStandard}}</td>
                                    <td colspan="1">{{val.connectingHole}}</td>
                                    <td colspan="1">{{val.angle}}</td>
                                    <td colspan="1">{{val.centerDistance}}</td>
                                    <td colspan="1">{{val.outputShaftType}}</td>
                                    <td colspan="1">{{val.outputShaftLength}}</td>
                                    <td colspan="1">{{val.axisDrawingNo}}</td>
                                    <td colspan="1">{{val.transitionPlate}}</td>
                                    <td colspan="1">{{val.connectingSleeve}}</td>
                                    <td colspan="1">{{val.staticTorque}}</td>
                                    <td colspan="1">{{val.actuatorModel}}</td>
                                    <td colspan="1">{{val.remark}}</td>
                                </tr>
                            </table>

                        </div>
                        <div class="flex" v-if="dealStepId == 56">
                            <input-box v-model="updateInfo.assemblyShop" class="flex-item" label="装配车间" style="margin-right: 20px;"></input-box>
                        </div>
                        <div class="flex" v-if="dealStepId == 57">
                            <input-box :disabled="true" v-model="updateInfo.assemblyShop" class="flex-item" label="装配车间" style="margin-right: 20px;"></input-box>
                            <input-box v-model="updateInfo.assemblyGroup" class="flex-item" label="装配小组" style="margin-right: 20px;"></input-box>
                        </div>
                        <div class="flex" v-if="dealStepId == 54">
                            <date-picker v-model="updateInfo.purchaseFeedbackTime" hint="必填" class="flex-item" label="采购完成时间" style="margin-right: 20px;"></date-picker>
                        </div>
                        <div class="flex" v-if="dealStepId == 55 && purchaseList.length>0">
                            <input-box :disabled="true" v-model="updateInfo.purchaseFeedbackTime" hint="必填" class="flex-item" label="采购完成时间" style="margin-right: 20px;"></input-box>
                        </div>
                        <div>
                            <div v-if="purchaseList.length>0">
                                <div class="flex-item mt-10 mb-10">
                                    <span class="f-20">待采购项</span>
                                </div>
                                <div class="flex-item scroll-y">
                                    <table class="data-table">
                                        <tr>
                                            <th>生产订单号</th>
                                            <th>零件名称</th>
                                            <th>零件图号</th>
                                            <th>采购数量</th>
                                        </tr>
                                        <tr v-for="(item, i) in purchaseList">
                                            <td>{{item.productOrderNo}}</td>
                                            <td>{{item.materialName}}</td>
                                            <td>{{item.materialGraphNo}}</td>
                                            <td>{{item.purchaseNumber}}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="flex">
                            <input-box v-model="handleStep.auditInfo" :multi-line="true" class="flex-item" label="审批意见" style="margin-right: 20px;"></input-box>
                        </div>
                        <div class="flex">
                            <upload-box btnText="附件上传" :fileList="fileList" :onchange="uploadFile" :onremove="removeFile" :multiple="multiple" style="width: 50%"></upload-box>
                        </div>
                        <div class="flex" style="margin-top:10px;">
                            <!-- <btn @click="handleStepM(1)">同意</btn> -->
                            <el-button size="mini" type="primary" :loading="loading" @click="handleStepM(1)">同意</el-button>
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
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item, i) in data.historyInfos" :key="i">
                            <td>{{item.historyId}}</td>
                            <td>{{item.instanceId}}</td>
                            <td>{{item.auditResult == 3?'发起':'审批'}}</td>
                            <td>{{item.stepName}}</td>
                            <td>{{item.auditUserName}}</td>
                            <td>{{auditResults[item.auditResult].name}}</td>
                            <td>{{item.auditInfo}}</td>
                            <td v-if="i<data.historyInfos.length-1">
                                <a target="_blank" v-for="(file,index) in item.accessories" :key="index" :href="file.fileUrl">{{file.fileName}}</a>
                                <br>
                            </td>
                            <td v-else-if="fileDetailList.length>0">
                                <a target="_blank" style="display:block" v-for="(f,index) in fileDetailList" :key="index" :href="f.fileUrl">{{f.fileName}}</a>
                                <br>
                            </td>
                            <td v-else>无</td>
                            <td>
                                <a href="javascript:;" v-if="item.accessories.length || fileDetailList.length" style="margin-right: 3px" class="blue" @click="removeAccessory(item.historyId)">删除</a>
                            </td>
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
            dealStepId: 0,
            updateInfo: {
                orderNo: "",
                assemblyGroup: null,
                assemblyShop: null,
                finishFeedbackTime: null,
                purchaseFeedbackTime: null,
                technicalRequire: ""
            },
            technicalRequire: [
                {
                    name: "",
                    xinhao: "",
                    guige: "",
                    num: "",
                    biaozhun: "",
                    lianjiek: "",
                    jiaodu: "",
                    zhongxinju: "",
                    xinshi: "",
                    length: "",
                    tuhao: "",
                    guodupan: "",
                    jinniuju: "",
                    jishuxinhao: ""
                }
            ],
            orderInfo: null,
            actionType: 0,
            purchaseList: [],
            fileList: [],
            fileName: "",
            multiple: true,
            fileDetailList: [],
            loading: false,
            jishuLoading: false
        };
    },
    activated() {
        this.backSteps = [];
        this.dealStepId = 0;
        this.updateInfo = {
            orderNo: "",
            assemblyGroup: null,
            assemblyShop: null,
            finishFeedbackTime: null,
            purchaseFeedbackTime: null,
            technicalRequire: ""
        };
        this.handleStep = {
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
        };
        this.technicalRequire = [
            {
                "actuatorModel": "",
                "angle": "",
                "axisDrawingNo": "",
                "centerDistance": "",
                "connectingHole": "",
                "connectingSleeve": "",
                "outputShaftLength": "",
                "outputShaftType": "",
                "productModel": "",
                "productName": "",
                "remark": "",
                "specifications": "",
                "staticTorque": "",
                "transitionPlate": "",
                "upperFlangeStandard": "",
                 productNum:""
            }
        ];
        this.orderInfo = null;
        this.actionType = 0;
        this.purchaseList = [];
        this.fileList = [];
        this.fileName = "";
        this.multiple = true;
        this.fileDetailList = [];
        this.loading = false;
        this.getData();
    },
    created() {
        this.getData();
    },
    methods: {
        addJishu(){
            this.$http
                .post(
                    `/haolifa/order-product/get-technical-detailed`,{
                        orderNo:this.data.formNo
                    }
                )
                .then(res => {
                    let list = res || [];
                    if(list.length){
                        this.technicalRequire = [];
                        list.forEach(item=>{
                            // let obj = {
                            //     "actuatorModel": "",
                            //     "angle": "",
                            //     "axisDrawingNo": "",
                            //     "centerDistance": "",
                            //     "connectingHole": "",
                            //     "connectingSleeve": "",
                            //     "outputShaftLength": "",
                            //     "outputShaftType": "",
                            //     "productModel": "",
                            //     "productName": "",
                            //     "remark": "",
                            //     "specifications": "",
                            //     "staticTorque": "",
                            //     "transitionPlate": "",
                            //     "upperFlangeStandard": "",
                            //     productNum:"",
                            //     orderNo:""
                            // }
                            // Object.keys(obj).forEach(key=>{
                            //     obj[key] = item[key]?item[key]:null;
                            // })
                            this.technicalRequire.push(item);

                        })
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        saveJishu(){
            // this.$toast("保存接口有问题，未做");
            // return;
            this.jishuLoading = true;
            this.$http
                .post(
                    `/haolifa/order-product/add-technical-detailed`,{
                        technicalDetailedRels:this.technicalRequire
                    }
                )
                .then(res => {
                    this.jishuLoading = false;
                    this.$toast("保存技术清单成功")

                }).catch(e=>{
                    this.jishuLoading = false;
                    this.$toast(e.msg || e.message);
                })
        },
        addTechnicalRequire() {
            this.technicalRequire.push({
                "actuatorModel": "",
                "angle": "",
                "axisDrawingNo": "",
                "centerDistance": "",
                "connectingHole": "",
                "connectingSleeve": "",
                "outputShaftLength": "",
                "outputShaftType": "",
                "productModel": "",
                "productName": "",
                "remark": "",
                "specifications": "",
                "staticTorque": "",
                "transitionPlate": "",
                "upperFlangeStandard": "",
                productNum:""
            });
        },
        delTechnicalRequire(index) {
            this.technicalRequire.splice(index, 1);
        },
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
                    this.data.historyInfos.accessory;
                    this.handleStep.id = res.instanceId;
                    if (res.dealStep) {
                        this.handleStep.stepId = res.dealStep.stepId;
                        this.dealStepId = res.dealStep.stepId;
                    }
                    //获取订单上传附件
                    this.$http
                        .get(
                            `/haolifa/order-product/accessory?orderNo=${
                                this.data.formNo
                            }`
                        )
                        .then(res => {
                            this.fileDetailList = res;
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                    // 获取订单详情
                    this.$http
                        .get(
                            `/haolifa/order-product/details?orderNo=${
                                this.data.formNo
                            }`
                        )
                        .then(res => {
                            this.orderUrl = res.orderContractUrl;
                            this.orderInfo = res;
                            this.updateInfo.orderNo = this.data.formNo;
                            // this.technicalRequire = JSON.parse(
                            //     this.orderInfo.technicalRequire
                            // );
                            this.technicalRequire =  this.orderInfo.orderTechnicalDetaileds;
                            if (
                                this.dealStepId == 52 ||
                                this.dealStepId == 53
                            ) {
                                // 总工 核料 看到技术清单
                                this.updateInfo.technicalRequire = this.orderInfo.technicalRequire;
                                this.technicalRequire = JSON.parse(
                                    this.updateInfo.technicalRequire
                                );
                                if (this.dealStepId == 53) {
                                    //库管核料
                                    if (res.orderStatus == "2") {
                                        // 核料中
                                        this.actionType = 1; // 去核料
                                    } else if (res.orderStatus == "3") {
                                        // 替换料审批中
                                        this.actionType = 2; // 提示不能操作。
                                    } else if (res.orderStatus == "4") {
                                        // 核料完成：
                                        this.actionType = 0;
                                        // 查看是否需要采购
                                        this.$http
                                            .get(
                                                `/haolifa/applyBuy/product/list?orderNo=${
                                                    this.data.formNo
                                                }`
                                            )
                                            .then(res => {
                                                res.length > 0
                                                    ? (this.handleStep.condition = false)
                                                    : true;
                                            });
                                    }
                                }
                            } else if (this.dealStepId == 57) {
                                this.updateInfo.assemblyShop = this.orderInfo.assemblyShop;
                            } else if (this.dealStepId == 54) {
                                this.$http
                                    .get(
                                        `/haolifa/applyBuy/product/list?orderNo=${
                                            this.data.formNo
                                        }`
                                    )
                                    .then(res => {
                                        this.purchaseList = JSON.parse(
                                            JSON.stringify(res)
                                        );
                                    });
                            } else if (this.dealStepId == 55) {
                                this.$http
                                    .get(
                                        `/haolifa/applyBuy/product/list?orderNo=${
                                            this.data.formNo
                                        }`
                                    )
                                    .then(res => {
                                        this.purchaseList = JSON.parse(
                                            JSON.stringify(res)
                                        );
                                    });
                                this.updateInfo.purchaseFeedbackTime = moment(
                                    res.purchaseFeedbackTime
                                ).format("YYYY-MM-DD");
                            }
                        });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        handleStepM(auditResult) {
            this.updateInfo.technicalRequire = JSON.stringify(
                this.technicalRequire
            );
            if (auditResult != 2) {
                if (this.actionType == 1) {
                    // 提示去核料
                    this.$confirm({
                        title: "核料",
                        text: "订单未核料，是否现在核料？",
                        color: "blue",
                        btns: ["稍后再说", "现在核料"],
                        yes: () => {
                            this.$store.commit("DELMENUTABS", "/produce");
                            this.$router.push(
                                `/nuclear-material?orderNo=${
                                    this.orderInfo.orderNo
                                }`
                            );
                        }
                    });
                    return;
                } else if (this.actionType == 2) {
                    // 提示 替换料审批中。
                    this.$confirm({
                        title: "审批",
                        text: "订单存在替换料审批，不能进行其它操作",
                        color: "blue",
                        btns: ["取消", "查看"],
                        yes: () => {
                            this.$store.commit("DELMENUTABS", "/produce");
                            this.$router.push(
                                `/nuclear-replace-form?orderNo=${
                                    this.orderInfo.orderNo
                                }`
                            );
                        }
                    });
                    return;
                }
            }
            if (auditResult == 1 && this.dealStepId == 54) {
                if (this.updateInfo.purchaseFeedbackTime == null) {
                    this.$toast("请填写采购完成日期");
                    return;
                }
            }
            this.handleStep.auditResult = auditResult;
            this.$http
                .post(`/haolifa/flowInstance/handleStep`, this.handleStep)
                .then(res => {
                    this.$toast("处理成功");
                    this.$store.commit("DELMENUTABS", "/produce");
                    this.$router.push("/");
                    this.handleStep.backStepId = null;
                    this.backStepLayer = false;
                    // this.getData();
                    let status = 1; // 同意,审批中
                    if (auditResult == 1) {
                        if (this.dealStepId == 51) {
                            // 技术员：技术清单
                            this.$http
                                .post(
                                    `/haolifa/order-product/updateInfo`,
                                    this.updateInfo
                                )
                                .then(res => {
                                    this.updateInfo.technicalRequire = "";
                                    // this.$store.commit("DELMENUTABS", "/produce");
                                    // this.$router.push("/")
                                });
                        } else if (this.dealStepId == 52) {
                            // 技术总工
                            if (this.orderInfo.isCheckMaterial == 1) {
                                status = 2;
                            }
                        } else if (this.dealStepId == 54) {
                            // 采购反馈
                            this.$http
                                .post(
                                    `/haolifa/applyBuy/updateStatusByOrderNo?arriveTime=${
                                        this.updateInfo.purchaseFeedbackTime
                                    }&orderNo=${this.updateInfo.orderNo}`
                                )
                                .then(res => {});
                            this.$http
                                .post(
                                    `/haolifa/order-product/updateInfo`,
                                    this.updateInfo
                                )
                                .then(res => {
                                    this.updateInfo.purchaseFeedbackTime = null;
                                });
                        } else if (this.dealStepId == 55) {
                            // 综合计划
                            if (this.orderInfo.isCheckMaterial == 1) {
                                status = 5;
                            }
                            this.$http
                                .post(
                                    `/haolifa/applyBuy/updateStatusByOrderNo/2?orderNo=${
                                        this.updateInfo.orderNo
                                    }`
                                )
                                .then(res => {});
                            this.$http
                                .post(
                                    `/haolifa/order-product/updateInfo`,
                                    this.updateInfo
                                )
                                .then(res => {
                                    this.updateInfo.finishFeedbackTime = null;
                                });
                        } else if (this.dealStepId == 56) {
                            // 生产调度
                            if (this.orderInfo.isCheckMaterial == 1) {
                                status = 6;
                            }
                            this.$http
                                .post(
                                    `/haolifa/order-product/updateInfo`,
                                    this.updateInfo
                                )
                                .then(res => {
                                    this.updateInfo.assemblyShop = null;
                                });
                        } else if (this.dealStepId == 57) {
                            // 车间主任
                            this.$http
                                .post(
                                    `/haolifa/order-product/updateInfo`,
                                    this.updateInfo
                                )
                                .then(res => {
                                    this.updateInfo.assemblyGroup = null;
                                });
                        }
                        if (this.dealStepId != 57) {
                            let updateStatus = {
                                orderNo: this.data.formNo,
                                status: status
                            };
                            this.$http.post(
                                `/haolifa/order-product/updateStatus`,
                                updateStatus
                            );
                        }
                    } else if (auditResult == 2) {
                        // 退回操作
                        if (this.handleStep.backStepId == 53) {
                            // 核料中
                            status = 4;
                        }
                        if (this.handleStep.backStepId == 56) {
                            if (this.orderInfo.isCheckMaterial == 1) {
                                // 待生产
                                status = 5;
                            }
                        }
                        if (this.handleStep.backStepId < 53) {
                            this.$http.post(
                                `/haolifa/order-product/release-material?orderNo=${
                                    this.data.formNo
                                }`
                            );
                        }
                        let updateStatus = {
                            orderNo: this.data.formNo,
                            status: status
                        };
                        this.$http.post(
                            `/haolifa/order-product/updateStatus`,
                            updateStatus
                        );
                    } else {
                        // 不通过
                        status = 14;
                        let updateStatus = {
                            orderNo: this.data.formNo,
                            status: status
                        };
                        this.$http.post(
                            `/haolifa/order-product/updateStatus`,
                            updateStatus
                        );
                        if (this.dealStepId == 55) {
                            // 释放料
                            this.$http.post(
                                `/haolifa/order-product/release-material?orderNo=${
                                    updateStatus.orderNo
                                }`
                            );
                            this.$http
                                .post(
                                    `/haolifa/applyBuy/updateStatusByOrderNo?orderNo=${
                                        this.updateInfo.orderNo
                                    }/4`
                                )
                                .then(res => {});
                        }
                        this.$store.commit("DELMENUTABS", "/produce");
                        this.$router.push("/");
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        nuclear(supplierNo) {
            this.$store.commit("DELMENUTABS", "/produce");
            this.$router.push(`/nuclear-audit-form?orderNo=${supplierNo}`);
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
                        // this.handleStep.accessorys[0].fileUrl = res;
                        // this.handleStep.accessorys[0].fileName = file.name;
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
                // this.handleStep.accessorys[0].fileUrl = res;
                // this.handleStep.accessorys[0].fileName = fileName;
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
        removeAccessory(historyId) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(
                            `/haolifa/flowInstance/remove-history-accessory/${historyId}`
                        )
                        .then(res => {
                            this.$toast("删除成功");
                            this.getData();
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
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
        word-break: break-all;
    }
}
</style>