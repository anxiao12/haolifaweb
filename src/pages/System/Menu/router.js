export default {
  path: '/menu',
  name: 'menu',
  component: () => import(/* webpackChunkName: "menu" */ './index.vue'),
  meta: { level: 2, title: 'HAOLIFA', open: false, id: 'cdgl' }
}
