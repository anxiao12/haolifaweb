<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '审核' : '新增'}}发货通知单</div>
            <div class="flex-v-center"></div>
            <div class="flex-v-center">
                <input-box v-model="form.deliveryNo" class="mr-10" label="发货单号" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center">
                <span class="mr-20">是否同意:</span>
                <radio-box v-model="form.auditResult" label="1" text="同意"></radio-box>
                <radio-box v-model="form.auditResult" label="2" text="不同意"></radio-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.auditInfo" class="mr-10" label="备注" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit" :disabled="!canSubmit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
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
            form: {
                id: "",
                contractOrderNo: "",
                deliveryUrl: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.contractOrderNo && form.deliveryUrl;
        }
    },
    activated() {
        this.form = {
            id: "",
            contractOrderNo: "",
            deliveryUrl: ""
        };
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "bills-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "bills-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/delivery/noticeInfo/${id}`)
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
                    this.$store.commit("DELMENUTABS", "/finance-bills/edit");
                    this.$router.push("/finance-bills");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            this.loadingMsg = "正在保存";
            this.$http
                .post("/haolifa/delivery/auditNotice", {
                    auditInfo: form.auditInfo,
                    auditResult: form.auditResult,
                    deliveryNo: form.deliveryNo
                })
                .then(res => {
                    this.loading = false;

                    this.$store.commit("DELMENUTABS", "/finance-bills/edit");
                    this.$router.push("/finance-bills");
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
