<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">{{isAdd ? '新增' : '编辑'}}机加工订单</div>
            <div class="flex">
                <input-box v-model="form.demander" class="flex-item" label="需方" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.demanderAddr" class="flex-item" label="需方地址" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.demanderLinkman" class="flex-item" label="需方联系人" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.demanderPhone" class="flex-item" label="需方联系电话" style="margin-right: 20px;"></input-box>
            </div>
            <div class="flex">
                <select-box :list="supplierList" v-model="form.supplierNo" @change="changeSupplier()" label="供应商" style="margin-right: 20px;width: 240px;"></select-box>
                <input-box v-model="form.supplierAddr" class="flex-item" label="供方地址" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.supplierLinkman" class="flex-item" label="供方联系人" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.suppilerPhone" class="flex-item" label="供方联系电话" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.supplierConfirmer" class="flex-item" label="供方确认人" style="margin-right: 20px;"></input-box>
            </div>
            <div class="flex">
                <date-picker v-model="form.confirmTime" class="flex-item" label="确认时间" style="margin-right: 20px;"></date-picker>
                <date-picker v-model="form.deliveryTime" class="flex-item" label="交货时间" style="margin-right: 20px;"></date-picker>
                <date-picker v-model="form.operateTime" class="flex-item" label="经办时间" style="margin-right: 20px;"></date-picker>
                <input-box v-model="form.operatorUserName" class="flex-item" label="经办人" style="margin-right: 20px;"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.orderNo" class="flex-item" label="加工合同编号"></input-box>
                <input-box v-model="form.payType" class="flex-item" label="付款方式"></input-box>
                <date-picker v-model="form.planCompleteTime" class="flex-item" label="计划完成时间"></date-picker>
            </div>

            <div class="b" style="margin: 20px 0 10px;">加工物料项</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.itemList" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <select-box :list="nameList" v-model="item.materialName" label="物料名称" class="flex-item mr-10"></select-box>
                        <select-box :list="tuhaoList" v-model="item.materialGraphNo" label="物料图号" class="flex-item mr-10"></select-box>
                        <!-- <input-box v-model="item.materialName" class="flex-item mr-10" label="物料名称"></input-box>
                        <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="物料图号"></input-box>-->
                        <input-box v-model="item.number" type="number" class="flex-item mr-10" label="数量"></input-box>
                        <input-box v-model="item.unit" class="flex-item mr-10" label="单位"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.material" class="flex-item mr-10" label="材质"></input-box>
                        <input-box v-model="item.specification" class="flex-item mr-10" label="规格"></input-box>
                        <input-box v-model="item.unitPrice" type="number" class="mr-10" label="单价"></input-box>
                        <input-box v-model="item.unitWeight" type="number" class="mr-10" label="单重"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.remark" class="flex-item" label="备注"></input-box>
                    </div>
                </div>
                <div v-if="form.itemList.length > 1">
                    <icon-btn small @click="form.itemList.splice(i, 1)">close</icon-btn>
                </div>
            </div>
            <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加机加工物料项</span>
                </div>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="$store.commit('DELMENUTABS', '/purchsemanage-entrust/add');$router.back()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "purchsemanage-entrustadd",
    data() {
        return {
            supplierInfoList: [],
            supplierList: [],
            form: {
                id: null,
                confirmTime: "",
                deliveryTime: "",
                demander: "山西好利阀机械制造有限公司",
                demanderAddr: "山西省侯马经济开发区旺旺北支路东侧",
                demanderLinkman: "",
                demanderPhone: "",
                operateTime: "",
                operatorUserName: "",
                orderNo: "",
                suppilerPhone: "",
                supplierAddr: "",
                supplierConfirmer: "",
                supplierLinkman: "",
                supplierName: "",
                supplierNo: "",
                payType: "",
                planCompleteTime: "",
                itemList: [
                    {
                        id: "",
                        material: "",
                        materialGraphNo: "",
                        materialName: "",
                        number: 0,
                        remark: "",
                        specification: "",
                        unit: "",
                        unitPrice: 0,
                        unitWeight: 0
                    }
                ]
            },
            isAdd: true,
            nameList: [],
            tuhaoList: []
        };
    },
    activated() {
        this.form = {
            id: null,
            confirmTime: "",
            deliveryTime: "",
            demander: "山西好利阀机械制造有限公司",
            demanderAddr: "山西省侯马经济开发区旺旺北支路东侧",
            demanderLinkman: "",
            demanderPhone: "",
            operateTime: "",
            operatorUserName: "",
            orderNo: "",
            suppilerPhone: "",
            supplierAddr: "",
            supplierConfirmer: "",
            supplierLinkman: "",
            supplierName: "",
            supplierNo: "",
            payType: "",
            planCompleteTime: "",
            itemList: [
                {
                    id: "",
                    material: "",
                    materialGraphNo: "",
                    materialName: "",
                    number: 0,
                    remark: "",
                    specification: "",
                    unit: "",
                    unitPrice: 0,
                    unitWeight: 0
                }
            ]
        };
        let { formId } = this.$route.query;
        this.form.id = formId;
        // console.log(this.form.id)
        this.$http.get("/haolifa/supplier/list-all/").then(res => {
            this.supplierList = res.map(item => {
                return { value: item.suppilerNo, text: item.suppilerName };
            });
            this.supplierInfoList = res;
        });

        if (formId) {
            // 加载详情
            this.isAdd = false;
            this.$http
                .get("/haolifa/purchase-order/info/" + formId)
                .then(res => {
                    (this.form.id = res.order.id),
                        (this.form.demander = res.order.demander),
                        (this.form.demanderAddr = res.order.demanderAddr),
                        (this.form.demanderLinkman = res.order.demanderLinkman),
                        (this.form.demanderPhone = res.order.demanderPhone),
                        (this.form.operatorUserName =
                            res.order.operatorUserName),
                        (this.form.suppilerPhone = res.order.suppilerPhone),
                        (this.form.supplierAddr = res.order.supplierAddr),
                        (this.form.supplierConfirmer =
                            res.order.supplierConfirmer),
                        (this.form.supplierLinkman = res.order.supplierLinkman),
                        (this.form.supplierName = res.order.supplierName),
                        (this.form.supplierNo = res.order.supplierNo),
                        (this.form.payType = res.order.payType),
                        (this.form.planCompleteTime =
                            res.order.planCompleteTime),
                        (this.form.orderNo = res.order.purchaseOrderNo);
                    this.form.confirmTime = res.order.confirmTime.substring(
                        0,
                        10
                    );
                    this.form.deliveryTime = res.order.deliveryTime.substring(
                        0,
                        10
                    );
                    this.form.operateTime = res.order.operateTime.substring(
                        0,
                        10
                    );

                    this.form.itemList = res.items.map(item => {
                        return {
                            id: item.id,
                            material: item.material,
                            materialGraphNo: item.materialGraphNo,
                            materialName: item.materialName,
                            number: item.number,
                            remark: item.remark,
                            specification: item.specification,
                            unit: item.unit,
                            unitPrice: item.unitPrice,
                            unitWeight: item.unitWeight
                        };
                    });
                });
        }
    },
    mounted() {
        let { formId } = this.$route.query;
        this.form.id = formId;
        // console.log(this.form.id)
        this.$http.get("/haolifa/supplier/list-all/").then(res => {
            this.supplierList = res.map(item => {
                return { value: item.suppilerNo, text: item.suppilerName };
            });
            this.supplierInfoList = res;
        });

        if (formId) {
            // 加载详情
            this.isAdd = false;
            this.$http
                .get("/haolifa/purchase-order/info/" + formId)
                .then(res => {
                    (this.form.id = res.order.id),
                        (this.form.demander = res.order.demander),
                        (this.form.demanderAddr = res.order.demanderAddr),
                        (this.form.demanderLinkman = res.order.demanderLinkman),
                        (this.form.demanderPhone = res.order.demanderPhone),
                        (this.form.operatorUserName =
                            res.order.operatorUserName),
                        (this.form.suppilerPhone = res.order.suppilerPhone),
                        (this.form.supplierAddr = res.order.supplierAddr),
                        (this.form.supplierConfirmer =
                            res.order.supplierConfirmer),
                        (this.form.supplierLinkman = res.order.supplierLinkman),
                        (this.form.supplierName = res.order.supplierName),
                        (this.form.supplierNo = res.order.supplierNo),
                        (this.form.payType = res.order.payType),
                        (this.form.orderNo = res.order.purchaseOrderNo);
                    this.form.confirmTime = res.order.confirmTime.substring(
                        0,
                        10
                    );
                    this.form.deliveryTime = res.order.deliveryTime.substring(
                        0,
                        10
                    );
                    this.form.operateTime = res.order.operateTime.substring(
                        0,
                        10
                    );

                    this.form.itemList = res.items.map(item => {
                        return {
                            id: item.id,
                            material: item.material,
                            materialGraphNo: item.materialGraphNo,
                            materialName: item.materialName,
                            number: item.number,
                            remark: item.remark,
                            specification: item.specification,
                            unit: item.unit,
                            unitPrice: item.unitPrice,
                            unitWeight: item.unitWeight
                        };
                    });
                });
        }
    },
    methods: {
        changeSupplier: function() {
            console.log(this.form.supplierNo);
            this.supplierInfoList.forEach((item, i) => {
                if (item.suppilerNo == this.form.supplierNo) {
                    this.form.suppilerPhone = item.phone;
                    this.form.supplierAddr = item.address;
                    this.form.supplierLinkman = item.responsiblePerson;
                    this.form.supplierName = item.suppilerName;
                }
            });
            this.nameList = this.tuhaoList = [];
            if (!this.form.supplierNo) return;
            let params = {
                pageNum: 1,
                pageSize: 500,
                supplierNo: this.form.supplierNo
            };
            this.$http
                .post(`/haolifa/supplier-pro/list`, params)
                .then(res => {
                    let list = res.list;
                    this.nameList = list.map(item => {
                        return {
                            value: item.materialName,
                            text: item.materialName
                        };
                    });

                    this.tuhaoList = list.map(item => {
                        return {
                            value: item.materialGraphNo,
                            text: item.materialGraphNo
                        };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        addItem() {
            this.form.itemList.push({
                id: "",
                material: "",
                materialGraphNo: "",
                materialName: "",
                number: 0,
                remark: "",
                specification: "",
                unit: "",
                unitPrice: 0,
                unitWeight: 0
            });
            this.$forceUpdate();
        },
        submit() {
            const requireItem = {
                materialName: "物料名称",
                materialGraphNo: "物料图号",
                number: "数量",
                material: "材质",
                specification: "规格",
                unit: "单位",
                unitPrice: "单价",
                unitWeight: "单重"
            };
            let flag = true;
            this.form.itemList.forEach((item, i) => {
                for (let key in item) {
                    if (requireItem[key] && !item[key]) {
                        this.$toast(`请填写第 ${i + 1} 项 ${requireItem[key]}`);
                        flag = false;
                    }
                }
            });
            if (!flag) {
                return;
            }
            let url = this.isAdd
                ? "/purchsemanage-entrust/add"
                : "/purchsemanage-entrust/edit";
            this.$http
                .post(
                    this.isAdd
                        ? "/haolifa/purchase-order/save/1"
                        : "/haolifa/purchase-order/update",
                    this.form
                )
                .then(res => {
                    this.$toast(this.isAdd ? "创建成功" : "更新成功");
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/purchsemanage-entrust/addList");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
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
        max-width: 100%;
        margin: 0 auto;
    }
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>
