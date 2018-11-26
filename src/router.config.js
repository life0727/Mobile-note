import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/top/login.vue'
import Clever from './components/index/clever.vue'
import Clevercontent from './components/index/clever_content.vue'
import ClevercontentNext from './components/index/clever_content_next.vue'
import High from './components/index/high.vue'
import Highcontent from './components/index/high_content.vue'
import HighcontentNext from './components/index/high_content_next.vue'
import Index from './components/top/index.vue'
import All_net_analysis from './components/all_net_analysis'
import Custom from './components/top/custom.vue'
import error from './components/error.vue'
import Main from './components/top/main.vue'
import List from './components/top/main/list.vue'
import Keyword from './components/top/keyword.vue'
//import Position from './components/top/position.vue'
//import Indexnumber from './components/top/indexnumber.vue'
import Event from './components/top/main/event.vue'
import Org from './components/top/main/org.vue'
import Media from './components/top/main/media.vue'
import Compet from './components/top/main/compet.vue'
import Refer from './components/top/refer.vue'
import Topnav from './components/top_nav.vue'



Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes:[{
		path:'/login',
		component:Login,
		//component:resolve => require(['./components/login'],resolve)
	},{ path:'/',
		component:Topnav,
		meta:{keepAlive: false},
		children:[
			{   
				path:'/',
				component:Main,
				meta:{keepAlive: true},
				//component:resolve => require(['./components/main'],resolve),
				children:[
					{path:'/main/list',
					component:List,
					meta:{keepAlive: true}
					//component:resolve => require(['./components/main/list'],resolve),
					},
					{path:'/main/event',
					component:Event,
					meta:{keepAlive: true}
					//component:resolve => require(['./components/main/event'],resolve)
					},
					{path:'/main/org',
					component:Org,
					meta:{keepAlive: true}
					//component:resolve => require(['./components/main/org'],resolve)
					},
					{path:'/main/media',
					component:Media,
					meta:{keepAlive: true}
					//component:resolve => require(['./components/main/media'],resolve)
					},
					/*{path:'/main/position',
					component:Position
					//component:resolve => require(['./components/main/position'],resolve)
					},
					{path:'/main/indexnumber',
					component:Indexnumber
					//component:resolve => require(['./components/main/indexnumber'],resolve)
					},*/
					{path:'/main/compet',
					component:Compet,
					meta:{keepAlive: true}
					//component:resolve => require(['./components/main/compet'],resolve)
					},
					/*{path:'/main/refer',
					component:Refer
					//component:resolve => require(['./components/main/refer'],resolve)
					},*/
					{path:'/',
						redirect:'/login'
					}
				]
			},{
				path:'/Refer',
				component:Refer,
				meta:{keepAlive: true}
				//component:resolve => require(['./components/all_net_analysis'],resolve)
			},{
				path:'/keyword',
				component:Keyword,
				meta:{keepAlive: false}
				//component:resolve => require(['./components/main/keyword'],resolve)
			},{
				path:'/custom',
				component:Custom,
				meta:{keepAlive: true}
				//component:resolve => require(['./components/custom'],resolve)
			},{
				path:'/index',
				component:Index,
				meta:{keepAlive: true},
				//component:resolve => require(['./components/index'],resolve),
				children:[
					{path:'/index/clever',
					component:Clever,
					meta:{keepAlive: true},
					//component:resolve => require(['./components/index/clever'],resolve),
					children:[
						{path:'/index/clever/clever_content',
						component:Clevercontent,
						meta:{keepAlive: false}
						//component:resolve => require(['./components/index/clever_content'],resolve)
						},				
						{path:'/index/clever/clever_content_next',
						component:ClevercontentNext,
						meta:{keepAlive: false}
						//component:resolve => require(['./components/index/clever_content_next'],resolve)
						},
						{path:'/',
						redirect:'/index/clever/clever_content'
						}
					]
					},
					{path:'/index/high',
					component:High,
					//component:resolve => require(['./components/index/high'],resolve),
					children:[
						{path:'/index/high/high_content',
						component:Highcontent,
						//component:resolve => require(['./components/index/high_content'],resolve)
						},
						{path:'/index/high/high_content_next',
						component:HighcontentNext
						//component:resolve => require(['./components/index/high_content_next'],resolve)
						},
						{path:'/',
						redirect:'/index/high/high_content'
						}								
					]
					},
					{path: '/',
					redirect: '/index/clever'
					 }
				]
			},{
				path:'/',
				redirect:'/Refer'
					}

		]		
	}]
})