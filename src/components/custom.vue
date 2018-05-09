<template>
<div>
  <topnav></topnav>
  <div class="custom container" style="background:#ffffff;padding:15px 10px 0 10px;">
       <el-table
        :data="tabledata_user"
        border
        style="width: 100%">
        <el-table-column
          label="用户名"
          show-overflow-tooltip
          prop="username">
        </el-table-column>
        <el-table-column
          label="账号"
          width=100
          show-overflow-tooltip
          prop="account">
        </el-table-column>
        <el-table-column
          label="电话"
          width=100
          show-overflow-tooltip
          prop="tel">
        </el-table-column>
        <el-table-column
          label="QQ号"
          width=110
          show-overflow-tooltip
          prop="qq">
        </el-table-column>
        <el-table-column
          label="邮件"
          show-overflow-tooltip
          prop="email">
        </el-table-column>
        <el-table-column
          label="公司名称"
          show-overflow-tooltip
          prop="companyName">
        </el-table-column>
        <el-table-column
          label="公司地址"
          width=200
          show-overflow-tooltip
          prop="companyAddress">
        </el-table-column>
        <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="fenpei(scope.$index, scope.row)">项目分配</el-button>
            <el-button
            size="small"
            type="info"
            @click="write( scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
        <el-table-column
          label="备注"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.remark}}</template>
        </el-table-column>
      </el-table>
    <el-button  type="info" @click="add_btn" style="margin:15px 0 5px 0;">添加客户</el-button>
  </div>
  <!-- 添加用户模态框 -->
    <el-dialog :title="title" v-model="dialog_user" size="tiny" id="dialog_add">
      <el-form label-position="right" label-width="80px" >
        <el-form-item label="用户名">
          <el-input v-model="name" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="account" placeholder="请输入账号" :disabled="title=='客户修改'"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input :type="password_type" v-model="password" placeholder="请输入密码" style="position: relative"></el-input><i @click="look_password" :class="password_type=='text' ? 'fa fa-eye-slash' : 'fa fa-eye' " style="position: absolute;right: 10px;line-height: 36px;"></i>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input  v-model="phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="QQ号">
          <el-input  v-model="qq" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input  v-model="email" placeholder="请输入Email"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input  v-model="companyName" placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input  v-model="companyAddress" placeholder="请输入公司地址"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_user = false">取 消</el-button>
        <el-button type="primary" @click="add(write_obj)">确 定</el-button>
      </span>
  </el-dialog>
  <!-- 查看用户项目模态框 -->
    <el-dialog title="项目列表" v-model="dialog_project" size="tiny" id="dialog_project">
    <p style="color:#13ce66;;margin-bottom: 10px;font-size: 16px;">项目分配至 </p>
       <el-table
        :data="projectList"
        border
        ref="table"
        @selection-change="select_pro"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_project = false">取 消</el-button>
        <el-button type="primary" @click="add_">确 定</el-button>
      </span>
  </el-dialog>
</div>  
</template>

