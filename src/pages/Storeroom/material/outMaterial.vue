<template>
    <div class="page-outMaterial-form abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">零件出库</div>
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
                    label="订单号"
                    style="width: 25%"
                ></input-box>
                <input-box
                    v-model="form.price"
                    class="mr-10"
                    label="零件购买单价"
                    style="width: 25%"
                ></input-box>
                <!-- <input-box v-model="form.storeRoomRackNo" class="flex-item mr-10" label="库房货位号" style="width: 25%"></input-box> -->
                <input-box
                    v-model="form.receiveDepartment"
                    @click="deptFlag=true"
                    class="flex-item mr-20"
                    label="领料部门"
                ></input-box>
            </div>
            <div class="flex-v-center">
                <select-box
                    v-model="form.roomNo"
                    @change="getRoomId(form.roomNo)"
                    class="mr-10"
                    :list="roomList"
                    label="所属库房"
                    style="width: 20%"
                ></select-box>
                <select-box
                    v-model="form.rackNo"
                    @change="getRackId(form.rackNo)"
                    class="mr-10"
                    :list="rackList"
                    label="所属库位"
                    style="width: 20%"
                ></select-box>
                <select-box
                    v-model="form.materialBatchNo"
                    class="mr-10"
                    :list="materialBatchNoList"
                    label="批次号"
                    style="width: 20%"
                ></select-box>
                <input-box
                    v-model="form.quantity"
                    class="mr-10"
                    label="出库数量（负数）"
                    style="width: 20%"
                ></input-box>
                <!-- <input-box v-model="form.storeRoomId" class="flex-item mr-10" multi-line label="库房Id"></input-box>
                <input-box v-model="form.storeRoomRackId" class="flex-item mr-10" multi-line label="库房货位Id"></input-box>-->
            </div>
            <div
                class="flex-v-center"
                style="margin: 20px 0;"
            >
                <el-button
                    class="mr-20"
                    size="mini"
                    :loading="loading"
                    type="primary"
                    @click="submit"
                    :disabled="!canSubmit"
                >提交</el-button>
                <btn
                    big
                    flat
                    bg
                    class="ml-20 mr-20"
                    @click="cancel"
                >取消</btn>
            </div>
        </div>
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
    </div>
</template>

<script>
import DeptSelect from "@/components/deptSelect";
export default {
    name: "page-outMaterial-form",
    components: { DeptSelect },
    data() {
        return {
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
            },
            loading: false,
            deptFlag: false,
            name: "",
            roomList: [],
            rackList: [],
            rackListnew: [],
            deptList: [],
            materialBatchNoList: [], //批次号
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.materialGraphNo && form.quantity;
        },
    },
    activated() {
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
        };
        let item = this.$route.params;
        this.form.materialGraphNo = item.graphNo;
        this.form.price = item.price;
        this.form.name = item.name;
        this.getRoomList();
        // this.getDeptList();
    },
    created() {
        let item = this.$route.params;
        this.form.materialGraphNo = item.graphNo;
        this.form.price = item.price;
        this.form.name = item.name;
        this.getRoomList();

        // this.getRoomRackList();
        // this.getRoomId();
        // this.getRackId();
    },
    methods: {
        selectClick(data) {
            if (data) {
                this.form.receiveDepartment = data.name;
            }
            this.deptFlag = false;
        },
        //获取批次号
        getRackId(storeRoomRackNo) {
            if (this.form.roomNo && storeRoomRackNo && this.form.materialGraphNo) {
                let graphNo = encodeURI(this.form.materialGraphNo);
                this.$http.get(`/haolifa/store-room/material-batch-nos?roomNo=${this.form.roomNo}&rackNo=${storeRoomRackNo}&graphNo=${graphNo}`).then((res) => {
                    this.materialBatchNoList = res.map((item) => {
                        return {
                            value: item.materialBatchNo,
                            text: item.materialBatchNo + "(" + item.quantity + ")",
                        };
                    });
                });
            }
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
        getRoomId(roomNo) {
            if (!roomNo) {
                return;
            }
            this.$http.get(`/haolifa/store-room/rack/list/${roomNo}`).then((res) => {
                console.log(res);
                if (res.length === 0) {
                    this.rackList = [];
                    this.$toast("无对应库位");
                    return;
                }
                this.rackList = res.map((item) => {
                    return { value: item.rackNo, text: item.rackName };
                });
            });
        },
        //获取所有库房
        getRoomList() {
            this.$http.get("/haolifa/store-room/listInfo?type=0").then((res) => {
                this.roomList = res
                    .filter((item) => !item.isDelete)
                    .map((item) => {
                        return { value: item.roomNo, text: item.name };
                    });
            });
        },
        getRoomRackList() {
            this.$http.get("/haolifa/store-room/rack/pageInfo").then((res) => {
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
            });
        },
        getInfo(graphNo, name) {
            this.$http
                .get(`/haolifa/material/getInfo/${graphNo}`)
                .then((res) => {
                    // this.form[materialGraphNo] = res[graphNo]
                    for (let key in this.form) {
                        if (this.form[key] !== undefined) {
                            this.form.materialGraphNo = graphNo;
                        }
                        this.name = name;
                    }
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", "/material/outMaterial");
                    this.$router.push("/material");
                },
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            delete form.name;
            const method = "put";
            this.$http[method](`/haolifa/store-room/entryOut/outMaterial`, form)
                .then((res) => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", "/material/outMaterial");
                    this.$router.push("/material");
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
    },
};
</script>

<style lang="less">
.page-outMaterial-form {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
