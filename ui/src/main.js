import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store";
import ui_card from './components/ui_blocs/Card.vue';
import ui_button from './components/ui_blocs/Button.vue';
import ui_badge from './components/ui_blocs/Badge.vue';

const app = createApp(App)
app.use(store).use(router)

app.component('ui-card', ui_card);
app.component('ui-button', ui_button);
app.component('ui-badge', ui_badge);

app.mount("#app");