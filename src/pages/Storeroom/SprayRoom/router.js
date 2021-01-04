export default [{
    path: '/spray-room',
    name: 'spray-room-list',
    component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
    meta: { level: 2, title: '喷涂待入库', open: false, id: 'ptdrk' }
}]