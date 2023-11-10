<template>
    <div class="page-home scroll-y">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="home-row flex">
            <div class="home-card flex-item flex-col relative">
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a" :class="{ 'on': tab1 }" @click="tab1 = true">待办事项</a>
                    <a class="home-tab-item a" :class="{ 'on': !tab1 }" @click="tab1 = false">已办事项</a>
                    <a href="javascript:;" @click="toTask" style="position:relative;left:66%;color:#009bff">更多..</a>
                </div>
                <div class="home-list flex-item scroll-y" v-if="tab1">
                    <div class="home-list-item a flex-v-center" v-for="item in todo" :key="item.id">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div style="width:145px" v-if="item.flowId == 5" class="c-8 date-time"
                            @click="$router.push({ path: '/entrust', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 4" class="c-8 date-time"
                            @click="$router.push({ path: '/replace', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 3" class="c-8 date-time"
                            @click="$router.push({ path: '/supplierAudit', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 1 || item.flowId == 6" class="c-8 date-time"
                            @click="$router.push({ path: '/produce', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 2" class="c-8 date-time"
                            @click="$router.push({ path: '/purchase', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 10" class="c-8 date-time"
                            @click="$router.push({ path: '/paymentApply', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 12" class="c-8 date-time"
                            @click="$router.push({ path: '/jkfkEntrust', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 11" class="c-8 date-time"
                            @click="$router.push({ path: '/baoxiaoEntrust', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px"
                            v-if="item.flowId == 13 || item.flowId == 15 || item.flowId == 17 || item.flowId == 19"
                            class="c-8 date-time"
                            @click="$router.push({ path: '/machine', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 14 || item.flowId == 16" class="c-8 date-time"
                            @click="$router.push({ path: '/purchaseMachine', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <!-- <div style="width:145px" v-if="item.flowId == 15" class="c-8 date-time"
                            @click="$router.push({ path: '/purchaseMachine', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div> -->
                        <div class="c-8 date-time text-ellipsis" style="width:145px">流程：{{ item.flowName }}</div>
                        <div class="flex-item text-ellipsis">{{ (item.flowId == 12 || item.flowId == 11) ?
                            '流程号' : '订单号' }}：{{ item.formNo }}</div>
                        <div class="date-time text-ellipsis">发起时间：{{ item.createTime }}</div>
                    </div>
                    <div v-if="!todo.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
                <div class="home-list flex-item scroll-y" v-else>
                    <div class="home-list-item a flex-v-center" v-for="item in done" :key="item.id">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div style="width:145px" v-if="item.flowId == 5" class="c-8 date-time"
                            @click="$router.push({ path: '/purchase', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 4" class="c-8 date-time"
                            @click="$router.push({ path: '/replace', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 3" class="c-8 date-time"
                            @click="$router.push({ path: '/supplierAudit', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 1 || item.flowId == 6" class="c-8 date-time"
                            @click="$router.push({ path: '/produce', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 2" class="c-8 date-time"
                            @click="$router.push({ path: '/purchase', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 10" class="c-8 date-time"
                            @click="$router.push({ path: '/paymentApply', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 12" class="c-8 date-time"
                            @click="$router.push({ path: '/jkfkEntrust', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 11" class="c-8 date-time"
                            @click="$router.push({ path: '/baoxiaoEntrust', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 13" class="c-8 date-time"
                            @click="$router.push({ path: '/machine', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div style="width:145px" v-if="item.flowId == 14" class="c-8 date-time"
                            @click="$router.push({ path: '/purchaseMachine', query: { instanceId: item.instanceId, stepId: item.stepId } })">
                            发起人：{{ item.createUserRealName }}</div>
                        <div class="c-8 date-time text-ellipsis" style="width:145px">流程：{{ item.flowName }}</div>
                        <div class="flex-item text-ellipsis">{{ (item.flowId == 12 || item.flowId == 11) ?
                            '流程号' : '订单号' }}：{{ item.formNo }}</div>
                        <div class="date-time text-ellipsis">发起时间：{{ item.createTime }}</div>
                    </div>
                    <div v-if="!done.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
            <div class="home-card flex-item flex-col relative" v-if="roleFlag">
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a on">打分列表</a>
                    <a href="javascript:;" @click="scoreDetail" style="position:relative;left:79%;color:#009bff">查看打分</a>
                </div>
                <div class="home-list flex-item scroll-y">
                    <div class="home-list-item a flex-v-center">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="flex-item text-ellipsis">姓名</div>
                        <div class="flex-item text-ellipsis">岗位名称</div>
                        <div class="flex-item text-ellipsis">创建时间</div>
                        <div class="flex-item text-ellipsis">更新时间</div>
                        <div class="flex-item text-ellipsis">操作</div>
                    </div>
                    <div class="home-list-item a flex-v-center" v-for="item in scoreList" :key="item.id">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="flex-item text-ellipsis">{{ item.userName }}</div>
                        <div class="flex-item text-ellipsis">{{ item.postName }}</div>
                        <div class="flex-item text-ellipsis">{{ item.createTime }}</div>
                        <div class="flex-item text-ellipsis">{{ item.updateTime }}</div>
                        <div class="flex-item text-ellipsis" style="color:#409eff" @click="giveScore(item)">打分</div>
                    </div>
                    <div v-if="!scoreList.length" style="pointer-events:none;" class="flex-item flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
            <div class="home-card flex-item flex-col relative" v-else>
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a" :class="{ 'on': tab2 }" @click="tab2 = true">通知</a>
                    <a class="home-tab-item a" :class="{ 'on': !tab2 }" @click="tab2 = false">公告</a>
                </div>
                <div class="home-list flex-item scroll-y" v-if="tab2">
                    <div class="home-list-item a flex-v-center">
                        <!--<i class="icon f-16 c-a">hourglass_full</i>-->
                        <div class="c-8 date-time" style="width:80%">标题</div>
                        <div class="c-8 date-time" style="width:85px;">创建时间</div>
                        <!-- <div class="flex-item text-ellipsis">内容</div> -->
                    </div>
                    <div class="home-list-item a flex-v-center" v-for="item in notice" :key="item.id"
                        @click="newDetail(item.id)">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="c-8 date-time" style="width: 76%;">{{ item.title }}</div>
                        <div class="c-8 date-time" style="width:85px;">{{ item.showTime }}</div>
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
                    <div class="home-list-item a flex-v-center" v-for="item in news" :key="item.id"
                        @click="newDetail(item.id)">
                        <i class="icon f-16 c-a">hourglass_full</i>
                        <div class="c-8 date-time" style="width:76%">{{ item.title }}</div>
                        <div class="c-8 date-time" style="width:85px;">{{ item.showTime }}</div>
                        <!-- <div class="flex-item text-ellipsis">{{item.content}}</div> -->
                    </div>
                    <div v-if="!news.length" style="pointer-events:none;" class="abs flex-center">
                        <no-data></no-data>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-row flex" v-if="!roleFlag">
            <div class="home-card flex-item flex-col">
                <!-- <div class="home-tab flex-v-center">
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
                </div> -->
                <div class="home-tab flex-v-center">
                    <a class="home-tab-item a on">生产日计划</a>
                    <div style="width:90%;margin:20px auto;display:flex;position: relative;z-index:20">
                        <el-date-picker size="mini" v-model="filter.planDate" type="date" value-format="yyyy-MM-dd"
                            @change="$refs.list.update(true)" placeholder="选择计划日期"></el-date-picker>
                    </div>
                </div>
                <div class="flex-item scroll-y">
                    <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/production-daily-plan/detail/page"
                        method="post" :borderFlag="true">
                        <tr slot="header">
                            <th style="width: 60px;">序号</th>
                            <th>计划日期</th>
                            <th>订单号</th>
                            <th>订单数量</th>
                            <th>已完成数量</th>
                            <th>发货日期</th>
                            <th>计划完成日期</th>
                            <th>实际完成日期</th>
                            <th>备注</th>
                        </tr>
                        <template slot="item" slot-scope="{ item,index }">
                            <td class="c-a">{{ index }}</td>
                            <td>{{ item.planDate }}</td>
                            <td>{{ item.orderNo }}</td>
                            <td>{{ item.orderNumber }}</td>
                            <td>{{ item.finishNumber }}</td>
                            <td>{{ item.deliveryDate }}</td>
                            <td>{{ item.planFinishDate }}</td>
                            <td>{{ item.actualFinishDate }}</td>
                            <td>{{ item.remark }}</td>
                        </template>
                    </data-list>
                </div>
            </div>
        </div>
        <div class="home-row flex" v-if="roleFlag">
            <div class="home-card flex-item flex-col" style="min-height:240px">
                <el-descriptions class="margin-top" :column="4" border label-class-name="my-label"
                    contentClassName="my-content">
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toXlIndex">应收款总额</el-link>
                        </template>
                        {{ initInfo.totalAccountsReceivable }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">到期应收</template>
                        {{ initInfo.dueReceivable }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toCgIndex">应付款总额</el-link>
                        </template>
                        {{ initInfo.totalAccountsPayable }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">到期应付</template>
                        {{ initInfo.duePayable }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toXlIndex">产值总额</el-link>
                        </template>
                        {{ initInfo.totalOutputValue }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toXlIndex">当月产值</el-link>
                        </template>
                        {{ initInfo.currentMonthOutputValue }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toXlIndex">订货总额</el-link>
                        </template>
                        {{ initInfo.totalOrder }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <el-link type="primary" style="font-weight: 600;" :underline="false"
                                @click="toXlIndex">当月订货额</el-link>
                        </template>
                        {{ initInfo.currentMonthTotalOrder }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">利润总额</template>
                        {{ initInfo.totalProfit }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">各项费用支出总额</template>
                        {{ initInfo.variousExpenses }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">资产负债率</template>
                        {{ initInfo.assetLiabilityRatio }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">销售利润率</template>
                        {{ initInfo.salesProfitMargin }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">成本费用利用率</template>
                        {{ initInfo.costUtilization }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">现金流量</template>
                        {{ initInfo.cashFlow }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">制造成本</template>
                        {{ initInfo.manufacturingCost }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">占比</template>
                        {{ initInfo.manufacturingCostRatio }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">管理成本</template>
                        {{ initInfo.manageCost }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">占比</template>
                        {{ initInfo.manageCostRatio }}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">库存周转率</template>
                        {{ initInfo.inventoryTurnoverRate }}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
        <div v-if="roleFlag">
            <div style="width:90%;margin:20px auto;display:flex;position: relative;z-index:20">
                <el-date-picker size="mini" v-model="yearDate" :clearable="false" type="year" value-format="yyyy"
                    @change="getCbOne" :editable="false" placeholder="选择年"></el-date-picker>
            </div>
            <div style="height:300px;width:96%;margin:0 auto;margin-top: -54px">
                <div id="cbyOne" style="width:100%;height:300px;margin:0 auto"></div>
            </div>
            <div style="width:90%;margin:20px auto;display:flex;position: relative;z-index:20">
                <el-date-picker size="mini" v-model="yearDate2" :clearable="false" type="year" value-format="yyyy"
                    @change="getCbTwo" :editable="false" placeholder="选择年"></el-date-picker>
            </div>
            <div style="height:300px;width:96%;margin:0 auto;margin-top: -54px">
                <div id="cbyTwo" style="width:100%;height:300px;margin:0 auto"></div>
            </div>
            <div style="width:90%;margin:20px auto;display:flex;position: relative;z-index:20">
                <el-date-picker size="mini" v-model="yearDate3" :clearable="false" type="year" value-format="yyyy"
                    @change="getCbThree" :editable="false" placeholder="选择年"></el-date-picker>
            </div>
            <div style="height:300px;width:96%;margin:0 auto;margin-top: -54px">
                <div id="cbyThree" style="width:100%;height:300px;margin:0 auto"></div>
            </div>
        </div>
        <layer v-if="scorelayer" title="打分 " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <select-box v-model="form.userId" class="flex-item mr-20" :disabled="true" :list="userList"
                        label="姓名"></select-box>
                </div>
                <div class="flex">
                    <select-box v-model="form.assessmentId" @change="assessmentChange" class="flex-item mr-20"
                        :list="assessmentList" label="考核内容"></select-box>
                </div>
                <div class="flex">
                    <input-box v-model="info.standard" :disabled="true" class="flex-item mr-20" label="考核标准"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="info.score" :disabled="true" class="flex-item mr-20" label="对应分值"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.score" class="flex-item mr-20" label="分数"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.remark" class="flex-item mr-20" label="说明"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
        <layer v-if="scoreDetailLayer" title="打分结果列表" width="70%">
            <div class="flex-item scroll-y">
                <data-list ref="scoreDetailList" :page-size="50" :param="{}" url="/haolifa/pay-assessment-score/getList"
                    method="post">
                    <tr slot="header">
                        <th style="width: 60px;">序号</th>
                        <th>人员</th>
                        <th>分数</th>
                    </tr>
                    <template slot="item" slot-scope="{ item, index }">
                        <td class="c-a">{{ index }}</td>
                        <td>{{ item.userName }}</td>
                        <td>{{ item.score }}</td>
                    </template>
                </data-list>
            </div>
            <div class="layer-btns">
                <btn flat color="#008eff" @click="scoreDetailLayer = false">关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
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
                    path: "applybuy",
                },
                { color: "#e86d6d", icon: "check_box", path: "" },
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
            url: "",
            scoreList: [],
            scorelayer: false,
            assessmentList: [],
            form: {
                assessmentId: "",
                id: "",
                score: "",
                userId: "",
                userName: "",
                remark: "",
            },
            info: {},
            loading: false,
            userList: [],
            scoreDetailLayer: false,
            initInfo: {},
            yearDate: new Date().getFullYear() + "",
            yearDate2: new Date().getFullYear() + "",
            yearDate3: new Date().getFullYear() + "",
            roleFlag: false,
            planList: [],
            filter: {
                orderNo: "",
                planDate: "",
                planFinishDate: "",
                planStatus: "",
            },
        };
    },
    components: { DataList },
    activated() {
        if (!this.filter.planDate) {
            this.filter.planDate = this.getToday();
        }
        this.$refs.list.update(true);
        let roleList = this.$store.state.account.roles;
        roleList.map((item) => {
            if (item.role === "ROLE_ZJL") {
                this.roleFlag = true;
            }
        });
        this.getTodo();
        this.getDone();
        if (this.roleFlag) {
            this.getScoreList();
            this.getAllUsers();
            this.getInit();
            this.getCbOne();
            this.getCbTwo();
            this.getCbThree();
        } else {
            this.getNews();
            this.getQuickStart();
            this.getOrderStatusList();
            this.getOrderList();
            // this.getPlanList();
        }
    },
    methods: {
        getToday() {
            let date = new Date();
            return date.getFullYear() + "-" + this.addZero(date.getMonth() + 1) + "-" + this.addZero(date.getDate());
        },
        addZero(val) {
            return val < 10 ? "0" + val : val;
        },
        flush() {
            let roleList = this.$store.state.account.roles;
            roleList.map((item) => {
                if (item.role === "ROLE_ZJL") {
                    this.roleFlag = true;
                }
            });
            this.filter.planDate = this.getToday();
            this.$refs.list.update(true);
            this.getTodo();
            this.getDone();
            if (this.roleFlag) {
                this.getScoreList();
                this.getAllUsers();
                this.getInit();
                this.yearDate = new Date().getFullYear() + "";
                this.getCbOne();
                this.yearDate2 = new Date().getFullYear() + "";
                this.getCbTwo();
                this.yearDate3 = new Date().getFullYear() + "";
                this.getCbThree();
            } else {
                this.getNews();
                this.getQuickStart();
                this.getOrderStatusList();
                this.getOrderList();
                // this.getPlanList();
            }
        },

        getInit() {
            this.$http.get("/haolifa/business-analysis/get").then((res) => {
                // this.todo = res.list;
                this.initInfo = res;
            });
        },
        getTodo() {
            this.$http.get("/haolifa/todo").then((res) => {
                this.todo = res.list;
            });
        },
        getDone() {
            this.$http.get("/haolifa/done").then((res) => {
                this.done = res.list;
            });
        },
        toTask() {
            this.$router.push(`/taskfinishlist`);
        },
        getNews() {
            this.$http.get("/haolifa/message/pageInfo/2").then((res) => {
                this.notice = res.list;
            });
            this.$http.get("/haolifa/message/pageInfo/1").then((res) => {
                this.news = res.list;
            });
        },
        getQuickStart() {
            this.$http.get("/haolifa/quick-start").then((res) => {
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
                    pageSize: 30,
                })
                .then((res) => {
                    this.orderList = res.list;
                });
        },
        // getPlanList() {
        //     this.$http.post("/haolifa/production-daily-plan/page", {}).then((res) => {
        //         this.planList = res;
        //     });
        // },
        getOrderStatusList() {
            this.$http.get("/haolifa/order-product/order-status-list").then((res) => {
                this.orderStatusList = res.map((item) => {
                    return { value: item.code, text: item.desc };
                });
            });
        },
        getScoreList() {
            this.$http
                .post("/haolifa/pay-user/getScoreUserList", {
                    pageNum: 1,
                    pageSize: 500,
                })
                .then((res) => {
                    this.scoreList = res.list;
                });
        },
        toTask() {
            this.$router.push(`/taskfinishlist`);
        },
        giveScore(item) {
            this.form.userId = item.id;
            this.form.userName = item.userName;
            this.assessmentList = [];
            this.$http
                .post("/haolifa/pay-assessment-quota/getAllList", {
                    departId: item.postId,
                    departName: "",
                    pageNum: 0,
                    pageSize: 0,
                    projectName: "",
                })
                .then((res) => {
                    if (!res.length) {
                        this.$toast("未查到该人员岗位考核数据");
                        return;
                    }
                    this.scorelayer = true;
                    res.map((item) => {
                        this.assessmentList.push({
                            text: item.quotaContent,
                            value: item.id,
                            score: item.score,
                            standard: item.standard,
                        });
                    });
                    // this.form.assessmentId = res[0].id;
                    // this.info = res[0];
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        assessmentChange() {
            this.info = {};
            if (this.form.assessmentId) {
                this.assessmentList.map((item) => {
                    if (item.value == this.form.assessmentId) {
                        this.info = item;
                    }
                });
            }
        },
        save() {
            this.loading = true;
            let url = "/haolifa/pay-assessment-score/edit";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.scorelayer = false;
                    this.$toast("保存成功");
                    this.close();
                    this.loading = false;
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.scorelayer = false;
            this.form = {
                assessmentId: "",
                id: "",
                score: "",
                userId: "",
                userName: "",
                remark: "",
            };
        },
        getAllUsers() {
            this.userList = [];
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: "",
                    pageNum: 0,
                    pageSize: "",
                    postId: "",
                    postName: "",
                    sex: "",
                    superiorId: "",
                    teamId: "",
                    teamName: "",
                    userName: "",
                    userType: "",
                })
                .then((res) => {
                    res.map((item) => {
                        this.userList.push({
                            text: item.userName,
                            value: item.id,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        scoreDetail() {
            this.scoreDetailLayer = true;
            this.$refs.scoreDetailList.update(true);
        },
        getCbOne() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/finance`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate,
                })
                .then((res) => {
                    let nameData = [],
                        valueData = [];
                    res.map((item) => {
                        nameData.push(item.dataMonth), valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(document.getElementById("cbyOne"));
                    let option = {
                        color: ["#409eff"],
                        title: {
                            text: "财务成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center",
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData,
                        },
                        yAxis: {
                            type: "value",
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } },
                            },
                        ],
                    };
                    chart.setOption(option);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getCbTwo() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/material`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate2,
                })
                .then((res) => {
                    let nameData = [],
                        valueData = [];
                    res.map((item) => {
                        nameData.push(item.dataMonth), valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(document.getElementById("cbyTwo"));
                    let option = {
                        color: ["#409eff"],
                        title: {
                            text: "材料成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center",
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData,
                        },
                        yAxis: {
                            type: "value",
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } },
                            },
                        ],
                    };
                    chart.setOption(option);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getCbThree() {
            let that = this;
            this.$http
                .post(`/haolifa/report/cost/quality`, {
                    endDate: "",
                    startDate: "",
                    year: this.yearDate3,
                })
                .then((res) => {
                    let nameData = [],
                        valueData = [];
                    res.map((item) => {
                        nameData.push(item.dataMonth), valueData.push(item.totalAmount);
                    });
                    let chart = this.$echarts.init(document.getElementById("cbyThree"));
                    let option = {
                        color: ["#409eff"],
                        title: {
                            text: "质量成本趋势图",
                            // subtext: "纯属虚构",
                            x: "center",
                        },
                        xAxis: {
                            type: "category",
                            boundaryGap: false,
                            data: nameData,
                        },
                        yAxis: {
                            type: "value",
                        },
                        series: [
                            {
                                data: valueData,
                                type: "line",
                                areaStyle: {},
                                itemStyle: { normal: { label: { show: true } } },
                            },
                        ],
                    };
                    chart.setOption(option);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        toXlIndex() {
            this.$router.push({ name: "xsreport-forms" });
        },
        toCgIndex() {
            this.$router.push({ name: "cgreport-forms" });
        },
    },
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

    .my-label {
        background: #409eff26;
        color: #666;
        font-size: 15px;
        font-weight: 600 !important;
        border: 1px solid #c0c4cc !important;
    }

    .my-content {
        font-size: 15px;
        border: 1px solid #c0c4cc !important;
    }
}
</style>