<script>
import topnav from './top_nav.vue'
export default {
  mounted :function () {
    this.search();
  },
  data () {
  	return {
      tabledata_user:[],
      projectList:[],
      dialog_user:false,
      dialog_project:false,
      write_obj:'',
      password_type:'password',
      name:'',
      account:'',
      password:'',
      phone:'',
      qq:'',
      email:'',
      companyName:'',
      companyAddress:'',
      remark:'',
      selection:[],
      userbId:'',
      title:''
  	}
  },
  methods: {
    search(){
      let _this=this;
      let useraID="123456";
      let _data={
        'method':'get',
        'userb':null,
        'userbList' : null
      };
      $.ajax({
                type: "GET",
                url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraID+'/userb',
                traditional: true,
                data:{"userbDto":JSON.stringify(_data)},
                success: function(data){
                  console.log( $('.el-message-box .el-message-box__input .el-input__inner'));
                    console.log(data);
                    console.log(data.success);
                    console.log(data.message);
                  if(data.code==1001){//需要验证
                    
                      _this.$prompt('请输此账户的密码：', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputType:'password',
                            closeOnClickModal:false,
                          }).then(({ value }) => {
                             $.ajax({
                                type: "GET",
                                url: 'http://192.168.0.3:8080/rs/api/v1.1/user/validation',
                                data:{
                                    password : value
                                },
                                success: function(data){
                                  if(data.code==1002){
                                    _this.$message({
                                      type: 'success',
                                      message: '验证成功,时间有效期10分钟!' 
                                    });
                                     $.ajax({
                                          type: "GET",
                                          url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraID+'/userb',
                                          traditional: true,
                                          data:{"userbDto":JSON.stringify(_data)},
                                          success: function(data){
                                            console.log(data)
                                            _this.tabledata_user=data.data.userbList
                                          }});
                                  }else{
                                    _this.$message({
                                      type: 'error',
                                      message: '验证失败' 
                                    });
                                  }
                                }
                            })
                          }).catch(() => {      
                          });
                        }else{//不需要验证
                            _this.tabledata_user=data.data.userbList
                        }
                }
            })
    },
    write(a){
      this.write_obj=a;
      this.title='客户修改';
      this.dialog_user = true;
      this.password_type='password';
      this.name=a.username;
      this.account=a.account;
      this.password=a.password;
      this.phone=a.tel;
      this.qq=a.qq;
      this.email=a.email;
      this.companyName=a.companyName;
      this.companyAddress=a.companyAddress;
      this.remark=a.remark;
      console.log(a)
    },
    add_btn(){
      this.dialog_user = true;
      this.title='添加客户';
      this.password_type='password';
      this.name='';
      this.account='';
      this.password='';
      this.phone='';
      this.qq='';
      this.email='';
      this.companyName='';
      this.companyAddress='';
      this.remark='';
    },
    add(a){
      console.log(a)
      let useraId = "123456",_this=this;
      if(this.name===''||this.account===''||this.password===''){
        this.$confirm('用户名密码不能为空', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        }).catch(() => {        
        });
      }else{
      let userData = {
                      username: this.name,
                      account: this.account,
                      password: this.password,
                      tel: this.phone,
                      qq: this.qq,
                      email: this.email,
                      companyName: this.companyName,
                      companyAddress: this.companyAddress,
                      remark: this.remark,
                      id:a.id
                    }
      if(this.title==='添加客户'){//添加客户的确定
        let _data = {
          method : "post",
          userb : userData
        };
        $.ajax({
              type: "POST",
              url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
              traditional: true,
              data:{"userbDto":JSON.stringify(_data)},
              success: function(data){
                if(data.code==1001){//需要验证
                  _this.$prompt('请输此账户的密码：', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal:false,
                      }).then(({ value }) => {
                         $.ajax({
                            type: "GET",
                            url: 'http://192.168.0.3:8080/rs/api/v1.1/user/validation',
                            data:{
                                password : value
                            },
                            success: function(data){
                              if(data.code==1002){
                                _this.$message({
                                  type: 'success',
                                  message: '验证成功,时间有效期10分钟!' 
                                });
                                $.ajax({
                                  type: "POST",
                                  url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
                                  traditional: true,
                                  data:{"userbDto":JSON.stringify(_data)},
                                  success: function(data){
                                    _this.search();
                                    console.log(7899);
                                    _this.dialog_user = false;
                                  }});
                              }else{
                                _this.$message({
                                  type: 'error',
                                  message: '验证失败' 
                                });
                              }
                            }
                        })
                      }).catch(() => {      
                      });
                }else{//不需要验证
                  if(data.success==true){
                    _this.dialog_user = false;
                    _this.search();
                    console.log(JSON.stringify(data));
                    console.log(data.success);
                    _this.$message({
                      message: data.message,
                      type: 'success'
                    });
                  }else{
                    _this.$alert(''+data.message+'', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                      });
                  }
                }
              }
          })
      }else{//修改客户的确定
        console.log(this.name)
        //console.log(a.name)
        if(a.username!=this.name||a.password!=this.password||a.tel!=this.phone||a.qq!=this.qq||a.email!=this.email||a.companyName!=this.companyName||a.companyAddress!=this.companyAddress||a.remark!=this.remark){//判断是否修改
          console.log('修改了')
          let _data = {
              method : "put",
              userb : userData
            };
             $.ajax({
                type: "POST",
                url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
                traditional: true,
                data:{"userbDto":JSON.stringify(_data)},
                success: function(data){
                    console.log(JSON.stringify(data));
                    console.log(data.success);
                    console.log(data.message);
                    if(data.code==1001){//需要验证
                      _this.$prompt('请输此账户的密码：', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            closeOnClickModal:false,
                          }).then(({ value }) => {
                             $.ajax({
                                type: "GET",
                                url: 'http://192.168.0.3:8080/rs/api/v1.1/user/validation',
                                data:{
                                    password : value
                                },
                                success: function(data){
                                  if(data.code==1002){
                                    _this.$message({
                                      type: 'success',
                                      message: '验证成功,时间有效期10分钟!' 
                                    });
                                    $.ajax({
                                      type: "POST",
                                      url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
                                      traditional: true,
                                      data:{"userbDto":JSON.stringify(_data)},
                                      success: function(data){
                                        _this.search();
                                        console.log(888)
                                        _this.dialog_user = false;
                                      }});
                                    
                                  }else{
                                    _this.$message({
                                      type: 'error',
                                      message: '验证失败' 
                                    });
                                  }
                                }
                            })
                          }).catch(() => {      
                          });
                        }else{//不需要验证
                         _this.search();
                         _this.dialog_user = false;
                        }
                    
                }
              })
          }else{//没修改
            this.dialog_user = false;
            console.log('没修改')
          }
        }
      }
    },
    fenpei(index,row){
      //console.log(row)
      let idarr=[];
      this.userbId = row.id;
      let _this=this;
      let data = {
          method : "get"
      }
      $.ajax({
          type: "GET",
          url: 'http://192.168.0.3:8080/rs/api/v1.1/userb/'+_this.userbId+'/project',
          traditional: true,
          data:{"userbProDto":JSON.stringify(data)},
          success: function(data){
            _this.dialog_project=true;
            let arr = [];
            if(data.data.optionalProjectList!=null && data.data.optionalProjectList.length > 0){
                arr=arr.concat(data.data.optionalProjectList);
            }
            if(data.data.selectedProjectList!=null && data.data.selectedProjectList.length > 0){
                arr=arr.concat(data.data.selectedProjectList);
            }
            for(let i=0;i<arr.length;i++){
              if(arr[i]===undefined||arr[i]===null){
                arr.splice(i, 1);
              }
            }
             _this.$nextTick(function(){
              for(let i=0;i<arr.length;i++){
                idarr.push(arr[i].id);
              };
              if(data.data.selectedProjectList){
                for(let t=0;t<data.data.selectedProjectList.length;t++){
                  if(idarr.indexOf(data.data.selectedProjectList[t].id)!=-1){
                    _this.$refs.table.toggleRowSelection(data.data.selectedProjectList[t],true);
                  }
                }
              }
            });
             _this.projectList=arr;
            //
             console.log(data.data.optionalProjectList)
            console.log(data)
              console.log(arr);
          }
      })
    },
    select_pro(val){
      this.selection=val;
    },
    add_(){
      let idarr=[];
      let _this=this;
      for(let i=0;i<this.selection.length;i++){
        idarr.push(this.selection[i].id)
      }
        var _data = {
            method : "post",
            proIdList:idarr
        }
        $.ajax({
            type: "POST",
            url: 'http://192.168.0.3:8080/rs/api/v1.1/userb/'+_this.userbId+'/project',
            traditional: true,
            data:{"userbProDto":JSON.stringify(_data)},
            success: function(data){
              console.log(data)
              if(data.code==1001){//需要验证
                      _this.$prompt('请输此账户的密码：', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            closeOnClickModal:false,
                          }).then(({ value }) => {
                             $.ajax({
                                type: "GET",
                                url: 'http://192.168.0.3:8080/rs/api/v1.1/user/validation',
                                data:{
                                    password : value
                                },
                                success: function(data){
                                  if(data.code==1002){
                                    _this.$message({
                                      type: 'success',
                                      message: '验证成功,时间有效期10分钟!' 
                                    });
                                    $.ajax({
                                        type: "POST",
                                        url: 'http://192.168.0.3:8080/rs/api/v1.1/userb/'+_this.userbId+'/project',
                                        traditional: true,
                                        data:{"userbProDto":JSON.stringify(_data)},
                                        success: function(data){
                                           _this.dialog_project=false;
                                        }});
                                    if(data.success!=true){
                                      _this.$message({
                                        message: data.message,
                                        type: 'warning'
                                      });
                                    }
                                  }else{
                                    _this.$message({
                                      type: 'error',
                                      message: '验证失败' 
                                    });
                                  }
                                }
                            })
                          }).catch(() => {      
                          });
                        }else{//不需要验证
                           if(data.success==true){
                              _this.dialog_project=false;
                              _this.$message({
                                message: data.message,
                                type: 'success'
                              });
                            }else{
                              _this.$message({
                                message: data.message,
                                type: 'warning'
                              });
                            }
                        }
                
            }
        })
    },
    del(a,b){
      let useraId = "123456",_this=this;         
      let _data = {
                method : "delete",
                userbIds : [b.id]
            };
      console.log(b);
      _this.$confirm('是否删除'+'?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                          $.ajax({
                            type: "POST",
                            url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
                            traditional: true,
                            data:{"userbDto":JSON.stringify(_data)},
                            success: function(data){
                                console.log(JSON.stringify(data));
                                console.log(data.success);
                                console.log(data.message);
                                if(data.code==1001){//需要验证
                                  _this.$prompt('请输此账户的密码：', '提示', {
                                      confirmButtonText: '确定',
                                      cancelButtonText: '取消',
                                      closeOnClickModal:false,
                                    }).then(({ value }) => {
                                       $.ajax({
                                          type: "GET",
                                          url: 'http://192.168.0.3:8080/rs/api/v1.1/user/validation',
                                          data:{
                                              password : value
                                          },
                                          success: function(data){
                                            if(data.code==1002){
                                              _this.$message({
                                                type: 'success',
                                                message: '验证成功,时间有效期10分钟!' 
                                              });
                                              $.ajax({
                                                type: "POST",
                                                url: 'http://192.168.0.3:8080/rs/api/v1.1/usera/'+useraId+'/userb',
                                                traditional: true,
                                                data:{"userbDto":JSON.stringify(_data)},
                                                success: function(data){
                                                  _this.tabledata_user=_this.tabledata_user.filter(item => { return [b.id].indexOf(item.id) === -1; })
                                                  }});
                                              
                                            }else{
                                              _this.$message({
                                                type: 'error',
                                                message: '验证失败' 
                                              });
                                            }
                                          }
                                      })
                                    }).catch(() => {      
                                    });
                                }else{//不需要验证
                                  _this.tabledata_user=_this.tabledata_user.filter(item => { return [b.id].indexOf(item.id) === -1; })
                                }
                                
                            }
                        });
                      }).catch(() => {
                        _this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });          
                      });
      
       
      //_this.data[i].keywordList=_this.data[i].keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.word) === -1; });
      
    },
    look_password(){
      if(this.password_type==='text'){
        this.password_type='password'
      }else{
        this.password_type='text'
      }    
    }
  },
  components:{
    topnav
  },
  watch:{
      $route (to,from){
        console.log(from)
        /*if(from.path==='/main/event'){
          console.log(4555)
        }*/
      }
    }
}
</script>
<style lang="scss" >
 #dialog_add{
      .el-dialog__body{
        padding-left: 5px;
        padding-bottom: 10px;
      }
    }
#dialog_project{
  .el-dialog__body{
        padding-top: 10px;
      }
}    
  .custom{
  /*    表格头部 */
     thead{
        th{
          height:25px;
        }
        th>.cell{
          padding: 0;
          text-align: center;
          .el-checkbox__inner{
            width:14px;
            height:14px;     
          }
          label{
            margin:0;
          }
          .caret-wrapper{
          margin: 0;
          }
        }
     }
   /*    表格内部 */ 
   tbody{
    .current-row{
      color: #ccc !important;
      background-color: #ccc !important;
    }
    .cell{
      text-align: center;
      padding: 0;
      .el-button--small {
        padding: 4px 3px;
        margin-left: 3px;
      }
    }
    tr{
      height:25px;
    }
    .el-table-column--selection>.cell{
      padding: 0;
      text-align: center;
      .el-checkbox{
        margin:0;
        .el-checkbox__inner{
          width:14px;
          height:14px;
        }
      }
     }
    }
  }

</style>
