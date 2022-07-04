<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">增加质检单</div>
            <div class="flex">
                <input-box v-model="form.orderNo" class="flex-item" label="订单号"></input-box>
                <input-box v-model="form.testingNumber" class="flex-item" label="检测数量"></input-box>
                <input-box v-model="form.qualifiedNumber" class="flex-item" label="合格数"></input-box>
                <input-box v-model="form.unqualifiedNumber" class="flex-item" label="不合格数"></input-box>
            </div>

            <div class="b" style="margin: 20px 0 10px;">不合格详情</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.unqualifiedList" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <input-box v-model="item.productModel" class="flex-item mr-10" label="产品型号" hint="必填"></input-box>
                        <input-box v-model="item.productSpecifications" class="flex-item mr-10" label="规格" hint="必填"></input-box>
                        <input-box v-model="item.unqualifiedNumber" class="mr-10" label="不合格数" hint="必填"></input-box>
                    </div>

                    <div class="flex">
                        <select-box v-model="item.reason" class="flex-item" :list="reasons" label="不合格现象描述"></select-box>

                        <!-- <input-box v-model="item.reason" class="flex-item" label="不合格现象描述"></input-box> -->
                    </div>
                </div>
                <div v-if="form.unqualifiedList.length > 1">
                    <icon-btn small @click="form.unqualifiedList.splice(i, 1)">close</icon-btn>
                </div>
            </div>
            <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加检验记录</span>
                </div>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "inspect-product-add",
    data() {
        return {
            form: {
                orderNo: "",
                testingNumber: "",
                qualifiedNumber: "",
                unqualifiedNumber: "",
                unqualifiedList: [
                    {
                        productModel: "",
                        productSpecifications: "",
                        reason: "",
                        unqualifiedNumber: ""
                    }
                ]
            },
            reasons: []
        };
    },
    mounted() {
        this.getReasons();
    },

    methods: {
        addItem() {
            this.form.unqualifiedList.push({
                productModel: "",
                productSpecifications: "",
                reason: "",
                unqualifiedNumber: ""
            });
        },
        submit() {
            this.$http
                .post("/haolifa/pro-inspect-res/save", this.form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.$router.replace("/inspect-product/addList");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        getReasons() {
            this.$http.get("/haolifa/pro-inspect-res/reasonList").then(res => {
                this.reasons = res.map(item => {
                    return {
                        value: item,
                        text: item
                    };
                });
            });
        }
    }
    // ap_20181115201511123488
};
</script>

<style lang="less">
.apply-buy-add {
    padding: 30px 20px;
    .card {
        padding: 10px;
        margin: 20px 0;
        background: #f5f5f5;
    }
    .content {
        max-width: 100%;
        margin: 0 auto;
    }
}
.page-room-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
