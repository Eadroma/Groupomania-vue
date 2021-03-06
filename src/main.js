import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store/index.js'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
