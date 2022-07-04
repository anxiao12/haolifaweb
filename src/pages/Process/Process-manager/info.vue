<template>
    <div class="page-manager">
        <div class="flex-v-center tool-bar">
            <!--<div class="flex-v-center search-bar" style="margin-right: 20px;">-->
            <!--<i class="icon f-20 c-8">search</i>-->
            <!--<input type="text" class="flex-item" placeholder="姓名" style="width: 200px;">-->
            <!--</div>-->
            <div class="flex-item"></div>
            <!--<router-link to="/user/add">-->
            <!--<btn class="b" flat color="#008eff">新增用户</btn>-->
            <!--</router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <table class="data-table" v-if="infoList.length">
                <tr>
                    <th style="width: 60px;">ID</th>
                    <th>节点名称</th>
                    <th>审核角色</th>
                    <th>审核人</th>
                    <th class="t-left" style="width: 100px;">操作</th>
                </tr>
                <tr v-for="(item, i) in infoList">
                    <td>{{item.id}}</td>
                    <td>{{item.stepName}}</td>
                    <td>{{item.roleName}}</td>
                    <td>{{item.userNames}}</td>
                    <td>
                        <btn class="b" flat color="#008eff" @click="allotRoles(item.stepId)">审批分配</btn>
                    </td>
                </tr>
            </table>
        </div>
        <layer v-if="layer" :title="'分配审核权限'" width="450px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <label>角色：</label>
                <select v-model="role.id" class="search-bar" @change="rolesChange()">
                    <option v-for="(item,i) in roles" :value="item.id">{{item.description}}</option>
                </select>
                <div>
                    <label>人员：</label>
                    <ul>
                        <li v-for="(item,i) in users">
                            <input type="checkbox" v-model="checkUsers" :value="item.id">
                            <label>{{item.realName}}</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "processmanager-info",
    components: { DataList },
    data() {
        return {
            allotForm: {
                flowId: 0,
                stepId: 0,
                roleId: 0,
                userIds: ""
            },
            flowId: 0,
            layer: false,
            roles: [],
            users: [],
            checkUsers: [],
            role: {
                id: "",
                name: ""
            },
            infoList: []
        };
    },
    activated() {
        let { itemId } = this.$route.query;
        this.flowId = itemId;
        this.allotForm.flowId = itemId;
        this.info(itemId);
        this.roleList();
    },
    created() {
        let { itemId } = this.$route.query;
        this.flowId = itemId;
        this.allotForm.flowId = itemId;
        this.info(itemId);
        this.roleList();
    },
    methods: {
        info: function(itemId) {
            this.$http
                .get(`/haolifa/flow/steps/${itemId}`)
                .then(res => {
                    this.infoList = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        allotRoles: function(stepId) {
            this.layer = true;
            this.allotForm.stepId = stepId;
        },
        roleList: function() {
            this.$http
                .get(`/haolifa/flow/roles`)
                .then(res => {
                    this.roles = res;
                    this.role.id = res[0].id;
                    this.rolesChange();
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        rolesChange: function() {
            this.$http
                .get(`/haolifa/flow/users/${this.role.id}`)
                .then(res => {
                    this.users = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel: function() {
            this.layer = false;
            this.checkUsers = [];
        },
        submit: function() {
            this.allotForm.roleId = this.role.id;
            let userIds = "";
            for (let i = 0; i < this.checkUsers.length; i++) {
                userIds += this.checkUsers[i] + ",";
            }
            this.allotForm.userIds = userIds.substr(0, userIds.length - 1);
            this.$http
                .post(`/haolifa/flow/allotPersons/`, this.allotForm)
                .then(res => {
                    this.layer = false;
                    this.checkUsers = [];
                    this.info(this.flowId);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-manager {
    //
}
</style>