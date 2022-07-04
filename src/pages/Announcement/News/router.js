export default [{
  path: '/news',
  name: 'news',
  component: () => import(/* webpackChunkName: "news" */ './index.vue'),
  meta: { level: 2, title: '新闻管理', open: false, id: 'xwgl' }
},{
  path: '/news/add',
  name: 'news-add',
  component: () => import(/* webpackChunkName: "news" */ './add.vue'),
  meta: { level: 2, title: '增加新闻', open: false, id: 'xwgl' }
},{
  path: '/news/edit',
  name: 'news-edit',
  component: () => import(/* webpackChunkName: "news" */ './add.vue'),
  meta: { level: 2, title: '编辑新闻', open: false, id: 'xwgl' }
},{
  path: '/news/info',
  name: 'news-info',
  component: () => import(/* webpackChunkName: "news" */ '../Notification/info.vue'),
  meta: { level: 2, title: '新闻详情', open: false, id: 'xwgl' }
}]
