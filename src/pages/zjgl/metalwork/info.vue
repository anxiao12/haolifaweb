<template>
    <div class="abs scroll-y">
        <div class="form-content metalwork-info">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <table class="f-14">
                <tr>
                    <td style="width: 20%;"></td>
                    <td style="width: 20%;"></td>
                    <td style="width: 20%;"></td>
                    <td style="width: 20%;"></td>
                    <td style="width: 20%;"></td>
                </tr>
                <tr>
                    <td colspan="5" class="b">机加工单</td>
                </tr>
                <tr>
                    <th colspan="3">机加工单号：{{entrust.entrustNo}}</th>
                    <td colspan="2">发起日期：{{entrust.createTime}}</td>
                </tr>
                <tr>
                    <th colspan="3">采购合同号：{{entrust.purchaseNo}}</th>
                    <td colspan="2">批次号：{{entrust.batchNumber}}</td>
                </tr>
                <tr>
                    <td colspan="1" class="b">采购合同编号</td>
                    <td colspan="1" class="b">批次号</td>
                    <td colspan="1" class="b">物料名称</td>
                    <td colspan="1" class="b">物料图号</td>
                    <td colspan="1" class="b">数量</td>
                </tr>
                <tr>
                    <td colspan="1">{{entrust.purchaseNo}}</td>
                    <td colspan="1">{{entrust.batchNumber}}</td>
                    <td colspan="1">{{entrust.materialGraphName}}</td>
                    <td colspan="1">{{entrust.materialGraphNo}}</td>
                    <td colspan="1">{{entrust.number}}</td>
                </tr>
            </table>
        </div>
        <div class="mt-15 ml-20 mr-20 form-content" v-if="inspectHistory.length">
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
    name: "metalwork-info",
    data() {
        return {
            loading: false,
            entrustNo: "",
            entrust: {},
            items: [],
            inspectHistory: []
        };
    },
    created() {
        this.entrustNo = this.$route.query.inspectNo;
        this.getInfo();
        this.getInspectHistory();
    },
    methods: {
        getInfo() {
            this.$http
                .get(`/haolifa/entrust/info/${this.entrustNo}`)
                .then(res => {
                    this.entrust = res;
                    this.entrust.createTime = res.createTime.substring(0, 10);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInspectHistory() {
            this.$http
                .get(`/haolifa/material-inspect/history/list/${this.entrustNo}`)
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
.metalwork-info {
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
