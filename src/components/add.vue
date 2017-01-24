<template>
<div class="routeadd">	
	<h4>Type</h4>
	<div class="btn-group" role="group" aria-label="...">
	  <button type="button" class="btn btn-default" :class="{danger:i[0].danger}" @click="toggleclass(i,$event,$index)" v-for="(i,$index) in item">{{i[0].type}}</button>
	  <button type="button" class="btn btn-default btn-info " data-toggle="modal" data-target="#myModal">+</button>
	</div>
	<form>
	  <div class="form-group">
	    <label for="title"><h4>Title</h4></label>
	    <input type="text" class="form-control" id="title" placeholder="title">
	  </div>
	  <div class="form-group">
	    <label for="textarea"><h4>Text</h4></label>
	    <textarea class="form-control" id="textarea" placeholder="text"></textarea>  
	  </div>	  
	</form>
	<!-- Modal start -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">Type?</h4>
	      </div>
	      <div class="modal-body">
	        <input type="text" id="addType" class="form-control" placeholder="输入您想要添加的类型">
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default btn-danger" data-dismiss="modal">Close</button>
	        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addType()">Save type</button>
	      </div>
	    </div>
	  </div>
</div>
	<!-- Modal end -->
</div>	
</template>
<script >
export default{
  name: 'add',
  data: function () {
  	return {
  		 item:JSON.parse(window.localStorage.getItem('sj')),
  		// oindex:''
  	}
  },
  methods:{
  	addType () {
   		$.each(this.item,function(j,n){
  			n[0].danger=false;
  		}); 		
  		let otype = $('#addType').val();
  		this.item.push([{	
  				type:otype,
  				danger:true
  				},{
  				content:[]
  		}]);
  		window.localStorage.setItem('sj',JSON.stringify(this.item));
  		//console.log(this.item) 		
  	},
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