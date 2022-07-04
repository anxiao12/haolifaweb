export default [{
  path: '/product-room',
  name: 'product-list',
  component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
  meta: { level: 2, title: '成品待入库列表', open: false, id: 'cpdrk' }
}, {
  path: '/product-room/edit',
  name: 'product-edit',
  component: () => import(/* webpackChunkName: "roomedit" */ './add.vue'),
  meta: { level: 3, title: '待入库详情', open: false, id: 'cpdrk' }
}]
