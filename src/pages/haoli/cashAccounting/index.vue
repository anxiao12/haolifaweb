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
                付款类别:
                <select
                    v-model="filter.paymentType"
                    class="f-14"
                    @change="$refs.list.update(true);"
                >
                    <option value>全部</option>
                    <option
                        v-for="item in statusList"
                        :value="item.value"
                        v-bind:key="item.id"
                    >{{item.text}}</option>
                </select>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.collectionCompany"
                    @change="
            $refs.list.update(true)"
                    placeholder="收款单位"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.paymentCompany"
                    @change="
            $refs.list.update(true)"
                    placeholder="付款单位"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.deptName"
                    @change="
            $refs.list.update(true)"
                    placeholder="部门"
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
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/bill/getBillList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>日期</th>
                    <th>凭证号</th>
                    <th>收款</th>
                    <th>收款单位</th>
                    <th>收款类别</th>
                    <th>付款</th>
                    <th>付款单位</th>
                    <th>付款类别</th>
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
                    <td>{{ item.d }}</td>
                    <td>{{ item.certificateNumber }}</td>
                    <td>{{ item.collectionMoney }}</td>
                    <td>{{ item.string1 }}</td>
                    <td>{{ getAccName(item.collectionType) }}</td>
                    <td>{{ item.payment }}</td>
                    <td>{{ item.string2 }}</td>
                    <td>{{ getPayName(item.paymentType) }}</td>
                    <td>{{ item.preMonthMoney }}</td>
                    <td>{{ item.balance }}</td>
                    <td>{{ item.departmentDTO ? item.departmentDTO.deptName:"" }}</td>
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
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <date-picker
                        v-model="form.d"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="日期"
                    ></date-picker>
                    <input-box v-model="form.certificateNumber" class="flex-item mr-20" label="凭证号"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.collectionMoney" class="flex-item mr-20" label="收款"></input-box>
                    <input-box v-model="form.string1" class="flex-item mr-20" label="收款单位"></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.collectionType"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="acceptList"
                        label="收款类别"
                    ></select-box>
                    <input-box v-model="form.payment" class="flex-item mr-20" label="付款"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.string2" class="flex-item mr-20" label="付款单位"></input-box>
                    <select-box
                        v-model="form.paymentType"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="statusList"
                        label="付款类别"
                    ></select-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.deptId"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="deptList"
                        label="所属部门"
                    ></select-box>
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
                collectionCompany: "",
                deptId: "",
                deptName: "",
                paymentCompany: "",
                paymentType: "",
                payAccount: ""
            },
            layer: false,
            form: {
                balance: 0,
                certificateNumber: "",
                clearingBanks: "",
                collectionMoney: 0,
                collectionType: "",
                d: "",
                deptId: "",
                payment: 0,
                paymentType: "",
                preMonthMoney: 0,
                remark: "",
                settlementType: "",
                status: "",
                string1: "",
                string10: "",
                string2: "",
                string3: "",
                string4: "",
                string5: "",
                string6: "",
                string7: "",
                string8: "",
                string9: "",
                type: "1",
                xh: ""
            },
            typeList: [{ text: "生产", value: "生产" }, { text: "管理", value: "管理" }],
            statusList: [],
            acceptList: [],
            accountList: [],
            deptList: []
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
                collectionCompany: "",
                deptId: "",
                deptName: "",
                paymentCompany: "",
                paymentType: ""
            };
            this.$refs.list.update(true);
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
                            value: item.id
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.d = item.d;
            this.form.collectionType = item.collectionType;
            this.form.payment = item.payment;
            this.form.paymentType = item.paymentType;
            this.form.string1 = item.string1;
            this.form.deptId = item.departmentDTO.id;
            this.form.certificateNumber = item.certificateNumber;
            this.form.collectionMoney = item.collectionMoney;
            this.form.string2 = item.string2;
            this.form.remark = item.remark;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/bill/delete/${item.id}`)
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
        add() {
            this.layer = true;
        },
        save() {
            this.$confirm({
                title: "确认",
                text: `请确认数据是否正确，保存后无法修改`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    let url = this.form.id ? "/haolifa/finance/bill/updateBizbill" : "/haolifa/finance/bill/save";
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
            this.layer = false;
            this.form = {
                balance: 0,
                certificateNumber: "",
                clearingBanks: "",
                collectionMoney: 0,
                collectionType: "",
                d: "",
                deptId: "",
                payment: 0,
                paymentType: "",
                preMonthMoney: 0,
                remark: "",
                settlementType: "",
                status: "",
                string1: "",
                string10: "",
                string2: "",
                string3: "",
                string4: "",
                string5: "",
                string6: "",
                string7: "",
                string8: "",
                string9: "",
                type: "1",
                xh: ""
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
