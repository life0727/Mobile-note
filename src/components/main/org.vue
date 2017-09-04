<template>
  <div class="org container" style="background-color: #fff">
	<div style="margin: 15px 0;width: 1220px;">
	  <div class="el-input el-input-group el-input-group--append" style="width: 720px;height: 40px;margin-left:250px;">
	  	<input type="text" placeholder="请输入内容(多种用逗号分隔)" autocomplete="off" class="el-input__inner" v-model="input" style="width: 570px;height: 40px;border-color: #ebebeb">
	  	<div class="el-input-group__append" @click="search" style="width: 150px;text-align: center;font-size: 18px;color:white;background: #00a17c;border-color: #00a17c;cursor: pointer;">搜索</div>
	  </div>
	</div> 
	<div id="content" >
	  <div class="panel panel-default" style="width: 1200px;margin: 15px auto 0 auto;border-color: #ebebeb" >
	      <div class="panel-heading" style="padding: 6px 15px;height: 40px;background-color: #f7f7f7;border-color: #ebebeb">
	        <h3 class="panel-title" style="color: #333333;line-height: 30px;">
	          <div style="display: inline-block;" class="art_type">
	          	<span class="warning" style="cursor: pointer;">微信</span>
	            <span class="" style="cursor: pointer;margin-left: 20px;margin-right: 10px;">新闻</span>|
	          </div>
	          <span class="warning" style="cursor: pointer;margin-left: 10px;">一周</span>
	          <span class="" style="cursor: pointer;margin-left: 20px;" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</span>
	          <span class="" style="cursor: pointer;margin:0 20px;" @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</span>
	          <div class="block" style="display: inline-block;">
              <el-date-picker
              style="position: relative;width:170px;font-size: 12px;"
              @change="date_change"
              :editable="edit"
              :clearable="edit"
                v-model="time[0]"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
	          </div>
	          <div class="block" style="display: inline-block">
	              <span class="demonstration">至</span>
	              <el-date-picker
	              @change="date_change"
	              :editable="edit"
	              :clearable="edit"
	              style="position: relative;width:170px;font-size: 12px;"
	                v-model="time[1]"
	                type="datetime"
	                placeholder="选择日期时间">
	              </el-date-picker>
	          </div>
	          <span style="padding-left: 25px;font-size: 14px;">数量：</span>
	          <el-dropdown  @command="dropdown_org" style="">
	              <el-button style="padding: 3px 5px;">{{current_org}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
	              <el-dropdown-menu slot="dropdown">
	                  <el-dropdown-item v-for="i in dropdown_num" :command="i" >{{i}}</el-dropdown-item>
	              </el-dropdown-menu>
	         </el-dropdown>
	        </h3>
	      </div>
	      <p v-loading="org_loading" element-loading-text="系统拼命加载中..."  id="loading_org" style="top: 200px;"></p>
	      <div class="panel-body" style="height: 800px;position: relative;width: 100%;" >
	      	<div style="height: 800px;position: relative;width: 100%;" id="echart" ></div>
	      </div>
      </div>
	</div> 
	<!-- 组织列表模态框 -->
	<el-dialog title="相关" v-model="dialo_org" size="tiny" id="dialog_list_org">
		<div class="panel panel-default" style="width: 380px;float: left;">
		  <div class="panel-heading" style="padding: 7px 8px;background: white;border-color: #ebebeb">
		  	<span style="color: #00b38a;font-size: 16px;">人物图谱</span>
		  	<span style="padding-left: 185px;font-size: 14px;">数量：</span>
	         <el-dropdown  @command="sort_dropdown_org" style="">
	              <el-button style="padding: 2px 6px;">{{current_sort_org}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
	              <el-dropdown-menu slot="dropdown">
	                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
	              </el-dropdown-menu>
	         </el-dropdown>
		  </div>
		  <div class="panel-body" style="width:378px;height: 300px;" id="echart_renwu"></div>
		</div>
		<div class="panel panel-default" style="width: 750px;float: left;margin-left: 20px;">
		  <div class="panel-heading" style="padding: 7px 8px;background: white;border-color: #ebebeb">
		  	<span style="color: #00b38a;font-size: 16px;">关键词</span>
		  	<span style="padding-left: 565px;font-size: 14px;">数量：</span>
	         <el-dropdown  @command="sort_dropdown_keyword" style="">
	              <el-button style="padding: 2px 6px;">{{current_sort_keyword}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
	              <el-dropdown-menu slot="dropdown">
	                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
	              </el-dropdown-menu>
	         </el-dropdown>
		  </div>
		  <div class="panel-body" style="width:748px;height: 300px;" id="echart_guanjianci"></div>
		</div>
		<div class="panel panel-default" style="width: 1150px;height: 350px;margin-top: 360px;margin-bottom: 0;">
		  <div class="panel-heading" style="padding: 7px 8px;background: white;border-color: #ebebeb">
		  	<span style="color: #00b38a;font-size: 16px;">相关新闻</span>
		  </div>
		  <div  style="width:1148px;height: 300px;">
		  	<h5 v-show="this.org_List.length==0" style="margin-top: 50px;color:orange;text-align: center">暂无相关新闻文章数据</h5>
		  	<div class="list-group">
			   <a  v-for="(i,$index) in org_article_list" v-if="i.article==null" :href="i.url"  target="_blank" class="list-group-item"  style="border: 0px solid gray;">{{i.title}} <span style="position:absolute;right: 15px;">{{i.publishTime}} </span></a> <a  v-for="(i,$index) in org_article_list" v-if="i.article!=null"  :href="i.article.url"  target="_blank" class="list-group-item"  style="border: 0px solid gray;">{{i.article.title}} <span style="position:absolute;right: 15px;">{{i.article.publishTime}} </span></a> 
			</div>
		  </div>
		</div>
      <el-pagination
            class="page"
            @current-change="handleCurrentChange_org"
            :current-page="currentPage_org"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_org"
            layout="total,  prev, pager, next, jumper"
            :total="this.org_List.length"
            v-show="this.org_List.length!==0">
        </el-pagination>
    </el-dialog>
    <!-- 第二级模态框 - 文章列表 -->
      <el-dialog title="详情" v-model="dialogCt" size="tiny" id="dialog_ct" >
         <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 出现频次: <span style="color: #666;">{{ct_size}}</span></p>
         <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 知识图谱: <img src="../../assets/icon/ct_link.png" style="margin-top: -3px;display: inline-block;"> <a :href="ct_url" v-if="ct_url==null" target="_blank" style="color: #fec330;text-decoration: none;">当前实体没有对应的实体链接</a><a :href="ct_url" v-else target="_blank" style="color: #fec330;text-decoration: none;">{{ct_name}}</a></p>
         <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 相关文章</p>
         <div class="list-group" style="width: 531px;border: 0px solid gray;" id="dialog_ct_list">
            <div style="padding: 8px 5px;color: #999;cursor: pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;" class="list-group-item" ref="ct_list" @mouseover="Mover_ct_list($index)" @mouseout="Mout_ct_list($index)" @click="click_ct_list(i)" v-for="(i,$index) in ct_data_list">{{($index+1)+(currentPage-1)*page_size}}.&nbsp;{{i.title}}</div>
        </div>
        <!--    分页 strart -->
        <el-pagination
            class="page"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size"
            layout="total,  prev, pager, next, jumper"
            :total="this.ct_data.length"
            v-show="this.ct_data.length!==0">
        </el-pagination>
      <!--    分页 end -->
     </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted :function () {
  	this.org_loading=true;
  	let _this=this;
 	//样式
 	$('.art_type span').click(function(){
 		$(this).addClass('warning').siblings().removeClass('warning')
 	});
 	$('.panel-title>span').click(function(){
 		$(this).addClass('warning').siblings().removeClass('warning')
 	});
 	$('#dialog_list_org .el-dialog__headerbtn').click(function(){
 		_this.dialo_org=false;
 	})
 	$('#dialog_ct .el-dialog__headerbtn').click(function(){
    _this.dialogCt=false;
    })
 	$('#echart').css('opacity','0');
 	_this.search ();
  },
  data () {
  	return {
  		input:'',
  		edit:false,
  		time: [new Date(new Date().getTime()-604800000), new Date()],
  		sj:[1,2,3,4,5,6,7,8,9,10],
  		articleType:2,
  		data:'',
        page_size_org:7,
        currentPage_org:1,
        org_List:'',
        org_article_list:'',
        dialo_org:false,
        org_loading:false,
        dialogCt:false,
        dropdown_sort_num:['5','10','15','20'],
        dropdown_num:['5','10','15','20'],
        current_sort_org:10,
        current_org:10,
        current_sort_keyword:10,
        perlist:[],
        perlistData:[],
        keywordlistData:[],
        ct_size:'',//二级模态
	    ct_name:'',//二级模态
	    ct_url:'',//二级模态
	    ct_data:[],//二级模态
	    ct_data_list:[],
	    currentPage:1,
	    page_size:10  
  	     }
  	},
  methods: {
  	guanjianci(a){
  	   let _this=this;
  	   if(_this.keywordlistData.length==0){
        $(function(){
          $('#echart_guanjianci').html(`<h5 style="margin-top:50px;color:orange;text-align:center;">无数据</h5>`);
        })
      }else{
      	let hours=['强'],days=['弱'],keywordData=[];
      	if(a){
            for(let i=0;i<_this.keywordlistData.length;i++){
              hours.push('');
              days.push('');
              let keywordArr=[];
              keywordArr[0]=_this.keywordlistData.length-i;
              keywordArr[1]=i+1;
              keywordArr[2]=(_this.keywordlistData.length-i)/10+0.2;
              keywordArr[3]=_this.keywordlistData[i].mention.slice(0,_this.keywordlistData[i].mention.indexOf('/'));
              keywordData.push(keywordArr);
           }
            hours[_this.keywordlistData.length]='弱';
        }else{
          for(let i=0;i<_this.current_sort_keyword;i++){
              hours.push('');
              days.push('');
              let keywordArr=[];
              keywordArr[0]=_this.current_sort_keyword-i;
              keywordArr[1]=i+1;
              keywordArr[2]=(_this.current_sort_keyword-i)/10+0.2;
              keywordArr[3]=_this.keywordlistData[i].mention.slice(0,_this.keywordlistData[i].mention.indexOf('/'));
              keywordData.push(keywordArr);
           };
            hours[_this.current_sort_keyword]='弱';
			days.push('强');
			$(function(){
				let echarts_guanjianci = echarts.init(document.getElementById('echart_guanjianci'));
				let itemStyle = {
		                normal: {
		                    label : {
		                    	position: 'bottom',
		                        show: true,
		                        formatter:  function (params) {
		                            return params.value[3]
		                        }
		                    }
		                }
		            };
		        keywordData = keywordData.map(function (item) {
					    return [item[1], item[0], item[2],item[3]];
					});    
				let option_echarts_guanjianci={
					title: {
			        text: ' '
			    },
			    tooltip: {
			        position: 'top',
			        formatter: function (params) {
			            return `关键词:${params.value[3]}`;
			        }
			    },
			    grid: {
			       x: '12%',
			      x2: 80,
			      y: '18%',
			      y2: '14%'
			    },
			    toolbox: {
				        show : true,
				        feature : {
				            saveAsImage : {show: true}
				        }
				    },
			    xAxis: {
			        type: 'category',
			        data: hours,
			        boundaryGap: false,
			        splitLine: {
			            show: true,
			            lineStyle: {
			                color: '#ddd',
			                type: 'dashed'
			            }
			        },
			        axisLine: {
			            show: false
			        }
			    },
			    yAxis: {
			        type: 'category',
			        data: days,
			        axisLine: {
			            show: false
			        }
			    },
			    series: [{
			        type: 'scatter',
			        itemStyle: itemStyle,
			        symbolSize: function (val) {
			            return val[2] * 30;
			        },
			        data: keywordData
			    }]
			  }
			  echarts_guanjianci.setOption(option_echarts_guanjianci);
			  echarts_guanjianci.on('click', function (params) {
                    _this.dialogCt=true;
                    _this.ct_size='';
                    _this.ct_name='';
                    _this.ct_data=[];
                    _this.ct_name=_this.keywordlistData[params.dataIndex].mention;
                    _this.ct_url=_this.keywordlistData[params.dataIndex].linkedUrl;
                    if(_this.keywordlistData[params.dataIndex].eventArticleList){
                      _this.ct_size=_this.keywordlistData[params.dataIndex].eventArticleList.length;
                      _this.ct_data=_this.keywordlistData[params.dataIndex].eventArticleList;
                      _this.currentPage=1;
                      if(_this.ct_data.length>10){
                        _this.ct_data_list=_this.ct_data.slice(0,10)
                      }else{
                        _this.ct_data_list=_this.ct_data;
                      }
                    }else{
                      $('#dialog_ct_list').html(`<p style="text-align:center;margin-top:10px;color:orange;" >暂无数据</p>`);
                    }
                  })
			})
        }
      }
  	},
  	renwu(a){
	  let _this=this;
	  if(_this.perlistData.length==0){
		$(function(){
          $('#echart_renwu').html(`<h5 style="margin-top:50px;color:orange;text-align:center;">无数据</h5>`);
        })
  	  }else{
  	  	let project_name=JSON.parse(window.sessionStorage.getItem('start'));
  		let perData=[
			[41, 50],
			[58, 37],
			[55, 71],
			[41, 72],
			[68, 50],
			[41, 16],
			[25, 50],
			[60, 98],
			[80, 50],
			[25, 93],
			[78, 10],
			[50,-21],
			[12, 17],
			[45, 133],
			[80, 122],
			[101, 50],
			[2, 93],
			[-4, 45],
			[95, 110],
			[105, 8]
			];
			if(a){
                for(let i=0;i<_this.perlistData.length;i++){
                      perData[i][2]=_this.perlistData[i].mention.slice(0,_this.perlistData[i].mention.indexOf('/'));
                  };
                  perData=perData.slice(0,_this.perlistData.length);
            }else{
              for(let i=0;i<_this.current_sort_org;i++){
                  perData[i][2]=_this.perlistData[i].mention.slice(0,_this.perlistData[i].mention.indexOf('/'));
              };
              perData=perData.slice(0,_this.current_sort_org);
            } 
			$(function(){
			let echarts_renwu = echarts.init(document.getElementById('echart_renwu'));
			let option_echarts_renwu={
			    backgroundColor: '',
			    title: {
			        text: '',
			        x: '35%',
			        y: 0
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            saveAsImage : {show: true}
			        }
			    },
			    xAxis: [{
			        type: 'value',
			        show: false,
			        min: 0,
			        max: 100,
			        nameLocation: 'middle',
			    }, ],
			    yAxis: [{
			        min: 0,
			        show: false,
			        max: 100,
			        nameLocation: 'middle',
			        nameGap: 30,
			    }, ],
			    series: [{
			            type: 'scatter',
			            symbol: 'circle',
			            symbolSize: 16,
			            label: {
			                normal: {
			                	position: 'bottom',
			                	textStyle:{
			                		color:'#666'
			                	},
			                    show: true,
			                    formatter: function(param) {
			                        return param.data[2];
			                    },
			                },
			            },
			            itemStyle: {
			                normal: {
			                    color: '#5aa8ee',
			                    shadowColor: 'rgba(0,0,139, 0.8)',
			                    shadowBlur: 15,
			                    opacity: 0.9
			                }
			            },
			            data:perData,
			        },
			        {
			            type: 'scatter',
			            symbol: 'circle',
			            symbolSize: 40,
			            label: {
			                normal: {
			                    textStyle:{
			                        fontSize:15
			                    },
			                    show: true,
			                    formatter: function(param) {
			                        return param.data[2];
			                    }
			                }

			            },
			            itemStyle: {
			                normal: {
			                    color: 'none'
			                },

			            },
			            data: [
			                [50, 50, project_name]
			            ]
			        }, {
			            hoverAnimation: false,
			            type: 'pie',
			            radius: ['0', '13%'],
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: 'rgba(118, 233, 244,1)'
			                },
			                emphasis:{color:'rgba(118, 233, 244,1)'}
			            },
			            data: [{
			                    value: 23
			                }
			            ]
			        },
			        {
			            hoverAnimation: false,
			            type: 'pie',
			            radius: ['13%', '40%'],
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: 'rgba(118, 233, 244,.7)'
			                },
			                 emphasis:{color:'rgba(118, 233, 244,.7)'}
			            },
			             data: [{
			                    value: 23
			                }
			            ]
			        },{
			            hoverAnimation: false,
			            type: 'pie',
			            radius: ['40%', '70%'],
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                }
			            },
			            itemStyle: {
			                normal: {
			                    color: 'rgba(118, 233, 244,.4)'
			                },
			                emphasis:{color:'rgba(118, 233, 244,.4)'}
			            },
			            data: [{
			                    value: 23
			                }
			            ]
			        }, {
			            type: 'pie',
			            hoverAnimation: false,
			            radius: ['70%', '100%'],
			            legendHoverLink:false,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			               
			            },
			            itemStyle: {
			                normal: {
			                    color: 'rgba(118, 233, 244,.2)'
			                },
			                emphasis:{color:'rgba(118, 233, 244,.2)'}    
			            },
			             data: [{
			                    value: 23
			                }
			            ]
			        }

			    ]
			};
			echarts_renwu.setOption(option_echarts_renwu);
			echarts_renwu.on('click', function (params) {
                   /* console.log(params);
                    console.log(_this.perlistData[params.dataIndex]);*/
                    _this.dialogCt=true;
                    _this.ct_size='';
                    _this.ct_name='';
                    _this.ct_data=[];
                    _this.ct_name=_this.keywordlistData[params.dataIndex].mention;
                    _this.ct_url=_this.keywordlistData[params.dataIndex].linkedUrl;
                    if(_this.keywordlistData[params.dataIndex].eventArticleList){
                      _this.ct_size=_this.keywordlistData[params.dataIndex].eventArticleList.length;
                      _this.ct_data=_this.keywordlistData[params.dataIndex].eventArticleList;
                      _this.currentPage=1;
                      if(_this.ct_data.length>10){
                        _this.ct_data_list=_this.ct_data.slice(0,10)
                      }else{
                        _this.ct_data_list=_this.ct_data;
                      }
                    }else{
                      $('#dialog_ct_list').html(`<p style="text-align:center;margin-top:10px;color:orange;" >暂无数据</p>`);
                    }
                  })
			}) 	
	  }
  	},
  	format_time () {
      Date.prototype.Format = function (fmt) {  
        var o = {
              "M+": this.getMonth() + 1, //月份 
              "d+": this.getDate(), //日 
              "h+": this.getHours(), //小时 
              "m+": this.getMinutes(), //分 
              "s+": this.getSeconds(), //秒 
              "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
              "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
    },
   search(){
   	this.org_loading=true;
   	$('#echart').css('opacity','0');
   	let Aorg_str=[];
   	function Sort(property){
                      return function(a,b){
                          var value1 = a[property];
                          var value2 = b[property];
                          return value2 - value1;
                      }
                  };
   	let _this=this;
   	_this.format_time ();  
   	let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
   	let project_name=JSON.parse(window.sessionStorage.getItem('start'));
   	$.ajax({
			url:"http://192.168.1.2:8080/rs0/api/v1.1/project/"+project_id+"/org",
			type:"GET",
			data:{
				"method":"GET", //http方法
				"proId":project_id, //项目id
	           "articleType":2, //文章类型
				"startTime":_this.time[0],
				"endTime":_this.time[1],
				"orgNum":_this.current_org	
			},
			success:function(data){
				_this.org_loading=false;
				$('#echart').css('opacity','1');
				_this.data=data.data;
				
				console.log(data.data);
				data.data.sort(Sort('count'));
				if(data.data==null||data.data.length<=0){
					_this.$message({
                            message: '木有数据哦',
                            type: 'warning'
                          }); 
				}else{
					let legend_data=[];
					let category_data=[{'name':'项目'}];
					let org_data=[{'name':project_name,'draggable':true,'category':0,'value':130}];
					let links_data=[];
					for(let i=0;i<data.data.length;i++){
						if(data.data[i].mention.slice(data.data[i].mention.length-5,data.data[i].mention.length)==='/AORG'){
							Aorg_str.push(data.data[i].mention.slice(0,data.data[i].mention.indexOf('/')));
						}
						legend_data.push(data.data[i].mention.slice(0,data.data[i].mention.indexOf('/')));
						let category_obj=new Object();
						let org_obj=new Object();
						let links_obj=new Object();
						category_obj.name=org_obj.name=data.data[i].mention.slice(0,data.data[i].mention.indexOf('/'));
						category_data.push(category_obj);
						org_obj.draggable=false;
						org_obj.category=i+1;
						org_obj.value=115-(i*5);
						links_obj.source=project_name;
						links_obj.target=data.data[i].mention.slice(0,data.data[i].mention.indexOf('/'));
						org_data.push(org_obj);
						links_data.push(links_obj);
						if(_this.input){
							_this.input=_this.input.replace(/，/ig,','); //转化逗号
   							let inparr=_this.input.split(',');
							for(let j=0;j<inparr.length;j++){
							let qiye_obj=new Object();
							qiye_obj.name=inparr[j]+""+i+"嘿哈";
							qiye_obj.draggable=false;
							qiye_obj.category=i+1;
							qiye_obj.value=25+j*6;
							org_data.push(qiye_obj);
							let qiye_links_obj=new Object();
							qiye_links_obj.source=data.data[i].mention.slice(0,data.data[i].mention.indexOf('/'));
							qiye_links_obj.target=inparr[j]+""+i+"嘿哈";
							links_data.push(qiye_links_obj);
							}
						}
					};
				//console.log(legend_data)
					//console.log(category_data)
					//console.log(org_data)
					//console.log(links_data);
					//echart
					let echart = echarts.init(document.getElementById('echart'));
					let option_echart={
						title: {
					        text: ''
					    },
					    tooltip: {},
					    animationDurationUpdate: 1500,
					    animationEasingUpdate: 'quinticInOut',
					    legend: {
					        x: "center",
					        show: true,
					        data:legend_data// 此处不显示根节点学生
					    },
					    grid: {
					        x: '14%',
					        x2: 150,
					        y: '150',
					        y2: '150'
					    },
					    series: [
					        {
					            type: 'graph',
					            layout: 'force',
					            symbolSize: function(size) {
					                return size;
					            },
					            focusNodeAdjacency: true,
					            roam: true,
					            categories:category_data,
					            label: {
					                normal: {
					                    show: true,
					                    textStyle: {
					                        fontSize: 12,
					                        color:'rgba(0,0,0,.8)'
					                    },
					                    formatter:function(a){
					                    	if(a.name.slice(a.name.length-2,a.name.length)==='嘿哈'){
					                    		return a.name.slice(0,a.name.length-3)
					                    	}else{
					                    		return a.name
					                    	}
					                    }
					                }
					            },
					            force: {
					                repulsion: 1000
					            },
					            tooltip: {
					                formatter: function(a){
					                    	if(a.name.slice(a.name.length-2,a.name.length)==='嘿哈'){
					                    		return a.name.slice(0,a.name.length-3)
					                    	}else{
					                    		return a.name
					                    	}
					                    }
					            },
					            lineStyle: {
					                normal: {
					                    opacity: 0.9,
					                    width: 1,
					                    curveness: 0
					                }
					            },
					            data: org_data,
					            links: links_data
					        }
					    ]
					}
					echart.setOption(option_echart);
					//点击事件
					echart.on('click', function (params) {
						$('#echart_sandian').css('display','none')
						console.log(params);
						if(params.value==130){
							console.log('dianjile')
						}else if(params.name.slice(params.name.length-2,params.name.length)==='嘿哈'){
							_this.org_loading=true;
							let orgNameArr=[];
							for(let j=0;j<org_data.length;j++){
								if(org_data[j].category==params.data.category&&org_data[j].name.slice(org_data[j].name.length-2,org_data[j].name.length)!=='嘿哈'){
									if(Aorg_str.indexOf(org_data[j].name)!==-1){
										orgNameArr.push(org_data[j].name+'/AORG');
									}else{
										orgNameArr.push(org_data[j].name+'/ORG');
									}
								}
							}
							$.ajax({
								url:"http://192.168.1.2:8080/rs0/api/v1.1/project/"+project_id+"/org/enterprise/entitymap",
								type:"GET",
								traditional:true,
								data:{
									"method":"GET", //http方法
									"proId":project_id, //项目id
						           "articleType":2, //文章类型
									"orgNameArr":orgNameArr, //组织名称数组，一般只有一个
									"enterpriseNameArr":[params.name.slice(0,params.name.length-3)], //企业名称，一般只有一个
									"keywordNum":5,
									"perNum":5,
									"startTime":_this.time[0],
									"endTime":_this.time[1],				
								},
								success:function(data){
									console.log(data.data);
									if(data.data.commonResult.articleList==null&&data.data.commonResult.keywordList.length==0&&data.data.commonResult.perList.length==0){
										_this.org_loading=false;
										_this.dialo_org=false;
					                     _this.$message({
					                        message: '无查找数据',
					                        type: 'warning'
					                      });
									}else{
										_this.org_loading=false;
										_this.dialo_org=true;
										let perList,keywordList,articleList;
											perList=data.data.commonResult.perList;
											keywordList=data.data.commonResult.keywordList;
											articleList=data.data.commonResult.eventArticleList;
											perList.sort(Sort('count'));
											keywordList.sort(Sort('count'));
											console.log(perList);
											console.log(keywordList);
											_this.perlistData=perList;
											_this.keywordlistData=keywordList;
											_this.org_List=articleList;
											console.log(_this.org_List)
											//人物图echart
											if(perList.length<_this.current_sort_org){
											  _this.renwu(true);  
											}else{
											_this.renwu();
								     		}
								     	//关键词echart 
								     	if(keywordList.length<_this.current_sort_keyword){
								     		_this.guanjianci(true);		                           
										}else{
											_this.guanjianci();
										}
										//文章列表
										if(_this.org_List.length==0||data.data.length<=0){
											_this.org_article_list=[];
											}else{
											for(let t=0;t<_this.org_List.length;t++){
												 _this.org_List[t].publishTime=new Date(_this.org_List[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
											}
											_this.currentPage_org=1;
									          let newdata=[];
									          if(_this.org_List.length>7){
									            for(let c=0;c<7;c++){
									            newdata.push(_this.org_List[c])
									            }
									          }else{
									            newdata=_this.org_List
									          }
									          _this.org_article_list=newdata;
									      }
									}
								},
								error:function(data){	
								}
						    });
							_this.perlist=[];
						}else if(params.dataType==='edge'){
							_this.dialo_org=false;
						}else{
							_this.dialo_org=true;
							//人物图，关键词数据
							let perList,keywordList,articleList;
							for(let i=0;i<data.data.length;i++){
								if(params.name===data.data[i].mention.slice(0,data.data[i].mention.indexOf('/'))){
									perList=data.data[i].commonResult.perList;
									keywordList=data.data[i].commonResult.keywordList;
									articleList=data.data[i].commonResult.eventArticleList;
								}
							};
							perList.sort(Sort('count'));
							keywordList.sort(Sort('count'));
							_this.perlistData=perList;
							_this.keywordlistData=keywordList;
							_this.org_List=articleList;
							console.log(perList);
							console.log(keywordList);
							//人物图echart
							if(perList.length<_this.current_sort_org){
							   _this.renwu(true);	  
							}else{
								_this.renwu();
				     		}
				     	//关键词echart 
				     	if(keywordList.length<_this.current_sort_keyword){
				     		_this.guanjianci(true);		                           
						}else{
							_this.guanjianci();
						}
						//文章列表
						console.log(_this.org_List)
						if(_this.org_List.length==0||data.data.length<=0){
							 _this.org_article_list=[];
							}else{
							for(let t=0;t<_this.org_List.length;t++){
								 _this.org_List[t].publishTime=new Date(_this.org_List[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
							}
							_this.currentPage_org=1;
					          let newdata=[];
					          if(_this.org_List.length>7){
					            for(let c=0;c<7;c++){
					            newdata.push(_this.org_List[c])
					            }
					          }else{
					            newdata=_this.org_List
					          }
					          _this.org_article_list=newdata;
					      }
				      }
					})
				}	
			},
			error:function(data){
				alert("执行了 --查询组织-- 失败----回调函数-------------------");
			}
		});
   },
   date_change(){
   	if(this.time[0]==undefined||this.time[1]==undefined||this.time[1].getTime()<this.time[0].getTime()){
          this.time=[new Date(new Date().getTime()-604800000), new Date()];
          this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }
   },
   Mover_articleList (i) {
        this.$refs.articlelist[i].style.color="#00a17c"
    },
    Mout_articleList (i) {
        this.$refs.articlelist[i].style.color="rgb(72,87,106)"
    },
    handleCurrentChange(val){
      this.currentPage = val;
      let newdata=[],
        pageNum=this.currentPage-1;
        for(let i=this.page_size*pageNum;i<this.page_size*pageNum+this.page_size;i++ ){
          this.ct_data[i] !== undefined ? newdata.push(this.ct_data[i]) : '' 
        }
        this.ct_data_list=newdata; 
    },
    handleCurrentChange_org (val) {
		this.currentPage_org = val;
        let newdata=[],
        pageNum=this.currentPage_org-1;
        for(let i=this.page_size_org*pageNum;i<this.page_size_org*pageNum+this.page_size_org;i++ ){
          this.org_List[i] !== undefined ? newdata.push(this.org_List[i]) : '' 
        }
        this.org_article_list=newdata; 
    },
    dropdown_org(command){
    	this.current_org=command
    },
    sort_dropdown_keyword(command){
    	this.current_sort_keyword=command;
    	if(this.keywordlistData.length<this.current_sort_keyword){
        	this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          }); 
        }else{
        	this.guanjianci();
        }
    },
    sort_dropdown_org(command) {
        let project_name=JSON.parse(window.sessionStorage.getItem('start'));    	
        this.current_sort_org=command;
        if(this.perlistData.length<this.current_sort_org){
        	this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          }); 
        }else{
       this.renwu()			
      }
    },
    Mover_ct_list(i){
        this.$refs.ct_list[i].style.color="#00a17c"
      },
    Mout_ct_list(i) {
        this.$refs.ct_list[i].style.color="#999"
      },
    click_ct_list(i){
         window.open(i.url)
      } 
  }
}
</script>
 
