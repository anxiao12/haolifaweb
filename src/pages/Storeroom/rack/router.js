export default [{
  path: '/rack',
  name: 'rack-list',
  component: () => import(/* webpackChunkName: "racklist" */ './index.vue'),
  meta: { level: 2, title: '库位管理', open: false, id: 'kwgl' }
}, {
  path: '/rack/add',
  name: 'rack-add',
  component: () => import(/* webpackChunkName: "rackadd" */ './add.vue'),
  meta: { level: 2, title: '新增库位', open: false, id: 'kwgl' }
}, {
  path: '/rack/edit',
  name: 'rack-edit',
  component: () => import(/* webpackChunkName: "rackedit" */ './add.vue'),
  meta: { level: 2, title: '编辑库位', open: false, id: 'kwgl' }
}]
