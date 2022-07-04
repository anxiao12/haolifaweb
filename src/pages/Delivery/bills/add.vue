<template>
    <div class="page-part-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}发货通知单</div>
            <div class="flex-v-center">
                <!-- <input-box
          v-model='form.deliveryNo'
          v-show='form.id'
          :disabled='true'
          class='mr-10'
          label='单号'
          style='width: 20%'
                ></input-box>-->
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.contractOrderNo" class="mr-10" label="订单号" style="width: 50%"></input-box>
            </div>
            <div class="flex-v-center">
                <upload-box btnText="上传发货单" :fileList="fileList" :onchange="uploadFile" style="width: 50%"></upload-box>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit" :disabled="!canSubmit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
            <layer v-if="loading">
                <div class="abs t-center" style="padding: 20px;">
                    <loading size="30"/>
                    <div style="margin-top: 10px;">{{loadingMsg}}</div>
                </div>
            </layer>
        </div>
    </div>
</template>

<script>
import fileToBase64 from "../../../utils/fileToBase64";
export default {
    name: "page-part-add",
    data() {
        return {
            loading: false,
            loadingMsg: "",
            fileList: [],
            form: {
                id: "",
                contractOrderNo: "",
                deliveryUrl: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return form.contractOrderNo && form.deliveryUrl;
        }
    },
    activated() {
        this.form = {
            id: "",
            contractOrderNo: "",
            deliveryUrl: ""
        };
        this.fileList = [];
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "bills-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        if (id !== undefined && this.$route.name === "bills-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/delivery/noticeInfo/${id}`)
                .then(res => {
                    // for (let key in this.form) {
                    //   if (this.form[key] !== undefined) this.form[key] = res[key]
                    // }
                    this.form = res;
                    // this.fileList.push({
                    //     name: "测试编辑",
                    //     url: res.deliveryUrl,
                    //     uid: "21431243"
                    // });
                    // this.$http.get(res.deliveryUrl).then(res => {
                    //   this.fileList.push(res)
                    // })
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
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
                        this.form.deliveryUrl = res;
                        this.loading = false;
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        cancel() {
            let url = this.form.id
                ? "/delivery-bills/edit"
                : "/delivery-bills/add";
            this.$confirm({
                title: "您确定要离开此页面吗？",
                text: "您的表单将不会保存",
                color: "red",
                btns: ["取消", "离开"],
                yes: () => {
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/delivery-bills/addList");
                }
            });
        },
        submit() {
            const { form } = this;
            this.loading = true;
            this.loadingMsg = "正在保存";
            let url = this.form.id
                ? "/delivery-bills/edit"
                : "/delivery-bills/add";
            this.$http
                .post("/haolifa/delivery/saveNotice", form)
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/delivery-bills/addList");
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        }
    }
};
</script>

<style lang='less'>
.page-part-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
