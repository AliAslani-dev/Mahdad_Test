<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 p-6">

    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">🔍 جستجوی کاربر</h1>

    <!-- Content Area -->
    <div class="flex-grow flex flex-col items-center">
      
      <!-- Input Card -->
      <div class="w-full max-w-md bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
        <label class="block text-gray-600 font-semibold mb-2">آیدی کاربر</label>
        <input
          type="number"
          v-model="userId"
          @input="fetchUser"
          placeholder="مثلاً 1"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-6 flex items-center gap-2 animate-pulse">
        <div class="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-gray-600">در حال بارگذاری...</span>
      </div>

      <!-- Error -->
      <div v-if="error" class="mt-6 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-sm">
        {{ error }}
      </div>

      <!-- User Data -->
      <div v-if="userData" class="mt-8 w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
        <div class="p-5">
          <h2 class="text-lg font-bold text-indigo-600">مشخصات کاربر</h2>
          <p class="text-gray-700 mt-2"><span class="font-semibold">ID:</span> {{ userData.id }}</p>
          <p class="text-gray-700"><span class="font-semibold">نام:</span> {{ userData?.name }}</p>
          <p class="text-gray-700"><span class="font-semibold">ایمیل:</span> {{ userData?.email }}</p>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup>
import { ref } from "vue";
import axios from "axios";

const userId = ref();
const userData = ref(null);
const loading = ref(false);
const error = ref(null);

const cache = new Map();
let currentController = null;

const fetchUser = async () => {
  const id = userId.value;
  if (!id) return;

  if (cache.has(id)) {
    userData.value = cache.get(id);
    error.value = null;
    loading.value = false;
    return;
  }

  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  loading.value = true;
  error.value = null;
  userData.value = null;

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, {
      signal: currentController.signal,
    });
    userData.value = response.data;
    cache.set(id, response.data);
  } catch (err) {
    if (err.name !== "CanceledError") {
      error.value = "خطا در دریافت اطلاعات!";
    }
  } finally {
    loading.value = false;
  }
};
</script>
