<template>
  <div class="Media container" style="background-color: #fff;padding-bottom:220px;position: relative;padding: 0;margin-top:30px;">
  <a id="downlink"></a><!-- 导出excel表格 -->
  <el-popover
  placement="bottom-end"
  width="320"
  @show="add_duibiName"
  popper-class="popoverCss"
  trigger="click">
    <div style="height: 250px;width:100%;">
      <div style="width:90%;height: 60px;border-bottom: 1px solid #e4e4e4;margin: 0 auto;line-height: 60px;text-align: center;font-size: 16px;">添加对比竞品</div>
      <p style="width:90%;position: absolute;top: 80px;left: 15px;font-size: 16px;">自身项目：<a href="javascript:;" @click="Tab_card(duibiData[0].id,duibiData[0].name)" style="color: #00b38a">{{duibiData[0].name}}</a></p>

      <el-popover
      placement="bottom-end"
      width="180"
      v-model="popover2_show"
      @show="add_duibi"
      popper-class="popoverCss"
      trigger="click">
        <div class="list-group" id="ev_popover" style="position: absolute;width:100%;margin-bottom: 0;background: white;
    border: 1px solid #e4e4e4;border-radius: 4px;">
          <a v-for="i in duibiList" href="javascript:;" class="list-group-item" style="border-width: 0px;cursor:auto;" v-show="duibiData.length < 3">
            <span style="cursor:pointer;" @click.stop="add_duibiName(i)">{{i.name}}</span>
            <i class="fa fa-plus-circle" @click.stop="add_duibiName(i)" style="position:absolute;right: 10px;cursor:pointer;"></i>
          </a>
          <router-link to="/keyword" v-show="duibiData.length < 3">
            <el-button icon="el-icon-plus" type="text" style="margin-left: 55px;color: rgb(0, 179, 138)" @click="$store.state.keyword_tab = '_competTab'">新增竞品</el-button>
          </router-link>  
          <p v-show="duibiData.length >= 3" style="color: rgb(245, 108, 108);padding: 10px;">最多添加两个对比竞品,请先删除后再添加。</p>
        </div>
      <el-button style="padding: 4px 5px;font-size: 14px;background-color:  #00b38a;border-color:  #00b38a;color: white;position: absolute;top: 80px;right: 15px;z-index: 999999!important" icon="el-icon-plus" slot="reference">快捷添加</el-button>
      </el-popover>
      
      <p style="color:#00b38a;margin: 85px" v-show="this.duibiData.length == 1">请至少添加一个竞品</p>
      <div class="list-group" id="event" style="position: absolute;top:115px;width:100%;" v-show="this.duibiData.length > 1">
        <a v-for="(i,$index) in duibiData.slice(1,duibiData.length)" href="javascript:;" :class="currentProId == i.id ? 'list-group-item active' : 'list-group-item'" style="border-width: 0px;font-size: 16px;cursor: auto;">
          <span v-show="$index == 0">竞品项目：</span><a href="javascript:;" :style="{marginLeft:$index ? '81px' : '0' }" @click="Tab_card(i.id,i.name)">{{i.name}}</a>
          <el-checkbox style="right:50px;position:absolute" :checked="i.check" @change="checkboxChange(i)"></el-checkbox>
          <img src="../../../assets/icon/del.png" style="right:20px;position:absolute;top: 13px;display: none;cursor: pointer" @click="delCompet(i)"></a>
        </a>
      </div>
      <el-button style="padding: 4px 20px;font-size: 14px;background-color: rgb(0, 179, 138);border-color:rgb(0, 179, 138);color:white;position: absolute;bottom: 10px;right: 105px;"  @click="save">导出</el-button>
      <el-button :style="{padding:'4px 5px',fontSize: '14px',backgroundColor: this.selectDuibiData.length > 1 ? '#00b38a' : '#e4e4e4',borderColor: this.selectDuibiData.length > 1 ? '#00b38a' :'#e4e4e4',color:this.selectDuibiData.length > 1 ? 'white' : '#555',position:'absolute',bottom:'10px',right:'15px'}" :disabled="this.selectDuibiData.length <= 1" @click="look">对比({{this.selectDuibiData.length <= 1 ? 0 : this.selectDuibiData.length-1}}/2)</el-button>
    </div>
  <img v-show="this.duibiData[0].mediaList.length != 0" style="position: absolute;right: 30px;top:-56px;z-index:999;cursor: pointer" slot="reference" src="../../../assets/icon/addDuibi.png">
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
          <button type="button" style="margin: 5px 3px;border-radius: 3px;padding: 2px 10px;" class="btn" @click="domain_click($event,'domain')" :disabled="btn_disabled" v-for="(i,$index) in domain" >{{i}}</button>
        </div>
        <hr style="margin: 10px 0;">
        <el-button type="success" size="large"  style="padding: 5px 20px;font-size: 14px;margin-left: 345px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;"  @click="dom_search" >确定</el-button>
        <span style="position: absolute;left: 170px;line-height: 45px;cursor: pointer" slot="reference">媒体分类 <i :class="domin_popover ? 'fa fa-angle-up' : 'fa fa-angle-down'" style="margin-left: 2px;"></i></span>
      </el-popover>

      <span style="position: absolute;left: 265px;line-height: 45px;">媒体数量:</span>
      <el-dropdown  @command="dropdown_media" style="margin-left: 325px;" @visible-change="visibleChangemediaNum">
              <el-button style="padding: 3px 5px;border-width: 0px;background-color: rgb(247, 247, 247);color:#00b38a">{{current_media}}<i :class="sort_dropdown_visible_mediaNum ? 'fa fa-angle-down' : 'fa fa-angle-up'" style="margin-left: 6px;font-size: 14px;font-weight: 700;color: #333"></i></el-button>    
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="i in ['5','10','15','20']" :command="i">{{i}}</el-dropdown-item>
              </el-dropdown-menu>
      </el-dropdown>
      
      <span style="position: absolute;left: 380px;line-height: 45px;border-left: 1px solid rgb(228,228,228);top: 12px;height: 22px;"></span>
       <div class="block" style="display: inline-block" >
        <el-date-picker
         @change="date_change"
         :editable="edit"
         :clearable="edit"
         style="position: relative;width:170px;font-size: 12px;margin-left:55px;"
          v-model="time[0]"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>
      <div class="block" style="display: inline-block;margin-top: 12px;" >
          <span class="demonstration" style="margin: 0 5px;">至</span>
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
      <span class="SearchBegin" id="search" @click="_search" >搜索</span>
      <span class="SearchBegin"   @click="downloadFile()" v-show="this.data.length != 0">导出excel</span>
    </div>
  </div>

 <div class="Media container" style="background-color: #fff;position: relative;border: 1px solid rgba(228, 228, 228, 1);border-top-width: 0;">  
  <p style="padding: 10px 0 10px 5px;color:#999999;margin: 0">当前项目：<b style="color: #00b38a;margin-right:20px;">{{current_project_dom_name}}</b>已选媒体分类：<span style="color: #00b38a;">{{domain_arr.length == 0 ? '全部' : domain_arr.toString()}}</span></p>
  <div class="clientContent" v-show="this.data.length == 0" >
    <img src="../../../assets/icon/noData.png"  style="position:absolute;left:0;right: 0;top: 0;bottom: 0;margin: auto;">
  </div>
   <div id="content" class="clientContent" v-show="this.data.length != 0">
      <div style="width: 400px;height: 50px;border-bottom: 1px solid #ebebeb;border-top: 1px solid #ebebeb;line-height: 50px;float: left;display: inline-block">
        <span style="margin-left:45px;">媒体TOP10</span>
        <span style="margin-left: 100px">发文篇数</span>
      </div>

      <div style="width: 670px;height: 50px;border-bottom: 1px solid #ebebeb;border-top: 1px solid #ebebeb;line-height: 50px;display: inline-block;margin-left: 125px;">
        <span style="margin-left:10px;">{{currentmediaName}}</span>
        <span :class="tabShow == 0 ? 'tabActive' : ''" style="width: 88px;height: 25px;display: inline-block;margin-top: 12px;line-height: 25px;text-align: center;cursor: pointer;position: absolute;right: 120px;" @click="tabShow = 0">高频词汇</span>
        <span :class="tabShow == 1 ? 'tabActive' : ''" style="width: 88px;height: 25px;display: inline-block;margin-top: 12px;line-height: 25px;text-align: center;cursor: pointer;position: absolute;right:20px;"  @click="tabShow = 1">相关文章</span>
      </div>

      <p style="margin: 20px 0 10px 0;width: 400px;"><span style="margin-left: 225px;">0</span><span style="margin-left: 120px;">{{data.length == 0 ? 0 : data[0].articleCount}}</span></p>
      <el-table
        ref="Table"
        id="Table"
        :data="tableData"
        tooltip-effect="dark"
        style="width:390px;position: absolute;cursor: pointer;"
        @row-click="rowClick"
        @selection-change="SelectionChange">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          label=""
          width="180">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label=""
          width="180">
          <template scope="scope">
            <div class="progress" style="box-shadow: none;background-color: white;margin-bottom: 0;background: none;">
              <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" :style="{width:''+scope.row.progressWidth+'%',marginRight:'10px',height: '8px',marginTop: '5px',marginBottom: '5px',borderRadius:'3px',backgroundColor:'rgb(0, 179, 138)'}">
              </div>
              {{scope.row.articleCount}}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-checkbox style="margin: 10px 10px 10px 15px;top: 385px;" v-model="select_All"   v-show="this.data.length!==0" >全选</el-checkbox>
      <el-button type="text" @click="remove" style="color:#f56c6c;margin-left: 5px;position: absolute;top:485px" v-show="(select_All&&this.data.length!==0)||this.Selection.length!==0" >删除</el-button>
      <el-pagination
            class="page"
            style="left: 200px;top: 490px;"
            @current-change="handleCurrentChange_selfmedia"
            :current-page="currentPage_selfmedia"
            :page-size="page_size_selfmedia"
            layout="total,  prev, pager, next"
            :total="this.data.length"
            v-show="this.data.length > 0">
        </el-pagination>

         <el-table
          v-show="tabShow == 0&&this.data.length > 0"
          ref="Table_per"
          id="Table_per"
          @cell-click="table_click"
          :data="per_data"
          border
          @selection-change="perlist_select"
          style="width:335px;position: absolute;left:525px;top: 75px">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            label="人物"
            :show-overflow-tooltip="true"
            width="130">
            <template slot-scope="scope">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/')) }}</template>
          </el-table-column>
          <el-table-column
            label="篇章数"
            width="82">
            <template slot-scope="scope">{{ scope.row.articleCount }}</template>
          </el-table-column>
          <el-table-column
            label="出现频次"
            width="82">
            <template slot-scope="scope">{{ scope.row.count }}</template>
          </el-table-column>
         </el-table> 
        <el-checkbox style="margin: 10px;top:400px;left:445px" v-model="select_All_per"   v-show="this.per_data.length!==0&&tabShow == 0&&this.data.length > 0" >全选</el-checkbox>
        <el-button type="text" @click="del_('perlist_selection','perList','mention','per_data')" style="color:#f56c6c;margin-left: 5px;position: absolute;top:500px;left:612px" v-show="(select_All_per&&this.per_data.length!==0)||this.perlist_selection.length!==0&&tabShow == 0" >删除</el-button>

        <el-table
          v-show="tabShow == 0&&this.data.length > 0"
          ref="Table_key"
          id="Table_key"
          @cell-click="table_click"
          :data="key_data"
          border
          @selection-change="keywordlist_select"
          style="width:335px;position: absolute;left:859px;top: 75px">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            label="关键词"
            :show-overflow-tooltip="true"
            width="130">
            <template slot-scope="scope">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/')) }}</template>
          </el-table-column>
          <el-table-column
            label="篇章数"
            width="82">
            <template slot-scope="scope">{{ scope.row.articleCount }}</template>
          </el-table-column>
          <el-table-column
            label="出现频次"
            width="82">
            <template slot-scope="scope">{{ scope.row.count }}</template>
          </el-table-column>
         </el-table> 
        <el-checkbox style="margin: 10px 10px 10px 15px;top:400px;left:698px" v-model="select_All_key"   v-show="this.key_data.length!==0&&tabShow == 0&&this.data.length > 0" >全选</el-checkbox>
        <el-button type="text" @click="del_('keywordlist_selection','keywordList','mention','key_data')" style="color:#f56c6c;margin-left: 5px;position: absolute;top:500px;left:946px" v-show="(select_All_key&&this.key_data.length!==0)||this.keywordlist_selection.length!==0&&tabShow == 0" >删除</el-button>

        <el-table
          v-show="tabShow == 1&&this.data.length > 0"
          v-loading="media_articleTableLoading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
          ref="Table_article"
          id="Table_article"
          @cell-click="table_click"
          :data="article_data"
          border
          @selection-change="articlelist_select"
          style="width:670px;position: absolute;left:525px;top: 75px">
          <el-table-column
            type="selection"
            width="45">
          </el-table-column>
          <el-table-column
            label="文章标题"
            show-overflow-tooltip>
            <template scope="scope">{{ scope.row.title}}</template>
          </el-table-column>
        </el-table>  
        <el-checkbox style="margin: 10px;top:405px;left:448px" v-model="select_All_article"   v-show="this.article_data.length!==0&&tabShow == 1&&this.data.length > 0" >全选</el-checkbox>
        <el-button type="text" @click="del_('articlelist_selection','eventArticleList','id','article_data','tabledata_articlelist_list')" style="color:#f56c6c;position: absolute;top:505px;left:620px" v-show="(select_All_article&&this.article_data.length!==0)||this.articlelist_selection.length!==0&&tabShow == 1" >删除</el-button>

        <span class="SearchBegin" :style="{position:'absolute',left:'650px' ,top:'511px',padding:'5px 5px',lineHeight:'14px'}"  @click="downloadArticleFile('第一层')" v-show="(select_All_article&&this.article_data.length!==0)||this.articlelist_selection.length!==0&&tabShow == 1">导出excel</span>
        <el-pagination
              v-if="pageShow"
              class="page"
              style="right:0px;top:510px;"
              @current-change="handleCurrentChange_article"
              :current-page="currentPage_art"
              :page-size="page_size"
              layout="total,  prev, pager, next"
              :total="this.tabledata_articlelist_total"
              v-show="this.tabledata_articlelist_total!==0&&tabShow == 1&&this.data.length > 0">
         </el-pagination>
   </div>  

     <!-- 第二级模态框 -->
      <el-dialog title="相关新闻" :visible.sync="dialo_media" width="700px"  id="dialog_list_media">
        <div style="position:absolute;left: 35px;padding: 10px;width:620px;height: 520px;">
            <el-table
              :data="second_tabledata_list"
              stripe
              style="width: 100%"
              @cell-click="table_click"
              @selection-change="second_select">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="文章标题"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.title}}</template>
              </el-table-column>
            </el-table>
            <span v-show="this.second_selection.length != 0" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;color:#999999">已选（{{second_selection.length}}）</span> 
            <el-button v-show="this.second_selection.length != 0"  type="text" style="position: absolute;left: 90px; bottom: 6px;padding: 7px 3px;color:#999999;" @click="del_2('second_selection','id')">删除</el-button>
            <span class="SearchBegin" :style="{position:'absolute',left: this.second_selection.length ? '185px' : '0px',bottom:'7px',padding:'5px 5px',lineHeight:'14px'}"  @click="downloadArticleFile()" v-show="this.second_selection.length != 0">导出excel</span>
            <el-pagination
                  v-if="pageShow"
                  class="page"
                  @current-change="handleCurrentChange_media"
                  :current-page="currentPage_media"
                  :page-size="page_size_media"
                  layout="total,  prev, pager, next"
                  :total="this.second_tabledata_total"
                  v-show="this.second_tabledata_total!==0">
              </el-pagination>
          </div>
        </el-dialog>
       <!--  对比图 -->
        <el-dialog title="对比图" :visible.sync="dialo_duibi" width="1200px"custom-class="ev_dialogClass"  id="dialo_duibi">
            <div style="width: 100%;height: 100%" id="Duibi"></div>
            <span slot="footer" class="dialog-footer" >
              <el-button @click="dialo_duibi = false">取 消</el-button>
              <el-button type="primary" @click="save">导 出</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import _echart from '../../../assets/js/_echart.js'
