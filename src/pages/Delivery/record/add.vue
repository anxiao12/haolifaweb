<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}发货记录</div>
            <div class="flex-v-center">
                <input-box v-model="form.contractOrderNo" class="flex-item mr-10" label="订单号"></input-box>
                <input-box v-model="form.deliveryNoticeNo" class="flex-item mr-10" label="发货通知单号"></input-box>
                <select-box v-model="form.deliveryClassify" :list="classifyList" class="flex-item mr-10" label="发货分类"></select-box>
                <date-picker v-model="form.deliveryTime" class="flex-item mr-10" label="发货日期/到货日期"></date-picker>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.operationNo" class="flex-item mr-10" label="运营单号"></input-box>
                <input-box v-model="form.customerNo" class="flex-item mr-10" label="客户代号 "></input-box>
                <input-box v-model="form.productCount" class="flex-item mr-10" label="成品发货数量"></input-box>
                <input-box v-model="form.packingMode" class="flex-item mr-10" label="包装方式"></input-box>
                <input-box v-model="form.pieceCount" class="flex-item mr-10" label="件数"></input-box>
                <input-box v-model="form.transportCompany" class="flex-item mr-10" label="承运单位"></input-box>
                <input-box v-model="form.courierNo" class="flex-item mr-10" label="运单号"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.collectProvince" class="flex-item mr-10" label="省市"></input-box>
                <input-box v-model="form.collectAddress" class="flex-item mr-10" label="地址"></input-box>
                <input-box v-model="form.collectName" class="flex-item mr-10" label="收货人"></input-box>
                <input-box v-model="form.collectPhone" class="flex-item mr-10" label="收货人电话"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.weightPiece" class="flex-item mr-10" label="重量/件数"></input-box>
                <input-box v-model="form.pricePiece" class="flex-item mr-10" label="单价/计件"></input-box>
                <input-box v-model="form.deliveryFee" class="flex-item mr-10" label="送货费"></input-box>
                <input-box v-model="form.totalFee" class="flex-item mr-10" label="运费总金额"></input-box>
                <input-box v-model="form.settlementWay" class="flex-item mr-10" label="结算方式"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.remark" class="flex-item mr-10" multi-line label="备注"></input-box>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <el-button size="mini" class="mr-20" :loading="loading" type="primary" :disabled="!canSubmit" @click="submit">保存</el-button>
                <btn big flat bg class="ml-20 mr-20" @click="cancel">取消</btn>
            </div>
            <layer v-if="loading">
                <div class="abs t-center" style="padding: 20px;">
                    <loading size="30"/>
                    <div style="margin-top: 10px;">{{loadingMsg}}</div>
                </div>
            </layer>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-part-add",
    data() {
        return {
            loading: false,
            loadingMsg: "",
            fileList: [],
            classifyList: [],
            form: {
                id: "",
                contractOrderNo: "",
                deliveryClassify: "",
                deliveryNoticeNo: "",
                deliveryTime: "",
                operationNo: "",
                customerNo: "",
                productCount: "",
                packingMode: "",
                pieceCount: "",
                transportCompany: "",
                courierNo: "",
                collectProvince: "",
                collectAddress: "",
                collectName: "",
                collectPhone: "",
                weightPiece: "",
                pricePiece: "",
                deliveryFee: "",
                totalFee: "",
                settlementWay: "",
                remark: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.contractOrderNo && form.deliveryClassify;
        }
    },
    created() {
        let { id } = this.$route.query;
        this.form.contractOrderNo = this.$route.query.contractOrderNo;
        this.form.deliveryNoticeNo = this.$route.query.deliveryNoticeNo;
        if (id !== undefined && this.$route.name === "delivery-record-edit")
            this.getInfo(id);
        this.getClassifyList();
    },
    methods: {
        getClassifyList() {
            this.$http.get("/haolifa/delivery/getClassifyList").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.code, text: item.name };
                });
            });
        },
        getInfo(id) {
            this.$http
                .get(`/haolifa/delivery/getInfo/${id}`)
                .then(res => {
                    this.form = res;
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
                    this.$router.back();
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            this.loadingMsg = "正在保存";
            this.$http
                .post(`/haolifa/delivery/${form.id ? "update" : "save"}`, form)
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/delivery-record/addList");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang='less'>
.page-part-add {
    padding: 30px 20px;

    .title {
        margin-bottom: 20px;
    }
}
</style>
