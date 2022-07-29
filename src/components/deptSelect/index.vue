<template>
  <div class="dept-list">
    <el-tree
      ref="tree"
      :data="deptList"
      :default-expand-all="true"
      @node-click="nodeClick"
      node-key="id"
      :props="defaultProps"
      :expand-on-click-node="false"
      :highlight-current="true"
    >
    </el-tree>
    <div class="layer-btns">
        <el-button class="mr-20" size="mini" type="primary" @click="save">保存</el-button>
        <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "dept-select",
  data() {
    return {
      deptList: [],
      obj:null,
      defaultProps: {
        label: "name",
        children: "childList",
      },
    };
  },
  mounted() {
    this.getDeptList();
  },
  methods: {
    getDeptList() {
      this.$http
        .get("/haolifa/dept/departmentTree")
        .then((res) => {
          this.deptList = res;
        })
        .catch((e) => {
          this.$toast(e.message || e.msg);
        });
    },
    nodeClick(data){
        this.obj = data;
       
    },
    save(){
        if(!this.obj){
            this.$toast("请点击选择部门");
            return;
        }
         this.$emit("selectClick",this.obj)
    },
    close(){
        this.$emit("selectClick",null)

    }
  },
};
</script>
<style lang="less">
.dept-list{
    .is-current{
        background: #030303;
    }
}
</style>