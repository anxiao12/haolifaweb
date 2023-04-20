<template>
    <div class="page-orders-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <!-- <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.certificateNumber" @change="$refs.list.update(true);" placeholder="凭证号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.collectCompany" @change="$refs.list.update(true);" placeholder="收款单位" style="width: 200px;">
        <input type="text" class="flex-item" v-model="filter.payCompany" @change="$refs.list.update(true);" placeholder="付款单位" style="width: 200px;">-->
        <!-- 分解状态：
                <select v-model="filter.orderStatus" class="f-14" @change="$refs.list.update(true);">
                    <option value="">全部</option>
                    <option v-for="item in newOrderStatusList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
                发货状态：
                <select v-model="filter.deliverStatus" class="f-14" @change="$refs.list.update(true);getOrderQty()">
                    <option value="-1">全部</option>
                    <option value="0">待发货</option>
                    <option value="1">部分发货</option>
                    <option value="2">发货完成</option>
        </select>-->
        <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
        <!-- </div>
            <div class="flex-item"></div>
        </div>-->
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/finance/billContract/selectBizBillChildList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>合同编号</th>
                    <th>金额</th>
                    <th>分解人</th>
                    <th>财务审批状态</th>
                    <th>审核状态</th>
                    <th>备注</th>
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
                    <td>{{item.amount}}</td>
                    <td>{{item.bookKeeper}}</td>
                    <td>{{auditStatusArr[item.auditStatus]}}</td>
                    <td>{{item.auditStatusCN}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <!-- <a
                            href="javascript:;"
                            v-if="item.canAudit"
                            class="blue"
                            @click="edit(item)"
                            style="margin-right: 3px;"
                        >审核 |</a> -->
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="detail(item)"
                            style="margin-right: 3px;"
                        >详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="addLayer"
            title="审核"
            width="30%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <select-box
                        v-model="form.auditStatus"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="auditStatusList"
                        label="审核状态"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        label="备注"
                    ></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button
                    class="mr-20"
                    size="mini"
                    :loading="loading"
                    type="primary"
                    @click="save"
                >保存</el-button>
                <el-button
                    class="mr-20"
                    size="mini"
                    @click="addLayer=false"
                >关闭</el-button>
            </div>
        </layer>
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
                            >订单状态 : {{ orderStatusList[info.orderStatus].text }}</td>
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
                        <!-- <tr>
                    <td colspan="6" class="b">工厂反馈完成时间: {{info.finishFeedbackTime}}</td>
                    <td colspan="6" class="b">反馈确认人: {{info.feedbackTimeConfirmUser}}</td>
                        </tr>-->
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >技术清单:</td>
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
                                colspan="2"
                                class="b"
                            >材质说明</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品备注</td>
                        </tr>
                        <tr
                            v-for="(item,j) in info.orderProductAssociates"
                            :key="j"
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
                            <td colspan="2">{{statusObj[pro.auditResult]}}</td>
                            <td colspan="4">{{pro.auditInfo}}</td>
                            <td colspan="2">{{pro.auditTime}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="layer = false;accessoryList = [];"
                >关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "hkfenjie-list",
    components: { DataList },
    data() {
        return {
            filter: {
                billId: this.$route.query.id,
                billType: this.$route.query.billType,
                orderId: "",
                orderNo: "",
            },
            billTypeArr: ["", "现金日记账", "银行日记账", "其他货币日记账"],
            statusList: [],
            addLayer: false,
            form: {
                id: "",
                auditStatus: "",
                remark: "",
            },
            loading: false,
            layer: false,
            editLayer: false,
            detailList: [],
            auditStatusArr: ["未审批", "通过", "不通过"],
            auditStatusList: [
                { text: "通过", value: "1" },
                { text: "不通过", value: "2" },
            ],
            fileDetailList: [],
            processList: [],
            accessoryList: [],
            info: {},
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
            ],
            statusObj: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
        };
    },
    activated() {
        // this.filter.billId = this.$route.query.id;
        // this.filter.billType = this.$route.query.billType;
        this.filter = {
            billId: this.$route.query.id,
            billType: this.$route.query.billType,
            orderId: "",
            orderNo: "",
        };
        this.$refs.list.update(true);
        this.getPayType();
    },
    methods: {
        flush() {
            this.filter = {
                billId: this.$route.query.id,
                billType: this.$route.query.billType,
                orderId: "",
                orderNo: "",
            };
            this.$refs.list.update(true);
        },
        //付款类型
        getPayType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/PAYMENT_TYPE`)
                .then((res) => {
                    res.map((item) => {
                        this.statusList.push({
                            text: item.desc,
                            value: item.code,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPayName(value) {
            let str = "";
            this.statusList.map((item) => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        save() {
            this.$http
                .post("/haolifa/finance/billContract/auditContract", this.form)
                .then((res) => {
                    this.$toast("保存成功");
                    this.loading = false;
                    this.addLayer = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            this.addLayer = true;
            this.form.id = item.id;
            this.form.auditStatus = "1";
            this.form.remark = "";
        },
        getDetail(item) {
            this.$http
                .post("/haolifa/finance/billContract/selectBizBillChildList", {
                    billId: this.$route.query.id,
                    billType: item.billType,
                    orderId: item.id,
                    orderNo: item.orderNo,
                })
                .then((res) => {
                    this.detailList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        detail(item) {
            this.layer = true;
            this.getInfo(item.orderNo);
            this.getAccessory(item.orderNo);
            this.getProcess(item);
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