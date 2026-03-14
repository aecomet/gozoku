<template>
  <div id="page-not-found" class="page active">
    <PageHeader num="--" en="Not found" ja="存在しないページ" sub="このページは存在しません" />
  </div>
  <BackgroundElements />
</template>

<script setup lang="ts">
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageHeader from '@/components/PageHeader.vue';
</script>

<style scoped>
/* ページ全体 */
#page-not-found {
  padding: 100px 80px;
  height: 100vh;
}
</style>
