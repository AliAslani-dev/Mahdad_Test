import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DefaoultLayout from "../layouts/DefaoultLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaoultLayout,
      children: [
        {
          path: "/task5",
          name: "task5",
          component: () => import("../views/Task5UserApiFetch.vue"),
        },
        {
          path: "/task4",
          name: "task4",
          component: () => import("../views/Task4ScrollLoader.vue"),
        },
         {
          path: "/task1",
          name: "task1",
          component: () => import("../views/Task1UserPrefrences.vue"),
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
