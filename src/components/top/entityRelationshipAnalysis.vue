<template>
 <div :class="isBig ? '' : 'container'" style="padding-top:30px;position: relative;">
    <el-tabs @tab-click="Tabclick" tab-position="top"  v-model="activeName">
        <el-tab-pane label="搜索文章分析" name="searchArticle">
            <el-form :inline="true" :model="keyWordList" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="keyWordList.mustkw" placeholder="必须包含关键词,多个词用逗号隔开"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="keyWordList.kw" placeholder="关键词,多个词用逗号隔开"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="keyWordList.t_notkw" placeholder="标题排除词,多个词用逗号隔开"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="keyWordList.notkw" placeholder="排除词,多个词用逗号隔开"></el-input>
                </el-form-item>
            </el-form>    
            <div class="block" style="margin-top: 15px;" >
                <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 48px;">
                    <span :style="{position:'absolute',left:'30px',lineHeight:'45px',cursor:'pointer',color: articleType == 2 ? '#00b38a' : '#333'}" @click="mediaData.btn_disabled=false;articleType=2;">微信</span>
                    <span :style="{position:'absolute',left:'80px',lineHeight:'45px',cursor:'pointer',color: articleType == 1 ? '#00b38a' : '#333'}" @click="mediaData.btn_disabled=true;articleType=1;">新闻</span>
                    <span style="position: absolute;left: 140px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
                
                    <span :style="{position:'absolute',left:'170px',lineHeight:'45px',cursor:'pointer',color: queryType==0 ? '#00b38a' : '#333'}" @click="queryType=0;">全文</span>
                    <span :style="{position:'absolute',left:'215px',lineHeight:'45px',cursor:'pointer',color: queryType==1 ? '#00b38a' : '#333'}" @click="queryType=1;">仅标题</span>

                    <span style="position: absolute;left: 285px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>  
                   
                    <mediaSlot :mediaDATA="mediaData" @receiveFromMediaSlot = "mediaSlotData"></mediaSlot>
                    <span style="position: absolute;left: 408px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
                    <span style="position: absolute;left: 555px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span> 
                    
                    <!-- 共现窗口 -->
                    <span style="margin-left:430px;position:absolute;line-height: 45px;width:auto;overflow:hidden">共现窗口:</span>
                    <el-dropdown  @command="sort_dropdown_windowSize"  @visible-change="visibleChangeWindowSize" >
                            <el-button  style="padding: 3px 5px;border-width: 0px;color:#00b38a;background:rgb(247, 247, 247);margin-left:500px;">{{current_sort_windowSize_article}}<i :class="sort_dropdown_visible_windowSize ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item v-for="i in dropdown_sort_windowSize" :key="i" :command="i">{{i}}</el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>

                    <datePicker @receiveFromDatePicker = "dataPickerData" style="margin-left:22px"></datePicker>
                    <span class="SearchBegin" id="search"  @click="search" >搜索</span>
                    <span class="SearchBegin" v-show="articlelist_selectIdArr.length != 0" @click="analysis" >分析</span>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="上传文本分析" name="uploadArticle">
            <div class="block" style="margin-top: 15px;" >
                <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 75px;">
                    <!-- 文件上传 -->
                    <el-upload
                        class="upload-demo"
                        drag
                        :show-file-list="false"
                        accept=".txt"
                        :data="{windowSize:current_sort_windowSize_upload}"
                        action="rsa/entitycorrelation/upload"
                        :on-success="submitSuccess"
                        :on-err="submitErr"
                        :before-upload="beforeUpload">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将txt文件拖到此处，或<em>点击上传</em>,且不超过2mb</div>
                    </el-upload>

                    <!-- 共现窗口 -->
                    <span style="margin-left:20px;position:absolute;line-height: 75px;width:auto;overflow:hidden">共现窗口:</span>
                    <el-dropdown  @command="sort_dropdown_windowSize" style="bottom:24px;"   @visible-change="visibleChangeWindowSize" >
                            <el-button  style="padding: 3px 5px;border-width: 0px;color:#00b38a;background:rgb(247, 247, 247);margin-left:85px;">{{current_sort_windowSize_upload}}<i :class="sort_dropdown_visible_windowSize ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item v-for="i in dropdown_sort_windowSize" :key="i" :command="i">{{i}}</el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
    
    


