<template>
    <div class="material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true);" placeholder="单号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true);" placeholder="图号" style="width: 200px;">
                入库状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                <!-- <btn class="ml-20" @click="exportExcel">导出</btn> -->
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/valve-seat-entrust/history/list" method="post">
                <tr slot="header">
                    <th>单号</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <!-- <th>检测数量</th> -->
                    <th>合格数量</th>
                    <!-- <th>不合格数量</th>
                    <th>不合格原因</th>-->
                    <th>备注</th>
                    <th>入库状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item }">
                    <td>{{item.no}}</td>
                    <td>{{item.materialGraphName}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <!-- <td>{{item.testNumber}}</td> -->
                    <td>{{item.qualifiedNumber}}</td>
                    <!-- <td>{{item.unqualifiedNumber}}</td>
                    <td>{{item.reasons}}</td>-->
                    <td>{{item.remark}}</td>
                    <td>{{item.status==1?'待入库':'已入库'}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="execStoreRoom(item)">入库</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="storeRoom.layerShow" :title="'入库'" width="50%">
            <div>
                <div class="flex">
                    <input-box disabled v-model="storeRoom.materialGraphNo" style="width:30%" class="mr-10 ml-20" label="物料图号"></input-box>
                    <input-box disabled v-model="storeRoom.quantity" type="number" style="width:30%" class="mr-10" label="入库数量"></input-box>
                    <input-box v-model="storeRoom.price" type="number" class="mr-10" style="width:30%" label="采购价格"></input-box>
                </div>
                <div class="flex">
                    <input-box disabled v-model="storeRoom.materialBatchNo" style="width:30%" class="mr-10 ml-20" label="批次号"></input-box>
                    <input-box disabled v-model="storeRoom.orderNo" style="width:30%" class="mr-10" label="采购合同号"></input-box>
                    <input-box v-model="storeRoom.supplier" disabled class="mr-10 ml-20" style="width:30%" label="供应商"></input-box>
                </div>
                <div class="flex">
                    <select-box class="ml-20 mr-10" :list="storeRoom.selectStoreRooms" style="width:50%" v-model="storeRoom.roomNo" @change="loadStoreRocks()" label="库房"></select-box>
                    <select-box class="mr-10" :list="storeRoom.storeRoomRacks" style="width:50%" v-model="storeRoom.rackNo" label="库位"></select-box>
                </div>
                <div class="flex"></div>
            </div>
            <div class="layer-btns">
                <btn flat @click="storeRoom.layerShow=false">取消</btn>
                <el-button size="mini" :loading="loading" type="primary" @click="complete">保存</el-button>
            </div>
        </layer>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="flex ml-20 mr-20">
                <date-picker v-model="form.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <date-picker v-model="form.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <select-box v-model="form.entryStatus" class="flex-item" :list="entryStatusList" label="状态"></select-box>
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
    name: "material-list",
    components: { DataList },
    data() {
        return {
            filter: {
                entrustNo: "",
                graphNo: "",
                status: 0
            },
            statusList: [
                { status: 0, name: "全部" },
                { status: 1, name: "待入库" },
                { status: 2, name: "已入库" }
            ],
            busTypeList: ["未选择", "订单需求", "生产库存"],
            storeRoom: {
                layerShow: false,
                selectStoreRooms: [],
                storeRoomRacks: [],
                materialGraphNo: "",
                roomNo: "",
                rackNo: "",
                quantity: 0,
                supplier: "",
                materialBatchNo: "",
                orderNo: "",
                price: 0
            },
            itemId: 0,
            exportLayer: false,
            form: {
                entryStatus: 0,
                startDate: "",
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
        flush() {
            this.filter = {
                entrustNo: "",
                graphNo: "",
                status: 0
            };
            this.$refs.list.update(true);
        },
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
        storeComplete(id) {
            this.$http
                .post(`/haolifa/valve-seat-entrust/history/status/${id}`)
                .then(res => {
                    // this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        complete() {
            let save = {
                materialGraphNo: this.storeRoom.materialGraphNo,
                roomNo: this.storeRoom.roomNo,
                rackNo: this.storeRoom.rackNo,
                quantity: this.storeRoom.quantity,
                supplier: this.storeRoom.supplier,
                materialBatchNo: this.storeRoom.materialBatchNo,
                orderNo: this.storeRoom.orderNo,
                price: Number(this.storeRoom.price),
                busType: this.storeRoom.busType,
                busNo: this.storeRoom.inspectNo
            };
            this.loading = true;
            this.$http
                .put(`/haolifa/store-room/entryOut/entryMaterial`, save)
                .then(res => {
                    this.storeComplete(this.itemId);
                    this.$toast("入库成功");
                    this.storeRoom.layerShow = false;
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
            this.$refs.list.update(true);
        },
        execStoreRoom(item) {
            this.itemId = item.id;
            /* this.$http
                .get(`/haolifa/material-inspect/history-info/${item.id}`)
                .then(res => { */
            /* if (res.status == 2) {
                        this.$toast("已入库完成，请刷新界面!");
                        return;
                    } */
            // 获取库房库位
            this.$http
                .get(`/haolifa/store-room/listInfo?type=1`)
                .then(res => {
                    this.storeRoom.selectStoreRooms = res.map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
                    if (this.storeRoom.selectStoreRooms.length > 0) {
                        this.storeRoom.roomNo = this.storeRoom.selectStoreRooms[0].value;
                    }
                    this.$http
                        .get(
                            `/haolifa/store-room/rack/list/${
                                this.storeRoom.roomNo
                            }`
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
                            if (this.storeRoom.storeRoomRacks.length > 0) {
                                this.storeRoom.rackNo = this.storeRoom.storeRoomRacks[0].value;
                            }
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            if (item.type == 2) {
                let length = item.materialGraphNo.length;
                this.storeRoom.materialGraphNo =
                    item.materialGraphNo.substring(0, length - 1) + "J";
            } else {
                this.storeRoom.materialGraphNo = item.materialGraphNo;
            }

            this.storeRoom.supplier = item.supplierName;
            this.storeRoom.materialBatchNo = item.batchNumber;
            this.storeRoom.orderNo = item.purchaseNo;
            this.storeRoom.quantity = item.qualifiedNumber;
            this.storeRoom.layerShow = true;
            this.storeRoom.busType = item.busType;
            this.storeRoom.inspectNo = item.inspectNo;
            /*  })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                }); */
            this.$http
                .get(
                    `/haolifa/material/getInfoByNo?graphNo=${
                        item.materialGraphNo
                    }`
                )
                .then(res => {
                    this.storeRoom.price = res.price;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        exportExcel() {
            this.exportLayer = true;
            this.form = {
                entryStatus: 0,
                startDate: "",
                endDate: ""
            };
        },
        download() {
            if (!this.form.startDate) {
                this.$toast("请选择开始时间");
                return;
            }
            if (!this.form.endDate) {
                this.$toast("请选择结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/export/material-entry?startDate=${
                    this.form.startDate
                }&endDate=${this.form.endDate}&entryStatus=${
                    this.form.entryStatus
                }`
            );
            a.click();
            this.exportLayer = false;
        }
    }
};
</script>

<style lang="less">
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.material-list {
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
