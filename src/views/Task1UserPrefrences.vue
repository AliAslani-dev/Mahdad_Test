<template>
  <div :class="theme" :style="{ fontSize: fontSizes }" class="app-container">
    <h2>Settings</h2>

    <div class="section">
      <p><strong>Theme:</strong></p>
      <button @click="setTheme('light')" :class="{ active: theme === 'light' }">Light</button>
      <button @click="setTheme('dark')" :class="{ active: theme === 'dark' }">Dark</button>
    </div>

    <div class="section">
      <p><strong>Font Size:</strong></p>
      <button @click="setFontsize('small')" :class="{ active: fontSize === 'small' }">Small</button>
      <button @click="setFontsize('medium')" :class="{ active: fontSize === 'medium' }">
        Medium
      </button>
      <button @click="setFontsize('large')" :class="{ active: fontSize === 'large' }">Large</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";

const theme = ref("light");
const fontSize = ref("medium");

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const savedFont = localStorage.getItem("fontSize");

  if (savedTheme) theme.value = savedTheme;
  if (savedFont) fontSize.value = savedFont;
});

watch(theme, (newVal) => localStorage.setItem("theme", newVal));
watch(fontSize, (newVal) => localStorage.setItem("fontSize", newVal));

function setTheme(value) {
  theme.value = value;
}
function setFontsize(size) {
  fontSize.value = size;
}

const fontSizes = computed(() => {
  switch (fontSize.value) {
    case "small":
      return "16px";
    case "medium":
      return "25px";
    case "large":
      return "35px";
    default:
      return "18px";
  }
});
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: background-color 0.3s, color 0.3s;
  gap: 2rem;
}

.section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

button {
  padding: 0.5rem 1rem;
  border: 2px solid #888;
  border-radius: 8px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background-color: #888;
  color: #fff;
}

button.active {
  background-color: #555;
  color: #fff;
  border-color: #555;
}

/* Themes */
.light {
  background-color: #f7f7f7;
  color: #111;
}

.dark {
  background-color: #111;
  color: #f7f7f7;
}
</style>