<!-- content 区域 -->
    <div class="eRA" :style="{position:isBig == true ? 'fixed' : '',top:'-100px'}"> 
        <!-- <p style="padding: 20px 0 0px 5px;color:#999999;margin: 0">已选媒体分类：<span style="color: #00b38a;">{{domain_arr.length == 0 ? '全部' : domain_arr.toString()}}</span></p>  -->
        <img src="../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;" v-show = "this.data.length == 0 && (articleTotal == 0 || activeName == 'uploadArticle')">
        <!-- 文章列表展示区域 -->
        <div style="position:absolute;left: 35px;padding: 10px;width:93%;" v-show="this.data.length == 0 && activeName == 'searchArticle' && articleTotal != 0">
            <el-table
                :data="articleList"
                stripe
                ref="eRAtable"
                style="width: 100%"
                @select="flag = false" 
                @select-all="flag = false"
                @selection-change="articlelist_select">
                <el-table-column
                label="全选"
                type="selection"
                width="40">
                </el-table-column>
                <el-table-column
                label="文章标题"
                show-overflow-tooltip>
                <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title }} <span style="color:#666;font-size:12px">({{scope.row.mediaName + ':' + new Date(scope.row.publishTime).Format("yyyy-MM-dd hh:mm:ss")}})</span> </a></template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="page"
            @current-change="handleERACurrentChange"
            :current-page.sync="ERA_currentPage"
            :page-size="10"
            :pager-count="5"
            layout="total,  prev, pager, next"
            :total="this.articleTotal"
            v-show="this.articleTotal !== 0">
            </el-pagination>
        </div>

        <!-- 提交完分析区域 -->
        <div class="content" v-show="this.data.length != 0">
            <p style="margin:0 0 0 5px;position: relative;"><span style="line-height: 55px;border-left: 5px solid rgb(0, 179, 138);margin-right: 10px;"></span>实体关联分析<span style="color:#999">(双击节点切换类别，右键删除节点)</span></p>

            <span style="margin-left:20px;margin-top:50px;">出现频次:</span>
            <el-dropdown  @command="sort_dropdown_node" style=""  @visible-change="visibleChangeEventNum_node">
                    <el-button  style="padding: 3px 5px;border-width: 0px;color:#00b38a">{{current_sort_node}}<i :class="sort_dropdown_visible_node ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="i in dropdown_sort_node" :key="i" :command="i">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
            </el-dropdown>
            
            <span style="margin-left:20px;margin-top:50px;">共现频次:</span>
            <el-dropdown  @command="sort_dropdown" style=""  @visible-change="visibleChangeEventNum">
                    <el-button  style="padding: 3px 5px;border-width: 0px;color:#00b38a">{{current_sort}}<i :class="sort_dropdown_visible_eventNum ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="i in dropdown_sort" :key="i" :command="i">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
            </el-dropdown>
            
            <span class="SearchBegin" @click="toBig">全屏</span>
            <!-- echarts -->
            <div id="demo" @keyup.esc="toSmall" ref="demo"></div>
        </div>
    </div>

 </div>   
</template>

<script>

