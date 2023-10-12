<template>
  <div class="flex flex-col">
    <div class="flex">
      <div data-component="number-changer"></div>
      <div data-component="number-changer"></div>
    </div>
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
import { importComponents, runComponents } from '../../vanilla_app/js/componentLoader.js';
//import { importComponents, runComponents } from '../../../../componentLoader.js'
import { onMounted } from 'vue';
const getAllComponents = () => {
  const components = document.querySelectorAll('[data-component]');
  return Array.from(components);
};
onMounted(async () => {
  const components = getAllComponents();
  await importComponents(components);
  runComponents(components);
});
</script>
