// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import router from './router.config.js'
import Promise from 'promise-polyfill'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)
// To add to window  
if (!window.Promise) {  
  window.Promise = Promise;  
}

const vuex_store=new Vuex.Store({
	state:{
		data:'',
		start_data:'',
		ajax_data:[],
		threeList:{}
	},
	mutations:{
        showUser(state){
          
        }
    }
})

var vm=new Vue({
  el: '#app',
  router,
  store:vuex_store,
  ...App
})
