<template>
<div class="">	
  <div class="index_nav container" >
  	<a href="#/index/clever"><img  src="../assets/p8.jpg" style="width:5%;border-radius: 30px"></a>     
        <ul class="nav navbar-nav navbar-right" >
          <li ><a href="#/main/list" :class="this.$route.path=='/all_net_analysis' ?  '' : 'active'" >舆情监测</a></li>
          <li><a href="#all_net_analysis" :class="this.$route.path=='/all_net_analysis' ?  'active' : ''">全网分析</a></li>
          <li>
            <a href="javascript:;" style="padding-bottom: 13px;">
              <el-dropdown  @command="handleCommand" >
                <el-badge :value="sum" id="sum" :max="99" style="left:-10px;">
                  <span class="el-dropdown-link">
                    消息通知<i class="fa fa-angle-down" style="font-size: 16px;margin-left: 3px;"></i>
                  </span>
                </el-badge>  
                <el-dropdown-menu slot="dropdown">
                 <!--  <router-link to="/main/list"> -->
                    <el-dropdown-item class="clearfix" v-for="i in data"  :command="i.name"   v-if="this.sum!==0">
                      {{i.name}}
                      <el-badge class="mark" :value="i.num" :max="99" />
                    </el-dropdown-item>
                  <!-- </router-link> -->
                    <el-dropdown-item v-if="this.sum==0" style="text-align: center;color:rgb(172,15,2)">无通知</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </a>
          </li>
          <li class="dropdown" >
            <a href="#" class="dropdown-toggle" style="background: rgb(57,57,57);" data-toggle="dropdown" >name <span class="caret"></span></a>
            <ul class="dropdown-menu" >         
              <li><a href="#1">Action</a></li>
              <li><a href="#1">Another action</a></li>
              <li><a href="#1">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
        </ul>   
	</div>
</div>	
</template>
<script >
export default{
  data: function () {
  	return {
      data:'',
      sum:''
  	}
  },
  mounted  :function () {
    console.log(this.$route.path);
    $('#sum .el-badge__content').css({'padding':'1px 5px','border':'0px solid #fff'});
    this.data=JSON.parse(window.sessionStorage.getItem('Rs_item'))||[{name:'艾弗森',num:5},{name:'招商银行',num:14},{name:'暗夜猎手',num:55},{name:'ofo',num:5},{name:'薛之谦',num:100}];
    let t=0
    for(let i=0;i<this.data.length;i++){
      t+=this.data[i].num;
    }
    this.sum=t;
  },
  methods:{
    handleCommand (command) {
      this.data=this.data.filter(item => { return command.indexOf(item.name) === -1; });//点击消息后删除
      /*window.sessionStorage.setItem('Rs_item_index',JSON.stringify(command));
      window.sessionStorage.setItem('Rs_item',JSON.stringify(this.data));*/
      window.location.reload();
      if(this.$route.path!=='/main/list'){
        window.location.href="#/main/list"
      }   
    }
  }
}
</script>

<style lang="scss" scoped>
  .index_nav{
    height: 60px;
    background: rgb(57,57,57);
    @media screen and (min-width:358px) {
    .navbar-right{
          float: right !important;
          margin-right: -15px;
        }
    .navbar-nav {
        .active{
          color:rgb(46,188,177);
        }
        margin:0;
        float: left;
        li > a {
          line-height: 30px;
          outline: none;
          .el-dropdown{
            color:#e9e9e9;
          }
        } 
      }  
    }
    >ul>li>a{
      color:rgb(233,233,233);
      background: rgb(57,57,57);
    } 
    >ul>li:hover>a{
        color:rgb(46,188,177);  
        background: rgb(57,57,57);
      } 
  }
</style>