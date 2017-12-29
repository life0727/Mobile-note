<template>
<div>
  <topnav></topnav>
  <div class="all_net_analysis container"> 
     <div class="all_net_analysis_content container">
        <hr>
        <div class="btn-group" role="group" id="filter" aria-label="..." style="">
          <button type="button" class="btn btn-default" id="filter_name" style="border:none;background: rgba(230,230,230,.8);margin-left:2px;font-size:14px;">监测时间：</button>
          <button type="button" class="btn btn-default btn-warning" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</button>
          <button type="button" class="btn btn-default " @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</button>
          <button type="button" class="btn btn-default " @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</button>
          <!-- <div class="block" style="padding-left:35%;margin-top:-7px;">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="float: left;margin-top:-5px;"></el-date-picker>
            <span style="float: left;padding:0px 15px;height:28px;line-height: 28px;margin-top:-5px;">至</span>
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" style="float: left;margin-top:-5px;"></el-date-picker>
            <button type="button" class="btn btn-default btn-info" style="border:none;">搜索</button>
          </div> -->
          <div class="block" style="padding-left:30%;margin-top: -7px;" >
            <el-date-picker v-model="time" @change="date_change" type="datetimerange" placeholder="选择日期时间" style="float: left;margin-top:-5px;width:290px;font-size: 12px"></el-date-picker>
          </div>
          <!-- <el-button type="success" size="large"  @click="search_start" style="background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-top: -28px;padding: 2px 8px;line-height: 1.2;margin-bottom: 5px;">搜索</el-button> -->
          <span><button type="button" class="btn btn-default " @click="search_start" style="background-color:  #00b38a;border-color:  #00b38a;color: white;" >搜索</button></span>
        </div>
        <div class="echart row">
          <div style="width: 900px;height: 550px;margin:0 auto;" >
            <p v-loading="true" element-loading-text="系统拼命加载中..." style="top:200px;" id="loading_xinwen"></p>
            <div class="echart_content" >
              <div class="echart_content_head panel panel-default">
                <div class="panel-heading">
                  全网新闻指数top20
                </div>
                <div class="panel-body" id="xinwen_top" style="width: 898px;height: 510px;text-align: center;background-color: snow;">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="echart row">
          <div style="width: 900px;height: 550px;margin:0 auto;position: relative" >
            <p v-loading="true" element-loading-text="系统拼命加载中..." style="top:200px;" id="loading_weixin"></p>
            <div class="echart_content" id="weixin_top">
              <div class="echart_content_head panel panel-default">
                <div class="panel-heading">
                  全网微信阅读数top20
                </div>
                <div class="panel-body" id="weixin_top" style="width: 898px;height: 510px;text-align: center;"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>  
</template>

<script>
  import topnav from './top_nav.vue'
  import echarts from 'echarts'
