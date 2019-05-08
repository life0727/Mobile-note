<template>
 <div class="container" style="padding-top:30px;position: relative" v-loading.fullscreen.lock="loading" :element-loading-text="'系统拼命加载中'+'('+programs+'%..)'" element-loading-spinner="el-icon-loading">
  <a id="downlink"></a><!-- 导出excel表格 -->
    <img v-show="this.data != ''" @click="refer_export" style="position: absolute;right: 30px;top:-27px;z-index:999;cursor: pointer" src="../../assets/icon/export.png">
    <img src="../../assets/icon/refer_industry.png" style="margin-left: 15px;">
    <div style="width: 260px;display: inline-block;height: 40px;background-color: white;vertical-align: middle;margin-left: 10px;" ref="industry">
      <input v-model="industry" @focus="writeIndustry" type="text" placeholder="+ 添加行业核心关键词" style="outline: white;border: none;width: 180px;margin: 9px 0 0 15px;" @blur="verificationKeyword('industry')">
      <span style="border-left: 1px solid rgb(228,228,228);margin-left: 4px;margin-right: 10px;line-height: 40px;height: 22px;"></span>
      <el-dropdown  @command="sort_dropdown"   @visible-change="visibleChangeRefer">
              <el-button  style="padding: 3px 5px;border-width: 0px;background-color: white;color:#606266">{{current_sort}}<i :class="sort_dropdown_visible_refer ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 16px;color: #333"></i></el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in ['或','且']" :key="i" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
      </el-dropdown>
    </div>
    <img src="../../assets/icon/refer_qiye.png" style="margin-left: 15px;">
    
      <span class="enterpriseArr" style="height: 40px;background-color: white;vertical-align: middle;margin-left: 10px;padding: 10px 5px;color:#00b38a;font-size: 16px;" v-for="(i,$index) in enterpriseData" :key="i">
        <el-tooltip :disabled="i.length <= 8" :content="i" placement="top" effect="light">
          <span>{{i.length > 8 ? i.slice(0,7)+'..' : i}}</span>
        </el-tooltip>
        <img src="../../assets/icon/del.png" style="margin-top: -4px;margin-left: 6px;cursor: pointer;visibility:hidden;"  @click="delEnterpriseData($index)">
      </span>
    
    <div v-show="enterpriseData.length <= 4" style="width: 150px;display: inline-block;height: 40px;background-color: white;vertical-align: middle;margin-left: 10px;" ref="enterprise">
      <input v-model="enterprise" type="text" id="enterpriseInput" placeholder="+ 添加企业关键词" style="outline: white;border: none;width: 140px;margin: 9px 0 0 5px;" @focus="writeEnterprise"  @blur="verificationKeyword('enterprise')">
    </div> 
    <el-button icon="el-icon-plus" circle v-show="enterprise.length > 0" @click="verificationKeyword('enterprise')"></el-button>
    <div class="block" style="margin-top: 15px;" >
      <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 48px;">
        <span :style="{position:'absolute',left:'30px',lineHeight:'45px',cursor:'pointer',color: articleType == 2 ? '#00b38a' : '#333'}" @click="mediaData.btn_disabled=false;articleType=2;">微信</span>
        <span :style="{position:'absolute',left:'80px',lineHeight:'45px',cursor:'pointer',color: articleType == 1 ? '#00b38a' : '#333'}" @click="mediaData.btn_disabled=true;articleType=1;">新闻</span>
        <span style="position: absolute;left: 140px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
    
        <span :style="{position:'absolute',left:'170px',lineHeight:'45px',cursor:'pointer',color: queryType==0 ? '#00b38a' : '#333'}" @click="queryType=0;">全文</span>
        <span :style="{position:'absolute',left:'215px',lineHeight:'45px',cursor:'pointer',color: queryType==1 ? '#00b38a' : '#333'}" @click="queryType=1;">仅标题</span>

        <span style="position: absolute;left: 285px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>  
        <mediaSlot :mediaDATA="mediaData" @receiveFromMediaSlot = "mediaSlotData"></mediaSlot>
        <el-dropdown  @command="dropdown_loose" style="margin-left: 425px;" @visible-change="visibleChangemediaLoose">
              <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">{{current_loose}}<i :class="sort_dropdown_visible_loose? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in ['loose','tight']" :command="i" :key="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown  @command="dropdown_Sentimen" style="margin-left: 30px;" @visible-change="visibleChangemediaSentimen">
              <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">{{current_Sentimen}}<i :class="sort_dropdown_visible_Sentimen ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in ['含负','排负']" :command="i" :key="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>

        <span style="position: absolute;left: 408px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
        <span style="position: absolute;left: 500px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span> 
        <span style="position: absolute;left: 590px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span> 
         <!-- 日期组件 -->
        <datePicker @receiveFromDatePicker = "dataPickerData"></datePicker>
        <span class="SearchBegin" id="search"  @click="search" >搜索</span>
      </div>
    </div>
    <div class="refer" style="padding: 0 0px 20px 0px;background-color:white;border: 1px solid rgb(228,228,228);border-top-width: 0;">  
      <p style="padding: 20px 0 0px 5px;color:#999999;margin: 0">已选媒体分类：<span style="color: #00b38a;">{{domain_arr.length == 0 ? '全部' : domain_arr.toString()}}</span></p>
      <div class="clientContent" v-show="this.data.length == 0" style="position: relative;">
        <img src="../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;">
      </div>
      <div class="content_" v-show = "this.data != ''" :style="{width:'1218px',overflow:'hidden',position:'relative',height:echartShow == 'refer_mentinFirst' ? '1350px' : '850px'}">
        <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>声誉竞争力 <span class="SearchBegin" style="padding: 2px 12px;"  @click="downloadFile()" v-show="this.data != ''">导出excel</span></p>
        <div id="refer_competNum" style="width: 1218px;height: 300px;margin: 5px auto;"></div>
        <p style="margin-top: 20px;">
          <span :style="{padding: '5px 25px',borderRadius:'17px',marginLeft:'20px',cursor:'pointer',color:echartShow == 'refer_volumn' ? '#00b38a' : '#666666',border:echartShow == 'refer_volumn' ? '1px solid #00b38a' : '0px solid #666666'}" @click="echartShow = 'refer_volumn'">声量份额</span>
          <span :style="{padding: '5px 25px',borderRadius:'17px',marginLeft:'20px',cursor:'pointer',color:echartShow == 'refer_echart' ? '#00b38a' : '#666666',border:echartShow == 'refer_echart' ? '1px solid #00b38a' : '0px solid #666666'}" @click="echartShow = 'refer_echart'">第一提及率</span>
          <span :style="{padding: '5px 25px',borderRadius:'17px',marginLeft:'20px',cursor:'pointer',color:echartShow == 'refer_mentinFirst' ? '#00b38a' : '#666666',border:echartShow == 'refer_mentinFirst' ? '1px solid #00b38a' : '0px solid #666666'}" @click="echartShow = 'refer_mentinFirst'">议题领导力</span>
          <span :style="{padding: '5px 25px',borderRadius:'17px',marginLeft:'20px',cursor:'pointer',color:echartShow == 'sentiment_analysis' ? '#00b38a' : '#666666',border:echartShow == 'sentiment_analysis' ? '1px solid #00b38a' : '0px solid #666666',display:current_Sentimen == '含负' ? 'inline' : 'none'}" @click="echartShow = 'sentiment_analysis'">情感分析</span>
        </p>
        <div :style="{position:'absolute',top:'425px',zIndex:echartShow == 'refer_volumn' ? '99' : '-99'}">
          <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>声量份额</p>
          <div id="refer_volumn" style="width: 1218px;height: 300px;margin: 5px auto"></div>
        </div>
        <div :style="{position:'absolute',top:'425px',zIndex:echartShow == 'refer_echart' ? '99' : '-99'}">
          <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>第一提及率</p>
          <div id="refer_echart" style="width: 1218px;height: 300px;margin: 5px auto;"></div>
        </div>
        <div :style="{position:'absolute',top:'425px',zIndex:echartShow == 'refer_mentinFirst' ? '99' : '-99'}">
          <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>议题列表</p>
          <div class="event_card_refer">
              <div v-for="(i,$index) in data" :key="i" :style="{width:'234px',position:'relative',overflow: 'hidden',float: 'left',padding:'0',margin: '10px 5px 10px 5px',borderRadius: '8px'}" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)">
                <div style="width: 100%;height:55px;padding: 0 5px;position: relative;">
                  <div style="width: 15px;height: 66px;margin-left: 8px; " ><el-checkbox style="margin-top: 15px;" v-model="i.checked" @change="select(i)"></el-checkbox></div>
                  <p style="position: absolute;top: 13px;left:40px;font-size: 16px;">
                    <el-tooltip :content="i.name" placement="top" effect="light">
                      <span style="cursor: text" @click.stop="refer_writeName(i)">{{i.name.length > 12 ? i.name.slice(0,11)+'..' : i.name}}</span>
                    </el-tooltip>
                  </p>
                  <p class="information" style="visibility: hidden">
                    <span style="position: absolute;top:35px;left:40px;color:#00b38a;cursor: pointer;font-size: 12px;" @click.stop="refer_dialog_articleList(i)">相关文章({{i.articleCount}})</span>
                    <span style="position: absolute;top:35px;left:135px;color:#00b38a;cursor: pointer;font-size: 12px;" @click.stop="refer_card_click(i)">相关信息</span>
                  </p>
                </div>
                <div style="margin: 0 auto;border-top-width: 1px;">
                  <table width="100%" border="1"  style="border-width:0px"> 
                    <tr>
                      <td width=""></td>
                      <td v-for="(j,$index) in i.tableData" :key="j" :style="{backgroundColor:$index%2 == 0 ? 'rgba(180, 222, 246, 1)' : ''}">{{j.name.length > 2 && i.tableData.length > 3 ? j.name.slice(0,2)+'..' : j.name}}</td>
                    </tr>
                    <tr>
                      <td style="width: 48px">文章数</td>
                      <td v-for="a in i.tableData" :key="a">{{a.articleNum}}</td>
                    </tr>
                    <tr>
                      <td style="width: 48px">词频数</td>
                      <td v-for="f in i.tableData" :key="f">{{f.frequency}}</td>
                    </tr>
                  </table> 
                </div>
              </div>
          </div>
          <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>议题领导力</p>
          <div id="refer_mentinFirst" style="width: 1218px;height: 420px;margin: 5px auto;">
            <p v-show="this.selectData.length == 0" style="margin: 10% 42%;color: #f34c81">暂无数据，请选择相应议题</p>
          </div>
        </div> 
        <div :style="{position:'absolute',top:'425px',zIndex:echartShow == 'sentiment_analysis' && current_Sentimen == '含负' ? '99' : '-99'}">
          <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>情感分析</p>
          <div id="sentiment_analysis" style="width: 1218px;height: 300px;margin: 5px auto;">
            <p v-show="this.current_Sentimen == '含负'" style="margin: 10% 42%;color: #f34c81">暂无数据，请选择含负面后再搜索重试</p>
          </div>
        </div> 
    </div>
    <!-- 相关文章模态框 -->
    <el-dialog title="相关文章" :visible.sync="refer_dialog_articleList_switch" width="580px !important" id="refer_articleList" custom-class="ev_dialogClass">
      <dialogRelateArticle :child-msg="dialogRelateArticleData" ></dialogRelateArticle>
      <span class="SearchBegin" style="padding: 2px 12px;position: absolute;line-height: 20px;bottom: 18px;margin-left: 0px;"  @click="downloadArticleFile()" v-show="this.data != ''">导出excel</span>
    </el-dialog>
    <!-- 实体过滤前后模态对比框 -->
    <el-dialog title="相关信息" :visible.sync="dialogMention" width="650px !important" id="refer_dialog_similar" custom-class="ev_dialogClass">
      <p style="margin-left: 30px;color:#FF5015">注：标红色的是过滤后的实体。</p>
            <el-table
                :data="keywordList"
                border
                style="width: 140px;display: inline-block;margin-left: 35px">
                <el-table-column
                  label="关键词"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_keywordList.indexOf(scope.row.mention) != -1 ? '#FF5015' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
            <el-table
                :data="perList"
                border
                style="width: 140px;display: inline-block;margin-left: -5px;">
                <el-table-column
                  label="人物"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_perList.indexOf(scope.row.mention) != -1 ? '#FF5015' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
            <el-table
                :data="locList"
                border
                style="width: 140px;display: inline-block;margin-left: -5px;">
                <el-table-column
                  label="地点"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_locList.indexOf(scope.row.mention) != -1 ? '#FF5015' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
            <el-table
                :data="orgList"
                border
                style="width: 140px;display: inline-block;margin-left: -5px;">
                <el-table-column
                  label="组织"
                  show-overflow-tooltip>
                  <template scope="scope"><span :style="{color: similar_orgList.indexOf(scope.row.mention) != -1 ? '#FF5015' : ''}">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</span></template>
                </el-table-column>
            </el-table> 
    </el-dialog>
  </div>
 </div>   
