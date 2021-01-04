<template>
    <div class="page-product-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model.trim="filter.supplierName" placeholder="供应商名称" @change="$refs.list.update(true)" style="width: 200px;">
                <input type="text" class="flex-item" v-model.trim="filter.supplierNo" placeholder="供应商编号" @change="$refs.list.update(true)" style="width: 200px;">
                <input type="text" class="flex-item" v-model.trim="filter.materialGraphNo" placeholder="图号" @change="$refs.list.update(true)" style="width: 200px;">
                <input type="text" class="flex-item" v-model.trim="filter.materialName" placeholder="产品名称" @change="$refs.list.update(true)" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <router-link to="/supplierproduct/add">
                <btn class="b" flat color="#008eff">新增供应商产品</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/supplier-pro/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>供货物料图号</th>
                    <th>产品名称</th>
                    <th>产品类型</th>
                    <th>图号分类</th>
                    <th>供应商</th>
                    <th>供应商编号</th>
                    <th class="t-center" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{materialTypeList[item.materialType]}}</td>
                    <td>{{item.materialClassifyName}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.supplierNo}}</td>
                    <td>
                        <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑</a> |
                        <a href="javascript:;" class="red" @click="remove(item)" style="margin-right: 3px;">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-product-list",
    components: { DataList },
    data() {
        return {
            filter: { supplierName: "", supplierNo: "" },
            materialTypeList: [
                "供货原料",
                "其他原料",
                "阀体",
                "阀座",
                "阀板",
                "阀杆",
                "通用零件",
                "驱动",
                "标准件"
            ]
        };
    },
    created() {
        console.log("");
    },
    methods: {
        edit(item) {
            this.$router.push(`/supplierproduct/edit?id=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下供应商产品吗？<br><b>${
                    item.materialName
                }</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/supplier-pro/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update();
                        })
                        .catch(e => {
                            this.$toast(e.msg);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-product-list {
    //
}
</style>
