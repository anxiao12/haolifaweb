<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div style="width:90%;margin:20px auto;display:flex;">
            <el-date-picker size="mini" v-model="yearDate" :clearable="false" type="year" value-format="yyyy" @change="getCbOne" :editable="false" placeholder="选择年"></el-date-picker>
            <!-- <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDeptDetail(3)">数据显示</el-button> -->
        </div>
        <div style="height:300px;width:96%;margin:0 auto;">
            <div id="cbOne" style="width:100%;height:300px;margin:0 auto"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;">
            <el-date-picker size="mini" v-model="yearDate2" :clearable="false" type="year" value-format="yyyy" @change="getCbTwo" :editable="false" placeholder="选择年"></el-date-picker>
        </div>
        <div style="height:300px;width:96%;margin:0 auto;">
            <div id="cbTwo" style="width:100%;height:300px;margin:0 auto"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;">
            <el-date-picker size="mini" v-model="yearDate3" :clearable="false" type="year" value-format="yyyy" @change="getCbThree" :editable="false" placeholder="选择年"></el-date-picker>
        </div>
        <div style="height:300px;width:96%;margin:0 auto;">
            <div id="cbThree" style="width:100%;height:300px;margin:0 auto"></div>
        </div>
    </div>
</template>
<script>
import DataList from "@/components/datalist";
export default {
    name: "report-form",
    components: { DataList },
    data() {
        return {
            yearDate: new Date().getFullYear() + "",
            yearDate2: new Date().getFullYear() + "",
            yearDate3: new Date().getFullYear() + ""
        };
    },
    mounted() {
        this.getCbOne();
        this.getCbTwo();
        this.getCbThree();
    },
    methods: {
        flush() {
            this.yearDate = new Date().getFullYear() + "";
            this.getCbOne();
            this.yearDate2 = new Date().getFullYear() + "";
            this.getCbTwo();
            this.yearDate3 = new Date().getFullYear() + "";
            this.getCbThree();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getCbOne() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/finance`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate
                })
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.dataMonth),
                            valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("cbOne")
                    );
                    let option = {
                        title: {
                            text: "财务成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } }
                            }
                        ]
                    };
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getCbTwo() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/material`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate2
                })
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.dataMonth),
                            valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("cbTwo")
                    );
                    let option = {
                        title: {
                            text: "材料成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } }
                            }
                        ]
                    };
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getCbThree() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/quality`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate3
                })
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.dataMonth),
                            valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("cbThree")
                    );
                    let option = {
                        title: {
                            text: "质量成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } }
                            }
                        ]
                    };
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>
<style lang="less">
.metalwor-info {
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