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
                <select v-model="filter.attendYear" class="f-14" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="(item,i) in yearArr" :value="item" :key="i">{{item}}</option>
                </select>
                月份选择：
                <select v-model="filter.attendMonth" class="f-14" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="(item,i) in monthList" :value="item.value" :key="i">{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="upload">导入</btn>
            <btn class="b" flat color="#008eff" @click="exportOut">导出</btn>
            <btn class="b" flat color="#008eff" @click="build">生成考勤</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/pay-work-attendance/getList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>姓名</th>
                    <th>部门</th>
                    <th>出勤天数</th>
                    <th>中班天数</th>
                    <th>夜班天数</th>
                    <th>加班天数</th>
                    <th>旷工次数</th>
                    <th>出差天数</th>
                    <th>事假天数</th>
                    <th>迟到次数</th>
                    <th>早退次数</th>
                    <th>迟到早退次数</th>
                    <th>病假天数</th>
                    <th>年</th>
                    <th>月</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index }">
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.department }}</td>
                    <td>{{ item.attendanceDays }}</td>
                    <td>{{ item.middleDays }}</td>
                    <td>{{ item.nightDays}}</td>
                    <td>{{ item.workOvertimeDays }}</td>
                    <td>{{ item.absenteeismTimes }}</td>
                    <td>{{ item.businessTravelDays }}</td>
                    <td>{{ item.compassionateLeaveDays }}</td>
                    <td>{{ item.lateTimes }}</td>
                    <td>{{ item.leaveEarlyTimes }}</td>
                    <td>{{ item.lateAndLeaveTimes}}</td>
                    <td>{{ item.sickLeaveDays }}</td>
                    <td>{{ item.attendYear }}</td>
                    <td>{{ item.attendMonth }}</td>
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
                    <input-box v-model="form.userName" :disabled="true" class="flex-item mr-20" label="姓名"></input-box>
                    <input-box v-model="form.department" :disabled="true" class="flex-item mr-20" label="部门"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.attendanceDays" type="number" class="flex-item mr-20" label="出勤天数"></input-box>
                    <input-box v-model="form.middleDays" type="number" class="flex-item mr-20" label="中班天数"></input-box>
                    <input-box v-model="form.nightDays" type="number" class="flex-item mr-20" label="夜班天数"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.workOvertimeDays" type="number" class="flex-item mr-20" label="加班天数"></input-box>
                    <input-box v-model="form.absenteeismTimes" type="number" class="flex-item mr-20" label="旷工天数"></input-box>
                    <input-box v-model="form.businessTravelDays" type="number" class="flex-item mr-20" label="出差天数"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.compassionateLeaveDays" type="number" class="flex-item mr-20" label="事假天数"></input-box>
                    <input-box v-model="form.lateTimes" type="number" class="flex-item mr-20" label="迟到次数"></input-box>
                    <input-box v-model="form.leaveEarlyTimes" type="number" class="flex-item mr-20" label="早退次数"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.lateAndLeaveTimes" type="number" class="flex-item mr-20" label="迟到早退次数"></input-box>
                    <input-box v-model="form.sickLeaveDays" type="number" class="flex-item mr-20" label="病假天数"></input-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.attendYear" class="flex-item mr-20" :list="yearList" label="年份"></select-box>
                    <select-box v-model="form.attendMonth" class="flex-item mr-20" :list="monthList" label="月份"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="uploadFlag" title="导入" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <el-upload class="upload-demo" ref="upload" :on-success="uploadSuccess" :limit="1" action="/haolifa/pay-work-attendance/import" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="warning">选取文件</el-button>
                </el-upload>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="submitUpload">上传</el-button>
                <el-button class="mr-20" size="mini" @click="uploadFlag=false">关闭</el-button>
            </div>
        </layer>
        <layer v-if="exportFlag" :title="'导出'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <select-box v-model="exportForm.attendYear" class="flex-item mr-20" :list="yearList" label="年份"></select-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <select-box v-model="exportForm.attendMonth" class="flex-item mr-20" :list="monthList" label="月份"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="exportFlag=false">取消</btn>
                <btn flat color="#008eff" @click="downloadOut()">确定</btn>
            </div>
        </layer>
        <layer v-if="buildFlag" :title="'考勤生成'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
                <div class="flex ml-20 mr-20">
                    <select-box v-model="buildForm.attendYear" class="flex-item mr-20" :list="yearList" label="年份"></select-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <select-box v-model="buildForm.attendMonth" class="flex-item mr-20" :list="monthList" label="月份"></select-box>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="buildFlag=false">取消</btn>
                <btn flat color="#008eff" @click="buildSave()">确定</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "khzb-list",
    components: { DataList },
    data() {
        return {
            filter: {
                attendYear: new Date().getFullYear(),
                attendMonth:
                    new Date().getMonth() + 1 > 9
                        ? new Date().getMonth() + 1
                        : "0" + (new Date().getMonth() + 1),
                absenteeismTimes: 0,
                attendanceDays: 0,
                businessTravelDays: 0,
                compassionateLeaveDays: 0,
                createUser: "",
                department: "",
                endCreateTime: "",
                lateAndLeaveTimes: 0,
                lateTimes: 0,
                leaveEarlyTimes: 0,
                middleDays: 0,
                nightDays: 0,
                serial: 0,
                sickLeaveDays: 0,
                startCreateTime: "",
                userName: "",
                workOvertimeDays: 0
            },
            layer: false,
            exportFlag: false,
            buildFlag: false,
            exportForm: {
                attendYear: "",
                attendMonth: ""
            },
            buildForm: {
                attendYear: "",
                attendMonth: ""
            },
            form: {
                attendYear: "",
                attendMonth: "",
                absenteeismTimes: "",
                attendanceDays: "",
                businessTravelDays: "",
                compassionateLeaveDays: "",
                createUser: "",
                department: "",
                endCreateTime: "",
                id: "",
                lateAndLeaveTimes: "",
                lateTimes: "",
                leaveEarlyTimes: "",
                middleDays: "",
                nightDays: "",
                pageNum: "",
                pageSize: "",
                remark: "",
                serial: "",
                sickLeaveDays: "",
                startCreateTime: "",
                userName: "",
                workOvertimeDays: ""
            },
            loading: false,
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
            ],
            yearList: [
                { value: "2018", text: "2018" },
                { value: "2019", text: "2019" },
                { value: "2020", text: "2020" },
                { value: "2021", text: "2021" },
                { value: "2022", text: "2022" },
                { value: "2023", text: "2023" },
                { value: "2024", text: "2024" },
                { value: "2025", text: "2025" },
                { value: "2026", text: "2026" },
                { value: "2027", text: "2027" },
                { value: "2028", text: "2028" },
                { value: "2029", text: "2029" }
            ],
            uploadFlag: false,
            fileList: []
        };
    },
    mounted() {},
    methods: {
        flush() {
            this.filter = {
                attendYear: new Date().getFullYear(),
                attendMonth:
                    new Date().getMonth() + 1 > 9
                        ? new Date().getMonth() + 1
                        : "0" + (new Date().getMonth() + 1),
                absenteeismTimes: 0,
                attendanceDays: 0,
                businessTravelDays: 0,
                compassionateLeaveDays: 0,
                createUser: "",
                department: "",
                endCreateTime: "",
                lateAndLeaveTimes: 0,
                lateTimes: 0,
                leaveEarlyTimes: 0,
                middleDays: 0,
                nightDays: 0,
                serial: 0,
                sickLeaveDays: 0,
                startCreateTime: "",
                userName: "",
                workOvertimeDays: 0
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.layer = true;
            this.form.id = item.id;
            this.form.userName = item.userName;
            this.form.department = item.department;
            this.form.middleDays = item.middleDays;
            this.form.nightDays = item.nightDays;
            this.form.attendanceDays = item.attendanceDays;
            this.form.workOvertimeDays = item.workOvertimeDays;
            this.form.absenteeismTimes = item.absenteeismTimes;
            this.form.businessTravelDays = item.businessTravelDays;
            this.form.compassionateLeaveDays = item.compassionateLeaveDays;
            this.form.lateTimes = item.lateTimes;
            this.form.leaveEarlyTimes = item.leaveEarlyTimes;
            this.form.lateAndLeaveTimes = item.lateAndLeaveTimes;
            this.form.sickLeaveDays = item.sickLeaveDays;
            this.form.attendYear = item.attendYear;
            this.form.attendMonth = item.attendMonth;
        },
        build() {
            this.buildFlag = true;
        },
        exportOut() {
            this.exportFlag = true;
        },
        downloadOut() {
            if (!this.exportForm.attendYear || !this.exportForm.attendMonth) {
                this.$toast("请选择年月");
                return;
            }
            const a = document.createElement("a"); // 创建a标签
            a.setAttribute("download", ""); // download属性
            a.setAttribute(
                "href",
                `/haolifa/pay-work-attendance/export?attendMonth=${
                    this.exportForm.attendMonth
                }&attendYear=${this.exportForm.attendYear}`
            );
            a.click();
            this.exportFlag = false;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下考勤人员吗？<br><b>${item.userName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/pay-work-attendance/del/${item.id}`)
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
        buildSave() {
            if (!this.buildForm.attendYear || !this.buildForm.attendMonth) {
                this.$toast("请选择年月");
                return;
            }
            this.$http
                .get(
                    "/haolifa/pay-work-attendance/createAttendance?attendYear=" +
                        this.buildForm.attendYear +
                        "&attendMonth=" +
                        this.buildForm.attendMonth
                )
                .then(res => {
                    this.$toast("生成成功");
                    this.buildFlag = false;
                    this.$refs.list.update(true);
                    this.loading = false;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/pay-work-attendance/edit"
                : "/haolifa/pay-work-attendance/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.layer = false;
                    this.$toast("保存成功");
                    this.close();
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
                absenteeismTimes: "",
                attendanceDays: "",
                businessTravelDays: "",
                compassionateLeaveDays: "",
                createUser: "",
                department: "",
                endCreateTime: "",
                id: "",
                lateAndLeaveTimes: "",
                lateTimes: "",
                leaveEarlyTimes: "",
                middleDays: "",
                nightDays: "",
                pageNum: "",
                pageSize: "",
                remark: "",
                serial: "",
                sickLeaveDays: "",
                startCreateTime: "",
                userName: "",
                workOvertimeDays: ""
            };
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
        .layer-text {
            .el-date-editor {
                .el-input__inner {
                    border: 0;
                }
            }
        }
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
