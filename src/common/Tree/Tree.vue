<template>
<div class="tree">
  <div class="tree-no-data" v-if="!data || !data.length">无数据</div>
  <tree-node
    v-for="item in model"
    :key="item.id"
    :model="item"
    :autoOpen="autoOpen"
    :hideLeaf="hideLeaf"
    :format="format"
    :childrenTxt="childrenTxt"
    @select="$emit('select', $event)"
  />
</div>
</template>

<script>
import TreeNode from './TreeNode'
import getTree from './treeFormat.js'

export default {
  name: 'tree',
  components: { TreeNode },
  props: {
    data: { type: Array, default: () => [] },
    idTxt: { type: String, default: 'id' },
    pidTxt: { type: String, default: 'parentid' },
    childrenTxt: { type: String, default: 'children' },
    rootId: { type: [Number, String], default: '0' },
    autoOpen: Boolean,
    hideLeaf: Boolean,
    format: {
      type: Function,
      default: function (name) {
        return name
      }
    }
  },
  watch: {
    data () {
      this.analytical()
    }
  },
  data () {
    return {
      model: []
    }
  },
  created () {
    this.analytical()
  },
  methods: {
    analytical () {
      let { data, idTxt, pidTxt, childrenTxt, rootId } = this
      this.model = getTree(data, rootId, idTxt, pidTxt, childrenTxt)
    }
  }
}
</script>

<style lang="less">
.tree{
  font-size: 14px;
  .tree-no-data{line-height: 40px;text-align: center;color: #aaa;}
}
</style>
