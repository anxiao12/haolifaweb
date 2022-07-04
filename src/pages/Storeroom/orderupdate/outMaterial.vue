<template>
    <div class="page-outMaterial-form abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">更换料出库</div>
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
                <input-box v-model="form.orderNo" class="mr-10" label="订单号" style="width: 25%"></input-box>
                <input-box v-model="form.price" class="mr-10" label="零件购买单价" style="width: 25%"></input-box>
                <!-- <input-box v-model="form.storeRoomRackNo" class="flex-item mr-10" label="库房货位号" style="width: 25%"></input-box> -->
                <input-box
                    v-model="form.receiveDepartment"
                    class="flex-item mr-10"
                    label="领料部门"
                    style="width: 25%"
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
            typeList: [{ text: "原料库", value: 1 }, { text: "成品库", value: 2 }],
            form: {
                materialGraphNo: "",
                orderNo: "",
                price: "",
                roomNo: "",
                receiveDepartment: "",
                rackNo: "",
                quantity: "",
                name: "",
                materialBatchNo: ""
            },
            name: "",
            roomList: [],
            rackList: [],
            rackListnew: [],
            materialBatchNoList: [], //批次号
            auditLayerItem: {
                auditInfo: "",
                auditResult: 3,
                replaceMaterialNo: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.materialGraphNo && form.quantity;
        }
    },
    activated() {
        let item = this.$route.params;
        this.form.materialGraphNo = item.materialGraphNo;
        this.form.orderNo = item.orderNo;
        this.form.quantity = -item.materialCount;
        this.form.name = item.materialName;
        this.auditLayerItem.replaceMaterialNo = item.replaceMaterialNo;
        this.getRoomList();
        // this.getRoomRackList();
        // this.getRoomId();
        // this.getRackId();
    },
    // created() {
    //     let item = this.$route.params;
    //     this.form.materialGraphNo = item.materialGraphNo;
    //     this.form.orderNo = item.orderNo;
    //     this.form.quantity = -item.materialCount;
    //     this.form.name = item.materialName;
    //     this.auditLayerItem.replaceMaterialNo = item.replaceMaterialNo;
    //     this.getRoomList();
    //     // this.getRoomRackList();
    //     // this.getRoomId();
    //     // this.getRackId();
    // },
    methods: {
        //获取批次号
        getRackId(storeRoomRackNo) {
            if (this.form.roomNo && storeRoomRackNo && this.form.materialGraphNo) {
                let graphNo = encodeURI(this.form.materialGraphNo);
                this.$http.get(`/haolifa/store-room/material-batch-nos?roomNo=${this.form.roomNo}&rackNo=${storeRoomRackNo}&graphNo=${graphNo}`).then(res => {
                    this.materialBatchNoList = res.map(item => {
                        return {
                            value: item.materialBatchNo,
                            text: item.materialBatchNo + "(" + item.quantity + ")"
                        };
                    });
                });
            }
        },
        getRoomId(roomNo) {
            if (!roomNo) {
                return;
            }
            this.$http.get(`/haolifa/store-room/rack/list/${roomNo}`).then(res => {
                console.log(res);
                if (res.length === 0) {
                    this.rackList = [];
                    this.$toast("无对应库位");
                    return;
                }
                this.rackList = res.map(item => {
                    return { value: item.rackNo, text: item.rackName };
                });
            });
        },
        //获取所有库房
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
                    this.$store.commit("DELMENUTABS", "/orderupdate/outMaterial");
                    this.$router.push("/orderupdate");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            delete form.name;
            const method = "put";
            this.$http[method](`/haolifa/store-room/entryOut/outMaterial`, form)
                .then(res => {
                    this.loading = false;
                    this.completeAudit(3);
                    this.$store.commit("DELMENUTABS", "/orderupdate/outMaterial");
                    this.$router.push("/orderupdate");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        completeAudit(auditResult) {
            this.auditLayerItem.auditResult = Number(auditResult);
            this.$http
                .post(`/haolifa/replace-material/audit`, this.auditLayerItem)
                .then(res => {})
                .catch(e => {
                    this.$toast(e.msg || e.mesage);
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
