import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login.vue'
import Clever from './components/index/clever.vue'
import Clevercontent from './components/index/clever_content.vue'
import ClevercontentNext from './components/index/clever_content_next.vue'
import High from './components/index/high.vue'
import Highcontent from './components/index/high_content.vue'
import HighcontentNext from './components/index/high_content_next.vue'
import Index from './components/index.vue'
import All_net_analysis from './components/all_net_analysis'
import Custom from './components/custom.vue'
import error from './components/error.vue'
import Main from './components/main.vue'
import List from './components/main/list.vue'
import Keyword from './components/main/keyword.vue'
import Position from './components/main/position.vue'
import Indexnumber from './components/main/indexnumber.vue'
import Event from './components/main/event.vue'
import Org from './components/main/org.vue'
import Media from './components/main/media.vue'
import Compet from './components/main/compet.vue'
import Refer from './components/main/refer.vue'



Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes:[{
		path:'/login',
		component:Login,
		//component:resolve => require(['./components/login'],resolve)
	},{
		path:'/index',
		component:Index,
		//component:resolve => require(['./components/index'],resolve),
		children:[
			{path:'/index/clever',
			component:Clever,
			//component:resolve => require(['./components/index/clever'],resolve),
			children:[
				{path:'/index/clever/clever_content',
				component:Clevercontent
				//component:resolve => require(['./components/index/clever_content'],resolve)
				},				
				{path:'/index/clever/clever_content_next',
				component:ClevercontentNext
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
		component:Main,
		//component:resolve => require(['./components/main'],resolve),
		children:[
			{path:'/main/list',
			component:List,
			//component:resolve => require(['./components/main/list'],resolve),
			},
			{path:'/main/keyword',
			component:Keyword
			//component:resolve => require(['./components/main/keyword'],resolve)
			},
			{path:'/main/event',
			component:Event
			//component:resolve => require(['./components/main/event'],resolve)
			},
			{path:'/main/org',
			component:Org
			//component:resolve => require(['./components/main/org'],resolve)
			},
			{path:'/main/media',
			component:Media
			//component:resolve => require(['./components/main/media'],resolve)
			},
			{path:'/main/position',
			component:Position
			//component:resolve => require(['./components/main/position'],resolve)
			},
			{path:'/main/indexnumber',
			component:Indexnumber
			//component:resolve => require(['./components/main/indexnumber'],resolve)
			},
			{path:'/main/compet',
			component:Compet
			//component:resolve => require(['./components/main/compet'],resolve)
			},
			{path:'/main/refer',
			component:Refer
			//component:resolve => require(['./components/main/refer'],resolve)
			},
			{path:'/',
				redirect:'/main/refer'
			}
		]		
	},{
		path:'/all_net_analysis',
		component:All_net_analysis
		//component:resolve => require(['./components/all_net_analysis'],resolve)
	},{
		path:'/custom',
		component:Custom
		//component:resolve => require(['./components/custom'],resolve)
	}]
})