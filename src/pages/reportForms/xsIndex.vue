<template>
    <div class="page-notification">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">销售报表统计图</div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:12px">
            <el-date-picker size="mini" v-model="oneYearDate" :clearable="false" @change="oneYearChange" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="width:98%;margin:0 auto;display:flex">
            <div style="display: flex;padding-left: 20px; margin-left: 12px;color:#008eff;font-size:22px;">
                <p>生产总数量：{{totalNum}}台</p>
                <p style="margin-left:20px;font-size:20px;">产值总额：{{totalPrice.toFixed(2)}}元</p>
                <p style="margin-left:20px;font-size:20px;">合同订货总数量：{{contractTotalNum}}台</p>
                <p style="margin-left:20px;font-size:20px;">当年累计订货额：{{contractTotalPrice.toFixed(2)}}元</p>
            </div>
        </div>
        <div style="width:98%;margin-left:20px;display:flex;padding-left:12px">
            <el-date-picker size="mini" v-model="fiveYearDate" :clearable="false" @change="getSaleFive" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">当年累计订货额:{{saleFiveNum.toFixed(2)}}元</span>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDataOne(1)">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleFive" style="width:100%;height:500px;margin-top:20px;"></div>
        </div>
        <div style="width:98%;margin-left:20px;display:flex;padding-left:1%">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker size="mini" v-model="fiveYear2Date" :clearable="false" type="month" value-format="yyyy-MM" @change="getSale2Five" :editable="false" placeholder="选择年月"></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker size="mini" v-model="fiveYear2Date2" :clearable="false" @change="getSale2Five" value-format="yyyy-MM" type="month" placeholder="选择年月"></el-date-picker>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">当月累计订货额:{{saleFive2Num.toFixed(2)}}元</span>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getDataOne(2)">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="sale2Five" style="width:100%;height:500px;margin-top:20px;"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker size="mini" v-model="sixYearDate" :clearable="false" @change="getSaleSix" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">当年累计回款总额:{{salSixNum.toFixed(2)}}元</span>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getBackDetail(1)">数据显示</el-button>
        </div>

        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleSix" style="width:100%;height:500px;margin-top:20px;"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker size="mini" v-model="sixYear2Date" :clearable="false" type="month" value-format="yyyy-MM" @change="getSale2Six" :editable="false" placeholder="选择年月"></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker size="mini" v-model="sixYear2Date2" :clearable="false" type="month" value-format="yyyy-MM" @change="getSale2Six" :editable="false" placeholder="选择年月"></el-date-picker>
            <span style="color:#008eff;line-height: 30px;margin-left: 20px;font-size:20px;">当月累计回款总额:{{salSix2Num.toFixed(2)}}元</span>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getBackDetail(2)">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="sale2Six" style="width:100%;height:500px;margin-top:20px;"></div>
        </div>

        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div style="line-height: 28px;">开始时间:</div>
            <el-date-picker size="mini" v-model="sevenYearDate" :clearable="false" type="month" value-format="yyyy-MM" @change="getBuyOne" :editable="false" placeholder="选择年月"></el-date-picker>
            <div style="line-height: 28px;margin-left:10px;">结束时间:</div>
            <el-date-picker size="mini" v-model="sevenYearDate2" :clearable="false" type="month" value-format="yyyy-MM" @change="getBuyOne" :editable="false" placeholder="选择年月"></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getSaleDetail()">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleSeven" style="width:100%;height:500px;margin-top:20px;"></div>
        </div>

        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker size="mini" v-model="yearDate" :clearable="false" @change="getYearTotal" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
            <el-button size="mini" style="margin-left:10px;" type="primary" @click="getFourDetail()">数据显示</el-button>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleOne" style="width:100%;height:500px;"></div>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <el-date-picker size="mini" v-model="twoYear" :clearable="false" @change="getSaleTwo" value-format="yyyy" type="year" placeholder="选择年"></el-date-picker>
        </div>
        <div style="width:98%;margin:20px auto;display:flex;padding-left:1%">
            <div id="saleTwo" style="width:100%;height:500px;"></div>
        </div>
        <layer v-if="flag1" title="数据列表" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    客户名称:
                    <input type="text" class="flex-item" v-model="form1.demandName" placeholder style="width: 150px;" @change="$refs.listOne.update(true);getDataOneNum();">
                    订单号:
                    <input type="text" class="flex-item" v-model="form1.orderNo" placeholder style="width: 150px;" @change="$refs.listOne.update(true);getDataOneNum();">
                    订单状态:
                    <select v-model="form1.orderStatus" class="f-14" @change="$refs.listOne.update(true);getDataOneNum();">
                        <option value>全部</option>
                        <option v-for="item in orderStatusList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                    </select>
                    <el-button type="primary" size="mini" @click="$refs.listOne.update(true);getDataOneNum()">查询</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">累计订货总金额: {{totalAmountNum}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="listOne" :page-size="50" :param="form1" url="/haolifa/report-extend/report-order-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>接单日期</th>
                        <th>客户名称</th>
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>产品名称</th>
                        <th>系列</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>单价（元）</th>
                        <th>金额（元）</th>
                        <th>交期</th>
                    </tr>
                    <!-- item: 当前行数据; index: 当前行数 -->
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.demandName}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{orderStatusArr[item.orderStatus]}}</td>
                        <td>{{item.productName}}</td>
                        <td>{{item.productModel}}</td>
                        <td>{{item.specifications}}</td>
                        <td>{{item.productNumber}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.totalPrice}}</td>
                        <td>{{item.deliveryDate}}</td>
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="flag1=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="flag2" title="数据列表" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    客户名称:
                    <input type="text" class="flex-item" v-model="form2.demandName" placeholder style="width: 150px;" @change="$refs.listTwoTwo.update(true);getDataBackNum()">
                    订单号:
                    <input type="text" class="flex-item" v-model="form2.orderNo" placeholder style="width: 150px;" @change="$refs.listTwoTwo.update(true);getDataBackNum()">
                    订单状态:
                    <select v-model="form2.orderStatus" class="f-14" @change="$refs.listTwoTwo.update(true);getDataBackNum()">
                        <option value>全部</option>
                        <option v-for="item in orderStatusList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                    </select>
                    发货状态:
                    <select v-model="form2.deliverStatus" class="f-14" @change="$refs.listTwoTwo.update(true);getDataBackNum()">
                        <option value>全部</option>
                        <option v-for="item in deliverStatusList" :value="item.value" v-bind:key="item.value">{{item.text}}</option>
                    </select>
                    <el-button type="primary" size="mini" @click="$refs.listTwoTwo.update(true);getDataBackNum()">查询</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:18px;">合同金额: {{form2Obj.totalSaleAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:18px;">回款金额: {{form2Obj.totalCollectAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:18px;">欠款金额: {{form2Obj.totalOwedAmount.toFixed(2)}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="listTwoTwo" :page-size="50" :param="form2" url="/haolifa/report-extend/report-collect-order-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>客户名称</th>
                        <th>接单日期</th>
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>发货状态</th>
                        <th>合同金额（元）</th>
                        <th>交货日期</th>
                        <th>回款金额（元）</th>
                        <th>回款日期</th>
                        <th>欠款金额（元）</th>
                    </tr>
                    <!-- item: 当前行数据; index: 当前行数 -->
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.demandName}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{orderStatusArr[item.orderStatus]}}</td>
                        <td>{{deliverStatusArr[item.deliverStatus]}}</td>
                        <td>{{item.totalPrice}}</td>
                        <td>{{item.deliveryDate}}</td>
                        <td>{{item.collectionAmount}}</td>
                        <td>{{item.collectionDate}}</td>
                        <td>{{item.owedAmount}}</td>
                    </template>
                </data-list>
                <!-- <data-list ref="listTwoTwo" :page-size="50" :param="form2" url="/haolifa/report-extend/report-collect-order-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>客户名称</th>
                        <th>接单日期</th>
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>发货状态</th>
                        <th>合同金额（元）</th>
                        <th>交货日期</th>
                        <th>回款金额（元）</th>
                        <th>回款日期</th>
                        <th>欠款金额（元）</th>
                    </tr>
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.demandName}}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{orderStatusArr[item.orderStatus]}}</td>
                        <td>{{deliverStatusArr[item.deliverStatus]}}</td>
                        <td>{{item.totalPrice}}</td>
                        <td>{{item.deliveryDate}}</td>
                        <td>{{item.collectionAmount}}</td>
                        <td>{{item.collectionDate}}</td>
                        <td>{{item.owedAmount}}</td>
                    </template>
                </data-list>-->
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="flag2=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="flag3" title="数据列表" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    客户名称:
                    <input type="text" class="flex-item" v-model="form3.demandName" placeholder style="width: 150px;" @change="$refs.listThree.update(true);getSaleData()">
                    订单号:
                    <input type="text" class="flex-item" v-model="form3.orderNo" placeholder style="width: 150px;" @change="$refs.listThree.update(true);getSaleData()">
                    <el-button type="primary" size="mini" @click="$refs.listThree.update(true);getSaleData()">查询</el-button>
                </div>
            </div>
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">订货金额: {{form3Obj.saleAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">发货金额: {{form3Obj.deliveryAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">开票金额: {{form3Obj.invoiceAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">回款金额: {{form3Obj.collectAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">欠票金额: {{form3Obj.oweTicketAmount.toFixed(2)}}元</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">欠款金额: {{form3Obj.oweMoneyAmount.toFixed(2)}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="listThree" :page-size="50" :param="form3" url="/haolifa/report-extend/report-sale-demand-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>客户名称</th>
                        <th>订单号</th>
                        <th>订货金额（元）</th>
                        <th>发货金额（元）</th>
                        <th>开票金额（元）</th>
                        <th>回款金额（元）</th>
                        <th>欠票金额（元）</th>
                        <th>欠款金额（元）</th>
                    </tr>
                    <!-- item: 当前行数据; index: 当前行数 -->
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.demandName}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{item.saleAmount}}</td>
                        <td>{{item.deliveryAmount}}</td>
                        <td>{{item.invoiceAmount}}</td>
                        <td>{{item.collectAmount}}</td>
                        <td>{{item.oweTicketAmount}}</td>
                        <td>{{item.oweMoneyAmount}}</td>
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="flag3=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="flag4" title="数据列表" width="95%">
            <div class="flex-v-center tool-bar">
                <div class="flex-v-center search-bar" style="margin-right: 20px;">
                    客户名称:
                    <input type="text" class="flex-item" v-model="form4.demandName" placeholder style="width: 150px;" @change="$refs.listFour.update(true);getFourTj()">
                    订单号:
                    <input type="text" class="flex-item" v-model="form4.orderNo" placeholder style="width: 150px;" @change="$refs.listFour.update(true);getFourTj()">
                    <el-button type="primary" size="mini" @click="$refs.listFour.update(true);getFourTj()">查询</el-button>
                    <el-button type="warning" size="mini" @click="exportExcel">导出</el-button>
                    <el-button :underline="false" type="text" style="margin-left:20px;font-size:20px;">累计产值总额: {{form4Amount.toFixed(2)}}元</el-button>
                </div>
            </div>
            <div class="flex-item scroll-y">
                <data-list ref="listFour" :page-size="50" :param="form4" url="/haolifa/report-extend/report-sale-output-list" method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>接单日期</th>
                        <th>客户名称</th>
                        <th>订单号</th>
                        <th>订单状态</th>
                        <th>产品ID</th>
                        <th>产品名称</th>
                        <th>系列</th>
                        <th>规格</th>
                        <th>数量</th>
                        <th>单价（元）</th>
                        <th>金额（元）</th>
                    </tr>
                    <!-- item: 当前行数据; index: 当前行数 -->
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{item.createTime}}</td>
                        <td>{{item.demandName}}</td>
                        <td>{{item.orderNo}}</td>
                        <td>{{orderStatusArr[item.orderStatus]}}</td>
                        <td>{{item.productNo}}</td>
                        <td>{{item.productName}}</td>
                        <td>{{item.productSpecifications}}</td>
                        <td>{{item.productModel}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.totalPrice}}</td>
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="flag4=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="flex ml-20 mr-20">
                <date-picker v-model="exportForm.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <date-picker v-model="exportForm.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
            </div>
            <div class="flex ml-20 mr-20">
                <input-box v-model="exportForm.orderNo" class="flex-item" label="订单号"></input-box>
            </div>
            <div class="flex ml-20 mr-20">
                <select-box v-model="exportForm.entryStatus" class="flex-item" :list="entryStatusList" label="状态"></select-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportLayer=false">取消</btn>
                <btn flat color="#008eff" @click="download()">确定</btn>
            </div>
        </layer>
    </div>
</template>
<script>
import DataList from "@/components/datalist";
export default {
    name: "xsreport-form",
    components: { DataList },
    data() {
        return {
            chartOneList: [],
            yearDate: new Date().getFullYear() + "",
            oneYearDate: new Date().getFullYear() + "",
            cYearDate: new Date().getFullYear() + "",
            fiveYearDate: new Date().getFullYear() + "",
            sixYearDate: new Date().getFullYear() + "",
            twoYear: new Date().getFullYear() + "",
            sevenYearDate: new Date().getFullYear() + "-01",
            sevenYearDate2:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            fiveYear2Date: new Date().getFullYear() + "-01",
            fiveYear2Date2:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            sixYear2Date: new Date().getFullYear() + "-01",
            sixYear2Date2:
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1),
            totalNum: 0,
            totalPrice: 0,
            contractTotalNum: 0,
            contractTotalPrice: 0,
            saleFiveNum: 0,
            saleFive2Num: 0,
            salSixNum: 0,
            salSix2Num: 0,
            flag1: false,
            flag2: false,
            flag3: false,
            flag4: false,
            form1: {
                deliverStatus: "",
                demandName: "",
                endDate: "",
                orderNo: "",
                orderStatus: "",
                productName: "",
                startDate: "",
                year: ""
            },
            form2: {
                deliverStatus: "",
                demandName: "",
                endDate: "",
                orderNo: "",
                orderStatus: "",
                productName: "",
                startDate: "",
                year: ""
            },
            form2Obj: {
                totalSaleAmount: 0,
                totalCollectAmount: 0,
                totalOwedAmount: 0
            },
            form3: {
                deliverStatus: "",
                demandName: "",
                endDate: "",
                orderNo: "",
                orderStatus: "",
                productName: "",
                startDate: "",
                year: ""
            },
            form4: {
                deliverStatus: "",
                demandName: "",
                endDate: "",
                orderNo: "",
                orderStatus: "",
                productName: "",
                startDate: "",
                year: ""
            },
            form4Amount: 0,
            form3Obj: {
                saleAmount: 0,
                deliveryAmount: 0,
                invoiceAmount: 0,
                collectAmount: 0,
                oweMoneyAmount: 0,
                oweTicketAmount: 0
            },
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
            orderStatusArr: [
                "创建",
                "审批中",
                "核料中",
                "替换料审批中",
                "核料完成",
                "待生产",
                "待领料",
                "生产中",
                "生产暂停",
                "生产完成",
                "质检中",
                "已入库",
                "申请发货",
                "发货完成",
                "审核不通过"
            ],
            deliverStatusList: [
                { value: 0, text: "待发货" },
                { value: 1, text: "部分发货" },
                { value: 2, text: "发货完成" }
            ],
            deliverStatusArr: ["待发货", "部分发货", "发货完成"],
            exportLayer: false,
            exportForm: {
                entryStatus: 0,
                startDate: "",
                orderNo: "",
                endDate: ""
            },
            totalAmountNum: 0
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
        flush() {
            this.yearDate = new Date().getFullYear() + "";
            this.oneYearDate = new Date().getFullYear() + "";
            this.cYearDate = new Date().getFullYear() + "";
            this.fiveYearDate = new Date().getFullYear() + "";
            this.sixYearDate = new Date().getFullYear() + "";
            this.twoYear = new Date().getFullYear() + "";
            this.sevenYearDate = new Date().getFullYear() + "-01";
            this.sevenYearDate2 =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.fiveYear2Date = new Date().getFullYear() + "-01";
            this.fiveYear2Date2 =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.sixYear2Date = new Date().getFullYear() + "-01";
            this.sixYear2Date2 =
                new Date().getFullYear() +
                "-" +
                this.addRezo(new Date().getMonth() + 1);
            this.getTotal();
            this.getSaleFive();
            this.getSale2Five();
            this.getSaleSix();
            this.getSale2Six();
            this.getContractTotal();
            this.getSaleTwo(this.twoYear);
            this.getSaleOne(this.yearDate);
            this.getBuyOne();
        },
        getDataOne(type) {
            this.form1.demandName = "";
            this.form1.orderNo = "";
            this.form1.orderStatus = "";
            if (type == 1) {
                this.form1.startDate = this.fiveYearDate + "-01";
                this.form1.endDate = this.fiveYearDate + "-12";
            } else if (type == 2) {
                this.form1.startDate = this.fiveYear2Date;
                this.form1.endDate = this.fiveYear2Date2;
            }
            this.flag1 = true;
            this.getDataOneNum();
            this.$refs.listOne.update(true);
        },
        getDataOneNum() {
            this.totalAmountNum = "";
            this.$http
                .post(`/haolifa/report-extend/report-order-summary`, this.form1)
                .then(res => {
                    this.totalAmountNum = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getBackDetail(type) {
            this.form2.demandName = "";
            this.form2.orderNo = "";
            this.form2.orderStatus = "";
            this.form2.deliverStatus = "";
            if (type == 1) {
                this.form2.startDate = this.sixYearDate + "-01";
                this.form2.endDate = this.sixYearDate + "-12";
            } else if (type == 2) {
                this.form2.startDate = this.sixYear2Date;
                this.form2.endDate = this.sixYear2Date2;
            }
            this.flag2 = true;
            this.$refs.listTwoTwo.update(true);
            this.getDataBackNum();
        },
        getDataBackNum() {
            this.form2Obj = {
                totalSaleAmount: 0,
                totalCollectAmount: 0,
                totalOwedAmount: 0
            };
            this.$http
                .post(
                    `/haolifa/report-extend/report-collect-order-summary`,
                    this.form2
                )
                .then(res => {
                    this.form2Obj.totalSaleAmount = res.totalSaleAmount;
                    this.form2Obj.totalCollectAmount = res.totalCollectAmount;
                    this.form2Obj.totalOwedAmount = res.totalOwedAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getSaleDetail(type) {
            this.form3.startDate = this.sevenYearDate;
            this.form3.endDate = this.sevenYearDate2;
            this.form3.demandName = "";
            this.form3.orderNo = "";
            this.flag3 = true;
            this.getSaleData();
            this.$refs.listThree.update(true);
        },
        getSaleData() {
            this.form3Obj.saleAmount = 0;
            this.form3Obj.deliveryAmount = 0;
            this.form3Obj.invoiceAmount = 0;
            this.form3Obj.collectAmount = 0;
            this.form3Obj.oweTicketAmount = 0;
            this.form3Obj.oweMoneyAmount = 0;
            this.$http
                .post(
                    `/haolifa/report-extend/report-sale-demand-summary`,
                    this.form3
                )
                .then(res => {
                    this.form3Obj.saleAmount = res.saleAmount;
                    this.form3Obj.deliveryAmount = res.deliveryAmount;
                    this.form3Obj.invoiceAmount = res.invoiceAmount;
                    this.form3Obj.collectAmount = res.collectAmount;
                    this.form3Obj.oweTicketAmount = res.oweTicketAmount;
                    this.form3Obj.oweMoneyAmount = res.oweMoneyAmount;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getFourDetail() {
            this.form4.demandName = "";
            this.form4.orderNo = "";
            this.form4.startDate = this.yearDate + "-01";
            this.form4.endDate = this.yearDate + "-12";
            this.flag4 = true;
            this.getFourTj();
            this.$refs.listFour.update(true);
        },
        getFourTj() {
            this.form4Amount = 0;
            this.$http
                .post(
                    `/haolifa/report-extend/report-sale-output-summary`,
                    this.form4
                )
                .then(res => {
                    this.form4Amount = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        oneYearChange() {
            this.getTotal();
        },
        addRezo(string) {
            return string > 9 ? string : "0" + string;
        },
        getTotal() {
            this.$http
                .get(`/haolifa/report/sale/getSaleAll?year=${this.oneYearDate}`)
                .then(res => {
                    this.totalNum = res.outPutTotalNum;
                    this.totalPrice = res.outPutTotalAmount;
                    this.contractTotalNum = res.saleTotalNum;
                    this.contractTotalPrice = res.saleTotalAmount;
                });
        },
        //需方总额饼图
        getSaleFive() {
            this.saleFiveNum = 0;
            this.$http
                .get(
                    `/haolifa/report/sale/selectContractByDemandName?year=${
                        this.fiveYearDate
                    }`
                )
                .then(res => {
                    let xData = [],
                        yData = [],
                        yData2 = [];

                    let name1 = res[0].value[0].year;
                    let name2 = res[0].value[1].year;
                    res.map(item => {
                        xData.push(item.companyName);
                        yData.push(item.value[0].amount);
                        yData2.push(item.value[1].amount);
                        this.saleFiveNum =
                            this.saleFiveNum + +item.value[0].amount;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleFive")
                    );
                    let option = {
                        color: ["#3398DB", "#91CC75"],
                        title: {
                            text: "年度订货总额分类统计图",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        grid: {
                            left: "3%",
                            right: "4%",
                            bottom: "2%",
                            containLabel: true
                        },
                        legend: {},
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "shadow"
                            }
                            // trigger: "item",
                            // formatter: "{a} <br/>{b} : {c}元"
                        },
                        xAxis: {
                            type: "category",
                            data: xData,
                            axisLabel: {
                                interval: 0,
                                rotate: 30
                            }
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
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getSale2Five() {
            this.saleFive2Num = 0;
            this.$http
                .post(
                    `/haolifa/report/sale/selectContractByDemandNameByMonth`,
                    {
                        endDate: this.fiveYear2Date2,
                        month: "",
                        startDate: this.fiveYear2Date,
                        year: ""
                    }
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
                    `/haolifa/report/sale/selectshouhuiContractByDemandName?year=${
                        this.sixYearDate
                    }`
                )
                .then(res => {
                    if (!res || res.length == 0) {
                        return;
                    }
                    let xData = [],
                        yData = [],
                        yData2 = [];

                    let name1 = res[0].value[0].year;
                    let name2 = res[0].value[1].year;
                    res.map((item, i) => {
                        xData.push(item.companyName);
                        yData.push(item.value[0].amount);
                        yData2.push(item.value[1].amount);
                        this.salSixNum = this.salSixNum + +item.value[0].amount;
                    });
                    let chart = this.$echarts.init(
                        document.getElementById("saleSix")
                    );
                    let option = {
                        color: ["#3398DB", "#91CC75"],
                        title: {
                            text: "年度回款总额分类统计图",
                            // subtext: "纯属虚构",
                            x: "left"
                        },
                        grid: {
                            left: "3%",
                            right: "4%",
                            bottom: "2%",
                            containLabel: true
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
                            data: xData,
                            axisLabel: {
                                interval: 0,
                                rotate: 30
                            }
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
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getSale2Six() {
            this.salSix2Num = 0;
            // let arr = this.sixYear2Date.split("-");
            // let year = arr[0],
            //     month = arr[1];
            this.$http
                /*  .get(
                    `/haolifa/report/sale/selectshouhuiContractByDemandName?year=${year}&month=${month}`
                ) */
                .post(
                    "/haolifa/report/sale/selectshouhuiContractByDemandNameByMonth",
                    {
                        startDate: this.sixYear2Date,
                        endDate: this.sixYear2Date2
                    }
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
                    `/haolifa/report/sale/getSaleAllContract?year=${
                        this.oneYearDate
                    }`
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
                .post(`/haolifa/report/sale/selectAllAmountByDemandName`, {
                    startDate: this.sevenYearDate,
                    endDate: this.sevenYearDate2,
                    month: "",
                    year: ""
                })
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
                            bottom: "2%",
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: xData,
                                axisLabel: {
                                    interval: 0,
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
        },
        exportExcel() {
            this.exportLayer = true;
            this.exportForm = {
                entryStatus: 0,
                startDate: "",
                orderNo: "",
                endDate: ""
            };
        },
        download() {
            if (!this.exportForm.startDate) {
                this.$toast("请选择开始时间");
                return;
            }
            if (!this.exportForm.endDate) {
                this.$toast("请选择结束时间");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/export/product-entry?startDate=${
                    this.exportForm.startDate
                }&endDate=${this.exportForm.endDate}&entryStatus=${
                    this.exportForm.entryStatus
                }&orderNo=${this.exportForm.orderNo}`
            );
            a.click();
            this.exportLayer = false;
        }
    }
};
</script>
<style lang="less">
.page-notification {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>
