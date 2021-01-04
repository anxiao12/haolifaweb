<template>
    <div class="page-notification">
        <div class="flex-v-center tool-bar">销售报表统计图</div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:12px">
            <el-date-picker v-model="oneYearDate" :clearable="false" @change="oneYearChange" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="width:98%;margin:0 auto;display:flex">
            <!-- <el-date-picker v-model="yearDate" :clearable="false" @change="getYearTotal" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker> -->
            <div style="display: flex;padding-left: 20px; margin-left: 12px;color:#008eff;font-size:22px;">
                <p>生产总数量：{{totalNum}}台</p>
                <p style="margin-left:20px;">产值总额：{{totalPrice}}元</p>
                <p style="margin-left:20px;">合同订货总数量：{{contractTotalNum}}台</p>
                <p style="margin-left:20px;">当年累计订货额：{{contractTotalPrice}}元</p>
            </div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="fiveYearDate" :clearable="false" @change="getSaleFive" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
            <p style="color:#008eff">当年累计订货额:{{saleFiveNum}}元</p>
            <el-date-picker
                v-model="fiveYear2Date"
                :clearable="false"
                @change="getSale2Five"
                style="left:20%"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择年月"
            ></el-date-picker>
            <p style="position: relative;left:23%;color:#008eff">当月累计订货额:{{saleFive2Num}}元</p>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleFive" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="sale2Five" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="sixYearDate" :clearable="false" @change="getSaleSix" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
            <p style="color:#008eff">当年累计回款总额:{{salSixNum}}元</p>
            <el-date-picker
                v-model="sixYear2Date"
                :clearable="false"
                style="left:20%"
                @change="getSale2Six"
                value-format="yyyy-MM"
                type="month"
                placeholder="选择年月"
            ></el-date-picker>
            <p style="position: relative;left:23%;color:#008eff">当月累计回款总额:{{salSix2Num}}元</p>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleSix" style="width:50%;height:300px;margin-top:20px;"></div>
            <div id="sale2Six" style="width:50%;height:300px;margin-top:20px;"></div>
        </div>

        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="sevenYearDate" :clearable="false" @change="getBuyOne" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <div id="saleSeven" style="width:90%;height:800px;margin-top:20px;"></div>
        </div>

        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="yearDate" :clearable="false" @change="getYearTotal" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:0 auto;">
            <div id="saleOne" style="width:80%;height:500px;margin:0 auto"></div>
        </div>
        <!-- <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="cYearDate" :clearable="false" @change="getCYearTotal" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:0 auto;">
            <div id="saleThree" style="width:80%;height:500px;margin:0 auto"></div>
        </div>-->
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <el-date-picker v-model="twoYear" :clearable="false" @change="getSaleTwo" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:0 auto;">
            <div id="saleTwo" style="width:80%;height:500px;margin:0 auto"></div>
        </div>
        <!-- <div style="height:500px;width:90%;margin:0 auto;">
            <div id="saleFour" style="width:80%;height:500px;margin:0 auto"></div>
        </div>-->
    </div>
