import App from '@/App.vue';
import '@/assets/styles.scss';
import { router } from '@/libraries/router.ts';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
app.mount('#app');
