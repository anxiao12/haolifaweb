export default [{
  path: '/process-manager',
  name: 'processmanager',
  component: () => import(/* webpackChunkName: "process" */ './index.vue'),
  meta: { level: 2, title: 'HAOLIFA', open: false, id: 'lcgl' }
},{
    path: '/process-manager/info',
    name: 'processmanager-info',
    component: () => import(/* webpackChunkName: "process" */ './info.vue'),
    meta: { level: 2, title: 'HAOLIFA', open: false, id: 'lcgl' }
}

]
