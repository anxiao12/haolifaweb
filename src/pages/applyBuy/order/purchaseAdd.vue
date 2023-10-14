<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">{{isAdd ? '新增' : '编辑'}}采购订单</div>
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
                <input-box v-model="form.orderNo" class="flex-item" label="采购合同编号"></input-box>
                <input-box v-model="form.payType" class="flex-item" label="付款方式"></input-box>
            </div>

            <div class="b" style="margin: 20px 0 10px;">采购物料项</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.itemList" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <!-- <select-box :list="nameList" v-model="item.materialName" label="物料名称" class="flex-item mr-10"></select-box> -->
                        <input-box v-model="item.materialName" label="物料名称" class="flex-item mr-10"></input-box>
                        <input-box v-model="item.materialGraphNo" label="物料图号" class="flex-item mr-10"></input-box>
                        <!-- <select-box :list="tuhaoList" :onchange="materialInfo(item)" v-model="item.materialGraphNo" label="物料图号" class="flex-item mr-10"></select-box> -->
                        <!-- <input-box v-model="item.materialName" class="flex-item mr-10" label="物料名称"></input-box>
                        <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="物料图号"></input-box>-->
                        <input-box v-model="item.number" type="number" class="mr-10" label="数量"></input-box>
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
                <!-- <div v-if="form.itemList.length > 1">
                    <icon-btn small @click="form.itemList.splice(i, 1)">close</icon-btn>
                </div>-->
            </div>
            <!-- <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加采购物料项</span>
                </div>
            </div>-->
            <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="goback()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "order-purchaseAdd",
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
            tuhaoList: [],
            ids: []
        };
    },
    activated() {
        this.supplierInfoList = [];
        this.supplierList = [];
        this.ids = [];
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
        this.ids = this.$route.params.ids;
        let itemList = this.$route.params.list;
        for (let i = 1; i < itemList.length; i++) {
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
        }
        itemList.forEach((item, i) => {
            this.form.itemList[i].materialGraphNo = item.materialGraphNo;
            this.form.itemList[i].materialName = item.materialName;
            this.form.itemList[i].number = item.purchaseNumber;
        });
        let supList = [];
        supList = this.$route.params.supList;
        this.supplierList = supList.map(item => {
            return { value: item.suppilerNo, text: item.supplierName };
        });
        this.supplierInfoList = supList;
    },
    mounted() {
        this.ids = this.$route.params.ids;
        let itemList = this.$route.params.list;
        for (let i = 1; i < itemList.length; i++) {
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
        }
        itemList.forEach((item, i) => {
            this.form.itemList[i].materialGraphNo = item.materialGraphNo;
            this.form.itemList[i].materialName = item.materialName;
            this.form.itemList[i].number = item.purchaseNumber;
        });
        let supList = [];//供应商列表
        supList = this.$route.params.supList;
        this.supplierList = supList.map(item => {
            return { value: item.suppilerNo, text: item.supplierName };
        });
        this.supplierInfoList = supList;
    },
    methods: {
        changeSupplier: function() {
            this.supplierInfoList.forEach((item, i) => {
                if (item.suppilerNo == this.form.supplierNo) {
                    this.form.suppilerPhone = item.phone;
                    this.form.supplierAddr = item.address;
                    this.form.supplierLinkman = item.responsiblePerson;
                    this.form.supplierName = item.supplierName;
                }
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
            if (!this.form.supplierNo) {
                this.$toast("请选择供应商");
                return;
            }
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
            this.form.applyBuyIds = this.ids;
            this.$http
                .post(
                    "/haolifa/purchase-order/save/0/" + this.ids.toString(),
                    this.form
                )
                .then(res => {
                    this.$toast("创建成功");
                    this.$store.commit(
                        "DELMENUTABS",
                        "/applyBuy-order/purchaseAdd"
                    );
                    this.$router.push("/applyBuy-order");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        goback() {
            this.$store.commit("DELMENUTABS", "/applyBuy-order/purchaseAdd");
            this.$router.push("/applyBuy-order");
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
