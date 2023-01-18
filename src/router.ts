import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Welcome from "./components/Welcome.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Welcome,
    props: { msg: "Welcome to the VM Quiz Test!" },
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("./components/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
