<template>
    <div class="page-product-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}供应商设备</div>
            <div class="flex-v-center">
                <input-box v-model="form.name" class="flex-item mr-10" label="设备名称"></input-box>
                <input-box v-model="form.number" class="flex-item mr-10" label="设备数量"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.productFactory" class="flex-item mr-10" label="生产厂家"></input-box>
                <input-box v-model="form.servicedYears" class="flex-item mr-10" label="服役年限"></input-box>
            </div>
            <!-- <div class="flex-v-center">
      <input-box v-model="form.price" type="number" class="mr-10" label="采购金额"></input-box>
      <date-picker v-model="form.purchaseTime" class="flex-item mr-10" label="采购时间"></date-picker>
            </div>-->
            <div class="flex-v-center">
                <select-box v-model="form.type" :list="typeList" style="width: 25%" label="设备类型"></select-box>
                <input-box v-model="form.specification" class="flex-item ml-10 mr-10" label="型号规格"></input-box>
                <input-box v-model="form.supplierNo" class="flex-item ml-10 mr-10" label="供应商编号"></input-box>
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
    name: "page-product-add",
    data() {
        return {
            form: {
                id: "",
                name: "",
                number: "",
                productFactory: "",
                servicedYears: "",
                specification: "",
                type: "",
                supplierNo: ""
                // price:0,
                // purchaseTime:''
            },
            typeList: [
                { text: "制造设备", value: 0 },
                { text: "检测设备", value: 1 }
            ]
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.name && form.number && form.specification;
        }
    },
    activated() {
        this.form = {
            id: "",
            name: "",
            number: "",
            productFactory: "",
            servicedYears: "",
            specification: "",
            type: "",
            supplierNo: ""
        };
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "supplierequipment-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "supplierequipment-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/equipment/getInfo/${id}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            let url = this.form.id
                ? "/supplierequipment/edit"
                : "/supplierequipment/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/supplierequipment");
                }
            });
        },
        submit() {
            const { form } = this;
            let url = form.id
                ? "/supplierequipment/edit"
                : "/supplierequipment/add";
            this.loading = true;
            this.$http
                .post(
                    `/haolifa/equipment/supplier-${
                        form.id ? "update" : "save"
                    }`,
                    form
                )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/supplierproduct");
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
.page-product-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
