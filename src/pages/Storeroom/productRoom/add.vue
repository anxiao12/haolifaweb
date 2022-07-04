<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}库房</div>
            <div class="flex-v-center">
                <input-box v-model="form.name" class="flex-item mr-10" label="库房名称"></input-box>
                <input-box v-model="form.roomNo" class="mr-10" label="编号" style="width: 25%"></input-box>
                <select-box v-model="form.type" :list="typeList" style="width: 25%" label="类型"></select-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.address" class="flex-item mr-10" label="地址"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.remark" class="flex-item mr-10" multi-line label="描述"></input-box>
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
                name: "",
                roomNo: "",
                address: "",
                remark: "",
                type: 0
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.name && form.roomNo && form.address;
        }
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "room-edit")
            this.getInfo(id);
    },
    activated() {
        this.form = {
            id: "",
            name: "",
            roomNo: "",
            address: "",
            remark: "",
            type: 0
        };
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "room-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/store-room/getInfo/${id}`)
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
                `/haolifa/store-room/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/room");
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
