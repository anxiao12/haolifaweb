<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">{{isAdd ? '新增' : '编辑'}}采购订单111</div>
            <div class="flex">
                <input-box v-model="form.demander" class="flex-item mr-10" label="需方" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.demanderAddr" class="flex-item mr-10" label="需方地址" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.demanderLinkman" class="flex-item mr-10" label="需方联系人" style="margin-right: 20px;"></input-box>
            </div>
             <div class="flex">
                <select-box :list="supplierList" v-model="form.supplierNo" @change="changeSupplier()" label="供应商编号" style="margin-right: 20px;width: 240px;"></select-box>
                <!-- <input-box v-model="form.supplierNo" class="flex-item mr-10" label="供应商编号"></input-box> -->
                <input-box v-model="form.supplierAddr" class="flex-item mr-10" label="供方地址" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.supplierLinkman" class="flex-item mr-10" label="供方联系人" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.supplierPhone" class="flex-item mr-10" label="供方联系人电话"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.supplierConfirmer" class="flex-item mr-10" label="供方确认人" style="margin-right: 20px;"></input-box>
               <date-picker v-model="form.confirmTime" class="flex-item mr-10" label="确认时间" style="margin-right: 20px;"></date-picker>
                <date-picker v-model="form.deliveryTime" class="flex-item mr-10" label="交货日期" style="margin-right: 20px;"></date-picker>
                <date-picker v-model="form.operateTime" class="flex-item mr-10" label="经办时间" style="margin-right: 20px;"></date-picker>
            </div>
            <div class="flex">
                <input-box v-model="form.operatorUserName" class="flex-item mr-10" label="经办人" style="margin-right: 20px;"></input-box>
                <input-box v-model="form.purchaseOrderNo" class="flex-item mr-10" label="采购订单号" style="margin-right: 20px;"></input-box>
                <select-box :list="payTypeList" v-model="form.payType" label="付款方式" class="flex-item mr-10"></select-box>
                <input-box v-model="form.supplierName" class="flex-item mr-10" label="提供方" style="margin-right: 20px;"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.productOrderNo" class="flex-item mr-10" label="销售订单号" style="margin-right: 20px;"></input-box>
            </div>
            <div class="b" style="margin: 20px 0 10px;">采购物料项</div>
                <!-- 产品名称，型号，规格，系列，压力，数量，采购价，分项金额，阀体，阀芯，密封材质，驱动形式，链接方式，阀轴材质，备注 -->
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.itemList" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <!-- <select-box :list="nameList" v-model="item.materialName" label="产品名称" class="flex-item mr-10"></select-box> -->
                        <!-- <select-box :list="tuhaoList" :filterable="true" :onchange="materialInfo(item)" v-model="item.materialGraphNo" label="物料图号" class="flex-item mr-10"></select-box> -->
                        <!-- <el-select class="flex-item mr-10 mycs" v-model="item.materialGraphNo" filterable @change="materialInfo(item)" placeholder="物料图号选择">
                            <el-option v-for="(obj,j) in tuhaoList" :key="j" :label="obj.text" :value="obj.value"></el-option>
                        </el-select> -->
                        <!-- <input-box v-model="item.materialName" class="flex-item mr-10" label="物料名称"></input-box>
                        <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="物料图号"></input-box>-->
                        <input-box v-model="item.productName"  class="flex-item mr-10" label="产品名称"></input-box>
                        <input-box v-model="item.productModel"  class="flex-item mr-10" label="型号"></input-box>
                        <input-box v-model="item.specification" class="flex-item mr-10" label="规格"></input-box>
                        <input-box v-model="item.series" class="flex-item mr-10" label="系列"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.nominalPressure" class="flex-item mr-10" label="压力"></input-box>
                        <input-box v-model="item.productNumber" class="flex-item mr-10" label="数量"></input-box>
                        <input-box v-model="item.unitPrice" type="number" class="flex-item mr-10" label="采购价"></input-box>
                        <input-box v-model="item.valveBodyMaterial" class="flex-item mr-10" label="阀体"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.valveCoreMaterial" class="flex-item mr-10" label="阀芯"></input-box>
                        <input-box v-model="item.sealingMaterial" class="flex-item mr-10" label="密封材质"></input-box>
                        <input-box v-model="item.driveForm"  class="flex-item mr-10" label="驱动形式"></input-box>
                        <input-box v-model="item.connectionMethod" class="flex-item mr-10" label="链接方式"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.valveShaft" class="flex-item mr-10" label="阀轴材质"></input-box>
                        <input-box v-model="item.itemAmount" type="number" class="flex-item mr-10" label="分项金额"></input-box>
                        <input-box v-model="item.remark" class="flex-item mr-10" label="备注"></input-box>
                    </div>
                </div>
                <div v-if="form.itemList.length > 1">
                    <icon-btn small @click="form.itemList.splice(i, 1)">close</icon-btn>
                </div>
            </div>
            <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加采购物料项</span>
                </div>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="cancel()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "purchsemanage-purchaseadd",
    data() {
        return {
            supplierInfoList: [],
            supplierList: [],
            form: {
                id:'',
                deliveryTime:'',
                demander:'山西好利阀机械制造有限公司',
                demanderAddr:'山西省侯马经济开发区旺旺北支路东侧',
                demanderLinkman:'',
                demanderPhone:'',
                operateTime:'',
                operatorUserName:'',
                payType:'',
                purchaseOrderNo:'',
                productOrderNo:'',
                supplierAddr:'',
                supplierConfirmer:'',
                supplierLinkman:'',
                supplierName:'',
                supplierNo:'',
                supplierPhone:'',
                itemList: [
                    {
                        productName:'',
                        productModel:'',
                        specification:'',
                        series:'',
                        nominalPressure:'',
                        productNumber:'',
                        unitPrice:'',
                        valveBodyMaterial:'',
                        valveCoreMaterial:'',
                        sealingMaterial:'',
                        driveForm:'',
                        connectionMethod:'',
                        valveShaft:'',
                        itemAmount:'',
                        remark:'',
                    }
                ]
            },
            isAdd: true,
            nameList: [],
            tuhaoList: [],
            payTypeList: [
                { value: "款到发货", text: "款到发货" },
                { value: "月结", text: "月结" },
                {
                    value: "先预付30%，发货前付清剩余货款",
                    text: "先预付30%，发货前付清剩余货款"
                },
                {
                    value: "收到发票后60天内付清货款",
                    text: "收到发票后60天内付清货款"
                }
            ]
        };
    },
    activated() {
        this.form = {
            id:'',
            deliveryTime:'',
            demander:'山西好利阀机械制造有限公司',
            demanderAddr:'山西省侯马经济开发区旺旺北支路东侧',
            demanderLinkman:'',
            demanderPhone:'',
            operateTime:'',
            operatorUserName:'',
            payType:'',
            purchaseOrderNo:'',
            productOrderNo:'',
            supplierAddr:'',
            supplierConfirmer:'',
            supplierLinkman:'',
            supplierName:'',
            supplierNo:'',
            supplierPhone:'',
            itemList: [
                {
                    productName:'',
                    productModel:'',
                    specification:'',
                    series:'',
                    nominalPressure:'',
                    productNumber:'',
                    unitPrice:'',
                    valveBodyMaterial:'',
                    valveCoreMaterial:'',
                    sealingMaterial:'',
                    driveForm:'',
                    connectionMethod:'',
                    valveShaft:'',
                    itemAmount:'',
                    remark:'',
                }
            ]
        };
        let { formId,pageType } = this.$route.query;
        this.form.id = formId;
        if(!pageType){
           this.$http.post("/haolifa/whole/machine/supplier/listAll").then(res => {
              this.supplierList = res.map(item => {
                  return { value: item.nickName, text: item.name };
              });
              this.supplierInfoList = res;
         });
        }
        if (formId) {
            // 加载详情
            this.isAdd = false;
            this.$http
                .get(`/haolifa/wholeMachinePurchaseOrder/detail/${formId}`)
                .then(res => {
                  console.log(res)
                     this.form = res;
                     this.form.itemList = res.itemList

                });
        }
    },
    mounted() {
        let { formId ,pageType} = this.$route.query;
        this.supplierList = JSON.parse(this.$route.query.supList).map(res =>{
          return {
            value: res.supplierCode, text: res.supplierName
          }
        })
        console.log('supplierList',this.supplierList)
        if(!pageType){
           this.$http.post("/haolifa/whole/machine/supplier/listAll").then(res => {
              this.supplierList = res.map(item => {
                  return { value: item.nickName, text: item.name };
              });
              this.supplierInfoList = res;
         });
        }
        if (formId) {
            // 加载详情
            this.isAdd = false;
            this.$http
                .get(`/haolifa/wholeMachinePurchaseOrder/detail/${formId}`)
                .then(res => {
                   this.form = res;
                     this.form.itemList = res.itemList
                });
        }
    },
    methods: {
      cancel(){
        this.$store.commit('DELMENUTABS', '/machinePurchased-order/add');
        this.$router.push('/machinePurchased-order/list')
      },
        materialInfo: function(item) {
            // this.$http.get(`/haolifa/price/material/getInfo/0?materialGraphNo=${item.materialGraphNo}`).then(res=>{
            //    item.specifications = res.specifications;
            //    item.material = res.material;
            //
            // });
        },
        changeSupplier: function() {
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
               productName:'',
                productModel:'',
                specification:'',
                series:'',
                nominalPressure:'',
                productNumber:'',
                unitPrice:'',
                valveBodyMaterial:'',
                valveCoreMaterial:'',
                sealingMaterial:'',
                driveForm:'',
                connectionMethod:'',
                valveShaft:'',
                itemAmount:'',
                remark:'',
            });
            this.$forceUpdate();
        },
        submit() {
            this.$http
                .post(
                    this.isAdd
                        ? "/haolifa//wholeMachinePurchaseOrder/add"
                        : "/haolifa//wholeMachinePurchaseOrder/edit",
                    this.form
                )
                .then(res => {
                    this.$toast(this.isAdd ? "创建成功" : "更新成功");
                    this.$store.commit(
                        "DELMENUTABS",
                        "/machinePurchased-order/add"
                    );
                   this.$router.push('/machinePurchased-order/list')
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
    .mycs {
        input {
            border: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 0;
            background: #f5f5f5;
            margin-top: 4px;
        }
    }
}
</style>
