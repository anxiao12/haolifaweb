<template>
<div class="page-outList-list">
  <div class="flex-v-center tool-bar">

  </div>
  <div class="flex-item scroll-y">
    <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/store-room/entryOut/pageInfo" method="get">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>客户名称</th>
        <th>客户代号</th>
        <th>订单号</th>
        <th>出库单价（销售单价）</th>
        <th>成品号</th>
        <th>出库数量（负数）</th>
        <th>库房Id</th>
        <th>库房货位Id</th>
        <th>库房货位号</th>
      </tr>
      <!-- item: 当前行数据; index: 当前行数 -->
      <template slot="item" slot-scope="{ item, index }">
        <td class="c-a">{{index}}</td>
        <td>{{item.customerName}}</td>
        <td>{{item.customerNo}}</td>
        <td>{{item.orderNo}}</td>
        <td>{{item.price}}</td>
        <td>{{item.productNo}}</td>
        <td>{{item.quantity}}</td>
        <td>{{item.storeRoomId}}</td>
        <td>{{item.storeRoomRackId}}</td>
        <td>{{item.storeRoomRackNo}}</td>
      </template>
    </data-list>
  </div>
</div>
</template>

<script>
import DataList from '@/components/datalist'
export default {
  name: 'page-outList-list',
  components: { DataList },
  data () {
    return {
      filter: {
        type: 1,
        operationType: 1,
        productNo: ''
      },
      form: {
        materialGraphNo: '',
        orderNo: '',
        price: '',
        quantity: '',
        storeRoomId: '',
        storeRoomRackId: '',
        storeRoomRackNo: '',
        supplier: ''
      }
    }
  },
  created () {
    let { productNo } = this.$route.query
    if (productNo !== undefined && this.$route.name === 'outList-list') this.filter.productNo = productNo
  },
  methods: {

  }
}
</script>

<style lang="less">
.page-outList-list{
  select{background: none;border: none;outline: none;padding: 5px 20px 5px 10px;appearance: none;}
  .scroll-y{padding-bottom: 40px;}
}
</style>
