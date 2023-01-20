import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Welcome from "./components/Welcome.vue";
import Quiz from "./components/Quiz.vue";
import Results from "./components/Results.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Welcome,
    props: { msg: "Welcome to the VM Quiz Test!" },
  },
  {
    path: "/quiz",
    component: Quiz,
    props: true,
  },
  {
    path: "/results",
    component: Results,
    props: true,
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
