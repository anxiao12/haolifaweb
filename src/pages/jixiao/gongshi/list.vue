<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.workshopName" @change="
                $refs.list.update(true)" placeholder="车间名称" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.workType" @change="
                $refs.list.update(true)" placeholder="工种类别" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.procedureName" @change="
                $refs.list.update(true)" placeholder="工序名称" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.appSpecifications" @change="
                $refs.list.update(true)" placeholder="适用规格" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.appModel" @change="
                $refs.list.update(true)" placeholder="适用型号" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.idCategory" @change="
                $refs.list.update(true)" placeholder="图号类别" style="width: 180px;">
                <input type="text" class="flex-item" v-model="filter.hourQuotaPrice" @change="
                $refs.list.update(true)" placeholder="工时定额（元）" style="width: 180px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-hour_quota/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>车间名称</th>
                    <th>工种类别</th>
                    <th>过程产品名称</th>
                    <th>工序名称</th>
                    <th>岗位代码</th>
                    <th>适用规格</th>
                    <th>适用型号</th>
                    <th>图号类别</th>
                    <th>工时定额（元）</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.workshopName }}</td>
                    <td>{{ item.workType }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.procedureName }}</td>
                    <td>{{ item.postCode }}</td>
                    <td>{{ item.appSpecifications }}</td>
                    <td>{{ item.appModel }}</td>
                    <td>{{ item.idCategory }}</td>
                    <td>{{ item.hourQuotaPrice }}</td>
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
                    <select-box v-model="form.workshopName" class="flex-item mr-20" hint="必填" :list="deptList" label="车间名称" @change="getProcedureList"></select-box>
                    <select-box v-model="form.procedureName" class="flex-item mr-20" hint="必填" :list="procedureNameList" label="工序名称" @change="procedureNameChange"></select-box>
                    <input-box v-model="form.postCode" class="flex-item mr-20" label="岗位代码" :disabled="true"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.workType" class="flex-item mr-20" label="工种类别"></input-box>
                    <input-box v-model="form.productName" class="flex-item mr-20" label="过程产品名称"></input-box>
                    <input-box v-model="form.appSpecifications" class="flex-item mr-20" label="适用规格"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.appModel" class="flex-item mr-20" label="适用型号"></input-box>
                    <input-box v-model="form.idCategory" class="flex-item mr-20" label="图号类别"></input-box>
                    <input-box v-model="form.hourQuotaPrice" type="number" class="flex-item mr-20" label="工时定额（元）"></input-box>
                </div>
                <div class="flex"></div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "jiaoxiaogongxu-list",
    components: { DataList },
    data() {
        return {
            filter: {
                appModel: "",
                appSpecifications: "",
                hourQuotaPrice: "",
                id: "",
                idCategory: "",
                postCode: "",
                procedureName: "",
                productName: "",
                serial: "",
                workType: "",
                workshopName: ""
            },
            layer: false,
            form: {
                appModel: "",
                appSpecifications: "",
                hourQuotaPrice: "",
                id: "",
                idCategory: "",
                pageNum: "",
                pageSize: "",
                postCode: "",
                procedureName: "",
                productName: "",
                serial: "",
                workType: "",
                workshopName: ""
            },
            deptList: [],
            procedureNameList: [],
            loading: false
        };
    },
    mounted() {
        this.getDeptList();
    },
    methods: {
        flush() {
            this.filter = {
                appModel: "",
                appSpecifications: "",
                hourQuotaPrice: "",
                id: "",
                idCategory: "",
                postCode: "",
                procedureName: "",
                productName: "",
                serial: "",
                workType: "",
                workshopName: ""
            };
            this.$refs.list.update(true);
        },
        getDeptList() {
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
        getProcedureList() {
            this.procedureNameList = [];
            this.form.procedureName = this.form.postCode = "";
            this.$http
                .post("/haolifa/pay-working-procedure/getAllList", {
                    id: "",
                    pageNum: "",
                    pageSize: "",
                    postCapability: "",
                    postCode: "",
                    postName: "",
                    productModel: "",
                    serial: "",
                    workType: "",
                    workshopName: this.form.workshopName
                })
                .then(res => {
                    res.map(item => {
                        this.procedureNameList.push({
                            text: item.postName,
                            value: item.postName,
                            postCode: item.postCode
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        procedureNameChange() {
            this.procedureNameList.map(item => {
                if (this.form.procedureName == item.value) {
                    this.form.postCode = item.postCode;
                }
            });
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.appModel = item.appModel;
            this.form.appSpecifications = item.appSpecifications;
            this.form.hourQuotaPrice = item.hourQuotaPrice;
            this.form.idCategory = item.idCategory;
            this.form.postCode = item.postCode;
            this.form.procedureName = item.procedureName;
            this.form.productName = item.productName;
            this.form.serial = item.serial;
            this.form.workType = item.workType;
            this.form.workshopName = item.workshopName;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下工序名称吗？<br><b>${
                    item.procedureName
                }</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-hour_quota/del/${item.id}`)
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
            if (
                !this.form.workshopName.trim() ||
                !this.form.procedureName.trim()
            ) {
                this.$toast("请输入必填项");
                return;
            }
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-hour_quota/edit"
                : "/haolifa/pay-hour_quota/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                appModel: "",
                appSpecifications: "",
                hourQuotaPrice: "",
                id: "",
                idCategory: "",
                pageNum: "",
                pageSize: "",
                postCode: "",
                procedureName: "",
                productName: "",
                serial: "",
                workType: "",
                workshopName: ""
            };
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
