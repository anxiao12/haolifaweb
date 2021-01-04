<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18">{{entrustNo ? '编辑' : '新增'}}机加工单</div>
            <div class="flex">
                <input-box v-model="form.purchaseNo" class="flex-item mr-20" label="采购合同号"></input-box>
                <select-box :list="materialClassify" v-model="classifyId" @change="getMaterialGraphNoList()" label="零件名称" class="flex-item mr-20"></select-box>
                <select-box class="flex-item mr-20" :list="materialGraphNoList" @change="getBatch" v-model="form.materialGraphNo" label="零件图号"></select-box>
            </div>
            <!-- style="margin-right: 20px;width: 240px;" style="margin-right: 20px;width: 240px;"-->
            <div class="flex">
                <!--<input-box v-model="form.batchNumber" class="flex-item mr-20 " label="批次号"></input-box>-->
                <input-box v-model="form.processedGraphNo" class="flex-item mr-20" label="加工后图号"></input-box>
                <select-box class="flex-item mr-20" :list="batchNumberList" v-model="form.batchNumber" label="批次号"></select-box>
                <input-box v-model="form.number" class="flex-item mr-20" label="数量"></input-box>
                <select-box class="flex-item mr-20" :list="busTypeList" v-model="form.busType" label="类别"></select-box>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "apply-buy-add",
    data() {
        return {
            form: {
                purchaseNo: null,
                materialGraphName: null,
                materialGraphNo: null,
                number: 0,
                actionType: 1,
                processedGraphNo: "",
                batchNumber: "",
                busType: "1"
                // batchNumber:new Date().getTime()
            },
            entrustNo: "",
            classifyId: 0,
            materialClassify: [],
            materialGraphNoList: [],
            reg: /M$/,
            batchNumberList: [],
            busTypeList: [
                { value: "1", text: "订单需求" },
                { value: "2", text: "生产库存" }
            ]
        };
    },
    created() {
        let { entrustNo } = this.$route.query;
        this.getMaterialClassify();
        if (entrustNo !== undefined && this.$route.name === "machining-edit")
            this.getInfo(entrustNo);
    },
    methods: {
        getMaterialClassify() {
            this.$http.get(`/haolifa/material/classify/list`).then(res => {
                this.materialClassify = res
                    .map(item => {
                        return { value: item.id, text: item.classifyName };
                    })
                    .filter(item => {
                        if (item.text == "阀体" || item.text == "阀板")
                            return true;
                        return false;
                    });
                this.classifyId = this.materialClassify[0].value;
                this.form.materialGraphName = this.materialClassify[0].text;

                this.$http
                    .get(
                        `/haolifa/material/getListByClassifyId/${
                            this.materialClassify[0].value
                        }`
                    )
                    .then(res => {
                        this.materialGraphNoList = res.map(item => {
                            return { value: item.graphNo, text: item.graphNo };
                        });
                        this.materialGraphNoList = this.materialGraphNoList.filter(
                            item => this.reg.test(item.text)
                        );
                        this.form.materialGraphNo = this.materialGraphNoList[0].value;
                        this.getBatch();
                    });
            });
        },
        getMaterialGraphNoList() {
            this.materialClassify.forEach((item, i) => {
                if (item.value == this.classifyId) {
                    this.form.materialGraphName = item.text;
                }
            });
            this.$http
                .get(`/haolifa/material/getListByClassifyId/${this.classifyId}`)
                .then(res => {
                    this.materialGraphNoList = res.map(item => {
                        return { value: item.graphNo, text: item.graphNo };
                    });
                    this.materialGraphNoList = this.materialGraphNoList.filter(
                        item => this.reg.test(item.text)
                    );
                    this.form.materialGraphNo = this.materialGraphNoList[0].value;
                });
        },
        getBatch() {
            this.$http
                .get(
                    `/haolifa/store-room/material-batch-nos?graphNo=${
                        this.form.materialGraphNo
                    }`
                )
                .then(res => {
                    this.batchNumberList = res.map(item => {
                        return {
                            value: item.materialBatchNo,
                            text:
                                item.materialBatchNo + "(" + item.quantity + ")"
                        };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInfo(entrustNo) {
            this.entrustNo = entrustNo;
            this.$http
                .get(`/haolifa/entrust/info/${entrustNo}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                    // 编辑
                    this.materialClassify.forEach((item, i) => {
                        if (item.text == this.form.materialGraphName) {
                            this.classifyId = item.value;
                        }
                        this.$http
                            .get(
                                `/haolifa/material/getListByClassifyId/${
                                    this.classifyId
                                }`
                            )
                            .then(res => {
                                this.materialGraphNoList = res.map(item => {
                                    return {
                                        value: item.graphNo,
                                        text: item.graphNo
                                    };
                                });
                            });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        submit() {
            const requireItem = {
                materialGraphName: "物料名称",
                materialGraphNo: "图号",
                number: "数量"
            };
            // this.form.number = Number(this.form.number);
            if (this.entrustNo == "") {
                this.$http
                    .post("/haolifa/entrust/save", this.form)
                    .then(res => {
                        this.loading = false;
                        this.$toast("提交成功");
                        this.$router.replace("/applyBuy-machining/addList");
                    })
                    .catch(e => {
                        this.$toast(e.message || e.msg);
                    });
            } else {
                this.$http
                    .post(
                        `/haolifa/entrust/update/${this.entrustNo}`,
                        this.form
                    )
                    .then(res => {
                        this.loading = false;
                        this.$toast("更新成功");
                        this.$router.replace("/applyBuy-machining/addList");
                    })
                    .catch(e => {
                        this.$toast(e.message || e.msg);
                    });
            }
        }
    }
    // ap_20181115201511123488
};
</script>

<style lang="less">
.apply-buy-add {
    padding: 20px;
    .card {
        padding: 10px;
        margin: 20px 0;
        background: #f5f5f5;
    }
    .content {
        max-width: 100%;
        margin: 0 auto;
    }
}
</style>
