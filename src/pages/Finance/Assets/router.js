export default [{
  path: '/assets',
  name: 'assets',
  component: () => import(/* webpackChunkName: "assets" */ './index.vue'),
  meta: { level: 2, title: '资产管理', open: false, id: 'zcgl' }
}]
