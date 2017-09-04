<template>  
<div class="clever">
  <transition enter-active-class="animated fadeInUp" >
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
      
    },
    mounted:function () {
    
    }
  }
</script>
<style lang="scss" scoped>
.clever{

}
</style>