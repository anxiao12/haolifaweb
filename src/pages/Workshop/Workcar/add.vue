<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">车间选择</div>
            <div class="flex-v-center">
                <select-box v-model="form.workShopType" class="mr-10" :list="workcarList" style="width:100%" label="车间类型"></select-box>
            </div>
            <div class="flex-v-center" v-show="form.workShopType == 2">
                <input-box v-model="form.supplierName" class="mr-10" label="外部车间名称" style="width: 50%" type="text"></input-box>
                <!--<input-box-->
                <!--v-model="form.supplierNo"-->
                <!--class="flex-item mr-10"-->
                <!--label="外部车间编号"-->
                <!--&gt;</input-box>-->
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "workcar-add",
    data() {
        return {
            workcarList: [
                { text: "内部车间1", value: 1 },
                { text: "内部车间2", value: 3 },
                { text: "外部", value: 2 }
            ],
            form: {
                id: "",
                workShopType: "",
                supplierName: "",
                supplierNo: ""
            }
        };
    },
    computed: {
        // canSubmit () {
        //   const { form } = this
        //   return form.materialName && form.materialGraphNo && form.materialCount && form.orderNo && form.materialUnit && form.responsiblePerson && form.replaceReason
        // }
    },
    created() {
        let { id } = this.$route.query;
        this.form.id = id;
    },
    methods: {
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
            const method = "post";
            this.$http[method](`/haolifa/entrust/allotEntrust`, form)
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/workcar");
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
.page-room-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
