<template>
    <div class=" abs scroll-y">
        <div class="form-content metalwork-info">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <table class="f-14" >
                <tr>
                    <td style="width: 25%;"></td>
                    <td style="width: 25%;"></td>
                    <td style="width: 25%;"></td>
                    <td style="width: 25%;"></td>
                </tr>
                <tr>
                    <td colspan="4" class="b">压力测试质检</td>
                </tr>
                <tr>
                    <td colspan="2">报检单号: {{stresstest.inspectNo}}</td>
                    <td colspan="2">订单号: {{stresstest.orderNo}}</td>
                </tr>
                <tr>
                    <td colspan="1" class="b">检测数量</td>
                    <td colspan="1" class="b">复检数量</td>
                    <td colspan="1" class="b">合格数量</td>
                    <td colspan="1" class="b">不合格数量</td>
                </tr>
                <tr >
                    <td colspan="1">{{stresstest.testingNumber}}</td>
                    <td colspan="1">{{stresstest.reinspectNumber}}</td>
                    <td colspan="1">{{stresstest.qualifiedNumber}}</td>
                    <td colspan="1">{{stresstest.unqualifiedNumber}}</td>
                </tr>
                <tr>
                    <td colspan="2" class="b">不合格原因</td>
                    <td colspan="2" class="b">不合格数量</td>
                </tr>
                <tr v-for="item in stresstest.unqualifiedList" :key="item.unqualifiedNumber">
                    <td colspan="2">{{item.reason}}</td>
                    <td colspan="2">{{item.unqualifiedNumber}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    // import parseJson from '@/utils/parseJson'
    export default {
        name: 'metalwork-info',
        data () {
            return {
                stresstest:{},
            }
        },
        created () {
            if(this.$route.params){
        
                let item = this.$route.params;
                this.stresstest.id = item.id;
                this.stresstest.inspectNo = item.inspectNo;
                this.getInfo(this.stresstest.inspectNo)
            }
        },
        methods: {
            getInfo(inspectNo){
                this.$http.get(`/haolifa/pressure-inspect-res/info/${inspectNo}`).then(res => {
                    this.stresstest = res
                }).catch(e => {
                    this.$toast(e.msg || e.message)
                })
            }
        }
    }
</script>

<style lang="less">
    .metalwork-info{
        padding: 30px 20px;
        tr:first-child td{padding: 0;border: none;}
        th{font-weight: normal;color: #888;}
        td{color: #444;}
        th, td{padding: 10px;border: 1px solid #fff;border: 1px solid #ddd;}
        .checkbox-list{flex-wrap: wrap;}
        .checkbox-item{line-height: 1em;width: 180px;margin: 5px 0;}
    }
</style>
