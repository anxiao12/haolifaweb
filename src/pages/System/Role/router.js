export default [{
  path: '/role',
  name: 'role',
  component: () => import(/* webpackChunkName: "role" */ './index.vue'),
  meta: { level: 2, title: '角色管理', open: false, id: 'jsgl' }
},{
  path: '/role/edit',
  name: 'role-edit',
  component: () => import(/* webpackChunkName: "role" */ './add.vue'),
  meta: { level: 2, title: '编辑角色', open: false, id: 'jsgl' }
},{
  path: '/role/add',
  name: 'role-add',
  component: () => import(/* webpackChunkName: "role" */ './add.vue'),
  meta: { level: 2, title: '新增角色', open: false, id: 'jsgl' }
},{
    path: '/role/tree',
    name: 'role-tree',
    component: () => import(/* webpackChunkName: "role" */ './Newrole/index.vue'),
    meta: { level: 2, title: '角色预览', open: true, id: 'jsgl' }
  
}]
