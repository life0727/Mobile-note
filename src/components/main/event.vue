<template>  
<div class="event container" style="background-color: #fff;padding-bottom:220px;">
<div class="block" style="padding-left:5px;margin-bottom: 10px;" >
  <div class="filter_event" style="width: 100%;;border: 1px solid #dcdcdc;background: #f7f7f7;position: relative;">
    <!-- <div class="btn-group" role="group" aria-label="..." style="margin-top: 20px;" id="type">
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
    <hr style="width: 97%;"> -->
    <p></p>

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
    <!-- <span style="position: absolute;left: 635px;line-height: 25px;"><b>上下文句数:</b></span>
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
    </el-dropdown> -->
    <hr style="width: 97%;">
    <el-button type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 400px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;" id="search" @click="_start(true,true)" v-loading.fullscreen.lock="loading_start" :element-loading-text="'系统拼命加载中'+'('+programs+'%..)'" element-loading-spinner="el-icon-loading">搜索</el-button>
    <el-button :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 150px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;"  v-loading.fullscreen.lock="publicLoading" element-loading-text="系统拼命加载中" element-loading-spinner="el-icon-loading" @click="save">导出</el-button>
    <el-button :disabled="this.$store.state.btn_daochu" v-show="this.$store.state.data.length != 0" type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 150px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;"  @click="add_duibi">查看竞品</el-button>
  </div>
