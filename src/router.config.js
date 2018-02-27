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
	mode: 'hash',
	routes:[{
		path:'/login',
		component:Login
	},{
		path:'/index',
		component:Index,
		children:[
			{path:'/index/clever',
			component:Clever,
			children:[
				{path:'/index/clever/clever_content',
				component:Clevercontent
				},				
				{path:'/index/clever/clever_content_next',
				component:ClevercontentNext
				},
				{path:'/',
				redirect:'/index/clever/clever_content'
				}
			]
			},
			{path:'/index/high',
			component:High,
			children:[
				{path:'/index/high/high_content',
				component:Highcontent
				},
				{path:'/index/high/high_content_next',
				component:HighcontentNext
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
		children:[
			{path:'/main/list',
			component:List,
			},
			{path:'/main/keyword',
			component:Keyword
			},
			{path:'/main/event',
			component:Event
			},
			{path:'/main/org',
			component:Org
			},
			{path:'/main/media',
			component:Media
			},
			{path:'/main/position',
			component:Position
			},
			{path:'/main/indexnumber',
			component:Indexnumber
			},
			{path:'/main/compet',
			component:Compet
			},
			{path:'/main/refer',
			component:Refer
			},
			{path:'/',
				redirect:'/main/list'
			}
		]		
	},{
		path:'/all_net_analysis',
		component:All_net_analysis
	},{
		path:'/custom',
		component:Custom
	}]
})