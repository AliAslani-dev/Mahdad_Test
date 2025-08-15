// stores/cartStore.js
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // cart هر مشتری جداگانه نگه داشته میشه
  const carts = ref({})

  function getCart(customerId) {
    if (!carts.value[customerId]) carts.value[customerId] = []
    return carts.value[customerId]
  }

  function addToCart(customerId, product) {
    getCart(customerId).push(product)
  }

  function removeFromCart(customerId, productId) {
    carts.value[customerId] = getCart(customerId).filter(p => p.id !== productId)
  }

  function clearCart(customerId) {
    carts.value[customerId] = []
  }

  // ذخیره در localStorage برای هر مشتری
  watch(carts, (newVal) => {
    localStorage.setItem('carts', JSON.stringify(newVal))
  }, { deep: true })

  // load از localStorage
  const saved = localStorage.getItem('carts')
  if (saved) carts.value = JSON.parse(saved)

  return { carts, getCart, addToCart, removeFromCart, clearCart }
})
