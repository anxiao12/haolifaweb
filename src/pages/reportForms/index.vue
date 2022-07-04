<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">费用报表统计图</div>
        <div style="width:90%;margin:20px auto;display:flex;">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker size="mini" v-model="twoData.startDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getTwo" :editable="false" placeholder="选择年月"></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker size="mini" v-model="twoData.endDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getTwo" :editable="false" placeholder="选择年月"></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDeptDetail(1)">数据显示</el-button>
        </div>
        <div style="width:95%;display:flex;margin:30px auto">
            <div id="chartTwonew" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="chartTwoDetail" v-if="showFlag" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker size="mini" v-model="threeData.startDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getThree" :editable="false" placeholder="选择年月"></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker size="mini" v-model="threeData.endDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getThree" :editable="false" placeholder="选择年月"></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDeptDetail(2)">数据显示</el-button>
        </div>
        <div style="height:310px;width:90%;display:flex;margin:60px auto">
            <div id="chartThreenew" style="width:80%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;">
            <el-date-picker size="mini" v-model="fourYearDate" :clearable="false" type="year" value-format="yyyy" @change="getFour" :editable="false" placeholder="选择年月"></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDeptDetail(3)">数据显示</el-button>
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
        <layer v-if="deptFlag" title="详情" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    报销人:
                    <input type="text" class="flex-item" v-model="form.commitUser" placeholder style="width: 150px;border-bottom:1px solid #ccc;" @change="$refs.list.update(true)">
                    报销部门:
                    <input type="text" class="flex-item" v-model="form.department" placeholder style="width: 150px;border-bottom:1px solid #ccc;" @change="$refs.list.update(true)">
                    费用类别:
                    <input type="text" class="flex-item" v-model="form.classifyName" style="width: 150px;border-bottom:1px solid #ccc;" @change="$refs.list.update(true)">
                    费用类别明细:
                    <input type="text" class="flex-item" v-model="form.secondClassifyName" placeholder style="width: 150px;border-bottom:1px solid #ccc;" @change="$refs.list.update(true)">
                    <el-button type="primary" size="mini" @click="getDeptDetail(4)">查询</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;">费用汇总金额: {{totalNum}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="list" :page-size="50" :param="form" url="/haolifa/expenses/list" method="post">
                    <tr slot="header">
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
                    <!-- item: 当前行数据; index: 当前行数 -->
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
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
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="deptFlag=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>
<script>
import DataList from "@/components/datalist";
export default {
    name: "report-form",
    components: { DataList },
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
            showFlag: true,
            twoData: {
                classifyName: "",
                commitUser: "",
                department: "",
                endDate: "",
                month: "",
                secondClassifyName: "",
                startDate: "",
                voucherNo: "",
                year: ""
            },
            threeData: {
                classifyName: "",
                commitUser: "",
                department: "",
                endDate: "",
                month: "",
                secondClassifyName: "",
                startDate: "",
                voucherNo: "",
                year: ""
            },
            deptFlag: false,
            form: {
                classifyName: "",
                commitUser: "",
                department: "",
                endDate: "",
                month: "",
                secondClassifyName: "",
                startDate: "",
                voucherNo: "",
                year: ""
            },
            deptDetailData: []
        };
    },
    mounted() {
        this.twoData.startDate = this.threeData.startDate =
            new Date().getFullYear() + "-01";
        this.getDepart();
        this.getType(
            this.threeYearDate.split("-")[0],
            this.threeYearDate.split("-")[1]
        );
        this.getFour();
    },
    methods: {
        flush() {
            this.twoData.startDate = this.threeData.startDate =
                new Date().getFullYear() + "-01";
            this.twoYearDate =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.threeYearDate =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.yearDate = new Date().getFullYear() + "";
            this.fourYearDate = new Date().getFullYear() + "";
            this.getDepart();
            this.getType(
                this.threeYearDate.split("-")[0],
                this.threeYearDate.split("-")[1]
            );
            this.getFour();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getTwo() {
            let [year, month] = this.twoYearDate.split("-");
            this.getDepart();
        },
        getThree() {
            let [year, month] = this.threeYearDate.split("-");
            this.getType(year, month);
        },
        getDepart() {
            let that = this;
            this.$http
                .post(
                    `/haolifa/report/expense/classifyByDepartmentAll`,
                    this.twoData
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
                        document.getElementById("chartTwonew")
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
                        that.getDepartDetail(params.data.name);
                    });
                    chart.setOption(option);
                    that.getDepartDetail(nameData[0]);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //部门详情
        getDepartDetail(name) {
            let that = this;
            this.$http
                .post(`/haolifa/report/expense/getAllClassifyWithDepartment`, {
                    classifyName: "",
                    commitUser: "",
                    department: name,
                    endDate: this.twoData.endDate,
                    month: "",
                    secondClassifyName: "",
                    startDate: this.twoData.startDate,
                    voucherNo: "",
                    year: ""
                })
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
            // `/haolifa/expenses/list?pageNum=1&pageSize=999&department=${name}&classifyName=${classifyName}&year=${year}&month=${month}`
            this.$http
                .post(`/haolifa/expenses/list`, {
                    classifyName: classifyName,
                    commitUser: "",
                    department: name,
                    endDate: this.threeData.endDate,
                    month: "",
                    secondClassifyName: "",
                    startDate: this.threeData.startDate,
                    voucherNo: "",
                    year: ""
                })
                .then(res => {
                    this.layer = true;
                    this.departData = res.list;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getDeptDetail(type) {
            if (type == 1) {
                this.form.startDate = this.twoData.startDate;
                this.form.endDate = this.twoData.endDate;
            } else if (type == 2) {
                this.form.startDate = this.threeData.startDate;
                this.form.endDate = this.threeData.endDate;
            } else if (type == 3) {
                this.form.startDate = this.fourYearDate + "-01";
                this.form.endDate = this.fourYearDate + "-12";
            }
            this.deptDetailData = [];
            this.deptFlag = true;
            /* this.$http
                .post(`/haolifa/expenses/list`, this.form)
                .then(res => {
                    this.deptFlag = true;
                    this.deptDetailData = res.list;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                }); */
            this.getTotalNum();
            this.$refs.list.update(true);
        },
        getTotalNum() {
            this.totalNum = "";
            this.$http
                .post(`/haolifa/expenses/list-summary`, this.form)
                .then(res => {
                    this.totalNum = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //费用分类
        getType(year, month) {
            let that = this;
            this.$http
                .post(`/haolifa/report/expense/getAllClassify`, this.threeData)
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
                        document.getElementById("chartThreenew")
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
                        yData = [],
                        yData2 = [];
                    let name1 = res[0].value[0].year;
                    let name2 = res[0].value[1].year;
                    res.map(item => {
                        xData.push(item.companyName + "月");
                        yData.push(item.value[0].amount);
                        yData2.push(item.value[1].amount);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartFour")
                    );
                    let option = {
                        color: ["#3398DB", "#91CC75"],
                        title: {
                            text: "年度费用按月统计",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        legend: {},
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            }
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
                                name: name1,
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            },
                            {
                                name: name2,
                                barWidth: "30%",
                                data: yData2,
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