<template>
<div class="org " style="background-color: #212336;height: 2500px;position: relative;left: 150px;">
      <div class="panel panel-default" style="width: 65%;position: absolute">
        <div class="panel-heading">
          <span>用户信息</span> 
          <el-input
            placeholder="查找账号或用户名.."
            icon="search"
            v-model="search_input"
            :on-icon-click="handleIconClick"
            @change="search_data">
          </el-input>
        </div>
        <div class="panel-body" style="padding-bottom: 40px">
          <div class="loader" v-show="loading">
              <span class="loader-inner">Loading...</span>
          </div>
          <el-table
            :data="userAList_userA"
            v-show="!loading"
            @sort-change="time_sort_list"
            border
            style="width: 100%">
            <el-table-column
              label="账号"
              width=110
              show-overflow-tooltip>
              <template scope="scope"><span v-show="scope.row.isOnline==1" style="border: 1px solid #dcdcdc;padding: 1px 3px;border-radius: 4px;display: inline-block;color:#00b38a;font-size: 12px;line-height: 14px;">在线</span> {{ scope.row.account}}</template>
            </el-table-column>
            <el-table-column
             label="用户名"
             show-overflow-tooltip
             width=80>
             <template scope="scope">{{scope.row.username}}</template>
           </el-table-column>
           <el-table-column
             label="项目列表"
             width=140
             show-overflow-tooltip>
             <template scope="scope">
                  <el-dropdown @command="handleCommand" v-show="scope.row.projectList.length>0">
                    <span class="el-dropdown-link">
                      {{scope.row.projectList.length>0? scope.row.projectList[0].name : ''}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="i in scope.row.projectList" :command="scope.row.id+',projectId:'+i.id">{{i.name}}</el-dropdown-item> 
                    </el-dropdown-menu>
                  </el-dropdown>
              </template>
           </el-table-column>>
           <el-table-column
              label="客户列表"
              width=130
              show-overflow-tooltip>
              <template scope="scope">
                <el-dropdown @command="handleCommand_user" v-show="scope.row.userBList.length>0">
                    <span class="el-dropdown-link">
                      {{scope.row.userBList.length>0 ? scope.row.userBList[0].username : ''}}<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="i in scope.row.userBList" :command="scope.row.id+',projectId:'+i.id">{{i.username}}</el-dropdown-item> 
                    </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column
             label="登录次数"
             show-overflow-tooltip
             sortable
             width=90>
             <template scope="scope">{{ scope.row.loginCount}}</template>
           </el-table-column>
            <el-table-column
              label="创建时间"
              show-overflow-tooltip
              width=160>
              <template scope="scope">{{ scope.row.createTime}}</template>
            </el-table-column>
            <el-table-column
              label="累计时间"
              show-overflow-tooltip
              sortable
              width=100>  
              <template scope="scope">{{ scope.row.onlineTime}}</template>    
            </el-table-column>
            <el-table-column
              label="操作"
              show-overflow-tooltip>
              <template scope="scope"><el-button type="success" style="padding: 6px 5px;" @click="login_log(scope.row)">查看登录日志</el-button></template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="page"
            @current-change="handleCurrentChange_userA"
            :current-page="currentPage_userA"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_userA"
            layout="total,  prev, pager, next, jumper"
            :total="this.userAList.length"
            v-show="this.userAList.length!==0">
          </el-pagination>
        </div>
      </div>
      <div class="panel panel-default" style="width: 34%;position: absolute;left: 66%">
        <div class="panel-heading">
          <span>关键词日志&nbsp;&nbsp;<span v-show="this.current_username!=''">({{current_username}} <span style="color: red;">></span> {{current_project}})</span></span> 
        </div>
        <div class="panel-body" style="padding-bottom: 40px">
          <el-collapse v-model="activeNames" >
            <el-collapse-item title="当前关键词" name="1">
              <div>时间：<span>当前</span></div>
              <div>必须包含词：<span v-for="i in this.keywordMapList[this.keywordMapList.length-1].mustIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.keywordMapList[this.keywordMapList.length-1].mustIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>任一包含词：<span v-for="i in this.keywordMapList[this.keywordMapList.length-1].anyIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.keywordMapList[this.keywordMapList.length-1].anyIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>标题排除词：<span v-for="i in this.keywordMapList[this.keywordMapList.length-1].titleNotIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.keywordMapList[this.keywordMapList.length-1].titleNotIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>内容排除词：<span v-for="i in this.keywordMapList[this.keywordMapList.length-1].contentNotIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.keywordMapList[this.keywordMapList.length-1].contentNotIncludeKeywordList.length==0" style="color:red;">无</span></div>
            </el-collapse-item>
            <el-collapse-item title="历史关键词" name="2" v-show="this.keywordMapList.length>1">
              <div>时间：<span>{{this.current_keywordMapList.createTime}}</span></div>
              <div>必须包含词：<span v-for="i in this.current_keywordMapList.mustIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.current_keywordMapList.mustIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>任一包含词：<span v-for="i in this.current_keywordMapList.anyIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.current_keywordMapList.anyIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>标题排除词：<span v-for="i in this.current_keywordMapList.titleNotIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.current_keywordMapList.titleNotIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <div>内容排除词：<span v-for="i in this.current_keywordMapList.contentNotIncludeKeywordList">{{i}}&nbsp;&nbsp;</span><span v-show="this.current_keywordMapList.contentNotIncludeKeywordList.length==0" style="color:red;">无</span></div>
              <el-button-group style="margin-left: 60%;">
                <el-button type="success" icon="arrow-left" style="padding:4px;background-color: #00b38a;border-color: #00b38a;border-right-color: rgba(225,225,225,.5)" :disabled="prev_btn" @click="prev_btn_click">上一页</el-button>
                <el-button type="primary" @click="next_btn_click" style="padding: 4px;background-color: #00b38a;border-color: #00b38a;border-left-color: rgba(225,225,225,.5)" :disabled="next_btn">下一页<i class="el-icon-arrow-right el-icon--right"  ></i></el-button>
              </el-button-group>
            </el-collapse-item>
          </el-collapse>  
        </div>
      </div>  
     <div class="footer" style="position: absolute;bottom: 0px;height:130px;background-color: #111111;">
      <ul id="footer">
        <li><a href="http://www.rsact.com/">锐思官网</a>|</li>
        <li><a href="http://www.rsact.com/html/about/aboutus/">公司介绍</a>|</li>
        <li><a href="http://www.rsact.com/html/contactus/">联系我们</a>|</li>
        <li><a href="javascript:;">合作伙伴</a>|</li>
        <li><a href="javascript:;">商务合作</a>|</li>
        <li><a href="javascript:;">用户协议</a></li>
      </ul>
      <p style="color:rgba(225,225,225,.2);margin-top: 85px;margin-left: 34%;">©版权归属：北京锐思爱特咨询股份有限公司京ICP备16019542号-1</p>
  </div>
  <!-- //登录日志 -->
  <el-dialog title="相关信息" v-model="dialogLogin" size="tiny" id="dialogLogin">
    <el-table
      :data="loginList_list"
      @sort-change="time_sort_loginLog"
      border
      style="width: 100%">
      <el-table-column
        label="账号"
        width=110
        prop="account"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
       label="ip"
       show-overflow-tooltip
       width=180>
       <template scope="scope">{{scope.row.ipAddress}}</template>
     </el-table-column>
      <el-table-column
       label="登录时间"
       show-overflow-tooltip
       width=160
       prop="createTime">
     </el-table-column>
      <el-table-column
        label="登出时间"
        show-overflow-tooltip
        width=160
        prop="updateTime">
      </el-table-column>
      <el-table-column
        label="累计时间"
        show-overflow-tooltip
        sortable
        width=100>  
        <template scope="scope">{{ scope.row.onlineTime}}</template>     
      </el-table-column>
      <el-table-column
        label="访问浏览器"
        show-overflow-tooltip
        prop="userAgent">      
      </el-table-column>
   </el-table>
    <el-pagination
            class="page"
            @current-change="handleCurrentChange_login"
            :current-page="currentPage_login"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_userA"
            layout="total,  prev, pager, next, jumper"
            :total="this.loginList.length"
            v-show="this.loginList.length!==0">
          </el-pagination>
  </el-dialog>
</div>
</template>

<script>
import echarts from 'echarts'
import { Sort }  from '../../assets/js/index.js'
export default {
  mounted () {
    Sort;
    this.format_time ();
    this.loading = true;
    $('.org').css('width',document.documentElement.clientWidth-150+'px'); 
  	$('.footer').css('width',document.documentElement.clientWidth-150+'px');
  	let _this=this,ourl='http://192.168.0.3:9010/rssysc/api/v1.0/usera';

    $.ajax({
        type: "POST",
        headers:{'X-Requested-With': 'XMLHttpRequest'},
        url: 'http://192.168.0.3:9010/rssysc/authentication',
      success: function(data){
          
          if(data.code == 1002){
            $.ajax({
              type: "GET",
              url: ourl,
              data: {
                "method": 'get'
              },
              success: function(data){
                _this.loading = false;
                console.log(data);
               // console.log(data.data.userAList);
                if(data.code == 1004){
                  window.location.href = ourl+"?successCallbackUrl="+window.document.location.href;
                }else{
                  _this.userAList = [];//data.data.userAList.sort(Sort('isOnline'));
                  _this.userAListOrginData=data.data.userAList.sort(Sort('isOnline'));
                  for(let a of data.data.userAList){
                      let i = Object.assign({},a);
                      i.createTime = new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
                      i.updateTime = new Date(i.updateTime).Format("yyyy-MM-dd hh:mm:ss");
                      if(i.onlineTime < 60 && i.onlineTime >= 0){
                          i.onlineTime = i.onlineTime.toFixed(2)+'秒';
                        }else if(i.onlineTime < 60*60 && i.onlineTime >= 60){
                          i.onlineTime = (i.onlineTime/60).toFixed(2)+'分钟';
                        }else if(i.onlineTime < 60*60*24 && i.onlineTime >= 60*60){
                          i.onlineTime = (i.onlineTime/3600).toFixed(2)+'小时';
                        }else{
                          i.onlineTime = (i.onlineTime/(3600*24)).toFixed(2)+'天';
                      }
                    _this.userAList.push(i);
                    _this.userAList = _this.userAList.sort(Sort('isOnline'));
                  };
                  _this.format_firstTableData('userAList','userAList_userA',_this.page_size_userA);
                }
                
              }
            })
          
          }else if (data.code == 1004){
            window.location.href="#/";
          }
        }
        });

    //样式操作
    $('#dialogLogin .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialogLogin=false;
      });
  },
  data () {
  	return {
      userAListOrginData:[],
      userAList:[],
      userAList_userA:[],
      currentPage_userA:1,
      page_size_userA:10,
      search_input:'',
      keywordMapList:[{'mustIncludeKeywordList':[],'titleNotIncludeKeywordList':[],'anyIncludeKeywordList':[],'contentNotIncludeKeywordList':[],createTime:''}],
      current_keywordMapList:{'mustIncludeKeywordList':[],'titleNotIncludeKeywordList':[],'anyIncludeKeywordList':[],'contentNotIncludeKeywordList':[],createTime:''},
      current_username:'',
      current_project:'',
      activeNames:['1'],
      prev_btn:false,
      next_btn:false,
      index_btn:0,
      dialogLogin:false,
      loginList:[],
      _loginList:[],
      loginList_list:[],
      currentPage_login:1,
      loading:false
  	     }
  	},
  methods:{
    //格式表格数据
      format_tabledata (crrtpage,pageSize,dta,dtaList) {
        let newdata=[],
        pageNum=this[crrtpage]-1;
        for(let i=this[pageSize]*pageNum;i<this[pageSize]*pageNum+this[pageSize];i++ ){
          this[dta][i] !== undefined ? newdata.push(this[dta][i]) : '' 
        }
        this[dtaList]=newdata;       
      },
    //初始表格数据
    format_firstTableData(dta,dtaList,pageSize){
      this[dtaList]=this[dta].length > pageSize ? this[dta].slice(0,pageSize) : this[dta];
    },
    //初始时间格式
    format_time () {
        Date.prototype.Format = function (fmt) {  
          var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
          }
      },
    handleCommand_user(dta){
      let userId = dta.slice(dta.indexOf(':')+1,dta.length);
      let index = this.userAList.findIndex(function(value){
                  return value.id == dta.slice(0,dta.indexOf(','));
                });
      for(let i = 0; i < this.userAList[index].userBList.length; i++){
        if(this.userAList[index].userBList[i].id == userId){
          this.userAList[index].userBList.unshift(this.userAList[index].userBList[i]);
          this.userAList[index].userBList.splice(i+1,1);
        };
      };
    },
    handleCommand(dta){
      console.log(dta);
      let projectId = dta.slice(dta.indexOf(':')+1,dta.length),_this=this,ourl='http://192.168.0.3:9010/rssysc/api/v1.0/keywordLog/';
      let id = dta.slice(0,dta.indexOf(','));
      let index = this.userAList.findIndex(function(value){
                  return value.id == id;
                });
      this.current_username = this.userAList[index].account;
      for(let i = 0; i < this.userAList[index].projectList.length; i++){
        if(this.userAList[index].projectList[i].id == projectId){
          this.current_project = this.userAList[index].projectList[i].name;
          this.userAList[index].projectList.unshift(this.userAList[index].projectList[i]);
          this.userAList[index].projectList.splice(i+1,1);
        };
      };
      //关键词log
      $.ajax({
        type: "POST",
        headers:{'X-Requested-With': 'XMLHttpRequest'},
        url: 'http://192.168.0.3:9010/rssysc/authentication',
      success: function(data){
          
          if(data.code == 1002){
            $.ajax({
              type: "GET",
              url: ourl+projectId,
              data: {
              "method": 'get',
              },
              success: function(data){
                console.log(data);
                if(data.code == 1004){
                  window.location.href = ourl+"?successCallbackUrl="+window.document.location.href;
                  
                }else{
                  _this.keywordMapList=data.data.keywordMapList.sort(Sort('createTime'));
                  for(let i of _this.keywordMapList){
                    i.createTime=new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
                  };
                  _this.prev_btn=true;
                  _this.next_btn=_this.keywordMapList.length < 3 ? true : false;
                  _this.index_btn=0;
                  _this.current_keywordMapList = _this.keywordMapList.length > 1 ? _this.keywordMapList[_this.index_btn] : _this.current_keywordMapList;
                  _this.activeNames = _this.keywordMapList.length > 1 ? ['1','2'] : ['1'];
                };
              }
            })
          
          }else if (data.code == 1004){
            window.location.href="#/";
            
          }
        }
        });
      
    },
    handleCurrentChange_userA(val){
      this.currentPage_userA = val;
      this.format_tabledata('currentPage_userA','page_size_userA','userAList','userAList_userA');
    },
    handleCurrentChange_login(val){
      this.currentPage_login = val;
      this.format_tabledata('currentPage_login','page_size_userA','loginList','loginList_list');
    },
    search_data(){
      let _userAList=this.userAListOrginData.filter(x => {
            if(x.username == ''){
              return x.account.toLowerCase().indexOf(this.search_input.toLowerCase()) != -1;
            }else{
              return x.account.toLowerCase().indexOf(this.search_input.toLowerCase()) != -1 || x.username.indexOf(this.search_input) != -1;
            }
        });
          this.userAList = [];//data.data.userAList.sort(Sort('isOnline'));
              for(let a of _userAList){
                  let i = Object.assign({},a);
                  i.createTime = new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
                  i.updateTime = new Date(i.updateTime).Format("yyyy-MM-dd hh:mm:ss");
                  if(i.onlineTime < 60 && i.onlineTime >= 0){
                      i.onlineTime = i.onlineTime.toFixed(2)+'秒';
                    }else if(i.onlineTime < 60*60 && i.onlineTime >= 60){
                      i.onlineTime = (i.onlineTime/60).toFixed(2)+'分钟';
                    }else if(i.onlineTime < 60*60*24 && i.onlineTime >= 60*60){
                      i.onlineTime = (i.onlineTime/3600).toFixed(2)+'小时';
                    }else{
                      i.onlineTime = (i.onlineTime/(3600*24)).toFixed(2)+'天';
                  }
                this.userAList.push(i);
                this.userAList = this.userAList.sort(Sort('isOnline'));
              };
      this.format_firstTableData('userAList','userAList_userA',this.page_size_userA);
    },
    handleIconClick(val){
      console.log(this.search_input)
    },
    prev_btn_click(){
      if(this.index_btn > 0){
        this.index_btn--;
        this.current_keywordMapList = this.keywordMapList[this.index_btn];
        this.prev_btn = this.index_btn == 0 ? true : false;
        this.next_btn = this.index_btn == this.keywordMapList.length-2 ? true : false;
      }
    },
    next_btn_click(){
      if(this.index_btn < this.keywordMapList.length-2){
        this.index_btn++;
        this.current_keywordMapList = this.keywordMapList[this.index_btn];
        this.next_btn = this.index_btn == this.keywordMapList.length-2 ? true : false;
        this.prev_btn = this.index_btn == 0 ? true : false;
      }
    },
    login_log(dta){
      let _this=this,ourl = 'http://192.168.0.3:9010/rssysc/api/v1.0/loginLogA/';
      this.dialogLogin = true;
      this.loginList = [];
      //关键词log
      $.ajax({
        type: "POST",
        headers:{'X-Requested-With': 'XMLHttpRequest'},
        url: 'http://192.168.0.3:9010/rssysc/authentication',
      success: function(data){
          
          if(data.code == 1002){
            $.ajax({
              type: "GET",
              url: ourl+dta.account,
              data: {
              "method": 'get',
              },
              success: function(data){
                console.log(data);
                if(data.code == 1004){
                  window.location.href = ourl+"?successCallbackUrl="+window.document.location.href;
                }else{
                  _this._loginList = data.data.loginLogAList;
                  for(let a of data.data.loginLogAList){
                      let i = Object.assign({},a);
                      i.onlineTime = i.updateTime - i.createTime;
                      if(i.onlineTime < 1000*60 && i.onlineTime >= 0){
                        i.onlineTime = (i.onlineTime/1000).toFixed(2)+'秒';
                      }else if(i.onlineTime < 1000*60*60 && i.onlineTime >= 1000*60){
                        i.onlineTime = (i.onlineTime/60000).toFixed(2)+'分钟';
                      }else{
                        i.onlineTime = (i.onlineTime/3600000).toFixed(2)+'小时';
                    }
                    i.createTime = new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
                    i.updateTime = new Date(i.updateTime).Format("yyyy-MM-dd hh:mm:ss");
                    _this.loginList.push(i);
                  };
                  _this.format_firstTableData('loginList','loginList_list',_this.page_size_userA);
                };
              }
            })
          
          }else if (data.code == 1004){
            window.location.href="#/";
          }
        }
        }); 
    },
    time_sort_loginLog( column, prop, order){
      Sort;
      function Sort_down(property,c){
                return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
              };
      this.loginList = [];
      for(let a of this._loginList){
          let i = Object.assign({},a);
          i.onlineTime = i.updateTime - i.createTime;
          this.loginList.push(i);
        };
      if(column.order == 'ascending'){
        this.currentPage_login = 1;
        this.loginList=this.loginList.sort(Sort_down('onlineTime')); 
        }else if(column.order == 'descending'){
          this.currentPage_login = 1;
          this.loginList=this.loginList.sort(Sort('onlineTime')); 
        }
          for(let i of this.loginList){
            if(i.onlineTime < 1000*60 && i.onlineTime >= 0){
                i.onlineTime = (i.onlineTime/1000).toFixed(2)+'秒';
              }else if(i.onlineTime < 1000*60*60 && i.onlineTime >= 1000*60){
                i.onlineTime = (i.onlineTime/60000).toFixed(2)+'分钟';
              }else{
                i.onlineTime = (i.onlineTime/3600000).toFixed(2)+'小时';
            }
            i.createTime = new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
            i.updateTime = new Date(i.updateTime).Format("yyyy-MM-dd hh:mm:ss");
          }
          this.format_firstTableData('loginList','loginList_list',this.page_size_userA);
      },
      time_sort_list( column, prop, order){
        Sort;
        function Sort_down(property,c){
                return function(a,b){
                        var value1 = a[property];
                        var value2 = b[property];
                        return value1 - value2;
                    }
              };
        console.log(column)
        this.currentPage_userA = 1;
        if(column.column){
            if(column.column.label == '登录次数'){
              if(column.order == 'descending'){
                this.userAList = this.userAList.sort(Sort('loginCount')); 
              }else if(column.order == 'ascending'){
                this.userAList = this.userAList.sort(Sort_down('loginCount')); 
              }
            }else if(column.column.label == '累计时间'){
              this.userAList = [];
              this.search_input = '';
              for(let a of this.userAListOrginData){
                  let i = Object.assign({},a);
                  this.userAList.push(i);
                };
              if(column.order == 'descending'){
                this.userAList = this.userAList.sort(Sort('onlineTime')); 
              }else if(column.order == 'ascending'){
                this.userAList = this.userAList.sort(Sort_down('onlineTime')); 
              }
              for(let i of this.userAList){
                      i.createTime = new Date(i.createTime).Format("yyyy-MM-dd hh:mm:ss");
                      i.updateTime = new Date(i.updateTime).Format("yyyy-MM-dd hh:mm:ss");
                      if(i.onlineTime < 60 && i.onlineTime >= 0){
                          i.onlineTime = i.onlineTime.toFixed(2)+'秒';
                        }else if(i.onlineTime < 60*60 && i.onlineTime >= 60){
                          i.onlineTime = (i.onlineTime/60).toFixed(2)+'分钟';
                        }else if(i.onlineTime < 60*60*24 && i.onlineTime >= 60*60){
                          i.onlineTime = (i.onlineTime/3600).toFixed(2)+'小时';
                        }else{
                          i.onlineTime = (i.onlineTime/(3600*24)).toFixed(2)+'天';
                      }
              }
             // console.log(this.userAList)
            }
            this.format_firstTableData('userAList','userAList_userA',this.page_size_userA);
        }
        
      }
    
  }

}
</script>

