<template>
    <div class="page-department flex-col">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add()"
            >新增部门</btn>
        </div>
        <div class="flex-item scroll-y">
            <el-tree
                ref="tree"
                :data="data"
                :default-expand-all="true"
                :node-click="nodeClick"
                node-key="id"
                :props="defaultProps"
            >
                <span
                    class="custom-tree-node"
                    slot-scope="{ node, data }"
                >
                    <span>{{ node.label }}</span>
                    <span class="tree-span">
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => add(data)"
                        >新增</el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => edit(data)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            size="mini"
                            @click="() => remove(node, data)"
                        >删除</el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <layer
            v-if="layer"
            :title="form.id ? '编辑部门' : '新增部门'"
            width="400px"
        >
            <div class="layer-text">
                <!-- <select-box v-model="name1" :list="allDeptList" @change="aa" label="父部门名称"></select-box> -->
                <input-box
                    v-model="form.pidName"
                    @click="deptFlag=true"
                    class="flex-item mr-20"
                    label="父部门名称"
                ></input-box>
                <!-- <el-select
                    class="mycs"
                    style="width:100%"
                    v-model="form.pid"
                    placeholder="父部门名称"
                >
                    <el-option
                        v-for="(obj,j) in allDeptList"
                        :key="j"
                        :label="obj.text"
                        :value="obj.value"
                    ></el-option>
                </el-select> -->
                <input-box
                    v-model="form.deptName"
                    label="部门名称"
                ></input-box>
                <input-box
                    v-model="form.deptNo"
                    label="部门编号"
                ></input-box>
                <input-box
                    v-model="form.description"
                    label="备注"
                    multi-line
                ></input-box>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    @click="cancel"
                >取消</btn>
                <btn
                    flat
                    color="#008eff"
                    @click="submit"
                >保存</btn>
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
    name: "page-department",
    components: { DataList, DeptSelect },
    data() {
        return {
            layer: false,
            deptFlag: false,
            list: [],
            data: [],
            defaultProps: {
                label: "name",
                children: "childList",
            },
            form: {
                id: "",
                deptName: "",
                description: "",
                deptNo: "",
                pid: "",
                pidName: "",
            },
            allDeptList: [],
        };
    },
    created() {
        this.getList();
        this.getDeptList();
    },
    activated() {
        this.getDeptList();
    },
    methods: {
        selectClick(data) {
            if (data) {
                this.form.pidName = data.name;
                this.form.pid = data.id;
            }
            this.deptFlag = false;
        },
        flush() {
            this.getList();
            this.getDeptList();
        },
        getList() {
            this.$http
                .get("/haolifa/dept/departmentTree")
                .then((res) => {
                    this.data = res;
                })
                .catch((e) => {
                    this.$toast(e.message || e.msg);
                });
        },
        getDeptList() {
            this.$http
                .get(`/haolifa/dept/list`)
                .then((res) => {
                    this.allDeptList = res.map((item) => {
                        return {
                            text: item.deptName,
                            value: item.id + "",
                        };
                    });
                    console.log(this.allDeptList);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        nodeClick() {},
        add(data) {
            this.layer = true;
            if (data) {
                this.form.pid = data.id;
                this.form.pidName = data.name;
            } else {
                this.form.pid = "";
            }
        },
        edit(item) {
            console.log(item);
            this.layer = true;
            this.form.id = item.id;
            this.form.pid = item.parentId;
            this.form.pidName = item.parentName;
            this.form.deptName = item.name;
            this.form.description = item.description;
            this.form.deptNo = item.no;
        },
        remove(node, item) {
            const id = item.id;
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下部门吗？<br><b>${item.name}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http({
                        method: "delete",
                        url: `haolifa/dept/${item.id}`,
                        data: id,
                        headers: { "Content-Type": "application/json" },
                    })
                        .then((res) => {
                            this.$toast("删除成功");
                            this.getList();
                            this.getDeptList();
                        })
                        .catch((e) => {
                            this.$toast(e.message || e.msg);
                        });
                },
            });
        },
        cancel() {
            this.form.id = this.form.pid = this.form.deptName = this.form.description = this.form.deptNo = this.form.pidName = "";
            this.layer = false;
        },
        submit() {
            const { form } = this;
            const method = form.id === "" ? "post" : "put";
            this.$http[method]("/haolifa/dept", form)
                .then((res) => {
                    this.getList();
                    this.getDeptList();
                    this.$toast("保存成功");
                    this.cancel();
                    this.form.id = this.form.deptName = this.form.description = this.deptNo = "";
                })
                .catch((e) => {
                    this.$toast(e.message || e.msg);
                });
        },
    },
};
</script>

<style lang="less">
.page-department {
    .scroll-y {
        padding: 0 10px;
    }
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.mycs {
    input {
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 0;
    }
}
</style>
