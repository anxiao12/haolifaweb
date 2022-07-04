<template>
    <div class="page-rack-add">
        <div class="form-content">
            <div class="title b f-18 mb-10">{{form.id ? '编辑' : '新增'}}库位</div>

            <input-box v-model="form.rackNo" label="库位编号"></input-box>
            <input-box v-model="form.rackName" label="库位名称"></input-box>
            <!-- <select-box v-model="form.status" :list="statusList" label="状态"></select-box> -->
            <select-box v-model="form.roomNo" :list="roomList" label="所属库房"></select-box>
            <input-box v-model="form.remark" label="备注" multi-line></input-box>

            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit">提交</btn>
                <!--:disabled="!canSubmit"-->
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-rack-add",
    data() {
        return {
            statusList: [
                { value: 0, text: "正常" },
                { value: 1, text: "删除" }
            ],
            roomList: [],
            form: {
                id: "",
                remark: "",
                rackNo: "",
                rackName: "",
                // status: '',
                roomNo: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.name && form.roomNo && form.address;
        }
    },
    activated() {
        this.form = {
            id: "",
            remark: "",
            rackNo: "",
            rackName: "",
            roomNo: ""
        };
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "rack-edit")
            this.getInfo(id);
        this.getRoomList();
    },
    methods: {
        getRoomList() {
            this.$http.get("/haolifa/store-room/listInfo?type=0").then(res => {
                this.roomList = res
                    .filter(item => !item.isDelete)
                    .map(item => {
                        return { value: item.roomNo, text: item.name };
                    });
            });
        },
        getInfo(id) {
            this.$http
                .delete(`/haolifa/store-room/rack/getInfo/${id}`)
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
                    this.$store.commit("DELMENUTABS", "/rack/add");
                    this.$router.push("/rack");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            const method = form.id ? "put" : "post";
            this.$http[method](
                `/haolifa/store-room/rack/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", "/rack/add");
                    this.$router.push("/rack");
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
.page-rack-add {
    padding: 30px 20px;
}
</style>
