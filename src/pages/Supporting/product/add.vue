<template>
    <div class="page-product-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}成品</div>
            <div class="flex-v-center">
                <input-box v-model="form.name" class="flex-item mr-10" label="成品名称"></input-box>
                <input-box v-model="form.productNo" class="flex-item mr-10" label="成品编号（全局唯一）"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.fitComponent" class="flex-item mr-10" label="适配组件"></input-box>
                <input-box v-model="form.specifications" class="flex-item mr-10" label="成品规格（如：DN65，DN80）"></input-box>
            </div>
            <div class="f-14 c-6 b" style="margin: 10px 0 5px;">选择关联零件</div>
            <div class="flex-v-center" v-for="(item,i) in form.productMaterialList" :key="item.id">
                <select-box v-model="item.materialClassifyId" :list="typeList" @change="getMaterialList(item.materialClassifyId, i)" style="width: 25%" label="零件分类"></select-box>
                <select-box v-model="item.materialGraphNo" :list="materialList[item.materialClassifyId] || []" class="flex-item ml-10" style="width: 25%" label="零件图号"></select-box>
                <select-box v-model="item.replaceMaterialGraphNo" :list="materialList[item.materialClassifyId] || []" class="flex-item ml-10" style="width: 25%" label="该零件可替换的图号"></select-box>
                <input-box v-model="item.materialCount" type="number" class="flex-item ml-10" label="零件数量"></input-box>
                <icon-btn small v-if="form.productMaterialList.length > 1" @click="removeProductMaterialList(i)">close</icon-btn>
            </div>
            <div>
                <icon-btn bg small v-tooltip="'添加关联零件'" @click="addProductMaterialList">add</icon-btn>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.remark" class="flex-item mr-10" multi-line label="备注"></input-box>
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
            changeFlag: [],
            typeList: [],
            materialList: {},
            form: {
                id: "",
                name: "",
                productNo: "",
                specifications: "",
                fitComponent: "",
                remark: "",
                productMaterialList: [
                    {
                        materialClassifyId: "",
                        materialCount: "",
                        materialGraphNo: "",
                        replaceMaterialGraphNo: ""
                    }
                ]
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return (
                !!form.name &&
                !!form.productNo &&
                form.productMaterialList.every(v => {
                    return (
                        v.materialClassifyId &&
                        v.materialCount &&
                        v.materialGraphNo
                    );
                })
            );
        }
    },
    activated() {
        this.form = {
            id: "",
            name: "",
            productNo: "",
            specifications: "",
            fitComponent: "",
            remark: "",
            productMaterialList: [
                {
                    materialClassifyId: "",
                    materialCount: "",
                    materialGraphNo: "",
                    replaceMaterialGraphNo: ""
                }
            ]
        };
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "product-edit")
            this.getInfo(id);
        this.getTypeList();
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "product-edit")
            this.getInfo(id);
        this.getTypeList();
    },
    methods: {
        addProductMaterialList() {
            this.form.productMaterialList.push({
                id: Math.random(),
                materialClassifyId: "",
                materialCount: "",
                materialGraphNo: "",
                replaceMaterialGraphNo: ""
            });
        },
        removeProductMaterialList(index) {
            this.form.productMaterialList.splice(index, 1);
        },
        getMaterialList(id, i) {
            console.log(1);
            this.$http
                .get(`/haolifa/material/getListByClassifyId/${id}`)
                .then(res => {
                    this.$set(
                        this.materialList,
                        id,
                        res
                            .filter(item => !item.isDelete)
                            .map(item => {
                                return {
                                    value: item.graphNo,
                                    text: item.graphNo
                                };
                            })
                    );
                    if (this.changeFlag[i] || !this.$route.query.id) {
                        this.form.productMaterialList[i].materialCount = "";
                        this.form.productMaterialList[i].materialGraphNo = "";
                        this.form.productMaterialList[
                            i
                        ].replaceMaterialGraphNo = "";
                    }
                    this.changeFlag.splice(i, 1, true);
                });
        },
        getTypeList() {
            this.$http.get(`/haolifa/material/classify/list`).then(res => {
                this.typeList = res
                    .filter(item => !item.isDelete)
                    .map(item => {
                        return {
                            value: item.id,
                            text: item.classifyName,
                            list: []
                        };
                    });
                console.dir(res);
            });
        },
        getInfo(id) {
            this.$http
                .get(`/haolifa/product/getInfo/${id}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                    this.changeFlag = this.form.productMaterialList.map(
                        v => false
                    );
                    this.form.productMaterialList.forEach(v => {
                        this.getMaterialList(v.materialClassifyId);
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            const url = this.form.id ? "/product/edit" : "/product/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/product");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const method = form.id ? "put" : "post";
            const url = form.id ? "/product/edit" : "/product/add";
            this.$http[method](
                `/haolifa/product/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/product");
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
