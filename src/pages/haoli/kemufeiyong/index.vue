<template>
    <div class="page-kemu-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.name" @change="
            $refs.list.update(true)" placeholder="费用明细" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.deptName" @change="
            $refs.list.update(true)" placeholder="部门名称" style="width: 200px;">
                费用类别:
                <select v-model="filter.subjectsTypeCode" class="f-14" @change="$refs.list.update(true);">
                    <option value>全部</option>
                    <option v-for="(item,i) in subjectList" :value="item.value">{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/costbudget/subjects/getSubjectsBudgetList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>费用类别</th>
                    <th>费用明细</th>
                    <th>部门</th>
                    <th>费用</th>
                    <th>余额</th>
                    <th>备注</th>
                    <th>更新时间</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.subjectsName }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.costRatioFormulaCN }}</td>
                    <td>{{ item.balanceAmount }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td>{{ item.createTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="添加" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.subjectsType" class="flex-item mr-20" :list="subjectList" @change="subjectsTypeChange" label="选择费用类别"></select-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.subjectsId" class="flex-item mr-20" :list="subjectList2" @change="subChange" label="选择费用明细"></select-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.deptId" class="flex-item mr-20" :list="deptList" label="选择部门"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.costRatio" class="flex-item mr-20" label="比例（1-100）"></input-box>
                </div>
                <!-- <div class="flex">
                    <select-box v-model="form.status" class="flex-item mr-20" :list="statusList" label="状态"></select-box>
                </div>-->
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
                deptName: "",
                name: "",
                subjectsId: "",
                subjectsTypeCode: ""
            },
            statusList: [
                { text: "正常", value: "1" },
                { text: "禁用", value: "2" }
            ],
            subjectList: [],
            subjectList2: [],
            layer: false,
            form: {
                costRatio: "",
                deptId: "",
                name: "",
                remark: "",
                // status: "1",
                subjectsId: "",
                subjectsType: ""
            },
            deptList: []
        };
    },
    activated() {
        this.getSubjectList();
        this.getDeptList();
    },
    methods: {
        flush() {
            this.filter = {
                deptId: "",
                deptName: "",
                name: "",
                subjectsId: "",
                subjectsTypeCode: ""
            };
            this.$refs.list.update(true);
            this.getSubjectList();
            this.getDeptList();
        },
        getSubjectList() {
            this.$http
                .get("/haolifa/sys-dict/getDictListByType/SUBJECTS_TYPE")
                .then(res => {
                    this.subjectList = [];
                    res.map(item => {
                        this.subjectList.push({
                            text: item.desc,
                            value: item.code
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        subjectsTypeChange(type) {
            this.subjectList2 = [];
            if (!type) {
                this.form.subjectsId = "";
            }
            this.$http
                .post("/haolifa/finance/subjects/getSubjectsListAllP", {
                    pageNum: 1,
                    pageSize: 1000,
                    subjectsType: this.form.subjectsType
                })
                .then(res => {
                    res.map(item => {
                        this.subjectList2.push({
                            text: item.name,
                            value: item.id
                        });
                    });
                });
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
        add() {
            this.layer = true;
        },
        edit(item) {
            this.form = {
                costRatio: item.costRatio,
                deptId: item.deptId,
                name: item.name,
                remark: item.remark,
                subjectsId: item.subjectsId,
                id: item.id,
                subjectsType: item.subjectsTypeCode
            };
            this.subjectsTypeChange(2);
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/finance/costbudget/subjects/updateSubjectsBudget"
                : "/haolifa/finance/costbudget/subjects/saveSubjectsBudget";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.form = {
                costRatio: "",
                deptId: "",
                name: "",
                remark: "",
                subjectsType: "",
                // status: "1",
                subjectsId: ""
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
                            `/haolifa/finance/costbudget/subjects/deleteSubjectsBudget/${
                                item.id
                            }`
                        )
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
        getDeptList() {
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
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-kemu-list {
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
