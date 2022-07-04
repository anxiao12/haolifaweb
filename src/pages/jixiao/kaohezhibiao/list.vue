<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.projectName" @change="
            $refs.list.update(true)" placeholder="名称" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-assessment-quota/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>项目</th>
                    <th>岗位名称</th>
                    <th>考核指标</th>
                    <th>指标内容</th>
                    <th>对应分值</th>
                    <th>考核标准</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.projectName }}</td>
                    <td>{{ item.departName }}</td>
                    <td>{{ item.quotaName }}</td>
                    <td>{{ item.quotaContent }}</td>
                    <td>{{ item.score }}</td>
                    <td>{{ item.standard }}</td>
                    <td>{{ item.remark }}</td>
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
                    <input-box v-model="form.projectName" class="flex-item mr-20" hint="必填" label="项目"></input-box>
                    <input-box v-model="form.quotaName" class="flex-item mr-20" hint="必填" label="考核指标"></input-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.departId" class="flex-item mr-20" hint="必填" :list="postList" label="岗位名称"></select-box>
                    <input-box v-model="form.score" type="number" class="flex-item mr-20" label="分数"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.quotaContent" class="flex-item mr-20" label="指标内容"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.standard" class="flex-item mr-20" label="考核标准"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
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
                projectName: ""
            },
            layer: false,
            form: {
                id: "",
                projectName: "",
                quotaContent: "",
                quotaName: "",
                remark: "",
                score: 0,
                standard: "",
                departName: "",
                departId: ""
            },
            postList: [],
            loading: false
        };
    },
    mounted() {
        this.getPostList();
    },
    methods: {
        flush() {
            this.filter = {
                projectName: ""
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.projectName = item.projectName;
            this.form.quotaContent = item.quotaContent;
            this.form.quotaName = item.quotaName;
            this.form.remark = item.remark;
            this.form.score = item.score;
            this.form.standard = item.standard;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下项目吗？<br><b>${item.projectName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-assessment-quota/del/${item.id}`)
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
        getPostList() {
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
                    this.$toast(e.msg || e.message);
                });
        },
        add() {
            this.layer = true;
        },
        save() {
            if (
                !this.form.projectName.trim() ||
                !this.form.departId ||
                !this.form.quotaName.trim()
            ) {
                this.$toast("请输入必填项");
                return;
            }
            this.postList.map(item => {
                if (item.value == this.form.departId) {
                    this.form.departName = item.text;
                }
            });
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-assessment-quota/edit"
                : "/haolifa/pay-assessment-quota/save";
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
                projectName: "",
                quotaContent: "",
                quotaName: "",
                remark: "",
                score: 0,
                standard: ""
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