<style lang="scss" >
  .org{
	::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#ccc;
    font-size: 18px;
    }
    ::-moz-input-placeholder {/*Firefox*/
    color:#ccc;
    font-size: 18px;
	}
  	.el-input-group--append{
  		.el-input-group__append:hover{
  			opacity: 0.8;
  		}
  	}
  	#content{
  		.panel{
  			.panel-title{
  				.warning{
  					color:#00a17c
  				}
  				.block{
  					.el-date-editor{
  						bottom: 2px;
  						input{
  							height: 25px;
  						}
  					}
  				}
  			}
  			.panel-body{
  				.imgDiv{
				  position: absolute;
				  display: inline-block;
  					.ellips{
  					overflow:hidden;
  					text-overflow:ellipsis;
  					white-space:nowrap;
  					-webkit-text-overflow:ellipsis;
  					-o-text-overflow:ellipsis;
  					-moz-text-overflow:ellipsis;
  					position: absolute;
  					z-index: 3;
  					margin: 0 auto;
  					text-align: center;
  					}
  				}
  			}
  		}
  	}
  	#dialog_list_org{
  		.el-dialog--tiny{
  			width: 1200px !important;
  		}
  		.page{
        position: absolute;
        right: 30px; 
        bottom: 34px;
        display: inline-block;
        .el-pagination__total{
          color:#999;
        }
        ul>li{
          opacity: 1;
        }
        .el-pager .active {
          border-color: #00b38a;
          background-color: #00b38a;
        }
        .el-pagination__jump{
          display: none;
        }
   	   }
      .el-dialog{
        border-radius: 4px;
        width: 33%;
        .el-dialog__header{
        background: #00b38a;
        padding: 10px 0;
        text-align: center;
          .el-dialog__title{
            color: white;
            font-weight:500px;
            padding-left: 14px;
          }
          .el-dialog__headerbtn{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-image: url('../../assets/icon/ev_del2.png');
            cursor: pointer;
          }
          .el-dialog__close{
            display: none;
          }
        }
      }
      .list-group{
      	a:nth-child(2n){
      		background: #f2fcff;
      	}
      }  
  	}
	#dialog_ct{
      .page{
        position: absolute;
        right: 15px; 
        bottom: 15px;
        display: inline-block;
        .el-pagination__total{
          color:#999;
        }
        ul>li{
          opacity: 1;
        }
        .el-pager .active {
          border-color: #00b38a;
          background-color: #00b38a;
        }
        .el-pagination__jump{
          display: none;
        }
    }
      .el-dialog{
        border-radius: 4px;
        .el-dialog__header{
        background: #00b38a;
        padding: 10px 0;
        text-align: center;
          .el-dialog__title{
            color: white;
            font-weight:500px;
            padding-left: 14px;
          }
          .el-dialog__headerbtn{
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-image: url('../../assets/icon/ev_del2.png');
            cursor: pointer;
          }
          .el-dialog__close{
            display: none;
          }
        }
      } 
    #steps{
      >div:nth-child(2){
        width: 400px;
        overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;
      }
      .el-step__line{
        border-color: #bfcbd9;
      }
      .el-step{
        height: 70px !important;
      }
    }
    .el-dialog__body{
          padding-bottom: 45px !important;
          padding-top: 20px !important;
        }
    .el-dialog--tiny{
      width: 571px;
    }
    .list-group{
      :last-child{
        border-bottom:0px solid #ddd !important;
      }
      .list-group-item{
        width: 95%;
        margin: 0 auto;
        border-width: 0px;
        border-bottom: 1px solid #ebebeb;
      }
    }
  }
 }
 
</style>