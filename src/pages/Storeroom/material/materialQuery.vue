<template>
    <div class="page-query-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true)" placeholder="图号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true)" placeholder="型号" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 100px;">
                <select v-model="filter.classifyId" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option v-for="item in classifyList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <!--<span class="f-16" style="margin-left: 10px;">{{this.$route.meta.title}}</span>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/material/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件名称</th>
                    <th>图号</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>库存</th>
                    <th>锁定数量</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.currentQuantity}}</td>
                    <td>{{item.lockQuantity}}</td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "material-query",
    components: { DataList },
    data() {
        return {
            classifyList: [],
            filter: {
                graphNo: "",
                model: "",
                specifications: "",
                classifyId: 0
            }
        };
    },
    created() {
        this.getClassifyList();
    },
    methods: {
        getClassifyList() {
            this.$http.get("/haolifa/material/classify/list").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.id, text: item.classifyName };
                });
            });
        },
        // entryMaterial(item) {
        //     this.$router.push({ name: "entryMaterial-list", params: item });
        //     // this.$router.push(`/material/entryMaterial?graphNo=${item.graphNo}&name=${item.name}`)
        // },
        // outMaterial(item) {
        //     this.$router.push({ name: "outMaterial-list", params: item });
        //     // this.$router.push(`/material/outMaterial?graphNo=${item.graphNo}&name=${item.name}`)
        // },
        // entryInfo(item) {
        //     this.$router.push(`/material/entryInfo?graphNo=${item.graphNo}`);
        // },
        // outInfo(item) {
        //     this.$router.push(`/material/outInfo?graphNo=${item.graphNo}`);
        // },
        // edit(item) {
        //     this.$router.push(`/material/edit?id=${item.id}`);
        // },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下库房吗？<br><b>${item.name}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/material/delete/${item.id}`)
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
.page-query-list {
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
