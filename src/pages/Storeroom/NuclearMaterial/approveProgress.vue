<template>
    <div class="abs scroll-y">
        <div
            class="metalwork-info"
            style="width:100%;margin:0 auto"
        >
            <div
                class="b f-18 flex-v-center"
                style="margin-bottom: 20px;"
            >
                <icon-btn
                    class="mr-15"
                    @click="$router.back()"
                >arrow_back</icon-btn>
                <div class="flex-item">审批进度</div>
            </div>
            <div style="min-width:1200px">
                <div
                    class="approve"
                    v-for="(item,index) in list"
                    :key="index"
                >
                    <p>{{item.roleName}}</p>
                    <p :class="item.auditResult == 4 ? 'button ccc' : 'button'">{{item.stepName}}</p>
                    <span v-if="index<list.length-1">-----></span>
                    <p>{{status[item.auditResult]}}{{item.auditTime}}</p>
                    <div
                        class="approve"
                        style="position: absolute;top: 123px"
                        v-if="item.child.length>0"
                    >
                        <div class="height-line"></div>
                        <div class="bottom-arrows"></div>
                        <p>{{item.child[0].roleName}}</p>
                        <p :class="item.child[0].auditResult == 4 ? 'button ccc' : 'button'">{{item.child[0].stepName}}</p>
                        <!-- <p>测试</p>
                        <p :class="item.child[0].auditResult == 4 ? 'button ccc' : 'button'">测试</p>-->
                        <p>{{status[item.child[0].auditResult]}}{{item.auditTime}}</p>
                        <div class="right-height-line"></div>
                        <div class="top-arrows"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import parseJson from '@/utils/parseJson'
export default {
    name: "nuclear-material-approveProgress",
    data() {
        return {
            list: [],
            status: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
        };
    },
    created() {
        this.getInfo(this.$route.query.formNo, this.$route.query.formId);
    },
    activated() {
        this.getInfo(this.$route.query.formNo, this.$route.query.formId);
    },
    methods: {
        getInfo(formNo, formId) {
            console.log(formNo, formId);
            this.$http
                .get(`/haolifa/flowInstance/flow/progress?formNo=${encodeURIComponent(formNo)}&formId=${formId}`)
                .then((res) => {
                    console.log(res);
                    this.list = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
    },
};
</script>

<style lang="less">
.approve {
    display: inline-block;
    width: 230px;
    margin-right: 10px;
    margin-bottom: 40px;
    position: relative;
    p {
        width: 200px;
        margin: 10px;
        height: 16px;
        text-align: center;
    }
    .ccc {
        border-color: #ccc !important;
    }
    span {
        line-height: 41px;
        position: relative;
        left: 62px;
    }
    .button {
        position: relative;
        width: 148px;
        display: inline-block;
        line-height: 41px;
        height: 41px;
        text-align: center;
        border: 1px solid rgb(109, 182, 224);
        border-radius: 5px;
        margin: 0 auto;
        left: 42px;
    }
}
.bottom-arrows {
    width: 10px;
    height: 10px;
    border-right: 1px solid;
    border-bottom: 1px solid;
    position: absolute;
    transform: rotate(43deg);
    top: 24px;
    left: 111px;
}
.top-arrows {
    width: 10px;
    height: 10px;
    border-left: 1px solid;
    border-top: 1px solid;
    position: absolute;
    transform: rotate(43deg);
    top: 15px;
    left: 355px;
}
.height-line {
    height: 30px;
    width: 1px;
    border: 1px dashed;
    position: relative;
    left: 50%;
}
.right-height-line {
    height: 70px;
    width: 130px;
    border-bottom: 1px dashed;
    border-right: 1px dashed;
    position: absolute;
    left: 100%;
    top: 22px;
}
.metalwork-info {
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
.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
</style>
