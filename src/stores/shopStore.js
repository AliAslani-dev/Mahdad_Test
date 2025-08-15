// stores/shopStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useShopStore = defineStore('shop', () => {
  const customers = ref([
    { id: 1, name: "Ahmad", city: "Tehran" },
    { id: 2, name: "Mehran", city: "Shiraz" },
    { id: 3, name: "Ali", city: "Esfahan" },
  ])

  const products = ref([
    { id: 101, name: "Laptop", category: "Electronics" },
    { id: 102, name: "Mouse", category: "Electronics" },
    { id: 103, name: "Monitor", category: "Electronics" },
    { id: 104, name: "Coffee Maker", category: "Home Appliances" },
    { id: 105, name: "Blender", category: "Home Appliances" },
    { id: 106, name: "Headphones", category: "Electronics" },
  ])

  const purchases = ref([
    { customerId: 1, productId: 101 },
    { customerId: 1, productId: 102 },
    { customerId: 2, productId: 103 },
    { customerId: 2, productId: 104 },
    { customerId: 3, productId: 105 },
    { customerId: 3, productId: 106 },
    { customerId: 1, productId: 104 },
  ])

  const cartStore = useCartStore()

  function getProductsByCustomer(customerId) {
    const purchasedIds = purchases.value
      .filter(p => p.customerId === customerId)
      .map(p => p.productId)
    return products.value.filter(p => purchasedIds.includes(p.id))
  }

  function mostPurchasedCategory(customerId) {
    const customerProducts = getProductsByCustomer(customerId)
    const count = {}
    customerProducts.forEach(p => count[p.category] = (count[p.category] || 0) + 1)
    let maxCat = null, maxCount = 0
    for (const cat in count) {
      if (count[cat] > maxCount) { maxCount = count[cat]; maxCat = cat }
    }
    return maxCat
  }

  // --- پیشنهاد محصول بر اساس سبد خرید لحظه‌ای ---
  function recommendBasedOnCart(customerId) {
    const cartItems = cartStore.getCart(customerId)
    if (!cartItems.length) return []

    const cartCategories = [...new Set(cartItems.map(p => p.category))]

    const recommendedIds = new Set()

    customers.value.forEach(c => {
      if (c.id === customerId) return
      getProductsByCustomer(c.id).forEach(p => {
        if (cartCategories.includes(p.category)) recommendedIds.add(p.id)
      })
    })

    const cartProductIds = cartItems.map(p => p.id)
    return products.value.filter(p => recommendedIds.has(p.id) && !cartProductIds.includes(p.id))
  }

  return { customers, products, purchases, cartStore, getProductsByCustomer, mostPurchasedCategory, recommendBasedOnCart }
})
