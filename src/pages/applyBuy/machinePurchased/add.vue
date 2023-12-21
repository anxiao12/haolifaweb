<template>
  <div class="apply-buy-add">
    <div class="content">
      <div class="title b f-18 mb-10">{{ isAdd ? '新增' : '编辑' }}采购订单</div>
      <div class="flex">
        <input-box v-model="form.demander" class="flex-item mr-10" label="需方" style="margin-right: 20px;"></input-box>
        <input-box v-model="form.demanderAddr" class="flex-item mr-10" label="需方地址"
          style="margin-right: 20px;"></input-box>
        <input-box v-model="form.demanderLinkman" class="flex-item mr-10" label="需方联系人"
          style="margin-right: 20px;"></input-box>
      </div>
      <div class="flex">
        <div class="flex-item mr-10 mycswhite">
          <el-select @change="chooseSupply" style="width:100%" placeholder='供应商编号' v-model="form.supplierNo" filterable>
            <el-option v-for="(item, index) in supplierList" :key="index" :label="item.text" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <input-box v-model="form.supplierAddr" class="flex-item mr-10" label="供方地址"
          style="margin-right: 20px;"></input-box>
        <input-box v-model="form.supplierLinkman" class="flex-item mr-10" label="供方联系人"
          style="margin-right: 20px;"></input-box>
        <input-box v-model="form.supplierPhone" class="flex-item mr-10" label="供方联系人电话"></input-box>
      </div>
      <div class="flex">
        <input-box v-model="form.supplierConfirmer" class="flex-item mr-10" label="供方确认人"
          style="margin-right: 20px;"></input-box>
        <date-picker v-model="form.confirmTime" class="flex-item mr-10" label="确认时间"
          style="margin-right: 20px;"></date-picker>
        <date-picker v-model="form.deliveryTime" class="flex-item mr-10" label="交货日期"
          style="margin-right: 20px;"></date-picker>
        <date-picker v-model="form.operateTime" class="flex-item mr-10" label="经办时间"
          style="margin-right: 20px;"></date-picker>
      </div>
      <div class="flex">
        <input-box v-model="form.operatorUserName" class="flex-item mr-10" label="经办人"
          style="margin-right: 20px;"></input-box>
        <input-box v-model="form.purchaseOrderNo" class="flex-item mr-10" label="采购订单号"
          style="margin-right: 20px;"></input-box>
        <select-box :list="payTypeList" v-model="form.payType" label="付款方式" class="flex-item mr-10"></select-box>
        <input-box v-model="form.supplierName" class="flex-item mr-10" label="提供方"
          style="margin-right: 20px;"></input-box>
      </div>
      <div class="flex">
        <input-box v-model="form.productOrderNo" class="flex-item mr-10" label="销售订单号"
          style="margin-right: 20px;width:25%"></input-box>
        <input-box v-model="form.specialRequire" maxlength="300" class="flex-item mr-10" label="特殊要求"
          style="margin-right: 20px;width:25%"></input-box>
      </div>
      <div class="b" style="margin: 20px 0 10px;">采购整机项</div>
      <!-- 产品名称，型号，规格，系列，压力，数量，采购价，分项金额，阀体，阀芯，密封材质，驱动形式，链接方式，阀轴材质，备注 -->
      <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.itemList" :key="i">
        <div class="flex-item">
          <div v-if="!isAdd" class="flex">
            <el-button @click="jumpLayer(i)">选择产品</el-button>
            <div class="flex-item mr-10"></div>
            <div class="flex-item mr-10"></div>
            <div class="flex-item mr-10"></div>
          </div>
          <div class="flex">
            <input-box :disabled='isEdit ? true : false' v-model="item.productName" class="flex-item mr-10"
              label="产品名称"></input-box>
            <el-select filterable placeholder="型号" class="flex-item mr-10 mycs" v-model="item.productModel"
              @change="onProductModelChange(i)">
              <el-option v-for="model in item.productModels" :key="model.code" :label="model.code"
                :value="model.code"></el-option>
            </el-select>
            <el-select filterable placeholder="规格" class="flex-item mr-10 mycs" v-model="item.specification"
              @change="onSpecificationChange(i)">
              <el-option v-for="spec in item.specifications" :key="spec.code" :label="spec.code"
                :value="spec.code"></el-option>
            </el-select>
            <el-select filterable placeholder="系列" class="flex-item mr-10 mycs" v-model="item.series"
              @change="onSeriesChange(i)">
              <el-option v-for="seriesItem in item.seriesList" :key="seriesItem.code" :label="seriesItem.code"
                :value="seriesItem.code"></el-option>
            </el-select>
          </div>
          <div class="flex">
            <input-box :disabled='isEdit ? true : false' v-model="item.nominalPressure" class="flex-item mr-10"
              label="压力"></input-box>
            <input-box @keydown='changeNum' v-model="item.productNumber" class="flex-item mr-10" label="数量"></input-box>
            <input-box v-model="item.purchasePrice" type="number" class="flex-item mr-10" label="采购价"></input-box>
            <input-box v-model="item.valveBodyMaterial" class="flex-item mr-10" label="阀体"></input-box>
          </div>
          <div class="flex">
            <input-box :disabled='isEdit ? true : false' v-model="item.valveCoreMaterial" class="flex-item mr-10"
              label="阀芯"></input-box>
            <input-box :disabled='isEdit ? true : false' v-model="item.sealingMaterial" class="flex-item mr-10"
              label="密封材质"></input-box>
            <input-box :disabled='isEdit ? true : false' v-model="item.driveForm" class="flex-item mr-10"
              label="驱动形式"></input-box>
            <input-box :disabled='isEdit ? true : false' v-model="item.connectionMethod" class="flex-item mr-10"
              label="链接方式"></input-box>
          </div>
          <div class="flex">
            <input-box :disabled='isEdit ? true : false' v-model="item.valveShaft" class="flex-item mr-10"
              label="阀轴材质"></input-box>
            <input-box :disabled='isEdit ? true : false' v-model="item.productColor" class="flex-item mr-10"
              label="颜色"></input-box>
            <input-box disabled v-model="item.itemAmount" type="number" class="flex-item mr-10" label="分项金额"></input-box>
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
      <layer v-if="layerFlag" title="产品" width="70%">
        <data-list ref="list" method="post" :page-size="15" :param="{ list: [filter[this.lineIndex]] }"
          url="/haolifa/whole/machine/product/listProductByParam">
          <tr slot="header">
            <th>
              序号
            </th>
            <th></th>
            <th>产品名称</th>
            <th>型号</th>
            <th>规格</th>
            <th>系列</th>
            <th>压力</th>
            <th>数量</th>
            <th>采购价</th>
            <th>阀体</th>
            <th>阀芯</th>
            <th>密封材质</th>
            <th>驱动形式</th>
            <th>链接方式</th>
            <th>阀轴材质</th>
            <th>颜色</th>
            <th>分项金额</th>
            <th>备注</th>
          </tr>
          <template slot="item" slot-scope="{ item,i }">
            <td class="c-a">{{ i }}</td>
            <td>
              <input type="checkbox" name="boxId" :value="i">
            </td>
            <td>{{ item.productName }}</td>
            <td>{{ item.productModel }}</td>
            <td>{{ item.specification }}</td>
            <td>{{ item.series }}</td>
            <td>{{ item.nominalPressure }}</td>
            <td>{{ item.productNumber }}</td>
            <td>{{ item.purchasePrice }}</td>
            <td>{{ item.valveBodyMaterial }}</td>
            <td>{{ item.valveCoreMaterial }}</td>
            <td>{{ item.sealingMaterial }}</td>
            <td>{{ item.driveForm }}</td>
            <td>{{ item.connectionMethod }}</td>
            <td>{{ item.valveShaft }}</td>
            <td>{{ item.productColor }}</td>
            <td>{{ item.itemAmount }}</td>
            <td>{{ item.remark }}</td>
          </template>
        </data-list>
        <div class="layer-btns">
          <btn flat color="#008eff" @click="confirmProduct">确认选择</btn>
          <btn flat color="#008eff" @click="layerFlag = false">关闭</btn>
        </div>
      </layer>
      <div class="flex">
        <btn big class="mr-20" @click="submit()">提交</btn>
        <btn big flat @click="cancel()">取消</btn>
      </div>
    </div>
  </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
  components: { DataList },
  name: "purchsemanage-purchaseadd",
  data() {
    return {
      lineIndex: 0,
      filter: [{
        productModel: '',
        specifications: '',
        series: '',
        supplierNo: '',
      }],
      editParamsForSuppler: [],
      layerFlag: false,
      selectedProductModel: '',
      selectedSpecification: '',
      supplierNumber: '',
      selectedSeries: '',
      supplierInfoList: [],
      supplierList: [],
      supList: [],
      ids: [],
      dataList: [],
      form: {
        id: '',
        deliveryTime: '',
        demander: '山西好利阀机械制造有限公司',
        demanderAddr: '山西省侯马经济开发区旺旺北支路东侧',
        demanderLinkman: '',
        demanderPhone: '',
        operateTime: '',
        operatorUserName: '',
        payType: '',
        purchaseOrderNo: '',
        productOrderNo: '',
        specialRequire: '',
        supplierAddr: '',
        supplierConfirmer: '',
        supplierLinkman: '',
        supplierName: '',
        supplierNo: '',
        supplierPhone: '',
        itemList: [
          {
            mulitiProduct: '',
            productName: '',
            productModel: '',
            specification: '',
            series: '',
            nominalPressure: '',
            productNumber: '',
            purchasePrice: '',
            valveBodyMaterial: '',
            valveCoreMaterial: '',
            sealingMaterial: '',
            driveForm: '',
            connectionMethod: '',
            valveShaft: '',
            productColor: "",
            itemAmount: '',
            remark: '',
            productModels: [],
            specifications: [],
            seriesList: [],
            mulitiProducts: [],
            tableList: []
          }
        ]
      },

      isAdd: true,
      isEdit: false,
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
  watch: {
    'form.itemList': {
      handler(newItemList) {
        newItemList.forEach(item => {
          const productNumber = parseFloat(item.productNumber);
          const purchasePrice = parseFloat(item.purchasePrice);
          if (!isNaN(productNumber) && !isNaN(purchasePrice)) {
            item.itemAmount = (productNumber * purchasePrice).toFixed(2); // Round to 2 decimal places
          } else {
            item.itemAmount = ''; // Clear itemAmount if either field is empty or non-numeric
          }
        });
      },
      deep: true
    }
  },
  computed: {
    calculateItemAmount() {
      return (item) => item.productNumber * item.purchasePrice;
    }
  },
  created() {
    let { ids, pageType, supList, dataList, isAdd, formId } = this.$route.query;
    this.isAdd = isAdd;
    if (formId) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
    if (supList) {
      this.supList = JSON.parse(supList)//供应商
    }
    if (ids) {
      this.ids = JSON.parse(ids)//每一行数据的id
    }
    if (dataList) {
      this.dataList = JSON.parse(dataList)//每一行选中的数据带过来
    }
    if (dataList) {
      this.form.itemList.splice(0, 1)
      let fetchParams = this.dataList.map((res, i) => {
        return {
          productModel: res.productModel,
          specifications: res.specifications,
          series: res.productSeries,
          supplierNo: this.supList[0].supplierCode
        }
      })
      fetchParams.map((res, index) => {
        this.filter[index] = res;
        this.initGetProductMessage([res], index)
      })
      for (let i = 0; i < JSON.parse(dataList).length; i++) {//合并采购，带进来产品数量等部分数据,控制显示的条数
        // this.form.itemList[i] = JSON.parse(dataList)[i]//切记，直接赋值是无法监听到变化的，所以需要用push，sort等方法,用this.$set
        //是因为如果你在组件实例化之后添加了新的表单项，这些新的项可能不会被自动捕获，无法确保新添加的项是响应式的
        this.form.itemList.push(JSON.parse(dataList)[i])
        this.$set(this.form.itemList[i], 'productNumber', JSON.parse(dataList)[i].productNumber);
        this.$set(this.form.itemList[i], 'purchasePrice', '');
        this.$set(this.form.itemList[i], 'itemAmount', '');
        this.$set(this.form.itemList[i], 'productModel', '');
        this.$set(this.form.itemList[i], 'productModels', []);
        this.$set(this.form.itemList[i], 'specifications', []);
        this.$set(this.form.itemList[i], 'seriesList', []);
      }
    }
    if (formId) {//编辑页面查询详情
      this.getInfo(formId)
    }
    if (!pageType) {//新增，加载全部供应商
      this.$http.post("/haolifa/whole/machine/supplier/listAll").then(res => {
        this.supplierList = res.map(item => {
          return { value: item.nickName, text: item.name, address: item.address, contact: item.contact, telephone: item.telephone };
        });
        this.supplierInfoList = res;
      });
    }
    if (supList) {//加载合并过来的供应商
      this.supplierList = JSON.parse(this.$route.query.supList).map(res => {
        return {
          value: res.supplierCode, text: res.supplierName, address: res.address, contact: res.contact, telephone: res.telephone
        }
      })
      this.form.supplierNo = this.supList[0].supplierCode;//默认展示供应商下拉列表中的第一个
      // this.chooseSupply(this.form.supplierNo) //如果是合并过来的先不需要调用及联菜单
      this.copyChooseSupply(this.form.supplierNo)
    }
  },
  methods: {
    changeNum() {
      //
    },
    confirmProduct() {
      this.$set(this.form.itemList[this.lineIndex], 'productNumber', '');
      this.$set(this.form.itemList[this.lineIndex], 'purchasePrice', '');
      let list = JSON.parse(JSON.stringify(this.$refs.list.list));
      let arr = document.getElementsByName("boxId");
      let dataList = []
      for (let i in arr) {
        if (arr[i].checked) {
          let rowScope = list[arr[i].value]
          if (rowScope) {
            dataList.push(list[arr[i].value]);
          }

        }
      }
      if (dataList.length > 1 || dataList.length === 0) {
        this.$toast('只能选择一条数据，请重新选择');
        return
      }
      this.$set(this.form.itemList, this.lineIndex, Object.assign({}, dataList[0], {
        productNumber: this.dataList.length > 0 && this.dataList[this.lineIndex].productNumber || this.form.itemList[this.lineIndex].productNumber,
        applyBuyId: this.dataList.length > 0 && this.dataList[this.lineIndex].id || this.form.itemList[this.lineIndex].id,
      }));

      this.form.itemList.forEach(res => {//计算分项金额
        res.itemAmount = res.purchasePrice * res.productNumber
      })
      this.$set(this.form.itemList[this.lineIndex], 'productModel', dataList[0].productModel);
      this.$set(this.form.itemList[this.lineIndex], 'specification', dataList[0].specification);
      this.$set(this.form.itemList[this.lineIndex], 'series', dataList[0].series);
      this.layerFlag = false
      this.$forceUpdate()
    },
    jumpLayer(i) {
      this.layerFlag = true
      this.lineIndex = i
    },
    getInfo(formId) {
      this.$http
        .get(`/haolifa/wholeMachinePurchaseOrder/detail/${formId}`)
        .then(res => {
          this.form = res;
          let result = res.itemList.map(res => {
            return {
              ...res,
              purchasePrice: res.unitPrice
            }
          })
          this.form.itemList = result;
          this.form.itemList.map((res, index) => {
            this.filter[index] = {
              productModel: res.productModel,
              specifications: res.specification,
              series: res.productSeries,
              supplierNo: this.form.supplierNo,
            }
            this.editParamsForSuppler.push({
              productModel: res.productModel,
              specifications: res.specification,
              series: res.productSeries,
            })
          })
          this.$http.post("/haolifa/whole/machine/product/listSupplierByParam", { list: this.editParamsForSuppler })
            .then(res => {
              if (res.length === 0) {
                this.$toast("未找到供应商");
                return;
              } else {
                this.supplierList = res.map(item => {
                  return { value: item.supplierCode, text: item.supplierName, address: item.address, contact: item.contact, telephone: item.telephone };
                });
              }
            })
            .catch(e => {
              this.$toast(e.message);
            });
        })
        .catch(e => {
          this.$toast(e.msg);
        });
    },
    getProductMessage(params, index) {//手动切换查询产品信息
      this.$http
        .post(`/haolifa/whole/machine/product/listProductByParam`, { 'list': params })
        .then(res => {
          this.$nextTick(() => {
            this.form.itemList[index].purchasePrice = res[0].purchasePrice//采购价
            this.form.itemList[index].productName = res[0].productName
            this.form.itemList[index].nominalPressure = res[0].nominalPressure//压力
            this.form.itemList[index].valveBodyMaterial = res[0].valveBodyMaterial
            this.form.itemList[index].valveCoreMaterial = res[0].valveCoreMaterial
            this.form.itemList[index].sealingMaterial = res[0].sealingMaterial
            this.form.itemList[index].driveForm = res[0].driveForm
            this.form.itemList[index].connectionMethod = res[0].connectionMethod
            this.form.itemList[index].valveShaft = res[0].valveShaft
            this.form.itemList[index].productColor = res[0].productColor
            this.form.itemList[index].remark = res[0].remark
          })
          this.$forceUpdate()
        })
        .catch(e => {
          this.$toast(e.msg || e.message);
        });

    },
    removeDuplicates(originalArray) {//去重
      const uniqueSet = new Set();
      return originalArray.filter(item => {
        if (!uniqueSet.has(item.productOrderNo)) {
          uniqueSet.add(item.productOrderNo);
          return true;
        }
        return false;
      });
    },
    initGetProductMessage(params, index) {//初始化产品信息
      this.$http
        .post(`/haolifa/whole/machine/product/listProductByParam`, { 'list': params })
        .then(res => {
          let { dataList } = this.$route.query;
          if (!dataList) {
            return;
          }
          let productOrderNoArr = []
          for (let i = 0; i < JSON.parse(dataList).length; i++) {//合并采购，带进来产品数量等部分数据；
            productOrderNoArr.push(this.dataList[i].productOrderNo)
          }
          this.form.productOrderNo = this.removeDuplicates(productOrderNoArr).join(',')//去重复展示销售订单号
          // if(res.length === 1){//不管是否多条，默认展示一条数据出来
          this.form.itemList[index] = Object.assign({}, res[0], { productNumber: JSON.parse(dataList)[index].productNumber, applyBuyId: JSON.parse(dataList)[index].id })
          this.form.itemList.forEach(res => {//计算分项金额
            res.itemAmount = res.purchasePrice * res.productNumber
          })
          // }
          if (res.length > 2) {
            this.$nextTick(() => {
              this.form.itemList.forEach(v => {
                v.tableList = res
              })
            })
          }
          this.$forceUpdate()
        })
        .catch(e => {
          this.$toast(e.msg || e.message);
        });

    },
    onProductModelChange(formIndex) {
      const selectedProductModel = this.form.itemList[formIndex].productModel;
      this.selectedProductModel = selectedProductModel
      this.form.itemList[formIndex].productModel = selectedProductModel
      this.form.itemList[formIndex].specifications = this.form.itemList[formIndex].productModels.filter(res => res.code === selectedProductModel)[0].child;
      this.form.itemList[formIndex].seriesList = [];//系列
      this.form.itemList[formIndex].specification = '';//规格
      this.form.itemList[formIndex].series = '';//系列值
      this.$forceUpdate()
    },
    onSpecificationChange(formIndex) {
      const selectedSpecification = this.form.itemList[formIndex].specification;
      this.selectedSpecification = selectedSpecification;
      this.form.itemList[formIndex].specification = selectedSpecification
      let choosedSpecification = this.form.itemList[formIndex].specifications.filter(res => res.code === selectedSpecification)[0].child
      this.form.itemList[formIndex].seriesList = choosedSpecification;
      this.form.itemList[formIndex].series = '';
      let message = [{
        "supplierNo": this.supplierNumber,
        "productModel": this.selectedProductModel,
        "productSeries": this.selectedSeries,
        "specifications": this.selectedSpecification
      }]
      this.getProductMessage(message, formIndex)
      this.$forceUpdate()

    },
    onSeriesChange(formIndex) {
      const selectedSeries = this.form.itemList[formIndex].series;
      this.selectedSeries = selectedSeries
      let message = [{
        "supplierNo": this.supplierNumber,
        "productModel": this.selectedProductModel,
        "productSeries": this.selectedSeries,
        "specifications": this.selectedSpecification
      }]
      this.getProductMessage(message, formIndex)
      this.$forceUpdate()

    },
    chooseSupply(val) {
      this.supplierNumber = val;
      let choosedObj = this.supplierList.filter(res => res.value === val)[0]
      this.form.supplierAddr = choosedObj.address;
      this.form.supplierLinkman = choosedObj.contact;
      this.form.supplierPhone = choosedObj.telephone;
      this.form.supplierName = choosedObj.text;
      let currentItemList = this.form.itemList.map((res, i) => {//每次切换产品重新获取数据
        return {
          productModel: res.productModel,
          specifications: res.specification,
          series: res.series,
          supplierNo: val
        }
      })
      currentItemList.map((res, index) => {
        this.filter[index] = res;
        this.initGetProductMessage([res], index)
      })
      this.getListCascadeBySupplierNo(val)
    },
    copyChooseSupply(val) {
      this.supplierNumber = val;
      let choosedObj = this.supplierList.filter(res => res.value === val)[0]
      this.form.supplierAddr = choosedObj.address;
      this.form.supplierLinkman = choosedObj.contact;
      this.form.supplierPhone = choosedObj.telephone;
      this.form.supplierName = choosedObj.text;
    },
    getListCascadeBySupplierNo(supplierNo) {//获取及联菜单型号
      this.$http
        .get(`/haolifa/whole/machine/product/listCascadeBySupplierNo/${supplierNo}`,)
        .then(res => {
          this.$nextTick(() => {
            this.form.itemList.forEach(item => {
              item.productModels = res
            })
          })
          this.$forceUpdate()
        })
        .catch(e => {
          this.$toast(e.msg || e.message);
        });
    },
    cancel() {
      this.$store.commit('DELMENUTABS', '/machinePurchased-order/add');
      this.$router.push('/machinePurchased-order/list')
    },
    addItem() {
      this.form.itemList.push({
        productName: '',
        productModel: '',
        specification: '',
        series: '',
        nominalPressure: '',
        productNumber: '',
        purchasePrice: '',
        valveBodyMaterial: '',
        valveCoreMaterial: '',
        sealingMaterial: '',
        driveForm: '',
        connectionMethod: '',
        valveShaft: '',
        productColor: '',
        itemAmount: '',
        remark: '',
      });
      if (this.supplierNumber) {
        this.getListCascadeBySupplierNo(this.supplierNumber)
      }
      this.$forceUpdate();
    },
    submit() {
      if (!this.form.demanderLinkman) {
        this.$toast('请输入需方联系人')
        return false
      }
      if (!this.form.deliveryTime) {
        this.$toast('请选择交货日期')
        return false
      }
      if (!this.form.purchaseOrderNo) {
        this.$toast('请输入采购订单号')
        return false
      }

      let { formId } = this.$route.query;
      console.log('this.form.itemList', this.form.itemList)
      this.form.itemList.forEach(v => {
        v.unitPrice = v.purchasePrice,
          v.remark = v.remark
      })
      let params = {}
      if (formId) {//如果是编辑
        params = Object.assign({}, this.form, { id: formId })
      } else if (this.dataList.length > 0) {//如果是合并过来的
        this.form.itemList.forEach(res => {
          delete res.id
        })
        params = Object.assign({}, this.form)
      } else {//新增
        params = Object.assign({}, this.form)
      }
      let url = ''
      if (this.dataList.length > 0) {//合并过来的
        url = '/haolifa/wholeMachinePurchaseOrder/mergeAdd'
      } else if (formId) {//编辑
        url = '/haolifa/wholeMachinePurchaseOrder/edit'
      } else {//新增
        url = '/haolifa/wholeMachinePurchaseOrder/add'
      }
      this.$http
        .post(
          url,
          params
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

  .mycswhite {
    input {
      border: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0;
      margin-top: 4px;
    }
  }
}
</style>
