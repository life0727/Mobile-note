<template>
 <div class="" style="padding:0;">
  <div class="refer container" style="padding-left: 20px;padding-right: 20px;background-color:white;padding-bottom: 140px;">
    <div class="filter" style="border-radius: 4px;padding-bottom: 20px;">
      <div class="btn-group" role="group" aria-label="..." style="margin-top:20px">
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:76px;font-size: 14px;"><b>文章类型：</b></button>
          <button :class="articleType==0 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=0">全部</button>
          <button :class="articleType==1 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=1" >新闻</button>
          <button :class="articleType==2 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=2" >微信</button>
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:35px;font-size: 14px;"><b>时间：</b></button>
          <button :class="time[1]-time[0]==604800000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-left: 20px !important;" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</button>
          <button :class="time[1]-time[0]==86400000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-left: 9px !important;" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</button>
          <button :class="time[1]-time[0]==172800000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-left: 9px !important;" @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</button>
          <div class="block" style="display: inline-block;margin-left: 9px !important;">
              <el-date-picker
              style="position: relative;width:170px;font-size: 12px;"
              @change="date_change"
              :editable="edit"
              :clearable="edit"
                v-model="time[0]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </div>
          <div class="block" style="display: inline-block">
              <span class="demonstration">至</span>
              <el-date-picker
              @change="date_change"
              :editable="edit"
              :clearable="edit"
              style="position: relative;width:170px;font-size: 12px;"
                v-model="time[1]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </div>
       </div>
      <div class="btn-group fadeInDown animated" role="group" aria-label="..." style="height: 50px;">
          <button id="worrd" class="btn btn-default filter_name" style="border:none;background: #f7f7f7;margin-top:16px;margin-left: 30% !important;"><b style="font-size: 16px;">行业核心关键词：</b></button>
          <el-input v-model="industry" placeholder="多个关键词之间用,隔开" @blur="verificationKeyword('industry')" size="small" style="width: 20% !important;margin-top:16px;margin-left:90px;"></el-input>    
      </div>
      <hr> 
      <div class="btn-group" role="group" aria-label="..." style="margin-top:20px;padding-bottom: 10px;" >
        <div class="formDiv" v-for="(i,$index) in enterpriseData" @mouseover="moverFromItem($index)" @mouseout="moutFromItem($index)">
           <el-form :inline="true"  style="margin-left: 20%;"  >
              <el-form-item label="企业名称" :class="$index%2 == 0 ? 'fadeInLeft animated' : 'fadeInRight animated'">
                <el-input v-model="i.name" placeholder="企业名称"></el-input>
              </el-form-item>
              <el-form-item label="企业关键词" style="margin-left: 100px;" :class="$index%2 == 0 ? 'fadeInLeft animated' : 'fadeInRight animated'">
                <el-input v-model="i.keywordList" @blur="verificationKeyword($index)" placeholder="多个关键词之间用,隔开"></el-input>
              </el-form-item>
              <p style="display: inline-block;margin-top: 8px;">
                <el-button icon="plus" v-show="$index == enterpriseData.length-1 && enterpriseData.length <= 4" style="margin-left: 20px;" type=info @click="addEnterpriseData"></el-button> 
                <button type="button" class="btn btn-danger fadeIn animated"  style="margin-left: 20px;width: 32px;line-height: 1;display: none;"  ref="delEnterprise" @click="delEnterpriseData($index)"><i class="fa fa-minus" ></i></button> 
              </p> 
            </el-form>
        </div>
        <el-button type="success" style="position: absolute;bottom: 0px;left: 44.5%;background-color: #00b38a;border-color:#00b38a; " @click="search" v-loading.fullscreen.lock="loading" element-loading-text="系统拼命加载中...">搜索</el-button>  
       </div>
    </div>
    <p style="margin:20px 0 0 0;position: relative">企业提及率占比图 <el-button type="success" @click="change_echart" style="position: absolute;right: 10px;background-color: #00b38a;border-color:#00b38a; padding: 2px 5px;">切换为{{bar_pie}}图</el-button>></p>
    <div id="refer_echart" style="width: 100%;height: 500px;margin: 5px auto;border: 1px dashed gray"></div>
  </div>
 </div>   
</template>

