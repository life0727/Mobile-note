<template>  
<div class="index container" style="background:snow;padding: 0;">
<!-- 首页头部strat -->
  <topnav></topnav>  
<!-- 首页头部end -->
<!-- 首页内容strat -->
  <div class="container" style="margin-bottom: 4%;">
    <h3 style="color:rgba(0,0,0,.7);margin-top: 3%;"><b>创建监测方案</b></h3>
    <hr style="border-color:rgba(244,169,100,.8)">
    <el-button-group style="width:100%;margin-top:4%;" id="index_btn_group">
      <router-link to="/index/clever"><el-button class="focus" style="width:25%;display:inline-block;margin-left:25%;" >智能模式</el-button></router-link>
      <el-button  style="width:25%;display:inline-block"  :disabled="true">高级模式</el-button>
    </el-button-group>
  </div>
  <button @click="cookie">cookie</button>
  <button @click="session">session</button>
  <button id="test" >测试</button>
<!-- 首页内容end -->
<!-- 模式路由 start -->
  <transition  enter-active-class="animated fadeIn" leave-active-class=""><router-view ></router-view></transition>
<!-- 模式路由 end -->
</div>
</template>

<script >
 import topnav from './top_nav.vue'
 import axios from 'axios'
 import {test} from '../assets/js/index.js'
  export default{
    data : function(){ 
        return{
        }
    },
    components:{
      topnav
    },
    methods:{
      cookie () {
        /*axios.get('http://localhost:8080/Rs_sys/sites/filter').then((response) => {
          console.log(response)
        })*/
/*
       function getCookie(name) 
        { 
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
         
            if(arr=document.cookie.match(reg))
         
                return unescape(arr[2]); 
            else 
                return null; 
        } 
        console.log('awsdaaaaaa-----------------------------')
       console.log(getCookie('CASTGC')) */
       $.ajax({
            type: "POST",
            url: 'api/v1.1/project',
            traditional: true,
            data: {
                "method": 'post',
                "project.name": '项目001',
                "project.simpleModelId": 1,
                "project.remark": '备注信息',
                "includeKeywords": ['招商银行', '金融'],
                "excludeKeywords": ['招商', 'XX']
            },
            success: function(data){
                console.log(JSON.stringify(data));
                console.log(data.success);
                console.log(data.message);
                console.log(data.data.project.id);
            }
        })
      },
      session () {
        var session = '${user.id}'
        console.log('1111111111111111111111-------------------------')
        console.log(session)
        console.log(window.sessionStorage.getItem('user'))
        console.log(window.sessionStorage.getItem('user').name)
      }
    },
    computed:{
        
      },
    mounted:function(){
      test();
       $('.index').css('height',window.screen.height);
       $('#index_btn_group button').click(function(){
        $(this).addClass('focus').parent().siblings().children().removeClass('focus');
       });
       $('#test').click(function(){
        console.log('1111111111111111111111-------------------------')
        var session = '${user.id}'
        console.log(session)
      })
    }
  }
</script>
<style lang="scss" scoped>
.index{
  .focus{
    background-color: #50bfff;
    border-color: #50bfff;
    color:white;
  }
} 
</style>