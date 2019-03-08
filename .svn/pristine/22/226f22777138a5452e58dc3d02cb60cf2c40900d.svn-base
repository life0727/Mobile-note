<template>  
<div class="dialog_relateArticle" v-loading.fullscreen.lock="loading" element-loading-text="系统拼命加载中...">
  <h4 v-show="childMsg.listData == undefined" style="margin: 2% 42%;color: #f34c81">暂无数据</h4>
    <div class="el-steps el-steps--vertical" >
      <div class="el-step is-vertical" style="margin-right: 0px; cursor: pointer;height: 50px;" v-for="(i,$index) in childMsg.listData" @mouseover="Mover_articleList($index)" @mouseout="Mout_articleList($index)">
        <div class="el-step__head  is-text" style="color: white;">
          <div class="el-step__line is-vertical" style="margin-right:0;width: 1px;"> </div>
          <span class="el-step__icon"><img src="../../../assets/icon/xiangguanwenzhang.png"></span>
        </div>
        <div class="el-step__main" style="margin-left: 0">
          <div class="el-step__title "  style="width: 480px;height: 32px;overflow:hidden;font-size: 14px;line-height:24px;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><a :href="i.url"  target="_blank" style="font-weight: 700;color: #48576a;text-decoration: none" ref="dialog_xw_articlelist">标题：{{i.title}}</a>
          </div>
          <!-- <div class="el-step__description " style=" color: #8391a5;">{{i.article.publishTime}}&nbsp;&nbsp;&nbsp;<span >指数：{{i.article.newsIndex}}</span>&nbsp;&nbsp;&nbsp;<span >媒体名称：{{i.article.media}}</span></div> -->
        </div>
      </div>
    </div>
    <el-pagination
      v-if="childMsg.pageShow"
      class="page"
      @current-change="refer_pageChange"
      :current-page="refer_currentPage"
      layout="total, prev, pager, next"
      :total="Number(childMsg.data.articleCount)"
      v-show="childMsg.listData != undefined">
    </el-pagination>
    <span slot="footer" class="dialog-footer" ></span> 
</div> 
</template>
<script >
import { changePage,successBack }  from '../../../assets/js/map.js'
  export default{
    props: ['childMsg'],
    data : function(){ 
        return{
          refer_currentPage:1,
          loading:false,
          articleType:2
        }
    },
    methods:{
      refer_pageChange(val){
        this.loading = true;
        this.articleType = this.childMsg.articleType;
        changePage(this,this.childMsg.data,10,val).then((data) =>{
          this.loading = false;
          if(successBack(data,this)){
            this.childMsg.listData = data.data.articleList;
            //this.$emit('toRefer',val);
          };
        });
      },
      Mover_articleList (i) { this.$refs.dialog_xw_articlelist[i].style.color = "#00a17c";},
      Mout_articleList (i) { this.$refs.dialog_xw_articlelist[i].style.color = "rgb(72,87,106)"; }
    }
  }
</script>
<style lang="scss">
.dialog_relateArticle{
  .page{
      position: absolute !important;
      right: 15px !important; 
      bottom: 15px !important;
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
      .el-pagination__jump{
        display: none;
      }
  }
}
</style>