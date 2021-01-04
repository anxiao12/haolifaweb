export default [{
  path: '/stresstest',
  name: 'streestest-list',
  component: () => import( /* webpackChunkName: "materiallist" */ './index.vue'),
  meta: {
    level: 2,
    title: '压力测试',
    open: false,
    id: 'ylcslb'
  }
}, {
  path: '/stresstest/addList',
  name: 'stresstest-addlist',
  component: () => import( /* webpackChunkName: "materiallist" */ './addList.vue'),
  meta: {
    level: 2,
    title: '压力测试',
    open: false,
    id: 'xzylcs'
  }
}, {
  path: '/stresstest/add',
  name: 'stresstest-add',
  component: () => import( /* webpackChunkName: "materiallist" */ './add.vue'),
  meta: {
    level: 2,
    title: '新增',
    open: false,
    id: 'ylcslb'
  }
}, {
  path: '/stresstest/edit',
  name: 'stresstest-edit',
  component: () => import( /* webpackChunkName: "materiallist" */ './add.vue'),
  meta: {
    level: 2,
    title: '编辑',
    open: false,
    id: 'ylcslb'
  }
}, {
  path: '/stresstest/info',
  name: 'stresstest-info',
  component: () => import( /* webpackChunkName: "materiallist" */ './info.vue'),
  meta: {
    level: 2,
    title: '编辑',
    open: false,
    id: 'ylcslb'
  }
}]