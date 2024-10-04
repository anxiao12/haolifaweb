<template>
  <div class="page-invoice-list">
    <i class="icon icon-abs" @click="flush">autorenew</i>
    <div class="flex-v-center tool-bar">
      <div class="flex-v-center search-bar" style="margin-right: 20px">
        <i class="icon f-20 c-8">search</i>
        <input
          type="text"
          class="flex-item"
          v-model="filter.responsiblePerson"
          @change="$refs.list.update(true)"
          placeholder="责任人"
          style="width: 200px"
        />

        <input
          type="text"
          class="flex-item"
          v-model="filter.place"
          @change="$refs.list.update(true)"
          placeholder="问题发生地点/岗位"
          style="width: 200px"
        />
        <input
          type="text"
          class="flex-item"
          v-model="filter.keyWord"
          @change="$refs.list.update(true)"
          placeholder="问题关键字"
          style="width: 200px"
        />
        状态
        <select
          v-model="filter.status"
          class="f-14"
          @change="$refs.list.update(true)"
        >
          <option value="">全部</option>
          <option value="Y">已解决</option>
          <option value="N">未解决</option>
        </select>
        <i class="icon" style="margin-left: -20px; pointer-events: none"
          >arrow_drop_down</i
        >
      </div>
      <div class="flex-item"></div>
      <btn class="b" flat color="#008eff" @click="add" v-has="'wtdn-aqhb-add'"
        >新增</btn
      >
    </div>
    <div class="flex-v-center tool-bar">
      <div class="flex-v-center search-bar" style="margin-right: 20px">
        <i class="icon f-20 c-8">search</i>
        <input
          type="text"
          class="flex-item"
          v-model="filter.reason"
          @change="$refs.list.update(true)"
          placeholder="问题原因"
          style="width: 200px"
        />
        <input
          type="text"
          class="flex-item"
          v-model="filter.methodDeterProblem"
          @change="$refs.list.update(true)"
          placeholder="确定问题原因的方法"
          style="width: 200px"
        />
        <input
          type="text"
          class="flex-item"
          v-model="filter.temporarySolution"
          @change="$refs.list.update(true)"
          placeholder="临时解决方法"
          style="width: 200px"
        />
        <input
          type="text"
          class="flex-item"
          v-model="filter.longTermSolution"
          @change="$refs.list.update(true)"
          placeholder="长期解决方法"
          style="width: 200px"
        />
      </div>
    </div>
    <div class="flex-item scroll-y">
      <data-list
        ref="list"
        :page-size="15"
        :param="filter"
        url="/haolifa/problemRecordManage/page"
        method="post"
      >
        <tr slot="header">
          <th style="width: 60px">序号</th>
          <th>问题发生地点/岗位</th>
          <th>问题发生时间</th>
          <th>责任人</th>
          <th>问题描述</th>
          <th>问题关键字</th>
          <th>问题原因</th>
          <th>根本原因</th>
          <th>确定问题原因的方法</th>
          <th>临时解决方法</th>
          <th>经济损失(元)</th>
          <th>长期解决方法</th>
          <th>问题解决状态</th>
          <th>备注</th>
          <th class="t-right" style="width: 80px">操作</th>
        </tr>
        <!-- item: 当前行数据; index: 当前行数 -->
        <template slot="item" slot-scope="{ item, index }">
          <td class="c-a">{{ index }}</td>
          <td>{{ item.place }}</td>
          <td>{{ item.occurrenceTime }}</td>
          <td>{{ item.responsiblePerson }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.keyWord }}</td>
          <td>{{ item.reason }}</td>
          <td>{{ item.rootCause }}</td>
          <td>{{ item.methodDeterProblem }}</td>
          <td>{{ item.temporarySolution }}</td>
          <td>{{ item.economicLosses }}</td>
          <td>{{ item.longTermSolution }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.remark }}</td>
          <td class="t-right">
            <a
              href="javascript:;"
              class="blue"
              @click="edit(item)"
              v-has="'wtdn-jygl-edit'"
              >编辑 |&nbsp;</a
            >
            <a href="javascript:;" class="blue" @click="wordRead(item.fileList)"
              >附件查看 |&nbsp;</a
            >
            <a
              href="javascript:;"
              class="red"
              @click="remove(item)"
              v-has="'wtdn-jygl-remove'"
              >删除</a
            >
          </td>
        </template>
      </data-list>
    </div>
    <layer v-if="layer" :title="form.id ? '编辑' : '新增'" width="70%">
      <div class="layer-text" style="padding-bottom: 50px">
        <div class="flex">
          <input-box
            v-model="form.place"
            hint="必填"
            class="flex-item mr-20"
            label="问题发生地点/岗位"
          ></input-box>
          <input-box
            v-model="form.responsiblePerson"
            hint="必填"
            class="flex-item mr-20"
            label="责任人"
          ></input-box>
          <date-picker
            v-model="form.occurrenceTime"
            hint="必填"
            class="flex-item"
            style="margin-right: 20px"
            label="问题发生时间"
          ></date-picker>
        </div>
        <div class="flex">
          <input-box
            multiLine="true"
            v-model="form.keyWord"
            hint="必填"
            class="flex-item mr-20"
            label="问题关键字"
          ></input-box>
          <input-box
            multiLine="true"
            v-model="form.description"
            hint="必填"
            class="flex-item mr-20"
            label="问题描述"
          ></input-box>
        </div>
        <div class="flex">
          <input-box
            multiLine="true"
            v-model="form.reason"
            hint="必填"
            class="flex-item mr-20"
            label="问题原因"
          ></input-box>
          <input-box
            multiLine="true"
            v-model="form.rootCause"
            hint="必填"
            class="flex-item mr-20"
            label="根本原因"
          ></input-box>
        </div>
        <div class="flex">
          <input-box
            multiLine="true"
            v-model="form.methodDeterProblem"
            class="flex-item mr-20"
            label="确定问题原因的方法"
          ></input-box>
          <input-box
            multiLine="true"
            v-model="form.temporarySolution"
            class="flex-item mr-20"
            label="临时解决方法"
          ></input-box>
        </div>
        <div class="flex">
          <input-box
            multiLine="true"
            v-model="form.longTermSolution"
            class="flex-item mr-20"
            label="长期解决方法"
          ></input-box>
        </div>
        <div class="flex">
          <input-box
            v-model="form.economicLosses"
            hint="必填"
            class="flex-item mr-20"
            label="经济损失(元)"
          ></input-box>
          <select-box
            v-model="form.status"
            class="flex-item mr-20"
            hint="必填"
            :list="statusList"
            label="问题解决状态"
          ></select-box>
        </div>
        <div class="flex">
          <input-box
            multiLine="true"
            v-model="form.remark"
            class="flex-item mr-20"
            label="备注"
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
      </div>
      <div class="layer-btns">
        <el-button
          class="mr-20"
          size="mini"
          :loading="fileLoading"
          type="primary"
          @click="save"
          >保存</el-button
        >
        <el-button class="mr-20" size="mini" @click="close">关闭</el-button>
      </div>
    </layer>
    <layer v-if="wordFlag" title="附件查看" width="70%">
      <div class="layer-text" style="padding-bottom: 50px">
        <div class="flex" v-for="(item, i) in wordList" :key="i">
          <a
            v-if="!item.fileUrl.match('\.(doc|docx|xls|xlsx)$')"
            :href="item.fileUrl"
            target="_blank"
            class="blue"
            >{{ item.fileName }}</a
          >
          <a
            v-else
            :href="
              'http://view.officeapps.live.com/op/view.aspx?src=' + item.fileUrl
            "
            target="_blank"
            class="blue"
            >{{ item.fileName }}</a
          >
        </div>
      </div>
      <div class="layer-btns">
        <el-button class="mr-20" size="mini" @click="wordFlag = false"
          >关闭</el-button
        >
      </div>
    </layer>
  </div>
