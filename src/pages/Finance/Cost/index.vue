<template>
    <div class="page-cost">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.department" @change="$refs.list.update(true)" placeholder="部门" style="width: 200px;">
                费用类别：
                <select v-model="filter.classifyName" class="f-14 ml-20" @change="queryChange">
                    <option value>全部</option>
                    <option v-for="item in expensesClassifyList" :value="item.value" v-bind:key="item.value">{{item.value}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;margin-right:20px;pointer-events:none;">arrow_drop_down</i>
                费用类别明细：
                <select v-model="filter.secondClassifyName" class="f-14 ml-20" @change="$refs.list.update(true)">
                    <option value>全部</option>
                    <option v-for="item in secondClassifyList" :value="item.value" v-bind:key="item.value">{{item.value}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="layer=true;secondClassifyList2=[]">添加费用</btn>
            <btn class="b" flat color="#008eff" @click="exportExcel">费用导出</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list class="f-14" ref="list" :param="filter" method="post" :page-size="15" url="/haolifa/expenses/list">
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
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
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
                    <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑 |</a>
                        <a href="javascript:;" style="margin-right: 3px" class="red" @click="remove(item)">删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer v-if="layer" :title="form.id ? '编辑费用' : '新增费用'" width="50%">
            <div class="layer-text" style="padding-bottom: 150px;">
                <input-box v-model="form.commitUser" hint="必填" label="报销人"></input-box>
                <input-box v-model="form.department" hint="必填" label="报销部门"></input-box>
                <input-box v-model="form.summary" hint="必填" label="报销摘要"></input-box>
                <input-box v-model="form.voucherNo" hint="必填" label="凭证号"></input-box>
                <select-box :list="expensesClassifyList" @change="exChange" v-model="form.expensesClassify" label="费用类别"></select-box>
                <select-box :list="secondClassifyList2" v-model="form.secondClassify" label="费用类别明细"></select-box>
                <input-box type="number" v-model="form.totalAmount" hint="必填" label="总费用"></input-box>
                <date-picker v-model="form.dataDate" class="flex-item" label="费用产生时间" style="margin-right: 20px;"></date-picker>
                <input-box v-model="form.remark" label="备注"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
        <layer v-if="exportLayer" :title="'导出'" width="30%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportForm.startDate" hint="必填" class="flex-item" label="开始时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <date-picker v-model="exportForm.endDate" hint="必填" class="flex-item" label="结束时间"></date-picker>
                </div>
                <div class="flex ml-20 mr-20">
                    <input-box v-model="exportForm.department" class="flex-item" label="部门"></input-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <select-box v-model="exportForm.firstClassifyName" class="flex-item" @change="exportChange" :list="expensesClassifyList" label="费用类别"></select-box>
                </div>
                <div class="flex ml-20 mr-20">
                    <select-box v-model="exportForm.secondClassifyName" class="flex-item" :list="secondClassifyList" label="费用类别明细"></select-box>
                </div>
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
    name: "page-cost",
    components: { DataList },
    data() {
        return {
            layer: false,
            form: {
                id: "",
                commitUser: "",
                expensesClassify: "",
                secondClassify: "",
                totalAmount: "",
                summary: "",
                department: "",
                voucherNo: "",
                remark: "",
                dataDate: ""
            },
            filter: {
                classifyName: "",
                department: "",
                secondClassifyName: ""
            },
            expensesClassifyList: [],
            secondClassifyList: [],
            secondClassifyList2: [],
            exList: [],
            exportLayer: false,
            exportForm: {
                firstClassifyName: "",
                department: "",
                secondClassifyName: "",
                startDate: "",
                endDate: ""
            }
        };
    },
    created() {
        this.getDic();
    },
    methods: {
        flush() {
            this.filter = {
                classifyName: "",
                department: "",
                secondClassifyName: ""
            };
            this.$refs.list.update(true);
        },
        getDic() {
            this.$http
                .get("/haolifa/sys-dict/getDictListByType/SUBJECTS_TYPE")
                .then(res => {
                    this.expensesClassifyList = res.map(item => {
                        return {
                            text: item.desc,
                            value: item.desc,
                            code: item.code
                        };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        queryChange() {
            let id,
                ex = this.filter.classifyName;
            this.secondClassifyList = [];
            this.expensesClassifyList.forEach(item => {
                if (item.text == ex) id = item.code;
            });
            if (id) this.subjectsTypeChange(id, 1);
            // this.$refs.list.update(true);
        },
        subjectsTypeChange(type, num) {
            this.$http
                .post("/haolifa/finance/subjects/getSubjectsListAllP", {
                    pageNum: 1,
                    pageSize: 1000,
                    subjectsType: type
                })
                .then(res => {
                    if (num === 1) {
                        this.secondClassifyList = res.map(item => {
                            return { text: item.name, value: item.name };
                        });
                    } else {
                        this.secondClassifyList2 = res.map(item => {
                            return { text: item.name, value: item.name };
                        });
                    }
                });
        },
        edit(item) {
            for (let key in this.form) {
                this.form[key] = item[key];
            }
            if (item.dataYear && item.dataMonth) {
                this.form.dataDate = item.dataYear + "-" + item.dataMonth;
            } else {
                this.form.dataDate = "";
            }

            let id;
            this.expensesClassifyList.forEach(item => {
                if (item.text == this.form.expensesClassify) id = item.code;
            });
            if (id) this.subjectsTypeChange(id, 2);
            this.layer = true;
        },
        exChange() {
            let id,
                ex = this.form.expensesClassify;
            this.secondClassifyList2 = [];
            this.expensesClassifyList.forEach(item => {
                if (item.text == ex) id = item.code;
            });
            if (id) this.subjectsTypeChange(id, 2);
        },
        vertify() {
            for (let key in this.form) {
                let item = this.form[key];
                !item &&
                    item !== 0 &&
                    key !== "id" &&
                    key !== "orderNo" &&
                    key !== "remark";
                if (
                    !item &&
                    item !== 0 &&
                    key !== "id" &&
                    key !== "remark" &&
                    key !== "secondClassify"
                ) {
                    // if (key !== "id" || key !== "remark" || key !== "secondClassify") {
                    this.$toast("请输入完整信息");
                    return false;
                    // }
                }
            }
            return true;
        },
        submit() {
            if (!this.vertify()) return;
            const { form } = this;
            form.totalAmount = +form.totalAmount;
            this.$http
                .post(
                    "/haolifa/expenses/" + (form.id ? "update" : "save"),
                    form
                )
                .then(res => {
                    this.$refs.list.update(true);
                    this.cancel();
                    this.$toast("保存成功");
                })
                .catch(e => {
                    this.$toast(e.message || e.meg);
                });
        },
        cancel() {
            this.form = {
                id: "",
                commitUser: "",
                expensesClassify: "",
                secondClassify: "",
                totalAmount: "",
                summary: "",
                department: "",
                voucherNo: "",
                dataDate: "",
                remark: ""
            };
            this.layer = false;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下发票记录吗？<br>
          提交人：<b>${item.commitUser}</b><br>
          类别：<b>${item.expensesClassify}</b><br>
          总费用：<b>￥${item.totalAmount}</b><br>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/expenses/delete/${item.id}`)
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
        exportExcel() {
            this.exportLayer = true;
            this.exportForm = {
                firstClassifyName: "",
                department: "",
                secondClassifyName: "",
                startDate: "",
                endDate: ""
            };
        },
        exportChange() {
            let id,
                ex = this.exportForm.firstClassifyName;
            this.secondClassifyList = [];
            this.exList.forEach(item => {
                if (item.text == ex) id = item.value;
            });
            if (id)
                this.$http
                    .get(`/haolifa/expenses/classify?pId=${id}`)
                    .then(res => {
                        this.secondClassifyList = res.map(item => {
                            return {
                                value: item.classifyName,
                                text: item.classifyName
                            };
                        });
                    });
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
                `/haolifa/export/expenses?startDate=${
                    this.exportForm.startDate
                }&endDate=${this.exportForm.endDate}&firstClassifyName=${
                    this.exportForm.firstClassifyName
                }&department=${this.exportForm.department}&secondClassifyName=${
                    this.exportForm.secondClassifyName
                }`
            );
            a.click();
            this.exportLayer = false;
        }
    }
};
</script>

<style lang="less">
.page-cost {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>
