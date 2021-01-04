<template>
<div class="relative notifications-icon">
  <icon-btn class="c-f" @click="notifShow=!notifShow">notifications</icon-btn>
  <bubble v-if="notifShow" pos="bottom" align="end" @close="notifShow=false" class="notifications-bubble">
    <div class="notification">
      <div class="no-data">
        <i class="icon">notifications</i>
        <p>无通知</p>
      </div>
    </div>
  </bubble>
</div>
</template>

<script>
export default {
  name: 'notification',
  data () {
    return {
      notifShow: false
    }
  }
}
</script>

<style lang="less">
.notification{
  padding: 20px 0;
  .no-data{
    text-align: center;opacity: .5;color: #666;
    i.icon{font-size: 60px;color: #aaa;}
  }
}
</style>
