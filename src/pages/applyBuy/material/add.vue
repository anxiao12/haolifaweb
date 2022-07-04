<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18">新增送检单</div>
            <div class="flex">
                <date-picker v-model="form.arrivalTime" hint="必填" class="flex-item" label="到货时间" style="margin-right: 20px;"></date-picker>
                <input-box v-model="form.supplierName" class="flex-item" label="供应商名称" style="margin-right: 20px;"></input-box>
            </div>
            <div class="flex">
                <input-box v-model="form.batchNumber" class="flex-item mr-20" label="批次号"></input-box>
                <input-box v-model="form.purchaseNo" class="flex-item ml-20 mr-20" label="合同号"></input-box>
                <input-box v-model="form.freight" type="number" class="flex-item ml-20 mr-20" label="费用"></input-box>
            </div>
            <div class="flex">
                <upload-box btnText="质量保证书" :fileList="fileList" :onchange="uploadFile" :onremove="removeFile" :multiple="multiple" style="width: 50%"></upload-box>
            </div>
            <div class="b" style="margin: 20px 0 10px;">送检列表</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.items" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <input-box v-model="item.materialGraphNo" class="flex-item mr-10" label="物料图号" hint="必填"></input-box>
                        <input-box v-model="item.materialName" class="flex-item mr-10" label="物料名称" hint="必填"></input-box>
                        <input-box v-model="item.deliveryNumber" type="number" class="mr-10" label="送检数量" hint="必填"></input-box>
                        <!--<input-box v-model="item.purchaseNo" class="mr-10" label="合同编号" hint="必填"></input-box>-->
                        <input-box v-model="item.purchaseNumber" type="number" class="mr-10" label="采购数量" hint="必填"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.requirements" class="flex-item mr-10" label="材质要求" hint="选填"></input-box>
                        <input-box v-model="item.specification" class="flex-item mr-10" label="规格" hint="选填"></input-box>
                        <input-box v-model="item.purchasePrice" class="flex-item mr-10" label="单价"></input-box>
                    </div>
                    <div class="flex">
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
            <div class="flex mr-20">
                <btn big class="mr-20" @click="submit(1)">保存</btn>
                <btn big class="mr-20" @click="submit(2)">保存并发起</btn>
                <btn big flat @click="$store.commit('DELMENUTABS','/applyBuy-material/add');$router.push('/applyBuy-material/addList')">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
import fileToBase64 from "../../../utils/fileToBase64";
import moment from "moment";
export default {
    name: "apply-buy-add",
    data() {
        return {
            form: {
                arrivalTime: "",
                supplierName: "",
                batchNumber: "",
                purchaseNo: "",
                freight: 0,
                status: 1,
                items: [
                    {
                        deliveryNumber: "",
                        materialGraphNo: "",
                        materialName: "",
                        // purchaseNo: "",
                        purchaseNumber: "",
                        remark: "",
                        specification: "",
                        unit: "",
                        purchasePrice: 0
                    }
                ],
                accessorys: []
            },
            fileList: [],
            multiple: true,
            resFileList: []
        };
    },
    activated() {
        this.form = {
            arrivalTime: "",
            supplierName: "",
            batchNumber: "",
            purchaseNo: "",
            freight: 0,
            status: 1,
            items: [
                {
                    deliveryNumber: "",
                    materialGraphNo: "",
                    materialName: "",
                    // purchaseNo: "",
                    purchaseNumber: "",
                    remark: "",
                    specification: "",
                    unit: "",
                    purchasePrice: 0
                }
            ],
            accessorys: []
        };
        this.fileList = [];
        this.multiple = true;
        this.resFileList = [];
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "material-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/material-inspect/info/${id}`)
                .then(res => {
                    res.inspect.arrivalTime = moment(
                        res.inspect.arrivalTime
                    ).format("YYYY-MM-DD");
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                        if (res[key] == undefined)
                            this.form[key] = res.inspect[key];
                        // console.log('对比',key,res[key],res.inspect[key]);
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
                // purchaseNo: "",
                purchaseNumber: "",
                remark: "",
                specification: "",
                unit: "",
                purchasePrice: 0
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
            console.log(i.length);
            return new Promise((resolve, reject) => {
                this.resFileList.splice(i, 1);
                console.log(this.resFileList);
                resolve();
            });
        },
        submit(status) {
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
                .post("/haolifa/material-inspect/save", this.form)
                .then(res => {
                    this.loading = false;
                    this.$toast("提交成功");
                    this.$store.commit("DELMENUTABS", "/applyBuy-material/add");
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
