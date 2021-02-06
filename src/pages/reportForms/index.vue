<template>
    <div class="page-notification">
        <div class="flex-v-center tool-bar">费用报表统计图</div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="twoYearDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getTwo" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="width:95%;display:flex;margin:30px auto">
            <div id="chartTwo" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="chartTwoDetail" v-if="showFlag" style="width:50%;height:300px;margin-top:20px;"></div>
            <!-- <div id="chartDetailChild" style="width:30%;height:300px;margin-top:20px;"></div> -->
        </div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker
                v-model="threeYearDate"
                :clearable="false"
                type="month"
                value-format="yyyy-MM"
                @change="getThree"
                :editable="false"
                placeholder="选择年月"
            ></el-date-picker>
        </div>
        <div style="height:310px;width:90%;display:flex;margin:60px auto">
            <div id="chartThree" style="width:80%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="fourYearDate" :clearable="false" type="year" value-format="yyyy" @change="getFour" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:0 auto;">
            <div id="chartFour" style="width:80%;height:500px;margin:0 auto"></div>
        </div>
        <layer v-if="layer" title="详情" width="80%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwor-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 5%;"></td>
                            <td style="width: 6%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 17%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                            <td style="width: 9%;"></td>
                        </tr>
                        <tr>
                            <th style="width: 60px;">序号</th>
                            <th>报销人</th>
                            <th>报销部门</th>
                            <th>报销摘要</th>
                            <th>费用类别</th>
                            <th>凭证号</th>
                            <th>费用类别明细</th>
                            <th>总费用</th>
                            <th>费用产生年份</th>
                            <th>费用产生月份</th>
                            <th>备注</th>
                        </tr>
                        <tr v-for="(item ,index) in departData" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.commitUser}}</td>
                            <td>{{item.department}}</td>
                            <td>{{item.summary}}</td>
                            <td>{{item.expensesClassify}}</td>
                            <td>{{item.voucherNo}}</td>
                            <td>{{item.secondClassify}}</td>
                            <td>￥ {{item.totalAmount}}</td>
                            <td>{{item.dataYear}}</td>
                            <td>{{item.dataMonth}}</td>
                            <td>{{item.remark}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>
<script>
export default {
    name: "report-form",
    data() {
        return {
            twoYearDate:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            threeYearDate:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            chartOneList: [],
            yearDate: new Date().getFullYear() + "",
            fourYearDate: new Date().getFullYear() + "",
            totalNum: "",
            totalPrice: "",
            layer: false,
            departData: [],
            showFlag: true
        };
    },
    mounted() {
        this.getDepart(
            this.twoYearDate.split("-")[0],
            this.twoYearDate.split("-")[1]
        );
        this.getType(
            this.threeYearDate.split("-")[0],
            this.threeYearDate.split("-")[1]
        );
        this.getFour();
    },
    methods: {
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getTwo() {
            let [year, month] = this.twoYearDate.split("-");
            this.getDepart(year, month);
        },
        getThree() {
            let [year, month] = this.threeYearDate.split("-");
            this.getType(year, month);
        },
        getDepart(year, month) {
            let that = this;
            this.$http
                .get(
                    `/haolifa/report/expense/classifyByDepartmentAll?year=${year}&month=${month}`
                )
                .then(res => {
                    if (!res.length) {
                        this.showFlag = false;
                    } else {
                        this.showFlag = true;
                    }
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.department),
                            valueData.push({
                                name: item.department,
                                value: item.totalAmount
                            });
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartTwo")
                    );
                    let option = {
                        title: {
                            text: "部门费用分配",
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                            data: nameData
                        },
                        series: [
                            {
                                name: "",
                                type: "pie",
                                radius: "55%",
                                center: ["50%", "60%"],
                                data: valueData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            }
                        ]
                    };
                    chart.on("click", function(params) {
                        that.getDepartDetail(params.data.name, year, month);
                    });
                    chart.setOption(option);
                    that.getDepartDetail(nameData[0], year, month);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //部门详情
        getDepartDetail(name, year, month) {
            let that = this;
            this.$http
                .get(
                    `/haolifa/report/expense/getAllClassifyWithDepartment?department=${name}&year=${year}&month=${month}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.expensesClassify),
                            valueData.push({
                                name: item.expensesClassify,
                                value: item.totalAmount
                            });
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartTwoDetail")
                    );
                    let option = {
                        title: {
                            text: "部门明细:" + name,
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                            data: nameData
                        },
                        series: [
                            {
                                name: "",
                                type: "pie",
                                radius: "55%",
                                center: ["50%", "60%"],
                                data: valueData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            }
                        ]
                    };
                    chart.on("click", function(params) {
                        //params.data.name
                        that.getDepartDetailSecond(
                            name,
                            params.data.name,
                            year,
                            month
                        );
                    });
                    chart.setOption(option);
                    // that.getDepartDetailSecond(name, nameData[0]);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //部门内一级费用中二级费用占比
        getDepartDetailSecond(name, classifyName, year, month) {
            this.$http
                .get(
                    `/haolifa/expenses/list?pageNum=1&pageSize=999&department=${name}&classifyName=${classifyName}&year=${year}&month=${month}`
                )
                .then(res => {
                    this.layer = true;
                    this.departData = res.list;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //费用分类
        getType(year, month) {
            let that = this;
            this.$http
                .get(
                    `/haolifa/report/expense/getAllClassify?year=${year}&month=${month}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.expensesClassify),
                            valueData.push({
                                name: item.expensesClassify,
                                value: item.totalAmount
                            });
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartThree")
                    );
                    let option = {
                        title: {
                            text: "费用分配",
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                            data: nameData
                        },
                        series: [
                            {
                                name: "",
                                type: "pie",
                                radius: "55%",
                                center: ["50%", "60%"],
                                data: valueData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            }
                        ]
                    };
                    chart.on("click", function(params) {
                        // that.getTypeDetail(params.data.name);
                        that.getDepartDetailSecond(
                            "",
                            params.data.name,
                            year,
                            month
                        );
                    });
                    chart.setOption(option);
                    // this.getTypeDetail(nameData[0]);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //费用详情
        getTypeDetail(name) {
            this.$http
                .get(
                    `/haolifa/report/expense/getAllClassifyWithFirstClassify?classify=` +
                        name
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.department),
                            valueData.push({
                                name: item.secondClassify,
                                value: item.totalAmount
                            });
                    });
                    let chartDetail = this.$echarts.init(
                        document.getElementById("chartThreeDetail")
                    );
                    let option = {
                        title: {
                            text: "费用明细:" + name,
                            // subtext: "纯属虚构",
                            x: "center"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: "vertical",
                            left: "left",
                            data: nameData
                        },
                        series: [
                            {
                                name: "",
                                type: "pie",
                                radius: "55%",
                                center: ["50%", "60%"],
                                data: valueData,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: "rgba(0, 0, 0, 0.5)"
                                    }
                                }
                            }
                        ]
                    };
                    chartDetail.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getFour() {
            this.$http
                .get(
                    "/haolifa/report/expense/total-by-month?year=" +
                        this.fourYearDate
                )
                .then(res => {
                    let xData = [],
                        yData = [];
                    res.map(item => {
                        xData.push(item.dataMonth + "月");
                        yData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartFour")
                    );
                    let option = {
                        color: ["#3398DB"],
                        title: {
                            text: "年度费用按月统计",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        tooltip: {
                            trigger: "item",
                            formatter: "{a} <br/>{b} : {c}元"
                        },
                        xAxis: {
                            type: "category",
                            data: xData
                        },
                        yAxis: {
                            type: "value"
                        },
                        series: [
                            {
                                name: "费用",
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            }
                        ]
                    };
                    chart.setOption(option);
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