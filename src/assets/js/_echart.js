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
                              var colorList = ['#f34c81','#ffe75f','#688dff','#855df3','#23aacf','#d706ff','#ff6f7a','#60b680','#fd9c35','#dd4444'];
                               return colorList[params.dataIndex%10];
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
                              var colorList = ['#f34c81','#ffe75f','#688dff','#855df3','#23aacf','#d706ff','#ff6f7a','#60b680','#fd9c35','#dd4444'];
                               return colorList[params.dataIndex%10];
                              }
                          }
                        }
                    }
                ]
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
	build_refer_bar(data,domID){  //refer-柱状
      let xAxisData = [],seriesData = [];
      for(let i of data){
        xAxisData.push(i.name);
        seriesData.push(i.count);
      }
      echarts.dispose($('#'+domID+'')[0]);
      let _echart = echarts.init($('#'+domID+'')[0]); 
      let option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                data : xAxisData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'count',
                type:'bar',
                barWidth: '60%',
                data:seriesData,
                itemStyle: {
                  normal:{
                    color: function (params){
                      var colorList = ['#f34c81','#ffe75f','#688dff','#855df3','#23aacf','#d706ff','#ff6f7a','#60b680','#fd9c35','#dd4444'];
                       return colorList[params.dataIndex%10];
                      }
                  }
                }
            }
        ]
      };
      _echart.setOption(option);
    },
  build_refer_pie(data,domID){ //refer-饼状图
      let xAxisData = [],seriesData = [];
      for(let i of data){
        xAxisData.push(i.name);
        let obj = {};
        obj.value = i.count;
        obj.name = i.name;
        seriesData.push(obj);
      }
      echarts.dispose($('#'+domID+'')[0]);
      let _echart = echarts.init($('#'+domID+'')[0]); 
      let option = {
          color: ['#f34c81','#ffe75f','#688dff','#855df3','#23aacf','#d706ff','#ff6f7a','#60b680','#fd9c35','#dd4444'],
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
                name: 'count',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:seriesData,
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
    }
}
module.exports = echart;