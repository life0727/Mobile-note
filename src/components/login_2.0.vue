<template>
<div class="login" @click="start()">
<!-- <div id="container" v-show="show_3d"></div>
	<div id="menu">
	<button id="grid" style="opacity: 0;">HELIX</button>
	<button id="helix" style="opacity: 0;">HELIX</button>
</div> -->
<video src="../../static/viedo/bbb.mp4" :autoplay="true" >	</video>
<h3 style="position: absolute;z-index: 15;bottom: 20%;left: 45%;" v-show="show_continue" class="continue" >点击任意键继续</h3>
<el-dialog title="" v-model="dialogVisible" size="tiny" :close-on-click-modal="guanbi">
	<div class="content">
			<img src="../assets/icon/login_2.0.png">
			<div class="input">
				<img src="../assets/icon/denglu.png">
				<div class="input-group" style="top:175px;width: 300px;height: 40px;left: 32px;">
				  <span class="input-group-addon" style="background: white;"><img src="../assets/icon/user.png" ></span>
				  <input type="text" class="form-control" placeholder="请输入您的账户名" style="height: 40px;border-left: 0px solid gray;" v-model="user">
				</div>
				<div class="input-group" style="top:205px;width: 300px;height: 40px;left: 32px;">
				  <span class="input-group-addon" style="background: white;"><img src="../assets/icon/password.png" ></span>
				  <input type="password" class="form-control" @keyup.enter="login()" placeholder="请输入您的密码" style="height: 40px;border-left: 0px solid gray;" v-model="password">
				</div>
				<button type="button" class="btn btn-primary" style="top:245px;width: 300px;height: 40px;left: 32px;position: relative;font-size: 20px;background: #7795ec;border-color: #7795ec;border-radius:18px; outline: none;color:white;" @click="login()">登录</button>
			</div>
		</div>
</el-dialog>

<!-- 登录头部strat -->
	<!-- <topnav></topnav>  -->
<!-- 登录头部end -->
<!-- 登录主体strat -->
	<!-- <div class="login_main">
		<h1 class="text-center" style="color:rgb(22,109,188); margin-bottom:50px;">请登录</h1>
		<form class="form-horizontal">
			  <div class="form-group">
			    <label for="yourid" class="col-sm-4 control-label">账号:</label>
			    <div class="col-sm-4">
			      <input type="text" class="form-control" id="yourid" placeholder="请输入账号">
			    </div>
			  </div>
			  <div class="form-group" style="margin-top: 30px">
			    <label for="yourpassword" class="col-sm-4 control-label">密码:</label>
			    <div class="col-sm-4">
			      <input type="password" class="form-control" id="yourpassword" placeholder="请输入密码">
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="col-sm-offset-4" style="padding-left:15px;">
			      <div class="checkbox">
			        <label>
			          <input type="checkbox"> 记住密码
			        </label>
			      </div>
			    </div>
			  </div>
			  <div class="form-group">
			    <div class="col-xs-offset-5" style="margin-top:2%"  >
			     <button type="button" class="btn btn-success btn-lg btn-block " style="width:25%" @click="login()">登录</button>
			    </div>
			    <div class="col-xs-offset-5" style="margin-top:4%" >
			     <button type="button" class="btn btn-info btn-lg btn-block " style="width:25%">注册</button>
			    </div>
			  </div>
		</form>
		<a href="#mess1" >登录</a>
	</div> -->
