<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                状态:
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option value="1">代办</option>
                    <option value="2">已办</option>
                </select>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/finance/payapply/getPayAppList" method="post">
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
                        <a href="javascript:;" class="blue" @click="detail(item)">详情 |&nbsp;</a>
                        <a href="javascript:;" class="blue" @click="approveProgress(item)">审批进度</a>
                    </td>
                </template>
            </data-list>
        </div>
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
            tableForm: {
                orderNo: "",
                supplierName: "",
                status: "5"
            },
            loading: false,
            tableData: [],
            pageNum: 1,
            total: 0,
            statusList: [
                { status: "3", name: "采购中" },
                { status: "5", name: "采购完成" }
            ],
            layerDetail: false,
            info: {},
            statusArr: [
                "",
                "待审批",
                "审批中",
                "付款中",
                "审批不能过",
                "付款完成"
            ]
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
        detail(item) {
            this.layerDetail = true;
            this.info = item;
        },
        approveProgress(item) {
            this.$router.push({
                path: `/purchsemanage-purchase/approveProgress?`,
                query: { formNo: item.id, formId: "" }
            });
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
