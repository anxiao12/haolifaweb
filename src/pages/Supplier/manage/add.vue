<template>
    <div class="page-supplier-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}供应商</div>
            <div class="flex-v-center">
                <input-box v-model="form.suppilerName" class="flex-item" label="企业名称"></input-box>
            </div>
            <div class="flex-v-center">
                <select-box v-model="form.nature" class="mr-20" label="企业性质" :list="natureList"></select-box>
                <input-box v-model="form.address" class="flex-item" label="地址"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.website" class="flex-item mr-20" label="企业网址"></input-box>
                <input-box v-model="form.phone" class="flex-item mr-20" label="企业电话"></input-box>
                <input-box v-model="form.postcode" type="number" class="flex-item mr-20" label="邮编"></input-box>
                <input-box v-model="form.fax" class="flex-item" label="传真"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.legalPerson" class="mr-20" label="法人姓名"></input-box>
                <input-box v-model="form.legalPersonPhone" class="mr-20" label="法人电话"></input-box>
                <input-box v-model="form.supplierProduct" class="flex-item" label="供应商提供产品"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.totalFactoryArea" type="number" label="工厂总面积"></input-box>
                <span class="mr-20">平米</span>
                <input-box v-model="form.totalArchitArea" type="number" label="建筑物面积"></input-box>
                <span class="mr-20">平米</span>
                <select-box v-model="form.workType" label="班次" :list="workTypeList"></select-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.processRoute" class="flex-item" label="工艺路线"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.evaluation" class="flex-item" label="供应商评价"></input-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.suppilerNo" class="mr-20" label="供应商编号" style="width: 240px;"></input-box>
                <input-box v-model="form.suppilerPreparer" class="mr-20" label="填表人"></input-box>
                <input-box v-model="form.responsiblePerson" label="负责人"></input-box>
            </div>
            <div class="flex">
                <upload-box btnText="供应商附件上传" :fileList="fileList" :multiple="multiple" :onchange="uploadFile" :onremove="removeFile" style="width: 50%"></upload-box>
            </div>
            <div class="f-14 c-6 b" style="margin: 25px 0 0;">员工情况</div>
            <div class="flex-v-center">
                <input-box v-model="form.staffInfo.totalWorkers" type="number" label="员工总人数"></input-box>
                <span class="mr-20">人</span>
                <input-box v-model="form.staffInfo.managerWorkers" type="number" label="管理人员"></input-box>
                <span class="mr-20">人</span>
                <input-box v-model="form.staffInfo.productionWorkers" type="number" label="生产工人"></input-box>
                <span class="mr-20">人</span>
                <input-box v-model="form.staffInfo.technicistWorkers" type="number" label="技术人员"></input-box>
                <span>人</span>
            </div>
            <div>
                <div class="f-14 c-6 b" style="margin: 25px 0 10px;">资格证书</div>
                <div class="credentials-form">
                    <check-box v-model="form.credentialsInfo.charter" name="credentials" text="营业执照"></check-box>
                    <check-box v-model="form.credentialsInfo.tax" name="credentials" text="税务登记证书"></check-box>
                    <check-box v-model="form.credentialsInfo.legalPersonCode" name="credentials" text="法人代码证书"></check-box>
                    <check-box v-model="form.credentialsInfo.bankOpenAccount" name="credentials" text="银行开户声明"></check-box>
                    <check-box v-model="form.credentialsInfo.credibilityLetter" name="credentials" text="银行资信证明"></check-box>
                    <check-box v-model="form.credentialsInfo.manufacturerAuthorization" name="credentials" text="制造商授权证书"></check-box>
                    <check-box v-model="form.credentialsInfo.productCertification" name="credentials" text="产品鉴定证书"></check-box>
                    <check-box v-model="form.credentialsInfo.productPermit" name="credentials" text="生产许可证书"></check-box>
                    <check-box v-model="form.credentialsInfo.importAndExportCertification" name="credentials" text="进出口企业资格证书"></check-box>
                    <check-box v-model="form.credentialsInfo.otherCertification" name="credentials" text="相关体系认证证书"></check-box>
                </div>
            </div>
            <div>
                <div class="f-14 c-6 b" style="margin: 25px 0 0;">质量保障体系</div>
                <div class="flex-v-center">
                    <check-box v-model="form.qualityAssuranceInfo.buildQualitySystem" name="qualityAssurance" class="mr-20" text="是否建立质量保障体系"></check-box>
                    <check-box v-model="form.qualityAssuranceInfo.passThirdAttestation" name="qualityAssurance" class="mr-20" text="是否通过第三方认证"></check-box>
                    <input-box v-model="form.qualityAssuranceInfo.secondConfirm" class="flex-item" label="第二方确认单位"></input-box>
                </div>
            </div>
            <div class="f-14 c-6 b" style="margin: 25px 0 0;">财务状况</div>
            <div class="flex-v-center">
                <input-box v-model="form.financialInfo.netWorth" type="number" label="企业净值"></input-box>
                <span class="mr-20">万元</span>
                <input-box v-model="form.financialInfo.liabilities" type="number" label="目前负债"></input-box>
                <span class="mr-20">万元</span>
                <input-box v-model="form.financialInfo.asset" type="number" label="目前资产"></input-box>
                <span>万元</span>
            </div>
            <div class="f-14 c-6 b" style="margin: 10px 0 5px;">近三年经营情况</div>
            <div class="flex-v-center" v-for="(item, i) in form.financialInfo.businessStateList" :key="item.id">
                <select-box v-model="item.year" class="mr-20" label="年份" :list="yearList"></select-box>
                <input-box v-model="item.sale" type="number" label="年销售额"></input-box>
                <span class="mr-20">万元</span>
                <input-box v-model="item.profit" type="number" label="利润"></input-box>
                <span class="mr-20">万元</span>
                <input-box class="flex-item mr-20" v-model="item.desc" label="备注"></input-box>
                <icon-btn small v-if="form.financialInfo.businessStateList.length > 1" @click="removeBusinessStateList(i)">close</icon-btn>
            </div>
            <div>
                <icon-btn v-if="form.financialInfo.businessStateList.length < 3" bg small v-tooltip="'添加经营情况'" @click="addBusinessStateList">add</icon-btn>
            </div>
            <div class="f-14 c-6 b" style="margin: 10px 0 5px;">主要机构</div>
            <div class="flex-v-center" v-for="(item, i) in form.mainOrgan" :key="item.id">
                <input-box v-model="item.department" class="flex-item mr-20" label="部门名称"></input-box>
                <input-box v-model="item.leader" class="mr-20" label="负责人"></input-box>
                <input-box v-model="item.phone" class="mr-20" label="电话"></input-box>
                <input-box v-model="item.fax" class="mr-20" label="传真"></input-box>
                <icon-btn small v-if="form.mainOrgan.length > 1" @click="removeOragn(i)">close</icon-btn>
            </div>
            <div>
                <icon-btn bg small v-tooltip="'添加部门'" @click="addOragn">add</icon-btn>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
                <btn big flat @click="clear">清空</btn>
            </div>
        </div>
        <layer v-if="loading">
            <div class="abs t-center" style="padding: 20px;">
                <loading size="30"/>
                <div style="margin-top: 10px;">正在保存</div>
            </div>
        </layer>
    </div>
