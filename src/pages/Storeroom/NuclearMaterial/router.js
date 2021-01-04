export default [{
  path: '/nuclear-material/list',
  name: 'nuclear-material',
  component: () => import(/* webpackChunkName: "roomlist" */ './index.vue'),
  meta: { level: 2, title: '核替换料列表', open: false, id: 'kghl' }
}, {
  path: '/nuclear-material',
  name: 'nuclear-material-nuclear',
  component: () => import(/* webpackChunkName: "roomadd" */ './nuclear.vue'),
  meta: { level: 3, title: '核料', open: false, id: 'kghl' }
}, {
  path: '/nuclear-form',
  name: 'nuclear-material-form',
  component: () => import(/* webpackChunkName: "roomadd" */ './nuclearForm.vue'),
  meta: { level: 3, title: '核料清单', open: false, id: 'kghl' }
}, {
        path: '/nuclear-replace-form',
        name: 'nuclear-material-replace',
        component: () => import(/* webpackChunkName: "roomadd" */ './replaceMaterial.vue'),
        meta: { level: 3, title: '替换料清单', open: false, id: 'kghl' }
    }, {
    path: '/nuclear-replace/approveProgress',
    name: 'nuclear-material-approveProgress',
    component: () => import(/* webpackChunkName: "roomadd" */ './approveProgress.vue'),
    meta: { level: 3, title: '替换料审批进度', open: false, id: 'kghl' }
}]
