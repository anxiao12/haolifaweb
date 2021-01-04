<template>
    <div class="page-orders-list">
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.productNo" @change="$refs.list.update(true)"
                       placeholder="产品ID" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)"
                       placeholder="型号" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="edit">新增</btn>
        </div>
        <div class="flex-item">
            <data-list ref="list" :param="filter" url="/haolifa/price/product/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>标签属性（产品型号）</th>
                    <th>产品ID</th>
                    <th>出厂价格</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.productNo}}</td>
                    <td>{{item.exFactoryPrice}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑|</a>
                        <a href="javascript:;" class="red" @click="del(item)" style="margin-right: 3px;">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑' : '新增'" width="900px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <input-box v-model="form.productModel" label="标签属性（产品型号）" class="input-width" style="width:20%;"></input-box>
                <input-box v-model="form.productNo" label="产品ID" class="input-width" style="width:60%;"></input-box>
                <input-box v-model="form.exFactoryPrice" label="出厂价格" class="input-width" style="width:20%;"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="layer = false">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
    </div>
</template>

<script>
    import DataList from "@/components/datalist";

    export default {
        name: "finished-price-list",
        components: {DataList},
        data() {
            return {
                layer: false,
                loading: false,
                form: {},
                filter: {
                    productNo: "",
                    productModel: ""
                },
                info: {}
            };
        },
        created() {
        },
        methods: {
            edit(item) {
                // this.$router.push(`/order/info?orderNo=${item.orderNo}`);
                if (item) {
                    this.form = item;
                } else {
                    this.form = {};
                }
                this.layer = true;
                // this.getInfo(item.orderNo);
                // this.getOrderStatusList();
            },
            vertify() {
                for (let key in this.form) {
                    let item = this.form[key];
                    if (!item && item !== 0 && key !== "id") {
                        this.$toast("请输入完整信息" + key);
                        return false;
                    }
                }
                return true;
            },
            submit() {
                // if (!this.vertify()) return;
                const {form} = this;
                if (form.id) {
                    this.$http
                        .put("/haolifa/price/product/update", form)
                        .then(res => {
                            this.$refs.list.update();
                            this.layer = false;
                            this.$toast("保存成功");
                        })
                        .catch(e => {
                            this.$toast(e.message || e.meg);
                        });
                } else {
                    this.$http
                        .post("/haolifa/price/product/save", form)
                        .then(res => {
                            this.$refs.list.update();
                            this.layer = false;
                            this.$toast("保存成功");
                        })
                        .catch(e => {
                            this.$toast(e.message || e.meg);
                        });
                }
            },
            close() {
                this.layer = false;
            },
            del(item) {
                this.$confirm({
                    title: "删除确认",
                    text: `您确定要删除以下成品吗？<br>${item.productNo}`,
                    color: "red",
                    btns: ["取消", "删除"],
                    yes: () => {
                        this.$http
                            .delete(`/haolifa/price/product/delete/${item.id}`)
                            .then(res => {
                                this.$toast("删除成功");
                                this.$refs.list.update();
                            })
                            .catch(e => {
                                this.$toast(e.msg);
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

    .input-width {
        display: inline-block;
        margin-left: 2px;
    }
</style>