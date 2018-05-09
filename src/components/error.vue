<template>  
<div class="error " style="padding: 0; " >
<!-- 登录主体strat -->
	<nav class="shelf">
	  <a class="book home-page" href="http://www.rsact.com/">锐思官网</a>
	  <a class="book about-us" href="http://www.rsact.com/html/about/aboutus/">公司介绍</a>
	  <a class="book contact" href="http://www.rsact.com/html/contactus/">联系我们</a>
	  <a class="book faq" href="#/login">返回首页</a>
	   
	  <span class="book not-found"></span>
	  
	  <span class="door left"></span>
	  <span class="door right"></span>
	</nav>
	<h1>Error  {{errorCode}}</h1>
	<p>糟糕，您要找的页面她有自己的想法。。</p> 
	<div style="position: absolute;left: 0;right: 0;bottom: 50px;margin: auto;width: 1200px;height: 50px;">
		<p style="text-align: center;font-size: 12px;">版权所有 © 2005–2017 Rs, Inc. 保留全部权利。</p>
		<p style="text-align: center;font-size: 12px;">Powered by Apereo Central Authentication Service 4.2.7 2017-09-08T15:34:26.000+08:00</p>
	</div
<!-- 登录主体end -->	
</div>	
</template>
<script >
  export default{
    data : function(){ 
      return{
         errorCode:this.$store.state.errorCode == '' ? 404 : this.$store.state.errorCode
      }
    },
    methods:{
    },
    mounted(){
    	$('.error').css('height',document.documentElement.clientHeight);
    }
  }
