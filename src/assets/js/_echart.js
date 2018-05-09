//const Map = require('./map') //map.js方法
const echarts = require('echarts');
const color = ['#243591','#2d7dc2','#7055a2','#52a4bc','#cbcbcb','#196883'];
const quse = function () {  //随机取色方法
                var arr=['#a4cf27','#fec330','#4fc4d0',' #f46c6d','#7864ad','#ff9740'];
                return arr[parseInt(Math.random()*6)];
             }; 
const strMapToObj = function(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
};      
const objToStrMap = function (obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
};
const jsonToStrMap = function (jsonStr) {
  return new Map(JSON.parse(jsonStr));
};      
const huanhang = function (params) {
                params = params.length > 20 ? params.substring(0,18)+'..' : params;
                var newParamsName = "";// 最终拼接成的字符串
                var paramsNameNumber = params.length;// 实际标签的个数
                var provideNumber = 10;// 每行能显示的字的个数
                var rowNumber = 2;// Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                    /** 循环每一行,p表示行 */
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = "";// 表示每一次截取的字符串
                        var start = p * provideNumber;// 开始截取的位置
                        var end = start + provideNumber;// 结束截取的位置
                        // 此处特殊处理最后一行的索引值
                        if (p == rowNumber - 1) {
                            // 最后一次不换行
                            tempStr = params.substring(start, paramsNameNumber);
                        } else {
                            // 每一次拼接字符串并换行
                            tempStr = params.substring(start, end) + "\n";
                        }
                        newParamsName += tempStr;// 最终拼成的字符串
                    }


                } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                }
                //将最终的字符串返回
                return newParamsName;
          };                     
