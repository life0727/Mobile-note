<template>
<div class="" style="padding:0;">
  <div class="list container" style="padding-left: 20px;padding-right: 20px;background-color:white;">
    <div class="filter" style="border-radius: 4px;">
    <!-- 包含关键词 start -->
        <div class="btn-group " role="group" aria-label="..." style="height: 50px;">
          <button class="btn btn-default filter_name" style="border:none;background: #f7f7f7;margin-top:16px;margin-left: 30px !important;"><b style="font-size: 16px;">关键词：</b></button>
          <el-input v-model="allkeyword" placeholder="必须包含关键词(且)" size="small" style="width: 14% !important;margin-top:16px;margin-left: 20px;"></el-input>
          <el-input v-model="keywordyoulike" placeholder="包含任一关键词(或)" size="small" style="width: 14% !important;margin-left: 20px;margin-top:16px"></el-input>
          <el-input v-model="nokeyword" placeholder="不包含关键词" size="small" style="width: 14% !important;margin-left: 20px;margin-top:16px"></el-input>
          <el-button type="success" size="large" class="search_start" @click="search_start" style="background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" v-loading.fullscreen.lock="loading_start" element-loading-text="系统拼命加载中...">搜索</el-button>          
       </div>
        <hr>   
    <!-- 包含关键词 end -->
    <!-- 类型 start -->
       <div class="btn-group" role="group" aria-label="..." style="margin-top:20px">
          <button class="btn btn-default filter_name" style="border:none;background:#f7f7f7;width:76px;font-size: 14px;"><b>文章类型：</b></button>
          <button :class="articleType==0 ? 'btn btn-default warning' : 'btn btn-default'" @click="echarts_show=0;articleType=0;dropdown_sort=['时间降序','时间升序'];current_sort='时间降序'">全部</button>
          <button :class="articleType==1 ? 'btn btn-default warning' : 'btn btn-default'" @click="echarts_show=1;articleType=1;dropdown_sort=['时间降序','时间升序','新闻指数降序','新闻指数升序'];current_sort='时间降序'" id="filter_xinwen" >新闻</button>
          <button :class="articleType==2 ? 'btn btn-default warning' : 'btn btn-default'" @click="echarts_show=2;articleType=2;dropdown_sort=['时间降序','时间升序','阅读数降序','阅读数升序'];current_sort='时间降序'" id="filter_weixin">微信</button>
       </div>
       <!-- <hr> -->  
    <!-- 类型 end -->
    <!-- 关键词位置 start -->
        <div class="btn-group" role="group" aria-label="..." style="margin-top:40px;padding-bottom: 20px;border-bottom:1px solid #dcdcdc;">
          <button class="btn btn-default filter_name" style="border:none;background: #f7f7f7;font-size: 14px;width:76px;"><b>检索位置：</b></button>
          <button :class="queryType==0 ? 'btn btn-default warning' : 'btn btn-default'" style="margin-left:2.0% !important;" @click="queryType=0">全文</button>
          <button :class="queryType==1 ? 'btn btn-default warning' : 'btn btn-default'" @click="queryType=1">仅标题</button>
       </div>
    <!-- 关键词位置 end -->

         <!-- 监测时间 start -->
        <div id="div_tianbu" style="height:20px;background: #ffffff;width: 1210px;margin-left: -1px;"></div> 
       <div class="btn-group" role="group" aria-label="..." style="" id="filter_time" style="height: 40px;position: relative;border-top: 1px solid #dcdcdc;">
          <!-- <button class="btn btn-default filter_name" style="border:none;background: snow;">监测时间：</button> -->
          <button :class="time[1]-time[0]==604800000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-top: 9px;" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</button>
          <button :class="time[1]-time[0]==86400000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-top: 9px;margin-left: 0px !important;" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</button>
          <button :class="time[1]-time[0]==172800000 ? 'btn btn-default warning' : 'btn btn-default'" style="font-size: 14px;margin-top: 9px;margin-left: 0px !important;" @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</button>
          <div class="block" style="display: inline-block;margin-top: 9px;">
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
          <span style="position: absolute;left: 47%;color: #dcdcdc;margin-top:8px">|</span>
          <button class="btn btn-default filter_name" style="border:none;background: #f7f7f7;font-size: 14px;margin-top: -1px;position:absolute;top:9px;margin-left:18px !important;"><b>排序方式：</b></button>
            <el-dropdown id="filter_sort_dropdown" @command="sort_dropdown" style="padding-left: 100px;">
                  <el-button>{{current_sort}}<i class="el-icon-caret-bottom el-icon--right" style="margin-left: 12px;"></i></el-button>                  
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="i in dropdown_sort" :command="i">{{i}}</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown>
          <button  class="btn btn-default filter_button" style="width: 120px ;border:none;margin-left: 20% !important;margin-top:8px" id="hide_button" @click="hide_filter">隐藏筛选条件<i class="fa fa-angle-up" style="font-size:18px;margin-left:5px;"></i></button>
          <button  class="btn btn-default filter_button" id="show_button" style="width: 120px ;border:none;margin-left: 20% !important;margin-top:8px" @click="show_filter">显示筛选条件<i class="fa fa-angle-down" style="margin-left:5px;font-size:18px;"></i></button>  
          <div style="position: absolute;right: 85px;width: 20px;height: 42px;background: #ffffff;top: -1px;border-left:1px solid #dcdcdc; "></div>
          <div style="position: absolute;right: -1px;width: 86px;height: 42px;background: #ffffff;top: -1px;">
          </div>
       </div>
       <!-- <hr> -->
    <!-- 监测时间 end -->
      </div> 
    <!-- 信息显示与图表部分start  --> 
      <div id="carousel-example-generic" class="carousel slide" style="position:relative;">
          <ol class="carousel-indicators" style="width:100%;left:0;margin:0;top:0px;height:10px;">
            <li class="active">
              <el-button v-show="this.data.length!==0" data-target="#carousel-example-generic" data-slide-to="1"  style="background-color: #00b38a;border-color:  #00b38a;border-radius: 4px !important;font-size: 17px;width: 85px;height: 40px;color: white;position:absolute;top:-40px;right: 0;;" @click="show_echarts">更多<i class="fa fa-angle-right" style="margin-left: 8px;"></i></el-button> 
            </li>
            <li >
               <!-- <img data-target="#carousel-example-generic" data-slide-to="0" src="../../assets/img/table.jpg" @click="first_options=[];second_options=[];" style="cursor:pointer;width:84px;height:20px;position:absolute;left:2px;" >  -->
               <el-button data-target="#carousel-example-generic" data-slide-to="0"  style="background-color: #00b38a;border-color:  #00b38a;border-radius: 4px !important;font-size: 17px;width: 85px;height: 40px;color: white;position:absolute;top:-40px;right: 0;;" @click="hide_echarts">信息<i class="fa fa-angle-left" style="margin-left: 8px;"></i></el-button> 
            </li>
          </ol>
          <div class="carousel-inner " role="listbox" style="width: 97%;">
          <div class="item active"  id="item_table" style="height:1370px">
            <div class="carousel-caption"  style="padding: 0;margin-top: -10px;">
<!--      主要信息table start -->       
              <div style="padding: 0;position: relative;" class="row" id="table"><!-- 右边table -->
                <div class="col-md-6 col-xs-12 "  @mouseover="Mover($index)" @mouseout="Mout($index)"  ref="list" style="width:575px;height:190px;border: 1px solid #dcdcdc;padding-left: 12px;padding-right: 8px;margin: 10px 5px 10px 15px;position: relative;border-radius: 4px;" v-for="(a,$index) in tabledata">
                  <div style="width: 421px;height:80px;border-right: 1px solid #dcdcdc;border-bottom: 1px solid #dcdcdc;  position: absolute;top:10px;text-align: left;">
                    <span v-show="a.article.articleType==0" style="width:40px;height: 18px;position: absolute;top:10px;border: 1px solid #f6a623;font-size: 14px;border-radius: 4px;padding: 0 5px;color:#f6a623;line-height: 16px;">全部</span>
                    <span v-show="a.article.articleType==1" style="width:40px;height: 18px;position: absolute;top:10px;border: 1px solid #f46c6d;font-size: 14px;border-radius: 4px;padding: 0 5px;color:white;line-height: 16px;background-color:#f46c6d ">新闻</span>
                    <span v-show="a.article.articleType==2" style="width:40px;height: 18px;position: absolute;top:10px;border: 1px solid #3dae36;font-size: 14px;border-radius: 4px;padding: 0 5px;color:white;line-height: 16px;background-color:rgba(61,174,54,.8);">微信</span>
                    <span style="width:350px;font-size: 16px;height:18px;line-height: 16px;position: absolute;left:60px;top:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><a style="color:black" :href="a.article.url" target="_blank">{{a.article.title}}</a></span>
                    <p style="position: absolute;left:60px;top: 38px;">
                      <span><img src="../../assets/icon/发布者(22x18px).png"></span>
                      <span style="color: #cccccc;font-size: 14px;">{{a.article.author}}</span >&nbsp;<span style="color: #cccccc;font-size: 14px;">▪</span>&nbsp;<span style="color: #cccccc;font-size: 14px;">{{a.article.publishTime}}</span>
                    </p>
                  </div>
                  <div style="width: 131px;height:80px;border-left: 1px solid #dcdcdc;border-bottom: 1px solid #dcdcdc;position: absolute;top:10px;right: 10px;text-align: center;">
                      <img src="../../assets/icon/del.png" style="position: absolute;right: 0;cursor: pointer;display:none;" ref="del_img" @click="wuguan(a)">
                    <span style="position: absolute;top: 10px;left:60px;"><img src="../../assets/icon/媒体（26x26px）.png"></span>
                    <p style="font-size: 14px;margin-top: 41px;">{{a.article.media}}</p>
                  </div>
                  <div style="width: 421px;height:60px;border-right: 1px solid #dcdcdc;position: absolute;top:90px;" id="keyword_div">
                    <span v-for="b in a.includeKeywordList">{{b}}</span>
                  </div>
                  <div style="width: 131px;height:60px;border-left: 1px solid #dcdcdc;position: absolute;top:90px;right: 10px;">
                    <span style="position: absolute;top: 10px;left: 52px;"><img src="../../assets/icon/指数（26x26px）.png"></span>
                    <p style="font-size: 14px;margin-top: 41px;">{{a.article.newsIndex}}</p>
                  </div>
                  <div style="height:30px;width:100%;background-color:#f7f7f7;position: absolute;left: 0;bottom: 0;border-top: 1px solid #dcdcdc;" id="bottom_dev">
                    <div style="width:114px;border-right:1px solid #dcdcdc;float: left;height: 100%;text-align: center;">
                      <span style="color:#999999;line-height:15px;">
                        <img src="../../assets/icon/分类（17x17）.png" style="margin:-3px 3px 0 0;">
                        <span style="font-size: 14px;line-height:30px">{{a.article.category}}</span>
                      </span>
                    </div>
                    <div style="width:117px;border-right:1px solid #dcdcdc;float: left;height: 100%;text-align: center;">
                      <span style="color:#999999;line-height:25px;">
                        <img src="../../assets/icon/标记位置（18x18px）.png" style="margin:0px 3px 0 0;">
                        <span v-show="a.article.locationLevel==1" style="font-size: 14px;line-height:30px">普通新闻</span>
                        <span v-show="a.article.locationLevel==2" style="font-size: 14px;line-height:30px">频道首页</span>
                        <span v-show="a.article.locationLevel==3" style="font-size: 14px;line-height:30px">频道要闻</span>
                        <span v-show="a.article.locationLevel==4" style="font-size: 14px;line-height:30px">站点首页</span>
                        <span v-show="a.article.locationLevel==5" style="font-size: 14px;line-height:30px">站点要闻</span>
                      </span>
                    </div>
                    <div style="width:114px;border-right:1px solid #dcdcdc;float: left;height: 100%;text-align: center;">
                      <span  @click="dialog_ReprintList(a)" style="color:#999999;cursor: pointer;" class="reprintList">
                        <img src="../../assets/icon/转发（18x18px）.png" style="margin:-4px 3px 0 0;">
                        <span  style="font-size: 14px;line-height:30px">{{a.article.reprintList== 0 ? '' : a.article.reprintList.length}}</span>
                      </span>
                    </div>
                    <div style="width:114px;border-right:1px solid #dcdcdc;float: left;height: 100%;text-align: center;">
                      <span style="color:#999999;">
                        <img src="../../assets/icon/点赞（18x18px）.png" style="margin:-4px 3px 0 0;">
                        <span style="font-size: 14px;line-height:30px" >{{a.article.likeCount}}</span>
                      </span>
                    </div>
                    <div style="width:114px;float: left;height: 100%;text-align: center;">
                      <span style="color:#999999;">
                        <img src="../../assets/icon/浏览（22x18px）.png" style="margin:-4px 3px 0 0;">
                        <span style="font-size: 14px;line-height:30px">{{a.article.readCount}}</span>
                      </span>
                    </div>
                  </div>
                </div>                
              </div>           
