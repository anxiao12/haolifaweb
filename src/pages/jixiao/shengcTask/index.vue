<template>
    <div class="page-orders-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px;"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.orderNo"
                    @change="$refs.list.update(true)"
                    placeholder="订单号"
                    style="width: 200px;"
                >
                <select
                    v-model="filter.orderStatus"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <!--<option value="-1">全部</option>-->
                    <option
                        v-for="item in orderStatusList"
                        :value="item.value"
                        v-bind:key="item.value"
                    >{{item.text}}</option>
                </select>
                <i
                    class="icon"
                    style="margin-left: -20px;pointer-events:none;"
                >arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/order-product/pageInfo"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单编号</th>
                    <th style="width:50px;">订单合同URL</th>
                    <th>发货日期</th>
                    <th>订单数量</th>
                    <th>检验合格数量</th>
                    <th>发货状态</th>
                    <th>订单状态</th>
                    <th>创建时间</th>
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>
                        <a
                            class="fixed-length"
                            :href="item.orderContractExtendUrl"
                            :title="item.orderContractExtendUrl"
                        >{{item.orderContractExtendUrl}}</a>
                    </td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{item.deliveryDate}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{item.totalCount}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{item.qualifiedNumber}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{deliverStatusList[item.deliverStatus].text}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{orderStatusList[item.orderStatus-5].text}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="updateTask(item.orderNo)"
                            style="margin-right: 3px;"
                        >任务分配 |</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="getInfo(item.orderNo)"
                            style="margin-right: 3px;"
                        >详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            title="详情"
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 8%;"></td>
                            <td style="width: 8%;"></td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单编号 : {{info.orderNo}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >发货日期 : {{info.deliveryDate}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单状态 : {{orderStatusList[info.orderStatus-5].text}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >
                                订单合同:
                                <a
                                    :href="info.orderContractUrl"
                                    style="margin-right: 15px;"
                                >下载</a>
                                <a
                                    target="_blank"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ info.orderContractUrl"
                                >预览</a>
                                <a
                                    href="javascript:;"
                                    @click="getPreCheckMater(info.orderNo)"
                                    style="margin-left: 15px;"
                                >核料清单</a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                                v-if="fileDetailList.length"
                            >订单附件:</td>
                            <td
                                colspan="14"
                                class="b"
                                v-else
                            >订单附件:无</td>
                        </tr>
                        <tr
                            v-for="(item,index) in fileDetailList"
                            :key="index"
                        >
                            <td
                                colspan="3"
                                class="b"
                            >{{item.fileName}}</td>
                            <td
                                colspan="12"
                                class="b"
                            >
                                <a
                                    target="_blank"
                                    v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="item.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl"
                                >预览</a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >装配车间: {{info.assemblyShop}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >装配小组: {{info.assemblyGroup}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >采购反馈时间: {{info.purchaseFeedbackTime}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >生产反馈时间: {{info.productionFeedbackTime}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="2"
                            >产品名称</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >型号</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >规格</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >数量</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >上法兰标准</td>
                            <td
                                colspan="3"
                                rowspan="1"
                            >上法兰尺寸</td>
                            <td
                                colspan="4"
                                rowspan="1"
                            >出轴尺寸</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >静扭矩</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >执行器型号</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="1"
                            >连接孔</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >角度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >中心距</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴型式</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴长度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >轴图号</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >过渡盘</td>
                        </tr>
                        <tr
                            v-for="(val,index) in JSON.parse(info.technicalRequire)"
                            :key="index"
                        >
                            <td colspan="1">{{val.name}}</td>
                            <td colspan="1">{{val.xinhao}}</td>
                            <td colspan="1">{{val.guige}}</td>
                            <td colspan="1">{{val.num}}</td>
                            <td colspan="1">{{val.biaozhun}}</td>
                            <td colspan="1">{{val.lianjiek}}</td>
                            <td colspan="1">{{val.jiaodu}}</td>
                            <td colspan="1">{{val.zhongxinju}}</td>
                            <td colspan="1">{{val.xinshi}}</td>
                            <td colspan="1">{{val.length}}</td>
                            <td colspan="1">{{val.tuhao}}</td>
                            <td colspan="1">{{val.guodupan}}</td>
                            <td colspan="1">{{val.jinniuju}}</td>
                            <td colspan="1">{{val.jishuxinhao}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单产品列表</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                class="b"
                            >产品编号</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品名称</td>
                            <td
                                colspan="1"
                                class="b"
                            >型号</td>
                            <td
                                colspan="1"
                                class="b"
                            >标签属性</td>
                            <td
                                colspan="1"
                                class="b"
                            >规格</td>
                            <td
                                colspan="1"
                                class="b"
                            >颜色</td>
                            <td
                                colspan="1"
                                class="b"
                            >产品数量</td>
                            <td
                                colspan="1"
                                class="b"
                            >单价</td>
                            <td
                                colspan="1"
                                class="b"
                            >总计价格</td>
                            <td
                                colspan="2"
                                class="b"
                            >材质说明</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品备注</td>
                        </tr>
                        <tr
                            v-for="(item,index) in info.orderProductAssociates"
                            :key="'qq'+index"
                        >
                            <!-- <tr v-for="(item,index) in JSON.parse(info.technicalRequire)" :key="index"> -->
                            <td colspan="1">{{item.productNo}}</td>
                            <td colspan="2">{{item.productName}}</td>
                            <td colspan="1">{{item.productModel}}</td>
                            <td colspan="1">{{item.lable}}</td>
                            <td colspan="1">{{item.specifications}}</td>
                            <td colspan="1">{{item.productColor}}</td>
                            <td colspan="1">{{item.productNumber}}</td>
                            <td colspan="1">{{item.price}}</td>
                            <td colspan="1">{{item.totalPrice}}</td>
                            <td colspan="2">{{item.materialDescription}}</td>
                            <td colspan="2">{{item.productRemark}}</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="14"
                                class="b"
                            >审批附件:</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="6"
                                class="b"
                            >文件名称</td>
                            <td
                                colspan="6"
                                class="b"
                            >文件地址</td>
                            <td
                                colspan="2"
                                class="b"
                            >——</td>
                        </tr>
                        <tr
                            v-for="(accessory,index) in accessoryList"
                            :key="index"
                        >
                            <td colspan="6">{{accessory.fileName}}</td>
                            <td colspan="6">{{accessory.fileUrl}}</td>
                            <td colspan="2">
                                <a
                                    target="_blank"
                                    v-if="!(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$') "
                                    :href="accessory.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ accessory.fileUrl"
                                >预览</a>
                            </td>
                        </tr>

                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >审批信息</td>
                        </tr>
                        <tr>
                            <td
                                colspan="3"
                                class="b"
                            >流程节点</td>
                            <td
                                colspan="2"
                                class="b"
                            >角色</td>
                            <td
                                colspan="1"
                                class="b"
                            >审核人</td>
                            <td
                                colspan="2"
                                class="b"
                            >审核状态</td>
                            <td
                                colspan="4"
                                class="b"
                            >审核意见</td>
                            <td
                                colspan="2"
                                class="b"
                            >审核时间</td>
                        </tr>
                        <tr
                            v-for="pro in processList"
                            :key="pro.stepName"
                        >
                            <td colspan="3">{{pro.stepName}}</td>
                            <td colspan="2">{{pro.roleName}}</td>
                            <td colspan="1">{{pro.auditUserName}}</td>
                            <td colspan="2">{{statusList[pro.auditResult]}}</td>
                            <td colspan="4">{{pro.info}}</td>
                            <td colspan="2">{{pro.auditTime}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="closeLayer"
                >关闭</btn>
            </div>
        </layer>
        <layer
            v-if="btnFlag"
            style="z-index:101"
            title="核料清单详情"
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 8%;"></td>
                            <td style="width: 8%;"></td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >核料清单</td>
                        </tr>
                        <tr>
                            <th>物料名称</th>
                            <th colspan="2">物料图号</th>
                            <th colspan="2">型号</th>
                            <th>规格</th>
                            <th>单价</th>
                            <th>单位</th>
                            <th>需要数量</th>
                            <th>缺少数量</th>
                            <th>核料状态</th>
                            <th>是否替换</th>
                            <th>替换零件</th>
                            <th>备注</th>
                        </tr>
                        <tr
                            v-for="(item, i) in preCheckMaterList"
                            :key="i"
                        >
                            <td>{{item.materialName}}</td>
                            <td colspan="2">{{item.materialGraphNo}}</td>
                            <td colspan="2">{{item.model}}</td>
                            <td>{{item.specifications}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.unit}}</td>
                            <td>{{item.materialCount}}</td>
                            <td>{{item.lackMaterialCount}}</td>
                            <td>{{checkStatusList[item.checkStatus-1].text}}</td>
                            <td>{{item.checkStatus==3?'是':'否'}}</td>
                            <td>{{item.replaceMaterialGraphNo}}</td>
                            <td>{{item.remark}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="btnFlag = false"
                >关闭</btn>
            </div>
        </layer>
        <layer
            v-if="layerTable"
            title="任务分配"
            width="90%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <el-table-column
                        prop="orderNo"
                        label="订单号"
                    ></el-table-column>
                    <el-table-column
                        prop="postCapability"
                        label="岗位能力名称"
                    ></el-table-column>
                    <el-table-column
                        prop="postName"
                        label="岗位(工序)名称"
                    ></el-table-column>
                    <el-table-column
                        prop="postCode"
                        label="岗位(工序)代码"
                    ></el-table-column>
                    <el-table-column label="人员选择">
                        <template slot-scope="scope">
                            <el-select
                                size="mini"
                                multiple
                                v-model="form.payOrderUserRelationProcedureList[scope.row.number].userId"
                                clearable
                            >
                                <el-option
                                    v-for="(item,i) in scope.row.userList"
                                    :key="i"
                                    :label="item.userName"
                                    :value="item.userId"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="layer-btns">
                <el-button
                    class="mr-20"
                    size="mini"
                    :loading="saveLoading"
                    type="primary"
                    @click="saveSelect"
                >保存</el-button>
                <el-button
                    class="mr-20"
                    size="mini"
                    @click="layerTable=false"
                >关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "cjzr-scddlb",
    components: { DataList },
    data() {
        return {
            loading: false,
            deliverStatusList: [
                { value: 0, text: "待发货" },
                { value: 1, text: "部分发货" },
                { value: 2, text: "发货完成" },
            ],
            orderStatusList: [
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
                { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
            ],
            checkStatusList: [
                { value: 1, text: "成功" },
                { value: 2, text: "待采购" },
                { value: 3, text: "可替换" },
            ],
            filter: {
                orderNo: "",
                orderStatus: 7,
            },
            //核料清单列表
            preCheckMaterList: [],
            accessoryList: [],
            fileDetailList: [],
            btnFlag: false,
            layer: false,
            info: {},
            arr: [
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
                    jinniuju: "",
                    jishuxinhao: "",
                },
            ],
            processList: [],
            statusList: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
            layerTable: false,
            tableData: [],
            form: { payOrderUserRelationProcedureList: [] },
            saveLoading: false,
        };
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                orderStatus: 7,
            };
            this.$refs.list.update(true);
        },
        updateTask(orderNo) {
            this.layerTable = true;
            this.loading = true;
            this.tableData = [];
            this.form = { payOrderUserRelationProcedureList: [] };
            this.$http
                .get(`/haolifa/pay-working-procedure/assignTask?type=1&orderNo=` + orderNo)
                .then((res) => {
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
                            orderId: item.orderNo,
                        });
                    });
                })
                .catch((e) => {
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
                .then((res) => {
                    this.layerTable = false;
                    this.saveLoading = false;
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        closeLayer() {
            this.layer = false;
            this.accessoryList = [];
        },
        getAccessory(orderNo) {
            this.$http
                .get(`/haolifa/flowInstance/flow/accessoryInfo?formNo=${orderNo}&formId=0`)
                .then((res) => {
                    res.forEach((item) => {
                        if (item.fileUrl != "") {
                            this.accessoryList.push(item);
                        }
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        inspectHistorys(item) {
            this.$router.push(`/cjzr-scddlb/checked?orderNo=${item.orderNo}`);
        },
        // info(item) {
        //     this.$router.push(`/cjzr-scddlb/info?orderNo=${item.orderNo}`);
        // },
        getInfo(orderNo) {
            this.layer = true;
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${orderNo}`)
                .then((res) => {
                    this.info = res;
                    // this.info.technicalRequire = JSON.parse(
                    //     this.info.technicalRequire
                    // );
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.getAccessory(orderNo);
            this.$http
                .get(`/haolifa/order-product/accessory?orderNo=${orderNo}`)
                .then((res) => {
                    this.fileDetailList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.getProcess(orderNo);
        },
        getProcess(orderNo) {
            this.$http
                .get(`/haolifa/flowInstance/flow/progress/?formNo=${encodeURIComponent(orderNo)}`)
                .then((res) => {
                    this.processList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getOrderStatusList() {
            this.$http.get("/haolifa/order-product/order-status-list").then((res) => {
                for (let i in res) {
                    this.orderStatusList[res[i].code] = res[i].desc;
                }
            });
        },
        getPreCheckMater(orderNo) {
            this.btnFlag = true;
            //核料清单查询
            this.$http
                .get(`/haolifa/order-product/order-material?orderNo=${orderNo}`)
                .then((res) => {
                    this.preCheckMaterList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
    },
};
</script>

<style lang="less">
.page-orders-list {
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
}

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cell-color {
    color: #de8a0c;
}
</style>