<template>
    <div class="page-home scroll-y">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="home-row flex">
            <div class="home-card flex-item flex-col relative">
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a" :class="{'on': tab1}" @click="tab1=true">待办事项</a>
                    <a class="home-tab-item a" :class="{'on': !tab1}" @click="tab1=false">已办事项</a>
                    <a href="javascript:;" @click="toTask" style="position:relative;left:66%;color:#009bff">更多..</a>
                </div>
                <div class="home-list flex-item scroll-y" v-if="tab1">
                    <div class="home-list-item a flex-v-center" v-for="item in todo" :key="item.id">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div style="width:145px" v-if="item.flowId == 5" class="c-8 date-time" @click="$router.push({path:'/entrust',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 4" class="c-8 date-time" @click="$router.push({path:'/replace',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 3" class="c-8 date-time" @click="$router.push({path:'/supplierAudit',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 1 || item.flowId == 6" class="c-8 date-time" @click="$router.push({path:'/produce',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 2" class="c-8 date-time" @click="$router.push({path:'/purchase',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 10" class="c-8 date-time" @click="$router.push({path:'/paymentApply',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 12" class="c-8 date-time" @click="$router.push({path:'/jkfkEntrust',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 11" class="c-8 date-time" @click="$router.push({path:'/baoxiaoEntrust',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div class="c-8 date-time text-ellipsis" style="width:145px">流程：{{item.flowName}}</div>
                        <div class="flex-item text-ellipsis">{{(item.flowId == 12 || item.flowId == 11) ? '流程号':'订单号'}}：{{item.formNo}}</div>
                        <div class="date-time text-ellipsis">发起时间：{{item.createTime}}</div>
                    </div>
                    <div v-if="!todo.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
                <div class="home-list flex-item scroll-y" v-else>
                    <div class="home-list-item a flex-v-center" v-for="item in done" :key="item.id">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div style="width:145px" v-if="item.flowId == 5" class="c-8 date-time" @click="$router.push({path:'/purchase',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 4" class="c-8 date-time" @click="$router.push({path:'/replace',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 3" class="c-8 date-time" @click="$router.push({path:'/supplierAudit',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 1 || item.flowId == 6" class="c-8 date-time" @click="$router.push({path:'/produce',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 2" class="c-8 date-time" @click="$router.push({path:'/purchase',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 10" class="c-8 date-time" @click="$router.push({path:'/paymentApply',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 12" class="c-8 date-time" @click="$router.push({path:'/jkfkEntrust',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div style="width:145px" v-if="item.flowId == 11" class="c-8 date-time" @click="$router.push({path:'/baoxiaoEntrust',query:{instanceId:item.instanceId,stepId:item.stepId}})">发起人：{{item.createUserRealName}}</div>
                        <div class="c-8 date-time text-ellipsis" style="width:145px">流程：{{item.flowName}}</div>
                        <div class="flex-item text-ellipsis">{{(item.flowId == 12 || item.flowId == 11) ? '流程号':'订单号'}}：{{item.formNo}}</div>
                        <div class="date-time text-ellipsis">发起时间：{{item.createTime}}</div>
                    </div>
                    <div v-if="!done.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
            <div class="home-card flex-item flex-col relative">
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a" :class="{'on': tab2}" @click="tab2=true">通知</a>
                    <a class="home-tab-item a" :class="{'on': !tab2}" @click="tab2=false">公告</a>
                </div>
                <div class="home-list flex-item scroll-y" v-if="tab2">
                    <div class="home-list-item a flex-v-center">
                        <!--<i class="icon f-16 c-a">hourglass_full</i>-->
                        <div class="c-8 date-time" style="width:80%">标题</div>
                        <div class="c-8 date-time" style="width:85px;">创建时间</div>
                        <!-- <div class="flex-item text-ellipsis">内容</div> -->
                    </div>
                    <div class="home-list-item a flex-v-center" v-for="item in notice" :key="item.id" @click="newDetail(item.id)">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="c-8 date-time" style="width: 76%;">{{item.title}}</div>
                        <div class="c-8 date-time" style="width:85px;">{{item.showTime}}</div>
                        <!-- <div class="flex-item text-ellipsis">{{item.content}}</div> -->
                    </div>
                    <div v-if="!notice.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
                <div class="home-list flex-item scroll-y" v-else>
                    <div class="home-list-item a flex-v-center">
                        <!--<i class="icon f-16 c-a">hourglass_full</i>-->
                        <div class="c-8 date-time" style="width:80%">标题</div>
                        <div class="c-8 date-time" style="width:85px;">创建时间</div>
                        <!-- <div class="flex-item text-ellipsis">内容</div> -->
                    </div>
                    <div class="home-list-item a flex-v-center" v-for="item in news" :key="item.id" @click="newDetail(item.id)">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="c-8 date-time" style="width:76%">{{item.title}}</div>
                        <div class="c-8 date-time" style="width:85px;">{{item.showTime}}</div>
                        <!-- <div class="flex-item text-ellipsis">{{item.content}}</div> -->
                    </div>
                    <div v-if="!news.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-row flex">
            <div class="home-card flex-item flex-col">
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a on">订单列表</a>
                </div>
                <div class="home-list flex-item scroll-y">
                    <div class="home-list-item a flex-v-center">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="flex-item text-ellipsis">订单号</div>
                        <div class="flex-item text-ellipsis">订单状态</div>
                        <div class="flex-item text-ellipsis">发货日期</div>
                        <div class="flex-item text-ellipsis">创建时间</div>
                    </div>
                    <div class="home-list-item a flex-v-center" v-for="item in orderList" :key="item.id" @click="orderInfo(item)">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="flex-item text-ellipsis">{{item.orderNo}}</div>
                        <div class="flex-item text-ellipsis">{{orderStatusList[item.orderStatus].text}}</div>
                        <div class="flex-item text-ellipsis">{{item.deliveryDate}}</div>
                        <div class="flex-item text-ellipsis">{{item.createTime}}</div>
                    </div>
                    <div v-if="!orderList.length" style="pointer-events:none;" class="flex-item flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "page-home",
    data() {
        return {
            tab1: true,
            tab2: true,
            quickIcons: [
                {},
                { color: "#21d0b8", icon: "directions_walk", path: "applybuy" },
                { color: "#ffa114", icon: "shopping_cart", path: "" },
                { color: "#ca83dc", icon: "check_circle", path: "" },
                { color: "#e2c223", icon: "local_shipping", path: "" },
                { color: "#51c4e6", icon: "receipt", path: "invoiceflow" },
                { color: "#e86db7", icon: "build", path: "" },
                {
                    color: "#6d89e8",
                    icon: "add_shopping_cart",
                    path: "applybuy"
                },
                { color: "#e86d6d", icon: "check_box", path: "" }
            ],
            todo: [],
            done: [],
            notice: [],
            news: [],
            quick: [],
            orderList: [],
            orderStatusList: [],
            messageList: [],
            account: "",
            url: ""
        };
    },
    activated() {
        this.getTodo();
        this.getDone();
        this.getNews();
        this.getQuickStart();
        this.getOrderStatusList();
        this.getOrderList();
        // this.getMessageList();
    },
    created() {
        this.getTodo();
        this.getDone();
        this.getNews();
        this.getQuickStart();
        this.getOrderStatusList();
        this.getOrderList();
        // this.getMessageList();
    },
    methods: {
        flush() {
            this.getTodo();
            this.getDone();
            this.getNews();
            this.getQuickStart();
            this.getOrderStatusList();
            this.getOrderList();
            this.getMessageList();
        },
        getTodo() {
            this.$http.get("/haolifa/todo").then(res => {
                this.todo = res.list;
            });
        },
        getMessageList() {
            this.account = this.$store.state.account;
            if (this.account.roles || this.account.username) {
                if (
                    this.account.roles[0].role == "ROLE_ADMIN" ||
                    this.account.username == "SXHL001" ||
                    this.account.username == "HLJG-01"
                ) {
                    this.url = "/haolifa/hlmail/getMails";
                } else {
                    let userId = this.$store.state.account.userId;
                    this.url = `/haolifa/hlmail/getMailsByUserId?userId=${userId}&pageNum=1%pageSize=20`;
                }
            } else {
                let userId = this.$store.state.account.userId;
                this.url = `/haolifa/hlmail/getMailsByUserId?userId=${userId}&pageNum=1%pageSize=20`;
            }
            this.$http.get(this.url).then(res => {
                this.messageList = res.list;
            });
        },
        message() {
            this.$router.push(`/message`);
        },
        getDone() {
            this.$http.get("/haolifa/done").then(res => {
                this.done = res.list;
            });
        },
        toTask() {
            this.$router.push(`/taskfinishlist`);
        },
        getNews() {
            this.$http.get("/haolifa/message/pageInfo/2").then(res => {
                this.notice = res.list;
            });
            this.$http.get("/haolifa/message/pageInfo/1").then(res => {
                this.news = res.list;
            });
        },
        getQuickStart() {
            this.$http.get("/haolifa/quick-start").then(res => {
                this.quick = res;
            });
        },
        newDetail(id) {
            this.$router.push(`/notification/info?id=${id}`);
        },
        orderInfo(item) {
            this.$router.push(`/order-info?orderNo=${item.orderNo}`);
        },
        getOrderList() {
            this.$http
                .post("/haolifa/order-product/pageInfo", {
                    orderNo: "",
                    orderStatus: -1,
                    pageNum: 1,
                    pageSize: 30
                })
                .then(res => {
                    this.orderList = res.list;
                });
        },
        getOrderStatusList() {
            this.$http
                .get("/haolifa/order-product/order-status-list")
                .then(res => {
                    this.orderStatusList = res.map(item => {
                        return { value: item.code, text: item.desc };
                    });
                });
        }
    }
};
</script>

