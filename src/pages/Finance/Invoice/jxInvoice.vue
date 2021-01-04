<template>
  <div class="invoice">
    <div class="flex-v-center tool-bar">
      <div class="flex-v-center search-bar" style="margin-right: 20px;">
        <i class="icon f-20 c-8">search</i>
        <input
          type="text"
          class="flex-item"
          v-model="filter.orderNo"
          @change="
            $refs.list.update(true);
            getPriceTotal();
          "
          placeholder="订单号"
          style="width: 100px;"
        />
        <i class="icon f-20 c-8">search</i>
        <input
          type="text"
          class="flex-item"
          v-model="filter.constractParty"
          @change="
            $refs.list.update(true);
            getPriceTotal();
          "
          placeholder="合同方"
          style="width: 100px;"
        />
        开票状态：
        <select v-model="filter.status" class="f-14" @change="statusChange">
          <option
            v-for="item in allStatus"
            :value="item.value"
            v-bind:key="item.id"
            >{{ item.text }}</option
          >
        </select>
        <i class="icon" style="margin-left: -10px;pointer-events:none;"
          >arrow_drop_down</i
        >
        开票开始日期：
        <el-date-picker
          v-model="filter.startInvoiceDate"
          style="width:150px"
          type="date"
          value-format="yyyy-MM-dd"
          @change="
            $refs.list.update(true);
            getPriceTotal();
          "
          :editable="false"
          placeholder="选择年月日"
          width="100"
        ></el-date-picker
        >开票结束日期：
        <el-date-picker
          v-model="filter.endInvoiceDate"
          type="date"
          value-format="yyyy-MM-dd"
          @change="
            $refs.list.update(true);
            getPriceTotal();
          "
          :editable="false"
          placeholder="选择年月日"
          style="width:150px"
        ></el-date-picker>
        <btn
          class="b"
          flat
          color="#008eff"
          style="width:100px"
          @click="layer = true"
          >添加发票</btn
        >
      </div>
    </div>
    <div class="flex-v-center tool-bar">
      <span class="f-16" style="margin-left: 10px;color:#008eff"
        >发票总金额（元）:{{ priceTotal }}</span
      >
    </div>
    <div class="flex-item scroll-y">
      <data-list
        class="f-14"
        ref="list"
        method="post"
        :page-size="20"
        :param="filter"
        url="/haolifa/invoice/list/1"
      >
        <tr slot="header">
          <th style="width: 60px;">序号</th>
          <th>合同编号</th>
          <th>合同方</th>
          <th>金额</th>
          <th>发票号</th>
          <th>类型</th>
          <th>开票日期</th>
          <th>状态</th>
          <th>备注</th>
          <th class="t-right" style="width: 80px;">操作</th>
        </tr>
        <template slot="item" slot-scope="{ item, index }">
          <td>{{ index }}</td>
          <td>{{ item.orderNo }}</td>
          <td>{{ item.constractParty }}</td>
          <td>￥ {{ item.totalAmount }}</td>
          <td>{{ item.invoiceNo }}</td>
          <td>{{ allTypes[item.type].text }}</td>
          <td>{{ item.invoiceDate }}</td>
          <td>{{ statusArr[item.status].text }}</td>
          <td>{{ item.remark }}</td>
          <td class="t-right">
            <a
              href="javascript:;"
              v-if="item.status == 1 || item.status == 0"
              class="blue"
              @click="billing(item)"
              >开票</a
            >
            <a
              href="javascript:;"
              v-if="item.status == 1 || item.status == 0"
              class="blue"
              @click="download(item.orderNo)"
              >| 出库记录下载</a
            >
            <a
              href="javascript:;"
              v-if="item.status == 2"
              class="blue"
              @click="edit(item)"
              >编辑</a
            >
          </td>
        </template>
      </data-list>
    </div>

    <layer v-if="layer" :title="form.id ? '编辑发票' : '新增发票'" width="60%">
      <div class="layer-text" style="margin-bottom:80px">
        <input-box v-model="form.invoiceNo" label="发票编号"></input-box>
        <input-box v-model="form.orderNo" label="订单编号"></input-box>
        <select-box
          :list="allStatusAdd"
          v-model="form.status"
          label="发票状态"
        ></select-box>
        <select-box
          :list="allTypesAdd"
          v-model="form.type"
          label="发票类型"
        ></select-box>
        <input-box v-model="form.invoiceIssuing" label="开票单位"></input-box>
        <input-box v-model="form.invoiceCompany" label="收票单位"></input-box>
        <input-box
          type="number"
          v-model="form.totalAmount"
          label="发票金额"
        ></input-box>
        <date-picker
          v-model="form.invoiceDate"
          class="flex-item"
          label="开票时间"
          style="margin-right: 20px;"
        ></date-picker>
        <input-box
          :multi-line="true"
          type="text"
          v-model="form.remark"
          label="备注"
        ></input-box>
      </div>
      <div class="layer-btns">
        <btn flat @click="cancel">取消</btn>
        <btn flat color="#008eff" @click="submit">保存</btn>
      </div>
    </layer>

    <layer v-if="bill.layerbill" :title="'开票'" width="450px">
      <div class="layer-text" style="padding-bottom: 250px;">
        <input-box v-model="bill.orderNo" label="合同编号"></input-box>
        <input-box v-model="bill.billInvoiceNo" label="发票编号"></input-box>
        <date-picker
          v-model="bill.invoiceDate"
          class="flex-item"
          label="开票时间"
          style="margin-right: 20px;"
        ></date-picker>
      </div>
      <div class="layer-btns">
        <btn flat @click="cancel">取消</btn>
        <btn flat color="#008eff" @click="billInvoice()">开票</btn>
      </div>
    </layer>
    <layer v-if="exportLayer" :title="'导出'" width="30%">
      <div class="layer-text" style="padding-bottom: 50px;min-height:380px;">
        <div class="flex ml-20 mr-20">
          <date-picker
            v-model="exportForm.startDate"
            hint="必填"
            class="flex-item"
            label="开始时间"
          ></date-picker>
        </div>
        <div class="flex ml-20 mr-20">
          <date-picker
            v-model="exportForm.endDate"
            hint="必填"
            class="flex-item"
            label="结束时间"
          ></date-picker>
        </div>
        <div class="flex ml-20 mr-20">
          <input-box
            v-model="exportForm.orderNo"
            class="flex-item"
            label="订单号"
          ></input-box>
        </div>
      </div>
      <div class="layer-btns">
        <btn flat @click="exportLayer = false">取消</btn>
        <btn flat color="#008eff" @click="download()">确定</btn>
      </div>
    </layer>
  </div>
