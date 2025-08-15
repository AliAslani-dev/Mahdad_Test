<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-extrabold mb-8 text-gray-900">Products</h1>

    <!-- انتخاب مشتری -->
    <div class="mb-8 flex items-center gap-4">
      <label class="font-medium text-gray-700">Customer:</label>
      <select
        v-model="selectedCustomerId"
        class="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option v-for="c in shop.customers" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <!-- محصولات -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="p in shop.products"
        :key="p.id"
        class="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
      >
        <img
          :src="p.image"
          alt="Product Image"
          class="w-full h-40 object-contain mb-4 rounded-md"
        />
        <div>
          <h2 class="font-semibold text-lg text-gray-800 mb-2">{{ p.name }}</h2>
          <p class="text-gray-500 mb-4">{{ p.category }}</p>
        </div>
        <button
          @click="addToCartHandler(p)"
          class="mt-auto w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- کارت -->
    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Cart</h2>
      <div v-if="cart.length" class="border border-gray-200 rounded-lg p-5 shadow-sm bg-gray-50">
        <ul class="divide-y divide-gray-200">
          <li v-for="item in cart" :key="item.id" class="flex justify-between py-3 items-center">
            <span class="text-gray-700">{{ item.name }}</span>
            <button
              @click="removeFromCartHandler(item.id)"
              class="text-red-500 hover:text-red-600 font-medium transition"
            >
              Remove
            </button>
          </li>
        </ul>
        <button
          @click="clearCartHandler"
          class="mt-5 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Clear Cart
        </button>
      </div>
      <p v-else class="text-gray-500">Your cart is empty.</p>
    </section>

    <!-- محصولات پیشنهادی -->
    <section class="mt-12">
      <h2 class="font-semibold text-xl mb-4 text-gray-800">
        Recommended for {{ currentCustomer?.name }}
      </h2>
      <div v-if="recommended.length" class="flex gap-3 flex-wrap">
        <span
          v-for="p in recommended"
          :key="p.id"
          class="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
        >
          {{ p.name }}
        </span>
      </div>
      <p v-else class="text-gray-500">No recommendations yet.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useShopStore } from "../../stores/shopStore";
import { useCartStore } from "../../stores/cartStore";
import laptopImg from "../../assets/products/laptop.jpg";
import mouse from "../../assets/products/mouse.jpg";
import monitor from "../../assets/products/monitor.jpg";
import blender from "../../assets/products/blender.jpg";
import CoffeeMaker from "../../assets/products/CoffeeMaker.jpg";
import headPhones from "../../assets/products/headPhones.jpg";

const shop = useShopStore();
const cartStore = useCartStore();
const selectedCustomerId = ref(shop.customers[0]?.id || null);

const currentCustomer = computed(() =>
  shop.customers.find((c) => c.id === selectedCustomerId.value)
);
const cart = computed(() => cartStore.getCart(selectedCustomerId.value));
const recommended = computed(() => shop.recommendBasedOnCart(selectedCustomerId.value));

function addToCartHandler(product) {
  cartStore.addToCart(selectedCustomerId.value, product);
}
function removeFromCartHandler(productId) {
  cartStore.removeFromCart(selectedCustomerId.value, productId);
}
function clearCartHandler() {
  cartStore.clearCart(selectedCustomerId.value);
}

watch(selectedCustomerId, () => {}, { immediate: true });

// Assign correct image links to products
shop.products = shop.products.map((p) => {
  switch (p.name) {
    case "Laptop":
      p.image = laptopImg;
      break;
    case "Mouse":
      p.image = mouse;
      break;
    case "Monitor":
      p.image = monitor;
      break;
    case "Coffee Maker":
      p.image = CoffeeMaker;
      break;
    case "Blender":
      p.image = blender;
      break;
    case "Headphones":
      p.image = headPhones;
      break;
    default:
      p.image = laptopImg;
  }
  return p;
});
</script>
