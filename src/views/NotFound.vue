<template>
  <div id="page-not-found" class="page active">
    <PageHeader
      num="--"
      :en="t('notFound.header.en')"
      :ja="t('notFound.header.ja')"
      :sub="t('notFound.header.sub')"
      :sub-en="t('notFound.header.subEn')"
    />
  </div>
  <BackgroundElements />
</template>

<script setup lang="ts">
import BackgroundElements from '@/components/BackgroundElements.vue';
import PageHeader from '@/components/PageHeader.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
/* ページ全体 */
#page-not-found {
  padding: 100px 80px;
  height: 100vh;
}
</style>
