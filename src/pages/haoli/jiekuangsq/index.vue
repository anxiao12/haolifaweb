<template>
    <div class="page-cashAccounting-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px;"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.deptName"
                    @change="
            $refs.list.update(true);init()"
                    placeholder="借款部门"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.accountName"
                    @change="
            $refs.list.update(true);init()
            init();
          "
                    placeholder="户名"
                    style="width: 150px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.loanUserName"
                    @change="
            $refs.list.update(true);init()"
                    placeholder="借款人"
                    style="width: 200px;"
                >
                付款状态:
                <select
                    v-model="filter.payStatus"
                    class="f-14"
                    @change="$refs.list.update(true);init()"
                >
                    <option value>全部</option>
                    <option value="1">未付款</option>
                    <option value="2">付款中</option>
                    <option value="3">付款完成</option>
                </select>
                审批状态:
                <select
                    v-model="filter.applyStatus"
                    class="f-14"
                    @change="$refs.list.update(true);init()"
                >
                    <option value>全部</option>
                    <option value="1">待审批</option>
                    <option value="2">审批中</option>
                    <option value="3">审批通过</option>
                    <option value="4">审批不通过</option>
                </select>
                状态:
                <select
                    v-model="filter.status"
                    class="f-14"
                    @change="$refs.list.update(true);init()"
                >
                    <option value>全部</option>
                    <option value="1">待办</option>
                    <option value="2">已办</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add()"
            >新增</btn>
        </div>
        <div>
            <btn
                class="b"
                flat
                color="#008eff"
            >借款金额(元)：{{ amountSum }}</btn>
            <btn
                class="b"
                flat
                color="#008eff"
            >余欠金额(元)：{{ owedAmountSum }}</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/loanapply/getLoanList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>编号</th>
                    <th>借款部门</th>
                    <th>借款人</th>
                    <th>项目名称</th>
                    <th>借款金额</th>
                    <th>还款金额</th>
                    <th>余欠金额</th>
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
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.serialNo }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.loanUserName }}</td>
                    <td>{{ item.projectCodeName }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.paymentAmount }}</td>
                    <td>{{ item.owedAmount }}</td>
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
                        <a
                            href="javascript:;"
                            v-if="item.applyStatus==1 || item.applyStatus==4"
                            class="blue"
                            @click="edit(item)"
                        >编辑 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            v-if="item.applyStatus==1 || item.applyStatus==4"
                            class="blue"
                            @click="approve(item)"
                        >发起审批 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            v-if="item.applyStatus==1 || item.applyStatus==4"
                            class="red"
                            @click="remove(item)"
                        >删除 |&nbsp;</a>
                        <a
                            :href="'/haolifa/finance/loanapply/printPDF/'+item.id"
                            class="blue"
                            target="_blank"
                        >打印</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            :title="form.id ?'借款编辑':'借款新增'"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <select-box
                        v-model="form.projectCode"
                        class="flex-item mr-20"
                        :list="projectList"
                        label="经费项目"
                        @change="projectChange"
                    ></select-box>
                    <input-box
                        v-model="balanceQuota"
                        class="flex-item mr-20"
                        :disabled="true"
                        label="剩余额度"
                    ></input-box>
                    <select-box
                        v-model="form.payType"
                        class="flex-item mr-20"
                        :list="payTypeList"
                        @change="payTypeChange"
                        label="支付类型"
                    ></select-box>
                    <el-select
                        v-if="form.payType==1"
                        v-model="companyCode"
                        size="mini"
                        clearable
                        @change="companyChange"
                        :filterable="true"
                        placeholder="单位选择"
                    >
                        <el-option
                            v-for="(item,i) in companyList"
                            :key="i"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-if="form.payType==2"
                        v-model="userId"
                        size="mini"
                        clearable
                        @change="userChange"
                        :filterable="true"
                        placeholder="人员选择"
                    >
                        <el-option
                            v-for="(item,i) in userList"
                            :key="i"
                            :label="item.userName + '--'+item.userNo"
                            :value="item.userNo"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.accountName"
                        class="flex-item mr-20"
                        label="户名"
                    ></input-box>
                    <input-box
                        v-model="form.bankOfDeposit"
                        class="flex-item mr-20"
                        label="开户行"
                    ></input-box>
                    <input-box
                        v-model="form.cardNumber"
                        class="flex-item mr-20"
                        label="卡号"
                    ></input-box>

                </div>
                <div class="flex">
                    <select-box
                        v-model="form.amountType"
                        class="flex-item mr-20"
                        :list="amountTypeList"
                        label="资金性质"
                    ></select-box>
                    <input-box
                        v-model="form.amount"
                        class="flex-item mr-20"
                        label="借款金额"
                    ></input-box>
                    <input-box
                        v-model="form.deptName"
                        @click="deptFlag=true"
                        class="flex-item mr-20"
                        label="部门名称"
                    ></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.travelFlag"
                        class="flex-item mr-20"
                        :list="travelFlagList"
                        label="是否差旅借款"
                    ></select-box>
                </div>
                <div
                    class="flex"
                    v-if="form.travelFlag == 1"
                >
                    <input-box
                        v-model="form.travelPeoNum"
                        class="flex-item mr-20"
                        label="出差人数"
                    ></input-box>
                    <input-box
                        v-model="form.travelDays"
                        class="flex-item mr-20"
                        label="出差天数"
                    ></input-box>
                    <input-box
                        v-model="form.travelArrAddress"
                        class="flex-item mr-20"
                        label="出差地点"
                    ></input-box>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.loanDate"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="借款日期"
                    ></date-picker>
                    <date-picker
                        v-model="form.expectRepaymentDate"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="预计还款日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.purpose"
                        class="flex-item mr-20"
                        label="用途"
                    ></input-box>
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        label="备注摘要"
                    ></input-box>
                </div>
                <div class="flex">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="#"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :before-upload="submitUpload"
                        multiple
                    >
                        <el-button
                            slot="trigger"
                            size="small"
                            type="warning"
                        >附件上传</el-button>
                    </el-upload>
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
        <layer
            v-if="deptFlag"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <dept-select @selectClick="selectClick"></dept-select>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import DeptSelect from "@/components/deptSelect";
