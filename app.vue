<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-800 shadow">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pulse API Documentation</h1>
        <div class="flex space-x-4">
          <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            Documentation
          </NuxtLink>
          <NuxtLink to="/test-endpoints"
            class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white">
            Test Endpoints
          </NuxtLink>
        </div>
      </nav>
    </header>
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
/* Importing main.css directly */
@import '~/assets/css/main.css';
</style>

<script setup>
import { useLoadingStore } from '~/stores/loading';
const loadingStore = useLoadingStore();
const router = useRouter();
const colorMode = useColorMode();

onBeforeMount(() => {
  if (process.client) {
    const sessionToken = localStorage.getItem('sessionToken');
    if (!sessionToken) {
      router.push('/login');
    }
  }
});

onBeforeMount(() => {
  loadingStore.startLoading('Loading page...', 1);
});

onMounted(() => {
  loadingStore.stopLoading();
});

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>