<template>
    <div class="inspect-product-add">
        <div class="content">
            <div class="title b f-18">增加质检单</div>
            <div class="flex">
                <input-box v-model="form.orderNo" class="flex-item" label="订单号"></input-box>
                <input-box v-model="form.testingNumber" class="flex-item" label="检测数量"></input-box>
                <input-box v-model="form.qualifiedNumber" class="flex-item" label="合格数"></input-box>
                <input-box v-model="form.unqualifiedNumber" class="flex-item" label="不合格数"></input-box>
            </div>

            <div class="b" style="margin: 20px 0 10px;">不合格详情</div>
            <div class="card flex" style="margin-top: 0;" v-for="(item, i) in form.items" :key="i">
                <div class="flex-item">
                    <div class="flex">
                        <input-box v-model="item.productModel" class="flex-item mr-10" label="产品型号" hint="必填"></input-box>
                        <input-box v-model="item.productSpecifications" class="flex-item mr-10" label="规格" hint="必填"></input-box>
                        <input-box v-model="item.unqualifiedNumber" class=" mr-10" label="不合格数" hint="必填"></input-box>
                    </div>

                    <div class="flex">
                        <input-box v-model="item.reason" class="flex-item" label="不合格现象描述"></input-box>
                    </div>
                </div>
                <div v-if="form.items.length > 1"><icon-btn small @click="form.items.splice(i, 1)">close</icon-btn></div>
            </div>
            <div class="card a flex-center" @click="addItem()">
                <div class="flex-v-center">
                    <i class="icon mr-10">add</i>
                    <span>添加不合格详情</span>
                </div>
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat @click="$router.back()">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'inspect-product-add',
        data () {
            return {
                form: {
                    orderNo: '',
                    testingNumber: '',
                    qualifiedNumber:'',
                    unqualifiedNumber:'',
                    items: [{
                        productModel: '',
                        productSpecifications: '',
                        reason: '',
                        unqualifiedNumber: ''
                    }]
                }
            }
        },
        created () {
            let { id } = this.$route.query
            if (id !== undefined && this.$route.name === 'product-edit') this.getInfo(id)
        },
        methods: {
            getInfo (id) {
                console.log("---"+id)
                this.$http.get(`/haolifa/pro-inspect-res/info/${id}`).then(res => {
                    console.log("---"+id)
                   console.log(res)
                    for (let key in this.form) {
                        if (this.form[key] !== undefined) this.form[key] = res[key]

                    }

                }).catch(e => {
                    this.$toast(e.msg || e.message)
                })
            },
            addItem () {
                this.form.items.push({
                    productModel: '',
                    productSpecifications: '',
                    reason: '',
                    unqualifiedNumber: ''
                })
            },
            submit () {
                this.$http.post('/haolifa/pro-inspect-res/save', this.form).then(res => {
                    this.loading = false
                    this.$toast('提交成功')
                    this.$router.replace('/inspect-product')
                }).catch(e => {
                    this.$toast(e.message || e.msg)
                })
            }
        }
        // ap_20181115201511123488
    }
</script>

<style lang="less">
    .apply-buy-add{
        padding: 20px;
        .card{padding: 10px;margin: 20px 0;background: #f5f5f5;}
        .content{max-width: 1000px;margin: 0 auto;}
    }
</style>
