<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">{{form.id ? '编辑' : '新增'}}订单</div>
            <!-- <div class='flex'>
        <input-box v-model='form.orderContractNo' class='flex-item' label='成品合同订单号(上传订单合同附件上面)'></input-box>
            </div>-->
            <div class="flex" style="margin:50px 0;">
                <el-radio v-model="isCheckMaterial" label="1">走核料</el-radio>
                <el-radio v-model="isCheckMaterial" label="0">不走核料</el-radio>
            </div>
            <div class="flex" style="margin:50px 0;">
                <upload-box btnText="上传订单合同" :fileList="fileList" :onchange="uploadFile" :onremove="removeFile" style="width: 100%"></upload-box>
            </div>

            <!-- <div class='b' style='margin: 20px 0 10px;'>供货明细</div>
      <div class='card flex' style='margin-top: 0;' v-for='(item, i) in form.orderProductAssociates' :key='i' >
        <div class='flex-item'>
          <div class='flex'>
            <input-box v-model='item.productNo' class='flex-item mr-10' label='序号'></input-box>
            <input-box v-model='item.productName' class='flex-item mr-10' label='名称'></input-box>
            <input-box v-model='item.label' class='mr-10' label='产品型号'></input-box>
            <input-box v-model='item.productModel' class='flex-item mr-10' label='规格'></input-box>
          </div>
          <div class='flex'>
            <input-box v-model='item.productColor' class='flex-item mr-10' label='颜色'></input-box>
            <input-box v-model='item.productNumber' type='number' class='mr-10' label='数量'></input-box>
            <input-box v-model='item.price' class='flex-item mr-10' label='单价'></input-box>
            <input-box v-model='item.totalPrice' class='flex-item mr-10' label='合计'></input-box>
          </div>
          <div class="flex">
            <input-box v-model='item.materialDescription' class='flex-item mr-20' label='材质说明'></input-box>
            <input-box v-model='item.specification' class='flex-item mr-20' label='特殊要求'></input-box>
          </div>
          <div class='flex'>
            <input-box v-model='item.productRemark' class='flex-item' label='备注'></input-box>
          </div>
        </div>
        <div v-if='form.orderProductAssociates.length > 1'>
          <icon-btn small @click='form.orderProductAssociates.splice(i, 1)'>close</icon-btn>
        </div>
      </div>
      <div class='card a flex-center' @click='addItem()'>
        <div class='flex-v-center'>
          <i class='icon mr-10'>add</i>
          <span>添加供货项</span>
        </div>
            </div>-->
            <!-- <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>-->
        </div>
        <layer v-if="loading">
            <div class="abs t-center" style="padding: 20px;">
                <loading size="30"/>
                <div style="margin-top: 10px;">{{loadingMsg}}</div>
            </div>
        </layer>
    </div>
</template>

<script>
import fileToBase64 from "../../../utils/fileToBase64";
export default {
    name: "order-orderAdd",
    data() {
        return {
            loading: false,
            fileList: [],
            form: {
                orderContractUrl: ""
                // orderProductAssociates: []
            },
            isCheckMaterial: "1"
        };
    },
    mounted() {
        let { formId } = this.$route.query;
        this.form.id = formId;
        if (formId) {
        }
    },
    methods: {
        addItem() {
            // if (!this.form.orderProductAssociates) {
            //   this.form.orderProductAssociates = [];
            // }
            // this.form.orderProductAssociates.push({
            //   id: '',
            //   productName: '',
            //   productNumber: 0,
            //   productNo: '',
            //   productColor: '',
            //   productRemark: '',
            //   productModel: '',
            //   specification: '',
            //   unit: '',
            //   unitPrice: 0,
            //   unitWeight: 0
            // });
            this.form.orderProductAssociates.push({});
            this.$forceUpdate();
        },
        uploadFile(file, fileList) {
            this.loading = true;
            this.loadingMsg = "正在上传";
            fileToBase64(file.source).then(base64Str => {
                this.$http
                    .post("/haolifa/order-product/uploadContract", {
                        base64Source: base64Str,
                        fileName: file.name,
                        isCheckMaterial: this.isCheckMaterial
                    })
                    .then(res => {
                        this.$toast(!this.form.id ? "上传成功" : "更新成功");
                        this.loading = false;
                        this.$router.push("/order/addList");
                        this.orderContractUrl = res;
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        removeFile() {
            return new Promise((resolve, reject) => {
                this.form.orderContractUrl = "";
                resolve();
            });
        },
        submit() {
            if (!this.form.orderContractUrl) {
                this.$toast(`请上传订单`);
                return;
            }
            // const requireItem = {
            //   productNo: '产品序号',
            //   productName: '产品名称',
            //   productModel: '产品规格',
            //   productNumber: '产品数量',
            //   price: '产品单价',
            //   totalPrice: '产品总价'
            // }
            // if(this.form.orderProductAssociates.length < 1){
            //   this.$toast(`请至少添加一个供货项`);
            //   return;
            // }
            // for (var i = 0, len = this.form.orderProductAssociates.length; i < len; i++) {
            //   const item = this.form.orderProductAssociates[i];
            //   for (let key in requireItem) {
            //     if (!item[key]) {
            //       this.$toast(`请填写第 ${i + 1} 项 ${requireItem[key]}`);
            //       return;
            //     }
            //   }
            // }
            this.$http
                .post(
                    !this.form.id
                        ? "/haolifa/order-product/save"
                        : "/haolifa/purchase-order/update",
                    this.form
                )
                .then(res => {
                    this.$toast(!this.form.id ? "创建成功" : "更新成功");
                    this.$router.push("/order/addList");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
};
</script>

<style lang='less'>
.apply-buy-add {
    padding: 20px;
    .card {
        padding: 10px;
        margin: 20px 0;
        background: #f5f5f5;
    }
    .content {
        max-width: 1000px;
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