<style lang="scss" >
.org{
  button:hover{
        opacity: 0.8;
  }  
  .panel{
    .panel-heading{
      .el-input, .el-input__inner{
        width: 200px;
        height: 24px;
        position: absolute;
        right: 7px;
      }
      .el-input__icon{
        z-index: 5;
      }
    }
    .panel-body{
      .el-table .cell{
        padding-left: 5px;
        padding-right: 5px;
      }
      .el-collapse-item__content>div{
        padding-top: 5px;
      }
      .page{
          position: absolute;
          right: 10px; 
          bottom: 1px;
          display: inline-block;
          .el-pagination__total{
            color:#999;
          }
          ul>li{
            opacity: 1;
          }
          .el-pager .active {
            border-color: #00b38a;
            background-color: #00b38a;
          }
          .el-pagination__jump{
            display: none;
          }
      }
    }
  }
  #footer{
    margin-top: 40px;
    margin-left:26%;
    li{
      float: left;
      list-style-type:none;
        color:rgba(225,225,225,.2);
        font-size: 14px;
      a{
        margin: 0 20px;
        color:#ffffff;
        opacity: 0.2;
        font-size: 14px;
      }
    }
  } 
  #dialogLogin{
    .page{
        position: absolute;
        right: 15px; 
        bottom: 15px;
        display: inline-block;
        .el-pagination__total{
          color:#999;
        }
        ul>li{
          opacity: 1;
        }
        .el-pager .active {
          border-color: #00b38a;
          background-color: #00b38a;
        }
        .el-pagination__jump{
          display: none;
        }
    }
      .el-dialog{
        border-radius: 4px;
        .el-dialog__header{
        background: #00b38a;
        padding: 10px 0;
        text-align: center;
          .el-dialog__title{
            color: white;
            font-weight:500px;
            padding-left: 14px;
          }
          .el-dialog__headerbtn{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-image: url('../../assets/icon/ev_del1.png');
            cursor: pointer;
          }
          .el-dialog__close{
            display: none;
          }
        }
      }
      .el-dialog--tiny{
        width: 1200px;
        .el-dialog__body{
          position:relative;
          padding: 10px 10px;
          height: 410px;
          .page{
            right: 5px;
            bottom: 2px;
          }
          .el-table .cell, .el-table th>div{
            line-height: 30px;
            padding: 0 5px;
          }
          .el-table td{
            height: 30px;
          }
        }
      }   
  }  
  .loader{
        width: 128px;
        height: 128px;
        line-height: 128px;
        border-radius: 50%;
        border-top: 5px solid #eb6c18;
        color: #fff;
        text-align: center;
        position: relative;
        margin: 30px auto;
        -webkit-animation: 2s loading1 ease-in-out infinite;
        animation: 2s loading1 ease-in-out infinite;
    }
    .loader:before,
    .loader:after{
        content: "";
        display: block;
        width: 128px;
        height: 128px;
        border-radius: 50%;
        position: absolute;
        top: -5px;
        left: 0;
    }
    .loader:before{
        border-top: 5px solid #c3c659;
        -webkit-transform: rotate(120deg);
        transform: rotate(120deg)
    }
    .loader:after{
        border-top: 5px solid #b93be6;
        -webkit-transform: rotate(240deg);
        transform: rotate(240deg)
    }
    .loader .loader-inner{
        display: block;
        width: 128px;
        height: 128px;
        position: absolute;
        top: -5px;
        color: black;
        left: 0;
        -webkit-animation: 2s loading2 linear infinite;
        animation: 2s loading2 linear infinite;
    }
    @-webkit-keyframes loading1{
        50% {
            -webkit-transform: rotate(180deg)
        }
        100% {
            -webkit-transform: rotate(360deg)
        }
    }
    @keyframes loading1{
        50% {
            -webkit-transform: rotate(180deg);
            transform: rotate(180deg)
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg)
        }
    }
    @-webkit-keyframes loading2{
        50% {
            -webkit-transform: rotate(-180deg)
        }
        100% {
            -webkit-transform: rotate(-360deg)
        }
    }
    @keyframes loading2{
        50% {
            -webkit-transform: rotate(-180deg);
            transform: rotate(-180deg)
        }
        100% {
            -webkit-transform: rotate(-360deg);
            transform: rotate(-360deg)
        }
    } 
}
</style>
