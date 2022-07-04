<template>
    <div class="page-parttype-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}零件分类</div>
            <div class="flex-v-center">
                <input-box v-model="form.classifyName" class="flex-item mr-10" label="分类名称"></input-box>
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
    name: "page-parttype-add",
    data() {
        return {
            form: {
                id: "",
                classifyName: "",
                remark: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.classifyName;
        }
    },
    activated() {
        this.form = {
            id: "",
            classifyName: "",
            remark: ""
        };
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "parttype-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "parttype-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/material/classify/getInfo/${id}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                    console.dir(res);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            const url = this.form.id ? "/parttype/edit" : "/parttype/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/parttype");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const method = form.id ? "put" : "post";
            const url = this.form.id ? "/parttype/edit" : "/parttype/add";
            this.$http[method](
                `/haolifa/material/classify/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/parttype");
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
.page-parttype-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
