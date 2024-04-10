<!-- components/LoadingOverlay.vue -->
<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="text-center p-5 bg-white rounded-lg shadow">
      <p class="mb-2">{{ currentOperationName || 'Loading...' }}</p>
      <progress class="progress w-56" :value="progress" max="100"></progress>
      <p class="text-sm mt-2">Please wait, loading {{ progress.toFixed(0) }}%</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLoadingStore } from '~/stores/loading';

const loadingStore = useLoadingStore();

// Computed properties to reflect the current loading state
const isLoading = computed(() => loadingStore.isLoading);
const currentOperationName = computed(() => loadingStore.currentOperationName);
const progress = computed(() => loadingStore.progress);
</script>