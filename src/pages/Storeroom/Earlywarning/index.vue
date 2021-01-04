<template>
    <div class="page-storeroom-earlywarning">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.materialName" @change="$refs.list.update(true)" placeholder="零件名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true)" placeholder="零件图号" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff">增加</btn> -->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/material/store-alarm" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件名称</th>
                    <th>零件图号</th>
                    <th>安全库存量</th>
                    <th>目前库存量</th>
                    <th>锁定数量</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.safeQuantity}}</td>
                    <td>{{item.currentQuantity}}</td>
                    <td>{{item.lockQuantity}}</td>
                    <td></td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-storeroom-earlywarning",
    components: { DataList },
    data() {
        return {
            filter: {
                classifyId: 0,
                graphNo: "",
                materialName: "",
                model: "",
                specifications: ""
            }
        };
    }
};
</script>

<style lang="less">
.page-storeroom-earlywarning {
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
</style>
