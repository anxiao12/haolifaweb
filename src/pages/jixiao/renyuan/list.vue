<template>
    <div class="page-invoice-list">
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
                    v-model="filter.userName"
                    @change="
            $refs.list.update(true)"
                    placeholder="姓名"
                    style="width: 200px;"
                >

                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.postName"
                    @change="
            $refs.list.update(true)"
                    placeholder="岗位名称"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.departName"
                    @change="
            $refs.list.update(true)"
                    placeholder="归属部门"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.superiorName"
                    @change="
            $refs.list.update(true)"
                    placeholder="直属上级"
                    style="width: 200px;"
                >
                人员类型
                <select
                    v-model="filter.userType"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value>所有</option>
                    <option
                        v-for="item in userArr"
                        :value="item.value"
                        v-bind:key="item.value"
                    >{{item.text}}</option>
                </select>
                <i
                    class="icon"
                    style="margin-left: -20px;pointer-events:none;"
                >arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add"
            >新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/pay-user/getList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>员工编号</th>
                    <th>人员类型</th>
                    <th>性别</th>
                    <th>籍贯</th>
                    <th>民族</th>
                    <th>婚姻状况</th>
                    <th>专业</th>
                    <th>学历</th>
                    <th>基本工资</th>
                    <th>绩效工资</th>
                    <th>保险基数</th>
                    <th>岗位名称</th>
                    <th>归属部门</th>
                    <th>直属上级</th>
                    <th>工资卡号</th>
                    <th>开户行</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
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
                    <td>{{ item.userName }}</td>
                    <td>{{ item.userNo }}</td>
                    <td>{{ item.userType=="1"?"管理":"生产" }}</td>
                    <td>{{ sexArr[item.sex] }}</td>
                    <td>{{ item.nativePlace }}</td>
                    <td>{{ item.nation }}</td>
                    <td>{{ marryArr[item.marryStatus] }}</td>
                    <td>{{ item.major }}</td>
                    <td>{{ educationArr[item.education] }}</td>
                    <td>{{ item.basePay }}</td>
                    <td>{{ item.meritPay }}</td>
                    <td>{{ item.insuranceBase }}</td>
                    <td>{{ item.postName }}</td>
                    <td>{{ item.departName }}</td>
                    <td>{{ item.superiorName }}</td>
                    <td>{{ item.cardNumber }}</td>
                    <td>{{ item.bankOfDeposit }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                        >编辑 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            class="red"
                            @click="remove(item)"
                        >删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            :title="form.id ?'编辑':'新增' "
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <input-box
                        v-model="form.userName"
                        class="flex-item mr-20"
                        hint="必填"
                        label="姓名"
                    ></input-box>
                    <input-box
                        v-model="form.userNo"
                        class="flex-item mr-20"
                        hint="必填"
                        label="员工编号"
                    ></input-box>
                    <select-box
                        v-model="form.sex"
                        class="flex-item mr-20"
                        :list="sexList"
                        hint="必填"
                        label="性别"
                    ></select-box>
                    <input-box
                        v-model="form.phone"
                        class="flex-item mr-20"
                        hint="必填"
                        label="联系电话"
                    ></input-box>
                    <input-box
                        v-model="form.idCard"
                        class="flex-item mr-20"
                        hint="必填"
                        label="身份证号码"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.nativePlace"
                        class="flex-item mr-20"
                        hint="必填"
                        label="籍贯"
                    ></input-box>
                    <input-box
                        v-model="form.registered"
                        class="flex-item mr-20"
                        hint="必填"
                        label="户口所在地"
                    ></input-box>
                    <input-box
                        v-model="form.nation"
                        class="flex-item mr-20"
                        hint="必填"
                        label="民族"
                    ></input-box>
                    <input-box
                        v-model="form.address"
                        class="flex-item mr-20"
                        hint="必填"
                        label="常用住址"
                    ></input-box>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.birthday"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="出生日期"
                    ></date-picker>
                    <input-box
                        v-model="form.politicalOutlook"
                        class="flex-item mr-20"
                        hint="必填"
                        label="政治面貌"
                    ></input-box>
                    <select-box
                        v-model="form.marryStatus"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="marryList"
                        label="婚姻状况"
                    ></select-box>
                    <input-box
                        v-model="form.mail"
                        class="flex-item mr-20"
                        hint="必填"
                        label="邮箱"
                    ></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.education"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="educationList"
                        label="学历"
                    ></select-box>
                    <input-box
                        v-model="form.major"
                        class="flex-item mr-20"
                        hint="必填"
                        label="专业"
                    ></input-box>
                    <date-picker
                        v-model="form.graduationTime"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="毕业时间"
                    ></date-picker>
                    <input-box
                        v-model="form.universityFrom"
                        class="flex-item mr-20"
                        hint="必填"
                        label="毕业院校"
                    ></input-box>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.workingTime"
                        hint="必填"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="入职时间"
                    ></date-picker>
                    <select-box
                        v-model="form.userType"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="userArr"
                        label="人员类型"
                    ></select-box>
                    <select-box
                        v-model="form.postId"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="postList"
                        label="岗位名称"
                    ></select-box>
                    <!-- <select-box v-model="form.teamId" class="flex-item mr-20" hint="必填" :list="banList" label="班组名称"></select-box> -->
                    <!-- <select-box v-model="form.departId" class="flex-item mr-20" hint="必填" :list="deptList" label="归属部门"></select-box> -->
                    <input-box
                        v-model="form.departName"
                        @click="deptFlag=true"
                        hint="必填"
                        class="flex-item mr-20"
                        label="归属部门"
                    ></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.superiorId"
                        class="flex-item mr-20"
                        hint="必填"
                        :list="postList"
                        label="直属上级"
                    ></select-box>
                    <select-box
                        v-model="form.parentId"
                        class="flex-item mr-20"
                        :list="userList"
                        label="上级人员"
                    ></select-box>
                    <input-box
                        v-model="form.basePay"
                        class="flex-item mr-20"
                        type="number"
                        hint="必填"
                        label="基本工资"
                    ></input-box>
                    <input-box
                        v-model="form.meritPay"
                        class="flex-item mr-20"
                        type="number"
                        label="绩效工资"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.insuranceBase"
                        class="flex-item mr-20"
                        type="number"
                        label="保险基数"
                    ></input-box>
                    <input-box
                        v-model="form.cardNumber"
                        class="flex-item mr-20"
                        type="number"
                        label="工资卡号"
                    ></input-box>
                    <input-box
                        v-model="form.bankOfDeposit"
                        class="flex-item mr-20"
                        label="开户行"
                    ></input-box>
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
                <el-button
                    class="mr-20"
                    size="mini"
                    @click="close"
                >关闭</el-button>
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
export default {
    name: "khzb-list",
    components: { DataList, DeptSelect },
    data() {
        return {
            filter: {
                address: "",
                basePay: "",
                birthday: "",
                bloodType: "",
                createTime: "",
                createUser: "",
                education: "",
                endCreateTime: "",
                endGraduationTime: "",
                endUpdateTime: "",
                endWorkingTime: "",
                graduationTime: "",
                health: "",
                // id: 0,
                idCard: "",
                insuranceBase: "",
                mail: "",
                major: "",
                marryStatus: "",
                meritPay: "",
                nation: "",
                nativePlace: "",
                onceUserName: "",
                phone: "",
                politicalOutlook: "",
                postId: "",
                postName: "",
                registered: "",
                sex: "",
                startCreateTime: "",
                startGraduationTime: "",
                startUpdateTime: "",
                startWorkingTime: "",
                superiorId: "",
                teamId: "",
                teamName: "",
                universityFrom: "",
                updateTime: "",
                updateUser: "",
                userName: "",
                userType: "",
                workingTime: "",
            },
            layer: false,
            deptFlag: false,
            form: {
                address: "",
                basePay: 0,
                birthday: "",
                bloodType: "",
                createTime: "",
                createUser: "",
                education: "",
                endCreateTime: "",
                endGraduationTime: "",
                endUpdateTime: "",
                endWorkingTime: "",
                graduationTime: "",
                health: "",
                id: "",
                idCard: "",
                insuranceBase: 0,
                mail: "",
                major: "",
                marryStatus: 0,
                meritPay: 0,
                nation: "",
                nativePlace: "",
                onceUserName: "",
                pageNum: 0,
                pageSize: 0,
                phone: "",
                politicalOutlook: "",
                postId: "",
                postName: "",
                registered: "",
                sex: "",
                startCreateTime: "",
                startGraduationTime: "",
                startUpdateTime: "",
                startWorkingTime: "",
                superiorId: "",
                teamId: "",
                teamName: "",
                universityFrom: "",
                updateTime: "",
                updateUser: "",
                userName: "",
                userType: "",
                workingTime: "",
                departName: "",
                superiorName: "",
                superiorId: "",
                parentId: "",
                userNo: "",
                departId: "",
                bankOfDeposit: "",
                cardNumber: "",
            },
            marryArr: ["", "未婚", "已婚", "离异", "丧偶"],
            marryList: [
                {
                    text: "未婚",
                    value: "1",
                },
                {
                    text: "已婚",
                    value: "2",
                },
                {
                    text: "离异",
                    value: "3",
                },
                {
                    text: "丧偶",
                    value: "4",
                },
            ],
            educationArr: ["", "小学", "初中", "中专", "高中", "大专", "本科", "硕士", "博士"],
            educationList: [
                { text: "小学", value: "1" },
                { text: "初中", value: "2" },
                { text: "中专", value: "3" },
                { text: "高中", value: "4" },
                { text: "大专", value: "5" },
                { text: "本科", value: "6" },
                { text: "硕士", value: "7" },
                { text: "博士", value: "8" },
            ],
            sexArr: ["", "男", "女"],
            sexList: [
                { text: "男", value: "1" },
                { text: "女", value: "2" },
            ],
            banList: [],
            postList: [],
            deptList: [],
            userArr: [],
            userList: [],
            loading: false,
        };
    },
    activated() {
        this.getBanList();
        this.getDeptList();
        this.getUsers();
        this.getAllUsers();
        this.getPostList();
    },
    methods: {
        selectClick(data) {
            if (data) {
                console.log(data);
                this.form.departName = data.name;
                this.form.departId = data.id;
            }
            this.deptFlag = false;
        },
        flush() {
            this.filter = {
                address: "",
                basePay: "",
                birthday: "",
                bloodType: "",
                createTime: "",
                createUser: "",
                education: "",
                endCreateTime: "",
                endGraduationTime: "",
                endUpdateTime: "",
                endWorkingTime: "",
                graduationTime: "",
                health: "",
                idCard: "",
                insuranceBase: "",
                mail: "",
                major: "",
                marryStatus: "",
                meritPay: "",
                nation: "",
                nativePlace: "",
                onceUserName: "",
                phone: "",
                politicalOutlook: "",
                postId: "",
                postName: "",
                registered: "",
                sex: "",
                startCreateTime: "",
                startGraduationTime: "",
                startUpdateTime: "",
                startWorkingTime: "",
                superiorId: "",
                teamId: "",
                teamName: "",
                universityFrom: "",
                updateTime: "",
                updateUser: "",
                userName: "",
                userType: "",
                workingTime: "",
            };
            this.$refs.list.update(true);
            this.getBanList();
            this.getDeptList();
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.address = item.address;
            this.form.workingTime = item.workingTime;
            this.form.quotaName = item.quotaName;
            this.form.userType = item.userType;
            this.form.userName = item.userName;
            this.form.updateUser = item.updateUser;
            this.form.updateTime = item.updateTime;
            this.form.universityFrom = item.universityFrom;
            this.form.teamName = item.teamName;
            this.form.teamId = item.teamId;
            this.form.superiorId = item.superiorId;
            this.form.startWorkingTime = item.startWorkingTime;
            this.form.startUpdateTime = item.startUpdateTime;
            this.form.startGraduationTime = item.startGraduationTime;
            this.form.startCreateTime = item.startCreateTime;
            this.form.sex = item.sex + "";
            this.form.registered = item.registered;
            this.form.postName = item.postName;
            this.form.postId = item.postId;
            this.form.politicalOutlook = item.politicalOutlook;
            this.form.phone = item.phone;
            this.form.onceUserName = item.onceUserName;
            this.form.nativePlace = item.nativePlace;
            this.form.nation = item.nation;
            this.form.meritPay = item.meritPay;
            this.form.marryStatus = item.marryStatus + "";
            this.form.major = item.major;
            this.form.mail = item.mail;
            this.form.insuranceBase = item.insuranceBase;
            this.form.idCard = item.idCard;
            this.form.health = item.health;
            this.form.graduationTime = item.graduationTime;
            this.form.endWorkingTime = item.endWorkingTime;
            this.form.endUpdateTime = item.endUpdateTime;
            this.form.endGraduationTime = item.endGraduationTime;
            this.form.endCreateTime = item.endCreateTime;
            this.form.education = item.education + "";
            this.form.createUser = item.createUser;
            this.form.createTime = item.createTime;
            this.form.bloodType = item.bloodType;
            this.form.birthday = item.birthday;
            this.form.basePay = item.basePay;
            this.form.superiorId = item.superiorId;
            this.form.parentId = item.parentId;
            this.form.userNo = item.userNo;
            this.form.departId = item.departId;
            this.form.bankOfDeposit = item.bankOfDeposit;
            this.form.cardNumber = item.cardNumber;
            this.form.departName = item.departName;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-user/del/${item.id}`)
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
        add() {
            this.layer = true;
        },
        save() {
            if (
                !this.form.userName ||
                !this.form.userNo ||
                !this.form.sex ||
                !this.form.phone ||
                !this.form.idCard ||
                !this.form.nativePlace ||
                !this.form.registered ||
                !this.form.nation ||
                !this.form.address ||
                !this.form.birthday ||
                !this.form.politicalOutlook ||
                !this.form.marryStatus ||
                !this.form.mail ||
                !this.form.education ||
                !this.form.major ||
                !this.form.graduationTime ||
                !this.form.universityFrom ||
                !this.form.workingTime ||
                !this.form.userType ||
                !this.form.postId ||
                !this.form.basePay
            ) {
                this.$toast("请输入必填项");
                return;
            }
            this.loading = true;
            let url = this.form.id ? "/haolifa/pay-user/edit" : "/haolifa/pay-user/save";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.layer = false;
                    this.$toast("保存成功");
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
                address: "",
                basePay: 0,
                birthday: "",
                bloodType: "",
                createTime: "",
                createUser: "",
                education: "",
                endCreateTime: "",
                endGraduationTime: "",
                endUpdateTime: "",
                endWorkingTime: "",
                graduationTime: "",
                health: "",
                id: "",
                idCard: "",
                insuranceBase: 0,
                mail: "",
                major: "",
                marryStatus: "",
                meritPay: 0,
                nation: "",
                nativePlace: "",
                onceUserName: "",
                pageNum: 0,
                pageSize: 0,
                phone: "",
                politicalOutlook: "",
                postId: "",
                postName: "",
                registered: "",
                sex: "",
                startCreateTime: "",
                startGraduationTime: "",
                startUpdateTime: "",
                startWorkingTime: "",
                superiorId: "",
                teamId: "",
                teamName: "",
                universityFrom: "",
                updateTime: "",
                updateUser: "",
                userName: "",
                userType: "",
                workingTime: "",
                departName: "",
                superiorName: "",
                superiorId: "",
                userNo: "",
                parentId: "",
                departId: "",
                bankOfDeposit: "",
                cardNumber: "",
            };
        },
        getBanList() {
            this.banList = [];
            this.$http
                .post("/haolifa/pay-team/getAllList")
                .then((res) => {
                    res.map((item) => {
                        this.banList.push({
                            text: item.teamName,
                            value: item.id,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getDeptList() {
            this.deptList = [];
            this.$http
                .get("/haolifa/dept/list")
                .then((res) => {
                    res.map((item) => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPostList() {
            this.postList = [];
            this.$http
                .post("/haolifa/pay-production-work-shop/getAllList")
                .then((res) => {
                    res.map((item) => {
                        this.postList.push({
                            text: item.postName,
                            value: item.id + "",
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getUsers() {
            this.userArr = [];
            this.$http
                .get("/haolifa/dictionaries/getUserType")
                .then((res) => {
                    res.result.map((item) => {
                        this.userArr.push({
                            text: item.name,
                            value: item.code,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAllUsers() {
            this.userList = [];
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: "",
                    pageNum: 0,
                    pageSize: "",
                    postId: "",
                    postName: "",
                    sex: "",
                    superiorId: "",
                    teamId: "",
                    teamName: "",
                    userName: "",
                    userType: "",
                })
                .then((res) => {
                    res.map((item) => {
                        this.userList.push({
                            text: item.userName,
                            value: item.id + "",
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
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
