import './assets/index.css';
import { createAuth0 } from '@auth0/auth0-vue';
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
const auth = createAuth0({
  domain: import.meta.env.VITE_DOMAIN,
  clientId: import.meta.env.VITE_CLIENT_ID,
  authorizationParams: {
    redirect_uri: `${import.meta.env.VITE_BASE_URL}/callback`,
  }
});
app.use(router).use(auth);
app.mount('#app');
