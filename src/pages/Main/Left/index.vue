<template>
    <div class="main-left c-6 f-14">
        <!-- <div class="nav-group" v-for="(item,index) in list" v-if="menus.includes(item.id)" :key="item.name"> -->
        <div
            class="nav-group"
            v-for="(item,index) in list"
            :key="item.name"
        >
            <div
                class="flex-v-center nav-item nav-toggle a"
                @click="item.open = !item.open"
            >
                <i
                    class="icon"
                    style
                >{{iconList[index]}}</i>
                <span class="flex-item b">{{item.name}}</span>
                <i class="icon">arrow_drop_{{item.open ? 'up' : 'down'}}</i>
            </div>
            <div
                v-if="item.open"
                class="openMenu"
            >
                <router-link
                    class="nav-item flex-v-center c-6"
                    v-for="m in item.children"
                    v-if="menus.includes(m.id)"
                    :key="m.id"
                    :title="m.name"
                    :to="m.url"
                    :class="{'on': $route.meta.id === m.id}"
                >{{m.name}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import menu from "./menu";
// menu.forEach((item, i) => { item.open = i === 0 })

export default {
    name: "main-left",
    data() {
        return {
            list: [],
            // Material icons 图标
            iconList: [
                "settings",
                "directions",
                "account_balance",
                "extension",
                "supervisor_account",
                "payment",
                "euro_symbol",
                "volume_up",
                "all_out",
                "polymer",
                "drafts",
                "mail",
                "view_quilt",
                "view_module",
                "art_track",
                "gesture",
                "dashboard",
                "assessment",
                "contacts",
                "filter_b_and_w",
            ],
        };
    },
    computed: {
        menus() {
            return this.$store.state.account.menus;
        },
    },
    created() {
        let { menus } = this;
        let menu = [
            {
                name: "系统管理",
                id: "parent-xtgl",
                children: [
                    {
                        name: "角色管理",
                        url: "/role",
                        id: "jsgl",
                    },
                    {
                        name: "用户管理",
                        url: "/user",
                        id: "rygl",
                    },
                    {
                        name: "人员列表",
                        url: "/jxuser",
                        id: "rylb",
                    },
                    {
                        name: "岗位列表",
                        url: "/gangwei",
                        id: "bmlb",
                    },
                    {
                        name: "部门管理",
                        url: "/department",
                        id: "bmgl",
                    },
                    {
                        name: "菜单管理",
                        url: "/department",
                        id: "cdgl",
                    },
                ],
            },
            {
                name: "流程管理",
                id: "parent-lcgl",
                children: [
                    {
                        name: "流程管理",
                        url: "/process-manager",
                        id: "lcgl",
                    },
                    {
                        name: "节点管理",
                        url: "/node",
                        id: "jdgl",
                    },
                ],
            },
            {
                name: "订单管理",
                id: "parent-ddgl",
                children: [
                    {
                        name: "订单列表",
                        url: "/order",
                        id: "ddlb",
                    },
                    {
                        name: "新增订单",
                        url: "/order/addList",
                        id: "xzdd",
                    },
                    {
                        name: "订单生成",
                        url: "/order/create",
                        id: "ddsc",
                    },
                    {
                        name: "订单缺料表",
                        url: "/order/lack",
                        id: "ddqlb",
                    },
                    {
                        name: "订单列表编辑",
                        url: "/order/proEdit",
                        id: "ddlbproduct",
                    },
                    {
                        name: "回款分解",
                        url: "/hkfenjie",
                        id: "ddhkfj",
                    },
                    {
                        name: "客户管理",
                        url: "/khglList",
                        id: "khgl",
                    },
                ],
            },
            {
                name: "库房管理",
                id: "parent-kfgl",
                children: [
                    {
                        name: "库存预警",
                        url: "/earlywarning",
                        id: "kcyj",
                    },
                    {
                        name: "库房管理",
                        url: "/room",
                        id: "kfgl",
                    },
                    {
                        name: "库位管理",
                        url: "/rack",
                        id: "kwgl",
                    },
                    {
                        name: "零件管理",
                        url: "/material",
                        id: "ljgl",
                    },
                    {
                        name: "库存查询",
                        url: "/materialquery",
                        id: "kccx",
                    },
                    {
                        name: "成品管理",
                        url: "/storeproduct",
                        id: "cpgl",
                    },
                    {
                        name: "成品库存列表",
                        url: "/productList",
                        id: "cpkclb",
                    },
                    {
                        name: "零件待入库",
                        url: "/material-room",
                        id: "ljdrk",
                    },
                    {
                        name: "喷涂待入库",
                        url: "/spray-room",
                        id: "ptdrk",
                    },
                    {
                        name: "成品待入库",
                        url: "/product-room",
                        id: "cpdrk",
                    },
                    {
                        name: "订单领料表",
                        url: "/ordermaterial",
                        id: "ddllb",
                    },
                    {
                        name: "更换料表",
                        url: "/orderupdate",
                        id: "dhlb",
                    },
                    {
                        name: "核替换料表",
                        url: "/nuclear-material/list",
                        id: "kghl",
                    },
                    {
                        name: "零件待出库",
                        url: "/part/list",
                        id: "ljdck",
                    },
                    {
                        name: "自控物资管理",
                        url: "/zikongwuzhiList",
                        id: "zkwzgl",
                    },
                    {
                        name: "零星物资管理",
                        url: "/scattered/list",
                        id: "lxwzgl",
                    },
                    {
                        name: "阀座待入库",
                        url: "/fazuo-room",
                        id: "fzdrk",
                    },
                ],
            },
            {
                name: "配套管理",
                id: "parent-ptgl",
                children: [
                    {
                        name: "零件设置",
                        url: "/part",
                        id: "ljsz",
                    },
                    {
                        name: "成品设置",
                        url: "/product",
                        id: "cpsz",
                    },
                    {
                        name: "零件分类设置",
                        url: "/parttype",
                        id: "ljflsz",
                    },
                ],
            },
            {
                name: "供应商管理",
                id: "parent-gysgl",
                children: [
                    {
                        name: "供应商管理",
                        url: "/supplier/list",
                        id: "gysgl",
                    },
                    {
                        name: "新增供应商",
                        url: "/supplier/addList",
                        id: "xzgys",
                    },
                    {
                        name: "供应商产品",
                        url: "/supplierproduct",
                        id: "gyscp",
                    },
                    {
                        name: "新增供应商产品",
                        url: "/supplierproduct/addList",
                        id: "xzgyscp",
                    },
                    {
                        name: "供应商设备",
                        url: "/supplierequipment",
                        id: "gyssb",
                    },
                ],
            },
            {
                name: "采购管理",
                id: "parent-cggl",
                children: [
                    {
                        name: "零件报检单",
                        url: "/applyBuy-material",
                        id: "ljbjd",
                    },
                    {
                        name: "创建送检单",
                        url: "/applyBuy-material/addList",
                        id: "cjsjd",
                    },
                    {
                        name: "加工委托单",
                        url: "/applyBuy-machining",
                        id: "jjgbjd",
                    },
                    {
                        name: "创建加工委托单",
                        url: "/applyBuy-machining/addList",
                        id: "cjjjgd",
                    },
                    {
                        name: "生产待采购列表",
                        url: "/applyBuy-order",
                        id: "scdcglb",
                    },
                    {
                        name: "采购列表",
                        url: "/purchsemanage-purchase/list",
                        id: "cglb",
                    },
                    {
                        name: "新增采购合同",
                        url: "/purchsemanage-purchase/addList",
                        id: "xzcght",
                    },
                    {
                        name: "机加工单列表",
                        url: "/purchsemanage-entrust/list",
                        id: "jjglb",
                    },
                    {
                        name: "新增机加工单",
                        url: "/purchsemanage-entrust/addList",
                        id: "xzjjgdd",
                    },
                    {
                        name: "付款申请列表",
                        url: "/fukuangsq/list",
                        id: "fksqlb",
                    },
                    {
                        name: "新增付款申请",
                        url: "/fukuang/list",
                        id: "xzfksq",
                    },
                ],
            },
            {
                name: "质检管理",
                id: "parent-zjgl",
                children: [
                    {
                        name: "零件质检列表",
                        url: "/inspect-material",
                        id: "ljzjlb",
                    },
                    {
                        name: "新增零件质检记录",
                        url: "/inspect-material/addList",
                        id: "xzljzjjl",
                    },
                    {
                        name: "成品质检列表",
                        url: "/inspect-product",
                        id: "cpzjlb",
                    },
                    {
                        name: "新增成品质检记录",
                        url: "/inspect-product/addList",
                        id: "xzcpzjjl",
                    },
                    {
                        name: "加工质检列表",
                        url: "/inspect-metalwork",
                        id: "jgzjlb",
                    },
                    {
                        name: "新增加工质检记录",
                        url: "/inspect-metalwork/addList",
                        id: "xzjgzjjl",
                    },
                    {
                        name: "压力测试列表",
                        url: "/stresstest",
                        id: "ylcslb",
                    },
                    {
                        name: "新增压力测试列表",
                        url: "/stresstest/addList",
                        id: "xzylcs",
                    },
                    {
                        name: "喷涂质检列表",
                        url: "/spray/inspect-form/list",
                        id: "ptzjlb",
                    },
                    {
                        name: "新增喷涂质检",
                        url: "/spray/inspect-form/addList",
                        id: "xzptzj",
                    },
                    {
                        name: "自控质检列表",
                        url: "/autoControl/zj-list",
                        id: "zkzjlb",
                    },
                    {
                        name: "新增自控质检",
                        url: "/autoControl/zjadd-list",
                        id: "xzzkzj",
                    },
                    {
                        name: "阀座质检列表",
                        url: "/fzzj/zj-list",
                        id: "fzzjlb",
                    },
                    {
                        name: "新增阀座质检",
                        url: "/fzzj/zjadd-list",
                        id: "xzfzzj",
                    },
                ],
            },
            {
                name: "发货管理",
                id: "parent-fhgl",
                children: [
                    {
                        name: "发货单列表",
                        url: "/delivery-bills",
                        id: "fhdgl",
                    },
                    {
                        name: "新增发货通知单",
                        url: "/delivery-bills/addList",
                        id: "xzfhtzd",
                    },
                    {
                        name: "发货记录列表",
                        url: "/delivery-record",
                        id: "fhjlgl",
                    },
                    {
                        name: "新增发货记录",
                        url: "/delivery-record/addList",
                        id: "xzfhjl",
                    },
                ],
            },
            {
                name: "财务管理",
                id: "parent-cwgl",
                children: [
                    {
                        name: "资产管理",
                        url: "/assets",
                        id: "zcgl",
                    },
                    {
                        name: "费用管理",
                        url: "/cost",
                        id: "fygl",
                    },
                    {
                        name: "生产合同管理",
                        url: "/production",
                        id: "schtgl",
                    },
                    {
                        name: "采购合同管理",
                        url: "/contract",
                        id: "htgl",
                    },
                    {
                        name: "进项发票管理",
                        url: "/jx-invoice",
                        id: "jxfp",
                    },
                    {
                        name: "销项发票管理",
                        url: "/xx-invoice",
                        id: "xxfp",
                    },
                    {
                        name: "发货申请列表",
                        url: "/finance-bills",
                        id: "fhsqlb",
                    },
                    {
                        name: "成品价格管理",
                        url: "/finishedPrice",
                        id: "cpjggl",
                    },
                    {
                        name: "新增成品价格",
                        url: "/finishedPrice/addList",
                        id: "xzcpjg",
                    },
                    {
                        name: "零件价格管理",
                        url: "/partPrice",
                        id: "ljjggl",
                    },
                    {
                        name: "新增零件价格",
                        url: "/partPrice/addList",
                        id: "xzljjg",
                    },
                ],
            },
            {
                name: "公告管理",
                id: "parent-gggl",
                children: [
                    {
                        name: "新闻管理",
                        url: "/news",
                        id: "xwgl",
                    },
                    {
                        name: "通知管理",
                        url: "/notification",
                        id: "tzgl",
                    },
                ],
            },
            {
                name: "站内信管理",
                id: "parent-znxgl",
                children: [
                    {
                        name: "站内信列表",
                        url: "/message",
                        id: "znxlb",
                    },
                    {
                        name: "新增站内信",
                        url: "/message/add",
                        id: "xzznx",
                    },
                    {
                        name: "已发站内信",
                        url: "/message/sent",
                        id: "yfznx",
                    },
                ],
            },
            {
                name: "经管任务",
                id: "parent-jgzx",
                children: [
                    {
                        name: "发票管理",
                        url: "/jgzx-invoice",
                        id: "kfpgl",
                    },
                    {
                        name: "新增发票管理",
                        url: "/jgzx-invoice/addList",
                        id: "xzfp",
                    },
                ],
            },
            {
                name: "计划管理",
                id: "parent-scdd",
                children: [
                    {
                        name: "零件加工管理",
                        url: "/workcar",
                        id: "jhjjglb",
                    },
                    {
                        name: "生产订单列表",
                        url: "/jhgl-scddlb-list",
                        id: "jhgl-scddlb",
                    },
                    {
                        name: "新增喷涂加工",
                        url: "/spray/add-list",
                        id: "xzptjg",
                    },
                    {
                        name: "喷涂加工列表",
                        url: "/spraylist",
                        id: "ptjglb",
                    },
                    {
                        name: "自控委托加工",
                        url: "/autoControlList",
                        id: "zkwtjglb",
                    },
                    {
                        name: "新增自控委托加工",
                        url: "/autoControl/add-list",
                        id: "xzzkwtjg",
                    },
                    {
                        name: "阀座委托加工",
                        url: "/fzwtjgList",
                        id: "fzwtjglb",
                    },
                    {
                        name: "新增阀座委托加工",
                        url: "/xzfzwtjg/add-list",
                        id: "xzfzwtjg",
                    },
                ],
            },
            {
                name: "生产过程管理",
                id: "parent-cjzr",
                children: [
                    {
                        name: "零件加工管理",
                        url: "/partmanufacturing",
                        id: "cjjjglb",
                    },
                    {
                        name: "更换料申请",
                        url: "/replacement",
                        id: "cjzr-ghllb",
                    },
                    {
                        name: "新增更换料",
                        url: "/replacement/addList",
                        id: "xzghllj",
                    },
                    {
                        name: "生产订单列表",
                        url: "/cjzr-scddlb",
                        id: "cjzr-scddlb",
                    },
                    {
                        name: "喷涂加工列表",
                        url: "/spray/produce-list",
                        id: "cjzr-scptjg",
                    },
                    {
                        name: "自控加工列表",
                        url: "/autoControl/scadd-list",
                        id: "scgc-zkjglb",
                    },
                    {
                        name: "阀座加工列表",
                        url: "/scgc-fzjglb-list",
                        id: "scgc-fzjglb",
                    },
                ],
            },
            {
                name: "技术管理",
                id: "parent-jsgl",
                children: [
                    {
                        name: "更换料列表",
                        url: "/replacementlist",
                        id: "jsgl-ghllb",
                    },
                    {
                        name: "文件/图纸管理",
                        url: "/fileupload",
                        id: "wjtzgl",
                    },
                    {
                        name: "新增文件/图纸管理",
                        url: "/fileupload/addList",
                        id: "xzwjtz",
                    },
                    {
                        name: "技术清单",
                        url: "/jishuList",
                        id: "jsqd",
                    },
                ],
            },
            {
                name: "任务管理",
                id: "parent-rwgl",
                children: [
                    {
                        name: "任务列表",
                        url: "/taskfinishlist",
                        id: "rwlb",
                    },
                ],
            },
            {
                name: "报表管理",
                id: "parent-bjgl",
                children: [
                    {
                        name: "费用报表",
                        url: "/report-forms/list",
                        id: "bjcwbj",
                    },
                    {
                        name: "销售报表",
                        url: "/report-forms/xsList",
                        id: "xsbj",
                    },
                    {
                        name: "采购报表",
                        url: "/report-forms/cgList",
                        id: "cgbj",
                    },
                    {
                        name: "质量报表",
                        url: "/report-forms/zlList",
                        id: "zlbj",
                    },
                    {
                        name: "成本报表",
                        url: "/report-forms/cbList",
                        id: "cbbb",
                    },
                ],
            },
            {
                name: "绩效管理",
                id: "parent-jxgl",
                children: [
                    {
                        name: "考核指标列表",
                        url: "/khzb",
                        id: "khzb",
                    },
                    {
                        name: "考勤列表",
                        url: "/kaoqin",
                        id: "kqb",
                    },
                    {
                        name: "工序明细列表",
                        url: "/jiaoxiaogongxu",
                        id: "gxlb",
                    },

                    {
                        name: "生产能力列表",
                        url: "/jiaoxiaonengli",
                        id: "scnl",
                    },
                    {
                        name: "创建工资列表",
                        url: "/jiaoxiaogongzi",
                        id: "gzlb",
                    },
                    {
                        name: "工资查询列表",
                        url: "/gongziList",
                        id: "gzcxlb",
                    },
                    {
                        name: "工时定额列表",
                        url: "/jiaoxiaogongshi",
                        id: "gsdelb",
                    },
                    {
                        name: "班组列表",
                        url: "/jiaoxiaobanzu",
                        id: "bzlb",
                    },
                    {
                        name: "考核打分列表",
                        url: "/jiaoxiaodafen",
                        id: "khdf",
                    },
                    {
                        name: "任务分配-零件加工",
                        url: "/lingjianTask",
                        id: "rwljjggl",
                    },
                    {
                        name: "任务分配-生产订单",
                        url: "/shengcTask",
                        id: "rwscddlb",
                    },
                    {
                        name: "任务分配-喷涂加工",
                        url: "/pentuTask",
                        id: "rwptjglb",
                    },
                    {
                        name: "任务分配-自控加工",
                        url: "/zikongTask",
                        id: "rwzkjg",
                    },
                    {
                        name: "任务分配-阀座加工",
                        url: "/fazuoTask",
                        id: "rwfzjg",
                    },
                    {
                        name: "管理人员计提列表",
                        url: "/ryjtList",
                        id: "glryjtlb",
                    },
                    {
                        name: "人员打分管理",
                        url: "/dafenList",
                        id: "jxrydfgl",
                    },
                ],
            },
            {
                name: "好利财务",
                id: "parent-hlcw",
                children: [
                    {
                        name: "借款申请",
                        url: "/jksqList",
                        id: "jksq",
                    },
                    {
                        name: "借款付款",
                        url: "/jkfkList",
                        id: "jkfk",
                    },
                    {
                        name: "报销申请",
                        url: "/baoxiaoList",
                        id: "bxsq",
                    },
                    {
                        name: "报销支付",
                        url: "/bxzfList",
                        id: "bxzf",
                    },
                    {
                        name: "现金日记账",
                        url: "/cashAccounting",
                        id: "xjrjz",
                    },
                    {
                        name: "银行日记账",
                        url: "/bankAccounting",
                        id: "yhrjz",
                    },
                    {
                        name: "其他货币",
                        url: "/otherAccounting",
                        id: "qtrjz",
                    },
                    {
                        name: "付款计划",
                        url: "/pay/planList",
                        id: "fkjh",
                    },
                    {
                        name: "应付汇总",
                        url: "/yfhzList",
                        id: "yfhz",
                    },
                    {
                        name: "科目管理",
                        url: "/kemuList",
                        id: "kmgl",
                    },
                    {
                        name: "科目费用预算",
                        url: "/kemufeiyongList",
                        id: "kmfyys",
                    },
                    {
                        name: "部门费用预算",
                        url: "/deptCost",
                        id: "bmfyys",
                    },
                    {
                        name: "应收款项",
                        url: "/tradeReceivable",
                        id: "yskx",
                    },
                    {
                        name: "财务挂账",
                        url: "/cwgzList",
                        id: "cwgg",
                    },
                    {
                        name: "分解审核",
                        url: "/fjshList",
                        id: "fjsh",
                    },
                    {
                        name: "固定资产管理",
                        url: "/gdzcList",
                        id: "gdzc",
                    },
                    {
                        name: "采购合同汇总统计",
                        url: "/caigoutongjiList",
                        id: "cghthztj",
                    },
                    {
                        name: "销售合同汇总统计",
                        url: "/xiaoshoutongjiList",
                        id: "xshthztj",
                    },
                    {
                        name: "公司单位",
                        url: "/companyList",
                        id: "gsdw",
                    },
                ],
            },
        ];
        menu.forEach((m) => {
            m.children = m.children.filter((item) => menus.includes(item.id));
        });
        this.list = menu.filter((m) => m.children.length);
        // 默认展开对应的菜单
        let id = this.$route.meta.id;
        this.list.forEach((group) => {
            let open = false;
            group.children &&
                group.children.forEach((item) => {
                    if (item.id === id) open = true;
                });
            this.$set(group, "open", open);
        });
    },
    methods: {
        getList() {
            this.$http.get("/haolifa/menu").then((res) => {
                res.forEach((item) => {
                    item.open = false;
                });
                this.list = res;
            });
        },
    },
};
</script>

<style lang="less">
.main-left {
    line-height: 1em;
    padding: 20px 0;
    white-space: nowrap;
    .nav-group {
        border-bottom: 1px solid #eaeaea;
        div.openMenu {
            background-color: #fff;
        }
    }
    .nav-item {
        height: 45px;
        padding: 5px 54px;
        box-sizing: border-box;
        .icon {
            margin-right: 10px;
            font-size: 20px;
        }
        &:hover {
            background: #eee;
        }
        &.nav-toggle {
            padding: 5px 20px;
        }
        &.on {
            background: #e0f0ff;
            color: #0175d4;
        }
    }
}
</style>