import datePicker from './util/datePicker.vue'
import mediaSlot from './util/media-slot.vue'
import _echart from '../../assets/js/_echart.js'
import {date_change,publicSearch,tipsMessage,successBack,similar,GetLocalStorage,startLoading,endLoading }  from '../../assets/js/map.js'
export default {
  mounted() { 

    let _this = this;
    document.onkeydown = function(e) { //退出全屏
            _this.$route.path == '/ERA' && e.key == "Escape" ? _this.toSmall() : ''
    };
    $('#demo').css('height',document.documentElement.clientHeight -385 + 'px') //获取echart的自适应高度
    this.$refs.demo.oncontextmenu = () => false; //取消echart右键默认事件
    // let data = require('../../assets/json/entitycorrelation1')
    // this.$nextTick(() => { this.submitSuccess(data)})
   
  },
  data () {
    return {
        articleType:2,
        queryType:0,
        keyWordList:{
            mustkw:'',
            kw:'',
            t_notkw:'',
            notkw:''
        },
        mediaData:{//媒体分类组件数据
            btn_disabled:false
        },
        domain_arr:[],//媒体分类数据展示
        time:[new Date(new Date().getTime()-604800000), new Date()],
        data:[],
        current_sort:1,
        current_sort_windowSize_upload:1,
        current_sort_windowSize_article:1,
        current_sort_node:1,
        dropdown_sort:[1,2,3,4],
        dropdown_sort_windowSize:[1,2,3,4,5],
        dropdown_sort_node:[1,2,3,4],
        sort_dropdown_visible_eventNum:true,//true为显示false为隐藏
        sort_dropdown_visible_windowSize:true,
        sort_dropdown_visible_node:true,
        isBig:false, //画布是否全屏
        cate:['实体'],
        categories:[{'name':'实体'}],
        nodes:[],
        links:[],
        paramsData:'',//查询文章参数
        activeName:'searchArticle', //默认文章分析tab
        ERA_currentPage:1,//当前页码
        articleTotal:0,//文章列表总数
        articleList:[], //文章列表
        articlelist_selectIdArr:[], //选中的文章列表id数组
        flag:false //点击分页的flag
    }
  },
  components:{
    datePicker,
    mediaSlot
  },
  methods: {
      search(){ //搜索文章
        const criteriaStr = {
            'articleType': this.articleType,
            'queryType' : this.queryType,
            'startTime' : this.time[0].getTime(),
            'endTime' : this.time[1].getTime(),
            'mustIncludeKeywordList':this.keyWordList.mustkw.replace(/，/ig,',').split(',').filter(x => x && $.trim(x).length > 0),
            'anyIncludeKeywordList': this.keyWordList.kw.replace(/，/ig,',').split(',').filter(x => x && $.trim(x).length > 0),
            'titleExcludeKeywordList':this.keyWordList.t_notkw.replace(/，/ig,',').split(',').filter(x => x && $.trim(x).length > 0),
            'contentExcludeKeywordList': this.keyWordList.notkw.replace(/，/ig,',').split(',').filter(x => x && $.trim(x).length > 0),
            'pageSize':15
        }
        this.paramsData = criteriaStr;
        this.handleERACurrentChange(1);
      },
      analysis(){//分析文章

      },
      submitSuccess(data){
        endLoading()
        if(data.code != 200){
            tipsMessage(data.message, 'warning', this);
            return
        } 
        this.data = ['有数据'];

        this.cate = data.data.categories;

        this.categories = [];
        this.cate.forEach(item => {
            this.categories.push({'name':item.name}); 
        })
        
        this.nodes = data.data.nodes;
        this.links = data.data.links;
        this.$nextTick(() => {
            this.runERA();
        })

      },
      submitErr(res){
         tipsMessage('上传失败', 'warning', this);
      },
      beforeUpload(res){
          if(!res){
            tipsMessage('上传失败', 'warning', this);
            return
          } 
          startLoading('上传成功，分析文档中。。。')
      },
      runERA(filterNum_link = 1,filterNum_node = 1){ //运行echart
        let links = filterEdgeNum(this.links,filterNum_link)
        let nodes = filterEdgeNum(this.nodes,filterNum_node)
        // 删除没有连线的node start
        const nodesNameArr = [];
        nodes.forEach(item => {
            nodesNameArr.push(item.name)
        })
        const intersectionArr = [];//交集
        links.forEach(item => {
            if(nodesNameArr.includes(item.source) && nodesNameArr.includes(item.target)) intersectionArr.push(item)
        })
        const linksNameArr = [];//
        intersectionArr.forEach(item => {
            linksNameArr.push(item.source)
            linksNameArr.push(item.target)
        })
        let arrnodes = new Set(nodes.filter(x => new Set(linksNameArr).has(x.name)))
        nodes = [...arrnodes];
        // 删除没有连线的node end
        _echart.ERA('demo',this.cate,this.categories,nodes,links,this)
        function filterEdgeNum(target,num = 1){
            return target.filter(i => i.num >= num) //贡献次数
        }
      },
      sort_dropdown (command) { this.current_sort = command;this.runERA(command,this.current_sort_node)}, 
      sort_dropdown_windowSize (command) { 
          this.activeName == 'searchArticle' ? this.current_sort_windowSize_article = command : this.current_sort_windowSize_upload = command       
      }, 
      sort_dropdown_node (command) { this.current_sort_node = command;this.runERA(this.current_sort,command)}, 
      visibleChangeEventNum(a){
        this.sort_dropdown_visible_eventNum = !a;
      },
      visibleChangeWindowSize(a){this.sort_dropdown_visible_windowSize = !a;},
      visibleChangeEventNum_node(a){this.sort_dropdown_visible_node = !a;},
      articlelist_select(data){ //选择文章 变化事件
        console.log(data)
        //   data.forEach(item => {
        //       this.$store.state.selectERAIdArr.push(item.id);
        //       this.$store.state.selectERAIdArr = [...new Set(this.$store.state.selectERAIdArr)];
        //   })
          
        //  console.log(data)
        //  console.log(this.$store.state.selectERAIdArr)
        //   console.log(data)
        //   console.log(this.articlelist_selectIdArr.length)
        //   let resArr = [];
        //   if(this.$store.state.selectERAIdArr.length < this.articlelist_selectIdArr.length){
        //       resArr = this.$store.state.selectERAIdArr.filter(item => new Set(this.articlelist_selectIdArr).has(item))
        //   }
        //   console.log(resArr)
          if(!this.flag) this.articlelist_selectIdArr = [];
          data.forEach(item => { //获取选中的文章的id数组
              this.articlelist_selectIdArr.push(item.id)
              this.articlelist_selectIdArr = [...new Set(this.articlelist_selectIdArr)]
          })
         //console.log(this.articlelist_selectIdArr)
      },
      handleERACurrentChange(pageNum){ //分页查询
        this.flag = true;
        let params = Object.assign({},{...this.paramsData,'pageNum':pageNum});
        let data = {
          'method': 'POST',
          'criteriaStr':JSON.stringify(params)
        };
        startLoading();
        publicSearch('rsa/entitycorrelation/article',"POST",data).then((data) =>{//ajax
            endLoading();
            if(!successBack(data,this)) return;
            this.articleTotal = data.data.total
            this.$nextTick(() => { //默认选中
                data.data.articleList.forEach(item => {
                    if(this.articlelist_selectIdArr.includes(item.id)){
                        this.$refs.eRAtable.toggleRowSelection(item,true); //模拟选中
                    }
                })
                
            })
            this.articleList = data.data.articleList;
        });
        
      },
      Tabclick(tab){
          //console.log(this.activeName)
      },
      dataPickerData(val){//日期子组件的数据
        this.time = val;
      },
      mediaSlotData(val){ //媒体子组件数据
        this.domain_arr = val;
      },
      toBig(){
        tipsMessage('esc键退出全屏', 'warning', this)
        $('#demo').css('height',document.documentElement.clientHeight + 'px')
        $('#demo').css('width',document.documentElement.clientWidth + 'px')
        $('#demo div').css('height',document.documentElement.clientHeight + 'px')
        $('#demo canvas').css('height',document.documentElement.clientHeight + 'px')
        $('#demo div').css('width',document.documentElement.clientWidth + 'px')
        $('#demo canvas').css('width',document.documentElement.clientWidth + 'px')
        this.runERA(this.current_sort,this.current_sort_node);
        this.isBig = true;
      },
      toSmall(){
          this.isBig = false;
          $('#demo').css('width','1218px')
          $('#demo div').css('width','1218px')
          $('#demo canvas').css('width','1218px')
          $('#demo').css('height',document.documentElement.clientHeight -385 + 'px')
          this.runERA(this.current_sort,this.current_sort_node);
      }
  }
} 
</script>

