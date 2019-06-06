<template>
 <div class="container" style="padding-top:30px;position: relative;">
    <div class="block" style="margin-top: 15px;" >
      <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 48px;">
         
        <el-dropdown  @command="dropdown_Com" style="margin-left: 25px;" @visible-change="visibleChangemediaCom">
              <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">
                {{current_Com.stockName}}
                <span v-show="current_Com.stockType == 1">(A股)</span>
                <span v-show="current_Com.stockType == 2">(港股)</span>
                <span v-show="current_Com.stockType == 3">(美股)</span>
                <i :class="sort_dropdown_visible_Com? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i>
              </el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in stockNameList.slice(0,10)" :command="i" :key="i" :style="{lineHeight,fontSize}">{{i.stockName}}</el-dropdown-item>
                  <el-dropdown-item divided v-show="stockNameList.length > 10" style="color:#00b38a;text-align:center" >更多</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-left: 10px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span> 

        <!-- 日期组件 -->
        <datePicker @receiveFromDatePicker = "dataPickerData"></datePicker>
        <span class="SearchBegin" id="search"  @click="search" >搜索</span>
      </div>
    </div>
<!-- content 区域 -->
    <div class="NewsShare" style="padding: 0 0px 20px 0px;background-color:white;border: 1px solid rgb(228,228,228);border-top-width: 0;">  
        <img src="../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;" v-show="this.data.length == 0">
        <div class="content" v-show="this.data.length != 0">
            <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>新闻与股价走势</p>
            <!-- 大盘指数 -->
            <el-dropdown  @command="dropdown_MmarketIndexInfo" style="margin-left: 20px;" @visible-change="visibleChangeMmarketIndexInfo" v-show="this.data[0]">
                  <el-button style="padding: 3px 5px;border-width: 0px;color:#00b38a">
                    {{current_marketindexinfo.marketIndexName}}
                    <i :class="sort_dropdown_visible_marketindexinfo ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i>
                  </el-button>    
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="i in marketindexinfoList.slice(1,marketindexinfoList.length)" :command="i" :key="i">{{i.marketIndexName}}</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown>
            <!-- echarts -->
            <div id="ec_NewsShare" style="width: 1218px;height: 600px;margin: 5px auto"></div>
        </div>
    </div>
    <!-- 相关文章模态框 -->
    <el-dialog title="相关新闻" :visible.sync="NewsShare_dialog_articleList_switch" width="700px" id="dialog_ct" >
      <div style="position:absolute;left: 35px;padding: 10px;width:620px;height: 520px;">
          <el-dropdown  @command="dropdown_SortArtileList" style="margin-left: 25px;position:absolute;z-index:5;top:23px;display:none" @visible-change="visibleChangeSortArticle">
                <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">
                  {{current_SortArtileList}}
                  <i :class="sort_dropdown_visible_SortArticleList ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i>
                </el-button>    
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in SortArtileList" :command="i" :key="i">{{i}}</el-dropdown-item>
                </el-dropdown-menu>
          </el-dropdown>
          <el-table
            :data="NewsShare_articleList"
            stripe
            style="width: 100%">
            <el-table-column
              label="文章标题"
              show-overflow-tooltip>
              <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title }} <span style="color:#666;font-size:12px">({{scope.row.mediaName + ':' + new Date(scope.row.publishTime).Format("yyyy-MM-dd hh:mm:ss")}})</span> </a></template>
            </el-table-column>
          </el-table>
        <el-pagination
        class="page"
        @current-change="handleNewsShareCurrentChange"
        :current-page.sync="NewsShare_currentPage"
        :page-size="10"
        :pager-count="5"
        layout="total,  prev, pager, next"
        :total="this.NewsShare_articleTotal"
        v-show="this.NewsShare_articleTotal!==0">
        </el-pagination>
    </div>
  </el-dialog>
  <dialogList :listData="listDATA" @receiveFromDialoglist="DialoglistData"></dialogList>
 </div>   
</template>

