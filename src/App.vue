<template>
  <div id="app">
	<div class="o">
	  <div class="ohead">
	    <ul class="list-group text-center container" v-show="this.$route.path == '/'" >
	        <span style="font-size: 25px;">My-note</span>
	        <a  href="#add" class=" pull-right"><button class="btn btn-default btn-success" @click="add()">新增</button></a>
	    </ul>
	    <ul class="list-group text-center container" v-show="this.$route.path == '/add'">
	        <span style="font-size: 25px;">增加记事</span>
	        <a  href="#list" class=" pull-right"><button class="btn btn-default btn-success" @click="save()">保存</button></a>
	        <a  href="#/" class=" pull-left"><button class="btn btn-default btn-success" @click="back()">返回</button></a>
	    </ul>
	    <ul class="list-group text-center container" v-show="this.$route.path == '/list'">
	        <span style="font-size: 25px;">记事列表</span>
	        <a  href="#add" class=" pull-right"><button class="btn btn-default btn-success" @click="add()">新增</button></a>
	        <a  href="#/" class=" pull-left"><button class="btn btn-default btn-success" @click="back()">返回</button></a>
	    </ul>
	    <ul class="list-group text-center container" v-show="this.$route.path == '/write'">
	        <span style="font-size: 25px;">编辑记事</span>
	        <a  href="#list" class=" pull-right"><button class="btn btn-default btn-success" @click="update()">更新</button></a>
	        <a  href="#/" class=" pull-left"><button class="btn btn-default btn-success" @click="back()">返回</button></a>
	    </ul>	    		    	    
	  </div>
	  <div class="obody container">
	      <router-view ></router-view>
	  </div>
	
	  <div class="ofoot text-center">
	    <a href="#1">@fuquanmeng</a>
	  </div>
	</div>
  </div>

</template>

<script>
export default {
  name: 'app',
  created :function () {
 	//this.itype =JSON.parse(window.localStorage.getItem('ootype'));
  	//console.log(this.itype);
  },
  data: function () {
  	return {
  		item:JSON.parse(window.localStorage.getItem('sj'))||[
                [{'type':'apple','danger':false},{'content':[{'title':'apppp','text':'bbbll'},{'title':'1111','text':'2222'}]}],
                [{'type':'banner','danger':false},{'content':[{'title':'bannnn','text':'nndannn'}]}],
                //[{'type':'pear'},{'content':[{'title':'','text':''}]}]
                ]     
  	}
  },
  methods:{
  	add () {
  		//window.localStorage.setItem('sj',JSON.stringify(this.item))
  	},
  	back () {

  	},
  	save () {
  		let oitem=JSON.parse(window.localStorage.getItem('sj')),
  		    addtype,
  		    otext=$('#title').val() ? $('#title').val() : 'notitle',
  		    otextarea=$('#textarea').val() ? $('#textarea').val() : 'notext';  		
  		for(let t=0;t<oitem.length;t++){
  			//console.log(oitem[t][0].danger);
  			if(oitem[t][0].danger==true){
  				addtype=oitem[t][0].type;
  				oitem[t][1].content.push({
	  				title:otext,
	  				text:otextarea
  				});
  				window.localStorage.setItem('type',JSON.stringify(oitem[t][0].type));  
			    window.localStorage.setItem('title',JSON.stringify(oitem[t][1].content));
  				//console.log(oitem)
  				window.localStorage.setItem('isj',JSON.stringify(oitem[t]))
  			}
  		};
  		$.each(this.item,function(j,n){
  			n[0].danger=false;
  		});
  		window.localStorage.setItem('sj',JSON.stringify(oitem))
  	},
  	update () {
  		let oitem=JSON.parse(window.localStorage.getItem('sj'));
  		let otext=$('#title').val() ? $('#title').val() : 'notitle';
  		let otextarea=$('#textarea').val() ? $('#textarea').val() : 'notext';
  		for(let t=0;t<oitem.length;t++){
  			if(oitem[t][0].danger==true){
  				oitem[t][1].content.push({
	  				title:otext,
	  				text:otextarea
  				});
  				window.localStorage.setItem('type',JSON.stringify(oitem[t][0].type));  
			    window.localStorage.setItem('title',JSON.stringify(oitem[t][1].content));  				
  				window.localStorage.setItem('sj',JSON.stringify(oitem))
  			}
  		};  		  		
  	}


  }
}
</script>

<style lang="scss" scoped>
.o{
  .ohead{
    background: rgba(0,0,0,.8);
    height:50px;
    color:snow;
    line-height: 50px;
  }
  .ofoot{
    background: rgba(0,0,0,.7);
    height:50px;
    color:snow;
    line-height: 50px;    
  }

}
</style>

