<template>
<div class="routeadd">	
	<h4>Type</h4>
	<div class="btn-group" role="group" aria-label="...">
	  <button type="button" class="btn btn-default" :class="{danger:i[0].danger}" @click="toggleclass(i,$event,$index)" v-for="(i,$index) in item">{{i[0].type}}</button>
	</div>
	<form>
	  <div class="form-group">
	    <label for="title"><h4>Title</h4></label>
	    <input type="text" class="form-control" id="title" v-model="oinput">
	  </div>
	  <div class="form-group">
	    <label for="textarea"><h4>Text</h4></label>
	    <textarea class="form-control" id="textarea" v-model="otextarea"></textarea>  
	  </div>	  
	</form>
</div>	
</template>
<script >
export default{
  name: 'write',
  data: function () {
  	return {
  		 item:JSON.parse(window.localStorage.getItem('sj')),
  		// oindex:''
  		oinput:JSON.parse(window.localStorage.getItem('detail')).title,
  		otextarea:JSON.parse(window.localStorage.getItem('detail')).text
  	}
  },
  created :function () {

  },
  methods:{
  	toggleclass(i,ev,index) {
  		/*if($(ev.currentTarget).siblings().hasClass('danger')){
  			$(ev.currentTarget).siblings().removeClass('danger')
  		}*/
  		//$(ev.currentTarget).addClass('btn-primary').siblings().removeClass('btn-primary')
  		//this.oindex=index;
  		$.each(this.item,function(j,n){
  			n[0].danger=false;
  		});
  		this.item[index][0].danger=true;
  		window.localStorage.setItem('sj',JSON.stringify(this.item))  		
  	}
  }
}
</script>

<style lang="scss" scoped>
.routeadd{
 button{
	border-radius: 5px!important;
	margin-left: 5px!important;
	};
.danger{
	background:rgba(221,79,67,.9);
}

}	
</style>