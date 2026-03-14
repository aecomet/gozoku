import '@fortawesome/fontawesome-free/css/all.css'; // Ensure your project is capable of handling css files
import 'vuetify/styles'; // Global CSS has to be imported

import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';

const options = {
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  }
};

export default createVuetify(options);
