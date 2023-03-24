<template>
    <div class="page-baoxiao-list">
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
                    v-model="filter.deptName"
                    @change="
            $refs.list.update(true)"
                    placeholder="报销部门"
                    style="width: 200px;"
                >

                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.reimburseUser"
                    @change="
            $refs.list.update(true)"
                    placeholder="报销人"
                    style="width: 200px;"
                >
                报销类型:
                <select
                    v-model="filter.type"
                    class="f-14"
                    @change="$refs.list.update(true);"
                >
                    <option value>全部</option>
                    <option value="1">差旅报销</option>
                    <option value="2">费用报销</option>
                </select>
                <a
                    class="b ml-10"
                    style="color:#008eff"
                    target="_blank"
                    href="/haolifa/finance/reimburseapply/printEmptyBX"
                >下载费用报销情况说明模板</a>
                <a
                    class="b ml-10"
                    style="color:#008eff"
                    target="_blank"
                    href="/haolifa/finance/reimburseapply/printEmptyCL"
                >下载出差报告模板</a>
            </div>
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add()"
            >新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/reimburseapply/getReimburseApplyBillList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>报销人</th>
                    <th>金额</th>
                    <th>项目名称</th>
                    <th>报销类型</th>
                    <th>报销方式</th>
                    <th>部门</th>
                    <th>账户名</th>
                    <th>卡号</th>
                    <th>付款状态</th>
                    <th>审批状态</th>
                    <th>创建时间</th>
                    <th>备注</th>
                    <th
                        class="t-right"
                        style="width: 80px;"
                    >操作</th>
                </tr>
                <template
                    slot="item"
                    slot-scope="{ item, index }"
                >
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.reimburseUserName }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.projectCodeName }}</td>
                    <td>{{ item.typeCN }}</td>
                    <td>{{ item.reimburseTypeCN }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.accountName }}</td>
                    <td>{{ item.cardNumber}}</td>
                    <td>{{ item.payStatusCN}}</td>
                    <td>{{ item.applyStatusCN}}</td>
                    <td>{{ item.createTime}}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            v-if="item.applyStatus==0 || item.applyStatus==4"
                            @click="approve(item)"
                        >发起审批 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            v-if="item.applyStatus==0 || item.applyStatus==4"
                            @click="edit(item)"
                        >编辑 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            class="red"
                            v-if="item.applyStatus==0 || item.applyStatus==4"
                            @click="remove(item)"
                        >删除 |</a>
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="detail(item)"
                        >详情</a>
                        <a
                            :href="'/haolifa/finance/reimburseapply/printPDF/'+item.id"
                            class="blue"
                            target="_blank"
                        > | 打印</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            :title="form.id ?'编辑':'新增' "
            width="80%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <el-descriptions
                    class="margin-top"
                    :column="2"
                    size="mini"
                    border
                >
                    <el-descriptions-item>
                        <template slot="label">经费项目</template>
                        <el-select
                            v-model="form.projectCode"
                            size="mini"
                            clearable
                            @change="projectChange"
                        >
                            <el-option
                                v-for="(item,i) in proList"
                                :key="i"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                        剩余额度：{{balanceQuota}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">支付类型</template>
                        <el-select
                            v-model="form.payType"
                            size="mini"
                            clearable
                            @change="payTypeChange"
                        >
                            <el-option
                                label="对公"
                                value="1"
                            ></el-option>
                            <el-option
                                label="对私"
                                value="2"
                            ></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.payType==1">
                        <template slot="label">单位选择</template>
                        <el-select
                            v-model="companyCode"
                            size="mini"
                            clearable
                            :filterable="true"
                            @change="companyChange"
                        >
                            <el-option
                                v-for="(item,i) in companyList"
                                :key="i"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.payType==2">
                        <template slot="label">用户选择</template>
                        <el-select
                            v-model="userCode"
                            size="mini"
                            clearable
                            @change="userChange"
                            :filterable="true"
                        >
                            <el-option
                                v-for="(item,i) in userList"
                                :key="i"
                                :label="item.userName + '--'+item.userNo"
                                :value="item.userNo"
                            ></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">报销金额</template>
                        <el-input
                            v-model="form.amount"
                            :disabled="true"
                        ></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">户名</template>
                        <el-input
                            v-model="form.accountName"
                            :disabled="true"
                        ></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">开户行</template>
                        <el-input
                            v-model="form.bankOfDeposit"
                            :disabled="true"
                        ></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">卡号</template>
                        <el-input
                            v-model="form.cardNumber"
                            :disabled="true"
                        ></el-input>
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">报销日期</template>
                        <el-date-picker
                            size="mini"
                            v-model="form.reimburseDate"
                            :clearable="false"
                            type="date"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">备注摘要</template>
                        <el-input v-model="form.remark"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">报销方式</template>
                        <el-radio
                            v-model="form.reimburseType"
                            label="1"
                        >普通报销</el-radio>
                        <el-radio
                            v-model="form.reimburseType"
                            label="2"
                        >借款冲抵</el-radio>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">报销类别</template>
                        <el-radio
                            v-model="form.type"
                            label="1"
                        >差旅报销</el-radio>
                        <el-radio
                            v-model="form.type"
                            label="2"
                        >费用报销</el-radio>
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.reimburseType==2">
                        <template slot="label">冲抵金额</template>
                        <el-input v-model="form.offsetAmount"></el-input>
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.reimburseType==2">
                        <template slot="label">借款</template>
                        <el-select
                            v-model="form.loanIdList"
                            size="mini"
                            clearable
                            multiple
                        >
                            <el-option
                                v-for="(item,i) in borrowerList"
                                :key="i"
                                :label="item.owedAmount"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">出差人</template>
                        <el-input v-model="form.travelUserName"></el-input>
                    </el-descriptions-item>
                </el-descriptions>
                <div v-if="form.type == 2">
                    <p style="color:#018be6">费用报销明细</p>
                    <el-button
                        type="primary"
                        size="mini"
                        style="position: relative;top: -38px;left: 140px;"
                        @click="costAdd(2)"
                    >添加</el-button>
                    <el-table
                        size="mini"
                        border
                        style="width: 100%"
                        :data="form.reimburseCostDetailAddDTOList"
                    >
                        <el-table-column label="金额">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.amount"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="单据张数">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.docNum"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="费用类别">
                            <template slot-scope="scope">
                                <el-select
                                    v-model="scope.row.subjectsType"
                                    size="mini"
                                    clearable
                                    @change="subChange(scope)"
                                >
                                    <el-option
                                        v-for="(item,i) in subjectList"
                                        :key="i"
                                        :label="item.subjectsTypeName"
                                        :value="item.subjectsTypeCode"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="费用明细">
                            <template slot-scope="scope">
                                <el-select
                                    v-model="scope.row.subject"
                                    size="mini"
                                    clearable
                                    @change="subChange2(scope)"
                                >
                                    <el-option
                                        v-for="(item,i) in scope.row.subjectList2"
                                        :key="i"
                                        :label="item.name"
                                        :value="item.subjectsId"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="余额">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.balanceAmount"
                                    style="color:#409eff"
                                    :disabled="true"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="日期">
                            <template slot-scope="scope">
                                <el-date-picker
                                    size="mini"
                                    v-model="scope.row.time"
                                    :clearable="false"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.remark"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="danger"
                                    size="mini"
                                    v-if="form.reimburseCostDetailAddDTOList.length>1"
                                    @click="delCost(2,scope.$index)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div v-if="form.type == 1">
                    <p style="color:#018be6">差旅费用报销明细</p>
                    <el-button
                        type="primary"
                        size="mini"
                        style="position: relative;top: -38px;left: 140px;"
                        @click="costAdd(1)"
                    >添加</el-button>
                    <el-table
                        size="mini"
                        border
                        style="width: 100%"
                        :data="form.reimburseTravelDetailAddDTOList"
                    >
                        <el-table-column label="金额">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.projectAmount"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="单据张数">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.projectDocNum"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目">
                            <template slot-scope="scope">
                                <el-select
                                    v-model="scope.row.projectType"
                                    size="mini"
                                >
                                    <el-option
                                        v-for="(item,i) in projectList"
                                        :key="i"
                                        :label="item.desc"
                                        clearable
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="出发地">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.depAddress"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="出发日期">
                            <template slot-scope="scope">
                                <el-date-picker
                                    size="mini"
                                    v-model="scope.row.depTime"
                                    :clearable="false"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="到达地">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.arrAddress"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="到达日期">
                            <template slot-scope="scope">
                                <el-date-picker
                                    size="mini"
                                    v-model="scope.row.arrTime"
                                    :clearable="false"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column label="出差天数">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.travelDays"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="出差补贴金额">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.travelSubsidyAmount"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="交通工具">
                            <template slot-scope="scope">
                                <el-select
                                    v-model="scope.row.vehicle"
                                    size="mini"
                                >
                                    <el-option
                                        v-for="(item,i) in acceptList"
                                        :key="i"
                                        :label="item.desc"
                                        clearable
                                        :value="item.code"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="交通金额">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.vehicleAmount"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="交通单据张数">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.vehicleDocNum"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="scope.row.remark"
                                    size="mini"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    type="danger"
                                    size="mini"
                                    v-if="form.reimburseTravelDetailAddDTOList.length>1"
                                    @click="delCost(1,scope.$index)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="flex mt-20">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="#"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :before-upload="submitUpload"
                        multiple
                    >
                        <el-button
                            slot="trigger"
                            size="small"
                            type="warning"
                        >附件上传</el-button>
                    </el-upload>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="save"
                >保存</btn>
                <btn
                    flat
                    color="#008eff"
                    @click="close"
                >关闭</btn>
            </div>
        </layer>
        <layer
            v-if="layer2"
            title="详情"
            width="80%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <el-descriptions
                    class="margin-top"
                    :column="2"
                    size="mini"
                    border
                >
                    <el-descriptions-item>
                        <template slot="label">报销金额</template>
                        {{form.amount}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">户名</template>
                        {{form.accountName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">开户行</template>
                        {{form.bankOfDeposit}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">卡号</template>
                        {{form.cardNumber}}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">报销日期</template>
                        {{form.reimburseDate}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">备注摘要</template>
                        {{form.remark}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">报销方式</template>
                        {{form.reimburseType=="1"?"普通报销":"借款冲抵"}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">报销类别</template>
                        {{form.type=="1"?"差旅报销":"费用报销"}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.reimburseType==2">
                        <template slot="label">冲抵金额</template>
                        {{form.offsetAmount}}
                    </el-descriptions-item>
                    <el-descriptions-item v-if="form.reimburseType==2">
                        <template slot="label">借款</template>
                        {{form.loanAmount}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">出差人</template>
                        {{form.travelUserName}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">附件</template>
                        <a
                            :href="item.fileUrl"
                            target="_blank"
                            v-for="(item,i) in form.fileUrlList"
                            :key="i"
                        >{{item.fileName}}</a>
                    </el-descriptions-item>
                </el-descriptions>
                <div v-if="form.type == 2">
                    <el-table
                        size="mini"
                        border
                        style="width: 100%"
                        :data="form.reimburseCostDetailRSDTOList"
                    >
                        <el-table-column
                            label="金额"
                            prop="amount"
                        ></el-table-column>
                        <el-table-column
                            label="单据张数"
                            prop="docNum"
                        ></el-table-column>
                        <el-table-column
                            label="费用类别"
                            prop="subjectsTypeName"
                        ></el-table-column>
                        <el-table-column
                            label="费用明细"
                            prop="subjectCN"
                        ></el-table-column>
                        <el-table-column
                            label="日期"
                            prop="time"
                        ></el-table-column>
                        <el-table-column
                            label="备注"
                            prop="remark"
                        ></el-table-column>
                    </el-table>
                </div>
                <div v-if="form.type == 1">
                    <el-table
                        size="mini"
                        border
                        style="width: 100%"
                        :data="form.reimburseTravelDetailRSDTOList"
                    >
                        <el-table-column
                            label="金额"
                            prop="projectAmount"
                        ></el-table-column>
                        <el-table-column
                            label="单据张数"
                            prop="projectDocNum"
                        ></el-table-column>
                        <el-table-column
                            label="项目"
                            prop="projectTypeCN"
                        ></el-table-column>
                        <el-table-column
                            label="出发地"
                            prop="depAddress"
                        ></el-table-column>
                        <el-table-column
                            label="出发日期"
                            prop="depTime"
                        ></el-table-column>
                        <el-table-column
                            label="到达地"
                            prop="arrAddress"
                        ></el-table-column>
                        <el-table-column
                            label="到达日期"
                            prop="arrTime"
                        ></el-table-column>
                        <el-table-column
                            label="出差天数"
                            prop="travelDays"
                        ></el-table-column>
                        <el-table-column
                            label="出差补贴金额"
                            prop="travelSubsidyAmount"
                        ></el-table-column>
                        <el-table-column
                            label="交通工具"
                            prop="vehicleCN"
                        ></el-table-column>
                        <el-table-column
                            label="交通金额"
                            prop="vehicleAmount"
                        ></el-table-column>
                        <el-table-column
                            label="交通单据张数"
                            prop="vehicleDocNum"
                        ></el-table-column>
                        <el-table-column
                            label="备注"
                            prop="remark"
                        ></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="layer-btns">
                <btn
                    flat
                    color="#008eff"
                    @click="close2"
                >关闭</btn>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import fileToBase64 from "@/utils/fileToBase64";
export default {
    name: "cashAccounting",
    components: { DataList },
    data() {
        return {
            filter: {
                deptId: "",
                deptName: "",
                myself: "",
                reimburseUser: "",
                serialNo: "",
                type: "",
            },
            balanceQuota: null,
            layer: false,
            layer2: false,
            form: {
                accountName: "",
                amount: null,
                bankOfDeposit: "",
                cardNumber: "",
                deptId: 0,
                loanIdList: [],
                offsetAmount: 0,
                reimburseCostDetailAddDTOList: [
                    {
                        amount: 0,
                        docNum: 0,
                        remark: "",
                        subject: "",
                        subjectsType: "",
                        time: "",
                        type: "2",
                        balanceAmount: null,
                        subjectList2: [],
                    },
                ],
                reimburseDate: "",
                reimburseTravelDetailAddDTOList: [
                    {
                        arrAddress: "",
                        arrTime: "",
                        depAddress: "",
                        depTime: "",
                        projectAmount: 0,
                        projectDocNum: 0,
                        projectType: "",
                        remark: "",
                        travelDays: 0,
                        travelSubsidyAmount: 0,
                        type: "1",
                        vehicle: "",
                        vehicleAmount: 0,
                        vehicleDocNum: 0,
                    },
                ],
                reimburseType: "1",
                remark: "",
                type: "1",
                projectCode: "",
                payType: "",
                travelUserName: "",
                fileUrlList: [],
            },
            projectList: [],
            typeList: [
                { text: "费用报销", value: "2" },
                { text: "差旅报销", value: "1" },
            ],
            reimburseTypeList: [
                { text: "普通报销", value: "1" },
                { text: "借款冲抵", value: "2" },
            ],
            statusList: [],
            acceptList: [],
            blankList: [],
            deptList: [],
            accountList: [],
            subjectList: [],
            borrowerList: [],
            proList: [],
            companyList: [],
            companyCode: "",
            userList: [],
            userCode: "",
            fileList: [],
        };
    },
    activated() {
        // console.log(this.$store.state.account);
        this.getPayType();
        this.getAcceptType();
        this.getDeptList();
        this.getSubjectList();
        this.getMyBorrower();
        this.getProjectList();
        this.getProList(); //项目列表
        this.getCompanyList(); //单位列表
        this.getUserList(); //用户列表
    },
    methods: {
        flush() {
            this.filter = {
                deptId: "",
                deptName: "",
                myself: "",
                reimburseUser: "",
                serialNo: "",
                type: "",
            };
            this.getPayType();
            this.$refs.list.update(true);
        },
        delCost(type, index) {
            if (type == 1) {
                this.form.reimburseTravelDetailAddDTOList.splice(index, 1);
            } else {
                this.form.reimburseCostDetailAddDTOList.splice(index, 1);
            }
        },
        companyChange() {
            this.companyList.forEach((item) => {
                if (item.code == this.companyCode) {
                    this.form.accountName = item.accountName;
                    this.form.cardNumber = item.cardNumber;
                    this.form.bankOfDeposit = item.bankOfDeposit;
                }
            });
        },
        userChange() {
            this.userList.forEach((item) => {
                if (item.userNo == this.userCode) {
                    this.form.accountName = item.userName;
                    this.form.cardNumber = item.cardNumber;
                    this.form.bankOfDeposit = item.bankOfDeposit;
                }
            });
        },
        payTypeChange() {
            this.companyCode = this.userCode = this.form.accountName = this.form.cardNumber = this.form.bankOfDeposit = "";
        },
        projectChange() {
            this.balanceQuota = null;
            this.proList.forEach((item) => {
                if (item.code == this.form.projectCode) {
                    this.balanceQuota = item.balanceQuota;
                }
            });
        },
        costAdd(type) {
            if (type == 1) {
                this.form.reimburseTravelDetailAddDTOList.push({
                    arrAddress: "",
                    arrTime: "",
                    depAddress: "",
                    depTime: "",
                    projectAmount: 0,
                    projectDocNum: 0,
                    projectType: "",
                    remark: "",
                    travelDays: 0,
                    travelSubsidyAmount: 0,
                    type: "1",
                    vehicle: "",
                    vehicleAmount: 0,
                    vehicleDocNum: 0,
                });
            } else {
                this.form.reimburseCostDetailAddDTOList.push({
                    amount: 0,
                    docNum: 0,
                    remark: "",
                    subject: "",
                    subjectsType: "",
                    time: "",
                    type: "2",
                    balanceAmount: null,
                    subjectList2: [],
                });
            }
        },
        //付款类型
        getPayType() {
            this.statusList = [];
            this.$http
                .get(`/haolifa/finance/loanapply/getLoanList`)
                .then((res) => {
                    res.map((item) => {
                        this.statusList.push({
                            text: item.purpose,
                            value: item.id,
                        });
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //交通工具字典
        getAcceptType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/VEHICLE_TYPE`)
                .then((res) => {
                    this.acceptList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //交通工具字典
        getProjectList() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/PROJECT_TYPE`)
                .then((res) => {
                    this.projectList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //项目列表
        getProList() {
            this.$http
                .post("/haolifa/finance/projectbudget/getCurUserProjectBudgetList", {
                    code: "",
                    name: "",
                    pageNum: 1,
                    pageSize: 9990,
                })
                .then((res) => {
                    this.proList = res.list;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //单位列表
        getCompanyList() {
            this.$http
                .post("/haolifa/finance/company/getCompanyList", {
                    code: "",
                    name: "",
                    pageNum: 1,
                    pageSize: 9990,
                })
                .then((res) => {
                    this.companyList = res.list;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //人员列表
        getUserList() {
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: 0,
                    pageNum: 0,
                    pageSize: 0,
                    postId: 0,
                    postName: "",
                    sex: 0,
                    superiorId: 0,
                    teamId: 0,
                    teamName: "",
                    userName: "",
                    userType: "",
                })
                .then((res) => {
                    this.userList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //用户拥有的科目类别节点
        getSubjectList() {
            this.$http
                .get(`/haolifa/finance/costbudget/subjects/getCurUserSubjectsTypeList`)
                .then((res) => {
                    this.subjectList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        subChange(scope) {
            let subjectType = this.form.reimburseCostDetailAddDTOList[scope.$index].subjectsType;
            this.form.reimburseCostDetailAddDTOList[scope.$index].subject = "";
            this.form.reimburseCostDetailAddDTOList[scope.$index].balanceAmount = "";
            if (subjectType) {
                this.$http
                    .get(`/haolifa/finance/costbudget/subjects/getCurUserSubjectsBudgetList/${subjectType}`)
                    .then((res) => {
                        this.form.reimburseCostDetailAddDTOList[scope.$index].subjectList2 = res;
                    })
                    .catch((e) => {
                        this.$toast(e.msg || e.message);
                    });
            }
        },
        subChange2(scope) {
            console.log(1);
            let i = scope.$index;
            let subjectType = this.form.reimburseCostDetailAddDTOList[i].subject;
            this.form.reimburseCostDetailAddDTOList[i].balanceAmount = "";
            if (subjectType) {
                this.form.reimburseCostDetailAddDTOList[i].subjectList2.map((item) => {
                    if (item.subjectsId == subjectType) {
                        this.form.reimburseCostDetailAddDTOList[i].balanceAmount = item.balanceAmount;
                    }
                });
            }
        },
        //款收类型
        getDeptList() {
            this.$http
                .get(`/haolifa/dept/list`)
                .then((res) => {
                    this.deptList = res;
                    /* res.map(item => {
                        this.deptList.push({
                            text: item.deptName,
                            value: item.id + ""
                        });
                    });
                    console.log(this.deptList); */
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //借款
        getMyBorrower() {
            this.$http
                .get(`/haolifa/finance/loanapply/getLoanList`)
                .then((res) => {
                    this.borrowerList = res;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        edit(item) {
            this.$http
                .get(`/haolifa/finance/reimburseapply/info/${item.id}`)
                .then((res) => {
                    this.form = {
                        id: item.id,
                        accountName: res.accountName,
                        amount: res.amount,
                        bankOfDeposit: res.bankOfDeposit,
                        cardNumber: res.cardNumber,
                        deptId: res.deptId,
                        loanIdList: res.loanIdList,
                        offsetAmount: res.offsetAmount,
                        reimburseCostDetailAddDTOList: [
                            {
                                amount: 0,
                                docNum: 0,
                                remark: "",
                                subject: "",
                                subjectsType: "",
                                time: "",
                                type: "2",
                                balanceAmount: null,
                                subjectList2: [],
                            },
                        ],
                        reimburseDate: res.reimburseDate,
                        reimburseTravelDetailAddDTOList: [
                            {
                                arrAddress: "",
                                arrTime: "",
                                depAddress: "",
                                depTime: "",
                                projectAmount: 0,
                                projectDocNum: 0,
                                projectType: "",
                                remark: "",
                                travelDays: 0,
                                travelSubsidyAmount: 0,
                                type: "1",
                                vehicle: "",
                                vehicleAmount: 0,
                                vehicleDocNum: 0,
                            },
                        ],
                        reimburseType: res.reimburseType,
                        remark: res.remark,
                        type: res.type,
                        payType: res.payType,
                        projectCode: res.projectCode,
                        travelUserName: res.travelUserName,
                        fileUrlList: res.fileUrlList,
                    };
                    if (res.fileUrlList.length) {
                        this.fileList = [];
                        res.fileUrlList.forEach((item) => {
                            this.fileList.push({
                                name: item.fileName,
                                url: item.fileUrl,
                            });
                        });
                    }
                    if (res.type == 2) {
                        this.form.reimburseCostDetailAddDTOList = [];
                        res.reimburseCostDetailRSDTOList.map((it) => {
                            this.$http.get(`/haolifa/finance/costbudget/subjects/getCurUserSubjectsBudgetList/${it.subjectsType}`).then((r) => {
                                let obj = {
                                    amount: it.amount,
                                    docNum: it.docNum,
                                    remark: it.remark,
                                    subject: it.subject + "",
                                    subjectsType: it.subjectsType + "",
                                    time: it.amount,
                                    type: "2",
                                    balanceAmount: null,
                                    subjectList2: r,
                                };
                                this.form.reimburseCostDetailAddDTOList.push(obj);
                            });
                        });
                    } else {
                        this.form.reimburseTravelDetailAddDTOList = [];
                        res.reimburseTravelDetailRSDTOList.map((it) => {
                            let obj = {
                                arrAddress: it.arrAddress,
                                arrTime: it.arrTime,
                                depAddress: it.depAddress,
                                depTime: it.depTime,
                                projectAmount: it.projectAmount,
                                projectDocNum: it.projectDocNum,
                                projectType: it.projectType + "",
                                remark: it.remark,
                                travelDays: it.travelDays,
                                travelSubsidyAmount: it.travelSubsidyAmount,
                                type: "1",
                                vehicle: it.vehicle + "",
                                vehicleAmount: it.vehicleAmount,
                                vehicleDocNum: it.vehicleDocNum,
                            };
                            this.form.reimburseTravelDetailAddDTOList.push(obj);
                        });
                    }
                    this.layer = true;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/reimburseapply/delete/${item.id}`)
                        .then((res) => {
                            this.$toast("删除成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        detail(item) {
            this.$http
                .get(`/haolifa/finance/reimburseapply/info/${item.id}`)
                .then((res) => {
                    this.layer2 = true;
                    this.form = res;
                    // if (res.type == 2) {
                    //     this.form.reimburseCostDetailRSDTOList.forEach((item) => {
                    //         item.projectType = item.projectType + "";
                    //         item.vehicle = item.vehicle + "";
                    //     });
                    // }
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        approve(item) {
            this.$confirm({
                title: "发起审批确认",
                text: `您确定要发起审批吗？`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/reimburseapply/approve/${item.id}`)
                        .then((res) => {
                            this.$toast("发起审批成功");
                            this.$refs.list.update(true);
                        })
                        .catch((e) => {
                            this.$toast(e.msg || e.message);
                        });
                },
            });
        },
        add() {
            this.layer = true;
        },
        save() {
            // if (!this.form.projectCode) {
            //     this.$toast("请选择经费项目");
            //     return;
            // }
            if (!this.form.payType) {
                this.$toast("请选择支付类型");
                return;
            }
            if (!this.form.remark) {
                this.$toast("请输入备注摘要");
                return;
            }
            if (!this.fileList.length) {
                this.$toast("请上传附件");
                return;
            }
            this.form.fileUrlList = [];
            this.fileList.forEach((item) => {
                this.form.fileUrlList.push({ fileName: item.name, fileUrl: item.url });
            });

            this.form.reimburseCostDetailAddDTOList.map((item) => {
                delete item.subjectList2;
            });
            let url = this.form.id ? "/haolifa/finance/reimburseapply/updateReimburseApply" : "/haolifa/finance/reimburseapply/save";
            this.$http
                .post(url, this.form)
                .then((res) => {
                    this.close();
                    this.$toast("保存成功");
                    this.$refs.list.update(true);
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.layer = false;
            this.form = {
                accountName: "",
                amount: null,
                bankOfDeposit: "",
                cardNumber: "",
                deptId: 0,
                loanIdList: [],
                offsetAmount: 0,
                reimburseCostDetailAddDTOList: [
                    {
                        amount: 0,
                        docNum: 0,
                        remark: "",
                        time: "",
                        type: "2",
                        subject: "",
                        subjectsType: "",
                        balanceAmount: null,
                        subjectList2: [],
                    },
                ],
                reimburseDate: "",
                reimburseTravelDetailAddDTOList: [
                    {
                        arrAddress: "",
                        arrTime: "",
                        depAddress: "",
                        depTime: "",
                        projectAmount: 0,
                        projectDocNum: 0,
                        projectType: "",
                        remark: "",
                        travelDays: 0,
                        travelSubsidyAmount: 0,
                        type: "1",
                        vehicle: 0,
                        vehicleAmount: 0,
                        vehicleDocNum: 0,
                    },
                ],
                reimburseType: "1",
                remark: "",
                type: "1",
                travelUserName: "",
                fileUrlList: [],
            };
            this.fileList = [];
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        submitUpload(file) {
            fileToBase64(file).then((base64Str) => {
                this.$http
                    .post("/haolifa/file/uploadFileBase64", {
                        base64Source: base64Str,
                        fileName: file.name,
                    })
                    .then((res) => {
                        this.fileList.push({
                            name: file.name,
                            url: res,
                        });
                    })
                    .catch((e) => {
                        this.$toast(e.msg || e.message);
                    });
            });
        },
        close2() {
            this.layer2 = false;
            this.form = {
                accountName: "",
                amount: null,
                bankOfDeposit: "",
                cardNumber: "",
                deptId: 0,
                loanIdList: [],
                offsetAmount: 0,
                reimburseCostDetailAddDTOList: [
                    {
                        amount: 0,
                        docNum: 0,
                        remark: "",
                        time: "",
                        type: "2",
                        subject: "",
                        subjectsType: "",
                        balanceAmount: null,
                        subjectList2: [],
                    },
                ],
                reimburseDate: "",
                reimburseTravelDetailAddDTOList: [
                    {
                        arrAddress: "",
                        arrTime: "",
                        depAddress: "",
                        depTime: "",
                        projectAmount: 0,
                        projectDocNum: 0,
                        projectType: "",
                        remark: "",
                        travelDays: 0,
                        travelSubsidyAmount: 0,
                        type: "1",
                        vehicle: 0,
                        vehicleAmount: 0,
                        vehicleDocNum: 0,
                    },
                ],
                reimburseType: "1",
                remark: "",
                type: "1",
                travelUserName: "",
            };
        },
    },
};
</script>

<style lang="less">
.page-baoxiao-list {
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
    // .el-input {
    //     width: 200px;
    // }
    //
    .el-input.is-disabled .el-input__inner {
        color: #409eff;
    }
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
