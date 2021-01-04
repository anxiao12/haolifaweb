<template>
    <div class="page-material-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.graphNo"
                    @change="$refs.list.update(true);getMoney()"
                    placeholder="图号"
                    style="width: 200px;"
                >
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true);getMoney()" placeholder="型号" style="width: 100px;">
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.specifications"
                    @change="$refs.list.update(true);getMoney()"
                    placeholder="规格"
                    style="width: 100px;"
                >
                <select v-model="filter.classifyId" class="f-14" @change="$refs.list.update(true);getMoney()">
                    <option value="0">全部</option>
                    <option v-for="item in classifyList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff" @click="exportExcelIn">零件待入库导出</btn> -->
            <btn class="b" flat color="#008eff" @click="exportExcelOut">零件出库导出</btn>
            <a class="b" style="color:rgb(0, 142, 255)" href="/haolifa/export/material/surplus">零件结存导出</a>
            <span class="f-16" style="margin-left: 10px;color:red">库存总金额(元):{{money}}</span>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/material/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>零件名称</th>
                    <th>图号</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>单价</th>
                    <th>金额</th>
                    <th>当前库存</th>
                    <th>锁定数量</th>
                    <th class="t-center" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.price*item.currentQuantity|numFilter}}</td>
                    <td>{{item.currentQuantity}}</td>
                    <td>{{item.lockQuantity}}</td>
                    <td>
                        <!-- <icon-btn small @click="edit(item)">edit</icon-btn>
                        <icon-btn small @click="remove(item)">delete</icon-btn>-->
                        <a href="javascript:;" class="blue" @click="entryMaterial(item)">入库</a> |
                        <a href="javascript:;" class="blue" @click="outMaterial(item)">出库</a> |
                        <a href="javascript:;" class="blue" @click="entryInfo(item)">入库详情</a> |
                        <a href="javascript:;" class="blue" @click="outInfo(item)">出库详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="exportInLayer" :title="'导出'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportInForm.startDate" class="flex-item" label="开始时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportInForm.endDate" class="flex-item" label="结束时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <select-box class="flex-item mr-10" :list="statusList" v-model="exportInForm.entryStatus" label="类型"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportInLayer=false">取消</btn>
                <btn flat color="#008eff" @click="downloadIn()">确定</btn>
            </div>
        </layer>
        <layer v-if="exportOutLayer" :title="'导出'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportOutForm.startDate" class="flex-item" label="开始时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportOutForm.endDate" class="flex-item" label="结束时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="exportOutForm.materialGraphNo" class="flex-item" label="零件图号"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportOutLayer=false">取消</btn>
                <btn flat color="#008eff" @click="downloadOut()">确定</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-material-list",
    components: { DataList },
    data() {
        return {
            exportOutLayer: false,
            exportInLayer: false,
            classifyList: [],
            filter: {
                graphNo: "",
                model: "",
                specifications: "",
                classifyId: 0
            },
            exportInForm: {
                entryStatus: "1",
                startDate: "",
                endDate: ""
            },
            exportOutForm: {
                operationType: "1",
                startDate: "",
                endDate: "",
                materialGraphNo: ""
            },
            statusList: [
                { value: 1, text: "待入库" },
                { value: 2, text: "已入库" }
            ],
            money: ""
        };
    },
    created() {
        this.getClassifyList();
        this.getMoney();
    },
    methods: {
        getMoney() {
            this.$http.get("/haolifa/statistics/money/inventory").then(res => {
                this.money = parseFloat(res).toLocaleString();
            });
        },
        getClassifyList() {
            this.$http.get("/haolifa/material/classify/list").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.id, text: item.classifyName };
                });
            });
        },
        entryMaterial(item) {
            this.$router.push({ name: "entryMaterial-list", params: item });
            // this.$router.push(`/material/entryMaterial?graphNo=${item.graphNo}&name=${item.name}`)
        },
        outMaterial(item) {
            this.$router.push({ name: "outMaterial-list", params: item });
            // this.$router.push(`/material/outMaterial?graphNo=${item.graphNo}&name=${item.name}`)
        },
        entryInfo(item) {
            this.$router.push(`/material/entryInfo?graphNo=${item.graphNo}`);
        },
        outInfo(item) {
            this.$router.push(`/material/outInfo?graphNo=${item.graphNo}`);
        },
        edit(item) {
            this.$router.push(`/material/edit?id=${item.id}`);
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
        exportExcelIn() {
            this.exportInLayer = true;
            console.log(111);
            this.exportInForm = {
                entryStatus: "1",
                startDate: "",
                endDate: ""
            };
        },
        exportExcelOut() {
            this.exportOutLayer = true;
            this.exportOutForm = {
                operationType: "1",
                startDate: "",
                endDate: "",
                materialGraphNo: ""
            };
        },
        downloadOut() {
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                // `/haolifa/export/product-out?startDate=${
                `/haolifa/export/material/record?startDate=${
                    this.exportOutForm.startDate
                }&endDate=${this.exportOutForm.endDate}&materialGraphNo=${
                    this.exportOutForm.materialGraphNo
                }&operationType=1`
            );
            a.click();
            this.exportInLayer = false;
            this.exportOutLayer = false;
        },
        downloadIn() {
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/export/product-out?startDate=${
                    this.exportOutForm.startDate
                }&endDate=${this.exportOutForm.endDate}&entryStatus=${
                    this.exportOutForm.entryStatus
                }`
            );
            a.click();
            this.exportInLayer = false;
        }
    },
    filters: {
        numFilter(value) {
            // 截取当前数据到小数点后两位

            let realVal = parseFloat(value).toFixed(2);

            return realVal;
        }
    }
};
</script>

<style lang="less">
.page-material-list {
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
