import { createWebHistory, createRouter } from "vue-router";
import Main from "./components/Main";
import Questions from "./components/Questions";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Main,
  },
  {
    name: "Questions",
    path: "/questions",
    component: Questions,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
