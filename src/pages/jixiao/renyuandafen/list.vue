<template>
    <div class="page-invoice-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <!-- <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.userName" @change="
            $refs.list.update(true)" placeholder="姓名" style="width: 200px;">

                <input type="text" class="flex-item" v-model="filter.postName" @change="
            $refs.list.update(true)" placeholder="岗位名称" style="width: 200px;">
            </div>-->
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/pay-user/getScoreUserList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>岗位名称</th>
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
                    <td>{{ item.postName }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                        >打分</a>
                        <!-- <a href="javascript:;" class="red" @click="remove(item)">删除</a> -->
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            title="打分 "
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <select-box
                        v-model="form.userId"
                        class="flex-item mr-20"
                        :disabled="true"
                        :list="userList"
                        label="姓名"
                    ></select-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.assessmentId"
                        @change="assessmentChange"
                        class="flex-item mr-20"
                        :list="assessmentList"
                        label="考核内容"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="info.standard"
                        :disabled="true"
                        class="flex-item mr-20"
                        label="考核标准"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="info.score"
                        :disabled="true"
                        class="flex-item mr-20"
                        label="对应分值"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.score"
                        class="flex-item mr-20"
                        label="分数"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        label="说明"
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
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "dafen-list",
    components: { DataList },
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
            form: {
                assessmentId: "",
                id: "",
                score: "",
                userId: "",
                userName: "",
                remark: "",
            },
            banList: [],
            postList: [],
            deptList: [],
            userArr: [],
            userList: [],
            assessmentList: [],
            loading: false,
            info: {},
        };
    },
    mounted() {
        this.getAllUsers();
    },
    methods: {
        flush() {
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.userId = item.id;
            this.form.userName = item.userName;
            this.assessmentList = [];
            this.$http
                .post("/haolifa/pay-assessment-quota/getAllList", {
                    departId: item.postId,
                    departName: "",
                    pageNum: 0,
                    pageSize: 0,
                    projectName: "",
                })
                .then((res) => {
                    if (!res.length) {
                        this.$toast("未查到该人员岗位考核数据");
                        return;
                    }
                    res.map((item) => {
                        this.assessmentList.push({
                            text: item.quotaContent,
                            value: item.id,
                            score: item.score,
                            standard: item.standard,
                        });
                    });
                    // this.form.assessmentId = res[0].id;
                    // this.info = res[0];
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        assessmentChange() {
            this.info = {};
            if (this.form.assessmentId) {
                this.assessmentList.map((item) => {
                    if (item.value == this.form.assessmentId) {
                        this.info = item;
                    }
                });
            }
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-assessment-score/del/${item.id}`)
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
            this.loading = true;
            let url = this.form.id ? "/haolifa/pay-assessment-score/edit" : "/haolifa/pay-assessment-score/save";
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
                assessmentId: "",
                id: "",
                score: "",
                userId: "",
                userName: "",
                remark: "",
            };
            this.info.standard = "";
            this.info.score = "";
        },
        getAllUsers() {
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
                            value: item.id,
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
