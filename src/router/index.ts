import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'top', component: () => import('../components/views/Top.vue') },
  { path: '/callback', name: 'callback', component: () => import('../components/views/Callback.vue') },
  //{ path: '/login', name: 'login', component: () => import('../components/views/Login.vue') },
  { path: '/:username/libraries', name: 'libraries', component: () => import('../components/views/Libraries.vue'),
    children: [
      {
        path: 'libraries',
        component: () => import('../components/library/LibraryList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories', name: 'categories', component: () => import('../components/views/Categories.vue'),
    children: [
      {
        path: 'categories',
        component: () => import('../components/category/CategoryList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories/:category_id/keywords', name: 'keywords', component: () => import('../components/views/Keywords.vue'),
    children: [
      {
        path: 'keywords',
        component: () => import('../components/keyword/KeywordList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories/:category_id/keywords/:keyword_id', name: 'keyword', component: () => import('../components/keyword/KeywordDetail.vue') },
  { path: '/:matchAll(.*)', name: 'error', component: () => import('../components/views/404.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
