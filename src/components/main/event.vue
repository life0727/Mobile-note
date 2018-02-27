<template>  
<div class="event container" style="background-color: #fff;padding-bottom:220px;">
<div class="block" style="padding-left:5px;margin-bottom: 10px;" >
  <div class="filter_event" style="width: 100%;;border: 1px solid #dcdcdc;background: #f7f7f7;position: relative;">
    <div class="btn-group" role="group" aria-label="..." style="margin-top: 20px;" id="type">
      <span style="position: absolute;left: 20px;line-height: 28px;"><b>事件类型:</b></span>
      <button type="button" class="btn warning" style="margin-left: 90px;" @click="btn_disabled=false;articleType=2;">微信</button>
      <button type="button" class="btn " @click="articleType=1;btn_disabled=true;">新闻</button>
    </div>
    <hr style="width: 97%;">
    <button  class="btn" style="position: absolute;right: 10px;background: #f7f7f7;padding: 0px;outline: none;" id="hide_btn"  @click="hide_domain">隐藏<i class="fa fa-angle-up" style="font-size: 20px;margin-left: 5px;"></i></button>
    <button  class="btn" style="position: absolute;right: 10px;background: #f7f7f7;padding: 0px;outline: none;" id="show_btn" v-show="domain.length>15" @click="show_domain">展开<i class="fa fa-angle-down" style="font-size: 20px;margin-left: 5px;"></i></button>
    <div class="btn-group domain" role="group" aria-label="..." style="">
      <span style="position: absolute;left: 20px;line-height: 28px;"><b>行业属性:</b></span>
      <button type="button" class="btn warning domain_all" :disabled="btn_disabled" style="margin-left: 90px;">全部</button>
      <button type="button" class="btn" @click="domain_click($event,'domain')" :disabled="btn_disabled" v-for="(i,$index) in domain_s" :class="domain_arr.indexOf(i.id)== -1? '' : 'warning'">{{i.id}}</button>
    </div>
    <div class="btn-group domain" role="group" aria-label="..." style="margin-left: 145px;margin-top: 20px;width: 1000px;" id="domain_m">
     <button type="button" class="btn" @click="domain_click($event,'domain')" :disabled="btn_disabled" v-for="(i,$index) in domain_m" :class="domain_arr.indexOf(i.id)== -1? '' : 'warning'" style="margin-bottom: 20px;">{{i.id}}</button>
    </div>
    <hr style="width: 97%;">
     <button  class="btn" style="position: absolute;right: 10px;background: #f7f7f7;padding: 0px;outline: none;" id="hide_btn_custom"  @click="hide_custom">隐藏<i class="fa fa-angle-up" style="font-size: 20px;margin-left: 5px;"></i></button>
    <button  class="btn" style="position: absolute;right: 10px;background: #f7f7f7;padding: 0px;outline: none;" id="show_btn_custom" v-show="custom.length>9" @click="show_custom">展开<i class="fa fa-angle-down" style="font-size: 20px;margin-left: 5px;"></i></button>
    <div class="btn-group custom" role="group" aria-label="..." style="">
      <span style="position: absolute;left: 7px;line-height: 28px;"><b>公众号类型:</b></span>
      <button type="button" class="btn warning custom_all" style="margin-left: 90px;" :disabled="btn_disabled">全部</button>
      <button type="button" class="btn" @click="domain_click($event,'custom')" :disabled="btn_disabled" v-for="i in custom_s" :class="custom_arr.indexOf(i.id)== -1? '' : 'warning'">{{i.name}}</button>
    </div>
    <div class="btn-group custom" role="group" aria-label="..." style="margin-left: 145px;margin-top: 20px;width: 1000px;" id="custom_m">
     <button type="button" class="btn" @click="domain_click($event,'custom')" :disabled="btn_disabled" v-for="i in custom_m" :class="custom_arr.indexOf(i.id)== -1? '' : 'warning'" style="margin-bottom: 20px;">{{i.name}}</button>
    </div>
    <hr style="width: 97%;">
    <span style="position: absolute;left: 20px;line-height: 25px;"><b>监测时间:</b></span>
    <div class="block" style="display: inline-block" >
      <el-date-picker
       @change="date_change"
       :editable="edit"
       :clearable="edit"
       style="position: relative;width:170px;font-size: 12px;margin-left:90px;"
        v-model="time[0]"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </div>
    <div class="block" style="display: inline-block" >
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
    <span style="position: absolute;left: 482px;line-height: 25px;"><b>事件个数:</b></span>
    <el-dropdown  @command="sort_dropdown" style="padding-left: 100px;">
            <el-button style="padding: 3px 5px;">{{current_sort}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700"></i></el-button>    
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="i in dropdown_sort" :command="i">{{i}}</el-dropdown-item>
            </el-dropdown-menu>
    </el-dropdown>
    <span style="position: absolute;left: 635px;line-height: 25px;"><b>上下文句数:</b></span>
    <el-dropdown  @command="dropdown_jushu" style="padding-left: 120px;">
                <el-button style="padding: 3px 5px;">{{current_jushuNum}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in dropdown_jushuNum" :command="i" >{{i}}</el-dropdown-item>
                </el-dropdown-menu>
    </el-dropdown>
    <span style="position: absolute;margin-left: 50px;line-height: 25px;"><b>词性:</b></span>
    <el-dropdown  @command="dropdown_cixing" style="padding-left: 100px;">
                <el-button style="padding: 3px 5px;">{{current_cixing}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in dropdown_cixingNum" :command="i" >{{i}}</el-dropdown-item>
                </el-dropdown-menu>
    </el-dropdown>
    <hr style="width: 97%;">
    <el-button type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 400px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;" id="search" @click="_start(true,true)" v-loading.fullscreen.lock="loading_start"  element-loading-text="系统拼命加载中...">搜索</el-button>
    <el-button :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 80px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;"  @click="save_=true">导出</el-button>
    <el-button :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 80px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;"  @click="add_duibi">查看竞品</el-button>
  </div>
</div>

  <div class="el-tabs el-tabs--border-card" v-show="duibi_show">
    <div class="el-tabs__header">
      <div class="el-tabs__nav-wrap" style="border-bottom: 0px;">
        <div class="el-tabs__nav-scroll">
          <div class="el-tabs__nav">
            <div @click="compet_card(i.project.id,$event)" :class="[$index == 0 ? 'el-tabs__item is-active' : 'el-tabs__item']" v-for="(i,$index) in duibiData">{{i.project.name}}</div>
            <el-button v-show="this.$store.state.duibiButton" type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;position:absolute;left: 1120px;top: 8px;"  @click="dialogDuibiMethod=true;">添加对比</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="panel">
    <div class="panel panel-default" id="panel_person">
      <div class="panel-heading" style="padding: 6px 15px;">
        <h3 class="panel-title" style="color: #333333;"  >人物
          <span style="padding-left: 225px;font-size: 14px;">数量：</span>
          <el-dropdown  @command="sort_dropdown_per" style="">
              <el-button style="padding: 2px 6px;">{{current_sort_per}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </h3>
      </div>
      <div class="panel-body" id="personSet"  >
      </div>
    </div>
    <div class="panel panel-default" >
      <div class="panel-heading" style="padding: 6px 15px;">
        <h3 class="panel-title" style="color: #333333;" >地点
          <span style="padding-left: 225px;font-size: 14px;">数量：</span>
          <el-dropdown  @command="sort_dropdown_loc" style="">
              <el-button style="padding: 2px 6px;">{{current_sort_loc}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </h3>
      </div>
      <div class="panel-body" id="locationSet">
      </div>
    </div>
    <div class="panel panel-default" >
      <div class="panel-heading" style="padding: 6px 15px;">
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
      <div class="panel-body" id="orgSet">
      </div>
    </div>
  </div>
  <div class="panel panel-default" id="mid">
    <div class="panel-heading">
          <h3 class="panel-title" style="color: #333333;">事件</h3>
    </div>
  </div>
  <div class="event_card">
    <div v-for="(i,$index) in data" :class="{ live1:$index==0 }" style="width:387px;height: 230px;border: 1px solid #ebebeb;position: relative;overflow: hidden;cursor: pointer;float: left;padding:0 ;margin: 10px 20px 10px 5px;border-radius: 8px;" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)" @click="card_click($index)">
    <img src="../../assets/icon/del.png" style="position: absolute;top: 2px;right: 0px;cursor: pointer;z-index:10;display: none;" @click.stop="del_ev(i)">
      <div style="width: 100%;height:88px;padding: 0 5px;position: relative;">
        <div style="width: 65px;height: 76px;margin-left: 10px; " ><img src="../../assets/icon/eventnumber.png" ><span style="width:64px;height: 30px;position:absolute;left: 16px;;top:46px;color: white;font-size: 16px;text-align:center"></span></div>
        <p style="position: absolute;top: 10px;left:90px;font-size: 16px;"><img src="../../assets/icon/event-title.png" style="padding-right: 6px;color: #333333;"><span><input type="text" :value="i.label" @click.stop="input_write" @blur="blur_input($index)" ref="inpt" style="width: 260px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></p>
        <p style="position: absolute;top:35px;left:110px;color: rgb(242,196,70);cursor: pointer;" @click.stop="dialog_articleList(i,$index)"><img src="../../assets/icon/event-like.png" style="padding-right: 6px;">相关文章({{i.commonResult.eventArticleList==null ? 0 :  i.commonResult.eventArticleList.length}})</p>
      </div>
      <el-dropdown @command="sort_dropdown_keyword" style="position: absolute;z-index: 9;right: 0px;" >
              <el-button style="padding: 2px 6px;">{{i.commonResult.sortArr}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i+$index" >{{i}}</el-dropdown-item >
              </el-dropdown-menu>
          </el-dropdown>
      <div @click="echart_click($index)" style="width: 100%;height:140px;padding: 0 5px;" :id="'echart_card'+$index">
      </div>
    </div>
      <div id="all_event_echart" style="width: 1225px;height: 400px;position: relative;float: left;"></div>
  </div>
  
    <el-dialog title="详情图" v-model="dialogEchart" size="tiny" id="dialog_echart">
        <div style="width: 100%;height:400px;padding: 0 5px;border:1px solid #ebebeb" id="echart_max"></div>
   </el-dialog>
   <el-dialog title="提示" v-model="save_" size="tiny" id="dia_tishi" >
    <span>确定导出吗?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="save_ = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog :title="dialo_title" v-model="dialogCt" size="tiny" id="dialog_ct" >
    <div style="position:absolute;left: 15px;padding: 10px;border: 1px solid rgb(235, 235, 235);width:1170px;height: 520px;">
      <el-table
              :data="ct_data_list"
              :default-sort = "{prop:'publishTime'}"
              @cell-click="dialog_articleList_reprint"
              border
              style="width: 100%"
              @selection-change="ct_articlelist_select">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                label="文章标题"
                width="380"
                show-overflow-tooltip>
                <template scope="scope"><a :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
              </el-table-column>
              <el-table-column
                label="文章摘要"
                width="485"
                show-overflow-tooltip>
                <template scope="scope"><span v-html="scope.row.abstracts"></span></template>
              </el-table-column>
              <el-table-column
                label="转发"
                width="70"
                show-overflow-tooltip>
                <template scope="scope"><a href="javascript:;">{{scope.row.reprintList==null ? 0 :scope.row.reprintList.length}}</a></template>
              </el-table-column>
              <el-table-column
                label="时间"
                prop="publishTime"
                width="170"
                sortable
                show-overflow-tooltip>
              </el-table-column>
        </el-table> 
        <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="open_del_threeList">删除文章</el-button>
        <el-button v-show="this.dialo_title!=='相关文章'" type="warning" style="position: absolute;left: 120px; bottom: 6px;padding: 5px 10px;" @click="open_del_per">删除此{{dialo_title.slice(dialo_title.length-4,dialo_title.length-2)}}</el-button>
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
    </div>
  </el-dialog>
  <!-- 转发文章 -->
  <el-dialog title="相关文章转发" v-model="dialog_reprint" size="tiny" id="dialog_reprint">
      <div class="el-step is-vertical" style="margin-right: 0px; cursor: pointer;" v-for="(i,$index) in articleList_reprint_list" @mouseover="Mover_articleList_reprint($index)" @mouseout="Mout_articleList_reprint($index)">
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
    <el-dialog title="选择对比项目" v-model="dialogDuibiList" size="tiny" id="dialog_DuibiList">
      <el-radio-group v-model="radio_duibi">
        <el-radio v-for="i in duibiList" :label="i.project.id">{{i.project.name}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDuibiList = false">取 消</el-button>
        <el-button type="primary" @click="add_duibiName">确 定</el-button>
      </span>
   </el-dialog> 
   <!-- 选择对方式 -->
    <el-dialog title="选择对比方式" v-model="dialogDuibiMethod" size="tiny" id="dialog_DuibiMethod">
      <span>相似性计算方式:</span> 
      <el-radio-group v-model="radio_duibi_Method">
        <el-radio v-for="i in duibiMethodList" :label="i.type">{{i.name}}</el-radio>
      </el-radio-group>
      <div style="margin-top: 20px;">
        <span>词表样本百分比:</span>
        <el-radio-group v-model="radio_duibi_Percent">
          <el-radio v-for="i in duibiPercentList" :label="i">{{i}}</el-radio>
        </el-radio-group>
       </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDuibiMethod = false">取 消</el-button>
        <el-button type="primary" @click="addDuibi">确 定</el-button>
      </span>
   </el-dialog> 
    <!-- 查看对比项目 -->
    <el-dialog title="查看对比项目" v-model="dialog_look_duibiProject" size="tiny" id="dialog_look_duibiProject">
      <h4><span style="color:#f7ba2a">说明:</span>计算方式为:<span v-show="radio_duibi_Method==1" style="color: #ff4949">jaccard</span><span v-show="radio_duibi_Method==2" style="color: #ff4949">cosine</span><span v-show="radio_duibi_Method==3" style="color: #ff4949">generative</span><span v-show="radio_duibi_Method==4" style="color: #ff4949">kl</span>，值越<span style="color: #ff4949">{{radio_duibi_Method == 4 ? '小' : '大'}}</span>说明越相似。</h4>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" style="opacity:.8;border-color:#ccc;" id="table">
                  <tr>
                    <th width="100%" :colspan="colspan" style="color:black">
                      {{table_compet_name}}
                    </th>
                  </tr>
                  <tr >
                    <th width="4%" :rowspan="rowspan" ><p style="word-wrap: break-word; letter-spacing: 3px;padding: 2px 0 10px 2px;width: 25px;color: black"><span >{{table_own_name}}</span></p></th>
                    <th width="" ></th>
                    <th width="" v-for="(i,$index) in table_compet_data"><span data-toggle="tooltip" data-placement="top" :title="'事件标题:'+i.label"><input type="text" :value="i.label" @blur="blur_table(i,$index,true)" ref="cp_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                  </tr>
                  <tr v-for="(i,$index) in tableData">
                      <th width="" ><span data-toggle="tooltip" data-placement="top" :title="'事件标题:'+i.name"><input type="text" :value="i.name" @blur="blur_table(i,$index)" ref="_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                      <td v-for="(j,$index) in i.data"><el-checkbox v-model="j.checked" :disabled="j.disabled" @change="handleCheckedCitiesChange($index,i,j,tableData)"></el-checkbox>&nbsp;  <span class="duibi_num" :style="{color: j.max ? '#f34c81' : ''}" @click="look_venn($index,i)">{{j.num}}</span></td>
                  </tr> 
                   
                  
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="this.table_select.length!=0" :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 10px 18px;font-size: 14px;background-color: #00b38a;border-color:#00b38a;position:absolute;right: 110px"  @click="_save_">导 出</el-button>
        <el-button @click="dialog_look_duibiProject = false" style="margin-right: 0px">取 消</el-button>
      </span>
   </el-dialog> 
   <!-- venn图 -->
   <el-dialog title="相关信息" v-model="dialogSimilar" size="tiny" id="dialog_similar">
    <el-button type="info" style="padding: 6px 6px;font-size: 14px;">人物：</el-button>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 400px;left: 10px;">
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
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_per.length"
           v-show="this.similarData_per.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
     <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;left: 306px;">地点：</el-button>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 400px;left: 306px;">
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
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_loc.length"
           v-show="this.similarData_loc.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
     <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;left: 602px;">组织：</el-button>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 400px;left: 602px;">
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
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_org.length"
           v-show="this.similarData_org.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
     <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;left: 897px;">关键词：</el-button>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:290px;height: 400px;left: 897px;">
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
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_key.length"
           v-show="this.similarData_key.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div>
     <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;top: 445px;left: 10px;">相关文章：</el-button>
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:98%;height: 320px;top: 475px">
            <el-table
             :data="similarData_arc_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.arc_url" target="_blank" :style="{color: similar_arc_arr.indexOf(scope.row.arc) != -1 ? '#f34c81' : 'black'}">{{ scope.row.arc}}</a></template>
             </el-table-column>
             <el-table-column
               label="竞品文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.cp_arc_url" target="_blank" :style="{color: similar_arc_arr.indexOf(scope.row.cp_arc) != -1 ? '#f34c81' : 'black'}">{{ scope.row.cp_arc}}</a></template>
             </el-table-column>
             <el-table-column
               label="公共文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.similar_arc_title_url" target="_blank" style="color: #f34c81;">{{ scope.row.similar_arc_title}}</a></template>
             </el-table-column>
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           class="page"
           @current-change="similarData_arc_handleCurrentChange"
           :current-page="similarData_arc_currentPage"
           :page-size="similarData_arc_pageSize"
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_arc.length"
           v-show="this.similarData_arc.length!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div> 
   </el-dialog>
</div>  
</template>
<script >
import echart from 'echarts'
import ecStat from 'echarts-stat'
import { Sort,Map }  from '../../assets/js/map.js'
  export default{
    data : function(){ 
        return{
          data:[],
          olddata:'',
          personSet:[],
          locationSet:[],
          orgSet:[],
          articleList:'',
          articleList_reprint:'',
          articleList_es:'',
          dialoglist:false,
          dialog_reprint:false,
          dialogEchart:false,
          dialo_es:false,
          dialogCt:false,
          dialogDuibiList:false,
          dialog_look_duibiProject:false,
          dialogDuibiMethod:false,
          dialogSimilar:false,
          size:0,
          articleType:2,
          current_sort:JSON.parse(window.sessionStorage.getItem('current_sort'))||'6',
          current_sort_loc:JSON.parse(window.sessionStorage.getItem('current_sort_loc'))||'10',
          current_sort_per:JSON.parse(window.sessionStorage.getItem('current_sort_per'))||'10',
          current_sort_org:JSON.parse(window.sessionStorage.getItem('current_sort_org'))||'10',
          dropdown_sort:['2','3','4','5','6','7','8','9','10'],
          sj:[1,2,3,4,5,6,7,8,9,10],
          time: JSON.parse(window.sessionStorage.getItem('time0'))!=null ? [new Date(JSON.parse(window.sessionStorage.getItem('time0'))),new Date(JSON.parse(window.sessionStorage.getItem('time1')))] : [new Date(new Date().getTime()-604800000), new Date()],
          fimg:require("../../assets/icon/xiangguanwenzhang.png"),
          imgf:require("../../assets/icon/xiangguanwenzhang1.png"),
          ct_size:'',
          ct_name:'',
          ct_url:'',
          ct_data:[],
          list_type:'',
          ct_data_list:[],
          articleList_list:[],
          articleList_reprint_list:[],
          currentPage:1,
          currentPage_list:1,
          currentPage_reprint_list:1,
          page_size:12,
          page_size_list:12,
          page_size_reprint_list:12,
          edit:false,
          save_:false,
          domain_s:[],
          domain_m:[],
          domain:[],
          domain_arr:[],
          custom_s:[],
          custom_m:[],
          custom:[],
          custom_arr:[],
          dropdown_sort_num:['5','10','15','20'],
          btn_disabled:false,
          data_articleList_index:'',//删除相关文章列表的时候获取到他的总数据的index
          articleList_idarr:[],//删除相关文章列表的id数组
          perList_idarr:[],//删除地点人物组织数组相关文章列表的id数组
          mentionArr:[],//删除地点人物组织数组
          qipao_idarr:[],//删除气泡图数组
          data_Per_index:'',//点击卡片获取相对应总数据的index
          data_second_index:'',//点击人物组织圆点获取index
          dropdown_jushuNum:['1','2','3','5','全部'],
          dropdown_cixingNum:['所有词性','仅动/名词'],
          current_jushuNum:JSON.parse(window.sessionStorage.getItem('current_jushuNum')) || 3,
          current_cixing:JSON.parse(window.sessionStorage.getItem('current_cixing')) || '所有词性',
          loading_start:false,
          visible_per:false,
          dialo_title:'',
          ct_articlelist_selection:[],
          duibi_show:JSON.parse(window.sessionStorage.getItem('duibi_show'))!=null ? JSON.parse(window.sessionStorage.getItem('duibi_show')) : false,
          duibiData:[],
          del_duibi_flag:false,
          del_duibi_id:'',
          duibiList:[],
          radio_duibi:'',
          current_project_dom_name:'',
          tableData:[],
          radio_duibi_Method:1,
          duibiMethodList:[{"type":1,"name":"jaccard "},{"type":2,"name":"cosine"},{"type":3,"name":"generative"},{"type":4,"name":"kl"}],
          radio_duibi_Percent:'0.2',
          duibiPercentList:['0.05','0.1','0.2','0.5'],
          table_compet_name:'',
          table_compet_data:[],
          table_own_name:'',
          colspan:'',
          rowspan:'',
          table_select:[],//相似表格选中
          similarData_per:[],//查看相似的自身和竞品的信息-----往下
          similarData_per_list:[],
          similarData_per_currentPage:1,
          similarData_per_pageSize:10,
          similarData_loc:[],
          similarData_loc_list:[],
          similarData_loc_currentPage:1,
          similarData_org:[],
          similarData_org_list:[],
          similarData_org_currentPage:1,
          similarData_key:[],
          similarData_key_list:[],
          similarData_key_currentPage:1,
          similarData_arc:[],
          similarData_arc_list:[],
          similarData_arc_currentPage:1,
          similarData_arc_pageSize:7,
          similar_per_arr:[],
          similar_loc_arr:[],
          similar_org_arr:[],
          similar_key_arr:[],
          similar_arc_arr:[],
        }
    },
    created:function(){
    if(this.$store.state.ev_duibiData!=''){
      this.duibiData=this.$store.state.ev_duibiData;
     }
     $(function(){
      $('.el-message-box .el-message-box__input .el-input__inner').attr('type','text');
    })
  },
    mounted : function () {
        let _this=this;

        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
         //获取行业属性
        $.ajax({
          type: "GET",
          url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/wxAccount/domain',
          traditional: true,
          success: function(data){
          _this.domain=data.data;
          if(_this.domain.length>15){
            _this.domain_s=_this.domain.slice(0,15);
            _this.domain_m=_this.domain.slice(15,_this.domain.length);
            }else{
               _this.domain_s=_this.domain;
            }
          }
        })
      //获取公众号类型
      $.ajax({
          type: "GET",
          url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/wxAccount/customType',
          traditional: true,
          success: function(data){
          _this.custom=data.data;
          if(_this.custom.length>9){
              _this.custom_s=_this.custom.slice(0,9);
              _this.custom_m=_this.custom.slice(9,_this.custom.length);
            }else{
               _this.custom_s=_this.custom;
            }
          }
        })
      if(_this.$store.state.data===''){
        _this.loading_start=true;
        _this.duibi_show=false;
        window.sessionStorage.setItem('duibi_show',JSON.stringify(false));
         _this.format_time ();  
          Sort;            
        $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event2",
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
             "domainArr":[],
             "cusArr":[],
             "topicNum":_this.current_sort,//议题数量
             "sentenceNum":_this.current_jushuNum=='全部' ? 0 : _this.current_jushuNum,
             "nv":_this.current_cixing=='所有词性' ? 0 : 1,
             "type": 1 
          },
          success:function(data){
            console.log(data)
            _this.loading_start=false;
            console.log(this.url.slice(0,this.url.indexOf('method=')))
            if(data.data==null||data.data.length==0){
               _this.$message({
                              message: '新闻数量太少,无法生成议题。请调整时间区间或增加关键词后再试。',
                              type: 'warning'
                            });
              $('#loading').css('display','none');                
            }else{
              $('#loading').css('display','inline-block');
              for(let z=0;z<data.data.length;z++){
                if(data.data[z].commonResult.locList){
                  data.data[z].commonResult.locList.sort(Sort('score'));
                }
                if(data.data[z].commonResult.orgList){
                  data.data[z].commonResult.orgList.sort(Sort('score'));
                }
                if(data.data[z].commonResult.perList){
                  data.data[z].commonResult.perList.sort(Sort('score'));
                }
                data.data[z].commonResult.sortArr='10';
              }
              _this.olddata=JSON.stringify(data.data);
              _this.$store.state.start_data=JSON.parse(_this.olddata);
              _this.data=data.data;
              console.log(_this.data)
              if(data.data[0].commonResult.perList!=null&&data.data[0].commonResult.perList.length>0){
                _this.personSet=data.data[0].commonResult.perList;
                if(data.data[0].commonResult.perList.length<_this.current_sort_per){
                  _this.renwu(true,'personSet','人物','current_sort_per')
                }else{
                  _this.renwu(false,'personSet','人物','current_sort_per')
                }
                console.log(_this.personSet)
              };
              if(data.data[0].commonResult.locList!=null&&data.data[0].commonResult.locList.length>0){
                _this.locationSet=data.data[0].commonResult.locList;
                if(data.data[0].commonResult.locList.length<_this.current_sort_loc){
                  _this.renwu(true,'locationSet','地点','current_sort_loc')
                }else{
                  _this.renwu(false,'locationSet','地点','current_sort_loc')
                }
              };
              if(data.data[0].commonResult.orgList!=null&&data.data[0].commonResult.orgList.length>0){
                _this.orgSet=data.data[0].commonResult.orgList;
                if(data.data[0].commonResult.orgList.length<_this.current_sort_org){
                  _this.renwu(true,'orgSet','组织','current_sort_org')
                }else{
                  _this.renwu(false,'orgSet','组织','current_sort_org')
                }
              };
              //全局数据
              _this.$store.state.data=data.data;
    /*          _this.$store.state.perList=data.data[0].perList;
              _this.$store.state.locList=data.data[0].locList;
              _this.$store.state.orgList=data.data[0].orgList;*/
              $(document).ready(function(){
                  _this.echart_qipao();
                    $('.event_card>div').not('#all_event_echart').click(function(){
                      $(this).addClass('live').siblings().removeClass('live live1')
                   })
                   _this.echart_event(); 
              })
            }
          }
        });
    }else{
      let _this=this;
     if(JSON.parse(window.sessionStorage.getItem('custom_arr'))==null){
        _this.custom_arr=[];
     }else{
        _this.custom_arr= JSON.parse(window.sessionStorage.getItem('custom_arr'));
     }
     if(JSON.parse(window.sessionStorage.getItem('domain_arr'))==null){
        _this.domain_arr=[];
     }else{
      _this.domain_arr= JSON.parse(window.sessionStorage.getItem('domain_arr'));
     }
     _this.format_time ();  
      Sort;  
      this.olddata=JSON.stringify(this.$store.state.data)    
      this.$store.state.start_data=JSON.parse(this.olddata);                      
      this.data=this.$store.state.data;
      this.personSet=this.$store.state.data[0].commonResult.perList;
      this.locationSet=this.$store.state.data[0].commonResult.locList;
      this.orgSet=this.$store.state.data[0].commonResult.orgList;
      //console.log('bfeore funct ')
      $(document).ready(function(){
        if(_this.personSet.length<_this.current_sort_per){
          _this.renwu(true,'personSet','人物','current_sort_per')
        }else{
          _this.renwu(false,'personSet','人物','current_sort_per')
        };
        if(_this.locationSet.length<_this.current_sort_loc){
          _this.renwu(true,'locationSet','地点','current_sort_loc')
        }else{
          _this.renwu(false,'locationSet','地点','current_sort_loc')
        };
        if(_this.orgSet.length<_this.current_sort_org){
          _this.renwu(true,'orgSet','组织','current_sort_org')
        }else{
          _this.renwu(false,'orgSet','组织','current_sort_org')
        };
         _this.echart_qipao();
         $('.event_card>div').not('#all_event_echart').click(function(){
               $(this).addClass('live').siblings().removeClass('live live1')
          });
         _this.echart_event();
       })
    }
     
      /*jq样式*/
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
       $('#type  button').click(function(){
        $(this).addClass('warning').siblings().removeClass('warning');
       });
       $('.domain .domain_all').click(function(){
          $('.domain button').not($(this)).removeClass('warning');
          $(this).addClass('warning');
       })
       $('.custom .custom_all').click(function(){
          $('.custom button').not($(this)).removeClass('warning');
          $(this).addClass('warning');
       })
       if(_this.domain_arr.length!==0){
        $('.domain .domain_all').removeClass('warning');
       }
       if(_this.custom_arr.length!==0){
        $('.custom .custom_all').removeClass('warning');
       };
       $('#dialog_list_es .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialo_es=false;
       });
       $('#dialog_DuibiList .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialogDuibiList=false;
       });
       $('#dialog_DuibiMethod .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialogDuibiMethod=false;
       });
       $('#dialog_look_duibiProject .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialog_look_duibiProject=false;
       });
       $('#dialog_similar .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){
        _this.dialogSimilar=false;
       });
       $(function(){
                $('.el-tabs__item').click(function(){
                  console.log($(this))
                  $(this).addClass('is-active');
                  $(this).parent().find('.el-tabs__item').not($(this)).removeClass('is-active');
                });
         });
       /*if(JSON.parse(window.sessionStorage.getItem('time0'))!=null){
        _this.time=[new Date(JSON.parse(window.sessionStorage.getItem('time0'))),new Date(JSON.parse(window.sessionStorage.getItem('time1')))]
       }*/
       $('.el-dialog__headerbtn').not('#dialog_list_es .el-dialog__headerbtn').click(function(){
        _this.dialoglist=false;
        _this.dialogEchart=false;
        _this.dialogCt=false;
      });
       $('#dialog_reprint .el-dialog__headerbtn').click(function(){
        _this.dialog_reprint=false;
        _this.dialogCt=true;
       })
    },
    methods:{
      dt(a){
        console.log(a)
      },
      renwu(a,b,c,d){
        let _this=this;
        _this.format_time ();
        //console.log(_this[b])
        if(_this[b].length==0){
        $(function(){
              $('#echart_renwu').html(`<h5 style="margin-top:50px;color:orange;text-align:center;">无数据</h5>`);
            })
          }else{
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
              //console.log(a)
              if(a){
                    for(let i=0;i<_this[b].length;i++){
                          perData[i][2]=_this[b][i].mention.slice(0,_this[b][i].mention.indexOf('/'));                   
                      };
                      perData=perData.slice(0,_this[b].length);
                }else{
                  for(let i=0;i<_this[d];i++){
                      perData[i][2]=_this[b][i].mention.slice(0,_this[b][i].mention.indexOf('/'));
                  };
                  perData=perData.slice(0,_this[d]);
                } 
            $(function(){
                let echart_renwu = echart.init(document.getElementById(b));

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
                        return c+': '+perData[obj.dataIndex][2]
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
                                  return param.data[2].length>3 ? param.data[2].slice(0,3)+'..' : param.data[2];
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
          echart_renwu.setOption(option_echart_renwu);
          //console.log(echart_renwu.getDataURL())
          echart_renwu.on('click', function (params) {
                if(params.componentSubType==="scatter"){
                  if(_this.data_Per_index==''){
                      _this.data_Per_index=0;
                    };
                    console.log(params)
                    let list=b.slice(0,3)+'List',listData=_this.data[_this.data_Per_index].commonResult[list];
                    _this.list_type=list;
                    console.log(listData);
                    console.log(params.data[2]);
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
                            let newdata=[];
                            if(_this.ct_data.length>12){
                              for(let c=0;c<12;c++){
                              newdata.push(_this.ct_data[c])
                              }
                            }else{
                              newdata=_this.ct_data
                            }
                            _this.ct_data_list=newdata;
                        }
                        
                        console.log(listData[i].eventArticleList)
                      }
                    }
                  }
              })
          })  
        }
        },
     // 总事件折线图legend
      echart_event(){
          let _this=this;
          let all_arr=[];
          let event_xlengend=[];
          let event_data=[];
          let event_xdata=[];
        for(let l=0;l<_this.data.length;l++){
           let event_map=new Map();
           let strat_time=_this.time[0].getTime();
              while(strat_time<_this.time[1].getTime()+3600000){
                var curTime = new Date(strat_time).Format("yyyy-MM-dd hh");
                event_map.put(curTime,0);
                strat_time=strat_time+3600000;
              }
            event_xlengend.push('事件'+(l+1));
            for(let j=0;j<_this.data[l].commonResult.eventArticleList.length;j++){
               let x_time=_this.data[l].commonResult.eventArticleList[j].publishTime.slice(0,13);
               event_map.put(x_time,event_map.get(x_time)+1) ;
            }
            all_arr.push(event_map);
        }
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
        }
        for(let k in all_arr[0].data){
          let z_time=k.slice(5,13)+':00';
          event_xdata.push(z_time);
        }
