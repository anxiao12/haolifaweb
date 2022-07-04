<template>
    <div class="apply-buy-add">
        <div class="content">
            <div class="title b f-18 mb-10">新增站内信</div>
            <div class="flex-v-center">
                <select-box v-model="form.users" hint="必填" :list="userList" class="flex-item mr-10" label="收件人"></select-box>
            </div>
            <div class="flex-v-center">
                <input-box v-model="form.title" hint="必填" class="flex-item mr-10" label="标题"></input-box>
            </div>
            <div class="flex-v-center;" style="margin-top:30px;">
                <Editor style="width:100%" id="tinymce" v-model="form.content" :init="editorInit"></Editor>
                <!-- <input-box v-model="form.content" hint="必填" multi-line class="flex-item mr-10" label="内容"></input-box> -->
            </div>
            <div class="flex">
                <btn big class="mr-20" @click="submit()">提交</btn>
                <btn big flat @click="reset">重置</btn>
            </div>
        </div>

        <layer v-if="loading">
            <div class="abs t-center" style="padding: 20px;">
                <loading size="30"/>
                <div style="margin-top: 10px;">{{loadingMsg}}</div>
            </div>
        </layer>
    </div>
</template>

<script>
import tinymce from "tinymce";
import "tinymce/themes/silver/theme";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
export default {
    name: "order-create",
    data() {
        return {
            loading: false,
            form: {
                users: "",
                title: "",
                content:
                    '<table style="border-collapse: collapse; height: 466px;" width="849" cellspacing="0" cellpadding="8"><colgroup><col width="94" /><col width="521" /></colgroup><tbody><tr style="height: 23.85pt;"><td style="width: 461pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" colspan="2" valign="top" width="615" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">当日工作内容</span></span></p></td></tr><tr style="height: 63.65pt;"><td style="width: 461pt; height: 63.65pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" colspan="2" valign="top" width="615" height="85"><p style="text-align: justify; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt;"><span style="font-family: Calibri;">&nbsp;</span></span></p></td></tr><tr style="height: 23.85pt;"><td style="width: 461pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" colspan="2" valign="top" width="615" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">当日工作反馈</span></span></p></td></tr><tr style="height: 23.85pt;"><td style="width: 70.5pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="95" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">问题</span><span style="font-family: Calibri;">：</span></span></p></td><td style="width: 390.55pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="521" height="32"><p style="line-height: 100%; margin-top: 0pt; margin-bottom: 0pt; text-align: left;"></p></td></tr><tr style="height: 23.85pt;"><td style="width: 70.5pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="95" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">建议</span><span style="font-family: Calibri;">：</span></span></p></td><td style="width: 390.55pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="521" height="32"><p style="line-height: 100%; margin-top: 0pt; margin-bottom: 0pt; text-align: left;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: Calibri;">&nbsp;</span></span></p></td></tr><tr style="height: 23.85pt;"><td style="width: 70.5pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="95" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">信息</span><span style="font-family: Calibri;">：</span></span></p></td><td style="width: 390.55pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" valign="top" width="521" height="32"><p style="line-height: 100%; margin-top: 0pt; margin-bottom: 0pt; text-align: left;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: Calibri;">&nbsp;</span></span></p></td></tr><tr style="height: 23.85pt;"><td style="width: 461pt; height: 23.85pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" colspan="2" valign="top" width="615" height="32"><p style="text-align: center; line-height: 100%; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: 宋体;">下一日工作计划</span></span></p></td></tr><tr style="height: 78.35pt;"><td style="width: 461pt; height: 78.35pt; border: solid black .5pt; mso-border-alt: solid black .5pt; padding-left: 1.91mm; padding-right: 1.91mm;" colspan="2" valign="top" width="615" height="105"><p style="line-height: 100%; margin-top: 0pt; margin-bottom: 0pt; text-align: left;"><span style="font-size: 14pt; font-weight: bold;"><span style="font-family: Calibri;">&nbsp;</span></span></p></td></tr></tbody></table>'
            },
            userList: [],
            val: "",
            editorInit: {
                language_url: "/zh_CN.js",
                language: "zh_CN",
                skin_url: "/skins/ui/oxide",
                height: 600,
                fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px"
            }
        };
    },
    activated() {
        this.getUserList();
        this.init();
    },
    mounted() {
        this.getUserList();
        this.init();
    },
    components: { Editor },
    methods: {
        init() {
            this.editorInit = {
                language_url: "/zh_CN.js",
                language: "zh_CN",
                skin_url: "/skins/ui/oxide",
                height: 300
            };
        },
        submit() {
            if (!this.form.users || !this.form.title || !this.form.content) {
                this.$toast("请输入必填项");
                return;
            }
            this.$http
                .post("/haolifa/hlmail/sendMail", this.form)
                .then(res => {
                    this.$toast("新增成功");
                    this.reset();
                })
                .catch(e => {
                    this.$toast(e.message || e.msg);
                });
        },
        getUserList() {
            this.$http.get("/haolifa/user?pageNum=1&pageSize=100").then(res => {
                this.userList = res.list.map(item => {
                    return {
                        value: item.id + "-" + item.username,
                        text: item.realName
                    };
                });
            });
        },
        reset() {
            this.form = {
                users: "",
                title: "",
                content: ""
            };
        }
    }
};
</script>

<style lang='less'>
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
