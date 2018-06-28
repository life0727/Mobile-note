<template>  
<div class="clever_content_next ">
  <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" style="margin-top: 3%; margin-left: 10%;width: 100%;">
    <form class="form-horizontal">
      <div class="form-group" style="margin-bottom: 20px;">
       <!--  <label for="name" class="col-sm-2 control-label">方案名：</label> -->
        <div class="col-sm-10" style="border-radius:4px;padding:0 4px;width:80%;border: 1px solid #ccc;margin-left: 3px;">
          <img src="../../assets/icon/project.png" style="padding-left:5px;">
          <input type="text" class="form-control" id="name" placeholder="输入项目名称" v-model="name" style="width:60%;display: inline-block" @blur="pro_name">
        </div> 
      </div>
    </form>
    <form class="form-horizontal" style="margin-bottom: 10px;">
        <div class="form-group" style="margin-bottom: 10px !important;">
         <!--  <label for="notkw" class="col-sm-2 control-label">排除词：</label> -->
          <div class="col-sm-10 mustkwcontent" @click="focus('mustkw')" style="margin-left: 3px;" >
          <img src="../../assets/icon/add_bixu.png" style="padding-left:5px;">
                  <el-tag
            :key="tag"
            v-for="tag in mustags"
            :closable="true"
            :close-transition="false"
            @close="musthandleClose(tag)"
          >
          {{tag}}
          </el-tag>
            <input type="text" class="form-control" id="mustkw"  placeholder="输入必须包含关键词" @blur="mustcreate_notag" v-model="mustkw" @keyup.enter="mustcreate_notag" style="width: 35%;" >
          </div> 
          <span style="font-size: 10px;margin-left: 65%;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span>    
        </div>  
      </form>
    <form class="form-horizontal">
      <div class="form-group" style="margin-bottom: 10px !important;">
        <!-- <label for="kw" class="col-sm-2 control-label">关键词：</label> -->
        <div class="col-sm-10 kwcontent"  @click="focus('kw')" style="margin-left: 3px;">
          <img src="../../assets/icon/add_baohan.png" style="padding-left:5px;">
                <el-tag
          :key="tag"
          v-for="tag in tags"
          :closable="true"
          :close-transition="false"
          @close="handleClose(tag)"
        >
        {{tag}}
        </el-tag>
          <input type="text" class="form-control" id="kw" placeholder="输入关键词" @blur="create_tag" v-model="kw" @keyup.enter="create_tag">
        </div> 
        <span style="font-size: 10px;margin-left: 65%;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span>      
      </div>  
    </form>  

    <form class="form-horizontal">
      <div class="form-group" style="margin-bottom: 10px !important;">
       <!--  <label for="notkw" class="col-sm-2 control-label">排除词：</label> -->
        <div class="col-sm-10 t_notkwcontent" @click="focus('t_notkw')" style="margin-left: 3px;">
          <img src="../../assets/icon/kw_not.png" style="padding-left:5px;">
                <el-tag
          :key="tag"
          v-for="tag in t_notags"
          :closable="true"
          :close-transition="false"
          @close="t_nothandleClose(tag)"
        >
        {{tag}}
        </el-tag>
          <input type="text" class="form-control" id="t_notkw" placeholder="输入标题排除词" @blur="t_notcreate_notag" v-model="t_notkw" @keyup.enter="t_notcreate_notag">
        </div> 
        <span style="font-size: 10px;margin-left: 65%;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span>    
      </div>  
    </form>

    <form class="form-horizontal">
      <div class="form-group" style="margin-bottom: 10px !important;">
       <!--  <label for="notkw" class="col-sm-2 control-label">排除词：</label> -->
        <div class="col-sm-10 notkwcontent" @click="focus('notkw')" style="margin-left: 3px;">
          <img src="../../assets/icon/kw_not_content.png" style="padding-left:5px;">
                <el-tag
          :key="tag"
          v-for="tag in notags"
          :closable="true"
          :close-transition="false"
          @close="nothandleClose(tag)"
        >
        {{tag}}
        </el-tag>
          <input type="text" class="form-control" id="notkw" placeholder="输入排除词" @blur="notcreate_notag" v-model="notkw" @keyup.enter="notcreate_notag">
        </div> 
        <span style="font-size: 10px;margin-left: 65%;color:#999"><i style="color:red">*</i>多个词之间用“<i style="color:red">，</i>”隔开</span> 
        <p :style="{color:'#999',transition: '1s',opacity:show_moren}" class="moren">是否添加默认排除词：
        <el-button type="info" :style="{display:show_moren==1? 'inline-block' : 'none'}" @click="add_moren">确 定</el-button> 
        <el-button type="warning" :style="{display:show_moren==1? 'inline-block' : 'none'}"  @click="show_moren=0">取消</el-button></p>   
      </div>  
    </form>
    <p style="margin-left: -15px;margin-bottom: 0px !important;">备注信息：</p>
    <form class="form-horizontal">
      <div class="form-group" >
        <!-- <label for="beizhu" class="col-sm-2 control-label">备注信息：</label> -->
        <textarea id="beizhu" style="width:80%; border: 1px solid #ccc;outline:none;margin-left: 3px;" v-model="remark"></textarea>
      </div>  
    </form>
  </el-form>
  <!-- <div class="col-xs-5" style="margin-top:4%;margin-bottom: 5%;" >
    <router-link to="/index/clever/clever_content">
      <button type="button" class="btn btn-success btn-lg btn-inline-block " style="width:20%;margin-left: 90%;">上一步</button>
    </router-link>  
  </div>  --> 
  <!-- <div class="col-xs-5" style="margin-top:4%;margin-bottom: 5%;" >  -->
      <!-- <button type="button" class="btn btn-primary  " style="margin-left: 38%;background-color: rgb(0, 179, 138); border-color: rgb(0, 179, 138); padding: 5px 15px;" @click="kw_down">完成</button>  -->  
      <el-button type="primary" @click="kw_down" style="margin-left: 55%;background-color:#00b38a;border-color: #00b38a;padding: 9px 16px;">确 定</el-button> 
 <!--  </div>  -->

