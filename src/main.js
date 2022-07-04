import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/';
import store from './store/';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
// import obj2FormData from './utils/obj2FormData'
import {
  Tree,
  Radio,
  Button,
  Dialog,
  Select,
  Option,
  DatePicker,
  Tabs,
  TabPane,
  Pagination,
  Table,
  TableColumn,
  Descriptions,
  DescriptionsItem,
  Input,
  Form,
  FormItem,
  Link,
  Checkbox,
  Loading,
  Upload
} from 'element-ui';
import './common';

Vue.use(Input);
Vue.use(Tree);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.use(Loading);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Upload);
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// axios.interceptors.request.use(function (config) {
//   console.log(config)
//   // config.
//   // if (!config.headers.Authorization && token) config.headers.Authorization = `Bearer ${token}`
//   // if (config.method === 'post') config.data = obj2FormData(config.data)
//   return config
// })

axios.interceptors.response.use(
  function(response) {
    if (response.data) {
      if (response.data.code === '0000') return response.data.result;
      if (response.data.code === '1') {
        router.replace('/login');
      } else return Promise.reject(response.data || response);
    } else {
      return Promise.reject(response.data || response);
    }
  },
  function(e) {
    if (e.response.status == 401) {
      if (e.response.data.code === '1') {
        router.replace('/login');
        return Promise.reject('用户会话超时，请重新登录');
      } else {
        return Promise.reject(e.response.data.msg || e.response.data.message);
      }
    }
    return Promise.reject(e);
  }
);
