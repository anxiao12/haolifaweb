<template>
    <div class="apply-buy-add">
        <div class="content">
            <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
            <div class="tflex-item" style="display:inline-block;font-size:20px;">角色关联菜单</div>
            <div class="flex">
                <input-box v-model="description" disabled class="flex-item" label="角色名称"></input-box>
            </div>
            <p>菜单选择</p>
            <div class="flex">
                <el-tree
                    ref="tree"
                    :data="data"
                    :node-click="nodeClick"
                    :default-checked-keys="checkedList"
                    :default-expanded-keys="checkedList"
                    node-key="id"
                    show-checkbox
                    :props="defaultProps"
                ></el-tree>
            </div>
            <div class="flex" style="margin-top:20px;">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>
        </div>
        <layer v-if="loading">
            <div class="abs t-center" style="padding: 20px;">
                <loading size="30"/>
                <!-- <div style="margin-top: 10px;">{{loadingMsg}}</div> -->
            </div>
        </layer>
    </div>
</template>

<script>
export default {
    name: "notification-add",
    data() {
        return {
            defaultProps: {
                id: "id",
                label: "name",
                children: "childList"
            },
            loading: false,
            description: "",
            id: "",
            data: [],
            checkedList: []
        };
    },
    mounted() {
        let item = this.$route.params;
        this.id = item.id;
        this.description = item.description;
        this.getAllMenu();
        this.getRoleMenu(this.id);
    },
    methods: {
        getRoleMenu(id) {
            this.$http
                .get(`/haolifa/role/${id}/menu`)
                .then(res => {
                    let resultList = res;
                    this.checkedList = [];
                    for (let i = 0; i < resultList.length; i++) {
                        if (resultList[i].code.indexOf("parent") === -1)
                            this.checkedList[i] = resultList[i].id;
                    }
                    this.$refs.tree.setCheckedKeys(this.checkedList);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAllMenu() {
            this.$http
                .get(`/haolifa/menu/menuTree`)
                .then(res => {
                    this.data = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        nodeClick(obj) {},
        submit() {
            this.loading = true;
            this.checkedList = this.$refs.tree.getCheckedKeys();
            if (this.checkedList.length == 0) {
                this.$toast("请至少选择一列菜单");
                return;
            }
            let list = [];
            for (let i = 0; i < this.checkedList.length; i++) {
                list.push(parseInt(this.checkedList[i]));
            }
            //将半选中的父节点也加入到要发送的参数中
            if (this.$refs.tree.getHalfCheckedKeys().length > 0) {
                for (
                    let i = 0;
                    i < this.$refs.tree.getHalfCheckedKeys().length;
                    i++
                ) {
                    list.push(
                        parseInt(this.$refs.tree.getHalfCheckedKeys()[i])
                    );
                }
            }
            this.$http
                .post(`/haolifa/role/${this.id}/menu`, list)
                .then(res => {
                    this.loading = false;
                    this.$router.replace("/role");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
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



