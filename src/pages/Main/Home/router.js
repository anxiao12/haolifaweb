export default [{
  path: '/',
  name: 'home',
  component: () => import(/* webpackChunkName: "home" */ './index.vue'),
  meta: { level: 2, title: '', open: false, id: 'home' }
},{
    path: '/order-info',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './info.vue'),
    meta: { level: 2, title: '', open: false, id: 'home' }
},{
    path: '/nuclear-audit-form',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ './nuclearForm.vue'),
    meta: { level: 2, title: '核料清单', open: false, id: 'home' }
}]