</template>

<script>
import DataList from '@/components/datalist';
import fileToBase64 from '@/utils/fileToBase64';
export default {
  name: 'jiaoxiaogongshi-list',
  components: { DataList },
  data() {
    return {
      filter: {
        keyWord: '',
        longTermSolution: '',
        place: '',
        reason: '',
        responsiblePerson: '',
        rootCause: '',
        status: '',
        temporarySolution: '',
        methodDeterProblem: '',
        type: 'business',
      },
      layer: false,
      form: {
        description: '',
        responsiblePerson: '',
        economicLosses: '',
        fileList: [
          // {
          //     "fileName": "",
          //     "filePath": "",
          //     "fileUrl": "",
          //     "type": "manage"
          // }
        ],
        keyWord: '',
        longTermSolution: '',
        methodDeterProblem: '',
        occurrenceTime: '',
        place: '',
        reason: '',
        remark: '',
        rootCause: '',
        status: '',
        temporarySolution: '',
        type: 'business',
      },
      statusList: [
        { text: '已解决', value: 'Y' },
        { text: '未解决', value: 'N' },
      ],
      loading: false,
      fileList: [],
      fileLoading: false,
      wordFlag: false,
      wordList: [],
    };
  },
  mounted() {},
  methods: {
    flush() {
      this.filter = {
        keyWord: '',
        longTermSolution: '',
        place: '',
        reason: '',
        responsiblePerson: '',
        rootCause: '',
        status: '',
        temporarySolution: '',
        methodDeterProblem: '',
        type: 'business',
      };
      this.$refs.list.update(true);
    },
    wordRead(list) {
      if (!list.length) {
        this.$toast('该数据无附件查看');
        return;
      }
      this.wordList = list;
      this.wordFlag = true;
    },
    uploadFile(file, fileList) {
      this.fileLoading = true;
      fileToBase64(file.source).then((base64Str) => {
        this.$http
          .post('/haolifa/file/uploadFileBase64', {
            base64Source: base64Str,
            fileName: file.name,
          })
          .then((res) => {
            this.form.fileList.push({
              fileName: file.name,
              fileUrl: res,
              type: 'manage',
            });
            this.fileLoading = false;
          })
          .catch((e) => {
            this.$toast(e.msg || e.message);
            this.fileLoading = false;
          });
      });
    },
    removeFile(fileList, i) {
      return new Promise((resolve, reject) => {
        this.form.fileList.splice(i, 1);
        resolve();
      });
    },
    edit(item) {
      this.layer = true;
      Object.keys(this.form).forEach((key) => {
        this.form[key] = item[key];
      });
      this.form.id = item.id;
      this.form.type = 'business';
    },
    remove(item) {
      this.$confirm({
        title: '删除确认',
        text: `您确定要删除吗？`,
        color: 'red',
        btns: ['取消', '删除'],
        yes: () => {
          this.$http
            .post(`/haolifa/problemRecordManage/del/${item.id}`, {
              id: item.id,
            })
            .then((res) => {
              this.$toast('删除成功');
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
      if (!this.form.keyWord.trim()) {
        this.$toast('问题关键字不能为空');
        return;
      }
      if (!this.form.responsiblePerson.trim()) {
        this.$toast('责任人不能为空');
        return;
      }
      if (!this.form.place.trim()) {
        this.$toast('问题发生地点/岗位不能为空');
        return;
      }
      if (!this.form.occurrenceTime) {
        this.$toast('问题发生时间不能为空');
        return;
      }
      if (!this.form.description.trim()) {
        this.$toast('问题描述不能为空');
        return;
      }
      if (!this.form.reason.trim()) {
        this.$toast('问题原因不能为空');
        return;
      }
      if (!this.form.rootCause.trim()) {
        this.$toast('根本原因不能为空');
        return;
      }
      if (!this.form.economicLosses.trim()) {
        this.$toast('经济损失(元)不能为空');
        return;
      }
      if (!this.form.status) {
        this.$toast('问题解决状态不能为空');
        return;
      }
      this.loading = true;
      let url = this.form.id
        ? '/haolifa/problemRecordManage/update'
        : '/haolifa/problemRecordManage/add';
      this.$http
        .post(url, this.form)
        .then((res) => {
          this.close();
          this.$toast('保存成功');
          this.loading = false;
          this.$refs.list.update(true);
        })
        .catch((e) => {
          this.$toast(e.msg || e.message);
        });
    },
    close() {
      this.layer = false;
      this.form = {
        description: '',
        responsiblePerson: '',
        economicLosses: '',
        fileList: [],
        keyWord: '',
        longTermSolution: '',
        methodDeterProblem: '',
        occurrenceTime: '',
        place: '',
        reason: '',
        remark: '',
        rootCause: '',
        status: '',
        temporarySolution: '',
        type: 'business',
      };
    },
  },
};
</script>

<style lang="less">
.page-invoice-list {
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
</style>
