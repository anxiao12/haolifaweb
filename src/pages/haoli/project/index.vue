<template>
    <div class="page-invoice-list">
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
                    v-model="filter.name"
                    @change="
            $refs.list.update(true)"
                    placeholder="项目名称"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.code"
                    @change="
                $refs.list.update(true)"
                    placeholder="项目编号"
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
                url="/haolifa/finance/projectbudget/getProjectBudgetList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>单位名称</th>
                    <th>项目编号</th>
                    <th>所属部门</th>
                    <th>预算年度</th>
                    <th>预算月份</th>
                    <th>预算经费总额度</th>
                    <th>剩余额度</th>
                    <th>状态</th>
                    <th>备注</th>
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
                    <td>{{ item.name }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.year }}</td>
                    <td>{{ item.month }}</td>
                    <td>{{ item.totalQuota }}</td>
                    <td>{{ item.balanceQuota }}</td>
                    <td>{{ item.status=='1' ?'正常':'停用' }}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                        >编辑</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="remove(item)"
                        >| 删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            :title="form.id ?'编辑':'新增' "
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <input-box
                        v-model="form.name"
                        class="flex-item mr-20"
                        label="项目名称"
                    ></input-box>
                    <input-box
                        v-model="form.code"
                        class="flex-item mr-20"
                        label="项目编号"
                    ></input-box>
                    <select-box
                        v-model="form.status"
                        class="flex-item mr-20"
                        :list="statusList"
                        label="状态"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.deptName"
                        @click="deptFlag=true"
                        class="flex-item mr-20"
                        label="所属部门"
                    ></input-box>
                    <select-box
                        v-model="form.year"
                        class="flex-item mr-20"
                        :list="yearList"
                        label="预算年份"
                    ></select-box>
                    <select-box
                        v-model="form.month"
                        class="flex-item mr-20"
                        :list="monthList"
                        label="预算月份"
                    ></select-box>
                </div>
                <div class="flex">
                    <!-- <input-box
                        v-model="form.balanceQuota"
                        class="flex-item mr-20"
                        label="剩余额度"
                    ></input-box> -->
                    <input-box
                        v-model="form.totalQuota"
                        class="flex-item mr-20"
                        label="预算经费总额度"
                    ></input-box>
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        label="备注"
                    ></input-box>
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
    name: "khzb-list",
    components: { DataList, DeptSelect },
    data() {
        return {
            filter: {
                code: "",
                name: "",
            },
            subjectsList: [],
            form: {
                balanceQuota: null,
                code: "",
                deptId: null,
                deptName: "",
                id: null,
                month: "",
                name: "",
                remark: "",
                status: "",
                totalQuota: null,
                year: "",
            },
            statusList: [
                { text: "启用", value: "1" },
                { text: "停用", value: "2" },
            ],
            loading: false,
            layer: false,
            monthList: [
                { value: "01", text: "1月" },
                { value: "02", text: "2月" },
                { value: "03", text: "3月" },
                { value: "04", text: "4月" },
                { value: "05", text: "5月" },
                { value: "06", text: "6月" },
                { value: "07", text: "7月" },
                { value: "08", text: "8月" },
                { value: "09", text: "9月" },
                { value: "10", text: "10月" },
                { value: "11", text: "11月" },
                { value: "12", text: "12月" },
            ],
            yearList: [
                { value: "2018", text: "2018" },
                { value: "2019", text: "2019" },
                { value: "2020", text: "2020" },
                { value: "2021", text: "2021" },
                { value: "2022", text: "2022" },
                { value: "2023", text: "2023" },
                { value: "2024", text: "2024" },
                { value: "2025", text: "2025" },
                { value: "2026", text: "2026" },
                { value: "2027", text: "2027" },
                { value: "2028", text: "2028" },
                { value: "2029", text: "2029" },
            ],
            deptFlag: false,
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                code: "",
                name: "",
            };
            this.$refs.list.update(true);
        },
        selectClick(data) {
            if (data) {
                console.log(data);
                this.form.deptName = data.name;
                this.form.deptId = data.id;
            }
            this.deptFlag = false;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/projectbudget/delete/${item.id}`)
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
        edit(item) {
            Object.keys(this.form).forEach((key) => {
                this.form[key] = item[key];
            });
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id ? "/haolifa/finance/projectbudget/updateProjectBudget" : "/haolifa/finance/projectbudget/save";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.form = {
                balanceQuota: null,
                code: "",
                deptId: null,
                deptName: "",
                id: null,
                month: "",
                name: "",
                remark: "",
                status: "",
                totalQuota: null,
                year: "",
            };
            this.layer = false;
        },
    },
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