import {format_time,_Sort,date_change,tipsMessage,GetLocalStorage,publicSearch,successBack,startLoading,endLoading,s2ab,downloadExl} from '../../../assets/js/map.js'
export default {
  mounted :function () {
    let _this = this;
    publicSearch('rsa/wxaccount/domain',"GET",{"method":"get"}).then((data) =>{//ajax
        if(successBack(data,this)){
          this.domain = data.data
        }
      }); 
    this.search();
  //样式
  $('.clientContent').css('height',$(window).height()-280+'px');
  $('#dialog_list_media .el-dialog__headerbtn').click(function(){
    _this.dialo_media=false;
  })
  $('#dialo_duibi .el-dialog__headerbtn').click(function(){
    _this.dialo_duibi=false;
    })
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
   this.outFile = document.getElementById('downlink')//导出excel所需要的数据元素
  $('#echart').css('opacity','0');
  },
  data () {
    return {
        edit:false,
        time:[new Date(new Date().getTime()-604800000), new Date()],
        articleType:2,
        data:[],
        tableData:[],//自身表格datalist
        page_size_media:10,
        page_size_selfmedia:10,
        currentPage_media:1,
        currentPage_selfmedia:1,
        dialo_media:false,
        dialo_duibi:false,
        current_media:20,
        currentPage_ky:1,
        currentPage_art:1,
        page_size:10 ,
        second_tabledata_list:[],
        second_selection:[],
        first_data_index:'',
        data_label:'',
        search_flag:false,
        duibiList:[],//项目下的竞品数组
        duibiData:[{'name':'','id':'','mediaList':''}], 
        duibiTable_flag:false,//false 则为点击的自身项目下的媒体 true 为点击竞品项目下的媒体
        currentProId:'',
        currentMention:'',//自身或竞品的实体名称
        media_articleTableLoading:false,//模态框里的相关文章loading
        mediaId:'',//媒体的id 查找媒体下的相关文章
        pageShow:false, //page页面异步交互
        tabledata_articlelist_total:'',//媒体下的文章总数
        second_tabledata_total:'',//媒体下的实体的文章总数
        btn_disabled:false,//媒体分类是否可选中
        domin_popover:false,//媒体分类是否显示
        domain:[],//媒体分类
        custom:[],//媒体分类
        domain_arr:[],//媒体分类
        custom_arr:[], //媒体分类
        countToatal_1:0,//count总数自身
        select_All:false,//自身全选状态绑定
        Selection:[],//自身选中元素
        tabShow:0,//右边文章和关键词tab切换
        per_data:[],//右边人物和关键词表格
        key_data:[],//右边人物和关键词表格
        article_data:[],//右边文章表格
        select_All_per:false,//自身人物全选状态绑定
        select_All_key:false,//自身关键词全选状态绑定
        select_All_article:false,//自身文章全选状态绑定
        perlist_selection:[],//自身人物选中元素
        keywordlist_selection:[],//自身关键词选中元素
        articlelist_selection:[],//自身文章选中元素
        popover2_show:false,//添加竞品第二层popover显示
        currentDuibiData:'',//当前对比数据
        selectDuibiData:[],//选中的对比数据
        current_project_dom_name:'',//当前项目名称
        currentmediaName:'',//当前媒体名称
        sort_dropdown_visible_mediaNum:true,//true为显示false为隐藏
        outFile: '',  // 导出excle文件
        }
    },
  methods: {
    //改变页数的表格数据变化
    format_tabledata_ (crrtpage,pageSize,dta,dtaList) {
        let newdata=[],
        pageNum=this[crrtpage]-1;
        for(let i=this[pageSize]*pageNum;i<this[pageSize]*pageNum+this[pageSize];i++ ){
          this[dta][i] !== undefined ? newdata.push(this[dta][i]) : '' 
        }
        this[dtaList]=newdata;       
    },
      //初始化表格
    format_table (a,b) {
      this.currentPage=1;
      this.currentPage_ky=1;
      this[a].length > 10 ? this[b] = this[a].slice(0,10) : this[b] = this[a] ;
    },
    Tab_card(Id,Name){//切换项目查看事件
      //console.log(Id)
      this.currentProId = Id;
      this.current_project_dom_name = Name;
      if(Id == GetLocalStorage('current_projectData_A').project_id){//如果是自身
        this.duibiTable_flag = false;
        this.data = this.duibiData[0].mediaList;
      }else{//点击的是竞品
        this.duibiTable_flag = true;
        if(this.duibiData[this.duibiData.findIndex(item => item.id == Id)].mediaList == null){
          this.search(this.duibiTable_flag,Id);
        }else{
          this.data = this.duibiData[this.duibiData.findIndex(item => item.id == Id)].mediaList;
        }
      }; 
      this.tableData = this.data.length > 10 ? this.data.slice(0,10) : this.data;
      this.rowClick(this.data[0]);
    },
    add_duibiName(Dta){
      console.log(Dta)
      console.log(this.duibiData)
      if(this.duibiData.length >= 3 && Dta){
        tipsMessage('最多添加两个对比竞品','warning',this);
        this.popover2_show = false;
        return;
      };
      this.duibiData[0].name = GetLocalStorage('current_projectData_A').project_name;
      this.duibiData[0].id = GetLocalStorage('current_projectData_A').project_id;
      if(Dta){
        this.duibiTable_flag = true;
        this.currentProId = Dta.id;
        let obj = {};
        obj.id = Dta.id;
        obj.name = Dta.name;
        obj.mediaList = null;
        this.duibiData.push(obj)
        this.popover2_show = false;
        this.Tab_card(Dta.id);
      };
      /*if(Dta){
        this.duibiTable_flag = true;
        this.currentProId = Dta.id;
        this.currentDuibiData = Dta;
        this.search(this.duibiTable_flag,this.currentProId);
      };*/
      /*if(this.duibiTable_flag){
        this.duibiData = this.$store.state.ev_duibiData;
      }*/
      
      console.log(this.duibiData)
    },
    look(){
      this.dialo_duibi = true;
      let idarr = [];
      for(let i of this.selectDuibiData){
          idarr.push(i.id);
      }; 
      let params = {
        "method":"GET", //http方法
        "proId":GetLocalStorage('current_projectData_A').project_id, //项目id
        "cpIdList[]":idarr //竞品id数组
      };
      startLoading();
      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/cpa',"GET",params).then((data) =>{//ajax
        endLoading();
        if(successBack(data,this)){
          console.log(data)
           let cate = data.data.cateList.slice(0,idarr.length),cate_ = data.data.cateList.slice(idarr.length,data.data.cateList.length),_categories = data.data.cateList,_data = data.data.dataList,_links =  data.data.linkList;
            $(function(){
                _echart.build_graph('Duibi',cate,cate_,_categories,_data,_links);
            });
        };
       });   
    },
    add_duibi(){
      let idArr = [];
      for(let i of this.duibiData){
        idArr.push(i.id);
      };
      let data = {
          "method": 'get',
          "project" : {
            'parentId':GetLocalStorage('current_projectData_A').project_id//当前项目id,
          }
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"GET",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.duibiList = data.data.filter(item => { return idArr.indexOf(item.id) == -1; });;
            console.log(this.duibiList)
          }
        });
    },  
    _search(){
      if(this.search_flag){
      this.$confirm('当前搜索结果已修改，是否导出？', '提示', {
          confirmButtonText: '导出',
          cancelButtonText: '继续搜索(不保存)',
          closeOnClickModal:false,
          customClass:'ev_confirmClass',
          type: 'warning'
        }).then(() => {
          this.save()
        }).catch(() => {
          this.search();
        });
      }else{
        this.search();
      }
    },
    search(duibiTable_flag,Id){// duibiTable_flag false 则为点击的自身项目下的媒体, true 为点击竞品项目下的媒体
        let project_id = '',dataMap = new Map();
        //this.duibiData.length = 1;
        this.search_flag = false;
        startLoading();
        this.$store.state.btn_media = false;
        this.countToatal_1 = 0;
        if(duibiTable_flag){//竞品查询
          project_id = Id;
          this.duibiTable_flag = true;
        }else{//自身查询
          project_id = GetLocalStorage('current_projectData_A') == null ? this.$router.push('/login') : GetLocalStorage('current_projectData_A').project_id;//项目id
          this.duibiTable_flag = false;
        };
        let Dta = {
          "proId":project_id,
          "articleType": this.articleType, //文章类型
          "startTime": this.time[0].getTime(),
          "endTime": this.time[1].getTime(),
          "mediaTopN":this.current_media,//生成的媒体数量
          "domainList":this.domain_arr,
          "perNum": "10", //媒体下人物数量
          "locNum": "10",//地点数量
          "orgNum": "10",//媒体数量
          "keywordNum": "10"//关键词数量
        };
        let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
        publicSearch('rsa/project/'+project_id+'/media',"GET",params).then((data) =>{//ajax
          endLoading();
          if(successBack(data,this)){
            if(data.data.mediaList == null || data.data.mediaList.length == 0){
              tipsMessage('暂无数据,请调整时间区间或增加关键词后再试','warning',this);
              return;
            };
            console.log(data)
            data.data.mediaList.sort(_Sort('articleCount'));
            for(let i of data.data.mediaList){
              this.countToatal_1 += i.articleCount;
            };
            for(let i of data.data.mediaList){
              i.progressWidth = (i.articleCount/this.countToatal_1)*100;
            };
            if(duibiTable_flag){//竞品查询
              this.popover2_show = false;
              //this.duibiData[1] = this.currentDuibiData;
              this.duibiData[this.duibiData.findIndex(item => item.id == Id)].mediaList = this.data = data.data.mediaList;
              this.duibiData[this.duibiData.findIndex(item => item.id == Id)].check = false;
              this.current_project_dom_name = this.duibiData[this.duibiData.findIndex(item => item.id == Id)].name;
            }else{//自身
              this.duibiData[0].mediaList = this.data = data.data.mediaList; 
              this.duibiData[0].id = GetLocalStorage('current_projectData_A').project_id; 
              this.duibiData[0].name = GetLocalStorage('current_projectData_A').project_name; 
              this.duibiData[0].check = true;
              this.duibiData.length = this.selectDuibiData.length = 1;
              this.current_project_dom_name = GetLocalStorage('current_projectData_A').project_name;
            }; 
            this.tableData = this.data.length > 10 ? this.data.slice(0,10) : this.data;
            this.rowClick(this.data[0]); 
         
            console.log(this.duibiData)
          };
        }); 
         
    },
    remove(){//删除媒体
      console.log(this.Selection);
      console.log(this.duibiTable_flag);
      let mediaIdList = [];
      for(let i of this.Selection){
        mediaIdList.push(i.id);
      };
        let params = {
          "method": 'POST',
           "mediaIdList[]":mediaIdList
        };
        startLoading();
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media',"POST",params).then((data) =>{//ajax
          endLoading();
          if(successBack(data,this)){
            if(this.duibiTable_flag){
              this.data = this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList= this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList.filter(item => { return mediaIdList.indexOf(item.id) === -1; });//前台删除
              this.tableData = this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList.length > 10 ? this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList.slice(0,10) : this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList;
            }else{
              this.data = this.duibiData[0].mediaList = this.duibiData[0].mediaList.filter(item => { return mediaIdList.indexOf(item.id) === -1; });//前台删除
              this.tableData = this.duibiData[0].mediaList.length > 10 ? this.duibiData[0].mediaList.slice(0,10) : this.duibiData[0].mediaList;
            };
            this.search_flag = true;
          };
        });  
    },
    del_(a,b,c,d,e){  //('perlist_selection','perList','mention','tabledata_perlist','tabledata_perlist_list')
      // console.log(this.first_data_index) ;
      console.log(this.perlist_selection);
      console.log(this[e]);
      let _this = this,project_id=GetLocalStorage('current_projectData_A').project_id,arr = [];
      for(let i of this[a]){
        arr.push(i[c]);
      };
      if(a==='articlelist_selection'){//判断媒体文章
          let params = {
              "method": 'POST',
              "mediaId":this.data[this.first_data_index].id,//媒体id
              "entityType":"art",
              "entityNameList[]":arr
          };
          startLoading();
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/article',"POST",params).then((data) =>{//ajax
            endLoading();
            if(successBack(data,this)){
              if(this.duibiTable_flag){
                this.tabledata_articlelist_total = this.data[this.first_data_index].articleCount = this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index].articleCount = this.data[this.first_data_index].articleCount - arr.length;
              }else{
                this.tabledata_articlelist_total = this.data[this.first_data_index].articleCount = this.duibiData[0].mediaList[this.first_data_index].articleCount = this.data[this.first_data_index].articleCount - arr.length;
              };
              this[d] = this[d].filter(item => { return arr.indexOf(item[c]) === -1; });
              //初始
              if(this.tabledata_articlelist_total > 0){
                this.currentPage_art * this.page_size > this.tabledata_articlelist_total ? this.currentPage_art = this.currentPage_art - 1 : '';
                this.pageShow = false;    
                this.handleCurrentChange_article(this.currentPage_art);
              };
            };
          });  
        }else{//删除媒体的实体
              let params = {
                "method": 'POST',
                "mediaId":this.data[this.first_data_index].id,//媒体id
                "entityType":a.slice(0,3),
                "entityNameList[]":arr
              };
              startLoading();
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/entity',"POST",params).then((data) =>{//ajax
                endLoading();
                if(successBack(data,this)){
                  if(this.duibiTable_flag){
                    this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index][b] = this.data[this.first_data_index][b] = this.data[this.first_data_index][b].filter(item => { return arr.indexOf(item[c]) === -1; });
                  }else{
                    this.duibiData[0].mediaList[this.first_data_index][b] = this.data[this.first_data_index][b] = this.data[this.first_data_index][b].filter(item => { return arr.indexOf(item[c]) === -1; });
                  }
                  this[d] = this.data[this.first_data_index][b];
                  this.search_flag = true;
                };
              });      
        }
      },
    rowClick(dta){//dom遍历等
      console.log(dta)
      this.currentmediaName = dta.name;
      this.first_data_index = this.data.findIndex(d => d.name === dta.name);//第一层下标
      this.per_data = dta.perList;
      this.key_data = dta.keywordList;
      this.mediaId = dta.id;
      this.pageShow = false;
      this.tabledata_articlelist_total = dta.articleCount;
      this.currentPage_art = 1;
      this.handleCurrentChange_article(this.currentPage_art);
    },
    table_click(a,b,c){
      console.log(a);
      if(b.label == "篇章数" || b.label == "出现频次"){
        return;
      };
      if(a.url){
        window.open(a.url);
        return;
      };
      a.mention.slice(a.mention.indexOf('/'),a.mention.length) === '/PER' ? this.data_label = 'perList' : this.data_label = 'keywordList';
      this.pageShow = false;
      this.second_tabledata_total = a.articleCount;
      this.currentPage_media = 1;
      this.currentMention = a.mention;
      this.handleCurrentChange_media(this.currentPage_media);  
    },
    del_2(a,b){//'second_selection','id'
      //console.log(this[a]);
      let _this = this,project_id=GetLocalStorage('current_projectData_A').project_id,arr = [];
      for(let i of this[a]){
        arr.push(i[b]);
      };
        
        let params = {
            "method": 'POST',
            "mediaId":this.mediaId,//媒体id
            "entityType":this.data_label.slice(0,3),
            "mention":this.currentMention,
            "entityNameList[]":arr
        };
        startLoading();
          //console.log(this.duibiData[1].mediaList[this.first_data_index]);
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/entity/article',"POST",params).then((data) =>{//ajax
            endLoading();
            if(successBack(data,this)){
              if(this.duibiTable_flag){//竞品的
                for(let i of this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index][this.data_label]){
                  if(i.mention == this.currentMention){
                    this.second_tabledata_list = this.second_tabledata_list.filter(item => { return arr.indexOf(item.id) === -1; });
                    this.second_tabledata_total = i.articleCount = i.articleCount - arr.length;
                    //初始
                    if(this.second_tabledata_total > 0){
                      this.currentPage_media*this.page_size_media > this.second_tabledata_total ? this.currentPage_media = Math.ceil(this.second_tabledata_total/this.page_size_media) : '';
                      this.pageShow = false;    
                      this.handleCurrentChange_media(this.currentPage_media);
                    }else{//全选 删除实体
                      let params = {
                        "method": 'POST',
                        "mediaId":this.mediaId,//媒体id
                        "entityType":this.data_label.slice(0,3),
                        "entityNameList[]":[this.currentMention]
                      };
                      startLoading();
                      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/entity',"POST",params).then((data) =>{//ajax
                        endLoading();
                        if(successBack(data,this)){
                          let d = this.data_label.slice(0,3) + '_data';
                          let c = 'mention';
                          this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index][this.data_label] = this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index][this.data_label].filter(item => { return [this.currentMention].indexOf(item[c]) === -1; });//前台删除
                          this[d] = this.duibiData[this.duibiData.findIndex(item => item.id == this.currentProId)].mediaList[this.first_data_index][this.data_label];
                          //this.format_table(d,e);
                          this.dialo_media = false;
                          this.search_flag = true;
                        };
                      });
                    }  
                  }
                }
             }else{//自身
                for(let i of this.duibiData[0].mediaList[this.first_data_index][this.data_label]){
                    if(i.mention == this.currentMention){
                      this.second_tabledata_list = this.second_tabledata_list.filter(item => { return arr.indexOf(item.id) === -1; });
                      this.second_tabledata_total = i.articleCount = i.articleCount - arr.length;
                      //初始
                      if(this.second_tabledata_total > 0){
                        this.currentPage_media*this.page_size_media > this.second_tabledata_total ? this.currentPage_media = Math.ceil(this.second_tabledata_total/this.page_size_media) : '';
                        this.pageShow = false;    
                        this.handleCurrentChange_media(this.currentPage_media);
                      }else{//全选 删除实体
                        let params = {
                          "method": 'POST',
                          "mediaId":this.mediaId,//媒体id
                          "entityType":this.data_label.slice(0,3),
                          "entityNameList[]":[this.currentMention]
                        };
                        startLoading();
                        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/entity',"POST",params).then((data) =>{//ajax
                          endLoading();
                          if(successBack(data,this)){
                            let d = this.data_label.slice(0,3) + '_data';
                            let c = 'mention';
                            this.duibiData[0].mediaList[this.first_data_index][this.data_label] = this.duibiData[0].mediaList[this.first_data_index][this.data_label].filter(item => { return [this.currentMention].indexOf(item[c]) === -1; });//前台删除
                            this[d] = this.duibiData[0].mediaList[this.first_data_index][this.data_label];
                            //this.format_table(d,e);
                            this.dialo_media = false;
                            this.search_flag = true;
                          };
                        });
                      }  
                    }
                  }
             }
            };
          });  
    },
    
    save(){
      console.log(this.selectDuibiData)
      if(this.duibiData[0].mediaList.length == 0 && this.selectDuibiData.length == 1){
        tipsMessage('没有可导出的结果','warning',this);
        return;
      };
      let proAnaDto = {},proIdArr = [],cpAnaDtoList = [];//cpAnaDtoList竞品，proAnaDto自身
      for(let i of this.duibiData[0].mediaList){
        proIdArr.push(i.id);//proIdArr z自身媒体id数组
      };
      proAnaDto.proId = GetLocalStorage('current_projectData_A').project_id;
      proAnaDto.anaIdList = proIdArr;
      if(this.selectDuibiData.length != 1){//有竞品
        for(let j of this.selectDuibiData.slice(1,this.selectDuibiData.length)){
          let obj = {},cpaIdArr = [];
          obj.proId = j.id;
          for(let i of j.mediaList){
            cpaIdArr.push(i.id);
          };
          obj.anaIdList = cpaIdArr;
          cpAnaDtoList.push(obj);
        };
      };
      console.log(proAnaDto)
      console.log(cpAnaDtoList)
      this.$prompt('请输入导出媒体名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          customClass:'ev_confirmClass',
          inputPattern:/\S/,
          inputErrorMessage: '名称不能为空',
          inputValue:GetLocalStorage('current_projectData_A').project_name
        }).then(({ value }) => {
          let data = {
            proAnaDto,
            cpAnaDtoList,
            "proId": GetLocalStorage('current_projectData_A').project_id,//自身项目id
            "startTime": this.time[0].getTime(),
            "endTime": this.time[1].getTime(),
            "reportName": value,//报告名称
            "articleType": this.articleType
          };
          let params = {
            "method": 'post',
            'mediaExptDtoStr' : JSON.stringify(data)
          };
          startLoading();
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/media/expt',"POST",params).then((data) =>{//ajax
            endLoading();
            if(successBack(data,this)){
              //清空所有数据
              this.$store.state.btn_media = true;
              this.duibiData = [{'name':'','id':'','mediaList':''}];
              this.data = [];
              this.tableData = [];
              this.current_project_dom_name = '';
              tipsMessage(data.message,'success',this);
            };
          });
        }).catch(() => {})   
    },
    handleCurrentChange_selfmedia(val){
      this.select_All = false;
      this.currentPage_selfmedia = val;
      this.format_tabledata_('currentPage_selfmedia','page_size_selfmedia','data','tableData');
    },
    handleCurrentChange_article(val){//ajax 获取文章列表
      this.currentPage_art = val;
      this.media_articleTableLoading = true;
      let proId = this.duibiTable_flag ? this.currentProId : GetLocalStorage('current_projectData_A').project_id;//项目id
      let mediaId = this.mediaId;//媒体id
      let params = {
            "method": 'GET',
             mediaId, //媒体id
            "articleType": this.articleType, //文章类型
            "pageSize": this.page_size,//每页数量
            "pageNum": val //页码
          };
      publicSearch('rsa/project/'+proId+'/media/'+mediaId+'/article',"GET",params).then((data) =>{
        this.media_articleTableLoading = false;
        if(successBack(data,this)){
          this.article_data = data.data == null ? [] : data.data.articleList;
          this.$nextTick(function () {
            this.pageShow = true
          });
        }
      })    
    },
    handleCurrentChange_media (val) {
      this.currentPage_media = val;
      startLoading();
      this.dialo_media = true;
      let proId = this.duibiTable_flag ? this.currentProId : GetLocalStorage('current_projectData_A').project_id;//项目id
      let mediaId = this.mediaId;//媒体id
      let params = {
            "method": 'GET',
             mediaId, //媒体id
            "articleType": this.articleType, //文章类型
            "entityType": this.currentMention.slice(this.currentMention.indexOf('/')+1,this.currentMention.length) == 'PER' ? 'PER' : 'KEY', //实体类型
            "entityName": this.currentMention, //实体名称
            "pageSize": this.page_size_media,//每页数量
            "pageNum": val //页码
          };
      publicSearch('rsa/project/'+proId+'/media/'+mediaId+'/entity/article',"GET",params).then((data) =>{
        endLoading();
        if(successBack(data,this)){
          this.second_tabledata_list = data.data == null ? [] : data.data.articleList;
          this.$nextTick(function () {
            this.pageShow = true
          });
        }
      });     
    },

    SelectionChange(val){//表格选中自身
      this.Selection = val;
      this.Selection.length == 0 ? this.select_All = false : '';
    },
    //筛选条件里的属性与下拉列表的dom数据以及保存
      dom_search(){
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
        let arr_data=this.custom.filter(item => { return custom_arr_name.indexOf(item.name) !== -1; });
        for(let i=0;i<arr_data.length;i++){
          custom_arr.push(arr_data[i].id);
        }
        this.domain_arr=domain_arr;
        this.custom_arr=custom_arr;   
      },
      domain_click(a,b){
        $('.'+b+''+' '+'.'+b+'_all'+'').removeClass('warning');
         if(a.target.className=='btn'){
          a.target.className="btn warning"
        }else if(a.target.className="btn warning"){
          a.target.className="btn"
        }
      },
    visibleChangemediaNum(a){
      this.sort_dropdown_visible_mediaNum = !a;
    },
    delCompet(i){
      this.selectDuibiData = [];
      this.duibiData = this.duibiData.filter(item => { return [i.id].indexOf(item.id) === -1;});
      this.duibiData.map(x => x.check ? this.selectDuibiData.push(x) : '');
      console.log(this.selectDuibiData)
      console.log(this.selectDuibiData.length)
    },  
    checkboxChange(a){
      a.check ? a.check = false : a.check = true;
      this.selectDuibiData = [];
      this.duibiData.map(x => x.check ? this.selectDuibiData.push(x) : '');
      //console.log(this.duibiData)
    },
    perlist_select(a){ 
      this.perlist_selection = a ;
      this.perlist_selection.length == 0 ? this.select_All_per = false : '';
    },
    keywordlist_select(a){ 
      this.keywordlist_selection = a ;
      this.keywordlist_selection.length == 0 ? this.select_All_key = false : '';
    },
    articlelist_select(a){ 
      this.articlelist_selection = a ;
      this.articlelist_selection.length == 0 ? this.select_All_article = false : '';
    },  
    dropdown_media(command){ this.current_media = command ;},
    second_select(a){ this.second_selection = a ;},
    date_change (){date_change(this);},
    downloadFile(){ //导出excel
      //填充excel数据 this.excelData
      let excelData = [];
      for(let i of this.data){
        let obj = {};
        obj.name = i.name;
        obj['报道量'] = i.articleCount;
        excelData.push(obj);
      };
        //excel格式
       let data = [{}]
        for (let k in excelData[0]) {
          data[0][k] = k
        };
        data[0].name = '';//excel 表头
        //console.log(data);
        data = data.concat(excelData);
        console.log(data);
        downloadExl(data,'企业前20微信公众号自媒体',this,'xlsx');//封装完的数据  excel名称
    },
    downloadArticleFile(flag){//导出文章列表excel
        format_time();
        let Dta = flag == '第一层' ? this.articlelist_selection : this.second_selection;
        let excelData = [{'标题':'标题','时间':'时间','媒体名称':'媒体名称','链接':'链接'}];
        for(let i of Dta){
          let obj = {};
          obj['标题'] = i.title;
          obj['时间'] = new Date(i.publishTime).Format("yyyy-MM-dd hh:mm:ss");
          obj['媒体名称'] = i.mediaName;
          obj['链接'] = i.url;
          excelData.push(obj);
        };
        console.log(excelData);
        downloadExl(excelData,'文章列表',this,'xlsx');//封装完的数据  excel名称 true 列宽格式
      }
  },
  watch:{
    select_All(){//自身組織的全选监测
      if(this.select_All){
        for(let i of this.data){
          this.$refs.Table.toggleRowSelection(i,true);
        }
      }else{
        this.$refs.Table.clearSelection();
      }
    },
    select_All_per(){//自身人物的全选监测
      if(this.select_All_per){
        for(let i of this.per_data){
          this.$refs.Table_per.toggleRowSelection(i,true);
        }
      }else{
        this.$refs.Table_per.clearSelection();
      }
    },
    select_All_key(){//自身关键词的全选监测
      if(this.select_All_key){
        for(let i of this.key_data){
          this.$refs.Table_key.toggleRowSelection(i,true);
        }
      }else{
        this.$refs.Table_key.clearSelection();
      }
    },
    select_All_article(){//自身文章的全选监测
      if(this.select_All_article){
        for(let i of this.article_data){
          this.$refs.Table_article.toggleRowSelection(i,true);
        }
      }else{
        this.$refs.Table_article.clearSelection();
      }
    }
  }
}
</script>
 
