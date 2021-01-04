export default [{
  path: '/user',
  name: 'user',
  component: () => import(/* webpackChunkName: "user" */ './index.vue'),
  meta: { level: 2, title: '人员管理', open: false, id: 'rygl' }
}, {
  path: '/user/add',
  name: 'user-add',
  component: () => import(/* webpackChunkName: "user-add" */ './add.vue'),
  meta: { level: 2, title: '添加人员', open: false, id: 'rygl' }
}, {
  path: '/user/edit',
  name: 'user-edit',
  component: () => import(/* webpackChunkName: "user-edit" */ './add.vue'),
  meta: { level: 2, title: '编辑人员', open: false, id: 'rygl' }
}]
