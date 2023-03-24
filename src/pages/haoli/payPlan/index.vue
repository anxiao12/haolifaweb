<template>
    <div class="page-invoice-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.applyNo"
                    @change="
            $refs.list.update(true);
            init();
          "
                    placeholder="申请编号"
                    style="width: 200px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.contractNo"
                    @change="
            $refs.list.update(true);
            init();
          "
                    placeholder="合同号"
                    style="width: 200px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.payCompany"
                    @change="
            $refs.list.update(true);
            init();
          "
                    placeholder="付款单位"
                    style="width: 200px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.applyCollectionCompany"
                    @change="
            $refs.list.update(true);
            init();
          "
                    placeholder="收款单位"
                    style="width: 200px"
                />
                付款状态:
                <select
                    v-model="filter.status"
                    class="f-14"
                    @change="
            $refs.list.update(true);
            init();
          "
                >
                    <option value>全部</option>
                    <option value="0">未付</option>
                    <option value="1">付款中</option>
                    <option value="2">已付款</option>
                </select>
                数据状态:
                <select
                    v-model="filter.dataStatus"
                    class="f-14"
                    @change="
            $refs.list.update(true);
            init();
          "
                >
                    <option value>全部</option>
                    <option value="0">待主管会计确认</option>
                    <option value="1">出纳付款</option>
                </select>
            </div>
            <div class="flex-item"></div>
        </div>
        <div>
            <btn
                class="b"
                flat
                color="#008eff"
            >合计付款额(元)：{{ num }}</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/payplan/getPayPlanList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px">序号</th>
                    <th>申请编号</th>
                    <th>申请日期</th>
                    <th>合同号</th>
                    <th>合同付款方式</th>
                    <th>付款单位</th>
                    <th>收款单位</th>
                    <th>付款金额</th>
                    <th>付款备注</th>
                    <th>付款方式</th>
                    <th>付款状态</th>
                    <th>付款日期</th>
                    <th>记账方式</th>
                    <th>数据状态</th>
                    <th
                        class="t-right"
                        style="width: 80px"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.applyNo }}</td>
                    <td>{{ item.applyDate }}</td>
                    <td>{{ item.contractNo }}</td>
                    <td>{{ item.contractPayWay }}</td>
                    <td>{{ item.payCompany }}</td>
                    <td>{{ item.applyCollectionCompany }}</td>
                    <td>{{ item.applyAmount }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ payWayCn(item.payWayList) }}</td>
                    <td>{{ statusArr[item.status] }}</td>
                    <td>{{ item.payDate }}</td>
                    <td>{{ item.bookingTypeList.toString() }}</td>
                    <td>{{ dataStatusArr[item.dataStatus] }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            v-if="item.isCN && item.status == 0"
                            class="blue"
                            @click="payClick(item)"
                        >付 款</a>
                        <a
                            href="javascript:;"
                            v-if="item.canConfirm"
                            class="blue"
                            @click="confirmClick(item.id)"
                        >确 认</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            title="付款"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px"
            >
                <div class="flex">
                    <input-box
                        v-model="form.applyPayCompany"
                        class="flex-item mr-20"
                        :disabled="true"
                        label="申请付款单位"
                    ></input-box>
                    <input-box
                        v-model="form.applyAmount"
                        class="flex-item mr-20"
                        :disabled="true"
                        label="总付款金额"
                    ></input-box>
                    <input-box
                        v-model="balance"
                        class="flex-item mr-20"
                        :disabled="true"
                        label="余额"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        :disabled="true"
                        label="付款备注"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.payCompany"
                        class="flex-item mr-20"
                        label="付款单位"
                    ></input-box>
                    <!-- <select-box
                        v-model="form.payAccount"
                        class="flex-item mr-20"
                        :list="accountList"
                        label="付款账号"
                    ></select-box> -->
                </div>
                <div
                    class="flex mt-20 mb-20"
                    style="color: #2b7bcd"
                >付款方式：</div>
                <div
                    class="flex"
                    v-for="(item, i) in form.payWayList"
                    :key="i"
                >
                    <input-box
                        v-model="item.amount"
                        class="flex-item mr-20"
                        label="金额"
                        type="number"
                        @blur="changeBalance(i)"
                    ></input-box>
                    <select-box
                        v-model="item.payAccount"
                        class="flex-item mr-20"
                        :list="accountList"
                        label="付款账号"
                    ></select-box>
                    <select-box
                        v-model="item.bookingType"
                        class="flex-item mr-20"
                        :list="item.bookingTypeList"
                        @change="getCodeList(i)"
                        label="记账方式"
                    ></select-box>
                    <select-box
                        v-model="item.code"
                        class="flex-item mr-20"
                        :list="item.codeList"
                        label="付款方式"
                    ></select-box>
                    <el-button
                        size="mini"
                        style="height: 30px"
                        type="primary"
                        @click="addAmount(index)"
                    >添加</el-button>
                    <el-button
                        size="mini"
                        style="height: 30px"
                        v-if="form.payWayList.length > 1"
                        type="danger"
                        @click="delAmount(index)"
                    >删除</el-button>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.payDate"
                        class="flex-item"
                        style="margin-right: 20px"
                        label="付款日期"
                    ></date-picker>
                    <select-box
                        v-model="form.status"
                        class="flex-item mr-20"
                        :list="statusList"
                        label="付款状态"
                    ></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="save"
                >保存</btn>
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
                applyAmount: "",
                applyCollectionCompany: "",
                applyDate: "",
                applyDateEnd: "",
                applyDateStart: "",
                applyNo: "",
                applyPayCompany: "",
                bookingType: "",
                contractId: "",
                contractNo: "",
                contractPayWay: "",
                createTime: "",
                createUser: "",
                dataStatus: "",
                delFlag: "",
                id: "",
                payAccount: "",
                payCompany: "",
                payDataId: "",
                payDate: "",
                payWay: "",
                paymentType: "",
                remark: "",
                status: "",
                updateTime: "",
                updateUser: "",
            },
            statusArr: ["未付", "付款中", "已付款"],
            statusList: [
                { text: "未付款", value: "0" },
                { text: "已付款", value: "2" },
            ],
            dataStatusArr: ["待主管会计确认", "出纳付款"],
            layer: false,
            form: {
                applyAmount: 0,
                applyPayCompany: "",
                id: "",
                payCompany: "",
                payDate: "",
                payWayList: [
                    {
                        amount: 0,
                        bookingType: "",
                        payAccount: "",
                        bookingTypeList: [
                            { text: "现金日记账", value: "cash_bill" },
                            { text: "银行日记账", value: "bank_bill" },
                            { text: "其他货币日记账", value: "other_bill" },
                        ],
                        code: "",
                        codeList: [],
                    },
                ],
                remark: "",
                status: "",
            },
            accountList: [],
            account1: 0,
            account2: 0,
            account3: 0,
            payTypeList: [{}],
            balance: 0,
            num: "",
        };
    },
    activated() {
        if (this.$route.query.demander) {
            this.filter.payCompany = this.$route.query.demander;
        }
        if (this.$route.query.supplierName) {
            this.filter.applyCollectionCompany = this.$route.query.supplierName;
        }
        this.$refs.list.update(true);
        this.init();
        this.getAccount();
    },
    methods: {
        flush() {
            this.filter = {
                applyAmount: "",
                applyCollectionCompany: "",
                applyDate: "",
                applyDateEnd: "",
                applyDateStart: "",
                applyNo: "",
                applyPayCompany: "",
                bookingType: "",
                contractId: "",
                contractNo: "",
                contractPayWay: "",
                createTime: "",
                createUser: "",
                dataStatus: "",
                delFlag: "",
                id: "",
                payAccount: "",
                payCompany: "",
                payDataId: "",
                payDate: "",
                payWay: "",
                paymentType: "",
                remark: "",
                status: "",
                updateTime: "",
                updateUser: "",
            };
            this.$refs.list.update(true);
            this.getAccount();
            this.init();
        },

        init() {
            this.$http
                .post("/haolifa/finance/payplan/list-summary", this.filter)
                .then((res) => {
                    this.num = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        payWayCn(list) {
            let str = "";
            if (list.length) {
                list.map((item) => {
                    str += item.payWay + ":" + item.applyAmount + ";";
                });
            }
            return str;
        },
        payClick(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.applyPayCompany = item.applyPayCompany;
            this.form.applyAmount = item.applyAmount;
            this.form.remark = item.remark;
            this.balance = item.applyAmount;
        },
        confirmClick(id) {
            this.$confirm({
                title: "确认该操作吗",
                text: "",
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    let ids = [];
                    ids.push(id);
                    this.$http
                        .post("/haolifa/finance/payplan/confirm", { ids: ids })
                        .then((res) => {
                            this.$toast("确认成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        getAccount() {
            this.accountList = [];
            this.$http.get("/haolifa/sys-dict/getDictListByType/PAY_ACCOUNT").then((res) => {
                res.map((item) => {
                    this.accountList.push({
                        text: item.desc,
                        value: item.desc,
                    });
                });
            });
        },
        changeBalance(index) {
            this.balance = this.form.applyAmount;
            this.form.payWayList.map((item) => {
                this.balance = this.balance - item.amount;
            });
            this.balance = Math.floor(this.balance * 100) / 100;
        },
        save() {
            if (this.balance < 0) {
                this.$toast("付款金额已超出总付款金额");
                return;
            }
            let param = JSON.parse(JSON.stringify(this.form));
            param.payWayList.map((item) => {
                delete item.codeList;
                delete item.bookingTypeList;
            });
            this.$http
                .post("/haolifa/finance/payplan/updatePayPlan", param)
                .then((res) => {
                    this.layer = false;
                    this.$toast("付款成功");
                    this.close();
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                applyAmount: 0,
                applyPayCompany: "",
                id: "",
                payAccount: "",
                payCompany: "",
                payDate: "",
                payWayList: [
                    {
                        amount: 0,
                        bookingType: "",
                        payAccount: "",
                        bookingTypeList: [
                            { text: "现金日记账", value: "cash_bill" },
                            { text: "银行日记账", value: "bank_bill" },
                            { text: "其他货币日记账", value: "other_bill" },
                        ],
                        code: "",
                        codeList: [],
                    },
                ],
                remark: "",
                status: "",
            };
        },
        addAmount(index) {
            this.form.payWayList.push({
                amount: 0,
                bookingType: "",
                payAccount: "",
                bookingTypeList: [
                    { text: "现金日记账", value: "cash_bill" },
                    { text: "银行日记账", value: "bank_bill" },
                    { text: "其他货币日记账", value: "other_bill" },
                ],
                code: "",
                codeList: [],
            });
        },
        delAmount(index) {
            this.form.payWayList.splice(index, 1);
        },
        getCodeList(index) {
            this.form.payWayList[index].code = "";
            if (this.form.payWayList[index].bookingType == "cash_bill") {
                this.form.payWayList[index].codeList = [{ text: "现金", value: "cash_pay" }];
            } else if (this.form.payWayList[index].bookingType == "bank_bill") {
                this.form.payWayList[index].codeList = [
                    { text: "支票", value: "check_pay" },
                    { text: "电汇", value: "remittance_pay" },
                ];
            } else if (this.form.payWayList[index].bookingType == "other_bill") {
                this.form.payWayList[index].codeList = [
                    { text: "承兑", value: "acceptance_pay" },
                    { text: "汇票", value: "money_oder_pay" },
                ];
            }
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
