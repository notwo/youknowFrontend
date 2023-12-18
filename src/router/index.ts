import { useAuth0 } from '@auth0/auth0-vue';
import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'top', component: () => import('../components/views/Top.vue') },
  { path: '/callback', name: 'callback', component: () => import('../components/views/Callback.vue') },
  //{ path: '/login', name: 'login', component: () => import('../components/views/Login.vue') },
  { path: '/:username', name: 'usertop', component: () => import('../components/views/UserTop.vue'),
    beforeEnter: (to, from, next) => {
      const auth0 = useAuth0();
      if (auth0.isAuthenticated.value) {
        next();
      } else {
        next('/')
      }
    },
  },
  { path: '/:username/libraries', name: 'libraries', component: () => import('../components/views/Libraries.vue'),
    beforeEnter: (to, from, next) => {
      const auth0 = useAuth0();
      if (auth0.isAuthenticated.value) {
        next();
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'libraries',
        component: () => import('../components/library/LibraryList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories', name: 'categories', component: () => import('../components/views/Categories.vue'),
    beforeEnter: (to, from, next) => {
      const auth0 = useAuth0();
      if (auth0.isAuthenticated.value) {
        next();
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'categories',
        component: () => import('../components/category/CategoryList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories/:category_id/keywords', name: 'keywords', component: () => import('../components/views/Keywords.vue'),
    beforeEnter: (to, from, next) => {
      const auth0 = useAuth0();
      if (auth0.isAuthenticated.value) {
        next();
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'keywords',
        component: () => import('../components/keyword/KeywordList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories/:category_id/keywords/:keyword_id', name: 'keyword', component: () => import('../components/keyword/KeywordDetail.vue'),
    beforeEnter: (to, from, next) => {
      const auth0 = useAuth0();
      if (auth0.isAuthenticated.value) {
        next();
      } else {
        next('/')
      }
    },
  },
  { path: '/:matchAll(.*)', name: 'error', component: () => import('../components/views/404.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
