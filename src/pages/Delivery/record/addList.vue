<template>
    <div class="page-part-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.contractOrderNo" @change="$refs.list.update(true)" placeholder="订单号">
                <select v-model="filter.deliveryClassify" @change="$refs.list.update(true)">
                    <option value="0">发货分类</option>
                    <option v-for="item in classifyList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <router-link to="/delivery-record/add">
                <btn class="b" flat color="#008eff">新增发货记录</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/delivery/pageList" method="post">
                <tr slot="header">
                    <th>合同订单号</th>
                    <th>发货通知单号</th>
                    <th>发货分类</th>
                    <th>发货日期/到货日期</th>
                    <th>客户代号</th>
                    <th>成品发货数量</th>
                    <th>承运单位</th>
                    <th>省市</th>
                    <th>运费总金额</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item }">
                    <td>{{item.contractOrderNo}}</td>
                    <td>{{item.deliveryNoticeNo}}</td>
                    <td>{{classifyList[item.deliveryClassify-1].text}}</td>
                    <td>{{item.deliveryTime}}</td>
                    <td>{{item.customerNo}}</td>
                    <td>{{item.productCount}}</td>
                    <td>{{item.transportCompany}}</td>
                    <td>{{item.collectProvince}}</td>
                    <td>{{item.totalFee}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <!-- <icon-btn small @click="edit(item)">edit</icon-btn> -->
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a>

                        <!-- <icon-btn small @click="remove(item)">delete</icon-btn> -->
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-delivery-record-list",
    components: { DataList },
    data() {
        return {
            classifyList: [],
            filter: {
                contractOrderNo: "",
                deliveryClassify: 0
            }
        };
    },
    created() {
        this.getClassifyList();
    },
    methods: {
        edit(item) {
            this.$router.push(`/delivery-record/edit?id=${item.id}`);
        },
        getClassifyList() {
            this.$http.get("/haolifa/delivery/getClassifyList").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.code, text: item.name };
                });
            });
        }
    }
};
</script>

<style lang="less">
.page-part-list {
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
}

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
