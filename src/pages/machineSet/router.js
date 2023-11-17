export default [
  {
    path: '/machineSet',
    name: 'machineSet',
    component: () => import( /* webpackChunkName: "orderlist" */ './index.vue'),
    meta: {
      level: 2,
      title: '整机设置',
      open: false,
      id: 'zjsz'
    }
  },
  {
    path: '/qmachineSet',
    name: 'qmachineSet',
    component: () => import( /* webpackChunkName: "orderlist" */ './qIndex.vue'),
    meta: {
      level: 2,
      title: '整机设置',
      open: false,
      id: 'zjsz-query'
    }
  },
  {
    path: '/machineSet/add',
    name: 'machineSet-add',
    component: () => import(/* webpackChunkName: "machineSetadd" */ './add.vue'),
    meta: { level: 3, title: '新增整机设置', open: false, id: 'zjsz' }
  }, {
    path: '/machineSet/edit',
    name: 'machineSet-edit',
    component: () => import(/* webpackChunkName: "machineSetedit" */ './add.vue'),
    meta: { level: 3, title: '编辑整机设置', open: false, id: 'zjsz' }
  }
]
