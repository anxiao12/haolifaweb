<template>
    <div class="material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.entrustNo" @change="$refs.list.update(true);" placeholder="单号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.graphNo" @change="$refs.list.update(true);" placeholder="图号" style="width: 200px;">
                状态：
                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
                <!-- <btn class="ml-20" @click="exportExcel">导出</btn> -->
            </div>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/valve-seat-entrust/page" method="post">
                <tr slot="header">
                    <th>单号</th>
                    <th>物料名称</th>
                    <th>物料图号</th>
                    <th>规格</th>
                    <th>型号</th>
                    <th>数量</th>
                    <th>合格数量</th>
                    <th>质检状态</th>
                    <th>状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item }">
                    <td>{{item.entrustNo}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.graphNo}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.qty}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{inspectStatusList[item.inspectStatus]}}</td>
                    <td>{{rowStatusList[item.status].name}}</td>
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="detail(item)">详情</a>
                        <a href="javascript:;" v-if="item.status == 0 || item.status == 4" style="margin-right: 3px" class="blue" @click="machine(item)">| 开始加工</a>
                        <!-- <a href="javascript:;" v-if="item.status == 1" style="margin-right: 3px" class="blue" @click="stopMachine(item)">| 暂停</a> -->
                        <a href="javascript:;" v-if="item.status == 1 || item.status == 2" style="margin-right: 3px" class="blue" @click="completeMachine(item)">| 加工完成</a>
                        <!-- <a :href="`/haolifa/export/spray/excel/${item.sprayNo}`" download style="margin-right: 3px" class="blue">下载委托单</a> -->
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" title="详情" width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content page-supplier-info">
                    <table class="f-14">
                        <tr>
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
                            <td style="border: none;" colspan="10" class="b" align="center">自控委托单</td>
                        </tr>
                        <tr>
                            <th colspan="10">委托单号：{{spray.entrustNo}}</th>
                        </tr>
                        <tr>
                            <!-- <th colspan="5">计划人：{{spray.planner}}</th> -->
                            <td colspan="10">日 期：{{spray.createTime}}</td>
                        </tr>
                        <tr style="border:thin">
                            <td colspan="1" class="b">序号</td>
                            <td colspan="1" class="b">名称</td>
                            <td colspan="1" class="b">图号</td>
                            <td colspan="1" class="b">型号</td>
                            <td colspan="1" class="b">规格</td>
                            <td colspan="1" class="b">数量</td>
                            <td colspan="1" class="b">合格数</td>
                            <td colspan="1" class="b">状态</td>
                            <td colspan="2" class="b">质检状态</td>
                        </tr>
                        <tr style="border:thin">
                            <td colspan="1">1</td>
                            <td colspan="1">{{spray.name}}</td>
                            <td colspan="1">{{spray.graphNo}}</td>
                            <td colspan="1">{{spray.model}}</td>
                            <td colspan="1">{{spray.specifications}}</td>
                            <td colspan="1">{{spray.qty}}</td>
                            <td colspan="1">{{spray.qualifiedNumber}}</td>
                            <td colspan="2">{{rowStatusList[spray.status].name}}</td>
                            <td colspan="1">{{inspectStatusList[spray.inspectStatus]}}</td>
                        </tr>
                    </table>
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
                                <td style="width: 12%;"></td>
                            </tr>
                            <tr>
                                <th>单号</th>
                                <th>名称</th>
                                <th>图号</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>处理意见</th>
                                <th>附件</th>
                                <th>不合格现象描述</th>
                            </tr>
                            <tr v-for="(item, i) in inspectHistory" :key="i">
                                <td>{{item.no}}</td>
                                <td>{{item.materialGraphName}}</td>
                                <td>{{item.materialGraphNo}}</td>
                                <td>{{item.testNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.handlingSuggestion}}</td>
                                <td>
                                    <div v-for="(obj,i) in item.accessoryList" :key="i">
                                        <a target="_blank" :href="obj.fileUrl">{{obj.fileName}}</a>
                                    </div>
                                </td>
                                <td>{{item.reasonArr.toString()}}</td>
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
    name: "material-list",
    components: { DataList },
    data() {
        return {
            filter: {
                entrustNo: "",
                graphNo: "",
                inspectStatus: "-1",
                type: "",
                status: "-1"
            },
            rowStatusList: [
                { status: 0, name: "待加工" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" }
            ],
            inspectStatusList: { 0: "待质检", 1: "质检中", 2: "质检完成" },
            statusList: [
                { status: 0, name: "待加工" },
                { status: 1, name: "加工中" },
                { status: 2, name: "质检完成" },
                { status: 3, name: "加工完成" },
                { status: 4, name: "暂停加工" },
                { status: -1, name: "全部" }
            ],
            inspectHistory: [],
            spray: {},
            layer: false
        };
    },
    methods: {
        flush() {
            this.filter = {
                entrustNo: "",
                graphNo: "",
                inspectStatus: "-1",
                type: "",
                status: "-1"
            };
            this.$refs.list.update(true);
        },
        detail(item) {
            this.sprayInfo(item);
            this.layer = true;
        },
        // 查询详情
        sprayInfo(item) {
            // 查询详情：
            this.$http
                .post(`/haolifa/valve-seat-entrust/detail/${item.id}`)
                .then(res => {
                    this.spray = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            // 质检记录列表；
            this.$http
                .get(
                    `/haolifa/valve-seat-entrust/inspect/list/${item.entrustNo}`
                )
                .then(res => {
                    this.inspectHistory = res;
                    this.inspectHistory.map(item => {
                        return (item.reasonArr = item.reasonList.map(obj => {
                            if (obj.number)
                                return (
                                    "数量:" +
                                    obj.number +
                                    ",原因:" +
                                    obj.reason +
                                    ";"
                                );
                        }));
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //开始加工
        machine(item) {
            this.updateStatus(item.id, 1);
        },
        // 暂停加工
        stopMachine(item) {
            this.updateStatus(item.id, 4);
        },
        // 加工完成
        completeMachine(item) {
            this.$confirm({
                title: "加工完成确认",
                text: `您确定喷涂订单已加工完成？<br>${item.entrustNo}`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    if (item.qualifiedNumber < item.qty) {
                        let count = item.qty - item.qualifiedNumber;
                        this.$confirm({
                            title: "继续确认",
                            text:
                                "订单显示还有(" +
                                count +
                                ")个零件未完成，是否继续？",
                            color: "red",
                            btns: ["取消", "确认"],
                            yes: () => {
                                this.updateStatus(item.id, 3);
                            }
                        });
                    } else {
                        this.updateStatus(item.id, 3);
                    }
                }
            });
        },
        updateStatus(id, status) {
            this.$http
                .put(`/haolifa/valve-seat-entrust/status/${id}/${status}`)
                .then(res => {
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.material-list {
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