</div>

  <div class="el-tabs el-tabs--border-card" v-show="duibi_show">
    <div class="el-tabs__header">
      <div class="el-tabs__nav-wrap" style="border-bottom: 0px;">
        <div class="el-tabs__nav-scroll">
          <div class="el-tabs__nav">
            <div @click="compet_card(i.id,$event)" :class="[$index == 0 ? 'el-tabs__item is-active' : 'el-tabs__item']" v-for="(i,$index) in duibiData">{{i.name}}</div>
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
    <div v-for="(i,$index) in data" :class="{ live:$index == data_Per_index}" style="width:387px;height: 230px;border: 1px solid #ebebeb;position: relative;overflow: hidden;cursor: pointer;float: left;padding:0 ;margin: 10px 20px 10px 5px;border-radius: 8px;" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)" @click="card_click($index)">
    <img src="../../assets/icon/del.png" style="position: absolute;top: 2px;right: 0px;cursor: pointer;z-index:10;display: none;" @click.stop="del_ev(i)">
      <div style="width: 100%;height:88px;padding: 0 5px;position: relative;">
        <div style="width: 65px;height: 76px;margin-left: 10px; " ><img src="../../assets/icon/eventnumber.png" ><span style="width:64px;height: 30px;position:absolute;left: 16px;;top:46px;color: white;font-size: 16px;text-align:center"></span></div>
        <p style="position: absolute;top: 10px;left:90px;font-size: 16px;"><img src="../../assets/icon/event-title.png" style="padding-right: 6px;color: #333333;"><span><input type="text" :value="i.name" @click.stop="input_write" @blur="blur_input($index)" ref="inpt" style="width: 260px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></p>
        <p style="position: absolute;top:35px;left:110px;color: rgb(242,196,70);cursor: pointer;" @click.stop="dialog_articleList(i,$index)"><img src="../../assets/icon/event-like.png" style="padding-right: 6px;">相关文章({{i.articleCount==null ? 0 : i.articleCount}})</p>
      </div>
      <el-dropdown @command="sort_dropdown_keyword" style="position: absolute;z-index: 9;right: 0px;" >
              <el-button style="padding: 2px 6px;">{{i.sortArr}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700;"></i></el-button> 
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in dropdown_sort_num" :command="i+$index" >{{i}}</el-dropdown-item >
              </el-dropdown-menu>
      </el-dropdown>
      <div @click.stop="echart_click($index)" style="width: 100%;height:140px;padding: 0 5px;" :id="'echart_card'+$index">
      </div>
    </div>
      <div id="all_event_echart" style="width: 1225px;height: 400px;position: relative;float: left;"></div>
  </div>
  
    <el-dialog title="详情图" :visible.sync="dialogEchart" id="dialog_echart" width="1200px">
        <div style="width: 100%;height:400px;padding: 0 5px;border:1px solid #ebebeb" id="echart_max"></div>
   </el-dialog>
  <el-dialog :title="dialo_title" :visible.sync="dialogCt" width="1000px" id="dialog_ct" >
    <div style="position:absolute;left: 15px;padding: 10px;border: 1px solid rgb(235, 235, 235);width:970px;height: 520px;">
      <el-table
              :data="ct_data_list"
              border
              style="width: 100%"
              @selection-change="ct_articlelist_select">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                label="文章标题"
                show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
              </el-table-column>
        </el-table> 
        <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="open_del_threeList">删除文章</el-button>
        <el-button v-show="this.dialo_title!=='相关文章'" type="warning" style="position: absolute;left: 120px; bottom: 6px;padding: 5px 10px;" @click="open_del_per">删除此{{dialo_title.slice(dialo_title.length-4,dialo_title.length-2)}}</el-button>
            <el-pagination
            v-if="pageShow"
            class="page"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="page_size"
            layout="total,  prev, pager, next, jumper"
            :total="this.ct_data_total"
            v-show="this.ct_data_total!==0">
            </el-pagination>
    </div>
  </el-dialog>
  <!-- 转发文章 -->
  <el-dialog title="相关文章转发" :visible.sync="dialog_reprint" size="tiny" id="dialog_reprint">
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
    <el-dialog title="选择对比项目" :visible.sync="dialogDuibiList" id="dialog_DuibiList">
      <p v-show="this.duibiList.length == 0" style="margin: 10% 42%;color: #f34c81">暂无数据，请添加竞品</p>
      <el-radio-group v-model="radio_duibi">
        <el-radio v-for="i in duibiList" :label="i.id">{{i.name}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDuibiList = false">取 消</el-button>
        <el-button type="primary" @click="add_duibiName">确 定</el-button>
      </span>
   </el-dialog> 
   <!-- 选择对方式 -->
    <el-dialog title="选择对比方式" :visible.sync="dialogDuibiMethod"  id="dialog_DuibiMethod">
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
    <el-dialog title="查看对比项目" :visible.sync="dialog_look_duibiProject"  id="dialog_look_duibiProject">
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
                    <th width="" v-for="(i,$index) in table_compet_data"><span data-toggle="tooltip" data-placement="top" :title="'事件标题:'+i.name"><input type="text" :value="i.name" @blur="blur_table(i,$index,true)" ref="cp_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                  </tr>
                  <tr v-for="(i,$index) in tableData">
                      <th width="" ><span data-toggle="tooltip" data-placement="top" :title="'事件标题:'+i.name"><input type="text" :value="i.name" @blur="blur_table(i,$index)" ref="_inpt" style="width: 100px;outline: none;border-width: 0;text-decoration: none;box-shadow: none;font-size: 14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></th>
                      <td v-for="(j,$index) in i.data"><el-checkbox v-model="j.checked" :disabled="j.disabled" @change="handleCheckedCitiesChange($index,i,j,tableData)"></el-checkbox>&nbsp;  <span class="duibi_num" :style="{color: j.max ? '#f34c81' : ''}" @click="look_venn($index,i)">{{j.num}}</span></td>
                  </tr>            
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="this.table_select.length!=0" :disabled="this.$store.state.btn_daochu" type="success" size="large" class="search_start" style="padding: 10px 18px;font-size: 14px;background-color: #00b38a;border-color:#00b38a;position:absolute;right: 110px"  @click="save">导 出</el-button>
        <el-button @click="dialog_look_duibiProject = false" style="margin-right: 0px">取 消</el-button>
      </span>
   </el-dialog> 
   <!-- venn图 -->
   <el-dialog title="相关信息" :visible.sync="dialogSimilar" width="1200px" id="dialog_similar">
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
       <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:49%;height: 320px;top: 475px">
            <el-table
             :data="similarData_arc_list"
             border
             style="width: 100%">
             <el-table-column
               label="自身文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
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
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_arc_total"
           v-show="this.similarData_arc_total!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div> 
     <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:49%;height: 320px;top: 475px;left: 50%;">
            <el-table
             :data="similarData_arc_list_cpa"
             border
             style="width: 100%">
             <el-table-column
               label="竞品文章标题"
               show-overflow-tooltip>
               <template scope="scope"><a :href="scope.row.url" target="_blank">{{ scope.row.title}}</a></template>
             </el-table-column>
           </el-table>    
       <!-- 分页 strart -->
       <el-pagination
           v-if="pageShow"
           class="page"
           @current-change="similarData_arc_handleCurrentChange_cpa"
           :current-page="similarData_arc_currentPage_cpa"
           :page-size="similarData_arc_pageSize"
           layout="total,  prev, pager, next, jumper"
           :total="this.similarData_arc_total_cpa"
           v-show="this.similarData_arc_total_cpa!==0">
       </el-pagination>
     <!-- 分页 end -->
     </div> 
   </el-dialog>
</div>  
</template>
<script >
import echart from 'echarts'
import ecStat from 'echarts-stat'
import _echart from '../../assets/js/_echart.js'
import { format_time,Sort,Map,date_change,SetSessionStorage,GetSessionStorage,publicSearch,successBack,tipsMessage,similar,jsonToStrMap }  from '../../assets/js/map.js'
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
          current_sort:GetSessionStorage('current_sort')||'6',
          current_sort_loc:GetSessionStorage('current_sort_loc')||'10',
          current_sort_per:GetSessionStorage('current_sort_per')||'10',
          current_sort_org:GetSessionStorage('current_sort_org')||'10',
          dropdown_sort:['2','3','4','5','6','7','8','9','10'],
          sj:[1,2,3,4,5,6,7,8,9,10],
          time: GetSessionStorage('time0')!=null ? [new Date(GetSessionStorage('time0')),new Date(GetSessionStorage('time1'))] : [new Date(new Date().getTime()-604800000), new Date()],
          fimg:require("../../assets/icon/xiangguanwenzhang.png"),
          imgf:require("../../assets/icon/xiangguanwenzhang1.png"),
          ct_size:'',
          ct_name:'',
          ct_url:'',
          ct_data:[],
          list_type:'',
          ct_data_list:[],
          ct_data_total:'',
          articleList_list:[],
          articleList_reprint_list:[],
          currentPage:1,
          currentPage_list:1,
          currentPage_reprint_list:1,
          page_size:12,
          page_size_list:12,
          page_size_reprint_list:12,
          edit:false,
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
          data_Per_index:0,//点击卡片获取相对应总数据的index
          data_second_index:'',//点击人物组织圆点获取index
          dropdown_jushuNum:['1','2','3','5','全部'],
          dropdown_cixingNum:['所有词性','仅动/名词'],
          current_jushuNum:GetSessionStorage('current_jushuNum') || 3,
          current_cixing:GetSessionStorage('current_cixing') || '所有词性',
          loading_start:false,
          publicLoading:false,
          visible_per:false,
          dialo_title:'',
          ct_articlelist_selection:[],
          duibi_show:GetSessionStorage('duibi_show')!=null ? GetSessionStorage('duibi_show') : false,
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
          similarData_arc_total:'',//相似度表格里面自身文章列表的总数
          similarData_arc_total_cpa:'',//相似度表格里面競品文章列表的总数
          //similarData_arc:[],
          similarData_arc_list:[],
          similarData_arc_list_cpa:[],//相似度表格里面自身文章列表
          similarData_arc_currentPage:1,
          similarData_arc_currentPage_cpa:1,//相似度表格里面競品文章列表的當前頁碼
          similarData_arc_pageSize:7,
          similar_per_arr:[],
          similar_loc_arr:[],
          similar_org_arr:[],
          similar_key_arr:[],
          //similar_arc_arr:[],
          entityType:'',//获取文章需要的参数--实体类型
          entityName:'',//获取文章需要的参数--实体名称
          similarData_topicId:'',//相似度表格里面自身文章id 获取文章列表需要的参数
          similarData_cpTopicId:'',//相似度表格里面竞品文章id 获取文章列表需要的参数
          pageShow:true,
          programs:0//进度条数字
        }
    },
    mounted : function () {
        let _this = this,project_id = GetSessionStorage('project_id');
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
       $('#type  button').click(function(){ $(this).addClass('warning').siblings().removeClass('warning');});

       $('#dialog_list_es .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialo_es = false;});

       $('#dialog_DuibiList .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogDuibiList = false;});
               
       $('#dialog_DuibiMethod .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogDuibiMethod = false;});
               
       $('#dialog_look_duibiProject .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialog_look_duibiProject = false;});
            
       $('#dialog_similar .el-dialog .el-dialog__header .el-dialog__headerbtn').click(function(){ _this.dialogSimilar=false;});       
       
       $(function(){
                $('.el-tabs__item').click(function(){
                  $(this).addClass('is-active');
                  $(this).parent().find('.el-tabs__item').not($(this)).removeClass('is-active');
                });
         });
       $('.el-dialog__headerbtn').not('#dialog_list_es .el-dialog__headerbtn').click(function(){
        _this.dialoglist = false;
        _this.dialogEchart = false;
        _this.dialogCt = false;
      });
       $('#dialog_reprint .el-dialog__headerbtn').click(function(){
        _this.dialog_reprint = false;
        _this.dialogCt = true;
       });
        
         //获取行业属性
        /*$.ajax({
          type: "GET",
          url: 'rsa/project/'+project_id+'/wxAccount/domain',
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
          url: 'rsa/project/'+project_id+'/wxAccount/customType',
          traditional: true,
          success: function(data){
            _this.custom=data.data;
            if(_this.custom.length>9){
              _this.custom_s=_this.custom.slice(0,9);
              _this.custom_m=_this.custom.slice(9,_this.custom.length);
            }else{
               _this.custom_s=_this.custom;
            };
          }
        });*/
        this._start(true,true);    
    },
    methods:{
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
          if(oid==GetSessionStorage('project_id')){//如果是自身
              this.del_duibi_flag=false;
              $(document).ready(function(){
                      _this.dom_write(_this.$store.state.data);
                      _echart.build_event_qipao(_this);
                      //_echart.build_event_allEvent(_this);
                   })
          }else{//点击的是竞品
            if(this.$store.state.ev_duibiData[i].id==oid){
              this.del_duibi_flag=true;
              this.del_duibi_id=oid;
              console.log(this.$store.state.ev_duibiData[i])
              if(this.$store.state.ev_duibiData[i].data != undefined){//vuex里面有这个事件id的数据
                $(function(){
                  _this.dom_write(_this.$store.state.ev_duibiData[i].data);
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
        console.log(this.duibiData)
        this.loading_start=true;
        this.dialogDuibiMethod=false;
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
        publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/topic/cpa/similartable',"GET",params).then((data) =>{//ajax
          if(successBack(data,this)){
            for(let i=0;i<this.duibiData[0].topicList.length;i++){
              let obj={};
              obj.name=this.duibiData[0].topicList[i].name;
              obj.eventId=this.duibiData[0].topicList[i].id;
              //obj.eventArticleList=this.$store.state.data[i].commonResult.eventArticleList;
              //obj.keywordList=this.$store.state.data[i].commonResult.keywordList;
              obj.Data=this.duibiData[0].topicList[i];
              obj.project_id=GetSessionStorage('project_id');
              obj.data=[];
              let fun=this.radio_duibi_Method == 4 ? Math.min : Math.max;
              let maxData = [];//每一行的相似度数组
              for(let k of cpTopicIdList){
                  for(let j of data.data){
                    if(j.topicAId == proTopicIdList[i] && k == j.topicBId){
                      maxData.push(j.similarity);
                      let _obj={};
                      _obj.checked=false;
                      _obj.disabled=false;
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
     _start (compet_flag,loading_flag,oid) { //compet_flag竞品事件查询标识，如果true则是自身点击查询;loading_flag--true则显示
      let _this = this;
      let project_id;
      this.$store.state.btn_daochu = false; 
      if(loading_flag){//点击查询
        console.log('点击查询')
        this.publicLoading = true;
      };
      if(compet_flag){//点击自身查询
        this.$store.state.ev_duibiData = '';
        this.table_select = [];
        this.current_project_dom_name = GetSessionStorage('start');
        project_id = GetSessionStorage('project_id');
        this.duibi_show = false;
      }else{//点击竞品查询
        project_id = oid;
      };
      $('.event_card').css('display','none')
      //this.dom_search();//筛选以及保存session
      this.personSet = [];
      this.locationSet = [];
      this.orgSet = [];
      this.data = [];   
      let Dta = {
        "proId": project_id, //项目id
        "articleType": _this.articleType, //文章类型
        "startTime": _this.time[0].getTime(),//时间戳（毫秒级）
        "endTime": _this.time[1].getTime(),
        "topicNum": _this.current_sort,
        "perNum":_this.current_sort_per,
        "locNum":_this.current_sort_loc,
        "orgNum":_this.current_sort_org,
        "keywordNum": "10",
        "isTiming":1
      }; 
      let params = {"method":"GET","criteriaStr":JSON.stringify(Dta)}
      publicSearch('rsa/project/'+project_id+'/topic',"GET",params).then((data) =>{//ajax
        this.publicLoading = false;
        if(successBack(data,this)){
          let color;
          if(data.data.time < 60){
            color = '#67C23A';
          }else if(data.data.time >= 60 && data.data.time < 120){
            color = '#E6A23C';
          }else{
            color = '#F56C6C';
          };
          let time = data.data.time >= 60 ? parseInt(data.data.time/60) + '分钟' + (parseInt(data.data.time))%60 + '秒' : parseInt(data.data.time)+'秒';
          console.log('事件预计耗时：'+time);
          this.$confirm('共查询到<i style="color:#409EFF">'+data.data.total+'</i>篇文章，生成议题预计耗时<span style="color:'+color+'">' + time +'</span>'+'，是否继续？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true,
              type: 'warning'
            }).then(() => {//搜索
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
                if(successBack(data),this){
                    console.log('事件实际耗时：'+data.data.realTime);
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
                    _this.$store.state.data = data.data; 
                  }else{//点击竞品查询
                    _this.$store.state.duibiButton = true;
                    for(let i = 0;i < _this.$store.state.ev_duibiData.length;i++){ //竞品对比数据添加到vuex
                        if(_this.$store.state.ev_duibiData[i].id == project_id){
                          _this.$store.state.ev_duibiData[i].data = data.data;
                          console.log(_this.$store.state.ev_duibiData)
                        }
                      }
                    }
                  $(document).ready(function(){
                      _echart.build_event_qipao(_this);
                      //_echart.build_event_allEvent(_this);
                  });
                };
              })  
            }).catch(() => {});
        }
      })                      
    },
    dialog_articleList_reprint(a,b,c){  
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
    dialog_articleList (i,a){
        console.log(i)
        this.entityType = '';//区分点击实体还是议题里的相关文章的标识
        this.data_articleList_index = a;//点击相关文章列表的时候获取到他的总数据的index
        this.dialo_title = '相关文章';
        this.dialogCt = true;
        this.ct_data_total = i.articleCount;
        this.pageShow = false;  
        this.currentPage = 1;  
        this.handleCurrentChange(this.currentPage);
      },
      echart_click (a) { 
        this.dialogEchart = true;
        let _this=this;
        $(function(){
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
      del_keywordList(c,d,e){
         let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
         let params = {
          "method": 'POST',
          "topicId": this.data[c].id, //议题id
          "entityType":'key',
          "entityNameList[]":[d],
        };
        return publicSearch('rsa/project/'+project_id+'/topic/entity',"POST",params);
         /*$.ajax({
          url:"rsa/project/"+project_id+"/event/entity ",
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
         }) */  
      },
      Mover_ct (i) {
          this.$refs.ct[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct[i].style.transition='all 0.5s';
      },
      Mover_ct_loc (i) {
          this.$refs.ct_loc[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_loc[i].style.transition='all 0.5s';
      },
      Mover_ct_org (i) {
          this.$refs.ct_org[i].style.boxShadow='2px 2px 2px rgba(72,87,106,.8)';
          this.$refs.ct_org[i].style.transition='all 0.5s';
      },
      click_ct_list (i) { window.open(i.url); },
      Mover (a) { this.$refs.list[a].style.boxShadow = '9px 9px 6px rgba(220,220,220,.8)'; },
      Mout (a) { this.$refs.list[a].style.boxShadow = ''; },
      Mover_articleList (i) { this.$refs.articlelist[i].style.color = "#00a17c"; },
      Mover_articleList_reprint (i) { this.$refs.articlelist_reprint[i].style.color = "#00a17c";  },
      Mover_ct_list (i) { this.$refs.ct_list[i].style.color = "#00a17c"; },
      Mout_ct (i) { this.$refs.ct[i].style.boxShadow = ''; },
      Mout_ct_loc (i) { this.$refs.ct_loc[i].style.boxShadow = ''; },
      Mout_ct_org (i) { this.$refs.ct_org[i].style.boxShadow = ''; },
      Mout_articleList (i) {  this.$refs.articlelist[i].style.color = "rgb(72,87,106)"; },
      Mout_articleList_reprint (i) { this.$refs.articlelist_reprint[i].style.color = "rgb(72,87,106)"; },  
      Mout_ct_list (i) { this.$refs.ct_list[i].style.color = "#999"; }, 
      dropdown_jushu (command) { this.current_jushuNum = command; },
      dropdown_cixing (command) { this.current_cixing = command; },
      sort_dropdown (command) { this.current_sort = command; }, 
      sort_dropdown_keyword(command){
        let indx = command.slice(command.length-1,command.length);
        let num = command.slice(0,command.length-1);
        this.data[indx].sortArr = num;
         console.log(command);
        _echart.build_event_qipao(this,indx,num);
      },
      sort_dropdown_per (command) {
        this.current_sort_per = command;
        this.personSet = this.data[this.data_Per_index].perList;
        if(this.personSet.length < this.current_sort_per){
          tipsMessage('所选数量大于数据数量','warning',this); 
          _echart.build_event_scatter(true,'personSet','人物','current_sort_per',this)
        }else{
          _echart.build_event_scatter(false,'personSet','人物','current_sort_per',this)
        }
      },
      sort_dropdown_loc (command) {
        this.current_sort_loc = command;
        this.locationSet = this.data[this.data_Per_index].locList;
        if(this.locationSet.length < this.current_sort_loc){
          tipsMessage('所选数量大于数据数量','warning',this); 
          _echart.build_event_scatter(true,'locationSet','地点','current_sort_loc',this)
        }else{
          _echart.build_event_scatter(false,'locationSet','地点','current_sort_loc',this)
        }
      },
      sort_dropdown_org(command) {
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
          let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
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
          /*$.ajax({
            url:"rsa/project/"+project_id+"/event/article ",
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
                  if(_this.$store.state.ev_duibiData[i].id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].data[_this.data_articleList_index].commonResult.eventArticleList=_this.ct_data; 
                    }
                  }
              }else{
                _this.data[_this.data_articleList_index].commonResult.eventArticleList=_this.ct_data;             
              };
              let newdata=[],
              pageNum=_this.currentPage_list-1;
              for(let i=_this.page_size_list*pageNum;i<_this.page_size_list*pageNum+_this.page_size_list;i++ ){
                _this.ct_data[i] !== undefined ? newdata.push(_this.ct_data[i]) : '' 
              }
              _this.ct_data_list=newdata;
            }
        });*/  
      },
      del_threeList(arr){
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
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
        /*$.ajax({
          url:"rsa/project/"+project_id+"/event/entity/article ",
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
                  if(_this.$store.state.ev_duibiData[i].id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].data[_this.data_Per_index].commonResult[_this.list_type][_this.data_second_index].eventArticleList=_this.ct_data;
                    }
                  }
              }else{
                _this.data[_this.data_Per_index].commonResult[_this.list_type][_this.data_second_index].eventArticleList=_this.ct_data;
              }
            _this.format_tabledata_('currentPage','page_size','ct_data','ct_data_list');
          }
        });*/
      },
      del_per(t,a,b,c,e){
        let _this=this;
        console.log(this.data)
        console.log(this[b])
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
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
        /*$.ajax({
          url:"rsa/project/"+project_id+"/event/entity ",
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
                  if(_this.$store.state.ev_duibiData[i].id==_this.del_duibi_id){
                      _this.$store.state.ev_duibiData[i].data[_this.data_Per_index].commonResult[c]=_this.$store.state.ev_duibiData[i].data[_this.data_Per_index].commonResult[c].filter(item => { return _this.mentionArr.indexOf(item.mention) === -1; }); 
                    }
                  }
              }else{
                _this.data[_this.data_Per_index].commonResult[c]=_this.data[_this.data_Per_index].commonResult[c].filter(item => { return _this.mentionArr.indexOf(item.mention) === -1; });             
              };
              f = _this.data[_this.data_Per_index].commonResult[c].length < _this[e] ? true : false ;
              _echart.build_event_scatter(f,b,_this.dialo_title.slice(_this.dialo_title.length-4,_this.dialo_title.length-2),e,_this)
              //console.log( _this.data[_this.data_Per_index].commonResult[c])
            }
        });*/
      },
      blur_input (i){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
        if(this.data[i].label!=this.$refs.inpt[i].value){
          $.ajax({
              url:"rsa/project/"+project_id+"/event/label",
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
                    if(_this.$store.state.ev_duibiData[h].id==_this.del_duibi_id){
                        _this.$store.state.ev_duibiData[h].data[i].label=_this.$refs.inpt[i].value;
                      }
                    }
                }else{
                  _this.data[i].label=_this.$refs.inpt[i].value;
                };
              }
          });
        }
      },
      blur_table(dta,i,flag){
        let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
        let inp=flag ? 'cp_inpt' : '_inpt';
        $.ajax({
              url:"rsa/project/"+project_id+"/event/label",
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
                    if(_this.$store.state.ev_duibiData[h].id==dta.proId){
                        _this.$store.state.ev_duibiData[h].data[i].label=_this.$refs[inp][i].value;
                      }
                    }
                }else{
                   _this.$store.state.data[i].label=_this.$refs[inp][i].value;
                };
              }
          });
        console.log(dta)
      },
      
      handleCurrentChange (val,entityType,entityName) {
        this.currentPage = val;
        let url = this.entityType ? 'rsa/project/'+GetSessionStorage('project_id')+'/topic/'+this.data[this.data_Per_index].id+'/entity/article' : 'rsa/project/'+GetSessionStorage('project_id')+'/topic/'+this.data[this.data_articleList_index].id+'/article';
        this.loading_start = true;
        let params = {
            "method": 'GET',
            "topicId": entityType ? this.data[this.data_Per_index].id : this.data[this.data_articleList_index].id, //议题id
            "entityType": this.dialo_title == '相关文章' ? '' : this.entityType,
            "entityName": this.dialo_title == '相关文章' ? '' : this.entityName,
            "articleType": this.articleType, //文章类型
            "pageSize": this.page_size,//每页数量
            "pageNum": val //页码
         };
        publicSearch(url,"GET",params).then((data) =>{
            this.loading_start = false;
          if(successBack(data,this)){
            this.ct_data_list = data.data == null ? [] : data.data.articleList;
            this.$nextTick(function () {
              this.pageShow = true
            });
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
        publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/topic/'+this.similarData_topicId+'/article',"GET",params).then((data) =>{
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
      handleCurrentChange_reprint_list(val){
        this.currentPage_reprint_list = val;
        this.format_tabledata_('currentPage_reprint_list','page_size_reprint_list','articleList_reprint','articleList_reprint_list');
      },
      date_change () { date_change(this); },//修改时间验证
      del_ev(i){
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
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
        /*let _this=this;
        let project_id = this.del_duibi_flag ? this.del_duibi_id : GetSessionStorage('project_id');
        $.ajax({
              url:"rsa/project/"+project_id+"/event2 ",
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
            _echart.build_event_qipao(_this);
            if(_this.del_duibi_flag){//自身与竞品的数据分支
              for(let i=0;i<_this.$store.state.ev_duibiData.length;i++){
                if(_this.$store.state.ev_duibiData[i].id==_this.del_duibi_id){
                  _this.$store.state.ev_duibiData[i].data=_this.data;
                }
              }
            }else{
              _this.$store.state.data=_this.data;
            }
          }
        });*/
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
        };  
      },
      open_del_per(){
        console.log('open_del_per')
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
        //console.log(this.data[this.data_Per_index].commonResult[d])
      },
      ct_articlelist_select(a){ this.ct_articlelist_selection = a ;},
      add_duibi(){
        this.dialogDuibiList=true;
        let data = {
          "method": 'get',
          "project" : {
            'parentId':GetSessionStorage('project_id')//当前项目id,
          }
        };
        publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/competitor',"GET",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.duibiList = data.data;
          }
        }); 
      },
      add_duibiName(){
        let _this=this;
        console.log(this.radio_duibi)
        console.log(this.duibiList)
        this.dialogDuibiList=false;
        if(this.radio_duibi!=''){
          this.$store.state.duibiButton=false;
          this.duibi_show=true;
          SetSessionStorage('duibi_show',true);
          this.duibiData=[];
          let obj={};
          obj.name=GetSessionStorage('start');
          obj.id=GetSessionStorage('project_id');
          obj.topicList = this.$store.state.data.topicList;
          this.duibiData[0]=obj;
          let current_project_name;
          for(let i=0;i<this.duibiList.length;i++){
            if(this.duibiList[i].id==this.radio_duibi){
              current_project_name=this.duibiList[i].name;
              this.duibiData.push(this.duibiList[i]);
              this.$store.state.ev_duibiData=this.duibiData;
            }
          };
          console.log(this.duibiData)
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
                _this.dom_write(_this.$store.state.data);
                 _echart.build_event_qipao(_this);
                 //_echart.build_event_allEvent(_this);   
              }
            }
          });
        };      
      },
      look_venn(index,dta){
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
        /*for(let i of similar_arc){
          let index = data.eventArticleList.findIndex(function(value){
              return value.id == i;
          });
          similar_arc_title.push(data.eventArticleList[index].title);
          similar_arc_url.push(data.eventArticleList[index].url);
        };*/
        //this.similar_arc_arr = similar_arc_title;
        /*for(let i = 0;i < arcSize;i++){//匹配到相似的id然后转化成title
          let obj = {};
          obj.arc = data.eventArticleList[i] == undefined ? '' : data.eventArticleList[i].title;
          obj.arc_url = data.eventArticleList[i] == undefined ? '' : data.eventArticleList[i].url;
          obj.cp_arc = cp_data.eventArticleList[i] == undefined ? '' : cp_data.eventArticleList[i].title;
          obj.cp_arc_url = cp_data.eventArticleList[i] == undefined ? '' : cp_data.eventArticleList[i].url;
          obj.similar_arc_title = similar_arc_title[i] == undefined ? '' : similar_arc_title[i];
          obj.similar_arc_title_url = similar_arc_url[i] == undefined ? '' : similar_arc_url[i];
          arcData.push(obj);
        };*/
        /*console.log(perSize)
        console.log(perData)*/
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
      save(){
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
        if(this.$store.state.ev_duibiData.length > 1 && this.$store.state.ev_duibiData[1].data != null){//有竞品时
          let idArr = [];
          for(let i of this.$store.state.ev_duibiData[1].data.topicList){
            idArr.push(i.id);
          };
          obj.topicIdList = idArr;
          obj.proId = this.$store.state.ev_duibiData[1].id;
          cpTopicDtoList.push(obj);
        };
        if(this.table_select.length > 0){//有对比事件时
          for(let i of this.table_select){
            let obj = {};
            obj.topicAId = i.proEventId;
            obj.topicBId = i.cpEventId;
            obj.similarity = i.similarity;
            cpaResult.push(obj);
          };
        };
        this.$prompt('请输入导出事件名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          beforeClose: (action, instance, done) => {
             if (action === 'confirm') {
              done();
             };
          }
        }).then(({ value }) => {
          let data = {
            "proId":GetSessionStorage('project_id'),
            "startTime": this.time[0].getTime(),//时间框中的起始时间
            "endTime": this.time[1].getTime(),//结束时间
            "reportName":value,
            "articleType":this.articleType,
             proTopicDto,
             cpTopicDtoList,
             cpaResult
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+GetSessionStorage('project_id')+'/topic/expt',"POST",{'topicExptDtoStr':JSON.stringify(data)}).then((data) =>{//ajax
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
      handleCheckedCitiesChange(index,dta,table,data){
          console.log(table.checked)
          if(table.checked == true){//加入到table_select
            if(this.table_select.length > 1){//判断是否选中两个
              tipsMessage('最多选择两个对比事件','warning',this);
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
                i.data[index].disabled=true;
              };
              for(let i of dta.data){
                i.disabled=true;
              };
              dta.data[index].disabled=false;
            }
          }else{//从table_select里删除
            this.table_select.splice(this.table_select.findIndex(item => item.own_eventId===dta.eventId&&item.compet_eventId===this.duibiData[1].data.topicList[index].id), 1)
              for(let i of this.tableData){
                i.data[index].disabled=false;
              };
              for(let i of dta.data){
                i.disabled=false;
              };
          }
        console.log(index)
        console.log(dta)//自身
        console.log(table)//自身
        console.log(data)//自身
        //console.log(this.duibiData[1].data[index])//竞品
        console.log(this.table_select)
      },
      //改变页数的表格数据变化
      card_click (a) {
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
        SetSessionStorage('current_sort',this.current_sort);
        SetSessionStorage('current_sort_per',this.current_sort_per);
        SetSessionStorage('current_sort_loc',this.current_sort_loc);
        SetSessionStorage('current_sort_org',this.current_sort_org);
        SetSessionStorage('current_jushuNum',this.current_jushuNum);
        SetSessionStorage('current_cixing',this.current_cixing);
        SetSessionStorage('time0',this.time[0].getTime());
        SetSessionStorage('time1',this.time[1].getTime());
        SetSessionStorage('custom_arr',custom_arr);
        SetSessionStorage('domain_arr',domain_arr);     
      },
      //查询到文章遍历到dom操作
      dom_write(data){
        if(data.topicList==null||data.topicList.length==0){
          tipsMessage('查询到的文章数量太少,无法生成议题。请调整时间区间或增加关键词后再试。','warning',this); 
          return;
        };
        for(let z=0;z<data.topicList.length;z++){
          data.topicList[z].locList ? data.topicList[z].locList.sort(Sort('score')) : '' ;
          data.topicList[z].orgList ? data.topicList[z].orgList.sort(Sort('score')) : '' ;
          data.topicList[z].perList ? data.topicList[z].perList.sort(Sort('score')) : '' ;
          data.topicList[z].sortArr='10';
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
      //人物组织地点散点图
      event_scatter(){
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
      input_write(){}
    },
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
          padding-right: 0 ;
        }
        .el-input__icon{
          line-height: 22px;
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
          color: #00b38a;
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
            top:13px;
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
  #dialog_echart{
      .el-dialog__body{
        padding: 10px 10px;
        height: 430px;
      }
  }
  #dialog_look_duibiProject .el-dialog{
    width:58%;
    .el-dialog__body{
      padding: 15px 20px;
    }
  }
  #dialog_ct{
    .el-dialog__body{
      height: 600px !important;
    }
    .el-table td, .el-table th{
        height: 35px !important;
        text-align: center;
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