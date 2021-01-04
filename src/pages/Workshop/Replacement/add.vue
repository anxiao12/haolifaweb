<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}更换料</div>
            <div class="flex-v-center">
                <input-box v-model="form.materialName" class="mr-10" hint="必填" style="width:50%" label="零件名称"></input-box>
                <input-box v-model="form.materialGraphNo" hint="必填" class="flex-item mr-10" label="零件号"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.materialCount" class="mr-10" label="零件数量" hint="必填，请输入数字" style="width: 50%" type="number"></input-box>
                <input-box v-model="form.materialUnit" class="flex-item mr-10" hint="必填" label="零件单位(如：根，个)"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.orderNo" class="mr-10" label="订单号" hint="必填" style="width: 50%"></input-box>
                <input-box v-model="form.responsiblePerson" class="flex-item mr-10" hint="必填" label="责任人"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.replaceReason" hint="必填" class="flex-item mr-10" multi-line label="更换原因"></input-box>
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
    name: "page-room-add",
    data() {
        return {
            typeList: [
                { text: "原料库", value: 1 },
                { text: "成品库", value: 2 }
            ],
            form: {
                id: "",
                materialName: "",
                materialGraphNo: "",
                materialCount: "",
                orderNo: "",
                materialUnit: "",
                responsiblePerson: "",
                replaceReason: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return (
                form.materialName &&
                form.materialGraphNo &&
                form.materialCount &&
                form.orderNo &&
                form.materialUnit &&
                form.responsiblePerson &&
                form.replaceReason
            );
        }
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "replacement-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/replace-material/info/${id}`)
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
            const method = form.id ? "put" : "post";
            this.$http[method](
                `/haolifa/replace-material/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/replacement");
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
