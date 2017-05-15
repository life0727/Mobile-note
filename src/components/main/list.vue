<template>
  <div class="list" style="padding:0 10px;">
    <div class="filter">
    <!-- 监测时间 start -->
  	   <div class="btn-group" role="group" aria-label="..." style="margin-top:20px;" id="filter_time" >
          <button class="btn btn-default filter_name" style="border:none;background: snow;">监测时间：</button>
          <button class="btn btn-default warning"  @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</button>
          <button class="btn btn-default " @click="time=[new Date(new Date().getTime()-86400000), new Date()]">一天</button>
          <button class="btn btn-default " @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</button>
          <div class="block" style="padding-left:35%;" >
            <el-date-picker v-model="time" type="datetimerange" placeholder="选择日期时间" style="float: left;margin-top:-5px;width:330px;"></el-date-picker>
          </div>
          <el-button type="success" size="large" style="margin-top:-2px;margin-left:4% !important;padding:3px 18px;display: none;" id="search_top" @click="search_start">搜索</el-button>
       </div>
       <hr>
    <!-- 监测时间 end -->
    <!-- 类型 start -->
       <div class="btn-group" role="group" aria-label="..." >
          <button class="btn btn-default filter_name" style="border:none;background: snow;width:76px;">文章类型：</button>
          <button class="btn btn-default warning" @click="echarts_show=0;articleType=0">全部</button>
          <button class="btn btn-default" @click="echarts_show=1;articleType=1">新闻</button>
          <button class="btn btn-default" @click="echarts_show=2;articleType=2">微信</button>
       </div>
       <hr>  
    <!-- 类型 end -->
    <!-- 文章调性 start -->
        <div class="btn-group" role="group" aria-label="..." id="polar">
          <button class="btn btn-default filter_name" style="border:none;background: snow;" >文章调性：</button>
          <button  :class="polar_arr.length==3 ? 'btn polar warning' : 'btn polar'" id="filter_polar_all">全部</button>
          <button class="btn polar warning" v-for="i in polar">{{i}}</button>
       </div>
       <hr>  
    <!-- 文章调性 end -->
    <!-- 关键词位置 start -->
        <div class="btn-group" role="group" aria-label="..." >
          <button class="btn btn-default filter_name" style="border:none;background: snow;">检索位置：</button>
          <button class="btn btn-default warning" style="margin-left:2.0% !important;" @click="queryType=0">全文</button>
          <button class="btn btn-default" @click="queryType=1">仅标题</button>
          <button class="btn btn-default filter_name" style="border:none;background: snow;margin-left:30%;">排序方式：</button>
              <el-dropdown id="filter_sort_dropdown" @command="sort_dropdown">
                    <el-button>{{current_sort}}<i class="el-icon-caret-bottom el-icon--right"></i></el-button>                  
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="i in dropdown_sort" :command="i">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
              </el-dropdown> 
       </div>
       <hr>   
    <!-- 关键词位置 end -->
    <!-- 包含关键词 start -->
        <div class="btn-group " role="group" aria-label="...">
          <div style="display: inline-block;width:28%;">
            <button  class="btn btn-default filter_name" style="border:none;background: snow;margin-left:2px;">包含以下全部关键词：</button>
            <el-input v-model="allkeyword" placeholder="多个关键词以逗号分割" size="small"></el-input>
          </div>  
          <div style="display: inline-block;width:28%;">
            <button  class="btn btn-default filter_name" style="border:none;background: snow;margin-left:2px;">包含以下任一关键词：</button>
            <el-input v-model="keywordyoulike" placeholder="多个关键词以逗号分割" size="small"></el-input>  
          </div> 
          <div style="display: inline-block;width:28%;">
            <button  class="btn btn-default filter_name" style="border:none;background: snow;margin-left:2px;">不包含以下关键词：</button>
            <el-input v-model="nokeyword" placeholder="多个关键词以逗号分割" size="small"></el-input>  
          </div>                 
       </div>
       <hr>  
    <!-- 包含关键词 end -->
        <el-button type="success" size="large" class="search_start" @click="search_start">搜索</el-button>
        <button  class="btn btn-default filter_button"  id="hide_button" @click="hide_filter">隐藏筛选条件<i class="fa fa-chevron-up" style="margin-left:5px;"></i></button>
        <button  class="btn btn-default filter_button" id="show_button"  @click="show_filter">显示筛选条件<i class="fa fa-chevron-down" style="margin-left:5px;"></i></button>
      </div> 
      <hr style="border-color:green;margin-top:5%;">
    <!-- 信息显示与图表部分start  --> 
      <div id="carousel-example-generic" class="carousel slide" style="position:relative;">
          <ol class="carousel-indicators" style="width:100%;left:0;margin-left:0;top:0px;height:10px;">
            <li class="active"><img data-target="#carousel-example-generic" data-slide-to="1" src="../../assets/pic.jpg" style="cursor:pointer;width:83px;height:21px;position:absolute;right:10px;" @click="show_echarts"></li>
            <li ><img data-target="#carousel-example-generic" data-slide-to="0" src="../../assets/img/table.jpg" style="cursor:pointer;width:84px;height:20px;position:absolute;left:2px;" ></li>
          </ol>
          <div class="col-xs-1 left_type" >
                <ul class="list-group">
                    <li class="list-group-item" v-for="(i,$index) in classify" :class="{bgcolor:i.bg}" @click="classify_toggleclass(i)">
                      <p style="height:13px;margin-bottom:0;"><i class="fa fa-pencil" @click.stop="write(i,$index)" :class="{display:i.fa}"></i><i class="fa fa-times" @click.stop="del_classify(i)" :class="{display:i.fa}"></i></p>
                        {{i.name}}
                    </li>
                    </li>
                    <li class="list-group-item" style="color:white;font-size:30px;background-color:rgb(74,179,255);border-color:rgb(74,179,255);"@click="addClassify">+</li>
                </ul>
          </div> <!-- 左边侧栏——分类 -->
          <div class="carousel-inner " role="listbox" style="width: 97%;">
          <div class="item active"  id="item_table" style="height:1250px">
            <div class="carousel-caption"  >
