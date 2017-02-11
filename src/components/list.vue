<template>  
<div class="routerlist">
<br>
  <div class="input-group">
    <span class="input-group-addon" id="basic-addon1"><i class="fa fa-search"></i></span>
    <input type="text" class="form-control" placeholder="Search.." aria-describedby="basic-addon1" v-model="it">
  </div>
<br>
  <ul class="list-group">
    <li class="list-group-item active" > <span class="badge">{{title.length}}</span>{{type}}</li>
    <a href="#detail" class="list-group-item" v-for="(i,$index) in titles " @click="see(i,$index)">{{i.title}}</a>
  </ul>
<!--   <input type="text" v-model="name">
  <ul>
   <li v-for="user in newUsers">{{user.name}}</li>
   </ul>  -->  
</div>
</template>
<script >
  export default{
    data : function(){ 
        return{
          type:JSON.parse(window.localStorage.getItem('type')),
          title:JSON.parse(window.localStorage.getItem('title')),
          it:''
/*          name:'',
          users:[{ name: 'Bruce' },
                { name: 'Chuck' },
                { name: 'Jackie'},
                { name: '赵' }]*/
        }
    },
    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },
    methods:{
      see (i,index) {
        window.localStorage.setItem('detail',JSON.stringify(i));
      }
    },
    computed:{
/*      newUsers: function () {
        var that = this;
        return that.users.filter(function (a){
          return a.name.toLowerCase().indexOf(that.name.toLowerCase()) !== -1;
        })
        }*/
        titles: function () {
          var othat = this;
          return othat.title.filter(function (a){
            return a.title.toLowerCase().indexOf(othat.it.toLowerCase()) !== -1;
          })
        }       
      }
  }
</script>
<style lang="scss" scoped>

</style>