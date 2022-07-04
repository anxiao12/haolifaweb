<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff" @click="add">新增</btn> -->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-assessment-score/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>人员</th>
                    <!-- <th>考核指标</th> -->
                    <th>分数</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.userName }}</td>
                    <!-- <td>{{ item.assessmentName }}</td> -->
                    <td>{{ item.score }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="detail(item)">详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="quotaContent" label="指标内容"></el-table-column>
                    <el-table-column prop="quotaName" label="考核指标"></el-table-column>
                    <el-table-column prop="standard" label="考核标准"></el-table-column>
                    <el-table-column prop="score" label="扣分"></el-table-column>
                    <el-table-column prop="remark" label="说明"></el-table-column>
                    <el-table-column prop="createTime" label="打分日期"></el-table-column>
                </el-table>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" @click="layer = false;">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "jiaoxiaodafen-list",
    components: { DataList },
    data() {
        return {
            filter: {},
            layer: false,
            form: {
                id: "",
                assessmentId: "",
                score: "",
                scoreTime: "",
                userId: ""
            },
            loading: false,
            tableData: []
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.assessmentId = item.assessmentId;
            this.form.score = item.score;
            this.form.userId = item.userId;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员打分吗？<br><b>${item.userId}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-assessment-score/del/${item.id}`)
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
        detail(item) {
            this.layer = true;
            this.tableData = [];
            this.$http
                .get("/haolifa/pay-assessment-score/info/" + item.id)
                .then(res => {
                    this.tableData = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        save() {
            if (!this.form.postName.trim()) {
                this.$toast("岗位名称不能为空");
                return;
            }
            if (!this.form.postCode.trim()) {
                this.$toast("岗位序号不能为空");
                return;
            }
            if (!this.form.departName.trim()) {
                this.$toast("车间名称不能为空");
                return;
            }
            if (!this.form.workType.trim()) {
                this.$toast("工种类别不能为空");
                return;
            }
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-production-work-shop/edit"
                : "/haolifa/pay-production-work-shop/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                id: "",
                postCode: "",
                postName: "",
                workType: "",
                departName: ""
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
