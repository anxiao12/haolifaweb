export default [{
  path: '/material-room',
  name: 'material-list',
  component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
  meta: { level: 2, title: '零件待入库列表', open: false, id: 'ljdrk' }
}]
