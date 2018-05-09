<template>
  <div class="index_nav" >     
        <ul class="nav navbar-nav " style="width: 1250px;;margin: 0 auto;position: relative; ">
          <li><a href="#/main/refer"><img src="../assets/icon/793549342520256102.png" style="margin-top: -16px;" ></a></li>
          <li style="margin-left: 2%;"><a href="#/main/refer" :class="this.$route.path=='/main/refer' ?  'active' : ''" >舆情监测</a></li>
          <!-- <li><a href="#custom" :class="this.$route.path=='/custom' ?  'active' : ''">客户管理</a></li>
          <li><a href="#all_net_analysis" :class="this.$route.path=='/all_net_analysis' ?  'active' : ''">全网分析</a></li> -->
          <li><a href="javascript:;" style="line-height:38px;font-size: 18px"><b>. . .</b></a></li>
          <li  style="position: absolute;right: 80px;">
            <span style="color:rgba(255,255,255,0.5);line-height: 78px;font-size: 18px;">当前项目<i class="fa fa-angle-right " style="font-size: 18px;margin-left: 3px;color:rgba(255,255,255,0.5)"></i></span>
            <el-dropdown style="margin-left: 5px;font-size: 18px;"  @command="handleCommand">
              <span id="dropdown_start" v-show="this.$route.path!=='/index/clever/clever_content'" v-if="this.$route.path!=='/index/clever/clever_content_next'"><span style="cursor: pointer;color: white;" >{{current_item}}</span><img src="../assets/icon/选择（16×７px）.png" style="font-size: 18px;color: white;margin-left: 12px;"></span>                  
              <el-dropdown-menu slot="dropdown" id="dropdown_item"  >
                  <el-dropdown-item v-for="i in item" style="position:relative;" :command="i.name">{{i.name}}<img src="../assets/icon/del.png" @click.stop="del_item(i)" style="position:absolute;right: 4px;;top:10px;"></el-dropdown-item>
                  <!-- <router-link to="/index/clever/clever_content" style="text-decoration: none;color: #13ce66"><span style="color:#00b38a"><i class="el-icon-plus"></i>添加项目</span></router-link>  -->
                  <router-link to="/index/clever/clever_content" style="text-decoration: none;color:#00b38a;"><li style="list-style: none;line-height: 36px;padding: 0 10px;margin: 0;position: relative;cursor: pointer;"><i class="el-icon-plus"></i>添加项目</li></router-link> 
              </el-dropdown-menu>
            </el-dropdown>
          </li>
         <!--  <li style="display: none;">
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
         </li> -->
          <li class="dropdown" style="position: absolute;right: 0;" >
            <img  src="../../static/img/p8.jpg" style="width:50px;height:50px;border-radius: 30px;margin-top: 15px;" class="dropdown-toggle" data-toggle="dropdown">
            <ul class="dropdown-menu" style="min-width: 80px;" id="admin">         
             <!--  <li><a href="javascript:;">one</a></li>
             <li><a href="#1">two</a></li> -->
              <li style="text-align: center"><el-tooltip :content="'账号: '+account" placement="left" effect="light"><a href="javascript:;" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block;cursor: default;" >{{account.length > 8 ? account.slice(0,8)+'..' : account}}</a></el-tooltip></li>
              <li role="separator" class="divider"></li>
              <li ><img src="../assets/icon/logout.png" style="padding-left: 5px;"><a href="javascript:;" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block" @click="logout">注销</a></li>
            </ul>
          </li>
        </ul>   
	</div>	
</template>
<script >
import { publicSearch,successBack,GetSessionStorage,SetSessionStorage,notify,GetLocalStorage,tipsMessage }  from '../assets/js/map.js'
export default{
  data: function () {
  	return {
      data:'',
      sum:'',
      current_item:'',
      item: '',
      account:GetLocalStorage('account_A') == null ? '未登录' : GetLocalStorage('account_A')
  	}
  },
  mounted  :function () {
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
    this.search();     
  },
  methods:{
    search(){
      let params = {"projectDto": JSON.stringify({"method": 'get'})};
      publicSearch('rsa/project',"GET",params).then((data) =>{
        if(successBack(data,this)){
          console.log(data)
          if(data.data != null || data.data.length > 0){
            if(data.data.length<1){//项目列表少于一跳转
              notify('提示',data.message,'warning',this);
              window.location.href='#/index/clever';
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
      });
    },
    handleCommand_xiaoxi (command) {
      this.data=this.data.filter(item => { return command.indexOf(item.name) === -1; });//点击消息后删除
      window.location.reload();
      if(this.$route.path!=='/main/list'){
        window.location.href="#/main/list"
      }   
    },
    handleCommand(command){
        for(let i=0;i<this.item.length;i++){
          if(this.item[i].name === command){
            SetSessionStorage('start',command);
            SetSessionStorage('project_id',this.item[i].id);
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
          type: 'warning'
        }).then(() => {
          let params = {"projectDto": JSON.stringify({"method": 'delete',"projectIdList": [a.id]})};
          if(a.name === this.current_item){
            publicSearch('rsa/project',"POST",params).then((data) =>{
              if(successBack(data,this)){
                sessionStorage.removeItem('start');
                window.location.reload();
              }
            })
          }else{
            publicSearch('rsa/project',"POST",params).then((data) =>{
              if(successBack(data,this)){
                this.item = this.item.filter(item => { return [a.id].indexOf(item.id) === -1; });
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
      /*$route (to,from){
        console.log(from)
        if(from.path==='/main/event'){
          console.log(4555)
        }
      }*/
    }
}
</script>

<style lang="scss" >
  .index_nav{
    
    height: 78px;
    background: #090723;
    @media screen and (min-width:768px) {
    .navbar-nav {
        float: none;
        .active{
          color:rgb(255,255,255);
        }
        li > a {
          padding-bottom: 11px;
          padding-top: 19px;
          font-size: 18px;
          line-height: 48px;
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
      }  
    }
    >ul>li>a{
      color:rgba(255,255,255,0.5);
      background: #090723;
    } 
    >ul>li>a:focus{
      color:rgba(255,255,255,0.5);
      background: #090723;
    } 
    >ul>li:hover>a{
        color:rgb(255,255,255); 
        background: #090723;
      } 
  }
</style>