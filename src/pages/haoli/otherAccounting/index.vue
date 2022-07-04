<template>
    <div class="page-cashAccounting-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.certificateNumber"
                    @change="
            $refs.list.update(true)"
                    placeholder="凭证号"
                    style="width: 200px;"
                >
                记账类别:
                <select
                    v-model="filter.type"
                    class="f-14"
                    @change="$refs.list.update(true);"
                >
                    <option value>全部</option>
                    <option value="1">收款</option>
                    <option value="2">付款</option>
                </select>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.collectCompany"
                    @change="
            $refs.list.update(true)"
                    placeholder="收款单位"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.payCompany"
                    @change="
            $refs.list.update(true)"
                    placeholder="付款单位"
                    style="width: 200px;"
                >
                银行账户:
                <select
                    v-model="filter.payAccount"
                    class="f-14"
                    @change="$refs.list.update(true);"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in accountList"
                        :index="i"
                        :value="item.text"
                    >{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add('1')">收款新增</btn>
            <btn class="b" flat color="#008eff" @click="add('2')">付款新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/otherbill/getOtherBillList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>记账类别</th>
                    <th>日期</th>
                    <th>凭证号</th>
                    <th>收款单位</th>
                    <th>付款单位</th>
                    <th>收/付款账户</th>
                    <th>收/付款方式</th>
                    <th>收款类别</th>
                    <th>收款</th>
                    <th>付款类别</th>
                    <th>付款</th>
                    <th>上月结转</th>
                    <th>余额</th>
                    <th>部门</th>
                    <th>经办人</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th> -->
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.type==1?'收款':"付款" }}</td>
                    <td>{{ item.operateDate }}</td>
                    <td>{{ item.certificateNumber }}</td>
                    <td>{{ item.collectCompany }}</td>
                    <td>{{ item.payCompany }}</td>
                    <td>{{ item.payAccount}}</td>
                    <td>{{ item.payWay }}</td>
                    <td>{{ getPayName(item.collectionType) }}</td>
                    <td>{{ item.collectionMoney }}</td>
                    <td>{{ getPayName(item.paymentType) }}</td>
                    <td>{{ item.payment }}</td>
                    <td>{{ item.preMonthMoney }}</td>
                    <td>{{ item.balance }}</td>
                    <td>{{ item.deptId }}</td>
                    <td>{{ item.contractUser}}</td>
                    <td>{{ item.createTime}}</td>
                    <td>{{ item.remark }}</td>
                    <!-- <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="red" @click="remove(item)">删除</a>
                    </td>-->
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'收款编辑':'收款新增' " width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box
                        v-model="form.type"
                        class="flex-item mr-20"
                        :disabled="true"
                        :list="typeList"
                        label="记账类别"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.serialNo" class="flex-item mr-20" label="序号"></input-box>
                    <date-picker
                        v-model="form.operateDate"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <input-box v-model="form.certificateNumber" class="flex-item mr-20" label="凭证号"></input-box>
                    <input-box v-model="form.collectCompany" class="flex-item mr-20" label="收款单位"></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.payWay"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="payList"
                        label="收款方式"
                    ></select-box>
                    <input-box v-model="form.payCompany" class="flex-item mr-20" label="付款单位"></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.payAccount"
                        class="flex-item mr-20"
                        :list="accountList"
                        label="收款账户"
                    ></select-box>
                    <input-box v-model="form.collectionMoney" class="flex-item mr-20" label="收款"></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.collectionType"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="acceptList"
                        label="收款类别"
                    ></select-box>
                    <select-box
                        v-model="form.deptId"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="deptList"
                        label="所属部门"
                    ></select-box>
                </div>

                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="save">保存</btn>
                <btn flat color="#008eff" @click="close">关闭</btn>
            </div>
        </layer>
        <layer v-if="layer2" :title="form.id ?'付款编辑':'付款新增' " width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box
                        v-model="form.type"
                        class="flex-item mr-20"
                        :disabled="true"
                        :list="typeList"
                        label="记账类别"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.serialNo" class="flex-item mr-20" label="序号"></input-box>
                    <date-picker
                        v-model="form.operateDate"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <input-box v-model="form.certificateNumber" class="flex-item mr-20" label="凭证号"></input-box>
                    <input-box v-model="form.payCompany" class="flex-item mr-20" label="付款单位"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.collectCompany" class="flex-item mr-20" label="收款单位"></input-box>
                    <select-box
                        v-model="form.payWay"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="payList"
                        label="付款方式"
                    ></select-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.payAccount"
                        class="flex-item mr-20"
                        :list="accountList"
                        label="付款账户"
                    ></select-box>
                    <input-box v-model="form.payment" class="flex-item mr-20" label="付款"></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.paymentType"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="statusList"
                        label="付款类别"
                    ></select-box>
                    <select-box
                        v-model="form.deptId"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="deptList"
                        label="所属部门"
                    ></select-box>
                </div>

                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
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
                certificateNumber: "",
                collectCompany: "",
                operateDateEnd: "",
                operateDateStart: "",
                payAccount: "",
                payCompany: "",
                paymentType: "",
                type: ""
            },
            layer: false,
            layer2: false,
            form: {
                account: "",
                certificateNumber: "",
                collectCompany: "",
                collectionMoney: "",
                collectionType: "",
                company: "",
                contractStatus: "",
                deptId: "",
                operateDate: "",
                payAccount: "",
                payCompany: "",
                payCompanyId: "",
                payWay: "",
                payment: "",
                paymentType: "",
                remark: "",
                serialNo: "",
                type: ""
            },
            typeList: [{ text: "收款", value: "1" }, { text: "付款", value: "2" }],
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
                certificateNumber: "",
                collectCompany: "",
                operateDateEnd: "",
                operateDateStart: "",
                payAccount: "",
                payCompany: "",
                paymentType: "",
                type: ""
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
        getAccount() {
            this.accountList = [];
            this.$http.get("/haolifa/sys-dict/getDictListByType/PAY_ACCOUNT").then(res => {
                res.map(item => {
                    this.accountList.push({
                        text: item.desc,
                        value: item.desc
                    });
                });
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
                            value: item.id
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            if (item.type == 1) {
                this.layer = true;
            } else {
                this.layer2 = true;
            }
            this.form.id = item.id;
            this.form.type = item.type;
            this.form.serialNo = item.serialNo;
            this.form.operateDate = item.operateDate;
            this.form.certificateNumber = item.certificateNumber;
            this.form.payCompany = item.payCompany;
            this.form.collectCompany = item.collectCompany;
            this.form.payWay = item.payWay;
            this.form.payAccount = item.payAccount;
            this.form.deptId = item.deptId;
            this.form.paymentType = item.paymentType;
            this.form.payment = item.payment;
            this.form.remark = item.remark;
            this.form.collectionMoney = item.collectionMoney;
            this.form.collectionType = item.collectionType;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/otherbill/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        add(type) {
            this.form.type = type;
            if (type == 1) {
                this.layer = true;
                this.form.payCompany = "";
                this.form.collectCompany = "山西好利阀机械制造有限公司";
            } else {
                this.layer2 = true;
                this.form.payCompany = "山西好利阀机械制造有限公司";
                this.form.collectCompany = "";
            }
        },
        save() {
            // if (
            //     !this.form.operateDate ||
            //     !this.form.collectionType ||
            //     !this.form.payment ||
            //     !this.form.paymentType ||
            //     !this.form.payCompany ||
            //     !this.form.deptId ||
            //     !this.form.certificateNumber ||
            //     !this.form.collectionMoney ||
            //     !this.form.collectCompany
            // ) {
            //     this.$toast("请输入必填项");
            //     return;
            // }
            this.$confirm({
                title: "确认",
                text: `请确认数据是否正确，保存后无法修改`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    let url = this.form.id ? "/haolifa/finance/otherbill/updateOtherBill" : "/haolifa/finance/otherbill/save";
                    this.$http
                        .post(url, this.form)
                        .then(res => {
                            this.close();
                            this.$toast("保存成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        close() {
            this.layer = this.layer2 = false;
            this.form = {
                account: "",
                certificateNumber: "",
                collectCompany: "",
                collectionMoney: "",
                collectionType: "",
                company: "",
                contractStatus: "",
                deptId: "",
                operateDate: "",
                payAccount: "山西好利阀机械制造有限公司",
                payCompany: "",
                payCompanyId: "",
                payWay: "",
                payment: "",
                paymentType: "",
                remark: "",
                serialNo: "",
                type: ""
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
