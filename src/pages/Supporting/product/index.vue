<template>
<div class="page-product-list flex-col">
  <div class="flex-v-center tool-bar">
    <!-- <div class="flex-v-center search-bar" style="margin-right: 20px;">
      <i class="icon f-20 c-8">search</i>
      <select v-model="filter.type" class="f-14" @change="$refs.list.update(true)">
        <option value="">所有库房</option>
        <option value="1">原料库</option>
        <option value="2">成品库</option>
      </select>
      <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
    </div> -->
    <div class="flex-item"></div>
    <router-link to="/product/add">
      <btn class="b" flat color="#008eff">新增成品</btn>
    </router-link>
  </div>
  <div class="flex-item scroll-y">
    <data-list ref="list" page-num-str="currentPage" :param="filter" url="/haolifa/product/pageInfo" method="get">
      <tr slot="header">
        <th style="width: 60px;">序号</th>
        <th>成品名称</th>
        <th>成品编号</th>
        <th>适配组件</th>
        <th>成品规格</th>
        <th>备注</th>
        <th class="t-right" style="width: 80px;">操作</th>
      </tr>
      <!-- item: 当前行数据; index: 当前行数 -->
      <template slot="item" slot-scope="{ item, index }">
        <td class="c-a">{{index}}</td>
        <td>{{item.name}}</td>
        <td>{{item.productNo}}</td>
        <td>{{item.fitComponent}}</td>
        <td>{{item.specifications}}</td>
        <td>{{item.remark}}</td>
        <td class="t-right">
          <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑</a> |
          <a href="javascript:;" class="red" @click="remove(item)" style="margin-right: 3px;">删除</a>
        </td>
      </template>
    </data-list>
  </div>
</div>
</template>

<script>
import DataList from '@/components/datalist'
export default {
  name: 'page-product-list',
  components: { DataList },
  data () {
    return {
      filter: {
        type: ''
      }
    }
  },
  methods: {
    edit (item) {
      this.$router.push(`/product/edit?id=${item.id}`)
    },
    remove (item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下零件类别吗？<br><b>${item.name}</b>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http.delete(`/haolifa/product/delete/${item.id}/${item.productNo}`).then(res => {
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
.page-product-list{
  select{background: none;border: none;outline: none;padding: 5px 20px 5px 10px;appearance: none;}
  .scroll-y{padding-bottom: 40px;}
}
</style>
