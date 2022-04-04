import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import axios from "axios";
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
