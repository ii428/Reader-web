import Vue from 'vue';
import App from './App.vue';
import router from './router';

// style
import './assets/style/global.css';
import './assets/style/icon.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');

