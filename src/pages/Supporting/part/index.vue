<template>
    <div class="page-part-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true)" placeholder="图号" style="width: 200px;" />
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true)" placeholder="型号" style="width: 100px;" />
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 100px;" />
                <select v-model="filter.classifyId" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option v-for="item in classifyList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <router-link to="/part/add">
                <btn class="b" flat color="#008eff">新增零件</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/material/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件名称</th>
                    <th>零件类型</th>
                    <th>图号</th>
                    <th>可替换图号</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>配套数量</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.materialClassifyName}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.replaceGraphNos}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.supportQuantity}}</td>
                    <td class="t-right">
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
    name: "page-part-list",
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
        edit(item) {
            this.$router.push(`/part/edit?id=${item.id}`);
        },
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
        },
        getClassifyList() {
            this.$http.get("/haolifa/material/classify/list").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.id, text: item.classifyName };
                });
            });
        }
    }
};
</script>

<style lang="less">
.page-part-list {
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
