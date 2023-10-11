<template>
  <div class="flex flex-col">
    <div class="flex">
      <nav class="flex flex-col">
        <a data-nav href="/" class="button secondary squarify">
          <span class="icon">&#x1F3E0;</span>
          <!-- Unicode for a house, similar to a home icon -->
          <span class="text">Home</span>
        </a>
        <a data-nav href="/button" class="button secondary squarify">
          <span class="icon">&#x1F518;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Button</span>
        </a>
        <a data-nav href="/form" class="button secondary squarify">
          <span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Form</span>
        </a>
        <a data-nav href="/maps" class="button secondary squarify">
          <span class="icon">&#x1F5FA;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Maps</span>
        </a>

        <a data-nav href="/users" class="button secondary squarify">
          <span class="icon">👥</span>
          <span class="text">DB users</span>
        </a>
        <a data-nav href="/time-tracker" class="button secondary squarify">
          <span class="icon"> 📆 </span>
          <span class="text"> Time Tracker </span>
        </a>
      </nav>
      <main data-component="router" class="p-md" use-hash>
        <!--components in /pages that will be fetched by router when user clicks on a data-nav -->
      </main>
    </div>
    <footer class="flex flex-col align-center gap-md">
      <span>Copyright Nikos Katsikanis LTD</span>
      <div data-component="theme-switcher"></div>
    </footer>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script setup>
import { importComponents, runComponents } from '../../componentLoader.js'
//import { importComponents, runComponents } from '../../../../componentLoader.js'
import { onMounted } from 'vue'
// Wrap the top-level async operation in an immediately-invoked function expression
const getAllComponents = () => {
  const components = document.querySelectorAll('[data-component]')
  return Array.from(components)
}
onMounted(async () => {
  const components = getAllComponents()
  await importComponents(components)
  runComponents(components)
})
</script>
