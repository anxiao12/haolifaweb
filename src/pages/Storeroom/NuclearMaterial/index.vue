<template>
    <div class="page-part-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar"></div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :param="filter" url="/haolifa/order-product/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单编号</th>
                    <th style="width:50px;">订单合同URL</th>
                    <th>合同状态</th>
                    <th>发货时间</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>
                        <a class="fixed-length" :href="item.orderContractUrl" :title="item.orderContractUrl">{{item.orderContractUrl}}</a>
                    </td>
                    <td>{{statusList[item.orderStatus-2].text}}</td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.updateTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" v-if="item.orderStatus == 2" @click="nuclear(item)" style="margin-right: 3px;">核料</a>
                        <a href="javascript:;" class="blue" v-if="item.orderStatus != 2" @click="nuclearForm(item)" style="margin-right: 3px;">核料清单</a>
                        <a href="javascript:;" class="blue" v-if="item.orderStatus != 2" @click="releaseForm(item.orderNo)" style="margin-right: 3px;">释放料</a>
                        <a href="javascript:;" class="blue" v-if="item.orderStatus == 3" @click="replaceForm(item)" style="margin-right: 3px;">替换料清单</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-orders-list",
    components: { DataList },
    data() {
        return {
            loading: false,
            filter: {
                // 待核料
                orderStatusList: [2, 3, 4]
            },
            statusList: [
                { value: 2, text: "待核料" },
                { value: 3, text: "替换料审批" },
                { value: 4, text: "核料完成" }
            ]
        };
    },
    methods: {
        flush() {
            this.$refs.list.update(true);
        },
        nuclear(item) {
            this.$router.push(`/nuclear-material?orderNo=${item.orderNo}`);
        },
        nuclearForm(item) {
            this.$router.push(`/nuclear-form?orderNo=${item.orderNo}`);
        },
        replaceForm(item) {
            this.$router.push(`/nuclear-replace-form?orderNo=${item.orderNo}`);
        },
        releaseForm(orderNo) {
            this.$http
                .post(
                    `/haolifa/order-product/release-material/?orderNo=${orderNo}`
                )
                .then(res => {
                    this.$toast("释放料成功");
                    this.$http
                        .post(`/haolifa/order-product/updateStatus`, {
                            orderNo: orderNo,
                            status: 2
                        })
                        .then(res => {
                            this.$refs.list.update(true);
                        });
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast("释放料失败");
                });
        }
    }
};
</script>

<style lang="less">
.page-part-list {
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
