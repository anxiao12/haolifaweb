<template>
    <div class="data-list relative f-12">
        <transition name="slide-y">
            <table v-if="list.length" class="data-table">
                <slot name="header">
                    <tr>
                        <th>表头1</th>
                        <th>表头2</th>
                    </tr>
                </slot>
                <tr v-for="(item, i) in list" :key="item.id">
                    <slot name="item" :i="i" :item="item" :index="(pageNum - 1) * pageSize + i + 1">
                        <td>数据1</td>
                        <td>数据2</td>
                    </slot>
                </tr>
            </table>
        </transition>
        <div class="flex-v-center" style="margin-top: 10px;">
            <pagination class="mr-20" v-if="list.length" :page="pageNum" :size="pageSize" :total="total" @change="getList"></pagination>
            <span v-if="total" class="f-12 c-6">共 {{total}} 条数据</span>
        </div>

        <div v-if="!list.length && !loading" style="margin-top: 100px;">
            <no-data></no-data>
        </div>
    </div>
</template>

<script>
import obj2QueryStr from "@/utils/obj2QueryStr";

export default {
    name: "data-list",
    props: {
        method: { type: String, default: "get" },
        url: { type: String, default: "" },
        pageSize: { type: Number, default: 20 },
        param: { type: Object, default: () => {} },
        pageNumStr: { type: String, default: "pageNum" }
    },
    data() {
        return {
            pageNum: 1,
            total: 0,
            loading: false,
            list: []
        };
    },
    watch: {
        url() {
            this.update();
        },
        mehtod() {
            this.update();
        },
        pageSize() {
            this.update();
        },
        param() {
            this.update();
        }
    },
    created() {
        this.pageNum = this.$route.query.page || 1;
        this.getList(this.pageNum);
    },
    methods: {
        getList(pageNum) {
            const { method, url, pageSize, param } = this;
            if (!url) return;
            this.loading = true;
            const pageParam = { pageSize };
            pageParam[this.pageNumStr] = pageNum;
            const params = Object.assign(pageParam, param);
            const path = method === "get" ? url + obj2QueryStr(params) : url;
            this.$http[method](path, params)
                .then(res => {
                    this.list = res.list || res || [];
                    this.pageNum = res.pageNum;
                    let query = this.$route.query;
                    query.page = res.pageNum;
                    this.$router.push({ path: this.$route.path, query });
                    this.total = res.total;
                    this.loading = false;
                })
                .catch(e => {
                    this.loading = false;
                    this.$toast(e.message || e.msg || e);
                });
        },
        update(resetPageNum) {
            this.getList(resetPageNum ? 1 : this.pageNum);
        }
    }
};
</script>

<style lang="less">
.data-list {
    padding: 0 15px;
}
.data-table {
    th,
    td {
        padding: 0 10px;
        height: 36px;
    }
    tr:nth-child(even) {
        background: #f8f8f8;
    }
    tr:hover {
        background: #f2f2f2;
    }
    tr td .icon-btn {
        opacity: 0.2;
    }
    tr:hover td .icon-btn {
        opacity: 1;
    }
    td a:hover {
        color: #008eff;
    }
}
</style>
