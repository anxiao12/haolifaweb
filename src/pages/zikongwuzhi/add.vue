<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18">新增自控物质</div>
            <div class="flex">
                <input-box v-model="form.materialName" class="flex-item" label="名称" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.model" class="flex-item" label="型号" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.graphNo" class="flex-item" label="图号"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.specifications" class="flex-item" label="规格" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.classifyName" class="flex-item" label="物料分类"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.price" class="flex-item" label="单价(元)" type="number" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.quantity" class="flex-item" label="数量" type="number" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.unit" class="flex-item" label="单位（如 把，个）"></input-box>
            </div>
            <div class="flex mr-20">
                <btn big class="mr-20" @click="submit(1)">保存</btn>
                <btn big flat @click="close">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "zikongwuzhiAdd",
    data() {
        return {
            form: {
                materialName: "",
                model: "",
                graphNo: "",
                specifications: "",
                classifyName: "",
                price: 0,
                quantity: 0,
                unit: ""
            }
        };
    },
    activated() {
        this.form = {
            materialName: "",
            model: "",
            graphNo: "",
            specifications: "",
            classifyName: "",
            price: 0,
            quantity: 0,
            unit: ""
        };
    },
    methods: {
        submit(status) {
            this.$http
                .post("/haolifa/auto-control/add", this.form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.close();
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        close() {
            this.$store.commit("DELMENUTABS", "/zikongwuzhiAdd");
            this.$router.push("/zikongwuzhiList");
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
        max-width: 1000px;
        margin: 0 auto;
    }
}
</style>
