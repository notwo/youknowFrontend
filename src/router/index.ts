import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'top', component: () => import('../components/views/Top.vue') },
  { path: '/callback', name: 'callback', component: () => import('../components/views/Callback.vue') },
  //{ path: '/login', name: 'login', component: () => import('../components/views/Login.vue') },
  { path: '/:username/libraries', name: 'libraries', component: () => import('../components/views/Libraries.vue'),
    children: [
      {
        path: 'libraries',
        component: () => import('../components/LibraryList.vue'),
      },
    ]
  },
  { path: '/:username/libraries/:library_id/categories', name: 'categories', component: () => import('../components/views/Categories.vue') },
  { path: '/keyword', name: 'keywords', component: () => import('../components/views/Keywords.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
