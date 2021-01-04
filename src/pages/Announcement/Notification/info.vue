<template>
    <div class="page-supplier-info abs scroll-y">
        <div class="form-content">
            <div class="b f-18 flex-v-center" style="margin-bottom: 20px;">
                <icon-btn class="mr-15" @click="$router.back()">arrow_back</icon-btn>
                <div class="flex-item">详情</div>
            </div>
            <!--<no-data v-if="!info.id" style="margin: 50px 0;"/>-->
            <table class="f-14 order-info">
                <tr>
                    <td style="width: 20%;"></td>
                    <td style="width: 80%;"></td>
                </tr>
                <tr>
                    <th>创建时间</th>
                    <td>{{form.createTime}}</td>
                </tr>
                <tr>
                    <th>标题</th>
                    <td>{{form.title}}</td>
                </tr>
                <tr>
                    <th>内容</th>
                    <td style="word-wrap: break-word; max-width: 600px">{{form.content}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
// import parseJson from '@/utils/parseJson'
export default {
    name: "purchsemanage-purchaseinfo",
    data() {
        return {
            loading: false,
            form: {
                createTime: "",
                title: "",
                content: ""
            }
        };
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            let { id } = this.$route.query;
            this.$http
                .get(`/haolifa/message/info/${id}`)
                .then(res => {
                    this.form = res;
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
