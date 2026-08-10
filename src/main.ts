import App from '@/App.vue';
import '@/assets/styles.scss';
import { router } from '@/libraries/router.ts';
import { i18n } from '@/plugins/i18n.ts';
import { createApp } from 'vue';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.mount('#app');
