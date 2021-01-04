export default {
  path: '/department',
  name: 'department',
  component: () => import(/* webpackChunkName: "department" */ './NewDepartment/index.vue'),
  meta: { level: 2, title: '部门管理', open: false, id: 'bmgl' }
}
