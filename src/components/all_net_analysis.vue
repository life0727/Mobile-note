<template>
  <div class="all_net_analysis container">
     <topnav></topnav> 
     <div class="all_net_analysis_content container">
        <h4>全网事件分析</h4>
        <hr>
        <div class="btn-group" role="group" aria-label="..." style="margin-top:10px;">
          <button type="button" class="btn btn-default" style="border:none;background: rgba(230,230,230,.8);margin-left:2px;font-size:14px;">监测时间：</button>
          <button type="button" class="btn btn-default btn-warning" >今天</button>
          <button type="button" class="btn btn-default " v-for="i in times">{{i}}</button>
          <div class="block" style="padding-left:35%;margin-top:-7px;">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="float: left;margin-top:-5px;"></el-date-picker>
            <span style="float: left;padding:0px 15px;height:28px;line-height: 28px;margin-top:-5px;">至</span>
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" style="float: left;margin-top:-5px;"></el-date-picker>
            <button type="button" class="btn btn-default btn-info" style="border:none;">搜索</button>
          </div>

        </div>
        <div class="echart row">
          <div class="col-sm-6" v-for="i in echart">
            <div class="echart_content">
              <div class="echart_content_head panel panel-default">
                <div class="panel-heading">
                  {{i}}
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
export default {
  name: 'app',
  mounted :function () {
  $('#sum .el-badge__content').css({'padding':'1px 5px','border':'0px solid #fff'});
   
  },
  data () {
  	return {
      times:['一天','二天','七天'],
      echart:['全网新闻指数top20','全网微信阅读数top20','媒体关注数top20','媒体友好度数top20','quanwanshhjijadn'],
      value1: '',
      value2: ''
  	}
  },
  methods: {

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
        .btn{
          font-size: 12px;
          line-height: 1.2;
          outline: none;
        }
        margin-top: 10px;
        width:100%;
        button{
          padding:3px 8px;
          margin-left: 2% !important;
          border-radius: 4px !important;
        }
        .block{
          background-color: rgba(230,230,230,.8);
          border-radius: 4px !important;
          padding-top: 6px;
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
