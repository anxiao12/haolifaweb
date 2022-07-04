<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;" v-show="detailFlag">
                <icon-btn class="mr-15" @click="$store.commit('DELMENUTABS', '/contract/info');$router.back()">arrow_back</icon-btn>
                <div class="flex-item">合同详情</div>
                <div class="flex-item ml-20">
                    <a class="a" flat style="color: #008eff" @click="payClick(info.purchaseOrderNo)" href="javascript:;">付款记录</a>
                </div>
            </div>
            <!--<no-data v-if="!info.id" style="margin: 50px 0;"/>-->
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;" v-show="payFlag">
                <icon-btn class="mr-15" @click="back()">arrow_back</icon-btn>
                <div class="flex-item">付款记录</div>
                <div class="flex-item ml-20">
                    <a class="a" flat style="color: #008eff" @click="addPay()" href="javascript:;">新增付款记录</a>
                </div>
            </div>
            <table class="f-14" v-show="payFlag">
                <tr>
                    <td style="width: 16%;"></td>
                    <td style="width: 16%;"></td>
                    <td style="width: 16%;"></td>
                    <td style="width: 16%;"></td>
                    <td style="width: 16%;"></td>
                    <td style="width: 20%;"></td>
                </tr>
                <tr>
                    <th>订单号</th>
                    <th>总金额(￥)</th>
                    <th>打款日期</th>
                    <!-- <th>合同类型</th> -->
                    <th>录入人</th>
                    <th>创建日期</th>
                    <th>更新日期</th>
                </tr>
                <tr v-for="item in payList" :key="item.id">
                    <td>{{item.orderNo}}</td>
                    <td>{{item.amount.toLocaleString()}}</td>
                    <td>{{item.payTime}}</td>
                    <!-- <td v-if="item.orderType == 1">生产</td>
                    <td v-else>采购</td>-->
                    <td>{{item.createUserId}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.updateTime}}</td>
                </tr>
            </table>
            <div v-show="addFlag">
                <div class="b" style="margin: 20px 0 10px;">付款记录添加</div>
                <div class="card flex" style="margin-top: 0;">
                    <div class="flex-item">
                        <div class="flex">
                            <input-box v-model="order.orderNo" disabled hint="必填" class="flex-item mr-10" label="合同订单号"></input-box>
                            <input-box v-model="order.amount" type="number" hint="必填" class="flex-item mr-10" label="总金额"></input-box>
                            <date-picker v-model="order.payTime" hint="必填" class="mr-10" label="付款日期" style="margin-right: 20px;"></date-picker>
                            <div class="flex-item" style="line-height:82px;">
                                合同类型:
                                <select type="number" style="width:60%" v-model="order.orderType" hint="必填" class="f-14 mr-10 select-form" label="合同类型">
                                    <option value="1">采购</option>
                                    <option value="2">生产</option>
                                </select>
                                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                            </div>
                            <!-- <input-box v-model='order.payTime' class='mr-10' label='付款日期'></input-box> -->
                            <button class="btn btn-sm" @click="save()">保存</button>
                        </div>
                    </div>
                </div>
            </div>
            <table class="f-14" v-show="detailFlag">
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
                    <td colspan="10" class="b">采购订单</td>
                    <td colspan="2" class="b">
                        <a class="a" flat style="color: #008eff" :href="orderUrl">合同下载</a>
                    </td>
                </tr>
                <tr>
                    <th colspan="6">订单号：{{info.purchaseOrderNo}}</th>
                    <td colspan="6">下单日期：{{info.createTime}}</td>
                </tr>
                <tr>
                    <th colspan="6">供方：{{info.supplierName}}</th>
                    <td colspan="6">需方：{{info.demander}}</td>
                </tr>
                <tr>
                    <th colspan="6">联系人：{{info.supplierLinkman}}</th>
                    <td colspan="6">联系人：{{info.demanderLinkman}}</td>
                </tr>
                <tr>
                    <th colspan="6">联系电话：{{info.suppilerPhone}}</th>
                    <td colspan="6">联系电话：{{info.demanderPhone}}</td>
                </tr>
                <tr>
                    <th colspan="6">供方地址：{{info.suppilerAddr}}</th>
                    <td colspan="6">需方地址：{{info.demanderAddr}}</td>
                </tr>
                <tr>
                    <td colspan="12">兹向贵公司订购以下货品（如下表所列），请于24小时内签字回传！</td>
                </tr>
                <tr>
                    <td colspan="1" class="b">序号</td>
                    <td colspan="1" class="b">产品名称</td>
                    <td colspan="1" class="b">图号</td>
                    <td colspan="1" class="b">规格</td>
                    <td colspan="1" class="b">材质</td>
                    <td colspan="1" class="b">单位</td>
                    <td colspan="1" class="b">数量</td>
                    <td colspan="1" class="b">单重</td>
                    <td colspan="1" class="b">总重</td>
                    <td colspan="1" class="b">单价</td>
                    <td colspan="1" class="b">金额</td>
                    <td colspan="1" class="b">备注</td>
                </tr>
                <tr v-for="(item,i) in itemList" :key="item.id">
                    <td colspan="1">{{i}}</td>
                    <td colspan="1">{{item.materialName}}</td>
                    <td colspan="1">{{item.materialGraphNo}}</td>
                    <td colspan="1">{{item.specification}}</td>
                    <td colspan="1">{{item.material}}</td>
                    <td colspan="1">{{item.unit}}</td>
                    <td colspan="1">{{item.number}}</td>
                    <td colspan="1">{{item.unitWeight}}</td>
                    <td colspan="1">{{item.totalWeight}}</td>
                    <td colspan="1">{{item.unitPrice}}</td>
                    <td colspan="1">{{item.totalAmount}}</td>
                    <td colspan="1">{{item.remark}}</td>
                </tr>
                <tr>
                    <th colspan="6">总计</th>
                    <td colspan="1">{{info.orderNumber}}</td>
                    <td colspan="1"></td>
                    <td colspan="1">{{info.totalWeight}}</td>
                    <td colspan="1"></td>
                    <td colspan="1">{{info.totalPrice}}</td>
                    <td colspan="1"></td>
                </tr>
                <tr>
                    <th colspan="6">人民币大写</th>
                    <td colspan="6">{{info.totalPriceCN}}</td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">1、交货日期</span>
                        {{info.deliveryTime}}&nbsp;&nbsp;&nbsp;供方须严格按交期交货，如需调整日期，须及时知会本公司并经本公司批准，否则延误交货须扣除该批货款10%。
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">2、品质</span>供方所供产品，应完全依照本公司提供的图纸及相关标准制造，本公司将依照同一标准抽样检查，拒收未经技术管理中心确认的任何来货；
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">3、付款方式</span>
                        {{info.payType}}
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">4、付款条件</span>交货验收合格后，本公司于收到发票之日起60日内结清货款，每月25日以后交付货品拨归次月账项，
                        <br>请于本月30日前将对账单快递至本公司采购部，逾期送单将延至次月对账；
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">5、</span>送货单须规范注明订单编号、产品名称、规格等，同时要注明欠货数量及补货日期；
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">6、送货时须附上相应的“机械性能报告”、“材质证明书”等相关证明；</span>2018-12-29
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">7、</span>如因来料品质不符或因交期延误，致使需方蒙受损失，责任全部由供方承担；
                    </td>
                </tr>
                <tr>
                    <td colspan="12">
                        <span class="b">8、</span>以上计划价格仅供参考，如有疑义，则以合同金额为准。
                    </td>
                </tr>
                <tr>
                    <td colspan="3">供方确认:</td>
                    <td colspan="3">批准：</td>
                    <td colspan="3">审核：</td>
                    <td colspan="3">经办：</td>
                </tr>
                <tr>
                    <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
                    <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
                    <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
                    <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// import parseJson from '@/utils/parseJson'
