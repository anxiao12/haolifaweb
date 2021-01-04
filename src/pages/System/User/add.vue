<template>
<div class="page-user-add">
  <div class="form-content">
    <div class="title b f-18 mb-20">新增用户</div>
    <input-box v-model="form.realName" label="姓名" class="flex-item"></input-box>
    <div class="flex-v-center mt-10 mb-10">
      <span class="mr-20">性别: </span>
      <radio-box v-model="form.sex" label="0" text="未知"></radio-box>
      <radio-box v-model="form.sex" label="1" text="男"></radio-box>
      <radio-box v-model="form.sex" label="2" text="女"></radio-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.username" class="flex-item mr-10" label="用户名"></input-box>
      <input-box v-if="editPwd" v-model="form.password" class="flex-item" label="密码"></input-box>
      <div v-else class="flex-item">
        <btn @click="editPwd=true">点击修改密码</btn>
      </div>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.nativePlace" class="flex-item mr-10" label="籍贯"></input-box>
      <input-box v-model="form.idCard" class="flex-item" label="身份证号"></input-box>
    </div>
    <div class="flex-v-center">
      <input-box v-model="form.userNo" class="flex-item mr-10" label="员工编号"></input-box>
      <input-box v-model="form.phone" class="flex-item" label="手机号码"></input-box>
    </div>
    <date-picker v-model="form.entryTime" label="入职时间" style="width: 50%;"></date-picker>
    <div class="flex-v-center" style="margin: 20px 0;">
      <btn big class="mr-20" @click="submit">提交</btn>
      <btn big flat bg class="mr-20" @click="cancel">取消</btn>
      <btn big flat @click="clear">清空</btn>
    </div>
  </div>
</div>
</template>

<script>
import form from './form'
import moment from 'moment'

export default {
  name: 'page-user-add',
  data () {
    return {
      editPwd: true,
      form: JSON.parse(JSON.stringify(form))
    }
  },
  created () {
    if (this.$route.query.id && this.$route.name === 'user-edit') {
      this.editPwd = false
      this.getUser()
    }
  },
  methods: {
    getUser () {
      const id = this.$route.query.id
      this.$http.get('/haolifa/user/' + id).then(res => {
        for (let key in this.form) this.form[key] = res[key]
        this.form.entryTime = moment(res.entryTime).format('YYYY-MM-DD')
        this.form.password = ''
      })
    },
    clear () {
      this.form = JSON.parse(JSON.stringify(form))
    },
    cancel () {
      this.$router.back()
    },
    verify () {
      const { form } = this
      let res = true
      for (let key in form) {
        if (form[key] === '' && key !== 'id' && key !== 'password') {
          this.$toast(`请输入 ${key}`)
          res = false
        }
      }
      if (this.editPwd && !form.password) res = false
      return res
    },
    submit () {
      if (!this.verify()) return
      const form = JSON.parse(JSON.stringify(this.form))
      if (!this.editPwd) delete form.password
      const method = form.id ? 'put' : 'post'
      this.$http[method]('/haolifa/user', form).then(res => {
        this.$router.push('/user')
        this.$toast('保存成功')
      }).catch(e => {
        this.$toast(e.message || e.msg)
      })
    }
  }
}
</script>

<style lang="less">
.page-user-add{
  padding: 30px 20px;
}
</style>
