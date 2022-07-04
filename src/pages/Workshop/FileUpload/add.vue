<template>
    <div class="page-room-add abs scroll-y">
        <div class="form-content">
            <div class="title b f-18">{{form.id ? '编辑' : '新增'}}文件/图纸</div>
            <div class="flex-v-center">
                <input-box v-model="form.fileNo" class="mr-10" style="width:33%" label="文件编号"></input-box>
                <input-box v-model="form.fileName" class="mr-10" style="width:33%" label="文件名称"></input-box>
                <!-- <div class="flex-v-center"> -->
                <select-box v-model="form.type" class="mr-10" style="width:33%" :list="typeList" label="文件类型"></select-box>
                <!-- </div> -->
            </div>
            <div class="flex">
                <upload-box btnText="上传零件图纸" :fileList="fileList" :onchange="uploadFile" :onremove="removeFile" style="width: 50%"></upload-box>
            </div>

            <div class="flex-v-center">
                <input-box v-model="form.remark" class="flex-item mr-10" multi-line label="备注"></input-box>
            </div>
            <div class="flex-v-center" style="margin: 20px 0;">
                <btn big class="mr-20" @click="submit">提交</btn>
                <btn big flat bg class="mr-20" @click="cancel">取消</btn>
            </div>
        </div>
    </div>
</template>

<script>
import fileToBase64 from "../../../utils/fileToBase64";

export default {
    name: "page-room-add",
    data() {
        return {
            typeList: [],
            fileList: [],
            loading: false,
            form: {
                id: "",
                fileName: "",
                fileNo: "",
                type: "",
                fileUrl: "",
                remark: "",
                fileBase64: ""
            }
        };
    },
    computed: {
        canSubmit() {
            const { form } = this;
            return (
                form.fileName &&
                form.type &&
                form.fileUrl &&
                form.remark &&
                form.fileBase64
            );
        }
    },
    activated() {
        this.fileList = [];
        this.form = {
            id: "",
            fileName: "",
            fileNo: "",
            type: "",
            fileUrl: "",
            remark: "",
            fileBase64: ""
        };
        let { id } = this.$route.query;
        this.getFileTypeStatus();
        if (id !== undefined && this.$route.name === "fileupload-edit")
            this.getInfo(id);
    },
    created() {
        let { id } = this.$route.query;
        this.getFileTypeStatus();
        if (id !== undefined && this.$route.name === "fileupload-edit")
            this.getInfo(id);
    },
    methods: {
        getInfo(id) {
            this.$http
                .get(`/haolifa/file/info/${id}`)
                .then(res => {
                    for (let key in this.form) {
                        if (this.form[key] !== undefined)
                            this.form[key] = res[key];
                    }
                    this.form.type = this.form.type + "";
                    let fileObj = {
                        name: this.form.fileUrl.substring(
                            this.form.fileUrl.lastIndexOf("/") + 1
                        ),
                        size: "",
                        type: "",
                        status: "ready",
                        url: this.form.fileUrl,
                        uid: new Date().getTime(),
                        source: ""
                    };
                    this.fileList.push(fileObj);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        getFileTypeStatus() {
            this.$http
                .get(`/haolifa/file/fileTypeList`)
                .then(res => {
                    this.typeList = res.map(item => {
                        return { value: item.code, text: item.desc };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        cancel() {
            let url = this.form.id ? "/fileupload/edit" : "/fileupload/add";
            this.$store.commit("DELMENUTABS", url);
            this.$router.push("/fileupload/addList");
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
                        this.form.fileUrl = res;
                        this.form.fileBase64 = base64Str;
                        this.loading = false;
                    })
                    .catch(e => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        removeFile() {
            return new Promise((resolve, reject) => {
                this.form.fileUrl = "";
                this.form.fileBase64 = "";
                resolve();
            });
        },
        submit() {
            if (!this.form.fileName) {
                this.$toast("文件名称不能为空");
                return;
            }
            if (!this.form.fileNo) {
                this.$toast("文件编号不能为空");
                return;
            }
            if (!this.form.type) {
                this.$toast("请选择文件类型");
                return;
            }
            if (!this.form.fileUrl) {
                this.$toast("请上传零件图纸");
                return;
            }
            let url = this.form.id ? "/fileupload/edit" : "/fileupload/add";
            const { form } = this;
            this.loading = true;
            const method = form.id ? "put" : "post";

            this.$http[method](
                `/haolifa/file/${form.id ? "update" : "save"}`,
                form
            )
                .then(res => {
                    this.loading = false;
                    this.$store.commit("DELMENUTABS", url);
                    this.$router.push("/fileupload/addList");
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
.page-room-add {
    padding: 30px 20px;
    .title {
        margin-bottom: 20px;
    }
}
</style>
