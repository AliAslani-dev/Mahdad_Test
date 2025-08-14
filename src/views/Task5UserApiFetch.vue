<template>
  <div class="p-4 min-h-screen">
    <div class="mb-4">
      <label for="">تست کن</label>
      <input type="number" v-model="userId" @input="fetchUser()" />
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

const cashe = new Map();

let currentController = null;

const fetchUser = async () => {
  const id = userId.value;

  if (!id) return;

  if (cashe.has(id)) {
    userData.value = cashe.get(id);
    error.value = null;
    loading.value = false;
    return;
  }

  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  loading.value = true;
  (error.value = null), (userData.value = null);

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      signal: currentController.signal,
    });
    userData.value = response?.data?.data;
    cashe.set(id, response?.data);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
