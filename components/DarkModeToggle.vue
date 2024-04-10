<template>
    <button @click="toggleColorMode" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      {{ $colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </template>
  
  <script setup>
  const colorMode = useColorMode();
  
  function toggleColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
  </script>