<template>
    <div class="page-orders-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.orderNo"
                    @change="$refs.list.update(true);"
                    placeholder="订单号"
                    style="width: 200px;"
                >
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff">已分解额：{{decomposeAmount?decomposeAmount +'元':''}}</btn>
            <btn class="b" flat color="#008eff">分解余额：{{surplusAmount?surplusAmount +'元':''}}</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/finance/billContract/orderContractList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>合同编号</th>
                    <th>客户</th>
                    <th>签订日期</th>
                    <th>供方</th>
                    <th>已收金额</th>
                    <th>付款方式</th>
                    <th>总价</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.demandName}}</td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.supplyName}}</td>
                    <td>{{item.receivedAccount}}</td>
                    <td>{{item.payType}}</td>
                    <td>{{item.totalPrice}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="add(item)"
                            style="margin-right: 3px;"
                        >添加 |</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                            style="margin-right: 3px;"
                        >编辑 |</a>
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
        <layer v-if="addLayer" title="添加" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.amount" class="flex-item mr-20" label="收款金额"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
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
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="editLayer" title="编辑" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex" v-for="(item,i) in detailList" :key="i">
                    <input-box v-model="item.amount" class="flex-item mr-20" label="收款金额"></input-box>
                    <input-box v-model="item.remark" class="flex-item mr-20" label="备注"></input-box>
                    <el-button
                        size="mini"
                        class="mr-20"
                        style="height: 30px;"
                        type="primary"
                        @click="editSave(item)"
                    >保存</el-button>
                    <el-button
                        size="mini"
                        class="mr-20"
                        style="height: 30px;"
                        type="danger"
                        @click="del(item,i)"
                    >删除</el-button>
                </div>
                <div class="flex" v-if="detailList.length==0">无付款记录</div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" @click="editClose">关闭</el-button>
            </div>
        </layer>
        <layer v-if="layer" title="详情" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;"></td>
                        </tr>
                        <tr>
                            <td colspan="1" class="b">订单号</td>
                            <td colspan="1" class="b">收款金额</td>
                            <td colspan="1" class="b">备注</td>
                            <td colspan="1" class="b">创建时间</td>
                        </tr>
                        <tr v-for="(item,index) in detailList" :key="index">
                            <td colspan="1">{{item.orderNo}}</td>
                            <td colspan="1">{{item.amount}}</td>
                            <td colspan="1">{{item.remark}}</td>
                            <td colspan="1">{{item.createTime}}</td>
                        </tr>
                        <tr v-if="detailList.length==0">
                            <td colspan="4" class="b">无数据</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false;detailList = []">关闭</btn>
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
                id: "",
                billType: "",
                orderNo: ""
            },
            billTypeArr: ["", "现金日记账", "银行日记账", "其他货币日记账"],
            statusList: [],
            addLayer: false,
            form: {
                amount: "",
                billId: "",
                billType: "",
                id: "",
                orderId: "",
                orderNo: "",
                remark: ""
            },
            loading: false,
            layer: false,
            editLayer: false,
            detailList: [],
            surplusAmount: null,
            decomposeAmount: null
        };
    },
    activated() {
        this.filter = { ...this.$route.query };
        this.getPayType();
        this.getSurp();
    },
    methods: {
        flush() {
            this.filter = {
                id: this.$route.query.id,
                billType: this.$route.query.billType,
                orderNo: ""
            };
            this.$refs.list.update(true);
            this.getSurp();
        },
        //付款类型
        getPayType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/PAYMENT_TYPE`)
                .then(res => {
                    res.map(item => {
                        this.statusList.push({
                            text: item.desc,
                            value: item.code
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //获取分解额及分解余额
        getSurp() {
            this.$http
                .post(`/haolifa/finance/billContract/billDecomposeAmount`, { billId: this.$route.query.id, billType: this.$route.query.billType })
                .then(res => {
                    this.decomposeAmount = res.decomposeAmount;
                    this.surplusAmount = res.surplusAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPayName(value) {
            let str = "";
            this.statusList.map(item => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        add(item) {
            this.form = {
                amount: "",
                billId: this.$route.query.id,
                billType: this.$route.query.billType,
                id: "",
                orderId: item.id,
                orderNo: item.orderNo,
                remark: ""
            };
            this.addLayer = true;
        },
        editSave(item) {
            let params = {
                amount: item.amount,
                billId: item.billId,
                billType: item.billType,
                id: item.id,
                orderId: item.orderId,
                orderNo: item.orderNo,
                remark: item.remark
            };
            this.$http
                .post("/haolifa/finance/billContract/addOrUpContract", params)
                .then(res => {
                    this.$toast("保存成功");
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        del(item, index) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/finance/billContract/removeContract/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.detailList.splice(index, 1);
                        })
                        .catch(e => {
                            this.$toast(e.msg);
                        });
                }
            });
        },
        save() {
            this.$http
                .post("/haolifa/finance/billContract/addOrUpContract", this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                    this.getSurp()
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.addLayer = false;
            this.form = {
                amount: "",
                billId: "",
                billType: "",
                id: "",
                orderId: "",
                orderNo: "",
                remark: ""
            };
        },
        editClose() {
            this.editLayer = false;
            this.detailList = [];
            this.$refs.list.update(true);
        },
        detail(item) {
            this.layer = true;
            this.getDetail(item);
        },
        edit(item) {
            this.detailList = [];
            this.editLayer = true;
            this.getDetail(item);
        },
        getDetail(item) {
            this.$http
                .post("/haolifa/finance/billContract/selectBizBillChildList", {
                    billId: this.$route.query.id,
                    billType: item.billType,
                    orderId: item.id,
                    orderNo: item.orderNo
                })
                .then(res => {
                    this.detailList = res.list;
                    console.log(res);
                    console.log(this.detailList);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
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