<style lang="scss" >
    $color:rgb(0, 179, 138);
    .upload-demo{
        display: inline-block;
        .el-upload-dragger{
            margin-top: 5px;
            margin-left: calc(610px - 256px);
            width: 315px;
            height: 63px;
            .el-icon-upload{
                font-size: 16px;
                margin: 12px 0 10px;
                line-height: 7px;
            }
            .el-upload__text em{
                color:$color
            }
        }
        .el-upload-dragger:hover{
            border: 1px dashed $color
        }
        .el-upload-dragger:focus{
            border: 1px dashed $color
        }
        input[type="file"]{
            display: none;
        }
    }
    .eRA{
        left:0;
        width:100%;
        padding: 0 0px 20px 0px;
        background-color:white;
        border: 1px solid rgb(228,228,228);
        border-top-width: 0;
        min-height: 700px;
        .el-table{
            thead th{
                text-align: center;
            }
            td{
                text-align: center;
               padding: 5px 0;
            } 
        }
        .page{
            position: absolute;
            right: 5px; 
            bottom: -30px;
            display: inline-block;
            .el-pagination__total{
                color:#999;
            }
            ul>li{
                opacity: 1;
            }
            .el-pager .active {
                color: #00b38a;
            }
        }
        
    }
    .el-tabs{
        .el-tabs__header{
           margin: 0; 
        }
        .el-tabs__content{
            .el-form{
                margin-top: 10px;
                .el-form-item{
                    margin-bottom: 0;
                    .el-input{
                        ::-webkit-input-placeholder {/*Chrome/Safari*/
                            color:#ccc;
                            font-size: 13px;
                        }
                        width: 250px;
                    }
                    input:focus{
                        border-color: $color;
                    }
                }
            }
        }
    }
    
    
</style>
