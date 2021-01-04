<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">{{!isAdd ? '编辑' : '新增'}}喷涂委托</div>
            <div class="flex">
                <input-box v-model="form.planner" class="flex-item mr-10" label="计划人" style="margin-right: 20px;"></input-box>
                <select-box :list="arrList" v-model="form.busType" class="flex-item mr-10" label="类别"></select-box>
            </div>

            <div class="b" style="margin: 20px 0 10px;">喷涂零件项</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.items" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <!-- <input-box v-model="item.materialName" class="flex-item mr-10" label="零件名称"></input-box> -->
                        <select-box :list="classifyNameList" @change="nameChange(i)" v-model="item.materialName" class="flex-item mr-10" label="零件名称"></select-box>
                        <select-box :list="item.tuhaoList" @change="getBatchNumber(i,item.materialGraphNo)" v-model="item.materialGraphNo" class="flex-item mr-10" label="零件图号"></select-box>
                        <!-- <input-box v-model="item.materialGraphNo" @blur="getBatchNumber(i,item.materialGraphNo)" class="flex-item mr-10" label="零件图号"></input-box> -->
                        <input-box v-model="item.model" class="flex-item mr-10" label="型号"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.specifications" class="flex-item mr-10" label="规格"></input-box>
                        <select-box :list="item.batchNumberList" v-model="item.batchNumber" class="flex-item mr-10" label="批次号"></select-box>
                        <input-box v-model="item.material" class="flex-item mr-10" label="材质"></input-box>
                    </div>
                    <div class="flex">
                        <select-box :list="item.sprayColorList" @change="createTuhao(i)" v-model="item.relationNo" class="flex-item mr-10" label="喷涂颜色"></select-box>
                        <input-box v-model="item.number" type="number" class="flex-item mr-10" label="数量"></input-box>
                        <date-picker v-model="item.completeTime" class="flex-item" label="完成时间" style="margin-right: 20px;"></date-picker>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.sprayedGraphNo" type="text" class="flex-item mr-10" label="完成后图号"></input-box>
                    </div>
                    <div class="flex">
                        <input-box v-model="item.specialRequires" class="flex-item" label="特殊要求" multi-line></input-box>
                        <input-box v-model="item.remark" class="flex-item" label="备注" multi-line></input-box>
                    </div>
                </div>
                <!-- <div v-if="form.items.length > 1">
                    <icon-btn small @click="form.items.splice(i, 1)">close</icon-btn>
                </div>-->
            </div>
            <!-- <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加喷涂零件项</span>
                </div>
            </div>-->
            <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "spray-add",
    data() {
        return {
            supplierInfoList: [],
            supplierList: [],
            sprayFtColorList: [],
            sprayFbColorList: [],
            classifyNameList: [
                { value: "阀体半成品", text: "阀体半成品" },
                { value: "阀板半成品", text: "阀板半成品" }
            ],
            arrList: [
                { value: "1", text: "订单需求" },
                { value: "2", text: "生产库存" }
            ],
            form: {
                id: null,
                planner: "",
                busType: "",
                items: [
                    {
                        materialName: "",
                        materialGraphNo: "",
                        completeTime: "",
                        material: "",
                        model: "",
                        specifications: "",
                        sprayColor: "",
                        specialRequires: "",
                        sprayedGraphNo: "",
                        remark: "",
                        number: "",
                        relationNo: "",
                        batchNumber: "",
                        batchNumberList: [],
                        sprayColorList: [],
                        tuhaoList: []
                    }
                ]
            },
            isAdd: true,
            sprayColorList: []
        };
    },
    created() {
        let { sprayNo } = this.$route.query;
        if (sprayNo != "") {
            this.isAdd = false;
            this.getInfo(sprayNo);
        }
        this.getSprayColorList();
        // this.getClassifyNameList();
    },
    methods: {
        getInfo(sprayNo) {
            this.$http
                .get(`/haolifa/spray/form/${sprayNo}`)
                .then(res => {
                    this.form = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getBatchNumber(i, materialGraphNo) {
            this.$http
                .get(
                    `/haolifa/store-room/material-batch-nos?graphNo=${materialGraphNo}`
                )
                .then(res => {
                    this.form.items[i].batchNumberList = res.map(item => {
                        return {
                            value: item.materialBatchNo,
                            text:
                                item.materialBatchNo + "(" + item.quantity + ")"
                        };
                    });
                    this.form.items.push({
                        materialName: "",
                        materialGraphNo: "",
                        completeTime: "",
                        material: "",
                        model: "",
                        specifications: "",
                        sprayColor: "",
                        specialRequires: "",
                        sprayedGraphNo: "",
                        remark: "",
                        number: "",
                        relationNo: ""
                    });
                    this.form.items.pop();
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        nameChange(index) {
            let data = { classifyId: "", materialName: "", type: 3 };
            if (this.form.items[index].materialName == "阀板半成品") {
                this.form.items[index].sprayColorList = this.sprayFbColorList;
                data.classifyId = "3";
            } else {
                data.classifyId = "1";
                this.form.items[index].sprayColorList = this.sprayFtColorList;
            }
            this.$http
                .post(`/haolifa/material/graphNo-list`, data)
                .then(res => {
                    this.form.items[index].tuhaoList = res.map(item => {
                        return { value: item, text: item };
                    });
                });
        },
        createTuhao(index) {
            let tuhao = this.form.items[index].materialGraphNo;
            let color = this.form.items[index].relationNo;
            this.form.items[index].sprayedGraphNo =
                tuhao.slice(
                    0,
                    tuhao.length - this.form.items[index].relationNo.length
                ) + color;
        },
        submit() {
            this.form.items.map(item => {
                delete item.batchNumberList;
                delete item.sprayColorList;
                delete item.tuhaoList;
                if (item.relationNo) {
                    item.sprayColor = this.getColor(item.relationNo);
                }
            });
            if (this.isAdd) {
                this.$http
                    .post(`/haolifa/spray/form`, this.form)
                    .then(res => {
                        this.$toast("更新成功");
                        this.$router.push("/spray/add-list");
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                    });
            } else {
                this.$http
                    .put(`/haolifa/spray/form`, this.form)
                    .then(res => {
                        this.$toast("更新成功");
                        this.$router.push("/spray/add-list");
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                    });
            }
        },
        addItem() {
            if (this.form.items.length == 5) {
                this.$toast("最多只能添加5条零件项");
                return;
            }
            this.form.items.push({
                materialName: "",
                materialGraphNo: "",
                completeTime: "",
                material: "",
                model: "",
                specifications: "",
                sprayColor: "",
                specialRequires: "",
                remark: "",
                number: "",
                relationNo: ""
            });
        },
        getSprayColorList() {
            this.$http
                .get(`/haolifa/spray/color/all`)
                .then(res => {
                    res.map(item => {
                        if (item.relationNo.length === 3) {
                            this.sprayFtColorList.push({
                                value: item.relationNo,
                                text: item.color
                            });
                        } else if (item.relationNo.length === 2) {
                            this.sprayFbColorList.push({
                                value: item.relationNo,
                                text: item.color
                            });
                        }
                        this.sprayColorList.push({
                            value: item.relationNo,
                            text: item.color
                        });
                    });
                    // this.sprayColorList = this.sprayFtColorList;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        // getClassifyNameList() {
        //     this.$http
        //         .get(`/haolifa/material/classify/list`)
        //         .then(res => {
        //             this.classifyNameList = res.map(item => {
        //                 return {
        //                     value: item.classifyName,
        //                     text: item.classifyName
        //                 };
        //             });
        //         })
        //         .catch(e => {
        //             this.$toast(e.msg || e.message);
        //         });
        // },
        getColor(key) {
            let color;
            this.sprayColorList.map(item => {
                if (item.value == key) {
                    color = item.text;
                    return;
                }
            });
            return color;
        }
    }
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
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>
