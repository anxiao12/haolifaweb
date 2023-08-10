export default [
  {
    path: '/report-forms/list',
    name: 'report-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './index.vue'),
    meta: {
      level: 2,
      title: '费用报表',
      open: false,
      id: 'bjcwbj'
    }
  },
  {
    path: '/report-forms/cgList',
    name: 'cgreport-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './cgIndex.vue'),
    meta: {
      level: 2,
      title: '采购报表',
      open: false,
      id: 'cgbj'
    }
  },
  {
    path: '/report-forms/xsList',
    name: 'xsreport-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './xsIndex.vue'),
    meta: {
      level: 2,
      title: '销售报表',
      open: false,
      id: 'xsbj'
    }
  },
  {
    path: '/report-forms/zlList',
    name: 'zlreport-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './zlIndex.vue'),
    meta: {
      level: 2,
      title: '质量报表',
      open: false,
      id: 'zlbj'
    }
  },
  {
    path: '/report-forms/cbList',
    name: 'cbreport-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './cbIndex.vue'),
    meta: {
      level: 2,
      title: '成本报表',
      open: false,
      id: 'cbbb'
    }
  },
  {
    path: '/report-forms/yjList',
    name: 'yjreport-forms',
    component: () =>
      import(/* webpackChunkName: "suppliermanage" */ './yjIndex.vue'),
    meta: {
      level: 2,
      title: '业绩指标统计',
      open: false,
      id: 'yjtjzb'
    }
  }
];
