<template>
    <div class="page-product-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form[0].id ? '编辑' : '新增'}}供应商产品</div>
            <div v-for="(item,i) in form" :key="i">
                <!-- <div class="flex-v-center">
                <input-box v-model="form.annualProduction" class="flex-item mr-10" label="年产量"></input-box>
                <input-box v-model="form.mainCustomer" class="flex-item mr-10" label="主要客户"></input-box>
                </div>-->
                <div class="flex-v-center">
                    <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="供货物料图号"></input-box>
                    <input-box v-model="item.materialName" class="flex-item mr-10" label="产品名称"></input-box>
                </div>
                <div class="flex-v-center">
                    <select-box v-model="item.materialType" :list="materialTypeList" style="width: 25%" label="产品类型"></select-box>
                    <select-box :list="supplierList" v-model="item.supplierNo" label="供应商" class="flex-item ml-10 mr-10"></select-box>
                    <!-- <input-box v-model="form.supplierNo" class="flex-item ml-10 mr-10" label="供应商编号"></input-box> -->
                </div>
                <icon-btn small v-if="form.length > 1" @click="removeForm(i)">close</icon-btn>
            </div>
            <div>
                <btn big class="mr-20" @click="addPro">添加产品</btn>
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
            form: [
                {
                    id: "",
                    annualProduction: "",
                    mainCustomer: "",
                    materialGraphNo: "",
                    materialName: "",
                    materialType: "",
                    supplierNo: ""
                }
            ],
            materialTypeList: [
                { text: "供货原料", value: 0 },
                { text: "其他原料", value: 1 }
                // { text: "阀体", value: 2 },
                // { text: "阀座", value: 3 },
                // { text: "阀板", value: 4 },
                // { text: "阀杆", value: 5 },
                // { text: "通用零件", value: 6 },
                // { text: "驱动", value: 7 },
                // { text: "标准件", value: 8 }
            ],
            supplierList: []
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            let flag = false;
            form.map(item => {
                flag = item.materialName && item.supplierNo;
            });
            return flag;
        }
    },
    activated() {
        this.form = [
            {
                id: "",
                annualProduction: "",
                mainCustomer: "",
                materialGraphNo: "",
                materialName: "",
                materialType: "",
                supplierNo: ""
            }
        ];
        this.getSupplierList();
    },
    created() {
        // let { id } = this.$route.query;
        // if (id !== undefined && this.$route.name === "supplierproduct-edit")
        //     this.getInfo(id);
        this.getSupplierList();
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/supplier-pro/info/${id}`)
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
        getSupplierList() {
            this.$http.get("/haolifa/supplier/list-all").then(res => {
                this.supplierList = res.map(item => {
                    return { value: item.suppilerNo, text: item.suppilerName };
                });
            });
        },
        cancel() {
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", "/supplierproduct/add");
                    this.$router.push("/supplierproduct/addList");
                }
            });
        },
        removeForm(index) {
            this.form.splice(index, 1);
        },
        addPro() {
            this.form.push({
                id: "",
                annualProduction: "",
                mainCustomer: "",
                materialGraphNo: "",
                materialName: "",
                materialType: "",
                supplierNo: ""
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            this.$http
                .post(`/haolifa/supplier-pro/save`, form)
                .then(res => {
                    this.$toast("添加成功");
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", "/supplierproduct/add");
                    this.$router.push("/supplierproduct/addList");
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
