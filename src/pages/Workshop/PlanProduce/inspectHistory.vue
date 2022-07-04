<template>
    <div class="abs scroll-y">
        <div class="form-content page-supplier-info">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$store.commit('DELMENUTABS', '/jhgl-scddlb/inspect');$router.back()">arrow_back</icon-btn>
                <div class="flex-item">质检记录</div>
            </div>
        </div>
        <div class="mt-15 ml-20 mr-20" v-if="inspectHistory.length">
            <div class="flex-item scroll-y ml-20" v-for="(item, i) in inspectHistory" :key="i">
                <table class="data-table">
                    <tr>
                        <th>订单号</th>
                        <th>型号</th>
                        <th>规格</th>
                        <th>检测数量</th>
                        <th>合格数量</th>
                        <th>不合格数量</th>
                        <th>不合格原因</th>
                    </tr>
                    <tr>
                        <td>{{item.orderNo}}</td>
                        <td>{{item.productModel}}</td>
                        <td>{{item.productSpecifications}}</td>
                        <td>{{item.testingNumber}}</td>
                        <td>{{item.qualifiedNumber}}</td>
                        <td>{{item.unqualifiedNumber}}</td>
                        <th colspan="2">{{item.reasonArr.toString()}}</th>
                    </tr>
                </table>
                <hr>
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
            orderNo: "",
            inspectHistory: []
        };
    },
    activated() {
        this.inspectHistory = [];
        this.orderNo = this.$route.query.orderNo;
        this.getInspectHistory();
    },
    created() {
        this.orderNo = this.$route.query.orderNo;
        this.getInspectHistory();
    },
    methods: {
        getInspectHistory() {
            let params = {
                orderNo: this.orderNo,
                storageStatus: 0,
                pageNum: 1,
                pageSize: 10000,
                inspectNo: ""
            };
            this.$http
                .post(`/haolifa/pro-inspect/pageInfo`, params)
                .then(res => {
                    this.inspectHistory = res.list;
                    this.inspectHistory.map(item => {
                        return (item.reasonArr = item.reasonList.map(obj => {
                            if (obj.number)
                                return (
                                    "数量:" +
                                    obj.number +
                                    ",原因:" +
                                    obj.reason +
                                    ";"
                                );
                        }));
                    });
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
