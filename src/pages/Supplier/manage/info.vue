<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <!-- <icon-btn class="mr-15" @click="$store.commit('DELMENUTABS', '/supplier/'+$route.params.id);$router.back()">arrow_back</icon-btn> -->
                <div class="flex-item">供应商详情</div>
                <!-- <router-link :to="'/supplier/edit?id='+$route.params.id">
                    <icon-btn small v-tooltip="'编辑'">edit</icon-btn>
                </router-link>-->
            </div>
            <no-data v-if="!info.id" style="margin: 50px 0;"/>
            <table class="f-14" v-if="info.id">
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
                    <td colspan="10" class="b">基本情况</td>
                </tr>
                <tr>
                    <th colspan="1">企业名称：</th>
                    <td colspan="9">{{info.suppilerName}}</td>
                </tr>
                <tr>
                    <th colspan="1">企业性质：</th>
                    <td colspan="2">{{natureList[info.nature]}}</td>
                    <th colspan="1">地址：</th>
                    <td colspan="6">{{info.address}}</td>
                </tr>
                <tr>
                    <th colspan="1">企业网址：</th>
                    <td colspan="2">{{info.website}}</td>
                    <th colspan="1">企业电话：</th>
                    <td colspan="2">{{info.phone}}</td>
                    <th colspan="1">邮编：</th>
                    <td colspan="1">{{info.postcode}}</td>
                    <th colspan="1">传真：</th>
                    <td colspan="1">{{info.fax}}</td>
                </tr>
                <tr>
                    <th colspan="1">法人姓名：</th>
                    <td colspan="2">{{info.legalPerson}}</td>
                    <th colspan="1">法人电话：</th>
                    <td colspan="2">{{info.legalPersonPhone}}</td>
                    <th colspan="1">供应商提供产品：</th>
                    <td colspan="3">{{info.supplierProduct}}</td>
                </tr>
                <tr>
                    <th colspan="1">工厂总面积：</th>
                    <td colspan="2">
                        {{info.totalFactoryArea}}
                        <span class="f-12 c-8">平米</span>
                    </td>
                    <th colspan="1">建筑面积：</th>
                    <td colspan="2">
                        {{info.totalArchitArea}}
                        <span class="f-12 c-8">平米</span>
                    </td>
                    <th colspan="1">班次：</th>
                    <td colspan="3">{{workTypeList[info.workType]}}</td>
                </tr>
                <tr>
                    <th colspan="1">工艺路线：</th>
                    <td colspan="9">{{info.processRoute}}</td>
                </tr>
                <tr>
                    <th colspan="1">供应商评价：</th>
                    <td colspan="9">{{info.evaluation}}</td>
                </tr>
                <tr>
                    <th colspan="1">供应商编号：</th>
                    <td colspan="5">{{info.suppilerNo}}</td>
                    <th colspan="1">填表人：</th>
                    <td colspan="1">{{info.suppilerPreparer}}</td>
                    <th colspan="1">负责人：</th>
                    <td colspan="1">{{info.responsiblePerson}}</td>
                </tr>
                <tr>
                    <td colspan="10" class="b">供应商附件</td>
                </tr>
                <tr v-for="(item,i) in info.accessories" :key="i">
                    <td colspan="6">{{item.fileName}}</td>
                    <td colspan="6">
                        <a target="_blank" v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') " :href="item.fileUrl">预览</a>
                        <a target="_blank" v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')" :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl">预览</a>
                    </td>
                </tr>
                <tr v-if="info.accessories.length==0">
                    <td colspan="10">无</td>
                </tr>
                <tr>
                    <td colspan="10" class="b">员工情况</td>
                </tr>
                <tr>
                    <th colspan="1">员工总人数：</th>
                    <td colspan="1">
                        {{info.staffInfo.totalWorkers}}
                        <span class="f-12 c-8">人</span>
                    </td>
                    <th colspan="1">管理人员：</th>
                    <td colspan="1">
                        {{info.staffInfo.managerWorkers}}
                        <span class="f-12 c-8">人</span>
                    </td>
                    <th colspan="1">生产工人：</th>
                    <td colspan="1">
                        {{info.staffInfo.productionWorkers}}
                        <span class="f-12 c-8">人</span>
                    </td>
                    <th colspan="1">技术人员：</th>
                    <td colspan="1">
                        {{info.staffInfo.technicistWorkers}}
                        <span class="f-12 c-8">人</span>
                    </td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="10" class="b">资格证书</td>
                </tr>
                <tr>
                    <td colspan="10">
                        <div class="flex checkbox-list">
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.charter ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>营业执照</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.tax ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>税务登记证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.legalPersonCode ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>法人代码证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.bankOpenAccount ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>银行开户声明</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.credibilityLetter ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>银行资信证明</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.manufacturerAuthorization ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>制造商授权证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.productCertification ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>产品鉴定证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.productPermit ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>生产许可证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.importAndExportCertification ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>进出口企业资格证书</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.credentialsInfo.otherCertification ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>相关体系认证证书</span>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="10" class="b">质量保障体系</td>
                </tr>
                <tr>
                    <td colspan="5">
                        <div class="flex checkbox-list">
                            <div class="flex-v-center checkbox-item" style="width: 180px;">
                                <i class="icon f-18 mr-5">{{info.qualityAssuranceInfo.buildQualitySystem ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>是否建立质量保障体系</span>
                            </div>
                            <div class="flex-v-center checkbox-item">
                                <i class="icon f-18 mr-5">{{info.qualityAssuranceInfo.passThirdAttestation ? 'check_box' : 'check_box_outline_blank'}}</i>
                                <span>是否通过第三方认证</span>
                            </div>
                        </div>
                    </td>
                    <th colspan="2">第二方确认单位：</th>
                    <td colspan="3">{{info.qualityAssuranceInfo.secondConfirm}}</td>
                </tr>
                <tr>
                    <td colspan="10" class="b">财务状况</td>
                </tr>
                <tr>
                    <th colspan="1">企业净值：</th>
                    <td colspan="2">
                        {{info.financialInfo.netWorth}}
                        <span class="f-12 c-8">万元</span>
                    </td>
                    <th colspan="1">目前负债：</th>
                    <td colspan="2">
                        {{info.financialInfo.liabilities}}
                        <span class="f-12 c-8">万元</span>
                    </td>
                    <th colspan="1">目前资产：</th>
                    <td colspan="3">
                        {{info.financialInfo.asset}}
                        <span class="f-12 c-8">万元</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="10" class="b">近三年经营情况</td>
                </tr>
                <tr v-for="item in info.financialInfo.businessStateList" :key="item.id">
                    <td colspan="1">
                        {{item.year}}
                        <span class="f-12 c-8">年</span>
                    </td>
                    <th colspan="1">年销售额：</th>
                    <td colspan="2">
                        {{item.sale}}
                        <span class="f-12 c-8">万元</span>
                    </td>
                    <th colspan="1">利润：</th>
                    <td colspan="2">
                        {{item.profit}}
                        <span class="f-12 c-8">万元</span>
                    </td>
                    <th colspan="1">备注：</th>
                    <td colspan="2">{{item.desc}}</td>
                </tr>
                <tr>
                    <td colspan="10" class="b">主要机构</td>
                </tr>
                <tr v-for="item in info.mainOrgan" :key="item.id">
                    <th colspan="1">部门名称：</th>
                    <td colspan="2">{{item.department}}</td>
                    <th colspan="1">负责人：</th>
                    <td colspan="1">{{item.leader}}</td>
                    <th colspan="1">电话：</th>
                    <td colspan="2">{{item.phone}}</td>
                    <th colspan="1">传真：</th>
                    <td colspan="1">{{item.fax}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import parseJson from "@/utils/parseJson";
export default {
    name: "page-supplier-info",
    data() {
        return {
            loading: false,
            natureList: ["国有", "三资", "集体", "联营", "私营"],
            workTypeList: ["正常", "两班倒", "三班倒"],
            info: {}
        };
    },
    activated() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const id = this.$route.params.id;
            this.$http
                .get(`/haolifa/supplier/info?id=${id}`)
                .then(res => {
                    res = parseJson(res, [
                        "credentialsInfo",
                        "financialInfo",
                        "mainOrgan",
                        "qualityAssuranceInfo",
                        "staffInfo"
                    ]);
                    if (res.mainOrgan && res.mainOrgan.length)
                        res.mainOrgan.forEach(item => {
                            item.id = Math.random();
                        });
                    if (
                        res.financialInfo &&
                        res.financialInfo.businessStateList &&
                        res.financialInfo.businessStateList.length
                    ) {
                        res.financialInfo.businessStateList.forEach(item => {
                            item.id = Math.random().toString();
                        });
                    }
                    this.info = res;
                })
                .catch(e => {
                    this.$toast(e.msg);
                });
        }
    }
};
</script>

<style lang="less">
.page-supplier-info {
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