<!--      主要信息table start -->       
            <p v-loading="this.data.length==0" element-loading-text="系统拼命加载中..." style="top:200px;" id="loading_table"></p>
              <div style="padding: 0;"><!-- 右边table -->
                <table width="100%" border="1" cellspacing="0" cellpadding="0" style="opacity:.8;border-color:#ccc;" id="table">        
                  <tr >
                    <th width="2%"></th>
                    <th width="" >标题</th>
                    <th width="6.5%">位置标记</th>
                    <th width="4%">转发</th>
                    <th width="14%">包含关键词</th>
                    <th width="9%">媒体名称</th>
                    <th width="11%">发布时间</th>
                  </tr>
                  <tr style="padding:0;" v-for="(a,$index) in tabledata" scope="scope">
                    <td>{{($index+1)+(currentPage-1)*page_size}}</td>
                    <td style="height:74px;">
                      <p class="work_type" v-show="a.article.articleType==0">全部</p>  <!-- 文章分类 -->
                      <p class="work_type" v-show="a.article.articleType==1">新闻</p>  <!-- 文章分类 -->
                      <p class="work_type" v-show="a.article.articleType==2">微信</p>  <!-- 文章分类 -->
                      <p class="title" ><b><a :href="a.article.url" target="_blank">{{a.article.title}}</a></b></p>
                      <div class="title_bottom">
                        <div><i class="fa fa-th-list"></i><span>{{a.article.category}}</span></div>
                        <div><i class="fa fa-eye"></i><span>{{a.article.readCount}}</span></div>
                        <div><i class="fa fa-bar-chart"></i><span>{{a.article.newsIndex}}</span></div>
                        <div><i class="fa fa-thumbs-o-up"></i><span>{{a.article.likeCount}}</span></div>
                        <div><i class="fa fa-user"></i><span style="font-size:12px;margin-left: 3%;">{{a.article.author}}</span></div>
                        <div>
                          <!--  调性弹出框  strat -->
                          <el-popover trigger="click" placement="top"  :disabled="diaoxing_visible">
                           <p>设置文章调性为:</p>
                           <div>
                              <el-button style="padding:2px 10px;" type="success" ref="btn" @click="zheng(a)">正</el-button>
                              <el-button style="padding:2px 10px;background:gray;color:white;border-color:gray"  @click="zhong(a)">中</el-button>
                              <el-button style="padding:2px 10px;" type="danger" @click="fu(a)">负</el-button>                           
                            </div>
                            <div slot="reference" class="name-wrapper">
                              <el-button type="danger" v-show="a.article.polar==-1" @click="diaoxing_visible=false">负 </el-button>
                              <el-button class="mid"  v-show="a.article.polar==0" @click="diaoxing_visible=false">中</el-button>
                              <el-button type="success" v-show="a.article.polar==1" @click="diaoxing_visible=false">正</el-button>
                            </div>                       
                          </el-popover>                           
                          <el-button type="danger" @click="wuguan(a)">无关</el-button>  
                         <!--  调性弹出框  end -->                        
                       </div>
                      </div>
                    </td>
                    <td>
                      <p v-show="a.article.locationLevel==1">普通新闻</p>
                      <p v-show="a.article.locationLevel==2">频道首页</p>
                      <p v-show="a.article.locationLevel==3">频道要闻</p>
                      <p v-show="a.article.locationLevel==4">站点首页</p>
                      <p v-show="a.article.locationLevel==5">站点要闻</p>
                    </td>
                    <td><p style="color:#337ab7;cursor:pointer" @click="dialog_ReprintList(a)">{{a.article.reprintList== 0 ? '' : a.article.reprintList.length}}</p></td>
                    <td ><span v-for="b in a.includeKeywordList">{{b}}&nbsp;&nbsp;</span></td>
                    <td>{{a.article.media}}</td>
                    <td>{{a.article.publishTime}}</td>
                  </tr>
                </table>
                <!-- 回收站 strart -->
                <el-button type="info" icon="delete2" style="float:left;margin-top: 10px" @click="dialog_Recycle" v-show="this.data.length!==0">回收站</el-button>
               <!--  回收站 end -->
     <!--    分页 strart -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[ 15, 20, 25]"
                    :page-size="page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.data.length"
                    v-show="this.data.length!==0">
                </el-pagination>
     <!--    分页 end -->                  
              </div>           