import fileToBase64 from "@/utils/fileToBase64";
export default {
    name: "cashAccounting",
    components: { DataList, DeptSelect },
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
                type: "1",
                accountName: "",
            },
            layer: false,
            layer2: false,
            deptFlag: false,
            fileList: [],
            form: {
                accountName: "",
                amount: 0,
                amountType: "1",
                bankOfDeposit: "",
                cardNumber: "",
                deptId: "",
                expectRepaymentDate: "",
                loanDate: "",
                purpose: "",
                remark: "",
                payType: "",
                projectCode: "",
                travelArrAddress: "",
                travelDays: "",
                travelFlag: "",
                travelPeoNum: "",
                fileUrlList: [],
            },
            typeList: [
                { text: "收款", value: "1" },
                { text: "付款", value: "2" },
            ],
            amountTypeList: [
                { text: "现金", value: "1" },
                { text: "支票", value: "2" },
            ],
            travelFlagList: [
                { text: "是", value: "1" },
                { text: "否", value: "2" },
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
                { text: "承兑", value: "承兑" },
            ],
            accountList: [],
            userList: [],
            projectList: [],
            companyList: [],
            companyCode: "",
            userId: "",
            payTypeList: [
                { text: "对公", value: "1" },
                { text: "对私", value: "2" },
            ],
            balanceQuota: null,
            loading: false,
            amountSum: "",
            owedAmountSum: "",
        };
    },
    activated() {
        this.getPayType();
        this.getAcceptType();
        this.getDeptList();
        this.getAccount();
        this.getUserList();
        this.getProList();
        this.getCompanyList();
        this.init();
    },
    methods: {
        selectClick(data) {
            if (data) {
                this.form.deptName = data.name;
                this.form.deptId = data.id;
            }
            this.deptFlag = false;
        },
        projectChange() {
            this.balanceQuota = null;
            console.log(111);
            this.projectList.forEach((item) => {
                if (item.value == this.form.projectCode) {
                    this.balanceQuota = item.balanceQuota;
                }
            });
        },
        flush() {
            this.filter = {
                applyStatus: "",
                deptName: "",
                loanUserName: "",
                payCompany: "",
                payStatus: "",
                serialNo: "",
                status: "",
                type: "1",
                accountName: "",
            };
            this.$refs.list.update(true);
            this.init();
        },
        init() {
            this.$http
                .post("/haolifa/finance/loanapply/list-summary", this.filter)
                .then((res) => {
                    this.owedAmountSum = res.owedAmountSum;
                    this.amountSum = res.amountSum;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        payTypeChange() {
            this.form.bankOfDeposit = this.form.cardNumber = this.form.accountName = this.userId = this.companyCode = "";
        },
        companyChange() {
            this.companyList.forEach((item) => {
                if (item.code == this.companyCode) {
                    this.form.accountName = item.accountName;
                    this.form.cardNumber = item.cardNumber;
                    this.form.bankOfDeposit = item.bankOfDeposit;
                }
            });
        },
        userChange() {
            this.userList.forEach((item) => {
                if (item.userNo == this.userId) {
                    this.form.accountName = item.userName;
                    this.form.cardNumber = item.cardNumber;
                    this.form.bankOfDeposit = item.bankOfDeposit;
                }
            });
        },
        //付款类型
        getPayType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/PAYMENT_TYPE`)
                .then((res) => {
                    res.map((item) => {
                        this.statusList.push({
                            text: item.desc,
                            value: item.code,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPayName(value) {
            let str = "";
            this.statusList.map((item) => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        //项目列表
        getProList() {
            this.$http
                .post("/haolifa/finance/projectbudget/getCurUserProjectBudgetList", {
                    code: "",
                    name: "",
                    pageNum: 1,
                    pageSize: 9990,
                })
                .then((res) => {
                    this.projectList = res.list.map((item) => {
                        return { text: item.name, value: item.code, balanceQuota: item.balanceQuota };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //单位列表
        getCompanyList() {
            this.$http
                .post("/haolifa/finance/company/getCompanyList", {
                    code: "",
                    name: "",
                    pageNum: 1,
                    pageSize: 9990,
                })
                .then((res) => {
                    this.companyList = res.list;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //人员列表
        getUserList() {
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: 0,
                    pageNum: 0,
                    pageSize: 0,
                    postId: 0,
                    postName: "",
                    sex: 0,
                    superiorId: 0,
                    teamId: 0,
                    teamName: "",
                    userName: "",
                    userType: "",
                })
                .then((res) => {
                    this.userList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //款收类型
        getAcceptType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/COLLECTION_TYPE`)
                .then((res) => {
                    res.map((item) => {
                        this.acceptList.push({
                            text: item.desc,
                            value: item.code,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAccName(value) {
            let str = "";
            this.acceptList.map((item) => {
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
                .then((res) => {
                    res.map((item) => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id + "",
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
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
        edit(item) {
            this.layer = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = item[key];
            });
            this.fileList = [];
            if (item.fileUrlList.length) {
                item.fileUrlList.forEach((file) => {
                    this.fileList.push({
                        name: file.fileName,
                        url: file.fileUrl,
                    });
                });
            }
            this.form.id = item.id;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/loanapply/delete/${item.id}`)
                        .then((res) => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        approve(item) {
            this.$confirm({
                title: "发起审批确认",
                text: `您确定要发起审批吗？`,
                color: "red",
                btns: ["取消", "发起审批"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/loanapply/approve/${item.id}`)
                        .then((res) => {
                            this.$toast("发起审批成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        add(type) {
            this.layer = true;
        },
        save() {
            if (!this.fileList.length) {
                this.$toast("请上传附件");
                return;
            }
            this.form.fileUrlList = [];
            this.fileList.forEach((file) => {
                this.form.fileUrlList.push({ fileName: file.name, fileUrl: file.url });
            });
            let url = this.form.id ? "/haolifa/finance/loanapply/updateLoan" : "/haolifa/finance/loanapply/save";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        submitUpload(file) {
            fileToBase64(file).then((base64Str) => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name,
                    })
                    .then((res) => {
                        this.fileList.push({
                            name: file.name,
                            url: res,
                        });
                    })
                    .catch((e) => {
                        this.$toast(e.msg || e.message);
                    });
            });
        },
        close() {
            this.layer = this.layer2 = false;
            this.balanceQuota = null;
            this.fileList = [];
            this.form = {
                accountName: "",
                amount: 0,
                amountType: "1",
                bankOfDeposit: "",
                cardNumber: "",
                deptId: "",
                expectRepaymentDate: "",
                loanDate: "",
                purpose: "",
                remark: "",
                payType: "",
                projectCode: "",
                travelArrAddress: "",
                travelDays: "",
                travelFlag: "",
                travelPeoNum: "",
                fileUrlList: [],
            };
        },
    },
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
    .el-select--mini {
        .el-input__inner {
            border: 0;
            border-radius: 0;
            border-bottom: 1px solid #ccc;
            margin-top: 14px;
        }
    }
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
