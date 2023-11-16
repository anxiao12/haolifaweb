<template>
    <div class="purchaseadd flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.purchaseOrderNo" @change="$refs.list.update(true)"
                    placeholder="合同编号" style="width: 200px;">
                <!-- <input type="text" class="flex-item" v-model="filter.productOrderNo" @change="$refs.list.update(true)"
                    placeholder="销售订单号" style="width: 200px;"> -->
                <input type="text" class="flex-item" v-model="filter.supplierName" @change="$refs.list.update(true)"
                    placeholder="供应商名称" style="width: 200px;">
                <!-- <input type="text" class="flex-item" v-model="filter.supplierNo" @change="$refs.list.update(true)"
                    placeholder="供应商编号" style="width: 200px;"> -->
                合同状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option value="">全部</option>
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{ item.name }}</option>
                </select>
                地区：
                <select v-model="filter.location" class="f-14" @change="$refs.list.update(true);">
                    <option value="">全部</option>
                    <option :value="item.value" v-for="item, i in locationList" :key="i">{{ item.text }}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>

        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" method="post" :page-size="15" :param="filter"
                url="/haolifa/wholeMachinePurchaseOrder/pageList">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>合同编号</th>
                    <th>合同总金额</th>
                    <th>地区</th>
                    <th>供方单位</th>
                    <th>已付款</th>
                    <th>采购完成日期</th>
                    <!-- <th>合同类型</th> -->
                    <th>订单状态</th>
                    <th>创建人</th>
                    <th>创建日期</th>
                    <th>创建者</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{ index }}</td>
                    <td>{{ item.purchaseOrderNo }}</td>
                    <td>{{ item.totalPrice }}</td>
                    <td>{{ item.locationName }}</td>
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.paidAccount }}</td>
                    <td>{{ item.deliveryTime }}</td>
                    <!-- <td>{{ item.orderType == 0 ? '零件采购' : '毛坯加工' }}</td> -->
                    <td>{{ statusList[item.status - 1].name }}</td>
                    <td>{{ item.createUserId }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.createUser }}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="getInfo(item.id)">查看</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="详情" name="1"></el-tab-pane>
                    <el-tab-pane label="付款记录" name="2"></el-tab-pane>
                </el-tabs>
                <div class="form-content metalwork-info" v-show="activeName == 2">
                    <div class="flex-item ml-20">
                        <a class="a" flat style="color: #008eff" @click="addPay()" href="javascript:;">新增付款记录</a>
                    </div>
                    <table class="f-14">
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
                            <td>{{ item.orderNo }}</td>
                            <td>{{ item.amount.toLocaleString() }}</td>
                            <td>{{ item.payTime }}</td>
                            <!-- <td v-if="item.orderType == 1">生产</td>
                    <td v-else>采购</td>-->
                            <td>{{ item.createUserId }}</td>
                            <td>{{ item.createTime }}</td>
                            <td>{{ item.updateTime }}</td>
                        </tr>
                        <tr v-if="!payList.length">
                            <td colspan="6" style="text-align: center;">无数据</td>
                        </tr>
                    </table>
                    <div v-show="addFlag">
                        <div class="b" style="margin: 20px 0 10px;">付款记录添加</div>
                        <div class="card flex" style="margin-top: 0;">
                            <div class="flex-item">
                                <div class="flex">
                                    <input-box v-model="order.orderNo" disabled hint="必填" class="flex-item mr-10"
                                        label="合同订单号"></input-box>
                                    <input-box v-model="order.amount" type="number" hint="必填" class="flex-item mr-10"
                                        label="总金额"></input-box>
                                    <date-picker v-model="order.payTime" hint="必填" class="mr-10" label="付款日期"
                                        style="margin-right: 20px;"></date-picker>
                                    <div class="flex-item" style="line-height:82px;">
                                        合同类型:
                                        <select type="number" style="width:60%" v-model="order.orderType" hint="必填"
                                            class="f-14 mr-10 select-form" label="合同类型">
                                            <!-- <option value="1">采购</option> -->
                                            <option value="3">整机采购</option>
                                            <!-- <option value="2">生产</option> -->
                                        </select>
                                        <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                                    </div>
                                    <!-- <input-box v-model='order.payTime' class='mr-10' label='付款日期'></input-box> -->
                                    <button class="btn btn-sm" @click="save()">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-content metalwork-info" v-show="activeName == 1">
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
                            <td colspan="6" class="b">采购订单</td>
                            <td colspan="6" class="b">
                                <a class="a" flat style="color: #008eff;margin-right:10px;" :href="orderUrl">合同下载</a>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="6">订单号：{{ info.purchaseOrderNo }}</th>
                            <td colspan="6">下单日期：{{ info.createTime }}</td>
                        </tr>
                        <tr>
                            <th colspan="6">供方：{{ info.supplierName }}</th>
                            <td colspan="6">需方：{{ info.demander }}</td>
                        </tr>
                        <tr>
                            <th colspan="6">供方联系人：{{ info.supplierLinkman }}</th>
                            <td colspan="6">需方联系人：{{ info.demanderLinkman }}</td>
                        </tr>
                        <tr>
                            <th colspan="6">供方联系人电话：{{ info.supplierPhone }}</th>
                            <td colspan="6">需方联系人电话：{{ info.demanderPhone }}</td>
                        </tr>
                        <tr>
                            <th colspan="6">供方地址：{{ info.supplierAddr }}</th>
                            <td colspan="6">需方地址：{{ info.demanderAddr }}</td>
                        </tr>
                        <tr>
                            <td colspan="12">兹向贵公司订购以下货品（如下表所列），请于24小时内签字回传！</td>
                        </tr>
                        <tr>
                            <td colspan="1" class="b">序号</td>
                            <td colspan="1" class="b">产品型号</td>
                            <td colspan="1" class="b">名称</td>
                            <td colspan="1" class="b">系列</td>
                            <td colspan="1" class="b">规格</td>
                            <td colspan="1" class="b">颜色</td>
                            <td colspan="1" class="b">数量</td>
                            <td colspan="1" class="b">单价</td>
                            <td colspan="1" class="b">分项金额</td>
                            <td colspan="1" class="b">材质</td>
                            <td colspan="1" class="b">备注</td>
                        </tr>
                        <tr v-for="(item, i) in itemList" :key="item.id">
                            <td colspan="1">{{ i }}</td>
                            <td colspan="1">{{ item.productModel }}</td>
                            <td colspan="1">{{ item.productName }}</td>
                            <td colspan="1">{{ item.series }}</td>
                            <td colspan="1">{{ item.specification }}</td>
                            <td colspan="1">{{ item.productColor }}</td>
                            <td colspan="1">{{ item.productNumber }}</td>
                            <td colspan="1">{{ item.unitPrice }}</td>
                            <td colspan="1">{{ item.itemAmount }}</td>
                            <td colspan="1">{{ item.materialQuality }}</td>
                            <td colspan="1">{{ item.remark }}</td>
                        </tr>
                        <tr>
                            <th colspan="4">合计</th>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1">{{ reduceTotal(itemList) }}</td>
                            <td colspan="1"></td>
                            <td colspan="1">{{ info.totalPrice }}</td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                        </tr>
                        <tr>
                            <th colspan="4">优惠后价格</th>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                            <td colspan="1"></td>
                        </tr>
                        <!-- <tr>
                            <th colspan="4">人民币大写</th>
                            <td colspan="6">{{info.totalPriceCN}}</td>
                        </tr> -->
                        <tr>
                            <td colspan="12">
                                <span class="b">1、交货日期</span>
                                {{ info.deliveryTime }}&nbsp;&nbsp;&nbsp;供方须严格按交期交货，如需调整日期，须及时知会本公司并经本公司批准，否则延误交货须扣除该批货款10%。
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
                                {{ info.payType }}
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
                            <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
                            </td>
                            <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
                            </td>
                            <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
                            </td>
                            <td colspan="3" style="text-align: center">年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer = false">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
