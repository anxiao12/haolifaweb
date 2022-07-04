<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                状态:
                <select
                    v-model="filter.status"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value="0">全部</option>
                    <option value="1">代办</option>
                    <option value="2">已办</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/payapply/getPayAppList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>付款日期</th>
                    <th>付款单位</th>
                    <th>付款金额</th>
                    <th>审批节点</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.applyTime }}</td>
                    <td>{{ item.applyPayCompany }}</td>
                    <td>{{ item.totalPrice }}</td>
                    <td>{{ statusArr[item.status] }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="blue" @click="detail(item)">详情 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            v-if="item.status == 1 || item.status==4"
                            class="blue"
                            @click="startFinance(item.id)"
                        >发起审批 |&nbsp;</a>
                        <a href="javascript:;" class="blue" @click="approveProgress(item)">审批进度</a>
                        <a
                            href="javascript:;"
                            v-if="item.status == 1 || item.status==4"
                            class="red"
                            @click="remove(item)"
                        >| 删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <el-button class="mr-20" size="mini" type="primary" @click="addItem">选择合同</el-button>
                </div>
                <div v-for="(item,i) in form.applyDetailAddDTOList" :key="i" style="margin:0 30px;">
                    <div class="flex">
                        <input-box
                            v-model="item.purchaseOrderNo"
                            class="flex-item mr-20"
                            :disabled="true"
                            label="订单号"
                        ></input-box>
                        <input-box
                            v-model="item.price"
                            type="number"
                            class="flex-item mr-20"
                            label="金额"
                            @blur="amountChange(i)"
                        ></input-box>
                    </div>
                    <div class="flex">
                        <input-box
                            v-model="item.applyCollectionCompany"
                            class="flex-item mr-20"
                            :disabled="true"
                            label="收款单位"
                        ></input-box>
                        <input-box
                            v-model="item.applyPayCompany"
                            class="flex-item mr-20"
                            :disabled="true"
                            label="付款单位"
                        ></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.remark" class="flex-item mr-20" label="备注"></input-box>
                        <el-button
                            class="mr-20"
                            type="warning"
                            plain
                            size="mini"
                            @click="delItem(i)"
                        >删 除</el-button>
                    </div>
                    <hr style="border: 1px dashed #409EFF">
                </div>
                <div class="flex">
                    <input-box v-model="form.totalPrice" class="flex-item mr-20" label="总计"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
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
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="layerTable" title="数据列表" width="90%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    采购合同号:
                    <input
                        type="text"
                        class="flex-item"
                        v-model="tableForm.orderNo"
                        placeholder
                        style="width: 150px;"
                        @change="$refs.listOne.update(true);getDataOneNum();"
                    >
                    供方单位:
                    <input
                        type="text"
                        class="flex-item"
                        v-model="tableForm.supplierName"
                        placeholder
                        style="width: 150px;"
                        @change="$refs.listOne.update(true);getDataOneNum();"
                    >
                    订单状态:
                    <select v-model="tableForm.status" class="f-14">
                        <option
                            v-for="item in statusList"
                            :value="item.status"
                            v-bind:key="item.status"
                        >{{item.name}}</option>
                    </select>
                    <el-button type="primary" size="mini" @click="getTableData(1)">查询</el-button>
                    <el-link class="ml-20">选择采购合同金额总计：{{selectedAmount}}</el-link>
                    <el-link class="ml-20">材料费预算余额：{{balanceNum}}</el-link>
                </div>
            </div>
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    v-loading="loading"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="purchaseOrderNo" label="采购合同号"></el-table-column>
                    <el-table-column prop="supplierName" label="供方单位"></el-table-column>
                    <el-table-column prop="demander" label="采购单位"></el-table-column>
                    <el-table-column prop="paidAccount" label="已付款金额"></el-table-column>
                    <el-table-column prop="invoiceAccount" label="已开票金额"></el-table-column>
                    <el-table-column prop="totalPrice" label="采购金额"></el-table-column>
                    <el-table-column prop="deliveryTime" width="110" label="采购完成日期"></el-table-column>
                    <el-table-column prop="totalCount" width="100" label="采购总数量"></el-table-column>
                    <el-table-column prop="qualifiedNumber" width="110" label="检验合格数量"></el-table-column>
                    <el-table-column
                        prop="status"
                        label="订单状态"
                        width="80"
                        :formatter="statusFormatter"
                    ></el-table-column>
                    <el-table-column prop="payType" label="付款方式"></el-table-column>
                </el-table>
            </div>
            <el-pagination
                :page-size="50"
                :pager-count="7"
                @current-change="handleCurrentChange"
                layout="prev, pager, next,total"
                :total="total"
            ></el-pagination>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" type="primary" @click="saveSelect">保存</el-button>
                <el-button class="mr-20" size="mini" @click="layerTable=false;">关闭</el-button>
            </div>
        </layer>
        <layer v-if="layerDetail" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 20%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;"></td>
                            <td style="width: 20%;"></td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">付款单位 : {{info.applyPayCompany}}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">付款金额 : {{info.totalPrice}}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">付款日期 : {{info.applyTime}}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">备注 : {{info.remark}}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">创建日期 : {{info.createTime}}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="b">更新日期 : {{info.updateTime}}</td>
                        </tr>
                        <tr>
                            <th>订单号</th>
                            <th>金额(元)</th>
                            <th>收款单位</th>
                            <th>付款单位</th>
                            <th>备注</th>
                        </tr>
                        <tr v-for="(val,index) in info.applyDetailRSDTOList" :key="index">
                            <td colspan="1">{{val.purchaseOrderNo}}</td>
                            <td colspan="1">{{val.price}}</td>
                            <td colspan="1">{{val.applyCollectionCompany}}</td>
                            <td colspan="1">{{val.applyPayCompany}}</td>
                            <td colspan="1">{{val.remark}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layerDetail = false">关闭</btn>
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
                status: "0"
            },
            layer: false,
            form: {
                applyDetailAddDTOList: [
                    // {
                    //     applyCollectionCompany: "",
                    //     applyPayCompany: "",
                    //     payType: "",
                    //     price: 0,
                    //     purchaseOrderId: 0,
                    //     purchaseOrderNo: "",
                    //     remark: ""
                    // }
                ],
                remark: "",
                totalPrice: 0
            },
            tableForm: {
                orderNo: "",
                supplierName: "",
                status: "5"
            },
            loading: false,
            layerTable: false,
            tableData: [],
            multipleSelection: [],
            pageNum: 1,
            total: 0,
            statusList: [{ status: "3", name: "采购中" }, { status: "5", name: "采购完成" }],
            layerDetail: false,
            info: {},
            selectedAmount: 0,
            statusArr: ["", "待审批", "审批中", "付款中", "审批不通过", "付款完成"],
            balanceNum: 0
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                status: "0"
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.applyDetailAddDTOList = JSON.parse(JSON.stringify(item.applyDetailRSDTOList));
            this.form.remark = item.remark;
            this.form.totalPrice = item.totalPrice;
        },
        detail(item) {
            this.layerDetail = true;
            this.info = item;
        },
        approveProgress(item) {
            this.$router.push({
                path: `/purchsemanage-purchase/approveProgress?`,
                query: { formNo: item.id, formId: "" }
            });
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除采购订单申请吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/payapply/delete/${item.id}`)
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
        addItem() {
            this.pageNum = 1;
            this.tableData = [];
            this.layerTable = true;
            this.selectedAmount = 0;
            this.getTableData();
        },
        delItem(index) {
            this.form.applyDetailAddDTOList.splice(index, 1);
        },
        startFinance(id) {
            this.$http
                .get(`/haolifa/finance/payapply/approve/${id}`)
                .then(res => {
                    this.$toast("审批发起成功");
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getBalanceNum() {
            this.$http
                .get(`/haolifa/finance/payapply/subjects/getCurUserClfSubjectsBudget`)
                .then(res => {
                    this.balanceNum = res.balanceAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        statusFormatter(row, column, cellValue, index) {
            if (row.status == 3) {
                return "采购中";
            }
            if (row.status == 4) {
                return "采购完成";
            }
            return row.status;
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getTableData(val);
        },
        handleSelectionChange(val) {
            this.selectedAmount = 0;
            this.multipleSelection = val;
            val.map(item => {
                this.selectedAmount += item.totalPrice;
            });
            this.selectedAmount = Math.floor(this.selectedAmount * 100) / 100;
        },
        saveSelect() {
            if (this.multipleSelection.length == 0) {
                this.$toast("请选择数据");
                return;
            }
            this.multipleSelection.map(item => {
                this.form.applyDetailAddDTOList.push({
                    applyCollectionCompany: item.supplierName,
                    applyPayCompany: item.demander,
                    payType: item.payType,
                    price: item.totalPrice,
                    purchaseOrderId: item.id,
                    purchaseOrderNo: item.purchaseOrderNo,
                    remark: ""
                });
                this.form.totalPrice += item.totalPrice;
            });
            this.form.totalPrice = Math.floor(this.form.totalPrice * 100) / 100;
            this.layerTable = false;
        },
        amountChange(index) {
            this.form.totalPrice = 0;
            this.form.applyDetailAddDTOList.forEach(item => {
                this.form.totalPrice += +item.price;
            });
            this.form.totalPrice = Math.floor(this.form.totalPrice * 100) / 100;
        },

        add() {
            this.layer = true;
            this.getBalanceNum();
        },
        getTableData(page) {
            if (page) this.pageNum = page;
            this.tableData = [];
            this.loading = true;
            this.$http
                 .post("/haolifa/purchase-order/payPlanlist", {
                    pageSize: 50,
                    pageNum: 1,
                    orderType: 0,
                    orderNo: this.tableForm.orderNo,
                    supplierName: this.tableForm.supplierName,
                    status: this.tableForm.status
                })
                .then(res => {
                    this.loading = false;
                    this.tableData = res.list;
                    this.total = res.total;
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        save() {
            this.loading = true;
            let url = this.form.id ? "/haolifa/finance/payapply/updatePayApp" : "/haolifa/finance/payapply/savePayApp";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.layer = false;
                    this.$toast("保存成功");
                    this.close();
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
                applyDetailAddDTOList: [],
                remark: "",
                totalPrice: 0
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
