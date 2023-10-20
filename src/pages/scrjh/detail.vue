<template>
    <div class="page-jishu-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)"
                    placeholder="订单号" style="width: 200px;">
                计划日期：
                <el-date-picker v-model="filter.planDate" type="date" value-format="yyyy-MM-dd"
                    @change="$refs.list.update(true);" :editable="false" placeholder="选择年月日"
                    style="width: 200px;"></el-date-picker>
                计划状态：
                <select v-model="filter.planStatus" class="f-14" @change="$refs.list.update(true)">
                    <option value="">全部</option>
                    <option v-for="item, index in statusList" :value="item.value" :key="index">{{ item.text }}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
            <btn class="b" flat color="#008eff" @click="back">返回</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/production-daily-plan/detail/page"
                method="post" :borderFlag="true">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>订单数量</th>
                    <th>完成数量</th>
                    <th>发货日期</th>
                    <th>计划日期</th>
                    <th>计划完成日期</th>
                    <th>实际完成日期</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item,index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.orderNo }}</td>
                    <td>{{ item.orderNumber }}</td>
                    <td>{{ item.finishNumber }}</td>
                    <td>{{ item.deliveryDate }}</td>
                    <td>{{ item.planDate }}</td>
                    <td>{{ item.planFinishDate }}</td>
                    <td>{{ item.actualFinishDate }}</td>
                    <td>{{ formatter(item.planStatus) }}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |</a>
                        <a href="javascript:;" class="red" @click="del(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-show="addLayer" title="新增" width="80%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="planDate" class="flex-item" label="计划日期" :disabled="true"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="remark" class="flex-item" label="备注"></input-box>
                </div>
                <div class="flex">
                    <div class="flex-item mr-20">

                        <label class="mt-5" for="">订单状态:</label>
                        <el-select v-model="param.orderStatus" placeholder="请选择" size="mini" class="ml-5"
                            @change="orderStatusChange">
                            <el-option v-for="item in orderStatusList" :key="item.value" :label="item.text"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="flex-item mr-20">
                        订单号:
                        <el-input size="mini" type="text" style="width:60%" @change="orderStatusChange"
                            v-model="param.orderNo"></el-input>
                    </div>
                    <div class="flex-item mr-20">
                        发货开始时间:
                        <el-date-picker size="mini" v-model="param.deliveryStartDate" type="date" value-format="yyyy-MM-dd"
                            @change="orderStatusChange" :editable="false" placeholder="选择年月日"></el-date-picker>
                    </div>
                    <div class="flex-item mr-20">
                        发货结束时间:
                        <el-date-picker size="mini" v-model="param.deliveryEndDate" type="date" value-format="yyyy-MM-dd"
                            @change="orderStatusChange" :editable="false" placeholder="选择年月日"></el-date-picker>
                    </div>
                </div>
                <div class="layer-text" style="padding-bottom: 50px;">
                    <el-table :data="tableData" v-loading="loading" tooltip-effect="dark" style="width: 100%"
                        ref="multipleTable" size="mini" :row-class-name="tableRowClassName"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="orderNo" label="订单号"></el-table-column>
                        <el-table-column prop="demandName" label="需方"></el-table-column>
                        <el-table-column prop="totalCount" label="订单数量"></el-table-column>
                        <el-table-column prop="deliveryDate" label="发货日期"></el-table-column>
                        <el-table-column prop="createTime" label="创建时间"></el-table-column>
                        <el-table-column label="是否已经关联日计划">
                            <template slot-scope="scope">
                                {{ scope.row.associationPlan == 1 ? "是" : "否" }}
                            </template>
                        </el-table-column>
                        <el-table-column label="计划完成日期">
                            <template slot-scope="scope">
                                <el-date-picker v-model="addForm[scope.row.number].planFinishDate" type="date"
                                    placeholder="选择日期" value-format="yyyy-MM-dd" size="mini">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="addLoading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="addClose">关闭</el-button>
            </div>
        </layer>
        <layer v-show="editLayer" title="编辑" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.orderNo" class="flex-item" label="订单号" :disabled="true"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.planDate" class="flex-item" label="计划日期" :disabled="true"></input-box>
                </div>
                <div class="flex">
                    <date-picker v-model="form.planFinishDate" hint="必填" class="flex-item" label="计划完成日期"></date-picker>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item" label="备注"></input-box>
                </div>
            </div>

            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="editSave">保存</el-button>
                <el-button class="mr-20" size="mini" @click="editClose">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "auto-con-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            filter: {
                orderNo: "",
                planDate: "",
                planId: this.$route.query.id,
                planStatus: "",
            },
            planDate: this.$route.query.date,
            remark: "",
            statusList: [
                { text: "待完成", value: "wait" },
                { text: "部分完成", value: "part" },
                { text: "已完成", value: "completed" },
            ],
            addLayer: false,
            editLayer: false,
            form: {
                id: "",
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                planId: "",
                remark: "",
            },
            loading: false,
            addLoading: false,
            tableData: [],
            param: {
                orderNo: "",
                orderStatus: 6,
                deliverStatus: -1,
                startDate: "",
                endDate: "",
                deliveryStartDate: "",
                deliveryEndDate: "",
                demandName: "",
                pageNum: 1,
                pageSize: 100,
            },
            orderStatusList: [
                { value: 4, text: "核料完成" },
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
            ],
            addForm: [
                // { id: 0, orderNo: "", planDate: "", planFinishDate: "", planId: 0, remark: "" }
            ],
            selectedList: [],
        };
    },
    // created() {
    //     let id = this.$route.query.id;
    //     this.filter = {
    //         orderNo: "",
    //         planDate: "",
    //         planId: id,
    //         planStatus: "",
    //     };
    //     this.planDate = this.$route.query.date;
    //     this.$refs.list.update(true);
    // },
    activated() {
        let id = this.$route.query.id;
        this.filter = {
            orderNo: "",
            planDate: "",
            planId: id,
            planStatus: "",
        };
        this.planDate = this.$route.query.date;
        this.$refs.list.update(true);
        setTimeout(() => {
            this.$refs.list.update(true);
        }, 1000);
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                planDate: "",
                planId: this.$route.query.id,
                planStatus: "",
            };
            this.$refs.list.update(true);
        },
        add() {
            this.param.deliveryStartDate = "";
            this.param.deliveryEndDate = "";
            this.param.orderNo = "";
            this.param.orderStatus = 6;
            this.addLayer = true;
            this.getOrderList();
        },
        orderStatusChange() {
            this.$refs.multipleTable.clearSelection();
            this.selectedList = [];
            this.getOrderList();
        },
        back() {
            this.filter.planId = "";
            this.$store.commit("DELMENUTABS", "/scrjhDetail");
            this.$router.push("/scrjhList");
        },
        getOrderList() {
            this.loading = true;
            this.tableData = [];
            this.addForm = [];
            this.form = { payOrderUserRelationProcedureList: [] };
            this.$http
                .post(`/haolifa/production-daily-plan/order-product/page`, this.param)
                .then((res) => {
                    this.loading = false;
                    if (!res) {
                        return;
                    }
                    this.tableData = res.list;
                    this.tableData.map((item, index) => {
                        item.number = index;
                        this.addForm.push({
                            orderNo: item.orderNo,
                            planDate: this.$route.query.date,
                            planFinishDate: "",
                            remark: "",
                            id: "",
                            planId: this.$route.query.id,
                        });
                    });
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        handleSelectionChange(rows) {
            this.selectedList = rows;
        },
        edit(item) {
            this.editLayer = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = item[key];
            });
        },
        save() {
            if (!this.selectedList.length) {
                this.$toast("请选择订单");
                return;
            }
            let selectedFlag = false;
            this.selectedList.forEach((item) => {
                if (!this.addForm[item.number].planFinishDate) {
                    selectedFlag = true;
                }
            });
            if (selectedFlag) {
                this.$toast("请输入被选择订单的计划完成日期");
                return;
            }
            let form = [];
            this.selectedList.forEach((item) => {
                this.addForm[item.number].remark = this.remark;
                form.push(this.addForm[item.number]);
            });
            this.addLoading = true;
            let url = "/haolifa/production-daily-plan/detail/add";
            this.$http
                .post(url, form)
                .then((res) => {
                    this.addClose();
                    this.$toast("保存成功");
                    this.addLoading = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.addLoading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        detail(item) {
            this.$router.push(`/scrjhDetail?id=${item.planId}`);
        },
        formatter(val) {
            if (val == "wait") {
                return "待完成";
            } else if (val == "part") {
                return "部分完成";
            } else if (val == "completed") {
                return "已完成";
            } else {
                return val;
            }
        },
        selectable(row, index) {
            return row.associationPlan == 1 ? false : true;
        },
        editSave() {
            if (!this.form.planFinishDate) {
                this.$toast("请输入必填项");
                return;
            }
            this.loading = true;
            let url = "/haolifa/production-daily-plan/detail/update";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.editClose();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        editClose() {
            this.editLayer = false;
            this.form = {
                id: "",
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                planId: "",
                remark: "",
            };
        },
        addClose() {
            this.addLayer = false;
            this.addForm = [];
        },
        del(item) {
            this.$confirm({
                title: "删除完成确认",
                text: `您确定删除吗`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/production-daily-plan/detail/delete/${item.id}`)
                        .then((res) => {
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        tableRowClassName(row, rowIndex) {
            if (row.row.associationPlan == 1) {
                return "warning-row";
            } else {
                return "";
            }
        },
    },
};
</script>

<style lang="less">
.page-jishu-list {
    .warning-row {
        color: #ef736f;
    }

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

    .t-border {
        // tr{
        border: 1px solid #ccc // }
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

select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}

.page-supplier-info {
    padding: 30px 20px;

    tr:first-child td {
        padding: 0;
        border: none;
    }

    th {
        font-weight: normal;
        color: #888;
    }

    td {
        color: #444;
    }

    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }

    .checkbox-list {
        flex-wrap: wrap;
    }

    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}
</style>
