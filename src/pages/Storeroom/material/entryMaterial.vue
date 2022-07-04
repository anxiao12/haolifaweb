<template>
    <div class="page-entryMaterial-form abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">零件入库</div>
            <div class="flex-v-center">
                <input-box v-model="form.name" class="flex-item mr-10" label="零件名称" disabled="disabled"></input-box>
                <input-box v-model="form.materialGraphNo" class="flex-item mr-10" label="图号" disabled="disabled"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.orderNo" class="mr-10" label="订单号" style="width: 20%"></input-box>
                <input-box v-model="form.price" class="mr-10" label="零件购买单价" style="width: 20%"></input-box>
                <input-box v-model="form.materialBatchNo" class="mr-10" label="批次号" style="width: 20%"></input-box>

                <!-- <select-box v-model="form.supplier" class="mr-10" :list="supplierList" label="供应商" style="width: 20%"></select-box> -->
                <input-box v-model="form.supplier" class="mr-10" label="供应商" style="width: 40%"></input-box>
            </div>
            <div class="flex-v-center">
                <select-box v-model="form.roomNo" @change="getRoomId(form.roomNo)" class="mr-10" :list="roomList" label="所属库房" style="width: 20%"></select-box>
                <select-box v-model="form.rackNo" class="mr-10" @change="getRackId" :list="rackList" label="所属库位" style="width: 20%"></select-box>
                <!-- <input-box v-model="form.storeRoomId" class="flex-item mr-10" label="库房Id"></input-box> -->
                <!-- <input-box v-model="form.storeRoomRackId" class="flex-item mr-10" label="库房货位Id"></input-box> -->
                <input-box v-model="form.quantity" class="mr-10" label="入库数量（正数）" style="width: 20%"></input-box>
            </div>
            <div></div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="submit" :disabled="!canSubmit">提交</el-button>
                <btn big flat bg class="ml-20 mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-entryMaterial-form",
    data() {
        return {
            typeList: [
                { text: "原料库", value: 1 },
                { text: "成品库", value: 2 }
            ],
            btLoading: false,
            form: {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                roomNo: "",
                supplier: "",
                // storeRoomId: '',
                rackNo: "",
                quantity: "",
                name: "",
                materialBatchNo: ""
            },
            name: "",
            roomList: [],
            rackList: [],
            rackListnew: []
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.materialGraphNo && form.quantity && form.supplier;
        }
    },
    activated() {
        this.form= {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                roomNo: "",
                supplier: "",
                // storeRoomId: '',
                rackNo: "",
                quantity: "",
                name: "",
                materialBatchNo: ""
            }
        let item = this.$route.params;
        this.form.materialGraphNo = item.graphNo;
        this.form.price = item.price;
        this.form.name = item.name;
        this.getRoomList();
    },
    created() {
        let item = this.$route.params;
        this.form.materialGraphNo = item.graphNo;
        this.form.price = item.price;
        this.form.name = item.name;
        // if (graphNo !== undefined && this.$route.name === 'entryMaterial-list') this.getInfo(graphNo, name)
        this.getRoomList();
        // this.getRoomRackList()
        // this.getRoomId()
        // this.getRackId()
    },
    methods: {
        getRackId() {
            // let item = this.rackList.find(item => item.value === this.form.storeRoomRackNo)
            // this.form.storeRoomRackId = item ? item.id : ''
        },
        // getRoomId () {
        //   let item = this.rackList.filter(item => item.roomId === this.form.storeRoomId)
        //   this.rackListnew = item
        // },
        //获取库房
        getRoomList() {
            // this.$http.get("/haolifa/store-room/listInfo?type=0").then(res => {
            this.$http.get("/haolifa/store-room/listInfo?type=1").then(res => {
                this.roomList = res
                    .filter(item => !item.isDelete)
                    .map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
            });
        },
        //获取库位
        getRoomId(roomNo) {
            if (!roomNo) {
                return;
            }
            this.$http
                .get(`/haolifa/store-room/rack/list/${roomNo}`)
                .then(res => {
                    console.log(res);
                    if (res.length === 0) {
                        this.$toast("无对应库位");
                        return;
                    }
                    this.rackList = res.map(item => {
                        return { value: item.rackNo, text: item.rackName };
                    });
                });
        },
        getInfo(graphNo, name) {
            this.$http
                .get(`/haolifa/material/getInfo/${graphNo}`)
                .then(res => {
                    // this.form[materialGraphNo] = res[graphNo]
                    for (let key in this.form) {
                        if (this.form[key] !== undefined) {
                            this.form.materialGraphNo = graphNo;
                        }
                        this.name = name;
                    }
                })
                .catch(e => {
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
                    this.$store.commit(
                        "DELMENUTABS",
                        "/material/entryMaterial"
                    );
                    this.$router.push("/material");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const method = "put";
            delete form.name;
            this.$http[method](
                `/haolifa/store-room/entryOut/entryMaterial`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit(
                        "DELMENUTABS",
                        "/material/entryMaterial"
                    );
                    this.$router.push("/material");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-entryMaterial-form {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
