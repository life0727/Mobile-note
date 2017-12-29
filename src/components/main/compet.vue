<template>
<div>
  <div class="compet container" style="background:#ffffff;padding:15px 10px 0 10px;">
    <el-table
        :data="data"
        border
        style="width: 100%">
        <el-table-column
          label="竞品名称"
          width=100
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.project.name}}</template>
        </el-table-column>
        <el-table-column
         label="必须包含关键词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#32a880" v-for="i in scope.row.mustIncludeKeywords">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="关键词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#32a880" v-for="i in scope.row.includeKeywords">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="标题排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.titleExcludeKeywords">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.contentExcludeKeywords">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
          label="备注"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.project.remark}}</template>
        </el-table-column>
        <el-table-column label="操作">
         <template scope="scope">
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
      </el-table>
    <el-button  @click="add_btn" style="margin:15px 0 5px 0;background-color: #00b38a;border-color: #00b38a;color: white;">添加竞品</el-button>
  </div>
  <!-- 添加用户模态框 -->
   <el-dialog :title="title" v-model="dialog_add" size="tiny" id="dialog_add">
      <el-form label-position="right" label-width="80px" >
        <el-form-item label="竞品名称">
          <el-input v-model="name" placeholder="请输入竞品名称" ></el-input>
        </el-form-item>
        <el-form-item label="必须包含关键词">
          <el-input v-model="mustIncludeKeyword" placeholder="必须包含关键词" ></el-input>
          <span style="font-size: 10px;position: absolute;right: 10px;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span> 
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="includeKeyword" placeholder="关键词" ></el-input>
          <span style="font-size: 10px;position: absolute;right: 10px;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span> 
        </el-form-item>
        <el-form-item label="标题排除词">
          <el-input v-model="titleExcludeKeyword" placeholder="标题排除词" ></el-input>
          <span style="font-size: 10px;position: absolute;right: 10px;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span> 
        </el-form-item>
        <el-form-item label="排除词">
          <el-input v-model="contentExcludeKeyword" placeholder="排除词" ></el-input>
          <span style="font-size: 10px;position: absolute;right: 10px;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span> 
        </el-form-item>
         <el-form-item label="备注">
          <el-input type="textarea" v-model="remark"></el-input>
        </el-form-item> 
      </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_add = false">取 消</el-button>
        <el-button type="primary" @click="add(edit_data)">确 定</el-button>
      </span> 
  </el-dialog>
</div>  
</template>

<script>
export default {
  mounted :function () {
    //console.log(this.$store.state.ajax_data)
    //this.$store.state.start_data= this.$store.state.data;
    //console.log(this.$store.state.EventIds)
    this.search();
  },
  data () {
  	return {
      data:[],
      dialog_add:false,
      name:'',
      mustIncludeKeywords:[],
      mustIncludeKeyword:'',
      includeKeywords:[],
      includeKeyword:'',
      titleExcludeKeywords:[],
      titleExcludeKeyword:'',
      contentExcludeKeywords:[],
      contentExcludeKeyword:'',
      remark:'',
      title:'',
      edit_data:''
  	}
  },
  methods: {
    search(){
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let data={
            "method": 'get',
            "project" : {
              'id':project_id//当前项目id,
            }
          };
        $.ajax({
            type: "GET",
            url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/competitor',
            traditional: true,
            data:{'projectDto1':JSON.stringify(data)},
            success: function(data){
            //console.log(JSON.stringify(data));
            console.log(data);
            _this.data=data.data;
            //console.log(data.message);
            }
          })
    },
    add(dta){
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id')),_this=this;
      let includeKeyword=Array.from(new Set(this.includeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let mustIncludeKeyword=Array.from(new Set(this.mustIncludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let titleExcludeKeyword=Array.from(new Set(this.titleExcludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let contentExcludeKeyword=Array.from(new Set(this.contentExcludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      if(this.name.length==0||mustIncludeKeyword.length+includeKeyword.length==0){
          this.$message({
              message: '不要忘了写方案名或者必须关键词和关键词不能同时为空',
              type: 'warning'
            });
        }else{
            if(this.title=='添加竞品'){//添加竞品的确定
              let data= {
                    "method": 'post',
                    "includeKeywords":includeKeyword,
                    "mustIncludeKeywords":mustIncludeKeyword,
                    "titleExcludeKeywords": titleExcludeKeyword,
                    "contentExcludeKeywords":contentExcludeKeyword,
                    'project':{
                      "id": project_id,//当前项目id,
                      "name": _this.name,
                      "remark": _this.remark,
                      }
                    };
               $.ajax({
                type: "POST",
                url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/competitor',
                traditional: true,
                data:{'projectDto1':JSON.stringify(data)},
                success: function(data){
                  _this.search();
                  _this.dialog_add=false;
                  }
                })
             }else{//修改竞品的确定
                if(includeKeyword.toString()!=dta.includeKeywords.toString()||mustIncludeKeyword.toString()!=dta.mustIncludeKeywords.toString()||titleExcludeKeyword.toString()!=dta.titleExcludeKeywords.toString()||contentExcludeKeyword.toString()!=dta.contentExcludeKeywords.toString()||this.name!=dta.project.name||this.remark!=dta.project.remark){//修改le
                  let data= {
                    "method": 'put',
                    "includeKeywords":includeKeyword,
                    "mustIncludeKeywords":mustIncludeKeyword,
                    "titleExcludeKeywords": titleExcludeKeyword,
                    "contentExcludeKeywords":contentExcludeKeyword,
                    'project':{
                      "id": dta.project.id,//当前竞品id,
                      "name": _this.name,
                      "remark": _this.remark,
                      }
                    };
                    $.ajax({
                      type: "POST",
                      url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/competitor',
                      traditional: true,
                      data: {'projectDto1':JSON.stringify(data)},
                      success: function(data){
                          if(data.success==true){
                            _this.dialog_add=false;
                            _this.search();
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
                      })
                }else{
                  _this.dialog_add=false;
                  _this.$message({
                              message: '修改成功',
                              type: 'success'
                            });
                } 
             }
           
          }     
    },
    add_btn(){
      this.title='添加竞品';
      this.dialog_add=true;
      this.name='';
      this.mustIncludeKeyword='';
      this.includeKeyword='';
      this.titleExcludeKeyword='';
      this.contentExcludeKeyword='';
      this.remark='';
    },
    write(a){
      this.title='项目修改';
      this.dialog_add=true;
      this.name=a.project.name;
      this.mustIncludeKeyword=a.mustIncludeKeywords.toString();
      this.includeKeyword=a.includeKeywords.toString();
      this.titleExcludeKeyword=a.titleExcludeKeywords.toString();
      this.contentExcludeKeyword=a.contentExcludeKeywords.toString();
      this.remark=a.project.remark;
      this.edit_data=a;
      //console.log(a)
    },
    del(a,dta){
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id')),_this=this;
      let data= {
                "method": 'delete',
                "projectIdList": [dta.project.id],
                };
      this.$confirm('是否删除'+dta.project.name+ '项目?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        $.ajax({
                          type: "POST",
                          url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/competitor',
                          traditional: true,
                          data:{'projectDto1':JSON.stringify(data)},
                          success: function(data){
                                if(data.success==true){
                                  _this.search();
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
                          })
                    })
      
    }
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
  .compet{
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
