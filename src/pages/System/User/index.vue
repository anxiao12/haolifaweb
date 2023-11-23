<template>
    <div class="page-user">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <!-- <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" placeholder="姓名" style="width: 200px;">
            </div>-->
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="addUser">新增用户</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="datalist" url="/haolifa/user" method="get" class="f-14">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>用户名</th>
                    <th>部门</th>
                    <th>岗位</th>
                    <th>角色</th>
                    <th>地区</th>
                    <!-- <th>状态</th> -->
                    <th class="t-right" style="width: 100px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{ index }}</td>
                    <td>{{ item.realName }}</td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.departName }}</td>
                    <td>{{ item.postName }}</td>
                    <td>{{ item.roles.map(item => item.description).toString() || '-' }}</td>
                    <td>{{ item.location }}</td>
                    <!-- <td>{{item.username}}</td> -->
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="withRole(item.id)">关联角色</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="关联角色" width="45%">
            <div class="layer-text" style="padding-bottom: 300px;height:800px">
                <select-box :list="roles" v-model="roleId" label="请选择角色"></select-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="layer = false">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
        <layer v-if="userLayer" :title="form.id ? '编辑' : '添加'" width="50%">
            <div class="layer-text" style="padding-bottom: 150px;">
                <select-box v-model="form.userNo" class="flex-item mr-20" :list="userList" label="人员选择"></select-box>
                <input-box v-model="form.username" class="flex-item mr-10" label="用户名"></input-box>
                <input-box v-model="form.password" class="flex-item" label="密码"></input-box>
                <select-box v-model="form.location" class="flex-item mr-20" :list="locationList" label="地区选择"></select-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel">取消</btn>
                <btn flat color="#008eff" @click="userSubmit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import moment from "moment";
import DataList from "@/components/datalist";
export default {
    name: "page-user",
    components: { DataList },
    data() {
        return {
            layer: false,
            userLayer: false,
            roles: [],
            location: "",
            userList: [],
            locationList: [
                // {
                //   text:'北京',
                //   value:'北京'
                // },
                //  {
                //   text:'山西',
                //   value:'山西'
                // },
            ],
            roleIds: [],
            roleId: "",
            id: "",
            form: {
                id: "",
                username: "",
                password: "",
                location: "",
                realName: "",
                userNo: "",
                sex: 0,
                nativePlace: "",
                phone: "",
                idCard: "",
                entryTime: "",
                departId: "",
                postId: ""
            },
            userArr: []
        };
    },
    activated() {
        this.$refs.datalist.update(true);
        this.getUserList();
        this.getLocation()
    },
    methods: {
        getLocation() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/DATA_LOCATION`)
                .then(res => {
                    this.locationList = res.map(res => {
                        return {
                            text: res.desc,
                            value: res.code
                        }
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        flush() {
            this.$refs.datalist.update(true);
        },
        remove(item) {
            const id = item.id;
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.realName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`haolifa/user/${id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.datalist.update();
                        })
                        .catch(e => {
                            this.$toast(e.message || e.msg);
                        });
                }
            });
        },
        withRole(id) {
            this.layer = true;
            this.id = id;
            this.roleIds = [];
            this.getRoles();
        },
        getRoles() {
            this.$http
                .get("/haolifa/role")
                .then(res => {
                    res.forEach(item => {
                        item.value = item.id;
                        item.text = item.description;
                    });
                    this.roles = res;
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        submit() {
            this.roleIds.push(this.roleId);
            this.$http
                .post(`/haolifa/user/${this.id}/role`, this.roleIds)
                .then(res => {
                    this.$toast("保存成功");
                    this.layer = false;
                    this.roleId = "";
                    this.roleIds = [];
                    this.$refs.datalist.update();
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        userSubmit() {
            if (
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
                    // this.form.location = item.location;
                }
            });
            const method = this.form.id ? "put" : "post";
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
                        location: "",
                        userId: ""
                    };
                    this.$toast("保存成功");
                    this.userLayer = false;
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        addUser() {
            this.userLayer = true;
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
                            value: item.userNo
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        cancel() {
            this.userLayer = false;
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
                postId: ""
            };
        },
        edit(item) {
            this.userLayer = true;
            this.getUser(item.id);
        },
        getUser(id) {
            this.$http.get("/haolifa/user/" + id).then(res => {
                for (let key in this.form) this.form[key] = res[key];
                this.form.entryTime = moment(res.entryTime).format(
                    "YYYY-MM-DD"
                );
                this.form.password = "";
            });
        }
    }
};
</script>

<style lang="less">
.page-user {
    //
}
</style>
