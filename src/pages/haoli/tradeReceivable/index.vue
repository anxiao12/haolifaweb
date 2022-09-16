<template>
    <div class="page-invoice-list">
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
                    @change="
            $refs.list.update(true)"
                    placeholder="订单号"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.demandName"
                    @change="
            $refs.list.update(true)"
                    placeholder="需求方名称"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.supplyAgentName"
                    @change="
            $refs.list.update(true)"
                    placeholder="供应方责任人"
                    style="width: 200px;"
                >
                订单状态:
                <select
                    v-model="filter.orderStatus"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in orderStatusList"
                        :key="i"
                        :value="item.value"
                    >{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/receivable/list"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单编号</th>
                    <th>客户名称</th>
                    <!-- <th>供方单位</th> -->
                    <th>签订日期</th>
                    <!-- <th>责任人</th>
                    <th>归属部门</th>
                    <th>发货时间</th>
                    <th>付款方式</th>-->
                    <th>销售总量</th>
                    <!-- <th>合同总额</th>
                    <th>已付款额</th>
                    <th>已开发票</th>-->
                    <th>已发货数</th>
                    <th>已发货金额</th>
                    <!-- <th>合同状态</th> -->
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
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.orderNo }}</td>
                    <td>{{ item.demandName }}</td>
                    <!-- <td>{{ item.supplyName }}</td> -->
                    <td>{{ item.contractSignDate }}</td>
                    <!-- <td>{{ item. }}</td>
                    <td>{{ item. }}</td>
                    <td>{{ item. }}</td>
                    <td>{{ item. }}</td>-->
                    <td>{{ item.totalCount}}</td>
                    <!-- <td>{{ item.}}</td>
                    <td>{{ item.}}</td>
                    <td>{{ item.}}</td>-->
                    <td>{{ item.deliveredNumber}}</td>
                    <td>{{ item.signBoard}}</td>
                    <!-- <td>{{ item.orderNo}}</td> -->
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="detail(item)"
                        >详 情</a>
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
                            >订单状态 : {{ getOrderStatus(info.orderStatus) }}</td>
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
                            <td colspan="2">{{statusList[pro.auditResult]}}</td>
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
                    @click="close"
                >关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "khzb-list",
    components: { DataList },
    data() {
        return {
            filter: {
                contractSignDate: "",
                demandName: "",
                orderNo: "",
                orderStatus: "",
                supplyAgentName: "",
            },
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
            processList: [],
            accessoryList: [],
            info: {},
            fileDetailList: [],
            layer: false,
            statusList: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                contractSignDate: "",
                demandName: "",
                orderNo: "",
                orderStatus: "",
                supplyAgentName: "",
            };
            this.$refs.list.update(true);
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
        close() {
            this.layer = false;
            this.accessoryList = [];
        },
        getOrderStatus(value) {
            let str = "";
            this.orderStatusList.map((item) => {
                if (value == item.value) str = item.text;
            });
            return str;
        },
    },
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
</style>
