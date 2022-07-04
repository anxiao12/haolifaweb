export default [{
  path: '/supplierequipment',
  name: 'supplierequipment-list',
  component: () => import(/* webpackChunkName: "supplierequipmentlist" */ './index.vue'),
  meta: { level: 2, title: '供应商设备', open: false, id: 'gyssb' }
}, {
  path: '/supplierequipment/add',
  name: 'supplierequipment-add',
  component: () => import(/* webpackChunkName: "supplierequipmentadd" */ './add.vue'),
  meta: { level: 2, title: '新增供应商设备', open: false, id: 'gyssb' }
}, {
  path: '/supplierequipment/edit',
  name: 'supplierequipment-edit',
  component: () => import(/* webpackChunkName: "supplierequipmentedit" */ './add.vue'),
  meta: { level: 2, title: '编辑供应商设备', open: false, id: 'gyssb' }
}]
