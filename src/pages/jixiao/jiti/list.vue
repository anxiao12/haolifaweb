<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.postName" @change="
            $refs.list.update(true)" placeholder="岗位名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.dept" @change="
            $refs.list.update(true)" placeholder="部门名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.project" @change="
            $refs.list.update(true)" placeholder="项目名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.workType" @change="
            $refs.list.update(true)" placeholder="产品类别" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.idCategory" @change="
            $refs.list.update(true)" placeholder="产品ID代码" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.appModel" @change="
            $refs.list.update(true)" placeholder="适用型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.appSpecifications" @change="
            $refs.list.update(true)" placeholder="适用规格" style="width: 200px;">
            </div>
        </div>
        <div class="flex-item">
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
            <a style="color:#008eff" href="/haolifa/pay-manager_cal/export" target="_blank">导出</a>
            <btn class="b" flat color="#008eff" @click="upload">导入</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-manager_cal/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>岗位名称</th>
                    <th>部门名称</th>
                    <th>产品类别</th>
                    <th>项目名称</th>
                    <th>产品ID代码</th>
                    <th>计提标准</th>
                    <th>适用型号</th>
                    <th>适用规格</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.postName}}</td>
                    <td>{{ item.dept }}</td>
                    <td>{{ item.workType }}</td>
                    <td>{{ item.project }}</td>
                    <td>{{ item.idCategory }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.appModel }}</td>
                    <td>{{ item.appSpecifications }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.postName" class="flex-item mr-20" :list="postList" label="岗位名称"></select-box>
                    <select-box v-model="form.dept" class="flex-item mr-20" :list="deptList" label="部门名称"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.project" class="flex-item mr-20" label="项目名称"></input-box>
                    <input-box v-model="form.workType" class="flex-item mr-20" label="产品类别"></input-box>
                    <input-box v-model="form.price" class="flex-item mr-20" label="计提标准"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.appModel" class="flex-item mr-20" label="适用型号"></input-box>
                    <input-box v-model="form.appSpecifications" class="flex-item mr-20" label="适用规格"></input-box>
                    <input-box v-model="form.idCategory" class="flex-item mr-20" label="产品ID代码"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="uploadFlag" title="导入" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-upload class="upload-demo" ref="upload" :on-success="uploadSuccess" :limit="1" action="/haolifa/pay-manager_cal/import" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="warning">选取文件</el-button>
                </el-upload>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="submitUpload">上传</el-button>
                <el-button class="mr-20" size="mini" @click="uploadFlag=false">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "khzb-list",
    components: { DataList },
    data() {
        return {
            filter: {
                appModel: "",
                appSpecifications: "",
                dept: "",
                id: "",
                idCategory: "",
                postName: "",
                price: "",
                project: "",
                userName: "",
                workType: ""
            },
            fileList: [],
            uploadFlag: false,
            layer: false,
            form: {
                appModel: "",
                appSpecifications: "",
                dept: "",
                id: "",
                idCategory: "",
                postName: "",
                price: "",
                project: "",
                workType: ""
            },
            banList: [],
            postList: [],
            deptList: [],
            userArr: [],
            userList: [],
            loading: false
        };
    },
    mounted() {
        this.getBanList();
        this.getDeptList();
        this.getUsers();
        this.getAllUsers();
        this.getPostList();
    },
    methods: {
        flush() {
            this.filter = {
                appModel: "",
                appSpecifications: "",
                dept: "",
                id: "",
                idCategory: "",
                postName: "",
                price: "",
                project: "",
                userName: "",
                workType: ""
            };
            this.$refs.list.update(true);
            this.getBanList();
            this.getDeptList();
        },
        edit(item) {
            for (let key in this.form) this.form[key] = item[key];
            this.layer = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        upload() {
            this.fileList = [];
            this.uploadFlag = true;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSuccess(resp, file, fileList) {
            if (resp.code === "0000") {
                this.$toast("上传成功");
                this.uploadFlag = false;
                this.$refs.list.update(true);
                this.fileList = [];
            } else {
                this.$toast(resp.message);
            }
        },
        handlePreview(file) {
            console.log(file);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-manager_cal/del/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        },
        add() {
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-manager_cal/edit"
                : "/haolifa/pay-manager_cal/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.$toast("保存成功");
                    this.close();
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                appModel: "",
                appSpecifications: "",
                dept: "",
                id: "",
                idCategory: "",
                postName: "",
                price: "",
                project: "",
                workType: ""
            };
        },
        getBanList() {
            this.$http
                .post("/haolifa/pay-team/getAllList")
                .then(res => {
                    res.map(item => {
                        this.banList.push({
                            text: item.teamName,
                            value: item.id
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getDeptList() {
            this.deptList = [];
            this.$http
                .get("/haolifa/dept/list")
                .then(res => {
                    res.map(item => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.deptName
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getPostList() {
            this.postList = [];
            this.$http
                .post("/haolifa/pay-production-work-shop/getAllList")
                .then(res => {
                    res.map(item => {
                        this.postList.push({
                            text: item.postName,
                            value: item.postName
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getUsers() {
            this.$http
                .get("/haolifa/dictionaries/getUserType")
                .then(res => {
                    res.result.map(item => {
                        this.userArr.push({
                            text: item.name,
                            value: item.code
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAllUsers() {
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: "",
                    pageNum: 0,
                    pageSize: "",
                    postId: "",
                    postName: "",
                    sex: "",
                    superiorId: "",
                    teamId: "",
                    teamName: "",
                    userName: "",
                    userType: ""
                })
                .then(res => {
                    res.map(item => {
                        this.userList.push({
                            text: item.userName,
                            value: item.userName
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-invoice-list {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
    .scroll-y {
        padding-bottom: 40px;
    }

    //
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
