<template>
 <div class="container" style="padding-top:30px;position: relative;">
    <div class="block" style="margin-top: 15px;" >
      <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 48px;">
        <span style="position: absolute;left: 127px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>  
        <el-dropdown  @command="dropdown_Com" style="margin-left: 25px;" @visible-change="visibleChangemediaCom">
              <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">
                {{current_Com.stockName}}
                <span v-show="current_Com.stockType == 1">(A股)</span>
                <span v-show="current_Com.stockType == 2">(港股)</span>
                <span v-show="current_Com.stockType == 3">(美股)</span>
                <i :class="sort_dropdown_visible_Com? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i>
              </el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in stockNameList" :command="i" :key="i">{{i.stockName}}</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>
        <div class="block" style="display: inline-block" >
          <el-date-picker
           @change="date_change"
           :editable="edit"
           :clearable="edit"
           style="position: relative;width:170px;font-size: 12px;margin-left:42px;"
            v-model="time[0]"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        <div class="block" style="display: inline-block;margin-top: 12px;" >
            <span class="demonstration" style="margin: 0 5px;">至</span>
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
        <span class="SearchBegin" id="search"  @click="search" >搜索</span>
      </div>
    </div>
<!-- content 区域 -->
    <div class="NewsShare" style="padding: 0 0px 20px 0px;background-color:white;border: 1px solid rgb(228,228,228);border-top-width: 0;">  
        <img src="../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;" v-show="this.data.length == 0">
        <div class="content" v-show="this.data.length != 0">
            <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>新闻与股价走势</p>
            <div id="ec_NewsShare" style="width: 1218px;height: 600px;margin: 5px auto"></div>
        </div>
    </div>
    <!-- 相关文章模态框 -->
    <el-dialog title="相关新闻" :visible.sync="NewsShare_dialog_articleList_switch" width="700px" id="dialog_ct" >
      <div style="position:absolute;left: 35px;padding: 10px;width:620px;height: 520px;">
          <el-table
            :data="NewsShare_articleList"
            stripe
            style="width: 100%">
            <el-table-column
              label="文章标题"
              show-overflow-tooltip>
              <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title }}</a></template>
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
 </div>   
</template>

<script>
import _echart from '../../assets/js/_echart.js'
import {format_time,date_change,publicSearch,tipsMessage,successBack,similar,GetLocalStorage,startLoading,endLoading }  from '../../assets/js/map.js'
export default {
  mounted:function () { 
    $('.NewsShare').css('min-height','700px');     
    this.getStock()//获取股票列表
        .then(data => {this.search()})//查询
  },
  data () {
    return {
        data:[],
        edit:false,     
        stockNameList:[],//股票列表
        current_Com:'',
        time:[new Date(new Date().getTime()-604800000), new Date()],
        sort_dropdown_visible_Com:true,//true为显示false为隐藏
        NewsShare_articleList:[],//文章列表 
        NewsShare_dialog_articleList_switch:false, //相关文章模态框   
        NewsShare_currentPage:1,//默认页码
        NewsShare_articleTotal:0,//文章列表总数
        paramsData:''//echarts 数据
    }
  },
  methods: {
    getStock(){//获取股票列表
     return publicSearch('rsa/stock',"GET",{'data':'get'}).then((data) =>{
         this.stockNameList = data.data;
         this.current_Com = this.stockNameList[0];
      })
    },
    search() {
      this.data = [];
      startLoading();
      format_time();
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
        this.data = ['有数据'];
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
          start = (((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) - 7) / ((this.time[1].getTime() - this.time[0].getTime()) / (3600000 * 24)) * 100;
          if(data.data.stockPriceArticle.total != 0){//新闻数量不等于0
            for(let i in data.data.stockPriceArticle.timeAggMap){
              NewsData.push(data.data.stockPriceArticle.timeAggMap[i]);
            }
          };
          data.data.stockPriceList.forEach(item =>{
            let arr = [];
            arr[0] = item.priceOpen;
            arr[1] = item.priceClosingToday;
            arr[2] = item.priceLowest;
            arr[3] = item.priceHighest;
            ShareData.push(arr);
            xAxisNewsData.push(new Date(item.crawlTime).Format("yyyy-MM-dd"));
          });
          this.$nextTick()//初始化视图
              .then(()=>_echart.NewsShare('ec_NewsShare', NewsData, ShareData, xAxisNewsData,start,end,data.data.stockPriceArticle.total,this));
        }
      })
    },
    newsShare_dialog_articleList(data){
      if(data.componentSubType != 'bar') return; //非新闻
      this.paramsData = {'startTime': data.name.length == 13 ? new Date(data.name+':00') : new Date(data.name),
                          'timeType': data.name.length == 13 ? 0 : 1,
                          'stockId':this.current_Com.stockId,
                          'pageSize':10};
      this.NewsShare_currentPage = 1;
      this.handleNewsShareCurrentChange(this.NewsShare_currentPage);
    },
    handleNewsShareCurrentChange(val){
      this.NewsShare_currentPage = val;
      let params = Object.assign({},{...this.paramsData,'pageNum':val});
      startLoading();
      publicSearch(`rsa/stock/${this.current_Com.stockId}/stockprice/article`,'get',params).then((data) =>{
         endLoading();
         this.NewsShare_dialog_articleList_switch = true;
         if(!successBack(data,this)) return;
         this.NewsShare_articleTotal = data.data.total;
         this.NewsShare_articleList = data.data.articleList;
      })
    },
    date_change (){date_change(this);},
    dropdown_Com(command){ this.current_Com = command ;},
    visibleChangemediaCom(a){ this.sort_dropdown_visible_Com = !a;},
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
