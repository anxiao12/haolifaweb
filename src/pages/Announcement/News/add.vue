<template>
  <div class='apply-buy-add'>
    <div class='content'>
      <div class='title b f-18 mb-10'>{{form.id ? '编辑' : '新增'}}新闻</div>
      <div class='flex'>
        <input-box v-model='form.title' class='flex-item' label='标题'></input-box>
      </div>
      <div class='flex'>
        <date-picker v-model='form.showTime' class='flex-item' label='显示时间'></date-picker>
      </div>
      <div class='flex'>
        <input-box multi-line v-model='form.content' class='flex-item' label='内容'></input-box>
      </div>

      <div class='flex'>
        <btn big class='mr-20' @click='submit()'>提交</btn>
        <btn big flat @click='$router.back()'>取消</btn>
      </div>
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
export default {
  name: 'notification-add',
  data() {
    return {
      loading: false,
      form: {
          id:"",
          title:"",
          showTime:"",
          content:"",
          type:1
      }
    };
  },
  mounted() {
    let item = this.$route.params;
    if(item.id){
        this.form.id = item.id;
        this.form.title = item.title;
        this.form.showTime = item.showTime;
        this.form.content = item.content;
    }
    
  },
  methods: {
    submit(){
        this.loading = true
        const method = this.form.id ? 'put' : 'post'
        if(!this.form.id){
          delete this.form.id
          this.$http[method](`/haolifa/message/add`, this.form).then(res => {
            this.loading = false
            this.$router.replace('/notification')
        }).catch(e => {
            this.loading = false
            this.$toast(e.msg || e.message)
        })
        }else{
          this.$http[method](`/haolifa/message/update`, this.form).then(res => {
            this.loading = false
            this.$router.replace('/notification')
        }).catch(e => {
            this.loading = false
            this.$toast(e.msg || e.message)
        })
        }
        
    }
  }
}
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



