<template>
    <div class="page-part-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.contractOrderNo" @change="$refs.list.update(true)"
                    placeholder="订单号" style="width: 200px;">
                发货状态:
                <select v-model="filter.deliverStatus" class="f-14" @change="$refs.list.update(true)">
                    <option value="-1">全部</option>
                    <option value="0">待发货</option>
                    <option value="1">部分发货</option>
                    <option value="2">发货完成</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <router-link to="/delivery-bills/add">
                <btn class="b" flat color="#008eff">新增发货通知单</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/delivery/noticeList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>发货通知单号</th>
                    <th style="width:50px;">发货通知单</th>
                    <th>订单号</th>
                    <th>地区</th>
                    <th>发货状态</th>
                    <th>发货日期</th>
                    <th>订单总数量</th>
                    <th>已发货数量</th>
                    <th>审批结果</th>
                    <th>审批信息</th>
                    <th>审批时间</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.deliveryNo }}</td>
                    <td>
                        <a class="fixed-length" :href="item.deliveryUrl" :title="item.deliveryUrl">{{ item.deliveryUrl
                        }}</a>
                    </td>
                    <td>{{ item.contractOrderNo }}</td>
                    <td>{{ item.location }}</td>
                    <td>{{ deliverStatusList[item.deliverStatus] }}</td>
                    <td>{{ item.planDeliveryTime }}</td>
                    <td>{{ item.totalCount }}</td>
                    <td>{{ item.deliveredNumber }}</td>
                    <td>{{ statusList[item.auditResult] }}</td>
                    <td>{{ item.auditInfo }}</td>
                    <td>{{ item.auditTime }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" v-if="item.auditResult != 2" class="blue"
                            @click="edit(item.id)">编辑</a>
                        <a href="javascript:;" v-if="item.showAddDeliveryRecord" class="blue" @click="addRecord(item)">|
                            添加发货记录</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-bills-list",
    components: { DataList },
    data() {
        return {
            filter: {
                deliverStatus: 0,
                contractOrderNo: "",
                deliveryNo: "",
                auditResult: "1",
            },
            statusList: { 0: "待审核", 1: "审核通过", 2: "审核不通过" },
            deliverStatusList: { 0: "待发货", 1: "部分发货", 2: "发货完成" },
        };
    },
    methods: {
        flush() {
            this.filter = {
                deliverStatus: 0,
                contractOrderNo: "",
                deliveryNo: "",
                auditResult: "1",
            };
            this.$refs.list.update(true);
        },
        edit(id) {
            this.$router.push(`/delivery-bills/edit?id=${id}`);
        },
        addRecord(item) {
            this.$router.push(`/delivery-record/add?contractOrderNo=${item.contractOrderNo}&deliveryNoticeNo=${item.deliveryNo}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下发货通知单吗？<br>${item.deliveryNo}`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/material/delete/${item.id}`)
                        .then((res) => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg);
                        });
                },
            });
        },
    },
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
}

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
