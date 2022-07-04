<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.materialName" @change="$refs.list.update(true);getMoney()" placeholder="名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true)" placeholder="型号" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.classifyName" @change="$refs.list.update(true)" placeholder="分类名称" style="width: 100px;">
                <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
            </div>
            <div class="flex-item"></div>
            <!-- <btn class="b" flat color="#008eff" @click="exportExcelIn">零件待入库导出</btn> -->
            <btn class="b" flat color="#008eff" @click="exportExcelIn">入库导出</btn>
            <btn class="b" flat color="#008eff" @click="exportExcelOut">出库导出</btn>
            <a class="b" style="color:rgb(0, 142, 255)" href="/haolifa/auto-control/material/surplus">结存导出</a>
            <btn class="b" flat color="#008eff" @click="$router.push('/zikongwuzhiAdd')">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/auto-control/page" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>名称</th>
                    <th>分类名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>当前库存</th>
                    <th>金额</th>
                    <th class="t-center" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.classifyName}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.unit}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.quantity * item.price}}</td>
                    <td>
                        <!-- <icon-btn small @click="edit(item)">edit</icon-btn>
                        <icon-btn small @click="remove(item)">delete</icon-btn>-->
                        <a href="javascript:;" class="blue" @click="entryMaterial(item)">入库</a> |
                        <a href="javascript:;" class="blue" @click="outMaterial(item)">出库</a> |
                        <a href="javascript:;" class="blue" @click="entryInfo(item)">入库详情</a> |
                        <a href="javascript:;" class="blue" @click="outInfo(item)">出库详情</a> |
                        <a href="javascript:;" class="blue" @click="editInfo(item)">编辑</a> |
                        <a href="javascript:;" class="blue" @click="delInfo(item)">删除</a>
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
                    <input-box v-model="exportInForm.materialName" class="flex-item" label="物料名称"></input-box>
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
                    <input-box v-model="exportOutForm.materialName" class="flex-item" label="零件图号"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportOutLayer=false">取消</btn>
                <btn flat color="#008eff" @click="downloadOut()">确定</btn>
            </div>
        </layer>
        <layer v-if="outLayer" :title="'出库'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <input-box v-model="outObj.quantity" type="number" class="flex-item" label="数量"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="outObj.receiveDepartment" class="flex-item" label="领料部门"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="outLayer=false">取消</btn>
                <btn flat color="#008eff" @click="outScattered()">确定</btn>
            </div>
        </layer>
        <layer v-if="inLayer" :title="'入库'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <input-box v-model="inObj.quantity" type="number" class="flex-item" label="数量"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="inLayer=false">取消</btn>
                <btn flat color="#008eff" @click="inScattered()">确定</btn>
            </div>
        </layer>
        <layer v-if="editLayer" :title="'编辑'" width="30%">
            <div class="layer-text" style="padding-bottom: 20px;min-height:40px;">
                <div class="flex ml-20 mr-20">
                    <input-box v-model="editForm.materialName" class="flex-item" label="名称"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="editForm.classifyName" class="flex-item" label="分类名称"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="editForm.model" class="flex-item" label="型号"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="editForm.specifications" class="flex-item" label="规格"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="editForm.price" type="number" class="flex-item" label="价格"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="editLayer=false">取消</btn>
                <btn flat color="#008eff" @click="saveScattered()">确定</btn>
            </div>
        </layer>
        <layer v-if="inLayer" :title="'入库'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <input-box v-model="inObj.quantity" type="number" class="flex-item" label="数量"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="inLayer=false">取消</btn>
                <btn flat color="#008eff" @click="inScattered()">确定</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "zikongwuzhiList",
    components: { DataList },
    data() {
        return {
            exportOutLayer: false,
            exportInLayer: false,
            classifyList: [],
            filter: {
                classifyName: "",
                materialName: "",
                model: "",
                specifications: ""
            },
            exportInForm: {
                materialName: "",
                startDate: "",
                endDate: ""
            },
            exportOutForm: {
                startDate: "",
                endDate: "",
                materialName: ""
            },
            statusList: [
                { value: 1, text: "待入库" },
                { value: 2, text: "已入库" }
            ],
            money: "",
            outLayer: false,
            outObj: {
                graphNo: "",
                type: 1,
                autoControlId: "",
                quantity: 0,
                receiveDepartment: ""
            },
            inObj: {
                graphNo: "",
                type: 1,
                autoControlId: "",
                quantity: 0
            },
            inLayer: false,
            editLayer: false,
            editForm: {}
        };
    },
    created() {},
    methods: {
        flush() {
            this.filter = {
                classifyName: "",
                materialName: "",
                model: "",
                specifications: ""
            };
            this.$refs.list.update(true);
        },
        entryMaterial(item) {
            this.inLayer = true;
            this.inObj.graphNo = item.graphNo;
            this.inObj.autoControlId = item.id;
            this.inObj.quantity = 0;
        },
        outMaterial(item) {
            this.outLayer = true;
            this.outObj.graphNo = item.graphNo;
            this.outObj.autoControlId = item.id;
            this.outObj.quantity = 0;
            this.outObj.receiveDepartment = "";
        },
        outScattered() {
            if (!this.outObj.quantity) {
                this.$toast("请输入出库数量");
                return;
            }
            if (!this.outObj.receiveDepartment) {
                this.$toast("请输入领料部门");
                return;
            }
            if (this.outObj.quantity > 0) {
                this.outObj.quantity = 0 - this.outObj.quantity;
            }

            this.$http
                .post("/haolifa/auto-control/out", this.outObj)
                .then(res => {
                    this.$toast("出库成功");
                    this.outLayer = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        inScattered() {
            if (!this.inObj.quantity) {
                this.$toast("请输入入库数量");
                return;
            }
            this.$http
                .post("/haolifa/auto-control/entry", this.inObj)
                .then(res => {
                    this.$toast("入库成功");
                    this.inLayer = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        entryInfo(item) {
            this.$router.push(`/zikongwuzhiEntry?id=${item.id}`);
        },
        outInfo(item) {
            this.$router.push(`/zikongwuzhiOut?id=${item.id}`);
        },
        // edit(item) {
        //     this.$router.push(`/material/edit?id=${item.id}`);
        // },
        exportExcelIn() {
            this.exportInLayer = true;
            this.exportInForm = {
                startDate: "",
                endDate: "",
                materialName: ""
            };
        },
        exportExcelOut() {
            this.exportOutLayer = true;
            this.exportOutForm = {
                startDate: "",
                endDate: "",
                materialName: ""
            };
        },
        downloadOut() {
            if (!this.exportOutForm.startDate || !this.exportOutForm.endDate) {
                this.$toast("请输入开始时间和结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                // `/haolifa/export/product-out?startDate=${
                `/haolifa/auto-control/material-out-record?startDate=${
                    this.exportOutForm.startDate
                }&endDate=${this.exportOutForm.endDate}&materialName=${
                    this.exportOutForm.materialName
                }`
            );
            a.click();
            this.exportOutLayer = false;
        },
        downloadIn() {
            if (!this.exportInForm.startDate || !this.exportInForm.endDate) {
                this.$toast("请输入开始时间和结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/auto-control/material-entry-record?startDate=${
                    this.exportInForm.startDate
                }&endDate=${this.exportInForm.endDate}&materialName=${
                    this.exportInForm.materialName
                }`
            );
            a.click();
            this.exportInLayer = false;
        },
        editInfo(item) {
            this.editForm = JSON.parse(JSON.stringify(item));
            this.editLayer = true;
        },
        saveScattered() {
            if (!this.editForm.price) {
                this.$toast("价格不能为空");
                return;
            }
            if (this.editForm.price < 0) {
                this.$toast("请输入正确的价格");
                return;
            }
            this.$http
                .post("/haolifa/auto-control/update", this.editForm)
                .then(res => {
                    this.$toast("修改成功");
                    this.editLayer = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        delInfo(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/auto-control/del/${item.id}`)
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
