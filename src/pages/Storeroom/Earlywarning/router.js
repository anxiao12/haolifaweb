export default {
  path: '/earlywarning',
  name: 'earlywarning',
  component: () => import( /* webpackChunkName: "earlywarning" */ './index.vue'),
  meta: {
    level: 2,
    title: '库存预警',
    open: false,
    id: 'kcyj'
  }
}