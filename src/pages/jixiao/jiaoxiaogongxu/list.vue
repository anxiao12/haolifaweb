<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.workshopName" @change="
            $refs.list.update(true)" placeholder="车间名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.workType" @change="
            $refs.list.update(true)" placeholder="工种类别" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productModel" @change="
            $refs.list.update(true)" placeholder="适用工单产品型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.postName" @change="
            $refs.list.update(true)" placeholder="岗位（工序）名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.postCapability" @change="
            $refs.list.update(true)" placeholder="岗位能力简称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.postCode" @change="
            $refs.list.update(true)" placeholder="岗位（工序）代码" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-working-procedure/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>车间名称</th>
                    <th>工种类别</th>
                    <th>适用工单产品型号</th>
                    <th>岗位（工序）名称</th>
                    <th>岗位能力简称</th>
                    <th>岗位（工序）代码</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.workshopName }}</td>
                    <td>{{ item.workType }}</td>
                    <td>{{ item.productModel }}</td>
                    <td>{{ item.postName }}</td>
                    <td>{{ item.postCapability }}</td>
                    <td>{{ item.postCode }}</td>
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
                    <select-box v-model="form.workshopName" class="flex-item mr-20" hint="必填" :list="deptList" label="车间名称"></select-box>
                    <select-box v-model="form.workType" class="flex-item mr-20" hint="必填" :list="workTypeList" label="工种类别"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.productModel" class="flex-item mr-20" hint="必填" label="适用工单产品型号"></input-box>
                    <input-box v-model="form.postName" class="flex-item mr-20" hint="必填" label="岗位（工序）名称"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.postCapability" class="flex-item mr-20" hint="必填" label="岗位能力简称"></input-box>
                    <input-box v-model="form.postCode" class="flex-item mr-20" hint="必填" label="岗位（工序）代码"></input-box>
                </div>
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
                id: "",
                postCapability: "",
                postCode: "",
                postName: "",
                productModel: "",
                serial: "",
                workType: "",
                workshopName: ""
            },
            layer: false,
            form: {
                id: "",
                pageNum: "",
                pageSize: "",
                postCapability: "",
                postCode: "",
                postName: "",
                productModel: "",
                serial: "",
                workType: "",
                workshopName: ""
            },
            deptList: [],
            loading: false,
            workTypeList: []
        };
    },
    mounted() {
        this.getDeptList();
        this.getWorkList();
    },
    methods: {
        flush() {
            this.filter = {
                id: "",
                postCapability: "",
                postCode: "",
                postName: "",
                productModel: "",
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
        getWorkList() {
            this.$http
                .get("/haolifa/dictionaries/getTypeOfWorkEnum")
                .then(res => {
                    res.result.map(item => {
                        this.workTypeList.push({
                            text: item.name,
                            value: item.name
                        });
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.postCode = item.postCode;
            this.form.postCapability = item.postCapability;
            this.form.postName = item.postName;
            this.form.productModel = item.productModel;
            this.form.serial = item.serial;
            this.form.workType = item.workType;
            this.form.workshopName = item.workshopName;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下工序吗？<br><b>${item.postName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-working-procedure/del/${item.id}`)
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
            if (!this.form.postName.trim()) {
                this.$toast("岗位（工序）名称不能为空");
                return;
            }
            if (!this.form.postCode.trim()) {
                this.$toast("岗位（工序）代码不能为空");
                return;
            }
            if (!this.form.postCapability.trim()) {
                this.$toast("岗位能力简称不能为空");
                return;
            }
            if (!this.form.workshopName.trim()) {
                this.$toast("车间名称不能为空");
                return;
            }
            if (!this.form.productModel.trim()) {
                this.$toast("适用工单产品型号不能为空");
                return;
            }
            if (!this.form.workType.trim()) {
                this.$toast("工种类别不能为空");
                return;
            }
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-working-procedure/edit"
                : "/haolifa/pay-working-procedure/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
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
                id: "",
                pageNum: "",
                pageSize: "",
                postCapability: "",
                postCode: "",
                postName: "",
                productModel: "",
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
