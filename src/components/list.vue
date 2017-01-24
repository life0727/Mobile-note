<template>  
<div class="routerlist">
<br>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span>
    <input type="text" class="form-control" placeholder="Search.." aria-describedby="basic-addon1">
  </div>
<br>
  <ul class="list-group">
    <li class="list-group-item active" > <span class="badge">{{title.length}}</span>{{type}}</li>
    <a href="#detail" class="list-group-item" v-for="(i,$index) in title" @click="see(i,$index)">{{i.title}}</a>
  </ul>
</div>
</template>
<script >
  export default{
    data : function(){ 
        return{
          type:JSON.parse(window.localStorage.getItem('type')),
          title:JSON.parse(window.localStorage.getItem('title'))
        }
    },
    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },
    methods:{
      see (i,index) {
        window.localStorage.setItem('detail',JSON.stringify(i));

      }
    }
  }
</script>
<style lang="scss" scoped>

</style>