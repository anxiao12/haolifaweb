export default [{
  path: '/parttype',
  name: 'parttype-list',
  component: () => import(/* webpackChunkName: "parttypelist" */ './index.vue'),
  meta: { level: 2, title: '成品管理', open: false, id: 'ljflsz' }
}, {
  path: '/parttype/add',
  name: 'parttype-add',
  component: () => import(/* webpackChunkName: "parttypeadd" */ './add.vue'),
  meta: { level: 3, title: '新增成品', open: false, id: 'ljflsz' }
}, {
  path: '/parttype/edit',
  name: 'parttype-edit',
  component: () => import(/* webpackChunkName: "parttypeedit" */ './add.vue'),
  meta: { level: 3, title: '编辑成品', open: false, id: 'ljflsz' }
}]
