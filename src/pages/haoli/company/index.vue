<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.name"
                    @change="
            $refs.list.update(true)"
                    placeholder="单位名称"
                    style="width: 200px;"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.code"
                    @change="
                $refs.list.update(true)"
                    placeholder="编码"
                    style="width: 200px;"
                />
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/company/getCompanyList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>单位名称</th>
                    <th>编码</th>
                    <th>户名</th>
                    <th>账号</th>
                    <th>开户行</th>
                    <th>所属市</th>
                    <th>所属省</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.accountName }}</td>
                    <td>{{ item.cardNumber }}</td>
                    <td>{{ item.bankOfDeposit }}</td>
                    <td>{{ item.cityName }}</td>
                    <td>{{ item.provinceName }}</td>
                    <td>{{ item.status=='1' ?'正常':'停用' }}</td>
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
                    <input-box v-model="form.name" class="flex-item mr-20" label="单位名称"></input-box>
                    <input-box v-model="form.code" class="flex-item mr-20" label="编码"></input-box>
                    <select-box v-model="form.status" class="flex-item mr-20" :list="statusList" label="状态"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.accountName" class="flex-item mr-20" label="户名"></input-box>
                    <input-box v-model="form.cardNumber" class="flex-item mr-20" label="单位账号"></input-box>
                    <input-box v-model="form.bankOfDeposit" class="flex-item mr-20" label="开户行"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.provinceName" class="flex-item mr-20" label="所属省"></input-box>
                    <input-box v-model="form.cityName" class="flex-item mr-20" label="所属市"></input-box>
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
                code: "",
                name: ""
            },
            subjectsList: [],
            form: {
                accountName: "",
                bankOfDeposit: "",
                cardNumber: "",
                cityName: "",
                code: "",
                name: "",
                provinceName: "",
                remark: "",
                status: ""
            },
            statusList: [
                { text: "启用", value: "1" },
                { text: "停用", value: "2" }
            ],
            loading: false,
            layer: false
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                code: "",
                name: ""
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
                        .get(`/haolifa/finance/company/delete/${item.id}`)
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
        edit(item) {
            Object.keys(this.form).forEach(key => {
                this.form[key] = item[key];
            });
            this.form.id = item.id;
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/finance/company/updateCompany"
                : "/haolifa/finance/company/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.form = {
                accountName: "",
                bankOfDeposit: "",
                cardNumber: "",
                cityName: "",
                code: "",
                name: "",
                provinceName: "",
                remark: "",
                status: ""
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
