<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">

    <!-- Header (Full Width) -->
    <header class="bg-white shadow-lg w-full">
      <nav class="flex items-center justify-between px-8 py-4 w-full">
        <!-- Logo -->
        <div class="text-2xl font-extrabold text-indigo-600 tracking-wide">MyBrand</div>

        <!-- Links -->
        <div class="flex items-center gap-8">
          <a href="#" class="text-gray-700 hover:text-indigo-600 transition">خانه</a>
          <a href="#" class="text-gray-700 hover:text-indigo-600 transition">درباره ما</a>
          <a href="#" class="text-gray-700 hover:text-indigo-600 transition">خدمات</a>
          <a href="#" class="text-gray-700 hover:text-indigo-600 transition">تماس با ما</a>
        </div>
      </nav>
    </header>

    <!-- Main (Full Width) -->
    <main class="flex-grow w-full px-8 py-6">
      <router-view />
    </main>

    <!-- Footer (Full Width) -->
   <footer class="bg-white shadow-lg w-full">
  <div class="max-w-7xl mx-auto px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
    
    <!-- Left: copyright -->
    <p class="text-sm sm:text-base">&copy; 2025 <span class="font-semibold">MyBrand</span>. تمام حقوق محفوظ است.</p>
    
    <!-- Right: links -->
    <div class="flex gap-6 text-sm sm:text-base">
      <a href="#" class="flex items-center gap-1 hover:text-indigo-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zM14 11h6m-6 4h6M14 7h6M5 7h6m-6 4h6m-6 4h6"/>
        </svg>
        حریم خصوصی
      </a>
      <a href="#" class="flex items-center gap-1 hover:text-indigo-200 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
        شرایط استفاده
      </a>
    </div>

  </div>
</footer>

    
  </div>
</template>

<script setup>
// No JS logic yet
</script>
