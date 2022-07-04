<template>
    <div class="page-user-add">
        <div class="form-content">
            <div class="title b f-18 mb-20">新增用户</div>
            <div class="flex-v-center">
                <select-box v-model="form.userNo" class="flex-item mr-20" :list="userList" label="人员选择"></select-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.username" class="flex-item mr-10" label="用户名"></input-box>
                <input-box v-model="form.password" class="flex-item" label="密码"></input-box>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel2">取消1</btn>
                <btn big flat @click="clear">清空</btn>
            </div>
        </div>
    </div>
</template>

<script>
import form from "./form";
import moment from "moment";

export default {
    name: "page-user-add",
    data() {
        return {
            editPwd: true,
            form: JSON.parse(JSON.stringify(form)),
            userList: [],
            userArr: []
        };
    },
    activated() {
        this.getUserList();
        if (this.$route.query.id && this.$route.name === "user-edit") {
            this.editPwd = false;
            this.getUser();
        }
    },
    methods: {
        getUser() {
            const id = this.$route.query.id;
            this.$http.get("/haolifa/user/" + id).then(res => {
                for (let key in this.form) this.form[key] = res[key];
                this.form.entryTime = moment(res.entryTime).format(
                    "YYYY-MM-DD"
                );
                this.form.password = "";
            });
        },
        clear() {
            this.form = JSON.parse(JSON.stringify(form));
        },
        cancel2() {
            this.$store.commit("DELMENUTABS", "/user-add");
            this.$router.back();
        },
        verify() {
            const { form } = this;
            let res = true;
            for (let key in form) {
                if (form[key] === "" && key !== "id" && key !== "password") {
                    this.$toast(`请输入 ${key}`);
                    res = false;
                }
            }
            if (this.editPwd && !form.password) res = false;
            return res;
        },
        submit() {
            // if (!this.verify()) return;
            if (
                !this.form.userNo ||
                !this.form.username ||
                !this.form.password
            ) {
                this.$toast(`请输入必填项`);
                return;
            }
            this.userArr.map(item => {
                if (this.form.userNo == item.userNo) {
                    this.form.realName = item.userName;
                    this.form.sex = item.sex;
                    this.form.nativePlace = item.nativePlace;
                    this.form.phone = item.phone;
                    this.form.idCard = item.idCard;
                    this.form.entryTime = item.workingTime;
                    this.form.departId = item.departId;
                    this.form.postId = item.postId;
                }
            });
            const method = "post";
            this.$http[method]("/haolifa/user", this.form)
                .then(res => {
                    this.form = {
                        id: "",
                        username: "",
                        password: "",
                        realName: "",
                        userNo: "",
                        sex: 0,
                        nativePlace: "",
                        phone: "",
                        idCard: "",
                        entryTime: "",
                        departId: "",
                        postId: "",
                        userId: ""
                    };
                    this.$store.commit("DELMENUTABS", "/user-add");
                    this.$router.push("/user");
                    this.$toast("保存成功");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        getDeptList() {
            this.deptList = [];
            this.$http
                .get("/haolifa/dept/list")
                .then(res => {
                    res.map(item => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        getPostList() {
            this.postList = [];
            this.$http
                .post("/haolifa/pay-production-work-shop/getAllList")
                .then(res => {
                    res.map(item => {
                        this.postList.push({
                            text: item.postName,
                            value: item.id
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        getUserList() {
            this.userList = [];
            this.userArr = [];
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: "",
                    pageNum: "",
                    pageSize: "",
                    postId: "",
                    postName: "",
                    sex: "",
                    superiorId: "",
                    teamId: "",
                    teamName: "",
                    userName: "",
                    userType: ""
                })
                .then(res => {
                    this.userArr = res;
                    res.map(item => {
                        this.userList.push({
                            text: item.userName,
                            value: item.userNo + ""
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
};
</script>

<style lang="less">
.page-user-add {
    padding: 30px 20px;
}
</style>
