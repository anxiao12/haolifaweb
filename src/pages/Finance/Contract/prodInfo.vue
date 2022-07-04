<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$store.commit('DELMENUTABS', '/production/info');$router.back()">arrow_back</icon-btn>
                <div class="flex-item">收款记录</div>
                <div class="flex-item ml-20">
                    <a class="a" flat style="color: #008eff" @click="addPay()" href="javascript:;">新增收款记录</a>
                </div>
            </div>
            <table class="f-14">
                <tr style="border: 1px solid #ddd;">
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 10%;"></td>
                </tr>
                <tr>
                    <th>订单号</th>
                    <th>发票编号</th>
                    <th>总金额(￥)</th>
                    <th>打款日期</th>
                    <th>录入人</th>
                    <th>创建日期</th>
                    <th>更新日期</th>
                </tr>
                <tr v-for="item in payList" :key="item.id">
                    <td>{{item.orderNo}}</td>
                    <td>{{item.invoiceNo}}</td>
                    <td>{{item.amount.toLocaleString()}}</td>
                    <td>{{item.payTime}}</td>
                    <td>{{item.createUserId}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.updateTime}}</td>
                </tr>
            </table>
            <div v-show="addFlag">
                <div class="b" style="margin: 20px 0 10px;">收款记录添加</div>
                <div class="card flex" style="margin-top: 0;">
                    <div class="flex-item">
                        <div class="flex">
                            <input-box v-model="order.orderNo" disabled hint="必填" class="flex-item mr-10" label="合同订单号"></input-box>
                            <input-box v-model="order.invoiceNo" class="flex-item mr-10" label="发票编号"></input-box>
                            <input-box type="number" v-model="order.amount" hint="必填" class="flex-item mr-10" label="总金额"></input-box>
                        </div>
                        <div class="flex">
                            <date-picker v-model="order.payTime" hint="必填" class="flex-item mr-10" label="收款日期" style="margin-right: 20px;"></date-picker>
                            <!-- <div class="flex-item" style="line-height:82px;">
                                合同类型:
                                <select type="number" style="width:70%" v-model="order.orderType" hint="必填" class="f-14 mr-10 select-form" label="合同类型">
                                    <option value="1">采购</option>
                                    <option value="2">生产</option>
                                </select>
                                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                            </div>-->
                        </div>
                        <div class="flex-item" style="text-align:center">
                            <button class="btn btn-sm" @click="save()">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "purchsemanage-prodinfo",
    data() {
        return {
            loading: false,
            info: {},
            itemList: [],
            orderUrl: "",
            detailFlag: true,
            addFlag: false,
            payList: {},
            order: {
                amount: "",
                orderNo: "",
                payTime: "",
                invoiceNo: "",
                orderType: 2
            }
        };
    },
    activated() {
        this.info = {};
        this.itemList = [];
        this.orderUrl = "";
        this.detailFlag = true;
        this.addFlag = false;
        this.payList = {};
        this.order = {
            amount: "",
            orderNo: "",
            payTime: "",
            invoiceNo: "",
            orderType: 2
        };
        this.payClick();
    },
    created() {
        this.payClick();
    },
    methods: {
        payClick() {
            let { orderNo } = this.$route.query;
            this.order.orderNo = orderNo;
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
            /* if (!this.order.invoiceNo) {
                this.$toast("请填写发票编号");
                return;
            } */
            if (!this.order.payTime) {
                this.$toast("请选择收款日期");
                return;
            }
            this.order.orderType = parseInt(this.order.orderType);
            this.$http
                .post("/haolifa/payment/save", this.order)
                .then(res => {
                    this.$toast("提交成功");
                    this.order.amount = "";
                    this.order.payTime = "";
                    this.order.invoiceNo = "";
                    this.addFlag = false;
                    this.payClick(this.order.orderNo);
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
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
    .select-form {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
        border-bottom: 1px solid #d8d8d8;
        border-radius: 0;
    }
}
</style>
