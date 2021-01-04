<template>
    <div class="page-notification">
        <div class="flex-v-center tool-bar">
            <div class="flex-item"></div>
        </div>
        <data-list ref="list" :param="filter" url="/haolifa/hlmail/getSendMails">
            <tr slot="header">
                <th style="width: 60px;">序号</th>
                <th>发件人</th>
                <th>收件人</th>
                <th>标题</th>
                <th>内容</th>
                <th>创建时间</th>
                <th class="t-right" style="width: 80px;">操作</th>
            </tr>
            <template slot="item" slot-scope="{ item, index }">
                <td>{{index}}</td>
                <td>{{item.sendUser}}</td>
                <td>{{item.revUser}}</td>
                <td>{{item.title }}</td>
                <td>
                    <a href="javascript:;" style="color:#555" @click="infoDetail(item)">工作日志</a>
                </td>
                <!-- <td>
                    <a href="javascript:;" style="color:#555" @click="infoDetail(item)">{{item.content.toString().substring(0,20)}}...</a>
                </td>-->
                <td>{{item.createTime}}</td>
                <td class="t-right">
                    <!-- <a href="javascript:;" v-if="reserveFlag" style="margin-right: 3px" class="blue" @click="reserve(item)">回执 |</a> -->
                    <a href="javascript:;" style="margin-right: 3px" class="blue" @click="reserve(item)">回执 |</a>
                    <a href="javascript:;" style="margin-right: 3px" class="blue" @click="detail(item)">回执记录</a>
                </td>
            </template>
        </data-list>
        <layer v-if="layer" title="详情" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14">
                        <tr>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                            <td style="width: 10%;"></td>
                        </tr>
                        <tr>
                            <th colspan="2">回执人</th>
                            <th colspan="6">回内容</th>
                            <th colspan="2">回执时间</th>
                        </tr>
                        <tr v-for="item in info" :key="item.id">
                            <td colspan="2">{{item.userName}}</td>
                            <td colspan="6">{{item.content}}</td>
                            <td colspan="2">{{item.createTime}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="layer=false">关闭</btn>
            </div>
        </layer>
        <layer v-if="relayer" title="回执" width="50%">
            <div class="flex">
                <input-box v-model="reform.content" multi-line class="flex-item mr-20 ml-20" label="内容"></input-box>
            </div>
            <div class="layer-btns">
                <btn flat @click="relayer=false">取消</btn>
                <btn flat color="#008eff" @click="submit()">保存</btn>
            </div>
        </layer>
        <layer v-if="detailFlag" title="详情" width="50%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="form-content metalwork-info">
                    <table class="f-14">
                        <tr>
                            <td style="width: 15%;"></td>
                            <td style="width: 85%;"></td>
                        </tr>

                        <tr>
                            <th style="word-break:break-all;white-space: inherit">收件人</th>
                            <td>{{infoDet.revUser}}</td>
                        </tr>
                        <tr>
                            <th style="word-break:break-all;white-space: inherit">标题</th>
                            <td>{{infoDet.title}}</td>
                        </tr>
                        <tr>
                            <th>内容</th>
                            <td style="word-break:break-all;white-space: inherit" v-html="infoDet.content">{{infoDet.content}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="layer-btns">
                <btn flat @click="detailFlag=false">关闭</btn>
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
            relayer: false,
            filter: {
                userId: ""
            },
            form: {
                id: "",
                title: "",
                content: ""
            },
            url: "",
            account: "",
            info: [],
            reform: {
                content: "",
                mailId: "",
                userId: "",
                userName: ""
            },
            url: "",
            reserveFlag: false,
            detailFlag: false,
            infoDet: {}
        };
    },
    created() {
        this.account = this.$store.state.account;
        // if (this.account.roles) {
        //     if (
        //         this.account.roles[0].role == "ROLE_ADMIN"
        //         // this.account.roles[0].role == "ROLE_ZG"
        //     ) {
        //         this.url = "/haolifa/hlmail/getMails";
        //         this.reserveFlag = true;
        //     } else {
        //         this.url = "/haolifa/hlmail/getSendMails";
        //         this.filter.userId = this.account.userId;
        //     }
        // } else {
        //     this.url = "/haolifa/hlmail/getMailsByUserId";
        //     this.filter.userId = this.account.userId;
        // }
    },
    mounted() {
        console.log(this.account);
    },
    methods: {
        detail(item) {
            this.layer = true;
            let param = { mailId: item.id };
            console.log(item.id);
            this.$http
                .get(`/haolifa/hlmail/getHlMailRevesByMailId?mailId=${item.id}`)
                .then(res => {
                    this.info = res;
                    console.log(this.info);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        reserve(item) {
            this.relayer = true;
            this.reform.mailId = item.id;
            this.reform.userId = this.account.userId;
            this.reform.userName = this.account.username;
            this.reform.content = "";
        },
        infoDetail(info) {
            this.infoDet = info;
            this.detailFlag = true;
        }
    }
};
</script>

<style lang="less">
.page-notification {
}
.table-info {
    padding: 30px 20px;
    tr:first-child td {
        padding: 0;
        border: none;
    }
    th {
        font-weight: normal;
        color: #888;
    }
    td {
        color: #444;
    }
    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }
    .checkbox-list {
        flex-wrap: wrap;
    }
    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}
</style>
