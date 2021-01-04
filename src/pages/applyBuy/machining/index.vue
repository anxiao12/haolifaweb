<template>
    <div class="page-material-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true)" placeholder="机加工单号" style="width: 200px;">
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <!-- <router-link to="/applyBuy-machining/add">
                <btn class="b" flat color="#008eff">创建机加工单</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="20" :param="filter" url="/haolifa/entrust/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>机加工单号</th>
                    <th>批次号</th>
                    <th>采购合同号</th>
                    <th>车间类型</th>
                    <th>加工方</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <th>加工后图号</th>
                    <th>类别</th>
                    <th>数量</th>
                    <th>发起时间</th>
                    <th>状态</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th> -->
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.entrustNo}}</td>
                    <td>{{item.batchNumber}}</td>
                    <td>{{item.purchaseNo}}</td>
                    <!-- <td>{{item.workshopType == '1' ?'内部车间':item.workshopType == '2'?'外部车间':'暂无'}}</td> -->
                    <td>{{workShopList[item.workshopType].name}}</td>
                    <td>{{item.workshopType == '0' ? '暂无':item.supplierName}}</td>
                    <td>{{item.materialGraphName}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.processedGraphNo}}</td>
                    <td>{{busTypeList[item.busType]}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{statusList[item.status+1].name}}</td>
                    <!-- <td class="t-right">
                        <a
                            href="javascript:;"
                            v-if="item.workshopType == '2' && item.status == 2"
                            style="margin-right: 3px"
                            class="blue"
                            @click="machining(item.entrustNo, 4)"
                        >处理完成</a>
                        <a href="javascript:;" v-if="item.status == 0" style="margin-right: 3px" class="blue" @click="remove(item)">删除</a>
                        <a href="javascript:;" v-if="item.status == 0" style="margin-right: 3px" class="blue" @click="initApprove(item.entrustNo, 1)">发起审批</a>
                    </td>-->
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-machining-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 0,
                status: -1,
                entrustNo: ""
            },
            statusList: [
                { status: -1, name: "全部" },
                { status: 0, name: "未提交" },
                { status: 1, name: "待审批" },
                { status: 2, name: "待加工" },
                { status: 3, name: "加工中" },
                { status: 4, name: "处理完成" },
                { status: 5, name: "审批不通过" },
                { status: 6, name: "质检完成" }
            ],
            workShopList: [
                { status: 0, name: "暂无" },
                { status: 1, name: "内部车间1" },
                { status: 2, name: "外部" },
                { status: 3, name: "内部车间2" }
            ],
            busTypeList: ["未选择", "订单需求", "生产库存"]
        };
    },
    methods: {
        machining(entrustNo, status) {
            this.initApprove(entrustNo, status);
        },
        edit(item) {
            this.$router.push(
                `/applyBuy-machining/edit?entrustNo=${item.entrustNo}`
            );
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下送检单吗？<br><b>${item.entrustNo}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/entrust/delete/${item.entrustNo}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update();
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        initApprove(entrustNo, status) {
            this.$http
                .get(`/haolifa/entrust/updateStatus/${entrustNo}/${status}`)
                .then(res => {
                    this.$refs.list.update();
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
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

select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}
</style>
