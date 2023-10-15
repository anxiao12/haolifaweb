<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">查看整机供应商</div>
            <div class="flex-v-center">
                <input-box disabled v-model="form.name" class="mr-10" label="公司名称" style="width: 35%"></input-box>
                <input-box disabled v-model="form.nickName" class="mr-10" label="代号" style="width: 30%"></input-box>
                <select-box disabled v-model="form.supplierLevel" @change="changeSupplierLevel" :list="parttypeList" style="width: 30%" label="供应商等级"></select-box>
            </div>
              <div class="flex-v-center">
                <input-box disabled v-model="form.address" class="mr-10" label="地址" style="width: 35%"></input-box>
                <input-box disabled v-model="form.telephone" class="mr-10" label="电话" style="width: 30%"></input-box>
                <input-box disabled v-model="form.fax" class="mr-10" label="传真" style="width: 30%"></input-box>
            </div>
               <div class="flex-v-center">
                <input-box disabled v-model="form.email" class="mr-10" label="Email" style="width: 35%"></input-box>
                <input-box disabled v-model="form.siteUrl" class="mr-10" label="网址" style="width: 30%"></input-box>
                <input-box disabled v-model="form.ownerId" class="mr-10" label="负责人" style="width: 30%"></input-box>
                <!-- <select-box v-model="form.ownerId" @change="changeSupplierLevel" :list="parttypeList" style="width: 30%" label="负责人"></select-box> -->
            </div>
               <div class="flex-v-center">
                <input-box disabled v-model="form.contact" class="mr-10" label="联系人" style="width: 35%"></input-box>
                <input-box disabled v-model="form.manageState" class="mr-10" label="经营形态" style="width: 30%"></input-box>
                <input-box disabled v-model="form.bank" class="mr-10" label="开户行" style="width: 30%"></input-box>
            </div>

            <div class="flex-v-center">
                <input-box disabled v-model="form.bankNo" class="mr-10" label="银行帐号" style="width: 35%"></input-box>
                <input-box disabled v-model="form.taxNumber" class="mr-10" label="税号" style="width: 30%"></input-box>
                <input-box disabled v-model="form.marketDistribution" class="mr-10" label="市场分布" style="width: 30%"></input-box>

            </div>
            <div class="flex-v-center">
                <input-box disabled v-model="form.targetCustomer" class="mr-10" label="目标客户" style="width: 35%"></input-box>
                <input-box disabled v-model="form.humanCapitalMeasure" class="mr-10"  label="人力资源状况" style="width: 30%"></input-box>
                <input-box disabled v-model="form.taxpayer" class="mr-10" label="一般纳税人" style="width: 30%"></input-box>
            </div>
             <div class="flex-v-center">
                <input-box disabled v-model="form.remark" class="mr-10" label="备注" style="width: 35%"></input-box>
            </div>
            <div class="flex-v-center">
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-machineSet-add",
    data() {
        return {
            parttypeList: [
                { value: "3星", text: "3星" },
                { value: "2星", text: "2星" },
                { value: "1星",text: "1星" },
            ],
            form: {
                name:'',
                nickName:'',
                supplierLevel:'',
                address:'',
                telephone:'',
                fax:'',
                email:'',
                siteUrl:'',
                ownerId:'',
                contact:'',
                manageState:'',
                bank:'',
                bankNo:'',
                taxNumber:'',
                marketDistribution:'',
                targetCustomer:'',
                humanCapitalMeasure:'',
                taxpayer:'',
                remark:'',
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.name && form.name && form.nickName;
        }
    },
    activated() {
        this.form = {
                name:'',
                nickName:'',
                supplierLevel:'',
                address:'',
                telephone:'',
                fax:'',
                email:'',
                siteUrl:'',
                ownerId:'',
                contact:'',
                manageState:'',
                bank:'',
                bankNo:'',
                taxNumber:'',
                marketDistribution:'',
                targetCustomer:'',
                humanCapitalMeasure:'',
                taxpayer:'',
                remark:'',
        };
        let { editId } = this.$route.query;
         if (editId){
            this.getInfo(editId);
        }
    },
    created() {
        let { editId } = this.$route.query;
        if (editId  ){
            this.getInfo(editId);
        }
    },
    methods: {
      changeSupplierLevel(val){
        console.log('val',val)
      },
        getInfo(id) {
            this.$http
                .get(`/haolifa/whole/machine/supplier/info/${id}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                    console.log('this.form',this.form)
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            const url = this.$route.query.editId ? "/machineSet/edit" : "/machineSet/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/machinesupplier/list");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            let interfaceUrl = this.$route.query.editId ? "update" : "save"
            let params = {}
            if(this.$route.query.editId){
              params = Object.assign({},form,{id: this.$route.query.editId})
            }else{
              params = form
            }
            this.$http.post(
                `/haolifa//whole/machine/supplier/${interfaceUrl}`,
                params
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", 'machinesupplier/add');
                    this.$router.push(`/machinesupplier/list`);
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang="less">
.page-part-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
