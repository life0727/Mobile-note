// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
//import './assets/css/bootstrap.min.css'
//import './assets/js/bootstrap.js'

Vue.use(VueRouter);

const router = new VueRouter({
	mode:'hash',
	routes:[{
		path:'/',
		component:require('./components/Hello.vue')
	},{
		path:'/add',
		component:require('./components/add.vue')
	},{
		path:'/list',
		component:require('./components/list.vue')
	},{
		path:'/detail',
		component:require('./components/detail.vue')		
	},{
		path:'/write',
		component:require('./components/write.vue')		
	}]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(require('./App.vue'))
})
