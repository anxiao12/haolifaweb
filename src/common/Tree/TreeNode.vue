<template>
<div class="tree-node">
  <div class="tree-title flex-v-center" v-if="!hideLeaf || isFolder" :style="{paddingLeft: padding + 'px'}" @click="$emit('select', model)">
    <slot></slot>
  </div>
  <div class="tree-child" v-if="isFolder && open">
    <tree-node
      v-for="m in model[childrenTxt]"
      :level="level + 1"
      :key="m.id"
      :model="m"
      :hideLeaf="hideLeaf"
      :format="format"
      @select="$emit('select', $event)"
    />
  </div>
</div>
</template>

<script>
import IconBtn from '../Button/IconBtn'
import Avatar from '../Avatar/Avatar'

export default {
  name: 'tree-node',
  components: { IconBtn, Avatar },
  props: {
    level: { type: Number, default: 0 },
    model: { type: Object, default () { return {} } },
    childrenTxt: { type: String, default: 'children' },
    // 是否显示叶子节点 🍃
    hideLeaf: Boolean,
    autoOpen: Boolean,
    format: Function
  },
  data () {
    return {
      open: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.level === 0 && this.autoOpen) {
        this.toggle()
      }
    })
  },
  computed: {
    isFolder () { return this.model[this.childrenTxt] && this.model[this.childrenTxt].length },
    padding () { return this.level * 15 + 15 },
    icon () {
      if (this.isFolder) {
        return this.open ? 'indeterminate_check_box' : 'add_box'
      } else {
        return 'insert_drive_file'
      }
    }
  },
  methods: {
    toggle (e) {
      if (e) e.stopPropagation()
      if (!this.isFolder) return
      if (this.open) {
        let child = this.$el.querySelector('.tree-child')
        let h = child.clientHeight
        child.style.height = h + 'px'
        setTimeout(() => { child.style.height = '0px' }, 16)
        setTimeout(() => {
          child.style.height = 'auto'
          this.open = false
        }, 300)
      } else {
        this.open = true
        this.$nextTick(() => {
          let child = this.$el.querySelector('.tree-child')
          let h = child.clientHeight
          child.style.height = '0px'
          setTimeout(() => { child.style.height = h + 'px' }, 10)
          setTimeout(() => { child.style.height = 'auto' }, 300)
        })
      }
    }
  }
}
</script>

<style lang="less">
.tree-node{
  .tree-title{display: flex;line-height: 32px;align-items: center;cursor: default;overflow: hidden;}
  .tree-title:hover{background: rgba(0, 0, 0, .1)}
  .tree-name{flex: 1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .tree-icon{margin-right: 5px;color: rgba(0, 0, 0, .4);}
  .tree-menu-icon{opacity: 0;}
  .tree-title:hover .tree-menu-icon{opacity: 1;}
  .tree-child{transition: all .3s;overflow: hidden;}
  .avatar{margin: 5px 10px 5px 5px;}
}
</style>
