<template>
    <div class="page-notification">
        <div class="flex-v-center tool-bar">
            <div class="flex-item"></div>
            <router-link to="/notification/add">
                <btn class="b" flat color="#008eff">新增通知</btn>
            </router-link>
        </div>
        <data-list ref="list" url="/haolifa/message/pageInfo/2">
            <tr slot="header">
                <th style="width: 60px;">序号</th>
                <th>标题</th>
                <th>内容</th>
                <th>时间</th>
                <th class="t-right" style="width: 80px;">操作</th>
            </tr>
            <template slot="item" slot-scope="{ item, index }">
                <td>{{index}}</td>
                <td>{{item.title || '无标题'}}</td>
                <td style="max-width: 110px;overflow: hidden;text-overflow: ellipsis;">{{item.content || '无内容'}}</td>
                <td>{{item.showTime}}</td>
                <td class="t-right">
                    <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a> |
                    <a href="javascript:;" style="margin-right: 3px" class="blue" @click="detail(item)">详情</a> |
                    <a href="javascript:;" style="margin-right: 3px" class="red" @click="remove(item)">删除</a>
                </td>
            </template>
        </data-list>
        <layer v-if="layer" :title="form.id ? '编辑通知' : '新增通知'" width="450px">
            <div class="layer-text" style="padding-bottom: 50px;">
                <input-box v-model="form.title" label="标题"></input-box>
                <date-picker v-model="form.showTime" label="显示时间"></date-picker>
                <input-box v-model="form.content" multi-line label="内容"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="cancel">取消</btn>
                <btn flat color="#008eff" @click="submit">保存</btn>
            </div>
        </layer>
        <layer v-if="detailLayer" title="详情" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 20%;"></td>
                            <td style="width: 80%;"></td>
                        </tr>
                        <tr>
                            <td class="b">标题 :</td>
                            <td>{{info.title}}</td>
                        </tr>
                        <tr>
                            <td class="b">日期 :</td>
                            <td>{{info.showTime}}</td>
                        </tr>
                        <tr>
                            <td class="b">内容 :</td>
                            <td style="word-wrap: break-word; max-width: 600px">{{info.content}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="detailLayer = false;">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";

export default {
    name: "page-notification",
    components: { DataList },
    data() {
        return {
            layer: false,
            form: {
                id: "",
                title: "",
                content: ""
            },
            detailLayer: false,
            info: {}
        };
    },
    methods: {
        submit() {
            const { id, title, content, showTime } = this.form;
            if (!title || !content || !showTime) {
                this.$toast("请完整填写");
                return;
            }
            this.$http[id ? "put" : "post"]("/haolifa/message", {
                id,
                title,
                content,
                type: 2,
                showTime: showTime + " 00:00:00"
            }).then(res => {
                this.$refs.list.update();
            });
        },
        cancel() {
            this.layer = false;
            this.form = { id: "", title: "", content: "" };
        },
        edit(item) {
            this.$router.push({ name: "notification-edit", params: item });
            // for (let key in this.form) {
            //     this.form[key] = item[key]
            // }
            // this.layer = true
        },
        detail(item) {
            this.detailLayer = true;
            this.info = item;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下通知吗？<br>
               <b>${item.name || "无标题"}</b><br>
               <span class="f-12">${item.content}</span>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/message/delete?id=${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update();
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-notification {
    //
}
</style>
