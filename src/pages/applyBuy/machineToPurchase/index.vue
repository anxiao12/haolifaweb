<template>
    <div class="page-material-list">
        <i class="icon icon-abs" @click="flush">autorenew</i>
        <div class="flex-v-center tool-bar">
            <div class="flex-v-center search-bar" style="margin-right: 20px;">
                <i class="icon f-20 c-8">search</i>
                <input type="text" class="flex-item" v-model="filter.productModel" @change="$refs.list.update(true)" placeholder="成品型号" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productName" @change="$refs.list.update(true)" placeholder="成品名称" style="width: 200px;">
                <input type="text" class="flex-item" v-model="filter.productOrderNo" @change="$refs.list.update(true)" placeholder="生产订单编号" style="width: 200px;">
                <!-- <input type="text" class="flex-item" v-model="filter.status" @change="$refs.list.update(true)" placeholder="状态" style="width: 200px;"> -->

                <select v-model="filter.status" class="f-14" @change="$refs.list.update(true)">
                    <option v-for="item in allStatus" :value="item.value" v-bind:key="item.id">{{item.text}}</option>
                </select>
            </div>
            <btn class="b" flat @click="mergeData" color="#008eff">合并采购合同</btn>
        </div>
        <div class="flex-item scroll-y">
            <data-list ref="list" :page-size="15" :param="filter" url="/haolifa/wholeMachineApplyBuy/pageList" method="post">
                <tr slot="header">
                    <th style="width: 60px;">序号</th>
                    <th>
                        <input type="checkbox" name v-model="all" @change="selectAll">
                    </th>
                    <th>成品型号</th>
                    <th>成品名称</th>
                    <th>生产订单编号</th>
                    <th>状态</th>
                    <th class="t-right" style="width: 80px;">操作</th>
                </tr>
                <!-- item: 当前行数据; index: 当前行数 -->
                <template slot="item" slot-scope="{ item, index,i }">
                    <td class="c-a">{{index}}</td>
                    <td v-if="item.status==0">
                        <input type="checkbox" name="boxId" :value="i">
                    </td>
                    <td v-else></td>
                    <td>{{item.productModel}}</td>
                    <td>{{item.productName}}</td>
                    <td>{{item.productOrderNo}}</td>
                    <td>{{allStatus[item.status].text}}</td>
                    <td class="t-right">
                        <a href="javascript:;" v-if="item.status==2" style="margin-right: 3px" class="blue" @click="dealApplyBuy(item.id)">处理完成</a>
                    </td>
                </template>
            </data-list>
        </div>
    </div>
</template>

<script>
import DataList from "@/components/datalist";
export default {
    name: "machineToPurchase-order-list",
    components: { DataList },
    data() {
        return {
            filter: {
              productModel:'',
              productName:'',
              productNo:'',
              productOrderNo:'',
              status:'',
                // type: 0,
                // status: -1,
                // materialName: "",
                // orderNo: "",
                // materialGraphNo: ""
            },
             // 0未处理 1 待审批 2 待采购 3 已处理 4 审批不通过
            allStatus: [
                { value: 0, text: "未处理" },
                { value: 1, text: "待审批" },
                { value: 2, text: "待采购" },
                { value: 3, text: "已处理" },
                { value: 4, text: "审批不通过" },
                { value: '', text: "全部" }
            ],
            all: false
        };
    },
    methods: {
      dealStatus(status){
        // 0未处理 1 待审批 2 待采购 3 已处理 4 审批不通过
        if(status ===0){
          return '未处理'
        }else if(status === 1){
          return '待审批'
        }else if(status === 2){
          return '待采购'
        }else if(status ===3){
          return '已处理'
        }else if(status === 4){
          return '审批不通过'
        }
      },
        flush() {
            this.filter = {
                productModel:'',
                productName:'',
                productNo:'',
                productOrderNo:'',
                status:'',
                // type: 0,
                // status: -1,
                // materialName: "",
                // orderNo: "",
                // materialGraphNo: ""
            };
            this.$refs.list.update(true);
        },
        dealApplyBuy(itemId) {
            this.$http
                .post(`/haolifa/applyBuy/updateStatus/${itemId}`)
                .then(res => {
                    this.$toast("处理成功");
                    this.$refs.list.update(true);
                })
                .catch(e => {
                    this.$toast("处理失败");
                });
        },
        selectAll() {
            let arr = document.getElementsByName("boxId");
            if (this.all) {
                for (let i in arr) {
                    arr[i].checked = true;
                }
            } else {
                for (let j in arr) {
                    arr[j].checked = false;
                }
            }
        },
        listHasName(list, name) {
            let flag = false;
            if (list.length === 0) {
                return flag;
            }
            list.map(item => {
                if (name == item.materialGraphNo) {
                    flag = true;
                    return flag;
                }
            });
            return flag;
        },
        mergeData() {
            let list = JSON.parse(JSON.stringify(this.$refs.list.list));
            let arr = document.getElementsByName("boxId"),
            dataList = [],
            ids = [],
            dataArr = [];
            for (let i in arr) {
                if (arr[i].checked) {
                    // if (!dataArr.includes(list[arr[i].value].materialGraphNo)){
                    //     dataArr.push(list[arr[i].value].materialGraphNo);
                    // }
                    //合并订单中图号一样的数据
                    // if (
                    //     this.listHasName(
                    //         dataList,
                    //         list[arr[i].value].materialGraphNo
                    //     )
                    // ) {
                    //     dataList.map(item => {
                    //         if (
                    //             item.materialGraphNo ==
                    //             list[arr[i].value].materialGraphNo
                    //         ) {
                    //             item.purchaseNumber =
                    //                 item.purchaseNumber +
                    //                 list[arr[i].value].purchaseNumber;
                    //         }
                    //     });
                    // } else {
                    //     dataList.push(list[arr[i].value]);
                    // }
                    // ids.push(list[arr[i].value].id);
                    console.log('list',list[arr[i].value])
                    let rowScope = list[arr[i].value]
                    console.log('id',list[arr[i].value].id)

                    ids.push({
                        productId:rowScope.id,
                        category:rowScope.productSeries,
                        series:rowScope.productSeries,
                        productModel:rowScope.productModel,
                        specification:rowScope.specifications
                    })
                }
            }
            if (ids.length == 0) {
                this.$toast("请至少选中一条数据!");
                return;
            }
            console.log('ids',ids)
            let dealId=[]
            ids.map(res =>{
              dealId.push(res.productId)
            })
            this.$http
                .post("/haolifa/whole/machine/product/listSupplierByParam", { list: ids })
                .then(res => {
                    if (res.length === 0) {
                        this.$toast("未找到供应商");
                        return;
                    } else {
                        this.$router.push({
                            name: "order-machine-purchaseAdd",
                            params: {
                                list: dataList,
                                supList: res,
                                ids: dealId
                            }
                        });
                    }
                })
                .catch(e => {
                    this.$toast("处理失败");
                });
        }
    }
};
</script>

<style lang="less">
.page-material-list {
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