/*         console.log(all_arr)
        console.log(event_xlengend);
        console.log(event_data);
        console.log(event_xdata);*/
        let all_event_echart = echart.init(document.getElementById('all_event_echart'));

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
      echart_qipao_option(a){
               function quse(){
                    var arr=['#a4cf27','#fec330','#4fc4d0',' #f46c6d','#7864ad','#ff9740'];
                    return arr[parseInt(Math.random()*6)];
                  }     
                    var schema = [
                        {name: 'date', index: 0, text: '日'},
                        {name: 'AQIindex', index: 1, text: 'Score'}
                        
                    ];
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
                          max: a.length,
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
                              data: a
                          }
                      ]
                  };
                  return option_echart_card;
      },
      //echart气泡
      echart_qipao(inx,num){
        Sort;
        let _this=this;
       for(let i=0;i<_this.data.length;i++){
          for(let t=0;t<_this.data[i].commonResult.eventArticleList.length;t++){
                    _this.data[i].commonResult.eventArticleList[t].publishTime=new Date(_this.data[i].commonResult.eventArticleList[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                }
              let echart_card = echart.init(document.getElementById('echart_card'+i+'')); 
               _this.data[i].commonResult.keywordList.sort(Sort('score'));
                let keywordArr=[];
                if(inx==i){//判断下拉是不是当前的
                  if(_this.data[i].commonResult.keywordList.length<num){
                    this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          });
                    keywordArr=_this.data[i].commonResult.keywordList;
                  }else{
                    keywordArr=_this.data[i].commonResult.keywordList.slice(0,num);
                  }
                }else{
                    if(_this.data[i].commonResult.keywordList.length<11){
                      keywordArr=_this.data[i].commonResult.keywordList;
                    }else{
                      keywordArr=_this.data[i].commonResult.keywordList.slice(0,_this.data[i].commonResult.sortArr);
                    }
                }
                
              /*console.log(keywordArr)*/
              let dataBJ=[];
              for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].mention;
                    dataBJ.push(dataB)
                  }
                  echart_card.setOption(this.echart_qipao_option(dataBJ));
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
                      _this.data[i].commonResult.keywordList=_this.data[i].commonResult.keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.mention) === -1; });//前台删除
                        if(_this.del_duibi_flag){//自身与竞品的数据分支
                            for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                              if(_this.$store.state.ev_duibiData[h].project.id==_this.del_duibi_id){
                                  _this.$store.state.ev_duibiData[h].project.data[i].commonResult.keywordList=_this.data[i].commonResult.keywordList;
                                }
                              }
                         }
                      //num=num-1;
                      _this.echart_qipao(inx,num)
                    }).catch(() => {
                      _this.$message({
                        type: 'warning',
                        message: '已取消删除'
                      });          
                    });
                    
                  })
                }
      },
      //格式表格数据
      format_tabledata () {
        let newdata=[],
        pageNum=this.currentPage-1;
        for(let i=this.page_size*pageNum;i<this.page_size*pageNum+this.page_size;i++ ){
          this.ct_data[i] !== undefined ? newdata.push(this.ct_data[i]) : '' 
        }
        this.ct_data_list=newdata;       
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
      //筛选条件里的属性与下拉列表的dom数据以及保存
      dom_search(){
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
        let arr_data=this.custom.filter(item => { return custom_arr_name.indexOf(item.name) !== -1; });
        for(let i=0;i<arr_data.length;i++){
          custom_arr.push(arr_data[i].id);
        }
        this.domain_arr=domain_arr;
        this.custom_arr=custom_arr;
        window.sessionStorage.setItem('current_sort',JSON.stringify(this.current_sort))
        window.sessionStorage.setItem('current_sort_per',JSON.stringify(this.current_sort_per))
        window.sessionStorage.setItem('current_sort_loc',JSON.stringify(this.current_sort_loc))
        window.sessionStorage.setItem('current_sort_org',JSON.stringify(this.current_sort_org))
        window.sessionStorage.setItem('current_jushuNum',JSON.stringify(this.current_jushuNum))
        window.sessionStorage.setItem('current_cixing',JSON.stringify(this.current_cixing))
        window.sessionStorage.setItem('time0',JSON.stringify(this.time[0].getTime()))
        window.sessionStorage.setItem('time1',JSON.stringify(this.time[1].getTime()))
        window.sessionStorage.setItem('custom_arr',JSON.stringify(custom_arr));
        window.sessionStorage.setItem('domain_arr',JSON.stringify(domain_arr));        
      },
      //切换项目查看事件
      compet_card(oid,ev){
        let _this=this;
        //console.log(ev)
            for(let t=0;t<$('.event .el-tabs__item').length;t++){
              $('.event .el-tabs__item')[t].className="el-tabs__item"
            }
            ev.target.className="el-tabs__item is-active"
            this.current_project_dom_name= ev.target.innerHTML;
        for(let i=0;i<this.$store.state.ev_duibiData.length;i++){
          if(oid==JSON.parse(window.sessionStorage.getItem('project_id'))){//如果是自身
              this.del_duibi_flag=false;
              this.data=this.$store.state.data;
              this.personSet=this.$store.state.data[0].commonResult.perList;
              this.locationSet=this.$store.state.data[0].commonResult.locList;
              this.orgSet=this.$store.state.data[0].commonResult.orgList;
              $(document).ready(function(){
                    if(_this.personSet.length<_this.current_sort_per){
                      _this.renwu(true,'personSet','人物','current_sort_per')
                    }else{
                      _this.renwu(false,'personSet','人物','current_sort_per')
                    };
                    if(_this.locationSet.length<_this.current_sort_loc){
                      _this.renwu(true,'locationSet','地点','current_sort_loc')
                    }else{
                      _this.renwu(false,'locationSet','地点','current_sort_loc')
                    };
                    if(_this.orgSet.length<_this.current_sort_org){
                      _this.renwu(true,'orgSet','组织','current_sort_org')
                    }else{
                      _this.renwu(false,'orgSet','组织','current_sort_org')
                    };
                     _this.echart_qipao();
                     $('.event_card>div').not('#all_event_echart').click(function(){
                           $(this).addClass('live').siblings().removeClass('live live1')
                      });
                     _this.echart_event();
                   })
          }else{//点击的是竞品
            if(this.$store.state.ev_duibiData[i].project.id==oid){
              this.del_duibi_flag=true;
              this.del_duibi_id=oid;
              if(this.$store.state.ev_duibiData[i].project.data!=null){//vuex里面有这个事件id的数据
                  this.data=this.$store.state.ev_duibiData[i].project.data;
                  this.personSet=this.$store.state.ev_duibiData[i].project.data[0].commonResult.perList;
                  this.locationSet=this.$store.state.ev_duibiData[i].project.data[0].commonResult.locList;
                  this.orgSet=this.$store.state.ev_duibiData[i].project.data[0].commonResult.orgList;
                  $(document).ready(function(){
                    if(_this.personSet.length<_this.current_sort_per){
                      _this.renwu(true,'personSet','人物','current_sort_per')
                    }else{
                      _this.renwu(false,'personSet','人物','current_sort_per')
                    };
                    if(_this.locationSet.length<_this.current_sort_loc){
                      _this.renwu(true,'locationSet','地点','current_sort_loc')
                    }else{
                      _this.renwu(false,'locationSet','地点','current_sort_loc')
                    };
                    if(_this.orgSet.length<_this.current_sort_org){
                      _this.renwu(true,'orgSet','组织','current_sort_org')
                    }else{
                      _this.renwu(false,'orgSet','组织','current_sort_org')
                    };
                     _this.echart_qipao();
                     $('.event_card>div').not('#all_event_echart').click(function(){
                           $(this).addClass('live').siblings().removeClass('live live1')
                      });
                     _this.echart_event();
                   })
              }else{
                this._start(false,true,oid);
              }
            }
          } 
        }
      },
      addDuibi(){//生成对比表格
        console.log(this.duibiData)
        let _this=this;
        this.loading_start=true;
        this.dialogDuibiMethod=false;
        this.tableData=[];
        this.table_select=[];
        this.dialog_look_duibiProject=true;
        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/cpa/similartable",
            type:"GET",
            data:{
              "method":"GET", //http方法
              "proId":project_id, //项目id
              "cpId": _this.duibiData[1].project.id,//竞品id
              "similarType":_this.radio_duibi_Method, //相似性计算方式
              "percent":_this.radio_duibi_Percent// “0.05” “0.1” “0.2” “0.5”//词表样本百分比
            },
            success:function(data){
              for(let i=0;i<_this.$store.state.data.length;i++){
                  let obj={};
                  obj.name=_this.$store.state.data[i].label;
                  obj.eventId=_this.$store.state.data[i].id;
                  /*obj.eventArticleList=_this.$store.state.data[i].commonResult.eventArticleList;
                  obj.keywordList=_this.$store.state.data[i].commonResult.keywordList;*/
                  obj.Data=_this.$store.state.data[i];
                  obj.project_id=project_id;
                  obj.data=[];
                  //console.log();
                  let fun=_this.radio_duibi_Method == 4 ? Math.min : Math.max;
                  for(let j of data.data[i]){
                    let _obj={};
                    _obj.checked=false;
                    _obj.disabled=false;
                    _obj.num=j;
                    if(j==fun.apply(null,data.data[i])){
                      _obj.max=true;
                    }
                    obj.data.push(_obj)
                  }
                  _this.tableData.push(obj)
                }
                _this.loading_start=false;
                _this.colspan=_this.tableData[0].data.length+2;
                _this.rowspan=_this.tableData.length+1;
                _this.table_own_name=_this.duibiData[0].project.name;
                _this.table_compet_name=_this.duibiData[1].project.name;
                _this.table_compet_data=_this.duibiData[1].project.data;
            }
          })

         console.log(this.tableData)
      },
      ct_click(i,n,a){
        //$('#dialog_ct_list').css('border','1px solid rgb(220,220,220)')
        let _this=this;
        _this.data_second_index=a;
        _this.list_type=n;
        _this.ct_size='';
        _this.ct_name='';
        _this.ct_data=[];
         _this.dialogCt=true;
         _this.ct_name=i.mention;
         _this.ct_url=i.linkedUrl;//当前实体没有对应的实体链接
         console.log(i)
         if(i.eventArticleList){
            _this.ct_size=i.eventArticleList.length;
           _this.ct_data=i.eventArticleList;
            let newdata=[];
            if(_this.ct_data.length>10){
              for(let c=0;c<10;c++){
              newdata.push(_this.ct_data[c])
              }
            }else{
              newdata=_this.ct_data
            }
            _this.ct_data_list=newdata;
          }else{
            $('#dialog_ct_list').html(`<p style="text-align:center;margin-top:10px;color:orange;" >暂无数据</p>`);
          }
      },
     _start (compet_flag,loading_flag,oid) { //compet_flag竞品事件查询标识，如果true则是自身点击查询;loading_flag--true则显示
      let _this=this;
      let project_id;
      this.$store.state.btn_daochu=false;
      this.format_time ();  
      Sort;
      if(loading_flag){//点击查询
        console.log('点击查询')
        this.loading_start=true;
      };
      if(compet_flag){//点击自身查询
        this.$store.state.ev_duibiData = '';
        this.current_project_dom_name = JSON.parse(window.sessionStorage.getItem('start'));
         project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
         /*$(function(){
          $('.event .el-tabs__item').removeClass('is-active')
           $('.event .el-tabs__item')[0].className='el-tabs__item is-active'
         }) */
        this.duibi_show=false;
      }else{//点击竞品查询
        project_id=oid;
      };
      $('.event_card').css('display','none')
      this.dom_search();//筛选以及保存session
      this.personSet=[];
      this.locationSet=[];
      this.orgSet=[];
      this.data=[];                       
      $.ajax({
        url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event2",
        type:"GET",
        data:{
          "method":"GET",
          "proId":project_id,
          "startTime":_this.time[0],//开始时间
           "endTime":_this.time[1],
           "articleType":_this.articleType,
           "topicNum":_this.current_sort,//议题数量
           "domain": _this.domain_arr,
           "customType":_this.custom_arr,
           "perNum":_this.current_sort_per,
           "locNum":_this.current_sort_loc,
           "orgNum":_this.current_sort_org,
           "sentenceNum":_this.current_jushuNum=='全部' ? 0 : _this.current_jushuNum,
           "nv":_this.current_cixing=='所有词性' ? 0 : 1,
           "type":compet_flag ? 1 : 2 
        },
        success:function(data){
            if(loading_flag){//点击查询
              console.log('点击查询')
              _this.loading_start=false;
            }
            $('.event_card').css('display','block')
            /*console.log(window.document.location.href)
            console.log(this.url)*/
            if(data.data==null||data.data.length==0){
               _this.$message({
                              message: '查询到的文章数量太少,无法生成议题。请调整时间区间或增加关键词后再试。',
                              type: 'warning'
                            });  
            }
            for(let z=0;z<data.data.length;z++){
              if(data.data[z].commonResult.locList){
                data.data[z].commonResult.locList.sort(Sort('score'));
              }
              if(data.data[z].commonResult.orgList){
                data.data[z].commonResult.orgList.sort(Sort('score'));
              }
              if(data.data[z].commonResult.perList){
                data.data[z].commonResult.perList.sort(Sort('score'));
              }
              data.data[z].commonResult.sortArr='10';
            }
            _this.data=data.data;
            console.log(_this.data)
          
            if(data.data[0].commonResult.perList!=null&&data.data[0].commonResult.perList.length>0){
              _this.personSet=data.data[0].commonResult.perList;
              if(data.data[0].commonResult.perList.length<_this.current_sort_per){
                _this.renwu(true,'personSet','人物','current_sort_per')
              }else{
                _this.renwu(false,'personSet','人物','current_sort_per')
              }
             // console.log(_this.personSet)
            };
            if(data.data[0].commonResult.locList!=null&&data.data[0].commonResult.locList.length>0){
              _this.locationSet=data.data[0].commonResult.locList;
              if(data.data[0].commonResult.locList.length<_this.current_sort_loc){
                _this.renwu(true,'locationSet','地点','current_sort_loc')
              }else{
                _this.renwu(false,'locationSet','地点','current_sort_loc')
              }
            };
            if(data.data[0].commonResult.orgList!=null&&data.data[0].commonResult.orgList.length>0){
              _this.orgSet=data.data[0].commonResult.orgList;
              if(data.data[0].commonResult.orgList.length<_this.current_sort_org){
                _this.renwu(true,'orgSet','组织','current_sort_org')
              }else{
                _this.renwu(false,'orgSet','组织','current_sort_org')
              }
            };
          //全局数据
          if(compet_flag){//点击自身查询
            console.log('点击查询')
            _this.olddata=JSON.stringify(data.data);
            _this.$store.state.start_data=JSON.parse(_this.olddata);
            _this.$store.state.data=data.data; 
          }else{//点击竞品查询
            _this.$store.state.duibiButton=true;
            for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){ //竞品对比数据添加到vuex
              if(_this.$store.state.ev_duibiData[i].project.id==project_id){
                _this.$store.state.ev_duibiData[i].project.data=data.data;
                console.log(_this.$store.state.ev_duibiData)
              }
            }
          }
          $(document).ready(function(){
              _this.echart_qipao();
              _this.echart_event();
              $('.event_card>div').click(function(){
                  $(this).addClass('live').siblings().removeClass('live live1')
               })
            })
        }
      }); 
      
    },
    dialog_articleList_reprint(a,b,c){
      this.format_time ();  
      if(b.label==='转发'){
        if(a.reprintList){
          this.dialog_reprint=true;
          this.articleList_reprint=a.reprintList;
          for(let t=0;t<this.articleList_reprint.length;t++){
                this.articleList_reprint[t].publishTime=new Date(this.articleList_reprint[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
          }
          this.currentPage_reprint_list=1;
          let newdata=[];
          if(this.articleList_reprint.length>12){
            for(let c=0;c<12;c++){
            newdata.push(this.articleList_reprint[c])
            }
          }else{
            newdata=this.articleList_reprint
          }
          this.articleList_reprint_list=newdata;
        }
      }
    },
      dialog_articleList (i,a){
        let _this=this;
        Map;
        this.data_articleList_index=a;
        _this.format_time ();  
        /*let num_map=new Map()
        this.dialoglist=true;
        this.articleList=this.data[a].articleList;
        //初始表格数据
        this.currentPage_list=1;
          let newdata=[];
          if(_this.articleList.length>12){
            for(let c=0;c<12;c++){
            newdata.push(_this.articleList[c])
            }
          }else{
            newdata=_this.articleList
          }
          _this.articleList_list=newdata;*/
          _this.dialo_title='相关文章';
          _this.dialogCt=true;
          _this.currentPage=1;
          _this.ct_data=_this.data[a].commonResult.eventArticleList;
          if(_this.ct_data){
            for(let t=0;t<_this.ct_data.length;t++){
                _this.ct_data[t].publishTime=new Date(_this.ct_data[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
              }
              let newdata=[];
              if(_this.ct_data.length>12){
                for(let c=0;c<12;c++){
                newdata.push(_this.ct_data[c])
                }
              }else{
                newdata=_this.ct_data
              }
              _this.ct_data_list=newdata;
          }
      },
      echart_click(a){
        this.dialogEchart=true;
      },
      card_click (a) {
        let _this=this;
        Sort;
        _this.data_Per_index=a;
        if(_this.data[a].commonResult.perList!=null&&_this.data[a].commonResult.perList.length>0){
          _this.personSet=_this.data[a].commonResult.perList;
            if(_this.data[a].commonResult.perList.length<_this.current_sort_per){
              _this.renwu(true,'personSet','人物','current_sort_per')
            }else{
              _this.renwu(false,'personSet','人物','current_sort_per')
            }
        }
        if(_this.data[a].commonResult.locList!=null&&_this.data[a].commonResult.locList.length>0){
          _this.locationSet=_this.data[a].commonResult.locList;
            if(_this.data[a].commonResult.locList.length<_this.current_sort_loc){
              _this.renwu(true,'locationSet','地点','current_sort_loc')
            }else{
              _this.renwu(false,'locationSet','地点','current_sort_loc')
            }
        }
        if(_this.data[a].commonResult.orgList!=null&&_this.data[a].commonResult.orgList.length>0){
          _this.orgSet=_this.data[a].commonResult.orgList;
            if(_this.data[a].commonResult.orgList.length<_this.current_sort_org){
              _this.renwu(true,'orgSet','组织','current_sort_org')
            }else{
              _this.renwu(false,'orgSet','组织','current_sort_org')
            }
        }
        $(document).ready(function(){
          let echart_max = echart.init(document.getElementById('echart_max'));
          _this.data[a].commonResult.keywordList.sort(Sort('score'));
          let keywordArr=[];
          if(_this.data[a].commonResult.keywordList.length<11){
            keywordArr=_this.data[a].commonResult.keywordList;
          }else{
            keywordArr=_this.data[a].commonResult.keywordList.slice(0,_this.data[a].commonResult.sortArr);
          }
           let dataBJ=[];
          for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].mention;
                    dataBJ.push(dataB)
             };
           function quse(){
                  var arr=['#a4cf27','#fec330','#4fc4d0',' #f46c6d','#7864ad','#ff9740'];
                  return arr[parseInt(Math.random()*6)];
             };
           var schema = [
                      {name: 'date', index: 0, text: '日'},
                      {name: 'AQIindex', index: 1, text: 'Score'}
                      
                  ];
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
          let option_echart_card={
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
                      toolbox:{
                        show:true,
                        feature:{
                          saveAsImage:{show:true}
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
                          max: dataBJ.length,
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
                                  symbolSize: [20, 609700]
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
                              data: dataBJ
                          }
                      ]
                  }; 
                  echart_max.setOption(option_echart_card);  
                  echart_max.on('click', function (params) {
                    /*console.log(params)
                    console.log(_this.data[a].keywordList)*/
                     params.event.event.stopPropagation() 
                    _this.qipao_idarr.push(params.data[3]);
                    _this.$confirm('是否删除 '+params.data[3].slice(0,params.data[3].indexOf('/'))+'?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                         _this.del_keywordList(a,params.data[3],_this.qipao_idarr);
                          _this.data[a].commonResult.keywordList=_this.data[a].commonResult.keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.mention) === -1; });//前台删除
                         if(_this.del_duibi_flag){//自身与竞品的数据分支
                            for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                              if(_this.$store.state.ev_duibiData[h].project.id==_this.del_duibi_id){
                                  _this.$store.state.ev_duibiData[h].project.data[a].commonResult.keywordList=_this.data[a].commonResult.keywordList;
                                }
                              }
                         }
                        _this.echart_qipao();
                         _this.card_click(a)
                      }).catch(() => {
                        _this.$message({
                          type: 'info',
                          message: '已取消删除'
                        });          
                      });

                   
                  })
        })
         
      },
      del_keywordList(c,d,e){
         let _this=this;
         let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
         $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/entity ",
          type:"POST",
          traditional:true,
          data:{
            "method":"DELETE", //http方法
            "proId":project_id, //项目id
            "eventId":_this.data[c].id, //组织id
            "entityType":'key',
            "entityNameArr":[d],
            },
            success:function(data){
                console.log(data)
            }
         })   
      },
      click_ct_list(i){
         window.open(i.url)
      },
      Mover(a){
        this.$refs.list[a].style.boxShadow='9px 9px 6px rgba(220,220,220,.8)';
      }, 
      Mout(a){
        this.$refs.list[a].style.boxShadow=''
      },
      Mover_articleList (i) {
        this.$refs.articlelist[i].style.color="#00a17c"
      },
      Mover_articleList_reprint (i) {
        this.$refs.articlelist_reprint[i].style.color="#00a17c"
      },
      Mover_ct_list(i){
        this.$refs.ct_list[i].style.color="#00a17c"
      },
      Mover_ct (i) {
          this.$refs.ct[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct[i].style.transition='all 0.5s';
      },
      Mout_ct (i){
        this.$refs.ct[i].style.boxShadow='';
      },
      Mover_ct_loc (i) {
          this.$refs.ct_loc[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_loc[i].style.transition='all 0.5s';
      },
      Mout_ct_loc (i){
        this.$refs.ct_loc[i].style.boxShadow='';
      },
      Mover_ct_org (i) {
          this.$refs.ct_org[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_org[i].style.transition='all 0.5s';
      },
      Mout_ct_org (i){
        this.$refs.ct_org[i].style.boxShadow='';
      },
      Mout_articleList (i) {
        this.$refs.articlelist[i].style.color="rgb(72,87,106)"
      },
      Mout_articleList_reprint (i) {
        this.$refs.articlelist_reprint[i].style.color="rgb(72,87,106)"
      },
      Mout_ct_list(i) {
        this.$refs.ct_list[i].style.color="#999"
      },
      sort_dropdown (command) {
        this.current_sort=command;
      },
      sort_dropdown_keyword(command){
        let indx=command.slice(command.length-1,command.length);
        let num=command.slice(0,command.length-1);
        this.data[indx].commonResult.sortArr=num;
         console.log(num);
         console.log(indx);
         console.log(this.data);
        this.echart_qipao(indx,num);
      },
      sort_dropdown_per (command) {
        this.current_sort_per=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.personSet=this.data[this.data_Per_index].commonResult.perList;
        if(this.personSet.length<this.current_sort_per){
          this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          }); 
          this.renwu(true,'personSet','人物','current_sort_per')
        }else{
          this.renwu(false,'personSet','人物','current_sort_per')
        }
      },
      sort_dropdown_loc (command) {
        this.current_sort_loc=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.locationSet=this.data[this.data_Per_index].commonResult.locList;
        if(this.locationSet.length<this.current_sort_loc){
          this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          }); 
          this.renwu(true,'locationSet','地点','current_sort_loc')
        }else{
          this.renwu(false,'locationSet','地点','current_sort_loc')
        }
      },
      sort_dropdown_org(command) {
        this.current_sort_org=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.orgSet=this.data[this.data_Per_index].commonResult.orgList;
        if(this.orgSet.length<this.current_sort_org){
          this.$message({
                            message: '所选数量大于数据数量',
                            type: 'warning'
                          }); 
          this.renwu(true,'orgSet','组织','current_sort_org')
        }else{
          this.renwu(false,'orgSet','组织','current_sort_org')
        }
      },
      dropdown_jushu(command){
      this.current_jushuNum=command
      },
      dropdown_cixing(command){
      this.current_cixing=command
      },
      del_threeList(arr){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/entity/article ",
          type:"POST",
          traditional:true,
          data:{
            "method":"DELETE", //http方法
            "proId":project_id, //项目id
            "eventId":_this.data[_this.data_Per_index].id, //组织id
            "entityType":_this.list_type.slice(0,3),
            "entityName": _this.data[_this.data_Per_index].commonResult[_this.list_type][_this.data_second_index].mention,
            "articleType":_this.articleType,
            "articleIdArr":arr,

            },
          success:function(data){
            console.log(data);
            _this.ct_data=_this.ct_data.filter(item => { return arr.indexOf(item.id) === -1; });//前台删除
            if(_this.del_duibi_flag){//自身与竞品的数据分支
                for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){
                  if(_this.$store.state.ev_duibiData[i].project.id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].project.data[_this.data_Per_index].commonResult[_this.list_type][_this.data_second_index].eventArticleList=_this.ct_data;
                    }
                  }
              }else{
                _this.data[_this.data_Per_index].commonResult[_this.list_type][_this.data_second_index].eventArticleList=_this.ct_data;
              }
            _this.format_tabledata();
          }
        });
      },
      del_per(t,a,b,c,e){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
        let f;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };                                  
        this.mentionArr=[];
        this.mentionArr.push(t.mention)
        $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/entity ",
          type:"POST",
          traditional:true,
          data:{
            "method":"DELETE", //http方法
            "proId":project_id, //项目id
            "eventId":_this.data[_this.data_Per_index].id, //组织id
            "entityType":c.slice(0,3),
            "entityNameArr":_this.mentionArr,
            },
            success:function(data){
              _this[b]=_this[b].filter(item => { return _this.mentionArr.indexOf(item.mention) === -1; });//前台删除
              if(_this.del_duibi_flag){//自身与竞品的数据分支
                for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){
                  if(_this.$store.state.ev_duibiData[i].project.id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].project.data[_this.data_Per_index].commonResult[c]=_this.$store.state.ev_duibiData[i].project.data[_this.data_Per_index].commonResult[c].filter(item => { return _this.mentionArr.indexOf(item.mention) === -1; }); 
                    }
                  }
              }else{
                _this.data[_this.data_Per_index].commonResult[c]=_this.data[_this.data_Per_index].commonResult[c].filter(item => { return _this.mentionArr.indexOf(item.mention) === -1; });             
              }
              if(_this.data[_this.data_Per_index].commonResult[c].length<_this[e]){
                f=true;
              }else{
                f=false;
              }
              _this.renwu(f,b,_this.dialo_title.slice(_this.dialo_title.length-4,_this.dialo_title.length-2),e)
              //console.log( _this.data[_this.data_Per_index].commonResult[c])
            }
        });
      },
      blur_input (i){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
        if(this.data[i].label!=this.$refs.inpt[i].value){
          $.ajax({
              url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/label",
              type:"POST",
              data:{
                "method":"PUT", //http方法
                "proId":project_id, //项目id
                "eventId":_this.data[i].id, //组织id
                "label":_this.$refs.inpt[i].value
                },
              success:function(data){
                console.log(data)
                if(_this.del_duibi_flag){//自身与竞品的数据分支
                  for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                    if(_this.$store.state.ev_duibiData[h].project.id==_this.del_duibi_id){
                        _this.$store.state.ev_duibiData[h].project.data[i].label=_this.$refs.inpt[i].value;
                      }
                    }
                }else{
                  _this.data[i].label=_this.$refs.inpt[i].value;
                }
              }
          });
        }
      },
      blur_table(dta,i,flag){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
        let inp=flag ? 'cp_inpt' : '_inpt';
        $.ajax({
              url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/label",
              type:"POST",
              data:{
                "method":"PUT", //http方法
                "proId":project_id, //项目id
                "eventId":flag ? dta.id : dta.eventId, //组织id
                "label":_this.$refs[inp][i].value
                },
              success:function(data){
                console.log(data)
                if(flag){//自身与竞品的数据分支
                  for(let h=0;h<_this.$store.state.ev_duibiData.length;h++){
                    if(_this.$store.state.ev_duibiData[h].project.id==dta.proId){
                        _this.$store.state.ev_duibiData[h].project.data[i].label=_this.$refs[inp][i].value;
                      }
                    }
                }else{
                   _this.$store.state.data[i].label=_this.$refs[inp][i].value;
                }
              }
          });
        console.log(dta)
      },
      del_articleList(arr){
          let _this=this;
          let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
          $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/article ",
            type:"POST",
            traditional:true,
            data:{
              "method":"DELETE", //http方法
              "proId":project_id, //项目id
              "eventId":_this.data[_this.data_articleList_index].id, //组织id
              "articleType":_this.articleType,
              "articleIdArr":arr,
              },
            success:function(data){
              console.log(data)
              _this.ct_data=_this.ct_data.filter(item => { return arr.indexOf(item.id) === -1; });//前台删除
              if(_this.del_duibi_flag){//自身与竞品的数据分支
                for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){
                  if(_this.$store.state.ev_duibiData[i].project.id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].project.data[_this.data_articleList_index].commonResult.eventArticleList=_this.ct_data; 
                    }
                  }
              }else{
                _this.data[_this.data_articleList_index].commonResult.eventArticleList=_this.ct_data;             
              }
              let newdata=[],
              pageNum=_this.currentPage_list-1;
              for(let i=_this.page_size_list*pageNum;i<_this.page_size_list*pageNum+_this.page_size_list;i++ ){
                _this.ct_data[i] !== undefined ? newdata.push(_this.ct_data[i]) : '' 
              }
              _this.ct_data_list=newdata;
            }
        });
          
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        this.format_tabledata();
      },
      handleCurrentChange_list(val){
        this.currentPage_list = val;
        let newdata=[],
        pageNum=this.currentPage_list-1;
        for(let i=this.page_size_list*pageNum;i<this.page_size_list*pageNum+this.page_size_list;i++ ){
          this.articleList[i] !== undefined ? newdata.push(this.articleList[i]) : '' 
        }
        this.articleList_list=newdata; 
      },
      handleCurrentChange_reprint_list(val){
        this.currentPage_reprint_list = val;
        let newdata=[],
        pageNum=this.currentPage_reprint_list-1;
        for(let i=this.page_size_reprint_list*pageNum;i<this.page_size_reprint_list*pageNum+this.page_size_reprint_list;i++ ){
          this.articleList_reprint[i] !== undefined ? newdata.push(this.articleList_reprint[i]) : '' 
        }
        this.articleList_reprint_list=newdata; 
      },
      date_change () {
        if(this.time[0]==undefined||this.time[1]==undefined||this.time[1].getTime()<this.time[0].getTime()){
          this.time=[new Date(new Date().getTime()-604800000), new Date()];
          this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }
      },
      del_ev(i){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : JSON.parse(window.sessionStorage.getItem('project_id'));
        $.ajax({
              url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event2 ",
              type:"POST",
              traditional:true,
              data:{
                "method":"DELETE", //http方法
                "proId":project_id, //项目id
                "eventIdArr":[i.id] //事件id数组
          },
          success:function(data){
            console.log(data)
            _this.data=_this.data.filter(item => { return [i.id].indexOf(item.id) === -1; });//前台删除
            _this.echart_qipao();
            if(_this.del_duibi_flag){//自身与竞品的数据分支
              for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){
                if(_this.$store.state.ev_duibiData[i].project.id==_this.del_duibi_id){
                  _this.$store.state.ev_duibiData[i].project.data=_this.data;
                }
              }
            }else{
              _this.$store.state.data=_this.data;
            }
          }
        })
      },
      save(){
        let _this=this;
        this.loading_start=true;
        _this.save_=false;
        this.$store.state.start_data= this.$store.state.data;
        let idArr=[],project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        /*for(let i=0;i<this.duibitags.length;i++){
          for(let j=0;j<this.$store.state.ev_duibiData.length;j++){
            if(this.duibitags[i]===this.$store.state.ev_duibiData[j].project.name){
              idArr.push(this.$store.state.ev_duibiData[j].project.id)
            }
          }
        }*/
        $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/sysbevent3",
          type:"POST",
          data:{
            "method":"POST", //http方法
            "proId":project_id //项目id
            },
          success:function(data){
              let type;
              if(data.success==true){
                _this.$store.state.btn_daochu=true;
                type='success';
              }else{
                type='warning';
              }
              _this.loading_start=false;
              _this.$message({
                message: data.message,
                type: type
              });
          }
        });
      },
      show_domain(){
        $('#domain_m').css('display','block');
        $('#show_btn').css('display','none');
        $('#hide_btn').css('display','inline-block');
      },
      hide_domain(){
        $('#domain_m').css('display','none');
        $('#show_btn').css('display','inline-block');
        $('#hide_btn').css('display','none');
      },
      show_custom(){
        $('#custom_m').css('display','block');
        $('#show_btn_custom').css('display','none');
        $('#hide_btn_custom').css('display','inline-block');
      },
      hide_custom(){
        $('#custom_m').css('display','none');
        $('#show_btn_custom').css('display','inline-block');
        $('#hide_btn_custom').css('display','none');
      },
       domain_click(a,b){
        $('.'+b+''+' '+'.'+b+'_all'+'').removeClass('warning');
         if(a.target.className=='btn'){
          a.target.className="btn warning"
        }else if(a.target.className="btn warning"){
          a.target.className="btn"
        }
      },
      open_del_threeList(){
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
        }
        
      },
      open_del_per(){
        let a,b,c,d,listData,e;
        if(this.dialo_title.slice(this.dialo_title.length-4,this.dialo_title.length-2)==='人物'){
          listData=this.data[this.data_Per_index].commonResult.perList;
          c='personSet';d='perList';e='current_sort_per';
        }else if(this.dialo_title.slice(this.dialo_title.length-4,this.dialo_title.length-2)==='组织'){
          listData=this.data[this.data_Per_index].commonResult.orgList;
          c='orgSet';d='orgList';e='current_sort_org';
        }else{
          listData=this.data[this.data_Per_index].commonResult.locList;
          c='locationSet';d='locList';e='current_sort_loc';
        }
        for(let i=0;i<listData.length;i++){
          if(listData[i].mention.slice(0,listData[i].mention.indexOf('/'))===this.dialo_title.slice(0,this.dialo_title.length-5)){
            a=listData[i];
            this.del_per(a,listData,c,d,e);
            this.dialogCt=false;
           }
        };
        
        console.log(this.data[this.data_Per_index].commonResult[d])
      },
      ct_articlelist_select(a){
        this.ct_articlelist_selection=a;
      },
      add_duibi(){
        this.dialogDuibiList=true;
        let _this=this;
        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        let data={
            "method": 'get',
            "project" : {
              'id':project_id//当前项目id,
            }
          };
        $.ajax({
            type: "GET",
            url: 'http://192.168.0.3:8080/rs/api/v1.1/project/'+project_id+'/competitor',
            traditional: true,
            data: {'projectDto1':JSON.stringify(data)},
            success: function(data){
              console.log(data)
              if(data.data!=null||data.data.length>0){
                _this.duibiList=data.data;
              } 
            }
          })
      },
      add_duibiName(){
        let _this=this;
        console.log(this.radio_duibi)
        this.dialogDuibiList=false;
        if(this.radio_duibi!=''){
          this.$store.state.duibiButton=false;
          this.duibi_show=true;
          window.sessionStorage.setItem('duibi_show',JSON.stringify(true));
          this.duibiData=[];
          let obj={};
          obj.project={};
          obj.project.name=JSON.parse(window.sessionStorage.getItem('start'));
          obj.project.id=JSON.parse(window.sessionStorage.getItem('project_id'));
          this.duibiData[0]=obj;
          let current_project_name;
          for(let i=0;i<this.duibiList.length;i++){
            if(this.duibiList[i].project.id==this.radio_duibi){
              current_project_name=this.duibiList[i].project.name;
              this.duibiData.push(this.duibiList[i]);
              this.$store.state.ev_duibiData=this.duibiData;
            }
          }
          //点完确定的操作
          $(function(){
            if($('.event .el-tabs__item')[1].className==='el-tabs__item is-active'){
              console.log(_this.current_project_dom_name)
              console.log(current_project_name)
              if(_this.current_project_dom_name!=current_project_name){
                $('.event .el-tabs__item')[1].className='el-tabs__item';
                $('.event .el-tabs__item')[0].className='el-tabs__item is-active';
                _this.dialogDuibiList = false;
                _this.del_duibi_flag=false;
                _this.data=_this.$store.state.data;
                _this.personSet=_this.$store.state.data[0].commonResult.perList;
                _this.locationSet=_this.$store.state.data[0].commonResult.locList;
                _this.orgSet=_this.$store.state.data[0].commonResult.orgList;
                if(_this.personSet.length<_this.current_sort_per){
                  _this.renwu(true,'personSet','人物','current_sort_per')
                }else{
                  _this.renwu(false,'personSet','人物','current_sort_per')
                };
                if(_this.locationSet.length<_this.current_sort_loc){
                  _this.renwu(true,'locationSet','地点','current_sort_loc')
                }else{
                  _this.renwu(false,'locationSet','地点','current_sort_loc')
                };
                if(_this.orgSet.length<_this.current_sort_org){
                  _this.renwu(true,'orgSet','组织','current_sort_org')
                }else{
                  _this.renwu(false,'orgSet','组织','current_sort_org')
                };
                 _this.echart_qipao();
                 $('.event_card>div').not('#all_event_echart').click(function(){
                       $(this).addClass('live').siblings().removeClass('live live1')
                  });
                 _this.echart_event();
                     
              }
            }
          })
        }      
      },
      similar(data,cp_data,key){
        let own=[],cp=[];
        for(let i of data){
          own.push(i[key])
        };
        for(let i of cp_data){
          cp.push(i[key])
        };
        return Array.from(new Set([...new Set(own)].filter(x => new Set(cp).has(x))));
      },
      look_venn(index,dta){
        this.dialogSimilar=true;
        this.similarData_per_currentPage=1;        
        this.similarData_loc_currentPage=1;        
        this.similarData_org_currentPage=1;        
        this.similarData_key_currentPage=1;        
        this.similarData_arc_currentPage=1;        
        let _this=this,data=dta.Data.commonResult,cp_data=this.duibiData[1].project.data[index].commonResult;
        let perSize = data.perList.length > cp_data.perList.length ? data.perList.length : cp_data.perList.length,similar_per,perData = [],orgSize = data.orgList.length > cp_data.orgList.length ? data.orgList.length : cp_data.orgList.length,similar_org,orgData = [],locSize = data.locList.length > cp_data.locList.length ? data.locList.length : cp_data.locList.length,similar_loc,locData = [],keySize = data.keywordList.length > cp_data.keywordList.length ? data.keywordList.length : cp_data.keywordList.length,similar_key,keyData = [],arcSize = data.eventArticleList.length > cp_data.eventArticleList.length ? data.eventArticleList.length : cp_data.eventArticleList.length,similar_arc,similar_arc_title = [],similar_arc_url = [],arcData = [];
        similar_per = this.similar(data.perList,cp_data.perList,'mention');
        this.similar_per_arr = similar_per;
        similar_org = this.similar(data.orgList,cp_data.orgList,'mention');
        this.similar_org_arr = similar_org;
        similar_loc = this.similar(data.locList,cp_data.locList,'mention');
        this.similar_loc_arr = similar_loc;
        similar_key = this.similar(data.keywordList,cp_data.keywordList,'mention');
        this.similar_key_arr = similar_key;
        similar_arc = this.similar(data.eventArticleList,cp_data.eventArticleList,'id');
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
        for(let i of similar_arc){
          let index = data.eventArticleList.findIndex(function(value){
              return value.id == i;
          });
          similar_arc_title.push(data.eventArticleList[index].title);
          similar_arc_url.push(data.eventArticleList[index].url);
        };
        this.similar_arc_arr = similar_arc_title;
        for(let i = 0;i < arcSize;i++){//匹配到相似的id然后转化成title
          let obj = {};
          obj.arc = data.eventArticleList[i] == undefined ? '' : data.eventArticleList[i].title;
          obj.arc_url = data.eventArticleList[i] == undefined ? '' : data.eventArticleList[i].url;
          obj.cp_arc = cp_data.eventArticleList[i] == undefined ? '' : cp_data.eventArticleList[i].title;
          obj.cp_arc_url = cp_data.eventArticleList[i] == undefined ? '' : cp_data.eventArticleList[i].url;
          obj.similar_arc_title = similar_arc_title[i] == undefined ? '' : similar_arc_title[i];
          obj.similar_arc_title_url = similar_arc_url[i] == undefined ? '' : similar_arc_url[i];
          arcData.push(obj);
        };
        /*console.log(perSize)
        console.log(perData)
        console.log(orgData)
        console.log(locData)
        console.log(keyData)
        console.log(arcData)*/
        _this.similarData_per=perData;
        _this.format_firstTableData('similarData_per','similarData_per_list',_this.similarData_per_pageSize);
        _this.similarData_loc=locData;
        _this.format_firstTableData('similarData_loc','similarData_loc_list',_this.similarData_per_pageSize);
        _this.similarData_org=orgData;
        _this.format_firstTableData('similarData_org','similarData_org_list',_this.similarData_per_pageSize);
        _this.similarData_key=keyData;
        _this.format_firstTableData('similarData_key','similarData_key_list',_this.similarData_per_pageSize);
        _this.similarData_arc=arcData;
        _this.format_firstTableData('similarData_arc','similarData_arc_list',_this.similarData_arc_pageSize);
      },
      _save_(){
        let _this=this,project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        this.$prompt('请输入导出事件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
        }).then(({ value }) => {
          _this.loading_start=true;
          $.ajax({
              url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/event/sysbevent3",
              type:"POST",
              traditional:true,
              data:{
                "method":"POST",
                "proId":project_id,
                "cpIdArr":[_this.table_select[0].cpId],
                "reportName":value,
                "eventCpaListStr":JSON.stringify(_this.table_select)
              },
             success:function(data){
                _this.dialog_look_duibiProject=false;
                  let type;
                  if(data.success==true){
                    _this.$store.state.btn_daochu=true;
                    type='success';
                  }else{
                    type='warning';
                  }
                  _this.loading_start=false;
                  _this.$message({
                    message: data.message,
                    type: type
                  });
             }
            })
        }).catch(() => {})
        console.log(this.table_select)
      },
      handleCheckedCitiesChange(index,dta,table,data){
          //console.log(table.checked)
          if(table.checked==true){//加入到table_select
            if(this.table_select.length>1){//判断是否选中两个
              this.$message({
                message: '最多选择两个对比事件',
                type: 'warning'
              });
              table.checked=false;
            }else{
              let obj={};
              obj.proId=dta.project_id;
              obj.proEventId=dta.eventId;
              obj.similarity=table.num;
              obj.cpId=this.duibiData[1].project.data[index].proId;
              obj.cpEventId=this.duibiData[1].project.data[index].id;
              this.table_select.push(obj);
              for(let i of this.tableData){
                i.data[index].disabled=true;
              };
              for(let i of dta.data){
                i.disabled=true;
              };
              dta.data[index].disabled=false;
            }
          }else{//从table_select里删除
            this.table_select.splice(this.table_select.findIndex(item => item.own_eventId===dta.eventId&&item.compet_eventId===this.duibiData[1].project.data[index].id), 1)
              for(let i of this.tableData){
                i.data[index].disabled=false;
              };
              for(let i of dta.data){
                i.disabled=false;
              };
          }
        //
        console.log(index)
        console.log(dta)//自身
        console.log(table)//自身
        console.log(data)//自身
        console.log(this.duibiData[1].project.data[index])//竞品
        console.log(this.table_select)
      },
      format_tabledata_ (crrtpage,pageSize,dta,dtaList) {
        let newdata=[],
        pageNum=this[crrtpage]-1;
        for(let i=this[pageSize]*pageNum;i<this[pageSize]*pageNum+this[pageSize];i++ ){
          this[dta][i] !== undefined ? newdata.push(this[dta][i]) : '' 
        }
        this[dtaList]=newdata;       
      },
      //初始表格数据
      format_firstTableData(dta,dtaList,pageSize){
        this[dtaList]=this[dta].length > pageSize ? this[dta].slice(0,pageSize) : this[dta];
      },
      similarData_per_handleCurrentChange(val){
        this.similarData_per_currentPage = val;
        this.format_tabledata_('similarData_per_currentPage','similarData_per_pageSize','similarData_per','similarData_per_list');
      },
      similarData_loc_handleCurrentChange(val){
        this.similarData_loc_currentPage = val;
        this.format_tabledata_('similarData_loc_currentPage','similarData_per_pageSize','similarData_loc','similarData_loc_list');
      },
      similarData_org_handleCurrentChange(val){
        this.similarData_org_currentPage = val;
        this.format_tabledata_('similarData_org_currentPage','similarData_per_pageSize','similarData_org','similarData_org_list');
      },
      similarData_key_handleCurrentChange(val){
        this.similarData_key_currentPage = val;
        this.format_tabledata_('similarData_key_currentPage','similarData_per_pageSize','similarData_key','similarData_key_list');
      },
      similarData_arc_handleCurrentChange(val){
        this.similarData_arc_currentPage = val;
        this.format_tabledata_('similarData_arc_currentPage','similarData_arc_pageSize','similarData_arc','similarData_arc_list');
      },
      input_write(){}
    },
   /* watch:{
      data:{
         handler: function (val, oldVal) { 
          console.log(val)
          console.log(oldVal)
          console.log(this.start_data)
          },
          deep: true
      }
    },*/
    computed:{
      
    }
  }
