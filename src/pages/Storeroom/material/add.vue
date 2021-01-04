<template>
<div class="page-material-add abs scroll-y">
  <div class="form-content">
    <div class="title b f-18">{{form.id ? '编辑' : '新增'}}零件</div>
    <div class="flex-v-center">
      <input-box v-model="form.name" class="mr-10" label="名称" style="width: 50%"></input-box>
      <input-box v-model="form.materialClassifyName" class="mr-10" label="分类名称" style="width: 25%"></input-box>
      <input-box v-model="form.materialClassifyId" class="mr-10" label="分类Id" style="width: 25%"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.graphNo" class="mr-10" label="图号" style="width: 50%"></input-box>
      <input-box v-model="form.model" class="mr-10" label="型号" style="width: 25%"></input-box>
      <input-box v-model="form.unit" class="mr-10" label="单位(如：根，个)" style="width: 25%"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.currentQuantity" class="mr-10" label="当前库存数量" style="width: 25%"></input-box>
      <input-box v-model="form.safeQuantity" class="mr-10" label="安全库存" style="width: 25%"></input-box>
      <input-box v-model="form.safetyFactor" class="mr-10" label="安全库存系数" style="width: 25%"></input-box>
      <input-box v-model="form.specifications" class="mr-10" label="规格" style="width: 25%"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.actualWeight" class="flex-item mr-10" label="实际单重" style="width: 25%"></input-box>
      <input-box v-model="form.theoreticalWeight" class="mr-10" label="理论单重" style="width: 25%"></input-box>
      <!--<input-box v-model="form.price" class="mr-10" label="单价" style="width: 25%"></input-box>-->
      <input-box v-model="form.taxRate" class="mr-10" label="税率" style="width: 25%"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.material" class="flex-item mr-10" label="材料"></input-box>
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
  name: 'page-material-add',
  data () {
    return {
      form: {
        id: '',
        actualWeight: '',
        currentQuantity: '',
        lockQuantity: '',
        graphNo: '',
        material: '',
        materialClassifyId: '',
        materialClassifyName: '',
        model: '',
        name: '',
        price: '',
        remark: '',
        safeQuantity: '',
        safetyFactor: '',
        specifications: '',
        taxRate: '',
        theoreticalWeight: '',
        unit: ''
      }
    }
  },
  computed: {
    canSubmit () {
      const { form } = this
      return form.name && form.graphNo
    }
  },
  created () {
    let { id } = this.$route.query
    if (id !== undefined && this.$route.name === 'material-edit') this.getInfo(id)
  },
  methods: {
    getInfo (id) {
      this.$http.get(`/haolifa/material/getInfo/${id}`).then(res => {
        for (let key in this.form) {
          if (this.form[key] !== undefined) this.form[key] = res[key]
        }
      }).catch(e => {
        this.$toast(e.msg || e.message)
      })
    },
    cancel () {
      this.$confirm({
        title: '您确定要离开此页面吗？',
        text: '您的表单将不会保存',
        color: 'red',
        btns: ['取消', '离开'],
        yes: () => {
          this.$router.back()
        }
      })
    },
    submit () {
      const { form } = this
      this.loading = true
      const method = form.id ? 'put' : 'post'
      this.$http[method](`/haolifa/material/${form.id ? 'update' : 'save'}`, form).then(res => {
        this.loading = false
        this.$router.replace('/material')
      }).catch(e => {
        this.loading = false
        this.$toast(e.msg || e.message)
      })
    }
  }
}
</script>

<style lang="less">
.page-material-add{
  padding: 30px 20px;
  .title{margin-bottom: 20px;}
}
</style>
