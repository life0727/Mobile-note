<template>  
<div class="login container" style="background:snow;padding: 0;">
<!-- 登录头部strat -->
	<topnav></topnav> 
<!-- 登录头部end -->
<!-- 登录主体strat -->
	<div class="login_main">
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
		<!-- <a href="#mess1" >登录</a> -->
	</div>
<!-- 登录主体end -->	
</div>	
</template>
<script >
import topnav from './top_nav.vue'
  export default{
    data : function(){ 
      return{
            
      }
    },
    components:{
      topnav
    },
    methods:{
    	login () {
    		window.location.href="#index"
    	}
    }
  }
</script>
<style lang="scss" scoped>
.login{
	height: 100%;
	.login_nav{
		height:60px;
		background: rgb(57,57,57);
		a{
			font-size: 2rem;
		}
	}
	.login_main{
		//
		width: 60%;
		height: 70%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
	}

}
</style>