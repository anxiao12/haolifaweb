export default [{
  path: '/report',
  name: 'report',
  component: () => import(/* webpackChunkName: "report" */ './index.vue'),
  meta: { level: 2, title: '报表管理', open: false, id: 'bbgl' }
}]
