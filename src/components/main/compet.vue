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
          <template scope="scope">{{ scope.row.name}}</template>
        </el-table-column>
        <el-table-column
         label="必须包含关键词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#32a880" v-for="i in scope.row.mustIncludeKeywordList">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="关键词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#32a880" v-for="i in scope.row.includeKeywordList">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="标题排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.titleExcludeKeywordList">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.contentExcludeKeywordList">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
          label="备注"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.remark}}</template>
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
   <el-dialog :title="title" :visible.sync="dialog_add"  id="dialog_add">
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
import { publicSearch,tipsMessage,successBack,GetLocalStorage }  from '../../assets/js/map.js'
export default {
  mounted :function () {
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
      let data = {
        "method": 'get',
        "project" : {
          'parentId':GetLocalStorage('current_projectData_A').project_id//当前项目id,
        }
      };
      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"GET",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
        if(successBack(data,this)){
          this.data = data.data;
        }
      }); 
    },
    add(dta){
      console.log(dta)
      let includeKeywords = Array.from(new Set(this.includeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let mustIncludeKeywords = Array.from(new Set(this.mustIncludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let titleExcludeKeywords = Array.from(new Set(this.titleExcludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      let contentExcludeKeywords = Array.from(new Set(this.contentExcludeKeyword.replace(/，/ig,',').split(','))).filter(x =>  x!='');
      if(this.name.length == 0 || mustIncludeKeywords.length + includeKeywords.length == 0){
        tipsMessage('不要忘了写方案名或者必须关键词和关键词不能同时为空','warning',this);
        return;
      };
      if(this.title == '添加竞品'){//添加竞品的确定
        let data = {
            "method":'post',
            'project':{
                      "parentId": GetLocalStorage('current_projectData_A').project_id,//当前项目id,
                      "name": this.name,
                      "remark": this.remark
                      },
            includeKeywords,
            mustIncludeKeywords,
            titleExcludeKeywords,
            contentExcludeKeywords
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"POST",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
          this.dialog_add = false;
          if(successBack(data,this)){
            this.search();
          }
        });  
       }else{//修改竞品的确定
              if(includeKeywords.toString() != dta.includeKeywordList.toString() || mustIncludeKeywords.toString() != dta.mustIncludeKeywordList.toString() || titleExcludeKeywords.toString() != dta.titleExcludeKeywordList.toString() || contentExcludeKeywords.toString() != dta.contentExcludeKeywordList.toString() || this.name != dta.name || this.remark != dta.remark){//修改le
                let data = {
                    "method": 'put',
                    'project':{
                                "id": dta.id,//当前竞品id,
                                "name": this.name,
                                "remark": this.remark,                             
                                'includeKeywordList':includeKeywords,
                                'mustIncludeKeywordList':mustIncludeKeywords,
                                'titleExcludeKeywordList':titleExcludeKeywords,
                                'contentExcludeKeywordList':contentExcludeKeywords 
                                }
                  };
                  publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"POST",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
                    this.dialog_add = false;
                    if(successBack(data,this)){
                      this.search();
                      tipsMessage(data.message,'success',this);
                    }
                  });  
              }else{
                this.dialog_add = false;
                tipsMessage('未修改','info',this);
              } 
            }  
    },
    add_btn(){
      this.title = '添加竞品';
      this.dialog_add = true;
      this.name = '';
      this.mustIncludeKeyword = '';
      this.includeKeyword = '';
      this.titleExcludeKeyword = '';
      this.contentExcludeKeyword = '';
      this.remark = '';
    },
    write(a){
      this.title = '项目修改';
      this.dialog_add = true;
      this.name = a.name;
      this.mustIncludeKeyword = a.mustIncludeKeywordList.toString();
      this.includeKeyword = a.includeKeywordList.toString();
      this.titleExcludeKeyword = a.titleExcludeKeywordList.toString();
      this.contentExcludeKeyword = a.contentExcludeKeywordList.toString();
      this.remark = a.remark;
      this.edit_data = a;
      //console.log(a)
    },
    del(a,dta){
      let data= {
                "method": 'DELETE',
                "projectIdList": [dta.id],
                };
      this.$confirm('是否删除'+dta.name+ '项目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"POST",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
                if(successBack(data,this)){
                      this.search();
                      tipsMessage(data.message,'success',this);
                  };
              })  
            })
    }
  },
  watch:{
      $route (to,from){
        //console.log(from)
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
