// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
Vue.use(MintUI)
import Mui from 'vue-awesome-mui';
Vue.use(Mui);
import 'swiper/dist/css/swiper.css';
import axios from 'axios'
axios.defaults.timeout = 30000;
// 将 axios 改写为 Vue 的原型属性
Vue.prototype.$axios = axios
console.log(Vue.prototype)
//引入全局接口配置
import domain from '../src/utils/domain.js';
global.domain = domain;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