<style lang="scss" >
  .el-message-box__close{
    display: none !important;
  }
  .Media{
    button:hover{
        opacity: 0.8;
      }
  ::-webkit-input-placeholder {/*Chrome/Safari*/
    color:#ccc;
    font-size: 18px;
    }
    ::-moz-input-placeholder {/*Firefox*/
    color:#ccc;
    font-size: 18px;
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

    .el-input-group--append{
      .el-input-group__append:hover{
        opacity: 0.8;
      }
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
    #content{
      .tabActive{
        color: white;
        background-color: rgb(0, 179, 138);
        border-color: rgb(0, 179, 138);
      }
      position: relative;
      width: 1200px;
      #Table_per,#Table_key,#Table_article{
        thead .el-table-column--selection label{
          display: none;
        }
        thead tr{
          background-color: #ebebeb
        }
        thead{
          color: #333333
        }
        thead th{
          background-color: #f2f2f2;
          padding: 5px 0;
          text-align: center;
        }
        td{
            padding: 5px 0;
            text-align: center;
            .el-tooltip{
              cursor: pointer;
            }
          }
        td:hover .el-tooltip{
          color: rgb(0, 179, 138);
        }
        tr.current-row>td{
            background-color:white;
          }  
        tr:hover td{
            background-color:white;
          }
      }
      #Table{
        margin-bottom: 10px;
        table thead{
          display: none;
        }
        table tbody{
          tr.current-row>td{
            background-color: #f2f2f2;
          }
          .current-row{
            color: rgb(0, 179, 138)
          }
          td{
            padding: 5px 0;
            border-bottom: 0;
          }
        }
      }
      #Table::before{
          display: none;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: rgb(0, 179, 138);
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
        background-color: rgb(0, 179, 138);
        border-color: rgb(0, 179, 138);
      }
        .panel{
          .panel-title{
            .warning{
              color:#00a17c !important;
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
            position: relative;
            padding-bottom:20px;
            transition: 0.5s;
            .el-tree{
              border-width: 0px;
            }
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
        .page{
          position: absolute;
          display: inline-block;
          .el-pagination__total{
            color:#999;
          }
          ul>li{
            opacity: 1;
          }
          .el-pager .active {
            color:#00b38a;
          }
          .el-pagination__jump{
            display: none;
          }
      }
    }
    #dialog_list_media{
      .el-dialog__body{
        padding:10px 15px 15px 15px;
        height: 560px !important;
        .el-button--text:hover span{
          color: #f56c6c;
        }
      }
      .el-table td,.el-table th{
          padding: 0;
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
  #dialo_duibi{
    .el-dialog__body{
          padding:10px 30px 10px 30px;
          height: 700px;
       }
    
  }
  .el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__expand-icon{
    display: none;
  }
 }
 
</style>