export default {
    name: "purchsemanage-purchaseinfo",
    data() {
        return {
            loading: false,
            info: {},
            itemList: [],
            orderUrl: "",
            detailFlag: true,
            payFlag: false,
            addFlag: false,
            payList: {},
            order: {
                amount: "",
                orderNo: "",
                payTime: "",
                orderType: 1
            }
        };
    },
    activated() {
        this.loading = false;
        this.info = {};
        this.itemList = [];
        this.orderUrl = "";
        this.detailFlag = true;
        this.payFlag = false;
        this.addFlag = false;
        this.payList = {};
        this.order = {
            amount: "",
            orderNo: "",
            payTime: "",
            orderType: 1
        };
        this.getInfo();
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            let { formId } = this.$route.query;
            this.info.id = formId;
            this.$http
                .get(`/haolifa/purchase-order/info/${formId}`)
                .then(res => {
                    this.order.orderNo = res.order.purchaseOrderNo;
                    this.info = res.order;
                    this.itemList = res.items;
                    this.orderUrl = res.order.fileUrl;
                    this.info.operateTime = res.order.operateTime.substring(
                        0,
                        10
                    );
                    this.info.confirmTime = res.order.confirmTime.substring(
                        0,
                        10
                    );
                    this.info.createTime = res.order.createTime.substring(
                        0,
                        10
                    );
                    this.info.deliveryTime = res.order.deliveryTime.substring(
                        0,
                        10
                    );
                    this.info.updateTime = res.order.updateTime.substring(
                        0,
                        10
                    );
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        payClick(orderNo) {
            this.detailFlag = false;
            this.payFlag = true;
            this.$http
                .get(`/haolifa/payment/list?orderNo=${orderNo}`)
                .then(res => {
                    this.payList = res;
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        back() {
            this.detailFlag = true;
            this.payFlag = false;
            this.addFlag = false;
        },
        addPay() {
            this.detailFlag = false;
            this.addFlag = true;
        },
        save() {
            if (!this.order.orderNo) {
                this.$toast("请填写合同订单号");
                return;
            }
            if (!this.order.amount) {
                this.$toast("请填写总金额");
                return;
            }
            if (!this.order.payTime) {
                this.$toast("请选择付款日期");
                return;
            }
            this.order.orderType = parseInt(this.order.orderType);
            this.$http
                .post("/haolifa/payment/save", this.order)
                .then(res => {
                    this.$toast("提交成功");
                    this.order = {
                        amount: "",
                        orderNo: this.info.purchaseOrderNo,
                        payTime: ""
                    };
                    this.addFlag = false;
                    this.payClick(this.info.purchaseOrderNo);
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        downloadOrder: function(id) {
            this.$http
                .get(`/haolifa/export/purchaseOrder/${id}`)
                .then(res => {})
                .catch(e => {
                    this.$toast(e.msg);
                });
        }
    }
};
</script>

<style lang="less">
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
