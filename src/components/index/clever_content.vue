<template>  
<div class="clever_content">
  <div class="container">
    <label style="background:rgba(215,215,215,.8);height:1px;width:60%;margin-left: 20%;"><span style="position:absolute;left:50%;margin-left: -81px;margin-top: -10px;color:rgb(245,104,56);font-size:1.8rem">选择您想监测的类型</span></label>
      <div class="container choose-type" id="app">
        <div class="row" style="margin-top:3%;">
            <div class="col-xs-3 text-center icons" >
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-building" > <span></span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-cny" ><span style="padding: 10px 10px"></span> </i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-star" ><span></span> </i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-hospital-o" ><span style="padding: 10px 15px;"></span> </i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-flag" ><span></span> </i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-university"  > <span > </span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-line-chart" > <span></span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-futbol-o" > <span></span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-apple" > <span style="padding:10px 10px"> </span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-list-alt" ><span style="padding:10px 20px;"></span> </i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-heart" > <span></span></i>
                </a>
            </div>
            <div class="col-xs-3 text-center icons">
                <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
                    <i class="fa fa-chain" ><span style="padding:10px 15px;"></span> </i>
                </a>
            </div>  
        </div>
        <h5 class="text-center" id="source"></h5>
      </div>
    </div>  
</div>  
</template>
<script >
import { index_clever } from '../../assets/js/index_clever.js'
  export default{
    data : function(){ 
        return{

        }
    },
/*    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },*/
    methods:{

    },
    computed:{
      
    },
    mounted:function () {
      index_clever()
    }
  }
</script>
<style lang="scss" scoped>
.clever_content{
  .choose-type .icons{
    margin:2rem 0 2.5rem;
    -webkit-transition: all 1s;
    -moz-transition:all 1s;  
    -ms-transition:all 1s;      
      i{
        font-size: 7rem;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        >span{
          position: absolute;
          width:100%;
          height:100%;
          top:0;
          left:0;
          opacity: 0;
          transition: all 1s;
          border-radius: 50%; 
          font-size: 2rem; 
          padding: 10px 20px; 
        }
      }
  }
} 
</style>