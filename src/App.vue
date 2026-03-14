<template>
  <BackgroundElements />
  <Toolbar />
  <router-view> </router-view>
  <PageFooter />
</template>

<script setup lang="ts">
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageFooter from '@/components/PageFooter.vue';
import Toolbar from '@/components/Toolbar.vue';
</script>
