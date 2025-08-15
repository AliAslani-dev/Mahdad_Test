import { ref } from "vue";
import axios from "axios";

export function useStockApi() {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const serviceUnavailable = ref(false);

  const MAX_FAIL = 3;
  const BLOCK_TIME = 60 * 1000; // 1 دقیقه

  let failCount = parseInt(localStorage.getItem("failCount") || "0");
  let circuitOpen = localStorage.getItem("circuitOpen") === "true";
  let retryUntil = parseInt(localStorage.getItem("retryUntil") || "0");

  const fetchStockData = async () => {
    const now = Date.now();

    // اگر زمان بلاک تمام شده، ریست کن
    if (circuitOpen && now >= retryUntil) {
      circuitOpen = false;
      failCount = 0;
      serviceUnavailable.value = false;
      localStorage.setItem("circuitOpen", "false");
      localStorage.setItem("failCount", "0");
      localStorage.removeItem("retryUntil");
    }

    // اگر هنوز بلاکه، برگرد
    if (circuitOpen) {
      serviceUnavailable.value = true;
      console.log("circuit is open! request blocked");
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );

      data.value = response?.data;

      // موفقیت → ریست همه مقادیر
      failCount = 0;
      circuitOpen = false;
      serviceUnavailable.value = false;
      localStorage.setItem("failCount", "0");
      localStorage.setItem("circuitOpen", "false");
      localStorage.removeItem("retryUntil");
    } catch (err) {
      failCount++;
      error.value = err;
      localStorage.setItem("failCount", failCount.toString());

      if (failCount >= MAX_FAIL) {
        circuitOpen = true;
        serviceUnavailable.value = true;

        retryUntil = now + BLOCK_TIME;
        localStorage.setItem("circuitOpen", "true");
        localStorage.setItem("retryUntil", retryUntil.toString());

        console.log(`circuit is open! blocked until ${new Date(retryUntil)}`);
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    serviceUnavailable,
    fetchStockData,
  };
}
