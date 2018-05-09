<template>
 <div class="" style="padding:0;">
  <div class="refer container" style="padding-left: 20px;padding-right: 20px;background-color:white;padding-bottom: 140px;">
    <div class="filter" style="border-radius: 4px;padding-bottom: 20px;">
      <div class="btn-group" role="group" aria-label="..." style="margin-top:20px">
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:76px;font-size: 14px;"><b>文章类型：</b></button>
          <!-- <button :class="articleType==0 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=0">全部</button>
          <button :class="articleType==1 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=1" >新闻</button> -->
          <button :class="articleType==2 ? 'btn btn-default warning' : 'btn btn-default'" @click="articleType=2" >微信</button>
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:76px;font-size: 14px;"><b>检索方式：</b></button>
          <button :class="queryType==0 ? 'btn btn-default warning' : 'btn btn-default'" @click="queryType=0">全文</button>
          <button :class="queryType==1 ? 'btn btn-default warning' : 'btn btn-default'" @click="queryType=1"  style="width: 60px;">仅标题</button>
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:35px;font-size: 14px;"><b>时间：</b></button>
          <button :class="time[1]-time[0]==604800000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-left: 20px !important;" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</button>
          <button :class="time[1]-time[0]==86400000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-left: 9px !important;" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">一天</button>
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
          <button  class="btn btn-default filter_name" style="border:none;background: #f7f7f7;margin-top:16px;margin-left: 30% !important;width: 130px"><b style="font-size: 16px;">行业核心关键词:</b></button>
          <el-input v-model="industry" placeholder="输入行业核心关键词" @blur="verificationKeyword('industry')" size="small" style="width: 20% !important;margin-top:16px;margin-left:10px;"></el-input>    
      </div>
      <hr> 
      <div class="btn-group" role="group" aria-label="..." style="margin-top:20px;padding-bottom: 10px;" >
        <div class="formDiv" v-for="(i,$index) in enterpriseData" @mouseover="moverFromItem($index)" @mouseout="moutFromItem($index)">
           <el-form :inline="true"  style="margin-left: 25%;"  >
              <!-- <el-form-item label="企业名称" :class="$index%2 == 0 ? 'fadeInLeft animated' : 'fadeInRight animated'">
                <el-input v-model="i.name" placeholder="企业名称"></el-input>
              </el-form-item> -->
              <el-form-item label="企业关键词:" style="margin-left: 100px;" :class="$index%2 == 0 ? 'fadeInLeft animated' : 'fadeInRight animated'">
                <el-input v-model="i.keywordList" @blur="verificationKeyword($index)" @keyup.enter.native="search" placeholder="输入企业关键词"></el-input>
              </el-form-item>
              <p style="display: inline-block;margin-top: 8px;">
                <el-button icon="el-icon-plus" v-show="$index == enterpriseData.length-1 && enterpriseData.length <= 4" style="margin-left: 20px;" type="success" @click="addEnterpriseData"></el-button> 
                <button type="button" class="btn btn-danger fadeIn animated"  style="margin-left: 20px;width: 32px;line-height: 1;display: none;"  ref="delEnterprise" @click="delEnterpriseData($index)"><i class="fa fa-minus" ></i></button> 
              </p> 
            </el-form>
        </div>
        <el-button type="success" style="position: absolute;bottom: 0px;left: 38.5%;background-color: #00b38a;border-color:#00b38a; " @click="search" v-loading.fullscreen.lock="loading" :element-loading-text="'系统拼命加载中'+'('+programs+'%..)'" element-loading-spinner="el-icon-loading" >搜索</el-button>  
         <el-button type="success" style="position: absolute;bottom: 0px;left: 50.5%; " v-loading.fullscreen.lock="publicLoading" element-loading-text="系统拼命加载中" element-loading-spinner="el-icon-loading" @click="refer_export" >导出</el-button> 
         <!-- <a href="http://192.168.0.3/test/index.html">下载</a> -->
       </div>
    </div>
      <p style="margin:20px 0 0 0;position: relative;color: rgb(211,62,54)">声誉竞争力></p>
      <div id="refer_competNum" style="width: 100%;height: 300px;margin: 5px auto;border: 1px dashed gray"></div>
      <p style="margin:20px 0 0 0;position: relative;color: rgb(211,62,54)">声量份额></p>
      <div id="refer_volumn" style="width: 100%;height: 300px;margin: 5px auto;border: 1px dashed gray"></div>
      <p style="margin:20px 0 0 0;position: relative;color: rgb(211,62,54)">第一提及率><!-- <el-button type="success" @click="change_echart" style="position: absolute;right: 10px;background-color: #00b38a;border-color:#00b38a; padding: 2px 5px;">切换为{{bar_pie}}图</el-button> --></p>
      <div id="refer_echart" style="width: 100%;height: 300px;margin: 5px auto;border: 1px dashed gray"></div>
    <p style="margin:20px 0 0 0;position: relative;color: rgb(211,62,54)">议题列表></p>
    <div class="event_card_refer">
        <div v-for="(i,$index) in data"  :style="{width:'220px',border: '1px solid #ebebeb',position:'relative',overflow: 'hidden',float: 'left',padding:'0',margin: '10px 20px 10px 5px',borderRadius: '8px',minHeight:'200px'}" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)">
     <!--    <img src="../../assets/icon/del.png" style="position: absolute;top: 2px;right: 0px;cursor: pointer;z-index:10;display: none;" @click.stop=""> -->
          <div style="width: 100%;height:70px;padding: 0 5px;position: relative;">
            <div style="width: 30px;height: 66px;margin-left: 10px; " ><el-checkbox style="margin-top: 20px;" v-model="i.checked" @change="select(i)"></el-checkbox><span style="width:64px;height: 30px;position:absolute;left: 16px;;top:46px;color: white;font-size: 16px;text-align:center"></span></div>
            <p style="position: absolute;top: 10px;left:50px;font-size: 16px;"><img src="../../assets/icon/event-title.png" style="padding-right: 6px;color: #333333;">
              <el-tooltip :content="i.name" placement="top" effect="light">
                <span style="cursor: text" @click.stop="refer_writeName(i)">{{i.name.length > 7 ? i.name.slice(0,7)+'...' : i.name}}</span>
              </el-tooltip>
            </p>
            <p style="position: absolute;top:35px;left:72px;color: rgb(242,196,70);cursor: pointer;" @click.stop="refer_dialog_articleList(i)"><img src="../../assets/icon/event-like.png" style="padding-right: 6px;">相关文章({{i.articleCount}})</p>
          </div>
          <div style="width: 95%;margin: 0 auto;border-top-style:dashed;border-top-width: 1px;border-top-color: #ddd;padding-top: 10px;cursor: pointer" @click="refer_card_click(i)">
              <el-table
                :data="i.tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label=""
                  width="65"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="articleNum"
                  label="文章数"
                  width="65"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="frequency"
                  label="词频数"
                  width="65"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>  
            </div>
        </div>
    </div>
    <p style="margin:20px 0 0 0;position: relative;color: rgb(211,62,54)">议题领导力></p>
    <div id="refer_mentinFirst" style="width: 100%;height: 420px;margin: 5px auto;border: 0px dashed gray">
      <p v-show="this.selectData.length == 0" style="margin: 10% 42%;color: #f34c81">暂无数据，请选择相应议题</p>
    </div>
    <!-- 相关文章模态框 -->
    <el-dialog title="相关文章" :visible.sync="refer_dialog_articleList_switch" width="580px" id="refer_articleList">
      <dialogRelateArticle :child-msg="dialogRelateArticleData" ></dialogRelateArticle>
    </el-dialog>
    <!-- 实体过滤前后模态对比框 -->
    <el-dialog title="相关信息" :visible.sync="dialogMention" width="1200px" id="refer_dialog_similar">
      <p style="margin-left: 30px;"><b><i>注：标红色的是过滤后的实体。</i></b></p>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:250px;left: 40px;top:40px;">
            <el-table
                :data="keywordList"
                border
                style="width: 100%">
                <el-table-column
                  label="关键词"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_keywordList.indexOf(scope.row.mention) != -1 ? '#f34c81' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
     </div>
     <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:250px;left: 330px;top:40px;">
            <el-table
                :data="perList"
                border
                style="width: 100%">
                <el-table-column
                  label="人物"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_perList.indexOf(scope.row.mention) != -1 ? '#f34c81' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
     </div>
     <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:250px;left: 620px;top:40px;">
            <el-table
                :data="locList"
                border
                style="width: 100%">
                <el-table-column
                  label="地点"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_locList.indexOf(scope.row.mention) != -1 ? '#f34c81' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
     </div>
     <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:220px;left: 910px;top:40px;">
            <el-table
                :data="orgList"
                border
                style="width: 100%">
                <el-table-column
                  label="组织"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_orgList.indexOf(scope.row.mention) != -1 ? '#f34c81' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
     </div>
    </el-dialog>
  </div>
 </div>   
