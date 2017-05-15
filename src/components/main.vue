<template>  
  <div class="main container" style="background:snow;padding: 0;">
    <topnav></topnav>
    <div style="height:3px;width:100%;"></div>
    <div class="subnav" style="position: relative;">
        <span style="position: absolute;z-index: 999;top:12px;padding-left:10px;">当前项目<i class="
fa fa-angle-right " style="font-size: 16px;margin-left: 3px;"></i></span>
        <el-dropdown style="position: absolute;z-index: 999;top:12px;left:80px;"  @command="handleCommand">
              <span id="dropdown_start" style="cursor: pointer;"><b>{{current_item}}</b><i class="fa fa-angle-down" style="font-size: 16px;margin-left: 3px;"></i></span>                  
              <el-dropdown-menu slot="dropdown" id="dropdown_item"  >
                  <el-dropdown-item v-for="i in item" style="position:relative;" :command="i.name">{{i.name}}<i class="fa fa-times" @click.stop="del_item(i)" style="position:absolute;right: 0;"></i></el-dropdown-item>
                  <router-link to="/index/clever/clever_content" style="text-decoration: none;color: #13ce66"><button class="btn btn-info"><i class="el-icon-plus"></i>添加项目</button></router-link>
              </el-dropdown-menu>
        </el-dropdown>    
        <div class="el-tabs el-tabs--border-card">
          <div class="el-tabs__header">
            <div class="el-tabs__nav-wrap">
              <div class="el-tabs__nav-scroll">
                <div class="el-tabs__nav">
                  <router-link to="/main/list"><div :class="this.$route.path=='/main/list' ? 'el-tabs__item is-active' : 'el-tabs__item'">文章管理</div></router-link>
                  <router-link to="/main/keyword"><div :class="this.$route.path=='/main/keyword' ? 'el-tabs__item is-active' : 'el-tabs__item'">关键词管理</div></router-link>
                  <!-- <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" >位置提示</div></router-link>
                  <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'">指数提示</div></router-link> -->
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <transition><router-view></router-view></transition>
  </div>
</template>
<script >
import topnav from './top_nav.vue'
  export default{
    data : function(){ 
      return{
        current_item:'',
        item: ''
      }
    },
    components:{
      topnav
    },
    methods:{
      handleCommand(command){
        //this.current_item=command;
        //window.sessionStorage.setItem('current_project',JSON.stringify(command));
        window.sessionStorage.setItem('start',JSON.stringify(command));
        for(let i=0;i<this.item.length;i++){
          if(this.item[i].name===command){
            window.sessionStorage.setItem('project_id',JSON.stringify(this.item[i].id))
          }
        }
        window.location.reload();
        
      },
      del_item(a) {
        let _this=this;
        this.$confirm('是否删除'+' '+a.name+' '+'项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(a.name===_this.current_item){
              $.ajax({
                 type: "POST",
                 url: 'api/v1.1/project',
                 traditional: true,
                 data: {
                     "method": 'delete',
                     "projectIdList": [a.id],
                 },
                 success: function(data){
                    if(data.success==true){
                      $.ajax({
                         type: "GET",
                         url: 'api/v1.1/project',
                         traditional: true,
                         data: {
                             "method": 'get'
                         },
                         success: function(data){
                            if(data.data.projectList.length<1){
                              window.location.href='#/index/clever'
                            }else{
                               _this.item=data.data.projectList;
                               window.sessionStorage.setItem('start',JSON.stringify(data.data.projectList[0].name));
                              window.sessionStorage.setItem('project_id',JSON.stringify(data.data.projectList[0].id));
                              window.location.reload();
                            }
                         }
                      })
                    }
                 }
             }) 
          }else{
                $.ajax({
                 type: "POST",
                 url: 'api/v1.1/project',
                 traditional: true,
                 data: {
                     "method": 'delete',
                     "projectIdList": [a.id],
                 },
                 success: function(data){
                    if(data.success==true){
                      $.ajax({
                         type: "GET",
                         url: 'api/v1.1/project',
                         traditional: true,
                         data: {
                             "method": 'get'
                         },
                         success: function(data){
                            if(data.data.projectList.length<1){
                              window.location.href='#/index/clever'
                            }else{
                               _this.item=data.data.projectList;
                            }
                         }
                      })
                    }
                 }
             })        
          }

          //前端删除
          /*let idarr=[];
          idarr.push(a.id)
          this.item=this.item.filter(item => { return idarr.indexOf(item.id) === -1; });*/
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    mounted:function (){
    //console.log(JSON.parse(window.sessionStorage.getItem('start')))
      if(JSON.parse(window.sessionStorage.getItem('start'))==null){
      let _this=this; 
      $.ajax({
         type: "GET",
         url: 'api/v1.1/project',
         traditional: true,
         data: {
             "method": 'get'
         },
         success: function(data){
            if(data.data.projectList.length<1){
              window.location.href='#/index/clever'
            }else{
               _this.item=data.data.projectList;
               _this.current_item=data.data.projectList[0].name;
            }
         }
      })
    }else{
      let _this=this; 
      $.ajax({
         type: "GET",
         url: 'api/v1.1/project',
         traditional: true,
         data: {
             "method": 'get'
         },
         success: function(data){
            _this.item=data.data.projectList;
         }
      })
       this.current_item=JSON.parse(window.sessionStorage.getItem('start'));
    }
      $('.el-tabs__item').click(function(){
        $(this).addClass('is-active');
        $(this).parent().parent().find('.el-tabs__item').not($(this)).removeClass('is-active')
      });
  }
}
</script>
<style lang="scss" >
.main{
  height:auto;
  .subnav{
    .el-tabs--border-card .el-tabs__nav{
      padding-left: 33% ;
      a{
        outline: none;
      }
    }
    .el-tabs--border-card>.el-tabs__content{
      display: none !important;
     
    }
    >.el-dropdown {
      .el-button{
        padding: 2px 8px;
      }
      i{
        font-size: 12px;
      }
      .show{
        display: block;
      }
    }
  }
}
</style>