<!--      主要信息table end -->
            </div>          
          </div>
     <!-- 信息显示与图表部分start -->
          <div class="item" style="height:1300px;">
            <div class="carousel-caption">
            <!--  二级选项卡 start -->
              <div class="second_card">
                <el-button-group>
                  <a href="javascript:;"><el-button id="btn_hot">地域热图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_top">top20</el-button></a>
                  <a href="javascript:;"><el-button id="btn_diaoxing">正负性对比图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_newsnumber">新闻指数走势图</el-button></a>
                  <a href="javascript:;"><el-button id="btn_user_defind_mdeia" :disabled="true">自定义媒体分析</el-button></a>
                  <a href="javascript:;"><el-button id="btn_more_direction" :disabled="true">多维度分析</el-button></a>
                </el-button-group>
              </div>  
            <!--  二级选项卡 end-->
           <!--  echarts-图 strat -->
              <div class="echarts_content">
                <div class="opa" id="echarts-hot">
                  <div id="echarts_hot_xinwen" v-show="echarts_show==0||echarts_show==1"></div>
                  <div id="echarts_hot_weixin_article" v-show="echarts_show==0||echarts_show==2" ></div>
                  <div id="echarts_hot__weixin_media" v-show="echarts_show==0||echarts_show==2"></div>
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
                  <h1>我是自定义媒体分析</h1>
                  <div class="third_card">
                    <el-button-group>
                      <el-button v-for="i in third_card" :class="{bgcolor:i.bg}" @click="toggleclass(i)">{{i.name}}<i class="fa fa-times" @click.stop="del_third_card(i)"></i></el-button>
                      <el-button id="third_card_add" type="primary" icon="plus" @click="dialogVisible = true"></el-button>
                    </el-button-group>
                  </div>

                </div>
                <div class="nopa" id="echarts-more_direction">
                  <h1>我是多维度分析</h1>
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

     <!--    添加分类模态框 -start -->
      <el-dialog :title="dialog_type" v-model="classify_dialog" size="tiny" ref="dia">
        <form class="form-horizontal">
        <div class="form-group" style="margin-bottom: 28px;">
          <label for="name" class="col-sm-2 control-label" style="text-align: center;">分类名：</label>
          <div >
            <input type="text" class="col-sm-10 kwcontent"  v-model="classify_input" placeholder="分类名" @keyup.enter="add_classify">
          </div> 
        </div>
        </form>     
        <form class="form-horizontal">
          <div class="form-group">
            <label for="kw" class="col-sm-2 control-label" style="text-align: center;font-weight: none;">关键词：</label>
            <div class="col-sm-10 kwcontent"  >
              <el-tag
                  :key="tag"
                  v-for="tag in kw"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(tag)"
                >
                {{tag}}
              </el-tag>
              <el-dropdown  @command="kw_dropdown" style="height:21px;width:100px;">
                <span id="dropdown_start" style="cursor: pointer;"><b>选择关键词</b><i class="fa fa-angle-down" style="font-size: 16px;margin-left: 3px;"></i></span>                  
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="i in tags" :command="i">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
              </el-dropdown>
            </div>     
          </div>  
        </form> 
        <form class="form-horizontal">
          <div class="form-group">
            <label for="kw" class="col-sm-2 control-label" style="text-align: center;font-weight: none;">排除词：</label>
            <div class="col-sm-10 kwcontent"  >
              <el-tag style="background: rgb(237,99,84)"
                  :key="tag"
                  v-for="tag in notkw"
                  :closable="true"
                  :close-transition="false"
                  @close="nothandleClose(tag)"
                >
                {{tag}}
              </el-tag>
              <el-dropdown  @command="notkw_dropdown" style="height:21px;width:100px;">
                <span id="dropdown_start" style="cursor: pointer;"><b>选择排除词</b><i class="fa fa-angle-down" style="font-size: 16px;margin-left: 3px;"></i></span>                  
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="i in notags" :command="i">{{i}}</el-dropdown-item>
                    </el-dropdown-menu>
              </el-dropdown>
            </div>     
          </div>  
        </form> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="classify_dialog = false">取 消</el-button>
          <el-button v-show="this.dialog_type=='添加分类'" type="primary" @click="add_classify" >确 定</el-button>
          <el-button v-show="this.dialog_type=='编辑分类'" type="primary" @click="write_classify()" >确 定</el-button>
        </span>
      </el-dialog>
    <!--    添加分类模态框 -end -->

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
                  <span v-for="i in scope.row.keywordList">{{i}}&nbsp;&nbsp;</span>
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
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  mounted :function () {
  //判断是否初始化
    if(JSON.parse(window.sessionStorage.getItem('start'))==null){
      console.log('初始化');
      let _this=this;    
      //页面加载完成判断项目及跳转
      $.ajax({
         type: "GET",
         url: 'api/v1.1/project',
         traditional: true,
         data: {
             "method": 'get'
         },
         success: function(data){
            console.log(JSON.stringify(data));
            console.log(data.success);
            console.log(data.message);
            if(data.data.projectList.length<1){
              window.location.href='#/index/clever'
            }else{
              alert('执行了else')
               _this.search_data(data.data.projectList[0].id,-1,0,[],[],[],0,[-1,0,1],0,_this.time[0],_this.time[1]);
                window.sessionStorage.setItem('project_id',JSON.stringify(data.data.projectList[0].id))
                 //获取分类列表
                 $.ajax({
                   type: 'GET',
                   url: 'api/v1.1/project/'+data.data.projectList[0].id+'/category',
                   traditional: true,
                   data: {
                  'method': 'get',
                   },
                   success: function(data){
                    if(data.data.categoryList!=null){
                      for(let i=0;i<data.data.categoryList.length;i++){
                        data.data.categoryList[i].bg=false;
                        data.data.categoryList[i].fa=false;
                       }    
                        _this.classify=_this.classify.concat(data.data.categoryList);
                    }else{

                    }                  
                 }     
              })
            }
         }
      })
    }else{
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      this.search_data(project_id,-1,0,[],[],[],0,[-1,0,1],0,this.time[0],this.time[1]);
      //获取分类列表
                 $.ajax({
                   type: 'GET',
                   url: 'api/v1.1/project/'+project_id+'/category',
                   traditional: true,
                   data: {
                  'method': 'get',
                   },
                   success: function(data){
                    console.log(data)
                    if(data.data!=null){
                      for(let i=0;i<data.data.categoryList.length;i++){
                        data.data.categoryList[i].bg=false;
                        data.data.categoryList[i].fa=false;
                       }    
                        _this.classify=_this.classify.concat(data.data.categoryList);
                    }else{

                    }   
                  }    
              })
    }

    //获取分类列表
    
    /*let newdata=[];
                    if(this.data.length>15){
                      for(let c=0;c<15;c++){
                      newdata.push(this.data[c])
                      }
                    }else{
                      for(let c=0;c<this.data.length;c++){
                      newdata.push(this.data[c]);                      }
                    }
                    this.tabledata=newdata;*/

      $('.filter_button').hover(function(){
        $(this).css('border-color','rgb(240,173,78)');
        $(this).css('color','rgb(240,173,78)');
        $('.filter').css('border-bottom-color','rgb(240,173,78)')
      },function(){
        $(this).css('border-color','#ccc');
        $(this).css('color','black');
        $('.filter').css('border-bottom-color','#ccc')        
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
      //ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window){
        $('.carousel-indicators>li').not('.active').css('display','none');
        $('.carousel-indicators>li').click(function(){
          $(this).css('display','none').siblings().css('display','block')
        })
     }
      //搜索数据
     $('.filter .btn').not('.filter_name').not('.polar').click(function(){
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
    let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
     $('.filter .btn').not('.filter_name').not('.filter_button').click(function(){
       _this.data=[];
      let cate_id='';
      for(let i=0;i<_this.classify.length;i++){
        if(_this.classify[i].bg==true){
         cate_id=_this.classify[i].id;
        }
      }
      $('#table').css('display','none'); 
       _this.search_data(project_id,cate_id,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1])
     })
  },
  data () {
  	return {
      watch:JSON.parse(window.sessionStorage.getItem('start')),
      polar:['正面','中性','负面'],
      dropdown_sort:['时间降序','时间升序','阅读数降序','阅读数升序','新闻指数降序','新闻指数升序'],
      current_sort:'默认',
      pickerOptions0: {},
      time: [new Date(new Date().getTime()-604800000), new Date()],
      allkeyword:'',
      keywordyoulike:'',
      nokeyword:'',
      checked:true,
      checke:false,
      diaoxing_visible:'',
      articleType:0,
      polar_arr:[-1,0,1],
      queryType:0,
      mustIncludeKeywordList:[],
      anyIncludeKeywordList:[],
      notIncludeKeywordList:[],
      data:''/*[  
        {
            "method": null,
            "article": {
                "id": 1111111,
                "articleType": 1,
                "title": "C罗戴帽，皇马3：0大胜马竞",
                "locationLevel": 11,
                "levelCounts": 1,
                "media": "体育周报",
                "category": "体育",
                "author": "作者",
                "newsIndex": 1111,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "https://g.hupu.com/soccer/report_10844780.html",
                "isOriginal": 1,
                "reprintList": null
            },
            "provinceMap": [
                
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includeKeywordList": ["关键词1","关键词2","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 222222,
                "articleType": 1,
                "title": "伊瓜因双响，尤文2:0摩纳哥",
                "locationLevel": 2,
                "levelCounts": 22222,
                "media": "足球报",
                "category": "欧冠",
                "author": "作者",
                "newsIndex": 22222,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 0,
                "url": "https://bbs.hupu.com/19118440.html",
                "isOriginal": 1,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includekeywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 333333,
                "articleType": 1,
                "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                "locationLevel": null,
                "levelCounts": 0,
                "media": "米兰体育报",
                "category": "意甲",
                "author": "作者",
                "newsIndex": 33333,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 1,
                "url": "https://bbs.hupu.com/19092605.html",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 44444,
                "articleType": 1,
                "title": "2017年一季度显卡出货量暴跌14％",
                "locationLevel": null,
                "levelCounts": null,
                "media": "比吧测评室",
                "category": "数码",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 44444,
                "likeCount": 44444,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 1,
                "reprintList": [
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": 888,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": 1234,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212922128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    }
                ]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 55555,
                "articleType": 1,
                "title": "百度，全球第四大广告公司",
                "locationLevel": null,
                "levelCounts": null,
                "media": "科技微讯",
                "category": "科技",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 55555,
                "likeCount": 55555,
                "publishTime": 1494212999128,
                "crawlTime": null,
                "polar": 1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 1111111,
                "articleType": 1,
                "title": "C罗戴帽，皇马3：0大胜马竞",
                "locationLevel": 11,
                "levelCounts": 1,
                "media": "体育周报",
                "category": "体育",
                "author": "作者",
                "newsIndex": 1111,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "https://g.hupu.com/soccer/report_10844780.html",
                "isOriginal": 1,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includeKeywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 222222,
                "articleType": 1,
                "title": "伊瓜因双响，尤文2:0摩纳哥",
                "locationLevel": 2,
                "levelCounts": 22222,
                "media": "足球报",
                "category": "欧冠",
                "author": "作者",
                "newsIndex": 22222,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 0,
                "url": "https://bbs.hupu.com/19118440.html",
                "isOriginal": 1,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includekeywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 333333,
                "articleType": 1,
                "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                "locationLevel": null,
                "levelCounts": 0,
                "media": "米兰体育报",
                "category": "意甲",
                "author": "作者",
                "newsIndex": 33333,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 1,
                "url": "https://bbs.hupu.com/19092605.html",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 44444,
                "articleType": 1,
                "title": "2017年一季度显卡出货量暴跌14％",
                "locationLevel": null,
                "levelCounts": null,
                "media": "比吧测评室",
                "category": "数码",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 44444,
                "likeCount": 44444,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 1,
                "reprintList": [
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    }
                ]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 55555,
                "articleType": 1,
                "title": "百度，全球第四大广告公司",
                "locationLevel": null,
                "levelCounts": null,
                "media": "科技微讯",
                "category": "科技",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 55555,
                "likeCount": 55555,
                "publishTime": 1494212999128,
                "crawlTime": null,
                "polar": 1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 1111111,
                "articleType": 1,
                "title": "C罗戴帽，皇马3：0大胜马竞",
                "locationLevel": 11,
                "levelCounts": 1,
                "media": "体育周报",
                "category": "体育",
                "author": "作者",
                "newsIndex": 1111,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "https://g.hupu.com/soccer/report_10844780.html",
                "isOriginal": 1,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includeKeywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 222222,
                "articleType": 1,
                "title": "伊瓜因双响，尤文2:0摩纳哥",
                "locationLevel": 2,
                "levelCounts": 22222,
                "media": "足球报",
                "category": "欧冠",
                "author": "作者",
                "newsIndex": 22222,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 0,
                "url": "https://bbs.hupu.com/19118440.html",
                "isOriginal": 1,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "includekeywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 333333,
                "articleType": 1,
                "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                "locationLevel": null,
                "levelCounts": 0,
                "media": "米兰体育报",
                "category": "意甲",
                "author": "作者",
                "newsIndex": 33333,
                "readCount": null,
                "likeCount": null,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": 1,
                "url": "https://bbs.hupu.com/19092605.html",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 44444,
                "articleType": 1,
                "title": "2017年一季度显卡出货量暴跌14％",
                "locationLevel": null,
                "levelCounts": null,
                "media": "比吧测评室",
                "category": "数码",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 44444,
                "likeCount": 44444,
                "publishTime": 1494212999128,
                "crawlTime": 1494212999128,
                "polar": -1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 1,
                "reprintList": [
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    },
                    {
                        "id": 333333,
                        "articleType": 1,
                        "title": "帕莱塔上帝之手，米兰1:1客平克罗托内",
                        "locationLevel": null,
                        "levelCounts": 0,
                        "media": "米兰体育报",
                        "category": "意甲",
                        "author": "作者",
                        "newsIndex": 33333,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 1,
                        "url": "https://bbs.hupu.com/19092605.html",
                        "isOriginal": 0,
                        "reprintList": null
                    },
                    {
                        "id": 55555,
                        "articleType": 2,
                        "title": "百度，全球第四大广告公司",
                        "locationLevel": null,
                        "levelCounts": null,
                        "media": "科技微讯",
                        "category": "科技",
                        "author": "微信作者",
                        "newsIndex": null,
                        "readCount": 55555,
                        "likeCount": 55555,
                        "publishTime": 1494212999128,
                        "crawlTime": null,
                        "polar": 1,
                        "url": "http://mp.weixin.qq.com",
                        "isOriginal": 0,
                        "reprintList": null
                    }
                ]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        },
        {
            "method": null,
            "article": {
                "id": 55555,
                "articleType": 1,
                "title": "百度，全球第四大广告公司",
                "locationLevel": null,
                "levelCounts": null,
                "media": "科技微讯",
                "category": "科技",
                "author": "微信作者",
                "newsIndex": null,
                "readCount": 55555,
                "likeCount": 55555,
                "publishTime": 1494212999128,
                "crawlTime": null,
                "polar": 1,
                "url": "http://mp.weixin.qq.com",
                "isOriginal": 0,
                "reprintList": [{
                        "id": 222222,
                        "articleType": 1,
                        "title": "伊瓜因双响，尤文2:0摩纳哥",
                        "locationLevel": 2,
                        "levelCounts": 22222,
                        "media": "足球报",
                        "category": "欧冠",
                        "author": "作者",
                        "newsIndex": 22222,
                        "readCount": null,
                        "likeCount": null,
                        "publishTime": 1494212999128,
                        "crawlTime": 1494212999128,
                        "polar": 0,
                        "url": "https://bbs.hupu.com/19118440.html",
                        "isOriginal": 1,
                        "reprintList": null
                    }]
            },
            "provinceMap": [
                "浙江",
                "江苏",
                "广东",
                "山东",
                "海南"
            ],
            "mediaProvinceMap": [
                "重庆",
                "天津",
                "北京",
                "上海",
                "江苏"
            ],
            "keywordList": ["关键词1","关键词2"]
        }      
]*/ ,//总数据
      recycle_data:[],//回收站数据
      reprintList_data:'',//转发的模态框的数据
      reprintList_id:'',//点击转发的相对应的总数据的id
      tabledata:[],//表格数据
      currentPage: 1,
      page_size:15,
      dialogVisible: false,
      dialogReprintList: false,
      dialog_recycle:false,
      classify_dialog:false,
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
      echarts_show:''//图标的文章类型显示过滤
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
    search_data (proId,categoryId,articleType,mustIncludeKeywordList,anyIncludeKeywordList,notIncludeKeywordList,queryType,polar,timeType,startTime,endTime) {
      let _this=this;
      $.ajax({
                url:'api/v1.1/project/'+123456+'/article',
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
                    //alert("成功回调函数-------------------")
                    if(data.data==null||data.data.length<=0){
                      $('#table').css('display','none');
                      _this.data=[];
                      $('#loading_table').css('display','none');
                      _this.$message({
                            message: '木有数据哦',
                            type: 'warning'
                          });                     
                    }else{
                      $('#table').css('display','block')
                        _this.data=data.data;
                      // 数据时间戳  时间格式
                        _this.format_time ();
                      //初始化总数据的publishTime转化
                      for(let i=0;i<_this.data.length;i++){
                         _this.data[i].article.publishTime=new Date(_this.data[i].article.publishTime).Format("yyyy-MM-dd hh:mm:ss");
                         //初始化数据的reprintList的publishTime转化
                         if(_this.data[i].article.reprintList){
                          for(let j=0;j<_this.data[i].article.reprintList.length;j++){
                            _this.data[i].article.reprintList[j].publishTime=new Date(_this.data[i].article.reprintList[j].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                          }
                         }
                      }
                      //初始表格数据
                      let newdata=[];
                      if(_this.data.length>15){
                        for(let c=0;c<15;c++){
                        newdata.push(_this.data[c])
                        }
                      }else{
                        for(let c=0;c<_this.data.length;c++){
                        newdata.push(_this.data[c]);                      }
                      }
                      _this.tabledata=newdata;
                    }
                   },   
                  error:function(data){
                    alert("失败回调函数-------------------")

                  }
              });
    },
    write_polar (article_id,article_articleType,articlePolar,article_polar) {
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $.ajax ({
        url:'api/v1.1/project/'+project_id+'/article/'+article_id,
        type:'POST',
        data:{
          "method":"POST", //http请求为 POST
          "articleType":article_articleType, //文章类型
          "modifiedPolar":article_polar //修改后的调性
        },
        success:function(data){
          //alert("调性修改-----成功回调函数-------------------");
          //alert(JSON.stringify(data));
          if(data.success==true){
            articlePolar.article.polar=article_polar;
            _this.diaoxing_visible=''
          }
          
        },
        error:function(){
          alert("调性修改-----失败回调函数-------------------");
        }
      });
    },
    hide_filter () {
      $('.filter').children().not('.filter_button').not('#filter_time').css('display','none');
      $('.filter').css('padding','5px');
      $('#hide_button').css({'margin-top':'5px','display':'none'});    
      $('#show_button').css({'margin-top':'5px','display':'block'});
      $('#search_top').css('display','inline-block');  
    },
    show_filter () {
      $('.filter').children().not('.filter_button').css('display','inline-block');
      $('.filter hr').css('display','block');
      $('.filter').css('padding-bottom','35px');      
      $('#hide_button').css({'margin-top':'35px','display':'block'});    
      $('#show_button').css({'margin-top':'35px','display':'none'});
      $('#search_top').css('display','none')                  
    },
    search_start () {
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
     //console.log(this.polar_arr)
    // console.log(this.anyIncludeKeywordList)
     //console.log(this.notIncludeKeywordList)
      //this.show_echarts();
      //搜索开始
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      this.search_data(project_id,-1,this.articleType,this.mustIncludeKeywordList,this.anyIncludeKeywordList,this.notIncludeKeywordList,this.queryType,this.polar_arr,0,this.time[0],this.time[1])
    },
    zheng (a) {
      console.log(this.data)
      this.write_polar(a.article.id,a.article.articleType,a,1);
    },
    zhong (a) {
      this.write_polar(a.article.id,a.article.articleType,a,0);
    }, 
    fu (a) {
      this.write_polar(a.article.id,a.article.articleType,a,-1);
    },
    wuguan (a) {
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      //数据库删除
      let articleRecycleDto = {
      "method":"POST",
      "proId":project_id,
      "articleDtoList":[
        {
          article:{
            "articleType":a.article.articleType,
            "id":a.article.id
            }
          }
        ]
      }
      //console.log(articleRecycleDto.articleDtoList)
      $.ajax({
      url:"api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleRecycleDto),
      success:function(data){
        if(data.success==true){
            //前台删除
            let oid=[];
            oid[0]=a.article.id;
            _this.data=_this.data.filter(item => { return oid.indexOf(item.article.id) === -1; }); 
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
/*        console.log(`当前页: ${val}`);
        console.log(this.page_size)
        console.log(this.currentPage)*/
        this.format_tabledata();
      },
    //修改分类提示框
    write (i,j) {    
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let _this=this;      
      //获取项目下关键词
      $.ajax({
           type: "GET",
           url: 'api/v1.1/project/'+project_id+'/keyword',
           traditional: true,
           data: {
               "method": 'get'
           },
           success: function(data){
            for(let i=0;i<data.data.keywordList.length;i++){
              if(data.data.keywordList[i].isIncluded==0){
                  _this.notags.push(data.data.keywordList[i].name);
                  _this.excludeKeywords.push(data.data.keywordList[i]);
              }else{
                _this.tags.push(data.data.keywordList[i].name);
                _this.includeKeywords.push(data.data.keywordList[i]);
              }
             } 
            }
          })
      this.classify_dialog = true;
      this.dialog_type = '编辑分类';
      this.classify_input = i.name;
      this.classify_index = j;
        $.ajax({
           type: 'GET',
           url: 'api/v1.1/project/'+project_id+'/category/'+i.id+'',
           traditional: true,
           data: {
          'method': 'get',
           },
           success: function(data){
            _this.notkw=[];
            _this.kw=[];
              for(let i=0;i<data.data.keywordList.length;i++){
              if(data.data.keywordList[i].isIncluded==0){
                _this.notkw.push(data.data.keywordList[i].name);            
              }else{
               _this.kw.push(data.data.keywordList[i].name);   
              }
             } 
           }
      })
    },
    //添加分类提示框
    addClassify () {
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let _this=this;      
      //获取项目下关键词
      $.ajax({
           type: "GET",
           url: 'api/v1.1/project/'+project_id+'/keyword',
           traditional: true,
           data: {
               "method": 'get'
           },
           success: function(data){
            for(let i=0;i<data.data.keywordList.length;i++){
              if(data.data.keywordList[i].isIncluded==0){
                  _this.notags.push(data.data.keywordList[i].name);
                  _this.excludeKeywords.push(data.data.keywordList[i]);
              }else{
                _this.tags.push(data.data.keywordList[i].name);
                _this.includeKeywords.push(data.data.keywordList[i]);
              }
             } 
            }
          })
      this.classify_dialog = true;
      this.dialog_type = '添加分类';
      this.classify_input='';
      this.kw=[];
      this.notkw=[];
      this.tags=[];
      this.notags=[];

    }, 
    //删除分类   
    del_classify (i,j) {
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let _this=this;
      this.$confirm('是否删除'+' '+i.name+' '+'分类?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        $.ajax({
                 type:'POST',
                 url: 'api/v1.1/project/'+project_id+'/category',
                 traditional: true,
                 data: {
                'method': 'delete',
                'delCateIds': [i.id]
                 },
                 success: function(data){
                    $.ajax({
                             type: 'GET',
                             url: 'api/v1.1/project/'+project_id+'/category',
                             traditional: true,
                             data: {
                            'method': 'get',
                             },
                             success: function(data){
                              if(data.data!=null){
                                for(let i=0;i<data.data.categoryList.length;i++){
                                  data.data.categoryList[i].bg=false;
                                  data.data.categoryList[i].fa=false;
                                 }
                                 console.log(data.data.categoryList)
                                  data.data.categoryList[data.data.categoryList.length-1].bg=true;
                                  _this.classify=[{name:'全部','bg':false,'fa':true,id:-1}];
                                  _this.classify=_this.classify.concat(data.data.categoryList);
                                  $('#table').css('display','none')
                                 _this.data=[];
                                  _this.search_data(project_id,data.data.categoryList[data.data.categoryList.length-1].id,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1])
                              }else{
                                _this.classify=[{name:'全部','bg':true,'fa':true,id:-1}];
                                $('#table').css('display','none')
                                _this.data=[];
                                _this.search_data(project_id,-1,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1])
                              }   
                            }    
                        })
                 }
            })
        //this.classify.splice(this.classify.indexOf(i), 1);//shanchu
      }).catch(() => {        
      });
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
    //添加分类
    add_classify () {
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let _this=this;
      let inid=[],
          exid=[];
      this.includeKeywords=this.includeKeywords.filter(item => { return this.kw.indexOf(item.name) != -1; }); 
      for(let i=0;i<this.includeKeywords.length;i++){
        inid.push(this.includeKeywords[i].id)
      }
      this.excludeKeywords=this.excludeKeywords.filter(item => { return this.notkw.indexOf(item.name) != -1; }); 
      for(let i=0;i<this.excludeKeywords.length;i++){
        exid.push(this.excludeKeywords[i].id)
      }
      if(inid.length==0&&exid.length==0){
        this.$message({
          message: '填写错误哦，请最少选择一条关键词或排除词',
          type: 'warning'
        });
        this.classify_dialog = false;
      }else{
        $.ajax({
         type: "POST",
         url: 'api/v1.1/project/'+project_id+'/category',
         traditional: true,
         data: {
        'method': 'post',
        'category.name': this.classify_input ? this.classify_input : '无命名',
        'category.remark': null,
        'includeKeywordIds': inid,
        'excludeKeywordIds': exid
         },
          success: function(data){
                $.ajax({
                       type: 'GET',
                       url: 'api/v1.1/project/'+project_id+'/category',
                       traditional: true,
                       data: {
                      'method': 'get',
                       },
                       success: function(data){
                        if(data.data.categoryList!=null){
                          for(let i=0;i<data.data.categoryList.length;i++){
                            data.data.categoryList[i].bg=false;
                            data.data.categoryList[i].fa=false;
                           }
                           console.log(data.data.categoryList)
                            data.data.categoryList[data.data.categoryList.length-1].bg=true;
                            _this.classify=[{name:'全部','bg':false,'fa':true,id:-1}];
                            _this.classify=_this.classify.concat(data.data.categoryList);
                            $('#table').css('display','none')
                             _this.data=[];
                            _this.search_data(project_id,data.data.categoryList[data.data.categoryList.length-1].id,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1])
                        }else{
                        }   
                      }    
                  })
                _this.classify_dialog = false;
             }
        })
      }
      
      this.classify_input='';
      this.kw=[];
      this.notkw=[];
    },
    //修改分类
    write_classify () {
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let _this=this; 
      let inid=[],
          exid=[];
      this.includeKeywords=this.includeKeywords.filter(item => { return this.kw.indexOf(item.name) != -1; }); 
      for(let i=0;i<this.includeKeywords.length;i++){
        inid.push(this.includeKeywords[i].id)
      }
      this.excludeKeywords=this.excludeKeywords.filter(item => { return this.notkw.indexOf(item.name) != -1; }); 
      for(let i=0;i<this.excludeKeywords.length;i++){
        exid.push(this.excludeKeywords[i].id)
      }
      if(inid.length==0&&exid.length==0){
        this.$message({
          message: '填写错误哦，请最少选择一条关键词或排除词',
          type: 'warning'
        });
      }else{
           $.ajax({
           type: 'POST',
           url: 'api/v1.1/project/'+project_id+'/category/'+this.classify[this.classify_index].id+'',
           traditional: true,
           data: {
          'method': 'put',
          'category.name': this.classify_input ? this.classify_input : '无命名',
          'category.remark': null,
          'includeKeywordIds': inid,
          'excludeKeywordIds': exid
           },
           success: function(data){
              $.ajax({
                       type: 'GET',
                       url: 'api/v1.1/project/'+project_id+'/category',
                       traditional: true,
                       data: {
                      'method': 'get',
                       },
                       success: function(data){
                        if(data.data.categoryList!=null){
                          for(let i=0;i<data.data.categoryList.length;i++){
                            data.data.categoryList[i].bg=false;
                            data.data.categoryList[i].fa=false;
                           }
                            data.data.categoryList[_this.classify_index-1].bg=true;
                            _this.classify=[{name:'全部','bg':false,'fa':true,id:-1}];
                            _this.classify=_this.classify.concat(data.data.categoryList);
                            $('#table').css('display','none')
                             _this.data=[];
                            _this.search_data(project_id,data.data.categoryList[_this.classify_index-1].id,_this.articleType,_this.mustIncludeKeywordList,_this.anyIncludeKeywordList,_this.notIncludeKeywordList,_this.queryType,_this.polar_arr,0,_this.time[0],_this.time[1])
                        }else{

                        }   
                      }    
                  })
                _this.classify_dialog = false;
            }
          })
      }
      
      /*console.log(this.classify[this.classify_index].id)
        this.classify[this.classify_index].kw = this.kw;
        this.classify[this.classify_index].notkw = this.notkw;
        this.classify[this.classify_index].name = this.classify_input;
        this.classify_dialog = false;*/
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
    //切换分类
    classify_toggleclass (i) {
      this.data=[];
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      $('#table').css('display','none')     
      this.search_data(project_id,i.id,this.articleType,this.mustIncludeKeywordList,this.anyIncludeKeywordList,this.notIncludeKeywordList,this.queryType,this.polar_arr,0,this.time[0],this.time[1])
      $.each(this.classify,function(i,j){
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
    show_echarts () {
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
      function Map() {
              this.data = new Object();
              this.put = function (key, value) {
                  this.data[key] = value;
              };
              this.get = function (key) {
                  return this.data[key];
              };
              this.remove = function (key) {
                  this.data[key] = null;
              };
              this.isEmpty = function () {
                  return this.data.length == 0;
              };
              this.size = function () {
                  return this.data.length;
              };
          }
      //生成 总数据对象
      let map=new Map();
      let wxmap=new Map();
      let wx_media_map=new Map();
      let newsIndex_map=new Map();//每小时的指数
      let newsIndex_max_map=new Map();//每天的指数
      //let newsIndex=new Map();
    //console.log(this.value1.getTime())
    //时间格式转化
      //this.format_time();
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
        console.log(newsData[i].article)
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
                let k_time=k.slice(5,13)+'-08:00';
                newsnumber_xdata.push(k_time);
              }
          }
          console.log(newsnumber_data)
          console.log(newsnumber_xdata)
        // console.log(newsIndex_max_map.data)
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
        for( let l in wxmap.data){
            let obj = new Object();
            if(l !== '正'&&l !== '中'&&l !== '负'){
            obj.media_province=l;
            obj.num=wxmap.data[l];
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
            news_top.push(obj);
        }
        //微信top
        let weixin_top = []; 
        for(let t=0;t<weixinData.length;t++){
            let obj = new Object();
            obj.title=weixinData[t].article.title;
            obj.num=weixinData[t].article.readCount;
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
        console.log(province)
        //新闻省份地域热图数据排序
        province.sort(Sort('num'));
        //微信省份地域热图数据排序
        wx_province.sort(Sort('num'));
        //微信媒体省份地域热图数据排序
        media_province.sort(Sort('num'));
        //新闻top数据排序
        news_top.sort(Sort_down('num'));
       /*  console.log(news_top.length)*/
        //判断新闻top20有没有20个
        let news_top_data=[];        
        if(news_top.length<20){
          for( let i=0;i<news_top.length;i++){
            news_top_data.push(news_top[i].num);
            news_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }else{
          for( let i=0;i<20;i++){
            news_top_data.push(news_top[i].num)
            news_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }
        //微信top数据排序
        weixin_top.sort(Sort_down('num'));
        //判断微信top20有没有20个
        let weixin_top_data=[];        
        if(weixin_top.length<20){
          for( let i=0;i<weixin_top.length;i++){
            weixin_top_data.push(weixin_top[i].num);
            weixin_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }else{
          for( let i=0;i<20;i++){
            weixin_top_data.push(weixin_top[i].num);
            weixin_top_data.sort(function(a,b){return a-b})//柱状图数据格式
          }
        }
        //console.log(map.get('山东'))
          //地域热图开始 
      $.get('static/china.json', function (chinaJson) {
        echarts.registerMap('china', chinaJson);
        let echarts_hot_xinwen = echarts.init(document.getElementById('echarts_hot_xinwen'));
        let echarts_hot_weixin_article = echarts.init(document.getElementById('echarts_hot_weixin_article'));
        let echarts_hot__weixin_media = echarts.init(document.getElementById('echarts_hot__weixin_media'));
        console.log('地域热图一长度'+province.length)
        console.log('地域热图二长度'+media_province.length)
        console.log('地域热图三长度'+wx_province.length)
        if(province!=0){
          let option_hot_xinwen = {
             title: {
                    text: '新闻中地点出现的地域分布',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    position:'inside'
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
          echarts_hot_xinwen.setOption(option_hot_xinwen);   
        }else{
          $('#echarts_hot_xinwen').css('display','none')
        }
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
          echarts_hot_weixin_article.setOption(option_hot_xinwen_article); 
        }else{
          $('#echarts_hot_weixin_article').css('display','none')
        }
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
          echarts_hot__weixin_media.setOption(option_hot_xinwen_media);
        }else{
          $('#echarts_hot__weixin_media').css('display','none')
        }
              
        })   
          //地域热图结束
          // top20 开始
        let echarts_top_xinwen = echarts.init(document.getElementById('echarts_top_xinwen')); 
        let echarts_top_weixin = echarts.init(document.getElementById('echarts_top_weixin')); 
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
                    return `新闻标题：${news_top[params[0].dataIndex].title};  新闻指数：${news_top[params[0].dataIndex].num} <br/>`                                                                 
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
                data: news_top_data
            },
            series: [
                {
                    name: '新闻',
                    type: 'bar',
                    data: news_top_data
                }
            ]
        }
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
                    return `标题：${weixin_top[params[0].dataIndex].title};  阅读数：${weixin_top[params[0].dataIndex].num} <br/>`                                                                 
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
                data: weixin_top_data
            },
            series: [
                {
                    name: '微信',
                    type: 'bar',
                    data: weixin_top_data
                }
            ]
        }        
        echarts_top_xinwen.setOption(option_top_xinwen);
        echarts_top_weixin.setOption(option_top_weixin);
        // top20 结束
        //正负性开始
        let echarts_diaoxing_xinwen = echarts.init(document.getElementById('echarts_diaoxing_xinwen')); 
        let echarts_diaoxing_weixin = echarts.init(document.getElementById('echarts_diaoxing_weixin')); 
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
        echarts_diaoxing_xinwen.setOption(option_diaoxing_xinwen);
        echarts_diaoxing_weixin.setOption(option_diaoxing_weixin);
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
    },
    handleClose(tag) {
        this.kw.splice(this.kw.indexOf(tag), 1);
    },
    nothandleClose(tag) {
        this.notkw.splice(this.notkw.indexOf(tag), 1);
    },
    kw_dropdown (command) {
      this.kw.push(command);
    },
    notkw_dropdown (command) {
      this.notkw.push(command);
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
        url:'api/v1.1/project/'+project_id+'/article/combineError',
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
        },
        error:function(data){
            alert("合并错误反馈-----失败回调函数-------------------");
        }
      }); 
      
    },
    dialog_Recycle () {
      this.recycle_data=[];
      this.dialog_recycle=true;
      //数据库数据
      let _this=this;
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      let articleRecycleDto = {
      "method":"GET",
      "proId":project_id,
      }
      //console.log(articleRecycleDto.articleDtoList)
      $.ajax({
      url:"api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleRecycleDto),
      success:function(data){
          if(data.data==null||data.data.length<=0){
            _this.$message({
                message: '木有数据哦',
                type: 'warning'
              });
             $('#loading_recycle').css('display','none')
          }else{
            _this.recycle_data=data.data;
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
        obj.article={};
        obj.article.articleType=this.selection_recycle[i].article.articleType;
        obj.article.id=this.selection_recycle[i].article.id;
        articleDtoList.push(obj);
      }
      let articleRecycleDto = {
      "method":"DELETE",
      "proId":project_id,
      "articleDtoList":articleDtoList
      }

      $.ajax({
      url:"api/v1.1/project/"+project_id+"/recycle/article",
      type:"POST",//此处只能选用POST请求
      dataType:"json",
      contentType:"application/json",
      data:JSON.stringify(articleRecycleDto),
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
    }
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
      #filter_time{
        input{
          height: 28px;
        }
      }
      .search_start{
        position:absolute;
        left:50%;
        margin-left:-104px;
        padding:6px 40px;
      }
      .filter_button{
        border-top:none;
        background: white;
        position:absolute;
        left:50%;
        margin-left:-110px;
        margin-top:35px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        outline:none;
        padding:1px 12px;
      }
      #show_button{
        display: none;
      }
      border-bottom: 1px solid #ccc;
      padding-bottom: 35px;
    }
    .btn-group{  
      .btn{
        font-size: 12px;
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
        background-color: #f0ad4e;
        border-color: #eea236;
      }
      #filter_sort_dropdown{
        padding-left:15px;
        font-size:12px;
        margin-top: -14px;
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
    .carousel li{
      //filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#00FFFAFA ,endcolorstr=#00FFFAFA ); 
      opacity: 0;
    }
    .active{
      //-ms-filter:alpha(opacity=0);
     opacity: 1 !important;
     transition: all 1s;
    }
    #carousel-example-generic{
       /*     左边分类数据-css start */ 
      .left_type{
        border:none;
        width:3%;
        border-right:0;
        padding: 40px 0 0 0;
        ul{
          .bgcolor{
            background: rgb(180,180,180);
            border-color:rgb(180,180,180);
            color:white;
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
       /*     分页-css start */
      .el-pagination{
        margin-top: 10px;
        float: right;
        display: inline-block;
        ul>li{
          opacity: 1;
        }
      } 
      /*     分页-css end */      
      width:100%;left:0px;right:0px;top:20px;
      text-shadow: none;
      color:rgba(0,0,0,1);
  /*     表格数据-css start */
      table{
        ul{
          margin-bottom: 0;
        }
        ul>li{
          opacity: 1;
          float: left;
          list-style: none;
          line-height: 31px;
        }
        tr>td{
          padding:0 !important;
          .work_type{
            width:36px;
            height:20px;
            border-radius:8px;
            border:1px solid green;
            color:red;
            margin-left: 10px;
            text-align:center;
            line-height:20px;
            font-size:12px;
            margin-bottom:0px;
            margin-top:5px;
          }
          .title{
            font-size:1.5rem;
            margin-top:-15px;
          }  
          .title_bottom{
            height:25px;
            border:1px solid gray;
            padding-bottom:-15px;
            border: none;
            border-top:1px solid #ccc;   
            -webkit-display: flex;
            -ms-display: flex;
            display: flex;
            flex-direction:row;
            justify-content:center;
            :nth-child(6){
                 border-right: none;
                 margin-top: 0.6%;
                 >span{
                  margin: 0;
                 }
                 .name-wrapper{
                  width:40%;
                  display: inline-block;
                 }
              button{
                padding: 2px 6px 2px 4px;
                font-size: 10px;
                border-radius: 3px;
                margin-left: 0;
                }
                .mid{
                  background-color: gray;
                  border-color: gray;
                  color: #fff;
                }
              } 
            >div{
              width: 16.6%;
              height:79%;
              margin-top: 4px;
              line-height: 21px;
              border-right: 1px solid #ccc;
              i{
                font-size: 1.5rem;
              }
              span{
                margin-left: 12%;
              }
            }
          }
        }   
      }
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
        #echarts-hot{
          #echarts_hot_xinwen{
            margin-top: 15px;
          }
          >div{
             margin: 8px 10% 0 10%;
             height:380px;
          }
        }
        >div{
          position: absolute;
            >div{
            margin:15px 10% 0 10%;
            width:900px;
            height: 450px;
            border: 1px solid #ccc;
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

</style>