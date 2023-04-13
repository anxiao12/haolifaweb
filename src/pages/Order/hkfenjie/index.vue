<template>
    <div class="page-orders-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.certificateNumber"
                    @change="$refs.list.update(true)"
                    placeholder="凭证号"
                    style="width: 200px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.collectCompany"
                    @change="$refs.list.update(true)"
                    placeholder="收款单位"
                    style="width: 200px"
                />
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.payCompany"
                    @change="$refs.list.update(true)"
                    placeholder="付款单位"
                    style="width: 200px"
                />
                分解状态：
                <select
                    v-model="filter.contractStatus"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value="">全部</option>
                    <option
                        v-for="item in newOrderStatusList"
                        :value="item.value"
                        v-bind:key="item.value"
                    >
                        {{ item.text }}
                    </option>
                </select>
                <!-- 发货状态：
                <select v-model="filter.deliverStatus" class="f-14" @change="$refs.list.update(true);getOrderQty()">
                    <option value="-1">全部</option>
                    <option value="0">待发货</option>
                    <option value="1">部分发货</option>
                    <option value="2">发货完成</option>
                </select>-->
                <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/finance/billContract/billList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px">序号</th>
                    <th>日期</th>
                    <th>凭证号</th>
                    <th>记账类别</th>
                    <th>收款单位</th>
                    <th>付款单位</th>
                    <th>收款账户</th>
                    <th>收款方式</th>
                    <th>收款类别</th>
                    <th>收款</th>
                    <th>分解状态</th>
                    <th>已分解金额</th>
                    <th>剩余分解金额</th>
                    <th>部门</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th
                        class="t-right"
                        style="width: 80px"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.operateDate }}</td>
                    <td>{{ item.certificateNumber }}</td>
                    <td>{{ billTypeArr[item.billType] }}</td>
                    <td>{{ item.collectCompany }}</td>
                    <td>{{ item.payCompany }}</td>
                    <td>{{ item.payAccount }}</td>
                    <td>{{ item.payWay }}</td>
                    <td>{{ getPayName(item.collectionType) }}</td>
                    <td>{{ item.collectionMoney }}</td>
                    <td>{{ item.contractStatusCN }}</td>
                    <td>{{ item.decomposeAmount }}</td>
                    <td>{{ item.surplusAmount }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.remark }}</td>
                    <td>{{ item.createTime }}</td>
                    <td class="t-right">
                        <router-link :to="'/fenjieList?id=' + item.id + '&billType=' + item.billType">
                            <btn
                                class="b"
                                flat
                                color="#008eff"
                            >回款分解</btn>
                        </router-link>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "hkfenjie-list",
    components: { DataList },
    data() {
        return {
            filter: {
                billType: "",
                certificateNumber: "",
                collectCompany: "",
                operateDateEnd: "",
                operateDateStart: "",
                payAccount: "",
                payCompany: "",
                paymentType: "",
            },
            billTypeArr: ["", "现金日记账", "银行日记账", "其他货币日记账"],
            statusList: [],
            newOrderStatusList: [
                { value: "0", text: "未完成" },
                { value: "2", text: "已完成" },
            ],
        };
    },
    created() {
        this.getPayType();
    },
    methods: {
        flush() {
            this.filter = {
                billType: "",
                certificateNumber: "",
                collectCompany: "",
                operateDateEnd: "",
                operateDateStart: "",
                payAccount: "",
                payCompany: "",
                paymentType: "",
            };
            this.$refs.list.update(true);
        },
        //付款类型
        getPayType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/PAYMENT_TYPE`)
                .then((res) => {
                    res.map((item) => {
                        this.statusList.push({
                            text: item.desc,
                            value: item.code,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPayName(value) {
            let str = "";
            this.statusList.map((item) => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        detail(item) {
            this.$router.push({
                name: "fenjieList",
                query: { id: item.id, billType: item.billType },
            });
        },
    },
};
</script>

<style lang="less">
.page-orders-list {
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

.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
.cell-color {
    color: #de8a0c;
}
</style>