export default {
  name: 'app',
  mounted :function () {
  //$('#sum .el-badge__content').css({'padding':'1px 5px','border':'0px solid #fff'});
      this.search_xinwen();
      this.search_weixin();
      this.$store.state.start_data= this.$store.state.data;
     //筛选时期
     $('#filter>button').not('#filter_name').click(function(){
      $(this).addClass('btn-warning').siblings().removeClass('btn-warning');
     })
      
  },
  data () {
  	return {
      echart:['全网新闻指数top20','全网微信阅读数top20','媒体关注数top20','媒体友好度数top20','quanwanshhjijadn'],
      time: [new Date(new Date().getTime()-604800000), new Date()]
  	}
  },
  methods: {
    search_start () {
      $('#loading_xinwen').css('display','block')
      $('#loading_weixin').css('display','block')
      $('#xinwen_top').css('display','none')
      $('#weixin_top').css('display','none')     
      this.search_xinwen();
      this.search_weixin();
    },
    date_change () {
      $('#loading_xinwen').css('display','block')
      $('#loading_weixin').css('display','block')
      $('#xinwen_top').css('display','none')
      $('#weixin_top').css('display','none') 
       $('#filter>button').not('#filter_name').removeClass('btn-warning');  
       if(this.time[0]==undefined||this.time[1]==undefined||this.time[1].getTime()<this.time[0].getTime()){
          this.time=[new Date(new Date().getTime()-604800000), new Date()];
          this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }else{
          this.search_xinwen();
          this.search_weixin();
         }  
      
    },
    search_xinwen () {
      //新闻top20数据
        let xinwen_top_data_num=[],_this=this;
        $.ajax({
              url:'http://192.168.0.3:8080/rs/api/v1.1/article/topn',
              type:'GET',
              data:{
                 topN:20, //topN前多少条
                 articleType:1, //新闻1 微信2  
                 startTime:_this.time[0],
                 endTime:_this.time[1]
              },
              success:function(data){
                 /*alert("测试topN-----成功回调函数-------------------");
                 alert(JSON.stringify(data));*/
                if(data.data){
                  for(let i=0;i<data.data.length;i++){
                    xinwen_top_data_num.push(data.data[i].article.newsIndex)
                  }
                    xinwen_top_data_num.sort(function(a,b){return a-b})
                     $('#xinwen_top').css('display','block')
                     $('#loading_xinwen').css('display','none')
                      console.log(xinwen_top_data_num)
                       let xinwen_top=echarts.init(document.getElementById('xinwen_top'));
                       xinwen_top.showLoading({
                            text: 'loading',
                            color: '#c23531',
                            textColor: '#000',
                            maskColor: 'snow'
                        });
                       let option_xinwen_top={
                            title: {
                                       text: '新闻指数top20'
                                  },
                            tooltip: {
                                        trigger: 'axis',
                                        axisPointer: {
                                            type: 'shadow'
                                        },
                                        formatter: function (params, ticket, callback) {   
                                           return `标题： ${data.data[xinwen_top_data_num.length-(params[0].dataIndex)-1].article.title} <br> 新闻指数：${data.data[xinwen_top_data_num.length-(params[0].dataIndex)-1].article.newsIndex}`  
                                           //console.log(data.data[params[0].dataIndex])                                                               
                                        }
                                    }, 
                            legend: {
                                        data: ['新闻']
                                    },
                            grid: {
                                        left: '3%',
                                        right: '4%',
                                        bottom: '3%',
                                        containLabel: true
                                    },
                            xAxis: {
                                        type: 'value',
                                        boundaryGap: [0, 0.01]
                                    },
                            yAxis: {
                                        type: 'category',
                                        data: xinwen_top_data_num
                                    },
                            series: [
                                        {
                                            name: '新闻',
                                            type: 'bar',
                                            data: xinwen_top_data_num
                                        }
                                    ]                  
                      }    
                     xinwen_top.hideLoading();
                     xinwen_top.setOption(option_xinwen_top)
                }else{
                  $('#loading_xinwen').css('display','none')
                   $('#xinwen_top').html(`<h4>新闻指数top20</h4><br><p>暂无数据</p>`)
                }
                 
                
              },
              error:function(data){
                 alert("测试topN------失败回调函数-------------------");
              }
           });
    },
    search_weixin () {
      //微信top20数据
        let weixin_top_data_num=[],_this=this;
        $.ajax({
          url:'http://192.168.0.3:8080/rs/api/v1.1/article/topn',
          type:'GET',
          data:{
             topN:20, //topN前多少条
             articleType:2, //新闻1 微信2  
             startTime:_this.time[0],
             endTime:_this.time[1]
          },
          success:function(data){
             /*alert("测试topN-----成功回调函数-------------------");
             alert(JSON.stringify(data));*/
            if(data.data){
                for(let i=0;i<data.data.length;i++){
                weixin_top_data_num.push(data.data[i].article.readCount)
                }
                weixin_top_data_num.sort(function(a,b){return a-b})
                $('#weixin_top').css('display','block')
                $('#loading_weixin').css('display','none')
                //console.log(weixin_top_data_num)
                 let weixin_top=echarts.init(document.getElementById('weixin_top'));
                 weixin_top.showLoading({
                      text: 'loading',
                      color: '#c23531',
                      textColor: '#000',
                      maskColor: 'snow'
                  });
                 let option_weixin_top={
                      title: {
                                 text: '微信阅读数top20'
                            },
                      tooltip: {
                                  trigger: 'axis',
                                  axisPointer: {
                                      type: 'shadow'
                                  },
                                  formatter: function (params, ticket, callback) {   
                                     return `标题： ${data.data[weixin_top_data_num.length-(params[0].dataIndex)-1].article.title} <br> 微信阅读数：${data.data[weixin_top_data_num.length-(params[0].dataIndex)-1].article.readCount}`  
                                                                                                  
                                  }
                              }, 
                      legend: {
                                  data: ['微信']
                              },
                      grid: {
                                  left: '3%',
                                  right: '4%',
                                  bottom: '3%',
                                  containLabel: true
                              },
                      xAxis: {
                                  type: 'value',
                                  boundaryGap: [0, 0.01]
                              },
                      yAxis: {
                                  type: 'category',
                                  data: weixin_top_data_num
                              },
                      series: [
                                  {
                                      name: '微信',
                                      type: 'bar',
                                      data: weixin_top_data_num
                                  }
                              ]                  
                }    
               weixin_top.hideLoading();
               weixin_top.setOption(option_weixin_top)
            }else{
                $('#loading_weixin').css('display','none')
               $('#weixin_top').html(`<h4>微信阅读数top20</h4><br><p>暂无数据</p>`)
            }
             
          },
          error:function(data){
             alert("测试topN------失败回调函数-------------------");
          }
       });
    }
  },
  components:{
    topnav
  }
}
</script>
<style lang="scss" >
  .all_net_analysis{
    background:rgb(228,228,228);
    padding:0 0 200px 0;
    .all_net_analysis_content{
      background-color: snow;
      width:97.4356%;
      padding-bottom: 30px;
      margin: 30px 15px 0 15px;
      h4{
         color:#f0ad4e;
      }
      hr{
         margin: 10px 0;
      }
      >.btn-group{
        .btn-warning{
          color: rgb(255, 255, 255);
        background-color: rgb(0, 179, 138);
        border-color: rgb(0, 179, 138);
        }
        .btn{
          font-size: 12px;
          line-height: 1.2;
          outline: none;
        }
        .btn:focus{
         border-color: rgb(0, 179, 138);
        }
        margin-top: 10px;
        width:100%;
        button{
          padding:3px 8px;
          margin-left: 2% !important;
          border-radius: 4px !important;
        }
        .block{
          border-radius: 4px !important;
          padding-bottom: 6px;
          .el-input__inner{
            height:28px;
          }
        }
      }
      .echart{
        margin-top: 18px;
        >div{
          height:280px;
          margin: 10px 0;
          .echart_content{
            width: 100%;
            height:100%;
            box-shadow: 3px 3px 2px rgba(242,194,179,.6);
          }
        }
      }
    }
  }
</style>
