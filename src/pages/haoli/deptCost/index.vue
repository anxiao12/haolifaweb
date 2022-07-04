<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <!-- <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.name" @change="getList" placeholder="名称" style="width: 200px;">
            </div>
            <div class="flex-item"></div>-->
            <!-- <btn class="b" flat color="#008eff" @click="add">新增</btn> -->
        </div>
        <div class="flex-item scroll-y">
            <el-tree ref="tree" :data="data" :default-expand-all="true" :node-click="nodeClick" node-key="id" :props="defaultProps">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span class="tree-span ml-20">
                        <el-link style="margin-left:50px">{{data.costRatioFormulaCN}}</el-link>
                        <el-link style="margin-left:50px">{{data.description}}</el-link>
                        <el-button style="margin-left:100px" type="text" size="mini" @click="() => edit(data)">编辑</el-button>
                        <el-button class="ml-20" type="text" size="mini" @click="() => remove(data)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </div>
        <layer v-if="layer" title="编辑" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.deptId" class="flex-item mr-20" :list="deptList" :disabled="true" label="选择部门"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.costRatio" class="flex-item mr-20" label="比例（1-100）"></input-box>
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
    name: "khzb-list",
    components: { DataList },
    data() {
        return {
            filter: {
                deptId: "",
                deptPid: "",
                name: "",
                pageNum: 1,
                pageSize: 9999
            },
            statusList: [
                { text: "正常", value: "1" },
                { text: "禁用", value: "2" }
            ],
            subjectList: [],
            layer: false,
            form: {
                costRatio: 0,
                deptId: "",
                remark: ""
            },
            deptList: [],
            data: [],
            defaultProps: {
                label: "name",
                children: "childList"
            }
        };
    },
    activated() {
        this.getDeptList();
        this.getList();
    },
    methods: {
        flush() {
            this.filter = {
                deptId: "",
                deptPid: "",
                name: "",
                pageNum: 1,
                pageSize: 9999
            };
            this.getList();
            this.getDeptList();
        },
        subChange() {
            if (this.form.subjectsId) {
                this.subjectList.map(item => {
                    if (this.form.subjectsId == item.value) {
                        this.form.name = item.text;
                    }
                });
            }
        },
        getList() {
            this.$http
                .post(
                    "/haolifa/finance/costbudget/dept/getDeptBudgetList",
                    this.filter
                )
                .then(res => {
                    this.data = res;
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        nodeClick() {},
        add() {
            this.layer = true;
        },
        edit(item) {
            this.form = {
                costRatio: item.costRatio,
                deptId: item.id + "",
                remark: item.description
            };
            this.layer = true;
        },
        save() {
            this.loading = true;
            // let url = this.form.id
            //     ? "/haolifa/finance/costbudget/dept/saveOrUp"
            //     : "/haolifa/finance/costbudget/dept/save";
            this.$http
                .post("/haolifa/finance/costbudget/dept/saveOrUp", this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.getList();
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.form = {
                costRatio: 0,
                deptId: "",
                remark: ""
            };
            this.layer = false;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(
                            `/haolifa/finance/costbudget/dept/delete/${item.id}`
                        )
                        .then(res => {
                            this.$toast("删除成功");
                            this.getList();
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        getDeptList() {
            this.$http
                .get("/haolifa/dept/list")
                .then(res => {
                    res.map(item => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id + ""
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
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
