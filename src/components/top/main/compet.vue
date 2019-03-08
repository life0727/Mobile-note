<template>
<div>
<p style="line-height: 50px;margin: 0;position: relative">竞品列表
  <el-button type="warning" style="padding: 4px 29px;position: absolute;right: 0;top:15px;background-color: #fcd482;border-color:#fcd482;"  @click="add_btn">添加</el-button>
</p>
  <div class="compet container" style="background:#ffffff;padding:15px 10px 20px 10px;">
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
         <template scope="scope">  
            <span style="color:#32a880" v-for="i in scope.row.mustIncludeKeywordList" :key="i">{{i}}&nbsp;&nbsp;</span>
          </template>
       </el-table-column>
       <el-table-column
         label="关键词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#32a880" v-for="i in scope.row.includeKeywordList" :key="i">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="标题排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.titleExcludeKeywordList" :key="i">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
         label="排除词"
         show-overflow-tooltip>
         <template scope="scope"><span style="color:#ed6354" v-for="i in scope.row.contentExcludeKeywordList" :key="i">{{i}}&nbsp;&nbsp;</span></template>
       </el-table-column>
       <el-table-column
          label="备注"
          show-overflow-tooltip>
          <template scope="scope">{{ scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="操作">
         <template scope="scope">
            <el-button type="text" @click="write( scope.row)" style="color: #32a880">编辑</el-button>
          
            <el-button type="text" @click="del(scope.row)" style="color:#f56c6c;margin-left: 30px;">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    <!-- <el-checkbox style="margin: 10px;" v-model="select_All"   v-show="this.data.length!==0" >全选所有</el-checkbox>
    <el-button type="text" @click="del('all')" style="color:#f56c6c;margin-left: 5px;" v-show="select_All&&this.data.length!==0" >确认删除</el-button> -->
  </div>
  <!-- 添加用户模态框 -->
   <el-dialog :title="title" :visible.sync="dialog_add"  id="dialog_add" custom-class="ev_dialogClass">
      <el-form label-position="right" label-width="120px" >
        <el-form-item label="竞品名称">
          <el-input v-model="name" placeholder="多个词之间用“，”隔开" ></el-input>
        </el-form-item>
        <el-form-item label="必须包含关键词">
          <!-- <div class="mustkwcontent" @click="focus('mustkw')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block;width: 400px;">
             <img src="../../../assets/icon/kw_bixu.png" style="padding-right:5px;height: 18px ">
               <el-tag
                 :key="tag"
                 v-for="tag in mustIncludeKeyword"
                 :closable="true"
                 :close-transition="false"
                 @close="musthandleClose(tag)"
               >
               {{tag}}
               </el-tag>
               <input type="text" class="form-control" id="mustkw"  placeholder="多个词之间用“，”隔开" @blur="mustcreate_notag" v-model="mustkw" @keyup.enter="mustcreate_notag" style="height: 38px;font-size: 16px;">
           </div> -->
          <el-input v-model="mustIncludeKeyword" placeholder="多个词之间用“，”隔开" ></el-input>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="includeKeyword" placeholder="多个词之间用“，”隔开" ></el-input>
        </el-form-item>
        <el-form-item label="标题排除词">
          <el-input v-model="titleExcludeKeyword" placeholder="多个词之间用“，”隔开" ></el-input>
        </el-form-item>
        <el-form-item label="排除词">
          <el-input v-model="contentExcludeKeyword" placeholder="多个词之间用“，”隔开" ></el-input> 
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
import { publicSearch,tipsMessage,successBack,GetLocalStorage }  from '../../../assets/js/map.js'
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
      edit_data:'',
      select_All:false,//全选状态绑定
      mustags:[],
      mustkw:'',
  	}
  },
  methods: {
    search(){
      let data = {
        "method": 'get',
        "project" : {
          'parentId':GetLocalStorage('current_projectData_A') == null ? this.$router.push('/login') : GetLocalStorage('current_projectData_A').project_id,//当前项目id,
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
      console.log(this.mustIncludeKeyword)
    },
    del(dta){
      let projectIdList = [],msg = '';
      if(dta == 'all'){
        for(let i of this.data){
          projectIdList.push(i.id);
        };
        msg = '所有';
      }else{
        projectIdList.push(dta.id);
        msg = dta.name;
      };

      let data= {
                "method": 'DELETE',
                projectIdList,
                };

      this.$confirm('是否删除'+msg+ '项目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass:'ev_confirmClass',
            type: 'warning'
            }).then(() => {
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"POST",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
                if(successBack(data,this)){
                      this.search();
                      tipsMessage(data.message,'success',this);
                  };
              })  
            })
    },
   musthandleClose(tag){
      this.mustags.splice(this.mustags.indexOf(tag), 1);
      this.keyword_flag = true;
    },
  mustcreate_notag () {
        let mustkw = this.mustkw;
        let Tag = [...this.mustags,...this.notags,...this.tags,...this.t_notags];
        if (mustkw) {
          if(Tag.indexOf(mustkw) == -1){
            mustkw = mustkw.replace(/，/ig,','); //转化逗号
              let dd = mustkw.split(',');
              if(dd.length > 1){ //若输入逗号即添加的数组长度大于一即链接
                this.mustags = [...this.mustags,...dd];
                 for(var j = 0;j < this.mustags.length;j++){
                  if(this.mustags[j] == ''){
                    this.mustags.splice(j,1)
                  }
                 }
              }else{
                this.mustags.push(mustkw);
              }      
              this.mustags = Array.from(new Set(this.mustags)); 
              this.keyword_flag = true;  
            }else{
              tipsMessage('请不要输入与排除词、关键词重复的内容','warning',this);  
            }
          }    
        this.mustkw = '';
      },   
  focus (n) {
        $('#'+n+'').focus();
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
  .el-dialog{
    ::-webkit-input-placeholder {/*Chrome/Safari*/
      color:#ccc;
      font-size: 14px;
      }
   ::-moz-input-placeholder {/*Firefox*/
      color:#ccc;
      font-size: 14px;
    }
    width: 600px !important;
    .el-dialog__header{
        text-align: center;
      }
    .el-dialog__body{
      padding-left: 5px;
      padding-bottom: 10px;
      padding: 10px 5px;
      .el-input,.el-textarea{
        width: 420px;
      }
    }
    .el-dialog__footer{
      border-top-width: 0px;
      padding: 10px 20px 15px;
      .el-button{
        padding: 8px 15px;
      }
      .el-button--primary{
        padding: 8px 15px;
        background-color: #32a880;
        border-color: #32a880;
      }
    }
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
        td,th{
          padding: 6px 0;
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
    .current-row td{
      background-color: none;
    }
    .cell{
      text-align: center;
      padding: 0;
    }
    td{
      padding: 0;
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
    .el-checkbox__input.is-checked+.el-checkbox__label{
      color: #e6a23c;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #e6a23c;
      border-color: #e6a23c;
    }
  }
  
</style>
