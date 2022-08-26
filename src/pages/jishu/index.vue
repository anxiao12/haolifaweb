<template>
    <div class="page-jishu-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.productName" @change="$refs.list.update(true)" placeholder="产品名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)" placeholder="型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.actuatorModel" @change="$refs.list.update(true)" placeholder="执行器型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.specifications" @change="$refs.list.update(true)" placeholder="规格" style="width: 200px;">
            </div>
            <div class="flex-item"></div>
            <btn class="b" flat color="#008eff" @click="add">新增</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/technical_detailed/pageInfo" method="post" :borderFlag="true">
                <tr slot="header">
                    <th class="t-border" style="width: 60px;" rowspan="2">序号</th>
                    <th class="t-border" rowspan="2">产品名称</th>
                    <th class="t-border" rowspan="2">型号</th>
                    <th class="t-border" rowspan="2">规格</th>
                    <th class="t-border" rowspan="2" >上法兰标准</th>
                    <th class="t-border" colspan="3" style="text-align:center">上法兰尺寸</th>
                    <th class="t-border" colspan="5" style="text-align:center">出轴尺寸</th>
                    <th class="t-border" rowspan="2">静扭矩</th>
                    <th class="t-border" rowspan="2">执行器型号</th>
                    <th class="t-border" rowspan="2">备注</th>
                    <th class="t-border " rowspan="2" style="width: 80px;">操作</th>
                </tr>
                <tr slot="header">
                    <th class="t-border">连接孔</th>
                    <th class="t-border">角度</th>
                    <th class="t-border">中心距</th>
                    <th class="t-border">出轴型式</th>
                    <th class="t-border">出轴长度</th>
                    <th class="t-border">轴图号</th>
                    <th class="t-border">连接套</th>
                    <th class="t-border">过渡盘</th>
                    <!-- <th class="t-right" style="width: 80px;">操作</th> -->
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item,index }">
                     <td class="c-a">{{ index }}</td>
                   <td>{{item.productName}}</td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.specifications}}</td>
                    <td>{{item.upperFlangeStandard}}</td>
                    <td>{{item.connectingHole}}</td>
                    <td>{{item.angle}}</td>
                    <td>{{item.centerDistance}}</td>
                    <td>{{item.outputShaftType}}</td>
                    <td>{{item.outputShaftLength}}</td>
                    <td>{{item.axisDrawingNo}}</td>
                    <td>{{item.connectingSleeve}}</td>
                    <td>{{item.transitionPlate}}</td>
                    <td>{{item.staticTorque}}</td>
                    <td>{{item.actuatorModel}}</td>
                    <td>{{item.remark}}</td>
                    <td class="t-right">
                        <a href="javascript:;" class="blue" @click="edit(item)" >编辑 |</a>
                        <a href="javascript:;" class="red" @click="del(item)" >删除</a>
                    </td> 
                </template>
            </data-list>
        </div>
        <layer v-if="addLayer" :title="form.id ?'编辑':'新增' " width="70%">
            <div class="layer-text" style="padding-bottom: 50px;">
                <div class="flex">
                    <input-box v-model="form.productName" class="flex-item mr-20" label="产品名称"></input-box>
                    <input-box v-model="form.productModel" class="flex-item mr-20" label="型号"></input-box>
                    <input-box v-model="form.specifications" class="flex-item mr-20" label="规格"></input-box>
                    <input-box v-model="form.upperFlangeStandard" class="flex-item mr-20" label="上法兰标准"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.connectingHole" class="flex-item mr-20" label="连接孔"></input-box>
                    <input-box v-model="form.angle" class="flex-item mr-20" label="角度"></input-box>
                    <input-box v-model="form.centerDistance" class="flex-item mr-20" label="中心距"></input-box>
                    <input-box v-model="form.outputShaftType" class="flex-item mr-20" label="出轴型式"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.outputShaftLength" class="flex-item mr-20" label="出轴长度"></input-box>
                    <input-box v-model="form.axisDrawingNo" class="flex-item mr-20" label="轴图号"></input-box>
                    <input-box v-model="form.connectingSleeve" class="flex-item mr-20" label="连接套"></input-box>
                    <input-box v-model="form.transitionPlate" class="flex-item mr-20" label="过渡盘"></input-box>
                </div>
                <div class="flex">
                    <input-box v-model="form.staticTorque" class="flex-item mr-20" label="静扭矩"></input-box>
                    <input-box v-model="form.actuatorModel" class="flex-item mr-20" label="执行器型号"></input-box>
                    <input-box v-model="form.remark" class="flex-item mr-20" label="备注"></input-box>
                </div>
            </div>
            <div class="layer-btns">
                <el-button class="mr-20" size="mini" :loading="loading" type="primary" @click="save">保存</el-button>
                <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
            </div>
        </layer>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