<!--      主要信息table end -->
                <!-- 回收站 strart -->
                <el-button  icon="delete2" style="float:left;margin-top: 10px;background-color:#00b38a;border-color:#00b38a ;color: white;" @click="dialog_Recycle" v-show="this.data.length!==0">回收站</el-button>
               <!--  回收站 end -->
               <span v-show="this.data.length!==0" id="data_size" style="color:#48576a;float: left;padding:14px 0 0 10px;">文章总量:{{reprintList_size+data.length}}</span>
     <!--    分页 strart -->
                <el-pagination
                    id="page"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[ 12, 20, 25]"
                    :page-size="page_size"
                    layout="total,  prev, pager, next, jumper"
                    :total="this.data.length"
                    v-show="this.data.length!==0">
                </el-pagination>
     <!--    分页 end -->  
            </div>          
          </div>
     <!-- 信息显示与图表部分start -->
          <div class="item" style="height:1300px;">
            <div class="carousel-caption">
            <!--  二级选项卡 start -->
              <div class="second_card">
                <el-button-group>
                  <a href="javascript:;"><el-button id="btn_hot">地域热图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_more_media" >媒体声量top10</el-button></a>
                  <a href="javascript:;"><el-button id="btn_top">top20</el-button></a>
                  <a href="javascript:;"><el-button id="btn_diaoxing">正负性对比图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_newsnumber">新闻指数走势图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_user_defind_mdeia" >媒体类型分析</el-button></a>
                  <a href="javascript:;"><el-button id="btn_more_direction" >多维度分析</el-button></a>
                  <a href="javascript:;"><el-button id="btn_renwuzuzhi" >人物组织关系</el-button></a>
                </el-button-group>
              </div>  
            <!--  二级选项卡 end-->
           <!--  echarts-图 strat -->
              <div class="echarts_content">
                <div class="opa" id="echarts-hot">
                  <div style="position: absolute;width:150px;border:1px solid #ebebeb;left:720px;width: 300px;margin-top:15px;" v-show="echarts_show==0||echarts_show==1">
                  <h4 style="margin: 10px auto 0 auto;">新闻省份地域top10</h4>
                    <ul style="padding:0" >
                     <li style="float: none;font-size: 12px;list-style: none;" v-for="(i,$index) in xinwen_province_top"  ><span style="width:60px;display:inline-block;">{{i.province}}</span><el-progress :stroke-width="14" :percentage="parseInt((i.num/xinwen_province_top_size)*100)" style="width: 78%;display: inline-block;line-height: 2.8"></el-progress></li>
                   </ul>
                  </div>
                  <div id="echarts_hot_xinwen" v-show="echarts_show==0||echarts_show==1" style="width: 700px;margin-right: 0 !important;"> </div>
                  <div style="position: absolute;width:150px;border:1px solid #ebebeb;left:720px;width: 300px;margin-top:8px;" v-show="echarts_show==0||echarts_show==2">
                   <h4 style="margin: 10px auto 0 auto;">微信省份地域top10</h4>
                    <ul style="padding:0" >
                     <li style="float: none;font-size: 12px;list-style: none;" v-for="(i,$index) in wx_province_top"  ><span style="width:60px;display:inline-block;">{{i.province}}</span><el-progress :stroke-width="14" :percentage="parseInt((i.num/wx_province_top_size)*100)" style="width: 78%;display: inline-block;line-height: 2.8"></el-progress></li>
                   </ul> 
                  </div>
                  <div id="echarts_hot_weixin_article" v-show="echarts_show==0||echarts_show==2" style="width: 700px;margin-right: 0 !important;"></div>
                  <div style="position: absolute;width:150px;border:1px solid #ebebeb;left:720px;width: 300px;margin-top:8px;" v-show="echarts_show==0||echarts_show==2">
                    <h4 style="margin: 10px auto 0 auto;">微信文章发布媒体省份地域top10</h4>
                    <ul style="padding:0" >
                     <li style="float: none;font-size: 12px;list-style: none;" v-for="(i,$index) in wx_media_province_top"  ><span style="width:60px;display:inline-block;">{{i.media_province}}</span><el-progress :stroke-width="14" :percentage="parseInt((i.num/wx_media_province_top_size)*100)" style="width: 78%;display: inline-block;line-height: 2.8"></el-progress></li>
                   </ul>
                  </div>
                  <div id="echarts_hot__weixin_media" v-show="echarts_show==0||echarts_show==2" style="width: 700px;margin-right: 0 !important;"></div>
                </div>
                <div class="nopa" id="echarts-top">
                  <div id="echarts_top_xinwen" v-show="echarts_show==0||echarts_show==1" style="height:590px"></div>
                  <div id="echarts_top_weixin" v-show="echarts_show==0||echarts_show==2" style="height:590px">></div>
                </div> 
                <div class="nopa" id="echarts-diaoxing">
                  <div id="echarts_diaoxing_xinwen" v-show="echarts_show==0||echarts_show==1"></div>
                  <div id="echarts_diaoxing_weixin" v-show="echarts_show==0||echarts_show==2"></div>
                </div> 
                <div class="nopa" id="echarts-newsnumber">
                  <div id="echarts_newsnumber" v-show="echarts_show==0||echarts_show==1"></div> 
                </div>                
                <div class="nopa" id="echarts-user_defind_mdeia">
                  <!-- <h1>我是自定义媒体分析</h1>
                  <div class="third_card">
                    <el-button-group>
                      <el-button v-for="i in third_card" :class="{bgcolor:i.bg}" @click="toggleclass(i)">{{i.name}}<i class="fa fa-times" @click.stop="del_third_card(i)"></i></el-button>
                      <el-button id="third_card_add" type="primary" icon="plus" @click="dialogVisible = true"></el-button>
                    </el-button-group>
                  </div> -->
                  <el-tabs v-model="activeName3" >
                    <el-tab-pane label="新闻" name="first">
                     <span ><b>类型:</b> &nbsp;&nbsp;&nbsp;</span>
                      <el-select v-model="first_schemeId">
                        <el-option
                          v-for="i in first_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select> 
                       <el-button type="success" @click="type_echarts_xinwen()" style="padding:5px 12px;margin-left: 20px;">确定</el-button>
                       <div id="echarts_type_xinwen" style="width: 898px;height: 350px;margin-top: 20px;"></div>
                    </el-tab-pane>
                    <el-tab-pane label="微信" name="second">
                    <span ><b>类型:</b> &nbsp;&nbsp;&nbsp;</span>
                      <el-select v-model="wx_first_schemeId">
                        <el-option
                          v-for="i in wx_first_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select> 
                      <el-button type="success" @click="type_echarts_wx()" style="padding:5px 12px;margin-left: 20px;">确定</el-button>
                      <div id="echarts_type_wx" style="width: 898px;height: 350px;margin-top: 20px;"></div>
                    </el-tab-pane>
                  </el-tabs> 
                </div>
                <div class="nopa" id="echarts-more_direction">
                  <div style="height: 40px;border: 0px;">
                    <span style="margin-left: 90px"><b>新闻:</b> &nbsp;&nbsp;&nbsp;主交叉条件：</span>
                      <el-select v-model="first_schemeId">
                        <el-option
                          v-for="i in first_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select>  
                      <span>副交叉条件：</span>
                      <el-select v-model="second_schemeId">
                        <el-option
                          v-for="i in second_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select>   
                    <el-button type="success" @click="more_echarts()">确定</el-button>
                  </div>
                  <div id="echarts_more_direction_xinwen" v-show="echarts_show==0||echarts_show==1" style="height: 450px;"> </div> 
                  <div style="height: 40px;border: 0px;">
                    <span style="margin-left: 90px"><b>微信:</b> &nbsp;&nbsp;&nbsp;主交叉条件：</span>
                      <el-select v-model="wx_first_schemeId">
                        <el-option
                          v-for="i in wx_first_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select>  
                      <span>副交叉条件：</span>
                      <el-select v-model="wx_second_schemeId">
                        <el-option
                          v-for="i in wx_second_options"
                          :label="i.schemeName"
                          :value="i.schemeId">
                        </el-option>
                      </el-select>   
                    <el-button type="success" @click="more_echarts_wx()">确定</el-button>
                  </div>
                  <div id="echarts_more_direction_wx" v-show="echarts_show==0||echarts_show==1" style="height: 450px;"> </div> 
                </div>    
                <div class="nopa" id="echarts-media-top">
                  <div id="echarts_top_media_xinwen" v-show="echarts_show==0||echarts_show==1" style="height:590px"></div>
                  <div id="echarts_top_media_weixin" v-show="echarts_show==0||echarts_show==2" style="height:590px">></div>
                </div>   
                <div class="nopa" id="echarts-renwuzuzhi">
                <el-button type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;position:relative;right:0px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;"  @click="renwuzuzhi_search">搜索</el-button>
                    <div id="panel" style="position:relative;width:1200px;border:0px solid gray;margin-left:0px;">
                        <div class="panel panel-default" id="panel_person" style="position:absolute;width:393px;height:360px;left:0;">
                          <div class="panel-heading">
                            <h3 class="panel-title" style="color: #333333;" >人物
                              <span style="padding-left: 225px;font-size: 14px;">数量：</span>
                              <el-dropdown  @command="sort_dropdown_per" style="">
                                  <el-button style="padding: 2px 6px;">{{current_sort_per}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                            </h3>
                          </div>
                          <div class="panel-body">
                            <div class="person" style="color: white;">人物</div>
                            <div class="line_first"></div>
                            <div class="line_second"></div>
                            <div class="line_last"></div> 
                            <el-tooltip class="item" effect="light" :content="'数值:'+i.count" placement="top" v-for="(i,$index) in personSet">
                              <div  class="ct"  @click="ct_click(i,1)" ref="ct" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 60px;display: inline-block;margin-top: 15px;font-size: 11px;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span></div>
                            </el-tooltip>   
                          </div>
                        </div>
                        <div class="panel panel-default" style="position:absolute;width:393px;height:360px;left:391px;">
                          <div class="panel-heading">
                            <h3 class="panel-title" style="color: #333333;">地点
                              <span style="padding-left: 225px;font-size: 14px;">数量：</span>
                              <el-dropdown  @command="sort_dropdown_loc" style="">
                                  <el-button style="padding: 2px 6px;">{{current_sort_loc}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                            </h3>
                          </div>
                          <div class="panel-body">
                            <div class="person" style="color: white;">地点</div>
                            <div class="line_first"></div>
                            <div class="line_second"></div>
                            <div class="line_last"></div>
                            <el-tooltip class="item" effect="light" :content="'数值:'+i.count" placement="top" v-for="(i,$index) in locationSet">
                              <div  class="ct"  @click="ct_click(i,2)" ref="ct_loc" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 60px;display: inline-block;margin-top: 15px;font-size: 11px;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span></div>
                            </el-tooltip>  
                          </div>
                        </div>
                        <div class="panel panel-default" style="position:absolute;width:393px;height:360px;left:783px;">
                          <div class="panel-heading">
                            <h3 class="panel-title" style="color: #333333;">组织
                              <span style="padding-left: 225px;font-size: 14px;">数量：</span>
                              <el-dropdown  @command="sort_dropdown_org" style="">
                                  <el-button style="padding: 2px 6px;">{{current_sort_org}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                            </h3>
                          </div>
                          <div class="panel-body">
                            <div class="person" style="color: white;">组织</div>
                            <div class="line_first"></div>
                            <div class="line_second"></div>
                            <div class="line_last"></div>
                            <el-tooltip class="item" effect="light" :content="'数值:'+i.count" placement="top" v-for="(i,$index) in orgSet">
                               <div  class="ct"  @click="ct_click(i,3)" ref="ct_org" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 60px;display: inline-block;margin-top: 15px;font-size: 11px;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span></div>
                            </el-tooltip>
                          </div>
                        </div>
                        <p v-loading="renwuzuzhi_loading"  element-loading-text="系统拼命加载中..." style="top:400px;width:200px;position:absolute;left:40%;" id="loading_renwuzuzhi"></p> 
                    </div> 
                    <!-- <div id="echarts_guanxi" v-show="this.personSet.length!==0" style="width:400px;height:400px;border:1px soild red;margin-top:-40px"></div>   -->                 
              </div>
             </div>
           <!--  echarts-图 end -->
            </div>
          </div>
        </div>
      </div>
    <!-- 信息显示与图表部分end --> 

    <!--    添加自定义媒体分析模态框 -start -->
      <el-dialog title="添加方案" v-model="dialogVisible" size="tiny">
        <span>方案名称：</span>
        <input type="text" v-model="third_card_input" placeholder="方案名称">
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add_third_card">确 定</el-button>
        </span>
      </el-dialog>
    <!--    添加自定义媒体分析模态框 -end -->
    <!--    转发合并模态框 -start -->
      <el-dialog title="合并详情" v-model="dialogReprintList" class="dialogList" >
        <hr> 
          <div class="block">
            <span class="wrapper">
              <el-button type="danger" size="mini" @click="del_reprintList">错误反馈</el-button>
            </span>
            <el-table
              :data="reprintList_data"
              border
              style="width: 100%"
              @current-change="Changerow"
              @selection-change="Selection"
              :default-sort = "{prop: 'date', order: 'descending'}"
              ref="table"
              height="650"             
              >
              <el-table-column
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                :selectable="selectable"
                type="selection"
                width="20">
              </el-table-column>
              <el-table-column
                label="页面类型"
                width="58">
                <template scope="scope">
                  <span v-show="scope.row.articleType==0">全部</span>
                  <span v-show="scope.row.articleType==1">新闻</span>
                  <span v-show="scope.row.articleType==2">微信</span>
                </template>          
              </el-table-column>
              <el-table-column
                label="文章标题"
                width="360">
                <template scope="scope">
                  <span><a :href="scope.row.url" target="_blank" >{{scope.row.title}}</a></span>
                </template>          
              </el-table-column>
              <el-table-column
                label="原发"
                width="35">
                <template scope="scope">
                  <span v-show="scope.row.isOriginal==0">否</span>
                  <span v-show="scope.row.isOriginal==1">是</span>
                </template>
              </el-table-column>
              <el-table-column
                label="位置标记"
                width="65">
                <template scope="scope">
                  <span>{{scope.row.locationLevel}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="媒体名称"
                width="130">
                <template scope="scope">
                  <span>{{scope.row.media}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="行业分类"
                width="65">
                <template scope="scope">
                  <span>{{scope.row.category}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="阅读"
                width="50"
                sortable
                prop="readCount">
              </el-table-column>
              <el-table-column
                label="点赞"
                width="45"
                prop="likeCount"
                sortable>
              </el-table-column>
              <el-table-column
                label="文章作者"
                width="110">
                <template scope="scope">
                  <span>{{scope.row.author}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="newsIndex"
                label="新闻指数"
                width="78"
                sortable>
              </el-table-column>
              <el-table-column
                label="发布时间"
                width="85"
                sortable
                prop="publishTime">
              </el-table-column>
            </el-table>
          </div> 
      </el-dialog>
    <!--   转发合并模态框 -end -->
    <!--    回收站模态框 -start -->
    <el-dialog title="回收站列表" v-model="dialog_recycle" class="dialogList" >
      <hr> 
          <div class="block">
            <span class="wrapper">
              <button class="btn btn-default btn-info" @click="recovery_recycle" style="padding:3px 8px;"><i class="fa fa-reply" style="margin-right: 5px"></i>还原</button> 
            </span>
            <p v-loading="this.recycle_data.length==0" element-loading-text="系统拼命加载中..." style="top:200px;" id="loading_recycle"></p>
            <el-table
              :data="recycle_data"
              border
              style="width: 100%"
              @current-change="Changerow_recycle"
              @selection-change="Selection_recycle"
              :default-sort = "{prop: 'date', order: 'descending'}"
              ref="table"
              height="650"             
              >
              <el-table-column
                type="index"
                width="20">
              </el-table-column>
              <el-table-column
                type="selection"
                width="20">
              </el-table-column>
              <el-table-column
                label="包含关键词"
                width="150">
                <template scope="scope">
                  <span v-for="i in scope.row.includeKeywordList">{{i}}&nbsp;&nbsp;</span>
                </template>
              </el-table-column>
              <el-table-column
                label="页面类型"
                width="58">
                <template scope="scope">
                  <span v-show="scope.row.article.articleType==0">全部</span>
                  <span v-show="scope.row.article.articleType==1">新闻</span>
                  <span v-show="scope.row.article.articleType==2">微信</span>
                </template>          
              </el-table-column>
              <el-table-column
                label="文章标题"
                width="360">
                <template scope="scope">
                  <span><a :href="scope.row.article.url" target="_blank" >{{scope.row.article.title}}</a></span>
                </template>          
              </el-table-column>
              <el-table-column
                label="位置标记"
                width="60">
                <template scope="scope">
                  <span>{{scope.row.article.locationLevel}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="媒体名称"
                width="130">
                <template scope="scope">
                  <span>{{scope.row.article.media}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="行业分类"
                width="65">
                <template scope="scope">
                  <span>{{scope.row.article.category}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="阅读"
                width="50"
                sortable
                prop="article.readCount">
              </el-table-column> 
              <el-table-column
                label="点赞"
                width="50"
                sortable
                prop="article.likeCount">
              </el-table-column> 
              <el-table-column
                label="文章作者"
                width="110">
                <template scope="scope">
                  <span>{{scope.row.article.author}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="article.newsIndex"
                label="新闻指数"
                width="78"
                sortable>
              </el-table-column>
              <el-table-column
                label="发布时间"
                width="85"
                sortable
                prop="article.publishTime">
              </el-table-column>
              <el-table-column
                label="调性"
                width="40">
                <template scope="scope">
                  <el-button type="danger" size="mini" style="margin-left: 10px;" v-show="scope.row.article.polar==-1">负</el-button>
                  <el-button style="background-color: gray;border-color: gray;color: #fff;" size="mini" v-show="scope.row.article.polar==0">中</el-button>
                  <el-button type="success" size="mini" v-show="scope.row.article.polar==1">正</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>  
    </el-dialog>
    <!--    回收站模态框 -end -->
    <!-- 新闻地域省份模态框 start-->
     <el-dialog title="相关文章" v-model="dialogEchart_xw_province" size="tiny" >
      <div class="el-steps is-vertical" id="steps">
        <div class="el-step is-vertical" style="margin-right: 0px; cursor: pointer;" v-for="(i,$index) in dialog_xw_provinceMap" @mouseover="Mover_articleList($index)" @mouseout="Mout_articleList($index)">
          <div class="el-step__head  is-text" style="color: white;">
            <div class="el-step__line is-vertical" style="margin-right:0;width: 1px;"> </div>
            <span class="el-step__icon"><img src="../../assets/icon/xiangguanwenzhang.png"></span>
          </div>
          <div class="el-step__main" style="margin-left: 0">
            <div class="el-step__title "  style="width: 480px;height: 32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><a :href="i.article.url"  target="_blank" style="font-weight: 700;color: #48576a;text-decoration: none" ref="dialog_xw_articlelist">标题：{{i.article.title}}</a>
            </div>
            <div class="el-step__description " style=" color: #8391a5;">{{i.article.publishTime}}&nbsp;&nbsp;&nbsp;<span >指数：{{i.article.newsIndex}}</span>&nbsp;&nbsp;&nbsp;<span >媒体名称：{{i.article.media}}</span></div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" ></span>
    </el-dialog>
    <!-- 新闻地域省份模态框 end-->
   <!--  mention 图start -->
   <!-- <el-dialog title="详情" v-model="dialogCt" size="tiny" id="dialog_ct" >
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 出现频次: <span style="color: #666;">{{ct_size}}</span></p>
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 知识图谱: <img src="../../assets/icon/ct_link.png" style="margin-top: -3px;display: inline-block;"> <a :href="ct_url" target="_blank" style="color: #fec330;text-decoration: none;">{{ct_name}}</a></p>
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 相关文章</p>
       <div class="list-group" style="width: 531px;" id="dialog_ct_list">
          <p v-loading="this.ct_data_list.length==0" element-loading-text="系统拼命加载中..."  id="loading_ct" style="margin-bottom: 0;"></p>
          <div style="padding: 8px 5px;color: #999;cursor: pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;" class="list-group-item" ref="ct_list" @mouseover="Mover_ct_list($index)" @mouseout="Mout_ct_list($index)" @click="click_ct_list(i)" v-for="(i,$index) in ct_data_list">{{($index+1)+(currentPage_ct-1)*page_size_ct}}.&nbsp;{{i.article.title}}</div>
      </div>
      分页 strart
        <el-pagination
            id="page_ct"
            @current-change="handleCurrentChange_ct"
            :current-page="currentPage_ct"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_ct"
            layout="total,  prev, pager, next, jumper"
            :total="this.ct_data.length"
            v-show="this.ct_data.length!==0">
        </el-pagination>
     分页 end
   </el-dialog> -->
   <!--  mention 图end -->

  </div>
</div>  
</template>
<script>
import echarts from 'echarts'
import { Map }  from '../../assets/js/map.js'
export default {
  mounted :function () {
  //判断是否初始化
   if(this.$store.state.list_Data===''){
    this.loading_start=true;
    if(JSON.parse(window.sessionStorage.getItem('start'))==null){
      console.log('初始化');
      let _this=this;    
      //页面加载完成判断项目及跳转
      $.ajax({
         type: "GET",
         url: 'http://192.168.0.3:8080/rs/api/v1.1/project',
         traditional: true,
         data: {
             "method": 'get'
         },
         success: function(data){
            if(data.data==null){
              window.location.href='#/index/clever'
            }else{
               _this.search_data(_this.current_jushuNum,data.data.projectList[0].id,-1,_this.articleType,[],[],[],_this.queryType,[-1,0,1],0,_this.time[0],_this.time[1]);
                window.sessionStorage.setItem('project_id',JSON.stringify(data.data.projectList[0].id))
            }
         }
      })
    }else{
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      this.search_data(this.current_jushuNum,project_id,-1,this.articleType,[],[],[],this.queryType,[-1,0,1],0,this.time[0],this.time[1]);
    }
   }else{
    this.data_write(this.$store.state.list_Data)
   }
      //搜索按钮hover样式
      $('.filter_button').hover(function(){
        $(this).css('border-color','#00b38a');
        $(this).css('color','#00b38a');
        //$('.filter').css('border-bottom-color','rgb(240,173,78)')
      },function(){
        $(this).css('border-color','#ccc');
        $(this).css('color','black');
        //$('.filter').css('border-bottom-color','#ccc')        
      });
      /* echarts-一级选项卡*/
      $('.second_card button').click(function(){
        $(this).css({
          'background-color':'#20a0ff',
          'border-color':'#20a0ff',
          'color':'white'
        }).parent().parent().find('button').not($(this)).css({
          'background-color':'#fff',
          'border-color':'#bfcbd9',
          'color':'#1f2d3d'
        })
      });
     /* echarts-选项卡切换*/
      $('#btn_hot').click(function(){
        $('#echarts-hot').attr('class','opa').siblings().attr('class','nopa')
      })
      $('#btn_top').click(function(){
        $('#echarts-top').attr('class','opa').siblings().attr('class','nopa')
      })
      $('#btn_diaoxing').click(function(){
        $('#echarts-diaoxing').attr('class','opa').siblings().attr('class','nopa')
      })
      $('#btn_newsnumber').click(function(){
        $('#echarts-newsnumber').attr('class','opa').siblings().attr('class','nopa')
      })
      $('#btn_user_defind_mdeia').click(function(){
        $('#echarts-user_defind_mdeia').attr('class','opa').siblings().attr('class','nopa')
      })
      $('#btn_more_direction').click(function(){
        $('#echarts-more_direction').attr('class','opa').siblings().attr('class','nopa')
      });
      $('#btn_more_media').click(function(){
        $('#echarts-media-top').attr('class','opa').siblings().attr('class','nopa')
      });
      $('#btn_renwuzuzhi').click(function(){
         $('#echarts-renwuzuzhi').attr('class','opa').siblings().attr('class','nopa')
      })
      //ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window){
        $('.carousel-indicators>li').not('.active').css('display','none');
        $('.carousel-indicators>li').click(function(){
          $(this).css('display','none').siblings().css('display','block')
        })
     }
      //搜索数据
     $('.filter .btn').not('.filter_name').not('.polar').not('.filter_button').click(function(){
      $(this).addClass('warning').siblings().removeClass('warning')
     });
     let _this=this;
     $('.polar').click(function(){
        $(this).toggleClass('warning');
        //文章调性回传数据 polar_arr
        let polar_arr=[];
        let polar= $('#polar .warning').not('#filter_polar_all');
        for(let i=0;i<polar.length;i++){
          polar_arr.push(polar[i].innerHTML);
        }
        for( let i=0;i<polar_arr.length;i++){
          if(polar_arr[i]=='正面'){  polar_arr[i]=1   };
          if(polar_arr[i]=='中性'){  polar_arr[i]=0   };
          if(polar_arr[i]=='负面'){  polar_arr[i]=-1   };    
        }
        //console.log(_this.polar_arr)
        _this.polar_arr=polar_arr;      
     });
    $('#filter_polar_all').click(function(){
      if( _this.polar_arr.length==3){
        $('.polar').removeClass('warning');
         _this.polar_arr=[];
      }else{
         $('.polar').addClass('warning');
         _this.polar_arr=[-1,0,1];
      }
    })
    //点击筛选按钮直接搜索数据
     $('.filter .btn').not('.filter_name').not('.filter_button').click(function(){
      _this.loading_start=true;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      if(_this.time[0]==undefined||_this.time[1]==undefined||_this.time[1].getTime()<_this.time[0].getTime()){
      _this.$message({
          message: '请检查您的时间格式',
          type: 'warning'
        });
     }else{
        //必须包含关键词回传数据 mustIncludeKeywordList
       let allkeyword=_this.allkeyword;
       if(allkeyword){
        allkeyword=allkeyword.replace(/，/ig,','); //转化逗号
        _this.mustIncludeKeywordList=allkeyword.split(',')
       }
       //包含任意关键词回传数据 anyIncludeKeywordList
       let keywordyoulike=_this.keywordyoulike;
       if(keywordyoulike){
        keywordyoulike=keywordyoulike.replace(/，/ig,','); //转化逗号
        _this.anyIncludeKeywordList=keywordyoulike.split(',')
       }
       //必须不包含关键词回传数据 notIncludeKeywordList
       let nokeyword=_this.nokeyword;
       if(nokeyword){
        nokeyword=nokeyword.replace(/，/ig,','); //转化逗号
        _this.notIncludeKeywordList=nokeyword.split(',')
       }
        _this.first_options=[];
        _this.second_options=[];
        _this.data=[];
        let cate_id='';
        for(let i=0;i<_this.classify.length;i++){
          if(_this.classify[i].bg==true){
           cate_id=_this.classify[i].id;
          }
        }
        $('#table').css('display','none'); 
        $('#loading_table').css('display','block');
        $('.echarts_content').css('display','none')
         _this.search_data(_this.current_jushuNum,project_id,cate_id,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1],true);  
          _this.mustIncludeKeywordList=null;
          _this.anyIncludeKeywordList=null
          _this.notIncludeKeywordList=null;
      }
     })
    
  },
  data () {
  	return {
      watch:JSON.parse(window.sessionStorage.getItem('start')),
      polar:['正面','中性','负面'],
      dropdown_sort:['时间降序','时间升序'],
      current_sort:'时间降序',
      pickerOptions0: {},
      time: JSON.parse(window.sessionStorage.getItem('list_time0'))!=null ? [new Date(JSON.parse(window.sessionStorage.getItem('list_time0'))),new Date(JSON.parse(window.sessionStorage.getItem('list_time1')))] : [new Date(new Date().getTime()-604800000), new Date()],
      allkeyword:'',
      keywordyoulike:'',
      nokeyword:'',
      checked:true,
      checke:false,
      diaoxing_visible:'',
      articleType:JSON.parse(window.sessionStorage.getItem('list_articleType'))!=null ? JSON.parse(window.sessionStorage.getItem('list_articleType')) : 0,
      polar_arr:[-1,0,1],
      queryType:JSON.parse(window.sessionStorage.getItem('list_queryType'))!=null ? JSON.parse(window.sessionStorage.getItem('list_queryType')) : 0,
      mustIncludeKeywordList:[],
      anyIncludeKeywordList:[],
      notIncludeKeywordList:[],
      data:'',//总数据
      recycle_data:[],//回收站数据
      reprintList_data:'',//转发的模态框的数据
      reprintList_id:'',//点击转发的相对应的总数据的id
      tabledata:[],//表格数据
      fix_data:[],//右边固定fix地图数据
      fix_media:'',//右边固定fix地图 媒体名称数据
      fix_media_xinwen:'',//右边固定fix地图 媒体名称数据 xinwen
      fix_media_wx:'',//右边固定fix地图 媒体名称数据 weixin
      fix_media_size:'',
      fix_media_xinwen_size:'',
      fix_media_wx_size:'',
      currentPage: 1,
      page_size:12,
      reprintList_size:'',
      dialogVisible: false,
      dialogReprintList: false,
      dialog_recycle:false,
      classify_dialog:false,
      dialogEchart_xw_province:false,
      dialogCt:false,
      classify:[{name:'全部','bg':true,'fa':true,id:-1}],
      third_card:[{name:'方案一','bg':false},{name:'方案二','bg':false},{name:'方案三','bg':false}],
      third_card_input:'',
      classify_input:'',
      tags:[],
      notags:[],
      kw:[],//关键词
      notkw:[],
      includeKeywords:[],
      excludeKeywords:[],
      dialog_type:'',//分类模态框名称
      classify_index:'',//分类index
      echarts_show:'',//图标的文章类型显示过滤
      more_data:'',
      dialog_xw_provinceMap:[],
      first_options:[],
      first_schemeId:'' ,
      second_options:[], 
      second_schemeId:'',
      wx_first_options:[],
      wx_first_schemeId:'' ,
      wx_second_options:[], 
      wx_second_schemeId:'',
      activeName:'first',
      activeName2:'first',
      activeName3:'first',
      xinwen_province_top:[],
      xinwen_province_top_size:'',
      wx_province_top:[],
      wx_province_top_size:'',
      wx_media_province_top:[],
      wx_media_province_top_size:'',
      edit:false,//时间控件的属性booleran
       styleData:[
            {'width':'16px','height':'16px','top':'150px','left':'160px'},
            {'width':'16px','height':'16px','top':'120px','left':'242px'},
            {'width':'16px','height':'16px','top':'190px','left':'232px'},
            {'width':'16px','height':'16px','top':'76px','left':'202px'},
            {'width':'16px','height':'16px','top':'222px','left':'192px'},
            {'width':'16px','height':'16px','top':'130px','left':'100px'},
            {'width':'16px','height':'16px','top':'230px','left':'126px'},
            {'width':'16px','height':'16px','top':'58px','left':'285px'},
            {'width':'16px','height':'16px','top':'224px','left':'298px'},
            {'width':'16px','height':'16px','top':'55px','left':'90px'}
          ],
      personSet:'',
      locationSet:'',
      orgSet:'',
      ct_size:'',
      ct_name:'',
      ct_url:'',
      ct_data:[],
      ct_data_list:[],
      currentPage_ct:1,
      page_size_ct:10,
      current_sort_loc:'5',
      current_sort_per:'5',
      current_sort_org:'5',
      dropdown_sort_num:['2','3','4','5','6','7','8','9','10'],
      renwuzuzhi_loading:false,
      dropdown_jushuNum:['1','2','3','5','全部'],
      current_jushuNum:3,
      loading_start:false
  	}
  },
  methods: {
    //通用methods
    //数据时间戳  时间格式
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
    //格式表格数据
    format_tabledata () {
      let newdata=[],
      pageNum=this.currentPage-1;
      for(let i=this.page_size*pageNum;i<this.page_size*pageNum+this.page_size;i++ ){
        this.data[i] !== undefined ? newdata.push(this.data[i]) : '' 
      }
      this.tabledata=newdata;       
    },
    // 通过筛选条件搜索数据 this保存的前提下(_this)
    search_data (jushu,proId,categoryId,articleType,mustIncludeKeywordList,anyIncludeKeywordList,notIncludeKeywordList,queryType,polar,timeType,startTime,endTime,echart,more_echarts,type_echarts) {
      if(jushu=='全部'){
        jushu=0;
      }
      let _this=this;   
      window.sessionStorage.setItem('list_time0',JSON.stringify(_this.time[0].getTime()));
      window.sessionStorage.setItem('list_time1',JSON.stringify(_this.time[1].getTime()));
      window.sessionStorage.setItem('list_articleType',JSON.stringify(_this.articleType));
      window.sessionStorage.setItem('list_queryType',JSON.stringify(_this.queryType));        
      $.ajax({
                url:'http://192.168.0.3:8080/rs/api/v1.1/project/'+123456+'/article',
                method:'GET',
                traditional:true,
                data:{
                  "method":"GET",
                  "proId":proId,//项目id  String 字符串
                  "categoryId":categoryId,//分类id  如果不是分类而是全部  则为 -1 
                  "articleType":articleType,//文章类型 （0全部  1 新闻   2 微信）
                  "mustIncludeKeywordList":mustIncludeKeywordList,//必须包含关键词的数组（集合）
                  "anyIncludeKeywordList":anyIncludeKeywordList,//包含任意关键词的数组（集合）
                  "notIncludeKeywordList":notIncludeKeywordList,//必须不包含关键词的数组（集合）
                  "queryType":queryType,//检索方式（0全文 1 仅标题）
                  "polar":polar,//文章调性 （-1负 0中 1正  2全部 ）
                  "timeType":timeType,//时间类型（0:发布时间     1:抓取时间）
                  "startTime":startTime,//开始时间
                  "endTime":endTime//截止时间  
                  },
                  success:function(data){
                    //console.log("成功回调函数-------------------")
                    _this.loading_start=false;
                    if(data.data==null||data.data.length<=0){
                      $('#table').css('display','none');
                      _this.data=[];
                      $('#loading_table').css('display','none');
                      $('#loading_echarts').html('');
                      _this.$message({
                            message: '木有数据哦',
                            type: 'warning'
                          });  
                    }else{
                      _this.data_write(data.data,echart,more_echarts,type_echarts);  
                    }
                   }
              });
    },
    data_write(data,echart,more_echarts,type_echarts){//获取数据后的遍历等操作
      let _this=this; 
            Map;
            function Sort(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value2 - value1;
                            }
                        };
            function Sort_down(property,c){
                return function(a,b){
                    var value1 = a[property][c];
                    var value2 = b[property][c];
                    return value2 - value1;
                }
              }             
            // 数据时间戳  时间格式
             _this.format_time (); 
            $('#table').css('display','block')
            $('.echarts_content').css('display','block')
            //时间降序
              for(let i=0;i<data.length;i++){
                data[i].article.publishTime=new Date(data[i].article.publishTime).getTime();  
              }
              data.sort(Sort_down('article','publishTime'));
              for(let i=0;i<data.length;i++){
                data[i].article.publishTime=new Date(data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");  
              }
              _this.data=data;
              _this.$store.state.list_Data=data;
              //初始表格数据
            let newdata=[];
            if(_this.data.length>12){
              for(let c=0;c<12;c++){
              newdata.push(_this.data[c])
              }
            }else{
              for(let c=0;c<_this.data.length;c++){
              newdata.push(_this.data[c]);                  
              }
            }
            _this.tabledata=newdata;
              //fix 右边固定数据
              _this.fix_data=data;
              let media_map=[];
              let media_map_xinwen=[];
              let media_map_wx=[];
               for(let i=0;i<_this.data.length;i++){
                media_map.push(_this.data[i].article.media);
                if(_this.data[i].article.articleType==1){
                  media_map_xinwen.push(_this.data[i].article.media)
                }else if(_this.data[i].article.articleType==2){
                  media_map_wx.push(_this.data[i].article.media)
                }
              }
              //console.log(media_map_xinwen)
              //console.log(media_map_wx)
              let media_map_data=media_map;
              let media_map_data_xinwen=media_map_xinwen;
              let media_map_data_wx=media_map_wx;
              _this.fix_media_size=media_map.length;//总个数
              _this.fix_media_xinwen_size=media_map_xinwen.length;//总个数
              _this.fix_media_wx_size=media_map_wx.length;//总个数
              let fix_map=new Map()//生成{媒体名称：个数} 的map
              let fix_map_xinwen=new Map()//生成{媒体名称：个数} 的map
              let fix_map_wx=new Map()//生成{媒体名称：个数} 的map
              for(let t=0;t<media_map_data.length;t++){
                  if(fix_map.get(media_map_data[t])==null){
                    fix_map.put(media_map_data[t],1)
                  }else{
                    fix_map.put(media_map_data[t],fix_map.get(media_map_data[t])+1)
                  }   
                }
              if(_this.articleType==0){
                  for(let t=0;t<media_map_data_xinwen.length;t++){
                  if(fix_map_xinwen.get(media_map_data_xinwen[t])==null){
                    fix_map_xinwen.put(media_map_data_xinwen[t],1)
                  }else{
                    fix_map_xinwen.put(media_map_data_xinwen[t],fix_map_xinwen.get(media_map_data_xinwen[t])+1)
                  }   
                };
                let media_map_arr_xinwen=[];
                let media_map_arr_big_xinwen=[];
                for(let k in fix_map_xinwen.data){
                  let obj={};
                  obj.name=k;
                  obj.num=fix_map_xinwen.data[k];
                  obj.fontbg=false;
                  media_map_arr_xinwen.push(obj)
                }
                media_map_arr_xinwen.sort(Sort('num'))
                if(media_map_arr_xinwen.length<10){
                  _this.fix_media_xinwen=media_map_arr_xinwen;
                }else{
                  for(let i=0;i<10;i++){
                    media_map_arr_big_xinwen.push(media_map_arr_xinwen[i])
                  }
                  _this.fix_media_xinwen=media_map_arr_big_xinwen;
                }
              
                for(let t=0;t<media_map_data_wx.length;t++){
                  if(fix_map_wx.get(media_map_data_wx[t])==null){
                    fix_map_wx.put(media_map_data_wx[t],1)
                  }else{
                    fix_map_wx.put(media_map_data_wx[t],fix_map_wx.get(media_map_data_wx[t])+1)
                  }   
                };
                let media_map_arr_wx=[];
                let media_map_arr_big_wx=[];
                for(let k in fix_map_wx.data){
                  let obj={};
                  obj.name=k;
                  obj.num=fix_map_wx.data[k];
                  obj.fontbg=false;
                  media_map_arr_wx.push(obj)
                }
                media_map_arr_wx.sort(Sort('num'))
                if(media_map_arr_wx.length<10){
                  _this.fix_media_wx=media_map_arr_wx;
                }else{
                  for(let i=0;i<10;i++){
                    media_map_arr_big_wx.push(media_map_arr_wx[i])
                  }
                  _this.fix_media_wx=media_map_arr_big_wx;
                }
              
              }
                let media_map_arr=[];
                let media_map_arr_big=[];
                for(let k in fix_map.data){
                  let obj={};
                  obj.name=k;
                  obj.num=fix_map.data[k];
                  obj.fontbg=false;
                  media_map_arr.push(obj)
                }
                media_map_arr.sort(Sort('num'))
                if(media_map_arr.length<10){
                  _this.fix_media=media_map_arr;
                }else{
                  for(let i=0;i<10;i++){
                    media_map_arr_big.push(media_map_arr[i])
                  }
                  _this.fix_media=media_map_arr_big;
                }
                
               /* console.log(_this.fix_media)                
                console.log(_this.fix_media_wx)                
                console.log(_this.fix_media_xinwen) */               
            //初始化总数据的publishTime转化
             let t=0;
            for(let i=0;i<_this.data.length;i++){
               _this.data[i].article.publishTime=new Date(_this.data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");
               //初始化数据的reprintList的publishTime转化
               if(_this.data[i].article.reprintList){
                for(let j=0;j<_this.data[i].article.reprintList.length;j++){
                  _this.data[i].article.reprintList[j].publishTime=new Date(_this.data[i].article.reprintList[j].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                  t++;
                }
               }
            }
             _this.reprintList_size=t;
            if(echart){
                _this.show_echarts()
              }
            if(more_echarts){
              _this.more_echarts()
            } 
            if(type_echarts){
              _this.type_echarts_xinwen();
              _this.type_echarts_wx();
            } 
    },
    write_polar (article_id,article_articleType,articlePolar,article_polar) {
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $.ajax ({
        url:'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/article/'+article_id,
        type:'POST',
        data:{
          "method":"POST", //http请求为 POST
          "articleType":article_articleType, //文章类型
          "modifiedPolar":article_polar //修改后的调性
        },
        success:function(data){
          //console.log("调性修改-----成功回调函数-------------------");
          //console.log(JSON.stringify(data));
          if(data.success==true){
            articlePolar.article.polar=article_polar;
            _this.diaoxing_visible=''
          }
          
        }
      });
    },
    hide_filter () {
      $('.filter').children().not('.filter_button').not('#filter_time').css('display','none');
      $('.filter').css('border-top','0px solid white')
      $('#hide_button').css('display','none');    
      $('#show_button').css('display','inline-block');
    },
    show_filter () {  
      $('.filter').children().not('.filter_button').not('#filter_time').css('display','inline-block');  
      $('hr').css('display','block')
      $('#div_tianbu').css('display','block')
      $('.filter').css('border-top','1px solid #dcdcdc')
      $('#hide_button').css('display','inline-block');    
      $('#show_button').css('display','none');           
    },
    search_start () {
      this.loading_start=true;
        //必须包含关键词回传数据 mustIncludeKeywordList
       let allkeyword=this.allkeyword;
       if(allkeyword){
        allkeyword=allkeyword.replace(/，/ig,','); //转化逗号
        this.mustIncludeKeywordList=allkeyword.split(',')
       }
       //包含任意关键词回传数据 anyIncludeKeywordList
       let keywordyoulike=this.keywordyoulike;
       if(keywordyoulike){
        keywordyoulike=keywordyoulike.replace(/，/ig,','); //转化逗号
        this.anyIncludeKeywordList=keywordyoulike.split(',')
       }
       //必须不包含关键词回传数据 notIncludeKeywordList
       let nokeyword=this.nokeyword;
       if(nokeyword){
        nokeyword=nokeyword.replace(/，/ig,','); //转化逗号
        this.notIncludeKeywordList=nokeyword.split(',')
       }
        //搜索开始
        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        this.data=[];
        $('#table').css('display','none'); 
        $('#loading_table').css('display','block');
        $('.echarts_content').css('display','none')
        this.search_data(this.current_jushuNum,project_id,-1,this.articleType,this.mustIncludeKeywordList,this.anyIncludeKeywordList,this.notIncludeKeywordList,this.queryType,this.polar_arr,0,this.time[0],this.time[1],true,true);
        this.mustIncludeKeywordList=null;
        this.anyIncludeKeywordList=null
        this.notIncludeKeywordList=null;
    },
    wuguan (a) {
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      //数据库删除
      let articleRecycleDtoList = [
          {
          "method":"post",
          "proId":project_id,
          "articleType":a.article.articleType,
          "articleId":a.article.id
          }
        ]
      $.ajax({
      url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleRecycleDtoList),
      success:function(data){
        if(data.success==true){
            //前台删除
            let oid=[];
            oid[0]=a.article.id;
            _this.data=_this.data.filter(item => { return oid.indexOf(item.article.id) === -1; }); 
            _this.$store.state.list_Data=_this.data;
            _this.format_tabledata();
          }
       }
      });
    },      
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page_size=val;
        this.format_tabledata();
        $('.main').css('height',80*(val-10)+1300+'px');//表格动态高度
        $('#item_table').css('height',$('.main').height()-410+'px')//表格动态高度
      },
    handleCurrentChange(val) {
      this.currentPage = val;
        this.format_tabledata();
      },
    del_third_card (i) {
      this.$confirm('是否删除'+' '+i.name+' '+'方案?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.third_card.splice(this.third_card.indexOf(i), 1);//shanchu
      }).catch(() => {        
      });
    },
    add_third_card () {
      $.each(this.third_card,function(i,j){
        j.bg=false;
      })
      this.dialogVisible = false;
      this.third_card.push({
        name:this.third_card_input ? this.third_card_input : '无名称',
        bg:true
      });
      this.third_card_input='';
    },
    toggleclass (i) {
      $.each(this.third_card,function(i,j){
        j.bg=false;
      })
      i.bg=true;
    },
    sort_dropdown (command) {
      this.current_sort=command;
    //时间格式
      this.format_time();
      //对象数组排序方法——升序
      function Sort(property,c){
          return function(a,b){
              var value1 = a[property][c];
              var value2 = b[property][c];
              return value1 - value2;
          }
        }
      //对象数组排序方法——降序
      function Sort_down(property,c){
          return function(a,b){
              var value1 = a[property][c];
              var value2 = b[property][c];
              return value2 - value1;
          }
        } 
      //时间降序  
      if(command=='时间降序'){
        for(let i=0;i<this.data.length;i++){
          this.data[i].article.publishTime=new Date(this.data[i].article.publishTime).getTime();  
        }
        this.data.sort(Sort_down('article','publishTime'));
        for(let i=0;i<this.data.length;i++){
          this.data[i].article.publishTime=new Date(this.data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");  
        }
      }
      //时间降序
      if(command=='时间升序'){
        for(let i=0;i<this.data.length;i++){
          this.data[i].article.publishTime=new Date(this.data[i].article.publishTime).getTime();  
        }
        this.data.sort(Sort('article','publishTime'));
        for(let i=0;i<this.data.length;i++){
          this.data[i].article.publishTime=new Date(this.data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");  
        }
      }
      //阅读数降序
      if(command=='阅读数降序'){
        this.data.sort(Sort_down('article','readCount'));
      }
      //阅读数升序
      if(command=='阅读数升序'){
        this.data.sort(Sort('article','readCount'));
      }
      //新闻指数降序
      if(command=='新闻指数降序'){
        this.data.sort(Sort_down('article','newsIndex'));
      }
      //新闻指数升序
      if(command=='新闻指数升序'){
        this.data.sort(Sort('article','newsIndex'));
      }
      //格式表格数据
      this.format_tabledata();
    },
    show_echarts (a) {
      $('#echarts_more_direction_xinwen').css('display','none')
       
      //多纬度input的val
      this.first_schemeId=[];
      this.second_schemeId=[];
      this.wx_first_schemeId=[];
      this.wx_second_schemeId=[];
      //初始化多维度下拉
      this.first_options=[];
      this.second_options=[];
      this.wx_first_options=[];
      this.wx_second_options=[];
      if(a){
        this.hide_filter();
      }  
      let _this=this;
      this.format_time();
      // 新闻微信数据过滤
      let newsData=[];//新闻数据
      let weixinData=[];//新闻数据
      for(let i=0;i<this.data.length;i++){
        if(this.data[i].article.articleType==1){
          newsData.push(this.data[i])
        }if(this.data[i].article.articleType==2){
          weixinData.push(this.data[i])
        }
      }
      //obj 格式
      Map;
      //生成 总数据对象
      let map=new Map();
      let wxmap=new Map();
      let wx_media_map=new Map();
      let newsIndex_map=new Map();//每小时的指数
      let newsIndex_max_map=new Map();//每天的指数
      //let newsIndex=new Map();
    //console.log(this.value1.getTime())
    //时间格式转化
       //判断时间 全部转化成每小时的数据
      let strat_time=this.time[0].getTime();
      while(strat_time<this.time[1].getTime()){
        var curTime = new Date(strat_time).Format("yyyy-MM-dd hh");
        newsIndex_map.put(curTime,0);
        strat_time=strat_time+3600000;
      }
      //遍历新闻数据
      for(let i=0;i<newsData.length;i++){
        //生成 新闻省份地域热图数据
        for(let j=0;j<newsData[i].provinceMap.length;j++){
          let province=newsData[i].provinceMap[j];  //获取新闻省
          if(map.get(province)==null){
            map.put(province,1)
          }else{
            map.put(province,map.get(province)+1)
          }   
        }

        //新闻发布时间格式转化 生成每小时的newsIndex_map
          let news_time=newsData[i].article.publishTime.slice(0,13);
          let news_newsIndex=newsData[i].article.newsIndex+newsIndex_map.get(news_time);
          newsIndex_map.put(news_time,news_newsIndex)
        // 新闻正负性数据
        let polar;
        if(newsData[i].article.polar==-1){
          polar='负'
        }else if(newsData[i].article.polar==0){
          polar='中'
        }else{
          polar='正'
        }
        if(map.get(polar)==null){
            map.put(polar,1)
          }else{
            map.put(polar,map.get(polar)+1)
          } 
      }
      //创建新闻走势图的横坐标与纵坐标数据
      var newsnumber_data=[];
      var newsnumber_xdata=[];
      //判断时间是否大于7天的
        if(this.time[1].getTime()-this.time[0].getTime()<604800000){
          //7天以内的数据数组newsnumber_data
            for(let z in newsIndex_map.data){
              newsnumber_data.push(newsIndex_map.data[z]);
              let z_time=z.slice(5,13)+':00';
              newsnumber_xdata.push(z_time);
             }
          }else{//时间大于7天的
                let strat_time=this.time[0].getTime();
                while(strat_time<this.time[1].getTime()){
                var curTime = new Date(strat_time).Format("yyyy-MM-dd");
                newsIndex_max_map.put(curTime,0);
                strat_time=strat_time+3600000*24;
              }
              //遍历时间为小时的map 叠加为每天的 生成每天的newsIndex_max_map
             for(let l in newsIndex_map.data){
                let Day_time= l.slice(0,10);
                newsIndex_max_map.put(Day_time,newsIndex_max_map.get(Day_time)+newsIndex_map.get(l))
             } 
             //7天以上的数据数组newsnumber_data
              for(let k in newsIndex_max_map.data){
                newsnumber_data.push(newsIndex_max_map.data[k]);
                //console.log(k)
                let k_time=k.slice(5,13)+' 08:00';
                newsnumber_xdata.push(k_time);
              }
          }
         console.log(newsnumber_data)
          console.log(newsnumber_xdata)
          /*console.log(newsIndex_map.data)
          console.log(newsIndex_max_map.data)*/
      //遍历微信数据
      for(let i=0;i<weixinData.length;i++){
        //生成 微信省份地域热图数据
        for(let j=0;j<weixinData[i].provinceMap.length;j++){
          let province=weixinData[i].provinceMap[j];  //获微信取省
          if(wxmap.get(province)==null){
            wxmap.put(province,1)
          }else{
            wxmap.put(province,wxmap.get(province)+1)
          }   
        }
        //生成 微信媒体省份地域热图数据
        for(let j=0;j<weixinData[i].mediaProvinceMap.length;j++){
           //console.log(weixinData[i])
          let media_province=weixinData[i].mediaProvinceMap[j];  //获取微信媒体省

          if(wx_media_map.get(media_province)==null){
            wx_media_map.put(media_province,1)
          }else{
            wx_media_map.put(media_province,wx_media_map.get(media_province)+1)
          }   
        }      
        // 微信正负性数据
        let polar;
        if(weixinData[i].article.polar==-1){
          polar='负'
        }else if(weixinData[i].article.polar==0){
          polar='中'
        }else{
          polar='正'
        }
        if(wxmap.get(polar)==null){
            wxmap.put(polar,1)
          }else{
            wxmap.put(polar,wxmap.get(polar)+1)
          } 
      }     
        //新闻省份地域热图数据生成数组对象格式
        let province = [];
        for( let l in map.data){
            let obj = new Object();
            if(l !== '正'&&l !== '中'&&l !== '负'){
               obj.province=l;
              obj.num=map.data[l];
              province.push(obj);
            }   
        } 
         //微信省份地域热图数据生成数组对象格式
        let wx_province = [];
        for( let l in wxmap.data){
            let obj = new Object();
            if(l !== '正'&&l !== '中'&&l !== '负'){
            obj.province=l;
            obj.num=wxmap.data[l];
            wx_province.push(obj);
           } 
        }  
         //微信媒体省份地域热图数据生成数组对象格式
        let media_province = [];
        for( let l in wx_media_map.data){
            let obj = new Object();
            if(l !== '正'&&l !== '中'&&l !== '负'){
            obj.media_province=l;
            obj.num=wx_media_map.data[l];
            media_province.push(obj);
          }
        }     
          //console.log(wxmap.data)      
        // top数组对象格式
        //新闻top
        let news_top = []; 
        for(let t=0;t<newsData.length;t++){
            let obj = new Object();
            obj.title=newsData[t].article.title;
            obj.num=newsData[t].article.newsIndex;
            obj.url=newsData[t].article.url;
            news_top.push(obj);
        }
        //微信top
        let weixin_top = []; 
        for(let t=0;t<weixinData.length;t++){
            let obj = new Object();
            obj.title=weixinData[t].article.title;
            obj.num=weixinData[t].article.readCount;
            obj.url=weixinData[t].article.url;
            weixin_top.push(obj);
        }
        //数组对象排序方法正序
        function Sort(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
        }
        //数组对象排序方法倒序
        function Sort_down(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value2 - value1;
          }
        }
        function Sort_top(property,c){
          return function(a,b){
              var value1 = a[property][c];
              var value2 = b[property][c];
              return value2 - value1;
          }
        } 
        //新闻省份地域热图数据排序
        province.sort(Sort('num'));
        //微信省份地域热图数据排序
        wx_province.sort(Sort('num'));
        //微信媒体省份地域热图数据排序
        media_province.sort(Sort('num'));
        console.log(media_province)
        //新闻top数据排序
        news_top.sort(Sort_down('num'));
       /*  console.log(news_top.length)*/
        //判断新闻top20有没有20个
        let news_top_data=[];  
        if(news_top.length<20){
          for( let i=0;i<news_top.length;i++){
            news_top_data.push(news_top[i]);
            //news_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }else{
          for( let i=0;i<20;i++){
            news_top_data.push(news_top[i])
            //news_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }
        //拿到20或者小于20个新闻数据后设置图标的展示数据
        let news_top_data_title=[];
        let news_top_data_num=[];
        for( let i=0;i<news_top_data.length;i++){
          news_top_data_num.push(news_top_data[i].num);
          news_top_data_title.push(news_top_data[i].title)
          news_top_data_num.sort(function(a,b){return a-b})
        }
        //微信top数据排序
        weixin_top.sort(Sort_down('num'));
        //判断微信top20有没有20个
        let weixin_top_data=[];              
        if(weixin_top.length<20){
          for( let i=0;i<weixin_top.length;i++){
            weixin_top_data.push(weixin_top[i]);
          }
        }else{
          for( let i=0;i<20;i++){
            weixin_top_data.push(weixin_top[i]);
          }
        }
        //拿到20或者小于20个微信数据后设置图标的展示数据
        let weixin_top_data_title=[];
        let weixin_top_data_num=[];
        for( let i=0;i<weixin_top_data.length;i++){
          weixin_top_data_num.push(weixin_top_data[i].num);
          weixin_top_data_title.push(weixin_top_data[i].title)
          weixin_top_data_num.sort(function(a,b){return a-b})
        }
          //地域热图开始 
      $.get('static/china.json', function (chinaJson) {
        echarts.registerMap('china', chinaJson);
        let echarts_hot_xinwen = echarts.init(document.getElementById('echarts_hot_xinwen'));
        let echarts_hot_weixin_article = echarts.init(document.getElementById('echarts_hot_weixin_article'));
        let echarts_hot__weixin_media = echarts.init(document.getElementById('echarts_hot__weixin_media'));
        echarts_hot_xinwen.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        /*console.log('地域热图一长度'+province.length)
        console.log('地域热图二长度'+media_province.length)
        console.log('地域热图三长度'+wx_province.length)*/
        if(province.length!=0){
          let option_hot_xinwen = {
             title: {
                    text: '新闻中地点出现的地域分布',
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
                    min: province[0].num,
                    max: province[province.length-1].num,
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
                        name: '新闻中地点出现的地域分布',
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
                            {name: '北京',value: map.get('北京') },
                            {name: '天津',value: map.get('天津') },
                            {name: '上海',value: map.get('上海') },
                            {name: '重庆',value: map.get('重庆') },
                            {name: '河北',value: map.get('河北') },
                            {name: '河南',value: map.get('河南') },
                            {name: '云南',value: map.get('云南') },
                            {name: '辽宁',value: map.get('辽宁') },
                            {name: '黑龙江',value: map.get('黑龙江') },
                            {name: '湖南',value: map.get('湖南') },
                            {name: '安徽',value: map.get('安徽') },
                            {name: '山东',value: map.get('山东') },
                            {name: '新疆',value: map.get('新疆') },
                            {name: '江苏',value: map.get('江苏') },
                            {name: '浙江',value: map.get('浙江') },
                            {name: '江西',value: map.get('江西') },
                            {name: '湖北',value: map.get('湖北') },
                            {name: '广西',value: map.get('广西') },
                            {name: '甘肃',value: map.get('甘肃') },
                            {name: '山西',value: map.get('山西') },
                            {name: '内蒙古',value: map.get('内蒙古') },
                            {name: '陕西',value: map.get('陕西') },
                            {name: '吉林',value: map.get('吉林') },
                            {name: '福建',value: map.get('福建') },
                            {name: '贵州',value: map.get('贵州') },
                            {name: '广东',value: map.get('广东') },
                            {name: '青海',value: map.get('青海') },
                            {name: '西藏',value: map.get('西藏') },
                            {name: '四川',value: map.get('四川') },
                            {name: '宁夏',value: map.get('宁夏') },
                            {name: '海南',value: map.get('海南') },
                            {name: '台湾',value: map.get('台湾') },
                            {name: '香港',value: map.get('香港') },
                            {name: '澳门',value: map.get('澳门') }
                        ]
                    }
                ]
          };
          echarts_hot_xinwen.hideLoading();
          echarts_hot_xinwen.setOption(option_hot_xinwen); 
          //新闻地图左侧top10
          let province_top_size_xinwen=0;
          for(let t=0;t<province.length;t++){
            province_top_size_xinwen+=province[t].num;
          }
          _this.xinwen_province_top_size=province_top_size_xinwen;
          province.sort(Sort_down('num'));
          if(province.length<10){
            _this.xinwen_province_top=province;
          }else{
            let arr=[];
            for(let i=0;i<10;i++){
              arr.push(province[i]);
            }
            _this.xinwen_province_top=arr;
          } 
        }else{
           $('#echarts_hot_xinwen').html(`<h4>新闻中地点出现的地域分布</h4><br><p>暂无数据</p>`)
        }
        echarts_hot_xinwen.on('click', function (params) {
          /*console.log(params.data.name);
           console.log(newsData)*/
           _this.dialogEchart_xw_province=true;
            _this.dialog_xw_provinceMap=[];
            for(let i=0;i<newsData.length;i++){
                if(newsData[i].provinceMap.indexOf(params.data.name)!==-1){
                  _this.dialog_xw_provinceMap.push(newsData[i])
                };
             };
        });

        echarts_hot_weixin_article.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        if(wx_province.length!=0){
         let option_hot_xinwen_article = {
           title: {
                  text: '微信中地点出现的地域分布',
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
                  min: wx_province[0].num,
                  max: wx_province[wx_province.length-1].num,
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
                      name: '微信中地点出现的地域分布',
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
                          {name: '北京',value: wxmap.get('北京') },
                          {name: '天津',value: wxmap.get('天津') },
                          {name: '上海',value: wxmap.get('上海') },
                          {name: '重庆',value: wxmap.get('重庆') },
                          {name: '河北',value: wxmap.get('河北') },
                          {name: '河南',value: wxmap.get('河南') },
                          {name: '云南',value: wxmap.get('云南') },
                          {name: '辽宁',value: wxmap.get('辽宁') },
                          {name: '黑龙江',value: wxmap.get('黑龙江') },
                          {name: '湖南',value: wxmap.get('湖南') },
                          {name: '安徽',value: wxmap.get('安徽') },
                          {name: '山东',value: wxmap.get('山东') },
                          {name: '新疆',value: wxmap.get('新疆') },
                          {name: '江苏',value: wxmap.get('江苏') },
                          {name: '浙江',value: wxmap.get('浙江') },
                          {name: '江西',value: wxmap.get('江西') },
                          {name: '湖北',value: wxmap.get('湖北') },
                          {name: '广西',value: wxmap.get('广西') },
                          {name: '甘肃',value: wxmap.get('甘肃') },
                          {name: '山西',value: wxmap.get('山西') },
                          {name: '内蒙古',value: wxmap.get('内蒙古') },
                          {name: '陕西',value: wxmap.get('陕西') },
                          {name: '吉林',value: wxmap.get('吉林') },
                          {name: '福建',value: wxmap.get('福建') },
                          {name: '贵州',value: wxmap.get('贵州') },
                          {name: '广东',value: wxmap.get('广东') },
                          {name: '青海',value: wxmap.get('青海') },
                          {name: '西藏',value: wxmap.get('西藏') },
                          {name: '四川',value: wxmap.get('四川') },
                          {name: '宁夏',value: wxmap.get('宁夏') },
                          {name: '海南',value: wxmap.get('海南') },
                          {name: '台湾',value: wxmap.get('台湾') },
                          {name: '香港',value: wxmap.get('香港') },
                          {name: '澳门',value: wxmap.get('澳门') }
                      ]
                  }
              ]
          };
          echarts_hot_weixin_article.hideLoading();
          echarts_hot_weixin_article.setOption(option_hot_xinwen_article); 
          //w微信地图左侧top10
          let province_top_size_wx=0;
          for(let t=0;t<wx_province.length;t++){
            province_top_size_wx+=wx_province[t].num;
          }
          _this.wx_province_top_size=province_top_size_wx;
          wx_province.sort(Sort_down('num'));
          if(wx_province.length<10){
            _this.wx_province_top=wx_province;
          }else{
            let arr=[];
            for(let i=0;i<10;i++){
              arr.push(wx_province[i]);
            }
            _this.wx_province_top=arr;
          } 
        }else{
          $('#echarts_hot_weixin_article').html(`<h4>微信中地点出现的地域分布</h4><br><p>暂无数据</p>`)
        }
        echarts_hot_weixin_article.on('click', function (params) {
           _this.dialogEchart_xw_province=true;
            _this.dialog_xw_provinceMap=[];
            console.log(weixinData)
            for(let i=0;i<weixinData.length;i++){
                if(weixinData[i].provinceMap.indexOf(params.data.name)!==-1){
                  _this.dialog_xw_provinceMap.push(weixinData[i])
                };
             };
        })
        echarts_hot__weixin_media.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        if(media_province.length!=0){
           let option_hot_xinwen_media = {
             title: {
                    text: '微信文章发布媒体所在地域分布',
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
                    min: media_province[0].num,
                    max: media_province[media_province.length-1].num,
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
                        name: '微信文章发布媒体所在地域分布',
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
                            {name: '北京',value: wx_media_map.get('北京') },
                            {name: '天津',value: wx_media_map.get('天津') },
                            {name: '上海',value: wx_media_map.get('上海') },
                            {name: '重庆',value: wx_media_map.get('重庆') },
                            {name: '河北',value: wx_media_map.get('河北') },
                            {name: '河南',value: wx_media_map.get('河南') },
                            {name: '云南',value: wx_media_map.get('云南') },
                            {name: '辽宁',value: wx_media_map.get('辽宁') },
                            {name: '黑龙江',value: wx_media_map.get('黑龙江') },
                            {name: '湖南',value: wx_media_map.get('湖南') },
                            {name: '安徽',value: wx_media_map.get('安徽') },
                            {name: '山东',value: wx_media_map.get('山东') },
                            {name: '新疆',value: wx_media_map.get('新疆') },
                            {name: '江苏',value: wx_media_map.get('江苏') },
                            {name: '浙江',value: wx_media_map.get('浙江') },
                            {name: '江西',value: wx_media_map.get('江西') },
                            {name: '湖北',value: wx_media_map.get('湖北') },
                            {name: '广西',value: wx_media_map.get('广西') },
                            {name: '甘肃',value: wx_media_map.get('甘肃') },
                            {name: '山西',value: wx_media_map.get('山西') },
                            {name: '内蒙古',value: wx_media_map.get('内蒙古') },
                            {name: '陕西',value: wx_media_map.get('陕西') },
                            {name: '吉林',value: wx_media_map.get('吉林') },
                            {name: '福建',value: wx_media_map.get('福建') },
                            {name: '贵州',value: wx_media_map.get('贵州') },
                            {name: '广东',value: wx_media_map.get('广东') },
                            {name: '青海',value: wx_media_map.get('青海') },
                            {name: '西藏',value: wx_media_map.get('西藏') },
                            {name: '四川',value: wx_media_map.get('四川') },
                            {name: '宁夏',value: wx_media_map.get('宁夏') },
                            {name: '海南',value: wx_media_map.get('海南') },
                            {name: '台湾',value: wx_media_map.get('台湾') },
                            {name: '香港',value: wx_media_map.get('香港') },
                            {name: '澳门',value: wx_media_map.get('澳门') }
                        ]
                    }
                ]            
          }
          echarts_hot__weixin_media.hideLoading();
          echarts_hot__weixin_media.setOption(option_hot_xinwen_media);
          //w微信地图左侧top10
          let province_top_size_wx_media=0;
          for(let t=0;t<media_province.length;t++){
            province_top_size_wx_media+=media_province[t].num;
          }
          _this.wx_media_province_top_size=province_top_size_wx_media;
          media_province.sort(Sort_down('num'));
          if(media_province.length<10){
            _this.wx_media_province_top=media_province;
          }else{
            let arr=[];
            for(let i=0;i<10;i++){
              arr.push(media_province[i]);
            }
            _this.wx_media_province_top=arr;
          } 
          console.log(_this.wx_media_province_top)
        }else{
          $('#echarts_hot__weixin_media').html(`<h4>微信文章发布媒体所在地域分布</h4><br><p>暂无数据</p>`)
        }
         echarts_hot__weixin_media.on('click', function (params) {
         _this.dialogEchart_xw_province=true;
          _this.dialog_xw_provinceMap=[];
          for(let i=0;i<weixinData.length;i++){
              if(weixinData[i].mediaProvinceMap.indexOf(params.data.name)!==-1){
                _this.dialog_xw_provinceMap.push(weixinData[i])
              };
           };
          })   
        })   
          //地域热图结束
          // top20 开始
        let echarts_top_xinwen = echarts.init(document.getElementById('echarts_top_xinwen')); 
        let echarts_top_weixin = echarts.init(document.getElementById('echarts_top_weixin'));
        echarts_top_xinwen.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        if(news_top_data.length!=0){
          let option_top_xinwen ={
                    title: {
                        text: '新闻指数top20'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {   
                        return `新闻标题：${news_top_data_title[news_top_data_title.length-1-(params[0].dataIndex)]}; 新闻指数：${news_top_data_num[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: ['新闻']
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
                    data: news_top_data_num
                },
                series: [
                    {
                        name: '新闻',
                        type: 'bar',
                        data: news_top_data_num
                    }
                ]
            }
            echarts_top_xinwen.hideLoading();
            echarts_top_xinwen.setOption(option_top_xinwen);
        }else{
            $('#echarts_top_xinwen').html(`<h4>新闻指数top20</h4><br><p>暂无数据</p>`)
        } 
        echarts_top_xinwen.on('click', function (params) {
          window.open(news_top_data[news_top_data.length-1-(params.dataIndex)].url);
          })  
        echarts_top_weixin.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        //console.log(weixin_top_data)
        if(weixin_top_data.length!=0){
              let option_top_weixin ={
                    title: {
                      text: '微信阅读数top20'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {                                 
                        return `标题：${weixin_top_data_title[weixin_top_data_title.length-1-(params[0].dataIndex)]};  阅读数：${weixin_top_data_num[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: ['微信']
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
                    data: weixin_top_data_num
                },
                series: [
                    {
                        name: '微信',
                        type: 'bar',
                        data: weixin_top_data_num
                    }
                ]
            } 
          echarts_top_weixin.hideLoading();
          echarts_top_weixin.setOption(option_top_weixin);
          }else{
             $('#echarts_top_weixin').html(`<h4>微信阅读数top20</h4><br><p>暂无数据</p>`)
          }
          echarts_top_weixin.on('click', function (params) {
             window.open(weixin_top_data[weixin_top_data.length-1-(params.dataIndex)].url);
          }) 
        // top20 结束
        //媒体声量top10 开始
        let xinwen_top_media_data_num=[];
        let xinwen_top_media_data_name=[];
        if(_this.fix_media_xinwen.length!=0){
          for(let i=0;i<_this.fix_media_xinwen.length;i++){
            xinwen_top_media_data_num.push(_this.fix_media_xinwen[i].num);
            xinwen_top_media_data_name.push(_this.fix_media_xinwen[i].name);
          }
        }
          xinwen_top_media_data_num.sort(function(a,b){return a-b;})
        let echarts_top_media_xinwen = echarts.init(document.getElementById('echarts_top_media_xinwen')); 
        echarts_top_media_xinwen.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        if(_this.fix_media_xinwen.length!=0){
          let option_top_media_xinwen ={
                    title: {
                        text: '新闻媒体声量top10'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {   
                        return `媒体名称：${xinwen_top_media_data_name[params[0].dataIndex]}; 数量：${xinwen_top_media_data_num[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: ['新闻']
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
                    data: xinwen_top_media_data_name.reverse()
                },
                series: [
                    {
                        name: '新闻',
                        type: 'bar',
                        data: xinwen_top_media_data_num,
                        label: {
                            normal: {
                            show: true,
                            position: 'insideRight'
                             }
                          }
                    }
                ]
            }
            echarts_top_media_xinwen.hideLoading();
            echarts_top_media_xinwen.setOption(option_top_media_xinwen);
        }else{
            $('#echarts_top_media_xinwen').html(`<h4>新闻媒体声量top10</h4><br><p>暂无数据</p>`)
        } 
        echarts_top_media_xinwen.on('click', function (params) {
             _this.dialogEchart_xw_province=true;
            _this.dialog_xw_provinceMap=[];
            for(let i=0;i<newsData.length;i++){
                if(newsData[i].article.media===params.name){
                  _this.dialog_xw_provinceMap.push(newsData[i])
                };
             };
          }) 
        //微信
        let weixin_top_media_data_num=[];
        let weixin_top_media_data_name=[];
        if(_this.fix_media_wx.length!=0){
          for(let i=0;i<_this.fix_media_wx.length;i++){
            weixin_top_media_data_num.push(_this.fix_media_wx[i].num);
            weixin_top_media_data_name.push(_this.fix_media_wx[i].name);
          }
        }
        weixin_top_media_data_num.sort(function(a,b){return a-b;})
        let echarts_top_media_weixin = echarts.init(document.getElementById('echarts_top_media_weixin')); 
        echarts_top_media_weixin.showLoading({
            text: 'loading',
            color: '#c23531',
            textColor: '#000',
            maskColor: 'snow'
        });
        if(_this.fix_media_wx.length!=0){
          let option_top_media_weixin ={
                    title: {
                        text: '微信媒体声量top10'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function (params, ticket, callback) {   
                        return `媒体名称：${weixin_top_media_data_name[params[0].dataIndex]}; 数量：${weixin_top_media_data_num[params[0].dataIndex]} <br/>`                                                                 
                    }
                },
                legend: {
                    data: ['微信']
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
                    data: weixin_top_media_data_name.reverse()
                },
                series: [
                    {
                        name: '微信',
                        type: 'bar',
                        data: weixin_top_media_data_num,
                        label: {
                            normal: {
                            show: true,
                            position: 'insideRight'
                             }
                          }
                    }
                ]
            }
            echarts_top_media_weixin.hideLoading();
            echarts_top_media_weixin.setOption(option_top_media_weixin);
        }else{
            $('#echarts_top_media_weixin').html(`<h4>微信媒体声量top10</h4><br><p>暂无数据</p>`)
        } 
          echarts_top_media_weixin.on('click', function (params) {
             _this.dialogEchart_xw_province=true;
            _this.dialog_xw_provinceMap=[];
            for(let i=0;i<weixinData.length;i++){
                if(weixinData[i].article.media===params.name){
                  _this.dialog_xw_provinceMap.push(weixinData[i])
                };
             };
          })
        //媒体声量top10 结束
        //正负性开始
        let echarts_diaoxing_xinwen = echarts.init(document.getElementById('echarts_diaoxing_xinwen')); 
        let echarts_diaoxing_weixin = echarts.init(document.getElementById('echarts_diaoxing_weixin')); 
         echarts_diaoxing_xinwen.showLoading({
              text: 'loading..',
              color: '#c23531',
              textColor: '#000',
              maskColor: 'snow'
          });
        if(newsData.length!=0){
            let option_diaoxing_xinwen = {
                    title : {
                    text: '新闻正负性对比分析',
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
                            {value:map.get('正'), name:'正面'},
                            {value:map.get('中'), name:'中面'},
                            {value:map.get('负'), name:'负面'}
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
            }
            echarts_diaoxing_xinwen.hideLoading();
            echarts_diaoxing_xinwen.setOption(option_diaoxing_xinwen);
        }else{
          $('#echarts_diaoxing_xinwen').html(`<h4>新闻正负性对比分析</h4><br><p>暂无数据</p>`)
        }
        echarts_diaoxing_xinwen.on('click', function (params) {
          let polar;
          if(params.name==='中面'){
            polar=0;
          }else if(params.name==='负面'){
            polar=-1;
          }else {
            polar=1;
          }
         _this.dialogEchart_xw_province=true;
         _this.dialog_xw_provinceMap=[];
          for(let i=0;i<newsData.length;i++){
                if(newsData[i].article.polar===polar){
                  _this.dialog_xw_provinceMap.push(newsData[i])
                };
             };
          }) 
        echarts_diaoxing_weixin.showLoading({
              text: 'loading',
              color: '#c23531',
              textColor: '#000',
              maskColor: 'snow'
          });
        if(weixinData.length!=0){
            let option_diaoxing_weixin = {
                  title : {
                  text: '微信正负性对比分析',
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
                          {value:wxmap.get('正'), name:'正面'},
                          {value:wxmap.get('中'), name:'中面'},
                          {value:wxmap.get('负'), name:'负面'}
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
          } 
          echarts_diaoxing_weixin.hideLoading();
          echarts_diaoxing_weixin.setOption(option_diaoxing_weixin);
        }else{
          $('#echarts_diaoxing_weixin').html(`<h4>微信正负性对比分析</h4><br><p>暂无数据</p>`)
        }              
        echarts_diaoxing_weixin.on('click', function (params) {
          let polar;
          if(params.name==='中面'){
            polar=0;
          }else if(params.name==='负面'){
            polar=-1;
          }else {
            polar=1;
          }
         _this.dialogEchart_xw_province=true;
         _this.dialog_xw_provinceMap=[];
          for(let i=0;i<weixinData.length;i++){
                if(weixinData[i].article.polar===polar){
                  _this.dialog_xw_provinceMap.push(weixinData[i])
                };
             };
          })  
        //正负性结束
        //新闻指数开始
         let echarts_newsnumber = echarts.init(document.getElementById('echarts_newsnumber')); 
         let  option_newsnumber = {
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
                    data: newsnumber_xdata
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'新闻指数',
                        type:'line',
                        stack: '总量',
                        data:newsnumber_data
                    }
                ]
            };
        echarts_newsnumber.setOption(option_newsnumber);
        echarts_newsnumber.on('click', function (params) {
           _this.dialogEchart_xw_province=true;
           _this.dialog_xw_provinceMap=[];
           let arr=[]
          if(_this.time[1].getTime()-_this.time[0].getTime()<604800000){
            for(let i=0;i<newsData.length;i++){
                if(new Date(newsData[i].article.publishTime).getTime()>new Date(new Date().getFullYear()+'-'+newsnumber_xdata[params.dataIndex]).getTime()&&new Date(newsData[i].article.publishTime).getTime()<new Date(new Date().getFullYear()+'-'+newsnumber_xdata[params.dataIndex+1]).getTime()){
                  arr.push(newsData[i])
                }
             };
          }else{
            for(let i=0;i<newsData.length;i++){
                if(new Date(newsData[i].article.publishTime).getTime()>new Date(new Date().getFullYear()+'-'+newsnumber_xdata[params.dataIndex].slice(0,5)+' 00:00').getTime()&&new Date(newsData[i].article.publishTime).getTime()<new Date(new Date().getFullYear()+'-'+newsnumber_xdata[params.dataIndex+1].slice(0,5)+' 00:00').getTime()){
                  arr.push(newsData[i])
                }
             };
          }
           arr.sort(Sort_top('article','newsIndex'));
           _this.dialog_xw_provinceMap=arr;
          }) 
      //多维度分析开始
      let more_newsData=[];//新闻数据
      let more_weixinData=[];//微信数据
      for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.articleType==1){
            more_newsData.push(this.data[i])
          }if(this.data[i].article.articleType==2){
            more_weixinData.push(this.data[i])
          } 
      }
      /*console.log(this.data)
      console.log(more_weixinData)*/
      //判断新闻数据
      if(more_newsData.length==0){
        console.log('新闻数据 0');
      }else{
        for(let i=0;i<more_newsData[0].article.newsSchemeDtoList.length;i++){
          let fisrt_obj=new Object();
          fisrt_obj.schemeId=more_newsData[0].article.newsSchemeDtoList[i].schemeId;
          fisrt_obj.schemeName=more_newsData[0].article.newsSchemeDtoList[i].schemeName;
          this.first_options.push(fisrt_obj)
          this.second_options.push(fisrt_obj)
        }
        this.first_schemeId=this.first_options[0].schemeId;
      }
      //判断微信数据
      if(more_weixinData.length==0){
        console.log('微信数据 0');
      }else{
        for(let i=0;i<more_weixinData[0].article.wxSchemeDtoList.length;i++){
          let fisrt_obj=new Object();
          fisrt_obj.schemeId=more_weixinData[0].article.wxSchemeDtoList[i].schemeId;
          fisrt_obj.schemeName=more_weixinData[0].article.wxSchemeDtoList[i].schemeName;
          this.wx_first_options.push(fisrt_obj)
          this.wx_second_options.push(fisrt_obj)
        }
        console.log(this.wx_first_options)
        this.wx_first_schemeId=this.wx_first_options[0].schemeId;
      };
    },
    renwuzuzhi_search () {
      this.renwuzuzhi_loading=true;
       let _this=this;
      function Sort(property){
          return function(a,b){
              var value1 = a[property];
              var value2 = b[property];
              return value1 - value2;
          }
        }
      _this.personSet=[];
      _this.locationSet=[];
      _this.orgSet=[];
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $.ajax({
        url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/entity",
        type:"GET",
        data:{
          "method":"GET",
          "proId":project_id,
          "startTime":_this.time[0],//开始时间
           "endTime":_this.time[1],
           "articleType":2,
           "perNum":_this.current_sort_per,
           "locNum":_this.current_sort_loc,
           "orgNum":_this.current_sort_org,
           "topicNum":1//议题数量
        },
        success:function(data){
          _this.renwuzuzhi_loading=false;
          console.log(data.data)
          for(let z=0;z<data.data.length;z++){
            if(data.data[z].locList){
              data.data[z].locList.sort(Sort('count'));
              if(data.data[z].locList.length>10){
                data.data[z].locList=data.data[z].locList.slice(0,10);
              }
            }
            if(data.data[z].orgList){
              data.data[z].orgList.sort(Sort('count'));
              if(data.data[z].orgList.length>10){
                data.data[z].orgList=data.data[z].orgList.slice(0,10);
              }
            }
            if(data.data[z].perList){
              data.data[z].perList.sort(Sort('count'));
              if(data.data[z].perList.length>10){
                data.data[z].perList=data.data[z].perList.slice(0,10);
              }
            }
          }
          _this.personSet=data.data.perList;
          _this.locationSet=data.data.locList;
          _this.orgSet=data.data.orgList;
        }
      });
    },
    hide_echarts () {
      this.show_filter();
      this.first_options=[];
      this.second_options=[];
      this.wx_first_options=[];
      this.wx_second_options=[];
    },
    more_echarts () {   
      //obj 格式
      Map;
      console.log(this.first_schemeId)
      console.log(this.second_schemeId)
      //判断方案是否一致
      if(this.first_schemeId===this.second_schemeId){
        this.$message({
              message: '请检查您的方案格式',
              type: 'warning'
            });
        return
      }else{
        $('#echarts_more_direction_xinwen').css('display','block')
        let x_data=[];//横坐标
        let y_data=[];//纵坐标
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.newsSchemeDtoList!=null){
            for(let j=0;j<this.data[i].article.newsSchemeDtoList.length;j++){
              //横坐标判定
              if(this.data[i].article.newsSchemeDtoList[j].schemeId==this.first_schemeId){
                x_data.push(this.data[i].article.newsSchemeDtoList[j].newsMediaCategory.newsMediaCategoryName)
              }
              //纵坐标判定
              if(this.data[i].article.newsSchemeDtoList[j].schemeId==this.second_schemeId){
                y_data.push(this.data[i].article.newsSchemeDtoList[j].newsMediaCategory.newsMediaCategoryName)
              }
            }
          }else{}    
        }
        console.log(x_data)
        //坐标去重
        x_data = Array.from(new Set(x_data))
        y_data = Array.from(new Set(y_data))
        //生成{党媒:[为维护与已维护数组],门户:[为维护与已维护数组]}的bar_data_map MAP
        let bar_data_map=new Map(); 
        let bar_arr=new Array();     
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.newsSchemeDtoList!=null){
            for(let j=0;j<this.data[i].article.newsSchemeDtoList.length;j++){
              for(let t=0;t<x_data.length;t++){
                if(this.data[i].article.newsSchemeDtoList[j].newsMediaCategory.newsMediaCategoryName===x_data[t]){              
                   //console.log(x_data[t]);
                  for(let c=0;c<this.data[i].article.newsSchemeDtoList.length;c++){
                    for(let k=0;k<y_data.length;k++){
                      if(this.data[i].article.newsSchemeDtoList[c].newsMediaCategory.newsMediaCategoryName===y_data[k]){
                        if(bar_data_map.get(x_data[t])==null){  
                            bar_arr=[];
                            bar_arr.push(y_data[k])
                            bar_data_map.put(x_data[t],bar_arr)
                          }else{
                            let aa=bar_data_map.get(x_data[t]);
                            aa.push(y_data[k])   
                            bar_data_map.put(x_data[t],aa)   
                          }
                        //console.log(y_data[k]);
                      }
                    }
                  }   
                }
              }
            }
          }else{}    
        }
        //根据echarts数据格式计算相对应的已维护与为维护数组
        let more_map=new Map();
        let more_arr=new Array(); 
        console.log(bar_data_map.data)
        for(let i in bar_data_map.data){
          //计算bar_data_map的为维护与已维护个数叠加 map
          let bar_map = new Map();
          for(let j=0;j<bar_data_map.data[i].length;j++){
            if(bar_map.get(bar_data_map.data[i][j])==null){
              bar_map.put(bar_data_map.data[i][j],1)
            }else{
              bar_map.put(bar_data_map.data[i][j],bar_map.get(bar_data_map.data[i][j])+1)
            }
          }  
          console.log(bar_map.data)
          for(let t in bar_map.data){
            if(more_map.get(t)==null){
              more_arr=[];
              more_arr.push(bar_map.data[t])
              more_map.put(t,more_arr)
            }else{
              let aa=more_map.get(t);
              //console.log(aa)
              aa.push(bar_map.data[t])   
              //console.log(aa); 
              more_map.put(t,aa)  
            }
          }   
        }
        //echarts的series格式
        let bar_series=[];
        for(let i in more_map.data){
          let obj=new Object();
          obj.name=i;
          obj.type='bar';
          obj.stack='广告';
          obj.data=more_map.data[i];
          bar_series.push(obj)
        }
        console.log(bar_series)
        console.log(more_map.data)
        console.log(x_data)
        console.log(y_data)
        $('.echarts_content').css('display','block')
        //多维度分析开始
        let echarts_more_direction_xinwen = echarts.init(document.getElementById('echarts_more_direction_xinwen'));
        let  option_more_direction = {
           tooltip : {
              trigger: 'axis',
              axisPointer : {            
                  type : 'shadow'        
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
                    data : x_data
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : bar_series
         }
         echarts_more_direction_xinwen.setOption(option_more_direction);
      }
    },
    type_echarts_xinwen () {
       let _this=this;
      Map;
      function Sort(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                          }
      let newsData=[];//新闻数据
      for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.articleType==1){
            newsData.push(this.data[i])
          } 
      };
      console.log(newsData)
      let xinwen_arr=[];
      for(let i=0;i<newsData.length;i++){
          if(newsData[i].article.newsSchemeDtoList!=null){
            for(let j=0;j<newsData[i].article.newsSchemeDtoList.length;j++){
            if(newsData[i].article.newsSchemeDtoList[j].schemeId==this.first_schemeId){
                xinwen_arr.push(newsData[i].article.newsSchemeDtoList[j].newsMediaCategory.newsMediaCategoryName)
              }
          }
        }  
       } 
       let type_xinwen_map=new Map();
       for(let j=0;j<xinwen_arr.length;j++){
          if(type_xinwen_map.get(xinwen_arr[j])==null){
            type_xinwen_map.put(xinwen_arr[j],1)
          }else{
            type_xinwen_map.put(xinwen_arr[j],type_xinwen_map.get(xinwen_arr[j])+1)
          }   
        }
        let xinwen_data=[];
      for(let i in type_xinwen_map.data){
        let obj={};
        obj.value=type_xinwen_map.data[i];
        obj.name=i;
        xinwen_data.push(obj)
      }
      xinwen_data.sort(Sort('value'));
      let echarts_type_xinwen=echarts.init(document.getElementById('echarts_type_xinwen'));
      if(xinwen_data.length!=0){
        let option_echarts_type_xinwen={
          backgroundColor: '#2c343c',
          title: {
              text: '新闻媒体类型分析',
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
                  data:xinwen_data,
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
        }
        echarts_type_xinwen.setOption(option_echarts_type_xinwen);
      }else{
        $('#echarts_type_xinwen').html(`<h4>新闻类型分析</h4><br><p>暂无数据</p>`)
      }
      echarts_type_xinwen.on('click', function (params) {
        _this.dialogEchart_xw_province=true;
        _this.dialog_xw_provinceMap=[];
        for(let i=0;i<newsData.length;i++){
          if(newsData[i].article.newsSchemeDtoList!=null){
            for(let j=0;j<newsData[i].article.newsSchemeDtoList.length;j++){
            if(newsData[i].article.newsSchemeDtoList[j].newsMediaCategory.newsMediaCategoryName===params.data.name){
                _this.dialog_xw_provinceMap.push(newsData[i])
                    }
                }
              }  
             }  
          }) 
    },
    type_echarts_wx() {
      let _this=this;
      Map;
      function Sort(property){
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                          }
      let wxData=[];//新闻数据
      for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.articleType==2){
            wxData.push(this.data[i])
          } 
      };
      let wx_arr=[];
      for(let i=0;i<wxData.length;i++){
          if(wxData[i].article.wxSchemeDtoList!=null){
            for(let j=0;j<wxData[i].article.wxSchemeDtoList.length;j++){
            if(wxData[i].article.wxSchemeDtoList[j].schemeId==this.wx_first_schemeId){
                wx_arr.push(wxData[i].article.wxSchemeDtoList[j].wxMediaCategory.wxMediaCategoryName)
              }
          }
        }  
       } 
       let type_wx_map=new Map();
       for(let j=0;j<wx_arr.length;j++){
          if(type_wx_map.get(wx_arr[j])==null){
            type_wx_map.put(wx_arr[j],1)
          }else{
            type_wx_map.put(wx_arr[j],type_wx_map.get(wx_arr[j])+1)
          }   
        }
        let wx_data=[];
      for(let i in type_wx_map.data){
        let obj={};
        obj.value=type_wx_map.data[i];
        obj.name=i;
        wx_data.push(obj)
      }
      wx_data.sort(Sort('value'));
      console.log(wx_data)
      let echarts_type_wx=echarts.init(document.getElementById('echarts_type_wx'));
      if(wx_data.length!=0){
        let option_echarts_type_wx={
          backgroundColor: '#2c343c',
          title: {
              text: '微信媒体类型分析',
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
                  data:wx_data,
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
        }
        echarts_type_wx.setOption(option_echarts_type_wx);
      }else{
        $('#echarts_type_wx').html(`<h4>微信类型分析</h4><br><p>暂无数据</p>`)
      }
      echarts_type_wx.on('click', function (params) {
        _this.dialogEchart_xw_province=true;
        _this.dialog_xw_provinceMap=[];
        for(let i=0;i<wxData.length;i++){
          if(wxData[i].article.wxSchemeDtoList!=null){
            for(let j=0;j<wxData[i].article.wxSchemeDtoList.length;j++){
            if(wxData[i].article.wxSchemeDtoList[j].wxMediaCategory.wxMediaCategoryName===params.data.name){
                _this.dialog_xw_provinceMap.push(wxData[i])
                    }
                }
              }  
             }  
          }) 
    },
    more_echarts_wx() {
      Map;
      console.log(this.wx_first_schemeId)
      console.log(this.wx_second_schemeId)
      //判断方案是否一致
      if(this.wx_first_schemeId===this.wx_second_schemeId){
        this.$message({
              message: '请检查您的方案格式',
              type: 'warning'
            });
        return
      }else{
        $('#echarts_more_direction_wx').css('display','block')
        let x_data=[];//横坐标
        let y_data=[];//纵坐标
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.wxSchemeDtoList!=null){
            for(let j=0;j<this.data[i].article.wxSchemeDtoList.length;j++){
              //横坐标判定
              if(this.data[i].article.wxSchemeDtoList[j].schemeId==this.wx_first_schemeId){
                x_data.push(this.data[i].article.wxSchemeDtoList[j].wxMediaCategory.wxMediaCategoryName)
              }
              //纵坐标判定
              if(this.data[i].article.wxSchemeDtoList[j].schemeId==this.wx_second_schemeId){
                y_data.push(this.data[i].article.wxSchemeDtoList[j].wxMediaCategory.wxMediaCategoryName)
              }
            }
          }else{}    
        }
        //坐标去重
        x_data = Array.from(new Set(x_data))
        y_data = Array.from(new Set(y_data))
        //生成{党媒:[为维护与已维护数组],门户:[为维护与已维护数组]}的bar_data_map MAP
        let bar_data_map=new Map(); 
        let bar_arr=new Array();     
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].article.wxSchemeDtoList!=null){
            for(let j=0;j<this.data[i].article.wxSchemeDtoList.length;j++){
              for(let t=0;t<x_data.length;t++){
                if(this.data[i].article.wxSchemeDtoList[j].wxMediaCategory.wxMediaCategoryName===x_data[t]){              
                   //console.log(x_data[t]);
                  for(let c=0;c<this.data[i].article.wxSchemeDtoList.length;c++){
                    for(let k=0;k<y_data.length;k++){
                      if(this.data[i].article.wxSchemeDtoList[c].wxMediaCategory.wxMediaCategoryName===y_data[k]){
                        if(bar_data_map.get(x_data[t])==null){  
                            bar_arr=[];
                            bar_arr.push(y_data[k])
                            bar_data_map.put(x_data[t],bar_arr)
                          }else{
                            let aa=bar_data_map.get(x_data[t]);
                            aa.push(y_data[k])   
                            bar_data_map.put(x_data[t],aa)   
                          }
                        //console.log(y_data[k]);
                      }
                    }
                  }   
                }
              }
            }
          }else{}    
        }
        //根据echarts数据格式计算相对应的已维护与为维护数组
        let more_map=new Map();
        let more_arr=new Array(); 
        console.log(bar_data_map.data)
        for(let i in bar_data_map.data){
          //计算bar_data_map的为维护与已维护个数叠加 map
          let bar_map = new Map();
          for(let j=0;j<bar_data_map.data[i].length;j++){
            if(bar_map.get(bar_data_map.data[i][j])==null){
              bar_map.put(bar_data_map.data[i][j],1)
            }else{
              bar_map.put(bar_data_map.data[i][j],bar_map.get(bar_data_map.data[i][j])+1)
            }
          }  
          console.log(bar_map.data)
          for(let t in bar_map.data){
            if(more_map.get(t)==null){
              more_arr=[];
              more_arr.push(bar_map.data[t])
              more_map.put(t,more_arr)
            }else{
              let aa=more_map.get(t);
              //console.log(aa)
              aa.push(bar_map.data[t])   
              //console.log(aa); 
              more_map.put(t,aa)  
            }
          }   
        }
        //echarts的series格式
        let bar_series=[];
        for(let i in more_map.data){
          let obj=new Object();
          obj.name=i;
          obj.type='bar';
          obj.stack='广告';
          obj.data=more_map.data[i];
          bar_series.push(obj)
        }
        console.log(bar_series)
        console.log(more_map.data)
        console.log(x_data)
        console.log(y_data)
        $('.echarts_content').css('display','block')
        //多维度分析开始
        let echarts_more_direction_wx = echarts.init(document.getElementById('echarts_more_direction_wx'));
        let  option_more_direction = {
           tooltip : {
              trigger: 'axis',
              axisPointer : {            
                  type : 'shadow'        
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
                    data : x_data
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : bar_series
         }
         echarts_more_direction_wx.setOption(option_more_direction);
      }
    },
    handleClose(tag) {
        this.kw.splice(this.kw.indexOf(tag), 1);
        this.tags.unshift(tag)
    },
    nothandleClose(tag) {
        this.notkw.splice(this.notkw.indexOf(tag), 1);
        this.notags.unshift(tag)
    },
    kw_dropdown (command) {
      this.kw.push(command);
      this.tags.splice(this.tags.indexOf(command), 1)
    },
    notkw_dropdown (command) {
      this.notkw.push(command);
      this.notags.splice(this.notags.indexOf(command), 1)
    },
    sort_dropdown_per (command) {
        this.current_sort_per=command;
    },
    sort_dropdown_loc (command) {
      this.current_sort_loc=command;
    },
    sort_dropdown_org(command) {
      this.current_sort_org=command;
    },
    dialog_ReprintList (a) {
      this.dialogReprintList=true;
      this.reprintList_id=a.article.id;
      let reprintList_arr=[];
      reprintList_arr.push(a.article);
      reprintList_arr=reprintList_arr.concat(a.article.reprintList);
      this.reprintList_data=reprintList_arr;
    },
    Selection(val) {
        this.selection = val;
    },
    Changerow (val) {
      this.currentRow = val;
    },
    selectable(row, index){
      if(index!==0){
        return true;
      }
    },
    del_reprintList () {
      let _this=this;
      //获取combineErrorList
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let combineErrorList=[];
      console.log(this.selection)
      for(let i=0;i<this.selection.length;i++){
        let obj=new Object();
        obj.method='POST';
        obj.proId=project_id;
        obj.articleType=this.selection[i].articleType;
        obj.fatherId=this.reprintList_id;
        obj.articleId=this.selection[i].id;
        combineErrorList.push(obj);
      }
      $.ajax({
        url:'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/article/combineError',
        type:'POST',
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify(combineErrorList),
        success:function(data){
          if(data.success==true){
            //前端删除
            let idarr=[];
            for(let t=0;t<_this.selection.length;t++){
              idarr.push(_this.selection[t].id)
            }
            for(let i=0;i<_this.data.length;i++){
              if(_this.data[i].article.id==_this.reprintList_id){
                _this.data[i].article.reprintList= _this.data[i].article.reprintList.filter(item => { return idarr.indexOf(item.id) === -1; });
              }
            }
            _this.reprintList_data=_this.reprintList_data.filter(item => { return idarr.indexOf(item.id) === -1; });
            _this.$refs.table.clearSelection(_this.selection);  
          }       
        }
      }); 
      
    },
    dialog_Recycle () {
      this.recycle_data=[];
      this.dialog_recycle=true;
      //数据库数据
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let articleRecycleDtoList =[
       {
        "method":"GET",
        "proId":project_id
        }
      ]
      console.log(JSON.stringify(articleRecycleDtoList))
      $.ajax({
      url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleRecycleDtoList),
      success:function(data){
          if(data.data==null||data.data.length<=0){
            _this.$message({
                message: '木有数据哦',
                type: 'warning'
              });
             $('#loading_recycle').css('display','none')
          }else{
            _this.recycle_data=data.data;
            // 数据时间戳  时间格式
              _this.format_time ();
            //初始化总数据的publishTime转化
            for(let i=0;i< _this.recycle_data.length;i++){
                _this.recycle_data[i].article.publishTime=new Date( _this.recycle_data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");
             }
          }       
        }    
      }); 
    },
    Selection_recycle(val) {
        this.selection_recycle = val;
    },
    Changerow_recycle(val) {
      this.currentRow_recycle = val;
    },
    recovery_recycle () {
      let _this=this;
      //获取articleDtoList
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let articleDtoList=[];
      for(let i=0;i<this.selection_recycle.length;i++){
        let obj=new Object();
        obj.method="DELETE";
        obj.proId=project_id;
        obj.articleType=this.selection_recycle[i].article.articleType;
        obj.articleId=this.selection_recycle[i].article.id;
        articleDtoList.push(obj);
      }
      $.ajax({
      url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleDtoList),
      success:function(data){
        if(data.success==true){
            //前台删除以及总数据添加
            let idarr=[];
            _this.data=_this.selection_recycle.concat(_this.data);
            _this.format_tabledata();
            for(let t=0;t<_this.selection_recycle.length;t++){
                idarr.push(_this.selection_recycle[t].article.id)
             }
            _this.recycle_data=_this.recycle_data.filter(item => { return idarr.indexOf(item.article.id) === -1; });
            _this.$refs.table.clearSelection(_this.selection_recycle);
         }
        }
      });       
    },
    Mover(a){
      this.$refs.list[a].style.boxShadow='7px 7px 6px rgba(220,220,220,.6)'
      this.$refs.del_img[a].style.display='inline-block'
    }, 
    Mout(a){
      this.$refs.list[a].style.boxShadow=''
      this.$refs.del_img[a].style.display='none'
    },
    Mover_articleList (i) {
        this.$refs.dialog_xw_articlelist[i].style.color="#00a17c"
      },
    Mout_articleList (i) {
        this.$refs.dialog_xw_articlelist[i].style.color="rgb(72,87,106)"
      },
      date_change (){
        Date.prototype.toJSON = function () { return this.toLocaleString(); }
        if(this.time[0]==undefined||this.time[1]==undefined||this.time[1].getTime()<this.time[0].getTime()){
          this.time=[new Date(new Date().getTime()-604800000), new Date()];
          this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }
      },
    dropdown_jushu(command){
      this.current_jushuNum=command
    },
    ct_click(i,n){
      console.log(i)
      window.open(i.linkedUrl)
      },
      click_ct_list(i){
         window.open(i.article.url)
      },
      Mover_ct_list(i){
        this.$refs.ct_list[i].style.color="#00a17c"
      },
      Mout_ct_list(i) {
        this.$refs.ct_list[i].style.color="#999"
      },
      handleCurrentChange_ct (val) {
        this.currentPage_ct= val;
        let newdata=[],
        pageNum=this.currentPage_ct-1;
        for(let i=this.page_size_ct*pageNum;i<this.page_size_ct*pageNum+this.page_size_ct;i++ ){
          this.ct_data[i] !== undefined ? newdata.push(this.ct_data[i]) : '' 
        }
        this.ct_data_list=newdata
      },    
  },
  watch: {
    queryType (curVal,oldVal) {
      console.log(curVal,oldVal);
    }
  }
}
</script>

<style lang="scss" >
  .list{
    #dialog_ct{
      #page_ct{
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
    button:hover{
        opacity: 0.8;
      }  
    #steps{
      .el-step__line{
        border-color: #bfcbd9;
      }
      .el-step{
        height: 70px !important;
      }
    } 
    position: relative;
    .fa-times{
      color:red;
      cursor: pointer;
      font-size: 15px !important;
    }
    .fa-pencil{
      color:blue;
      cursor: pointer
    }
    .filter{
      .el-date-editor--datetime{
        input{
          height: 23px !important;
        }
       }
      background-color: #f7f7f7;
      border:1px solid #dcdcdc ;
      #filter_time{
        input{
          height: 28px;
        }
        .btn{
          color:  black;
          background-color: #f7f7f7;
          border-color: #f7f7f7; 
        }
        .warning{
          color:  #00b38a;
          background-color: #f7f7f7;
          border-color: #f7f7f7;
        }
      }
      .filter_button{
        position:absolute;
        left:60%;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        padding:1px 12px;
      }
      #show_button{
        display: none;
      }
    }
    .btn-group{  
      .btn{
        width: 56px;
        line-height: 1.2;
        outline: none;
      }
      .polar{
        color: #333;
        background-color: #fff;
        border-color: #ccc;
      }
      .warning{
        color: #fff;
        background-color: #00b38a;
        border-color: #00b38a;
      }
      #filter_sort_dropdown{
        padding-left:15px;
        font-size:12px;
        margin-top: -14px;
        button:hover{
          color:#00b38a;
          border: 1px solid #00b38a;
        }
        button:focus{
          color:#00b38a;
          border: 1px solid #00b38a;
        }
      }
      width:100%;
      button{
        padding:3px 8px;
        margin-left: 2% !important;
        border-radius: 4px !important;
      }
      .el-input--small{
        width:45% !important;
        margin-top: -14px;
        height: 16px;
        >input{
        height:25px !important;
        }
      }
    }
    hr{
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .animated{
      transform-origin:50px 9px 0 !important;
    }
    .carousel>.carousel-indicators li{
      //filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#00FFFAFA ,endcolorstr=#00FFFAFA ); 
      display: none;
    }

    .carousel>.carousel-indicators .active{
      //-ms-filter:alpha(opacity=0);
      display: block !important;
     transition: all 1s;
    }
    #carousel-example-generic{
       /*     左边分类数据-css start */ 
      .left_type{
        border:none;
        width:3%;
        border-right:0;
        padding: 20px 0 0 0;
        ul{
          .bgcolor{
            background: #00b38a;
            border-color:#00b38a;
            color:white !important;
          }
          margin:0 1px 0 0;
          border:none;
          li:hover i{
            display: inline-block ;
          }
        }
        ul li{
          opacity: 1;
          padding: 2px 0 10px 2px;
          word-wrap: break-word; 
          letter-spacing: 3px;
          text-align: center;
          cursor:pointer;
          .display{
            display: none !important;
          }
          p i{
            float: left;
            font-size: 13px;
            margin-left: 1px;
            line-height: 13px;
            display: none;
          }
        }
        ul>li:first-child{
          padding: 6px 0  8px 2px;
          p{
            display: none;
          }
        }
      }
      /*     左边分类数据-css end */ 
    }
    .carousel-inner .el-checkbox .el-checkbox_inner{
      width:15px;
      height:15px;
    }
    table tr th{
      text-align: center;
    }
    .carousel-caption{
     /*  artcle css strat */
     #table {
      #keyword_div{
        text-align: left;
        span{
          font-size: 14px;
          display: inline-block;
          margin:8px 0 0 10px;
          padding: 1px 3px;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
        }
        span:nth-child(4n+1){
          color:#00b38a;
        }
        span:nth-child(4n+2){
          color:#3498db;
        }
        span:nth-child(4n+3){
          color:#f6a623;
        }
        span:nth-child(4n+4){
          color:#fc5128;
        }
      }
      #bottom_dev{
        .reprintList{
          :hover{
            color:#00b38a;
          }
        }
      }
      #list_dropdown{
        .el-radio-group{
          .is-checked{
            .check_zheng{
              border-color: rgb(0, 179, 138); background: rgb(0, 179, 138);
            }
            .check_zhong{
              border-color: rgb(153, 153, 153); background: rgb(153, 153, 153);
            }
            .check_fu{
              border-color: #fc5128; background: #fc5128;
            }
          }
        }
      }
     }
     /*  artcle css end */
       /*     分页-css start */
      .el-pagination{
        margin: 10px auto 0 auto; 
        display: inline-block;
        ul>li{
          opacity: 1;
        }
        .el-pager .active {
          border-color: #00b38a;
          background-color: #00b38a;
        }
      } 
      /*     分页-css end */      
      width:100%;left:0px;right:0px;top:20px;
      text-shadow: none;
      color:rgba(0,0,0,1);
       /*     表格数据-css end */
    /*   图表 -css start */
      .el-button{
        padding: 7px 15px;
      }
      .second_card{
        .el-button-group :nth-child(1){
          button{
            background-color:rgb(32,160,255);
            border-color:rgb(32,160,255);
            color:white;
          }
        }
        button{
          border-radius: 4px !important;
          margin-left: 2px;
        }
      }
      .echarts_content{
        #echarts-user_defind_mdeia{
          .el-tabs__nav{
            float: none;
            .el-tabs__active-bar{
              left:43.5%;
            }
          }
        }
        #echarts-more_direction{
            .el-input{
              width: 80%;
            }
          .el-input__inner{
              height: 28px !important;
            }
          .el-button--success{
            padding: 5px 8px;
            margin-left: -10px;
          } 

        }
        #echarts-hot{
          #echarts_hot_xinwen{
            margin-top: 15px;
          }
          >div{
             margin: 8px 0% 0 10%;
             height:380px;
          }
        }
        #echarts-renwuzuzhi{
          #panel{
           padding-bottom: 10px;
           >.panel{
            border-color: #ebebeb;
            .panel-heading{
              border-color: #ebebeb;
            }
            .panel-body{
              padding: 5px;
              height: 300px;
              position: relative;
              border-color: #ebebeb;
              .person{
                width: 66px;
                height: 66px;
                border-radius: 50%;
                background-color: #76e9f4 ;
                position: absolute;
                top: 121px;
                left: 175px;
                text-align: center;
                line-height: 66px;
                z-index: 5;
              }
              .line_first{
                width: 136px;
                height: 136px;
                border-radius: 50%;
                background-color: rgba(118, 233, 244,.4);
                position: absolute;
                top: 84px;
                left: 140px;
                z-index: 4;
              }
              .line_second{
                width: 206px;
                height: 206px;
                border-radius: 50%;
                background-color: rgba(118, 233, 244,.4);
                position: absolute;
                top: 48px;
                left: 104px;
                z-index: 3;
              }
              .line_last{
                width: 276px;
                height: 276px;
                border-radius: 50%;
                background-color: rgba(118, 233, 244,.3);
                position: absolute;
                top: 14px;
                left: 68px;
                z-index: 3;
              }
              .ct{
                position: absolute;
                background-color: #fec330;
                border-radius: 50%;
                border: 1px solid white;
                z-index: 99;
                cursor: pointer;
              }
            }
           }
          }
        }
        >div{
          position: absolute;
            >div{
            margin:15px 10% 0 10%;
            width:900px;
            height: 450px;
            border: 1px solid rgb(240,240,240);
            transition: all 1s;
            .third_card{
              position: relative;
              .el-button-group{
                position: absolute;
                left:60px;
                .bgcolor{
                  background-color:#20a0ff !important;
                  border-color:#20a0ff !important;
                  color:white !important;
                  }
                >button{
                  position: relative;
                  .fa-times{
                    position: absolute;
                    top:0;
                    right: 0;
                    display: none;
                  }
                }
                >button:hover .fa-times{
                  display: inline-block;
                }
              }
            }
          }
        }
        .opa{
          opacity: 1;
          z-index: 999;
        }
        .nopa{
          opacity: 0;
          z-index: 0;
        }
      }
    /*   图表 -css end */
    }
    .el-dialog__wrapper{
      .form-horizontal{
        .kwcontent{
          border: 1px solid #ccc;
          border-radius:4px;
          padding:0px 4px;
          width:80%;
          cursor:text;
          margin-top: 7px;
          >.el-tag{
            margin-left: 3px;
            margin-top: 3px;
            background: rgb(50,168,128)
          }
        }
      }
    }
    .dialogList{
      .el-table__empty-text{
        display: none;
      }
      .el-dialog--small{
        width: 62%;
      }
      .el-dialog__body{
        padding: 5px 20px;
        /*    表格头部 */
         thead{
          th{
            height:25px;
          }
          th>.cell{
            padding: 0;
            text-align: center;
            .el-checkbox__inner{
              width:14px;
              height:14px;     
            }
            label{
              margin:0;
            }
            .caret-wrapper{
            margin: 0;
            }
          }
         }
       /*    表格内部 */ 
       tbody{
        .current-row{
          color: #ccc !important;
          background-color: #ccc !important;
        }
        .cell{
          text-align: center;
          padding: 0;
        }
        tr{
          height:25px;
        }
        .el-table-column--selection>.cell{
          padding: 0;
          text-align: center;
          .el-checkbox{
            margin:0;
            .el-checkbox__inner{
              width:14px;
              height:14px;
            }
          }
         }
        }  
      }
    }
  }
#map_right{
  .el-tabs__active-bar{
      background-color:rgb(110, 187, 243) ;
  }
  .is-active{
     color:rgb(110, 187, 243) ;
  }
  .el-tabs{
    .el-tabs__content{
      li{
        float: left;
        margin-left: 10px;
        list-style: none;
        color: #666666;
        margin-bottom: 4px;
        cursor: pointer;
      }
      #fixed_mediaName{
        .fontscolor{
          color:#6ebbf3 !important;
        }
        .el-tabs--card{
          .is-active{
            border-bottom-color:rgb(242,242,242);
          }
        }
      }
    }
    .el-tabs__header{
      margin-bottom: 8px;
    }
  }
} 
</style>