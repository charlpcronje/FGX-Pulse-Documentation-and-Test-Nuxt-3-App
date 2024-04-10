// stores/loading.js
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    loadingCount: 0,
    currentOperationName: '',
    totalFiles: 0,
    loadedFiles: 0,
  }),
  getters: {
    isLoading: (state) => state.loadingCount > 0,
    progress: (state) => (state.totalFiles > 0 ? (state.loadedFiles / state.totalFiles) * 100 : 0),
  },
  actions: {
    startLoading(operationName, totalFiles) {
      this.loadingCount++;
      this.currentOperationName = operationName;
      this.totalFiles = totalFiles;
      this.loadedFiles = 0;
    },
    updateProgress(loadedFiles) {
      this.loadedFiles = loadedFiles;
    },
    stopLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--;
      }
      if (this.loadingCount === 0) {
        this.currentOperationName = '';
        this.totalFiles = 0;
        this.loadedFiles = 0;
      }
    },
  },
});