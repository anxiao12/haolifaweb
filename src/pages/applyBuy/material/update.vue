<template>
    <div class="apply-buy-update">
        <div class="content mt-20">
            <div class="title b f-18 ml-10">编辑送检单</div>
            <div class="flex ml-20 mr-20">
                <date-picker v-model="form.arrivalTime" hint="必填" class="flex-item" label="到货时间" style="margin-right: 20px;"></date-picker>
                <input-box v-model="form.supplierName" class="flex-item ml-20 mr-20" label="供应商名称"></input-box>
            </div>
            <div class="flex ml-20 mr-20">
                <input-box v-model="form.batchNumber" class="flex-item mr-20" label="批次号"></input-box>
                <input-box v-model="form.purchaseNo" class="flex-item ml-20 mr-20" label="合同号"></input-box>
                <input-box v-model="form.freight" type="number" class="flex-item ml-20 mr-20" label="费用"></input-box>
            </div>
            <div class="flex">
                <upload-box btnText="质量保证书" :fileShow="false" :fileList="fileList" :onchange="uploadFile" :onremove="removeFile" :multiple="multiple" style="width: 50%"></upload-box>
            </div>
            <div v-for="(item,i) in resFileList" :key="i" style="margin-left:20px;margin-top:5px;">
                <div class="flex">
                    <a :href="item.fileUrl" style="text-decoration:none ;out-line: none ;color:#ccc" target="_blank">{{item.fileName}}</a>
                    <icon-btn small @click="resFileList.splice(i, 1)">close</icon-btn>
                </div>
            </div>
            <div class="b ml-20" style="margin: 20px 10px 10px;">送检列表</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.items" :key="i">
                <div class="flex-item">
                    <div class="flex ml-20 mr-20">
                        <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="物料图号" hint="必填"></input-box>
                        <input-box v-model="item.materialName" class="flex-item mr-10" label="物料名称" hint="必填"></input-box>
                        <input-box v-model="item.deliveryNumber" type="number" class="mr-10" label="送检数量" hint="必填"></input-box>
                        <!--<input-box v-model="item.purchaseNo" class="mr-10" label="合同编号" hint="必填"></input-box>-->
                        <input-box v-model="item.purchaseNumber" type="number" class="mr-10" label="采购数量" hint="必填"></input-box>
                    </div>
                    <div class="flex ml-20 mr-20">
                        <input-box v-model="item.requirements" class="flex-item mr-10" label="材质要求" hint="选填"></input-box>
                        <input-box v-model="item.specification" class="flex-item mr-10" label="规格" hint="选填"></input-box>
                        <input-box v-model="item.purchasePrice" class="flex-item mr-10" label="单价"></input-box>
                    </div>
                    <div class="flex ml-20 mr-20">
                        <input-box v-model="item.unit" class="flex-item mr-10" label="单位" hint="选填"></input-box>
                        <input-box v-model="item.remark" class="flex-item" label="备注"></input-box>
                    </div>
                </div>
                <div v-if="form.items.length > 1">
                    <icon-btn small @click="form.items.splice(i, 1)">close</icon-btn>
                </div>
            </div>
            <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加送检物料</span>
                </div>
            </div>
            <div class="flex ml-20 mt-20">
                <btn big class="mr-20" @click="submit(1)">保存</btn>
                <btn big class="mr-20" @click="submit(2)">保存并发起</btn>
                <btn big flat @click="back">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
import fileToBase64 from "../../../utils/fileToBase64";
import moment from "moment";
export default {
    name: "apply-buy-update",
    data() {
        return {
            id: 0,
            form: {
                arrivalTime: "",
                supplierName: "",
                batchNumber: "",
                status: 1,
                purchaseNo: "",
                accessorys: [],
                freight: "",
                items: [
                    {
                        deliveryNumber: "",
                        materialGraphNo: "",
                        materialName: "",
                        purchaseNo: "",
                        purchaseNumber: "",
                        purchasePrice: 0,
                        remark: "",
                        specification: "",
                        unit: ""
                    }
                ]
            },
            fileList: [],
            multiple: true,
            resFileList: []
        };
    },
    activated() {
        this.fileList = [];
        this.multiple = true;
        this.resFileList = [];
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "material-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "material-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.id = id;
            this.$http
                .get(`/haolifa/material-inspect/info/${id}`)
                .then(res => {
                    res.inspect.arrivalTime = moment(
                        res.inspect.arrivalTime
                    ).format("YYYY-MM-DD");
                    this.form.arrivalTime = res.inspect.arrivalTime;
                    this.form.supplierName = res.inspect.supplierName;
                    this.form.batchNumber = res.inspect.batchNumber;
                    this.form.purchaseNo = res.inspect.purchaseNo;
                    this.form.freight = res.inspect.freight;
                    this.form.items = res.items.map(item => {
                        return {
                            deliveryNumber: item.deliveryNumber,
                            materialGraphNo: item.materialGraphNo,
                            materialName: item.materialName,
                            purchaseNo: item.purchaseNo,
                            purchaseNumber: item.purchaseNumber,
                            remark: item.remark,
                            specification: item.specification,
                            unit: item.unit,
                            purchasePrice: item.purchasePrice,
                            specification: item.specification,
                            requirements: item.requirements
                        };
                    });
                    if (res.inspect.blueprints != "") {
                        this.resFileList = JSON.parse(res.inspect.blueprints);
                        // console.log('fileList',this.resFileList);
                        this.fileList = this.resFileList.map(item => {
                            return item.fileUrl;
                        });
                    }
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        addItem() {
            this.form.items.push({
                deliveryNumber: "",
                materialGraphNo: "",
                materialName: "",
                purchaseNumber: "",
                remark: "",
                specification: "",
                unit: ""
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
                        let name;
                        this.resFileList.push({
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
                this.resFileList.splice(i, 1);
                resolve();
            });
        },
        back() {
            this.$http
                .get(`/haolifa/material-inspect/delete/${this.id}`)
                .then(res => {
                    this.$store.commit(
                        "DELMENUTABS",
                        "/applyBuy-material/edit"
                    );
                    this.$router.push("/applyBuy-material/addList");
                });
        },
        submit(status) {
            // alert(this.form.id)
            // alert(this.form.inspectNo)
            const requireItem = {
                arrivalTime: "到货日期",
                supplierName: "供应商名称",
                materialGraphNo: "物料图号",
                deliveryNumber: "送检数量",
                purchaseNumber: "采购数量",
                requirements: "材质要求",
                specification: "规格",
                unit: "单位"
                // purchaseNo: "合同编号"
            };
            const { items, arrivalTime } = this.form;
            if (!arrivalTime) {
                this.$toast("请填写到货时间");
                return;
            }
            // items.forEach((item, i) => {
            //     for (let key in item) {
            //         if (requireItem[key] && !item[key]) {
            //             this.$toast(`请填写第 ${i + 1} 项 ${requireItem[key]}`)
            //             return
            //         }
            //     }
            // })
            this.form.status = status;
            this.form.accessorys = this.resFileList;
            this.$http
                .post(`/haolifa/material-inspect/update/${this.id}`, this.form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.$store.commit(
                        "DELMENUTABS",
                        "/applyBuy-material/edit"
                    );
                    this.$router.push("/applyBuy-material/addList");
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        }
    }
    // ap_20181115201511123488
};
</script>

<style lang="less">
.apply-buy-add {
    padding: 20px;
    .card {
        padding: 10px;
        margin: 20px 0;
        background: #f5f5f5;
    }
    .content {
        max-width: 1000px;
        margin: 0 auto;
    }
}
</style>
