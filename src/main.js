import { createApp } from "vue";
import "openlayers2dsceneeditor/style.css";
import "./styles.css";
import App from "./App.vue";
import { installCanvasReadbackHint } from "./utils/canvasReadback";

installCanvasReadbackHint();
createApp(App).mount("#app");
