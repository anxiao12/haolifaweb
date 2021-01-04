<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <!--<no-data v-if="!info.id" style="margin: 50px 0;"/>-->
            <table class="f-14" >
                <tr>
                    <td style="width: 15%;"></td>
                    <td style="width: 15%;"></td>
                    <td style="width: 14%;"></td>
                    <td style="width: 14%;"></td>
                    <td style="width: 14%;"></td>
                    <td style="width: 14%;"></td>
                    <td style="width: 14%;"></td>
                </tr>
                <tr>
                    <th>订单号</th>
                    <th>零件图号</th>
                    <th>零件名称</th>
                    <th>价格</th>
                    <th>是否可替换零件</th>
                    <th>需要零件数量</th>
                    <th>缺少零件数量</th>
                    <th>状态</th>
                </tr>
                <tr v-for="item in infoList" :key="item.id">
                    <td>{{item.orderNo}}</td>
                    <td>{{item.materialGraphNo}}</td>
                    <td>{{item.materialName}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.isReplace == 0 ?'否':'是'}}</td>
                    <td>{{item.materialCount}}</td>
                    <td>{{item.lackMaterialCount}}</td>
                    <td>{{statusList[item.checkStatus].name}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    // import parseJson from '@/utils/parseJson'
    export default {
        name: 'purchsemanage-purchaseinfo',
        data () {
            return {
                loading: false,
                infoList:{},
                statusList:
                   [
                    {status:1,name:'核料成功'},
                    {status:2,name:'缺料,需要采购'},
                    {status:3,name:'释放料'},
                    {status:4,name:'领料完成'}
                    ],
                
            }
        },
        created () {
            this.getInfo()
        },
        methods: {
            getInfo () {
                let {id}= this.$route.query
                this.$http.get(`/haolifa/order-product/order-material/${id}`).then(res => {
                    this.infoList = res;
                }).catch(e => {
                    this.$toast(e.msg)
                })
            },
        }
    }
</script>

<style lang="less">
    .page-supplier-info{
        padding: 30px 20px;
        tr:first-child td{padding: 0;border: none;}
        th{font-weight: normal;color: #888;}
        td{color: #444;}
        th, td{padding: 10px;border: 1px solid #fff;border: 1px solid #ddd;}
        .checkbox-list{flex-wrap: wrap;}
        .checkbox-item{line-height: 1em;width: 180px;margin: 5px 0;}
    }
</style>
