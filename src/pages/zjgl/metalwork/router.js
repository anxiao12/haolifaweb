export default [{
  path: '/inspect-metalwork',
  name: 'metalwork-list',
  component: () => import( /* webpackChunkName: "diliverylist" */ './index.vue'),
  meta: {
    level: 2,
    title: '加工质检列表',
    open: false,
    id: 'jgzjlb'
  }
}, {
  path: '/inspect-metalwork/addList',
  name: '/inspect-metalwork-addlist',
  component: () => import( /* webpackChunkName: "diliverylist" */ './addList.vue'),
  meta: {
    level: 2,
    title: '机加工质检记录',
    open: false,
    id: 'xzjgzjjl'
  }
}, {
  path: '/inspect-metalwork/info',
  name: 'metalwork-info',
  component: () => import( /* webpackChunkName: "diliverylist" */ './info.vue'),
  meta: {
    level: 2,
    title: '机加工质检记录',
    open: false,
    id: 'jgzjlb'
  }
}]