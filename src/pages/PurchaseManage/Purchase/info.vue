<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">订单详情</div>
                <div class="flex-item ml-20">
                    <a class="a" flat style="color: #008eff" :href="orderUrl">合同下载</a>
                </div>
            </div>
            <!--<no-data v-if="!info.id" style="margin: 50px 0;"/>-->
            <table class="f-14" >
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
                    <td colspan="12" class="b">采购订单</td>
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
                    <td colspan="12"><span class="b">1、交货日期</span>{{info.deliveryTime}}&nbsp;&nbsp;&nbsp;供方须严格按交期交货，如需调整日期，须及时知会本公司并经本公司批准，否则延误交货须扣除该批货款10%。</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">2、品质</span>供方所供产品，应完全依照本公司提供的图纸及相关标准制造，本公司将依照同一标准抽样检查，拒收未经技术管理中心确认的任何来货；</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">3、付款方式</span>{{info.payType}}</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">4、付款条件</span>交货验收合格后，本公司于收到发票之日起60日内结清货款，每月25日以后交付货品拨归次月账项，<br/>请于本月30日前将对账单快递至本公司采购部，逾期送单将延至次月对账；</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">5、</span>送货单须规范注明订单编号、产品名称、规格等，同时要注明欠货数量及补货日期；</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">6、送货时须附上相应的“机械性能报告”、“材质证明书”等相关证明；</span>2018-12-29</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">7、</span>如因来料品质不符或因交期延误，致使需方蒙受损失，责任全部由供方承担；</td>
                </tr>
                <tr>
                    <td colspan="12"><span class="b">8、</span>以上计划价格仅供参考，如有疑义，则以合同金额为准。</td>
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
        name: 'purchsemanage-purchaseinfo',
        data () {
            return {
                loading: false,
                info: {},
                itemList:[],
                orderUrl:''
            }
        },
        created () {
            this.getInfo()
        },
        methods: {
            getInfo () {
                let {formId}= this.$route.query
                console.log(formId);
                this.info.id = formId;
                this.$http.get(`/haolifa/purchase-order/info/${formId}`).then(res => {
                    this.info = res.order;
                    this.itemList = res.items;
                    this.orderUrl = res.order.fileUrl;
                    this.info.operateTime = res.order.operateTime.substring(0,10);
                    this.info.confirmTime = res.order.confirmTime.substring(0,10);
                    this.info.createTime = res.order.createTime.substring(0,10);
                    this.info.deliveryTime = res.order.deliveryTime.substring(0,10);
                    this.info.updateTime = res.order.updateTime.substring(0,10);
                    console.log('info',this.info)
                    console.log('itemList',this.itemList)

                }).catch(e => {
                    this.$toast(e.msg)
                })
            },
            downloadOrder:function (id) {
                this.$http.get(`/haolifa/export/purchaseOrder/${id}`).then(res => {
                }).catch(e => {
                    this.$toast(e.msg)
                })
            }
        }
    }
</script>

<style lang="less">
    .page-supplier-info{
        padding: 30px 20px;
        tr:first-child td{padding: 0;border: none;}
        th{font-weight: normal;color: #888;}
        td{color: #444;}
        th, td{padding: 10px;border: 1px solid #fff;border: 1px solid #ddd;}
        .checkbox-list{flex-wrap: wrap;}
        .checkbox-item{line-height: 1em;width: 180px;margin: 5px 0;}
    }
</style>
