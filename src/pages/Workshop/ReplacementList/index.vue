<template>
    <div class="page-contract flex-col">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;margin-left: 80px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)" placeholder="订单号" style="width: 200px;">
                <select v-model="filter.auditResult" class="f-14" @change="$refs.list.update(true)">
                    <option value="-1">审核状态</option>
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" method="post" :page-size="20" :param="filter" url="/haolifa/replace-material/pageInfo">
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
                    <th>审核意见</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
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
                    <td>{{item.auditInfo}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.auditResult == 0" style="margin-right: 3px" class="blue" @click="auditLayerM(item)">审核</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="auditLayer" :title="'更换料审核'" width="450px">
            <div>
                <div class="flex-item">
                    <input-box disabled class="ml-10" v-model="auditLayerItem.replaceMaterialNo" label="更换料号"></input-box>
                </div>
                <div class="flex-item">
                    <input-box v-model="auditLayerItem.auditInfo" class="ml-10" multi-line label="审核意见"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="auditLayer=false">取消</btn>
                <btn flat color="#008eff" @click="completeAudit(2)">审核通过</btn>
                <btn flat color="#008eff" @click="completeAudit(1)">审核不通过</btn>
            </div>
        </layer>
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
                auditResult: -1,
                replaceMaterialNo: ""
            },
            auditLayer: false,
            auditLayerItem: {
                auditInfo: "",
                auditResult: 0,
                replaceMaterialNo: ""
            },
            statusList: [
                { status: 0, name: "未审核" },
                { status: 1, name: "审核不通过" },
                { status: 2, name: "审核通过" },
                { status: 3, name: "已出库" }
            ]
        };
    },
    methods: {
        auditLayerM(item) {
            console.log("item===", item);
            this.auditLayerItem.replaceMaterialNo = item.replaceMaterialNo;
            this.auditLayer = true;
        },
        completeAudit(auditResult) {
            this.auditLayerItem.auditResult = Number(auditResult);
            this.$http
                .post(`/haolifa/replace-material/audit`, this.auditLayerItem)
                .then(res => {
                    this.$toast("处理成功");
                    this.auditLayer = false;
                    this.$refs.list.update();
                })
                .catch(e => {
                    this.$toast(e.msg || e.mesage);
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