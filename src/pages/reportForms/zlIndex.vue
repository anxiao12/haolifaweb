<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">质量报表统计图</div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="oneYearDate" :clearable="false" type="year" value-format="yyyy" @change="getBuyOne" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="buyOnee" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:90%;display:flex;margin:30px auto">
            <div id="chartOne" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="chartTwo" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="height:310px;width:90%;display:flex;margin:30px auto">
            <div id="chartThree" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="chartNine" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="height:310px;width:90%;display:flex;margin:30px auto">
            <div id="chartEight" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="chartFour" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="height:310px;width:90%;display:flex;margin:30px auto">
            <div id="chartSeven" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="height:700px;width:90%;margin:100px auto;">
            <div id="chartFive" style="width:80%;height:700px;margin:0 auto"></div>
        </div>
        <div style="height:700px;width:90%;margin:100px auto;">
            <div id="chartSix" style="width:80%;height:700px;margin:0 auto"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: "report-form",
    data() {
        return {
            yearDate: new Date().getFullYear() + "",
            oneYearDate: new Date().getFullYear() + ""
        };
    },
    mounted() {
        this.getChartOne();
        this.getChartTwo();
        this.getChartThree();
        this.getChartFour();
        this.getChartSeven();
        this.getSupplier();
        this.getChartSix();
        this.getBuyOne();
        this.getChartEight();
        this.getChartNine();
    },
    methods: {
        flush() {
            this.yearDate = new Date().getFullYear() + "";
            this.oneYearDate = new Date().getFullYear() + "";
            this.getChartOne();
            this.getChartTwo();
            this.getChartThree();
            this.getChartFour();
            this.getChartSeven();
            this.getSupplier();
            this.getChartSix();
            this.getBuyOne();
            this.getChartEight();
            this.getChartNine();
        },
        getChartOne() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/getAudit`)
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.materialName),
                            valueData.push({
                                name: item.materialName,
                                value: item.totalNum
                            });
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartOne")
                    );
                    let option = this.getOption(
                        "更换料质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getChartTwo() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/getInspect`)
                .then(res => {
                    let nameData = ["合格数", "不合格数"],
                        valueData = [];
                    valueData.push({
                        name: "合格数",
                        value: res.qualifiedNumber
                    });
                    valueData.push({
                        name: "不合格数",
                        value: res.unqualifiedNumber
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartTwo")
                    );
                    let option = this.getOption(
                        "采购质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getChartThree() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/getPressure`)
                .then(res => {
                    let nameData = ["合格数", "不合格数"],
                        valueData = [];
                    if (res) {
                        valueData.push({
                            name: "合格数",
                            value: res.qualifiedNumber
                        });
                        valueData.push({
                            name: "不合格数",
                            value: res.unqualifiedNumber
                        });
                    } else {
                        valueData.push({
                            name: "合格数",
                            value: 0
                        });
                        valueData.push({
                            name: "不合格数",
                            value: 0
                        });
                    }
                    let chart = this.$echarts.init(
                        document.getElementById("chartThree")
                    );
                    let option = this.getOption(
                        "压力质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getChartFour() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/getSpray`)
                .then(res => {
                    let nameData = ["合格数", "不合格数"],
                        valueData = [];
                    valueData.push({
                        name: "合格数",
                        value: res.qualifiedNumber
                    });
                    valueData.push({
                        name: "不合格数",
                        value: res.unqualifiedNumber
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartFour")
                    );
                    let option = this.getOption(
                        "喷涂质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getChartEight() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/getInspectByType?type=1`)
                .then(res => {
                    let nameData = ["合格数", "不合格数"],
                        valueData = [];
                    valueData.push({
                        name: "合格数",
                        value: res.qualifiedNumber
                    });
                    valueData.push({
                        name: "不合格数",
                        value: res.unqualifiedNumber
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartEight")
                    );
                    let option = this.getOption(
                        "机加工质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },

        //质量报表-成品检验质量报表
        getChartNine() {
            let nameArr = [],
                dataArr = [];
            this.$http
                .get(`/haolifa/report/quality/getProduct`)
                .then(res => {
                    let nameData = ["合格数", "不合格数"],
                        valueData = [];
                    valueData.push({
                        name: "合格数",
                        value: res.qualifiedNumber
                    });
                    valueData.push({
                        name: "不合格数",
                        value: res.unqualifiedNumber
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartNine")
                    );
                    let option = this.getOption(
                        "成品检验质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //质量报表-阀门装配不合格原因
        getChartSeven() {
            let nameArr = [],
                dataArr = [],
                oneDepartArr = [];
            this.$http
                .get(`/haolifa/report/quality/assemblingReason`)
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.reason),
                            valueData.push({
                                name: item.reason,
                                value: item.qty
                            });
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartSeven")
                    );
                    let option = this.getOption(
                        "阀门装配质量报表",
                        nameData,
                        valueData
                    );
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getOption(title, nameArr, dataArr) {
            return {
                title: {
                    text: title,
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: nameArr
                },

                series: [
                    {
                        label: {
                            show: false,
                            position: "center"
                        },
                        name: "",
                        type: "pie",
                        radius: "55%",
                        center: ["50%", "60%"],
                        data: dataArr,
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
        },
        getDepart() {
            let that = this;
            this.$http
                .get(`/haolifa/report/expense/classifyByDepartmentAll`)
                .then(res => {
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
                        //params.data.name
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
            this.$http
                .get(
                    `/haolifa/report/expense/getAllClassifyWithDepartment?department=` +
                        name
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
                    let chartDetail = this.$echarts.init(
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
                    chartDetail.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //费用分类
        getType() {
            let that = this;
            this.$http
                .get(`/haolifa/report/expense/getAllClassify`)
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
                        that.getTypeDetail(params.data.name);
                    });
                    chart.setOption(option);
                    this.getTypeDetail(nameData[0]);
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
        //供应商合格率统计
        getSupplier() {
            this.$http
                .get(`/haolifa/report/quality/getInspectBysupplierName`)
                .then(res => {
                    let maxNum = 0,
                        nameData = [],
                        qNumData = [],
                        perData = [],
                        unqNumData = [];
                    res.map(item => {
                        nameData.push(item.supplierName);
                        qNumData.push(item.qualifiedNumber);
                        unqNumData.push(item.unqualifiedNumber);
                        maxNum =
                            maxNum > item.totalNum ? maxNum : item.totalNum;
                        let num = (
                            (item.qualifiedNumber / item.totalNum) *
                            100
                        ).toFixed(2);
                        perData.push(num);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartFive")
                    );
                    let option = {
                        color: ["#3398DB", "#FF6666", "#66CCCC"],
                        title: {
                            text: "供应商产品质量统计图",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "cross",
                                crossStyle: {
                                    color: "#999"
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: { show: true, readOnly: false },
                                magicType: {
                                    show: true,
                                    type: ["line", "bar"]
                                },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        legend: {
                            data: ["合格数", "不合格数", "合格率"]
                        },
                        grid: {
                            left: "18%",
                            bottom: "30%"
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: nameData,
                                axisPointer: {
                                    type: "shadow"
                                },
                                axisLabel: {
                                    rotate: 60
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value",
                                name: "数量",
                                min: 0,
                                max: maxNum + 2000,
                                // interval: 500,
                                axisLabel: {
                                    formatter: "{value} "
                                }
                            },
                            {
                                type: "value",
                                name: "合格率",
                                min: 0,
                                max: 120,
                                // interval: 5,
                                axisLabel: {
                                    formatter: "{value} %"
                                }
                            }
                        ],
                        series: [
                            {
                                name: "合格数",
                                type: "bar",
                                data: qNumData
                            },
                            {
                                name: "不合格数",
                                type: "bar",
                                data: unqNumData
                            },
                            {
                                name: "合格率",
                                type: "line",
                                yAxisIndex: 1,
                                data: perData
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        //供应商合格率统计
        getChartSix() {
            this.$http
                .get(`/haolifa/report/quality/selectInspectByMaterialName`)
                .then(res => {
                    let maxNum = 0,
                        nameData = [],
                        qNumData = [],
                        perData = [],
                        unqNumData = [];
                    res.map(item => {
                        nameData.push(item.materialGraphName);
                        qNumData.push(item.qualifiedNumber);
                        unqNumData.push(item.unqualifiedNumber);
                        maxNum =
                            maxNum > item.totalNum ? maxNum : item.totalNum;
                        let num = (
                            (item.qualifiedNumber / item.totalNum) *
                            100
                        ).toFixed(2);
                        perData.push(num);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("chartSix")
                    );
                    let option = {
                        color: ["#3398DB", "#FF6666", "#66CCCC"],
                        title: {
                            text: "产品类型质量统计图",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "cross",
                                crossStyle: {
                                    color: "#999"
                                }
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: { show: true, readOnly: false },
                                magicType: {
                                    show: true,
                                    type: ["line", "bar"]
                                },
                                restore: { show: true },
                                saveAsImage: { show: true }
                            }
                        },
                        legend: {
                            data: ["合格数", "不合格数", "合格率"]
                        },
                        grid: {
                            left: "18%",
                            bottom: "30%"
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: nameData,
                                axisPointer: {
                                    type: "shadow"
                                },
                                axisLabel: {
                                    rotate: 60
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value",
                                name: "数量",
                                min: 0,
                                max: maxNum + 2000,
                                // interval: 500,
                                axisLabel: {
                                    formatter: "{value} "
                                }
                            },
                            {
                                type: "value",
                                name: "合格率",
                                min: 0,
                                max: 120,
                                // interval: 5,
                                axisLabel: {
                                    formatter: "{value} %"
                                }
                            }
                        ],
                        series: [
                            {
                                name: "合格数",
                                type: "bar",
                                data: qNumData
                            },
                            {
                                name: "不合格数",
                                type: "bar",
                                data: unqNumData
                            },
                            {
                                name: "合格率",
                                type: "line",
                                yAxisIndex: 1,
                                data: perData
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        //质量统计总图
        getBuyOne() {
            this.$http
                .get(
                    `/haolifa/report/quality/getAllQuality?year=${
                        this.oneYearDate
                    }`
                )
                .then(res => {
                    let xData = [],
                        purchasePass = [],
                        inspectPass = [],
                        sprayPass = [],
                        proInspectPass = [];
                    res.map(item => {
                        xData.push(item.createTime);
                        if (item.purchasePass) {
                            purchasePass.push(
                                item.purchasePass.qualifiedNumber
                                    ? Math.round(
                                          (item.purchasePass.qualifiedNumber /
                                              item.purchasePass.totalNum) *
                                              10000
                                      ) / 100
                                    : 0
                            );
                        } else {
                            purchasePass.push(0);
                        }
                        if (item.inspectPass) {
                            inspectPass.push(
                                item.inspectPass.qualifiedNumber
                                    ? Math.round(
                                          (item.inspectPass.qualifiedNumber /
                                              item.inspectPass.totalNum) *
                                              10000
                                      ) / 100
                                    : 0
                            );
                        } else {
                            purchasePass.push(0);
                        }
                        if (item.sprayPass) {
                            sprayPass.push(
                                item.sprayPass.qualifiedNumber
                                    ? Math.round(
                                          (item.sprayPass.qualifiedNumber /
                                              item.sprayPass.totalNum) *
                                              10000
                                      ) / 100
                                    : 0
                            );
                        } else {
                            purchasePass.push(0);
                        }
                        if (item.proInspectPass) {
                            proInspectPass.push(
                                item.proInspectPass.qualifiedNumber
                                    ? Math.round(
                                          (item.proInspectPass.qualifiedNumber /
                                              item.proInspectPass.totalNum) *
                                              10000
                                      ) / 100
                                    : 0
                            );
                        } else {
                            purchasePass.push(0);
                        }
                    });
                    let that = this;
                    let chart = this.$echarts.init(
                        document.getElementById("buyOnee")
                    );
                    const option = {
                        title: {
                            text: "质量合格率统计总图（百分比）",
                            x: "left"
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                // 坐标轴指示器，坐标轴触发有效
                                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: [
                                "零件采购合格率",
                                "零件加工合格率",
                                "喷涂加工合格率",
                                "阀门装配合格率"
                            ]
                        },
                        grid: {
                            left: "3%",
                            right: "4%",
                            bottom: "10%",
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: xData
                                // axisLabel: {
                                //     rotate: 60
                                // }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value",
                                min: 30
                            }
                        ],
                        series: [
                            {
                                name: "零件采购合格率",
                                type: "bar",
                                barWidth: "10%",
                                data: purchasePass
                            },
                            {
                                name: "零件加工合格率",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: inspectPass
                            },
                            {
                                name: "喷涂加工合格率",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: sprayPass
                            },
                            {
                                name: "阀门装配合格率",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: proInspectPass
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        }
    }
};
</script>
