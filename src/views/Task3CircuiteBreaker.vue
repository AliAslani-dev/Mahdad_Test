<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 font-sans">
    <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2 ">
        📈 قیمت ارز دیجیتال
      </h1>

      <!-- پیام قطع سرویس -->
      <div style="margin-top: 20px;"
        v-if="serviceUnavailable"
        class="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-6 border border-yellow-300 leading-relaxed"
      >
        ⛔ درخواست‌ها به دلیل خطاهای مکرر موقتاً مسدود شده‌اند. لطفاً کمی بعد دوباره تلاش کنید.
      </div>

      <!-- پیام خطا -->
      <div style="margin-top: 20px;"
        v-if="error"
        class="bg-red-100 text-red-800 p-4 rounded-lg mb-6 border border-red-300 leading-relaxed"
      >
        ⚠ خطا: {{ error.message || "مشکلی پیش آمده است" }}
      </div>

      <!-- نمایش داده -->
      <div style="margin-top: 20px;"
        v-if="data && !showLoading"
        class="bg-green-50 text-green-800 p-4 rounded-lg mb-6 border border-green-300"
      >
        ✅ اطلاعات با موفقیت دریافت شد:
        <pre class="mt-3 text-sm bg-white p-4 rounded border border-green-200 overflow-x-auto">
{{ JSON.stringify(data, null, 2) }}
        </pre>
      </div>

      <!-- لودینگ -->
      <transition name="fade">
        <div v-if="showLoading" class="flex justify-center py-6">
          <div class="relative w-10 h-10">
            <div class="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
            <div class="absolute inset-0 rounded-full border-4 border-transparent border-b-purple-500 animate-spin-slow"></div>
          </div>
        </div>
      </transition>

      <!-- دکمه -->
      <button style="margin-top: 20px;"
        @click="fetchStockData"
        :disabled="loading || serviceUnavailable"
        class="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        🔄 دریافت دوباره اطلاعات
      </button>

      <!-- توضیح برای کارفرما -->
      <p style="margin-top: 10px; padding: 5;" class="text-xs text-gray-500 mt-3 opacity-0 animate-fade-in">
        💡 برای آزمایش حالت خطا و عملکرد مکانیزم جلوگیری از درخواست‌های متوالی، مسیر درخواست را
        در فایل مربوطه به یک آدرس اشتباه تغییر دهید و سپس چند بار دکمه بالا را بزنید.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useStockApi } from "@/composables/useStockApi";

const { data, error, loading, serviceUnavailable, fetchStockData } = useStockApi();

// این متغیر برای نگه داشتن لودینگ حتی بعد از دریافت داده است
const showLoading = ref(false);

watch(loading, (val) => {
  if (val) {
    showLoading.value = true;
  } else {
    // نگه داشتن لودینگ 500 میلی‌ثانیه بعد از پایان
    setTimeout(() => {
      showLoading.value = false;
    }, 500);
  }
});

fetchStockData();
</script>

<style scoped>
/* fade in برای پیام */
@keyframes fade-in {
  to {
    opacity: 1;
  }
}
.animate-fade-in {
  animation: fade-in 1.2s ease forwards;
  animation-delay: 0.5s;
}

/* اسپینر کند */
@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 2.5s linear infinite;
}

/* محو شدن لودینگ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
