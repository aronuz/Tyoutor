import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import router from "./router/index.js";
import store from "./store/index.js";
import ui_card from "./components/ui_blocks/Card.vue";
import ui_button from "./components/ui_blocks/Button.vue";
import ui_badge from "./components/ui_blocks/Badge.vue";
import ui_dialog from "./components/ui_blocks/Dialog.vue";
import ui_spinner from "./components/ui_blocks/Spinner.vue";

const emitter = mitt();

const app = createApp(App);

library.add(faFacebook, faTwitter, faLinkedin, faInstagram);

app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(store);

app.component("ui-card", ui_card);
app.component("ui-button", ui_button);
app.component("ui-badge", ui_badge);
app.component("ui-dialog", ui_dialog);
app.component("ui-spinner", ui_spinner);

app.mount("#app");
