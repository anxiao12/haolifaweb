<template>
    <div class="page-cashAccounting-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.deptName" @change="
            $refs.list.update(true)" placeholder="报销部门" style="width: 200px;">

                <input type="text" class="flex-item" v-model="filter.reimburseUser" @change="
            $refs.list.update(true)" placeholder="报销人" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.serialNo" @change="
            $refs.list.update(true)" placeholder="编号" style="width: 200px;">
                报销类型:
                <select v-model="filter.type" class="f-14" @change="$refs.list.update(true);">
                    <option value>全部</option>
                    <option value="1">差旅报销</option>
                    <option value="2">费用报销</option>
                </select>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/reimburseapply/getReimburseApplyPayBillList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>报销人</th>
                    <th>金额</th>
                    <th>报销类型</th>
                    <th>报销方式</th>
                    <th>部门</th>
                    <th>账户名</th>
                    <th>卡号</th>
                    <th>付款状态</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.reimburseUserName }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.typeCN }}</td>
                    <td>{{ item.reimburseTypeCN }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.accountName }}</td>
                    <td>{{ item.cardNumber}}</td>
                    <td>{{ item.payStatusCN}}</td>
                    <td>{{ item.createTime}}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.canPay" class="blue" @click="pay(item)">付款</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="付款 " width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.billNature" class="flex-item mr-20" hint="必填" :list="amountTypeList" label="记账方式"></select-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.payAccount" class="flex-item mr-20" :list="accountList" label="付款账户"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.payCompany" class="flex-item mr-20" label="付款单位"></input-box>
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
                deptId: "",
                deptName: "",
                myself: "",
                reimburseUser: "",
                serialNo: "",
                type: "",
                myself: ""
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
                { text: "费用报销", value: "2" },
                { text: "差旅报销", value: "1" }
            ],
            reimburseTypeList: [
                { text: "普通报销", value: "1" },
                { text: "借款冲抵", value: "2" }
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
            accountList: []
        };
    },
    mounted() {
        this.getPayType();
        this.getAccount();
        this.getDeptList();
    },
    methods: {
        flush() {
            this.filter = {
                deptId: "",
                deptName: "",
                myself: "",
                reimburseUser: "",
                serialNo: "",
                type: "",
                myself: ""
            };
            this.$refs.list.update(true);
        },
        delCost(type, index) {
            if (type == 1) {
                this.form.reimburseTravelDetailAddDTOList.splice(index, 1);
            } else {
                this.form.reimburseCostDetailAddDTOList.splice(index, 1);
            }
        },
        costAdd(type) {
            if (type == 1) {
                this.form.reimburseTravelDetailAddDTOList.push({
                    arrAddress: "",
                    arrTime: "",
                    depAddress: "",
                    depTime: "",
                    projectAmount: 0,
                    projectDocNum: 0,
                    projectType: 0,
                    remark: "",
                    travelDays: 0,
                    travelSubsidyAmount: 0,
                    type: "1",
                    vehicle: 0,
                    vehicleAmount: 0,
                    vehicleDocNum: 0
                });
            } else {
                this.form.reimburseCostDetailAddDTOList.push({
                    amount: 0,
                    docNum: 0,
                    remark: "",
                    time: "",
                    type: "2"
                });
            }
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
        pay(item) {
            this.form.id = item.id;
            this.layer = true;
        },
        save() {
            let url = "/haolifa/finance/reimburseapply/pay";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("付款成功");
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
