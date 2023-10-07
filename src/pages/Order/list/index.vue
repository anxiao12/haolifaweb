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
                    @change="$refs.list.update(true);getOrderQty()"
                    placeholder="订单号"
                    style="width: 200px;"
                >
                订单状态：
                <select
                    v-model="filter.orderStatus"
                    class="f-14"
                    @change="$refs.list.update(true);getOrderQty()"
                >
                    <option value="-1">全部</option>
                    <option
                        v-for="item in newOrderStatusList"
                        :value="item.value"
                        v-bind:key="item.value"
                    >{{item.text}}</option>
                </select>
                发货状态：
                <select
                    v-model="filter.deliverStatus"
                    class="f-14"
                    @change="$refs.list.update(true);getOrderQty()"
                >
                    <option value="-1">全部</option>
                    <option value="0">待发货</option>
                    <option value="1">部分发货</option>
                    <option value="2">发货完成</option>
                </select>
                <i
                    class="icon"
                    style="margin-left: -20px;pointer-events:none;"
                >arrow_drop_down</i>
                开始时间:
                <el-date-picker
                    v-model="filter.startDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="$refs.list.update(true);getOrderQty()"
                    :editable="false"
                    placeholder="选择年月日"
                ></el-date-picker>结束时间:
                <el-date-picker
                    v-model="filter.endDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="$refs.list.update(true);getOrderQty()"
                    :editable="false"
                    placeholder="选择年月日"
                ></el-date-picker>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.demandName"
                    @change="$refs.list.update(true);getOrderQty()"
                    placeholder="需方"
                    style="width: 200px;"
                >
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-v-center tool-bar">
            <span
                class="f-16"
                style="margin-left: 10px;color:#008eff"
            >订单产品总数量:{{orderQty}}</span>
            <span
                class="f-16"
                style="margin-left: 10px;color:#008eff"
            >订单产品已发货数量:{{deliveryOrderQty}}</span>
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
                    <th>需方</th>
                    <!-- <th style="width:50px;">订单合同URL</th> -->
                    <th>类别</th>
                    <th>地区</th>
                    <th>发货日期</th>
                    <th>订单数量</th>
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
                    <td>{{item.demandName}}</td>
                    <!-- <td>
                        <a class="fixed-length" :href="item.orderContractExtendUrl" :title="item.orderContractExtendUrl">{{item.orderContractExtendUrl}}</a>
                    </td>-->
                    <td>{{showOrderType(item.isCheckMaterial)}}</td>
                    <td>{{item.location}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{item.deliveryDate}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{item.totalCount}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{deliverStatusList[item.deliverStatus].text}}</td>
                    <td :class="new Date(item.deliveryDate).getTime()<new Date().getTime() ?'cell-color':''">{{orderStatusList[item.orderStatus].text}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="approveProgress(item)"
                            v-if="item.orderStatus !=0"
                            style="margin-right: 3px;"
                        >审批进度|</a>
                        <!-- <a href="javascript:;" class="blue" @click="approveProgress(item)" v-if="item.orderStatus==1" style="margin-right: 3px;">审批进度|</a> -->
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="infoShow(item)"
                            style="margin-right: 3px;"
                        >详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            title="详情"
            width="80%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 6%;"></td>
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
                                colspan="17"
                                class="b"
                            >订单编号 : {{info.orderNo}}</td>
                        </tr>
                        <tr>
                            <!-- <td colspan="14" class="b">成品合同订单号 : {{info.orderContractNo}}</td> -->
                            <td
                                colspan="17"
                                class="b"
                            >发货日期 : {{info.deliveryDate}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="17"
                                class="b"
                            >订单状态 : {{ orderStatusList[info.orderStatus].text}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="17"
                                class="b"
                            >
                                订单合同:
                                <a
                                    :href="info.orderContractUrl"
                                    style="margin-right: 15px;"
                                >下载</a>
                                <a
                                    target="_blank"
                                    v-if="(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="info.orderContractUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ info.orderContractUrl"
                                >预览</a>
                                <a
                                    href="javascript:;"
                                    @click="getPreCheckMater(info.orderNo)"
                                    style="margin-left: 15px;"
                                >核料清单</a>
                            </td>
                            <!-- <td colspan="6" class="b">
                        订单备份合同:
                        <a :href="info.orderContractExtendUrl">下载</a>
                            </td>-->
                        </tr>
                        <tr>
                            <td
                                colspan="17"
                                class="b"
                                v-if="fileDetailList.length"
                            >订单附件:</td>
                            <td
                                colspan="17"
                                class="b"
                                v-else
                            >订单附件:无</td>
                        </tr>
                        <tr
                            v-for="(item,index) in fileDetailList"
                            :key="index"
                        >
                            <td
                                colspan="5"
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
                                colspan="8"
                                class="b"
                            >装配车间: {{info.assemblyShop}}</td>
                            <td
                                colspan="9"
                                class="b"
                            >装配小组: {{info.assemblyGroup}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="8"
                                class="b"
                            >采购反馈时间: {{info.purchaseFeedbackTime}}</td>
                            <td
                                colspan="9"
                                class="b"
                            >生产反馈时间: {{info.productionFeedbackTime}}</td>
                        </tr>
                        <!-- <tr>
                    <td colspan="6" class="b">工厂反馈完成时间: {{info.finishFeedbackTime}}</td>
                    <td colspan="6" class="b">反馈确认人: {{info.feedbackTimeConfirmUser}}</td>
                        </tr>-->
                        <tr>
                            <td
                                colspan="4"
                                class="b"
                            >技术清单:</td>
                            <td colspan="13">
                                <a
                                    v-if="info.orderTechnicalDetaileds.length"
                                    target="_blank"
                                    :href="'/haolifa/export/order-technical-detailed?orderNo='+info.orderNo"
                                >导出</a>
                                <a
                                    href="javascript:;"
                                    v-else
                                >无</a>
                            </td>
                        </tr>
                        <tr v-if="info.orderTechnicalDetaileds.length">
                            <td
                                colspan="1"
                                rowspan="2"
                            >序号</td>
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
                                colspan="5"
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
                            <td
                                colspan="1"
                                rowspan="2"
                            >备注</td>
                        </tr>
                        <tr v-if="info.orderTechnicalDetaileds.length">
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
                            <td
                                colspan="1"
                                rowspan="1"
                            >连接套</td>
                        </tr>
                        <tr
                            v-for="(val,index) in info.orderTechnicalDetaileds"
                            :key="index"
                        >
                            <td colspan="1">{{val.seqNo}}</td>
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
                        <tr>
                            <td
                                colspan="17"
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
                                colspan="2"
                                class="b"
                            >颜色</td>
                            <td
                                colspan="1"
                                class="b"
                            >产品数量</td>
                            <!-- <td colspan="1" class="b">单价</td> -->
                            <td
                                colspan="1"
                                class="b"
                            >总计价格</td>
                            <td
                                colspan="4"
                                class="b"
                            >材质说明</td>
                            <td
                                colspan="3"
                                class="b"
                            >产品备注</td>
                        </tr>
                        <tr
                            v-for="(item,index) in info.orderProductAssociates"
                            :key="index"
                        >
                            <td colspan="1">{{item.productNo}}</td>
                            <td colspan="2">{{item.productName}}</td>
                            <td colspan="1">{{item.productModel}}</td>
                            <td colspan="1">{{item.lable}}</td>
                            <td colspan="1">{{item.specifications}}</td>
                            <td colspan="2">{{item.productColor}}</td>
                            <td colspan="1">{{item.productNumber}}</td>
                            <!-- <td colspan="1">{{item.price}}</td> -->
                            <td colspan="1">{{item.totalPrice}}</td>
                            <td colspan="4">{{item.materialDescription}}</td>
                            <td colspan="3">{{item.productRemark}}</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="17"
                                class="b"
                            >审批附件:</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="6"
                                class="b"
                            >文件名称</td>
                            <td
                                colspan="7"
                                class="b"
                            >文件地址</td>
                            <td
                                colspan="4"
                                class="b"
                            >——</td>
                        </tr>
                        <tr
                            v-for="(accessory,index) in accessoryList"
                            :key="index"
                        >
                            <td colspan="6">{{accessory.fileName}}</td>
                            <td colspan="7">{{accessory.fileUrl}}</td>
                            <td colspan="4">
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
                                colspan="17"
                                class="b"
                            >审核信息</td>
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
                                colspan="5"
                                class="b"
                            >审核意见</td>
                            <td
                                colspan="4"
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
                            <td colspan="5">{{pro.auditInfo}}</td>
                            <td colspan="4">{{pro.auditTime}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="close"
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
                            <th colspan="3">物料图号</th>
                            <th colspan="2">型号</th>
                            <th>规格</th>
                            <!-- <th>单价</th> -->
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
                            <td colspan="3">{{item.materialGraphNo}}</td>
                            <td colspan="2">{{item.model}}</td>
                            <td>{{item.specifications}}</td>
                            <!-- <td>{{item.price}}</td> -->
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
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-orders-list",
    components: { DataList },
    data() {
        return {
            btnFlag: false,
            layer: false,
            loading: false,
            deliverStatusList: [
                { value: 0, text: "待发货" },
                { value: 1, text: "部分发货" },
                { value: 2, text: "发货完成" },
            ],
            orderQty: "",
            deliveryOrderQty: "",
            orderStatusList: [
                { value: 0, text: "创建" },
                { value: 1, text: "审批中" },
                { value: 2, text: "核料中" },
                { value: 3, text: "替换料审批中" },
                { value: 4, text: "核料完成" },
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
                { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
                { value: 10, text: "质检中" },
                { value: 11, text: "已入库" },
                { value: 12, text: "申请发货" },
                { value: 13, text: "发货完成" },
                { value: 14, text: "审核不通过" },
                { value: 15, text: "采购中" },
            ],
            newOrderStatusList: [
                { value: 0, text: "创建" },
                { value: 1, text: "审批中" },
                { value: 2, text: "核料中" },
                { value: 3, text: "替换料审批中" },
                { value: 4, text: "核料完成" },
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
                // { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
                // { value: 10, text: "质检中" },
                // { value: 11, text: "已入库" },
                // { value: 12, text: "申请发货" },
                // { value: 13, text: "发货完成" },
                { value: 14, text: "审核不通过" },
                { value: 15, text: "采购中" },
            ],
            filter: {
                orderNo: "",
                orderStatus: -1,
                deliverStatus: -1,
                startDate: "",
                endDate: "",
                demandName: "",
            },
            info: {},
            // orderStatusList: {},
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
                    guodupan: "",
                    jishuxinhao: "",
                },
            ],
            //核料清单列表
            preCheckMaterList: [],
            accessoryList: [],
            checkStatusList: [
                { value: 1, text: "成功" },
                { value: 2, text: "待采购" },
                { value: 3, text: "可替换" },
            ],
            fileDetailList: [],
            processList: [],
            statusList: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
        };
    },
    created() {
        if (this.$route.query.name) {
            this.filter.demandName = this.$route.query.name;
            this.$refs.list.update(true);
            this.getOrderQty();
        } else {
            this.getOrderQty();
        }
    },
    activated() {
        if (this.$route.query.name) {
            this.filter.demandName = this.$route.query.name;
            this.$refs.list.update(true);
            this.getOrderQty();
        } else {
            this.getOrderQty();
        }
        // this.getOrderStatusList();
    },
    // activated(){}
    methods: {
      showOrderType(type){
        if(type===0){
          return '不走核料'
        }else if(type === 1){
          return '走核料'
        }else{
          return '整机订单'
        }
      },
        flush() {
            this.filter = {
                orderNo: "",
                orderStatus: -1,
                deliverStatus: -1,
                startDate: "",
                endDate: "",
                demandName: "",
            };
            this.$refs.list.update(true);
            this.getOrderQty();
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
        getOrderStatusList() {
            this.$http.get("/haolifa/order-product/order-status-list").then((res) => {
                this.orderStatusList = res.map((item) => {
                    return { value: item.code, text: item.desc };
                });
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
        progress(item) {
            let id = "";
            this.$http
                .post("/haolifa/flowInstance/create", {
                    flowId: 1,
                    formId: item.id,
                    formType: 1,
                    formNo: item.orderNo,
                    summary: "生产订单审批",
                })
                .then((res) => {
                    id = res.instanceId;
                    // this.loading = false;
                    // this.$toast(`发起流程成功,流程ID: ${res.instanceId}`);
                    this.$http
                        .post("/haolifa/order-product/updateStatus", {
                            orderNo: item.orderNo,
                            status: 1,
                        })
                        .then((res) => {
                            this.loading = false;
                            this.$toast(`发起流程成功,流程ID: ${id}`);
                        });
                });
        },
        // 审批进度查看
        approveProgress(item) {
            this.$router.push(`/order/approveProgress?formNo=${item.orderNo}&formId=0`);
        },
        infoShow(item) {
            // this.$router.push(`/order/info?orderNo=${item.orderNo}`);
            this.layer = true;
            this.getInfo(item.orderNo);
            this.getAccessory(item.orderNo);
            this.getProcess(item);
            // this.getOrderStatusList();
            this.$http
                .get(`/haolifa/order-product/accessory?orderNo=${item.orderNo}`)
                .then((res) => {
                    this.fileDetailList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getProcess(item) {
            this.$http
                .get(`/haolifa/flowInstance/flow/progress/?formNo=${encodeURIComponent(item.orderNo)}`)
                .then((res) => {
                    this.processList = [];
                    res.map((item) => {
                        this.processList.push(item);
                        if (item.child.length > 0) {
                            item.child.map((it) => {
                                this.processList.push(it);
                            });
                        }
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInfo(orderNo) {
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${orderNo}`)
                .then((res) => {
                    this.info = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.accessoryList = [];
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下发货通知单吗？<br>${item.deliveryNo}`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/order-product/delete/${item.id}`)
                        .then((res) => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg);
                        });
                },
            });
        },
        getOrderQty() {
            this.$http
                .post("/haolifa/statistics/order-product", this.filter)
                .then((res) => {
                    this.orderQty = res.orderQty;
                    this.deliveryOrderQty = res.deliveryOrderQty;
                })
                .catch((e) => {
                    this.$toast(e.msg);
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

.metalwork-info {
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

.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
.cell-color {
    color: #de8a0c;
}
</style>