</template>

<script>
import datePicker from './util/datePicker.vue'
import mediaSlot from './util/media-slot.vue'
import dialogRelateArticle from './main/dialog_relateArticle.vue'
import _echart from '../../assets/js/_echart.js'
import { changePage,publicSearch,tipsMessage,successBack,similar,GetLocalStorage,startLoading,endLoading,s2ab,downloadExl }  from '../../assets/js/map.js'
export default {
  mounted:function () {  
  //console.log('refer') 
   startLoading();
   publicSearch('rsa/wxaccount/domain',"GET",{"method":"get"}).then((data) =>{//ajax
      endLoading();
      if(!successBack(data,this)) return;
      this.domain = data.data
    });
   $('.clientContent').css('height',$(window).height()-353+'px');    
   this.outFile = document.getElementById('downlink')//导出excel所需要的数据元素
  },
  data () {
    return {
      articleType:2,
      current_loose:'tight',
      current_Sentimen:'排负',
      queryType:0,
      mediaData:{//媒体分类组件数据
          btn_disabled:false
      },
      domain_arr:[],//媒体分类数据展示
      time:[new Date(new Date().getTime()-604800000), new Date()],
      current_sort:'或',//行业核心关键词的搜索方式 或或者且
      sort_dropdown_visible_refer:true,//true为显示false为隐藏
      sort_dropdown_visible_loose:true,//true为显示false为隐藏
      sort_dropdown_visible_Sentimen:true,//true为显示false为隐藏
      industry:'',//行业input
      enterprise:'',//企业input
      enterpriseData:[],    
      loading:false,
      data:'',
      reputation : '',
      mention :'',
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
      similar_orgList:[],
      echartShow:'refer_volumn',//控制echart的显示层级
      outFile: '',  // 导出excle文件
    }
  },
  components:{
    dialogRelateArticle,
    datePicker,
    mediaSlot
  },
  methods: {
    search(){
      let _this = this; 
      if(this.enterpriseData.findIndex((n) => n == '') != -1 || this.industry == ''){
        tipsMessage('关键词不能为空','warning',this);
        this.loading = false;
        return;
      };   
      let Dta = {
         "proId": GetLocalStorage('current_projectData_A') == null ? this.$router.push('/login') : GetLocalStorage('current_projectData_A').project_id, //项目id
          "articleType": this.articleType, //文章类型
          "queryType":this.queryType,//检索方式
          "startTime": this.time[0].getTime(),
          "endTime": this.time[1].getTime(),
          "industry": this.industry, //行业名词  只能传一个
          "anyIncludeKeywordList": this.enterpriseData,//企业词 每个企业只能传一个
          "domainList":this.domain_arr,
          "isTiming":1,
          "fmrLoose":this.current_loose == 'loose' ? 1 : 0,
          "isSentimentAnalysis":this.current_Sentimen == '排负' ? 1 : 0,
          "industryAnd":this.current_sort == '或' ? 0 : 1//0-或
      };  
      let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
       startLoading();
      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/reputationindex',"GET",params).then((data) =>{//ajax
        endLoading();
        if(!successBack(data,this)) return;
          let color;
          if(data.data.time < 60){
            color = '#67C23A';
          }else if(data.data.time >= 60 && data.data.time < 120){
            color = '#E6A23C';
          }else{
            color = '#F56C6C';
          };
          let time = data.data.time >= 60 ? parseInt(data.data.time/60) + '分钟' + (parseInt(data.data.time))%60 + '秒' : parseInt(data.data.time)+'秒';
          console.log('提及率预计耗时：'+time);
          this.$confirm('共查询到<i style="color:#409EFF">'+data.data.total+'</i>篇文章，生成议题预计耗时<span style="color:'+color+'">' + time +'</span>'+'，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              customClass:'ev_confirmClass',
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
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/reputationindex',"GET",params).then((data) =>{
                this.loading = false;
                clearInterval(timer);
                if(!successBack(data,this)) return;
                  console.log('实际耗时：'+data.data.realTime);
                  this.selectData = data.data.topicList.slice(0,3);//默认选中前三个
                  //console.log(this.selectData)

                  _echart.build_refer_pie(data.data.topicList,'refer_echart');
                  _echart.build_sentiment_pie(data.data.posCountMap,data.data.negCountMap,'sentiment_analysis',this.current_Sentimen,this); //data.data.posCountMap,data.data.negCountMap
                  _echart.build_refer_bar(data.data.topicList,'refer_volumn',true);
                  _echart.build_refer_bar2('refer_mentinFirst',this.selectData);

                  _echart.build_refer_competNum('refer_competNum',this.selectData,data.data.reputation,data.data.mention,data.data.posCountMap,data.data.negCountMap);

                  for(let k of data.data.topicList.slice(0,3)){//默认选中前三个
                    k.checked = true;
                  };
                  this.reputation = data.data.reputation;
                  this.mention = data.data.mention;
                  this.data = data.data.topicList;
                  this.posCountMap = data.data.posCountMap;
                  this.negCountMap = data.data.negCountMap;
                  //console.log(this.data)

              })
            }).catch(() => {});
      })          
    },
    verificationKeyword(i){//判断验证
      let data = i == 'industry' ? this.industry : this.enterprise;
      data = data.replace(/，|\ /ig,',');
      let arr=data.split(',');
          for(let i of arr){
            if(i == ''){
              arr.splice(arr.indexOf(i),1)
            }
          };
          arr=Array.from(new Set(arr));
          console.log(arr)
      if( i == 'industry' && arr.length != 1){
        tipsMessage('关键词不能为空或者有特殊字符','warning',this);
        return
      };   
      i == 'industry' ? (this.industry = arr[0].toString(),this.$refs.industry.style.boxShadow = '') : (this.enterprise = arr.toString(),this.enterprise ? this.enterpriseData.push(this.enterprise) : '',this.enterprise = '',this.$refs.enterprise.style.boxShadow = 'none'/*,$('#enterpriseInput').focus()*/);
    },
    select(i){//选择议题后的操作
      i.checked == true ? this.selectData.push(i) : this.selectData.splice(this.selectData.findIndex(item => item.id===i.id),1);
      //console.log(this.selectData)
      _echart.build_refer_bar2('refer_mentinFirst',this.selectData);//议题领导力
      _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention,this.posCountMap,this.negCountMap);//声誉竞争力
    },
    refer_export(){
      if(this.selectData.length == 0){
        tipsMessage('请选择议题','warning',this);
        return;
      }
      startLoading();
      let exportObj = {};
      exportObj.startTime = this.time[0].getTime();
      exportObj.endTime = this.time[1].getTime();
      exportObj.reputationCompetitiveIndexPic = _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention,this.posCountMap,this.negCountMap).getDataURL();
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
        endLoading();
        if(!successBack(data,this)) return;
          var form = $("<form></form>").attr("action", "rsa/report/export").attr("method", "post");
          form.append($("<input></input>").attr("type", "hidden").attr("name", "wordFileRealPath").attr("value", data.data));
          form.appendTo('body').submit().remove();
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
        if(!successBack(data,this)) return;
          this.dialogRelateArticleData.listData = data.data.articleList;//传递个子组件的文章列表数据
          this.dialogRelateArticleData.data = dta;//传递子组件的ajax参数数据
          this.$nextTick(function () {
           this.dialogRelateArticleData.pageShow = true;
          })
      });
    },
    refer_dialog_sentiment_articleList(data){
      if(!data.value) return;
      let dta = {
                  'id':this.selectData[0].id.slice(0,this.selectData[0].id.length-1),
                  'polar':data.name == '正面' ? 1 : -1,
                  'enterpriseName':data.seriesName,
                  'articleCount':data.value 
                };
      this.refer_dialog_articleList_switch = true;
      this.dialogRelateArticleData.pageShow = false;
      this.dialogRelateArticleData.articleType = this.articleType;
      this.loading = true;
      this.refer_currentPage = 1;
      this.refer_currentPage*10 > dta.articleCount ? this.refer_currentPage = Math.ceil(dta.articleCount/10) : '';//判断如果页数大于文章总数
      changePage(this,dta,10,this.refer_currentPage,'sentiment').then((data) =>{//ajax获取数据
        this.loading = false;
        if(!successBack(data,this)) return;
          this.dialogRelateArticleData.listData = data.data.articleList;//传递个子组件的文章列表数据
          this.dialogRelateArticleData.data = dta;//传递子组件的ajax参数数据
          this.$nextTick(function () {
           this.dialogRelateArticleData.pageShow = true;
          })
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
          _echart.build_refer_competNum('refer_competNum',this.selectData,this.reputation,this.mention,this.posCountMap,this.negCountMap);//声誉竞争力
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
    addEnterpriseData(){ this.enterpriseData.push({keywordList: ''}); },
    delEnterpriseData(i){ this.enterpriseData.splice(i, 1);},//shanchu
    moverFromItem(i){  i != 0 ? this.$refs.delEnterprise[i].style.display="inline-block" : '' },
    moutFromItem(i){ this.$refs.delEnterprise[i].style.display="none"},
    Mover (a) { this.$refs.list[a].style.boxShadow = '2px 2px 3px rgba(0,0,0,.2)'; },
    Mout (a) { this.$refs.list[a].style.boxShadow = ''; },
    writeIndustry(){ this.$refs.industry.style.boxShadow = '2px 2px 3px rgba(0,0,0,.2)';},
    writeEnterprise(){ this.$refs.enterprise.style.boxShadow = '2px 2px 3px rgba(0,0,0,.2)';},
    sort_dropdown (command) { this.current_sort = command;},
    visibleChangeRefer(a){ this.sort_dropdown_visible_refer = !a;}, 
    dropdown_loose(command){ this.current_loose = command ;},
    dropdown_Sentimen(command){ this.current_Sentimen = command ;this.current_Sentimen == '排负' ? this.echartShow = 'refer_mentinFirst' : ''},
    visibleChangemediaLoose(a){
      this.sort_dropdown_visible_loose = !a;
    },
    visibleChangemediaSentimen(a){
      this.sort_dropdown_visible_Sentimen = !a;
    },
    downloadFile(){ //导出excel
      //填充excel数据
        let excelData = [];
        let arr = ['声量份额','第一提及','议题领导力','声誉竞争力指数'];
        for(let t = 0; t < arr.length;t++){
          let obj = {};
          obj.name = arr[t];
          for(let k of _echart.refer_competNum_Data){
            obj[k.name] = parseInt(k.data[t]);
          };
          excelData.push(obj);
        };
        excelData.splice(3, 0, {'name':''});//excel格式 第三行数据为空
       //console.log(Dta)
       let data = [{}]
        for (let k in excelData[0]) {
          data[0][k] = k
        };
        data[0].name = '';//excel 表头
        console.log(data);
        data = data.concat(excelData);
        //console.log(data);
        downloadExl(data, '声誉竞争力指数',this);//封装完的数据  excel名称
    },
    downloadArticleFile(){
      let Dta = this.dialogRelateArticleData.listData;
      let excelData = [{'标题':'标题','时间':'时间','媒体名称':'媒体名称','链接':'链接'}];
        for(let i of Dta){
          let obj = {};
          obj['标题'] = i.title;
          obj['时间'] = new Date(i.publishTime).Format("yyyy-MM-dd hh:mm:ss");
          obj['媒体名称'] = i.mediaName;
          obj['链接'] = i.url;
          excelData.push(obj);
        };
        console.log(excelData);
        downloadExl(excelData,'文章列表',this,'xlsx',true);//封装完的数据  excel名称 true 列宽格式
    },
    dataPickerData(val){//日期子组件的数据
      this.time = val;
    },
    mediaSlotData(val){ //媒体分类子组件的数据
      this.domain_arr = val;
    },
  }
}
</script>

<style lang="scss" >
  ::-webkit-input-placeholder {/*Chrome/Safari*/
      color:#ccc;
      font-size: 16px;
      }
      ::-moz-input-placeholder {/*Firefox*/
      color:#ccc;
      font-size: 16px;
    }
    .el-popover__reference:hover{
        color: rgb(0, 179, 138)
      }
    .is-circle:hover{
      color: #00b38a;
      border-color: #00b38a;
      background-color: white;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label{
        color: rgb(0, 179, 138);
      }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: rgb(0, 179, 138);
      border-color: rgb(0, 179, 138);
    }
    .enterpriseArr:hover>img{
        visibility:visible !important;
    }
    .el-input__prefix{
        background-image: url('../../assets/icon/time.png');
        width: 12px;
        height: 12px;
        left: 9px;
        top:5px;
        .el-input__icon{
          opacity: 0;
        }
      }
      .el-input-group--append{
        .el-input-group__append:hover{
          opacity: 0.8;
        }
      }
    .el-date-editor--datetime{
        input{
          line-height:  23px !important;
          height: 23px !important;
          padding-right: 0 !important;
        }
        .el-input__icon{
          line-height: 22px;
        }
       }
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
      
      .el-form-item__content input{
        line-height: 28px;
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
      .information{
        visibility: visible !important;
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
        background-color: rgba(220, 238, 250, 1);
        border-color: white;
        td{
          text-align: center;
          padding: 7px 0;
          font-size: 12px;
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
        .el-table td,.el-table th{
          padding: 5px 0 ;
          height: 18px;
          text-align: center;
        }
      }
      .el-dialog{
        border-radius: 4px;
        .is-scrolling-none{
          .el-table__body{
            border-width: 0px;
          }
        }
      } 
     }   
</style>
