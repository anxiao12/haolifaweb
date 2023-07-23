<template>
    <div class="purchaseadd flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)" placeholder="机加工合同号" style="width: 200px;" />
                <input type="text" class="flex-item" v-model="filter.supplierName" @change="$refs.list.update(true)" placeholder="供方单位" style="width: 200px;" />
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">合同状态</option>
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <!-- <router-link to="/purchsemanage-entrust/add">
                <btn class="b" flat color="#008eff">新增机加工订单</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" method="get" :page-size="15" :param="filter" url="/haolifa/purchase-order/list/1">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>机加工合同号</th>
                    <th>供方单位</th>
                    <th>加工完成日期</th>
                    <th>订单总数量</th>
                    <th>订单状态</th>
                    <th>创建人</th>
                    <th>计划下达日期</th>
                    <th>计划完成时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
                    <td>{{item.purchaseOrderNo}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.deliveryTime}}</td>
                    <td>{{item.totalCount}}</td>
                    <td>{{statusList[item.status-1].name}}</td>
                    <td>{{item.createUserId}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.planCompleteTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="getInfo(item.id)">查看</a>
                        <!-- <a href="javascript:;" style="margin-right: 3px" v-if="item.status == 1" class="blue" @click="approve(item.purchaseOrderNo)">发起审批</a>
                        <a href="javascript:;" style="margin-right: 3px" v-if="item.status == 3" class="blue" @click="createInspect(item.id)">生成报检单</a>
                        <a href="javascript:;" style="margin-right: 3px" v-if="item.status == 1" class="blue" @click="updatePurchase(item.id)">编辑</a>
                        <a href="javascript:;" style="margin-right: 3px" v-if="item.status == 2" class="blue" @click="approveProgress(item)">审批进度</a>
                        <a href="javascript:;" v-if="item.status == 1 || item.status ==4" class="blue" @click="deletePurchase(item.purchaseOrderNo)">删除</a>
                        <a href="javascript:;" v-if="item.status == 3" class="blue" @click="completePurchase(item.purchaseOrderNo)">采购完成</a>-->
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="completeLayer" :title="'订单折损'" width="450px">
            <div class="flex">
                <input-box v-model="wreck.wreckAmount" class="flex-item mr-20" label="折损金额"></input-box>
                <input-box v-model="wreck.wreckReason" class="flex-item mr-20" label="折损原因"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="completeLayer=false">取消</btn>
                <btn flat color="#008eff" @click="complete()">保存</btn>
            </div>
        </layer>
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
                            <td colspan="6" class="b">机加工订单</td>
                            <td colspan="6" class="b">
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
                                <br />请于本月30日前将对账单快递至本公司采购部，逾期送单将延至次月对账；
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
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
// import obj2FormData from '@/utils/obj2FormData'
export default {
    name: "purchsemanage-entrust",
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
                orderNo: "",
                supplierName: "",
                status: 0,
                createUserId: 0
            },
            wreck: { orderNo: "", wreckAmount: 0, wreckReason: "" },
            completeLayer: false,
            confirmLayer: false,
            loading: false,
            info: {},
            itemList: [],
            orderUrl: "",
            layer: false
        };
    },
    created() {
        this.filter.createUserId = 0;
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                supplierName: "",
                status: 0,
                createUserId: 0
            };
            this.$refs.list.update(true);
        },
        // info: function(formId) {
        //     this.$router.push(`/purchsemanage-entrust/info?formId=${formId}`);
        // },
        getInfo(formId) {
            this.layer = true;
            // this.orderUrl = "/haolifa/export/entrustOrder/" + formId;
            this.info.id = formId;
            this.$http
                .get(`/haolifa/purchase-order/info/${formId}`)
                .then(res => {
                    this.info = res.order;
                    this.orderUrl = res.order.fileUrl;
                    this.itemList = res.items;
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
                    console.log("info", this.info);
                    console.log("itemList", this.itemList);
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        downloadOrder: function(id) {
            this.$http
                .get(`/haolifa/export/purchaseOrder/${id}`)
                .then(res => {})
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        createInspect: function(formId) {
            this.$http
                .get(`/haolifa/purchase-order/createInspect/${formId}`)
                .then(res => {
                    console.log("报检单号", res);
                    this.$confirm({
                        title: "完善报检单",
                        text: "现在去完善报检单？",
                        color: "blue",
                        btns: ["稍后再说", "现在完善"],
                        yes: () => {
                            this.$router.push(
                                `/applyBuy-material/edit?id=${res}`
                            );
                        }
                    });
                });
        },
        approveProgress(item) {
            this.$router.push(
                `/purchsemanage-entrust/approveProgress?formNo=${item.purchaseOrderNo}&formId=0`
            );
        },
        approve: function(orderNo) {
            this.$confirm({
                title: "发起审批",
                text: "确定发起审批？",
                color: "blue",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/purchase-order/approve/${orderNo}/1`)
                        .then(res => {
                            this.$toast("发起成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        updatePurchase: function(orderId) {
            this.$router.push(`/purchsemanage-entrust/add?formId=${orderId}`);
        },
        completePurchase: function(orderNo) {
            this.completeLayer = true;
            this.wreck.orderNo = orderNo;
        },
        complete: function() {
            this.$http
                .post("/haolifa/purchase-order/complete", this.wreck)
                .then(res => {
                    this.completeLayer = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        deletePurchase: function(purchaseOrderNo) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除该订单么？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(
                            `/haolifa/purchase-order/delete/${purchaseOrderNo}`
                        )
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg);
                        });
                }
            });
        }
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
</style>
