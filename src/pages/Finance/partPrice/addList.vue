<template>
    <div class="page-orders-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true)" placeholder="图号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.name" @change="$refs.list.update(true)" placeholder="零件名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.model" @change="$refs.list.update(true)" placeholder="型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="edit">新增</btn>
        </div>
        <div class="flex-item">
            <data-list ref="list" :param="filter" url="/haolifa/price/material/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>图号</th>
                    <th>零件名称</th>
                    <th>型号</th>
                    <th>规格</th>
                    <th>零件分类名称</th>
                    <th>材料</th>
                    <th>单位</th>
                    <th>单重</th>
                    <th>吨价(元)</th>
                    <th>税率</th>
                    <th>毛坯费不含税(元)</th>
                    <th>毛坯费含税(元)</th>
                    <th>喷涂费(元)</th>
                    <th>加工费(元)</th>
                    <th>成品价不含税(元)</th>
                    <th>成品价含税(元)</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.materialClassifyName}}</td>
                    <td>{{item.material}}</td>
                    <td>{{item.unit}}</td>
                    <td>{{item.actualWeight}}</td>
                    <td>{{item.tonPrice}}</td>
                    <td>{{item.taxRate}}</td>
                    <td>{{item.blankCost}}</td>
                    <td>{{item.blankCostTax}}</td>
                    <td>{{item.sprayCost}}</td>
                    <td>{{item.processCost}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.priceTax}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑|</a>
                        <a href="javascript:;" class="red" @click="del(item)" style="margin-right: 3px;">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑' : '新增'" width="900px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <input-box v-model="form.graphNo" label="图号" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.name" label="零件名称" class="input-width" style="width:48%;"></input-box>
                <input-box v-model="form.model" label="型号" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.specifications" label="规格" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.materialClassifyName" label="零件分类名称" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.material" label="材料" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.unit" label="单位" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.actualWeight" label="单重" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.tonPrice" type="number" label="吨价(元)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.processCost" type="number" label="加工费(元)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.taxRate" type="number" @input="priceChange" label="税率(%)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.priceTax" type="number" @input="priceChange" label="成品价(含税)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.blankCostTax" type="number" @input="priceChange" label="毛坯费(含税)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.sprayCost" type="number" label="喷涂费" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.price" type="number" label="成品价(不含税)" class="input-width" style="width:24%;"></input-box>
                <input-box v-model="form.blankCost" type="number" label="毛坯费(不含税)" class="input-width" style="width:24%;"></input-box>
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
    components: { DataList },
    data() {
        return {
            layer: false,
            form: {},
            filter: {
                graphNo: "",
                model: "",
                name: "",
                specifications: ""
            }
        };
    },
    created() {},
    methods: {
        flush() {
            this.filter = {
                graphNo: "",
                model: "",
                name: "",
                specifications: ""
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            // this.$router.push(`/order/info?orderNo=${item.orderNo}`);
            if (item) {
                this.form = JSON.parse(JSON.stringify(item));
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
            const { form } = this;
            if (form.id) {
                this.$http
                    .put("/haolifa/price/material/update", form)
                    .then(res => {
                        this.$refs.list.update(true);
                        this.layer = false;
                        this.$toast("保存成功");
                    })
                    .catch(e => {
                        this.$toast(e.message || e.meg);
                    });
            } else {
                this.$http
                    .post("/haolifa/price/material/save", form)
                    .then(res => {
                        this.$refs.list.update(true);
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
                text: `您确定要删除以下零件价格吗？<br>${item.name}`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/price/material/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg);
                        });
                }
            });
        },
        priceChange() {
            console.log(11);
            if (!this.form.taxRate || !this.form.priceTax) {
                this.form.price = "";
            } else {
                this.form.price =
                    Math.round(
                        (+this.form.priceTax * 100) /
                            (1 + +this.form.taxRate / 100)
                    ) / 100;
            }
            if (!this.form.taxRate || !this.form.blankCostTax) {
                this.form.blankCost = "";
            } else {
                this.form.blankCost =
                    Math.round(
                        (+this.form.blankCostTax * 100) /
                            (1 + +this.form.taxRate / 100)
                    ) / 100;
            }
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