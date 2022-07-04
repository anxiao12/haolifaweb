<template>
    <div class="page-invoice-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.userName" @change="
                $refs.list.update(true)" placeholder="姓名" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.department" @change="
                $refs.list.update(true)" placeholder="部门" style="width: 200px;">
                年份选择：
                <select v-model="filter.wagesYear" class="f-14" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="(item,i) in yearArr" :value="item" :key="i">{{item}}</option>
                </select>
                月份选择：
                <select v-model="filter.wagesMonth" class="f-14" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="(item,i) in monthList" :value="item.value" :key="i">{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="addData">计算工资</btn>
            <btn class="b" flat color="#008eff" @click="createData">生成工资</btn>
            <a style="color:#008eff" href="/haolifa/pay-wages/export" target="_blank">导出</a>
            <btn class="b" flat color="#008eff" @click="upload">导入</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-wages/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>部门</th>
                    <th>年</th>
                    <th>月</th>
                    <th>应出勤天数</th>
                    <th>实出勤天数</th>
                    <th>旷工次数</th>
                    <th>迟到早退次数</th>
                    <th>计件定额数量</th>
                    <th>计件定额金额</th>
                    <th>工废数量</th>
                    <th>工废金额</th>
                    <th>零工数量</th>
                    <th>零工金额</th>
                    <th>派工单数量</th>
                    <th>派工单金额</th>
                    <th>最底生活保障金</th>
                    <th>午餐补贴</th>
                    <th>全勤奖</th>
                    <th>扣个人所得税</th>
                    <th>扣个人保险</th>
                    <th>嘉奖</th>
                    <th>旷工罚款</th>
                    <th>总计工资</th>
                    <th>应纳税合计</th>
                    <th>应发合计</th>
                    <th>应纳税工资</th>
                    <th>加班费</th>
                    <th>其他补贴</th>
                    <th>计提绩效工资</th>
                    <th>实发工资</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.department }}</td>
                    <td>{{ item.wagesYear }}</td>
                    <td>{{ item.wagesMonth }}</td>
                    <td>{{ item.requiredAttendanceDays }}</td>
                    <td>{{ item.actualAttendanceDays }}</td>
                    <td>{{ item.absenteeismTimes }}</td>
                    <td>{{ item.lateAndLeaveTimes }}</td>
                    <td>{{ item.byPieceCount }}</td>
                    <td>{{ item.byPieceMoney }}</td>
                    <td>{{ item.industrialWasteCount }}</td>
                    <td>{{ item.industrialWasteMoney }}</td>
                    <td>{{ item.oddJobCount }}</td>
                    <td>{{ item.oddJobMoney }}</td>
                    <td>{{ item.temporaryDispatchCount }}</td>
                    <td>{{ item.temporaryDispatchMoney }}</td>
                    <td>{{ item.minLiveSecurityFund }}</td>
                    <td>{{ item.lunchAllowanceMoney }}</td>
                    <td>{{ item.fullAttendanceMoney }}</td>
                    <td>{{ item.deductionPersonalIncomeTax }}</td>
                    <td>{{ item.deductPersonalInsuranceMoney }}</td>
                    <td>{{ item.commendationMoney }}</td>
                    <td>{{ item.absenteeismFine }}</td>
                    <td>{{ item.totalMoney }}</td>
                    <td>{{ item.totalTaxPayableMoney }}</td>
                    <td>{{ item.totalPayableMoney }}</td>
                    <td>{{ item.taxableWagesMoney }}</td>
                    <td>{{ item.overtimePayMoney }}</td>
                    <td>{{ item.otherSubsidiesMoney }}</td>
                    <td>{{ item.accruedPerformanceSalary }}</td>
                    <td>{{ item.netSalaryMoney }}</td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.updateTime }}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)">编辑 |&nbsp;</a>
                        <a href="javascript:;" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.userName" class="flex-item mr-20" label="姓名"></input-box>
                    <input-box v-model="form.department" class="flex-item mr-20" label="部门"></input-box>
                    <input-box v-model="form.accruedPerformanceSalary" class="flex-item mr-20" label="计提绩效工资"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.temporaryDispatchCount" class="flex-item mr-20" label="派工单数量"></input-box>
                    <input-box v-model="form.temporaryDispatchMoney" class="flex-item mr-20" label="派工单金额"></input-box>
                    <input-box v-model="form.oddJobCount" class="flex-item mr-20" label="零工数量"></input-box>
                    <input-box v-model="form.oddJobMoney" class="flex-item mr-20" label="零工金额"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.industrialWasteCount" class="flex-item mr-20" label="工废数量"></input-box>
                    <input-box v-model="form.industrialWasteMoney" class="flex-item mr-20" label="工废金额"></input-box>
                    <input-box v-model="form.byPieceCount" class="flex-item mr-20" label="计件定额数量"></input-box>
                    <input-box v-model="form.byPieceMoney" class="flex-item mr-20" label="计件定额金额"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.requiredAttendanceDays" class="flex-item mr-20" label="应出勤天数"></input-box>
                    <input-box v-model="form.actualAttendanceDays" class="flex-item mr-20" label="实出勤天数"></input-box>
                    <input-box v-model="form.absenteeismTimes" class="flex-item mr-20" label="旷工次数"></input-box>
                    <input-box v-model="form.absenteeismFine" class="flex-item mr-20" label="旷工罚款"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.lateAndLeaveTimes" class="flex-item mr-20" label="迟到早退次数"></input-box>
                    <input-box v-model="form.lateAndLeaveFine" class="flex-item mr-20" label="迟到早退罚款"></input-box>
                    <input-box v-model="form.fullAttendanceMoney" class="flex-item mr-20" label="全勤奖"></input-box>
                    <input-box v-model="form.lunchAllowanceMoney" class="flex-item mr-20" label="午餐补贴"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.minLiveSecurityFund" class="flex-item mr-20" label="最底生活保障金"></input-box>
                    <input-box v-model="form.overtimePayMoney" class="flex-item mr-20" label="加班费"></input-box>
                    <input-box v-model="form.otherSubsidiesMoney" class="flex-item mr-20" label="其他补贴"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.totalMoney" class="flex-item mr-20" label="总计工资"></input-box>
                    <input-box v-model="form.deductPersonalInsuranceMoney" class="flex-item mr-20" label="扣个人保险"></input-box>
                    <input-box v-model="form.deductionPersonalIncomeTax" class="flex-item mr-20" label="扣个人所得税"></input-box>
                    <input-box v-model="form.taxableWagesMoney" class="flex-item mr-20" label="应纳税工资"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.totalTaxPayableMoney" class="flex-item mr-20" label="应纳税合计"></input-box>
                    <input-box v-model="form.totalPayableMoney" class="flex-item mr-20" label="应发合计"></input-box>
                    <input-box v-model="form.commendationMoney" class="flex-item mr-20" label="嘉奖"></input-box>
                    <input-box v-model="form.netSalaryMoney" class="flex-item mr-20" label="实发工资"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="createDataLayer" title="生成工资 " width="30%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <div style="line-height: 28px;margin-left:10px;">日期选择:</div>
                    <el-date-picker size="mini" v-model="createDate" :clearable="false" type="month" value-format="yyyy-MM" placeholder="选择年月"></el-date-picker>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="createSave">保存</el-button>
                <el-button class="mr-20" size="mini" @click="createDataLayer = false">关闭</el-button>
            </div>
        </layer>
        <layer v-if="addDataLayer" title="计算工资 " width="30%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <div style="line-height: 28px;margin-left:10px;">日期选择:</div>
                    <el-date-picker size="mini" v-model="addDate" :clearable="false" type="month" value-format="yyyy-MM" placeholder="选择年月"></el-date-picker>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="addSave">保存</el-button>
                <el-button class="mr-20" size="mini" @click="addDataLayer = false">关闭</el-button>
            </div>
        </layer>
        <layer v-if="uploadFlag" title="导入" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-upload class="upload-demo" ref="upload" :on-success="uploadSuccess" :limit="1" action="/haolifa/pay-wages/import" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="warning">选取文件</el-button>
                </el-upload>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="submitUpload">上传</el-button>
                <el-button class="mr-20" size="mini" @click="uploadFlag=false">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "jiaoxiaogongxu-list",
    components: { DataList },
    data() {
        return {
            filter: {
                absenteeismTimes: "",
                actualAttendanceDays: "",
                byPieceCount: "",
                byPieceMoney: "",
                department: "",
                endCreateTime: "",
                industrialWasteCount: "",
                industrialWasteMoney: "",
                lateAndLeaveTimes: "",
                oddJobCount: "",
                oddJobMoney: "",
                requiredAttendanceDays: "",
                startCreateTime: "",
                temporaryDispatchCount: "",
                temporaryDispatchMoney: "",
                userName: "",
                wagesMonth: "",
                wagesYear: ""
            },
            layer: false,
            loading: false,
            form: {
                absenteeismFine: 0,
                absenteeismTimes: 0,
                accruedPerformanceSalary: 0,
                actualAttendanceDays: 0,
                byPieceCount: 0,
                byPieceMoney: 0,
                commendationMoney: 0,
                deductPersonalInsuranceMoney: 0,
                deductionPersonalIncomeTax: 0,
                department: "",
                fullAttendanceMoney: 0,
                id: "",
                industrialWasteCount: 0,
                industrialWasteMoney: 0,
                lateAndLeaveFine: 0,
                lateAndLeaveTimes: 0,
                lunchAllowanceMoney: 0,
                minLiveSecurityFund: 0,
                netSalaryMoney: 0,
                oddJobCount: 0,
                oddJobMoney: 0,
                otherSubsidiesMoney: 0,
                overtimePayMoney: 0,
                remark: "",
                requiredAttendanceDays: 0,
                serial: "",
                taxableWagesMoney: 0,
                temporaryDispatchCount: 0,
                temporaryDispatchMoney: 0,
                totalMoney: 0,
                totalPayableMoney: 0,
                totalTaxPayableMoney: 0,
                userName: ""
            },
            addDataLayer: false,
            createDataLayer: false,
            addDate: "",
            createDate: "",
            fileList: [],
            uploadFlag: false,
            yearArr: [
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
                "2026",
                "2027",
                "2028"
            ],
            monthList: [
                { value: "01", text: "1月" },
                { value: "02", text: "2月" },
                { value: "03", text: "3月" },
                { value: "04", text: "4月" },
                { value: "05", text: "5月" },
                { value: "06", text: "6月" },
                { value: "07", text: "7月" },
                { value: "08", text: "8月" },
                { value: "09", text: "9月" },
                { value: "10", text: "10月" },
                { value: "11", text: "11月" },
                { value: "12", text: "12月" }
            ]
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                absenteeismTimes: "",
                actualAttendanceDays: "",
                byPieceCount: "",
                byPieceMoney: "",
                department: "",
                endCreateTime: "",
                industrialWasteCount: "",
                industrialWasteMoney: "",
                lateAndLeaveTimes: "",
                oddJobCount: "",
                oddJobMoney: "",
                requiredAttendanceDays: "",
                startCreateTime: "",
                temporaryDispatchCount: "",
                temporaryDispatchMoney: "",
                userName: "",
                wagesMonth: "",
                wagesYear: ""
            };
            this.$refs.list.update(true);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        upload() {
            this.fileList = [];
            this.uploadFlag = true;
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        uploadSuccess(resp, file, fileList) {
            if (resp.code === "0000") {
                this.$toast("上传成功");
                this.uploadFlag = false;
                this.$refs.list.update(true);
                this.fileList = [];
            } else {
                this.$toast(resp.message);
            }
        },
        handlePreview(file) {
            console.log(file);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.absenteeismTimes = item.absenteeismTimes;
            this.form.absenteeismFine = item.absenteeismFine;
            this.form.accruedPerformanceSalary = item.accruedPerformanceSalary;
            this.form.actualAttendanceDays = item.actualAttendanceDays;
            this.form.byPieceCount = item.byPieceCount;
            this.form.byPieceMoney = item.byPieceMoney;
            this.form.commendationMoney = item.commendationMoney;
            this.form.deductPersonalInsuranceMoney =
                item.deductPersonalInsuranceMoney;
            this.form.deductionPersonalIncomeTax =
                item.deductionPersonalIncomeTax;
            this.form.department = item.department;
            this.form.fullAttendanceMoney = item.fullAttendanceMoney;
            this.form.industrialWasteCount = item.industrialWasteCount;
            this.form.industrialWasteMoney = item.industrialWasteMoney;
            this.form.lateAndLeaveFine = item.lateAndLeaveFine;
            this.form.lateAndLeaveTimes = item.lateAndLeaveTimes;
            this.form.lunchAllowanceMoney = item.lunchAllowanceMoney;
            this.form.minLiveSecurityFund = item.minLiveSecurityFund;
            this.form.netSalaryMoney = item.netSalaryMoney;
            this.form.oddJobCount = item.oddJobCount;
            this.form.oddJobMoney = item.oddJobMoney;
            this.form.otherSubsidiesMoney = item.otherSubsidiesMoney;
            this.form.overtimePayMoney = item.overtimePayMoney;
            this.form.remark = item.remark;
            this.form.requiredAttendanceDays = item.requiredAttendanceDays;
            this.form.serial = item.serial;
            this.form.taxableWagesMoney = item.taxableWagesMoney;
            this.form.temporaryDispatchCount = item.temporaryDispatchCount;
            this.form.temporaryDispatchMoney = item.temporaryDispatchMoney;
            this.form.totalMoney = item.totalMoney;
            this.form.totalPayableMoney = item.totalPayableMoney;
            this.form.totalTaxPayableMoney = item.totalTaxPayableMoney;
            this.form.userName = item.userName;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-wages/del/${item.id}`)
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
        add() {
            this.layer = true;
        },
        save() {
            if (!this.form.userName.trim()) {
                this.$toast("姓名不能为空");
                return;
            }
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-wages/edit"
                : "/haolifa/pay-wages/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                absenteeismFine: 0,
                absenteeismTimes: 0,
                accruedPerformanceSalary: 0,
                actualAttendanceDays: 0,
                byPieceCount: 0,
                byPieceMoney: 0,
                commendationMoney: 0,
                deductPersonalInsuranceMoney: 0,
                deductionPersonalIncomeTax: 0,
                department: "",
                fullAttendanceMoney: 0,
                id: "",
                industrialWasteCount: 0,
                industrialWasteMoney: 0,
                lateAndLeaveFine: 0,
                lateAndLeaveTimes: 0,
                lunchAllowanceMoney: 0,
                minLiveSecurityFund: 0,
                netSalaryMoney: 0,
                oddJobCount: 0,
                oddJobMoney: 0,
                otherSubsidiesMoney: 0,
                overtimePayMoney: 0,
                remark: "",
                requiredAttendanceDays: 0,
                serial: "",
                taxableWagesMoney: 0,
                temporaryDispatchCount: 0,
                temporaryDispatchMoney: 0,
                totalMoney: 0,
                totalPayableMoney: 0,
                totalTaxPayableMoney: 0,
                userName: ""
            };
        },
        addData() {
            this.addDataLayer = true;
        },
        createData() {
            this.createDataLayer = true;
        },
        addSave() {
            if (!this.addDate) {
                this.$toast("请选择日期");
                return;
            }
            this.loading = true;
            let arr = this.addDate.split("-");
            this.$http
                .post("/haolifa/pay-wages/calculateSalary", {
                    year: arr[0],
                    month: arr[1]
                })
                .then(res => {
                    this.addDate = "";
                    this.addDataLayer = false;
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        createSave() {
            if (!this.createDate) {
                this.$toast("请选择日期");
                return;
            }
            this.loading = true;
            let arr = this.createDate.split("-");
            this.$http
                .post("/haolifa/pay-wages/createWages", {
                    year: arr[0],
                    month: arr[1]
                })
                .then(res => {
                    this.createDate = "";
                    this.createDataLayer = false;
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-invoice-list {
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

    //
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
