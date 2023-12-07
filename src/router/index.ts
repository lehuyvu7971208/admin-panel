// Utilities
import { useAuthStore } from "@/modules/auth/store/auth";

// Composables
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "login",
    path: "/login",
    component: () => import(/* webpackChunkName: "login" */ "@/views/Login/Login.vue"),
  },
  {
    path: "/",
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
        path: "/users",
        meta: { authRequired: true },
        component: () => import(/* webpackChunkName: "users" */ "@/views/Users/Users.vue"),
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
