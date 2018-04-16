<template>
  <div class="index_nav" >
    <!--
      进入系统后 弹窗画面
    -->
    <!-- <el-dialog class="model_picture" v-model="enter_picture" :top="dialog_top" :show-close="showClosebtn" :before-close="handleClose">
      <img class="eject_picture" src="../assets/img/enterPicture.png" style="position:absolute;" >
      <img src="../assets/img/ev_del2.png" style="z-index:2100;position:relative;left:1139.5px;top:72px" @click="picture_close">
    </el-dialog> -->
        <ul  style="height: 78px;position: relative; ">
          <li style="position: absolute;left:30px;width: 185px;top:18px;"><a href="#/main/list"><img src="../assets/icon/logo_2.0.png"  ></a></li>
          <!-- <li style="margin-left: 2%;"><a href="#/main/list" :class="this.$route.path=='/all_net_analysis' ?  '' : 'active'" >舆情监测</a></li> -->
          <!-- <li><a href="#all_net_analysis" :class="this.$route.path=='/all_net_analysis' ?  'active' : ''">全网分析</a></li>
          <li><a href="javascript:;" style="line-height:38px;font-size: 18px"><b>. . .</b></a></li> -->
           <!-- <li  style="position: absolute;right: 100px;">
            <div style="padding:0 20px; height: 50px;border:1px solid #2196f3;margin-top:15px;border-radius:60px; ">
              <span style="color:rgba(255,255,255,0.5);line-height: 50px;font-size: 16px;">{{dropdownTopic}}</span>
              <el-dropdown style="margin-left: 5px;font-size: 16px;"  trigger="click" @command="handleCommand">
                <span id="dropdown_start" v-show="this.$route.path!=='/index/clever/clever_content'" v-if="this.$route.path!=='/index/clever/clever_content_next'"><span style="cursor: pointer;color: white;" ></span><img src="../assets/icon/选择（16×７px）.png" style="font-size: 18px;color: white;margin-left: 12px;"></span>
                <el-dropdown-menu slot="dropdown" id="dropdown_item" style="top:10px;margin: 0px 30px;background-color:#2f3243; border: 1px solid rgb(33, 150, 243);border-radius:10px;">
                    <el-dropdown-item v-for="i in item" style="position:relative;" :command="i.name">{{i.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
                     </li> -->
          <!-- <li style="display: none;">
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
          <li class="dropdown" style="position: absolute;right: 30px;" >
            <img  src="../assets/p8.jpg" style="width:50px;height:50px;border-radius: 30px;margin-top: 15px;" class="dropdown-toggle" data-toggle="dropdown">
            <ul class="dropdown-menu" style="min-width: 80px;right: 0;z-index:100000" id="admin">
             <!-- <li><el-button type="text" style="color:black;margin-left:3px;" @click="dropdown_keyword" >关键词列表</el-button></li> -->
             <!--  <li><a href="#1">two</a></li>
             <li><a href="#1">three</a></li>
             <li role="separator" class="divider"></li> -->
              <li ><img src="../assets/icon/logout.png" style="padding-left: 5px;"><a href="logout" style="padding: 5px;font-size: 14px;color: #333;line-height: 20px;display: inline-block" @click="logout">注销</a></li>
            </ul>
          </li>
        </ul>
        <el-dialog title="关键词详情" v-model="el_dropdown_keyword" size="tiny">
          <span>当前关键词</span>
          <div class="keyword_now">
            <p style="font-size: 14px;">必须包含词：<span v-show="key_must_now.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_must_now">{{i}}&nbsp;&nbsp;</span></p>
            <p style="font-size: 14px;">任一包含词：<span v-show="key_any_now.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_any_now">{{i}}&nbsp;&nbsp;</span></p>
            <p style="font-size: 14px;">标题排除词：<span v-show="key_title_now.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_title_now">{{i}}&nbsp;&nbsp;</span></p>
            <p style="font-size: 14px;">内容排除词：<span v-show="key_content_now.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_content_now">{{i}}&nbsp;&nbsp;</span></p>
          </div class>
          <div v-show = "show_keyword_last">
            <span>上一次查询关键词</span>
            <div class="keyword_last" >
              <p style="font-size: 14px;">必须包含词：<span v-show="key_must_last.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_must_last">{{i}}&nbsp;&nbsp;</span></p>
              <p style="font-size: 14px;">任一包含词：<span v-show="key_any_last.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_any_last">{{i}}&nbsp;&nbsp;</span></p>
              <p style="font-size: 14px;">标题排除词：<span v-show="key_title_last.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_title_last">{{i}}&nbsp;&nbsp;</span></p>
              <p style="font-size: 14px;">内容排除词：<span v-show="key_content_last.length==0" style="color:rgb(243, 76, 129)">无</span><span v-for="i in key_content_last">{{i}}&nbsp;&nbsp;</span></p>
            </div>
          </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="el_dropdown_keyword = false">确 定</el-button>
            </span>
         </el-dialog>
	</div>
</template>
<script >
// import keywordlog from './main/topnav_dropdown_menu/dropdown_Keyword.vue'

export default{

  data: function () {
  	return {
      dropdownTopic:"",
      dialog_top:"0",
      showClosebtn:false,
      enter_picture:JSON.parse((window.sessionStorage.getItem("enter_picture"))==null ? true:sessionStorage.getItem("enter_picture")),
      el_dropdown_keyword :false,
      data:'',
      sum:'',
      item: '',
      key_must_now:[],
      key_any_now:[],
      key_title_now:[],
      key_content_now:[],
      key_must_last:[],
      key_any_last:[],
      key_title_last:[],
      key_content_last:[],
      show_keyword_last:false
  	}
  },

  mounted:function () {

        $('.model_picture .el-dialog').css('left',(window.screen.width-1200)*0.5+'px');
        $('.eject_picture').css('width',document.documentElement.clientWidth+'px');
     $('.index_nav').css('width',document.documentElement.clientWidth+'px');
    //  $('#admin li').hover(function(){
    //     $(this).css('background-color','rgba(0, 179, 138,.1)')
    //   },function(){
    //     $(this).css('background-color','white')
    //   })
    // $('#admin li a').hover(function(){
    //     $(this).css('background-color','rgba(0, 179, 138,0)')
    //   },function(){
    //     $(this).css('background-color','rgba(0, 179, 138,0)')
    //   })
    $('#sum .el-badge__content').css({'padding':'1px 5px','border':'0px solid #fff'});
    /*this.data=JSON.parse(window.sessionStorage.getItem('Rs_item'))||[{name:'艾弗森',num:5},{name:'招商银行',num:14},{name:'暗夜猎手',num:55},{name:'ofo',num:5},{name:'薛之谦',num:100}];*/
    let t=0
    for(let i=0;i<this.data.length;i++){
      t+=this.data[i].num;
    }

    this.sum=t;
    //this.getProjectlist();
   /* if(JSON.parse(window.sessionStorage.getItem('start'))==null){
      let _this=this;
      $.ajax({
         type: "GET",
         url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
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
              window.sessionStorage.setItem('start',JSON.stringify(_this.current_item));
            }
         }
      })
    }else{
      let _this=this;
      $.ajax({
         type: "GET",
         url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
         traditional: true,
         data: {
             "method": 'get'
         },
         success: function(data){
            _this.item=data.data.projectList;
         }
      })
       this.current_item=JSON.parse(window.sessionStorage.getItem('start'));
    }*/
  },
  methods:{
    getProjectlist:function(){
      //console.log("getProjectlist:function()");
      let _this = this;
      var userbId = window.localStorage.getItem('userID_B');
      var projId= window.localStorage.getItem('project_id_B');
      console.log(projId);
      //console.log("getProjectlist:function()");
      $.ajax({
        type:"GET",
        url: 'http://192.168.1.2:8090/rssysb/http://192.168.0.3:9010/rssysc/api/v1.0/userb/'+userbId+'/project',
        xhrFields: {
					withCredentials: true
        },
        headers:{'X-Requested-With': 'XMLHttpRequest'},
				crossDomain: true,
        data:{
          "method":'get',
          "userBId":userbId,
        },
        success:function(data){
          //console.log("ajax success!!!");
          // //console.log(data.data);
          if (data.code == 1004) {
            _this.$message({
              message:"登录失效！需要跳转到登录页面重新认证!",
              type: 'warning'
            });
            window.location.href=this.url+"?successCallbackUrl="+window.document.location.href;
          } else {
            // //console.log(data);
            _this.item = data.data;

            //console.log("_this.item");
            //console.log(_this.item);
            if(_this.item==null){
              _this.dropdownTopic="当前没有项目";
            }else{
              //console.log("success!!!");
              if (window.localStorage.getItem('project_id_B') == null) {
                window.localStorage.setItem('project_id_B',JSON.stringify(_this.item[0].id));

              }

              //console.log("data");
              //console.log(data);
              if((window.sessionStorage.getItem('start'))==null){
                _this.dropdownTopic=_this.item[0].name;
                window.sessionStorage.setItem('start',JSON.stringify(_this.item[0].name));
              } else {
                  //console.log("22222222222");
                _this.dropdownTopic=JSON.parse(window.sessionStorage.getItem('start'));

              }


            }
            // //console.log(_this.dropdownTopic);
          }
      }
    });

    },
    dropdown_keyword:function(){
      let _this = this;
      this.el_dropdown_keyword= true;
      //console.log();
      let userbId='360FCD9CF5';
      let proId='abcde';

      $.ajax({
                type: "GET",
                url: 'http://192.168.1.2:8090/rssysb/http://192.168.0.3:9010/rssysc/api/v1.0/userb/'+userbId+'/project/'+proId+'/keywordlog',
                traditional: true,
                  xhrFields: {
                  withCredentials: true,
                  },
                 headers:{'X-Requested-With': 'XMLHttpRequest'},
                  crossDomain: true,
                data: {
                 "method": 'get',
                },
                success: function(data){
                  if (data.code == 1004) {
                    _this.$message({
                      message:"登录失效！需要跳转到登录页面重新认证!",
                      type: 'warning'
                    });
                    window.location.href=this.url+"?successCallbackUrl="+window.document.location.href;
                  } else {
                    if (data == null) {
                      _this.$message({
                        message:'无法获取关键词列表',
                        type: 'warning',
                      });
                    } else {
                      //获取数据成功
                      if(data.data.keywordMapList.length <= 1){
                        _this.show_keyword_last = false;
                        _this.key_must_now = data.data.keywordMapList[0].mustIncludeKeywordList;
                        _this.key_any_now = data.data.keywordMapList[0].anyIncludeKeywordList;
                        _this.key_title_now = data.data.keywordMapList[0].titleNotIncludeKeywordList;
                        _this.key_content_now = data.data.keywordMapList[0].contentNotIncludeKeywordList;
                      }else{
                        _this.show_keyword_last = true;
                        _this.key_must_now = data.data.keywordMapList[0].mustIncludeKeywordList;
                        _this.key_any_now = data.data.keywordMapList[0].anyIncludeKeywordList;
                        _this.key_title_now = data.data.keywordMapList[0].titleNotIncludeKeywordList;
                        _this.key_content_now = data.data.keywordMapList[0].contentNotIncludeKeywordList;
                        _this.key_must_last = data.data.keywordMapList[1].mustIncludeKeywordList;
                        _this.key_any_last = data.data.keywordMapList[1].anyIncludeKeywordList;
                        _this.key_title_last = data.data.keywordMapList[1].titleNotIncludeKeywordList;
                        _this.key_content_last = data.data.keywordMapList[1].contentNotIncludeKeywordList;
                      }
                    }
                      //console.log(data.success);
                      //console.log(data.message);
                      //console.log(data.data);

                  }
                  }

        });
    },
    handleCommand_xiaoxi (command) {
      this.data=this.data.filter(item => { return command.indexOf(item.name) === -1; });//点击消息后删除
      /*window.sessionStorage.setItem('Rs_item_index',JSON.stringify(command));
      window.sessionStorage.setItem('Rs_item',JSON.stringify(this.data));*/
      window.location.reload();
      if(this.$route.path!=='/main/list'){
        window.location.href="#/main/list"
      }
    },
    handleCommand(command){
      //console.log("command");
        //console.log(command);
        //this.current_item=command;
        //window.sessionStorage.setItem('current_project',JSON.stringify(command));

        window.sessionStorage.setItem('start',JSON.stringify(command));
        //console.log("item.length"+this.item.length);
        for(let i=0;i<this.item.length;i++){

          if(this.item[i].name===command){
            window.localStorage.setItem('project_id_B',JSON.stringify(this.item[i].id));

          }
        }
        localStorage.removeItem('project_id_B');
        sessionStorage.removeItem('enter_picture');
        localStorage.removeItem('userID_B');
        sessionStorage.removeItem('start');
        window.location.reload();

    },
    picture_close(done){

      this.handleClose(done);
    },
    handleClose(done){
        let _this = this;
        _this.enter_picture = false;
        //console.log("handleclose");
        sessionStorage.setItem("enter_picture",false);

    },
    dropdown_click(){
      //console.log("asda");
    },
    // del_item(a) {
    //     let _this=this;
    //     this.$confirm('是否删除'+' '+a.name+' '+'项目?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       if(a.name===_this.current_item){
    //           $.ajax({
    //              type: "POST",
    //              url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
    //              traditional: true,
    //              data: {
    //                  "method": 'delete',
    //                  "projectIdList": [a.id],
    //              },
    //              success: function(data){
    //                 if(data.success==true){
    //                   $.ajax({
    //                      type: "GET",
    //                      url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
    //                      traditional: true,
    //                      data: {
    //                          "method": 'get'
    //                      },
    //                      success: function(data){
    //                         if(data.data.projectList.length<1){
    //                           window.location.href='#/index/clever'
    //                         }else{
    //                            _this.item=data.data.projectList;
    //                            window.sessionStorage.setItem('start',JSON.stringify(data.data.projectList[0].name));
    //                           window.sessionStorage.setItem('project_id_B',JSON.stringify(data.data.projectList[0].id));
    //                           window.location.reload();
    //                         }
    //                      }
    //                   })
    //                 }
    //              }
    //          })
    //       }else{
    //             $.ajax({
    //              type: "POST",
    //              url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
    //              traditional: true,
    //              data: {
    //                  "method": 'delete',
    //                  "projectIdList": [a.id],
    //              },
    //              success: function(data){
    //                 if(data.success==true){
    //                   $.ajax({
    //                      type: "GET",
    //                      url: 'http://192.168.0.3:9010/rssysc/api//v1.1/project',
    //                      traditional: true,
    //                      data: {
    //                          "method": 'get'
    //                      },
    //                      success: function(data){
    //                         if(data.data.projectList.length<1){
    //                           window.location.href='#/index/clever'
    //                         }else{
    //                            _this.item=data.data.projectList;
    //                         }
    //                      }
    //                   })
    //                 }
    //              }
    //          })
    //       }
    //
    //       //前端删除
    //       /*let idarr=[];
    //       idarr.push(a.id)
    //       this.item=this.item.filter(item => { return idarr.indexOf(item.id) === -1; });*/
    //     }).catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });
    //     });
    //   },
    logout () {
      //window.sessionStorage.clear();
    },



  }
}
</script>

<style lang="scss" >
  .index_nav{
    ul>li{
      list-style: none ;
    }
    height: 78px;
    background: #2d2d4a;
  list-style: none;
    .navbar-nav {
        .active{
          color:rgb(255,255,255);
        }
        li > a {
          font-size: 18px;
          outline: none;
          .el-dropdown{

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

    >ul>li>a{
      color:rgba(255,255,255,0.5);
      background: #2f3243;
    }
    >ul>li>a:focus{
      color:rgba(255,255,255,0.5);
      background: #2f3243;
    }
    >ul>li:hover>a{
        color:rgb(255,255,255);
        background: #2f3243;
      }
  }

  .el-dialog__body{
    padding: 20px;
  }

  .keyword_now ,.keyword_last{
    padding: 10px;
    border:1px solid gray;
    margin-bottom: 20px;
  }

  .model_picture div{
    top:0px;
    padding:0px;
    width:0px;
    height: 0px;

  }
  .model_picture{
      z-index: 100000 !important;
  }
</style>
