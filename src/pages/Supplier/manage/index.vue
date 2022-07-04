<template>
    <div class="page-supplier-manage flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.supplierName" placeholder="供应商名称" @change="$refs.list.update(true)" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <!-- <router-link to="/supplier/add">
                <btn class="b" flat color="#008eff">新增供应商</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" method="post" :pageSize="15" :param="filter" url="/haolifa/supplier/list">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>企业名称</th>
                    <th>编号</th>
                    <th>网址</th>
                    <th>企业性质</th>
                    <th>法人</th>
                    <th>电话</th>
                    <th>是否合格</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
                    <td>
                        <router-link class="c-4" :to="'/supplier/'+item.id">{{item.suppilerName}}</router-link>
                    </td>
                    <td>{{item.suppilerNo}}</td>
                    <td>{{item.website}}</td>
                    <td>{{natureList[item.nature]}}</td>
                    <td>{{item.legalPerson}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{isQualifiedStatusList[item.isQualified].text}}</td>
                    <td class="t-right">
                        <!-- <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑</a> |
                        <a href="javascript:;" class="red" @click="remove(item)" style="margin-right: 3px;">删除</a> |-->
                        <a href="javascript:;" class="blue" @click="infoDetail(item)" style="margin-right: 3px;">详情</a>
                        <a href="javascript:;" v-if="item.isQualified == 1 || item.isQualified==2" class="blue" @click="auditAccessoryInfo(item.suppilerNo)" style="margin-right: 3px;">| 审批附件</a>
                        <!-- <a
                            href="javascript:;"
                            class="red"
                            v-if="item.isQualified == 0"
                            @click="approveSupplier(item.suppilerNo)"
                            style="margin-right: 3px;"
                        >发起审批</a>-->
                        <a href="javascript:;" class="red" v-if="item.isQualified == 3" @click="approving(item.suppilerNo)" style="margin-right: 3px;">| 审批进度</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
// import obj2FormData from '@/utils/obj2FormData'
export default {
    name: "page-supplier-manage",
    components: { DataList },
    data() {
        return {
            filter: {
                supplierName: "",
                supplierNo: ""
            },
            natureList: ["国有", "三资", "集体", "联营", "私营"],
            isQualifiedStatusList: [
                { value: 0, text: "待评定" },
                { value: 1, text: "合格" },
                { value: 2, text: "不合格" },
                { value: 3, text: "评定中" }
            ]
        };
    },
    methods: {
        flush() {
            this.filter = {
                supplierName: "",
                supplierNo: ""
            };
            this.$refs.list.update(true);
        },
        auditAccessoryInfo(supplierNo) {
            console.log("accessory-info", supplierNo);
            this.$router.push(`/supplier/accessory-info?formNo=${supplierNo}`);
        },
        approving(supplierNo) {
            // todo
            this.$router.push(
                `/supplier/approveProgress?formNo=${supplierNo}&formId=0`
            );
        },
        approveSupplier(supplierNo) {
            this.$http
                .post(`/haolifa/supplier/approve/${supplierNo}`)
                .then(res => {
                    this.$refs.list.update(true);
                    this.$toast("成功发起");
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        infoDetail(item) {
            this.$router.push(`/supplier/${item.id}`);
        },
        edit(item) {
            this.$router.push(`/supplier/edit?id=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下供应商吗？<br><b>${
                    item.suppilerName
                }</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/supplier/delete?id=${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-supplier-manage {
    // height: 100%;
}
</style>
