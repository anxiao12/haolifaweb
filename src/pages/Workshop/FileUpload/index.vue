<template>
    <div class="page-contract flex-col">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;margin-left: 80px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.fileNo" @change="$refs.list.update(true)" placeholder="文件编号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.fileName" @change="$refs.list.update(true)" placeholder="文件名称" style="width: 200px;">
                <select v-model="filter.type" class="f-14" @change="$refs.list.update(true)">
                    <option value="0">全部</option>
                    <option v-for="item in statusList" :value="item.status" v-bind:key="item.id">{{item.name}}</option>
                </select>
                <i class="icon" style="margin-left: -20px;pointer-events:none;">arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
            <!-- <router-link to="/fileupload/add">
      <btn class="b" flat color="#008eff">新增文件图纸</btn>
            </router-link>-->
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" method="post" :page-size="15" :param="filter" url="/haolifa/file/pageInfo">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>文件编号</th>
                    <th>文件名称</th>
                    <th>文件URL</th>
                    <th>文件类型</th>
                    <th>备注</th>
                    <th>创建时间</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <template slot="item" slot-scope="{ item, index }">
                    <td>{{index}}</td>
                    <td>{{item.fileNo}}</td>
                    <td>{{item.fileName}}</td>
                    <td>
                        <a target="_blank" flat style="color: #008eff" v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="item.fileUrl">{{item.fileUrl}}</a>
                        <a target="_blank" flat style="color: #008eff" v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')" :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl">{{item.fileUrl}}</a>
                    </td>
                    <td>{{statusList[item.type-1].name}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="item.fileUrl" style="margin-right: 3px" class="blue">下载</a>
                        <a v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') " href="javascript:;" style="margin-right: 3px" class="blue" @click="downs(item)">下载</a>
                    </td>
                    <!-- <td class="t-right">
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="edit(item)">编辑</a> |
                        <a href="javascript:;" style="margin-right: 3px" class="blue" @click="remove(item)">删除</a>
                    </td>-->
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "page-contract",
    components: { DataList },
    data() {
        return {
            filter: {
                fileNo: "",
                fileName: "",
                type: 0
            },
            statusList: []
        };
    },
    created() {
        this.getFileTypeStatus();
    },
    methods: {
        flush() {
            this.filter = {
                fileNo: "",
                fileName: "",
                type: 0
            };
            this.$refs.list.update(true);
        },
        edit(item) {
            this.$router.push(`/fileupload/edit?id=${item.id}`);
        },
        downloadIamge(imgsrc, name) {
            //下载图片地址和图片名
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

                var a = document.createElement("a"); // 生成一个a元素
                var event = new MouseEvent("click"); // 创建一个单击事件
                a.download = name || "photo"; // 设置图片名称
                a.href = url; // 将生成的URL设置为a.href属性
                a.dispatchEvent(event); // 触发a的单击事件
            };
            image.src = imgsrc;
        },
        downs(item) {
            this.downloadIamge(item.fileUrl, item.fileName);
        },
        getFileTypeStatus() {
            this.$http
                .get(`/haolifa/file/fileTypeList`)
                .then(res => {
                    this.statusList = res.map(item => {
                        return { status: item.code, name: item.desc };
                    });
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除以下库房吗？<br><b>${item.materialName}</b>`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .delete(`/haolifa/file/delete/${item.id}`)
                        .then(res => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-contract {
    // height: 100%;
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
}
</style>