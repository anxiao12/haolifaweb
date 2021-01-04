<template>
    <div class="abs scroll-y">
        <div class="form-content page-supplier-info">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <table class="f-14">
                <tr>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                    <td style="width: 10%;"></td>
                </tr>
                <tr>
                    <td colspan="11" class="b">零件送检单</td>
                </tr>
                <tr>
                    <th colspan="5">送检单号：{{inspect.inspectNo}}</th>
                    <td colspan="6">发起日期：{{inspect.createTime}}</td>
                </tr>
                <tr>
                    <th colspan="5">采购合同号：{{inspect.purchaseNo}}</th>
                    <td colspan="6">批次号：{{inspect.batchNumber}}</td>
                </tr>
                <tr>
                    <th colspan="5">供应商：{{inspect.supplierName}}</th>
                    <td colspan="6">到货日期：{{inspect.arrivalTime}}</td>
                </tr>
                <tr>
                    <td colspan="1" class="b">序号</td>
                    <td colspan="1" class="b">合同编号</td>
                    <td colspan="1" class="b">物料名称</td>
                    <td colspan="1" class="b">物料图号</td>
                    <td colspan="1" class="b">规格</td>
                    <td colspan="1" class="b">材质与标准要求</td>
                    <td colspan="1" class="b">单位</td>
                    <td colspan="1" class="b">采购数</td>
                    <td colspan="1" class="b">送货数</td>
                    <td colspan="1" class="b">不合格数量</td>
                    <td colspan="1" class="b">备注</td>
                </tr>
                <tr v-for="(item,i) in items" :key="i">
                    <td colspan="1">{{i+1}}</td>
                    <td colspan="1">{{item.purchaseNo}}</td>
                    <td colspan="1">{{item.materialName}}</td>
                    <td colspan="1">{{item.materialGraphNo}}</td>
                    <td colspan="1">{{item.specification}}</td>
                    <td colspan="1">{{item.requirements}}</td>
                    <td colspan="1">{{item.unit}}</td>
                    <td colspan="1">{{item.purchaseNumber}}</td>
                    <td colspan="1">{{item.deliveryNumber}}</td>
                    <td colspan="1">{{item.unqualifiedNumber}}</td>
                    <td colspan="1">{{item.remark}}</td>
                </tr>
            </table>
        </div>
        <div class="mt-15 ml-20 mr-20" v-if="inspectHistory.length" style="overflow-x: auto">
            <div class="b f-18 flex-v-center ml-20" style="margin-bottom: 20px;">
                <div class="flex-item">质检记录</div>
            </div>
            <div class="flex-item scroll-y ml-20">
                <table class="data-table">
                    <tr>
                        <th>质检单号</th>
                        <th>类别</th>
                        <th>物料名称</th>
                        <th>物料图号</th>
                        <th>检测数量</th>
                        <th>合格数量</th>
                        <th>不合格数量</th>
                        <th>处理意见</th>
                        <th>不合格现象描述</th>
                    </tr>
                    <tr v-for="(item, i) in inspectHistory" :key="i">
                        <td>{{item.inspectNo}}</td>
                        <td>{{item.type == 1?'采购零件':'机加工零件'}}</td>
                        <td>{{item.materialGraphName}}</td>
                        <td>{{item.materialGraphNo}}</td>
                        <td>{{item.testNumber}}</td>
                        <td>{{item.qualifiedNumber}}</td>
                        <td>{{item.unqualifiedNumber}}</td>
                        <td>{{item.handlingSuggestion}}</td>
                        <td>{{item.remark}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
// import parseJson from '@/utils/parseJson'
export default {
    name: "purchsemanage-purchaseinfo",
    data() {
        return {
            loading: false,
            inspect: {
                id: 0,
                inspectNo: ""
            },
            items: [],
            inspectHistory: []
        };
    },
    created() {
        this.inspect.id = this.$route.query.id;
        this.inspect.inspectNo = this.$route.query.inspectNo;
        this.getInfo();
        this.getInspectHistory();
    },
    methods: {
        getInfo() {
            this.$http
                .get(`/haolifa/material-inspect/info/${this.inspect.id}`)
                .then(res => {
                    this.inspect = res.inspect;
                    this.items = res.items;
                    this.inspect.createTime = res.inspect.createTime.substring(
                        0,
                        10
                    );
                    this.inspect.arrivalTime = res.inspect.arrivalTime.substring(
                        0,
                        10
                    );
                    this.inspect.updateTime = res.inspect.updateTime.substring(
                        0,
                        10
                    );
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInspectHistory() {
            this.$http
                .get(
                    `/haolifa/material-inspect/history/list/${
                        this.inspect.inspectNo
                    }`
                )
                .then(res => {
                    this.inspectHistory = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
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
