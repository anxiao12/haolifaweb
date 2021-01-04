export default [{
  path: '/inspect-material',
  name: 'material-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: '零件报检单列表',
    open: false,
    id: 'ljzjlb'
  }
}, {
  path: '/inspect-material/addList',
  name: 'material-list-add',
  component: () => import( /* webpackChunkName: "diliverylist" */ './addList.vue'),
  meta: {
    level: 2,
    title: '零件报检单列表',
    open: false,
    id: 'xzljzjjl'
  }
}]