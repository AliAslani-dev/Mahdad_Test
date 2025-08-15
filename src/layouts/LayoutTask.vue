<template>
  <div class="flex flex-col h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
    <!-- Header with back link -->
    <header class="bg-blue-600 text-white p-4 flex items-center justify-center relative shadow-md">
      <!-- Back link positioned on the left -->
      <router-link
        to="/"
        class="absolute left-4 flex items-center space-x-2 bg-white text-blue-600 font-semibold px-3 py-1 rounded shadow hover:bg-blue-50 hover:scale-105 transition transform"
      >
        <span class="text-sm md:text-base">بازگشت</span>
      </router-link>

      <!-- Centered header title -->
      <h1 class="text-lg font-semibold">هدر ثابت</h1>
    </header>

    <!-- Scrollable content -->
    <main class="flex-1 overflow-y-auto p-4 bg-gray-50">
      <router-view />
    </main>

    <!-- Footer -->
    <footer
      style="margin-bottom: 40px"
      class="bg-gray-800 text-white p-4 mb-5 shadow-inner text-center"
    >
      فوتر ثابت
    </footer>
  </div>
</template>

<script setup></script>

<style scoped>
.material-icons {
  font-size: 20px;
}
</style>
