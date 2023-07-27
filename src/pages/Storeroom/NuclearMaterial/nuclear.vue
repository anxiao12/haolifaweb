<template>
    <div class="nuclear-material-nuclear abs scroll-y">
        <div class="node">
            <div class="flex-item mt-10 mb-10">
                <span class="f-20">基本信息</span>
            </div>
            <div class="mb-10">
                <span class="b">订单编号：</span>
                <span class="mr-15">{{orderInfo.orderContractNo}}</span>
            </div>
            <div class="mb-10">
                <span class="b">订单附件：</span>
                <span>
                    <a
                        class="a"
                        target="_blank"
                        style="color: #008eff"
                        :href="orderInfo.orderContractUrl"
                    >下载</a>
                </span>
            </div>
        </div>

        <div class="node mt-20">
            <div class="flex-item mt-10 mb-10">
                <span class="f-20">成品核料信息</span>
            </div>
            <div
                class="node"
                v-for="(item,i) in productInfos"
            >
                <div>
                    <div class="flex">成品号:{{item.productNo}}</div>
                    <div class="flex">成品型号：{{item.productModel}}</div>
                    <div class="flex">物料描述：{{item.materialDescription}}</div>
                    <div class="flex">规格：{{item.specifications}}</div>
                    <div class="flex">数量：{{item.productNumber}}</div>
                    <div class="flex">颜色：{{item.productColor=='null'?'':item.productColor}}</div>
                    <div class="flex">备注：{{item.productRemark}}</div>
                </div>
                <hr>
                <div class="flex-item mt-10 mb-10">
                    <span>零件选择</span>
                </div>
                <div
                    v-for="classifyItem in item.listDTOS"
                    class="flex-item"
                >
                    <div>
                        <div v-if="classifyItem.list.length>0">
                            <div v-if="classifyItem.type=='fati'">阀体</div>
                            <div v-if="classifyItem.type=='fazuo'">阀座</div>
                            <div v-if="classifyItem.type=='faban'">阀板</div>
                            <div v-if="classifyItem.type=='fagan'">阀杆</div>
                            <select
                                v-if="classifyItem.type!='tongyong'"
                                :value="0"
                                @change="checkMater($event, classifyItem.type, item.id)"
                            >
                                <option value="0">请选择</option>
                                <option
                                    v-for="(materItem,i) in classifyItem.list"
                                    :value="JSON.stringify(materItem)"
                                >{{materItem.graphNo}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex mt-20">
            <el-button
                type="primary"
                :loading="loadingFlag"
                @click="nuclearing()"
            >开始核料</el-button>
            <el-button
                type="primary"
                :loading="nuclearCompleteFlag"
                @click="nuclearComplete()"
            >核料完成</el-button>
        </div>
        <div
            class="mt-20"
            v-if="preCheckMaterList.length>0"
        >
            <hr>
            <div class="flex-item mt-20 mb-10">
                <span class="f-20">核料结果</span>
            </div>
            <div class="node">
                <div class="flex-item scroll-y ml-20">
                    <table class="data-table">
                        <tr>
                            <th>物料名称</th>
                            <th>物料图号</th>
                            <th>需要数量</th>
                            <th>缺少数量</th>
                            <th>核料状态</th>
                            <th>核料结果</th>
                            <th>可替换</th>
                            <th>操作</th>
                        </tr>
                        <tr v-for="(item, i) in preCheckMaterList">
                            <td>{{item.materialName}}</td>
                            <td>{{item.materialGraphNo}}</td>
                            <td>{{item.materialCount}}</td>
                            <td>{{item.lackMaterialCount}}</td>
                            <td>{{checkStatusList[item.checkStatus-1].text}}</td>
                            <td>{{item.checkResultMsg}}</td>
                            <td>{{item.replaceGraphNoList != null && item.replaceGraphNoList.length >0?'是':''}}</td>
                            <td>
                                <a
                                    href="javascript:;"
                                    v-if="item.replaceGraphNoList != null && item.replaceGraphNoList.length >0"
                                    style="margin-right: 3px"
                                    class="blue"
                                    @click="replaceShow(item)"
                                >替换</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <layer
                v-if="replaceLayer"
                :title="'替换料列表'"
                width="450px"
            >
                <div class="node ml-10 mr-10">
                    <div
                        class="flex"
                        v-for="(item,i) in replaceList"
                    >
                        <radio-box
                            :label="item.materialGraphNo"
                            name="replace"
                            @change="changeReplace(item)"
                            :text="item.materialGraphNo"
                        ></radio-box>
                    </div>
                </div>
                <div class="layer-btns">
                    <btn
                        flat
                        @click="replaceLayer=false"
                    >取消</btn>
                    <btn
                        flat
                        color="#008eff"
                        @click="replaceComplete()"
                    >保存</btn>
                </div>
            </layer>
        </div>
    </div>
</template>

<script>
export default {
    name: "nuclear-material-nuclear",
    data() {
        return {
            replaceMaterNo: null,
            replaceList: [],
            replaceLayer: false,
            replaceTemp: null,
            checkStatusList: [
                { value: 1, text: "成功" },
                { value: 2, text: "待采购" },
                { value: 3, text: "可替换" },
            ],
            productInfos: [],
            orderInfo: {
                orderContractNo: "",
                orderContractUrl: "",
            },
            nuclearMater: [],
            preCheckMaterList: [],
            replaceMapping: [],
            loadingFlag: false,
            nuclearCompleteFlag: false,
        };
    },
    activated() {
        let { orderNo } = this.$route.query;
        this.nuclearMater = [];
        this.getInfo(orderNo);
    },
    created() {
        let { orderNo } = this.$route.query;
        this.getInfo(orderNo);
    },
    methods: {
        changeReplace(item) {
            this.replaceTemp = item;
        },
        replaceShow(replaceItem) {
            console.log("replace", replaceItem);
            this.replaceList = replaceItem.replaceGraphNoList;
            this.replaceMaterNo = replaceItem.materialGraphNo;
            this.replaceLayer = true;
        },
        replaceComplete() {
            if (this.replaceTemp == null || this.replaceTemp == "") {
                this.$toast("请选择可替换零件");
                return;
            }
            this.replaceLayer = false;
            let choseReplace = JSON.parse(JSON.stringify(this.replaceTemp));
            choseReplace.lackMaterialCount = 0;
            choseReplace.replaceGraphNoList = [];
            let flag = true;
            this.replaceMapping.forEach((item) => {
                if (item.replaceMaterNo == this.replaceMaterNo) {
                    item.choseReplace = choseReplace;
                    flag = false;
                }
            });
            if (flag) {
                this.replaceMapping.push({
                    replaceMaterNo: this.replaceMaterNo,
                    choseReplace: choseReplace,
                });
            }
            this.replaceMaterNo = null;
        },
        checkMater(event, type, productId) {
            // console.log('event',event.target.value);
            let materItem = JSON.parse(event.target.value);
            this.nuclearMater.forEach((item) => {
                if (item.id == productId) {
                    item.listDTOS.forEach((list) => {
                        if (list.type != "tongyong") {
                            if (list.type == type && list.type != "tongyong") {
                                if (materItem == "0") {
                                    list.list = [];
                                } else {
                                    list.list = [];
                                    list.list.push(materItem);
                                }
                            }
                        }
                    });
                }
            });
        },
        getInfo(orderNo) {
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${orderNo}`)
                .then((res) => {
                    this.orderInfo.orderContractNo = res.orderContractNo;
                    this.orderInfo.orderContractUrl = res.orderContractUrl;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.$http
                .get(`/haolifa/order-product/pre-check-material?orderNo=${orderNo}`)
                .then((res) => {
                    this.productInfos = JSON.parse(JSON.stringify(res));
                    this.nuclearMater = JSON.parse(JSON.stringify(res));
                    // 对nuclearMater进行处理，默认值保留
                    this.nuclearMater.forEach((item) => {
                        item.listDTOS.forEach((list) => {
                            if (list.type != "tongyong") {
                                list.list = [];
                            }
                        });
                    });
                    console.log("处理过后", this.nuclearMater);
                })
                .catch((e) => {});
        },
        nuclearing() {
            this.loadingFlag = true;
            this.$http
                .post(`/haolifa/order-product/check-material?orderNo=${this.orderInfo.orderContractNo}`, this.nuclearMater)
                .then((res) => {
                    this.preCheckMaterList = JSON.parse(JSON.stringify(res));
                    this.loadingFlag = false;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                    this.loadingFlag = false;
                });
        },
        nuclearComplete() {
            this.nuclearCompleteFlag = true;
            let completeTemp = JSON.parse(JSON.stringify(this.preCheckMaterList));
            completeTemp.forEach((item) => {
                if (item.replaceGraphNoList == null || item.replaceGraphNoList == "") {
                    item.replaceGraphNoList = [];
                } else if (item.replaceGraphNoList.length > 0) {
                    if (this.replaceMapping.length > 0) {
                        this.replaceMapping.forEach((mapping) => {
                            if (mapping.replaceMaterNo == item.materialGraphNo) {
                                item.replaceGraphNoList = [];
                                item.replaceGraphNoList.push(mapping.choseReplace);
                            }
                        });
                    } else {
                        item.replaceGraphNoList = [];
                    }
                }
                if (item.lackMaterialCount == null) {
                    item.lackMaterialCount = 0;
                }
            });
            this.$http
                .post(`/haolifa/order-product/pass-check-material`, completeTemp)
                .then((res) => {
                    this.$toast("核料完成，清单已保存");
                    this.$store.commit("DELMENUTABS", "/nuclear-material");
                    this.$router.push("/");
                    this.nuclearCompleteFlag = false;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                    this.nuclearCompleteFlag = false;
                });
        },
    },
};
</script>

<style lang="less">
.node {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
.nuclear-material-nuclear {
    padding: 20px;
    .node {
        border: 1px solid #e6e6e6;
        padding: 15px;
        border-radius: 8px;
    }
    tr:first-child td {
        padding: 0;
        border: none;
    }
    th {
        font-weight: normal;
        color: #888;
    }
    td {
        color: #444;
    }
    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }
}
</style>
