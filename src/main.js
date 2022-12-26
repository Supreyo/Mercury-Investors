// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import VueCookies from "vue-cookies"
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.use(VueCookies)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  vuetify,
  router,
  components: { App },
  template: "<App/>"
})