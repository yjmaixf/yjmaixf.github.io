import DefaultTheme from "vitepress/theme";
import InteractiveScenario from "./components/InteractiveScenario.vue";
import LiveScenario from "./components/LiveScenario.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("InteractiveScenario", InteractiveScenario);
    app.component("LiveScenario", LiveScenario);
  }
};
