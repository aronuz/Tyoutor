import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowCircleUp,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import router from "./router/index.js";
import store from "./store/index.js";
import layout from "./pages/PageLayout.vue";
import ui_card from "./components/ui_blocks/Card.vue";
import ui_button from "./components/ui_blocks/Button.vue";
import ui_spinner from "./components/ui_blocks/Spinner.vue";
const ui_badge = defineAsyncComponent(() =>
  import("./components/ui_blocks/Badge.vue")
);
const ui_dialog = defineAsyncComponent(() =>
  import("./components/ui_blocks/Dialog.vue")
);
const area_list = defineAsyncComponent(() =>
  import("./components/areas/AreaList")
);

const emitter = mitt();

const app = createApp(App);

library.add(
  faArrowCircleUp,
  faArrowCircleDown,
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram
);

app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.emitter = emitter;

app.use(router);
app.use(store);

app.component("layout", layout);
app.component("ui-card", ui_card);
app.component("ui-button", ui_button);
app.component("ui-badge", ui_badge);
app.component("ui-dialog", ui_dialog);
app.component("ui-spinner", ui_spinner);

app.component("areaList", area_list);

app.mount("#app");
