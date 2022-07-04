<template>
    <div class="page-department flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="layer=true">新增部门</btn>
        </div>
        <div class="flex-item scroll-y">
            <table class="data-table">
                <tr>
                    <th style="width: 60px">序号</th>
                    <th>部门名称</th>
                    <th>备注</th>
                    <td style="width: 100px;text-align: right;">操作</td>
                </tr>
                <tr v-for="(item, i) in list" :key="item.id">
                    <td>{{i}}</td>
                    <td>{{item.deptName}}</td>
                    <td>{{item.description || '-'}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="red" @click="remove(item)">删除</a>
                    </td>
                </tr>
            </table>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑部门' : '新增部门'" width="400px">
            <div class="layer-text">
                <input-box v-model="form.deptName" label="部门名称"></input-box>
                <input-box v-model="form.description" label="备注" multi-line></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-department",
    components: { DataList },
    data() {
        return {
            layer: false,
            list: [],
            form: {
                id: "",
                deptName: "",
                description: "",
                pid: 0
            }
        };
    },
    created() {
        this.getList();
    },
    methods: {
        flush() {
            this.getList();
        },
        getList() {
            this.$http
                .get("/haolifa/dept/list")
                .then(res => {
                    this.list = res;
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        edit(item) {
            for (let key in this.form) this.form[key] = item[key];
            this.layer = true;
        },
        remove(item) {
            const id = item.id;
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下部门吗？<br><b>${item.deptName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http({
                        method: "delete",
                        url: "haolifa/dept",
                        data: id,
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(res => {
                            this.$toast("删除成功");
                            this.getList();
                        })
                        .catch(e => {
                            this.$toast(e.message || e.msg);
                        });
                }
            });
        },
        cancel() {
            this.form.id = this.form.deptName = this.form.description = "";
            this.layer = false;
        },
        submit() {
            const { form } = this;
            const method = form.id === "" ? "post" : "put";
            this.$http[method]("/haolifa/dept", form)
                .then(res => {
                    this.getList();
                    this.$toast("保存成功");
                    this.cancel();
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
};
</script>

<style lang="less">
.page-department {
    .scroll-y {
        padding: 0 10px;
    }
}
</style>
