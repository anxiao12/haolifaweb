<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.materialName" @change="$refs.list.update(true)" placeholder="名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.materialGraphNo" @change="$refs.list.update(true)" placeholder="图号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)" placeholder="订单号" style="width: 200px;">

                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in allStatus" :value="item.value" v-bind:key="item.id">{{item.text}}</option>
                </select>
            </div>
            <!-- <btn class="b" flat @click="mergeData" color="#008eff">合并采购合同</btn> -->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/applyBuy/list" method="get">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <!-- <th>
                        <input type="checkbox" name v-model="all" @change="selectAll">
                    </th>-->
                    <th>订单号</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <th>数量</th>
                    <th>发起时间</th>
                    <th>到货时间</th>
                    <th>状态</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th>-->
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index,i }">
                    <td class="c-a">{{index}}</td>
                    <!-- <td v-if="item.status==2">
                        <input type="checkbox" name="boxId" :value="i">
                    </td>-->
                    <!-- <td v-else></td> -->
                    <td>{{item.productOrderNo}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.purchaseNumber}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.arrivalTime}}</td>
                    <td>{{allStatus[item.status].text}}</td>
                    <!--<td class="t-right">
                        <a href="javascript:;" v-if="item.status==2" style="margin-right: 3px" class="blue" @click="dealApplyBuy(item.id)">处理完成</a>
                    </td>-->
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-order-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 0,
                status: -1,
                materialName: "",
                orderNo: "",
                materialGraphNo: ""
            },
            allStatus: [
                { value: 0, text: "未处理" },
                { value: 1, text: "待审批" },
                { value: 2, text: "待采购" },
                { value: 3, text: "已处理" },
                { value: 4, text: "审批不通过" },
                { value: -1, text: "全部" }
            ],
            all: false
        };
    },
    methods: {
        flush() {
            this.filter = {
                type: 0,
                status: -1,
                materialName: "",
                orderNo: "",
                materialGraphNo: ""
            };
            this.$refs.list.update(true);
        },
        dealApplyBuy(itemId) {
            this.$http
                .post(`/haolifa/applyBuy/updateStatus/${itemId}`)
                .then(res => {
                    this.$toast("处理成功");
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast("处理失败");
                });
        },
        selectAll() {
            let arr = document.getElementsByName("boxId");
            if (this.all) {
                for (let i in arr) {
                    arr[i].checked = true;
                }
            } else {
                for (let j in arr) {
                    arr[j].checked = false;
                }
            }
        },
        listHasName(list, name) {
            let flag = false;
            if (list.length === 0) {
                return flag;
            }
            list.map(item => {
                if (name == item.materialGraphNo) {
                    flag = true;
                    return flag;
                }
            });
            return flag;
        },
        mergeData() {
            let list = this.$refs.list.list;
            let arr = document.getElementsByName("boxId"),
                dataList = [],
                ids = [],
                dataArr = [];
            for (let i in arr) {
                if (arr[i].checked) {
                    if (!dataArr.includes(list[arr[i].value].materialGraphNo))
                        dataArr.push(list[arr[i].value].materialGraphNo);
                    //合并订单中图号一样的数据
                    if (
                        this.listHasName(
                            dataList,
                            list[arr[i].value].materialGraphNo
                        )
                    ) {
                        dataList.map(item => {
                            if (
                                item.materialGraphNo ==
                                list[arr[i].value].materialGraphNo
                            ) {
                                item.purchaseNumber =
                                    item.purchaseNumber +
                                    list[arr[i].value].purchaseNumber;
                            }
                        });
                    } else {
                        dataList.push(list[arr[i].value]);
                    }
                    ids.push(list[arr[i].value].id);
                }
            }
            if (dataArr.length == 0) {
                this.$toast("请至少选中一条数据!");
                return;
            }
            this.$http
                .post("/haolifa/supplier/supplier-list", { graphNos: dataArr })
                .then(res => {
                    if (res.length === 0) {
                        this.$toast("未找到供应商");
                        return;
                    } else {
                        this.$router.push({
                            name: "order-purchaseAdd",
                            params: {
                                list: dataList,
                                supList: res,
                                ids: ids
                            }
                        });
                    }
                })
                .catch(e => {
                    this.$toast("处理失败");
                });
        }
    }
};
</script>

<style lang="less">
.page-material-list {
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
