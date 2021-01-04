export default [{
  path: '/delivery-record',
  name: 'delivery-record-list',
  component: () => import('./index.vue'),
  meta: {
    level: 2,
    title: '发货单记录列表',
    open: false,
    id: 'fhjlgl'
  }
}, {
  path: '/delivery-record/addList',
  name: 'delivery-record-addlist',
  component: () => import('./addList.vue'),
  meta: {
    level: 2,
    title: '新增发货记录',
    open: false,
    id: 'xzfhjl'
  }
}, {
  path: '/delivery-record/add',
  name: 'delivery-record-add',
  component: () => import('./add.vue'),
  meta: {
    level: 3,
    title: '新增发货记录',
    open: false,
    id: 'xzfhjl'
  }
}, {
  path: '/delivery-record/edit',
  name: 'delivery-record-edit',
  component: () => import('./add.vue'),
  meta: {
    level: 3,
    title: '编辑发货记录',
    open: false,
    id: 'xzfhjl'
  }
}]