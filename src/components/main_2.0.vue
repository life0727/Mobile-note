<template>
<div>
<topnav></topnav>
  <div class="main " style="background:#2d2d4a;width: 150px;height: 2500px;float: left;position: relative;">
    <div style="height:20px;width:100%;"></div>
    <div class="btn-group-vertical" role="group" >
      <!-- <div style="height: 2px;background-color: #212336"></div>
       <router-link to="/main/event"><button type="button" :style="{'color': this.$route.path=='/main/event' ? 'white' : 'rgba(255, 255, 255, 0.6)'}">
         <img v-show="this.$route.path=='/main/event'" src="../assets/icon/mainHover.png" style="position: absolute;top:2px;left:0">
         <img :src="this.$route.path=='/main/event'? evH : ev" style="margin-right: 10px;">事件管理</button>
       </router-link> -->
       <div style="height: 2px;background-color: #212336"></div>
        <router-link to="/main/systemA"><button type="button" :style="{'color': this.$route.path=='/main/systemA' ? 'white' : 'rgba(255, 255, 255, 0.6)'}">
          <img v-show="this.$route.path=='/main/systemA'" src="../assets/icon/mainHover.png" style="position: absolute;top:2px;left:0">
          <img :src="this.$route.path=='/main/systemA'? orgHH : orgH" style="margin-right: 10px;">A系统管理</button>
        </router-link>
        <div style="height: 2px;background-color: #212336"></div>
        <router-link to="/main/systemB"><button type="button" :style="{'color': this.$route.path=='/main/systemB' ? 'white' : 'rgba(255, 255, 255, 0.6)'}">
          <img v-show="this.$route.path=='/main/systemB'" src="../assets/icon/mainHover.png" style="position: absolute;top:69px;left:0">
          <img :src="this.$route.path=='/main/systemB'? mediaHH : mediaH" style="margin-right: 10px;">B系统管理</button>
        </router-link>
        <div style="height: 2px;background-color: #212336"></div>
      <!-- <button  class="btn ">文章管理</button> -->
    </div>
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
    <!--  <div class="el-tabs el-tabs--card">
      <div class="el-tabs__header">
        <div class="el-tabs__nav-wrap">
          <div class="el-tabs__nav-scroll">
            <div class="el-tabs__nav">
              <router-link to="/main/list"><div :class="this.$route.path=='/main/list' ? 'el-tabs__item is-active' : 'el-tabs__item'">文章管理</div></router-link>
              <router-link to="/main/keyword"><div :class="this.$route.path=='/main/keyword' ? 'el-tabs__item is-active' : 'el-tabs__item'">关键词管理</div></router-link>
              <router-link to="/main/event"><div :class="this.$route.path=='/main/event' ? 'el-tabs__item is-active' : 'el-tabs__item'">事件管理</div></router-link>
              <router-link to="/main/org"><div :class="this.$route.path=='/main/org' ? 'el-tabs__item is-active' : 'el-tabs__item'">组织关系管理</div></router-link>
              <router-link to="/main/media"><div :class="this.$route.path=='/main/media' ? 'el-tabs__item is-active' : 'el-tabs__item'">媒体关系管理</div></router-link>
              <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" >位置提示</div></router-link>
              <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'">指数提示</div></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>  -->

      <!--  <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane label="文章管理" name="first"></el-tab-pane>
          <el-tab-pane label="关键词管理" name="second"></el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
       </el-tabs>  -->
       <div style="position: absolute;bottom: 0px;width: 150px;height:130px;background-color: #111111;"></div>
  </div>
   <transition><router-view></router-view></transition>
</div>
</template>
<script >
import topnav from './top_nav_2.0.vue'
  export default{
    data : function(){
      return{
        current_item:'',
        item: '',
        ev:require("../assets/icon/ev.png"),
        evH:require("../assets/icon/evH.png"),
        orgH:require("../assets/icon/orgH.png"),
        orgHH:require("../assets/icon/orgHH.png"),
        mediaH:require("../assets/icon/mediaH.png"),
        mediaHH:require("../assets/icon/mediaHH.png"),
      }
    },
    components:{
      topnav
    },
    methods:{
     Ajax(Data){
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id_B'));
      $.ajax({
                type: "POST",
                url: 'http://192.168.0.3:9010/rssysc/api/v1.0/project/'+project_id+'/event/update',
                xhrFields: {
    					         withCredentials: true,
    				             },
                crossDomain: true,
                 headers:{'X-Requested-With': 'XMLHttpRequest'},
                data:{
                  "eventDtoList":JSON.stringify(Data)
                },
                success: function(data){

                    console.log(JSON.stringify(data));
                    console.log(data.success);
                    console.log(data.message);
                }

            })
     }
    },
    mounted:function (){
      console.log();
      console.log(this.$route.path)
      let _this=this;
      /*$('.el-tabs__item').click(function(){
        $(this).addClass('is-active');
        $(this).parent().parent().find('.el-tabs__item').not($(this)).removeClass('is-active');
      });*/
      /*$('.btn-group-vertical button').click(function(){
        $(this).addClass('warning');
        $(this).parent().parent().find('button').not($(this)).removeClass('warning');
        console.log($(this).children("img"))
      })*/

  },
  watch:{
    $router(to,from){
      console.log(to)
    }
  }
}
</script>
<style lang="scss" >
.main{
  .btn-group-vertical{
    .warning{
      border-left-color: rgb(32,147,239);
      border-left-width: 2px;
    }
    button{
        border-radius: 0px !important;
        width: 150px;
        height: 65px;
        font-size: 16px;
        background: #2d2d4a;
        color: white;
        border: 1px solid #2d2d4a;
      }
      button:focus{
        outline: 0;
      }
  }
  .subnav{
    .el-tabs>.el-tabs__content{
      display: none !important;
    }
    .el-tabs{
      .el-tabs__header{
        border-bottom:1px solid #2d2d4a;
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