import fileToBase64 from "@/utils/fileToBase64";
export default {
    name: "auto-control-list",
    components: { DataList },
    data() {
        return {
            layer: false,
            filter: {
                "actuatorModel": "",
                "productModel": "",
                "productName": "",
                "specifications": ""
            },
            addLayer: false,
            form: {
                "actuatorModel": "",
                "angle": "",
                "axisDrawingNo": "",
                "centerDistance": "",
                "connectingHole": "",
                "connectingSleeve": "",
                "createTime": "",
                "createUser": "",
                "id": null,
                "outputShaftLength": "",
                "outputShaftType": "",
                "productModel": "",
                "productName": "",
                "remark": "",
                "specifications": "",
                "staticTorque": "",
                "transitionPlate": "",
                "updateTime": "",
                "updateUser": "",
                "upperFlangeStandard": ""
            },
            loading: false,
        };
    },
    methods: {
        flush() {
            this.filter = {
                "actuatorModel": "",
                "productModel": "",
                "productName": "",
                "specifications": ""
            };
            this.$refs.list.update(true);
        },
        add() {
            this.addLayer = true;
        },
        edit(item) {
            this.addLayer = true;
            Object.keys(item).forEach(key=>{
                this.form[key] = item[key]
            })
        },
        save() {
            this.loading = true;
            let url = this.form.id
                ? "/haolifa/technical_detailed/update"
                : "/haolifa/technical_detailed/save";
            this.$http
                .post(url, this.form)
                .then(res => {
                    this.close();
                    this.$toast("保存成功");
                    this.loading = false;
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast(e.msg || e.message);
                });
        },
        close() {
            this.addLayer = false;
            this.form = {
                "actuatorModel": "",
                "angle": "",
                "axisDrawingNo": "",
                "centerDistance": "",
                "connectingHole": "",
                "connectingSleeve": "",
                "createTime": "",
                "createUser": "",
                "id": null,
                "outputShaftLength": "",
                "outputShaftType": "",
                "productModel": "",
                "productName": "",
                "remark": "",
                "specifications": "",
                "staticTorque": "",
                "transitionPlate": "",
                "updateTime": "",
                "updateUser": "",
                "upperFlangeStandard": ""
            };
        },
        del(item) {
            this.$confirm({
                title: "删除完成确认",
                text: `您确定删除吗`,
                color: "red",
                btns: ["取消", "确认"],
                yes: () => {
                    this.$http
                        .post(`/haolifa/technical_detailed/del/${item.id}`)
                        .then(res => {
                            this.$refs.list.update(true);
                        })
                        .catch(e => {
                            this.$toast(e.msg || e.message);
                        });
                }
            });
        }
    }
};
</script>

<style lang="less">
.page-jishu-list {
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
    .t-border{
        // tr{
            border:1px solid #ccc
        // }
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
select {
    background: none;
    border: none;
    outline: none;
    padding: 5px 20px 5px 10px;
    appearance: none;
}
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
