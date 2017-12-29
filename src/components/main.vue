<template>  
<div>
<topnav></topnav>
  <div class="main container" style="background:#ffffff;padding: 0;">
    <div style="height:40px;width:100%;"></div>
    <div class="subnav" style="position: relative;padding-left: 20px;padding-right: 20px;">
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
      <div class="el-tabs el-tabs--card">
        <div class="el-tabs__header">
          <div class="el-tabs__nav-wrap">
            <div class="el-tabs__nav-scroll">
              <div class="el-tabs__nav">
                <router-link to="/main/list"><div :class="this.$route.path=='/main/list' ? 'el-tabs__item is-active' : 'el-tabs__item'">文章管理</div></router-link>
                <router-link to="/main/keyword"><div :class="this.$route.path=='/main/keyword' ? 'el-tabs__item is-active' : 'el-tabs__item'">关键词管理</div></router-link>
                <router-link to="/main/event"><div :class="this.$route.path=='/main/event' ? 'el-tabs__item is-active' : 'el-tabs__item'">事件管理</div></router-link>
                <router-link to="/main/org"><div :class="this.$route.path=='/main/org' ? 'el-tabs__item is-active' : 'el-tabs__item'">组织关系管理</div></router-link>
                <router-link to="/main/media"><div :class="this.$route.path=='/main/media' ? 'el-tabs__item is-active' : 'el-tabs__item'">媒体关系管理</div></router-link><router-link to="/main/compet"><div :class="this.$route.path=='/main/compet' ? 'el-tabs__item is-active' : 'el-tabs__item'">竞品管理</div></router-link>
                <!-- <router-link to="/main/position"><div :class="this.$route.path=='/main/position' ? 'el-tabs__item is-active' : 'el-tabs__item'" >位置提示</div></router-link>
                <router-link to="/main/indexnumber"><div :class="this.$route.path=='/main/indexnumber' ? 'el-tabs__item is-active' : 'el-tabs__item'">指数提示</div></router-link> -->
              </div>
            </div>
          </div>
        </div>
      </div> 

      <!--  <el-tabs v-model="activeName2" type="card" >
          <el-tab-pane label="文章管理" name="first"></el-tab-pane>
          <el-tab-pane label="关键词管理" name="second"></el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
       </el-tabs>  -->
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
     Ajax(Data){
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $.ajax({
                type: "POST",
                url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/event/update',
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
    watch:{
      $route (to,from){
        if(from.path==='/main/event'){
          this.$store.state.start_data= this.$store.state.data;
          //console.log(this.$store.state.EventIds)
          /*for(let i=0;i<this.$store.state.start_data.length;i++){
              //data第一层判断
                if(this.$store.state.start_data[i].label!==this.$store.state.data[i].label||this.$store.state.start_data[i].articleList.length!==this.$store.state.data[i].articleList.length||this.$store.state.start_data[i].keywordList.length!==this.$store.state.data[i].keywordList.length||this.$store.state.start_data[i].perList.length!==this.$store.state.data[i].perList.length||this.$store.state.start_data[i].locList.length!==this.$store.state.data[i].locList.length||this.$store.state.start_data[i].orgList.length!==this.$store.state.data[i].orgList.length){
                  //console.log(this.$store.state.articleList_idarr)
                      this.$confirm('是否保存对事件管理模块的修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                      }).then(() => {
                          this.$store.state.start_data= this.$store.state.data;
                          //this.Ajax(this.$store.state.ajax_data);
                      }).catch(() => {
                        this.$store.state.data=this.$store.state.start_data;
                        this.$store.state.ajax_data=[];
                      })
                }else{  //data 第二层判断
                  for(let j=0;j<this.$store.state.start_data[i].perList.length;j++){ //data 第二层 perlist判断
                    if(this.$store.state.start_data[i].perList[j].eventArticleList.length!==this.$store.state.data[i].perList[j].eventArticleList.length){
                      this.$confirm('是否保存对事件管理模块的修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                        }).then(() => {
                           this.$store.state.start_data= this.$store.state.data;
                           //this.Ajax(this.$store.state.ajax_data);
                        }).catch(() => {
                          this.$store.state.data=this.$store.state.start_data;
                          this.$store.state.ajax_data=[];
                        })
                      }
                    }
                  for(let j=0;j<this.$store.state.start_data[i].locList.length;j++){ //data 第二层 perlist判断
                    if(this.$store.state.start_data[i].locList[j].eventArticleList.length!==this.$store.state.data[i].locList[j].eventArticleList.length){
                      this.$confirm('是否保存对事件管理模块的修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                        }).then(() => {
                           this.$store.state.start_data= this.$store.state.data;
                          // this.Ajax(this.$store.state.ajax_data);
                        }).catch(() => {
                          this.$store.state.data=this.$store.state.start_data;
                          this.$store.state.ajax_data=[];
                        })
                      }
                    }
                  for(let j=0;j<this.$store.state.start_data[i].orgList.length;j++){ //data 第二层 perlist判断
                    if(this.$store.state.start_data[i].orgList[j].eventArticleList.length!==this.$store.state.data[i].orgList[j].eventArticleList.length){
                      this.$confirm('是否保存对事件管理模块的修改?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                        type: 'warning'
                        }).then(() => {
                           this.$store.state.start_data= this.$store.state.data;
                        }).catch(() => {
                          this.$store.state.data=this.$store.state.start_data;
                          this.$store.state.ajax_data=[];
                        })
                      }
                    }  
                  }
              }*/
        }else{}
      }
    },
    mounted:function (){
      let _this=this;
      $('.el-tabs__item').click(function(){
        $(this).addClass('is-active');
        $(this).parent().parent().find('.el-tabs__item').not($(this)).removeClass('is-active');
      });
      
  }
}
</script>
<style lang="scss" >
.main{
  height:auto;
  .subnav{
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