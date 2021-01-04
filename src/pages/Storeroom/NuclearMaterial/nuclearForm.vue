<template>
    <div class="nuclear-material-nuclear abs scroll-y">
        <div class="node">
            <div class="flex-item mt-10 mb-10"><span class="f-20">基本信息</span></div>
            <div class="mb-10">
                <span class="b">订单编号：</span><span class="mr-15">{{orderInfo.orderContractNo}}</span>
            </div>
            <div class="mb-10">
                <span class="b">订单附件：</span>
                <span><a class="a" target="_blank" style="color: #008eff" :href="orderInfo.orderContractUrl">下载</a></span>
            </div>
        </div>

        <div class="mt-20" v-if="preCheckMaterList.length>0">
            <hr/>
            <div class="flex-item mt-20 mb-10"><span class="f-20">核料清单</span></div>
            <div class="node">
                <div class="flex-item ml-20" style="overflow-x:auto">
                    <table class="data-table" >
                        <tr>
                            <th>物料名称</th>
                            <th>物料图号</th>
                            <th>型号</th>
                            <th>规格</th>
                            <th>单价</th>
                            <th>单位</th>
                            <th>需要数量</th>
                            <th>缺少数量</th>
                            <th>核料状态</th>
                            <th>是否替换</th>
                            <th>替换零件</th>
                            <th>备注</th>
                        </tr>
                        <tr v-for="(item, i) in preCheckMaterList">
                            <td>{{item.materialName}}</td>
                            <td>{{item.materialGraphNo}}</td>
                            <td>{{item.model}}</td>
                            <td>{{item.specifications}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.unit}}</td>
                            <td>{{item.materialCount}}</td>
                            <td>{{item.lackMaterialCount}}</td>
                            <td>{{checkStatusList[item.checkStatus-1].text}}</td>
                            <td>{{item.checkStatus==3?'是':'否'}}</td>
                            <td>{{item.replaceMaterialGraphNo}}</td>
                            <td>{{item.remark}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'nuclear-material-nuclear',
        data () {
            return {
                checkStatusList:[
                    {value:1,text:'成功'},
                    {value:2,text:'待采购'},
                    {value:3,text:'可替换'}
                ],
                orderInfo:{
                    orderContractNo:'',
                    orderContractUrl:''
                },
                preCheckMaterList:[],
            }
        },
        created () {
            let { orderNo } = this.$route.query;
            this.getInfo(orderNo)
        },
        methods: {
            getInfo (orderNo) {
                this.$http.get(`/haolifa/order-product/details?orderNo=${orderNo}`).then(res => {
                    this.orderInfo.orderContractNo = res.orderContractNo;
                    this.orderInfo.orderContractUrl = res.orderContractUrl;
                }).catch(e => {
                    this.$toast(e.msg || e.message)
                });
                this.$http.get(`/haolifa/order-product/order-material?orderNo=${orderNo}`).then(res=>{
                    this.preCheckMaterList = res;
                    console.log('处理过后', res);

                }).catch(e=>{

                });
            }
        }
    }
</script>

<style lang="less">
    .nuclear-material-nuclear{
        padding: 20px;
        .node{border: 1px solid #e6e6e6;padding: 15px;border-radius: 8px;}
        tr:first-child td{padding: 0;border: none;}
        th{font-weight: normal;color: #888;}
        td{color: #444;}
        th, td{padding: 10px;border: 1px solid #fff;border: 1px solid #ddd;}
    }
</style>
