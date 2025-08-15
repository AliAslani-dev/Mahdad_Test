import { createRouter, createWebHistory } from "vue-router";
import DefaoultLayout from "../layouts/DefaoultLayout.vue";
import LayoutTask from "../layouts/LayoutTask.vue";

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
        {
          path: "/task2",
          name: "task2",
          component: () => import("../views/Task2Ecommerce.vue"),
        },
      ],
    },
    {
      path: "/layout",
      name: "layout",
      component: LayoutTask,

      children : [
        {
          path: "",
          name: "task6",
          component: () => import("../views/Task6LayoutContent.vue"),
        },
      ]
    },
  ],
});

export default router;
