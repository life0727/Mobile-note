<template>  
<div class="high">
  <h4 style="margin-left: 15px;color:rgba(244,169,100,.9)">当前是高级模式</h4>
  <transition enter-active-class="animated fadeInUp">
    <router-view ></router-view>
  </transition>   
  
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