</template>

<script>
import dialogRelateArticle from './dialog_relateArticle.vue'
import _echart from '../../assets/js/_echart.js'
import { date_change,changePage,publicSearch,tipsMessage,successBack,GetSessionStorage,similar }  from '../../assets/js/map.js'
export default {
  mounted:function () {   
    console.log('初始化提及率')
      /*this.$store.state.refer_data == '' ? console.log('初始化提及率') : (_echart.build_refer_pie(this.data,'refer_echart'),_echart.build_refer_bar(this.data,'refer_volumn',this),_echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention));  */
  },
  data () {
    return {
      articleType:2,//this.$store.state.refer_articleType == '' ? 2 : this.$store.state.refer_articleType,
      queryType:0,//this.$store.state.refer_queryType == '' ? 0 : this.$store.state.refer_queryType,
      time:[new Date(new Date().getTime()-604800000), new Date()],//this.$store.state.refer_time == '' ? [new Date(new Date().getTime()-604800000), new Date()] : this.$store.state.refer_time,
      industry:'',//this.$store.state.refer_industry == '' ? '' : this.$store.state.refer_industry,
      enterpriseData:[{keywordList: ''}],//this.$store.state.refer_enterpriseData == '' ? [{keywordList: ''}] : this.$store.state.refer_enterpriseData,
      edit:false,      
      loading:false,
      publicLoading:false,
      data:'',//this.$store.state.refer_data == '' ? '' : this.$store.state.refer_data,
      reputation : '',//this.$store.state.refer_reputation == '' ? '' : this.$store.state.refer_reputation,
      mention :'',// this.$store.state.refer_mention == '' ? '' : this.$store.state.refer_mention, 
      bar_pie:'饼',
      selectData:[],
      refer_dialog_articleList_switch:false, //相关文章模态框   
      refer_currentPage:1,//默认页码
      dialogRelateArticleData:{'listData':[],'data':'','pageShow':true,'articleType':''},//子组件数据
      programs:0,//进度条数字
      dialogMention:false,//实体过滤对比模态框
      perList:[],//实体人物过滤前数组
      similar_perList:[],//实体人物过滤前与过滤后重复数组
      keywordList:[],
      similar_keywordList:[],
      locList:[],
      similar_locList:[],
      orgList:[],
      similar_orgList:[]
    }
  },
    components:{
      dialogRelateArticle
    },
  methods: {
    search(){
      let _this = this;
      let companyListStr = [];
      for(let a of this.enterpriseData){
        companyListStr.push(a.keywordList);
      };  
      if(companyListStr.findIndex((n) => n == '') != -1 || this.industry == ''){
        tipsMessage('关键词不能为空','warning',this);
        this.loading = false;
        return;
      };   
      let Dta = {
         "proId": GetSessionStorage('project_id'), //项目id
          "articleType": this.articleType, //文章类型
          "queryType":this.queryType,//检索方式
          "startTime": this.time[0].getTime(),
          "endTime": this.time[1].getTime(),
          "industry": this.industry, //行业名词  只能传一个
          "anyIncludeKeywordList": companyListStr,//企业词 每个企业只能传一个
          "isTiming":1
      };  
      let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
      this.publicLoading = true;
      publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/reputationindex',"GET",params).then((data) =>{//ajax
        this.publicLoading = false;
        if(successBack(data,this)){
          let color;
          if(data.data.time < 60){
            color = '#67C23A';
          }else if(data.data.time >= 60 && data.data.time < 120){
            color = '#E6A23C';
          }else{
            color = '#F56C6C';
          };
          let time = data.data.time >= 60 ? parseInt(data.data.time/60) + '分钟' + (parseInt(data.data.time))%60 + '秒' : parseInt(data.data.time)+'秒';
          console.log('预计耗时：'+time);
          this.$confirm('共查询到<i style="color:#409EFF">'+data.data.total+'</i>篇文章，生成议题预计耗时<span style="color:'+color+'">' + time +'</span>'+'，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              type: 'warning'
            }).then(() => {//搜索
              this.selectData = [];
              this.loading = true;
              this.programs = 0;
              let timer = setInterval(function(){
                _this.programs++;
                if(_this.programs > 98){
                  clearInterval(timer)
                };
              },(data.data.time*1000)/100);
              Dta.isTiming = '';
              let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
              publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/reputationindex',"GET",params).then((data) =>{
                this.loading = false;
                clearInterval(timer);
                if(successBack(data,this)){
                  console.log('实际耗时：'+data.data.realTime);
                  //console.log(data)
                  /*this.$store.state.refer_articleType = this.articleType;
                  this.$store.state.refer_queryType = this.queryType;
                  this.$store.state.refer_time = this.time;
                  this.$store.state.refer_industry = this.industry;
                  this.$store.state.refer_enterpriseData = this.enterpriseData;*/
                  _echart.build_refer_pie(data.data.topicList,'refer_echart');
                  _echart.build_refer_bar(data.data.topicList,'refer_volumn',true);
                  _echart.build_refer_bar2('refer_mentinFirst',this.selectData);
                  _echart.build_refer_competNum('refer_competNum',this.selectData,data.data.reputation,data.data.mention);
                  this.reputation = data.data.reputation;
                  this.mention = data.data.mention;
                  this.data = data.data.topicList;
                  /*this.$store.state.refer_data = this.data;
                  this.$store.state.refer_mention = this.mention;
                  this.$store.state.refer_reputation = this.reputation;*/
                }
              })
            }).catch(() => {});
        };
      })          
    },
    verificationKeyword(i){//判断验证
      let data = i == 'industry' ? this.industry : this.enterpriseData[i].keywordList;
      data = data.replace(/，|\ /ig,',');
      let arr=data.split(',');
          for(let i of arr){
            if(i == ''){
              arr.splice(arr.indexOf(i),1)
            }
          };
          arr=Array.from(new Set(arr));
          //console.log(arr)
      if(arr.length != 1){
        tipsMessage('关键词不能为空或者有特殊字符','warning',this);
        return
      };   
      i == 'industry' ? this.industry = arr[0].toString() : this.enterpriseData[i].keywordList = arr.toString();       
    },
    select(i){//选择议题后的操作
      i.checked == true ? this.selectData.push(i) : this.selectData.splice(this.selectData.findIndex(item => item.id===i.id),1);
      _echart.build_refer_bar2('refer_mentinFirst',this.selectData);//议题领导力
      _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention);//声誉竞争力
    },
    refer_export(){
      if(this.selectData.length == 0){
        tipsMessage('请选择议题','warning',this);
        return;
      }
      this.publicLoading = true;
      let exportObj = {};
      exportObj.startTime = this.time[0].getTime();
      exportObj.endTime = this.time[1].getTime();
      exportObj.reputationCompetitiveIndexPic = _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention).getDataURL();
      exportObj.volumeSharePic = _echart.build_refer_bar(this.data,'refer_volumn').getDataURL();
      exportObj.firstMentionRatePic = _echart.build_refer_pie(this.data,'refer_echart').getDataURL();
      exportObj.topicLeadshipPic = _echart.build_refer_bar2('refer_mentinFirst',this.selectData).getDataURL();
      var data = {//pdf 图片
                    startTime : exportObj.startTime,
                    endTime : exportObj.endTime ,
                    reputationCompetitiveIndexPic : exportObj.reputationCompetitiveIndexPic.slice(22,exportObj.reputationCompetitiveIndexPic.length),
                    volumeSharePic : exportObj.volumeSharePic.slice(22,exportObj.volumeSharePic.length),
                    firstMentionRatePic : exportObj.firstMentionRatePic.slice(22,exportObj.firstMentionRatePic.length),
                    topicLeadshipPic : exportObj.topicLeadshipPic.slice(22,exportObj.topicLeadshipPic.length), 
                  };
      let params = {"report": JSON.stringify(data)};           
      publicSearch('rsa/report',"POST",params).then((data) =>{//ajax导出报告 
        this.publicLoading = false;
        if(successBack(data,this)){
          var form = $("<form></form>").attr("action", "rsa/report/export").attr("method", "post");
          form.append($("<input></input>").attr("type", "hidden").attr("name", "wordFileRealPath").attr("value", data.data));
          form.appendTo('body').submit().remove();
        };
      })           
    },
    refer_dialog_articleList(dta){//弹窗
      this.refer_dialog_articleList_switch = true;
      this.dialogRelateArticleData.pageShow = false;
      this.dialogRelateArticleData.articleType = this.articleType;
      this.loading = true;
      this.refer_currentPage = 1;
      this.refer_currentPage*10 > dta.articleCount ? this.refer_currentPage = Math.ceil(dta.articleCount/10) : '';//判断如果页数大于文章总数
      changePage(this,dta,10,this.refer_currentPage).then((data) =>{//ajax获取数据
        this.loading = false;
        if(successBack(data,this)){
          this.dialogRelateArticleData.listData = data.data.articleList;//传递个子组件的文章列表数据
          this.dialogRelateArticleData.data = dta;//传递子组件的ajax参数数据
          this.$nextTick(function () {
           this.dialogRelateArticleData.pageShow = true;
          })
        }; 
      });
    },
    refer_writeName(data){
      this.$prompt('', '请输入修改后的标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^.{1,20}$/,
          inputErrorMessage: '标题长度不能超过20个字符或者不能为空',
          dangerouslyUseHTMLString: true,
          type:'warning',
          confirmButtonClass:'warning',
          center:true,
          inputValue:data.name
        }).then(({ value }) => {
          for(let i of this.data){
            if(i.id == data.id){
              i.name = value;
            }
          };
          _echart.build_refer_bar2('refer_mentinFirst',this.selectData);//议题领导力
          _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention);//声誉竞争力
          tipsMessage('修改成功','success',this);
        }).catch(() => {
          tipsMessage('取消修改','info',this);      
        });
    },
    refer_card_click(dta){
      //console.log(dta);
      this.dialogMention = true;
      this.perList = dta.perList;
      this.locList = dta.locList;
      this.keywordList = dta.keywordList;
      this.orgList = dta.orgList;
      this.similar_perList = similar(dta.perScreenList,dta.perList,'mention');
      this.similar_locList = similar(dta.locScreenList,dta.locList,'mention');
      this.similar_keywordList = similar(dta.keywordScreenList,dta.keywordList,'mention');
      this.similar_orgList = similar(dta.orgScreenList,dta.orgList,'mention');

    },
    Mover_articleList (i) { this.$refs.dialog_xw_articlelist[i].style.color = "#00a17c"; },
    Mout_articleList (i) { this.$refs.dialog_xw_articlelist[i].style.color = "rgb(72,87,106)"; },
    date_change (){date_change(this);},
    addEnterpriseData(){ this.enterpriseData.push({keywordList: ''}); },
    delEnterpriseData(i){ this.enterpriseData.splice(i, 1);},//shanchu
    moverFromItem(i){  i != 0 ? this.$refs.delEnterprise[i].style.display="inline-block" : '' },
    moutFromItem(i){ this.$refs.delEnterprise[i].style.display="none"},
    Mover (a) { this.$refs.list[a].style.boxShadow = '9px 9px 6px rgba(220,220,220,.8)'; },
    Mout (a) { this.$refs.list[a].style.boxShadow = ''; },
  }
}
</script>