<script>
import echarts from 'echarts'
import _echart from '../../assets/js/_echart.js'
import { date_change,Map }  from '../../assets/js/map.js'
export default {
  mounted:function () {   
    this.$store.state.refer_data == '' ? console.log('初始化提及率') : _echart.build_refer_bar(this.data,'refer_echart');
  },
  data () {
    return {
      articleType:this.$store.state.refer_articleType == '' ? 2 : this.$store.state.refer_articleType,
      time:this.$store.state.refer_time == '' ? [new Date(new Date().getTime()-604800000), new Date()] : this.$store.state.refer_time,
      industry:this.$store.state.refer_industry == '' ? '' : this.$store.state.refer_industry,
      enterpriseData:this.$store.state.refer_enterpriseData == '' ? [{name: '',keywordList: ''}] : this.$store.state.refer_enterpriseData,
      edit:false,      
      loading:false,
      data:this.$store.state.refer_data == '' ? '' : this.$store.state.refer_data,
      bar_pie:'饼'       
    }
  },
  methods: {
    search(){
      this.loading = true;
      let companyListStr = [],project_id = JSON.parse(window.sessionStorage.getItem('project_id')),_this =this;
          for(let a of this.enterpriseData){
            let i = Object.assign({},a);
            i.keywordList = i.keywordList.split(',');
            companyListStr.push(i);
          }
      //console.log(companyListStr)
      let domainStr = {};
          domainStr.name = this.industry.split(',')[0];
          domainStr.keywordList = this.industry.split(',');
      //console.log(domainStr)
      $.ajax({
        type: "GET",
        url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/firstrefrate',
        data: {
        "method": 'get',
        "proId": project_id,
        "articleType": _this.articleType,
        "sentenceNum": '2',
        "deduplicate": '0',
        "startTime":_this.time[0],
        "endTime":_this.time[1],
        "domainStr": JSON.stringify(domainStr),
        "companyListStr":JSON.stringify(companyListStr)
             },
        success: function(data){
          console.log(data)
          _this.loading = false;
          if(data.data==null||data.data.length==0){
          _this.$message({
                            message: '暂无数据,请调整时间区间或增加关键词后再试',
                            type: 'warning'
                          }); 
          }else{
            _this.data = data.data;
            _this.$store.state.refer_articleType = _this.articleType;
            _this.$store.state.refer_time = _this.time;
            _this.$store.state.refer_industry = _this.industry;
            _this.$store.state.refer_enterpriseData = _this.enterpriseData;
            _this.$store.state.refer_data = _this.data;
            _echart.build_refer_bar(data.data,'refer_echart');
          }     
        }
      })
    },
    addEnterpriseData(){
      this.enterpriseData.push({name: '',keywordList: ''});
    },
    delEnterpriseData(i){
      this.enterpriseData.splice(i, 1);//shanchu
    },
    moverFromItem(i){
      if(i != 0){
        this.$refs.delEnterprise[i].style.display="inline-block"
      }
    },
    moutFromItem(i){
      this.$refs.delEnterprise[i].style.display="none"
    },
    verificationKeyword(i){
      let data = i == 'industry' ? this.industry : this.enterpriseData[i].keywordList;
      data = data.replace(/，/ig,',');
      let arr=data.split(',');
          for(let i of arr){
            if(i == ''){
              arr.splice(arr.indexOf(i),1)
            }
          };
          arr=Array.from(new Set(arr));
      i == 'industry' ? this.industry = arr.toString() : this.enterpriseData[i].keywordList = arr.toString();       
    },
    change_echart(){
      if(this.bar_pie == '饼'){
        _echart.build_refer_pie(this.data,'refer_echart');
        this.bar_pie = '柱状'
      }else{
        _echart.build_refer_bar(this.data,'refer_echart');
        this.bar_pie = '饼'
      }
    },
    date_change (){date_change(this);}
  }
}
</script>

<style lang="scss" >
  .refer{
    button:hover{
        opacity: 0.8;
      }
    .filter{
      .btn-group{  
        .el-form-item .el-input__inner{
          height: 28px;
        }
      .btn{
        width: 50px;
        line-height: 1;
        outline: none;
      }
      .polar{
        color: #333;
        background-color: #fff;
        border-color: #ccc;
      }
      .warning{
        color: #fff;
        background-color: #00b38a;
        border-color: #00b38a;
      }
      #filter_sort_dropdown{
        padding-left:15px;
        font-size:12px;
        margin-top: -14px;
        button:hover{
          color:#00b38a;
          border: 1px solid #00b38a;
        }
        button:focus{
          color:#00b38a;
          border: 1px solid #00b38a;
        }
      }
      width:100%;
      button{
        padding:3px 8px;
        border-radius: 4px !important;
        margin-left: 9px !important;
      }
      .el-input--small{
        width:45% !important;
        margin-top: -14px;
        height: 16px;
        >input{
        height:25px !important;
        }
      }
    }
      .el-date-editor--datetime{
        input{
          height: 23px !important;
        }
       }
      background-color: #f7f7f7;
      border:1px solid #dcdcdc ;
      #filter_time{
        input{
          height: 28px;
        }
        .btn{
          color:  black;
          background-color: #f7f7f7;
          border-color: #f7f7f7; 
        }
        .warning{
          color:  #00b38a;
          background-color: #f7f7f7;
          border-color: #f7f7f7;
        }
      }
      .filter_button{
        position:absolute;
        left:60%;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        padding:1px 12px;
      }
      #show_button{
        display: none;
      }
      hr{
      margin-top: 5px;
      margin-bottom: 5px;
    }
    }
  }  
</style>