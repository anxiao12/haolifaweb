<template>
    <div class="page-product-list flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.productNo" @change="$refs.list.update(true)" placeholder="成品ID">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="成品规格">
                <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)" placeholder="成品型号">
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/product/pageInfo " method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>成品ID</th>
                    <th>成品型号</th>
                    <th>成品规格</th>
                    <th>数量</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.productNo}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.qty}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.remark}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="outProduct(item)">出库</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layerShow" :title="'出库'" width="30%">
            <div>
                <div class="flex">
                    <input-box v-model="qty" class="flex-item ml-10 mr-10" label="出库数量"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="layerShow=false">取消</btn>
                <el-button size="mini" :loading="loading" type="primary" @click="outSave">保存</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "product-list",
    components: { DataList },
    data() {
        return {
            filter: {
                name: "",
                productNo: "",
                specifications: "",
                productModel: ""
            },
            loading: false,
            id: "",
            qty: "",
            layerShow: false
        };
    },
    methods: {
        flush() {
            this.filter = {
                name: "",
                productNo: "",
                specifications: "",
                productModel: ""
            };
            this.$refs.list.update(true);
        },
        outProduct(item) {
            this.id = item.id;
            this.layerShow = true;
        },
        outSave() {
            this.$http
                .post("/haolifa/product/out-product", {
                    id: this.id,
                    qty: this.qty
                })
                .then(res => {
                    this.layerShow = false;
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-product-list {
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
