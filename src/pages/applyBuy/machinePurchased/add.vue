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
              <div class="flex-item mr-10" >
                  <el-select @change="chooseSupply" style="width:100%" placeholder='供应商编号' v-model="form.supplierNo" filterable >
                    <el-option
                      v-for="(item,index) in supplierList"
                      :key="index"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </div>
                <!-- <select-box :list="supplierList" v-model="form.supplierNo" @change="changeSupplier()" label="供应商编号" style="margin-right: 20px;width: 240px;"></select-box> -->
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
            <div class="b" style="margin: 20px 0 10px;">采购整机项</div>
                <!-- 产品名称，型号，规格，系列，压力，数量，采购价，分项金额，阀体，阀芯，密封材质，驱动形式，链接方式，阀轴材质，备注 -->
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.itemList" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <input-box v-model="item.productName"  class="flex-item mr-10" label="产品名称"></input-box>
                        <!-- <input-box v-model="item.productModel"  class="flex-item mr-10" label="型号"></input-box>
                        <input-box v-model="item.specification" class="flex-item mr-10" label="规格"></input-box>
                        <input-box v-model="item.series" class="flex-item mr-10" label="系列"></input-box> -->
                  <div>
                    {{i}}
                      <label for="productModel">型号:</label>
                      <el-select v-model="item.productModel" @change="onProductModelChange(i)">
                          <el-option
                              label="请选择型号"
                              value=""
                          ></el-option>
                          <el-option
                              v-for="model in item.productModels"
                              :key="model.code"
                              :label="model.code"
                              :value="model"
                          ></el-option>
                      </el-select>
                  </div>
                  <div>
                      <label for="specification">规格:</label>
                      <el-select v-model="item.specification" @change="onSpecificationChange(i)">
                          <el-option
                              label="请选择规格"
                              value=""
                          ></el-option>
                          <el-option
                              v-for="spec in item.specifications"
                              :key="spec.code"
                              :label="spec.code"
                              :value="spec"
                          ></el-option>
                      </el-select>
                  </div>
                  <div>
                      <label for="series">系列:</label>
                      <el-select v-model="item.series">
                          <el-option
                              label="请选择系列"
                              value=""
                          ></el-option>
                          <el-option
                              v-for="seriesItem in item.seriesList"
                              :key="seriesItem.code"
                              :label="seriesItem.code"
                              :value="seriesItem"
                          ></el-option>
                      </el-select>
                  </div>
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
                    <span>添加采购整机项</span>
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
              products: [
                {
                  name: "Product 1",
                  models: [
                    {
                      name: "Model A",
                      specs: [
                        {
                          name: "Spec 1",
                          series: ["Series X", "Series Y"]
                        },
                        {
                          name: "Spec 2",
                          series: ["Series Z"]
                        }
                      ]
                    },
                    {
                      name: "Model B",
                      specs: [
                        {
                          name: "Spec 3",
                          series: ["Series W"]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "Product 2",
                  models: [
                    {
                      name: "Model C",
                      specs: [
                        {
                          name: "Spec 4",
                          series: ["Series V"]
                        }
                      ]
                    }
                  ]
                }
              ],
              selectedModel: null,
              selectedSpec: null,
              selectedSeries: null,
              supplierInfoList: [],
              supplierList: [],
              supList:[],
              ids:[],
              dataList:[],
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
                        productModels:[
                            {
                                code: "D41X3T-150LBQ",
                                child: [
                                    {
                                        code: "DN50",
                                        child: [
                                            {
                                                code: "Series A",
                                                child: ""
                                            },
                                            {
                                                code: "Series B",
                                                child: ""
                                            }
                                        ]
                                    },
                                    {
                                        code: "DN60",
                                        child: [
                                            {
                                                code: "Series X",
                                                child: ""
                                            },
                                            {
                                                code: "Series Y",
                                                child: ""
                                            }
                                        ]
                                    }
                                ]
                            },
                             {
                                code: "xxxxxxxxx",
                                child: [
                                    {
                                        code: "DN50xxx",
                                        child: [
                                            {
                                                code: "Series A",
                                                child: ""
                                            },
                                            {
                                                code: "Series B",
                                                child: ""
                                            }
                                        ]
                                    },
                                    {
                                        code: "DN60xxxx",
                                        child: [
                                            {
                                                code: "Series X",
                                                child: ""
                                            },
                                            {
                                                code: "Series Y",
                                                child: ""
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        specifications: [],
                        seriesList: []
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
                    productModels:[
                            {
                                code: "D41X3T-150LBQ",
                                child: [
                                    {
                                        code: "DN50",
                                        child: [
                                            {
                                                code: "Series A",
                                                child: ""
                                            },
                                            {
                                                code: "Series B",
                                                child: ""
                                            }
                                        ]
                                    },
                                    {
                                        code: "DN60",
                                        child: [
                                            {
                                                code: "Series X",
                                                child: ""
                                            },
                                            {
                                                code: "Series Y",
                                                child: ""
                                            }
                                        ]
                                    }
                                ]
                            },
                             {
                                code: "xxxxxxxxx",
                                child: [
                                    {
                                        code: "DN50xxx",
                                        child: [
                                            {
                                                code: "Series A",
                                                child: ""
                                            },
                                            {
                                                code: "Series B",
                                                child: ""
                                            }
                                        ]
                                    },
                                    {
                                        code: "DN60xxxx",
                                        child: [
                                            {
                                                code: "Series X",
                                                child: ""
                                            },
                                            {
                                                code: "Series Y",
                                                child: ""
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        specifications: [],
                        seriesList: []
                }
            ]
        };
        let { ids,pageType,supList,dataList} = this.$route.query;
        if(supList){
          this.supList = JSON.parse(supList)//供应商
        }
        if(ids){
          this.ids = JSON.parse(ids)//每一行数据的id
        }
        if(dataList){
          this.dataList = JSON.parse(dataList)//每一行选中的数据带过来
        }
        for (let i = 1; i < this.dataList.length; i++) {
            this.form.itemList.push({
                    productName:this.dataList[i].productName,
                    productModel:'',
                    specification:'',
                    series:'',
                    nominalPressure:this.dataList[i].nominalPressure,
                    productNumber:this.dataList[i].productNumber,
                    unitPrice:this.dataList[i].unitPrice,
                    valveBodyMaterial:this.dataList[i].valveBodyMaterial,
                    valveCoreMaterial:this.dataList[i].valveCoreMaterial,
                    sealingMaterial:this.dataList[i].sealingMaterial,
                    driveForm:this.dataList[i].driveForm,
                    connectionMethod:this.dataList[i].connectionMethod,
                    valveShaft:this.dataList[i].valveShaft,
                    itemAmount:this.dataList[i].itemAmount,
                    remark:this.dataList[i].remark,
            });
        }
        if(!pageType){//新增，加载全部供应商
           this.$http.post("/haolifa/whole/machine/supplier/listAll").then(res => {
              this.supplierList = res.map(item => {
                  return { value: item.nickName, text: item.name };
              });
              this.supplierInfoList = res;
         });
        }
         if(supList){//加载选中的供应商
          this.supplierList = JSON.parse(this.$route.query.supList).map(res =>{
            return {
              value: res.supplierCode, text: res.supplierName,address:res.address,contact:res.contact,telephone:res.telephone
            }
        })
        }
    },
    mounted() {
        let { ids,pageType,supList,dataList} = this.$route.query;
        if(supList){
          this.supList = JSON.parse(supList)//供应商
        }
        if(ids){
          this.ids = JSON.parse(ids)//每一行数据的id
        }
        if(dataList){
          this.dataList = JSON.parse(dataList)//每一行选中的数据带过来
        }
        for (let i = 1; i < this.dataList.length; i++) {
            this.form.itemList.push({
                    productName:this.dataList[i].productName,
                    productModel:'',
                    specification:'',
                    series:'',
                    nominalPressure:this.dataList[i].nominalPressure,
                    productNumber:this.dataList[i].productNumber,
                    unitPrice:this.dataList[i].unitPrice,
                    valveBodyMaterial:this.dataList[i].valveBodyMaterial,
                    valveCoreMaterial:this.dataList[i].valveCoreMaterial,
                    sealingMaterial:this.dataList[i].sealingMaterial,
                    driveForm:this.dataList[i].driveForm,
                    connectionMethod:this.dataList[i].connectionMethod,
                    valveShaft:this.dataList[i].valveShaft,
                    itemAmount:this.dataList[i].itemAmount,
                    remark:this.dataList[i].remark,
            });
        }
        if(!pageType){//新增，加载全部供应商
           this.$http.post("/haolifa/whole/machine/supplier/listAll").then(res => {
              this.supplierList = res.map(item => {
                  return { value: item.nickName, text: item.name };
              });
              this.supplierInfoList = res;
         });
        }
        if(supList){//加载选中的供应商
          this.supplierList = JSON.parse(this.$route.query.supList).map(res =>{
            return {
              value: res.supplierCode, text: res.supplierName,address:res.address,contact:res.contact,telephone:res.telephone
            }
        })
        }

    },
    methods: {
       onProductModelChange(formIndex) {
            const selectedProductModel = this.form.itemList[formIndex].productModel;
            this.form.itemList[formIndex].specifications = selectedProductModel.child;
            this.form.itemList[formIndex].seriesList = [];
            this.form.itemList[formIndex].specification = '';
            this.form.itemList[formIndex].series = '';
        },
        onSpecificationChange(formIndex) {
            const selectedSpecification = this.form.itemList[formIndex].specification;
            this.form.itemList[formIndex].seriesList = selectedSpecification.child;
            this.form.itemList[formIndex].series = '';
        },
      chooseSupply(val){
        let choosedObj= this.supplierList.filter(res => res.value === val)[0]
        this.form.supplierAddr = choosedObj.address;
        this.form.supplierLinkman = choosedObj.contact;
        this.form.supplierPhone = choosedObj.telephone;
        this.getListCascadeBySupplierNo(val)
      },
      getListCascadeBySupplierNo(supplierNo){
          this.$http
                .get(`/haolifa//whole/machine/product/listCascadeBySupplierNo/${supplierNo}`, )
                .then(res => {
                  //  this.form.itemList.forEach(item =>{
                  //    item.productModels = res
                  //  })
                  // this.products = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
      },
      cancel(){
        this.$store.commit('DELMENUTABS', '/machinePurchased-order/add');
        this.$router.push('/machinePurchased-order/list')
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
