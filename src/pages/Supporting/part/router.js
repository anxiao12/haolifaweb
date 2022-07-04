export default [{
  path: '/part',
  name: 'part-list',
  component: () => import(/* webpackChunkName: "partlist" */ './index.vue'),
  meta: { level: 2, title: '零件管理', open: false, id: 'ljsz' }
}, {
  path: '/part/add',
  name: 'part-add',
  component: () => import(/* webpackChunkName: "partadd" */ './add.vue'),
  meta: { level: 3, title: '新增零件', open: false, id: 'ljsz' }
}, {
  path: '/part/edit',
  name: 'part-edit',
  component: () => import(/* webpackChunkName: "partedit" */ './add.vue'),
  meta: { level: 3, title: '编辑零件', open: false, id: 'ljsz' }
}]
