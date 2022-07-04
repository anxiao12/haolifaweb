<template>
    <div class="page-cashAccounting-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.deptName" @change="
            $refs.list.update(true)" placeholder="借款部门" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.loanUserName" @change="
            $refs.list.update(true)" placeholder="借款人" style="width: 200px;">
                付款状态:
                <select v-model="filter.payStatus" class="f-14" @change="$refs.list.update(true);">
                    <option value>全部</option>
                    <option value="1">未付款</option>
                    <option value="2">付款中</option>
                    <option value="3">付款完成</option>
                </select>
                审批状态:
                <select v-model="filter.applyStatus" class="f-14" @change="$refs.list.update(true);">
                    <option value>全部</option>
                    <option value="1">待审批</option>
                    <option value="2">审批中</option>
                    <option value="3">审批通过</option>
                    <option value="4">审批不通过</option>
                </select>
                状态:
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true);">
                    <option value>全部</option>
                    <option value="1">待办</option>
                    <option value="2">已办</option>
                </select>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/loanapply/getLoanList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>编号</th>
                    <th>借款部门</th>
                    <th>借款人</th>
                    <th>借款金额</th>
                    <th>资金性质</th>
                    <th>借款日期</th>
                    <th>预计还款日期</th>
                    <th>户名</th>
                    <th>付款单位</th>
                    <th>付款账户</th>
                    <th>用途</th>
                    <th>备注</th>
                    <th>审批节点</th>
                    <th>付款状态</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.serialNo }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.loanUserName }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.amountTypeCN }}</td>
                    <td>{{ item.loanDate}}</td>
                    <td>{{ item.expectRepaymentDate }}</td>
                    <td>{{ item.accountName }}</td>
                    <td>{{ item.payCompany }}</td>
                    <td>{{ item.payAccount }}</td>
                    <td>{{ item.purpose }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ item.applyStatusCN }}</td>
                    <td>{{ item.payStatusCN }}</td>
                    <td>{{ item.createTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.canPay" class="blue" @click="payment(item)">出纳付款</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="出纳付款" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.payAccount" class="flex-item mr-20" :list="accountList" label="付款账户"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.payCompany" class="flex-item mr-20" label="付款单位"></input-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.billNature" class="flex-item mr-20" :list="amountTypeList" label="记账方式"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="save">保存</btn>
                <btn flat color="#008eff" @click="close">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "cashAccounting",
    components: { DataList },
    data() {
        return {
            filter: {
                applyStatus: "",
                deptName: "",
                loanUserName: "",
                payCompany: "",
                payStatus: "",
                serialNo: "",
                status: "",
                type: "2"
            },
            layer: false,
            layer2: false,
            form: {
                billNature: "",
                id: "",
                payAccount: "",
                payCompany: "山西好利阀机械制造有限公司"
            },
            typeList: [
                { text: "收款", value: "1" },
                { text: "付款", value: "2" }
            ],
            amountTypeList: [
                { text: "现金", value: "1" },
                { text: "支票", value: "2" },
                { text: "其他货币", value: "3" }
            ],
            statusList: [],
            acceptList: [],
            blankList: [],
            deptList: [],
            payList: [
                { text: "电汇", value: "电汇" },
                { text: "支票", value: "支票" },
                { text: "汇票", value: "汇票" },
                { text: "现金", value: "现金" },
                { text: "其它", value: "其它" },
                { text: "承兑", value: "承兑" }
            ],
            accountList: []
        };
    },
    mounted() {
        this.getPayType();
        this.getAcceptType();
        this.getDeptList();
        this.getAccount();
    },
    methods: {
        flush() {
            this.filter = {
                applyStatus: "",
                deptName: "",
                loanUserName: "",
                payCompany: "",
                payStatus: "",
                serialNo: "",
                status: "",
                type: "2"
            };
            this.$refs.list.update(true);
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
        getPayName(value) {
            let str = "";
            this.statusList.map(item => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        //款收类型
        getAcceptType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/COLLECTION_TYPE`)
                .then(res => {
                    res.map(item => {
                        this.acceptList.push({
                            text: item.desc,
                            value: item.code
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAccName(value) {
            let str = "";
            this.acceptList.map(item => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        //款收类型
        getDeptList() {
            this.$http
                .get(`/haolifa/dept/list`)
                .then(res => {
                    res.map(item => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id + ""
                        });
                    });
                    console.log(this.deptList);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAccount() {
            this.accountList = [];
            this.$http
                .get("/haolifa/sys-dict/getDictListByType/PAY_ACCOUNT")
                .then(res => {
                    res.map(item => {
                        this.accountList.push({
                            text: item.desc,
                            value: item.desc
                        });
                    });
                });
        },
        payment(item) {
            this.layer = true;
            this.form.id = item.id;
        },
        save() {
            this.$http
                .post("/haolifa/finance/loanapply/pay", this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                billNature: "",
                id: "",
                payAccount: "",
                payCompany: "山西好利阀机械制造有限公司"
            };
        }
    }
};
</script>

<style lang="less">
.page-cashAccounting-list {
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
