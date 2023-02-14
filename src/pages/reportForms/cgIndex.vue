<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">采购报表统计图</div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker
                size="mini"
                v-model="yearDate"
                :clearable="false"
                type="month"
                value-format="yyyy-MM"
                @change="getBuyOne"
                :editable="false"
                placeholder="选择年月"
            ></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker
                size="mini"
                v-model="yearDate2"
                :clearable="false"
                type="month"
                value-format="yyyy-MM"
                @change="getBuyOne"
                :editable="false"
                placeholder="选择年月"
            ></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDetail()">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">累计采购合同总金额:{{Math.round(totalNum * 100)/100}}元</span>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">累计挂账总金额:{{Math.round(registeredNum* 100)/100}}元</span>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">累计未付款总金额:{{Math.round(unpayNum* 100)/100}}元</span>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">累计已付款总金额:{{Math.round(payTotalNum* 100)/100}}元</span>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="buyOne" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:90%;margin:20px auto;display:flex;padding-left:9%">
            <p style="margin-left:20px;color:#008eff;font-size:20px;">合计合同金额:{{Math.round(ctotalNum * 100)/100}}元</p>
            <p style="margin-left:20px;color:#008eff;font-size:20px;">合计挂账金额:{{Math.round(cregisteredNum* 100)/100}}元</p>
            <p style="margin-left:20px;color:#008eff;font-size:20px;">合计未付款金额:{{Math.round(cunpayNum* 100)/100}}元</p>
            <p style="margin-left:20px;color:#008eff;font-size:20px;">合计已付款金额:{{Math.round(cpayTotalNum* 100)/100}}元</p>
        </div>
        <div style="height:500px;width:90%;margin:30px auto;">
            <div id="buyTwo" style="width:100%;height:500px;margin:0 auto"></div>
        </div>

        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker
                v-model="yearMonthDate"
                size="mini"
                :clearable="false"
                type="month"
                value-format="yyyy-MM"
                @change="getByMonth"
                :editable="false"
                placeholder="选择年月"
            ></el-date-picker>
        </div>
        <div style="width:98%;margin:0 auto;display:flex">
            <div style="display: flex;padding-left: 20px; margin-left: 12px;color:#008eff;font-size:22px;">
                <p style="margin-left:20px;color:#008eff;font-size:20px;">累计采购合同总金额:{{Math.round(mtotalNum * 100)/100}}元</p>
                <p style="margin-left:20px;color:#008eff;font-size:20px;">累计挂账总金额:{{Math.round(mregisteredNum* 100)/100}}元</p>
                <p style="margin-left:20px;color:#008eff;font-size:20px;">累计未付款总金额:{{Math.round(munpayNum* 100)/100}}元</p>
                <p style="margin-left:20px;color:#008eff;font-size:20px;">累计已付款总金额:{{Math.round(mpayTotalNum* 100)/100}}元</p>
            </div>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="byMonth" style="width:100%;height:600px;margin:0 auto"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker
                v-model="threeYearDate"
                size="mini"
                :clearable="false"
                type="year"
                style="margin-top:50px"
                value-format="yyyy"
                @change="getBuyThree"
                :editable="false"
                placeholder="选择年月"
            ></el-date-picker>
        </div>
        <div style="height:500px;width:90%;margin:20px auto;">
            <div id="buyThree" style="width:100%;height:600px;margin:0 auto"></div>
        </div>

        <layer v-if="flag" title="数据列表" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    供应商名称:
                    <input
                        type="text"
                        class="flex-item"
                        v-model="form.supplierName"
                        placeholder
                        style="width: 150px;"
                        @change="$refs.list.update(true);getFourTj()"
                    />
                    合同编号:
                    <input
                        type="text"
                        class="flex-item"
                        v-model="form.purchaseOrderNo"
                        placeholder
                        style="width: 150px;"
                        @change="$refs.list.update(true);getFourTj()"
                    />
                    <el-button type="primary" size="mini" @click="$refs.list.update(true);getFourTj()">查询</el-button>
                </div>
            </div>
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">合同金额: {{formObj.total}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">入账金额: {{formObj.registered}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">付款金额: {{formObj.payTotal}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">欠款金额: {{formObj.unpay}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">回票金额: {{formObj.returnTicketAmount}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:13px;">上账未开票: {{formObj.unTicketAmount}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="list" :page-size="50" :param="form" url="/haolifa/report-extend/report-purchase-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>供应商名称</th>
                        <!-- <th>月份</th> -->
                        <th>日期</th>
                        <th>合同编号</th>
                        <th>数量</th>
                        <th>合同金额（元）</th>
                        <th>入账金额（元）</th>
                        <th>付款日期</th>
                        <th>付款金额（元）</th>
                        <th>欠款金额（元）</th>
                        <th>回票金额（元）</th>
                        <th>回票票号</th>
                        <th>上账未开票（元）</th>
                    </tr>
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.supplierName}}</td>
                        <!-- <td>{{item.createTime}}</td> -->
                        <td>{{item.createTime}}</td>
                        <td>{{item.purchaseOrderNo}}</td>
                        <td>{{item.totalCount}}</td>
                        <td>{{item.total}}</td>
                        <td>{{item.registered}}</td>
                        <td></td>
                        <td>{{item.payTotal}}</td>
                        <td>{{item.unpay}}</td>
                        <td>{{item.returnTicketAmount}}</td>
                        <td></td>
                        <td>{{item.unTicketAmount}}</td>
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="flag=false">关闭</btn>
            </div>
        </layer>
    </div>
</template>
<script>
import DataList from "@/components/datalist";
export default {
    name: "cgreport-form",
    components: { DataList },
    data() {
        return {
            yearDate: new Date().getFullYear() + "-01",
            yearDate2:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            threeYearDate: new Date().getFullYear() + "",
            yearMonthDate:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            totalNum: 0,
            totalPrice: 0,
            payTotalNum: 0,
            unpayNum: 0,
            totalNum: 0,
            registeredNum: 0,
            mpayTotalNum: 0,
            munpayNum: 0,
            mtotalNum: 0,
            mregisteredNum: 0,
            cpayTotalNum: 0,
            cunpayNum: 0,
            ctotalNum: 0,
            cregisteredNum: 0,
            flag: false,
            form: {
                endDate: this.yearDate2,
                purchaseOrderNo: "",
                startDate: this.yearDate,
                status: "",
                supplierName: "",
                year: ""
            },
            formObj: {
                total: 0,
                payTotal: 0,
                unpay: 0,
                registered: 0,
                collected: 0,
                unTicketAmount: 0,
                returnTicketAmount: 0
            }
        };
    },
    mounted() {
        this.getBuyOne();
        this.getBuyThree();
        this.getByMonth();
    },
    methods: {
        flush() {
            this.yearDate = new Date().getFullYear() + "-01";
            this.yearDate2 =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.threeYearDate = new Date().getFullYear() + "";
            this.yearMonthDate =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.getBuyOne();
            this.getBuyThree();
            this.getByMonth();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getDetail() {
            this.flag = true;
            this.getFourTj();
            this.$refs.list.update(true);
        },
        getFourTj() {
            this.formObj = {
                total: 0,
                payTotal: 0,
                unpay: 0,
                registered: 0,
                collected: 0,
                unTicketAmount: 0,
                returnTicketAmount: 0
            };
            this.$http
                .post(
                    `/haolifa/report-extend/report-purchase-summary`,
                    this.form
                )
                .then(res => {
                    this.formObj.total = res.total;
                    this.formObj.payTotal = res.payTotal;
                    this.formObj.registered = res.registered;
                    this.formObj.unpay = res.unpay;
                    this.formObj.collected = res.collected;
                    this.formObj.unTicketAmount = res.unTicketAmount;
                    this.formObj.returnTicketAmount = res.returnTicketAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        //采购按年统计
        getBuyOne() {
            this.payTotalNum = this.unpayNum = this.registeredNum = this.totalNum = 0;
            this.$http
                .post(`/haolifa/report/purchase/getPurchases`, {
                    endDate: this.yearDate2,
                    month: "",
                    startDate: this.yearDate,
                    supplierName: "",
                    year: ""
                })
                .then(res => {
                    let xData = [],
                        payTotal = [],
                        unpay = [],
                        total = [],
                        registered = [],
                        returnTicketAmount = [],
                        unTicketAmount = [];

                    res.map(item => {
                        xData.push(item.supplierName);
                        payTotal.push(item.payTotal);
                        unpay.push(item.unpay);
                        total.push(item.total);
                        registered.push(item.registered);
                        returnTicketAmount.push(item.returnTicketAmount);
                        unTicketAmount.push(item.unTicketAmount);

                        if (item.payTotal)
                            this.payTotalNum =
                                this.payTotalNum + +item.payTotal;
                        this.unpayNum =
                            this.unpayNum + (item.unpay ? +item.unpay : 0);
                        this.totalNum =
                            this.totalNum + (item.total ? +item.total : 0);
                        this.registeredNum =
                            this.registeredNum +
                            (item.registered ? +item.registered : 0);
                    });
                    this.getBuyTwo(xData[0]);
                    let that = this;
                    let chart = this.$echarts.init(
                        document.getElementById("buyOne")
                    );
                    const option = {
                        title: {
                            text: "采购按年份统计",
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
                                "已付款",
                                "未付款",
                                "挂账金额",
                                "合同金额",
                                "累计回票金额",
                                "上账未开票金额"
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
                                name: "已付款",
                                type: "bar",
                                barWidth: "10%",
                                data: payTotal
                            },
                            {
                                name: "未付款",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: unpay
                            },
                            {
                                name: "挂账金额",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: registered
                            },
                            {
                                name: "合同金额",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: total
                            },
                            {
                                name: "累计回票金额",
                                type: "bar",
                                color: "#ffd702",
                                barWidth: "10%",
                                data: returnTicketAmount
                            },
                            {
                                name: "上账未开票金额",
                                type: "bar",
                                color: "#eb736a",
                                barWidth: "10%",
                                data: unTicketAmount
                            }
                        ]
                    };
                    chart.on("click", function(params) {
                        that.getBuyTwo(params.name);
                    });
                    chart.setOption(option);
                    that.getBuyTwo(xData[0]);
                });
        },
        //采购根据公司按月
        getBuyTwo(name) {
            this.cunpayNum = this.cregisteredNum = this.ctotalNum = this.cpayTotalNum = 0;

            this.$http
                .post(`/haolifa/report/purchase/selectBySupplierName`, {
                    endDate: this.yearDate2,
                    month: "",
                    startDate: this.yearDate,
                    supplierName: name,
                    year: ""
                })
                .then(res => {
                    let xData = [],
                        payTotal = [],
                        total = [],
                        registered = [],
                        unpay = [],
                        returnTicketAmount = [],
                        unTicketAmount = [];
                    res.map(item => {
                        xData.push(item.createTime);
                        payTotal.push(item.payTotal);
                        unpay.push(item.unpay);
                        total.push(item.total);
                        registered.push(item.registered);
                        returnTicketAmount.push(item.returnTicketAmount);
                        unTicketAmount.push(item.unTicketAmount);
                        if (item.payTotal)
                            this.cpayTotalNum =
                                this.cpayTotalNum + +item.payTotal;
                        this.cunpayNum =
                            this.cunpayNum + (item.unpay ? +item.unpay : 0);
                        this.ctotalNum =
                            this.ctotalNum + (item.total ? +item.total : 0);
                        this.cregisteredNum =
                            this.cregisteredNum +
                            (item.registered ? +item.registered : 0);
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("buyTwo")
                    );
                    const option = {
                        title: {
                            text: name + "按月统计",
                            x: "left"
                        },
                        legend: {
                            data: [
                                "已付款",
                                "未付款",
                                "挂账金额",
                                "合同金额",
                                "累计回票金额",
                                "上账未开票金额"
                            ]
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                // 坐标轴指示器，坐标轴触发有效
                                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: "3%",
                            right: "4%",
                            bottom: "3%",
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: xData
                            }
                        ],
                        yAxis: [
                            {
                                type: "value"
                            }
                        ],
                        series: [
                            {
                                name: "已付款",
                                type: "bar",
                                barWidth: "10%",
                                data: payTotal
                            },
                            {
                                name: "未付款",
                                type: "bar",
                                barWidth: "10%",
                                color: "#3398DB",
                                data: unpay
                            },
                            {
                                name: "挂账金额",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: registered
                            },
                            {
                                name: "合同金额",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: total
                            },
                            {
                                name: "累计回票金额",
                                type: "bar",
                                color: "#ffd702",
                                barWidth: "10%",
                                data: returnTicketAmount
                            },
                            {
                                name: "上账未开票金额",
                                type: "bar",
                                color: "#eb736a",
                                barWidth: "10%",
                                data: unTicketAmount
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        //采购按月统计
        getByMonth() {
            this.mpayTotalNum = this.munpayNum = this.mregisteredNum = this.mtotalNum = 0;
            let arr = this.yearMonthDate.split("-");
            let year = arr[0],
                month = arr[1];
            this.$http
                .post(
                    `/haolifa/report/purchase/getPurchases?year=${year}&month=${month}`,
                    {
                        endDate: "",
                        month: month,
                        startDate: "",
                        supplierName: "",
                        year: year
                    }
                )
                .then(res => {
                    let xData = [],
                        payTotal = [],
                        unpay = [],
                        total = [],
                        registered = [];
                    res.map(item => {
                        xData.push(item.supplierName);
                        payTotal.push(item.payTotal);
                        unpay.push(item.unpay);
                        total.push(item.total);
                        registered.push(item.registered);

                        if (item.payTotal)
                            this.mpayTotalNum =
                                this.mpayTotalNum + +item.payTotal;
                        this.munpayNum =
                            this.munpayNum + (item.unpay ? +item.unpay : 0);
                        this.mtotalNum =
                            this.mtotalNum + (item.total ? +item.total : 0);
                        this.mregisteredNum =
                            this.mregisteredNum +
                            (item.registered ? +item.registered : 0);
                    });
                    // this.getBuyTwo(xData[0]);
                    let that = this;
                    let chart = this.$echarts.init(
                        document.getElementById("byMonth")
                    );
                    const option = {
                        title: {
                            text: "采购按月份统计",
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
                            data: ["已付款", "未付款", "挂账金额", "合同金额"]
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
                                name: "已付款",
                                type: "bar",
                                barWidth: "10%",
                                data: payTotal
                            },
                            {
                                name: "未付款",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: unpay
                            },
                            {
                                name: "挂账金额",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: registered
                            },
                            {
                                name: "合同金额",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: total
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        },
        //采购报表--按月查询采购物资
        getBuyThree() {
            this.$http
                .get(
                    `/haolifa/report/purchase/getAllPurchase?year=${this.threeYearDate}`
                )
                .then(res => {
                    let xData = [],
                        payTotal = [],
                        unpay = [],
                        total = [],
                        registered = [];
                    res.map(item => {
                        xData.push(item.createTime);
                        payTotal.push(item.payTotal);
                        unpay.push(item.collected);
                        total.push(item.total);
                        registered.push(item.registered);
                    });
                    // this.getBuyTwo(xData[0]);
                    let that = this;
                    let chart = this.$echarts.init(
                        document.getElementById("buyThree")
                    );
                    const option = {
                        title: {
                            text: "采购报表--按月查询采购物资",
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
                                "付款金额",
                                "回票金额",
                                "挂账金额",
                                "合同金额"
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
                                name: "付款金额",
                                type: "bar",
                                barWidth: "10%",
                                data: payTotal
                            },
                            {
                                name: "回票金额",
                                type: "bar",
                                color: "#3398DB",
                                barWidth: "10%",
                                data: unpay
                            },
                            {
                                name: "挂账金额",
                                type: "bar",
                                color: "#e6a23c",
                                barWidth: "10%",
                                data: registered
                            },
                            {
                                name: "合同金额",
                                type: "bar",
                                color: "#67c23a",
                                barWidth: "10%",
                                data: total
                            }
                        ]
                    };
                    chart.setOption(option);
                });
        }
    }
};
</script>