</template>

<script>
import fileToBase64 from "@/utils/fileToBase64";
import form from "./form";
import parseJson from "@/utils/parseJson";
export default {
    name: "page-supplier-add",
    data() {
        const now = new Date();
        const year = now.getFullYear();
        const yearList = [];
        for (let i = 0; i < 4; i++) {
            yearList.push({ text: year - i, value: year - i + "" });
        }
        return {
            loading: false,
            multiple: true,
            fileList: [],
            accessories: [],
            workTypeList: [
                { text: "正常", value: 0 },
                { text: "两班倒", value: 1 },
                { text: "三班倒", value: 2 }
            ],
            natureList: [
                { text: "国有", value: 0 },
                { text: "三资", value: 1 },
                { text: "集体", value: 2 },
                { text: "联营", value: 3 },
                { text: "私营", value: 4 }
            ],
            yearList,
            form: JSON.parse(JSON.stringify(form))
        };
    },
    activated() {
        this.form = JSON.parse(JSON.stringify(form));
        this.fileList = [];
        this.accessories = [];
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "supplier-edit")
            this.getInfo(id);
    },
    mounted() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "supplier-edit")
            this.getInfo(id);
    },
    methods: {
        addBusinessStateList() {
            this.form.financialInfo.businessStateList.push({
                desc: "",
                profit: "",
                sale: "",
                year: ""
            });
        },
        removeBusinessStateList(index) {
            this.form.financialInfo.businessStateList.splice(index, 1);
        },
        addOragn() {
            this.form.mainOrgan.push({
                department: "",
                fax: "",
                leader: "",
                phone: ""
            });
        },
        uploadFile(file, fileList) {
            this.loading = true;
            this.loadingMsg = "正在上传";
            fileToBase64(file.source).then(base64Str => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name
                    })
                    .then(res => {
                        this.accessories.push({
                            fileName: file.name,
                            fileUrl: res
                        });
                        this.loading = false;
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        removeFile(fileList, i) {
            return new Promise((resolve, reject) => {
                this.accessories.splice(i, 1);
                resolve();
            });
        },
        removeOragn(index) {
            this.form.mainOrgan.splice(index, 1);
        },
        getInfo(id) {
            this.$http
                .get(`/haolifa/supplier/info?id=${id}`)
                .then(res => {
                    res = parseJson(res, [
                        "credentialsInfo",
                        "financialInfo",
                        "mainOrgan",
                        "qualityAssuranceInfo",
                        "staffInfo"
                    ]);
                    // if (res.mainOrgan && res.mainOrgan.length) res.mainOrgan.forEach(item => { item.id = Math.random() })
                    // if (res.financialInfo && res.financialInfo.businessStateList && res.financialInfo.businessStateList.length) {
                    //   res.financialInfo.businessStateList.forEach(item => { item.id = Math.random().toString() })
                    // }
                    for (let key in this.form) {
                        this.form[key] = res[key];
                    }
                    this.accessories = [...res.accessories];
                    res.accessories.forEach(item => {
                        let fileObj = {
                            name: item.fileName,
                            size: "",
                            type: "",
                            status: "ready",
                            url: item.fileUrl,
                            uid: new Date().getTime(),
                            source: ""
                        };
                        this.fileList.push(fileObj);
                    });
                    // this.fileList = this.accessories = res.accessories;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        submit() {
            const { form } = this;
            form.accessories = this.accessories;
            const url = form.id ? "/supplier/edit" : "/supplier/add";
            this.loading = true;
            this.$http
                .post(`/haolifa/supplier/${form.id ? "update" : "save"}`, form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/supplier/addList");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            const url = this.form.id ? "/supplier/edit" : "/supplier/add";
            this.$store.commit("DELMENUTABS", url);
            this.$router.push("/supplier/addList");
        },
        clear() {
            this.$confirm({
                text: "确定要清空表单吗？",
                color: "darkorange",
                btns: ["取消", "清空"],
                yes: () => {
                    this.form = JSON.parse(JSON.stringify(form));
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-supplier-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
    .credentials-form {
        .check-box {
            margin-bottom: 8px;
            width: 150px;
        }
    }
}
</style>
