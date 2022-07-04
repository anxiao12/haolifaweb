<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="
            $refs.list.update(true);
            getPriceTotal();
          " placeholder="生产订单号" style="width: 200px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.constractParty" @change="
            $refs.list.update(true);
            getPriceTotal();
          " placeholder="合同方" style="width: 200px;">
                发票状态：
                <select v-model="filter.status" class="f-14" @change="
            $refs.list.update(true);
            getPriceTotal();
          ">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{ item.name }}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item" style="text-align:right;color:#0f95ff">发票总金额(元):{{ priceTotal }}</div>
            <!-- <router-link to="/jgzx-invoice/add">
      <btn class="b" flat color="#008eff">新增发票申请</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/invoice/list/0" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>合同编号</th>
                    <th>合同方</th>
                    <th>合同金额</th>
                    <th>开票金额</th>
                    <th>状态</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th> -->
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.orderNo }}</td>
                    <td>{{ item.constractParty }}</td>
                    <td>{{ item.orderAmount }}</td>
                    <td>{{ item.totalAmount }}</td>
                    <td>{{ statusArr[item.status].name }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <!-- <td class="t-right">
                        <a href="javascript:;" v-if="item.status == 1" class="blue" @click="remove(item)">删除</a>
                    </td>-->
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "invoice-list",
    components: { DataList },
    data() {
        return {
            priceTotal: "",
            statusList: [
                { status: -1, name: "全部" },
                { status: 0, name: "待开票" },
                { status: 1, name: "已申请" },
                { status: 2, name: "已开票" }
            ],
            statusArr: [
                { status: 0, name: "待开票" },
                { status: 1, name: "已申请" },
                { status: 2, name: "已开票" }
            ],
            filter: {
                type: 1,
                status: -1,
                orderNo: "",
                constractParty: ""
            }
        };
    },
    mounted() {
        this.getPriceTotal();
    },
    methods: {
        flush() {
            this.filter = {
                type: 1,
                status: -1,
                orderNo: "",
                constractParty: ""
            };
            this.$refs.list.update(true);
            this.getPriceTotal();
        },
        edit(item) {
            this.$router.push(`/jgzx-invoice/edit?id=${item.id}`);
        },
        getPriceTotal() {
            this.$http
                .post(`/haolifa/statistics/money/invoice/1`, this.filter)
                .then(res => {
                    this.priceTotal = res.totalAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下发票吗？<br><b>${item.invoiceNo}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/invoice/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
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
