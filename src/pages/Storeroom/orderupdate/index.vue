<template>
    <div class="page-contract flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.orderNo"
                    @change="$refs.list.update(true)"
                    placeholder="订单号"
                    style="width: 200px;"
                >
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                method="post"
                :page-size="15"
                :param="filter"
                url="/haolifa/replace-material/pageInfo"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>零件号</th>
                    <th>零件名称</th>
                    <th>零件单位</th>
                    <th>零件数量</th>
                    <th>更换原因</th>
                    <th>责任人</th>
                    <th>审核状态</th>
                    <th>审核时间</th>
                    <th>创建时间</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th> -->
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.materialUnit}}</td>
                    <td>{{item.materialCount}}</td>
                    <td>{{item.replaceReason}}</td>
                    <td>{{item.responsiblePerson}}</td>
                    <td>{{statusList[item.auditResult].name}}</td>
                    <td>{{item.auditTime}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            style="margin-right: 3px"
                            class="blue"
                            @click="outRoom(item)"
                        >出库</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-contract",
    components: { DataList },
    data() {
        return {
            filter: {
                orderNo: "",
                auditResult: 2,
                replaceMaterialNo: ""
            },
            statusList: [{ status: 0, name: "未审核" }, { status: 1, name: "审核不通过" }, { status: 2, name: "审核通过" }, { status: 3, name: "已出库" }]
        };
    },
    activated() {
        this.$refs.list.update(true);
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                auditResult: 2,
                replaceMaterialNo: ""
            };
            this.$refs.list.update(true);
        },
        outRoom: function(item) {
            this.$router.push({
                name: "orderupdate-outMaterial-list",
                params: item
            });
        }
    }
};
</script>

<style lang="less">
.page-contract {
    height: 100%;
}
.page-contract {
    height: 100%;
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>