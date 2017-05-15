<template>
  <div class="keyword container">
    <h3>修改关键词:</h3>
    <hr>
    <el-form :label-position="labelPosition" label-width="120px" :model="formLabelAlign" style="margin-top: 3%; width:50%;margin-left: 24%;">
      <form class="form-horizontal">
        <div class="form-group" style="margin-bottom: 28px;">
          <label for="name" class="col-sm-2 control-label">方案名：</label>
          <div class="col-sm-10" style="border-radius:4px;padding:0;width:80%;">
            <input type="text" class="form-control" id="name" placeholder="招商银行" v-model="project_name">
          </div> 
        </div>
      </form>
      <form class="form-horizontal">
        <div class="form-group">
          <label for="kw" class="col-sm-2 control-label">关键词：</label>
          <div class="col-sm-10 kwcontent"  @click="focus('kw')">
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
          <span style="font-size: 12px;margin-left: 73%;"><i style="color:red">*</i>（多个词之间用“<i style="color:red">，</i>”隔开）</span>      
        </div>  
      </form>  
      </el-form-item>
      <form class="form-horizontal">
        <div class="form-group">
          <label for="notkw" class="col-sm-2 control-label">排除词：</label>
          <div class="col-sm-10 notkwcontent" @click="focus('notkw')">
                  <el-tag
            :key="tag"
            v-for="tag in notags"
            :closable="true"
            :close-transition="false"
            @close="nothandleClose(tag)"
          >
          {{tag}}
          </el-tag>
            <input type="text" class="form-control" id="notkw" placeholder="输入关键词" @blur="notcreate_notag" v-model="notkw" @keyup.enter="notcreate_notag">
          </div> 
          <span style="font-size: 12px;margin-left: 73%;"><i style="color:red">*</i>（多个词之间用“<i style="color:red">，</i>”隔开）</span>    
        </div>  
      </form>
    </el-form>
    <router-link to="/main/list">
      <button type="button" class="btn btn-info btn-md btn-inline-block " style="width:8%;margin-left: 46%;margin-top:4%;" @click="to_list">保存</button>
    </router-link> 
  </div>
</template>

<script>
export default {
  mounted :function () {
    let _this=this;
    let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
    $('.keyword').css('height',window.screen.height);
    $.ajax({
     type: "GET",
     url: 'api/v1.1/project/'+project_id+'/keyword',
     traditional: true,
     data: {
         "method": 'get'
     },
     success: function(data){
      for(let i=0;i<data.data.keywordList.length;i++){
        if(data.data.keywordList[i].isIncluded==0){
            _this.notags.push(data.data.keywordList[i].name)
        }else{
          _this.tags.push(data.data.keywordList[i].name)
        }
       } 
      }
    })
  },
  data () {
  	return {
          labelPosition: 'left',
          formLabelAlign: {
            name: '招商银行',
            region: '',
            type: ''
          },
          project_name:'',
          tags: [],
          kw:'',
          notags:[],
          notkw:''
      }
  	},
  methods: {
    to_list () {
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $.ajax({
     type: "POST",
     url: 'api/v1.1/project/'+project_id+'/keyword',
     traditional: true,
     data: {
    'method': 'post',
    'includeKeywords': this.tags,
    'excludeKeywords': this.notags
     },
     success: function(data){
        console.log(JSON.stringify(data));
        console.log(data.success);
        console.log(data.message);
        console.log(_this.notags)
     }
    })
      $('.el-tabs__item:eq(0)').addClass('is-active');
      $('.el-tabs__item:eq(1)').removeClass('is-active');
    },
    handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
    nothandleClose(tag) {
        this.notags.splice(this.notags.indexOf(tag), 1);
      },      
    create_tag () {
        let kw = this.kw;
        if (kw) {
          kw=kw.replace(/，/ig,','); //转化逗号
          let dd=kw.split(',');
          if(dd.length>1){ //若输入逗号即添加的数组长度大于一即链接
            this.tags=this.tags.concat(dd);
             for(var j=0;j<this.tags.length;j++){
              if(this.tags[j]==''){
                this.tags.splice(j,1)
              }
             }
          }else{
            this.tags.push(kw);
          }      
        }
        this.kw=''
      },
    notcreate_notag () {
        let notkw = this.notkw;
        if (notkw) {
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
        }
        this.notkw=''
      },
    focus (n) {
        $('#'+n+'').focus();
      },
    blur () { 
    }
  }
}
</script>

<style lang="scss" scoped>
  .keyword{
    >h3{
      margin-left: 6%;
      color:#f0ad4e
    }
    >hr{
      margin: 10px 0;
    }
    .form-horizontal{
        #name{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          box-shadow:none; 
          background: snow;        
        }
        #kw{
          display: inline-block;
          width:30%;
          outline: none !important;
          border-width: 0;
          text-decoration: none;
          box-shadow:none;
          padding: 6px 4px;
          background: snow;
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
          background: snow;         
        }
        .el-tag{
          padding: 0;
          background-color: rgba(239,107,63,.7);
          i{
            right:0;
          }
        }
      }
  }
</style>