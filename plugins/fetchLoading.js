// plugins/fetchLoading.js
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:created', () => {
      const loadingStore = useLoadingStore();
  
      nuxtApp.hook('useFetch:before', (request) => {
        loadingStore.startLoading(request.url, 1);
      });
  
      nuxtApp.hook('useFetch:finish', () => {
        loadingStore.stopLoading();
      });
  
      nuxtApp.hook('useFetch:error', () => {
        loadingStore.stopLoading();
      });
    });
  });