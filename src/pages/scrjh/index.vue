<template>
    <div class="page-jishu-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px;"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.orderNo"
                    @change="$refs.list.update(true)"
                    placeholder="订单号"
                    style="width: 200px;"
                >
                计划日期：
                <el-date-picker
                    v-model="filter.planDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="$refs.list.update(true);"
                    :editable="false"
                    placeholder="选择年月日"
                    style="width: 200px;"
                ></el-date-picker>
                计划完成日期：
                <el-date-picker
                    v-model="filter.planFinishDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="$refs.list.update(true);"
                    :editable="false"
                    placeholder="选择年月日"
                    style="width: 200px;"
                ></el-date-picker>
                订单状态：
                <select
                    v-model="filter.planStatus"
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value="">全部</option>
                    <option
                        v-for="item,index in statusList"
                        :value="item.value"
                        :key="index"
                    >{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add"
            >新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/production-daily-plan/page"
                method="post"
                :borderFlag="true"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>生产订单编号</th>
                    <th>订单数量</th>
                    <th>计划日期</th>
                    <th>计划完成日期</th>
                    <th>状态</th>
                    <th>发货日期</th>
                    <th>完成数量</th>
                    <th>实际完成日期</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <template
                    slot="item"
                    slot-scope="{ item,index }"
                >
                    <td class="c-a">{{ index }}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{item.orderNumber}}</td>
                    <td>{{item.planDate}}</td>
                    <td>{{item.planFinishDate}}</td>
                    <td>{{formatter(item.planStatus)}}</td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.finishNumber}}</td>
                    <td>{{item.actualFinishDate}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.updateTime}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                        >编辑 |</a>
                        <a
                            href="javascript:;"
                            class="red"
                            @click="del(item)"
                        >删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="addLayer"
            :title="form.id ?'编辑':'新增' "
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <input-box
                        v-model="form.orderNo"
                        class="flex-item"
                        label="订单号"
                        hint="必填"
                    ></input-box>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.planDate"
                        hint="必填"
                        class="flex-item"
                        label="计划日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <date-picker
                        v-model="form.planFinishDate"
                        hint="必填"
                        class="flex-item"
                        label="计划完成日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.remark"
                        class="flex-item"
                        label="备注"
                    ></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button
                    class="mr-20"
                    size="mini"
                    :loading="loading"
                    type="primary"
                    @click="save"
                >保存</el-button>
                <el-button
                    class="mr-20"
                    size="mini"
                    @click="close"
                >关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import fileToBase64 from "@/utils/fileToBase64";
export default {
    name: "auto-control-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            filter: {
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                planStatus: "",
            },
            statusList: [
                { text: "待完成", value: "wait" },
                { text: "部分完成", value: "part" },
                { text: "已完成", value: "completed" },
            ],
            addLayer: false,
            form: {
                id: "",
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                remark: "",
            },
            loading: false,
        };
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                planStatus: "",
            };
            this.$refs.list.update(true);
        },
        add() {
            this.addLayer = true;
        },
        edit(item) {
            this.addLayer = true;
            Object.keys(item).forEach((key) => {
                this.form[key] = item[key];
            });
        },
        save() {
            if (!this.form.orderNo || !this.form.planDate || !this.form.planFinishDate) {
                this.$toast("请输入必填项");
                return;
            }
            this.loading = true;
            let url = this.form.id ? "/haolifa/production-daily-plan/update" : "/haolifa/production-daily-plan/add";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        formatter(val) {
            if (val == "wait") {
                return "待完成";
            } else if (val == "part") {
                return "部分完成";
            } else if (val == "completed") {
                return "已完成";
            } else {
                return val;
            }
        },
        close() {
            this.addLayer = false;
            this.form = {
                id: "",
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                remark: "",
            };
        },
        del(item) {
            this.$confirm({
                title: "删除完成确认",
                text: `您确定删除吗`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .post(`/haolifa//production-daily-plan/del/${item.id}`)
                        .then((res) => {
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
    },
};
</script>

<style lang="less">
.page-jishu-list {
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
    .t-border{
        // tr{
            border:1px solid #ccc
        // }
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
select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}
.page-supplier-info {
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
</style>