</template>

<script>
import DataList from '@/components/datalist';

export default {
  name: 'invoice',
  components: { DataList },
  data() {
    return {
      priceTotal: '',
      filter: {
        type: 2,
        status: -1,
        statusList: [1, 2],
        orderNo: '',
        startInvoiceDate: '',
        endInvoiceDate: '',
      },
      allStatus: [
        { value: -1, text: '全部' },
        // { value: 0, text: "待开票" },
        { value: 1, text: '已申请' },
        { value: 2, text: '已开票' },
      ],
      statusArr: [
        { value: 0, text: '待开票' },
        { value: 1, text: '已申请' },
        { value: 2, text: '已开票' },
      ],
      allTypes: [
        { value: 0, text: '全部' },
        { value: 1, text: '开出（生产）' },
        { value: 2, text: '开入（采购）' },
      ],
      allStatusAdd: [
        { value: 1, text: '待开票' },
        { value: 2, text: '已开票' },
      ],
      allTypesAdd: [
        { value: 1, text: '开出（生产）' },
        { value: 2, text: '开入（采购）' },
      ],

      bill: {
        layerbill: false,
        billInvoiceNo: '',
        invoiceDate: '',
        orderNo: '',
      },
      layer: false,
      form: {
        id: '',
        invoiceNo: '',
        orderNo: '',
        status: 1,
        totalAmount: '',
        type: 1,
        invoiceIssuing: '',
        invoiceCompany: '',
        invoiceDate: '',
      },
      exportLayer: false,
      exportForm: {
        startDate: '',
        endDate: '',
        orderNo: '',
      },
    };
  },
  mounted() {
    this.getPriceTotal();
  },
  methods: {
    billing(item) {
      this.bill.orderNo = item.orderNo;
      this.bill.layerbill = true;
      this.bill.billInvoiceNo = '';
      this.bill.invoiceDate = '';
      this.bill.id = item.id;
    },
    statusChange() {
      this.$refs.list.update(true);
      this.getPriceTotal();
    },
    billInvoice() {
      this.$http
        .post(
          // `/haolifa/invoice/updateInvoiceNo/${this.bill.id}/${this.bill.billInvoiceNo}`,
          `/haolifa/invoice/updateInvoiceNo`,
          {
            id: this.bill.id,
            invoiceNo: this.bill.billInvoiceNo,
            invoiceDate: this.bill.invoiceDate,
          }
        )
        .then((res) => {
          this.$toast('开票成功');
          this.$refs.list.update();
          this.bill.layerbill = false;
        })
        .catch((e) => {
          this.$toast(e.msg || e.message);
        });
    },
    getPriceTotal() {
      this.$http
        .post(`/haolifa/statistics/money/invoice/2`, this.filter)
        .then((res) => {
          this.priceTotal = res.totalAmount;
        })
        .catch((e) => {
          this.$toast(e.msg || e.message);
        });
    },
    edit(item) {
      for (let key in this.form) this.form[key] = item[key];
      this.layer = true;
    },
    vertify() {
      for (let key in this.form) {
        let item = this.form[key];
        if (
          !item &&
          item !== 0 &&
          key !== 'id' &&
          key !== 'orderNo' &&
          key !== 'remark'
        ) {
          this.$toast('请输入完整信息');
          return false;
        }
      }
      return true;
    },
    submit() {
      if (!this.vertify()) return;
      const { form } = this;
      this.$http
        .post('/haolifa/invoice/save', form)
        .then((res) => {
          this.$refs.list.update();
          this.cancel();
          this.$toast('保存成功');
        })
        .catch((e) => {
          this.$toast(e.message || e.meg);
        });
    },
    cancel() {
      this.form = {
        id: '',
        invoiceNo: '',
        orderNo: '',
        status: 1,
        totalAmount: '',
        type: 1,
      };
      this.bill.layerbill = false;
      this.layer = false;
    },
    remove(item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除以下发票吗？<br><b>${item.invoiceNo}</b>`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http
            .get(`/haolifa/invoice/delete/${item.id}`)
            .then((res) => {
              this.$toast('删除成功');
              this.$refs.list.update();
            })
            .catch((e) => {
              this.$toast(e.msg || e.message);
            });
        },
      });
    },
    out(item) {
      this.$router.push(`/invoice-out?orderNo=${item.orderNo}`);
    },
    exportExcel(item) {
      this.exportLayer = true;
      this.exportForm = {
        orderNo: item.orderNo,
        startDate: '',
        endDate: '',
      };
    },
    download(orderNo) {
      // if (!this.exportForm.startDate) {
      //     this.$toast("请选择开始时间");
      //     return;
      // }
      // if (!this.exportForm.endDate) {
      //     this.$toast("请选择结束时间");
      //     return;
      // }
      const a = document.createElement('a'); // 创建a标签
      a.setAttribute('download', ''); // download属性
      // a.setAttribute(
      //     "href",
      //     `/haolifa/export/product-out?startDate=${this.exportForm.startDate}&endDate=${this.exportForm.endDate}&orderNo=${this.exportForm.orderNo}&operationType=1`
      // );
      a.setAttribute(
        'href',
        `/haolifa/export/product-out?orderNo=${orderNo}&operationType=1`
      );
      a.click();
      // this.exportLayer = false;
    },
  },
};
</script>

<style lang="less">
.invoice {
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
</style>
