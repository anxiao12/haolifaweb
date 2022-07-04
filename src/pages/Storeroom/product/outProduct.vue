<template>
    <div class="page-outMaterial-form abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">成品出库</div>
            <div class="flex-v-center">
                <input-box v-model="name" class="flex-item mr-10" label="成品名称" disabled="disabled"></input-box>
                <input-box v-model="form.productNo" class="flex-item mr-10" label="成品号" disabled="disabled"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.customerName" class="mr-10" label="客户名称" style="width: 25%"></input-box>
                <input-box v-model="form.customerNo" class="mr-10" label="客户代号" style="width: 25%"></input-box>
                <input-box v-model="form.orderNo" class="flex-item mr-10" label="订单号" style="width: 25%"></input-box>
                <input-box v-model="form.price" class="flex-item mr-10" label="出库单价（销售单价）" style="width: 25%"></input-box>
            </div>
            <div class="flex-v-center">
                <select-box v-model="form.storeRoomId" @change="getRoomId" class="mr-10" :list="roomList" label="所属库房" style="width: 33%"></select-box>
                <select-box v-model="form.storeRoomRackNo" @change="getRackId" class="mr-10" :list="rackListnew" label="所属库位" style="width: 33%"></select-box>
                <!-- <input-box v-model="form.storeRoomRackNo" label="库位号" class="mr-10" style="width: 20%"></input-box> -->
                <input-box v-model="form.quantity" class="mr-10" label="出库数量（负数）" style="width: 33%"></input-box>
                <!-- <input-box v-model="form.storeRoomId" class="flex-item mr-10" multi-line label="库房Id"></input-box>
                <input-box v-model="form.storeRoomRackId" class="flex-item mr-10" multi-line label="库房货位Id"></input-box>-->
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit" :disabled="!canSubmit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-outMaterial-form",
    data() {
        return {
            form: {
                productNo: "",
                customerName: "",
                customerNo: "",
                orderNo: "",
                price: "",
                quantity: "",
                storeRoomId: "",
                storeRoomRackId: "",
                storeRoomRackNo: ""
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
            return form.productNo && form.quantity;
        }
    },
    created() {
        let { productNo, name } = this.$route.query;
        if (productNo !== undefined && this.$route.name === "outProduct")
            this.getInfo(productNo, name);
        this.getRoomList();
        this.getRoomRackList();
        this.getRoomId();
        this.getRackId();
    },
    activated() {
        let { productNo, name } = this.$route.query;
        if (productNo !== undefined && this.$route.name === "outProduct")
            this.getInfo(productNo, name);
        this.getRoomList();
        this.getRoomRackList();
        this.getRoomId();
        this.getRackId();
    },
    methods: {
        getRackId() {
            let item = this.rackList.find(
                item => item.value === this.form.storeRoomRackNo
            );
            this.form.storeRoomRackId = item ? item.id : "";
        },
        getRoomId() {
            let item = this.rackList.filter(
                item => item.roomId === this.form.storeRoomId
            );
            this.rackListnew = item;
        },
        getRoomList() {
            this.$http.get("/haolifa/store-room/listInfo?type=0").then(res => {
                this.roomList = res
                    .filter(item => !item.isDelete)
                    .map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
            });
        },
        getRoomRackList() {
            this.$http.get("/haolifa/store-room/rack/pageInfo").then(res => {
                this.rackList = res.list
                    .filter(item => !item.isDelete)
                    .map(item => {
                        return {
                            value: item.rackNo,
                            text: item.rackName,
                            roomId: item.storeRoomNo,
                            id: item.id
                        };
                    });
            });
        },
        getInfo(productNo, name) {
            this.$http
                .get(`/haolifa/product/getInfo/${productNo}`)
                .then(res => {
                    // this.form[materialGraphNo] = res[graphNo]
                    for (let key in this.form) {
                        if (this.form[key] !== undefined) {
                            this.form.productNo = productNo;
                        }
                        this.name = name;
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            this.$router.back();
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const method = "put";
            this.$http[method](`/haolifa/store-room/entryOut/outMaterial`, form)
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/storeproduct");
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
.page-outMaterial-form {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
