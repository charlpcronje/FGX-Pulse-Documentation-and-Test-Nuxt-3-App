<!-- components/EndpointList.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div v-for="endpoint in endpoints" :key="endpoint.name" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">{{ endpoint.name }}</h2>
      <p class="text-gray-600 dark:text-gray-400">{{ endpoint.description }}</p>
      <button @click="openModal(endpoint)" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Try It Out
      </button>
    </div>
  </div>

  <div v-if="selectedEndpoint" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full md:w-1/2 lg:w-1/3 relative">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ selectedEndpoint.name }}</h2>
      <form @submit.prevent="makeRequest">
        <div v-for="param in selectedEndpoint.requestBody" :key="param.name" class="mb-4">
          <label :for="param.name" class="block mb-1 text-gray-700 dark:text-gray-400">{{ param.name }}</label>
          <input
            :id="param.name"
            v-model="requestData[param.name]"
            :type="param.type"
            :placeholder="param.default"
            class="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-1">{{ param.description }}</p>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
        <button
          @click="closeModal"
          class="ml-4 px-4 py-2 bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-400 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </form>
      <div v-if="response || error" class="mt-8">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {{ error ? 'Error' : 'Response' }}
        </h3>
        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-white max-h-300 overflow-auto">
          {{ error || JSON.stringify(response, null, 2) }}
        </pre>
      </div>
      <div v-if="previousResponse" class="mt-8">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white">Previous Response</h3>
        <pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded text-gray-900 dark:text-white max-h-300 overflow-auto">
          {{ JSON.stringify(previousResponse, null, 2) }}
        </pre>
      </div>
    </div>
  </div>

  <LoadingOverlay :loading="loading" :progress="progress" :loading-text="loadingText" />
</template>

<script setup>
import { ref } from 'vue';
import LoadingOverlay from '~/components/LoadingOverlay.vue';

const loading = ref(false);
const progress = ref(0);
const loadingText = ref('');
const apiUrl = useRuntimeConfig().public.apiUrl;

const endpoints = ref([]);
const selectedEndpoint = ref(null);
const requestData = ref({});
const response = ref(null);
const error = ref(null);
const previousResponse = ref(null);

async function fetchEndpoints() {
  loading.value = true;
  loadingText.value = 'Fetching endpoints...';

  try {
    const response = await fetch('/endpoints.json');
    const data = await response.json();
    endpoints.value = data.endpoints;
  } catch (error) {
    console.error('Failed to fetch endpoints:', error);
  } finally {
    loading.value = false;
  }
}

function openModal(endpoint) {
  selectedEndpoint.value = endpoint;

  // Retrieve saved form input values from local storage
  const savedInputs = localStorage.getItem(`endpoint-${endpoint.id}`);
  if (savedInputs) {
    requestData.value = JSON.parse(savedInputs);
  } else {
    requestData.value = {};
  }

  // Retrieve previous API response from local storage
  const savedResponse = localStorage.getItem(`endpoint-${endpoint.id}-response`);
  if (savedResponse) {
    previousResponse.value = JSON.parse(savedResponse);
  } else {
    previousResponse.value = null;
  }
}

function closeModal() {
  selectedEndpoint.value = null;
  response.value = null;
  error.value = null;
}

async function makeRequest() {
  const endpoint = selectedEndpoint.value;

  try {
    const { data } = await $fetch(endpoint.endpoint, {
      method: 'POST',
      body: requestData.value,
      baseURL: apiUrl,
    });
    response.value = data;
    error.value = null;

    // Save form input values to local storage
    localStorage.setItem(`endpoint-${endpoint.id}`, JSON.stringify(requestData.value));

    // Save API response to local storage
    localStorage.setItem(`endpoint-${endpoint.id}-response`, JSON.stringify(data));
  } catch (err) {
    error.value = err.data || 'An error occurred';
    response.value = null;
  }
}

fetchEndpoints();
</script>

<style scoped>
.max-h-300 {
  max-height: 300px;
}
</style>