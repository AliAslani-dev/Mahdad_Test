<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col">
  

    <div class="min-h-screen bg-gray-100 p-6 flex flex-col">
      <!-- Scrollable container -->
      <div
        ref="scrollContainer"
        class="overflow-y-auto bg-white p-4 rounded-lg shadow-md"
        style="height: calc(100vh - 100px); scroll-behavior: smooth"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="(user, index) in users"
            :key="index"
            class="bg-gray-50 shadow rounded-lg p-4 flex flex-col items-center fade-in"
          >
            <img :src="user.picture.large" class="w-24 h-24 rounded-full mb-2" />
            <p class="font-semibold text-center">{{ user.name.first }} {{ user.name.last }}</p>
            <p class="text-sm text-gray-500 text-center">{{ user.email }}</p>
          </div>
        </div>

        <div ref="sential" class="flex justify-center py-6">
          <div
            v-if="loading"
            class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const page = ref(1);
const loading = ref(false);
const sential = ref(null);
const scrollContainer = ref(null);

const fetchUsers = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=${page.value}`);
    users.value.push(...response?.data?.results);
    page.value++;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchUsers();
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  if (sential.value) {
    observer.observe(sential.value);
  }
});
</script>

<style scoped>
.loader {
  border-top-color: #3490dc; /* Tailwind indigo-500 */
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Simple fade-in for cards without changing layout */
.fade-in {
  opacity: 0;
  animation: fadeInAnim 0.5s forwards;
}
@keyframes fadeInAnim {
  to {
    opacity: 1;
  }
}
</style>
