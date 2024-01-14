// Utilities
import { useAuthStore } from "@/modules/auth/store/auth";

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const loadAuthInfo = (): boolean => {
  const authStore = useAuthStore();
  authStore.me();

  return true;
};

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login/Login.vue"),
  },
  {
    path: "/",
    beforeEnter: [loadAuthInfo],
    component: () => import(/* webpackChunkName: "layout" */ "@/layouts/Full/FullLayout.vue"),
    children: [
      {
        path: "/",
        name: "home",
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },

      {
        name: "users",
        path: "/user/management",
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "user-management" */ "@/views/Users/Users.vue"),
      },

      {
        name: "admins",
        path: "/admin/management",
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "admin-management" */ "@/views/Admins/Admins.vue"),
      },

      {
        name: "businesses",
        path: "/business/management",
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "business-management" */ "@/views/Businesses/Businesses.vue"),
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/Error/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.authRequired && !authStore.accessToken) {
    return { name: "login" };
  }
});

export default router;
