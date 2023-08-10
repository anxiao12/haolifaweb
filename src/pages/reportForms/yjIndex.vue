<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">业绩指标统计图</div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="oneYearDate" size="mini" :clearable="false" type="year" style="margin-top:50px"
                value-format="yyyy" @change="getBuyOne" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="yjOne" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="twoYearDate" size="mini" :clearable="false" type="year" style="margin-top:50px"
                value-format="yyyy" @change="getBuyTwo" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="yjTwo" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="threeYearDate" size="mini" :clearable="false" type="year" style="margin-top:50px"
                value-format="yyyy" @change="getBuyThree" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="yjThree" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker v-model="fourYearDate" size="mini" :clearable="false" type="year" style="margin-top:50px"
                value-format="yyyy" @change="getBuyFour" :editable="false" placeholder="选择年月"></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="yjFour" style="width:100%;height:600px;margin:0 auto"></div>
        </div>





    </div>
</template>
<script>
import DataList from "@/components/datalist";
export default {
    name: "cgreport-form",
    components: { DataList },
    data() {
        return {

            oneYearDate: new Date().getFullYear() + "",
            twoYearDate: new Date().getFullYear() + "",
            threeYearDate: new Date().getFullYear() + "",
            fourYearDate: new Date().getFullYear() + "",

        };
    },
    mounted() {
        this.getBuyOne();
        this.getBuyTwo();
        this.getBuyThree();
        this.getBuyFour();

    },
    methods: {
        flush() {

            this.oneYearDate = new Date().getFullYear() + "";
            this.twoYearDate = new Date().getFullYear() + "";
            this.threeYearDate = new Date().getFullYear() + "";
            this.fourYearDate = new Date().getFullYear() + "";
            this.getBuyOne();
            this.getBuyTwo();
            this.getBuyThree();
            this.getBuyFour();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },


        //零件不合格按年统计
        getBuyOne() {

            this.$http
                .get(`/haolifa/report/quality/getReplaceMaterialReport?year=${this.oneYearDate}`)
                .then(res => {

                    let xData = [],
                        lfData = [],
                        gfData = [];


                    res.map(item => {
                        xData.push(item.createTime);
                        lfData.push(item.lfNumber)
                        gfData.push(item.gfNumber)

                    });

                    let chart = this.$echarts.init(
                        document.getElementById("yjOne")
                    );
                    const option = {
                        title: {
                            text: "零件不合格类别统计",
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
                                "料废",
                                "工废",

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
                                    rotate: 30
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
                                name: "料废",
                                type: "bar",
                                barWidth: "10%",
                                data: lfData
                            },
                            {
                                name: "工废",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: gfData
                            }

                        ]
                    };

                    chart.setOption(option);

                });
        },
        //发货及时率按年统计
        getBuyTwo() {

            this.$http
                .get(`/haolifa/report/quality/deliveryTimeliness?year=${this.twoYearDate}`)
                .then(res => {

                    let xData = [],
                        lfData = [],
                        gfData = [];


                    res.map(item => {
                        xData.push(item.time);
                        lfData.push(item.rate)


                    });

                    let chart = this.$echarts.init(
                        document.getElementById("yjTwo")
                    );
                    const option = {
                        title: {
                            text: "发货及时率统计",
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
                                "发货及时率",


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
                                    rotate: 30
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
                                name: "发货及时率",
                                type: "bar",
                                barWidth: "10%",
                                data: lfData
                            }


                        ]
                    };

                    chart.setOption(option);

                });
        },
        //采购到货及时率统计
        getBuyThree() {
            this.$http
                .get(`/haolifa/report/quality/procurementTimeliness?year=${this.twoYearDate}`)
                .then(res => {

                    let xData = [],
                        lfData = [],
                        gfData = [];


                    res.map(item => {
                        xData.push(item.time);
                        lfData.push(item.rate)


                    });

                    let chart = this.$echarts.init(
                        document.getElementById("yjThree")
                    );
                    const option = {
                        title: {
                            text: "采购到货及时率统计",
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
                                "采购到货及时率",


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
                                    rotate: 30
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
                                name: "采购到货及时率",
                                type: "bar",
                                barWidth: "10%",
                                data: lfData
                            }


                        ]
                    };

                    chart.setOption(option);

                });
        },
        //生产计划完成率统计
        getBuyFour() {
            this.$http
                .get(`/haolifa/report/quality/productionPlanCompletion?year=${this.twoYearDate}`)
                .then(res => {

                    let xData = [],
                        lfData = [],
                        gfData = [];


                    res.map(item => {
                        xData.push(item.time);
                        lfData.push(item.rate)


                    });

                    let chart = this.$echarts.init(
                        document.getElementById("yjFour")
                    );
                    const option = {
                        title: {
                            text: "生产计划完成率统计",
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
                                "生产计划完成率",


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
                                    rotate: 30
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
                                name: "生产计划完成率",
                                type: "bar",
                                barWidth: "10%",
                                data: lfData
                            }


                        ]
                    };

                    chart.setOption(option);

                });
        },

    }
};
</script>
