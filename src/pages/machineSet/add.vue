<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}整机设置</div>
            <div class="flex-v-center">
                <input-box v-model="form.category" class="mr-10" label="类别" style="width: 35%"></input-box>
                <input-box v-model="form.productName" class="mr-10" label="产品名称" style="width: 30%"></input-box>
                <input-box v-model="form.productModel" class="mr-10" label="产品型号" style="width: 30%"></input-box>
                <!-- <select-box v-model="form.materialClassifyName" @change="typeId" :list="parttypeList" style="width: 25%" label="分类名称"></select-box> -->
            </div>
              <div class="flex-v-center">
                <input-box v-model="form.series" class="mr-10" label="系列" style="width: 35%"></input-box>
                <input-box v-model="form.specification" class="mr-10" label="规格" style="width: 30%"></input-box>
                <input-box v-model="form.nominalPressure" class="mr-10" label="公称压力" style="width: 35%"></input-box>
            </div>
               <div class="flex-v-center">
                <input-box v-model="form.valveBodyMaterial" class="mr-10" label="阀体材质" style="width: 35%"></input-box>
                <input-box v-model="form.valveCoreMaterial" class="mr-10" label="阀芯材质" style="width: 30%"></input-box>
                <input-box v-model="form.sealingMaterial" class="mr-10" label="密封材质" style="width: 30%"></input-box>
            </div>
               <div class="flex-v-center">
                <input-box v-model="form.valveShaft" class="mr-10" label="阀轴" style="width: 35%"></input-box>
                <input-box v-model="form.driveForm" class="mr-10" label="驱动形式" style="width: 30%"></input-box>
                <input-box v-model="form.structureForm" class="mr-10" label="结构形式" style="width: 30%"></input-box>
            </div>

            <div class="flex-v-center">
                <input-box v-model="form.connectionMethod" class="mr-10" label="连接方式" style="width: 35%"></input-box>
                <input-box v-model="form.productColor" class="mr-10" label="产品颜色" style="width: 30%"></input-box>
                <input-box v-model="form.medium" class="mr-10" label="介质" style="width: 30%"></input-box>

            </div>
            <div class="flex-v-center">
                <input-box v-model="form.temperature" class="mr-10" label="温度" style="width: 35%"></input-box>
                <!-- <input-box v-model="form.remarks" class="mr-10" multi-line label="备注" style="width: 30%"></input-box> -->
                <input-box v-model="form.remarks" class="mr-10"  label="备注" style="width: 30%"></input-box>
                <input-box v-model="form.supplierName" class="mr-10" label="供应商名称" style="width: 30%"></input-box>
            </div>
             <div class="flex-v-center">
                <input-box v-model="form.supplierCode" class="mr-10" label="供应商代号" style="width: 35%"></input-box>
                <input-box v-model="form.productGrade" class="mr-10" label="产品等级" style="width: 30%"></input-box>
                <input-box v-model="form.purchasePrice" class="mr-10" label="采购价" style="width: 30%"></input-box>
            </div>
              <div class="flex-v-center">
                <input-box v-model="form.sellingBottomPrice" class="mr-10" label="销售底价" style="width: 35%"></input-box>
                <input-box v-model="form.facePrice" class="mr-10" label="面价" style="width: 30%"></input-box>
                <input-box v-model="form.goodModel" class="mr-10" label="好利型号" style="width: 30%"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.other" class="mr-10" label="其他" style="width: 35%"></input-box>
            </div>
            <div class="flex-v-center">
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
    name: "page-machineSet-add",
    data() {
        return {
            parttypeList: [],
            form: {
                category:'',
                connectionMethod:'',
                createTime:'',
                driveForm:'',
                facePrice:'',
                goodModel:'',
                id:'',
                medium:'',
                modifyTime:'',
                nominalPressure:'',
                other:'',
                productGrade:'',
                productId:'',
                productModel:'',
                productName:'',
                purchasePrice:'',
                remarks:'',
                sealingMaterial:'',
                sellingBottomPrice:'',
                series:'',
                specification:'',
                structureForm:'',
                supplierCode:'',
                productColor:'',
                supplierName:'',
                temperature:'',
                valveBodyMaterial:'',
                valveCoreMaterial:'',
                valveShaft:'',

            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.category && form.supplierName;
        }
    },
    activated() {
        this.form = {
          category:'',
                connectionMethod:'',
                createTime:'',
                driveForm:'',
                facePrice:'',
                goodModel:'',
                id:'',
                medium:'',
                modifyTime:'',
                nominalPressure:'',
                other:'',
                productGrade:'',
                productId:'',
                productModel:'',
                productName:'',
                purchasePrice:'',
                remarks:'',
                sealingMaterial:'',
                sellingBottomPrice:'',
                series:'',
                specification:'',
                structureForm:'',
                supplierCode:'',
                productColor:'',
                supplierName:'',
                temperature:'',
                valveBodyMaterial:'',
                valveCoreMaterial:'',
                valveShaft:'',

        };
        let { editId } = this.$route.query;
        if (editId !== undefined && this.$route.name === "machineSet-edit"){
            this.getInfo(editId);
        }
    },
    created() {
        let { editId } = this.$route.query;
        if (editId !== undefined && this.$route.name === "machineSet-edit"){
            this.getInfo(editId);
        }
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/whole/machine/product/info/${id}`)
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
            const url = this.$route.query.editId ? "/machineSet/edit" : "/machineSet/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/machineSet");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const url =  this.$route.query.editId ? "/machineSet/edit" : "/machineSet/add";
            let interfaceUrl = this.$route.query.editId ? "update" : "save"
            this.$http.post(
                `/haolifa/whole/machine/product/${interfaceUrl}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push(`/machineSet?from=${'addPage'}`);
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
.page-part-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
