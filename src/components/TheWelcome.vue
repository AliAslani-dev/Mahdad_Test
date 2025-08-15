<script setup>
import WelcomeItem from "./WelcomeItem.vue";
import { ref, onMounted } from "vue";

const mainProjectLink = "https://mahdad-test.vercel.app/"; // main page link

const tasks = [
  {
    id: 8,
    name: "setup",
    description: `This recording shows the initial setup of my environment before starting the tasks, including editor configuration, folder structure, and basic project initialization. This video is recorded at lower quality (480p) to save space. All other recordings are in full resolution for clarity`,
    driveLink: "https://drive.google.com/file/d/1xjBZ9FKegN57wcvdKTzGnUnEZRpeng5R/view?usp=sharing",
  },
  {
    id: 1,
    name: "Task 1: Personalized Dashboard",
    description: `Build a dashboard where users can set preferences like theme ("light" or "dark") and font size. The settings should persist across page reloads using localStorage.`,
    driveLink: "https://drive.google.com/file/d/1Af_tvkhgvF6KLOXZQOKcSFN6QLoRcJ1f/view?usp=sharing",
  },
  {
    id: 2,
    name: "Task 2: E-commerce Cart Management",
    description: `Manage a multi-page e-commerce cart. Ensure data persists across pages, updates are instant, and recommend products based on similar customers.`,
    driveLink: "https://drive.google.com/file/d/your_file_id_2/view",
  },
  {
    id: 3,
    name: "Task 3: Stock Market Dashboard",
    description: `Implement a circuit breaker for stock market API requests. Stop requests after 3 failures, retry after 1 minute, and notify users when the service is unavailable.`,
    driveLink: "https://drive.google.com/file/d/15agELiiebSu3_dfdmxMdLbQhGlDbdoAA/view?usp=sharing",
  },
  {
    id: 4,
    name: "Task 4: Virtual Scrolling for Logs",
    description: `Optimize rendering of 10,000+ user activity logs using virtual scrolling. Support dynamic row heights and smooth infinite scrolling without performance issues.`,
    driveLink: "https://drive.google.com/file/d/1LEf1arXCjWiLe7jwpUM5PUEa-KhtNuP1/view?usp=sharing",
  },
  {
    id: 5,
    name: "Task 5: Latest User API Fetch",
    description: `Fetch user data based on userId. Only the latest request counts, cache results per userId, and display data on the page.`,
    driveLink: "https://drive.google.com/file/d/1P6H_of4KXC5EbO-uBDa5KiW2qSZMBCFh/view?usp=sharing",
  },
  {
    id: 6,
    name: "Task 6: Expandable Layout with Tailwind",
    description: `Create a page layout with a fixed header and footer, and a content area that can grow and scroll when content exceeds available space.`,
    driveLink: "https://drive.google.com/file/d/1mbmkkILgLf1aE_l72rwmG0DiXZs95r3-/view?usp=sharing",
  },
  {
    id: 7,
    name: "Task 7: Flexible Row Layout with Tailwind",
    description: `Design a row layout with fixed-width items 1 & 2 and a flexible item 3 that grows based on available space.`,
    driveLink: "https://drive.google.com/file/d/1_BxENYlpln_uicBsZYzIH2nrZG9rcdcK/view?usp=sharing",
  },
];

const visibleTasks = ref([]);
onMounted(() => {
  tasks.forEach((_, index) => {
    setTimeout(() => {
      visibleTasks.value.push(tasks[index]);
    }, index * 150);
  });
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-200 p-6"
  >
    <!-- Main Project Link -->
    <div style="margin-bottom: 20px;" class="mb-8 flex justify-center">
  <a
    :href="mainProjectLink"
    target="_blank"
    class="relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
  >
    View Online Project
    <span class="ml-3 inline-block transform transition-transform duration-300 group-hover:translate-x-1">→</span>
  </a>
</div>

    <div class="w-full max-w-2xl space-y-6">
      <transition-group name="fade-slide" tag="div">
        <WelcomeItem
          v-for="task in visibleTasks"
          :key="task.id"
          class="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style="margin-bottom: 10px"
        >
          <template #heading>
            <h2 class="text-xl font-bold text-gray-800">{{ task.name }}</h2>
          </template>
          <p class="mt-2 text-gray-600 leading-relaxed">{{ task.description }}</p>
          <p class="mt-3">
            <a
              :href="task.driveLink"
              target="_blank"
              class="text-green-600 font-bold hover:underline"
            >
              Open on Google Drive
            </a>
          </p>
        </WelcomeItem>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-enter-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
