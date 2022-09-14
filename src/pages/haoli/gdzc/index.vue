<template>
    <div class="page-cashAccounting-list">
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
                    v-model="filter.bh"
                    @change="
            $refs.list.update(true);getAssetsData()"
                    placeholder="资产编号"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.name"
                    @change="
            $refs.list.update(true);getAssetsData()"
                    placeholder="资产名称"
                    style="width: 200px;"
                >
                <input
                    type="text"
                    class="flex-item"
                    v-model="filter.userName"
                    @change="
            $refs.list.update(true);getAssetsData()"
                    placeholder="领用人"
                    style="width: 200px;"
                >
                增加方式:
                <select
                    v-model="filter.addType"
                    class="f-14"
                    @change="$refs.list.update(true);getAssetsData()"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in addTypeList"
                        :value="item.value"
                    >{{item.text}}</option>
                </select>
                类别名称:
                <select
                    v-model="filter.type"
                    class="f-14"
                    @change="$refs.list.update(true);getAssetsData()"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in typeList"
                        :value="item.value"
                    >{{item.text}}</option>
                </select>
                部门:
                <select
                    v-model="filter.deptId"
                    class="f-14"
                    @change="$refs.list.update(true);getAssetsData()"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in deptList"
                        :value="item.value"
                    >{{item.text}}</option>
                </select>
                状态:
                <select
                    v-model="filter.status"
                    class="f-14"
                    @change="$refs.list.update(true);getAssetsData()"
                >
                    <option value>全部</option>
                    <option
                        v-for="(item,i) in statusList"
                        :value="item.value"
                    >{{item.text}}</option>
                </select>
            </div>
            <div class="flex-item"></div>
            <btn
                class="b"
                flat
                color="#008eff"
                @click="add()"
            >新增</btn>
        </div>
        <div class="flex-v-center tool-bar">
            <btn
                class="b"
                flat
                color="#008eff"
            >资产合计：{{assettsObj.totalPrice}}</btn>
            <btn
                class="b"
                flat
                color="#008eff"
            >资产净值：{{assettsObj.netWorth}}</btn>
            <btn
                class="b"
                flat
                color="#008eff"
            >累积计提折旧：{{assettsObj.accumulatedDepreciation}}</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list
                ref="list"
                :page-size="15"
                :param="filter"
                url="/haolifa/finance/assets/getAssetsList"
                method="post"
            >
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>资产名称</th>
                    <th>资产编号</th>
                    <th>规格型号</th>
                    <th>资产类别</th>
                    <th>生产厂家</th>
                    <th>增加方式</th>
                    <th>使用部门</th>
                    <th>领用人</th>
                    <th>存放地点</th>
                    <th>资产数量</th>
                    <th>单位</th>
                    <th>采购单价</th>
                    <th>采购金额</th>
                    <th>采购时间</th>
                    <th>开始使用日期</th>
                    <th>净残值率</th>
                    <th>净残值</th>
                    <th>使用年限</th>
                    <th>折旧方法</th>
                    <th>月折旧额</th>
                    <th>已计提月份</th>
                    <th>累计折旧</th>
                    <th>净值</th>
                    <th>状态</th>
                    <th>备注</th>
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
                    <td class="c-a">{{ index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.bh }}</td>
                    <td>{{ item.specifications}}</td>
                    <td>{{ item.typeCN }}</td>
                    <td>{{ item.manufacturer }}</td>
                    <td>{{ item.addTypeCN }}</td>
                    <td>{{ item.deptName }}</td>
                    <td>{{ item.userName }}</td>
                    <td>{{ item.location }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.unit }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.totalPrice }}</td>
                    <td>{{ item.purchasingTime }}</td>
                    <td>{{ item.startTime }}</td>
                    <td>{{ item.outputRate }}</td>
                    <td>{{ item.salvageValue }}</td>
                    <td>{{ item.useYear }}</td>
                    <td>{{ item.depreciationMethodCN }}</td>
                    <td>{{ item.monthDepreciation }}</td>
                    <td>{{ item.accruedMonth }}</td>
                    <td>{{ item.accumulatedDepreciation }}</td>
                    <td>{{ item.netWorth }}</td>
                    <td>{{ item.statusCN }}</td>
                    <td>{{ item.remark }}</td>
                    <td class="t-right">
                        <a
                            href="javascript:;"
                            class="blue"
                            @click="edit(item)"
                        >编辑 |&nbsp;</a>
                        <a
                            href="javascript:;"
                            class="red"
                            @click="remove(item)"
                        >删除</a>
                    </td>
                </template>
            </data-list>
        </div>
        <layer
            v-if="layer"
            :title="form.id ?'编辑':'新增'"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <div class="flex">
                    <input-box
                        v-model="form.name"
                        class="flex-item mr-20"
                        label="资产名称"
                    ></input-box>
                    <input-box
                        v-model="form.bh"
                        class="flex-item mr-20"
                        label="资产编号"
                    ></input-box>
                    <input-box
                        v-model="form.specifications"
                        class="flex-item mr-20"
                        label="规格型号"
                    ></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.type"
                        class="flex-item mr-20"
                        :list="typeList"
                        label="资产类别"
                    ></select-box>
                    <input-box
                        v-model="form.manufacturer"
                        class="flex-item mr-20"
                        label="生产厂家"
                    ></input-box>
                    <select-box
                        v-model="form.addType"
                        class="flex-item mr-20"
                        :list="addTypeList"
                        label="增加方式"
                    ></select-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.deptName"
                        @click="deptFlag=true"
                        class="flex-item mr-20"
                        label="使用部门"
                    ></input-box>
                    <!-- <input-box v-model="form.departName"  @click="deptFlag=true" class="flex-item mr-20" label="部门名称"></input-box> -->
                    <select-box
                        v-model="form.userName"
                        class="flex-item mr-20"
                        :list="userList"
                        label="领用人"
                    ></select-box>
                    <input-box
                        v-model="form.location"
                        class="flex-item mr-20"
                        label="存放地点"
                    ></input-box>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.num"
                        class="flex-item mr-20"
                        label="资产数量"
                    ></input-box>
                    <input-box
                        v-model="form.unit"
                        class="flex-item mr-20"
                        label="单位"
                    ></input-box>
                    <input-box
                        v-model="form.price"
                        class="flex-item mr-20"
                        label="采购单价"
                    ></input-box>
                </div>
                <div class="flex">
                    <!-- <input-box v-model="form.totalPrice" class="flex-item mr-20" label="采购金额"></input-box> -->
                    <date-picker
                        v-model="form.purchasingTime"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="采购时间"
                    ></date-picker>
                    <date-picker
                        v-model="form.startTime"
                        class="flex-item"
                        style="margin-right: 20px;"
                        label="开始使用日期"
                    ></date-picker>
                </div>
                <div class="flex">
                    <input-box
                        v-model="form.outputRate"
                        class="flex-item mr-20"
                        label="净残值率"
                    ></input-box>
                    <input-box
                        v-model="form.salvageValue"
                        class="flex-item mr-20"
                        label="净残值"
                    ></input-box>
                    <input-box
                        v-model="form.useYear"
                        class="flex-item mr-20"
                        label="使用年限"
                    ></input-box>
                </div>
                <div class="flex">
                    <select-box
                        v-model="form.depreciationMethod"
                        class="flex-item mr-20"
                        :list="methodList"
                        label="折旧方法"
                    ></select-box>
                    <select-box
                        v-model="form.status"
                        class="flex-item mr-20"
                        :list="statusList"
                        label="状态"
                    ></select-box>
                    <!-- <input-box
                        v-model="form.monthDepreciation"
                        class="flex-item mr-20"
                        label="月折旧额"
                    ></input-box> -->
                    <!-- <input-box v-model="form.accruedMonth" class="flex-item mr-20" label="已计提月份"></input-box> -->
                </div>
                <div class="flex">
                    <!-- <input-box v-model="form.monthRate" class="flex-item mr-20" label="月折旧率"></input-box> -->
                    <!-- <input-box
                        v-model="form.accumulatedDepreciation"
                        class="flex-item mr-20"
                        label="累计折旧"
                    ></input-box> -->
                    <!-- <input-box v-model="form.netWorth" class="flex-item mr-20" label="净值"></input-box> -->

                </div>
                <div class="flex">
                    <input-box
                        v-model="form.remark"
                        class="flex-item mr-20"
                        label="备注"
                    ></input-box>
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
            v-if="deptFlag"
            width="50%"
        >
            <div
                class="layer-text"
                style="padding-bottom: 50px;"
            >
                <dept-select @selectClick="selectClick"></dept-select>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import DeptSelect from "@/components/deptSelect";
