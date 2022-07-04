<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.teamName" @change="
            $refs.list.update(true)" placeholder="班组名称" style="width: 200px;">
                开始时间:
                <el-date-picker v-model="filter.startCreateTime" type="date" value-format="yyyy-MM-dd" @change="$refs.list.update(true);" :editable="false" placeholder="选择年月日"></el-date-picker>结束时间:
                <el-date-picker v-model="filter.endCreateTime" type="date" value-format="yyyy-MM-dd" @change="$refs.list.update(true);" :editable="false" placeholder="选择年月日"></el-date-picker>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-team/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>班组名称</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.teamName }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.teamName" class="flex-item mr-20" label="班组名称"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.workshopName" class="flex-item mr-20" label="车间名称"></input-box>
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
    name: "jiaoxiaogongxu-list",
    components: { DataList },
    data() {
        return {
            filter: {
                endCreateTime: "",
                startCreateTime: "",
                teamName: "",
                workshopId: ""
            },
            layer: false,
            form: {
                id: "",
                pageNum: "",
                pageSize: "",
                teamName: "",
                workshopId: "",
                workshopName: ""
            },
            loading: false
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                endCreateTime: "",
                startCreateTime: "",
                teamName: "",
                workshopId: ""
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.teamName = item.teamName;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下班组名称吗？<br><b>${item.teamName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-team/del/${item.id}`)
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
        add() {
            this.layer = true;
        },
        save() {
            if (!this.form.teamName.trim()) {
                this.$toast("班组名称不能为空");
                return;
            }
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-team/edit"
                : "/haolifa/pay-team/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                id: "",
                pageNum: "",
                pageSize: "",
                teamName: "",
                workshopId: "",
                workshopName: ""
            };
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
