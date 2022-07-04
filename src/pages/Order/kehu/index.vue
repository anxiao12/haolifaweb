<template>
    <div class="page-orders-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.name" @change="$refs.list.update(true);" placeholder="客户名称" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :param="filter" url="/haolifa/customer-info/page" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>客户名称</th>
                    <th>联系人</th>
                    <th>开户行</th>
                    <th>账号</th>
                    <th>电话</th>
                    <th>付款方式</th>
                    <th>地址</th>
                    <th>传真</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.contractPerson}}</td>
                    <td>{{item.openBank}}</td>
                    <td>{{item.bankAccount}}</td>
                    <td>{{item.phone}}</td>
                    <td>{{item.paymentMethod}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.fax}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a>
                        <a href="javascript:;" class="red" @click="remove(item)">| 删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.name" class="flex-item mr-20" label="客户名称"></input-box>
                    <input-box v-model="form.phone" class="flex-item mr-20" label="电话"></input-box>
                    <input-box v-model="form.fax" class="flex-item mr-20" label="传真"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.contractPerson" class="flex-item mr-20" label="联系人"></input-box>
                    <input-box v-model="form.bankAccount" class="flex-item mr-20" label="账号"></input-box>
                    <input-box v-model="form.paymentMethod" class="flex-item mr-20" label="付款方式"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.openBank" class="flex-item mr-20" label="开户行"></input-box>
                    <input-box v-model="form.address" class="flex-item mr-20" label="地址"></input-box>
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
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
    name: "hkfenjie-list",
    components: { DataList },
    data() {
        return {
            filter: {
                name: ""
            },
            form: {
                address: "",
                bankAccount: "",
                contractPerson: "",
                createTime: "",
                fax: "",
                id: "",
                name: "",
                openBank: "",
                paymentMethod: "",
                phone: "",
                remark: "",
                updateTime: ""
            },
            loading: false,
            layer: false
        };
    },
    created() {},
    methods: {
        flush() {
            this.filter = {
                name: ""
            };
            this.$refs.list.update(true);
        },
        add() {
            this.layer = true;
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/customer-info/update"
                : "/haolifa/customer-info/add";
            this.$http.post(url, this.form).then(res => {
                this.$toast("保存成功");
                this.$refs.list.update(true);
                this.loading = false;
                this.layer = false;
                this.close();
            });
        },
        edit(item) {
            this.form = JSON.parse(JSON.stringify(item));
            this.layer = true;
        },
        close() {
            this.form = {
                address: "",
                bankAccount: "",
                contractPerson: "",
                createTime: "",
                fax: "",
                id: "",
                name: "",
                openBank: "",
                paymentMethod: "",
                phone: "",
                remark: "",
                updateTime: ""
            };
            this.layer = false;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/customer-info/del/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-orders-list {
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
}

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.metalwork-info {
    padding: 30px 20px;
    tr:first-child td {
        padding: 0;
        border: none;
    }
    th {
        font-weight: normal;
        color: #888;
    }
    td {
        color: #444;
    }
    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }
    .checkbox-list {
        flex-wrap: wrap;
    }
    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}

.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
.cell-color {
    color: #de8a0c;
}
</style>