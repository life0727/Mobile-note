<template>  
<div class="login " style="padding: 0;background-color:#fbf6ea ">
<!-- 登录主体strat -->
	<div class="login_main">
		<img src="../assets/icon/login.png" style="position: absolute;">
		<div style="width: 490px;height: 490px;background-color: #f5f5f5;position: absolute;right: 0px;" class="main_left">
			<div style="width: 470px;height: 470px;background-color: white;border-radius: 5px;margin: 10px 10px;">
				<img src="../assets/icon/login_biaoti.png" style="margin-top: 60px;margin-left: 85px;">
				<div style="margin-top: 80px;margin-left: 85px;border-bottom:1px solid #ddd;width: 300px;height: 28px;position: relative;">
					<img src="../assets/icon/login_user.png">
					<el-input style="width: 260px;position: absolute;left: 20px;" v-model="username" placeholder="请输入您的账户名"></el-input>
				</div>
				<div style="margin-top: 42px;margin-left: 85px;border-bottom:1px solid #ddd;width: 300px;height: 28px;position: relative;">
					<img src="../assets/icon/login_password.png">
					<el-input style="width: 260px;position:absolute;left: 20px;" type="password" v-model="password" placeholder="请输入密码"></el-input>
				</div>
				<div style="margin-top: 50px;margin-left: 85px;width: 300px;height: 80px;position: relative;">
					<el-button type="success" style="width: 100%;padding: 8px 15px;font-size: 16px;background-color:#00b38a;border-color:#00b38a;border-radius: 15px;">登录</el-button>
					<a href="javascript:;" style="position: absolute;right:10px;top:50px;color: gray;" @click="username = '';password = '';">重置</a>
				</div>
			</div>
		</div>
	</div>
	<div style="position: absolute;left: 0;right: 0;bottom: 50px;margin: auto;width: 1200px;height: 50px;">
		<p style="text-align: center;font-size: 12px;">版权所有 © 2005–2017 Rs, Inc. 保留全部权利。</p>
		<p style="text-align: center;font-size: 12px;">Powered by Apereo Central Authentication Service 4.2.7 2017-09-08T15:34:26.000+08:00</p>
	</div>
<!-- 登录主体end -->	
</div>	
</template>
<script >
import topnav from './top_nav.vue'
  export default{
    data : function(){ 
      return{
         username:'',
         password:''   
      }
    },
    components:{ 
      topnav
    },
    methods:{
    	login () {
    		window.location.href="#index"
    	}
    },
    mounted(){
    	    
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