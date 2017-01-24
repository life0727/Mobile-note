<template>  
<div class="routerone">
  <ul class="list-group" style="margin-bottom: 0">
    <li class="list-group-item active"><span class="badge">{{all}}</span>ALL </li>
  </ul>
  <div class="list-group " id="item">
    <a href="#list" v-for="(i,$index) in items" @click="look(i,$index)" class="list-group-item"><i class="fa fa-chevron-circle-right pull-right"></i> <span class="badge">{{i[1].content.length}}</span>{{i[0].type}}</a>
    <!-- <a href="#" class="list-group-item"><i class="fa fa-chevron-circle-right pull-right"></i><span class="badge">0</span>Porta ac consectetur ac</a> -->
</div>
</div>
</template>
<script >
  export default{
    data : function(){ 
      return{
          items:JSON.parse(window.localStorage.getItem('sj'))||[
                [{'type':'随笔','danger':false},{'content':[{'title':'沁园春','text':'bbbll'},{'title':'伊泽瑞尔','text':'2222'}]}],
                [{'type':'散文','danger':false},{'content':[{'title':'暗夜猎手','text':'nndannn'}]}],
                //[{'type':'pear'},{'content':[{'title':'','text':''}]}]
                ],
          all:''               
      }
    },
    created : function () {
      window.localStorage.setItem('sj',JSON.stringify(this.items));
      let ff=0;
      for(let x=0;x<this.items.length;x++){
        ff+=this.items[x][1].content.length;
      }
      this.all=ff;
    },
    methods:{
      look (d,w) { 
        //console.log(d);
        window.localStorage.setItem('type',JSON.stringify(d[0].type));  
        window.localStorage.setItem('title',JSON.stringify(d[1].content));  
        window.localStorage.setItem('isj',JSON.stringify(d))
        let data=JSON.parse(window.localStorage.getItem('sj'));
        //console.log(data[w])
        $.each(data,function(j,n){
          n[0].danger=false;
        });        
        data[w][0].danger=true;
        window.localStorage.setItem('sj',JSON.stringify(data))
      }
    }
  }
</script>
<style lang="scss" scoped>
#item{
  a>i{
    line-height: 18px;
  }
}
</style>