<template>
    <div class="page-equipment-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <!-- <div class="flex-v-center search-bar" style="margin-right: 20px;">
      <i class="icon f-20 c-8">search</i>
      <select v-model="filter.type" class="f-14" @change="$refs.list.update(true)">
        <option value="">所有库房</option>
        <option value="1">原料库</option>
        <option value="2">成品库</option>
      </select>
      <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>-->
            <div class="flex-item"></div>
            <router-link to="/supplierequipment/add">
                <btn class="b" flat color="#008eff">新增供应商设备</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/equipment/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>设备名称</th>
                    <th>设备数量</th>
                    <th>生产厂家</th>
                    <th>服役年限</th>
                    <!-- <th>采购金额</th> -->
                    <!-- <th>采购时间</th> -->
                    <th>型号规格</th>
                    <th>设备类型</th>
                    <th>供应商编号</th>
                    <th class="t-center" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.number}}</td>
                    <td>{{item.productFactory}}</td>
                    <td>{{item.servicedYears}}</td>
                    <!-- <td>{{item.price}}</td> -->
                    <!-- <td>{{item.purchaseTime}}</td> -->
                    <td>{{item.specification}}</td>
                    <td>{{typeList[item.type]}}</td>
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
    name: "page-equipment-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: "1"
            },
            typeList: ["制造设备", "检测设备"]
        };
    },
    created() {
        console.log("");
    },
    methods: {
        flush() {
            this.filter.type = "1";
            this.$refs.list.update(true);
        },
        edit(item) {
            this.$router.push(`/supplierequipment/edit?id=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下供应商设备吗？<br><b>${item.name}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/equipment/delete/${item.id}`)
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
.page-equipment-list {
    //
}
</style>
