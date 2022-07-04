<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.inspectNo" @change="$refs.list.update(true)" placeholder="送检单号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.purchaseOrderNo" @change="$refs.list.update(true)" placeholder="采购合同号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.batchNumber" @change="$refs.list.update(true)" placeholder="批次号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.supplierName" @change="$refs.list.update(true)" placeholder="供应商" style="width: 200px;">
            </div>状态：
            <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                <option value="0">全部</option>
                <option value="2">质检中</option>
                <option value="3">质检完成</option>
            </select>
            <div class="flex-item"></div>
            <router-link to="/applyBuy-material/add">
                <btn class="b" flat color="#008eff">创建送检单</btn>
            </router-link>
        </div>
        <div class="flex-item scroll-y">
            <data-list class="f-14" ref="list" :page-size="15" :param="filter" url="/haolifa/material-inspect/purchase-list/0" method="get">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>报检单号</th>
                    <th>采购合同号</th>
                    <th>批次号</th>
                    <th>送检总数</th>
                    <th>检验合格数</th>
                    <th>到货日期</th>
                    <th>供应商名称</th>
                    <th>运费</th>
                    <th>发起时间</th>
                    <th>状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{index}}</td>
                    <td>{{item.inspectNo}}</td>
                    <td>{{item.purchaseNo}}</td>
                    <td>{{item.batchNumber}}</td>
                    <td>{{item.totalCount}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{item.arrivalTime}}</td>
                    <td>{{item.supplierName}}</td>
                    <td>{{item.freight}}</td>
                    <td>{{item.createTime}}</td>
                    <td>{{statusList[item.status].name}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="info(item)">查看</a>
                        <!-- <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a> -->
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a>
                        <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="remove(item)">删除</a>
                        <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="commit(item.id)">发起报检</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content page-supplier-info">
                    <table class="f-14">
                        <tr>
                            <!--  -->
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                        </tr>
                        <tr>
                            <td colspan="11" class="b">零件送检单</td>
                        </tr>
                        <tr>
                            <th colspan="5">送检单号：{{inspect.inspectNo}}</th>
                            <td colspan="6">发起日期：{{inspect.createTime}}</td>
                        </tr>
                        <tr>
                            <th colspan="5">采购合同号：{{inspect.purchaseNo}}</th>
                            <td colspan="6">批次号：{{inspect.batchNumber}}</td>
                        </tr>
                        <tr>
                            <th colspan="5">供应商：{{inspect.supplierName}}</th>
                            <td colspan="6">到货日期：{{inspect.arrivalTime}}</td>
                        </tr>
                        <tr>
                            <th colspan="11">费用：{{inspect.freight}}</th>
                        </tr>
                        <tr>
                            <td colspan="1" class="b">序号</td>
                            <td colspan="1" class="b">合同编号</td>
                            <td colspan="1" class="b">物料名称</td>
                            <td colspan="1" class="b">物料图号</td>
                            <td colspan="1" class="b">规格</td>
                            <td colspan="1" class="b">材质与标准要求</td>
                            <td colspan="1" class="b">单位</td>
                            <td colspan="1" class="b">采购数</td>
                            <td colspan="1" class="b">送货数</td>
                            <td colspan="1" class="b">不合格数量</td>
                            <td colspan="1" class="b">备注</td>
                        </tr>
                        <tr v-for="(item,i) in items" :key="i">
                            <td colspan="1">{{i+1}}</td>
                            <td colspan="1">{{item.purchaseNo}}</td>
                            <td colspan="1">{{item.materialName}}</td>
                            <td colspan="1">{{item.materialGraphNo}}</td>
                            <td colspan="1">{{item.specification}}</td>
                            <td colspan="1">{{item.requirements}}</td>
                            <td colspan="1">{{item.unit}}</td>
                            <td colspan="1">{{item.purchaseNumber}}</td>
                            <td colspan="1">{{item.deliveryNumber}}</td>
                            <td colspan="1">{{item.unqualifiedNumber}}</td>
                            <td colspan="1">{{item.remark}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mt-15 ml-20 mr-20" v-if="resFileList.length" style="overflow-x: auto">
                    <div class="b f-18 flex-v-center ml-20" style="margin-bottom: 20px;">
                        <div class="flex-item" style="text-align: left;line-height: 24px;">质量保证书</div>
                    </div>
                    <div style="margin-left:20px;margin-top:5px;">
                        <table class="data-table">
                            <tr slot="header">
                                <th style="width: 60px;">序号</th>
                                <th>文件名称</th>
                                <th>下载地址</th>
                            </tr>
                            <tr v-for="(item,i) in resFileList" :key="i">
                                <td>{{i}}</td>
                                <td>{{item.fileName}}</td>
                                <td>
                                    <a class="fixed-length" :href="item.fileUrl" :title="item.fileUrl">{{item.fileUrl}}</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="mt-15 ml-20 mr-20" v-if="inspectHistory.length" style="overflow-x: auto">
                    <div class="b f-18 flex-v-center ml-20" style="margin-bottom: 20px;">
                        <div class="flex-item" style="text-align: center;line-height: 24px;">质检记录</div>
                    </div>
                    <div class="flex-item scroll-y page-supplier-info" style="overflow-x: auto">
                        <table class="data-table">
                            <tr style="display:none">
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 12%;"></td>
                            </tr>
                            <tr>
                                <th>质检单号</th>
                                <th>类别</th>
                                <th>物料名称</th>
                                <th>物料图号</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>处理意见</th>
                                <th>不合格现象描述</th>
                            </tr>
                            <tr v-for="(item, i) in inspectHistory" :key="i">
                                <td>{{item.inspectNo}}</td>
                                <td>{{item.type == 1?'采购零件':'机加工零件'}}</td>
                                <td>{{item.materialGraphName}}</td>
                                <td>{{item.materialGraphNo}}</td>
                                <td>{{item.testNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.handlingSuggestion}}</td>
                                <td>{{item.reasonArr ? item.reasonArr.toString() :""}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-material-list",
    components: { DataList },
    data() {
        return {
            filter: {
                type: 0,
                status: 0,
                inspectNo: "",
                supplierName: "",
                purchaseOrderNo: ""
            },
            statusList: [
                { status: 0, name: "全部" },
                { status: 1, name: "未提交" },
                { status: 2, name: "质检中" },
                { status: 3, name: "质检完成" },
                { status: 4, name: "入库中" },
                { status: 5, name: "入库完成" }
            ],
            layer: false,
            inspect: {
                id: 0,
                inspectNo: ""
            },
            items: [],
            inspectHistory: [],
            resFileList: []
        };
    },
    methods: {
        flush() {
            this.filter = {
                type: 0,
                status: 0,
                inspectNo: "",
                supplierName: "",
                purchaseOrderNo: ""
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.$router.push(`/applyBuy-material/edit?id=${item.id}`);
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下送检单吗？<br><b>${item.inspectNo}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/material-inspect/delete/${item.id}`)
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
        getInfo() {
            this.$http
                .get(`/haolifa/material-inspect/info/${this.inspect.id}`)
                .then(res => {
                    this.inspect = res.inspect;
                    this.items = res.items;
                    this.inspect.createTime = res.inspect.createTime.substring(
                        0,
                        10
                    );
                    this.inspect.arrivalTime = res.inspect.arrivalTime.substring(
                        0,
                        10
                    );
                    this.inspect.updateTime = res.inspect.updateTime.substring(
                        0,
                        10
                    );
                    if (
                        res.inspect.blueprints != "" &&
                        res.inspect.blueprints != null
                    ) {
                        this.resFileList = JSON.parse(res.inspect.blueprints);
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getInspectHistory() {
            this.$http
                .get(
                    `/haolifa/material-inspect/history/list/${
                        this.inspect.inspectNo
                    }`
                )
                .then(res => {
                    this.inspectHistory = res;
                    this.inspectHistory.map(item => {
                        if (item.reasonList)
                            return (item.reasonArr = item.reasonList.map(
                                obj => {
                                    if (obj.number)
                                        return (
                                            "数量:" +
                                            obj.number +
                                            ",原因:" +
                                            obj.reason +
                                            ";"
                                        );
                                }
                            ));
                    });
                    console.log(this.inspectHistory);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        commit(itemId) {
            this.$http
                .post(
                    `/haolifa/material-inspect/updateStatus/${itemId}?status=2`
                )
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        info(item) {
            this.layer = true;
            this.inspect.id = item.id;
            this.inspect.inspectNo = item.inspectNo;
            this.resFileList = [];
            this.getInfo();
            this.getInspectHistory();
            // this.$router.push(
            //     `/applyBuy-material/info?id=${item.id}&inspectNo=${
            //         item.inspectNo
            //     }`
            // );
        },
        close() {
            this.close = false;
        }
    }
};
</script>

<style lang="less">
.page-material-list {
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
