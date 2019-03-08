<template>
<div style="margin-top: 30px;">
   <el-tabs @tab-click="Tabclick" tab-position="top"  style="width: 1250px;height: 500px;margin: 15px auto;"  v-model="activeName">
    <p style="border-bottom: 1px solid white;width:100%;position: absolute;z-index: 99"></p>
   <!-- 关键词管理 -->
    <el-tab-pane label="关键词管理" name="_keywordTab">
      <div class="keyword container" style="background-color: #fff;">
        <el-form label-position="right" style="margin-top: 3%; width:70%;margin-left: 20%;">
          <form class="form-horizontal" style="margin-top:60px;margin-bottom: 40px;">
            <div class="form-group">
             <label for="mustkw" class="control-label">必须包含关键词</label> 
              <!-- <div class="mustkwcontent" @click="focus('mustkw')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block">
                  <img src="../../assets/icon/kw_bixu.png" style="padding-right:5px;height: 18px ">
                          <el-tag
                    :key="tag"
                    v-for="tag in mustags"
                    :closable="true"
                    :close-transition="false"
                    @close="musthandleClose(tag)"
                  >
                  {{tag}}
                  </el-tag>
                    <input type="text" class="form-control" id="mustkw"  placeholder="多个词之间用“，”隔开" @blur="mustcreate_notag" v-model="mustkw" @keyup.enter="mustcreate_notag" style="height: 38px;font-size: 16px;">
                  </div> -->    
              <input type="text" class="form-control" id="mustkw"  placeholder="多个词之间用“，”隔开" @blur="mustcreate_notag" v-model="mustkw" @keyup.enter="mustcreate_notag" style="height: 38px;font-size: 16px;">    
            </div>  
          </form>

          <form class="form-horizontal" style="margin-bottom: 40px;">
            <div class="form-group">
              <label for="kw" class="control-label">关键词</label>
              <!-- <div class="kwcontent"  @click="focus('kw')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block ">
                  <img src="../../assets/icon/kw_guanjianci.png" style="width:20px;height: 18px">
                          <el-tag
                    :key="tag"
                    v-for="tag in tags"
                    :closable="true"
                    :close-transition="false"
                    @close="handleClose(tag)"
                  >
                  {{tag}}
                  </el-tag>
                    <input type="text" class="form-control" id="kw" placeholder="多个词之间用“，”隔开" @blur="create_tag" v-model="kw" @keyup.enter="create_tag" style="height: 38px;font-size: 16px;">
                  </div> -->    
                <input type="text" class="form-control" id="kw" placeholder="多个词之间用“，”隔开" @blur="create_tag" v-model="kw" @keyup.enter="create_tag" style="height: 38px;font-size: 16px;">  
            </div>  
          </form>  

          <form class="form-horizontal" style="margin-bottom: 40px;">
            <div class="form-group">
             <label for="t_notkw" class="control-label">标题排除词</label>
              <!-- <div class="t_notkwcontent" @click="focus('t_notkw')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block ">
                  <img src="../../assets/icon/kw_not.png" >
                          <el-tag
                    :key="tag"
                    v-for="tag in t_notags"
                    :closable="true"
                    :close-transition="false"
                    @close="t_nothandleClose(tag)"
                  >
                  {{tag}}
                  </el-tag>
                    <input type="text" class="form-control" id="t_notkw" placeholder="多个词之间用“，”隔开" @blur="t_notcreate_notag" v-model="t_notkw" @keyup.enter="t_notcreate_notag" style="height: 38px;font-size: 16px;">
                  </div> -->    
              <input type="text" class="form-control" id="t_notkw" placeholder="多个词之间用“，”隔开" @blur="t_notcreate_notag" v-model="t_notkw" @keyup.enter="t_notcreate_notag" style="height: 38px;font-size: 16px;">    
            </div>  
          </form>

          <form class="form-horizontal" >
            <div class="form-group">
             <label for="notkw" class="control-label">排除词</label>
              <!-- <div class="notkwcontent" @click="focus('notkw')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block ">
                <img src="../../assets/icon/kw_not_content.png" >
                        <el-tag
                  :key="tag"
                  v-for="tag in notags"
                  :closable="true"
                  :close-transition="false"
                  @close="nothandleClose(tag)"
                >
                {{tag}}
                </el-tag>
                  <input type="text" class="form-control" id="notkw" placeholder="多个词之间用“，”隔开" @blur="notcreate_notag" v-model="notkw" @keyup.enter="notcreate_notag" style="height: 38px;font-size: 16px;">
                </div>  -->  
              <input type="text" class="form-control" id="notkw" placeholder="多个词之间用“，”隔开" @blur="notcreate_notag" v-model="notkw" @keyup.enter="notcreate_notag" style="height: 38px;font-size: 16px;">  
            </div>  
          </form>
            <p :style="{transition: '1s',marginTop:'20px',marginLeft:'42px',opacity:show_moren}" class="moren">是否添加默认排除词：
              <el-button type="info" :style="{display:show_moren==1? 'inline-block' : 'none',background:'rgba(255, 204, 102, 1)',borderColor:'rgba(255, 204, 102, 1)',padding:'3px 22px',marginLeft:'25px'}" @click="add_moren">是</el-button> 
              <el-button :style="{display:show_moren==1? 'inline-block' : 'none',background:'#fff',borderColor:'#fff',marginLeft:'25px',color:'#999999'}"  @click="show_moren=0">否</el-button>
            </p>
        </el-form>
          <button type="button" class="btn  btn-md btn-inline-block " style="width:66px;margin-left: 46%;margin-top:4%;height: 34px;font-size: 18px;background-color: #00a17c;
        border-color: #00a17c;color: white;" @click="to_list">保存</button>
      </div>
    </el-tab-pane>

    <el-tab-pane label="竞品管理" name="_competTab" >
      <compet></compet>
    </el-tab-pane>

    <el-tab-pane label="基本信息管理" name="_messageTab">
      <div class="basicMsg ">
        <el-form label-position="right" style="padding-top: 3%; width:70%;margin-left: 20%;">
          <form class="form-horizontal" style="margin-top:60px;margin-bottom: 40px;">

            <div class="form-group" style="margin-bottom: 40px;">
             <label for="name" class="control-label">项目名称</label> 
              <div @click="focus('name')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block;">
                <input type="text" class="form-control" id="name"  placeholder=""  v-model="project_name"  style="height: 38px;font-size: 16px;width: 570px;">
              </div>    
            </div>  
  
            <div class="form-group" style="margin-bottom: 40px;">
             <label for="projectUser" class="control-label">项目管理者</label> 
              <div @click="focus('projectUser')" style="padding-left: 10px;border-color:#ebebeb;display: inline-block;">
                <input type="text" class="form-control" id="projectUser"  placeholder=""  v-model="projectUser"  style="height: 38px;font-size: 16px;width: 570px;">
              </div>    
            </div> 
              
             <el-form label-width="100px"> 
              <el-form-item label="项目简介">
                <el-input type="textarea" v-model="projectBrief" ></el-input>
              </el-form-item>
             </el-form> 

          </form>
            <button type="button" class="btn  btn-md btn-inline-block " style="width:66px;margin-left: 45%;margin-top:4%;height: 34px;font-size: 18px;background-color: #00a17c;
        border-color: #00a17c;color: white;" @click="save_basicUser">保存</button>
        </el-form>
      </div>
    </el-tab-pane>
  </el-tabs>
  
