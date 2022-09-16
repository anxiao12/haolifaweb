<template>
    <div class="page-orders-list">
        <i
            class="icon icon-abs"
            @click="flush"
        >autorenew</i>
        <div class="flex-v-center tool-bar">
            <div
                class="flex-v-center search-bar"
                style="margin-right: 20px;"
            >
                <i class="icon f-20 c-8">search</i>
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.orderNo"
                    @change="$refs.list.update(true)"
                    placeholder="订单号"
                    style="width: 200px;"
                >
                <select
                    v-model="filter.orderStatus"
                    disabled
                    class="f-14"
                    @change="$refs.list.update(true)"
                >
                    <option value="-1">全部</option>
                    <option
                        v-for="item in orderStatusList"
                        :value="item.value"
                        v-bind:key="item.value"
                    >{{item.text}}</option>
                </select>
                <i
                    class="icon"
                    style="margin-left: -20px;pointer-events:none;"
                >arrow_drop_down</i>
            </div>
            <div class="flex-item"></div>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :param="filter"
                url="/haolifa/order-product/pageInfo"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>订单编号</th>
                    <th>订单合同URL</th>
                    <th>发货日期</th>
                    <th>订单数量</th>
                    <th>检验合格数量</th>
                    <th>订单状态</th>
                    <th>创建时间</th>
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{index}}</td>
                    <td>{{item.orderNo}}</td>
                    <td>
                        <a
                            class="fixed-length"
                            :href="item.orderContractUrl"
                            :title="item.orderContractUrl"
                        >{{item.orderContractUrl}}</a>
                    </td>
                    <td>{{item.deliveryDate}}</td>
                    <td>{{item.totalCount}}</td>
                    <td>{{item.qualifiedNumber}}</td>
                    <td>{{orderStatusList[item.orderStatus-5].text}}</td>
                    <td>{{item.createTime}}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            v-if="item.orderStatus != 9"
                            class="blue"
                            @click="progress(item)"
                            style="margin-right: 3px;"
                        >添加质检记录|</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="infoShow(item)"
                            style="margin-right: 3px;"
                        >详情</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="completeLayer"
            :title="'添加质检记录'"
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 8%;"></td>
                            <td style="width: 8%;"></td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单编号 : {{info.orderNo}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >发货日期 : {{info.deliveryDate}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单状态 : {{ orderStatusList[info.orderStatus-5].text }}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >
                                订单合同:
                                <a
                                    :href="info.orderContractUrl"
                                    style="margin-right: 15px;"
                                >下载</a>
                                <a
                                    target="_blank"
                                    v-if="(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="info.orderContractUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ info.orderContractUrl"
                                >预览</a>
                            </td>
                            <!-- <td colspan="6" class="b">
                        订单备份合同:
                        <a :href="info.orderContractExtendUrl">下载</a>
                            </td>-->
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                                v-if="fileDetailList.length"
                            >订单附件:</td>
                            <td
                                colspan="14"
                                class="b"
                                v-else
                            >订单附件:无</td>
                        </tr>
                        <tr
                            v-for="(item,index) in fileDetailList"
                            :key="index"
                        >
                            <td
                                colspan="3"
                                class="b"
                            >{{item.fileName}}</td>
                            <td
                                colspan="12"
                                class="b"
                            >
                                <a
                                    target="_blank"
                                    v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="item.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl"
                                >预览</a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >装配车间: {{info.assemblyShop}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >装配小组: {{info.assemblyGroup}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >采购反馈时间: {{info.purchaseFeedbackTime}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >生产反馈时间: {{info.productionFeedbackTime}}</td>
                        </tr>
                        <!-- <tr>
                    <td colspan="6" class="b">工厂反馈完成时间: {{info.finishFeedbackTime}}</td>
                    <td colspan="6" class="b">反馈确认人: {{info.feedbackTimeConfirmUser}}</td>
                        </tr>-->
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >技术清单:</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="2"
                            >产品名称</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >型号</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >规格</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >数量</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >上法兰标准</td>
                            <td
                                colspan="3"
                                rowspan="1"
                            >上法兰尺寸</td>
                            <td
                                colspan="4"
                                rowspan="1"
                            >出轴尺寸</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >静扭矩</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >执行器型号</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="1"
                            >连接孔</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >角度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >中心距</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴型式</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴长度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >轴图号</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >过渡盘</td>
                        </tr>
                        <tr
                            v-for="(val,index) in JSON.parse(info.technicalRequire)"
                            :key="index"
                        >
                            <td colspan="1">{{val.name}}</td>
                            <td colspan="1">{{val.xinhao}}</td>
                            <td colspan="1">{{val.guige}}</td>
                            <td colspan="1">{{val.num}}</td>
                            <td colspan="1">{{val.biaozhun}}</td>
                            <td colspan="1">{{val.lianjiek}}</td>
                            <td colspan="1">{{val.jiaodu}}</td>
                            <td colspan="1">{{val.zhongxinju}}</td>
                            <td colspan="1">{{val.xinshi}}</td>
                            <td colspan="1">{{val.length}}</td>
                            <td colspan="1">{{val.tuhao}}</td>
                            <td colspan="1">{{val.guodupan}}</td>
                            <td colspan="1">{{val.jinniuju}}</td>
                            <td colspan="1">{{val.jishuxinhao}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单产品列表</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                class="b"
                            >产品编号</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品名称</td>
                            <td
                                colspan="1"
                                class="b"
                            >型号</td>
                            <td
                                colspan="1"
                                class="b"
                            >标签属性</td>
                            <td
                                colspan="1"
                                class="b"
                            >规格</td>
                            <td
                                colspan="2"
                                class="b"
                            >颜色</td>
                            <td
                                colspan="1"
                                class="b"
                            >产品数量</td>
                            <!-- <td colspan="1" class="b">单价</td> -->
                            <td
                                colspan="1"
                                class="b"
                            >总计价格</td>
                            <td
                                colspan="2"
                                class="b"
                            >材质说明</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品备注</td>
                        </tr>
                        <tr
                            v-for="(item,index) in info.orderProductAssociates"
                            :key="'fo'+index"
                        >
                            <td colspan="1">{{item.productNo}}</td>
                            <td colspan="2">{{item.productName}}</td>
                            <td colspan="1">{{item.productModel}}</td>
                            <td colspan="1">{{item.lable}}</td>
                            <td colspan="1">{{item.specifications}}</td>
                            <td colspan="2">{{item.productColor}}</td>
                            <td colspan="1">{{item.productNumber}}</td>
                            <!-- <td colspan="1">{{item.price}}</td> -->
                            <td colspan="1">{{item.totalPrice}}</td>
                            <td colspan="2">{{item.materialDescription}}</td>
                            <td colspan="2">{{item.productRemark}}</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="14"
                                class="b"
                            >审批附件:</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="6"
                                class="b"
                            >文件名称</td>
                            <td
                                colspan="6"
                                class="b"
                            >文件地址</td>
                            <td
                                colspan="2"
                                class="b"
                            >——</td>
                        </tr>
                        <tr
                            v-for="(accessory,index) in accessoryList"
                            :key="index"
                        >
                            <td colspan="6">{{accessory.fileName}}</td>
                            <td colspan="6">{{accessory.fileUrl}}</td>
                            <td colspan="2">
                                <a
                                    target="_blank"
                                    v-if="!(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$') "
                                    :href="accessory.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ accessory.fileUrl"
                                >预览</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="mt-15 ml-20 mr-20"
                    v-if="recordList.length"
                    style="overflow-x: auto"
                >
                    <div
                        class="b f-18 flex-v-center ml-20"
                        style="margin-bottom: 20px;"
                    >
                        <div
                            class="flex-item"
                            style="text-align: center;line-height: 24px;"
                        >已添加质检记录</div>
                    </div>
                    <div
                        class="flex-item scroll-y page-supplier-info"
                        style="overflow-x: auto"
                    >
                        <table class="data-table">
                            <tr style="display:none">
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 12%;"></td>
                            </tr>
                            <tr>
                                <th>产品编号</th>
                                <th>成品型号</th>
                                <th>成品规格</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>不合格原因</th>
                                <th>附件</th>
                                <th>状态</th>
                                <th>创建日期</th>
                            </tr>
                            <tr
                                v-for="(item, i) in recordList"
                                :key="i"
                            >
                                <td>{{item.productNo}}</td>
                                <td>{{item.productModel}}</td>
                                <td>{{item.productSpecifications}}</td>
                                <td>{{item.testingNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.reasonArr.toString()}}</td>
                                <td>
                                    <div
                                        v-for="(obj,i) in item.accessoryList"
                                        :key="i"
                                    >
                                        <a
                                            target="_blank"
                                            :href="obj.fileUrl"
                                        >{{obj.fileName}}</a>
                                    </div>
                                </td>
                                <td>{{item.storageStatus == 1?'待入库':'已入库'}}</td>
                                <td>{{item.createTime}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="flex">
                    <input-box
                        v-model="order.orderNo"
                        class="flex-item mr-20 ml-20"
                        label="订单号"
                    ></input-box>
                    <select-box
                        class="flex-item mr-20"
                        :list="productNoList"
                        v-model="order.productNo"
                        label="产品编号"
                    ></select-box>
                </div>
                <div class="flex">
                    <select-box
                        class="flex-item mr-20 ml-20"
                        :list="productModelList"
                        v-model="order.productModel"
                        label="成品型号"
                    ></select-box>
                    <select-box
                        class="flex-item mr-20"
                        :list="productSpecificationsList"
                        v-model="order.productSpecifications"
                        label="成品规格"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="order.testingNumber"
                        class="flex-item mr-20 ml-20"
                        label="检测数量"
                    ></input-box>
                    <input-box
                        v-model="order.qualifiedNumber"
                        class="flex-item mr-20"
                        label="合格数量"
                    ></input-box>
                </div>
                <div class="flex">
                    <upload-box
                        class="ml-20 mb-10"
                        btnText="上传附件"
                        :fileList="fileList"
                        :onchange="uploadFile"
                        :multiple="true"
                        :onremove="removeFile"
                        style="width: 50%"
                    ></upload-box>
                </div>
                <div
                    class="flex"
                    v-for="(item,index) in order.unqualifiedList"
                    :key="index"
                >
                    <input-box
                        v-model="item.number"
                        class="flex-item mr-20 ml-20"
                        label="不合格数量"
                    ></input-box>
                    <el-select
                        v-model="item.reason"
                        style="border-top:0"
                        class="flex-item mr-20 ml-20"
                        placeholder="请选择不合格原因"
                        :multiple="true"
                    >
                        <el-option
                            v-for="item in reasonList"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <!-- <select-box class="flex-item mr-20" :list="reasonList" v-model="item.reason" label="不合格原因"></select-box> -->
                    <icon-btn
                        small
                        v-if="order.unqualifiedList.length > 1"
                        @click="removeReason(index)"
                    >close</icon-btn>
                </div>
                <div style="padding-left:100px;">
                    <icon-btn
                        bg
                        small
                        v-tooltip="'更多不合格数量及因'"
                        @click="addReason"
                    >add</icon-btn>
                </div>
                <div class="layer-btns">
                    <btn
                        flat
                        @click="closeLayer"
                    >取消</btn>
                    <el-button
                        size="mini"
                        :loading="loading"
                        type="primary"
                        @click="complete"
                    >保存</el-button>
                </div>
            </div>
        </layer>
        <layer
            v-if="layer"
            title="详情"
            width="70%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="form-content metalwork-info">
                    <table class="f-14 order-info">
                        <tr>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 7%;"></td>
                            <td style="width: 8%;"></td>
                            <td style="width: 8%;"></td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单编号 : {{info.orderNo}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >发货日期 : {{info.deliveryDate}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单状态 : {{ orderStatusList[info.orderStatus-5].text }}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >
                                订单合同:
                                <a
                                    :href="info.orderContractUrl"
                                    style="margin-right: 15px;"
                                >下载</a>
                                <a
                                    target="_blank"
                                    v-if="(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="info.orderContractUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(info.orderContractUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ info.orderContractUrl"
                                >预览</a>
                            </td>
                            <!-- <td colspan="6" class="b">
                        订单备份合同:
                        <a :href="info.orderContractExtendUrl">下载</a>
                            </td>-->
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                                v-if="fileDetailList.length"
                            >订单附件:</td>
                            <td
                                colspan="14"
                                class="b"
                                v-else
                            >订单附件:无</td>
                        </tr>
                        <tr
                            v-for="(item,index) in fileDetailList"
                            :key="index"
                        >
                            <td
                                colspan="3"
                                class="b"
                            >{{item.fileName}}</td>
                            <td
                                colspan="12"
                                class="b"
                            >
                                <a
                                    target="_blank"
                                    v-if="(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$') "
                                    :href="item.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="!(item.fileUrl).match('\.(pdf|jpe?g|png|bmp)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ item.fileUrl"
                                >预览</a>
                            </td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >装配车间: {{info.assemblyShop}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >装配小组: {{info.assemblyGroup}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="7"
                                class="b"
                            >采购反馈时间: {{info.purchaseFeedbackTime}}</td>
                            <td
                                colspan="7"
                                class="b"
                            >生产反馈时间: {{info.productionFeedbackTime}}</td>
                        </tr>
                        <!-- <tr>
                    <td colspan="6" class="b">工厂反馈完成时间: {{info.finishFeedbackTime}}</td>
                    <td colspan="6" class="b">反馈确认人: {{info.feedbackTimeConfirmUser}}</td>
                        </tr>-->
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >技术清单:</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="2"
                            >产品名称</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >型号</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >规格</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >数量</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >上法兰标准</td>
                            <td
                                colspan="3"
                                rowspan="1"
                            >上法兰尺寸</td>
                            <td
                                colspan="4"
                                rowspan="1"
                            >出轴尺寸</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >静扭矩</td>
                            <td
                                colspan="1"
                                rowspan="2"
                            >执行器型号</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                rowspan="1"
                            >连接孔</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >角度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >中心距</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴型式</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >出轴长度</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >轴图号</td>
                            <td
                                colspan="1"
                                rowspan="1"
                            >过渡盘</td>
                        </tr>
                        <tr
                            v-for="(val,index) in JSON.parse(info.technicalRequire)"
                            :key="index"
                        >
                            <td colspan="1">{{val.name}}</td>
                            <td colspan="1">{{val.xinhao}}</td>
                            <td colspan="1">{{val.guige}}</td>
                            <td colspan="1">{{val.num}}</td>
                            <td colspan="1">{{val.biaozhun}}</td>
                            <td colspan="1">{{val.lianjiek}}</td>
                            <td colspan="1">{{val.jiaodu}}</td>
                            <td colspan="1">{{val.zhongxinju}}</td>
                            <td colspan="1">{{val.xinshi}}</td>
                            <td colspan="1">{{val.length}}</td>
                            <td colspan="1">{{val.tuhao}}</td>
                            <td colspan="1">{{val.guodupan}}</td>
                            <td colspan="1">{{val.jinniuju}}</td>
                            <td colspan="1">{{val.jishuxinhao}}</td>
                        </tr>
                        <tr>
                            <td
                                colspan="14"
                                class="b"
                            >订单产品列表</td>
                        </tr>
                        <tr>
                            <td
                                colspan="1"
                                class="b"
                            >产品编号</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品名称</td>
                            <td
                                colspan="1"
                                class="b"
                            >型号</td>
                            <td
                                colspan="1"
                                class="b"
                            >标签属性</td>
                            <td
                                colspan="1"
                                class="b"
                            >规格</td>
                            <td
                                colspan="2"
                                class="b"
                            >颜色</td>
                            <td
                                colspan="1"
                                class="b"
                            >产品数量</td>
                            <!-- <td colspan="1" class="b">单价</td> -->
                            <td
                                colspan="1"
                                class="b"
                            >总计价格</td>
                            <td
                                colspan="2"
                                class="b"
                            >材质说明</td>
                            <td
                                colspan="2"
                                class="b"
                            >产品备注</td>
                        </tr>
                        <tr
                            v-for="(item,index) in info.orderProductAssociates"
                            :key="'fo'+index"
                        >
                            <td colspan="1">{{item.productNo}}</td>
                            <td colspan="2">{{item.productName}}</td>
                            <td colspan="1">{{item.productModel}}</td>
                            <td colspan="1">{{item.lable}}</td>
                            <td colspan="1">{{item.specifications}}</td>
                            <td colspan="2">{{item.productColor}}</td>
                            <td colspan="1">{{item.productNumber}}</td>
                            <!-- <td colspan="1">{{item.price}}</td> -->
                            <td colspan="1">{{item.totalPrice}}</td>
                            <td colspan="2">{{item.materialDescription}}</td>
                            <td colspan="2">{{item.productRemark}}</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="14"
                                class="b"
                            >审批附件:</td>
                        </tr>
                        <tr v-if="accessoryList.length > 0">
                            <td
                                colspan="6"
                                class="b"
                            >文件名称</td>
                            <td
                                colspan="6"
                                class="b"
                            >文件地址</td>
                            <td
                                colspan="2"
                                class="b"
                            >——</td>
                        </tr>
                        <tr
                            v-for="(accessory,j) in accessoryList"
                            :key="j"
                        >
                            <td colspan="6">{{accessory.fileName}}</td>
                            <td colspan="6">{{accessory.fileUrl}}</td>
                            <td colspan="2">
                                <a
                                    target="_blank"
                                    v-if="!(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$') "
                                    :href="accessory.fileUrl"
                                >预览</a>
                                <a
                                    target="_blank"
                                    v-if="(accessory.fileUrl).match('\.(doc|docx|xls|xlsx)$')"
                                    :href="'http://view.officeapps.live.com/op/view.aspx?src='+ accessory.fileUrl"
                                >预览</a>
                            </td>
                        </tr>
                    </table>
                </div>
                <div
                    class="mt-15 ml-20 mr-20"
                    v-if="recordList.length"
                    style="overflow-x: auto"
                >
                    <div
                        class="b f-18 flex-v-center ml-20"
                        style="margin-bottom: 20px;"
                    >
                        <div
                            class="flex-item"
                            style="text-align: center;line-height: 24px;"
                        >质检记录</div>
                    </div>
                    <div
                        class="flex-item scroll-y page-supplier-info"
                        style="overflow-x: auto"
                    >
                        <table class="data-table">
                            <tr style="display:none">
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 11%;"></td>
                                <td style="width: 12%;"></td>
                            </tr>
                            <tr>
                                <th>产品编号</th>
                                <th>成品型号</th>
                                <th>成品规格</th>
                                <th>检测数量</th>
                                <th>合格数量</th>
                                <th>不合格数量</th>
                                <th>不合格原因</th>
                                <th>附件</th>
                                <th>状态</th>
                                <th>创建日期</th>
                            </tr>
                            <tr
                                v-for="(item, i) in recordList"
                                :key="i"
                            >
                                <td>{{item.productNo}}</td>
                                <td>{{item.productModel}}</td>
                                <td>{{item.productSpecifications}}</td>
                                <td>{{item.testingNumber}}</td>
                                <td>{{item.qualifiedNumber}}</td>
                                <td>{{item.unqualifiedNumber}}</td>
                                <td>{{item.reasonArr.toString()}}</td>
                                <td>
                                    <div
                                        v-for="(obj,i) in item.accessoryList"
                                        :key="i"
                                    >
                                        <a
                                            target="_blank"
                                            :href="obj.fileUrl"
                                        >{{obj.fileName}}</a>
                                    </div>
                                </td>
                                <td>{{item.storageStatus == 1?'待入库':'已入库'}}</td>
                                <td>{{item.createTime}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div
                    class="mt-15 ml-20 mr-20"
                    style="overflow-x: auto"
                >
                    <div
                        class="b f-18 flex-v-center ml-20"
                        style="margin-bottom: 20px;"
                    >
                        <div
                            class="flex-item"
                            style="text-align: center;line-height: 24px;"
                        >审核信息</div>
                    </div>
                    <div
                        class="flex-item scroll-y page-supplier-info"
                        style="overflow-x: auto"
                    >
                        <table class="data-table">
                            <tr>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 7%;"></td>
                                <td style="width: 8%;"></td>
                                <td style="width: 8%;"></td>
                            </tr>
                            <tr>
                                <td
                                    colspan="3"
                                    class="b"
                                >流程节点</td>
                                <td
                                    colspan="2"
                                    class="b"
                                >角色</td>
                                <td
                                    colspan="1"
                                    class="b"
                                >审核人</td>
                                <td
                                    colspan="2"
                                    class="b"
                                >审核状态</td>
                                <td
                                    colspan="4"
                                    class="b"
                                >审核意见</td>
                                <td
                                    colspan="2"
                                    class="b"
                                >审核时间</td>
                            </tr>
                            <tr
                                v-for="pro in processList"
                                :key="pro.stepName"
                            >
                                <td colspan="3">{{pro.stepName}}</td>
                                <td colspan="2">{{pro.roleName}}</td>
                                <td colspan="1">{{pro.auditUserName}}</td>
                                <td colspan="2">{{statusList[pro.auditResult]}}</td>
                                <td colspan="4">{{pro.info}}</td>
                                <td colspan="2">{{pro.auditTime}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="closeLayer()"
                >关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import fileToBase64 from "@/utils/fileToBase64";

export default {
    name: "product-addList",
    components: { DataList },
    data() {
        return {
            completeLayer: false,
            loading: false,
            orderStatusList: [
                // { value: 0, text: "创建" },
                // { value: 1, text: "审批中" },
                // { value: 2, text: "核料中" },
                // { value: 3, text: "替换料审批中" },
                // { value: 4, text: "核料完成" },
                { value: 5, text: "待生产" },
                { value: 6, text: "待领料" },
                { value: 7, text: "生产中" },
                { value: 8, text: "生产暂停" },
                { value: 9, text: "生产完成" },
                { value: 10, text: "质检中" },
                { value: 11, text: "已入库" },
                { value: 12, text: "申请发货" },
                { value: 13, text: "发货完成" },
                // { value: 14, text: "审核不通过" }
            ],
            filter: {
                orderNo: "",
                orderStatus: 7,
            },
            layer: false,
            info: {},
            accessoryList: [],
            //产品编号
            productNoList: [],
            productModelList: [],
            productSpecificationsList: [],
            order: {
                id: "",
                orderNo: "",
                productModel: "",
                productNo: "",
                productSpecifications: "",
                qualifiedNumber: "",
                reason: "",
                testingNumber: "",
                unqualifiedNumber: "",
                accessoryList: [],
                unqualifiedList: [{ number: "0", reason: "" }],
            },
            reasonList: [],
            recordList: [],
            fileList: [],
            fileDetailList: [],
            processList: [],
            statusList: {
                0: "审核不通过",
                1: "审核通过",
                3: "流程初始化",
                4: "未审核",
            },
        };
    },
    created() {
        this.getReasonList();
        // this.getOrderStatusList();
    },
    methods: {
        flush() {
            this.filter = {
                orderNo: "",
                orderStatus: 7,
            };
            this.$refs.list.update(true);
        },
        closeLayer() {
            this.layer = false;
            this.completeLayer = false;
            this.accessoryList = [];
        },
        getAccessory(orderNo) {
            this.accessoryList = [];
            this.$http
                .get(`/haolifa/flowInstance/flow/accessoryInfo?formNo=${orderNo}&formId=0`)
                .then((res) => {
                    res.forEach((item) => {
                        if (item.fileUrl != "") {
                            this.accessoryList.push(item);
                        }
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getOrderStatusList() {
            this.$http.get("/haolifa/order-product/order-status-list").then((res) => {
                this.orderStatusList = res.map((item) => {
                    return { value: item.code, text: item.desc };
                });
            });
        },
        uploadFile(file, fileList) {
            this.loading = true;
            this.loadingMsg = "正在上传";
            fileToBase64(file.source).then((base64Str) => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name,
                    })
                    .then((res) => {
                        this.order.accessoryList.push({
                            fileName: file.name,
                            fileUrl: res,
                        });
                        this.loading = false;
                    })
                    .catch((e) => {
                        this.$toast(e.msg || e.message);
                        this.loading = false;
                    });
            });
        },
        removeFile(fileList, i) {
            return new Promise((resolve, reject) => {
                this.order.accessoryList.splice(index, 1);
                resolve();
            });
        },
        getReasonList() {
            this.$http
                .get(`/haolifa/pro-inspect/reasonList`)
                .then((res) => {
                    this.reasonList = res.map((item) => {
                        return {
                            text: item,
                            value: item,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //添加质检记录
        progress(item) {
            this.completeLayer = true;
            this.fileList = [];
            this.reset();
            this.order.orderNo = item.orderNo;
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${item.orderNo}`)
                .then((res) => {
                    this.productNoList = res.orderProductAssociates.map((item) => {
                        return {
                            text: item.productNo,
                            value: item.productNo,
                        };
                    });
                    this.productModelList = res.orderProductAssociates.map((item) => {
                        return {
                            text: item.productModel,
                            value: item.productModel,
                        };
                    });
                    this.productSpecificationsList = res.orderProductAssociates.map((item) => {
                        return {
                            text: item.specifications,
                            value: item.specifications,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.getInfo(item.orderNo);
            this.getAccessory(item.orderNo);
        },
        infoShow(item) {
            // this.$router.push(`/order/info?orderNo=${item.orderNo}`);
            this.layer = true;
            this.getInfo(item.orderNo);
            this.getAccessory(item.orderNo);
            // this.getOrderStatusList();
        },
        getInfo(orderNo) {
            this.info = {};
            this.$http
                .get(`/haolifa/order-product/details?orderNo=${orderNo}`)
                .then((res) => {
                    this.info = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            let params = {
                inspectNo: "",
                orderNo: orderNo,
                pageNum: 1,
                pageSize: 100,
                storageStatus: 0,
            };
            this.$http
                .post(`/haolifa/pro-inspect/pageInfo`, params)
                .then((res) => {
                    this.recordList = res.list;
                    this.recordList.map((item) => {
                        return (item.reasonArr = item.reasonList.map((obj) => {
                            if (obj.number) return "数量:" + obj.number + ",原因:" + obj.reason + ";";
                        }));
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.$http
                .get(`/haolifa/order-product/accessory?orderNo=${orderNo}`)
                .then((res) => {
                    this.fileDetailList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
            this.getProcess(orderNo);
        },
        getProcess(orderNo) {
            this.$http
                .get(`/haolifa/flowInstance/flow/progress/?formNo=${encodeURIComponent(orderNo)}`)
                .then((res) => {
                    this.processList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
        },
        complete() {
            const params = { ...this.order };
            const arr = params.unqualifiedList.map((item) => {
                return item.number;
            });
            params.unqualifiedList = params.unqualifiedList.map((item) => {
                return { number: item.number, reason: item.reason.toString() };
            });
            params.unqualifiedNumber = arr.reduce((num, item, index) => {
                return parseInt(num) + parseInt(item);
            });
            this.loading = true;
            this.$http
                .post(`/haolifa/pro-inspect/save`, params)
                .then((res) => {
                    this.$toast("添加成功");
                    this.loading = false;
                    this.completeLayer = false;
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$toast(e.msg || e.message);
                });
        },
        reset() {
            this.order = {
                id: "",
                orderNo: "",
                productModel: "",
                productNo: "",
                productSpecifications: "",
                qualifiedNumber: "",
                reason: "",
                testingNumber: "",
                unqualifiedNumber: "",
                accessoryList: [],
                unqualifiedList: [{ number: "0", reason: "" }],
            };
        },
        addReason() {
            this.order.unqualifiedList.push({ number: "0", reason: "" });
        },
        removeReason(index) {
            this.order.unqualifiedList.splice(index, 1);
        },
    },
};
</script>

<style lang="less">
.page-orders-list {
    select {
        background: none;
        border: none;
        outline: none;
        padding: 5px 20px 5px 10px;
        appearance: none;
    }
    .scroll-y {
        padding-bottom: 40px;
    }
}

.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
.el-select .el-input__inner {
    border-top: 0;
    border-left: 0;
    border-right: 0;
}
</style>