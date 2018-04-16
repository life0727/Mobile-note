import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login_2.0.vue'
import Clever from './components/index/clever_2.0.vue'
import Main from './components/main_2.0.vue'
import Org from './components/main/systemA.vue'
import Media from './components/main/systemB.vue'



Vue.use(VueRouter);

export default new VueRouter({
	mode: 'hash',
	routes:[{
		path:'/',
		component:Login
	},/*{
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
	},*/{
		path:'/',
		component:Main,
		children:[
			/*{path:'/main/list',
			component:List,
			},
			{path:'/main/keyword',
			component:Keyword
			},
			{path:'/main/event',
			component:Event
			},*/
			{path:'/main/systemA',
			component:Org
			},
			{path:'/main/systemB',
			component:Media
			},
			/*{path:'/main/position',
			component:Position
			},
			{path:'/main/indexnumber',
			component:Indexnumber
			},*/
			{path:'/',
				redirect:'/main/systemA'
			}
		]
	}/*,{
		path:'/all_net_analysis',
		component:All_net_analysis
	}*/]
})