</div>  
</template>
<script>
import { publicSearch,tipsMessage,successBack,GetLocalStorage }  from '../../assets/js/map.js'
import compet from './main/compet.vue'
export default {
  mounted :function () {
    $('.keyword').css('height',(document.body.clientHeight-82)+'px');
    let proId = GetLocalStorage('current_projectData_A') == null ? this.$router.push('/login') : GetLocalStorage('current_projectData_A').project_id;
    publicSearch('rsa/project/'+proId+'/keyword',"GET",{"keywordDto":JSON.stringify({"method": 'get'})}).then((data) =>{//ajax
      if(successBack(data,this)){
        this.notkw = data.data.contentExcludeKeywordList.toString();
        this.kw = data.data.includeKeywordList.toString();
        this.mustkw = data.data.mustIncludeKeywordList.toString();
        this.t_notkw = data.data.titleExcludeKeywordList.toString();
        this.orginData = data.data;
      }
    });  
  },
  components:{
    compet
  },
  data () {
  	return {
          orginData:'',
          activeName:this.$store.state.keyword_tab,
          project_name:GetLocalStorage('current_projectData_A') == null ? '' : GetLocalStorage('current_projectData_A').project_name,
          projectUser:'',//项目管理者
          projectBrief:'',//项目简介
          //tags: [],
          kw:'',
          //notags:[],
          notkw:'',
          //t_notags:[],
          t_notkw:'',
          //mustags:[],
          mustkw:'',
          show_moren:1,
          keyword_flag:false
      }
  	},
  methods: {
    add_moren(){
        publicSearch('rsa/defaultExcludeKeyword/',"POST",{"method": 'get'}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.notkw =  Array.from(new Set([...this.notkw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...data.data.defaultExcludeKeywords].filter(x => x&&$.trim(x).length > 0))).toString();;
            this.show_moren = 0;
            this.keyword_flag = true;
          }    
        });  
      },
    to_list () {
      if(this.mustkw.length + this.kw.length == 0){
        tipsMessage('必须包含关键词和关键词不能同时为空','warning',this)
        return;
      };
      console.log(this.mustkw)
      if(this.keyword_flag){
        let data = {
          'method': 'post',
          'includeKeywordList': this.kw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
          'mustIncludeKeywordList':this.mustkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
          'titleExcludeKeywordList':this.t_notkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0),
          'contentExcludeKeywordList': this.notkw.replace(/，/ig,',').split(',').filter(x => x&&$.trim(x).length > 0)
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/keyword',"POST",{'keywordDto':JSON.stringify(data)}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.$store.state.list_Data = '';//文章管理模块数据
            this.$store.state.data = '';//事件模块数据
            this.$store.state.ev_duibidata = '';//事件的对比数据
            //_this.$store.state.start_data='';//事件模块原始数据
            this.$store.state.btn_daochu = false;//事件导出按钮状态
            this.$store.state.btn_org = false;//组织按钮
            this.$store.state.org_Data = '';//组织数据
            this.$store.state.org_duibiData = '';//组织的对比数据
            this.$store.state.btn_media = false;//媒体按钮
            this.$store.state.media_Data = '';//媒体数据
            this.$store.state.media_duibiData = '';//媒体的对比数据
            tipsMessage('修改成功','success',this)
          }
        });  
      }else{
        tipsMessage('未修改','warning',this)
      }    
    },
    create_tag () {
        this.kw = Array.from(new Set(this.kw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...this.t_notkw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
        if(this.kw.length){
          for(let i of this.kw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与排除词、关键词重复的内容','warning',this); 
              this.focus('kw');
              return;
            }
          };
        };
        this.kw === this.orginData.includeKeywordList.toString() ? this.keyword_flag = false : this.keyword_flag = true;
    },
    notcreate_notag () {
        this.notkw = Array.from(new Set(this.notkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
        let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.kw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
        if(this.notkw.length){
          for(let i of this.notkw.replace(/，/ig,',').split(',')){
            if(Tag.indexOf(i) != -1){
              tipsMessage('请不要输入与关键词重复的内容','warning',this); 
              this.focus('notkw');
              return;
            }
          }
        };
        this.notkw === this.orginData.contentExcludeKeywordList.toString() ? this.keyword_flag = false : this.keyword_flag = true;
    },
    t_notcreate_notag () {
      this.t_notkw = Array.from(new Set(this.t_notkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
      let Tag = [...this.mustkw.replace(/，/ig,',').split(','),...this.kw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0);
      if(this.t_notkw.length){
        for(let i of this.t_notkw.replace(/，/ig,',').split(',')){
          if(Tag.indexOf(i) != -1){
            tipsMessage('请不要输入与关键词重复的内容','warning',this); 
            this.focus('t_notkw');
            return;
          }
        }
      };
      this.t_notkw === this.orginData.titleExcludeKeywordList.toString() ? this.keyword_flag = false : this.keyword_flag = true;
    },
    mustcreate_notag () {
      this.mustkw = Array.from(new Set(this.mustkw.replace(/，/ig,',').split(','))).filter(x => x&&$.trim(x).length > 0).toString();
      let Tag = [...this.kw.replace(/，/ig,',').split(','),...this.notkw.replace(/，/ig,',').split(','),...this.t_notkw.replace(/，/ig,',').split(',')].filter(x => x&&$.trim(x).length > 0)
      if(this.mustkw.length){
        for(let i of this.mustkw.replace(/，/ig,',').split(',')){
          if(Tag.indexOf(i) != -1){
            tipsMessage('请不要输入与关键词重复的内容','warning',this); 
            this.focus('mustkw');
            return;
          }
        }
      };
      this.mustkw === this.orginData.mustIncludeKeywordList.toString() ? this.keyword_flag = false : this.keyword_flag = true; 
    },
    focus (n) {
        $('#'+n+'').focus();
    },
    save_basicUser(){

    },
    Tabclick(tab){
      this.$store.state.keyword_tab = tab.name;
      console.log(tab)
    }
  },
  watch:{
    notkw(){
      this.notkw.length == 0 ? this.show_moren = 1 : '';
    }
  }
}
</script>

<style lang="scss" >
.el-tabs{
  .el-tabs__header{
    margin: 0 0 0 80px;
    .el-tabs__content{
      height: 600px;
    }
    .el-tabs__active-bar{
      height: 6px;
      background-color: #32a880;
    }
    .is-active{
      color: #32a880;
    }
    .el-tabs__item{
      font-size: 16px;
    }
    #tab-_competTab{
      padding: 0 35px;
    }
    .el-tabs__item:hover{
      color: #32a880;
    }
  }
}
  .keyword{
    ::-webkit-scrollbar {    width: 12px;}/* 滚动槽 */
    ::-webkit-scrollbar-track {    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    border-radius: 10px;}/* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {    border-radius: 10px;    background:  #00b38a;;    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}
    ::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#ccc;
    }
    ::-webkit-input-placeholder {/*Chrome/Safari*/
      color:#ccc;
      font-size: 14px;
      }
   ::-moz-input-placeholder {/*Firefox*/
      color:#ccc;
      font-size: 14px;
    }
    >h3{
      margin-left: 6%;
      color:#f0ad4e
    }
    >hr{
      margin: 10px 0;
    }
    .moren{ 
      .el-button--default:hover{
        color: rgb(255, 204, 102) !important;
       }
          button{
            margin-left: 20px;padding: 3px 3px;
          }
        }
    .form-horizontal{
      .control-label{
        width: 100px;
        margin-right: 25px;
        font-weight: 500;
      }
        #name{
          display: inline-block;
          width:70%;
          outline: none !important;
          //border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;
                 
        }
        #kw{
          display: inline-block;
          width:70%;
          outline: none !important;
          //border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;
          
        }
        .kwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:570px;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(50,168,128);
          }
        }
        .notkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:570px;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(237,99,84)
          }
        }
        #notkw{
          display: inline-block;
          width:70%;
          outline: none !important;
          //border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px; 
        }
        .t_notkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:570px;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(237,99,84)
          }
        }
        #t_notkw{
          display: inline-block;
          width:70%;
          outline: none !important;
          //border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px; 
        }
        .mustkwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:570px;
          cursor:text;
          >.el-tag{
            margin-left: 3px;
            background: rgb(50,168,128)
          }
        }
        #mustkw{
          display: inline-block;
          width:70%;
          outline: none !important;
          //border-width: 0;
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
            color: yellow !important;
          }
        }
      }
  }
  .basicMsg{
    background-color: rgb(255, 255, 255); 
    height: 706px;
    .control-label{
        width: 100px;
    }
    textarea{
      height: 220px; 
      font-size: 16px;
      width: 570px; 
    }
    textarea:focus { 
      border-color: #00b38a;
      outline: 0;
    }    
  }
</style>