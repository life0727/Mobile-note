<template>
<div>
  <nav class="index_nav navbar navbar-default" style="min-height: 78px;margin-bottom: 0;background-color: #090723;border-color:#090723;border-radius: 0;min-width: 1250px;">
    <div :style="{padding:'14px 0px 0 0px',margin:'0 auto',width:this.$route.path == '/index/clever/clever_content' ? '780px' : '1250px'}">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" :to="this.$route.path == '/index/clever/clever_content' ? '/index/clever/clever_content' : '/main/event'">
           <img alt="Brand" src="../assets/icon/logo.png" style="margin-top: -3px;">
        </router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-show="this.$route.path == '/index/clever/clever_content'">
        <ul class="nav navbar-nav">
          <li style="margin: 12px 0 0 8px;font-size: 18px;color:rgba(255,255,255,.8);font-weight: 700;"><span style="margin-right: 25px;border-left: 1px solid #333333;line-height: 18px;"></span>声誉分析后台</li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li style="font-size: 16px;color:rgba(255,255,255,.8);" class="admin">
            <span style="color:rgba(255,255,255,.8);margin-left: 8px;">{{account.length > 8 ? account.slice(0,8)+'..' : account}}&nbsp;&nbsp;</span>
            <a @click="logout" class="logout" style="font-size: 16px!important;display: inline-block;color:rgba(255,255,255,.8);padding-left: 0;cursor: pointer">,&nbsp;&nbsp;切换账号</a>
          </li>
        </ul>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" v-show="this.$route.path != '/index/clever/clever_content'">
        <ul class="nav navbar-nav">
          <li style="margin-left: 8px;"><router-link :to="this.$store.state.router || '/main/event'" :class="this.$route.path.slice(0,5)=='/main' ?  'active' : ''" >声誉分析</router-link></li>
          <li style="margin-left: 20px;"><router-link to="/keyword" :class="this.$route.path=='/keyword' ?  'active' : ''">项目管理</router-link></li>
          <li style="margin-left: 20px;"><router-link to="/custom" :class="this.$route.path=='/custom' ?  'active' : ''">客户管理</router-link></li>
          <li style="margin-left: 20px;"><router-link to="/refer" :class="this.$route.path=='/refer' ?  'active' : ''">声誉竞争力</router-link></li>
          <!-- <router-link to="/main/refer"><div :class="this.$route.path=='/main/refer' ? 'el-tabs__item is-active' : 'el-tabs__item'">提及率</div></router-link> -->
          <!-- <li><a href="#"><b>. . .</b></a></li> -->
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li style="margin-left: 15px;">
              <span style="color:rgba(255,255,255,.6);line-height: 50px;font-size: 18px;">当前项目<i class="fa fa-angle-right " style="font-size: 18px;margin-left: 3px;color:rgba(255,255,255,0.5)"></i></span>
              <el-dropdown style="margin-left: 5px;font-size: 18px;"  @command="handleCommand">
               <span id="dropdown_start" v-show="this.$route.path!=='/index/clever/clever_content'" v-if="this.$route.path!=='/index/clever/clever_content_next'"><span style="cursor: pointer;color: white;" >{{current_item}}</span><img src="../assets/icon/选择（16×７px）.png" style="font-size: 18px;color: white;margin-left: 12px;"></span>                  
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in item" class="proDropdown" style="position:relative;min-width: 120px;" :command="i.name">{{i.name}}
                    <img src="../assets/icon/del.png" @click.stop="del_item(i)" style="position:absolute;right: 4px;top:10px;display: none;">
                  </el-dropdown-item >
                    <router-link to="/index/clever/clever_content" style="text-decoration: none;color:#00b38a;" >
                      <li style="list-style: none;line-height: 36px;padding: 0 18px;margin: 0;position: relative;cursor: pointer;" class="addPro">
                        <i class="el-icon-plus"></i>
                          添加项目
                      </li>
                    </router-link> 
               </el-dropdown-menu>
               </el-dropdown>
            </li>
            <li style="margin-left: 20px;">
              <span  class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user"  style="color:rgba(255, 255, 255, 0.5);font-size: 1.5em;margin-top: 14px;"><span  style="color:white;margin-left: 8px;">{{account.length > 8 ? account.slice(0,8)+'..' : account}}</span></i></span>
              <!-- <img  src="../assets/icon/login_user.png" style="width:18px;height:18px;border-radius: 30px;" class="dropdown-toggle" data-toggle="dropdown"> -->
              <ul class="dropdown-menu" style="min-width: 80px;" id="admin">         
                <!-- <li>
                  <el-tooltip :content="'账号: '+account" placement="left" effect="light">
                    <a href="javascript:;" style="cursor: default;padding: 5px 10px;" >
                      {{account.length > 8 ? account.slice(0,8)+'..' : account}}
                    </a>
                  </el-tooltip>
                </li>
                <li role="separator" class="divider"></li> -->
                <li>
                  <img src="../assets/icon/logout.png" style="padding-left: 5px;">
                  <a href="javascript:;" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block;color:#333 !important" @click="logout">注销</a>
                </li>
              </ul>
            </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
  <div style="height: 80px;min-width: 1250px;background-color:rgb(9, 7, 35);" v-show="this.$route.path.slice(0,5) !== '/main'">
    <div class="container">
      <p v-show="this.$route.path == '/keyword'" style="padding-top: 30px;color: white;font-size: 20px;">项目管理</p>
      <p v-show="this.$route.path == '/custom'" style="padding-top: 30px;color: white;font-size: 20px;">客户管理</p>
      <p v-show="this.$route.path == '/refer'" style="padding-top: 30px;color: white;font-size: 20px;">声誉竞争力</p>
    </div>
  </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>

  <!-- <div class="index_nav" >     
          <ul class="nav navbar-nav " style="width: 1250px;;margin: 0 auto;position: relative; ">
            <li><a href="#/main/refer"><img src="../assets/icon/793549342520256102.png" style="margin-top: -16px;" ></a></li>
            <li style="margin-left: 2%;"><a href="#/main/refer" :class="this.$route.path=='/main/refer' ?  'active' : ''" >舆情监测</a></li>
            <li><a href="#custom" :class="this.$route.path=='/custom' ?  'active' : ''">客户管理</a></li>
            <li><a href="#all_net_analysis" :class="this.$route.path=='/all_net_analysis' ?  'active' : ''">全网分析</a></li>
            <li><a href="javascript:;" style="line-height:38px;font-size: 18px"><b>. . .</b></a></li>
            <li  style="position: absolute;right: 80px;">
              <span style="color:rgba(255,255,255,0.5);line-height: 78px;font-size: 18px;">当前项目<i class="fa fa-angle-right " style="font-size: 18px;margin-left: 3px;color:rgba(255,255,255,0.5)"></i></span>
              <el-dropdown style="margin-left: 5px;font-size: 18px;"  @command="handleCommand">
                <span id="dropdown_start" v-show="this.$route.path!=='/index/clever/clever_content'" v-if="this.$route.path!=='/index/clever/clever_content_next'"><span style="cursor: pointer;color: white;" >{{current_item}}</span><img src="../assets/icon/选择（16×７px）.png" style="font-size: 18px;color: white;margin-left: 12px;"></span>                  
                <el-dropdown-menu slot="dropdown" id="dropdown_item"  >
                    <el-dropdown-item v-for="i in item" style="position:relative;" :command="i.name">{{i.name}}<img src="../assets/icon/del.png" @click.stop="del_item(i)" style="position:absolute;right: 4px;;top:10px;"></el-dropdown-item>
                    <router-link to="/index/clever/clever_content" style="text-decoration: none;color: #13ce66"><span style="color:#00b38a"><i class="el-icon-plus"></i>添加项目</span></router-link>
                    <router-link to="/index/clever/clever_content" style="text-decoration: none;color:#00b38a;"><li style="list-style: none;line-height: 36px;padding: 0 10px;margin: 0;position: relative;cursor: pointer;"><i class="el-icon-plus"></i>添加项目</li></router-link> 
                </el-dropdown-menu>
              </el-dropdown>
            </li>
           <li style="display: none;">
             <a href="javascript:;" style="margin-left: 10px;padding-bottom:0;">
               <el-dropdown  @command="handleCommand_xiaoxi" >
                 <el-badge :value="sum" id="sum" :max="99" style="left:-10px;">
                   <span class="el-dropdown-link">
                     <img src="../assets/icon/消息（18X19）.png" >
                   </span>
                 </el-badge>  
                 <el-dropdown-menu slot="dropdown">
                  <router-link to="/main/list">
                     <el-dropdown-item class="clearfix" v-for="i in data"  :command="i.name"   v-if="this.sum!==0">
                       {{i.name}}
                       <el-badge class="mark" :value="i.num" :max="99" />
                     </el-dropdown-item>
                   </router-link>
                     <el-dropdown-item v-if="this.sum==0" style="text-align: center;color:rgb(172,15,2)">无通知</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
             </a>
           </li>
            <li class="dropdown" style="position: absolute;right: 0;" >
              <img  src="../../static/img/p8.jpg" style="width:50px;height:50px;border-radius: 30px;margin-top: 15px;" class="dropdown-toggle" data-toggle="dropdown">
              <ul class="dropdown-menu" style="min-width: 80px;" id="admin">         
               <li><a href="javascript:;">one</a></li>
               <li><a href="#1">two</a></li>
                <li style="text-align: center"><el-tooltip :content="'账号: '+account" placement="left" effect="light"><a href="javascript:;" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block;cursor: default;" >{{account.length > 8 ? account.slice(0,8)+'..' : account}}</a></el-tooltip></li>
                <li role="separator" class="divider"></li>
                <li ><img src="../assets/icon/logout.png" style="padding-left: 5px;"><a href="javascript:;" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block" @click="logout">注销</a></li>
              </ul>
            </li>
          </ul>   
      </div> -->	
