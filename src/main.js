// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router.config.js'
import axios from 'axios'


Vue.use(ElementUI)
Vue.use(axios)

var vm=new Vue({
  el: '#app',
  router,
  ...App
})