<style lang="scss" >
  .warning{
        color: #fff;
        background-color: #00b38a;
        border-color: #00b38a;
      }
  .refer{
    button:hover{
        opacity: 0.8;
      }
      
    #refer_articleList{
      .el-dialog__body{
        padding: 10px 20px 30px 20px;
      }
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
        line-height: 25px;
        }
      }
      .el-form-item__content input{
        line-height: 28px;
      }
    }
      .el-date-editor--datetime{
        input{
          height: 23px !important;
          padding-right: 0 ;
          line-height: 24px;
        }
        .el-input__icon{
          line-height: 22px;
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
    .event_card_refer{
      width: 1240px;
      position: relative;
      z-index: 9;
     >div:hover{
      >img{
        display: inline-block !important;
      }
     }
     .live{
        border-color: #4fc4d0 !important;
        box-shadow: 3px 3px 2px rgba(79, 196, 208,.4) !important;
     }
     .live1{
        border-color: #4fc4d0 !important;
        box-shadow: 3px 3px 2px rgba(79, 196, 208,.4) !important;
     }
     .card:nth-child(3n){
        margin-right: 1px !important;
        margin-left: 1px;
      }
     .card:nth-child(3n+1){
        margin-left: 20px;
      } 
      table{
        table-layout: none;
        width: 95% !important;
        th{
          text-align: center;
          width: 99px;
        }
        td{
          padding: 2px 0;
        }
      }
   }
  }
  #refer_dialog_similar{
      thead{
        color:#202123;
        th{
          text-align: center;
        }
      }
      .el-dialog__body{
        position:relative;
        padding: 10px 10px;
        height: 700px;
        .el-table .cell, .el-table th>div{
          line-height: 18px;
          padding: 0 5px;
        }
        .el-table td{
          padding: 5px 0 ;
          height: 18px;
          text-align: center;
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
            top:13px;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-image: url('../../assets/icon/ev_del2.png');
            cursor: pointer;
          }
          .el-dialog__close{
            display: none;
          }
        }
      } 
     }   
</style>