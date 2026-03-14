import App from '@/App.vue';
import '@/assets/styles.scss';
import { router } from '@/libraries/router.ts';
import Vuetify from '@/libraries/vuetify.ts';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
app.use(Vuetify);
app.mount('#app');
