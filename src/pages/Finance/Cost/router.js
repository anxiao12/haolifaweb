export default [{
  path: '/cost',
  name: 'cost',
  component: () => import(/* webpackChunkName: "cost" */ './index.vue'),
  meta: { level: 2, title: '费用管理', open: false, id: 'fygl' }
}]
