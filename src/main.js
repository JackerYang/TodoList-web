import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import viewDesign from "./assets/js/view-design";

Vue.config.productionTip = false;
Vue.use(viewDesign);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
