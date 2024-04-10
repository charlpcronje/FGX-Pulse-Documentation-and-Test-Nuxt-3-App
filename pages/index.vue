<!-- pages/index.vue -->
<template>
    <div class="prose dark:prose-invert">
        <ContentRendererMarkdown :value="doc" />
    </div>
</template>

<script setup>
const { data: doc } = await useAsyncData('index', () => queryContent('/').findOne());
</script>