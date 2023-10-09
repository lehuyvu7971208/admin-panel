// Composables
import { useAuthStore } from '@/store/auth';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue'),

  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/layouts/Home/Home.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },

      {
        name: 'users',
        path: '/users',
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "users" */ '@/views/Users/Users.vue'),
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (!authStore.accessToken && to.meta.authRequired) {
    return { name: 'login' };
  }
});

export default router;
