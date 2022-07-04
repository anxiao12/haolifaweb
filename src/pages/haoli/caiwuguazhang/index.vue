<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.purchaseOrderNo" @change="
            $refs.list.update(true)" placeholder="采购合同" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.demander" @change="
            $refs.list.update(true)" placeholder="采购方" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.supplierName" @change="
            $refs.list.update(true)" placeholder="供应商" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/standaccount/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>采购合同</th>
                    <th>采购方</th>
                    <th>供应商</th>
                    <th>交货日期</th>
                    <!-- <th>发货日期</th> -->
                    <th>总数量</th>
                    <th>检验合格数量</th>
                    <th>合同总金额</th>
                    <th>已付货款</th>
                    <th>状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.purchaseOrderNo }}</td>
                    <td>{{ item.demander }}</td>
                    <td>{{ item.supplierName }}</td>
                    <td>{{ item.deliveryTime}}</td>
                    <!-- <td>{{ item.}}</td> -->
                    <td>{{ item.totalCount}}</td>
                    <td>{{ item.qualifiedNumber}}</td>
                    <td>{{ item.totalPrice}}</td>
                    <td>{{ item.paidAccount}}</td>
                    <td>{{ statusArr[item.status]}}</td>
                    <!-- <td>{{ item.orderNo}}</td> -->
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="getInfo(item.id)">详 情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
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
                                <span class="b">6、送货时须附上相应的“机械性能报告”、“材质证明书”等相关证明；</span>
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
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
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
                demander: "",
                purchaseOrderNo: "",
                supplierName: ""
            },
            statusArr: [
                "",
                "待审批",
                "审批中",
                "采购中",
                "审批不通过",
                "采购完成"
            ],
            orderUrl: "",
            itemList: [],
            info: {},
            layer: false
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                demander: "",
                purchaseOrderNo: "",
                supplierName: ""
            };
            this.$refs.list.update(true);
        },
        getInfo(formId) {
            this.layer = true;
            // this.orderUrl = "/haolifa/export/purchaseOrder/" + formId;
            this.info.id = formId;
            this.$http
                .get(`/haolifa/finance/standaccount/info/${formId}`)
                .then(res => {
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
        close() {
            this.layer = false;
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
</style>
