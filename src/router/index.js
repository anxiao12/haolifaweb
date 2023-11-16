import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
// import getUserInfo from './getUserInfo'
import axios from 'axios';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

function createRoutesFromFiles(routeFiles) {
  // console.log('routeFiles',routeFiles.kes())
  let _routes = [];
  routeFiles.keys().forEach(key => {
    // console.log('key',key)
    let item = routeFiles(key).default;

    if (item instanceof Array) item.forEach(route => _routes.push(route));
    else _routes.push(item);
  });
  // console.log('_routes',_routes)
  return _routes;
}

function eachRoutes(children, parent) {
  children.forEach(child => {
    if (!child.meta) child.meta = {};
    if (parent)
      for (let key in parent.meta)
        child.meta[key] = child.meta[key] || parent.meta[key];
    if (child.children) eachRoutes(child.children, child);
  });
}

const routes = createRoutesFromFiles(
  require.context('../', true, /(\.\/pages\/([a-zA-Z0-9_-]+\/)+?router)\.js$/)
);

eachRoutes(routes);

const createRouter = () =>
  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '*',
        component: () =>
          import(/* webpackChunkName: "login" */ '../pages/404/index.vue'),
        meta: {
          level: 1,
          title: ''
        }
      },
      {
        path: '/login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../pages/Login/index.vue'),
        meta: {
          level: 1,
          title: '登录',
          open: true
        }
      }
    ]
  });

const router = createRouter();

// router.addRoutes(routes.filter(r => r.meta.open))

router.beforeEach((to, from, next) => {
  if (to.meta.open) {
    if (to.path != '/login') {
      store.commit('UPDATEMENUTABS', {
        name: to.meta.title,
        url: to.path
      });
    }
    next();
    return;
  }
  if (store.state.account.menus) {
    if (to.path != '/login') {
      store.commit('UPDATEMENUTABS', {
        name: to.meta.title,
        url: to.path
      });
    }
    next();
    return;
  }
  axios
    .get('/haolifa/self/info')
    .then(res => {
      console.log('res', res)
      res = res.data.result;
      res.menus.push('home');
      store.commit('LOGIN', res);
      store.commit("UPDATE_BUTTONS", res.buttons)
      resetRouter(res.menus);
      router.replace({
        path: to.path,
        query: to.query
      });
    })
    .catch(e => {
      console.log(e);
      router.replace('/login');
    });
});

router.onError(err => {
  console.log(err);
});

export function resetRouter(menus) {
  router.matcher = createRouter().matcher;
  router.addRoutes([
    {
      path: '/',
      component: () =>
        import(/* webpackChunkName: "main" */ '../pages/Main/index.vue'),
      meta: {
        level: 2,
        title: 'HAOLIFA',
        open: false
      },
      children: routes.filter(
        r => r.meta.open || (r.meta.id && menus.includes(r.meta.id))
      )
    }
  ]);
}

export default router;