var echart = {
  build_list_map(mmap,data,domID,title){//list-地图
    let _echart = echarts.init($('#'+domID+'')[0]);
    $.get('static/china.json', function (chinaJson) {
      echarts.registerMap('china', chinaJson);
      let option = {
        title:{
                text: title,
                left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:[]
                },
                visualMap: {
                    min: data[0]['num'],
                    max: data[data.length-1]['num'],
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                      name: title,
                      type: 'map',
                      mapType: 'china',
                      roam: false,
                      label: {
                          normal: {
                              show: true
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      data:[
                          {name: '北京',value: mmap.get('北京') },
                          {name: '天津',value: mmap.get('天津') },
                          {name: '上海',value: mmap.get('上海') },
                          {name: '重庆',value: mmap.get('重庆') },
                          {name: '河北',value: mmap.get('河北') },
                          {name: '河南',value: mmap.get('河南') },
                          {name: '云南',value: mmap.get('云南') },
                          {name: '辽宁',value: mmap.get('辽宁') },
                          {name: '黑龙江',value: mmap.get('黑龙江') },
                          {name: '湖南',value: mmap.get('湖南') },
                          {name: '安徽',value: mmap.get('安徽') },
                          {name: '山东',value: mmap.get('山东') },
                          {name: '新疆',value: mmap.get('新疆') },
                          {name: '江苏',value: mmap.get('江苏') },
                          {name: '浙江',value: mmap.get('浙江') },
                          {name: '江西',value: mmap.get('江西') },
                          {name: '湖北',value: mmap.get('湖北') },
                          {name: '广西',value: mmap.get('广西') },
                          {name: '甘肃',value: mmap.get('甘肃') },
                          {name: '山西',value: mmap.get('山西') },
                          {name: '内蒙古',value: mmap.get('内蒙古') },
                          {name: '陕西',value: mmap.get('陕西') },
                          {name: '吉林',value: mmap.get('吉林') },
                          {name: '福建',value: mmap.get('福建') },
                          {name: '贵州',value: mmap.get('贵州') },
                          {name: '广东',value: mmap.get('广东') },
                          {name: '青海',value: mmap.get('青海') },
                          {name: '西藏',value: mmap.get('西藏') },
                          {name: '四川',value: mmap.get('四川') },
                          {name: '宁夏',value: mmap.get('宁夏') },
                          {name: '海南',value: mmap.get('海南') },
                          {name: '台湾',value: mmap.get('台湾') },
                          {name: '香港',value: mmap.get('香港') },
                          {name: '澳门',value: mmap.get('澳门') }
                      ]
                    }
                ]
      };
      _echart.setOption(option); 
    });
    return _echart;
  },
  build_list_bar_top20(dataTitle,dataNum,domID,title,type,text){//list-柱状-指数top20
    let _echart = echarts.init($('#'+domID+'')[0]);
    let option = {
                title: {
                        text: title
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {   
                        return `标题：${dataTitle[dataTitle.length-1-(params[0].dataIndex)]}; ${text}：${dataNum[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: [type]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: dataNum
                },
                series: [
                    {
                        name: type,
                        type: 'bar',
                        data: dataNum,
                        itemStyle: {
                          normal:{
                            color: function (params){
                               return color[params.dataIndex%10];
                              }
                          }
                        }
                    }
                ]
    }; 
    _echart.setOption(option); 
    return _echart;
  },
  build_list_bar_mediaTop10(dataTitle,dataNum,domID,title,type){//list-柱状-媒体声量top10
    let _echart = echarts.init($('#'+domID+'')[0]);
    let option = {
                title: {
                        text: title
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {   
                        return `媒体名称：${params[0].name}; 数量：${dataNum[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: [type]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: dataTitle
                },
                series: [
                    {
                        name: '新闻',
                        type: 'bar',
                        data: dataNum,
                        label: {
                            normal: {
                            show: true,
                            position: 'insideRight'
                             }
                          },
                        itemStyle: {
                          normal:{
                            color: function (params){
                               return color[params.dataIndex%10];
                              }
                          }
                        }
                    }
                ]
    }; 
    _echart.setOption(option); 
    return _echart;
  },
  build_list_bar_more_direction(data,Xdata,domID){//list-柱状-多维度分析
    let _echart = echarts.init($('#'+domID+'')[0]);
    let option = {
            color: color,
            tooltip:{
                trigger: 'axis',
                axisPointer : {            
                    type : 'shadow'        
                }
            },
            grid:{
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:[
                {
                type : 'category',
                data : Xdata
                }
            ],
            yAxis:[
                {
                type : 'value'
                }
            ],
            series : data
    }; 
    _echart.setOption(option); 
    return _echart;
  },
  build_list_pie_polar(data,domID,title){ //list-饼状-正负性对比
    let _echart = echarts.init($('#'+domID+'')[0]); 
    let option = {
                    title : {
                    text: title,
                    x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['正面','中面','负面']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '60%',
                            center: ['50%', '60%'],
                            data:[
                                {value:data.get('正'), name:'正面'},
                                {value:data.get('中'), name:'中面'},
                                {value:data.get('负'), name:'负面'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
            };
            _echart.setOption(option);
            return _echart;
  },
  build_list_pie_mediaType(data,domID,title){ //list-饼状-媒体类型分析
    let _echart = echarts.init($('#'+domID+'')[0]); 
    let option = {
                  color: color,
                  backgroundColor: '#2c343c',
                  title: {
                      text: title,
                      left: 'center',
                      top: 20,
                      textStyle: {
                          color: '#ccc'
                      }
                  },
                  toolbox: {
                          show : true,
                          feature : {
                              dataView : {show: true, readOnly: false},
                              restore : {show: true},
                              saveAsImage : {show: true}
                          }
                      },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} ({d}%)"
                  },
                  series : [
                      {
                          name:'媒体类型',
                          type:'pie',
                          radius : '55%',
                          center: ['50%', '50%'],
                          data:data,
                          itemStyle: {
                              normal: {
                                  shadowBlur: 200,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          },
                          animationType: 'scale',
                          animationEasing: 'elasticOut',
                          animationDelay: function (idx) {
                              return Math.random() * 200;
                          }
                      }
                  ]
            };
            _echart.setOption(option);
            return _echart;
  },
  build_list_line_newsNum(Xdata,data,domID){ //list-折线-新闻指数走势
    let _echart = echarts.init($('#'+domID+'')[0]); 
    let option = {
                  title: {
                      text: '新闻指数走势图'
                  },
                  tooltip: {
                      trigger: 'axis'
                  },
                  legend: {
                      data:['新闻指数']
                  },
                  grid: {
                      left: '3%',
                      right: '4%',
                      bottom: '3%',
                      containLabel: true
                  },
                  toolbox: {
                      feature: {
                          saveAsImage: {}
                      }
                  },
                  xAxis: {
                      type: 'category',
                      boundaryGap: false,
                      data: Xdata
                  },
                  yAxis: {
                      type: 'value'
                  },
                  series: [
                      {
                          name:'新闻指数',
                          type:'line',
                          stack: '总量',
                          data:data
                      }
                  ]
            };
            _echart.setOption(option);
            return _echart;
  },
  build_event_scatter(a,b,c,d,_this){ //event--人物组织地点散点图  true,'personSet','人物','current_sort_per',this
      if(_this[b].length !== 0){
            let project_name=c;
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
              [45, 129],
              [80, 122],
              [101, 50],
              [2, 93],
              [-4, 45],
              [95, 110],
              [105, 8]
              ];
              if(a){
                    for(let i=0;i<_this[b].length;i++){
                          perData[i][2]=_this[b][i].mention;                   
                      };
                      perData=perData.slice(0,_this[b].length);
                }else{
                  for(let i=0;i<_this[d];i++){
                      perData[i][2]=_this[b][i].mention;
                  };
                  perData=perData.slice(0,_this[d]);
                }; 
              //$(function(){
                echarts.dispose($('#'+b+'')[0]);
                let echart_renwu =  echarts.init($('#'+b+'')[0]);
                let option_echart_renwu={
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
                    tooltip: {
                       formatter: function (obj) {
                        return c+': '+perData[obj.dataIndex][2].slice(0,perData[obj.dataIndex][2].indexOf('/'))
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
                            position: [-7, 15],
                            textStyle:{
                              color:'#666'
                            },
                              show: true,
                              formatter: function(param) {
                                  return param.data[2].slice(0,param.data[2].indexOf('/')).length > 3 ? param.data[2].slice(0,3)+'..' : param.data[2].slice(0,param.data[2].indexOf('/'));
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
                    },{
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
                    },{
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
                    },{
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
                    },{
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
                          }]  
                     }]     
                };
              echart_renwu.setOption(option_echart_renwu);
              echart_renwu.on('click', function (params) {
                    if(params.componentSubType==="scatter"){
                      _this.dialogCt=true;
                      console.log(b)
                      console.log(params)
                      console.log(params.data[2])
                      console.log(_this.data[_this.data_Per_index].id);
                      _this.dialo_title = params.data[2].slice(0,params.data[2].indexOf('/'))+'的'+c+'详情';
                      _this.entityType = b.slice(0,3);
                      _this.entityName = params.data[2];
                      _this.pageShow = false;
                      _this.currentPage = 1;
                      _this.handleCurrentChange(_this.currentPage,b.slice(0,3),params.data[2]);
                      
                        //console.log(params)
                        /*let list=b.slice(0,3)+'List',listData=_this.data[_this.data_Per_index].commonResult[list];
                        _this.list_type=list;
                        //console.log(listData);
                        //console.log(params.data[2]);
                        for(let i=0;i<listData.length;i++){
                          if(listData[i].mention.slice(0,listData[i].mention.indexOf('/'))===params.data[2]){
                            _this.data_second_index=i;
                            _this.dialo_title=params.data[2]+'的'+c+'详情';
                            _this.dialogCt=true;
                            _this.currentPage=1;
                            _this.ct_data=listData[i].eventArticleList;
                            if(listData[i].eventArticleList){
                              for(let t=0;t<listData[i].eventArticleList.length;t++){
                                  listData[i].eventArticleList[t].publishTime=new Date(listData[i].eventArticleList[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                                }
                                _this.ct_data_list = _this.ct_data.length > 12 ? _this.ct_data.slice(0,12) : _this.ct_data;
                            };
                            //console.log(listData[i].eventArticleList)
                          }
                        }*/
                      }
                  });
        }else{
          $(function(){
                $('#echart_renwu').html(`<h5 style="margin-top:50px;color:orange;text-align:center;">无数据</h5>`);
              });
        };
  },
  build_event_allEvent(_this){// event-总事件折线图
      let all_arr=[];
      let event_xlengend=[];
      let event_data=[];
      let event_xdata=[];
      for(let l=0;l<_this.data.length;l++){
       let event_map=new Map();
       let strat_time=_this.time[0].getTime();
          while(strat_time<_this.time[1].getTime()+3600000){
            var curTime = new Date(strat_time).Format("yyyy-MM-dd hh");
            event_map.set(curTime,0);
            strat_time=strat_time+3600000;
          }
        event_xlengend.push('事件'+(l+1));
        for(let j=0;j<_this.data[l].commonResult.eventArticleList.length;j++){
           let x_time=_this.data[l].commonResult.eventArticleList[j].publishTime.slice(0,13);
           event_map.set(x_time,event_map.get(x_time)+1) ;
        }
        all_arr.push(event_map);
      };
      for(let t=0;t<all_arr.length;t++){
        let event_ydata=[];
        let obj=new Object();
        obj.name='事件'+(t+1)+'';
        obj.type='line';
        obj.stack='总量';
        for(let z in all_arr[t].data){
            event_ydata.push(all_arr[t].data[z]);   
        };
        obj.data=event_ydata;
        event_data.push(obj)
      };
      for(let k in all_arr[0].data){
        let z_time=k.slice(5,13)+':00';
        event_xdata.push(z_time);
      };
      let all_event_echart = echarts.init($('#all_event_echart')[0]);
      let all_event_option={
        title: {
            text: '总事件走势图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:event_xlengend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
               saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: event_xdata
        },
        yAxis: {
            type: 'value'
        },
        series:event_data
      };
      all_event_echart.setOption(all_event_option);
  },
  build_event_qipao(_this,inx,num){ //event-气泡图
    //console.log(_this.data)
      for(let i=0;i<_this.data.length;i++){
          /*for(let t=0;t<_this.data[i].eventArticleList.length;t++){
                    _this.data[i].eventArticleList[t].publishTime=new Date(_this.data[i].eventArticleList[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                };*/
              let echart_card = echarts.init(document.getElementById('echart_card'+i+'')); 
               //_this.data[i].commonResult.keywordList.sort(Map.Sort('score'));
                let keywordArr=[];
                if(inx==i){//判断下拉是不是当前的
                  if(_this.data[i].keywordList.length<num){
                    _this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          });
                    keywordArr=_this.data[i].keywordList;
                  }else{
                    keywordArr=_this.data[i].keywordList.slice(0,num);
                  }
                }else{
                    _this.data[i].keywordList.length < 11 ? keywordArr=_this.data[i].keywordList : keywordArr=_this.data[i].keywordList.slice(0,_this.data[i].sortArr);
                };            
              /*console.log(keywordArr)*/
              let dataBJ=[];
              for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].mention;
                    dataBJ.push(dataB)
                  };
                  echart_card.setOption(echart.echart_option_event_qipao(dataBJ));
                  echart_card.on('click', function (params) {
                    console.log(params)
                    params.event.event.stopPropagation() ;
                   // console.log(_this.data[i].keywordList)
                    _this.qipao_idarr.push(params.data[3]);
                   // console.log(  _this.data[i].keywordList)
                    _this.$confirm('是否删除 '+params.data[3].slice(0,params.data[3].indexOf('/'))+'?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                      }).then(() => {
                        _this.del_keywordList(i,params.data[3],_this.qipao_idarr);
                        _this.data[i].keywordList=_this.data[i].keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.mention) === -1; });//前台删除
                          if(_this.del_duibi_flag){//自身与竞品的数据分支
                              for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                                if(_this.$store.state.ev_duibiData[h].project.id==_this.del_duibi_id){
                                    _this.$store.state.ev_duibiData[h].project.data[i].keywordList=_this.data[i].keywordList;
                                  }
                                }
                           }
                        //num=num-1;
                        console.log(2)
                        _this.echart_qipao(_this,inx,num)
                      }).catch(() => {
                        _this.$message({
                          type: 'warning',
                          message: '已取消删除'
                        });          
                      });            
                  });
          };
  },
  build_graph(domID,cate,cate_,_categories,_data,_links){ //组织，媒体 对比图 
    let _echart = echarts.init($('#'+domID+'')[0]); 
    let option = {
                    backgroundColor:'#222222',
                    color:color,
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    toolbox: {
                      show : true,
                      feature : {
                          saveAsImage : {show: true}
                      }
                    },
                    legend: [{
                            data:cate,
                            textStyle: {
                                            color: 'white'
                                        }
                           },{
                            top:'3%',
                            data:cate_,
                            textStyle: {
                                            color: 'white'
                                        }
                    }],
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series : [
                        {
                          categories :_categories,
                            type: 'graph',
                            layout: 'none',
                            symbolSize: 50,
                            roam: true,
                            label: {

                                normal: {
                                  formatter:function(a){
                                    if(a.name.indexOf('/')!=-1){
                                      return a.name.slice(0,a.name.indexOf('/'))
                                    }else{
                                      return a.name
                                    }
                
                                  },
                                    show: true,
                                    textStyle: {
                                        fontSize: 10
                                    }
                                }
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [0, 0],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 20
                                    }
                                }
                            },
                            data:_data,
                            links:_links,
                            lineStyle: {
                                normal: {
                                    opacity: 0.9,
                                    width: 2,
                                    curveness: 0.3
                                }
                            }
                        }
                    ]
                };
               _echart.setOption(option) 
  },
	build_refer_bar(data,domID,tableFlag){  //refer-柱状
      let xAxisData = [],seriesData = [];
      let oitemStyle = {
                  normal:{
                    color: function (params){
                       return color[params.dataIndex%10];
                      }
                  }
                };
      //console.log(data)
      let articleNumMap = new Map();//各个企业文章总数
      let frequencyMap = new Map();//各个企业词频总数
      for(let i of data){
        if(tableFlag){
          i.checked = false;
        };
        i.tableData = [];//表格数据
        let oj = new Map();
        for(let j in i.articleNum){
          oj.set(j,i.articleNum[j]);
          if(articleNumMap.get(j) == null){
            articleNumMap.set(j,i.articleNum[j]);
          }else{
            articleNumMap.set(j,articleNumMap.get(j) + i.articleNum[j]);
          }
        };
        for(let j in i.frequency){
          let obj = {};
          obj.name = j;
          obj.frequency = i.frequency[j];
          obj.articleNum = oj.get(j);
          i.tableData.push(obj);

          if(frequencyMap.get(j) == null){
            frequencyMap.set(j,i.frequency[j]);
          }else{
            frequencyMap.set(j,frequencyMap.get(j) + i.frequency[j]);
          }
        };
        //tableDAta
       // console.log(i)
      };
      for(let i in data[0].articleNum){//生成 xAxisData seriesData
          xAxisData.push(i);
          let obj = {};
          obj.name = i;
          obj.barGap = '5%';
          obj.barCategoryGap = '60%';
          obj.type = 'bar';
          obj.data = [articleNumMap.get(i),frequencyMap.get(i)];
          seriesData.push(obj);
      };
      /*console.log(xAxisData)
      console.log(seriesData)*/
      echarts.dispose($('#'+domID+'')[0]);
      let iechart = echarts.init($('#'+domID+'')[0]); 
      let option = {
        color,
        legend: {
            data:xAxisData
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
            right: 20,
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['文章占比','词频占比'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                  lineStyle: {
                      color: '#ebebeb'
                  }
                },
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitLine: {
                  lineStyle: {
                      color: ['#ebebeb']
                  }
                },
               axisLine: {
                    lineStyle: {
                        color: ['#ebebeb']
                    }
                },
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  }
                }
            }
        ],
        series : seriesData
      };
      iechart.setOption(option);
      return iechart;
  },  
  build_refer_pie(data,domID){ //refer-饼状图 第一提及率 图
      let xAxisData = [],contentSeriesData = [],titleSeriesData = [];
      let contentFirstMentionMap = new Map();//内容第一提及率总数
      let titleFirstMentionMap = new Map();//标题第一提及率总数
      for(let i of data){
        for(let j in i.contentFirstMention){
          if(contentFirstMentionMap.get(j) == null){
            contentFirstMentionMap.set(j,i.contentFirstMention[j]);
          }else{
            contentFirstMentionMap.set(j,contentFirstMentionMap.get(j) + i.contentFirstMention[j]);
          }
        };
        for(let j in i.titleFirstMention){
          if(titleFirstMentionMap.get(j) == null){
            titleFirstMentionMap.set(j,i.titleFirstMention[j]);
          }else{
            titleFirstMentionMap.set(j,titleFirstMentionMap.get(j) + i.titleFirstMention[j]);
          }
        };
      };
      for(let i in data[0].articleNum){//生成 xAxisData seriesData
          xAxisData.push(i);
          let contentObj = {};
          contentObj.name = i;
          contentObj.value = contentFirstMentionMap.get(i);
          contentSeriesData.push(contentObj);
          let titleObj = {};
          titleObj.name = i;
          titleObj.value = titleFirstMentionMap.get(i);
          titleSeriesData.push(titleObj);
      };
      /*console.log(contentFirstMentionMap)
      console.log(titleFirstMentionMap)*/
      echarts.dispose($('#'+domID+'')[0]);
      let _echart = echarts.init($('#'+domID+'')[0]); 
      let option = {
          title : [{
            text:'内容第一提及率',
            x: '20%',
          },
          {
            text:'标题第一提及率',
            x: '70%',
          }],
          color,
          toolbox: {
            right: 20,
            feature: {
                saveAsImage: {}
            }
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: xAxisData
          },
          series : [
            {
                name: '内容第一提及率',
                label: {
                    normal: {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                    },
                    emphasis: {
                        show: true
                    }
                },
                type: 'pie',
                radius : '55%',
                center: ['25%', '50%'],
                data:contentSeriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animation:false
            },
            {
                name: '标题第一提及率',
                type: 'pie',
                label: {
                    normal: {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                    },
                    emphasis: {
                        show: true
                    }
                },
                radius : '55%',
                center: ['75%', '50%'],
                data:titleSeriesData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                animation:false
            }
        ]
      };
      _echart.setOption(option);
      return _echart;
  },
  build_refer_bar2(domID,Data){//refer-柱状图-议题领导力
    

    echarts.dispose($('#'+domID+'')[0]);
    let _echart = echarts.init($('#'+domID+'')[0]); 
    if(Data.length == 0){
      echarts.dispose($('#'+domID+'')[0]);
      $('#'+domID+'').html(`<p style="margin: 10% 42%;color: #f34c81">暂无数据，请选择相应议题</p>`)
      return;
    };
    let xAxisData0 = [],xAxisData1 = [],series0Data = [];
    let obj = new Map();
    let dat = new Map();
    let frequencyMap = new Map();
    for(let i of Data){
      //console.log(i);
      xAxisData0.push(i.name);
      for(let j of i.tableData){
        obj.set(j.name,[j.articleNum]);
      };
      let abj = strMapToObj(obj);
       for(let t in abj){
        if(dat.get(t) == null){
          dat.set(t,abj[t])
        }else{
          dat.set(t,dat.get(t).concat(abj[t]))
        }
       };
       //series1Data
       for(let j in i.frequency){
          if(frequencyMap.get(j) == null){
            frequencyMap.set(j,i.frequency[j]);
          }else{
            frequencyMap.set(j,frequencyMap.get(j) + i.frequency[j]);
          }
        };

    };
    //console.log(strMapToObj(dat))
    for(let i in strMapToObj(dat)){
      let obj = {};
      obj.name = i;
      obj.data = strMapToObj(dat)[i];
      obj.xAxisIndex = 0;
      obj.yAxisIndex = 0;
      obj.type = 'bar';
      obj.stack = '广告';
      series0Data.push(obj);
      xAxisData1.push(i);
    };
    //console.log(frequencyMap)
    let allData = [],supObj = {};//辅助
    let allStyle = { //辅助
                      normal: {
                          barBorderColor: 'rgba(0,0,0,0)',
                          color: 'rgba(0,0,0,0)'
                      },
                      emphasis: {
                          barBorderColor: 'rgba(0,0,0,0)',
                          color: 'rgba(0,0,0,0)'
                      }
                  };//辅助
    for(let i = 0;i < [...frequencyMap].length;i++){
      //console.log([...frequencyMap][i]);
      let obj = {},data = new Array([...frequencyMap].length).fill('-');
      data[i] = [...frequencyMap][i][1];
      allData[i] = [...frequencyMap][i][1];
      obj.name = [...frequencyMap][i][0];
      obj.data = data;
      obj.stack = '总量';
      obj.type = 'bar';
      obj.barCategoryGap = '60%';
      obj.barGap = '5%';
      obj.xAxisIndex = 1;
      obj.yAxisIndex = 1;
      series0Data.push(obj);
    };
    supObj.xAxisIndex = 1;
    supObj.yAxisIndex = 1;
    supObj.type = 'bar';
    supObj.name = '';//辅助
    supObj.barCategoryGap = '60%';
    supObj.barGap = '5%';
    supObj.stack = '总量';
    supObj.data = allData;
    supObj.itemStyle = allStyle;
    series0Data.push(supObj);
    //console.log(series0Data)
    //console.log(xD1)
    //console.log(xD0)
    var option = {
        color,
        tooltip: {
          formatter: function(params) {
            return params.name;
          }
        },
        title:[{
            text: 'Top3议题文章占比50%',
            top:'10%',
            x: '10%'
        },{
            text: 'Top3议题词频占比50%',
            top:'10%',
            x: '70%',
        }], 
        toolbox: {
            right: 20,
            feature: {
                saveAsImage: {}
            }
        },
        legend: {
            data: xAxisData1
        },
        grid: [{
                left: '2%',
                top: '25%',
                containLabel: true,
                width: '45%',
                height: '60%',
            },
            {
                left: '50%',
                top: '25%',
                containLabel: true,
                width: '45%',
                height: '60%'
            }
        ],
        xAxis: [{
                gridIndex: 0,
                data: xAxisData0,
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  },
                  interval:0,
                  formatter:huanhang,
                  /*formatter:function(value)  
                               {  
                                   return value.length > 6 ? value.slice(0,6)+'..' : value;  
                               },*/
                  rotate:-40,
                },
                axisLine: {
                  lineStyle: {
                      color: '#ebebeb'
                  }
                }
            },
            {
                gridIndex: 1,
                data: xAxisData1,
                axisLine: {
                  lineStyle: {
                      color: '#ebebeb'
                  }
                },
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  }
                }
            }
        ],
        yAxis: [{
                gridIndex: 0,
                type: 'value',
                splitLine: {
                  lineStyle: {
                      color: ['#ebebeb']
                  }
                },
               axisLine: {
                    lineStyle: {
                        color: ['#ebebeb']
                    }
                },
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  }
                }
            },
            {
                gridIndex: 1,
                splitLine: {
                  lineStyle: {
                      color: ['#ebebeb']
                  }
                },
               axisLine: {
                    lineStyle: {
                        color: ['#ebebeb']
                    }
                },
                axisLabel:{
                  textStyle: {
                    color:'#999'
                  }
                }
            }
        ],
        series: series0Data,
    };
    _echart.setOption(option);
    return _echart;
  },
  build_refer_competNum(domID,Data,reputation,mention){//声誉竞争力
    echarts.dispose($('#'+domID+'')[0]);
    let articleNumMap = new Map();//各个企业文章总数
    let frequencyMap = new Map();//各个企业词频总数
    let legendData = [],sumArticleNum = 0,seriesData = [],sumFrequency = 0;
    let dataMap = new Map()//生成选中文章总数的map 为了与词频总数叠加
    if(Data.length != 0){
      for(let i of Data){
            sumArticleNum += i.articleCount;
            for(let j in i.articleNum){
              if(articleNumMap.get(j) == null){
                articleNumMap.set(j,i.articleNum[j]);
              }else{
                articleNumMap.set(j,articleNumMap.get(j) + i.articleNum[j]);
              }
            };
            for(let j in i.frequency){
              sumFrequency += i.frequency[j];
              if(frequencyMap.get(j) == null){
                frequencyMap.set(j,i.frequency[j]);
              }else{
                frequencyMap.set(j,frequencyMap.get(j) + i.frequency[j]);
              }
            };
          };
      for(let i in strMapToObj(articleNumMap)){
        dataMap.set(i,(strMapToObj(articleNumMap)[i]/sumArticleNum)*500);
      };
      for(let i in strMapToObj(frequencyMap)){ //生成议题领导力数据
        dataMap.set(i,dataMap.get(i)+(strMapToObj(frequencyMap)[i])/sumFrequency*500);
      };
    };
    //console.log(dataMap);
    for(let i in reputation){
      let obj = {},data = new Array(4);
      obj.name = i;
      obj.barCategoryGap = '60%';
      obj.barGap = '5%';
      obj.type = 'bar';
      obj.stack = '广告';
      data[0] = objToStrMap(reputation).get(i);
      data[1] = objToStrMap(mention).get(i);
      data[2] = dataMap.get(i);
      data[3] = objToStrMap(reputation).get(i)*0.3+objToStrMap(mention).get(i)*0.4+dataMap.get(i)*0.3;
      obj.data = data;
      legendData.push(i);
      seriesData.push(obj) 
    };
   // console.log(seriesData)
    let _echart = echarts.init($('#'+domID+'')[0]);
    let option = {
        color,
        tooltip: {},
        toolbox: {
            right: 20,
            feature: {
                saveAsImage: {}
            }
        },
        legend : {
          data : legendData
        },
        xAxis : [
          {
            type : 'category',
            data : ['声量份额','第一提及','议题领导力','声誉竞争力指数'],
            axisLine: {
                  lineStyle: {
                      color: '#ebebeb'
                  }
              },
            axisLabel:{
               textStyle: {
                    color:'#999'
                }
            }
          }
        ],
        yAxis : [
          {
             type : 'value',
             splitLine: {
                  lineStyle: {
                      color: ['#ebebeb']
                  }
              },
             axisLine: {
                  lineStyle: {
                      color: ['#ebebeb']
                  }
              },
            axisLabel:{
                textStyle: {
                    color:'#999'
                }
            } 
          }
        ],
        series : seriesData
    };
    _echart.setOption(option);
    return _echart;
     //console.log(sumFrequency)
    // console.log(sumArticleNum)
     //console.log(frequencyMap)
  },
  echart_option_event_qipao (data) { //事件气泡图的option  
            var itemStyle = {
                    normal: {
                        opacity: 0.8,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        label : {
                            show: true,
                            formatter:  function (obj) {
                                var value = obj.value;
                                return value[3].slice(0,value[3].indexOf('/'))
                            }
                        }
                    }
                };
            var option_echart_card={
              backgroundColor: '#68c6d4',
                  color: [
                     quse
                  ],
                  grid: {
                      x: '12%',
                      x2: 20,
                      y: '18%',
                      y2: '14%'
                  },
                  tooltip: {
                      padding: 10,
                      backgroundColor: 'white',
                      borderColor: 'e6e6e6',
                      borderWidth: 1,
                      textStyle:{
                          color:'#333333'
                      },
                      formatter: function (obj) {
                          var value = obj.value;
                          return   '关键词：'+value[3].slice(0,value[3].indexOf('/'))        
                      }
                  },
                  xAxis: {
                      show:false,
                      type: 'value',
                      name: '日期',
                      nameGap: 16,
                      nameTextStyle: {
                          color: '#fff',
                          fontSize: 14
                      },
                      max: data.length,
                      splitLine: {
                          show: false
                      },
                      axisLine: {
                          lineStyle: {
                              color: '#777'
                          }
                      },
                      axisTick: {
                          lineStyle: {
                              color: '#777'
                          }
                      },
                      axisLabel: {
                          formatter: '{value}',
                          textStyle: {
                              color: '#fff'
                          }
                      }
                  },
                  yAxis: {
                      show:false,
                      type: 'value',
                      name: 'AQI指数',
                      nameLocation: 'end',
                      nameGap: 20,
                      nameTextStyle: {
                          color: '#fff',
                          fontSize: 16
                      },
                      axisLine: {
                          lineStyle: {
                              color: '#777'
                          }
                      },
                      axisTick: {
                          lineStyle: {
                              color: '#777'
                          }
                      },
                      splitLine: {
                          show: false
                      },
                      axisLabel: {
                          textStyle: {
                              color: '#fff'
                          }
                      }
                  },
                  visualMap: [
                      {   
                          show:false,
                          left: 'right',
                          top: '10%',
                          dimension: 2,//控制大小的数据的层级
                          min: 0,
                          max: 250,
                          itemWidth: 30,
                          itemHeight: 120,
                          calculable: true,
                          precision: 0.1,
                          text: ['圆形大小：PM2.5'],
                          textGap: 30,
                          textStyle: {
                              color: '#fff'
                          },
                          inRange: {
                              symbolSize: [1, 509700]
                          },
                          outOfRange: {
                              symbolSize: [10, 150],
                              color: ['rgba(255,255,255,.2)']
                          },
                          controller: {
                              inRange: {
                                  color: ['#c23531']
                              },
                              outOfRange: {
                                  color: ['#444']
                              }
                          }
                      }
                  ],
                  series: [
                      {
                          name: '北京',
                          type: 'scatter',
                          itemStyle: itemStyle,
                          data: data
                      }
                  ]
              };
              return option_echart_card;
  },

  echart_tset(domID){
    var data={
      "title":["标题","单位"],
      "legend":["a","b","c","d","e","f"],
      "data":[]
    }
    for(let i = 0;i < 4;i ++){
        let dta = [];
        for(let j = 0;j < 20;j ++){
            let _dta = [];
            _dta[0] = -604+Math.random()*1208;
            _dta[1] = -150+Math.random()*300;
            _dta[2] = Math.random()*1000+1500;
            dta.push(_dta);
        }
       data.data.push(dta)
    }
    let echart = echarts.init($('#'+domID+'')[0]);
    let option = {
            title: [
                {
                    text: data.title[0],
                    left: 'center',
                    
                },{
                    text: data.title[1],
                    left: 'center',
                    top:'center',
                    textStyle:{
                        color:"#fff"
                    }
                }
            ],
            xAxis: [{
                type: 'value',
                show: false,
                min: -604,
                max: 604,
                nameLocation: 'middle',
            }, ],
            yAxis: [{
                min: -150,
                show: false,
                max: 150,
                nameLocation: 'middle'
            }, ],
            color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9','#60a900'],
            legend: {
                data: data.legend,
                left:'center',
                bottom: 10
            },
            polar: {},
            angleAxis: {
                show:false,
                type: 'value'
            },
            radiusAxis: {
                show:false,
                axisAngle: 0
            },
            series: []
        };
    option.series.push(
    {
                name: '访问来源',
                type: 'pie',
                radius: ['0', '150%'],
                hoverAnimation:false,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1,1, 0.05,1, [ 
                            {
                                offset: 0,
                                color: 'rgba(11, 138, 253,0.2)'
                            },{
                                offset: 0.2,
                                color: 'rgba(11, 138, 253,0.1)'
                            },{
                                offset: 0.50,
                                color: 'rgba(11, 138, 253,0)'
                            },{
                                offset: 0.8,
                                color: 'rgba(11, 138, 253,0.1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(11, 138, 253,0.2)'
                            }
                        ], false),
                    },
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 335,
                        name: '直接访问'
                    },

                ]
            },

            {
                name: '相关背景',
                type: 'pie',
                radius: ['150%', '210%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(1,1, 0.05,1, [
                            {
                                offset: 0,
                                color: 'rgba(11, 138, 253,0.2)'
                            },{
                                offset: 0.2,
                                color: 'rgba(11, 138, 253,0.1)'
                            },{
                                offset: 0.50,
                                color: 'rgba(11, 138, 253,0)'
                            },{
                                offset: 0.8,
                                color: 'rgba(11, 138, 253,0.1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(11, 138, 253,0.2)'
                            }
                        ], false),
                    },
                },

                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: 3235,
                        name: '直接访问'
                    },


                ]
            }, 
            {
                name: '相关背景',
                type: 'pie',
                radius: ['210%', '290%'],
                avoidLabelOverlap: false,
                hoverAnimation:false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color:new echarts.graphic.LinearGradient(1,1, 0.05,1, [
                            
                        {
                            offset: 0,
                            color: 'rgba(11, 138, 253,0.3)'
                        },{
                            offset: 0.1,
                            color: 'rgba(11, 138, 253,0.1)'
                        },{
                            offset: 0.50,
                            color: 'rgba(11, 138, 253,0)'
                        },{
                            offset: 0.9,
                            color: 'rgba(11, 138, 253,0.1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(11, 138, 253,0.3)'
                        }
                        ], false),
                    },
                }})
    var size=[1000];
    /*for(let i=0;i<data.data.length;i++){
        size.push(data.data[i][2]);
    }*/
    for(let i=0;i<data.data.length;i++){
        option.series.push({
            name:data.legend[i],
            symbol: 'circle',
            type: 'scatter',
            
            symbolSize: function(d){
                return 5*Math.random()*20;
            },
            label:{
                normal:{
                    show:true,
                    
                }
            },
            data: data.data[i]
        })
    }
    echart.setOption(option);
    console.log(option.series)
  }
}
module.exports = echart;