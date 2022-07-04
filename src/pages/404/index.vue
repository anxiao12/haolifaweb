<template>
<div class="page-404 abs flex-center">
  <div class="content">
    <h1>404</h1>
    <p>找不到此页面：<span>{{$route.path}}</span></p>
    <p>
      <router-link class="c-8 mr-15" @click="$router.back()">返回</router-link>
      <router-link class="c-8" to="/">回到首页</router-link>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'page-404'
}
</script>

<style lang="less">
.page-404{
  .content{width: 500px;height: 300px;}
  h1{font-size: 60px;line-height: 40px;}
}
</style>
