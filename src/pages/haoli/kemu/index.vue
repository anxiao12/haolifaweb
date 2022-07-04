<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.name" @change="
            $refs.list.update(true)" placeholder="费用明细" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.code" @change="
                $refs.list.update(true)" placeholder="编码" style="width: 200px;">
                费用类别：
                <select v-model="filter.type" class="f-14" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="item in subjectsList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/subjects/getSubjectsList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>费用明细</th>
                    <!-- <th>父科目</th> -->
                    <th>费用类别</th>
                    <!-- <th>级别</th> -->
                    <th>编码</th>
                    <th>科目描述</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.name }}</td>
                    <!-- <td>{{ item.percent }}</td> -->
                    <td>{{ item.typeCN }}</td>
                    <!-- <td>{{ item.level }}</td> -->
                    <td>{{ item.code }}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑</a>
                        <a href="javascript:;" class="blue" @click="remove(item)">| 删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.name" class="flex-item mr-20" label="费用明细"></input-box>
                    <input-box v-model="form.code" class="flex-item mr-20" label="编码"></input-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.type" class="flex-item mr-20" :list="subjectsList" label="费用类别"></select-box>
                    <input-box v-model="form.remark" class="flex-item mr-20" label="科目描述"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
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
                code: "",
                id: "",
                level: "",
                name: "",
                parentId: "",
                percent: "",
                remark: "",
                type: ""
            },
            subjectsList: [],
            form: {
                code: "",
                level: 0,
                name: "",
                parentId: "",
                percent: "",
                remark: "",
                type: ""
            },
            loading: false,
            layer: false
        };
    },
    mounted() {
        this.getDic();
    },
    methods: {
        flush() {
            this.filter = {
                code: "",
                id: "",
                level: "",
                name: "",
                parentId: "",
                percent: "",
                remark: "",
                type: ""
            };
            this.$refs.list.update(true);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/subjects/delete/${item.id}`)
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
        getDic() {
            this.$http
                .get("/haolifa/sys-dict/getDictListByType/SUBJECTS_TYPE")
                .then(res => {
                    this.subjectsList = [];
                    res.map(item => {
                        this.subjectsList.push({
                            text: item.desc,
                            value: item.code
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        add() {
            this.layer = true;
        },
        edit(item) {
            this.form = {
                code: item.code,
                level: item.level,
                id: item.id,
                name: item.name,
                parentId: item.parentId,
                percent: item.percent,
                remark: item.remark,
                type: item.type
            };
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/finance/subjects/updateSubjects"
                : "/haolifa/finance/subjects/save";
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
                code: "",
                level: 0,
                name: "",
                parentId: "",
                percent: "",
                remark: "",
                type: ""
            };
            this.layer = false;
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
