<template>
    <div class="page-orders-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px;"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.busNo"
                    @change="$refs.list.update(true)"
                    placeholder="单号"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.batchNumber"
                    @change="$refs.list.update(true)"
                    placeholder="批次号"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.graphNo"
                    @change="$refs.list.update(true)"
                    placeholder="图号"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.materialName"
                    @change="$refs.list.update(true)"
                    placeholder="零件名称"
                    style="width: 200px;"
                >
                类型：
                <select
                    v-model="filter.type"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value>全部</option>
                    <option value="1">领料单出库</option>
                    <option value="2">机加工委托</option>
                    <option value="3">喷涂委托</option>
                </select>
                出库状态：
                <select
                    v-model="filter.outRoomStatus"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value>全部</option>
                    <option value="1">未出库</option>
                    <option value="2">已出库</option>
                </select>
                <i
                    class="icon"
                    style="margin-left: -20px;pointer-events:none;"
                >arrow_drop_down</i>
            </div>
            <div class="flex-item">
                <btn
                    class="ml-20"
                    @click="allOut"
                >整单出库</btn>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/store-room/pre-material-out/page"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>单号</th>
                    <th>批次号</th>
                    <th>图号</th>
                    <th>零件名称</th>
                    <th>出库数量</th>
                    <th>领料单位</th>
                    <th>类型</th>
                    <th>出库状态</th>
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{index}}</td>
                    <td>{{item.busNo}}</td>
                    <td>{{item.batchNumber}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.outQuantity}}</td>
                    <td>{{item.deptName}}</td>
                    <td>{{typeArrList[item.type]}}</td>
                    <td>{{item.outRoomStatus==1?"未出库":"已出库"}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            v-if="item.outRoomStatus==1"
                            class="blue"
                            @click="infoShow(item)"
                            style="margin-right: 3px;"
                        >出库</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            title="出库"
            width="70%"
        >
            <div style="padding:0 30px;">
                <div class="flex-v-center">
                    <input-box
                        v-model="form.name"
                        class="flex-item mr-10"
                        label="零件名称"
                        disabled="disabled"
                    ></input-box>
                    <input-box
                        v-model="form.materialGraphNo"
                        class="flex-item mr-10"
                        label="图号"
                        disabled="disabled"
                    ></input-box>
                </div>
                <div class="flex-v-center">
                    <input-box
                        v-model="form.orderNo"
                        class="mr-10"
                        label="单号"
                        style="width: 25%"
                    ></input-box>
                    <input-box
                        v-model="form.price"
                        class="mr-10"
                        label="零件购买单价"
                        style="width: 25%"
                    ></input-box>
                    <input-box
                        v-model="form.receiveDepartment"
                        @click="deptFlag=true"
                        class="flex-item mr-20"
                        label="领料部门"
                    ></input-box>
                </div>
                <div class="flex-v-center">
                    <!-- <select-box v-model="form.roomNo" @change="getRoomId(form.roomNo)" class="mr-10" :list="roomList" label="所属库房" style="width: 25%"></select-box>
                    <select-box v-model="form.rackNo" @change="getRackId(form.rackNo)" class="mr-10" :list="rackList" label="所属库位" style="width: 25%"></select-box>-->
                    <!-- <select-box v-model="form.materialBatchNo" class="mr-10" :list="materialBatchNoList" label="批次号" style="width: 25%"></select-box> -->
                    <el-select
                        v-model="materialBatchNo"
                        style="width: 75%;"
                        class="mr-10"
                        placeholder="批次号"
                        :multiple="true"
                    >
                        <el-option
                            v-for="item in materialBatchNoList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <input-box
                        v-model="form.quantity"
                        class="mr-10"
                        label="出库数量（负数）"
                        style="width: 25%"
                    ></input-box>
                </div>
            </div>
            <div
                class="flex-v-center"
                style="margin: 50px auto 100px;"
            >
                <el-button
                    class="mr-20"
                    size="mini"
                    :loading="loading"
                    type="primary"
                    @click="submit"
                >提交</el-button>
                <btn
                    big
                    flat
                    bg
                    class="ml-20 mr-20"
                    @click="layer=false"
                >取消</btn>
            </div>
        </layer>
        <layer
            v-if="outLayer"
            title="整单出库"
            width="50%"
        >
            <div class="flex ml-20 mr-20">
                <input-box
                    v-model="outForm.busNo"
                    class="flex-item mr-10"
                    label="单号（多个单号请用英文逗号,分隔）"
                ></input-box>
            </div>
            <div class="flex ml-20 mr-20">
                <select-box
                    v-model="outForm.type"
                    class="flex-item mr-10"
                    :list="outTypeList"
                    label="类型"
                ></select-box>
            </div>
            <div class="flex ml-20 mr-20">
                <input-box
                    v-model="outForm.receiveDepartment"
                    @click="deptFlag2=true"
                    class="flex-item mr-20"
                    label="领料部门"
                ></input-box>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    @click="outLayer=false"
                >取消</btn>
                <btn
                    flat
                    color="#008eff"
                    @click="allOutSave()"
                >确定</btn>
            </div>
        </layer>
        <layer
            v-if="deptFlag"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <dept-select @selectClick="selectClick"></dept-select>
            </div>
        </layer>
        <layer
            v-if="deptFlag2"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <dept-select @selectClick="selectClick2"></dept-select>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import DeptSelect from "@/components/deptSelect";

export default {
    name: "part-list",
    components: { DataList, DeptSelect },
    data() {
        return {
            btnFlag: false,
            layer: false,
            loading: false,
            deptFlag: false,
            deptFlag2: false,
            filter: {
                busNo: "",
                graphNo: "",
                materialName: "",
                batchNumber: "",
                outRoomStatus: "",
                type: "",
            },
            typeArrList: ["", "领料单出库", "机加工委托", "喷涂委托"],
            typeList: [
                { text: "原料库", value: 1 },
                { text: "成品库", value: 2 },
            ],
            form: {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                roomNo: "",
                receiveDepartment: "",
                rackNo: "",
                quantity: "",
                name: "",
                materialBatchNo: "",
                busNo: "",
                type: "",
                batchNoList: [],
                batchNoDTOList: [],
            },
            name: "",
            roomList: [],
            rackList: [],
            rackListnew: [],
            materialBatchNoList: [], //批次号
            materialBatchNo: [],
            outLayer: false,
            outForm: {
                busNo: "",
                type: "1",
                receiveDepartment: "装配车间",
            },
            outTypeList: [
                { text: "领料单出库", value: "1" },
                { text: "机加工委托", value: "2" },
                { text: "喷涂委托", value: "3" },
            ],
            deptList: [],
        };
    },
    activated() {
        this.getRoomList();
        // this.getDeptList();
    },
    methods: {
        selectClick(data) {
            if (data) {
                this.form.receiveDepartment = data.name;
            }
            this.deptFlag = false;
        },
        selectClick2(data) {
            if (data) {
                this.outForm.receiveDepartment = data.name;
            }
            this.deptFlag2 = false;
        },
        flush() {
            this.filter = {
                busNo: "",
                graphNo: "",
                materialName: "",
                batchNumber: "",
                outRoomStatus: "",
                type: "",
            };
            this.$refs.list.update(true);
        },
        infoShow(item) {
            this.layer = true;
            this.materialBatchNo = [];
            this.resetForm();

            const data = {
                graphNo: item.graphNo,
                model: "",
                specifications: "",
                classifyId: 0,
                pageNum: 1,
                pageSize: 20,
            };
            this.$http
                .post("/haolifa/material/pageInfo", data)
                .then((res) => {
                    this.form.materialGraphNo = item.graphNo;
                    this.form.orderNo = item.busNo;
                    this.form.name = item.materialName;
                    this.form.type = item.type;
                    this.form.receiveDepartment = item.deptName;
                    this.form.busId = item.busId;
                    this.form.busNo = item.busNo;
                    this.form.quantity = 0 - item.outQuantity;
                    this.form.price = 0;
                    if (res.list.length) this.form.price = res.list[0].price;

                    // 批次号填写
                    if (item.batchNumber) {
                        // this.form.batchNoList.push(item.batchNumber);
                        this.$http
                            .post("/haolifa/store-room/batch-no-list", {
                                batchNo: item.batchNumber,
                                graphNo: item.graphNo,
                            })
                            .then((res) => {
                                // this.form.roomNo = res[0].roomNo;
                                // this.getRoomId(res[0].roomNo);
                                // this.form.rackNo = res[0].rackNo;
                                this.materialBatchNoList = res.map((item) => {
                                    return {
                                        value: item.materialBatchNo + "+" + item.quantity + "+" + item.roomNo + "+" + item.rackNo,
                                        text: item.materialBatchNo + "(" + item.quantity + ")",
                                    };
                                });
                                // this.materialBatchNoList = [
                                //     {
                                //         value: res[0].materialBatchNo,

                                //         text:
                                //             res[0].materialBatchNo +
                                //             "(" +
                                //             res[0].quantity +
                                //             ")"
                                //     }
                                // ];
                            })
                            .catch((e) => {
                                this.loading = false;
                                this.$toast(e.msg || e.message);
                            });
                    } else {
                        this.$http
                            .post("/haolifa/store-room/batch-no-list", {
                                qty: item.outQuantity,
                                graphNo: item.graphNo,
                            })
                            .then((res) => {
                                // this.form.roomNo = res[0].roomNo;
                                // this.getRoomId(res[0].roomNo);
                                // this.form.rackNo = res[0].rackNo;
                                this.materialBatchNoList = res.map((item) => {
                                    return {
                                        value: item.materialBatchNo + "+" + item.quantity + "+" + item.roomNo + "+" + item.rackNo,
                                        text: item.materialBatchNo + "(" + item.quantity + ")",
                                    };
                                });
                            })
                            .catch((e) => {
                                this.loading = false;
                                this.$toast(e.msg || e.message);
                            });
                    }
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        //获取批次号
        getRackId(storeRoomRackNo) {
            if (this.form.roomNo && storeRoomRackNo && this.form.materialGraphNo) {
                let graphNo = encodeURI(this.form.materialGraphNo);
                this.$http
                    .get(`/haolifa/store-room/material-batch-nos?roomNo=${this.form.roomNo}&rackNo=${storeRoomRackNo}&graphNo=${graphNo}`)
                    .then((res) => {
                        this.materialBatchNoList = res.map((item) => {
                            return {
                                value: item.materialBatchNo + "+" + item.quantity + "+" + item.roomNo + "+" + item.rackNo,
                                text: item.materialBatchNo + "(" + item.quantity + ")",
                            };
                        });
                    })
                    .catch((e) => {
                        this.loading = false;
                        this.$toast(e.msg || e.message);
                    });
            }
        },
        getRoomId(roomNo) {
            if (!roomNo) {
                return;
            }
            this.$http
                .get(`/haolifa/store-room/rack/list/${roomNo}`)
                .then((res) => {
                    if (res.length === 0) {
                        this.rackList = [];
                        this.$toast("无对应库位");
                        return;
                    }
                    this.rackList = res.map((item) => {
                        return { value: item.rackNo, text: item.rackName };
                    });
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        getDeptList() {
            this.$http
                .get(`/haolifa/dept/list`)
                .then((res) => {
                    this.deptList = res.map((item) => {
                        return {
                            text: item.deptName,
                            value: item.deptName,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //获取所有库房
        getRoomList() {
            this.$http
                .get("/haolifa/store-room/listInfo?type=0")
                .then((res) => {
                    this.roomList = res
                        .filter((item) => !item.isDelete)
                        .map((item) => {
                            return { value: item.roomNo, text: item.name };
                        });
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        getRoomRackList() {
            this.$http
                .get("/haolifa/store-room/rack/pageInfo")
                .then((res) => {
                    this.rackList = res.list
                        .filter((item) => !item.isDelete)
                        .map((item) => {
                            return {
                                value: item.rackNo,
                                text: item.rackName,
                                roomId: item.storeRoomNo,
                                id: item.id,
                            };
                        });
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        submit() {
            if (!this.form.receiveDepartment) {
                this.$toast("请填入领料部门");
                return;
            }
            if (!this.materialBatchNo.length) {
                this.$toast("请选择批次号");
                return;
            }
            // if (
            //     !this.form.materialBatchNo ||
            //     !this.form.roomNo ||
            //     !this.form.rackNo
            // ) {
            //     this.$toast("请选择库房、库位及批次号");
            //     return;
            // }
            const { form } = this;
            this.loading = true;
            delete form.name;
            form.batchNoDTOList = [];
            for (let i = 0; i < this.materialBatchNo.length; i++) {
                let arr = this.materialBatchNo[i].split("+");
                form.batchNoDTOList.push({
                    materialBatchNo: arr[0],
                    quantity: arr[1],
                    rackNo: arr[3],
                    roomNo: arr[2],
                });
            }
            const method = "put";
            this.$http[method](`/haolifa/store-room/entryOut/outMaterial`, form)
                .then((res) => {
                    this.loading = false;
                    this.layer = false;
                    this.$refs.list.update();
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        allOut() {
            this.outLayer = true;
            this.outForm = {
                busNo: "",
                type: "1",
                receiveDepartment: "装配车间",
            };
        },
        allOutSave() {
            if (!this.outForm.busNo) {
                this.$toast("请输入单号");
                return;
            }
            this.$http
                .post("/haolifa/store-room/whole-out-bound", this.outForm)
                .then((res) => {
                    this.outLayer = false;
                    this.$toast("整单出库完成");
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        resetForm() {
            this.form = {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                roomNo: "",
                receiveDepartment: "",
                rackNo: "",
                quantity: "",
                name: "",
                materialBatchNo: "",
                busNo: "",
                type: "",
            };
        },
    },
};
</script>

<style lang="less">
.page-orders-list {
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

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.metalwork-info {
    padding: 30px 20px;
    tr:first-child td {
        padding: 0;
        border: none;
    }
    th {
        font-weight: normal;
        color: #888;
    }
    td {
        color: #444;
    }
    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }
    .checkbox-list {
        flex-wrap: wrap;
    }
    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}

.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
.cell-color {
    color: #de8a0c;
}
.el-select .el-input__inner {
    border-top: 0;
    border-left: 0;
    border-right: 0;
}
</style>