</template>
<script>
export default {
    name: "xsreport-form",
    data() {
        return {
            chartOneList: [],
            yearDate: new Date().getFullYear() + "",
            oneYearDate: new Date().getFullYear() + "",
            cYearDate: new Date().getFullYear() + "",
            fiveYearDate: new Date().getFullYear() + "",
            sixYearDate: new Date().getFullYear() + "",
            twoYear: new Date().getFullYear() + "",
            sevenYearDate: new Date().getFullYear() + "",
            fiveYear2Date:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            sixYear2Date:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            totalNum: "",
            totalPrice: "",
            contractTotalNum: "",
            contractTotalPrice: "",
            saleFiveNum: 0,
            saleFive2Num: 0,
            salSixNum: 0,
            salSix2Num: 0
        };
    },
    created() {
        this.getTotal();
        this.getSaleFive();
        this.getSale2Five();
        this.getSaleSix();
        this.getSale2Six();
        this.getContractTotal();
        this.getSaleTwo(this.twoYear);
        // this.getSaleFour();
        this.getSaleOne(this.yearDate);
        // this.getCSaleOne(this.cYearDate);
        this.getBuyOne();
    },
    methods: {
        oneYearChange() {
            this.getTotal();
            this.getContractTotal();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getTotal() {
            this.$http
                .get(`/haolifa/report/sale/getSaleAll?year=${this.oneYearDate}`)
                .then(res => {
                    this.totalNum = res[0].totalNum;
                    this.totalPrice = res[0].totalPrice;
                });
        },
        //需方总额饼图
        getSaleFive() {
            this.saleFiveNum = 0;
            this.$http
                .get(
                    `/haolifa/report/sale/selectContractByDemandName?year=${this.fiveYearDate}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.demandName);
                        valueData.push({
                            name: item.demandName,
                            value: item.totalPrice
                        });
                        this.saleFiveNum = this.saleFiveNum + +item.totalPrice;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleFive")
                    );
                    let option = {
                        title: {
                            text: "年度订货总额分类统计图",
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
                                label: {
                                    show: false,
                                    position: "center"
                                },
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
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getSale2Five() {
            let arr = this.fiveYear2Date.split("-");
            console.log(this.fiveYear2Date, arr);
            let year = arr[0],
                month = arr[1];
            this.saleFive2Num = 0;
            this.$http
                .get(
                    `/haolifa/report/sale/selectContractByDemandName?year=${year}&month=${month}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.demandName);
                        valueData.push({
                            name: item.demandName,
                            value: item.totalPrice
                        });
                        this.saleFive2Num =
                            this.saleFive2Num + +item.totalPrice;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("sale2Five")
                    );
                    let option = {
                        title: {
                            text: "月份客户订货额统计图",
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
                                label: {
                                    show: false,
                                    position: "center"
                                },
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
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //需方回款总额饼图
        getSaleSix() {
            this.salSixNum = 0;
            this.$http
                .get(
                    `/haolifa/report/sale/selectshouhuiContractByDemandName?year=${this.sixYearDate}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.demandName);
                        valueData.push({
                            name: item.demandName,
                            value: item.totalPrice
                        });
                        this.salSixNum = this.salSixNum + +item.totalPrice;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleSix")
                    );
                    let option = {
                        title: {
                            text: "年度回款总额分类统计图",
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
                                label: {
                                    show: false,
                                    position: "center"
                                },
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
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getSale2Six() {
            this.salSix2Num = 0;
            let arr = this.sixYear2Date.split("-");
            let year = arr[0],
                month = arr[1];
            this.$http
                .get(
                    `/haolifa/report/sale/selectshouhuiContractByDemandName?year=${year}&month=${month}`
                )
                .then(res => {
                    let nameData = [],
                        valueData = [];
                    res.map(item => {
                        nameData.push(item.demandName);
                        valueData.push({
                            name: item.demandName,
                            value: item.totalPrice
                        });
                        this.salSix2Num = this.salSix2Num + +item.totalPrice;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("sale2Six")
                    );
                    let option = {
                        title: {
                            text: "月份回款额统计图",
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
                                label: {
                                    show: false,
                                    position: "center"
                                },
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
                    chart.setOption(option);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getContractTotal() {
            this.$http
                .get(
                    `/haolifa/report/sale/getSaleAllContract?year=${this.oneYearDate}`
                )
                .then(res => {
                    this.contractTotalNum = res[0].totalNum;
                    this.contractTotalPrice = res[0].totalPrice;
                });
        },
        getYearTotal() {
            this.getSaleOne(this.yearDate);
        },
        getCYearTotal() {
            this.getCSaleOne(this.cYearDate);
        },
        getSaleOne(date) {
            this.$http
                .get("/haolifa/report/sale/getSaleAllByMonth?year=" + date)
                .then(res => {
                    let xData = [],
                        yData = [];
                    Object.keys(res).forEach(key => {
                        xData.push(key + "月");
                        yData.push(res[key]);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleOne")
                    );
                    let option = {
                        color: ["#3398DB"],
                        title: {
                            text: date + "年每月产值总额统计",
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
                                name: "产值额",
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        //每月合同销售统计
        getCSaleOne(date) {
            this.$http
                .get(
                    "/haolifa/report/sale/getSaleAllByMonthContract?year=" +
                        date
                )
                .then(res => {
                    let xData = [],
                        yData = [];
                    Object.keys(res).forEach(key => {
                        xData.push(key + "月");
                        yData.push(res[key][0].totalPrice);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleThree")
                    );
                    let option = {
                        color: ["#3398DB"],
                        title: {
                            text: date + "年每月合同总额统计",
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
                                name: "合同额",
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        // 销售报表-根据产品型号统计生产金额
        getSaleTwo(date) {
            this.$http
                .get(`/haolifa/report/sale/getSaleByModel?year=${date}`)
                .then(res => {
                    let xData = [],
                        yData = [];
                    res.map(item => {
                        xData.push(item.productModel);
                        yData.push(item.totalPrice);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleTwo")
                    );
                    let option = {
                        color: ["#3398DB"],
                        title: {
                            text: "产品型号产值总额统计",
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
                                name: "生产金额",
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        // 销售报表-根据产品型号统计合同金额
        getSaleFour() {
            this.$http
                .get("/haolifa/report/sale/getSaleByModelContract")
                .then(res => {
                    let xData = [],
                        yData = [];
                    res.map(item => {
                        xData.push(item.productModel);
                        yData.push(item.totalPrice);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleFour")
                    );
                    let option = {
                        color: ["#3398DB"],
                        title: {
                            text: "产品型号合同金额统计",
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
                                name: "合同金额",
                                barWidth: "30%",
                                data: yData,
                                type: "bar"
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        getBuyOne() {
            this.$http
                .get(
                    `/haolifa/report/sale/selectAllAmountByDemandName?year=${this.sevenYearDate}`
                )
                .then(res => {
                    let xData = [],
                        payTotal = [],
                        unpay = [],
                        total = [],
                        registered = [];
                    res.map(item => {
                        xData.push(item.demandName);
                        payTotal.push(item.saleAmount);
                        unpay.push(item.invoiceAmount);
                        total.push(item.deliveryAmount);
                        registered.push(item.refundAmount);
                    });
                    let that = this;
                    let chart = this.$echarts.init(
                        document.getElementById("saleSeven")
                    );
                    const option = {
                        title: {
                            text: "销售报表-按需方统计",
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
                                "订货总金额",
                                "开票总金额",
                                "发货总金额",
                                "回款总金额"
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
                                data: xData,
                                axisLabel: {
                                    rotate: 60
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value"
                            }
                        ],
                        series: [
                            {
                                name: "订货总金额",
                                type: "bar",
                                barWidth: "10%",
                                data: payTotal
                            },
                            {
                                name: "开票总金额",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: unpay
                            },
                            {
                                name: "发货总金额",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: total
                            },
                            {
                                name: "回款总金额",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: registered
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        }
    }
};
</script>
