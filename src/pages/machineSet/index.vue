<template>
    <div class="page-part-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.supplierCode" @change="$refs.list.update(true)" placeholder="供应商代号" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.productName" @change="$refs.list.update(true)" placeholder="产品名称" style="width: 100px;">
                  <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)" placeholder="型号" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.specification" @change="$refs.list.update(true)" placeholder="规格" style="width: 100px;">
                <input type="text" class="flex-item" v-model="filter.series" @change="$refs.list.update(true)" placeholder="系列" style="width: 100px;">
                <!-- <select v-model="filter.classifyId" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option v-for="item in classifyList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                </select> -->
                <!-- <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i> -->
            </div>
            <div class="flex-item"></div>
            <router-link to="/machineSet/add">
                <btn class="b" flat color="#008eff">新增整机设置</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" page-num-str="pageNum" :param="filter" url="/haolifa/whole/machine/product/list" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>类别</th>
                    <th>产品名称</th>
                    <th>产品型号</th>
                    <th>系列</th>
                    <th>规格</th>
                    <th>公称压力</th>
                    <th>阀体材质</th>
                    <th>阀芯材质</th>
                    <th>密封材质</th>
                    <th>阀轴</th>
                    <th>驱动形式</th>
                    <th>结构形式</th>
                    <th>连接方式</th>
                    <th>产品颜色</th>
                    <th>介质</th>
                    <th>温度</th>
                    <th>备注</th>
                    <th>供应商名称</th>
                    <th>供应商代号</th>
                    <th>产品等级</th>
                    <th>采购价</th>
                    <th>销售底价</th>
                    <th>面价</th>
                    <th>好利型号</th>
                    <th>其他</th>
                    <th>创建时间</th>
                    <th>修改时间</th>
                    <th>是否标准产品</th>
                  <!--
                    <th>产品ID</th>
                    <th>产品编号</th> -->

                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.category}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.series}}</td>
                    <td>{{item.specification}}</td>
                    <td>{{item.nominalPressure}}</td>
                    <td>{{item.valveBodyMaterial}}</td>
                    <td>{{item.valveCoreMaterial}}</td>
                    <td>{{item.sealingMaterial}}</td>
                    <td>{{item.valveShaft}}</td>
                    <td>{{item.driveForm}}</td>
                    <td>{{item.structureForm}}</td>
                    <td>{{item.connectionMethod}}</td>
                    <td>{{item.productColor}}</td>
                    <td>{{item.medium}}</td>
                    <td>{{item.temperature}}</td>
                    <td>{{item.remarks}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.supplierCode}}</td>
                    <td>{{item.productGrade}}</td>
                    <td>{{item.purchasePrice}}</td>
                    <td>{{item.sellingBottomPrice}}</td>
                    <td>{{item.facePrice}}</td>
                    <td>{{item.goodModel}}</td>
                    <td>{{item.other}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.modifyTime}}</td>
                    <td>{{item.modifyTime}}</td>
<!--
                    <td>{{item.id}}</td>
                    <td>{{item.productId}}</td> -->
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)" style="margin-right: 3px;">编辑</a> |
                        <a href="javascript:;" class="red" @click="remove(item)" style="margin-right: 3px;">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-machineSet-list",
    components: { DataList },
    data() {
        return {
            classifyList: [],
            filter: {
                supplierCode: "",
                productName:"",
                productModel: "",
                specification: "",
                series:"",
                classifyId: 0
            }
        };
    },
    created() {
        this.getClassifyList();
    },
    mounted(){
      const { from }  = this.$route.query
      console.log('this',from)
      if(from === 'addPage'){
        this.$refs.list.update(true);
      }

    },
    methods: {
        flush() {
            this.filter = {
                supplierCode: "",
                productName:"",
                productModel: "",
                specification: "",
                series:"",
                classifyId: 0
            };
            this.$refs.list.update(true);
        },

        edit(item) {
            this.$router.push(`/machineSet/edit?editId=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下库房吗？<br><b>${item.name}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/whole/machine/product/delete/${item.id}`)
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
        getClassifyList() {
            this.$http.get("/haolifa/material/classify/list").then(res => {
                this.classifyList = res.map(item => {
                    return { value: item.id, text: item.classifyName };
                });
            });
        }
    }
};
</script>

<style lang="less">
.page-part-list {
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
</style>
