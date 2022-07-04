<template>
    <div class="page-product-list flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.orderNo" @change="$refs.list.update(true)" placeholder="订单号">
                生产状态：
                <select v-model="filter.orderStatus" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in scStatusList" :value="item.value" v-bind:key="item.id">{{item.text}}</option>
                </select>
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/order-product/pageInfo" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单号</th>
                    <th>发货状态</th>
                    <th>生产状态</th>
                    <th>装配车间</th>
                    <th>装配小组</th>
                    <th>创建时间</th>
                    <th>完成时间</th>
                    <th>预览</th>

                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>{{deliverStatusList[item.deliverStatus].text}}</td>
                    <td>{{orderStatusList[item.orderStatus].text}}</td>
                    <td>{{item.assemblyShop}}</td>
                    <td>{{item.assemblyGroup}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{item.finishFeedbackTime}}</td>
                    <td>
                        <a target="_blank" v-if="(item.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="item.orderContractUrl">预览</a>
                        <a target="_blank" v-if="!(item.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$')" :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.orderContractUrl">预览</a>
                    </td>
                    <td class="t-right">
                        <!-- <icon-btn small @click="edit(item)">edit</icon-btn>
                        <icon-btn small @click="remove(item)">delete</icon-btn>-->
                        <a href="javascript:;" class="blue" v-if="item.genPickingList === 0" @click="getInfo(item.orderNo)">核料单详情 |</a>
                        <a :href="`/haolifa/export/requisition?orderNo=${item.orderNo}`" download style="margin-right: 3px" class="blue">下载领料单 |</a>
                        <a href="javascript:;" class="blue" @click="getDetail(item.orderNo)">领料单详情</a>
                        <!--  <a href="javascript:;" class="blue" @click="entryList(item)">入库详情</a> |
                        <a href="javascript:;" class="blue" @click="outList(item)">出库详情</a>-->
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14" ref="tableList">
                        <tr>
                            <th>订单号</th>
                            <th>零件图号</th>
                            <th>零件名称</th>
                            <!-- <th>价格</th> -->
                            <th>需要零件数量</th>
                            <!-- <th>缺少零件数量</th> -->
                            <!-- <th>状态</th> -->
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item,i) in infoList" :key="item.id">
                            <td>{{item.orderNo}}</td>
                            <td :class="editFlag?'bgc':''">
                                <div :contenteditable="editFlag">{{item.materialGraphNo}}</div>
                            </td>
                            <td :class="editFlag?'bgc':''">
                                <div :contenteditable="editFlag">{{item.materialName}}</div>
                            </td>
                            <!-- <td>{{item.price}}</td> -->
                            <td :class="editFlag?'bgc':''">
                                <div :contenteditable="editFlag">{{item.materialCount}}</div>
                            </td>
                            <!-- <td>{{item.lackMaterialCount}}</td>
                            <td>{{statusList[item.checkStatus-1].name}}</td>-->
                            <td>
                                <btn flat color="red" @click="delItem(i)">删除</btn>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" v-if="!editFlag" @click="editFlag=true">编辑</btn>
                <btn flat color="#008eff" v-if="editFlag" @click="submit">保存</btn>
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="detailLayer" title="领料单详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14">
                        <tr>
                            <th>订单号</th>
                            <th>零件图号</th>
                            <th>零件名称</th>
                            <th>零件数量</th>
                            <th>出库状态</th>
                            <th>时间</th>
                        </tr>
                        <tr v-for="item in detailList" :key="item.id">
                            <td>{{item.orderNo}}</td>
                            <td>{{item.graphNo}}</td>
                            <td>{{item.materialName}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{outTypeList[item.outRoomStatus]}}</td>
                            <td>{{item.updateTime}}</td>
                        </tr>
                        <tr v-if="detailList.length===0">
                            <td colspan="6" style="text-align:center">无数据</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="detailLayer=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-product-list",
    components: { DataList },
    data() {
        return {
            filter: {
                orderNo: "",
                orderStatusList: [5, 6, 7, 8, 9, 10, 11, 12, 13],
                orderStatus: "7"
            },
            loading: false,
            detailLayer: false,
            infoList: {},
            statusList: [
                { status: 1, name: "核料成功" },
                { status: 2, name: "缺料,需要采购" },
                { status: 3, name: "释放料" },
                { status: 4, name: "领料完成" }
            ],
            layer: false,
            deliverStatusList: [
                { value: 0, text: "待发货" },
                { value: 1, text: "部分发货" },
                { value: 2, text: "发货完成" }
            ],
            editForm: [],
            orderStatusList: [
                { value: 0, text: "创建" },
                { value: 1, text: "审批中" },
                { value: 2, text: "核料中" },
                { value: 3, text: "替换料审批中" },
                { value: 4, text: "核料完成" },
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
                { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
                { value: 10, text: "质检中" },
                { value: 11, text: "已入库" },
                { value: 12, text: "申请发货" },
                { value: 13, text: "发货完成" },
                { value: 14, text: "审核不通过" }
            ],
            scStatusList: [
                { value: 7, text: "生产中" },
                { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
                { value: 10, text: "质检中" },
                { value: 11, text: "已入库" }
            ],
            outTypeList: ["", "未出库", "出库完成"],
            editFlag: false,
            detailList: []
        };
    },
    methods: {
        // info(item) {
        //     this.$router.push(`ordermaterial/info?id=${item.orderNo}`);
        // },
        flush() {
            this.filter = {
                orderNo: "",
                orderStatusList: [5, 6, 7, 8, 9, 10, 11, 12, 13],
                orderStatus: "7"
            };
            this.$refs.list.update(true);
        },
        getInfo(orderNo) {
            this.layer = true;
            this.editFlag = false;
            this.$http
                .get(`/haolifa/order-product/order-material?orderNo=${orderNo}`)
                .then(res => {
                    this.infoList = res;
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        },
        // '
        getDetail(orderNo) {
            this.detailLayer = true;
            this.$http
                .get(`/haolifa/material-requisition/info?orderNo=${orderNo}`)
                .then(res => {
                    this.detailList = res;
                })
                .catch(e => {
                    this.$toast(e.message);
                });
        },
        delItem(index) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除该条数据吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.infoList.splice(index, 1);
                    this.editFlag = true;
                }
            });
        },
        submit() {
            this.$confirm({
                title: "保存确认",
                text: `您确定修改完毕了吗？`,
                color: "red",
                btns: ["取消", "确定"],
                yes: () => {
                    let rows = this.$refs["tableList"].rows;
                    this.editForm = [];
                    for (let i = 1; i < rows.length; i++) {
                        let obj = {};
                        obj.orderNo = rows[i].cells[0].innerText;
                        obj.graphNo = rows[i].cells[1].innerText;
                        obj.materialName = rows[i].cells[2].innerText;
                        obj.quantity = rows[i].cells[3].innerText;
                        this.editForm.push(obj);
                    }
                    this.$http
                        .post(
                            "/haolifa/material-requisition/save",
                            this.editForm
                        )
                        .then(res => {
                            this.$toast("保存成功");
                            this.editFlag = false;
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.message);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-product-list {
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
    // div[contenteditable="true"] {
    //     height: 100%;
    //     background: #ccc;
    // }
    .bgc {
        background: #ccc;
    }
}
</style>
