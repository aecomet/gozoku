<template>
  <div class="page-footer">{{ t('footer.brand') }}</div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.page-footer {
  text-align: center;
  padding: 8px;
}
</style>
