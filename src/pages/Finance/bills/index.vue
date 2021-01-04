<template>
<div class="page-part-list">
  <div class="flex-v-center tool-bar">

  </div>
  <div class="flex-item scroll-y">
    <data-list ref="list" :param="filter" url="/haolifa/delivery/noticeList" method="post">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>发货通知单号</th>
        <th style="width:50px;">发货通知单</th>
        <th>订单号</th>
        <th>审批结果</th>
        <th>审批信息</th>
        <th>审批时间</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th class="t-right" style="width: 80px;">操作</th>
      </tr>
      <!-- item: 当前行数据; index: 当前行数 -->
      <template slot="item" slot-scope="{ item, index }">
        <td class="c-a">{{index}}</td>
        <td>{{item.deliveryNo}}</td>
        <td><a class='fixed-length' :href="item.deliveryUrl" :title="item.deliveryUrl">{{item.deliveryUrl}}</a></td>
        <td>{{item.contractOrderNo}}</td>
        <td>{{auditResultList[item.auditResult]}}</td>
        <td>{{item.auditInfo}}</td>
        <td>{{item.auditTime}}</td>
        <td>{{item.createTime}}</td>
        <td>{{item.updateTime}}</td>
        <td class="t-right">
          <a href="javascript:;" v-if="item.auditResult == 0" class="blue" @click="edit(item)">审核</a>
        </td>
      </template>
    </data-list>
  </div>
</div>
</template>

<script>
import DataList from '@/components/datalist'
export default {
  name: 'page-bills-list',
  components: { DataList },
  data () {
    return {
      filter: {

      },
        auditResultList:["待审核","审核通过","审核不通过"]
    }
  },
  methods: {
    edit (item) {
      this.$router.push(`/finance-bills/edit?id=${item.id}`)
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下发货通知单吗？<br>${item.deliveryNo}`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.delete(`/haolifa/material/delete/${item.id}`).then(res => {
            this.$toast('删除成功')
            this.$refs.list.update()
          }).catch(e => {
            this.$toast(e.msg)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.page-part-list{
  //
}
.fixed-length{
  width: 100px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
