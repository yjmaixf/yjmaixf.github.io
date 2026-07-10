import DefaultTheme from "vitepress/theme";
import ControllerRecipesScenario from "./components/ControllerRecipesScenario.vue";
import EffectScenario from "./components/EffectScenario.vue";
import InteractiveScenario from "./components/InteractiveScenario.vue";
import LiveScenario from "./components/LiveScenario.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ControllerRecipesScenario", ControllerRecipesScenario);
    app.component("EffectScenario", EffectScenario);
    app.component("InteractiveScenario", InteractiveScenario);
    app.component("LiveScenario", LiveScenario);
  }
};
