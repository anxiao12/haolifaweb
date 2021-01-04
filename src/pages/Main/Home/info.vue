<template>
    <div class="abs scroll-y">
        <div class="form-content metalwork-info">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <table class="f-14 order-info">
                <tr>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 7%;"></td>
                    <td style="width: 8%;"></td>
                    <td style="width: 8%;"></td>
                </tr>
                <tr>
                    <td colspan="14" class="b">订单编号 : {{info.orderNo}}</td>
                </tr>
                <tr>
                    <td colspan="14" class="b">发货日期 : {{info.deliveryDate}}</td>
                </tr>
                <tr>
                    <td colspan="14" class="b">订单状态 : {{ orderStatusList[info.orderStatus] }}</td>
                </tr>
                <tr>
                    <td colspan="14" class="b">
                        订单合同:
                        <a :href="info.orderContractUrl" style="margin-right: 15px;">下载</a>
                        <a target="_blank" v-if="(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="info.orderContractUrl">预览</a>
                        <a
                            target="_blank"
                            v-if="!(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                            :href="'http://view.officeapps.live.com/op/view.aspx?src='+ info.orderContractUrl"
                        >预览</a>
                    </td>
                </tr>
                <tr>
                    <td colspan="14" class="b" v-if="fileDetailList.length">订单附件:</td>
                    <td colspan="14" class="b" v-else>订单附件:无</td>
                </tr>
                <tr v-for="(item,index) in fileDetailList" :key="index">
                    <td colspan="3" class="b">{{item.fileName}}</td>
                    <td colspan="12" class="b">
                        <a target="_blank" v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="item.fileUrl">预览</a>
                        <a
                            target="_blank"
                            v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                            :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl"
                        >预览</a>
                    </td>
                </tr>
                <tr>
                    <td colspan="7" class="b">装配车间: {{info.assemblyShop}}</td>
                    <td colspan="7" class="b">装配小组: {{info.assemblyGroup}}</td>
                </tr>
                <tr>
                    <td colspan="7" class="b">采购反馈时间: {{info.purchaseFeedbackTime}}</td>
                    <td colspan="7" class="b">生产反馈时间: {{info.productionFeedbackTime}}</td>
                </tr>
                <!-- <tr>
                    <td colspan="6" class="b">工厂反馈完成时间: {{info.finishFeedbackTime}}</td>
                    <td colspan="6" class="b">反馈确认人: {{info.feedbackTimeConfirmUser}}</td>
                </tr>-->
                <tr>
                    <td colspan="14" class="b">技术清单:</td>
                </tr>
                <tr>
                    <td colspan="1" rowspan="2">产品名称</td>
                    <td colspan="1" rowspan="2">型号</td>
                    <td colspan="1" rowspan="2">规格</td>
                    <td colspan="1" rowspan="2">数量</td>
                    <td colspan="1" rowspan="2">上法兰标准</td>
                    <td colspan="3" rowspan="1">上法兰尺寸</td>
                    <td colspan="4" rowspan="1">出轴尺寸</td>
                    <td colspan="1" rowspan="2">静扭矩</td>
                    <td colspan="1" rowspan="2">执行器型号</td>
                </tr>
                <tr>
                    <td colspan="1" rowspan="1">连接孔</td>
                    <td colspan="1" rowspan="1">角度</td>
                    <td colspan="1" rowspan="1">中心距</td>
                    <td colspan="1" rowspan="1">出轴型式</td>
                    <td colspan="1" rowspan="1">出轴长度</td>
                    <td colspan="1" rowspan="1">轴图号</td>
                    <td colspan="1" rowspan="1">过渡盘</td>
                </tr>
                <tr v-for="(val,index) in JSON.parse(info.technicalRequire)" :key="index">
                    <td colspan="1">{{val.name}}</td>
                    <td colspan="1">{{val.xinhao}}</td>
                    <td colspan="1">{{val.guige}}</td>
                    <td colspan="1">{{val.num}}</td>
                    <td colspan="1">{{val.biaozhun}}</td>
                    <td colspan="1">{{val.lianjiek}}</td>
                    <td colspan="1">{{val.jiaodu}}</td>
                    <td colspan="1">{{val.zhongxinju}}</td>
                    <td colspan="1">{{val.xinshi}}</td>
                    <td colspan="1">{{val.length}}</td>
                    <td colspan="1">{{val.tuhao}}</td>
                    <td colspan="1">{{val.guodupan}}</td>
                    <td colspan="1">{{val.jinniuju}}</td>
                    <td colspan="1">{{val.jishuxinhao}}</td>
                </tr>
                <tr>
                    <td colspan="14" class="b">订单产品列表</td>
                </tr>
                <tr>
                    <td colspan="1" class="b">产品编号</td>
                    <td colspan="2" class="b">产品名称</td>
                    <td colspan="1" class="b">型号</td>
                    <td colspan="1" class="b">标签属性</td>
                    <td colspan="1" class="b">规格</td>
                    <td colspan="1" class="b">颜色</td>
                    <td colspan="1" class="b">产品数量</td>
                    <td colspan="1" class="b">单价</td>
                    <td colspan="1" class="b">总计价格</td>
                    <td colspan="2" class="b">材质说明</td>
                    <td colspan="2" class="b">产品备注</td>
                </tr>
                <tr v-for="(item,index) in info.orderProductAssociates" :key="index">
                    <td colspan="1">{{item.productNo}}</td>
                    <td colspan="2">{{item.productName}}</td>
                    <td colspan="1">{{item.productModel}}</td>
                    <td colspan="1">{{item.lable}}</td>
                    <td colspan="1">{{item.specifications}}</td>
                    <td colspan="1">{{item.productColor}}</td>
                    <td colspan="1">{{item.productNumber}}</td>
                    <td colspan="1">{{item.price}}</td>
                    <td colspan="1">{{item.totalPrice}}</td>
                    <td colspan="2">{{item.materialDescription}}</td>
                    <td colspan="2">{{item.productRemark}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// import parseJson from '@/utils/parseJson'
export default {
    name: "metalwork-info",
    data() {
        return {
            info: {},
            orderStatusList: {},
            arr: [
                {
                    name: "",
                    xinhao: "",
                    guige: "",
                    num: "",
                    biaozhun: "",
                    lianjiek: "",
                    jiaodu: "",
                    zhongxinju: "",
                    xinshi: "",
                    length: "",
                    tuhao: "",
                    guodupan: "",
                    jinniuju: "",
                    jishuxinhao: ""
                },
                {
                    name: "",
                    xinhao: "",
                    guige: "",
                    num: "",
                    biaozhun: "",
                    lianjiek: "",
                    jiaodu: "",
                    zhongxinju: "",
                    xinshi: "",
                    length: "",
                    tuhao: "",
                    jinniuju: "",
                    jishuxinhao: ""
                }
            ],
            fileDetailList: []
        };
    },
    created() {
        const { orderNo } = this.$route.query;
        this.getInfo(orderNo);
        this.getOrderStatusList();
    },
    methods: {
        getInfo(orderNo) {
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${orderNo}`)
                .then(res => {
                    this.info = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
            this.$http
                .get(`/haolifa/order-product/accessory?orderNo=${orderNo}`)
                .then(res => {
                    this.fileDetailList = res;
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getOrderStatusList() {
            this.$http
                .get("/haolifa/order-product/order-status-list")
                .then(res => {
                    for (let i in res) {
                        this.orderStatusList[i] = res[i].desc;
                    }
                });
        }
    }
};
</script>

<style lang="less">
.metalwork-info {
    padding: 30px 20px;
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
    .checkbox-list {
        flex-wrap: wrap;
    }
    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}
.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
</style>