</script>
<style lang="scss" >
.event{
  button:hover{
        opacity: 0.8;
      }
  a:hover{
        opacity: 0.8;
      }    
  .block{
    .el-date-editor--datetime{
      input{
        height: 23px !important;
      }
    }
    .el-input__inner{
      height: 30px;
    }
    .btn-group{
      .btn{
        background-color: rgb(247, 247, 247);
        outline: none;
      }
      .warning{
        color: #fff;
        background-color: #00b38a;
        border-color: #00b38a;
      }
     button{
      margin-left: 10px;
      border-radius: 4px !important;
      padding: 2px 12px;
     }
    }
    .el-dropdown{
      >.el-button--default{
        padding: 4px 10px;
      }
    }
    .filter_event{
      #domain_m,#custom_m{
        display: none;
      }
      #hide_btn,#hide_btn_custom{
        display: none;
      }
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
        border-color: #4fc4d0 !important;
        box-shadow: 3px 3px 2px rgba(79, 196, 208,.4) !important;
     }
     .live1{
        border-color: #4fc4d0 !important;
        box-shadow: 3px 3px 2px rgba(79, 196, 208,.4) !important;
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
  #dialog_list,#dialog_echart,#dialog_ct,#dialog_list_es,#dialog_reprint,#dialog_DuibiList,#dialog_look_duibiProject,#dialog_DuibiMethod,#dialog_similar{
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
  }
  #dialog_echart,#dialog_similar{
    .el-dialog--tiny{
      width: 1200px;
      .el-dialog__body{
        position:relative;
        padding: 10px 10px;
        height: 800px;
        .page{
          right: 5px;
          bottom: 2px;
        }
        .el-table .cell, .el-table th>div{
          line-height: 30px;
          padding: 0 5px;
        }
        .el-table td{
          height: 30px;
        }
      }
    }
  }
  #dialog_echart{
    .el-dialog--tiny{
      .el-dialog__body{
        height: 430px;
      }
    }
  }
  #dialog_look_duibiProject .el-dialog--tiny{
    width: 800px !important;
    .el-dialog__body{
      padding: 15px 20px;
    }
  }
  #dialog_ct{
    .el-table td, .el-table th{
        height: 35px !important;
        text-align: center;
    }
    .el-dialog--tiny{
        width: 1200px !important;
        height: 600px !important;
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
    .el-dialog__body{
          padding:10px 15px 45px 15px;
        }
    
  }
  .progress{
    height: 14px;
    .progress-bar{
      background-color: #00b38a;
      line-height: 14px;
    }
  }
  #dia_tishi{
    .el-dialog--tiny{
      width: 20%;
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