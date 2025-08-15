<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Scrollable content -->
    <main class="flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        <div
          v-for="i in 400"
          :key="i"
          class="p-3 bg-white rounded-lg shadow hover:bg-blue-50 transition-colors"
        >
          Item {{ i }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup></script>
