<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}</div>
            <div class="flex-v-center">
                <input-box v-model="form.inspectNo" class="flex-item mr-10" label="报检单号"></input-box>
                <input-box v-model="form.orderNo" class="mr-10" label="订单号" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.testingNumber" type="number" class="flex-item mr-10" label="检测数量"></input-box>
                <input-box v-model="form.reinspectNumber" type="number" class="flex-item mr-10" label="复检数量"></input-box>
                <input-box v-model="form.qualifiedNumber" type="number" class="flex-item mr-10" label="合格数量"></input-box>
                <input-box v-model="form.unqualifiedNumber" type="number" class="flex-item mr-10" label="不合格数量"></input-box>
            </div>
            <div class="flex-v-center" v-for="(item,i) in form.unqualifiedList" :key="item.reason">
                <select-box v-model="item.reason" class="flex-item mr-10" :list="reasonList" label="不合格原因"></select-box>
                <input-box v-model="item.unqualifiedNumber" type="number" class="flex-item mr-10" label="不合格数量"></input-box>
                <icon-btn small v-if="form.unqualifiedList.length > 1" @click="removeReason(i)">close</icon-btn>
            </div>
            <div>
                <icon-btn bg small v-tooltip="'添加'" @click="addReason">add</icon-btn>
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
            form: {
                id: "",
                inspectNo: "",
                orderNo: "",
                testingNumber: "",
                reinspectNumber: "",
                qualifiedNumber: "",
                unqualifiedNumber: "",
                unqualifiedList: [
                    {
                        reason: "",
                        unqualifiedNumber: ""
                    }
                ]
            },
            reasonList: []
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return (
                form.inspectNo &&
                form.orderNo &&
                form.testingNumber &&
                form.qualifiedNumber &&
                form.unqualifiedNumber &&
                form.reinspectNumber
            );
        }
    },
    created() {
        this.getReasonList();
        if (this.$route.params) {
            let item = this.$route.params;
            this.form.id = item.id;
            this.form.inspectNo = item.inspectNo;
            this.getInfo(this.form.inspectNo);
            // this.form.orderNo = item.orderNo;
            // this.form.testingNumber = item.testingNumber
            // this.form.reinspectNumber = item.reinspectNumber
            // this.form.qualifiedNumber = item.qualifiedNumber
            // this.form.unqualifiedNumber = item.unqualifiedNumber
        }
    },
    methods: {
        getReasonList() {
            this.$http
                .get(`/haolifa/pressure-inspect-res/pressure_reasonList`)
                .then(res => {
                    this.reasonList = res.map(function(item) {
                        return { value: item, text: item };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        addReason() {
            this.form.unqualifiedList.push({
                reason: "",
                unqualifiedNumber: ""
            });
        },
        getInfo(inspectNo) {
            this.$http
                .get(`/haolifa/pressure-inspect-res/info/${inspectNo}`)
                .then(res => {
                    this.form = res;
                });
        },
        removeReason(index) {
            this.form.unqualifiedList.splice(index, 1);
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
            const method = "post";
            this.$http[method](
                `/haolifa/pressure-inspect-res/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/stresstest/addList");
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
