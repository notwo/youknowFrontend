import { useAuth0 } from '@auth0/auth0-vue';
import { createRouter, createWebHistory, RouteRecordRaw  } from 'vue-router';

/* titleに関してはここでは一時的に埋め込んだ物を使うが、実際にはそれぞれのvueファイル内で書き換え */
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'top', component: () => import('../components/views/Top.vue'), meta: { title: 'You Know - 自分の知識集約サイト' }},
  { path: '/callback', name: 'callback', component: () => import('../components/views/Callback.vue'), meta: { title: '遷移中...' }},
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
    meta: { title: 'ユーザー情報 - You Know' }
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
    ],
    meta: { title: 'ライブラリ - You Know' }
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
    ],
    meta: { title: 'カテゴリ - You Know' }
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
    ],
    meta: { title: 'キーワード - You Know' }
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
    meta: { title: 'キーワード - You Know' }
  },
  { path: '/:matchAll(.*)', name: 'error', component: () => import('../components/views/404.vue'), meta: { title: 'お探しのページが見つかりませんでした - You Know' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  const title = to.meta.title as String;
  document.title = title;
});

export default router;
