<template>
    <div class="page-product-list flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)"
                    placeholder="订单号">
                <input type="text" class="flex-item" v-model="filter.productNo" @change="$refs.list.update(true)"
                    placeholder="成品ID">
                <span>区域：</span>
                <select v-model="filter.location" class="f-14" @change="$refs.list.update(true);">
                    <option value="">全部</option>
                    <option :value="item.value" v-for="item, i in locationList" :key="i">{{ item.text }}</option>
                </select>
                类型:
                <select v-model="filter.operationType" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option value="1">出库</option>
                    <option value="2">入库</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="exportExcel">成品出库导出</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/store-room/entryOut/pageInfo"
                method="get">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>成品ID</th>
                    <th>成品型号</th>
                    <th>成品规格</th>
                    <th>操作类型</th>
                    <th>数量</th>
                    <th>单价</th>
                    <th>创建时间</th>
                    <th>区域</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.orderNo }}</td>
                    <td>{{ item.productNo }}</td>
                    <td>{{ item.productModel }}</td>
                    <td>{{ item.productSpecifications }}</td>
                    <td>{{ typeList[item.operationType - 1] }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.locationName }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" v-if="item.operationType == 2 && item.execute == 0"
                            @click="outProduct(item)">出库</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="form.layerShow" :title="'出库'" width="70%">
            <div>
                <div class="flex">
                    <input-box v-model="form.orderNo" class="flex-item ml-10 mr-10" disabled label="订单号"></input-box>
                    <input-box v-model="form.productNo" class="flex-item mr-10" label="成品ID"
                        disabled="disabled"></input-box>
                    <input-box v-model="form.productModel" class="flex-item mr-10" label="成品型号"
                        disabled="disabled"></input-box>
                    <input-box v-model="form.productSpecifications" class="flex-item mr-10" label="成品规格"
                        disabled="disabled"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.customerName" class="flex-item ml-10 mr-10" label="客户名称"></input-box>
                    <input-box v-model="form.customerNo" class="flex-item mr-10" label="客户代号"></input-box>
                    <select-box class="flex-item mr-10" :list="outPlaceList" v-model="form.outPlace"
                        label="出库目的地"></select-box>
                    <!--<input-box v-model="form.price" class="flex-item mr-10" label="出库单价（销售单价)"></input-box>-->
                </div>
                <div class="flex">
                    <select-box class="flex-item ml-10 mr-10" :list="form.selectStoreRooms" v-model="form.roomNo"
                        @change="loadStoreRocks()" label="库房"></select-box>
                    <select-box class="flex-item mr-10" :list="form.storeRoomRacks" v-model="form.rackNo"
                        label="库位"></select-box>
                    <input-box v-model="outNumber" disabled="disabled" class="flex-item mr-10" label="可出库数量"></input-box>
                    <input-box v-model="form.quantity" class="flex-item mr-10" label="出库数量（请填写负数）"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="form.layerShow = false">取消</btn>
                <el-button size="mini" :loading="loading" type="primary" @click="outSave">保存</el-button>
            </div>
        </layer>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportForm.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportForm.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="exportForm.orderNo" class="flex-item" label="订单号"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportLayer = false">取消</btn>
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
            filter: {
                orderNo: "",
                productNo: "",
                location: "",
                operationType: "0",
                type: "1"
            },
            outNumber: "",
            typeList: ["出库", "入库"],
            form: {
                layerShow: false,
                selectStoreRooms: [],
                storeRoomRacks: [],
                productNo: "",
                customerName: "",
                customerNo: "",
                orderNo: "",
                price: "",
                quantity: "",
                productSpecifications: "",
                rackNo: "",
                roomNo: "",
                productModel: "",
                id: "",
                outPlace: 0
            },
            loading: false,
            exportLayer: false,
            exportForm: {
                startDate: "",
                endDate: "",
                orderNo: ""
            },
            outPlaceList: [
                { value: 0, text: "客户" },
                { value: 1, text: "成品库" }
            ],
            locationList: []
        };
    },
    activated() {
        this.getLocation()
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                productNo: "",
                operationType: "0",
                location: "",
                type: "1"
            };
            this.$refs.list.update(true);
        },
        getLocation() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/DATA_LOCATION`)
                .then(res => {
                    this.locationList = res.map(res => {
                        return {
                            text: res.desc,
                            value: res.code
                        }
                    });
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        loadStoreRocks() {
            this.$http
                .get(`/haolifa/store-room/rack/list/${this.form.roomNo}`)
                .then(res => {
                    this.form.storeRoomRacks = res.map(item => {
                        return { value: item.rackNo, text: item.rackName };
                    });
                    // 默认值
                    this.form.rackNo = this.form.storeRoomRacks[0].value;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        outProduct(item) {
            this.form.layerShow = true;
            // this.form = {
            //     productNo: "",
            //     customerName: "",
            //     customerNo: "",
            //     orderNo: "",
            //     price: "",
            //     quantity: "",
            //     productSpecifications: "",
            //     rackNo: "",
            //     roomNo: "",
            //     productModel: ""
            // };
            this.form.id = item.id;
            this.form.quantity = "";
            this.form.productNo = item.productNo;
            this.form.orderNo = item.orderNo;
            this.form.productModel = item.productModel;
            this.form.productSpecifications = item.productSpecifications;
            this.form.rackNo = item.rackNo;
            this.form.roomNo = item.roomNo;
            this.$http
                .get(
                    `/haolifa/order-product/details?orderNo=${this.form.orderNo
                    }`
                )
                .then(res => {
                    this.form.customerName = res.demandName;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.$http
                .get(`/haolifa/store-room/listInfo?type=2`)
                .then(res => {
                    this.form.selectStoreRooms = res.map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
                    this.form.roomNo = this.form.selectStoreRooms[0].value;
                    this.$http
                        .get(
                            `/haolifa/store-room/rack/list/${this.form.roomNo}`
                        )
                        .then(res => {
                            this.form.storeRoomRacks = res.map(item => {
                                return {
                                    value: item.rackNo,
                                    text: item.rackName
                                };
                            });
                            // 默认值
                            this.form.rackNo = this.form.storeRoomRacks[0].value;
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.$http
                .put(`/haolifa/store-room/entryOut/outProduct-already-count`, {
                    orderNo: item.orderNo,
                    productNo: item.productNo,
                    recordId: item.id
                })
                .then(res => {
                    this.outNumber = +item.quantity - res;
                });
        },
        outSave() {
            let save = {
                id: this.form.id,
                orderNo: this.form.orderNo,
                productNo: this.form.productNo,
                productModel: this.form.productModel,
                productSpecifications: this.form.productSpecifications,
                price: this.form.price,
                rackNo: this.form.rackNo,
                roomNo: this.form.roomNo,
                quantity: this.form.quantity,
                customerNo: this.form.customerNo,
                customerName: this.form.customerName,
                outPlace: this.form.outPlace
            };
            this.loading = true;
            this.$http
                .put(`/haolifa/store-room/entryOut/outProduct`, save)
                .then(res => {
                    this.loading = false;
                    this.form.layerShow = false;
                    this.$toast("出库成功");
                    this.$refs.list.update();
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        exportExcel() {
            this.exportLayer = true;
            this.exportForm = {
                orderNo: "",
                startDate: "",
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
                `/haolifa/export/product-out?startDate=${this.exportForm.startDate
                }&endDate=${this.exportForm.endDate}&orderNo=${this.exportForm.orderNo
                }&operationType=1`
            );
            a.click();
            this.exportLayer = false;
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