<style lang="less">
.page-home {
    // height: 100%;
    padding: 10px 0;
    width: 100%;
    .home-row {
        padding: 10px;
    }
    .home-card {
        margin: 0 10px;
        border: 1px solid #ddd;
        min-height: 280px;
        border-radius: 4px;
        width: 0;
        max-height: 300px;
    }
    .home-tab {
        border-bottom: 1px solid #eee;
        padding: 0 10px;
        overflow: hidden;
        .home-tab-item {
            display: inline-block;
            padding: 12px 10px 10px 10px;
            border-bottom: 2px solid transparent;
            margin-bottom: -1px;
            &:hover {
                background: #f3f3f3;
            }
            &.on {
                border-color: #008eff;
                color: #008eff;
                background: transparent;
            }
        }
    }
    .home-list {
        padding: 8px 0;
    }
    .home-list-item {
        padding: 7px 10px;
        white-space: nowrap;
        line-height: 1em;
        box-sizing: border-box;
        &:hover {
            background: #f2f2f2;
        }
        .icon {
            margin-right: 10px;
        }
        .date-time {
            margin-right: 20px;
        }
    }
    .quick-start {
        flex-wrap: wrap;
        padding: 10px;
    }
    .quick-item {
        text-align: center;
        padding: 10px;
        max-width: 100px;
    }
    .quick-icon {
        padding: 15px;
        background: orange;
        display: inline-block;
        border-radius: 12px;
        .icon {
            font-size: 40px;
            color: #fff;
        }
    }
    .quick-label {
        padding: 5px 0;
    }
}
</style>
