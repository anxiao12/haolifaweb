<template>
    <div class="page-product-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)" placeholder="订单号" style="width: 200px;" />
                入库状态：
                <select v-model="filter.storageStatus" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
                <btn class="ml-20" @click="exportExcel">导出</btn>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="20" :param="filter" url="/haolifa/pro-inspect/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>产品编号</th>
                    <th>成品型号</th>
                    <th>成品规格</th>
                    <th>入库数量</th>
                    <th>状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.productNo}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.productSpecifications}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{statusList[item.storageStatus].name}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.storageStatus == 1" style="margin-right: 3px" class="blue" @click="execStoreRoom(item)">入库</a>
                        <!--<a href="javascript:;" v-if="item.storageStatus == 1" style="margin-right: 3px" class="blue" @click="storeComplete(item.inspectNo)">入库完成</a>-->
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="storeRoom.layerShow" :title="'入库'" width="70%">
            <div>
                <div class="flex">
                    <input-box v-model="storeRoom.orderNo" class="flex-item mr-10 ml-20" label="订单号"></input-box>
                    <input-box v-model="storeRoom.productDepartment" class="flex-item mr-10 ml-20" label="生产部门"></input-box>
                    <input-box v-model="storeRoom.productNo" class="flex-item mr-10 ml-20" label="成品号"></input-box>
                    <!--<select-box class="ml-20" :list="storeRoom.prodeuctModels" v-model="storeRoom.prodeuctModel" @change="loadStoreRocks()" label="成品型号"></select-box>-->
                </div>
                <div class="flex">
                    <input-box v-model="storeRoom.productModel" class="flex-item mr-10 ml-20" label="成品型号"></input-box>
                    <input-box v-model="storeRoom.productSpecifications" class="flex-item mr-10 ml-20" label="规格"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="storeRoom.quantity" type="number" class="flex-item ml-20 mr-10" disabled label="入库数量"></input-box>
                    <select-box class="flex-item mr-10" :list="storeRoom.selectStoreRooms" v-model="storeRoom.roomNo" @change="loadStoreRocks()" label="库房"></select-box>
                    <select-box class="flex-item mr-10" :list="storeRoom.storeRoomRacks" v-model="storeRoom.rackNo" label="库位"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="storeRoom.layerShow=false">取消</btn>
                <el-button size="mini" :loading="loading" type="primary" @click="complete">保存</el-button>
            </div>
        </layer>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="flex ml-20 mr-20">
                <date-picker v-model="exportForm.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <date-picker v-model="exportForm.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <input-box v-model="exportForm.orderNo" class="flex-item" label="订单号"></input-box>
            </div>
            <div class="flex ml-20 mr-20">
                <select-box v-model="exportForm.entryStatus" class="flex-item" :list="entryStatusList" label="状态"></select-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportLayer=false">取消</btn>
                <btn flat color="#008eff" @click="download()">确定</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-product-list",
    components: { DataList },
    data() {
        return {
            statusList: [
                { status: 0, name: "全部" },
                { status: 1, name: "待入库" },
                { status: 2, name: "已入库" }
            ],
            storeRoom: {
                layerShow: false,
                selectStoreRooms: [],
                storeRoomRacks: [],
                orderNo: "",
                productDepartment: "",
                productModel: "",
                productNo: "",
                productSpecifications: "",
                quantity: 0,
                rackNo: "",
                roomNo: ""
            },
            filter: {
                storageStatus: 0,
                orderNo: ""
            },
            exportLayer: false,
            exportForm: {
                entryStatus: 0,
                startDate: "",
                orderNo: "",
                endDate: ""
            },
            entryStatusList: [
                { value: 0, text: "全部" },
                { value: 1, text: "待入库" },
                { value: 2, text: "已入库" }
            ],
            loading: false
        };
    },
    methods: {
        loadStoreRocks() {
            this.$http
                .get(`/haolifa/store-room/rack/list/${this.storeRoom.roomNo}`)
                .then(res => {
                    console.log("库位", res);
                    this.storeRoom.storeRoomRacks = res.map(item => {
                        return { value: item.rackNo, text: item.rackName };
                    });
                    // 默认值
                    this.storeRoom.rackNo = this.storeRoom.storeRoomRacks[0].value;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        storeComplete(inspectId) {
            this.$http
                .post(
                    `/haolifa/pro-inspect/updateStorageStatus?id=${inspectId}&storageStatus=2`
                )
                .then(res => {
                    this.$refs.list.update();
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        complete() {
            let save = {
                orderNo: this.storeRoom.orderNo,
                productDepartment: this.storeRoom.productDepartment,
                productModel: this.storeRoom.productModel,
                productNo: this.storeRoom.productNo,
                productSpecifications: this.storeRoom.productSpecifications,
                quantity: this.storeRoom.quantity,
                rackNo: this.storeRoom.rackNo,
                roomNo: this.storeRoom.roomNo
            };
            this.loading = true;
            this.$http
                .put(`/haolifa/store-room/entryOut/entryProduct`, save)
                .then(res => {
                    this.loading = false;
                    this.$refs.list.update();
                    this.storeRoom.layerShow = false;
                    // 更新入库状态
                    this.storeComplete(this.storeRoom.id);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        execStoreRoom(item) {
            this.storeRoom.orderNo = item.orderNo;
            this.storeRoom.productNo = item.productNo;
            this.storeRoom.productModel = item.productModel;
            this.storeRoom.productSpecifications = item.productSpecifications;
            this.storeRoom.quantity = item.qualifiedNumber;
            this.storeRoom.id = item.id;
            this.$http
                .get(`/haolifa/store-room/listInfo?type=2`)
                .then(res => {
                    this.storeRoom.selectStoreRooms = res.map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
                    this.storeRoom.roomNo = this.storeRoom.selectStoreRooms[0].value;
                    this.$http
                        .get(
                            `/haolifa/store-room/rack/list/${this.storeRoom.roomNo}`
                        )
                        .then(res => {
                            console.log("库位", res);
                            this.storeRoom.storeRoomRacks = res.map(item => {
                                return {
                                    value: item.rackNo,
                                    text: item.rackName
                                };
                            });
                            // 默认值
                            this.storeRoom.rackNo = this.storeRoom.storeRoomRacks[0].value;
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.storeRoom.layerShow = true;
        },
        exportExcel() {
            this.exportLayer = true;
            this.exportForm = {
                entryStatus: 0,
                startDate: "",
                orderNo: "",
                endDate: ""
            };
        },
        download() {
            if (!this.exportForm.startDate) {
                this.$toast("请选择开始时间");
                return;
            }
            if (!this.exportForm.endDate) {
                this.$toast("请选择结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/export/product-entry?startDate=${this.exportForm.startDate}&endDate=${this.exportForm.endDate}&entryStatus=${this.exportForm.entryStatus}&orderNo=${this.exportForm.orderNo}`
            );
            a.click();
            this.exportLayer = false;
        }
    }
};
</script>

<style lang="less">
.page-invoice-list {
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

    //
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