<!-- 登录主体end -->
</div>
</template>
<script >
/*import topnav from './top_nav_2.0.vue'*/
  export default{
	created(){
			var url=document.location.href;
			console.log(url);
			$.ajax({
				type: "GET",
				url: url,
				 headers:{'X-Requested-With': 'XMLHttpRequest'},
				async:false,
				success:function(data){
					console.log(data);
				}
			});
		},
  	mounted(){
  		console.log(window.screen.width)
  		let _this=this;
  		$('video').css('width',window.screen.width+'px');
  		$('video').css('height',window.screen.height+'px');

		$('.el-dialog--tiny').css('left',(window.screen.width)/2+'px');

  		window.onresize = function(){
        	$('.login').css('height',$(window).height());
     	 };
     	 /*setTimeout(function(){
     	 	_this.dialogVisible=true;
     	 	_this.show_3d=false;
     	 },10000);*/
     	 setInterval(function(){
            $('.continue').toggleClass('animated fadeIn');
		
        	},600);
     	 $(function(){
     	 	console.log($('.el-dialog--tiny').css('left'))
     	 })

     	 _this.hasLogin();
 	},
    data : function(){
      return{
       	   user:'',
       	   password:'',
       	   dialogVisible:false,
       	   guanbi:false,
       	   show_3d:true,
       	   show_continue:true
      }
    },
    components:{

    },
    methods:{
    	login () {

    		let _this=this;
    		if(_this.user==''||_this.password==''){
    			_this.$message({
		          message: '请输入用户名或密码',
		          type: 'warning'
		        });
    		}else{
    			$.ajax({
						type: "POST",
						url: 'http://192.168.0.3:9010/rssysc/api/v1.0/session',
						headers:{'X-Requested-With': 'XMLHttpRequest'},
						/*xhrFields: {
					         withCredentials: true,
							 },	  
						 
				    crossDomain: true,*/
						data: {
							"method": 'get',
							"account": _this.user,
							"password": _this.password,
							    },
						success: function(data){
							console.log(data)
								if(data.code == 1002){
									var fallbackUrl = data.data.fallbackUrl;
									//window.localStorage.setItem('userID_B',JSON.stringify(data.data.userb.id));
									if(fallbackUrl == null || fallbackUrl == ''){
										window.location.href="#/main/systemA";
									} else {
										window.location.href=this.url+"?successCallbackUrl="+window.document.location.href;
									}

								}else{
									_this.$message({
							          message: data.message,
							          type: 'warning'
					        });
						}
						}
				})
    		}
    	},
    	start(){
    		this.show_continue=false;
			this.dialogVisible=true;
			
		},
		//发送请求 确定是否登陆过自动登录
		hasLogin(){
			
			$.ajax({
				type: "POST",
				headers:{'X-Requested-With': 'XMLHttpRequest'},
				url: 'authentication',
			success: function(data){
					
					if(data.code == 1002){
						
					
					}else if (data.code == 1004){
						window.location.href="#/";
						
					}
				}
    		});
		}
		
    }
  }
</script>
<style lang="scss" >
.login{
	width: 100%;
	position: relative;
	.content{
		position: absolute;
		left:0;
		right:0;
		top:0;
		bottom: 0;
		margin: auto;
		width:840px;
		height: 516px;
		box-shadow: 3px 3px 2px rgba(0, 0, 0,.6) !important;
		>img{
			position: absolute;
			left:0;
		}
		.input{
			background: white;
			width: 364px;
			position: absolute;
			right: 0;
			top:1px;
			height: 514px;
			>img{
				position: absolute;
				top:95px;
				left:137px;
			}
		}
	}
	.el-dialog--tiny{
		top: 20% !important;
		width: 840px;
		height: 500px;

	}
	//
	body {
	background-color: rgba(0,0,0,.85);
	margin: 0;
	font-family: Helvetica, sans-serif;;
	overflow: hidden;
}

a {
	color: #ffffff;
}

#info {
	position: absolute;
	width: 100%;
	color: #ffffff;
	padding: 5px;
	font-family: Monospace;
	font-size: 13px;
	font-weight: bold;
	text-align: center;
	z-index: 1;
}

#menu {
	position: absolute;
	bottom: 20px;
	width: 100%;
	text-align: center;
}

.element {
	width: 120px;
	height: 160px;
	box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
	border: 1px solid rgba(127,255,255,0.25);
	text-align: center;
	cursor: default;
}

.element:hover {
	box-shadow: 0px 0px 12px rgba(0,255,255,0.75);
	border: 1px solid rgba(127,255,255,0.75);
}

	.element .number {
		position: absolute;
		top: 20px;
		right: 20px;
		font-size: 12px;
		color: rgba(127,255,255,0.75);
	}

	.element .symbol {
		position: absolute;
		top: 40px;
		left: 0px;
		right: 0px;
		font-size: 60px;
		font-weight: bold;
		color: rgba(255,255,255,0.75);
		text-shadow: 0 0 10px rgba(0,255,255,0.95);
	}

	.element .details {
		position: absolute;
		bottom: 15px;
		left: 0px;
		right: 0px;
		font-size: 12px;
		color: rgba(127,255,255,0.75);
	}

button {
	color: rgba(127,255,255,0.75);
	background: transparent;
	outline: 1px solid rgba(127,255,255,0.75);
	border: 0px;
	padding: 5px 10px;
	cursor: pointer;
}
button:hover {
	background-color: rgba(0,255,255,0.5);
}
button:active {
	color: #000000;
	background-color: rgba(0,255,255,.75);
}
}
</style>
