<template>
  <div class="flex flex-col">
    <div class="flex">
      <nav class="flex flex-col">
        <a data-nav href="/time-tracker" class="button secondary squarify">
          <span class="icon"> 📆 </span>
          <span class="text"> Time Tracker </span>
        </a>
        <a data-nav href="/multiple-instances" class="button secondary squarify">
          <span class="icon">🧬</span>
          <span class="text">Multiple instances</span>
        </a>
      </nav>
      <main data-component="router" class="p-md" data-use-hash>
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
import { importComponents, runComponents } from '../../vanilla_app/js/componentLoader.js'
//import { importComponents, runComponents } from '../../../../componentLoader.js'
import { onMounted } from 'vue'
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
