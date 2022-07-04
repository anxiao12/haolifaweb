<template>
    <div class="page-rack flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <!-- <i class="icon f-20 c-8">search</i>
      <select v-model="filter.type" class="f-14" @change="$refs.list.update(true)">
        <option value="">所有库房</option>
        <option value="1">原料库</option>
        <option value="2">成品库</option>
      </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>-->
            </div>
            <div class="flex-item"></div>
            <router-link to="/rack/add">
                <btn class="b" flat color="#008eff">新增库位</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/store-room/rack/pageInfo" method="get">
                <!-- <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th style="width: 200px;">库未编号</th>
        <th>状态</th>
        <th>库房ID</th>
        <th>描述</th>
        <th class="t-right" style="width: 80px;">操作</th>
                </tr>-->
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th style="width: 200px;">库位名称</th>
                    <th style="width: 100px;">库位编号</th>
                    <th>所属库房</th>
                    <th>描述</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.rackName}}</td>
                    <td>{{item.rackNo }}</td>
                    <td>{{item.roomNo}}</td>
                    <td>{{item.remark}}</td>
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
    name: "page-rack",
    components: { DataList },
    data() {
        return {
            types: ["", "原料库", "成品库"],
            status: ["正常", "删除"],
            filter: {
                type: ""
            }
        };
    },
    methods: {
        flush() {
            this.filter.type = "";
            this.$refs.list.update(true);
        },
        edit(item) {
            this.$router.push(`/rack/edit?id=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下库位吗？<br><b>${item.rackNo}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/store-room/rack/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
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
.page-rack {
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
