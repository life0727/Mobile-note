<template>  
<div class="login " style="padding: 0;background-color:#fbf6ea " >
<!-- 登录主体strat -->
	<div class="login_main">
		<img src="../../assets/icon/login.png" style="position: absolute;">
		<div style="width: 490px;height: 490px;background-color: #f5f5f5;position: absolute;right: 0px;" class="main_left">
			<div style="width: 470px;height: 470px;background-color: white;border-radius: 5px;margin: 10px 10px;">
				<p style="text-align: center;font-weight: 600;padding-top: 35px;font-size: 30px;">锐思声誉管理系统</p>
				<div style="margin-top: 80px;margin-left: 85px;border-bottom:1px solid #ddd;width: 300px;height: 28px;position: relative;">
					<img src="../../assets/icon/login_user.png">
					<el-input style="width: 260px;position: absolute;left: 20px;" v-model="username" placeholder="请输入您的账户名"></el-input>
				</div>
				<div style="margin-top: 42px;margin-left: 85px;border-bottom:1px solid #ddd;width: 300px;height: 28px;position: relative;">
					<img src="../../assets/icon/login_password.png">
					<el-input style="width: 260px;position:absolute;left: 20px;" type="password" v-model="password" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
				</div>
				<div style="margin-top: 50px;margin-left: 85px;width: 300px;height: 80px;position: relative;">
					<el-button type="success" style="width: 100%;padding: 8px 15px;font-size: 16px;background-color:#00b38a;border-color:#00b38a;border-radius: 15px;" @click="login">登录</el-button>
					<a href="javascript:;" style="position: absolute;right:10px;top:50px;color: gray;" @click="username = '';password = '';">重置</a>
				</div>
			</div>
		</div>
	</div>
	<div style="position: absolute;left: 0;right: 0;bottom: 50px;margin: auto;width: 1200px;height: 50px;">
		<p style="text-align: center;font-size: 12px;">版权所有 © 2005–2019 Rs, Inc. 保留全部权利。</p>
		<p style="text-align: center;font-size: 12px;">Powered by Apereo Central Authentication Service 4.2.7 2017-09-08T15:34:26.000+08:00</p>
	</div>
<!-- 登录主体end -->	
</div>	
</template>
<script >
import { tipsMessage,publicSearch,successBack,SetLocalStorage}  from '../../assets/js/map.js'
  export default{
    data : function(){ 
      return{
         username:'', //用户名
         password:''   //密码
      }
    },
    methods:{
    	login () {//按钮登录点击
    		let params = {
    				"method":"POST",
		            'account':this.username,
		            "password":this.password
		        };
    		publicSearch('rsa/session',"POST",params).then((data) =>{
    			if(!successBack(data,this)){
				    publicSearch('rsa/project',"GET",{"projectDto": JSON.stringify({"method": 'get'})}).then((data) =>{//查询project
				    	if(successBack(data,this)){
				    		if(data.data == null || data.data.length == 0){
				    			tipsMessage(data.message,'warning',this);
              					this.$router.push('/index/clever/clever_content');
				    		}else{
				    			let projectData = {};
						    	projectData.project_list = data.data;
						    	projectData.project_id = data.data[0].id;
						    	projectData.project_name = data.data[0].name;
						    	SetLocalStorage('current_projectData_A',projectData);
						    	//console.log(data)
						    	this.$router.push('/main/event')
				    		};
				    	};
				    })
    			};
    		});    		 
    	}
    },
    mounted(){//单独写ajax？因为默认跳转到标签页会加载topnav然后会在topnav里面的ajax就判断了然后会弹窗通知一次然后跳转到登录页面，如果再在登录页面也写了publicsearch又会通知一次。即保证在登录页面加载的时候不要弹窗！因为比如你注销的时候会通知注销成功然后跳到登录页面又会通知未登录了。
    	let _this = this;
    	$.ajax({
	            type: "GET",
	            url: 'rsa/authentication',
	            success: function(data){
		            if(data.code == 1001){	
		            	_this.$router.push('/main/event')
		             //window.location.href="main/refer";
		            };
	            }
	          })
		/*publicSearch('rsa/authentication',"GET",'').then((data) =>{//判断登录状态 
			if(successBack(data,this)){}
		});*/
    }
  }
    	
</script>
<style lang="scss" >
.login{
	height: 100%;
	button:hover{
		opacity: 0.8;
	}
	.login_main{
		width: 1200px;
		height: 500px;
		position: absolute;
		left: 0;
		right: 0;
		top: 15%;
		margin: auto;
		.main_left{
			.el-input{
				input{
					border-width: 0px;
					outline: none;
					height: 24px;
					line-height: 24px;
				}
				input:-ms-input-placeholder{
				    color: #ddd;opacity:1;
				}
				input::-webkit-input-placeholder{
				    color: #ddd;opacity:1;
				}
			}
		}
	}
}
</style>