</div>  
</template>
<script >
import { publicSearch,tipsMessage,successBack,GetSessionStorage,SetSessionStorage,SetLocalStorage,GetLocalStorage }  from '../../assets/js/map.js'
  export default{
    data : function(){ 
        return{
          name:'',
          labelPosition: 'left',
          formLabelAlign: {},
          tags: [],
          kw:'',
          notags:[],
          notkw:'',
          t_notags:[],
          t_notkw:'',
          mustags:[],
          mustkw:'',
          remark:'',
          show_moren:0
      }
    },
    methods:{
      pro_name(){
        this.show_moren=1;
      },
      add_moren(){
         publicSearch('rsa/defaultExcludeKeyword',"POST",{"method": 'get'}).then((data) =>{
          if(successBack,this){
            this.notags=this.notags.concat(data.data.defaultExcludeKeywords);
            this.notags=Array.from(new Set(this.notags));
            this.show_moren=0;
          }
         });
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      musthandleClose(tag){
        this.mustags.splice(this.mustags.indexOf(tag), 1);
      },
      nothandleClose(tag) {
        this.notags.splice(this.notags.indexOf(tag), 1);
        if(this.notags.length==0){
          this.show_moren=1;//恢复默认排除次提示
        }
      },
      t_nothandleClose(tag) {
        this.t_notags.splice(this.t_notags.indexOf(tag), 1);
      },       
      create_tag () {
        let kw = this.kw;
        let Tag=this.mustags.concat(this.notags).concat(this.tags)
        if (kw) {
          if(Tag.indexOf(kw)==-1){
            kw=kw.replace(/，/ig,','); //转化逗号
              let dd=kw.split(',');
              if(dd.length>1){ //若输入逗号即添加的数组长度大于一即链接
                console.log(dd)
                this.tags=this.tags.concat(dd);
                 for(var j=0;j<this.tags.length;j++){
                  console.log(this.tags[j])
                  if(this.tags[j]==''){
                    this.tags.splice(j,1)
                  }
                 }
              }else{
                this.tags.push(kw);
              }   
              this.tags=Array.from(new Set(this.tags));   
            }else{
              tipsMessage('请不要输入与排除词、关键词重复的内容','warning',this);
            }
          }    
        this.kw=''
      },
      mustcreate_notag () {
        let mustkw = this.mustkw;
        let Tag=this.mustags.concat(this.notags).concat(this.tags)
        if (mustkw) {
          if(Tag.indexOf(mustkw)==-1){
            mustkw=mustkw.replace(/，/ig,','); //转化逗号
              let dd=mustkw.split(',');
              if(dd.length>1){ //若输入逗号即添加的数组长度大于一即链接
                this.mustags=this.mustags.concat(dd);
                 for(var j=0;j<this.mustags.length;j++){
                  if(this.mustags[j]==''){
                    this.mustags.splice(j,1)
                  }
                 }
              }else{
                this.mustags.push(mustkw);
              }
              this.mustags=Array.from(new Set(this.mustags));      
            }else{
              tipsMessage('请不要输入与排除词、关键词重复的内容','warning',this); 
            }
          }    
        this.mustkw=''
      },
    notcreate_notag () {
        let notkw = this.notkw;
        let Tag=this.mustags.concat(this.tags)
        if (notkw) {
          if(Tag.indexOf(notkw)==-1){
            notkw=notkw.replace(/，/ig,','); //转化逗号
              let dd=notkw.split(',');
              if(dd.length>1){ //若输入逗号即添加的数组长度大于一即链接
                this.notags=this.notags.concat(dd);
                 for(var j=0;j<this.notags.length;j++){
                  if(this.notags[j]==''){
                    this.notags.splice(j,1)
                  }
                 }
              }else{
                this.notags.push(notkw);
              }   
              this.notags=Array.from(new Set(this.notags));   
            }else{
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
            }
          }   
        this.notkw=''
      },
      t_notcreate_notag () {
        let t_notkw = this.t_notkw;
        let Tag=this.mustags.concat(this.tags)
        if (t_notkw) {
          if(Tag.indexOf(t_notkw)==-1){
            t_notkw=t_notkw.replace(/，/ig,','); //转化逗号
              let dd=t_notkw.split(',');
              if(dd.length>1){ //若输入逗号即添加的数组长度大于一即链接
                this.t_notags=this.t_notags.concat(dd);
                 for(var j=0;j<this.t_notags.length;j++){
                  if(this.t_notags[j]==''){
                    this.t_notags.splice(j,1)
                  }
                 }
              }else{
                this.t_notags.push(t_notkw);
              }     
              this.t_notags=Array.from(new Set(this.t_notags));  
            }else{
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
            }
          }   
        this.t_notkw=''
      },
      focus (n) {
        $('#'+n+'').focus();
      },
      kw_down () {
        if(this.name.length==0||this.mustags.length+this.tags.length==0){
          tipsMessage('不要忘了写方案名或者必须关键词和关键词不能同时为空','warning',this);
        }else{
          let data = {
             "method": 'post',
             "project":{
              "name":this.name,
              "simpleModelId": GetSessionStorage('simpleModelId'),
              "remark": this.remark,
             },
             "includeKeywords": this.tags,
             'mustIncludeKeywords':this.mustags,
             'titleExcludeKeywords':this.t_notags,
              'contentExcludeKeywords': this.notags
          }
          publicSearch('rsa/project',"POST",{"projectDto":JSON.stringify(data)}).then((data) =>{
          if(successBack(data,this)){
            console.log(data)
            let projectData = {};
                if(GetLocalStorage('current_projectData_A') == null || GetLocalStorage('current_projectData_A').project_list == null){
                  projectData.project_list = [data.data]
                }else{
                  projectData.project_list = [...[data.data],...GetLocalStorage('current_projectData_A').project_list];
                };
                //[...GetLocalStorage('current_projectData_A').project_list,...data.data];
                projectData.project_id = data.data.id;
                projectData.project_name = data.data.name;
                SetLocalStorage('current_projectData_A',projectData);
                this.$router.push('/main/refer')
            /*SetSessionStorage('start',data.data.name);
            SetSessionStorage('project_id',data.data.id);
            window.location.href="#/main/refer";*/
          }
         });
        }
      }
    }
  }
</script>
<style lang="scss" >
    .clever_content_next{
       ::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#ccc;
    }
    ::-moz-input-placeholder {/*Firefox*/
    color:#ccc;
    };
      button:hover{
        opacity: 0.8;
      }
      .form-horizontal{
        .moren{
          button{
            margin-left: 20px;padding: 3px 3px;
          }
        }
        #name{
          border:none;
          padding:0px 4px;
          box-shadow:none;    
        }
        #kw{
          display: inline-block;
          width:30%;
          outline: none !important;
          border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;
         
        }
        .kwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:80%;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(50,168,128)
          }
        }
        .notkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:80%;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(237,99,84)
          }
        }
        #notkw{
          display: inline-block;
          width:30%;
          outline: none !important;
          border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;            
        }
        .t_notkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:80%;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(237,99,84)
          }
        }
        #t_notkw{
          display: inline-block;
          width:30%;
          outline: none !important;
          border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;            
        }
        .mustkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:80%;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(50,168,128)
          }
        }
        #mustkw{
          display: inline-block;
          width:30%;
          outline: none !important;
          border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px; 
        }
        .el-tag{
          padding: 0;
          height: 22px;
          line-height: 22px;
          color: white;
          background-color: rgba(239,107,63,.7);
          .el-icon-close{
            color: white;
          }
        }
        input:-webkit-autofill{
          background-color: white !important;
        } 
      }
    }
</style>