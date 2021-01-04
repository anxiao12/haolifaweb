export default {
  path: '/permission',
  name: 'permission',
  component: () => import(/* webpackChunkName: "permission" */ './index.vue'),
  meta: { level: 2, title: '权限管理', open: false, id: 'qxgl' }
}
