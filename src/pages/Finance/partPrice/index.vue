<template>
    <div class="page-orders-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true)" placeholder="图号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.name" @change="$refs.list.update(true)" placeholder="零件名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true)" placeholder="型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 200px;">
                <!-- <select v-model="filter.orderStatus" class="f-14" @change="$refs.list.update(true)">
                    <option value="-1">全部</option>
                    <option v-for="item in orderStatusList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>-->
                <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
            </div>
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff" @click="edit">新增</btn> -->
        </div>
        <div class="flex-item">
            <data-list ref="list" :param="filter" url="/haolifa/price/material/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>图号</th>
                    <th>零件名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>零件分类名称</th>
                    <th>材料</th>
                    <th>单位</th>
                    <th>单重</th>
                    <th>吨价(元)</th>
                    <th>税率</th>
                    <th>毛坯费不含税(元)</th>
                    <th>毛坯费含税(元)</th>
                    <th>喷涂费(元)</th>
                    <th>加工费(元)</th>
                    <th>成品价不含税(元)</th>
                    <th>成品价含税(元)</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.materialClassifyName}}</td>
                    <td>{{item.material}}</td>
                    <td>{{item.unit}}</td>
                    <td>{{item.actualWeight}}</td>
                    <td>{{item.tonPrice}}</td>
                    <td>{{item.taxRate}}</td>
                    <td>{{item.blankCost}}</td>
                    <td>{{item.blankCostTax}}</td>
                    <td>{{item.sprayCost}}</td>
                    <td>{{item.processCost}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.priceTax}}</td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑' : '新增'" width="900px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <input-box v-model="form.graphNo" label="图号" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.name" label="零件名称" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.model" label="型号" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.specifications" label="规格" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.materialClassifyName" label="零件分类名称" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.material" label="材料" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.unit" label="单位" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.actualWeight" label="单重" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.tonPrice" label="吨价(元)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.blankCost" label="毛坯费(元)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.processCost" label="加工费(元)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.productPrice" label="成品价(元)" class="input-width" style="width:24%;"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="layer = false">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "finished-price-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            form: {},
            filter: {
                graphNo: "",
                model: "",
                name: "",
                specifications: ""
            }
        };
    },
    methods: {
        flush() {
            this.filter = {
                graphNo: "",
                model: "",
                name: "",
                specifications: ""
            };
            this.$refs.list.update(true);
        }
    }
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

.input-width {
    display: inline-block;
    margin-left: 2px;
}
</style>