<template>
    <div class="media" style="background-color: #212336;height: 2500px;position: relative;margin-top: 0px;" >
         <div class="footer" style="position: absolute;bottom: 0px;height:130px;background-color: #111111;">
          <ul id="footer">
            <li><a href="http://www.rsact.com/">锐思官网</a>|</li>
            <li><a href="http://www.rsact.com/html/about/aboutus/">公司介绍</a>|</li>
            <li><a href="http://www.rsact.com/html/contactus/">联系我们</a>|</li>
            <li><a href="javascript:;">合作伙伴</a>|</li>
            <li><a href="javascript:;">商务合作</a>|</li>
            <li><a href="javascript:;">用户协议</a></li>
          </ul>
          <p style="color:rgba(225,225,225,.2);margin-top: 85px;margin-left: 34%;">©版权归属：北京锐思爱特咨询股份有限公司京ICP备16019542号-1</p>
      </div>
    </div>
</template>

<script>
import echarts from 'echarts'
export default {

  mounted () {
    let _this=this;
  	$('.footer').css('width',document.documentElement.clientWidth-150+'px');
  	
  },
  data () {
  	return {
  	     }
  	},
  methods: {
   }
}
</script>

<style lang="scss" >
  .media{
     #footer{
        margin-top: 40px;
        margin-left:26%;
        li{
          float: left;
          list-style-type:none;
            color:rgba(225,225,225,.2);
            font-size: 14px;
          a{
            margin: 0 20px;
            color:#ffffff;
            opacity: 0.2;
            font-size: 14px;
          }
        }
      }
  }
</style>
