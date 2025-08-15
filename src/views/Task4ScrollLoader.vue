<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-2xl font-bold mb-4">Random Users</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(user, index) in users"
        :key="index"
        class="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
      >
        <img :src="user.picture.large" alt="User Avatar" class="w-24 h-24 rounded-full mb-2" />
        <p class="font-semibold">{{ user.name.first }} {{ user.name.last }}</p>
        <p class="text-sm text-gray-500">{{ user.email }}</p>
      </div>
    </div>

    <!-- Scroll sentinel / loader -->
    <div ref="sential" class="flex justify-center py-6">
      <div
        v-if="loading"
        class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"
      ></div>
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

const fetchUsers = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const response = await axios.get(`https://randomuser.me/api/?results=10&page=${page.value}`);
    users.value.push(...response?.data?.results);
    page.value++;
  } catch (error) {
    console.log(error);
    loading.value = false;
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
          fetchUsers(); // call your function when the element is visible
        }
      });
    },
    {
      root: null, // the element used as the viewport for checking visibility. null = browser viewport
      rootMargin: "0px", // margin around the root. e.g., "0px 0px 100px 0px" to trigger earlier
      threshold: 0.1, // percentage of the target’s visibility to trigger the callback (0 = any part visible, 1 = fully visible)
    }
  );

  if (sential.value) {
    observer.observe(sential.value);
  }
});
</script>

<style lang="scss" scoped></style>