</template>
<script >
import { publicSearch,successBack,SetSessionStorage,GetLocalStorage,SetLocalStorage,tipsMessage }  from '../assets/js/map.js'
export default{
  name: 'topNav',
  data: function () {
  	return {
      data:'',
      sum:'',
      current_item:'',
      item:'', //GetLocalStorage('current_projectData_A').project_list,
      account:GetLocalStorage('account_A') == null ? '未登录' : GetLocalStorage('account_A')
  	}
  },
  mounted  :function () {
    //this.account = GetLocalStorage('account_A') == null ? '未登录' : GetLocalStorage('account_A');
    console.log(GetLocalStorage('account_A'))
    $('#admin li').not('.divider').hover(function(){
        $(this).css('background-color','rgba(0, 179, 138,.1)')
      },function(){
        $(this).css('background-color','white')
      });
    $('#admin li a').hover(function(){
        $(this).css('background-color','rgba(0, 179, 138,0)')
      },function(){
        $(this).css('background-color','rgba(0, 179, 138,0)')
      });
    $('#sum .el-badge__content').css({'padding':'1px 5px','border':'0px solid #fff'});
    publicSearch('rsa/authentication',"GET",'').then((data) =>{//判断登录状态 
      if(successBack(data,this)){
        this.search();
      }
    });
         
  },
  methods:{
    search(){
     // console.log(GetLocalStorage('current_projectData_A').project_id)
        if(GetLocalStorage('current_projectData_A') == null || GetLocalStorage('current_projectData_A').project_list == null || GetLocalStorage('current_projectData_A').project_list.length == 0){
            tipsMessage('当前无项目，请先添加','warning',this);
            this.$router.push('/index/clever/clever_content');
          }else{
            this.item = GetLocalStorage('current_projectData_A').project_list;
            this.current_item = GetLocalStorage('current_projectData_A').project_name;
          };

      /*let params = {"projectDto": JSON.stringify({"method": 'get'})};
      publicSearch('rsa/project',"GET",params).then((data) =>{
        if(successBack(data,this)){
          console.log(data)
          if(data.data != null || data.data.length > 0){
            if(data.data.length<1){//项目列表少于一跳转
              notify('提示',data.message,'warning',this);
              this.$router.push('index/clever');
              //window.location.href='#/index/clever';
            }else{
                 this.item=data.data;
              if(GetSessionStorage('start') == null){ //第一次加载时
                 this.current_item=data.data[0].name;
                 SetSessionStorage('start',this.current_item);
                 SetSessionStorage('project_id',data.data[0].id);
              }else{ //切换第一层tab会加载此模块如果当前项目有的话就用当前
                this.current_item = GetSessionStorage('start');
              };
            }
          } 
        }
      });*/
    },
    handleCommand_xiaoxi (command) {
      this.data=this.data.filter(item => { return command.indexOf(item.name) === -1; });//点击消息后删除
      window.location.reload();
      if(this.$route.path!=='/main/list'){
        this.$router.push('main/list')
        //window.location.href="#/main/list"
      }   
    },
    handleCommand(command){
        for(let i=0;i<this.item.length;i++){
          if(this.item[i].name === command){
            let projectData = {};
                projectData.project_id = this.item[i].id;
                projectData.project_list = GetLocalStorage('current_projectData_A').project_list;
                projectData.project_name = command;
                SetLocalStorage('current_projectData_A',projectData);
          }
        };
        sessionStorage.removeItem('data');
        sessionStorage.removeItem('locationSet');
        sessionStorage.removeItem('orgSet');
        sessionStorage.removeItem('personSet');
        sessionStorage.removeItem('current_sort');
        sessionStorage.removeItem('time0');
        sessionStorage.removeItem('time1');
        window.location.reload();
      },
    del_item(a) {
        this.$confirm('是否删除'+' '+a.name+' '+'项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'ev_confirmClass',
          type: 'warning'
        }).then(() => {
          let params = {"projectDto": JSON.stringify({"method": 'delete',"projectIdList": [a.id]})};
          if(a.name === this.current_item){
            publicSearch('rsa/project',"POST",params).then((data) =>{
              if(successBack(data,this)){
                this.item = this.item.filter(item => { return [a.id].indexOf(item.id) === -1; });
                if(this.item.length > 0){
                  let projectData = {};
                    projectData.project_list = this.item;
                    projectData.project_id = this.item[0].id;
                    projectData.project_name = this.item[0].name;
                    SetLocalStorage('current_projectData_A',projectData);
                    window.location.reload();
                }else{
                  let projectData = {};
                    projectData.project_list = [];
                    projectData.project_id = '';
                    projectData.project_name = '';
                    SetLocalStorage('current_projectData_A',projectData);
                    tipsMessage('当前无项目，请先添加','warning',this);
                    this.$router.push('/index/clever/clever_content');
                };
              }
            })
          }else{
            publicSearch('rsa/project',"POST",params).then((data) =>{
              if(successBack(data,this)){
                this.item = this.item.filter(item => { return [a.id].indexOf(item.id) === -1; });
                let projectData = {};
                    projectData.project_id = GetLocalStorage('current_projectData_A').project_id;
                    projectData.project_list = this.item;
                    projectData.project_name = GetLocalStorage('current_projectData_A').project_name;
                    SetLocalStorage('current_projectData_A',projectData);
              }
            })      
          }
        }).catch(() => {
          tipsMessage('取消删除','info',this)         
        });
      },
    logout () {
      publicSearch('rsa/logout',"POST",'').then((data) =>{
        successBack(data,this);
      })
    }  
  },
  watch:{
    $route (to,from){
      console.log(from)
      if(from.fullPath == '/index/clever/clever_content'){
        this.item = GetLocalStorage('current_projectData_A').project_list;
        this.current_item = GetLocalStorage('current_projectData_A').project_name;
      };
      if(from.path.slice(0,5) === '/main'){
        this.$store.state.router = from.path;
      };
    }/*,
    item:{
      handler:function(val,oldVal){
        console.log(val);
        console.log(oldVal);
        this.item = val;
        //this.current_item = GetLocalStorage('current_projectData_A').project_name;
      },
      deep: true
    }*/
  }
}
</script>

<style lang="scss" >
 .index_nav{
        .active{
          color: rgb(255,255,255) !important;
        }
        li > a {
          color: rgba(255,255,255,.6) !important;
          padding-bottom: 11px;
          font-size: 18px;
          outline: none;
          .el-dropdown{
            color:#e9e9e9;
            #sum{
              img{
               margin-top: -8px;opacity: 0.5;
              }
              img:hover{
                opacity: 1;
              }
              .is-fixed{
                padding: 1px 2px !important;
                top:8px;
                right:12px;
              }
            }
          }
        }  
    .collapse>ul>li:not(.admin):hover>a{
        color: rgb(255,255,255) !important;
        background: #090723;
      }
    .logout:hover{
      color: rgb(255,255,255) !important;
    }   
  } 
  .subnav{
    .el-tabs__nav a div{
      color: rgba(255,255,255,.6) !important;
    }
    .el-tabs__nav a:hover div{
      color: rgb(255,255,255) !important;
    }
    .el-tabs__nav a .is-active{
      color: rgb(255,255,255) !important;
    }
  }
</style>