</script>
<style lang="scss" >
.error{
	 display: -webkit-box;
	  display: -webkit-flex;
	  display: -ms-flexbox;
	  display: flex;
	  margin: 0;
	  padding: 0;
	  background-color: #446072;
	  font-family: "Microsoft YaHei",sans-serif;
	  color: white;
	  -webkit-box-pack: center;
	  -webkit-justify-content: center;
	      -ms-flex-pack: center;
	          justify-content: center;
	  -webkit-box-align: center;
	  -webkit-align-items: center;
	      -ms-flex-align: center;
	          align-items: center;
	  -webkit-box-orient: vertical;
	  -webkit-box-direction: normal;
	  -webkit-flex-direction: column;
	      -ms-flex-direction: column;
	          flex-direction: column;
	  overflow: hidden;
	  .shelf {
		  position: relative;
		  width: 30rem;
		  height: 14rem;
		  border: 0.5rem solid #374d5b;
		  border-radius: 0.5rem;
		  background-color: rgba(255, 255, 255, 0.1);
		  -webkit-perspective: 130rem;
		          perspective: 130rem;
		  box-shadow: inset 0 0 2rem rgba(0, 0, 0, 0.2);
		} 
		.door {
		  position: absolute;
		  width: 14.8rem;
		  height: 14rem;
		  display: -webkit-box;
		  display: -webkit-flex;
		  display: -ms-flexbox;
		  display: flex;
		  box-sizing: border-box;
		  padding: 1rem;
		  background-color: #374d5b;
		  -webkit-box-align: center;
		  -webkit-align-items: center;
		      -ms-flex-align: center;
		          align-items: center;
		  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
		}
		.door::before {
		  width: 1.5rem;
		  height: 1.5rem;
		  border-radius: 50%;
		  background-color: rgba(0, 0, 0, 0.1);
		  content: "";
		}  
		.door.left {
		  border-radius: 0 0.75rem 0.75rem 0;
		  -webkit-box-pack: end;
		  -webkit-justify-content: flex-end;
		      -ms-flex-pack: end;
		          justify-content: flex-end;
		  -webkit-animation: 
		      leftDoorOpen 3.5s ease-out forwards 1s,
		      leftDoorFlap 15s linear infinite forwards 9s;
		          animation: 
		      leftDoorOpen 3.5s ease-out forwards 1s,
		      leftDoorFlap 15s linear infinite forwards 9s;
		  -webkit-transform-origin: 0 0 0;
		          transform-origin: 0 0 0;
		}
		@keyframes leftDoorOpen {
		  60% {-webkit-transform: rotateY(-115deg);transform: rotateY(-115deg)}
		  100% {-webkit-transform: rotateY(-110deg);transform: rotateY(-110deg)}
		}
		@keyframes leftDoorFlap {
		  0% { -webkit-transform: rotateY(-110deg); transform: rotateY(-110deg)}
		  5% {-webkit-transform: rotateY(-115deg);transform: rotateY(-115deg)}
		  15% {-webkit-transform: rotateY(-107deg);transform: rotateY(-107deg)}
		  25% {-webkit-transform: rotateY(-113deg);transform: rotateY(-113deg)}
		  30% {-webkit-transform: rotateY(-110deg);transform: rotateY(-110deg)}
		  100% {-webkit-transform: rotateY(-110deg);transform: rotateY(-110deg)}
		}
		.door.right {
		  right: 0;
		  border-radius: 0.75rem 0 0 0.75rem;
		  -webkit-animation: 
		      rightDoorOpen 3s ease-out forwards 1.5s,
		      rightDoorFlap 10s linear infinite forwards 8s;
		          animation: 
		      rightDoorOpen 3s ease-out forwards 1.5s,
		      rightDoorFlap 10s linear infinite forwards 8s;
		  -webkit-transform-origin: 100% 0 0;
		          transform-origin: 100% 0 0;
		}
		@keyframes rightDoorOpen {
		  60% {-webkit-transform: rotateY(125deg);transform: rotateY(125deg)}
		  100% {-webkit-transform: rotateY(120deg);transform: rotateY(120deg)}
		}
		@keyframes rightDoorFlap {
		  0% { -webkit-transform: rotateY(120deg); transform: rotateY(120deg)}
		  5% {-webkit-transform: rotateY(125deg);transform: rotateY(125deg)}
		  15% {-webkit-transform: rotateY(117deg);transform: rotateY(117deg)}
		  25% {-webkit-transform: rotateY(123deg);transform: rotateY(123deg)}
		  30% {-webkit-transform: rotateY(120deg);transform: rotateY(120deg)}
		  100% {-webkit-transform: rotateY(120deg);transform: rotateY(120deg)}
		}  
		.book {
		  position: absolute;
		  box-sizing: border-box;
		  padding: 0.8rem 4rem 0.8rem 2rem;
		  border-radius: 0.25rem;
		  background-color: rgba(255, 255, 255, 0.1);
		  color: white;
		  font-size: 1rem;
		  text-transform: uppercase;
		  letter-spacing: 0.1rem;
		  cursor: pointer;
		  box-shadow: inset 0 0 0.75rem rgba(255, 255, 255, 0.1);
		}
		.book.home-page {
		  -webkit-transform: rotate(-90deg) translate(-12.4rem, 3rem);
		          transform: rotate(-90deg) translate(-12.4rem, 3rem);
		  -webkit-transform-origin: 0;
		          transform-origin: 0;
		}
		.book.about-us {
		  -webkit-transform: rotate(-100deg) translate(-13.4rem, 6.1rem);
		          transform: rotate(-100deg) translate(-13.4rem, 6.1rem);
		  -webkit-transform-origin: 0;
		          transform-origin: 0;
		}
		.book.contact {
		  right: 2rem;
		  bottom: 0.2rem;
		  border-radius: 0.3rem 0 0 0.3rem;
		}
		.book.faq {
		  right: 0.8rem;
		  bottom: 3.3rem;
		  border-radius: 0.3rem 0 0 0.3rem;
		}
		.book.not-found {
		  width: 12rem;
		  height: 3.5rem;
		  border: 1px dashed rgba(255, 255, 255, 0.3);
		  background-color: transparent;
		  -webkit-transform: rotate(-90deg) translate(-12rem, 13rem) scale(1);
		          transform: rotate(-90deg) translate(-12rem, 13rem) scale(1);
		  -webkit-transform-origin: 0;
		          transform-origin: 0;
		  cursor: default;
		  -webkit-animation: bookFadeOut 1s 3s infinite forwards;
		          animation: bookFadeOut 1s 3s infinite forwards;
		}    
}
</style>