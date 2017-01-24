<template>  
<div class="routerdetail">
  <ul class="list-group text-center container" style="margin-top: -42px;" v-show="this.$route.path == '/detail'">
      <span style="font-size: 25px;color:snow">{{itype}}</span>
      <a  href="#list" class=" pull-right"><button class="btn btn-default btn-success" @click="del()">删除</button></a>
      <a  href="#/write" class=" pull-left"><button class="btn btn-default btn-success" @click="change()">修改</button></a>
  </ul>
  <h3 class="text-center">{{idetail.title}}</h3>
  <hr>
  <p>{{idetail.text}}</p>
</div>
</template>
<script >
  export default{
    data : function(){ 
      return{
        itype:JSON.parse(window.localStorage.getItem('type')),
        idetail:JSON.parse(window.localStorage.getItem('detail'))
      }
    },
    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },
    methods:{
      change () {

      },
      del () {
        //let icontent=JSON.parse(window.localStorage.getItem('title'));
        let ititle=JSON.parse(window.localStorage.getItem('detail'));
        let data=JSON.parse(window.localStorage.getItem('isj'));
        let odata=JSON.parse(window.localStorage.getItem('sj')); 
        $.each(odata,function(j){
          if(odata[j][0].type==data[0].type){
            $.each(odata[j][1].content,function(i){
              if(odata[j][1].content[i].title==ititle.title){
                odata[j][1].content.splice(i,1);
                window.localStorage.setItem('sj',JSON.stringify(odata));
                let idata=JSON.parse(window.localStorage.getItem('sj'));
                window.localStorage.setItem('title',JSON.stringify(idata[j][1].content));
              }
            })
          }
        });

      }
    }
  }
</script>
<style lang="scss" scoped>

</style>