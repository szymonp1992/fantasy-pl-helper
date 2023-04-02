import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Importing Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

// Importing store
import store from "./store/index.js";

const app = createApp(App);

app.use(router);
app.use(bootstrap);
app.use(store);

app.mount("#app");