export default {
    name: "cashAccounting",
    components: { DataList, DeptSelect },
    data() {
        return {
            filter: {
                addType: "",
                bh: "",
                deptId: "",
                name: "",
                status: "",
                type: "",
                userName: "",
            },
            layer: false,
            form: {
                addType: "",
                bh: "",
                depreciationMethod: "",
                deptId: null,
                location: "",
                manufacturer: "",
                name: "",
                num: 0,
                outputRate: null,
                price: 0,
                purchasingTime: "",
                remark: "",
                specifications: "",
                startTime: "",
                status: "",
                totalPrice: 0,
                type: "",
                unit: "",
                useYear: null,
                userName: "",
                deptName: "",
            },
            deptList: [],
            statusList: [
                { text: "正常", value: "0" },
                { text: "停用", value: "1" },
            ],
            accountList: [],
            addTypeList: [],
            typeList: [],
            userList: [],
            methodList: [],
            assettsObj: {
                accumulatedDepreciation: 0,
                netWorth: 0,
                totalPrice: 0,
            },
            deptFlag: false,
        };
    },
    mounted() {
        this.getAddType();
        this.getTypeList();
        this.getDeptList();
        this.getUserList();
        this.getMethodList();
        this.getAssetsData();
    },
    methods: {
        flush() {
            this.filter = {
                addType: "",
                bh: "",
                deptId: "",
                name: "",
                status: "",
                type: "",
                userName: "",
            };
            this.$refs.list.update(true);
            this.getAssetsData();
        },
        selectClick(data) {
            if (data) {
                this.form.deptName = data.name;
                this.form.deptId = data.id;
            }
            this.deptFlag = false;
        },
        getAssetsData() {
            this.$http
                .post("/haolifa/finance/assets/getAssetsSum", this.filter)
                .then((res) => {
                    this.assettsObj.accumulatedDepreciation = res.accumulatedDepreciation;
                    this.assettsObj.netWorth = res.netWorth;
                    this.assettsObj.totalPrice = res.totalPrice;
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        //付款类型
        getAddType() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/ASSETS_ADD_TYPE`)
                .then((res) => {
                    this.addTypeList = res.map((item) => {
                        return {
                            text: item.desc,
                            value: item.code,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getTypeList() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/ASSETS_TYPE`)
                .then((res) => {
                    this.typeList = res.map((item) => {
                        return {
                            text: item.desc,
                            value: item.code,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getMethodList() {
            this.$http
                .get(`/haolifa/sys-dict/getDictListByType/DEPRECIATION_METHOD`)
                .then((res) => {
                    this.methodList = res.map((item) => {
                        return {
                            text: item.desc,
                            value: item.code,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getAccName(value) {
            let str = "";
            this.acceptList.map((item) => {
                if (item.value == value) {
                    str = item.text;
                }
            });
            return str;
        },
        getDeptList() {
            this.$http
                .get(`/haolifa/dept/list`)
                .then((res) => {
                    this.deptList = res.map((item) => {
                        return {
                            text: item.deptName,
                            value: item.id + "",
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.msg || e.message);
                });
        },
        getUserList() {
            this.$http
                .post("/haolifa/pay-user/getAllList", {
                    departName: "",
                    id: "",
                    pageNum: "",
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
                    this.userList = res.map((item) => {
                        return {
                            text: item.userName,
                            value: item.userName,
                        };
                    });
                })
                .catch((e) => {
                    this.$toast(e.message || e.msg);
                });
        },
        edit(item) {
            this.layer = true;
            Object.keys(this.form).forEach((key) => {
                this.form[key] = item[key];
            });
            this.form.id = item.id;
        },
        remove(item) {
            this.$confirm({
                title: "删除确认",
                text: `您确定要删除吗？`,
                color: "red",
                btns: ["取消", "删除"],
                yes: () => {
                    this.$http
                        .get(`/haolifa/finance/assets/delete/${item.id}`)
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
        add(type) {
            this.layer = true;
        },
        save() {
            let url = this.form.id ? "/haolifa/finance/assets/updateAssets" : "/haolifa/finance/assets/save";
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
                accruedMonth: "",
                accumulatedDepreciation: "",
                addType: "",
                bh: "",
                depreciationMethod: "",
                deptId: "",
                equipmentState: "",
                location: "",
                manufacturer: "",
                monthDepreciation: "",
                monthRate: "",
                name: "",
                netWorth: "",
                num: "",
                outputRate: "",
                price: 0,
                purchasingTime: "",
                remark: "",
                salvageValue: "",
                specifications: "",
                startTime: "",
                status: "",
                type: "",
                useYear: "",
                userName: "",
                deptName: "",
            };
        },
    },
};
</script>

<style lang="less">
.page-cashAccounting-list {
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

    //
}
.fixed-length {
    width: 100px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
/*  */