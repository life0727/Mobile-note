<template>  
<div class="event container" style="background-color: #fff;padding-bottom:220px;position: relative;padding: 0;margin-top:30px;">
  <a id="downlink"></a><!-- 导出excel表格 -->
  <el-popover
  placement="bottom-end"
  width="320"
  @show="add_duibiName"
  v-model="popover1_show"
  popper-class="popoverCss"
  trigger="click">
    <div style="height: 250px;width:100%;">
      <div style="width:90%;height: 60px;border-bottom: 1px solid #e4e4e4;margin: 0 auto;line-height: 60px;text-align: center;font-size: 16px;">添加对比竞品</div>
      <p style="width:90%;position: absolute;top: 80px;left: 15px;font-size: 16px;">自身项目：<a href="javascript:;" @click="compet_card(duibiData[0].id,$event)" style="color: #00b38a">{{duibiData[0].name}}</a></p>

      <el-popover
      placement="bottom-end"
      width="180"
      @show="add_duibi"
      popper-class="popoverCss"
      trigger="click">
        <div class="list-group" id="ev_popover" style="position: absolute;width:100%;margin-bottom: 0;background: white;
    border: 1px solid #e4e4e4;border-radius: 4px;">
          <a v-for="i in duibiList" :key="i" href="javascript:;" class="list-group-item" style="border-width: 0px;cursor:auto;">
            <span style="cursor:pointer;" @click.stop="add_duibiName(i)">{{i.name}}</span>
            <i class="fa fa-plus-circle" @click.stop="add_duibiName(i)" style="position:absolute;right: 10px;cursor:pointer;"></i>
          </a>
          <router-link to="/keyword">
            <el-button icon="el-icon-plus" type="text" style="margin-left: 55px;color: rgb(0, 179, 138)" @click="$store.state.keyword_tab = '_competTab'">新增竞品</el-button>
          </router-link>  
        </div>
      <el-button style="padding: 4px 5px;font-size: 14px;background-color:  #00b38a;border-color:  #00b38a;color: white;position: absolute;top: 80px;right: 15px;z-index: 999999!important" icon="el-icon-plus" slot="reference">快捷添加</el-button>
      </el-popover>
      
      <p style="color:#00b38a;margin: 85px" v-show="this.duibiData.length == 1">请至少添加一个竞品</p>
      <div class="list-group" id="event" style="position: absolute;top:115px;width:100%;" v-show="this.duibiData.length > 1">
        <a href="javascript:;" class="list-group-item active" style="border-width: 0px;font-size: 16px;cursor: auto;position: relative" >
           竞品项目：<a href="javascript:;" style="color: #00b38a" @click="compet_card(duibiData[1].id,$event)">{{duibiData[1] == undefined ? '' : duibiData[1].name}}</a>
           <el-checkbox style="right: 40px;position:absolute;" v-model="checkedDuibi"></el-checkbox>
        </a>
      </div>
      <el-button @click="save" style="padding: 4px 20px;font-size: 14px;background-color: #00b38a;border-color:#00b38a;color:white;position: absolute;bottom:10px;right: 105px;">导出</el-button>
      <el-button :style="{padding:'4px 5px',fontSize: '14px',backgroundColor: checkedDuibi ? '#00b38a' : '#e4e4e4',borderColor: checkedDuibi ? '#00b38a' :'#e4e4e4',color:checkedDuibi ? 'white' : '#555',position:'absolute',bottom:'10px',right:'15px'}"  :disabled="!checkedDuibi" @click="addDuibi">对比({{checkedDuibi ? '1' : '0'}}/1)</el-button>
    </div>
  <img v-show="this.$store.state.data.length != 0" style="position: absolute;right: 30px;top:-56px;z-index:999;cursor: pointer" slot="reference" src="../../../assets/icon/addDuibi.png">
  </el-popover>

  <div class="block"  >
    <div class="filter_event" style="width: 100%;border: 1px solid rgb(228,228,228);background-color:rgb(247,247,247);position:relative;height: 48px;">
      <span :style="{position:'absolute',left:'30px',lineHeight:'45px',cursor:'pointer',color: articleType == 2 ? '#00b38a' : '#333'}" @click="btn_disabled=false;articleType=2;">微信</span>
      <span :style="{position:'absolute',left:'80px',lineHeight:'45px',cursor:'pointer',color: articleType == 1 ? '#00b38a' : '#333'}" @click="btn_disabled=true;articleType=1;">新闻</span>
      <span style="position: absolute;left: 140px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
      <el-popover
        placement="bottom"
        @hide="dom_search"
        width="450"
        :disabled="btn_disabled"
        v-model="domin_popover"
        popper-class="popperClassMedia"
        trigger="click">
        <div class="btn-group domain" role="group" aria-label="..." style="">
          <button type="button" class="btn warning domain_all" :disabled="btn_disabled" style="margin:5px 3px;border-radius: 3px;padding: 2px 10px;">全部</button>
          <button type="button" style="margin: 5px 3px;border-radius: 3px;padding: 2px 10px;" class="btn" @click="domain_click($event,'domain')" :disabled="btn_disabled" v-for="(i) in domain" :key="i">{{i}}</button>
        </div>
        <hr style="margin: 10px 0;">
        <el-button type="success" size="large"  style="padding: 5px 20px;font-size: 14px;margin-left: 345px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;"  @click="dom_search" >确定</el-button>
        <span style="position: absolute;left: 170px;line-height: 45px;cursor: pointer" slot="reference">媒体分类 <i :class="domin_popover ? 'fa fa-angle-up' : 'fa fa-angle-down'" style="margin-left: 2px;"></i></span>
      </el-popover>

      <span style="position: absolute;left: 265px;line-height: 45px;">议题个数:</span>
      <el-dropdown  @command="sort_dropdown" style="margin-left: 325px;"  @visible-change="visibleChangeEventNum">
              <el-button  style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">{{current_sort}}<i :class="sort_dropdown_visible_eventNum ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort" :key="i" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
      </el-dropdown>

      <el-popover
        placement="bottom"
        @hide="qiye_search"
        width="450"
        :disabled="false"
        v-model="qiye_popover"
        popper-class="popperClassMedia"
        trigger="click">
        <el-form :inline="true" :model="companyData" class="demo-form-inline elfrom_class">
          <el-form-item label="企业A">
            <el-input v-model="companyData.companyA" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="企业B">
            <el-input v-model="companyData.companyB" placeholder=""></el-input>
          </el-form-item>
        </el-form>  
        <hr style="margin: 10px 0;">
        <el-button type="success" size="large"  style="padding: 5px 20px;font-size: 14px;margin-left: 345px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;"  @click="qiye_search" >确定</el-button>
        <span style="position: absolute;left: 378px;line-height: 45px;cursor: pointer" slot="reference">企业名称 <i :class="qiye_popover ? 'fa fa-angle-up' : 'fa fa-angle-down'" style="margin-left: 2px;"></i></span>
      </el-popover>
      
      <span style="position: absolute;left: 464px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span><!-- left: 383px; -->
      <!-- 日期组件 -->
      <datePicker @receiveFromDatePicker = "dataPickerData" style="margin-left:95px;"></datePicker>
      <span class="SearchBegin" style="line-height: 45px;margin-left: 30px;" id="search" @click="_start(true,true)" v-loading.fullscreen.lock="loading_start" :element-loading-text="'系统拼命加载中'+'('+programs+'%..)'" element-loading-spinner="el-icon-loading">搜索</span>
      <span class="SearchBegin"   @click="downloadFile()" v-show="data.length != 0">导出excel</span>

    </div>
  </div>

  <div class="event container" style="background-color: #fff;position: relative;border: 1px solid rgba(228, 228, 228, 1);border-top-width: 0;">
  <p style="padding: 10px 0 10px 5px;color:#ccc;margin: 0">当前项目：<b style="color: #00b38a;margin-right:20px;">{{current_project_dom_name}}</b>已选媒体分类：<span style="color: #00b38a;">{{domain_arr.length == 0 ? '全部' : domain_arr.toString()}}</span></p>
  <div class="clientContent" v-show="this.data.length == 0" >
    <img src="../../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;">
  </div>
  <div id="panel"  v-show="this.data.length != 0">
    <div class="panel panel-default" id="panel_person">
      <div class="panel-heading" style="padding: 10px 15px;background-color: white;width: 90%;margin: 0 auto;">
        <h3 class="panel-title" style="color: #333333;"  >人物
          <span style="padding-left: 200px;font-size: 14px;">数量：</span>
          <el-dropdown  @command="sort_dropdown_per" style="">
              <el-button style="padding: 2px 0px;border-width: 0px;background-color:white;color: rgb(0, 179, 138);">{{current_sort_per}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;color:rgb(51, 51, 51)"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :key="i" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </h3>
      </div>
      <div class="panel-body" id="personSet"  >
      </div>
    </div>
    <div class="panel panel-default" >
      <div class="panel-heading" style="padding: 10px 15px;background-color: white;width: 90%;margin: 0 auto;">
        <h3 class="panel-title" style="color: #333333;" >地点
          <span style="padding-left: 200px;font-size: 14px;">数量：</span>
          <el-dropdown  @command="sort_dropdown_loc" style="">
              <el-button style="padding: 2px 0px;border-width: 0px;background-color:white;color: rgb(0, 179, 138);">{{current_sort_loc}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;color:rgb(51, 51, 51)"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :key="i" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </h3>
      </div>
      <div class="panel-body" id="locationSet">
      </div>
    </div>
    <div class="panel panel-default" >
      <div class="panel-heading" style="padding: 10px 15px;background-color: white;width: 90%;margin: 0 auto;">
        <h3 class="panel-title" style="color: #333333;">组织
          <span style="padding-left: 200px;font-size: 14px;">数量：</span>
          <el-dropdown  @command="sort_dropdown_org" style="">
              <el-button style="padding: 2px 0px;border-width: 0px;background-color:white;color: rgb(0, 179, 138);">{{current_sort_org}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;color:rgb(51, 51, 51)"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :key="i" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </h3>
      </div>
      <div class="panel-body" id="orgSet">
      </div>
    </div>
  </div>
  <div class="panel panel-default" id="mid" style="margin-left: 6px;"  v-show="this.data.length != 0">
    <div class="panel-heading" style="background-color: white;">
          <h3 class="panel-title" style="color: #333333;">议题</h3>
    </div>
  </div>
  <div class="event_card"  v-show="this.data.length != 0">
    <div v-for="(i,$index) in data" :key="i" :class="{ live:$index == data_Per_index}" style="width:387px;height: 230px;border: 1px solid #ebebeb;position: relative;overflow: hidden;cursor: pointer;float: left;padding:0 ;margin: 10px 20px 10px 5px;border-radius: 8px;" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)" @click="card_click($index)">
    <img src="../../../assets/icon/del.png" style="position: absolute;top: 2px;right: 0px;cursor: pointer;z-index:10;display: none;" @click.stop="del_ev(i)">
      <div style="width: 100%;height:75px;padding: 0 5px;position: relative;">
        <!-- <div style="width: 65px;height: 76px;margin-left: 10px; " >
          <img src="../../../assets/icon/eventnumber.png" >
          <span style="width:64px;height: 30px;position:absolute;left: 16px;;top:46px;color: white;font-size: 16px;text-align:center"></span>
        </div> -->
        <p style="position: absolute;top: 10px;left:10px;font-size: 16px;"><img src="../../../assets/icon/event-title.png" style="padding-right: 6px;color: #333333;"><span> <el-tooltip :disabled="i.titleTooltip" class="item" effect="light" content="双击可编辑议题标题" placement="top" ><input type="button" :value="i.name" @dblclick.stop="input_write($index)" @blur="blur_input($index)" ref="inpt" style="text-align: left;width: 350px;border-width: 0;background-color: white;cursor: auto;outline: none;text-decoration: none;box-shadow: none;font-size: 16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></el-tooltip></span></p>
        <p style="position: absolute;top:35px;left:45px;cursor: pointer;color:#BCBCBC" @click="dialog_articleList(i,$index)"><img src="../../../assets/icon/event-like.png" style="padding-right: 6px;">相关文章 <span style="color:#00b38a">({{i.articleCount==null ? 0 : i.articleCount}})</span></p>
        <p style="position: absolute;top:35px;left:180px;cursor: pointer;color:#BCBCBC" @click="dialog_articleList(i,$index,true)">文章走势 </p>
      </div>
      <el-dropdown @command="sort_dropdown_keyword" style="position: absolute;z-index: 9;right: 0px;" >
              <el-button style="padding: 2px 6px;border-width: 0px;background-color:#ebebeb;color: rgb(0, 179, 138);">{{i.sortArr}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;color:rgb(51, 51, 51)"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :key="i" :command="i+$index" >{{i}}</el-dropdown-item >
              </el-dropdown-menu>
      </el-dropdown>
      <div @click.stop="echart_click($index)" style="width: 100%;height:155px;padding: 0 5px;" :id="'echart_card'+$index">
      </div>
    </div>
      <!-- <div id="all_event_echart" style="width: 1225px;height: 400px;position: relative;float: left;"></div>  -->
  </div>
  
    <el-dialog title="详情图" :visible.sync="dialogEchart" id="dialog_echart" width="1200px !important" custom-class="ev_dialogClass">
        <div style="width: 100%;height:400px;padding: 0 5px;border:1px solid #ebebeb" id="echart_max"></div>
   </el-dialog>
  <el-dialog :title="dialo_title" :visible.sync="dialogCt" width="700px" id="dialog_ct" >
    <div style="position:absolute;left: 35px;padding: 10px;width:620px;height: 520px;">
      <el-table
              :data="ct_data_list"
              stripe
              style="width: 100%"
              @selection-change="ct_articlelist_select">
              <el-table-column
                label="全选"
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                label="文章标题"
                show-overflow-tooltip>
               <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
              </el-table-column>
        </el-table>
        <span v-show="this.ct_articlelist_selection.length != 0" style="position: absolute;left: 0px; bottom: 6px;padding: 5px 10px;color:#999999">已选（{{ct_articlelist_selection.length}}）</span> 
        <el-button v-show="this.ct_articlelist_selection.length != 0"  type="text" style="position: absolute;left: 83px; bottom: 6px;padding: 7px 3px;color:#999999;" @click="open_del_threeList">删除</el-button>
        <el-button v-show="this.dialo_title!=='相关文章'" type="danger" :style="{position:'absolute',left: ct_articlelist_selection.length ? '115px' : '0px',bottom:'7px',padding:'4px 4px'}" @click="open_del_per">删除此{{this.entityType == 'key' ? '关键词' : dialo_title.slice(dialo_title.length-4,dialo_title.length-2)}}</el-button>
        <span class="SearchBegin" :style="{position:'absolute',left: ct_articlelist_selection.length ? '195px' : '0px',bottom:'7px',padding:'5px 5px',lineHeight:'14px'}"  @click="downloadArticleFile()" v-show="this.ct_articlelist_selection.length != 0">导出excel</span>
            <el-pagination
            v-if="pageShow"
            class="page"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="page_size"
            :pager-count="5"
            layout="total,  prev, pager, next"
            :total="this.ct_data_total"
            v-show="this.ct_data_total!==0">
            </el-pagination>
    </div>
  </el-dialog>

  <!-- 议题新闻走势 -->
  <el-dialog title="文章走势" :visible.sync="dialogEchartLine" width="700px" id="dialog_ct_line" >
    <div style="position:absolute;left: 35px;padding: 10px;width:620px;height: 520px;" id="dialogEchartLine">

    </div>
  </el-dialog>
  <!-- 转发文章 -->
  <el-dialog title="相关文章转发" :visible.sync="dialog_reprint"  id="dialog_reprint">
      <div class="el-step is-vertical" style="margin-right: 0px; cursor: pointer;" v-for="(i,$index) in articleList_reprint_list" :key="i" @mouseover="Mover_articleList_reprint($index)" @mouseout="Mout_articleList_reprint($index)">
       <div class="el-step__head  is-text" style="color: white;">
         <div class="el-step__line is-vertical" style="margin-right:0;width: 1px;"> </div>
         <span class="el-step__icon">
           <img v-if="$index==0" :src="fimg">
           <img v-if="$index!=0" :src="imgf">
         </span>
       </div>
       <div class="el-step__main" style="margin-left: 0;width: 90%;">
         <div class="el-step__title "  style="width: 77%;height: 32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><a :href="i.url"  target="_blank" style="font-weight: 700;color: #48576a;text-decoration: none" ref="articlelist_reprint">{{i.title}}</a></div>
         <div class="el-step__description " style=" color: #8391a5;">{{i.publishTime}}</div>
       </div>
      </div> 
      <el-pagination
            class="page"
            @current-change="handleCurrentChange_reprint_list"
            :current-page="currentPage_reprint_list"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_reprint_list"
            layout="total,  prev, pager, next, jumper"
            :total="this.articleList_reprint.length"
            v-show="this.articleList_reprint.length!==0">
        </el-pagination>
    </el-dialog>
    <!-- 选择对比项目 -->
    <el-dialog title="选择对比项目" :visible.sync="dialogDuibiList" id="dialog_DuibiList">
      <p v-show="this.duibiList.length == 0" style="margin: 10% 42%;color: #f34c81">暂无数据，请添加竞品</p>
      <el-radio-group v-model="radio_duibi">
        <el-radio v-for="i in duibiList" :key="i" :label="i.id">{{i.name}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDuibiList = false">取 消</el-button>
        <el-button type="primary" @click="add_duibiName">确 定</el-button>
      </span>
   </el-dialog> 
   <!-- 选择对方式 -->
    <!-- <el-dialog title="选择对比方式" :visible.sync="dialogDuibiMethod" width="400px !important" id="dialog_DuibiMethod" custom-class="ev_dialogClass">
      <b style="color: #333">相似性计算方式:</b> 
      <el-radio-group v-model="radio_duibi_Method">
        <el-radio v-for="i in duibiMethodList" :label="i.type">{{i.name}}</el-radio>
      </el-radio-group>
      <div style="margin-top: 15px;">
        <b style="color: #333">词表样本百分比:</b>
        <el-radio-group v-model="radio_duibi_Percent">
          <el-radio v-for="i in duibiPercentList" :label="i">{{i}}</el-radio>
        </el-radio-group>
       </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDuibiMethod = false">取 消</el-button>
        <el-button type="primary" @click="addDuibi">确 定</el-button>
      </span>
   </el-dialog>  -->
    <!-- 查看对比项目 -->
    <el-dialog title="查看对比项目" :visible.sync="dialog_look_duibiProject" custom-class="ev_dialogClass" width="1200px !important"  id="dialog_look_duibiProject">
      <!-- <h4 style="margin-top: 0;margin-bottom: 20px;color:#333">计算方式为:<span v-show="radio_duibi_Method==1" style="color: #ff4949">jaccard</span><span v-show="radio_duibi_Method==2" style="color: #ff4949">cosine</span><span v-show="radio_duibi_Method==3" style="color: #ff4949">generative</span><span v-show="radio_duibi_Method==4" style="color: #ff4949">kl</span>，值越<span style="color: #ff4949">{{radio_duibi_Method == 4 ? '小' : '大'}}</span>说明越相似。</h4> -->
      <table width="100%" border="1" cellspacing="0" cellpadding="0" style="border-color:#ccc;" id="table">
                  <tr>
                    <th width="100%" :colspan="colspan" style="color:black">
                      {{table_compet_name}}
                    </th>
                  </tr>
                  <tr >
                    <th width="4%" :rowspan="rowspan" ><p style="word-wrap: break-word; letter-spacing: 3px;padding: 2px 0 10px 2px;width: 25px;color: black"><span >{{table_own_name}}</span></p></th>
                    <th width="" ></th>
                    <th width="" v-for="(i,$index) in table_compet_data" :key="i"><span data-toggle="tooltip" data-placement="top" :title="'议题标题:'+i.name"><input type="text" :value="i.name" @blur="blur_table(i,$index,true)" ref="cp_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                  </tr>
                  <tr v-for="(i,$index) in tableData" :key="i">
                      <th width="" ><span data-toggle="tooltip" data-placement="top" :title="'议题标题:'+i.name"><input type="text" :value="i.name" @blur="blur_table(i,$index)" ref="_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                      <td v-for="(j,$index) in i.data" :key="j"><el-checkbox v-model="j.checked" :disabled="j.disabled1 || j.disabled2" @change="handleCheckedCitiesChange($index,i,j,tableData)"></el-checkbox>&nbsp;  <span class="duibi_num" :style="{color: j.max ? '#f34c81' : ''}" @click="look_venn($index,i)">{{j.num}}</span></td>
                  </tr>            
      </table>
      <div style="width: 100%;height: 350px;margin-top: 15px;" v-show="this.table_select.length != 0" id="DuiBi"></div>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="this.table_select.length!=0" :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 6px 18px;font-size: 14px;background-color: #00b38a;border-color:#00b38a;color: white;"  @click="save">导 出</el-button>
        <!-- <el-button @click="dialog_look_duibiProject = false" style="margin-right: 0px;padding: 6px 18px;">取 消</el-button> -->
      </span>
   </el-dialog> 
   <!-- venn图 -->
   <el-dialog title="相关信息" :visible.sync="dialogSimilar" width="1200px !important" id="dialog_similar" custom-class="ev_dialogClass">
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 420px;left: 10px;">
            <p style="text-align: center;color:#00b38a">相关人物</p>
            <el-table
             :data="similarData_per_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身人物"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_per_arr.indexOf(scope.row.per) != -1 ? '#f34c81' : ''}">{{ scope.row.per.slice(0,scope.row.per.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="竞品人物"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_per_arr.indexOf(scope.row.cp_per) != -1 ? '#f34c81' : ''}">{{ scope.row.cp_per.slice(0,scope.row.cp_per.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="公共人物"
               show-overflow-tooltip>
               <template scope="scope"><span style="color: #f34c81;">{{ scope.row.similar_per.slice(0,scope.row.similar_per.indexOf('/'))}}</span></template>
             </el-table-column>
           </el-table>    
      <!--  分页 strart -->
       <el-pagination
           class="page"
           @current-change="similarData_per_handleCurrentChange"
           :current-page="similarData_per_currentPage"
           :page-size="similarData_per_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_per.length"
           v-show="this.similarData_per.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 420px;left: 306px;">
          <p style="text-align: center;color:#00b38a">相关地点</p>
            <el-table
             :data="similarData_loc_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身地点"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_loc_arr.indexOf(scope.row.loc) != -1 ? '#f34c81' : ''}">{{ scope.row.loc.slice(0,scope.row.loc.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="竞品地点"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_loc_arr.indexOf(scope.row.cp_loc) != -1 ? '#f34c81' : ''}">{{ scope.row.cp_loc.slice(0,scope.row.cp_loc.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="公共地点"
               show-overflow-tooltip>
               <template scope="scope"><span style="color: #f34c81;">{{ scope.row.similar_loc.slice(0,scope.row.similar_loc.indexOf('/'))}}</span></template>
             </el-table-column>
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           class="page"
           @current-change="similarData_loc_handleCurrentChange"
           :current-page="similarData_loc_currentPage"
           :page-size="similarData_per_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_loc.length"
           v-show="this.similarData_loc.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 420px;left: 602px;">
          <p style="text-align: center;color:#00b38a">相关组织</p>
            <el-table
             :data="similarData_org_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身组织"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_org_arr.indexOf(scope.row.org) != -1 ? '#f34c81' : ''}">{{ scope.row.org.slice(0,scope.row.org.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="竞品组织"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_org_arr.indexOf(scope.row.cp_org) != -1 ? '#f34c81' : ''}">{{ scope.row.cp_org.slice(0,scope.row.cp_org.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="公共组织"
               show-overflow-tooltip>
               <template scope="scope"><span style="color: #f34c81">{{ scope.row.similar_org.slice(0,scope.row.similar_org.indexOf('/'))}}</span></template>
             </el-table-column>
           </el-table>    
      <!--  分页 strart -->
       <el-pagination
           class="page"
           @current-change="similarData_org_handleCurrentChange"
           :current-page="similarData_org_currentPage"
           :page-size="similarData_per_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_org.length"
           v-show="this.similarData_org.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 420px;left: 897px;">
          <p style="text-align: center;color:#00b38a">相关关键词</p>
            <el-table
             :data="similarData_key_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身关键词"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_key_arr.indexOf(scope.row.key) != -1 ? '#f34c81' : ''}">{{ scope.row.key.slice(0,scope.row.key.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="竞品关键词"
               show-overflow-tooltip>
               <template scope="scope"><span :style="{color: similar_key_arr.indexOf(scope.row.cp_key) != -1 ? '#f34c81' : ''}">{{ scope.row.cp_key.slice(0,scope.row.cp_key.indexOf('/'))}}</span></template>
             </el-table-column>
             <el-table-column
               label="公共关键词"
               show-overflow-tooltip>
               <template scope="scope"><span style="color: #f34c81">{{ scope.row.similar_key.slice(0,scope.row.similar_key.indexOf('/'))}}</span></template>
             </el-table-column>
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           class="page"
           @current-change="similarData_key_handleCurrentChange"
           :current-page="similarData_key_currentPage"
           :page-size="similarData_per_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_key.length"
           v-show="this.similarData_key.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
       <div class="similarArt" style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:49%;height: 320px;top: 475px">
        <p style="text-align: center;color:#00b38a">自身相关文章</p>
            <el-table
             :data="similarData_arc_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
             </el-table-column>
             <!-- <el-table-column
               label="竞品文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.cp_arc_url" target="_blank" :style="{color: similar_arc_arr.indexOf(scope.row.cp_arc) != -1 ? '#f34c81' : 'black'}">{{ scope.row.cp_arc}}</a></template>
             </el-table-column>
             <el-table-column
               label="公共文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.similar_arc_title_url" target="_blank" style="color: #f34c81;">{{ scope.row.similar_arc_title}}</a></template>
             </el-table-column> -->
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           v-if="pageShow"
           class="page"
           @current-change="similarData_arc_handleCurrentChange"
           :current-page="similarData_arc_currentPage"
           :page-size="similarData_arc_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_arc_total"
           v-show="this.similarData_arc_total!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div> 
     <div class="similarArt" style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:49%;height: 320px;top: 475px;left: 50%;">
      <p style="text-align: center;color:#00b38a">竞品相关文章</p>
            <el-table
             :data="similarData_arc_list_cpa"
             border
             style="width: 100%">
             <el-table-column
               label="竞品文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a style="color:#333" :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
             </el-table-column>
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           v-if="pageShow"
           class="page"
           @current-change="similarData_arc_handleCurrentChange_cpa"
           :current-page="similarData_arc_currentPage_cpa"
           :page-size="similarData_arc_pageSize"
           layout="total,  prev, pager, next"
           :total="this.similarData_arc_total_cpa"
           v-show="this.similarData_arc_total_cpa!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div> 
   </el-dialog>
 </div>  
</div>  
</template>
<script >
import echart from 'echarts'
import datePicker from '../util/datePicker.vue'
/*import ecStat from 'echarts-stat'*/
import _echart from '../../../assets/js/_echart.js'
import {Sort,Map,SetSessionStorage,GetSessionStorage,publicSearch,successBack,tipsMessage,similar,jsonToStrMap,GetLocalStorage,startLoading,endLoading,s2ab,downloadExl}  from '../../../assets/js/map.js'
  export default{
    data : function(){ 
        return{
          data:[],//搜索后的主数据
          personSet:[],//人物图的数据
          locationSet:[],//地点图的数据
          orgSet:[], //组织图的数据
          articleList_reprint:'',//转发文章数据
          dialog_reprint:false,//相关转发模态框显示开关
          dialogEchart:false,//详情图模态框显示开关
          dialogCt:false,//文章列表模态框显示开关
          dialogEchartLine:false,//议题新闻走势
          dialogDuibiList:false,//选择对比项目模态框显示开关
          dialog_look_duibiProject:false,//查看对比项目模态框显示开关
          dialogDuibiMethod:false,//对比方法模态框显示开关
          dialogSimilar:false,//相似实体模态框显示开关
          articleType:2,//文章类型
          current_sort:GetSessionStorage('current_sort')||'6', //议题个数下拉
          current_sort_loc:GetSessionStorage('current_sort_loc')||'10',//地点图下拉
          current_sort_per:GetSessionStorage('current_sort_per')||'10',//人物图下拉
          current_sort_org:GetSessionStorage('current_sort_org')||'10',//组织图下拉
          dropdown_sort:['2','3','4','5','6','7','8','9','10'],//议题个数下拉
          time: GetSessionStorage('time0')!=null ? [new Date(GetSessionStorage('time0')),new Date(GetSessionStorage('time1'))] : [new Date(new Date().getTime()-604800000), new Date()],//时间
          fimg:require("../../../assets/icon/xiangguanwenzhang.png"),//转发小图已废弃
          imgf:require("../../../assets/icon/xiangguanwenzhang1.png"),//转发小图已废弃
          ct_data:[],//文章列表数据
          ct_data_list:[],//显示的文章列表数据
          ct_data_total:'',//文章列表总数
          articleList_reprint_list:[],//转发文章数据列表
          currentPage:1,//当前页
          currentPage_reprint_list:1,//当前页
          page_size:12,//页码大小
          page_size_list:12,//页码大小
          page_size_reprint_list:12,//页码大小
          domain:[],//媒体分类数据
          domin_popover:false,//媒体分类显示
          qiye_popover:false,//企业分类显示
          domain_arr:[],//显示已选中的媒体分类
          custom:[],//已废弃
          custom_arr:[],//已废弃
          dropdown_sort_num:['5','10','15','20'],//关键词下拉
          btn_disabled:false,//媒体分类显示开关 新闻关 微信开
          data_articleList_index:'',//删除相关文章列表的时候获取到他的总数据的index
          articleList_idarr:[],//删除相关文章列表的id数组
          perList_idarr:[],//删除地点人物组织数组相关文章列表的id数组
          mentionArr:[],//删除地点人物组织数组
          qipao_idarr:[],//删除气泡图数组
          data_Per_index:0,//点击卡片获取相对应总数据的index
          data_second_index:'',//点击人物组织圆点获取index
          loading_start:false,//loading显示开过
          dialo_title:'',//模态框 动态标题
          ct_articlelist_selection:[],//新闻列表选择文章
          duibi_show:GetSessionStorage('duibi_show')!=null ? GetSessionStorage('duibi_show') : false,//是否对比显示开关
          duibiData:[{'name':'','id':'','topicList':''}],//对比数据格式
          del_duibi_flag:false,//对比数据是删除时 区分自己和竞品的flag
          del_duibi_id:'', //竞品id
          duibiList:[], //对比列表
          radio_duibi:'',//对比单选框
          current_project_dom_name:'',//当前项目名称
          tableData:[],//对比表格数据
          radio_duibi_Method:2,//对比方法
          duibiMethodList:[{"type":1,"name":"jaccard "},{"type":2,"name":"cosine"},{"type":3,"name":"generative"},{"type":4,"name":"kl"}],//对比方法
          radio_duibi_Percent:'0.2',//对比方法参数
          duibiPercentList:['0.05','0.1','0.2','0.5'],//对比方法参数
          table_compet_name:'',//表格竞品项目名称
          table_compet_data:[],//表格竞品数据
          table_own_name:'', //表格自己项目名称
          colspan:'',//表格列合并
          rowspan:'',//表格行合并
          table_select:[],//相似表格选中
          similarData_per:[],//查看相似的自身和竞品的信息-----往下
          similarData_per_list:[],//同上
          similarData_per_currentPage:1,//同上
          similarData_per_pageSize:10,//同上
          similarData_loc:[],//同上
          similarData_loc_list:[],//同上
          similarData_loc_currentPage:1,//同上
          similarData_org:[],//同上
          similarData_org_list:[],//同上
          similarData_org_currentPage:1,//同上
          similarData_key:[],//同上
          similarData_key_list:[],//同上
          similarData_key_currentPage:1,//同上
          similarData_arc_total:'',//相似度表格里面自身文章列表的总数
          similarData_arc_total_cpa:'',//相似度表格里面競品文章列表的总数
          //similarData_arc:[],
          similarData_arc_list:[],
          similarData_arc_list_cpa:[],//相似度表格里面自身文章列表
          similarData_arc_currentPage:1,
          similarData_arc_currentPage_cpa:1,//相似度表格里面競品文章列表的當前頁碼
          similarData_arc_pageSize:7,
          similar_per_arr:[],//相似的人物数组
          similar_loc_arr:[],//相似的地点数组
          similar_org_arr:[],//相似的组织数组
          similar_key_arr:[],//相似的关键词数组
          //similar_arc_arr:[],
          entityType:'',//获取文章需要的参数--实体类型
          entityName:'',//获取文章需要的参数--实体名称
          similarData_topicId:'',//相似度表格里面自身文章id 获取文章列表需要的参数
          similarData_cpTopicId:'',//相似度表格里面竞品文章id 获取文章列表需要的参数
          pageShow:true,
          programs:0,//进度条数字
          popover1_show:false,//添加竞品第一层popover显示
          currentDuibiData:'',
          sort_dropdown_visible_eventNum:true,//true为显示false为隐藏
          checkedDuibi:false,//对比项目列表的多选框
          companyData: {//企业数据
            companyA: '',
            companyB: ''
          },
          ctbCompanyNameList:[],//企业数据excel格式
          outFile: '',  // 导出excle文件
        }
    },
    components:{
      datePicker
    },
    mounted : function () { //样式逻辑 以及默认搜索
       
        GetLocalStorage();
        let _this = this,project_id = GetLocalStorage('current_projectData_A').project_id;
       /*jq样式*/
       $('.clientContent').css('height',$(window).height()-280+'px');
       $(window).scroll(function(){
        if($(this).scrollTop()>500){
           $('#panel').css({'position':'fixed','top':'0px','z-index':'999','background-color':'white'});
           $('#panel .panel:nth-child(2)').css('margin','0 20px');
           $('#mid').css({'position':'fixed','top':'340px','z-index':'999','width':'1220px'});
           $('.event_card').css('margin-top','390px');
        }else{
           $('#panel').css({'-webkit-display':'flex','-ms-display':'flex','display':'flex','flex-direction':'row','justify-content':'space-around','padding-bottom':'10px','position':'relative'});
           $('#panel .panel:nth-child(2)').css('margin','0');
           $('#mid').css({'margin-bottom':'0','position':'relative','top':'0'});
           $('.event_card').css({'width':'1240px','position':'relative','margin-top':'0px'});
        }
       });
       $('.domain .domain_all').click(function(){
          $('.domain button').not($(this)).removeClass('warning');
          $(this).addClass('warning');
       });
       $('.custom .custom_all').click(function(){
          $('.custom button').not($(this)).removeClass('warning');
          $(this).addClass('warning');
       });
       this.domain_arr.length !=0 ? $('.domain .domain_all').removeClass('warning') : '';
       this.custom_arr.length !=0 ? $('.custom .custom_all').removeClass('warning') : '';
       this.outFile = document.getElementById('downlink');//导出excel所需要的数据元素
       $('#type  button').click(function(){ $(this).addClass('warning').siblings().removeClass('warning');});

      

       $('#dialog_DuibiList .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogDuibiList = false;});
               
       $('#dialog_DuibiMethod .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogDuibiMethod = false;});
               
       $('#dialog_look_duibiProject .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialog_look_duibiProject = false;});
            
       $('#dialog_similar .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogSimilar=false;}); 

       $('.el-dialog__headerbtn').not('#dialog_list_es .el-dialog__headerbtn').click(function(){
   
        _this.dialogEchart = false;
        _this.dialogCt = false;
        _this.dialogEchartLine = false;
      });
       $('#dialog_reprint .el-dialog__headerbtn').click(function(){
        _this.dialog_reprint = false;
        _this.dialogCt = true;
       });
        startLoading();
        publicSearch('rsa/wxaccount/domain',"GET",{"method":"get"}).then((data) =>{//ajax
          endLoading();
          if(successBack(data,this)){
            this.domain = data.data
          }
        });    
        

        this._start(true,true);    
    },
    methods:{
      //切换项目查看议题
      compet_card(oid,event){
        
        let _this=this;
            /*for(let t=0;t<$('.event .el-tabs__item').length;t++){
              $('.event .el-tabs__item')[t].className="el-tabs__item"
            }
            ev.target.className="el-tabs__item is-active"*/
          this.current_project_dom_name= event.target.innerHTML;
        for(let i of this.$store.state.ev_duibiData){
          if(oid == GetLocalStorage('current_projectData_A').project_id){//如果是自身
              this.del_duibi_flag = false;
              $(document).ready(function(){
                      _this.dom_write(_this.$store.state.data);
                      _echart.build_event_qipao(_this);
                      //_echart.build_event_allEvent(_this);
                   })
          }else{//点击的是竞品
            if(i.id == oid){

              this.del_duibi_flag = true;
              this.del_duibi_id = oid;
              //console.log(this.$store.state.ev_duibiData[i])
              if(i.data != undefined){//vuex里面有这个议题id的数据
                $(function(){
                  _this.dom_write(i.data);
                  _echart.build_event_qipao(_this);
                  //_echart.build_event_allEvent(_this);
                });
              }else{
                this._start(false,true,oid);
              }
            }
          }; 
        }
      },
      addDuibi(){//生成对比表格
        this.duibiData = this.$store.state.ev_duibiData;
        this.duibiData[0].topicList = this.$store.state.data.topicList;//自身
        console.log(this.duibiData)
        this.loading_start=true;
        //this.dialogDuibiMethod=false;
        this.tableData=[];
        this.table_select=[];
        this.dialog_look_duibiProject=true;
        let proTopicIdList = [], cpTopicIdList = [];
        for(let i of this.duibiData[0].topicList){
          proTopicIdList.push(i.id);
        };
        for(let i of this.duibiData[1].data.topicList){
          cpTopicIdList.push(i.id);
        };
        let params = {
          "method":"GET", //http方法
           proTopicIdList, //项目id集合
           cpTopicIdList,//竞品id集合
          "similarType":this.radio_duibi_Method, //相似性计算方式
          "percent":this.radio_duibi_Percent// “0.05” “0.1” “0.2” “0.5”//词表样本百分比
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/topic/cpa/similartable',"GET",params).then((data) =>{//ajax
          if(successBack(data,this)){
            for(let i=0;i<this.duibiData[0].topicList.length;i++){
              let obj={};
              obj.name=this.duibiData[0].topicList[i].name;
              obj.eventId=this.duibiData[0].topicList[i].id;
              //obj.eventArticleList=this.$store.state.data[i].commonResult.eventArticleList;
              //obj.keywordList=this.$store.state.data[i].commonResult.keywordList;
              obj.Data=this.duibiData[0].topicList[i];
              obj.project_id=GetLocalStorage('current_projectData_A').project_id;
              obj.data=[];
              let fun=this.radio_duibi_Method == 4 ? Math.min : Math.max;
              let maxData = [];//每一行的相似度数组
              for(let k of cpTopicIdList){
                  for(let j of data.data){
                    if(j.topicAId == proTopicIdList[i] && k == j.topicBId){
                      maxData.push(j.similarity);
                      let _obj={};
                      _obj.checked=false;
                      _obj.disabled1=false;
                      _obj.disabled2=false;
                      _obj.num=j.similarity;
                      obj.data.push(_obj)
                    } 
                  }
              };
              for(let k of obj.data){//每一行找到最小值与最大值
                if(k.num == fun.apply(null,maxData)){//数组里取最大值或者最小值方法
                  k.max = true;
                }
              };
              this.tableData.push(obj)
            }
            this.loading_start=false;
            this.table_own_name=this.duibiData[0].name;
            this.table_compet_name=this.duibiData[1].name;
            this.table_compet_data=this.duibiData[1].data.topicList;
            this.colspan=this.tableData[0].data.length+2;
            this.rowspan=this.tableData.length+1;
          };
        });
         console.log(this.tableData)
      },
     _start (compet_flag,loading_flag,oid) { //compet_flag竞品议题查询标识，如果true则是自身点击查询;loading_flag--true则显示
      let _this = this;
      let project_id;
      this.$store.state.btn_daochu = false; 
      if(loading_flag){//点击查询
       // console.log('点击查询')
        startLoading();
      };
      if(compet_flag){//点击自身查询
        project_id = GetLocalStorage('current_projectData_A') == null ? this.$router.push('/login') : GetLocalStorage('current_projectData_A').project_id;
        this.duibi_show = false;
      }else{//点击竞品查询
        this.del_duibi_id = project_id = oid;
        console.log('点击的是竞品')
      };
      

      let Dta = {
        "proId": project_id, //项目id
        "articleType": _this.articleType, //文章类型
        "startTime": _this.time[0].getTime(),//时间戳（毫秒级）
        "endTime": _this.time[1].getTime(),
        "topicNum": _this.current_sort,
        "perNum":20,
        "locNum":20,
        "orgNum":20,
        "keywordNum": "20",
        "domainList":_this.domain_arr,
        "isTiming":1,
        "ctbCompanyNameList":_this.ctbCompanyNameList//企业数据
      }; 
      let params = {"method":"GET","criteriaStr":JSON.stringify(Dta)}
      publicSearch('rsa/project/'+project_id+'/topic',"GET",params).then((data) =>{//ajax
        endLoading();
        if(successBack(data,this)){
          let color;
          if(data.data.time < 60){
            color = '#03A9F4';
          }else if(data.data.time >= 60 && data.data.time < 120){
            color = '#EF9A27';
          }else{
            color = '#FF1A1A';
          };
          let time = data.data.time >= 60 ? parseInt(data.data.time/60) + '分钟' + (parseInt(data.data.time))%60 + '秒' : parseInt(data.data.time)+'秒';
          console.log('议题预计耗时：'+time);
          this.$confirm('共查询到<i style="color:#00b38a">'+data.data.total+'</i>篇文章，生成议题预计耗时<span style="color:'+color+'">' + time +'</span>'+'，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              customClass:'ev_confirmClass',
              type: 'warning'
            }).then(() => {//搜索
              _this.$store.state.ev_duibiData = '';
              _this.table_select = [];
              $('.event_card').css('display','none')
              _this.dom_search();//筛选以及保存session
              _this.personSet = [];
              echart.dispose($('#personSet')[0]);
              _this.locationSet = [];
              echart.dispose($('#locationSet')[0]);
              _this.orgSet = [];
              echart.dispose($('#orgSet')[0]);
               _this.data = [];
              _this.loading_start = true;
              _this.programs = 0;
              let timer = setInterval(function(){
                _this.programs++;
                if(_this.programs > 98){
                  clearInterval(timer)
                };
              },(data.data.time*1000)/100);
              Dta.isTiming = '';
              let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
              publicSearch('rsa/project/'+project_id+'/topic',"GET",params).then((data) =>{
                clearInterval(timer);
                _this.loading_start = false;
                if(successBack(data,this)){
                    console.log('议题实际耗时：'+data.data.realTime);
                    console.log(data)
                  if(loading_flag){//点击查询
                    console.log('点击查询')
                    _this.loading_start = false;
                  };
                  $('.event_card').css('display','block')
                  _this.dom_write(data.data);
                //全局数据
                  if(compet_flag){//点击自身查询
                    console.log('点击查询')
                    _this.current_project_dom_name = GetLocalStorage('current_projectData_A').project_name;
                    _this.$store.state.ev_duibiData = _this.duibiData = [{'name':'','id':'','topicList':''}];
                    _this.checkedDuibi = false;
                    _this.del_duibi_flag = false;
                    _this.$store.state.data = data.data; 
                  }else{//点击竞品查询
                     _this.del_duibi_flag = true;
                     _this.popover1_show = true;
                     _this.duibiData[1] = _this.currentDuibiData;
                     _this.current_project_dom_name = _this.currentDuibiData.name;
                    _this.$store.state.ev_duibiData = _this.duibiData;
                    _this.$store.state.duibiButton = true;
                    for(let i = 0;i < _this.$store.state.ev_duibiData.length;i++){ //竞品对比数据添加到vuex
                        if(_this.$store.state.ev_duibiData[i].id == project_id){
                          _this.$store.state.ev_duibiData[i].data = data.data;
                          console.log(_this.$store.state.ev_duibiData)
                        }
                      }
                    };
                    this.$nextTick(function () {
                      _echart.build_event_qipao(_this);
                      //_echart.build_event_allEvent(_this);
                    })
                };
              })  
            }).catch((er) => {console.log(er)});
        }
      })                      
    },
    dialog_articleList_reprint(a,b,c){  //转发模态框显示
      if(b.label==='转发'){
        if(a.reprintList){
          this.dialog_reprint=true;
          this.articleList_reprint=a.reprintList;
          for(let t=0;t<this.articleList_reprint.length;t++){
                this.articleList_reprint[t].publishTime=new Date(this.articleList_reprint[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
          }
          this.currentPage_reprint_list=1;
          this.articleList_reprint_list = this.articleList_reprint.length > 12 ? this.articleList_reprint.slice(0,12) : this.articleList_reprint;
        }
      };
    },
    dialog_articleList (i,a,echartLine){  //所有相关文章模态框显示
        console.log(i)
        this.entityType = '';//区分点击实体还是议题里的相关文章的标识
        this.data_articleList_index = a;//点击相关文章列表的时候获取到他的总数据的index
        this.dialo_title = '相关文章';
        echartLine ? this.dialogEchartLine = true : this.dialogCt = true;
        //this.dialogCt = true;
        this.ct_data_total = i.articleCount;
        this.pageShow = false;  
        this.currentPage = 1;  
        this.handleCurrentChange(this.currentPage,false,false,echartLine);
      },
      echart_click (a) { //点击关键词图的显示
        let _this = this;
        this.dialogEchart = true;
        this.$nextTick(function () {
          echart.dispose($('#echart_max')[0]);
          let echart_max = echart.init($('#echart_max')[0]),dataBJ = [];
          //_this.data[a].keywordList.sort(Sort('score'));
          let keywordArr = _this.data[a].keywordList.length < 11 ? _this.data[a].keywordList : _this.data[a].keywordList.slice(0,_this.data[a].sortArr);
          for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].mention;
                    dataBJ.push(dataB)
          };
          echart_max.setOption(_echart.echart_option_event_qipao(dataBJ));
          echart_max.on('click', function (params) {
            console.log(params)
            //console.log(_this.data[a].keywordList)
            params.event.event.stopPropagation() 
            _this.qipao_idarr.push(params.data[3]);
            _this.$confirm('是否删除 '+params.data[3].slice(0,params.data[3].indexOf('/'))+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass:'ev_confirmClass',
                type: 'warning'
              }).then(() => {
                 _this.del_keywordList(a,params.data[3],_this.qipao_idarr).then((data) =>{
                    if(successBack(data,this)){
                      _this.data[a].keywordList=_this.data[a].keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.mention) === -1; });//前台删除
                      if(_this.del_duibi_flag){//自身与竞品的数据分支
                        for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                          if(_this.$store.state.ev_duibiData[h].id==_this.del_duibi_id){
                              _this.$store.state.ev_duibiData[h].data.topicList[a].keywordList=_this.data[a].keywordList;
                            }
                          }
                      };
                      _echart.build_event_qipao(_this);
                      _this.echart_click(a)
                    };
                 });

                    

                  
                //
              }).catch(() => {
                tipsMessage('已取消删除','info',_this);         
              });   
          });
        }) 
      }, 
      del_keywordList(c,d,e){ //删除关键词事件
         let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
         let params = {
          "method": 'POST',
          "topicId": this.data[c].id, //议题id
          "entityType":'key',
          "entityNameList[]":[d],
        };
        return publicSearch('rsa/project/'+project_id+'/topic/entity',"POST",params);
      },
      Mover_ct (i) { //css样式
          this.$refs.ct[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct[i].style.transition='all 0.5s';
      },
      Mover_ct_loc (i) {//css样式
          this.$refs.ct_loc[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_loc[i].style.transition='all 0.5s';
      },
      Mover_ct_org (i) {//css样式
          this.$refs.ct_org[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_org[i].style.transition='all 0.5s';
      },
      click_ct_list (i) { window.open(i.url); },//点击跳转
      Mover (a) { this.$refs.list[a].style.boxShadow = '2px 2px 3px rgba(0,0,0,.2)'; },//css样式
      Mout (a) { this.$refs.list[a].style.boxShadow = ''; },//css样式
      Mover_articleList (i) { this.$refs.articlelist[i].style.color = "#00a17c"; },//css样式
      Mover_articleList_reprint (i) { this.$refs.articlelist_reprint[i].style.color = "#00a17c";  },//css样式
      Mover_ct_list (i) { this.$refs.ct_list[i].style.color = "#00a17c"; },//css样式
      Mout_ct (i) { this.$refs.ct[i].style.boxShadow = ''; },//css样式
      Mout_ct_loc (i) { this.$refs.ct_loc[i].style.boxShadow = ''; },//css样式
      Mout_ct_org (i) { this.$refs.ct_org[i].style.boxShadow = ''; },//css样式
      Mout_articleList (i) {  this.$refs.articlelist[i].style.color = "rgb(72,87,106)"; },//css样式
      Mout_articleList_reprint (i) { this.$refs.articlelist_reprint[i].style.color = "rgb(72,87,106)"; },  //css样式
      Mout_ct_list (i) { this.$refs.ct_list[i].style.color = "#999"; }, //css样式
      sort_dropdown (command) { this.current_sort = command;}, //下拉列表点击事件
      sort_dropdown_keyword(command){ //下拉列表点击事件
        let indx = command.slice(command.length-1,command.length);
        let num = command.slice(0,command.length-1);
        this.data[indx].sortArr = num;
         console.log(command);
        _echart.build_event_qipao(this,indx,num);
      },
      sort_dropdown_per (command) { //下拉列表点击事件
        this.current_sort_per = command;
        this.personSet = this.data[this.data_Per_index].perList;
        if(this.personSet.length < this.current_sort_per){
          tipsMessage('所选数量大于数据数量','warning',this); 
          _echart.build_event_scatter(true,'personSet','人物','current_sort_per',this)
        }else{
          _echart.build_event_scatter(false,'personSet','人物','current_sort_per',this)
        }
      },
      sort_dropdown_loc (command) { //下拉列表点击事件
        this.current_sort_loc = command;
        this.locationSet = this.data[this.data_Per_index].locList;
        if(this.locationSet.length < this.current_sort_loc){
          tipsMessage('所选数量大于数据数量','warning',this); 
          _echart.build_event_scatter(true,'locationSet','地点','current_sort_loc',this)
        }else{
          _echart.build_event_scatter(false,'locationSet','地点','current_sort_loc',this)
        }
      },
      sort_dropdown_org(command) { //下拉列表点击事件
        this.current_sort_org = command;
        this.orgSet = this.data[this.data_Per_index].orgList;
        if(this.orgSet.length<this.current_sort_org){
          tipsMessage('所选数量大于数据数量','warning',this); 
          _echart.build_event_scatter(true,'orgSet','组织','current_sort_org',this)
        }else{
          _echart.build_event_scatter(false,'orgSet','组织','current_sort_org',this)
        }
      },
      del_articleList(arr){ 
          let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
          let params = {
            "method": 'POST',
            "topicId": this.data[this.data_articleList_index].id, //议题id
            "entityType": "art", //该参数只能填写art
            "entityNameList[]":arr
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+project_id+'/topic/article',"POST",params).then((data) =>{
            this.loading_start = false;
            if(successBack(data,this)){
              this.ct_data_list = this.ct_data_list.filter(item => { return arr.indexOf(item.id) === -1; });//前台删除
              this.ct_data_total = this.ct_data_total - arr.length;
              this.data[this.data_articleList_index].articleCount = this.ct_data_total;
              //初始
              if(this.ct_data_total > 0){
                this.currentPage * this.page_size > this.ct_data_total ? this.currentPage = this.currentPage - 1 : '';
                this.pageShow = false;    
                this.handleCurrentChange(this.currentPage);
              };
            };
          });  
      },
      del_threeList(arr){ //删除实体关键词等
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
        let params = {
            "method": 'POST',
            "topicId": this.data[this.data_Per_index].id, //议题id
            "entityType": this.entityType, //该参数只能填写art
            "mention":this.entityName,
            "entityNameList[]":arr
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+project_id+'/topic/entity/article',"POST",params).then((data) =>{
            this.loading_start = false;
            if(successBack(data,this)){
              this.ct_data_list = this.ct_data_list.filter(item => { return arr.indexOf(item.id) === -1; });//前台删除
              this.ct_data_total = this.ct_data_total - arr.length;
              for(let i of this.data[this.data_Per_index][this.entityType == 'key' ? this.entityType+'wordList' : this.entityType+'List']){
                if(i.mention == this.entityName){
                  i.articleCount = this.ct_data_total;
                };
              };
              //初始
              if(this.ct_data_total > 0){
                this.currentPage * this.page_size > this.ct_data_total ? this.currentPage = this.currentPage - 1 : '';
                this.pageShow = false;    
                this.handleCurrentChange(this.currentPage,true);
              }else{//全选所有
                this.open_del_per()
              };
            };
          });  
      },
      del_per(t,a,b,c,e){ //t = 实体，a = 实体列表数据，  b='personSet';c='perList';e='current_sort_per';
        let _this=this;
        console.log(this.data)
        console.log(this[b])
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
        let f;                                 
        this.mentionArr = [t.mention];
        let params = {
          "method": 'POST',
          "topicId": this.data[this.data_Per_index].id, //议题id
          "entityType":c.slice(0,3),
          "entityNameList[]":this.mentionArr
        };
        publicSearch('rsa/project/'+project_id+'/topic/entity',"POST",params).then((data) =>{//ajax
          if(successBack(data,this)){
            this[b] = this[b].filter(item => { return this.mentionArr.indexOf(item.mention) === -1; });//前台删除

            if(this.del_duibi_flag){//自身与竞品的数据分支
                for(let i=0;i<this.$store.state.ev_duibiData.length;i++){
                  if(this.$store.state.ev_duibiData[i].id == this.del_duibi_id){
                      this.$store.state.ev_duibiData[i].data.topicList[this.data_Per_index][c]=this.$store.state.ev_duibiData[i].data.topicList[this.data_Per_index][c].filter(item => { return this.mentionArr.indexOf(item.mention) === -1; }); 
                    }
                  }
              }else{
                this.data[this.data_Per_index][c]=this.data[this.data_Per_index][c].filter(item => { return this.mentionArr.indexOf(item.mention) === -1;});
              };
              f = this.data[this.data_Per_index][c].length < this[e] ? true : false ;
              _echart.build_event_scatter(f,b,this.dialo_title.slice(this.dialo_title.length-4,this.dialo_title.length-2),e,this)
          };
        });  
      },
      blur_input (i){//改变标题后的事件
       
        this.$refs.inpt[i].type = 'button';
        this.data[i].titleTooltip = false;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
        if(this.data[i].name!=this.$refs.inpt[i].value){
        this.loading_start = true;
        let params = {
            "method": 'POST',
            "topicId": this.data[i].id, //议题id
            "newTitle":this.$refs.inpt[i].value
         };
        publicSearch('rsa/project/'+project_id+'/topic/update/title','POST',params).then((data) =>{
            this.loading_start = false;
            if(successBack(data,this)){
              
              if(this.del_duibi_flag){//自身与竞品的数据分支
                for(let j of this.$store.state.ev_duibiData){
                  if(j.id == this.del_duibi_id){
                    j.data.topicList[i].name = params.newTitle;
                  };

                };
              }else{
                this.data[i].name = params.newTitle;
                this.$store.state.data.topicList[i].name = params.newTitle;
              };
            };
         });   

        }
      },
      blur_table(dta,i,flag){//改变议题标题后的事件
        console.log(dta)
        let project_id = dta.proId == undefined ? dta.project_id : dta.proId;
        let inp = flag ? 'cp_inpt' : '_inpt';
        this.loading_start = true;
        let params = {
            "method": 'POST',
            "topicId": flag ? dta.id : dta.eventId, //议题id
            "newTitle":this.$refs[inp][i].value
         };
        publicSearch('rsa/project/'+project_id+'/topic/update/title',"POST",params).then((data) =>{
            this.loading_start = false;
            if(successBack(data,this)){
              if(flag){//自身与竞品的数据分支
                for(let j of this.$store.state.ev_duibiData){
                  if(j.id == dta.proId){
                     j.data.topicList[i].name = params.newTitle;
                  };
                };
              }else{
                console.log(params.newTitle)
                this.$store.state.data.topicList[i].name = params.newTitle;
                this.tableData[i].name = params.newTitle;
                console.log(this.tableData)
              };
              
            };
        });    
        console.log(dta)
      },
      
      handleCurrentChange (val,entityType,entityName,echartLine) { //查询文章列表 val = 当前页 entitytype = 实体类型 entityName =  实体名称  echartLine 事件走势图flag
        this.currentPage = val;
        //console.log(this.data_Per_index)
        let proID = '';
        this.del_duibi_flag ? proID = this.del_duibi_id : proID = GetLocalStorage('current_projectData_A').project_id;
        let url = this.entityType ? 'rsa/project/'+proID+'/topic/'+this.data[this.data_Per_index].id+'/entity/article' : 'rsa/project/'+proID+'/topic/'+this.data[this.data_articleList_index].id+'/article';
        this.loading_start = true;
        let params = {
            "method": 'GET',
            "topicId": this.entityType ? this.data[this.data_Per_index].id : this.data[this.data_articleList_index].id, //议题id
            "entityType": this.dialo_title == '相关文章' ? '' : this.entityType,
            "entityName": this.dialo_title == '相关文章' ? '' : this.entityName,
            "articleType": this.articleType, //文章类型
            "pageSize": this.page_size,//每页数量
            "pageNum": val //页码
         };
        this.dialo_title == '相关文章' ? (echartLine ? params.isPage = 0 : params.isPage = 1) : ''; //是否分页
        publicSearch(url,"GET",params).then((data) =>{ 
            this.loading_start = false;
          if(successBack(data,this)){
            this.ct_data_list = data.data == null ? [] : data.data.articleList;
            echartLine ? this.$nextTick(() => _echart.build_event_line('dialogEchartLine',this.ct_data_list)) : this.$nextTick(() => this.pageShow = true);
            /*this.$nextTick(() => this.pageShow = true);
            this.$nextTick(() => _echart.build_event_line('dialogEchartLine',this.ct_data_list));*/
            /*this.$nextTick(function () {
              this.pageShow = true
            });*/
          }
        })
      },
      similarData_arc_handleCurrentChange(val){//相似度表格里面自身文章列表页码变化
        this.loading_start = true;
        let params = {
            "method": 'GET',
            "topicId": this.similarData_topicId, //议题id
            "articleType": this.articleType, //文章类型
            "pageSize": this.similarData_arc_pageSize,//每页数量
            "pageNum": val //页码
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/topic/'+this.similarData_topicId+'/article',"GET",params).then((data) =>{
            this.loading_start = false;
          if(successBack(data,this)){
            this.similarData_arc_list = data.data.articleList;
            this.$nextTick(function () {
              this.pageShow = true
            });
          }
        })
      },
      similarData_arc_handleCurrentChange_cpa(val){//相似度表格里面竞品文章列表页码变化
        this.loading_start = true;
        let params = {
            "method": 'GET',
            "topicId": this.similarData_cpTopicId, //议题id
            "articleType": this.articleType, //文章类型
            "pageSize": this.similarData_arc_pageSize,//每页数量
            "pageNum": val //页码
        };
        publicSearch('rsa/project/'+this.duibiData[1].id+'/topic/'+this.similarData_cpTopicId+'/article',"GET",params).then((data) =>{
            this.loading_start = false;
          if(successBack(data,this)){
            this.similarData_arc_list_cpa = data.data.articleList;
            this.$nextTick(function () {
              this.pageShow = true
            });
          }
        })
      },
      handleCurrentChange_reprint_list(val){ //转发文章 已废弃
        this.currentPage_reprint_list = val;
        this.format_tabledata_('currentPage_reprint_list','page_size_reprint_list','articleList_reprint','articleList_reprint_list');
      },
      del_ev(i){ //删除事件
        console.log(this.del_duibi_id)
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetLocalStorage('current_projectData_A').project_id;
        let params = {
          "method": 'POST',
          "topicIdList[]" : [i.id]
        };
        publicSearch('rsa/project/'+project_id+'/topic',"POST",params).then((data) =>{
          if(successBack(data,this)){
            this.data = this.data.filter(item => { return [i.id].indexOf(item.id) === -1; });//前台删除
            _echart.build_event_qipao(this);
            if(this.del_duibi_flag){
              for(let i of this.$store.state.ev_duibiData){
                if(i.id == this.del_duibi_id){
                  i.data.topicList = this.data;
                  //初始化
                  this.personSet = this.data[0].perList;
                  this.event_scatter().per();
                  this.locationSet = this.data[0].locList;
                  this.event_scatter().loc();
                  this.orgSet = this.data[0].orgList;
                  this.event_scatter().org();
                };
              };
            }else{
              this.$store.state.data.topicList = this.data;
               //初始化
              this.personSet = this.data[0].perList;
              this.event_scatter().per();
              this.locationSet = this.data[0].locList;
              this.event_scatter().loc();
              this.orgSet = this.data[0].orgList;
              this.event_scatter().org();
              console.log(this.$store.state.data)
            };
          };
          
        });  

      },

       domain_click(a,b){//媒体分类选择点击事件
        $('.'+b+''+' '+'.'+b+'_all'+'').removeClass('warning');
         if(a.target.className=='btn'){
          a.target.className="btn warning"
        }else if(a.target.className="btn warning"){
          a.target.className="btn"
        }
      },
      open_del_threeList(){ //删除文章列表
        if(this.dialo_title!=='相关文章'){
          let arr=[];
          for(let i=0;i<this.ct_articlelist_selection.length;i++){
            arr.push(this.ct_articlelist_selection[i].id)
          };
          this.del_threeList(arr);
        }else{
          let arr=[];
          for(let i=0;i<this.ct_articlelist_selection.length;i++){
            arr.push(this.ct_articlelist_selection[i].id)
          };
          this.del_articleList(arr);
        };  
      },
      open_del_per(){//删除实体
        if(this.entityType == 'key'){
          this.del_keywordList(this.data_Per_index,this.entityName,[this.entityName]).then((data) =>{
                    if(successBack(data,this)){
                      this.data[this.data_Per_index].keywordList=this.data[this.data_Per_index].keywordList.filter(item => { return [this.entityName].indexOf(item.mention) === -1; });//前台删除
                      if(this.del_duibi_flag){//自身与竞品的数据分支
                        for(let h=0;h<this.$store.state.ev_duibiData.length;h++){
                          if(this.$store.state.ev_duibiData[h].id==this.del_duibi_id){
                              this.$store.state.ev_duibiData[h].data.topicList[this.data_Per_index].keywordList=this.data[this.data_Per_index].keywordList;
                            }
                          }
                      };
                      _echart.build_event_qipao(this);
                      //this.echart_click(this.data_Per_index)
                      this.dialogCt=false;
                    };
                 });
        }else{
            let a,b,c,d,listData,e;
            if(this.dialo_title.slice(this.dialo_title.length-4,this.dialo_title.length-2)==='人物'){
              listData=this.data[this.data_Per_index].perList;
              c='personSet';d='perList';e='current_sort_per';
            }else if(this.dialo_title.slice(this.dialo_title.length-4,this.dialo_title.length-2)==='组织'){
              listData=this.data[this.data_Per_index].orgList;
              c='orgSet';d='orgList';e='current_sort_org';
            }else{
              listData=this.data[this.data_Per_index].locList;
              c='locationSet';d='locList';e='current_sort_loc';
            };
            for(let i=0;i<listData.length;i++){
              if(listData[i].mention.slice(0,listData[i].mention.indexOf('/'))===this.dialo_title.slice(0,this.dialo_title.length-5)){
                a=listData[i];
                this.del_per(a,listData,c,d,e);
                this.dialogCt=false;
               }
            };   
        }
        //console.log(this.data[this.data_Per_index].commonResult[d])
        
      },
      ct_articlelist_select(a){ this.ct_articlelist_selection = a ;},//选中事件文章列表
      add_duibi(){ //查找对比数据
        //this.dialogDuibiList=true;
        let data = {
          "method": 'get',
          "project" : {
            'parentId':GetLocalStorage('current_projectData_A').project_id//当前项目id,
          }
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"GET",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.duibiList = data.data;
          }
        }); 
      },
      add_duibiName(Dta){ //添加对比项目
        console.log(Dta)
        //this.duibiData = [];
        //let obj = {};
        console.log(this.duibiData)
        this.duibiData[0].name = GetLocalStorage('current_projectData_A').project_name;
        this.duibiData[0].id = GetLocalStorage('current_projectData_A').project_id;
        this.duibiData[0].topicList = this.$store.state.data.topicList;
        //this.duibiData[0] = obj;
        if(Dta){
          this.currentDuibiData = Dta;
          this._start(false,true,Dta.id);
        };
        if(this.del_duibi_flag){
          this.duibiData = this.$store.state.ev_duibiData;
        }
        
        console.log(this.duibiData)
      },
      look_venn(index,dta){ //对比的维恩图
        console.log(dta)
        console.log(index)
        console.log(this.duibiData)
        this.similarData_topicId = dta.Data.id;
        this.similarData_cpTopicId = this.duibiData[1].data.topicList[index].id;
        this.dialogSimilar = true;
        this.similarData_per_currentPage = this.similarData_loc_currentPage = this.similarData_org_currentPage = this.similarData_key_currentPage = this.similarData_arc_currentPage = 1;              
        let _this = this,data = dta.Data,cp_data = this.duibiData[1].data.topicList[index];
        let perSize = data.perList.length > cp_data.perList.length ? data.perList.length : cp_data.perList.length,similar_per,perData = [],orgSize = data.orgList.length > cp_data.orgList.length ? data.orgList.length : cp_data.orgList.length,similar_org,orgData = [],locSize = data.locList.length > cp_data.locList.length ? data.locList.length : cp_data.locList.length,similar_loc,locData = [],keySize = data.keywordList.length > cp_data.keywordList.length ? data.keywordList.length : cp_data.keywordList.length,similar_key,keyData = []/*,arcSize = data.eventArticleList.length > cp_data.eventArticleList.length ? data.eventArticleList.length : cp_data.eventArticleList.length,similar_arc,similar_arc_title = [],similar_arc_url = [],arcData = []*/;
        similar_per = similar(data.perList,cp_data.perList,'mention');
        this.similar_per_arr = similar_per;
        similar_org = similar(data.orgList,cp_data.orgList,'mention');
        this.similar_org_arr = similar_org;
        similar_loc = similar(data.locList,cp_data.locList,'mention');
        this.similar_loc_arr = similar_loc;
        similar_key = similar(data.keywordList,cp_data.keywordList,'mention');
        this.similar_key_arr = similar_key;
        //similar_arc = this.similar(data.eventArticleList,cp_data.eventArticleList,'id');
        for(let i = 0;i < perSize;i++){
          let obj = {};
          obj.per = data.perList[i] == undefined ? '无' : data.perList[i].mention;
          obj.cp_per = cp_data.perList[i] == undefined ? '无' : cp_data.perList[i].mention;
          obj.similar_per = similar_per[i] == undefined ? '无' : similar_per[i];
          perData.push(obj);
        };
        for(let i = 0;i < orgSize;i++){
          let obj = {};
          obj.org = data.orgList[i] == undefined ? '无' : data.orgList[i].mention;
          obj.cp_org = cp_data.orgList[i] == undefined ? '无' : cp_data.orgList[i].mention;
          obj.similar_org = similar_org[i] == undefined ? '无' : similar_org[i];
          orgData.push(obj);
        };
        for(let i = 0;i < locSize;i++){
          let obj = {};
          obj.loc = data.locList[i] == undefined ? '无' : data.locList[i].mention;
          obj.cp_loc = cp_data.locList[i] == undefined ? '无' : cp_data.locList[i].mention;
          obj.similar_loc = similar_loc[i] == undefined ? '无' : similar_loc[i];
          locData.push(obj);
        };
        for(let i = 0;i < keySize;i++){
          let obj = {};
          obj.key = data.keywordList[i] == undefined ? '无' : data.keywordList[i].mention;
          obj.cp_key = cp_data.keywordList[i] == undefined ? '无' : cp_data.keywordList[i].mention;
          obj.similar_key = similar_key[i] == undefined ? '无' : similar_key[i];
          keyData.push(obj);
        };
        //文章列表_自身
        this.similarData_arc_total = data.articleCount;
        this.pageShow = false;  
        this.similarData_arc_currentPage = 1;  
        this.similarData_arc_handleCurrentChange(this.similarData_arc_currentPage);
        //文章列表_竞品
        this.similarData_arc_total_cpa = cp_data.articleCount;
        this.pageShow = false;  
        this.similarData_arc_currentPage_cpa = 1;  
        this.similarData_arc_handleCurrentChange_cpa(this.similarData_arc_currentPage_cpa);

        _this.similarData_per=perData;
        _this.format_firstTableData('similarData_per','similarData_per_list',_this.similarData_per_pageSize);
        _this.similarData_loc=locData;
        _this.format_firstTableData('similarData_loc','similarData_loc_list',_this.similarData_per_pageSize);
        _this.similarData_org=orgData;
        _this.format_firstTableData('similarData_org','similarData_org_list',_this.similarData_per_pageSize);
        _this.similarData_key=keyData;
        _this.format_firstTableData('similarData_key','similarData_key_list',_this.similarData_per_pageSize);
        //_this.similarData_arc=arcData;
        //_this.format_firstTableData('similarData_arc','similarData_arc_list',_this.similarData_arc_pageSize);
      },
      save(){//导出事件
        /*console.log(this.$store.state.data.topicList)
        console.log(this.$store.state.ev_duibiData)
        console.log(this.table_select);*/
        let proTopicDto = {},cpTopicDtoList = [],cpaResult = [],obj = {};
        if(this.$store.state.data.topicList){//自身
          let idArr = [];
          for(let i of this.$store.state.data.topicList){
              idArr.push(i.id);
            };
            proTopicDto.topicIdList = idArr;
            proTopicDto.proId = this.$store.state.data.topicList[0].proId;
        }else{
          tipsMessage('请先生成自身项目议题','warning',this);
          return
        };
        if(this.$store.state.ev_duibiData.length > 1 && this.$store.state.ev_duibiData[1].data != null && this.checkedDuibi){//有竞品时
          let idArr = [];
          for(let i of this.$store.state.ev_duibiData[1].data.topicList){
            idArr.push(i.id);
          };
          obj.topicIdList = idArr;
          obj.proId = this.$store.state.ev_duibiData[1].id;
          cpTopicDtoList.push(obj);
        };
        if(this.table_select.length > 0){//有对比议题时
          for(let i of this.table_select){
            let obj = {};
            obj.topicAId = i.proEventId;
            obj.topicBId = i.cpEventId;
            obj.similarity = i.similarity;
            cpaResult.push(obj);
          };
        };
        this.$prompt('请输入导出议题名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass:'ev_confirmClass',
          closeOnClickModal:false,
          inputPattern:/\S/,
          inputErrorMessage: '名称不能为空',
          inputValue:GetLocalStorage('current_projectData_A').project_name
        }).then(({ value }) => {
          let data = {
            "proId":GetLocalStorage('current_projectData_A').project_id,
            "startTime": this.time[0].getTime(),//时间框中的起始时间
            "endTime": this.time[1].getTime(),//结束时间
            "reportName":value,
            "articleType":this.articleType,
             proTopicDto,
             cpTopicDtoList,
             cpaResult
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/topic/expt',"POST",{'topicExptDtoStr':JSON.stringify(data)}).then((data) =>{//ajax
            this.dialog_look_duibiProject = false;
            this.loading_start = false;
            if(successBack(data,this)){
              //清空所有数据
              this.$store.state.ev_duibiData = '';
              this.table_select = [];
              this.$store.state.btn_daochu = true;
              echart.dispose(document.getElementById('personSet'));
              echart.dispose(document.getElementById('orgSet'));
              echart.dispose(document.getElementById('locationSet'));
              this.data = []; 
              tipsMessage(data.message,'success',this);
            };
          });
        }).catch(() => {})
        console.log(this.table_select)
      },
      handleCheckedCitiesChange(index,dta,table,data){//当对比表格选中事件的时候触发的函数
          //console.log(table.checked)
          if(table.checked == true){//加入到table_select
            if(this.table_select.length > 1){//判断是否选中两个
              tipsMessage('最多选择两个对比议题','warning',this);
              table.checked = false;
              return;
            }else{
              let obj={};
              obj.proId=dta.project_id;
              obj.proEventId=dta.eventId;
              obj.similarity=table.num;
              obj.cpId=this.duibiData[1].data.topicList[index].proId;
              obj.cpEventId=this.duibiData[1].data.topicList[index].id;
              this.table_select.push(obj);
              for(let i of this.tableData){
                if(this.table_select.length == 1){
                  i.data[index].disabled1 = true;
                }else{
                  i.data[index].disabled2 = true;
                }
              };
              for(let i of dta.data){
                if(this.table_select.length == 1){
                  i.disabled1 = true;
                }else{
                  i.disabled2 = true;
                }
              };
              if(this.table_select.length == 1){
                dta.data[index].disabled1 = false;
              }else{
                dta.data[index].disabled2 = false;
              }
            }
          }else{//从table_select里删除
              for(let i of this.tableData){
                if(this.table_select.length == 1){
                  i.data[index].disabled1 = false;
                  i.data[index].disabled2 = false;
                }else{
                  if(i.data[index].disabled1 && i.data[index].disabled2){
                    i.data[index].disabled2 = false;
                    continue;
                  };
                  if(i.data[index].disabled1 == true && i.data[index].disabled2 == false){
                    i.data[index].disabled1 = false;
                    continue;
                  };
                  if(i.data[index].disabled2 == true && i.data[index].disabled1 == false){
                    i.data[index].disabled2 = false;
                    continue;
                  };
                }
              };
              for(let i of dta.data){
                if(this.table_select.length == 1){
                   i.disabled1 = false;
                   i.disabled2 = false;
                }else{
                  if(i.disabled1 && i.disabled2){
                   i.disabled2 = false;
                   continue;
                  }
                  if(i.disabled1 == true && i.disabled2 == false){
                    i.disabled1 = false;
                    continue;
                  };
                  if(i.disabled2 == true && i.disabled1 == false){
                    i.disabled2 = false;
                    continue;
                  };
                }  
              };
               this.table_select.splice(this.table_select.findIndex(item => item.own_eventId===dta.eventId&&item.compet_eventId===this.duibiData[1].data.topicList[index].id), 1);
          }

        /*展示图*/
        let cateList = [],linkList = [],dataList = [],selectIdArr = [];
        //cateList
        cateList.push({'name':this.duibiData[0].name});
        cateList.push({'name':this.duibiData[1].name});
        //dataList
        let obj1 = {};
        obj1.category = obj1.name = this.duibiData[0].name;
        obj1.x = 25;
        obj1.y = 50;
        obj1.nodeType = 1;

        let obj2 = {};
        obj2.category = obj2.name = this.duibiData[1].name;
        obj2.x = 75;
        obj2.y = 50;
        obj2.nodeType = 2;
        obj2.symbolSize = obj1.symbolSize = 50;

        dataList.push(obj1);
        dataList.push(obj2);
        for(let i = 0 ;i < this.table_select.length;i++){
          let o = {};
          o.name = this.duibiData[0].topicList[this.duibiData[0].topicList.findIndex(item => item.id == this.table_select[i].proEventId)].name;
          cateList.push(o);
          selectIdArr.push(this.table_select[i].proEventId);
          selectIdArr.push(this.table_select[i].cpEventId);
          //dataList
          let obj = {};
          obj.category = obj.name = this.duibiData[0].topicList[this.duibiData[0].topicList.findIndex(item => item.id == this.table_select[i].proEventId)].name;
          this.duibiData[0].topicList[this.duibiData[0].topicList.findIndex(item => item.id == this.table_select[i].proEventId)].articleCount >= this.duibiData[1].data.topicList[this.duibiData[1].data.topicList.findIndex(item => item.id == this.table_select[i].cpEventId)].articleCount ? obj.x = 40 : obj.x = 60;
          obj.symbolSize = 30;
          obj.nodeType = 0;
          obj.cpName = this.duibiData[1].data.topicList[this.duibiData[1].data.topicList.findIndex(item => item.id == this.table_select[i].cpEventId)].name;
          if(i == 1 ){
            obj.y = 58;
          }else{
            obj.y = 48;
          }
          dataList.push(obj);
        };
        console.log(cateList);
        console.log(selectIdArr);
        
        //linkList

        for(let i = 2;i < cateList.length;i++){
          let obj = {};
          obj.source = cateList[0].name;
          obj.target = cateList[i].name;
          linkList.push(obj);
          let o = {}
          o.source = cateList[1].name;
          o.target = cateList[i].name;
          linkList.push(o);
        };

        let proFilterTopiclist = this.duibiData[0].topicList.filter(item => { return selectIdArr.indexOf(item.id) === -1; });
        let cpFilterTopiclist = this.duibiData[1].data.topicList.filter(item => { return selectIdArr.indexOf(item.id) === -1; });
        let proXY = [{'x':13,'y':48},{'x':10,'y':56},{'x':12,'y':60},{'x':11,'y':43},{'x':17,'y':36},{'x':17,'y':73},{'x':21,'y':34},{'x':24,'y':74},{'x':1,'y':52}];
        for(let i = 0;i < proFilterTopiclist.length;i++){
          //相同的标题name
          cpFilterTopiclist.findIndex(item => item.name == proFilterTopiclist[i].name) != -1 ? cpFilterTopiclist[cpFilterTopiclist.findIndex(item => item.name == proFilterTopiclist[i].name)].name += ' ' : ''
          //linkList
          let obj = {};
          obj.source = this.duibiData[0].name;
          obj.target = proFilterTopiclist[i].name;
          linkList.push(obj);
          //dataList
          let o = {};
          o.category = obj.source;
          o.name = obj.target;
          o.symbolSize = 30;
          o.nodeType = 0;
          o.x = proXY[i].x;
          o.y = proXY[i].y;
          dataList.push(o);
        };

       
        let cpXY = [{'x':84,'y':43},{'x':86,'y':46},{'x':89,'y':57},{'x':80,'y':35},{'x':93,'y':66},{'x':88,'y':71},{'x':76,'y':26},{'x':81,'y':74},{'x':99,'y':48}];
        for(let i = 0;i < cpFilterTopiclist.length;i++){
          let obj = {};
          obj.source = this.duibiData[1].name;
          obj.target = cpFilterTopiclist[i].name;
          linkList.push(obj);
          //dataList
          let o = {};
          o.category = obj.source;
          o.name = obj.target;
          o.symbolSize = 30;
          o.nodeType = 0;
          o.x = cpXY[i].x;
          o.y = cpXY[i].y;
          dataList.push(o);
        };
        console.log(linkList);
        console.log(dataList);
        /*filterProCpList = [...this.duibiData[0].topicList,...this.duibiData[1].data.topicList].filter(item => { return selectIdArr.indexOf(item.id) === -1; });//过滤后自身和竞品的文章列表*/ 
       this.$nextTick(function () {
          _echart.build_graph('DuiBi',cateList.slice(0,2),cateList.slice(2,cateList.length),cateList,dataList,linkList);
        });
        
      },
      
      card_click (a) {//改变页数的表格数据变化
        let _this=this;
        _this.data_Per_index=a;
        if(_this.data[a].perList!=null&&_this.data[a].perList.length>0){
          _this.personSet=_this.data[a].perList;
          _this.event_scatter().per();
        };
        if(_this.data[a].locList!=null&&_this.data[a].locList.length>0){
          _this.locationSet=_this.data[a].locList;
          _this.event_scatter().loc();
        };
        if(_this.data[a].orgList!=null&&_this.data[a].orgList.length>0){
          _this.orgSet=_this.data[a].orgList;
          _this.event_scatter().org();
        };    
      },
      format_tabledata_ (crrtpage,pageSize,dta,dtaList) {//初始表格数据
        let newdata=[],
        pageNum=this[crrtpage]-1;
        for(let i=this[pageSize]*pageNum;i<this[pageSize]*pageNum+this[pageSize];i++ ){
          this[dta][i] !== undefined ? newdata.push(this[dta][i]) : '' 
        }
        this[dtaList]=newdata;       
      },
      
      format_firstTableData(dta,dtaList,pageSize){//初始表格数据
        this[dtaList]=this[dta].length > pageSize ? this[dta].slice(0,pageSize) : this[dta];
      },
      visibleChangeEventNum(a){ //下拉箭头样式
        this.sort_dropdown_visible_eventNum = !a;
      },
      
      dom_search(){ //筛选条件里的属性与下拉列表的dom数据以及保存
        this.domin_popover = false;
        let domain_arr=[];
        let domain=$('.domain .warning').not('.domain .domain_all');
        for(let i=0;i<domain.length;i++){
          domain_arr.push(domain[i].innerHTML);
        }
        let custom_arr_name=[];
        let custom_arr=[];
        let custom=$('.custom .warning').not('.custom .custom_all');
        for(let i=0;i<custom.length;i++){
          custom_arr_name.push(custom[i].innerHTML);
        };
        let arr_data = this.custom.filter(item => { return custom_arr_name.indexOf(item.name) !== -1; });
        for(let i=0;i<arr_data.length;i++){
          custom_arr.push(arr_data[i].id);
        }
        this.domain_arr=domain_arr;
        this.custom_arr=custom_arr;
  
      },
      qiye_search(){//筛选企业A和企业B
        this.qiye_popover = false;
        this.ctbCompanyNameList[0] = this.companyData.companyA;
        this.ctbCompanyNameList[1] = this.companyData.companyB;
        console.log(this.ctbCompanyNameList)
      },
      
      dom_write(data){//查询到文章遍历到dom操作
        if(data.topicList==null||data.topicList.length==0){
          tipsMessage('查询到的文章数量太少,无法生成议题。请调整时间区间或增加关键词后再试。','warning',this); 
          return;
        };
        for(let z=0;z<data.topicList.length;z++){
          data.topicList[z].locList ? data.topicList[z].locList.sort(Sort('score')) : '' ;
          data.topicList[z].orgList ? data.topicList[z].orgList.sort(Sort('score')) : '' ;
          data.topicList[z].perList ? data.topicList[z].perList.sort(Sort('score')) : '' ;
          data.topicList[z].sortArr = '10';
          data.topicList[z].titleTooltip = false;
        }
        this.data=data.topicList;
        if(data.topicList[0].perList != null && data.topicList[0].perList.length > 0){
          this.personSet = data.topicList[0].perList;
          this.event_scatter().per();
        };
        if(data.topicList[0].locList!=null&&data.topicList[0].locList.length>0){
          this.locationSet=data.topicList[0].locList;
          this.event_scatter().loc();
        };
        if(data.topicList[0].orgList!=null&&data.topicList[0].orgList.length>0){
          this.orgSet=data.topicList[0].orgList;
          this.event_scatter().org();
        };
      },
     
      event_scatter(){  //人物组织地点散点图
        let _this =this;
          return{
              per(){
                _this.personSet.length < _this.current_sort_per ? _echart.build_event_scatter(true,'personSet','人物','current_sort_per',_this) : _echart.build_event_scatter(false,'personSet','人物','current_sort_per',_this);
               },
              loc(){
                _this.locationSet.length < _this.current_sort_loc ? _echart.build_event_scatter(true,'locationSet','地点','current_sort_loc',_this) : _echart.build_event_scatter(false,'locationSet','地点','current_sort_loc',_this);
              },
              org(){
                _this.orgSet.length < _this.current_sort_org ? _echart.build_event_scatter(true,'orgSet','组织','current_sort_org',_this) : _echart.build_event_scatter(false,'orgSet','组织','current_sort_org',_this);
              },
              all:function(){
                this.per();
                this.loc();
                this.org();
             }
          }
      },
      similarData_per_handleCurrentChange(val){ //切换页面的数据展示
        this.similarData_per_currentPage = val;
        this.format_tabledata_('similarData_per_currentPage','similarData_per_pageSize','similarData_per','similarData_per_list');
      },
      similarData_loc_handleCurrentChange(val){//切换页面的数据展示
        this.similarData_loc_currentPage = val;
        this.format_tabledata_('similarData_loc_currentPage','similarData_per_pageSize','similarData_loc','similarData_loc_list');
      },
      similarData_org_handleCurrentChange(val){//切换页面的数据展示
        this.similarData_org_currentPage = val;
        this.format_tabledata_('similarData_org_currentPage','similarData_per_pageSize','similarData_org','similarData_org_list');
      },
      similarData_key_handleCurrentChange(val){//切换页面的数据展示
        this.similarData_key_currentPage = val;
        this.format_tabledata_('similarData_key_currentPage','similarData_per_pageSize','similarData_key','similarData_key_list');
      },
      input_write(i){//双击点击编辑文章标题
        this.$refs.inpt[i].type = 'text';
        this.data[i].titleTooltip = true;
      },
      downloadFile(){ //导出excel
       console.log(this.data);
       let Dta = this.data.length <= 3 ? this.data : this.data.slice(0,3);
       let excelData = [];
       for(let i of Dta ){
        let topArr = [];//单个议题数组
        topArr[0] = {};
        topArr[0].name = '议题：';
        topArr[0]['频次'] = i.name;
        topArr[1] = {};
        topArr[1].name = '关键词';
        topArr[1]['频次'] = '热度';
        for(let j of i.keywordList.slice(0,10)){//g关键词
          let obj = {};
              obj.name = j.mention.slice(0,j.mention.indexOf('/'));
              obj['频次'] = Number((j.score*100).toFixed(2));
              topArr.push(obj);
        };
        
        if(i.contributionVal != null){//企业贡献率
          topArr.push({'name':'','频次':'贡献率'});//企业贡献率格式
          for(let j in i.contributionVal){
            let obj = {};
            obj.name = j;
            obj['频次'] = i.contributionVal[j];
            topArr.push(obj);
          };
        };
        topArr.push({'name':''})//换行
        excelData = [...excelData, ...topArr];
       };
       console.log(excelData);
       /*let data = [{}]
        for (let k in Dta[0]) {
          data[0][k] = k
        };
        data[0].name = '';//excel 表头
        console.log(data);
        data = data.concat(Dta);
        console.log(data);*/
        downloadExl(excelData,'关键议题',this,'xlsx');//封装完的数据  excel名称
      },
      downloadArticleFile(){//导出文章列表excel
        let excelData = [{'标题':'标题','时间':'时间','媒体名称':'媒体名称','链接':'链接'}];
        for(let i of this.ct_articlelist_selection){
          let obj = {};
          obj['标题'] = i.title;
          obj['时间'] = new Date(i.publishTime).Format("yyyy-MM-dd hh:mm:ss");
          obj['媒体名称'] = i.mediaName;
          obj['链接'] = i.url;
          excelData.push(obj);
        };
        console.log(excelData);
        downloadExl(excelData,'议题文章',this,'xlsx',true);//封装完的数据  excel名称 true 列宽格式
      },
      dataPickerData(val){ //子组件数据
        this.time = val
      }
    },
  }
</script>
<style lang="scss">
.event{

  button:hover{
        opacity: 0.8;
      }
  a:hover{
        opacity: 0.8;
      }    
  .el-date-editor--datetime{
    input{  
        line-height: 23px !important;
        height: 23px !important;
        padding-right: 0 ;
      }
      .el-input__icon{
        line-height: 22px;
      }
  }
    .el-input__inner{
      height: 30px;
    }
    
    .el-dropdown{
      >.el-button--default{
        padding: 4px 10px;
      }
    }
    .filter_event{
      .el-input__prefix{
        background-image: url('../../../assets/icon/time.png');
        width: 12px;
        height: 12px;
        left: 9px;
        top:5px;
        .el-input__icon{
          opacity: 0;
        }
      }
      .el-popover__reference:hover{
        color: rgb(0, 179, 138)
      }
      #domain_m,#custom_m{
        display: none;
      }
      #hide_btn,#hide_btn_custom{
        display: none;
      }
    }
  .event_card{
    width: 1240px;
    position: relative;
     >div:hover{
      >img{
        display: inline-block !important;
      }
     }
     .live{
        box-shadow: 2px 2px 3px rgba(0,0,0,.2)!important;
     }
     .live1{
        box-shadow: 2px 2px 3px rgba(0,0,0,.2)!important;
     }
     .card:nth-child(3n){
        margin-right: 1px !important;
        margin-left: 1px;
      }
     .card:nth-child(3n+1){
        margin-left: 20px;
      } 
  }
  #panel{
       -webkit-display: flex;
       -ms-display: flex;
       display: flex;
       flex-direction:row;
       justify-content:space-around;
       padding-bottom: 10px;
       >.panel{
        width: 393px;
        border-color: #ebebeb;
        .panel-heading{
          border-color: #ebebeb;
        }
        .panel-body{
          padding: 5px;
          width: 391px;
          height: 310px;
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
          .ct:hover{
              img{
                 display: inline-block !important;
              }  
          }
        }
       }
  }
  .panel-default{
      margin-bottom: 0;
      border-color: #ebebeb;
  }
   #dialog_list,#dialog_reprint{
    .el-dialog{
      width: 33%;
      .el-step__main:hover{
        img{
          display: inline-block !important;
        }
      }
    }
  } 
  #dialog_list,#dialog_list_es,#dialog_reprint,#dialog_DuibiList{
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
          color: #00b38a;
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
            top:13px;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            background-image: url('../../../assets/icon/ev_del2.png');
            cursor: pointer;
          }
          .el-dialog__close{
            display: none;
          }
        }
      }  
  }
  #dialog_echart,#dialog_similar{
      .el-dialog__header{
        width: 1175px;
      }
      .el-dialog__body{
        position:relative;
        padding: 10px 10px;
        height: 800px;
        .page{
            position: absolute;
            right: 5px; 
            bottom: 5px;
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
        .el-table .cell, .el-table th>div{
          line-height: 30px;
          padding: 0 5px;
        }
        .el-table td{
          height: 30px;
        }
        .similarArt{
          .el-table thead{
            display: none;
          }
        }
      }
  }
  #dialog_echart{
      .el-dialog__body{
        padding: 10px 10px;
        height: 430px;
      }
  }
  #dialog_look_duibiProject .el-dialog{
    .el-dialog__body{
      padding: 15px 40px 5px 40px;
    }
  }
  #dialog_ct,#dialog_ct_line{
    .el-dialog__body{
      padding:10px 15px 15px 15px;
      height: 560px !important;
      .el-button--text:hover span{
        color: #f56c6c;
      }
    }
    .el-table td,.el-table th{
        height: 35px !important;
        text-align: center;
    }
    .el-table{
      thead{
        tr th{
          border-bottom-width: 0;
          background-color: #f7f7f7;
        }
      }
      .el-table__row--striped td{
        background-color: #f7f7f7;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #00b38a;
        border-color: #00b38a;
      }
      .el-checkbox__input.is-focus .el-checkbox__inner{
        border-color: #00b38a;
      }
    }
    .page{
        position: absolute;
        right: 5px; 
        bottom: 5px;
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
      .el-dialog{
        border-radius: 16px;
        .el-dialog__header{
        //background: #00b38a;
        padding: 15px 0;
        text-align: center;
        border-bottom: 1px solid #ebebeb;
        width: 600px;
        margin: 0 auto;
          .el-dialog__title{
            color: #333;
            font-weight:500px;
            padding-left: 14px;
          }
           .el-dialog__headerbtn{
            top:10px;
            right: 45px;
            font-size: 25px;
          }
        }
      } 
  }
  .progress{
    height: 14px;
    .progress-bar{
      background-color: #00b38a;
      line-height: 14px;
    }
  }
  .el-tabs{
    margin-bottom: 10px;
    border-color: #ebebeb;
    .el-tabs__nav{
      .is-active{
        border-left-width: 0px;
        border-right-width: 0px;
        background-color: #eef1f6;
        color: rgb(0, 179, 138);
      }
    }
    .el-tabs__content{
      display: none;
    }
  }
  .el-tag{
     margin-left: 3px;
    background-color: rgba(255,73,73,.1);
    border-color: rgba(255,73,73,.2);
    color: #ff4949;
   }
   table{
    th,td{
            padding: 0;
            text-align: center;
       } 
    .duibi_num:hover{
        cursor: pointer;
        color:#f34c81;
       }           
    }
}
</style>