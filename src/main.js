import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import Toasted from 'vue-toasted';


Vue.config.productionTip = false;

Vue.use(Toasted)

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
