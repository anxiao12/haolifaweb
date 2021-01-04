export default {
  path: '/node',
  name: 'node',
  component: () => import(/* webpackChunkName: "node" */ './index.vue'),
  meta: { level: 2, title: 'HAOLIFA', open: false, id: 'jdgl' }
}
