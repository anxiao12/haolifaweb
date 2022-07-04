<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18">{{form.entrustNo ? '编辑' : '新增'}}机加工单</div>
            <div class="flex">
                <input-box v-model="form.materialGraphName" class="flex-item" label="物料名称"></input-box>
                <input-box v-model="form.materialGraphNo" class="flex-item" label="物料图号"></input-box>
                <input-box v-model="form.number" class="flex-item" label="数量"></input-box>
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
                materialGraphName: "",
                materialGraphNo: "",
                number: "",
                actionType: 1,
                entrustNo: ""
            }
        };
    },
    created() {
        let { entrustNo } = this.$route.query;
        if (entrustNo !== undefined && this.$route.name === "machining-edit")
            this.getInfo(entrustNo);
    },
    methods: {
        getInfo(entrustNo) {
            this.$http
                .get(`/haolifa/entrust/info/${entrustNo}`)
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
        submit() {
            const requireItem = {
                materialGraphName: "物料名称",
                materialGraphNo: "图号",
                number: "数量"
            };

            this.$http
                .post("/haolifa/entrust/save", this.form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.$router.replace("/applyBuy-machining");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
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
