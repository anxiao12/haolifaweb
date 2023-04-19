<template>
    <div class="page-jiaoxiaogongxu-list">
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
                    v-model="filter.departName"
                    @change="
            $refs.list.update(true)"
                    placeholder="部门名称"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.capacityCode"
                    @change="
            $refs.list.update(true)"
                    placeholder="能力代码"
                    style="width: 200px;"
                >
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
                url="/haolifa/pay-production_capacity/getList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>人员</th>
                    <th>部门</th>
                    <th>班组</th>
                    <th>能力代码</th>
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
                    <td>{{ item.departName }}</td>
                    <td>{{ item.teamName }}</td>
                    <td>{{ item.capacityCode }}</td>
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
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <el-select
                        class="flex-item mr-10 mycs"
                        v-model="form.departId"
                        filterable
                        placeholder="部门选择"
                        @change="deptChange"
                    >
                        <el-option
                            v-for="(obj,j) in deptList"
                            :key="j"
                            :label="obj.deptName"
                            :value="obj.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex">
                    <el-select
                        class="flex-item mr-10 mycs"
                        v-model="form.userId"
                        filterable
                        placeholder="人员选择"
                    >
                        <el-option
                            v-for="(obj,j) in userList"
                            :key="j"
                            :label="obj.userName"
                            :value="obj.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex">
                    <el-select
                        class="flex-item mr-10 mycs"
                        v-model="capacityCode"
                        :multiple="true"
                        filterable
                        placeholder="能力序号"
                    >
                        <el-option
                            v-for="(obj,j) in procedureList"
                            :key="j"
                            :label="obj.text"
                            :value="obj.value"
                        ></el-option>
                    </el-select>
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
    name: "jiaoxiaogongxu-list",
    components: { DataList },
    data() {
        return {
            filter: {
                capacityCode: "",
                departId: "",
                departName: "",
                id: "",
                teamId: "",
                userName: "",
            },
            layer: false,
            form: {
                capacityCode: "",
                departId: "",
                departName: "",
                id: "",
                pageNum: 0,
                pageSize: 0,
                teamId: "",
                userId: "",
                userName: "",
            },
            deptId: [],
            userList: [],
            deptList: [],
            loading: false,
            procedureList: [],
            capacityCode: [],
        };
    },
    mounted() {
        this.getDeptList();
    },
    methods: {
        flush() {
            this.filter = {
                capacityCode: "",
                departId: "",
                departName: "",
                id: "",
                teamId: "",
                userName: "",
            };
            this.$refs.list.update(true);
            // this.getUsers();
        },
        getUsers(name) {
            this.userList = [];
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    // departName: name,
                    departName: "",
                    id: "",
                    pageNum: 0,
                    pageSize: 0,
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
                        //选择生产的人员
                        if (item.userType == "0") {
                            this.userList.push(item);
                        }
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.userName = item.userName;
            this.form.departId = item.departId;
            this.form.userId = item.userId;
            let name = "";
            this.deptList.map((item) => {
                if (item.id == this.form.departId) {
                    name = item.deptName;
                }
            });
            if (name) {
                this.getUsers(name);
                this.getProcedureList(name);
            }
            this.form.teamId = item.teamId;
            this.capacityCode = item.capacityCode.split(",");
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-production_capacity/del/${item.id}`)
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
            if (!this.form.departId) {
                this.$toast("请选择部门");
                return;
            }
            if (!this.form.userId) {
                this.$toast("请选择人员");
                return;
            }
            if (!this.capacityCode.length) {
                this.$toast("请选择能力序号");
                return;
            }
            this.deptList.map((item) => {
                if (this.form.departId == item.id) {
                    this.form.departName = item.deptName;
                }
            });
            this.userList.map((item) => {
                if (item.id == this.form.userId) {
                    this.form.userName = item.userName;
                    this.form.teamId = item.teamId;
                }
            });
            this.form.capacityCode = this.capacityCode.toString();
            this.loading = true;
            let url = this.form.id ? "/haolifa/pay-production_capacity/edit" : "/haolifa/pay-production_capacity/save";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        getProcedureList(name) {
            this.procedureList = [];
            this.$http
                .post("/haolifa/pay-working-procedure/getAllList", {
                    id: "",
                    pageNum: "",
                    pageSize: "",
                    postCapability: "",
                    postCode: "",
                    postName: "",
                    productModel: "",
                    serial: "",
                    workType: "",
                    workshopName: name,
                })
                .then((res) => {
                    res.map((item) => {
                        this.procedureList.push({
                            text: item.postName,
                            value: item.postCode,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getDeptList() {
            this.$http
                .get("/haolifa/dept/list")
                .then((res) => {
                    res.map((item) => {
                        this.deptList.push(item);
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                capacityCode: "",
                departId: "",
                departName: "",
                id: "",
                pageNum: 0,
                pageSize: 0,
                teamId: "",
                userId: "",
                userName: "",
            };
            this.capacityCode = [];
        },
        deptChange() {
            let name = "";
            this.form.userId = "";
            this.deptList.map((item) => {
                if (item.id == this.form.departId) {
                    name = item.deptName;
                }
            });
            if (name) {
                this.form.userName = "";
                this.capacityCode = [];
                this.getUsers(name);
                this.getProcedureList(name);
            }
        },
    },
};
</script>

<style lang="less">
.page-jiaoxiaogongxu-list {
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

    .mycs {
        input {
            border: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 0;
            // background: #f5f5f5;
        }
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
