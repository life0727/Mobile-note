<template>  
<div class="high_content container" style="width:80%;margin-left: 10%;margin-top: 3%;">
  <span class="demonstration">设置抓取源：</span>
  <span class="wrapper" >
    <el-button type="warning" >新闻</el-button>
    <el-button type="">微信</el-button>
  </span>
  <hr>
  <div style="height:200px;background: #ccc"></div>
  <div class="col-xs-offset-5" style="margin-top:4%;margin-bottom: 5%;" >
  <router-link to="/index/high/high_content_next">
    <button type="button" class="btn btn-primary btn-lg btn-block " style="width:20%">下一步</button>
   </router-link>  
  </div>  
</div> 
</template>
<script >
  export default{
    data : function(){ 
        return{

        }
    },
    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },
    methods:{

    },
    computed:{
      
      }
  }
</script>
<style lang="scss" scoped>
div{
 
  
}
</style>