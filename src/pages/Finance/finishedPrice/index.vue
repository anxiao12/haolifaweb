<template>
    <div class="page-orders-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.productNo" @change="$refs.list.update(true)" placeholder="产品ID" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)" placeholder="型号" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item">
            <data-list ref="list" :param="filter" url="/haolifa/price/product/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>标签属性（产品型号）</th>
                    <th>产品ID</th>
                    <th>出厂价格</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.productNo}}</td>
                    <td>{{item.exFactoryPrice}}</td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑' : '新增'" width="900px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <input-box v-model="form.productModel" label="标签属性（产品型号）" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.productNo" label="产品ID" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.exFactoryPrice" label="出厂价格" class="input-width" style="width:48%;"></input-box>
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
            loading: false,
            form: {},
            filter: {
                productNo: "",
                productModel: "",
            },
            info: {}
        };
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