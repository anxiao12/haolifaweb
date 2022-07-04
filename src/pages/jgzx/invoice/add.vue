<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{ form.id ? '编辑' : '新增' }}发票</div>
            <div class="flex-v-center"></div>
            <div class="flex-v-center">
                <input-box v-model="form.orderNo" class="mr-10" label="合同编号" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.orderAmount" class="mr-10" label="合同金额" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.totalAmount" class="mr-10" label="发票金额" style="width: 50%"></input-box>
            </div>
            <input-box v-model="form.invoiceIssuing" class="mr-10" label="开票单位" style="width: 50%"></input-box>
            <input-box v-model="form.invoiceCompany" class="mr-10" label="收票单位" style="width: 50%"></input-box>
            <div class="flex-v-center">
                <input-box v-model="form.remark" class="mr-10" label="备注" style="width: 50%"></input-box>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat @click="$store.commit('DELMENUTABS', '/jgzx-invoice/add');$router.push('/jgzx-invoice/add')">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-part-add",
    data() {
        return {
            form: {
                orderNo: "",
                totalAmount: 0.0,
                orderAmount: 0.0,
                invoiceIssuing: "山西好利阀机械制造有限公司",
                invoiceCompany: "",
                remark: "",
                status: 1,
                type: 1
            }
        };
    },
    activated() {
        this.form = {
            orderNo: "",
            totalAmount: 0.0,
            orderAmount: 0.0,
            invoiceIssuing: "山西好利阀机械制造有限公司",
            invoiceCompany: "",
            remark: "",
            status: 1,
            type: 1
        };
    },
    methods: {
        submit() {
            const requireItem = {
                orderNo: "合同编号",
                totalAmount: "金额"
            };
            this.$http
                .post("/haolifa/invoice/save", this.form)
                .then(res => {
                    this.$store.commit("DELMENUTABS", "/jgzx-invoice/add");
                    this.$router.push("/jgzx-invoice/addList");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
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
