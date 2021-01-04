export default [{
  path: '/room',
  name: 'room-list',
  component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
  meta: { level: 2, title: '库房管理', open: false, id: 'kfgl' }
}, {
  path: '/room/add',
  name: 'room-add',
  component: () => import(/* webpackChunkName: "roomadd" */ './add.vue'),
  meta: { level: 3, title: '新增库房', open: false, id: 'kfgl' }
}, {
  path: '/room/edit',
  name: 'room-edit',
  component: () => import(/* webpackChunkName: "roomedit" */ './add.vue'),
  meta: { level: 3, title: '编辑库房', open: false, id: 'kfgl' }
}]
