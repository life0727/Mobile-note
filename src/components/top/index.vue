<template>  
<div>
  <creatProject></creatProject>
  <!-- 首页头部strat -->
    <!-- <topnav></topnav>   -->
  <!-- 首页头部end -->
  <div class="index container" style="background:white;padding: 0;display: none;">
  <!-- 首页内容strat -->
    <div class="container" style="margin-bottom: 2%;">
      <p style="font-size: 26px;color:#00b38a;margin-top: 36px;position: relative;"><b style="position: absolute;top:-2px;">|</b>&nbsp;&nbsp;&nbsp;<b>创建监测方案</b>&nbsp;<span style="color:#666666;font-size: 14px;">/选择您想监测的类型</span></p>
      <div class="el-tabs el-tabs--card" style="margin-top: 20px;">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav-scroll">
              <div class="el-tabs__nav">
                <router-link to="/index/clever"><div :class="this.$route.path=='/index/clever/clever_content'||'/index/clever/clever_content_next' ? 'el-tabs__item is-active' : 'el-tabs__item'">智能模式</div></router-link>
                <!-- <router-link to="/index/high"><div :class="this.$route.path=='/index/high/high_content' ? 'el-tabs__item is-active' : 'el-tabs__item'"  >高级模式</div></router-link> -->
                <!-- <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" >位置提示</div></router-link>
                <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'">指数提示</div></router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div> 
     <!--  <el-button-group style="width:100%;margin-top:4%;" id="index_btn_group">
       <router-link to="/index/clever"><el-button class="focus" style="width:25%;display:inline-block;margin-left:25%;" >智能模式</el-button></router-link>
       <el-button  style="width:25%;display:inline-block"  :disabled="true">高级模式</el-button>
     </el-button-group> -->
    </div>

  <!-- 首页内容end -->
  <!-- 模式路由 start -->
    <transition  enter-active-class="animated fadeIn" leave-active-class=""><router-view ></router-view></transition>
  <!-- 模式路由 end -->
  </div>
</div>  
</template>

<script >
 import creatProject from '../index/creatProject.vue'
  export default{
    data : function(){ 
        return{
        }
    },
    components:{
      creatProject
    },
    methods:{

    },
    mounted:function(){
       $('.index').css('height',window.screen.height);
       $('#index_btn_group button').click(function(){
        $(this).addClass('focus').parent().siblings().children().removeClass('focus');
       });
       $('#test').click(function(){
        console.log('1111111111111111111111-------------------------')
        var session = '${user.id}'
        console.log(session)
      })
       $('.el-tabs__item').click(function(){
        $(this).addClass('is-active');
        $(this).parent().parent().find('.el-tabs__item').not($(this)).removeClass('is-active')
      });
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
  .container{
    .el-tabs>.el-tabs__content{
      display: none !important;  
    }
    .el-tabs{
      .el-tabs__header{
        border-bottom:1px solid #00b38a;
        .el-tabs__nav-wrap{
          padding-bottom: 0px;
        }
      }
      .el-tabs__nav{
        a:first-child{
          margin-left: 0px;
        }
        .el-tabs__item:first-child{
          margin-left: 0px;
        }
        a{
          margin-left: 10px;
        }
        .el-tabs__item{
          background-color: #00b38a;
          color: rgb(255,255,255);
          border-bottom:none;
          height:28px;
          line-height: 28px;
        }
        .is-active{
          border: 1px solid #00b38a;
          border-bottom: none;
          background-color: rgb(255,255,255);
         color:black;
        }

      }
    }
  }
} 
</style>