<script>
import dialogList from './util/dialogList.vue'
import datePicker from './util/datePicker.vue'
import echarts from 'echarts'
import _echart from '../../assets/js/_echart.js'
import {publicSearch,tipsMessage,successBack,similar,GetLocalStorage,startLoading,endLoading,_Sort}  from '../../assets/js/map.js'
export default {
  mounted:function () { 
    $('.NewsShare').css('min-height','700px');     
    this.getStock()//获取股票列表
        .then(data => {this.search()})//查询
  },
  data () {
    return {
        data:[],//[0]小于7 [1]大于7
        lineHeight:'',//股票下拉适配
        fontSize:'',   //股票下拉适配   
        stockNameList:[],//股票列表
        marketindexinfoList:[],//大盘基本信息列表
        SortArtileList:['默认排序','时间正序','时间倒序'],//排序方式
        current_Com:'',//股价名称
        current_marketindexinfo:'',//大盘名称
        current_SortArtileList:'默认排序',
        time:[new Date(new Date().getTime()-604800000), new Date()],//时间
        sort_dropdown_visible_Com:true,//true为显示false为隐藏
        sort_dropdown_visible_SortArticleList:true,//true为显示false为隐藏
        sort_dropdown_visible_marketindexinfo:true,//true为显示false为隐藏
        NewsShare_articleList:[],//文章列表 
        NewsShare_dialog_articleList_switch:false, //相关文章模态框   
        NewsShare_currentPage:1,//默认页码
        NewsShare_articleTotal:0,//文章列表总数
        paramsData:'',//echarts 数据
        firstPrice:'',//股票趋势折线图第一个非0值的点的开盘价
        bigOption_:'',//大于七天的option为了填充大盘图用
        listDATA:''//给listData组件的数据
    }
  },
  components:{
    dialogList,
    datePicker
  },
  methods: {
    getStock(){//获取股票列表
     return publicSearch('rsa/stock',"GET",{'data':'get'}).then((data) =>{
        if(!successBack(data,this)) return;
         this.stockNameList = data.data;
         this.current_Com = this.stockNameList[0];
      })
    },
    getMarketindexinfo(){//大盘基本信息列表查询
      return publicSearch('rsa/marketindexinfo',"GET",{'data':'get'}).then((data) =>{
        if(!successBack(data,this)) return;
         data.data.unshift({'marketIndexName':'选择大盘'});
         this.marketindexinfoList = data.data
         this.current_marketindexinfo = this.marketindexinfoList[0];
      })
    },
    search() { //查询总数据方法
      this.data = [];
      startLoading();
      let NewsData = [], //新闻数据数组
          ShareData = [], //股价数据数组
          start, //默认选中的起始
          end = 100, //默认选中的结束
          xAxisShareData = [], //股价数组横坐标 十五min一次
          xAxisNewsData = [], //新闻数组横坐标 一小时一次
          ShareMaxData, //股价最大值
          ShareMinData, //股价最小值
          NewsMaxData, //新闻最大值
          NewsMinData, //新闻最小值
          params = {
                "method": "get",
                "stockId":this.current_Com.stockId,//股票id
                "startTime":this.time[0], //Date格式 非字符串
                "endTime":this.time[1]
                };
      publicSearch('rsa/stock/'+this.current_Com.stockId+'/stockprice',"GET",params).then((data) =>{
        endLoading();
        if(!successBack(data,this)) return;
        console.log(data)
        this.data = [data.data.timeType];
        if(data.data.timeType == 0){//小于七天
          start = (((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) - 1) / ((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) * 100;
          data.data.stockPriceList.forEach((item,index,self)=>{
            item.priceNow == 0 ? item.priceNow = self[index-1].priceNow : item.priceNow;
            ShareData.push(item.priceNow == undefined ? 0 : item.priceNow );//如果第一个是0 则会变成undefind
            xAxisShareData.push(new Date(item.crawlTime).Format("yyyy-MM-dd hh:mm"));
          });
          if(data.data.stockPriceArticle.total != 0){//新闻数量不等于0
            for(let i in data.data.stockPriceArticle.timeAggMap){
              NewsData.push(data.data.stockPriceArticle.timeAggMap[i]);
              xAxisNewsData.push(new Date(Number(i)).Format("yyyy-MM-dd hh"))
            }
          }
          let somearr = ShareData.filter(item => {return item != null});//为了求x最大值与最小值
          ShareMaxData = ((Math.max(...somearr)*5-Math.min(...somearr))*0.25).toFixed(2)//Math.round((Math.max(...somearr)*5-Math.min(...somearr))*0.25)
          ShareMinData = ((Math.min(...somearr)*5-Math.max(...somearr))*0.25).toFixed(2)//Math.round((Math.min(...somearr)*5-Math.max(...somearr))*0.25)

          NewsMaxData = Math.round(Math.max(...NewsData)*1.5) //Math.max(...NewsData) + Math.round((Math.max(...NewsData) - Math.min(...NewsData))) * 0.25
          NewsMinData = 0//Math.min(...NewsData) - Math.round((Math.max(...NewsData) - Math.min(...NewsData)) * 1)
          this.$nextTick()//初始化视图
              .then(()=> _echart.NewsShare('ec_NewsShare', NewsData, ShareData, start, end, xAxisShareData, xAxisNewsData, ShareMaxData, ShareMinData, NewsMaxData, NewsMinData,data.data.stockPriceArticle.total,this)); 
        }else{//大于七天
          this.getMarketindexinfo()
          start = 0//(((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) - 7) / ((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) * 100;
          if(data.data.stockPriceArticle.total != 0){//新闻数量不等于0
            for(let i in data.data.stockPriceArticle.timeAggMap){
              NewsData.push(data.data.stockPriceArticle.timeAggMap[i]);
            }
          };
          data.data.stockPriceList.forEach(item =>{
            let arr = [];
            arr[0] = item.priceOpen;
            arr[1] = item.priceClose;
            arr[2] = item.priceLowest;
            arr[3] = item.priceHighest;
            arr[4] = item.floating;
            ShareData.push(arr);
            xAxisNewsData.push(new Date(item.tradeDate).Format("yyyy-MM-dd"));
          });
          for(let i of ShareData){ //股票趋势折线图第一个非0值的点的开盘价 作为大盘指数接口使用
              if(i[0] != undefined){
                this.firstPrice = i[0];
                break;
              } 
          };
          this.$nextTick()//初始化视图
              .then(()=>_echart.NewsShare('ec_NewsShare', NewsData, ShareData, xAxisNewsData,start,end,data.data.stockPriceArticle.total,this));
        }
      })
    },
    newsShare_dialog_articleList(data){ //展示新闻dialog
      if(data.componentSubType != 'bar') return; //非新闻
      this.paramsData = {'startTime': data.name.length == 13 ? new Date(data.name.replace(/-/g,'/') + ':00') : new Date(data.name.replace(/-/g,'/')),
                          'timeType': data.name.length == 13 ? 0 : 1,
                          'stockId':this.current_Com.stockId,
                          'pageSize':10};
      this.NewsShare_currentPage = 1;
      this.handleNewsShareCurrentChange(this.NewsShare_currentPage);
    },
    handleNewsShareCurrentChange(val){ //获取新闻列表的方法
      this.NewsShare_currentPage = val;
      let params = Object.assign({},{...this.paramsData,'pageNum':val});
      startLoading();
      publicSearch(`rsa/stock/${this.current_Com.stockId}/stockprice/article`,'get',params).then((data) =>{
         endLoading();
         this.NewsShare_dialog_articleList_switch = true;
         if(!successBack(data,this)) return;
         this.NewsShare_articleTotal = data.data.total;
         //console.log(data.data.articleList)
         data.data.articleList.sort(_Sort('publishTime'))
         this.NewsShare_articleList = data.data.articleList;
      })
    },
    dropdown_Com(command){command != undefined ? this.current_Com = command : this.show_more()},//下拉股价列表的方法
    dropdown_SortArtileList(command){ //文章列表排序规则
      this.current_SortArtileList = command;
    },
    dropdown_MmarketIndexInfo(command){ //动态加载echarts
      this.current_marketindexinfo = command ;
      let params = {
        "method": "get",
        "marketIndexId":command.marketIndexId,//大盘id
        "startTime":this.time[0], //Date格式 非字符串
        "endTime":this.time[1],
        "firstPrice":this.firstPrice//股票趋势折线图第一个非0值的点的开盘价
      },
      _this = this,
      clickFlag,//点击变换颜色参数
      ShareData = [],
      maxShareList = [],//股价最高值的最大值
      minShareList = [],//大盘最低值的最小值
      absValue = '';//大盘最低值的最小值 -  大盘最低值的最小值 的绝对值
      startLoading();
      publicSearch('rsa/marketindex/' + command.marketIndexId,"GET",params).then((data) =>{
        endLoading();
        if(!successBack(data,this)) return;
        console.log(data)
        // data.data.marketIndexList.forEach((item,index) =>{
        //   item.dealLowest == null ? '' : minShareList.push(item.dealLowest)
        // })  
        // this.bigOption_.series[0].data.forEach((item) =>{
        //   item[3] == undefined ? '' :  maxShareList.push(item[3])
        // })
        // absValue = Math.abs(Math.max(...maxShareList) - Math.min(...minShareList));
        data.data.marketIndexList.forEach((item,index) =>{
          let arr = [];
          // arr[0] = item.dealOpen == null ? undefined : (item.dealOpen + absValue).toFixed(2);
          // arr[1] = item.dealClose == null ? undefined : (item.dealClose + absValue).toFixed(2);
          // arr[2] = item.dealLowest == null ? undefined : (item.dealLowest + absValue).toFixed(2);
          // arr[3] = item.dealHighest == null ? undefined : (item.dealHighest + absValue).toFixed(2);
            arr[0] = item.dealOpen == null ? undefined : item.dealOpen;
            arr[1] = item.dealClose == null ? undefined : item.dealClose;
            arr[2] = item.dealLowest == null ? undefined : item.dealLowest;
            arr[3] = item.dealHighest == null ? undefined : item.dealHighest;
            arr[4] = item.floating == null ? undefined : item.floating + '100%';
          ShareData.push(arr)
        })
        //重写Option
        //this.bigOption_.series[2] = {data:ShareData,name:'大盘',type:'candlestick',itemStyle:{normal:{color:'e57373',color0:'#aed581',borderColor:'#e57373',borderColor0:'#aed581'}}};
        //this.bigOption_.series[2] = {data:ShareData,name:'大盘',type:'candlestick',itemStyle:{normal:{color:'rgba(255,255,255,0)',color0:'rgba(255,255,255,0)',borderColor:'#e57373',borderColor0:'#aed581'}}};
        this.bigOption_.series[2] = {data:ShareData,name:'大盘',type:'candlestick',itemStyle:{normal:{color:'rgba(0,0,255,0)',color0:'rgba(0,0,255,0.5)',borderColor:'rgb(0,0,255)',borderColor0:'rgba(0,0,255,0.5)'}}};
        this.bigOption_.series[1].itemStyle.normal.color = function(params){ return params.dataIndex == clickFlag ? '#98F5FF' : '#2d7dc2'};
        this.bigOption_.tooltip.formatter = function(params){
         let findindex = data.data.marketIndexList.findIndex((item) =>{ //获取大盘坐标
           return item.tradeDate == new Date(params[1].axisValueLabel + ' 00:00').getTime()
         })
         let string = `${params[1].axisValueLabel}<br>
                        大盘<br>
                        open:${data.data.marketIndexList[findindex].open == null ? '-' : data.data.marketIndexList[findindex].open.toFixed(2)}<br>
                        close:${data.data.marketIndexList[findindex].close == null ? '-' : data.data.marketIndexList[findindex].close.toFixed(2)}<br>
                        lowest:${data.data.marketIndexList[findindex].lowest == null ? '-' : data.data.marketIndexList[findindex].lowest.toFixed(2)}<br>
                        highest:${data.data.marketIndexList[findindex].highest == null ? '-' : data.data.marketIndexList[findindex].highest.toFixed(2)}<br>
                        floating:${data.data.marketIndexList[findindex].floating == null ? '-' : data.data.marketIndexList[findindex].floating.toFixed(2) + '%'}<br>
                        股价<br>
                        open:${_this.bigOption_.series[0].data[findindex][0] == undefined ? '-' : _this.bigOption_.series[0].data[findindex][0]}<br>
                        close:${_this.bigOption_.series[0].data[findindex][1] == undefined ? '-' : _this.bigOption_.series[0].data[findindex][1]}<br>
                        lowest:${_this.bigOption_.series[0].data[findindex][2] == undefined ? '-' : _this.bigOption_.series[0].data[findindex][2]}<br>
                        highest:${_this.bigOption_.series[0].data[findindex][3] == undefined ? '-' : _this.bigOption_.series[0].data[findindex][3]}<br>
                        floating:${_this.bigOption_.series[0].data[findindex][4] == undefined ? '-' : _this.bigOption_.series[0].data[findindex][4].toFixed(2) + '%'}<br>
                        新闻：${_this.bigOption_.series[1].data[findindex]}`;
          return string
        };
        //重写点击事件
        let _echart = echarts.init($('#ec_NewsShare')[0]);
        _echart.setOption(this.bigOption_);
        _echart.on('dataZoom',function(params){ //保存缩放的位置
            _this.bigOption_.dataZoom[0].start = params.batch ? params.batch[0].start : params.start;
            _this.bigOption_.dataZoom[0].end = params.batch ? params.batch[0].end : params.end;
        })
        _echart.on('click', function(params) {
            //点击后改变柱状图颜色
            clickFlag = params.dataIndex;
            _echart.setOption(_this.bigOption_);
            _this.newsShare_dialog_articleList(params)//事件传值
        });
      })
    },
    visibleChangemediaCom(a){ this.sort_dropdown_visible_Com = !a;},//下拉箭头展示效果
    visibleChangeSortArticle(a){ this.sort_dropdown_visible_SortArticleList = !a;},//下拉箭头展示效果
    visibleChangeMmarketIndexInfo(a){ this.sort_dropdown_visible_marketindexinfo = !a;},//下拉箭头展示效果
    show_more(){ //给股票子组件的数据
      this.listDATA = {
        mainName:'股票名称',
        title:'股票列表',
        switch:true,
        data:this.stockNameList,
        key:'stockName',//key键
        pageSize:10,
        pagerCount:5
      }
    },
    DialoglistData(val){ //股票子组件的数据
      this.dropdown_Com(val)
      //this.current_Com = this.stockNameList.filter(item => item.stockId == val.stockId)[0]
    },
    dataPickerData(val){//日期子组件的数据
      this.time = val;
    }
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
    #NewsShare_articleList{
      .el-dialog__body{
        padding: 10px 20px 30px 20px;
      }
    }
    #dialog_ct{
      .el-dialog__body{
        padding:10px 15px 15px 15px;
        height: 560px !important;
        .el-button--text:hover span{
          color: #f56c6c;
        }
      }
      .el-table td,.el-table th{
          height: 35px !important;
          text-align: center;
      }
      .el-table{
        thead{
          tr th{
            border-bottom-width: 0;
            background-color: #f7f7f7;
          }
        }
        td{
          padding: 2px
        }
        .el-table__row--striped td{
          background-color: #f7f7f7;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background-color: #00b38a;
          border-color: #00b38a;
        }
        .el-checkbox__input.is-focus .el-checkbox__inner{
          border-color: #00b38a;
        }
      }
      .page{
          position: absolute;
          right: 5px; 
          bottom: 5px;
          display: inline-block;
          .el-pagination__total{
            color:#999;
          }
          ul>li{
            opacity: 1;
          }
          .el-pager .active {
            color: #00b38a;
          }
      }
        .el-dialog{
          border-radius: 16px;
          .el-dialog__header{
          //background: #00b38a;
          padding: 15px 0;
          text-align: center;
          border-bottom: 1px solid #ebebeb;
          width: 600px;
          margin: 0 auto;
            .el-dialog__title{
              color: #333;
              font-weight:500px;
              padding-left: 14px;
            }
            .el-dialog__headerbtn{
              top:10px;
              right: 45px;
              font-size: 25px;
            }
          }
        } 
    }
</style>
