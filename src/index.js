import './assets/index.css';
import { createAuth0 } from '@auth0/auth0-vue';
import authConfig from "../auth_config.json";
import router from './router';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(router).use(
  createAuth0({
    domain: import.meta.env.VITE_DOMAIN,
    clientId: import.meta.env.VITE_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  })
);
app.mount('#app');