// import obj2FormData from '@/utils/obj2FormData'
export default {
    name: "purchsemanage-purchase",
    components: { DataList },
    data() {
        return {
            natureList: ["国有", "三资", "集体", "联营", "私营"],
            statusList: [
                { status: 1, name: "待审批" },
                { status: 2, name: "审批中" },
                { status: 3, name: "采购中" },
                { status: 4, name: "审批不通过" },
                { status: 5, name: "采购完成" }
            ],
            filter: {
                purchaseOrderNo: '',
                status: "",
                supplierName: '',
                supplierNo: '',
                location: ""
            },
            wreck: { orderNo: "", wreckAmount: 0, wreckReason: "" },
            completeLayer: false,
            confirmLayer: false,
            loading: false,
            info: {},
            itemList: [],
            orderUrl: "",
            layer: false,
            numLayer: false,
            numList: [],
            locationList: [],
            payFlag: false,
            payList: [],
            addFlag: false,
            order: {
                amount: "",
                orderNo: "",
                payTime: "",
                orderType: "3"
            },
            activeName: "1"
        };
    },
    created() {
        if (this.$route.query.name) {
            this.filter.supplierName = this.$route.query.name
            this.$refs.list.update(true);
        } else {

            this.flush()
        }
        this.getLocation()
    },
    activated() {
        if (this.$route.query.name) {
            this.filter.supplierName = this.$route.query.name
            this.$refs.list.update(true);
        }
        this.getLocation()
    },
    methods: {
        getPriceTotal() { },
        getLocation() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/DATA_LOCATION`)
                .then(res => {
                    this.locationList = res.map(res => {
                        return {
                            text: res.desc,
                            value: res.code
                        }
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        flush() {
            this.filter = {
                purchaseOrderNo: '',
                status: '',
                supplierName: '',
                supplierNo: '',
                location: ""
            };
            this.$refs.list.update(true);
        },
        payClick(orderNo) {
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
        addPay() {
            this.order.orderNo = this.info.purchaseOrderNo
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
                        payTime: "",
                        orderType: "3"
                    };
                    this.addFlag = false;
                    this.payClick(this.info.purchaseOrderNo);
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        reduceTotal(itemList) {
            let totalNumber = itemList.reduce((pre, cur) => {
                return pre + cur.productNumber
            }, 0)
            return totalNumber

        },
        getInfo(formId) {
            this.activeName = "1";
            this.addFlag = false;

            this.$http
                .get(`/haolifa/wholeMachinePurchaseOrder/detail/${formId}`)
                .then(res => {
                    this.info = res;
                    this.itemList = res.itemList;
                    this.layer = true;
                    this.orderUrl = res.fileUrl;
                    this.payClick(this.info.purchaseOrderNo)
                    this.order = {
                        amount: "",
                        orderNo: this.info.purchaseOrderNo,
                        payTime: "",
                        orderType: "3"
                    }
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
    }
};
</script>

<style lang="less">
.purchaseadd {

    // height: 100%;
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
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
