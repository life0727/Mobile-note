<template>  
<div class="routerone">
  <ul class="list-group" style="margin-bottom: 0">
    <li class="list-group-item active"><span class="badge">{{all}}</span>ALL </li>
  </ul>
  <div class="list-group " id="item">
    <a href="#list" v-for="(i,$index) in items" @click="look(i,$index)" class="list-group-item"><i class="fa fa-chevron-circle-right pull-right"></i><span class="badge">{{i[1].content.length}}</span>{{i[0].type}} <i class="fa fa-times del col-xs-offset-10" v-show="$index==items.length-1&&$index!==0&&$index!==1" @click.prevent="idel(i,$index)" >删除</i></a>
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
      window.localStorage.setItem('num',JSON.stringify(ff));
      this.all=JSON.parse(window.localStorage.getItem('num'))
    },
    methods:{
      look (d,w) { 
        window.localStorage.setItem('type',JSON.stringify(d[0].type));  
        window.localStorage.setItem('title',JSON.stringify(d[1].content));  
        window.localStorage.setItem('isj',JSON.stringify(d));
        let data=JSON.parse(window.localStorage.getItem('sj'));
        $.each(data,function(j,n){
          n[0].danger=false;
        });        
        data[w][0].danger=true;
        //console.log(data[w][0]);
        //console.log(d[0].danger);
        window.localStorage.setItem('sj',JSON.stringify(data));

      },
      idel (a) {
        let data=this.items;
        let num=0;
         $.each(data,function(j,n){
            n[0].danger=false;
          });        
            a[0].danger=true;
         $.each(data,function(b){
          if(data[b][0].type==a[0].type){
            data.splice(b,1);
            window.localStorage.setItem('sj',JSON.stringify(data));
            for(let x=0;x<data.length;x++){
              num+=data[x][1].content.length;
            }
            window.localStorage.setItem('num',JSON.stringify(num));  
          }       
        })
        this.all=JSON.parse(window.localStorage.getItem('num'))
      }
    }

  }
</script>
<style lang="scss" scoped>
#item{
  a>i{
    line-height: 18px;
  }
  .del{
    display: none;
    color:rgb(221,76,64)
  }
  a:hover .del{
    display: inline-block;

  }
}
</style>