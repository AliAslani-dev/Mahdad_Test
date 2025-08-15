<template>
  <div class="flex flex-col h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-800">
    <header class="bg-blue-600 text-white p-4">هدر ثابت</header>

    <main class="fex-1 overflow-y-auto p-4 bg-gray-50">
      <router-view />
    </main>

    <footer style="margin-bottom: 30px" class="bg-gray-800 text-white p-4 mb-5">فوتر ثابت</footer>
  </div>
</template>
