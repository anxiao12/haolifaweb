<template>
    <div class="page-user">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" placeholder="姓名" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <router-link to="/user/add">
                <btn class="b" flat color="#008eff">新增用户</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="datalist" url="/haolifa/user" method="get" class="f-14">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>用户名</th>
                    <th>角色</th>
                    <!-- <th>状态</th> -->
                    <th class="t-right" style="width: 100px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
                    <td>{{item.realName}}</td>
                    <td>{{item.username}}</td>
                    <td>{{item.roles.map(item => item.description).toString() || '-'}}</td>
                    <!-- <td>{{item.username}}</td> -->
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="$router.push('/user/edit?id='+item.id)">编辑</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="withRole(item.id)">关联角色</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="关联角色" width="45%">
            <div class="layer-text" style="padding-bottom: 300px;height:800px">
                <select-box :list="roles" v-model="roleId" label="请选择角色"></select-box>
                <!-- <el-select v-model="roleIds" placeholder="请选择角色">
                    <el-option v-for="item in roles" :key="item.value" :label="item.text" :value="item.value"></el-option>
                </el-select>-->
            </div>
            <div class="layer-btns">
                <btn flat @click="layer=false">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-user",
    components: { DataList },
    data() {
        return {
            layer: false,
            roles: [],
            roleIds: [],
            roleId: "",
            id: ""
            //
        };
    },
    methods: {
        remove(item) {
            const id = item.id;
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.realName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`haolifa/user/${id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.datalist.update();
                        })
                        .catch(e => {
                            this.$toast(e.message || e.msg);
                        });
                }
            });
        },
        withRole(id) {
            this.layer = true;
            this.id = id;
            this.roleIds = [];
            this.getRoles();
        },
        getRoles() {
            this.$http
                .get("/haolifa/role")
                .then(res => {
                    res.forEach(item => {
                        item.value = item.id;
                        item.text = item.description;
                    });
                    this.roles = res;
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        submit() {
            this.roleIds.push(this.roleId);
            this.$http
                .post(`/haolifa/user/${this.id}/role`, this.roleIds)
                .then(res => {
                    this.$toast("保存成功");
                    this.layer = false;
                    this.roleId = "";
                    this.roleIds = [];
                    this.$refs.datalist.update();
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
};
</script>

<style lang="less">
.page-user {
    //
}
</style>
