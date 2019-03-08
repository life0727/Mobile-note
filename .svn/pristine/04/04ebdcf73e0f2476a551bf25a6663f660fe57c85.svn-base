<template>  
<div>
 <div style="background-color: rgb(9, 7, 35);height: 80px;">
  <div class="main container" style="padding: 0;width:1250px;background-color: rgb(9, 7, 35);">
    <div style="height:30px;width:100%;"></div>
    <div class="subnav" style="position: relative;">
<!--         <span style="position: absolute;z-index: 999;top:12px;padding-left:10px;">当前项目<i class="
   fa fa-angle-right " style="font-size: 16px;margin-left: 3px;"></i></span>
   <el-dropdown style="position: absolute;z-index: 999;top:12px;left:80px;"  @command="handleCommand">
         <span id="dropdown_start" style="cursor: pointer;"><b>{{current_item}}</b><i class="fa fa-angle-down" style="font-size: 16px;margin-left: 3px;"></i></span>                  
         <el-dropdown-menu slot="dropdown" id="dropdown_item"  >
             <el-dropdown-item v-for="i in item" style="position:relative;" :command="i.name">{{i.name}}<i class="fa fa-times" @click.stop="del_item(i)" style="position:absolute;right: 0;"></i></el-dropdown-item>
             <router-link to="/index/clever/clever_content" style="text-decoration: none;color: #13ce66"><button class="btn btn-info"><i class="el-icon-plus"></i>添加项目</button></router-link>
         </el-dropdown-menu>
   </el-dropdown>  -->   
        <!-- <div class="el-tabs el-tabs--border-card">
          <div class="el-tabs__header">
            <div class="el-tabs__nav-wrap">
              <div class="el-tabs__nav-scroll">
                <div class="el-tabs__nav">
                  <router-link to="/main/list"><div :class="this.$route.path=='/main/list' ? 'el-tabs__item is-active' : 'el-tabs__item'">文章管理</div></router-link>
                  <router-link to="/main/keyword"><div :class="this.$route.path=='/main/keyword' ? 'el-tabs__item is-active' : 'el-tabs__item'">关键词管理</div></router-link>
                  <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" ></div></router-link>
                  <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'"></div></router-link>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      <!-- <div class="el-tabs el-tabs--card">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav-scroll">
              <div class="el-tabs__nav">
               <router-link to="/main/list"><div :class="this.$route.path=='/main/list' ? 'el-tabs__item is-active' : 'el-tabs__item'">文章管理</div></router-link>
                 <router-link to="/main/keyword"><div :class="this.$route.path=='/main/keyword' ? 'el-tabs__item is-active' : 'el-tabs__item'">关键词管理</div></router-link>
                <router-link to="/main/event"><div :class="this.$route.path=='/main/event' ? 'el-tabs__item is-active' : 'el-tabs__item'">议题管理</div></router-link> 
                <router-link to="/main/org"><div :class="this.$route.path=='/main/org' ? 'el-tabs__item is-active' : 'el-tabs__item'">组织关系管理</div></router-link>
                <router-link to="/main/media"><div :class="this.$route.path=='/main/media' ? 'el-tabs__item is-active' : 'el-tabs__item'">媒体关系管理</div></router-link> 
                <router-link to="/main/compet"><div :class="this.$route.path=='/main/compet' ? 'el-tabs__item is-active' : 'el-tabs__item'">竞品管理</div></router-link>
                
                <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" >位置提示</div></router-link>
                <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'">指数提示</div></router-link>
              </div>
            </div>
          </div>
        </div>
      </div>  -->

      <div class="el-tabs el-tabs--top">
        <div class="el-tabs__header is-top" style="margin-left: 30px;">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div  class="el-tabs__nav" style="transform: translateX(0px);">
                <div class="el-tabs__active-bar is-top" :style="{width:'75px', transform: 'translateX('+translateX+'px)'}"></div>
                <router-link to="/main/event">
                  <div  @click="translateX = 13"  role="tab" :class="this.$route.path=='/main/event' ? 'el-tabs__item is-top is-active' : 'el-tabs__item is-top'">议题管理</div>
                </router-link>
                <router-link to="/main/org" style="margin-left: 50px;">
                  <div  @click="translateX = 150"  role="tab" :class="this.$route.path=='/main/org' ? 'el-tabs__item is-top is-active' : 'el-tabs__item is-top'" >组织管理</div>
                </router-link>
                <router-link to="/main/media" style="margin-left: 50px;">
                  <div @click="translateX = 292" role="tab" :class="this.$route.path=='/main/media' ? 'el-tabs__item is-top is-active' :'el-tabs__item is-top'">媒体管理</div>
                </router-link>
                <!-- <router-link to="/main/compet" style="margin-left: 25px;">  
                  <div @click="translateX = 345" role="tab" :class="this.$route.path=='/main/compet' ? 'el-tabs__item is-top is-active' : 'el-tabs__item is-top'">竞品管理</div>
                </router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div>
       
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs> -->

    </div>

  </div>
 </div>   
   <transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</div>  
</template>
<script >

  export default{
    data : function(){ 
      return{
        current_item:'',
        item: '',
        translateX:''
      }
    },
    methods:{
    },
    mounted:function (){
      switch(this.$route.path)  
                {
                  case '/main/event':
                  this.translateX = 13;
                  break;
                  case '/main/org':
                  this.translateX = 150;
                  break;
                  case '/main/media':
                  this.translateX = 292;
                  break;
                  case '/main/compet':
                  this.translateX = 345;
                  break;
                  default:
                  break;
                }
      /*$('.el-tabs__item').click(function(){
        $(this).addClass('is-active');
        $(this).parent().parent().find('.el-tabs__item').not($(this)).removeClass('is-active');
      });*/  
  },
  watch:{
    $route (to,from){
      console.log(to)
      switch(to.path)  
                {
                  case '/main/event':
                  this.translateX = 13;
                  break;
                  case '/main/org':
                  this.translateX = 150;
                  break;
                  case '/main/media':
                  this.translateX = 292;
                  break;
                  case '/main/compet':
                  this.translateX = 345;
                  break;
                  default:
                  break;
                }
    }
  }    
}
</script>
<style lang="scss" >
.main{
  height:auto;
  .subnav{
    .el-tabs{
      .el-tabs__header{
        .el-tabs__nav-wrap{
          .el-tabs__active-bar{
            top:45px;
            height: 6px;
            background-color:#00a17c;
          }
        }
      }
      .el-tabs__nav{
        padding-bottom: 11px;
        .el-tabs__item{    
          font-size: 16px;
          color: #777;
          border-bottom:none;
        }
        .is-active{
         border-bottom: none;   
         color:white;
        }
      }
    } 
  }
}
</style>