<template>
  <div class="org container" style="background-color: #fff;padding-bottom: 50px;">
  <div style="margin: 15px 0;width: 1220px;">
  </div> 
  <div id="content" >
    <div class="panel panel-default" style="width: 1200px;margin: 15px auto 0 auto;border-color: #ebebeb;" >
        <div class="panel-heading" style="padding: 6px 15px;height: 40px;background-color: #f7f7f7;border-color: #ebebeb">
          <h3 class="panel-title" style="color: #333333;line-height: 30px;">
            <div style="display: inline-block;" class="art_type">
              <span :class="articleType==2 ? 'warning' : '' " style="cursor: pointer;" @click="articleType=2;">微信</span>
              <span :class="articleType==1 ? 'warning' : '' " style="cursor: pointer;margin-left: 20px;margin-right: 10px;"  @click="articleType=1;">新闻</span>|
            </div>
            <span :class="time[1]-time[0]==604800000 ? 'warning' : '' " style="cursor: pointer;margin-left: 10px;" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</span>
            <span :class="time[1]-time[0]==86400000 ? 'warning' : '' " style="cursor: pointer;margin-left: 20px;" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</span>
            <span :class="time[1]-time[0]==172800000 ? 'warning' : '' " style="cursor: pointer;margin:0 20px;" @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</span>
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
            <span style="padding-left: 15px;font-size: 14px;">数量：</span>
            <el-dropdown  @command="dropdown_org" style="">
                <el-button style="padding: 3px 5px;">{{current_org}}<i class="fa fa-angle-down " style="margin-left: 8px;font-size: 14px;font-weight: 700;"></i></el-button> 
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="i in dropdown_num" :command="i" >{{i}}</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>
           <span style="padding-left: 12px;font-size: 14px;">上下文句数：</span>
          <el-dropdown  @command="dropdown_jushu" style="padding-left: 5px;">
                      <el-button style="padding: 3px 5px;">{{current_jushuNum}}<i class="fa fa-angle-down " style="margin-left: 8px;font-size: 14px;font-weight: 700;"></i></el-button> 
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="i in dropdown_jushuNum" :command="i" >{{i}}</el-dropdown-item>
                      </el-dropdown-menu>
          </el-dropdown>
          <el-button  type="success"  style="padding: 1px 6px;font-size: 16px;margin-left: 10px;border-radius: 4px !important;" @click="_search" v-loading.fullscreen.lock="loading_start_media" element-loading-text="系统拼命加载中...">搜索</el-button>
          <el-button  type="success"  style="padding: 1px 6px;font-size: 16px;margin-left: 20px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="add_duibi" >添加对比</el-button>
          <el-button :disabled="this.$store.state.btn_media" type="success"  style="padding: 1px 6px;font-size: 16px;margin-left: 20px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="save">导出</el-button>
          </h3>
        </div>
        <div class="panel-body" :style="{width: tree_width_media,float: 'left',borderRight:'1px solid #ccc',borderWidth:tree_width_media=='50%'? '1px' :'0px'}" >
          <h4 v-show="this.data==null" style="text-align: center;">暂无数据</h4>
          <el-tree
          :data="data_scond"
          empty-text=""
          :props="defaultProps"
          node-key="id"
           default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          @node-click="node_click"
          :indent="30"
          >
        </el-tree>
        </div>
        <div class="panel-body" :style="{width:tree_width_media=='50%' ? '50%' : 0,float: 'left',transition: '1s',opacity: tree_width_media=='50%' ? 1 : 0}" >
          <h4 v-show="this.duibiData==null" style="text-align: center;">暂无数据</h4>
          <el-tree
          :data="duibiData"
          empty-text=""
          :props="duibiProps"
          :render-content="renderContent_duibi"
          :load="loadNode"
          :indent="30"
          @current-change="node_expand"
          lazy
          >
          </el-tree> 
          <el-button  type="success"  style="padding: 1px 6px;font-size: 16px;position: absolute;right: 35px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="see()">预览</el-button>
        </div>
      </div>
  </div> 
  
    <!-- 第一级模态框 - 列表 -->
      <el-dialog :title="dialo_title" :visible.sync="dialogCt" width="1200px" top="2%" id="dialog_ct" >
      <el-button type="info" style="padding: 6px 6px;font-size: 14px;left: 15px;">相关人物：</el-button>
        <div style="position:absolute;padding: 10px;border: 1px solid rgb(235, 235, 235);width:580px;height: 445px;left: 15px;">
             <el-table
              :data="tabledata_perlist_list"
              border
              style="width: 100%"
              @cell-click="table_click"
              @selection-change="perlist_select">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="人物"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</template>
              </el-table-column>
              <el-table-column
                label="分数"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.count}}</template>
              </el-table-column>
            </el-table>    
        <!--    分页 strart -->
        <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="del_('perlist_selection','perList','mention','tabledata_perlist','tabledata_perlist_list')">删除</el-button>
        <el-pagination
            class="page"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size"
            layout="total,  prev, pager, next, jumper"
            :total="this.tabledata_perlist.length"
            v-show="this.tabledata_perlist.length!==0">
        </el-pagination>
      <!--    分页 end -->
      </div>
      <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;left:50.5%;">相关关键词：</el-button>
      <div style="position:absolute;right: 15px;padding: 10px;border: 1px solid rgb(235, 235, 235);width:580px;height: 445px;">
         <el-table
              :data="tabledata_keywordlist_list"
              border
              style="width: 100%"
              @cell-click="table_click"
              @selection-change="keywordlist_select">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="关键词"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.mention.slice(0,scope.row.mention.indexOf('/'))}}</template>
              </el-table-column>
              <el-table-column
                label="分数"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.count}}</template>
              </el-table-column>
            </el-table> 
            <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="del_('keywordlist_selection','keywordList','mention','tabledata_keywordlist','tabledata_keywordlist_list')">删除</el-button>
            <el-pagination
                class="page"
                @current-change="handleCurrentChange_ky"
                :current-page="currentPage_ky"
                :page-sizes="[ 12, 20, 25]"
                :page-size="page_size"
                layout="total,  prev, pager, next, jumper"
                :total="this.tabledata_keywordlist.length"
                v-show="this.tabledata_keywordlist.length!==0">
            </el-pagination>
      </div>
      <el-button type="info" style="padding: 6px 6px;font-size: 14px;position:absolute;top: 530px;left: 15px;">相关文章：</el-button>
      <div style="position:absolute;left: 15px;bottom: 10px;padding: 10px;border: 1px solid rgb(235, 235, 235);width:1170px;height: 300px;">
            <el-table
              :data="tabledata_articlelist_list"
              :default-sort = "{prop:'publishTime'}"
              border
              style="width: 100%"
              @cell-click="table_click"
              @selection-change="articlelist_select">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="文章标题"
                show-overflow-tooltip>
                <template scope="scope">{{ scope.row.title}}</template>
              </el-table-column>
              <el-table-column
                label="时间"
                prop="publishTime"
                width="255"
                sortable
                show-overflow-tooltip>
              </el-table-column>
            </el-table> 
            <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="del_('articlelist_selection','eventArticleList','id','tabledata_articlelist','tabledata_articlelist_list')">删除</el-button>
            <el-pagination
                class="page"
                @current-change="handleCurrentChange_art"
                :current-page="currentPage_art"
                :page-sizes="[ 12, 20, 25]"
                :page-size="page_size_art"
                layout="total,  prev, pager, next, jumper"
                :total="this.tabledata_articlelist.length"
                v-show="this.tabledata_articlelist.length!==0">
            </el-pagination>
      </div>
     </el-dialog>

     <!-- 第二级模态框 -->
      <el-dialog title="相关新闻" :visible.sync="dialo_org" size="tiny" id="dialog_list_org">
      <el-button type="danger" style="position: absolute;left: 10px; bottom: 8px;padding: 5px 10px;" @click="del_2('second_selection','id')">删除</el-button>
                <el-table
                  :data="second_tabledata_list"
                  border
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
          <el-pagination
                class="page"
                @current-change="handleCurrentChange_org"
                :current-page="currentPage_org"
                :page-sizes="[ 12, 20, 25]"
                :page-size="page_size_org"
                layout="total,  prev, pager, next, jumper"
                :total="this.second_tabledata.length"
                v-show="this.second_tabledata.length!==0">
            </el-pagination>
        </el-dialog>
        <!--  对比图 -->
        <el-dialog title="对比图" :visible.sync="dialo_duibi" width="100%" top="0" id="dialo_duibi">
            <div :style="{width: '100%',height:duibi_height}" id="Duibi"></div>
        </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
import _echart from '../../assets/js/_echart.js'
import {format_time,_Sort,date_change,SetSessionStorage,GetSessionStorage} from '../../assets/js/map.js'
export default {
  created:function(){
    format_time();
    if(this.$store.state.media_duibiData==''){
      this.add_duibi();
      //console.log(this.$store.state.media_duibiData)
     }else{
        this.duibiData=this.$store.state.media_duibiData;
        this.load_flag=true;
      }
  },
  mounted :function () {
    let _this=this;
    this.org_loading=true;
     if(this.$store.state.media_Data==''){
        this.loading_start_media=true;
        this.search ();
     }else{
      this.data=this.$store.state.media_Data;
      for(let i=0;i<this.data.length;i++){
          let obj={};
          obj.label=this.data[i].mention;
          obj.children=[];
          if(this.data[i].domainDtoList){
            for(let j=0;j<this.data[i].domainDtoList.length;j++){
              let child_obj={};
              child_obj.label=this.data[i].domainDtoList[j].mention+"     ";
              obj.children.push(child_obj)
            }
          };
          _this.data_scond.push(obj);             
      };  
     };
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
  $('#dialo_duibi .el-dialog__headerbtn').click(function(){
    _this.dialo_duibi=false;
    })
  $('#dialog_ct .el-dialog__headerbtn').click(function(){
    _this.dialogCt=false;
    })
  $('#echart').css('opacity','0');
  },
  data () {
    return {
      input:'',
      edit:false,
      time:GetSessionStorage('media_time0')!=null ? [new Date(GetSessionStorage('media_time0')),new Date(GetSessionStorage('media_time1'))] : [new Date(new Date().getTime()-604800000), new Date()],
      sj:[1,2,3,4,5,6,7,8,9,10],
      articleType:GetSessionStorage('media_articleType')!=null ? GetSessionStorage('media_articleType') : 2,
      data:'',
      page_size_org:10,
      currentPage_org:1,
      org_List:'',
      dialo_duibi:false,
      org_article_list:'',
      dialo_org:false,
      org_loading:false,
      loading:false,
      dialogCt:false,
      dropdown_sort_num:['5','10','15','20'],
      dropdown_num:['5','10','15','20'],
      current_org:GetSessionStorage('media_current_sort')!=null ? GetSessionStorage('media_current_sort') : 10,
      perlist:[],
      perlistData:[],
      keywordlistData:[],
      ct_size:'',//二级模态
      ct_name:'',//二级模态
      ct_url:'',//二级模态
      ct_data:[],//二级模态
      ct_data_list:[],
      currentPage:1,
      currentPage_ky:1,
      currentPage_art:1,
      page_size:10 ,
      page_size_art:6 ,
      data_scond: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      table_label_second:'全选',
      tabledata_perlist:[],
      tabledata_keywordlist:[],
      tabledata_articlelist:[],
      second_tabledata:[],
      tabledata_perlist_list:[],
      tabledata_keywordlist_list:[],
      tabledata_articlelist_list:[],
      second_tabledata_list:[],
      first_table_Data:[],
      second_table_Data:[],
      perlist_selection:[],
      keywordlist_selection:[],
      articlelist_selection:[],
      second_selection:[],
      first_data_index:'',
      second_data_index:'',
      three_data_index:'',
      data_label:'',
      second_flag:'',
      search_flag:false,
      dialo_title:'',
      dropdown_jushuNum:['1','2','3','5','全部'],
      current_jushuNum:GetSessionStorage('media_current_jushuNum')!=null ? GetSessionStorage('media_current_jushuNum') : 3,
      loading_start_media:false,
      tree_width_media:GetSessionStorage('tree_width_media')!=null ? GetSessionStorage('tree_width_media') : '100%',
      duibi_height:window.document.documentElement.clientHeight-40+'px',
      duibiData:[],
      duibiProps: {
        label: 'label',
        hand: 'hand',
        iid:'iid',
        data:'data',
        children:'children'
        },
      load_flag:false,//判断有没有对比数据
      duibiTable_flag:false,
      compet_proId:'',
      compet_orgId:'',
      compet_mention:''
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
    format_table (a,b) {
      this.currentPage=1;
      this.currentPage_ky=1;
      this.currentPage_art=1;
      if(a==='tabledata_articlelist'){
        this[a].length > 6 ? this[b] = this[a].slice(0,6) : this[b] = this[a] ;
      }else{
        this[a].length > 10 ? this[b] = this[a].slice(0,10) : this[b] = this[a] ; 
      }
    },  
    _search(){
      if(this.search_flag){
      this.$confirm('当前搜索结果已修改，是否导出？', '提示', {
          confirmButtonText: '导出',
          cancelButtonText: '继续搜索(不保存)',
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
    see(){
      let idarr = [],_this = this,project_id = GetSessionStorage('project_id');
      for(let i=0;i<this.duibiData.length;i++){
          if(this.duibiData[i].hand=='取消'){
            idarr.push(this.duibiData[i].iid)
          }
      };
      this.dialo_duibi=true;
      $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/cpa",
            type:"GET",
            traditional:true,
            data:{
              "method":"GET", //http方法
              "proId":project_id, //项目id
              "cpIdArr":idarr //竞品id数组 
            },
            success:function(data){
                  let cate = data.data.cateList.slice(0,idarr.length+1),cate_ = data.data.cateList.slice(idarr.length+1,data.data.cateList.length),_categories = data.data.cateList,_data = data.data.dataList,_links =  data.data.linkList;
                  $(function(){
                    _echart.build_graph('Duibi',cate,cate_,_categories,_data,_links);
                  });               
            }
          });
    },
    search(){
      let _this = this,Aorg_str = [],project_id = GetSessionStorage('project_id'),project_name = GetSessionStorage('start');
      this.search_flag=false;
      this.org_loading=true;
      this.loading_start_media=true;
      this.$store.state.btn_media=false;
      this.data_scond=[];
      this.duibiData=[];
      this.tree_width_media='100%';
      $('#echart').css('opacity','0');
      let inparr;
      if(_this.input){
        _this.input=_this.input.replace(/，/ig,','); //转化逗号
        inparr=_this.input.split(',');
        };
      SetSessionStorage('media_time0',_this.time[0].getTime());  
      SetSessionStorage('media_time1',_this.time[1].getTime());  
      SetSessionStorage('media_articleType',_this.articleType);  
      SetSessionStorage('media_current_sort',_this.current_org);  
      SetSessionStorage('media_current_jushuNum',_this.current_jushuNum);
      $.ajax({
        url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/mediatopn",
        type:"GET",
        traditional:true,
        data:{
          "method":"GET", //http方法
          "proId":project_id, //项目id
          "articleType":_this.articleType, //文章类型
          "mediaNum":_this.current_org,
          "domainKeywordArr":inparr, //企业名称，一般只有一个
          "startTime":_this.time[0],
          "endTime":_this.time[1],
          "sentenceNum":_this.current_jushuNum=='全部' ? 0 : _this.current_jushuNum
        },
        success:function(data){
          _this.org_loading=false;
          _this.loading_start_media=false;
          $('#echart').css('opacity','1');
          _this.data=data.data; 
          if(data.data==null||data.data.length==0){
            _this.$message({
                              message: '暂无数据,请调整时间区间或增加关键词后再试',
                              type: 'warning'
                            }); 
          }else{
            data.data.sort(_Sort('count'));
             _this.$store.state.media_Data=data.data;
            for(let i=0;i<data.data.length;i++){
                let obj={};
                obj.label=data.data[i].mention;
                obj.children=[];
                if(data.data[i].domainDtoList){
                  for(let j=0;j<data.data[i].domainDtoList.length;j++){
                    let child_obj={};
                    child_obj.label=data.data[i].domainDtoList[j].mention+"     ";
                    obj.children.push(child_obj)
                  }
                }
                _this.data_scond.push(obj);             
              } 
          }                  
        }
      });
    },
    node_expand(a,b){
        this.loading = true;
        let _this5 = this;
        var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var resolve = function resolve(children) {
            _this5.loaded = true;
            _this5.loading = false;
            _this5.childNodes = [];
          };
        if(a.hand==='删除'){//点击的媒体
          console.log(this.duibiData)
          this.compet_proId=a.proId;
          this.compet_orgId=a.iid;
          this.duibiTable_flag=true;
          this.dialogCt=true;
          this.dialo_title=a.label+'媒体详情'
          this.tabledata_perlist=a.data.perList;
          this.tabledata_keywordlist=a.data.keywordList;
          this.tabledata_articlelist=a.data.eventArticleList;
          if(a.data.eventArticleList){
            for(let t=0;t<a.data.eventArticleList.length;t++){
                   a.data.eventArticleList[t].publishTime=new Date(a.data.eventArticleList[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                }
          } 
          this.format_table('tabledata_perlist','tabledata_perlist_list');
          this.format_table('tabledata_keywordlist','tabledata_keywordlist_list');
          this.format_table('tabledata_articlelist','tabledata_articlelist_list');
        }else if(a == null){
        }else{//点击的竞品
          if(a.children.length==0){
           this.load_flag=false;
           //this.loadNode(b,resolve);
          }
        } 
    },
    loadNode(node, resolve) {
        console.log('进了nodelode')
        //console.log(node)// console.log(resolve)
        let _this = this,project_id = GetSessionStorage('project_id');
         //console.log('鸡杂'+this.load_flag)
        if(this.load_flag){//有数据了
            let children1=[];
            for(let i=0;i<this.duibiData.length;i++){
              if(node.label==this.duibiData[i].label){
                for(let j=0;j<this.duibiData[i].children.length;j++){
                  children1.push(this.duibiData[i].children[j])
                }
              }
            }  
            resolve(this.duibiData);
            resolve(children1);   
          //console.log(this.duibiData)
        }else{
          //console.log('从新加载')
          _this.loading_start_media=true;
          if(node.label){
            if(node.label.indexOf('/')!=-1){//竞品
               resolve([]); 
            }else{
              $.ajax({
                url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/mediatopn",
                type:"GET",
                traditional:true,
                data:{
                  "method":"GET", //http方法
                  "proId":node.data.iid, //项目id
                  "articleType":_this.articleType, //文章类型
                  "mediaNum":_this.current_org,  
                  "startTime":_this.time[0],
                  "endTime":_this.time[1],
                  "type":2
                },
                success:function(data){
                          _this.loading_start_media=false;
                          //console.log(data)        
                          if(data.data == null || data.data.length <=0){
                            _this.$message({
                                message: '暂无数据,请调整时间区间后再试',
                                type: 'warning'
                              }); 
                            resolve(); 
                            _this.load_flag=false;
                          }else{
                            for(let i=0;i<_this.duibiData.length;i++){
                              if(node.label==_this.duibiData[i].label){
                                _this.duibiData[i].children=[];
                                for(let j=0;j<data.data.length;j++){
                                  let obj={};
                                  obj.label=data.data[j].mention;
                                  obj.hand='删除';
                                  obj.iid=data.data[j].id;
                                  obj.proId=data.data[j].proId;
                                  obj.children=[];
                                  obj.data=data.data[j].commonResult;
                                  _this.duibiData[i].children.push(obj)
                                  _this.$store.state.media_duibiData=_this.duibiData;
                                }
                              }
                            }  
                              resolve(_this.duibiData);
                              _this.load_flag=true;
                          };                       
                }
              });
            }
          }   
        }
    },
    del_org(a,b,c,d){
        //console.log(b);console.log(c);
          d.stopPropagation(); 
          let _this=this;
          $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+b.proId+"/mediarelation/mediatopn",
            type:"POST",
            traditional:true,
            data:{
              "method":"DELETE", //http方法
              "proId":b.proId, //项目id
              "mediaDtoIdArr":[b.iid] //组织id数组，一般只有一个
              },
            success:function(data){
              console.log(data)
              console.log(_this.duibiData)
              for(let i=0;i<_this.duibiData.length;i++){
                if(_this.duibiData[i].iid==b.proId){
                  _this.duibiData[i].children=_this.duibiData[i].children.filter(item => { return [b.iid].indexOf(item.iid) === -1; });//前台删除
                }
              }
              _this.search_flag=true;
            }
          });
    },
    append(a,b,c,d){
        if(b.hand=='添加'){
          b.hand='取消';
        }else if(b.hand=='取消'){
          b.hand='添加';
        }
    },
    add_duibi(){
      this.tree_width_media='50%';
      this.duibiData=[];
      let _this = this,project_id = GetSessionStorage('project_id');
      SetSessionStorage('tree_width_media','50%');
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
        data:{'projectDto1':JSON.stringify(data)},
        success: function(data){
          if(data.data!=null||data.data.length>0){
            for(let i=0;i<data.data.length;i++){
              let obj={};
              obj.label=data.data[i].project.name;
              obj.children=[];
              obj.hand='添加';
              obj.iid=data.data[i].project.id;
              _this.duibiData.push(obj); 
              _this.$store.state.media_duibiData=_this.duibiData;
              //console.log(_this.$store.state.media_duibiData)            
            }
          };
        }
      });
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.format_tabledata_('currentPage','page_size','tabledata_perlist','tabledata_perlist_list');
    },
    handleCurrentChange_ky(val){
      this.currentPage_ky = val;
      this.format_tabledata_('currentPage_ky','page_size','tabledata_keywordlist','tabledata_keywordlist_list'); 
    },
    handleCurrentChange_art(val){
      this.currentPage_art = val;
      this.format_tabledata_('currentPage_art','page_size_art','tabledata_articlelist','tabledata_articlelist_list');
    },
    handleCurrentChange_org (val) {
      this.currentPage_org = val;
      this.format_tabledata_('currentPage_org','page_size_org','second_tabledata','second_tabledata_list');
    },
    remove(a,b,c,d){
      let project_id = GetSessionStorage('project_id'),_this = this; 
      d.stopPropagation();
     // console.log(a)console.log(b)console.log(c.parent)console.log(this.data_scond);
      if(c.parent.parent==null){
        let oid;//获取组织id
        for(let i=0;i<this.data.length;i++){
          if(this.data[i].mention===b.label){
            oid=this.data[i].id;
          }
        };
        //组织id删除
        $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/mediatopn ",
            type:"POST",
            traditional:true,
            data:{
              "method":"DELETE", //http方法
              "proId":project_id, //项目id
              "mediaDtoIdArr":[oid] //媒体id数组，一般只有一个
              },
            success:function(data){
              console.log(data)
              _this.data_scond=_this.data_scond.filter(item => { return [b.label].indexOf(item.label) === -1; });
              _this.data=_this.data.filter(item => { return [oid].indexOf(item.id) === -1; });//前台删除
              _this.$store.state.media_Data=_this.data;
              _this.search_flag=true;
            }
        });
      }else{
        for(let i=0;i<this.data_scond.length;i++){
          if(c.parent.data.label===this.data_scond[i].label){
            let oid;//获取组织id
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].mention===c.parent.data.label){
                oid=this.data[i].id;
                this.data[i].domainDtoList=this.data[i].domainDtoList.filter(item => { return [b.label.slice(0,b.label.indexOf(' '))].indexOf(item.mention) === -1; });//前台删除
                this.$store.state.media_Data=this.data;
              }
            }
            //组织下的企业删除
            $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/domainkeyword",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "mediaDtoId":oid,//组织id
                    "domainKeywordArr":[b.label]
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data_scond[i].children= _this.data_scond[i].children.filter(item => { return [b.label].indexOf(item.label) === -1; });
                    _this.search_flag=true;
                  }
            });
          };
        };
      };
    },
    node_click(a,b,c){
      let _this = this,project_id=GetSessionStorage('project_id');
      _this.tabledata_perlist=[];
      _this.first_data_index=_this.second_data_index='';
      _this.dialo_title=a.label+'媒体详情'
      /*console.log(a)
      console.log(b)*/
      _this.dialogCt=true;
        if(b.data.label.slice(b.data.label.length-5,b.data.label.length)!='     '){
          _this.second_flag=true;
          for(let i=0;i<_this.data.length;i++){
            if(_this.data[i].mention===b.data.label){
              _this.first_data_index=i;
              console.log(_this.data[i].commonResult);
              _this.tabledata_perlist=_this.data[i].commonResult.perList;
              _this.tabledata_keywordlist=_this.data[i].commonResult.keywordList;
              _this.tabledata_articlelist=_this.data[i].commonResult.eventArticleList;
              if(_this.tabledata_articlelist){
                for(let t=0;t<_this.tabledata_articlelist.length;t++){
                       _this.tabledata_articlelist[t].publishTime=new Date(_this.tabledata_articlelist[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                    }
              }     
            }
          }
        }else{
          _this.second_flag=false;
          for(let i=0;i<_this.data.length;i++){
            if(b.parent.data.label===_this.data[i].mention){
               _this.first_data_index=i;
              for(let j=0;j<_this.data[i].domainDtoList.length;j++){
                if(a.label.slice(0,a.label.indexOf('     '))===_this.data[i].domainDtoList[j].mention){
                  _this.second_data_index=j;
                      _this.tabledata_perlist=_this.data[i].domainDtoList[j].commonResult.perList;
                      _this.tabledata_keywordlist=_this.data[i].domainDtoList[j].commonResult.keywordList;
                      _this.tabledata_articlelist=_this.data[i].domainDtoList[j].commonResult.eventArticleList;
                      if(_this.tabledata_articlelist){
                        for(let t=0;t<_this.tabledata_articlelist.length;t++){
                               _this.tabledata_articlelist[t].publishTime=new Date(_this.tabledata_articlelist[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                            }
                      }
                }
              }
            }
          }   
        }
        _this.format_table('tabledata_perlist','tabledata_perlist_list');
        _this.format_table('tabledata_keywordlist','tabledata_keywordlist_list');
        _this.format_table('tabledata_articlelist','tabledata_articlelist_list');
    },
    del_(a,b,c,d,e){  
     // console.log(this.perlist_selection); console.log(this.first_data_index) console.log(this.second_data_index);
      let _this = this,project_id=GetSessionStorage('project_id'),arr = [];
      for(let i=0;i<this[a].length;i++){
        arr.push(this[a][i][c]);
      };
      if(this.second_data_index===''){//点击父级即组织下的操作
        if(a==='articlelist_selection'){//判断删除组织父级下的文章
          if(this.duibiTable_flag){//竞品的
              $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/mediarelation/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":_this.compet_proId, //项目id
                    "mediaDtoId":_this.compet_orgId,//组织id
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr
                    },
                  success:function(data){
                    console.log(data.message)
                    for(let i=0;i<_this.duibiData.length;i++){
                      if(_this.duibiData[i].iid==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].iid==_this.compet_orgId){
                           _this.duibiData[i].children[j].data[b]=_this.duibiData[i].children[j].data[b].filter(item => { return arr.indexOf(item[c]) === -1; });//前台删除
                           _this[d]= _this.duibiData[i].children[j].data[b];
                           _this.format_table(d,e);
                          }
                        }
                      }
                    }
                    _this.search_flag=true;
                  }
              });
          }else{//自身
            $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data[_this.first_data_index].commonResult[b]=_this.data[_this.first_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                    _this[d]=_this.data[_this.first_data_index].commonResult[b];
                    _this.format_table(d,e);
                    _this.search_flag=true;
                  }
              });
          };
        }else{//删除组织父级下的实体
           if(this.duibiTable_flag){//竞品的
                 $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/mediarelation/entity",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":_this.compet_proId, //项目id
                    "orgId":_this.compet_orgId,//组织id
                    "entityType":a.slice(0,3),
                    "entityNameArr":arr,
                    },
                  success:function(data){
                    console.log(data.message)
                    for(let i=0;i<_this.duibiData.length;i++){
                      if(_this.duibiData[i].iid==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].iid==_this.compet_orgId){
                           _this.duibiData[i].children[j].data[b]=_this.duibiData[i].children[j].data[b].filter(item => { return arr.indexOf(item[c]) === -1; });//前台删除
                           _this[d]= _this.duibiData[i].children[j].data[b];
                           _this.format_table(d,e);
                          }
                        }
                      }
                    }
                    _this.search_flag=true;
                  }
                });                 
             }else{//自身
              $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/entity ",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                    "entityType":a.slice(0,3),
                    "entityNameArr":arr,
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data[_this.first_data_index].commonResult[b]=_this.data[_this.first_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                    _this[d]=_this.data[_this.first_data_index].commonResult[b];
                    _this.format_table(d,e);
                    _this.search_flag=true;
                  }
              });
            }  
        };
      }else{//点击企业即组织下的操作
          if(a==='articlelist_selection'){//删除企业父级下的文章
              $.ajax({
                    url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/domainkeyword/article",
                    type:"POST",
                    traditional:true,
                    data:{
                      "method":"DELETE", //http方法
                      "proId":project_id, //项目id
                      "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                      "domainKeyword":_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].mention,
                      "articleType":_this[a][0].articleType,
                      "articleIdArr":arr
                      },
                    success:function(data){
                      console.log(data.message)
                        _this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b]=_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                        _this[d]=_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b];
                        _this.format_table(d,e);
                        _this.search_flag=true;
                    }
                });
          }else{//删除企业父级下的实体
              $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/domainkeyword/entity",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                    "domainKeyword":_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].mention,
                    "entityType":a.slice(0,3),
                    "entityNameArr":arr,
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b]=_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                    _this[d]=_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[b];
                    _this.format_table(d,e);
                    _this.search_flag=true;
                  }
              });
          };
        }; 
    },
    del_2(a,b){
      //console.log(this.second_data_index); console.log(this[a]);
      let _this = this,project_id=GetSessionStorage('project_id'),arr = [];
      for(let i=0;i<this[a].length;i++){
        arr.push(this[a][i][b]);
      };
      if(this.second_data_index===''){//点击父级即组织
        if(this.duibiTable_flag){//竞品的
            $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/mediarelation/entity/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":_this.compet_proId, //项目id
                    "mediaDtoId":_this.compet_orgId,//组织id
                    "entityType":_this.data_label.slice(0,3),
                    "entityName":_this.compet_mention,
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr,
                    },
                  success:function(data){
                    console.log(data.message);
                    for(let i=0;i<_this.duibiData.length;i++){
                      if(_this.duibiData[i].iid==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].iid==_this.compet_orgId){
                            for(let t=0;t<_this.duibiData[i].children[j].data[_this.data_label].length;t++){
                              if(_this.duibiData[i].children[j].data[_this.data_label][t].mention==_this.compet_mention){
                                //console.log(_this.duibiData[i].children[j].data[_this.data_label][t].mention)
                                _this.duibiData[i].children[j].data[_this.data_label][t].eventArticleList=_this.duibiData[i].children[j].data[_this.data_label][t].eventArticleList.filter(item => { return arr.indexOf(item.id) === -1; });
                                _this.second_tabledata=_this.duibiData[i].children[j].data[_this.data_label][t].eventArticleList
                                _this.search_flag=true;
                               _this.format_table('second_tabledata','second_tabledata_list');
                              }
                            }
                          }
                        }
                      }
                    }
                  }
            });
        }else{
          $.ajax({
                    url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/entity/article",
                    type:"POST",
                    traditional:true,
                    data:{
                      "method":"DELETE", //http方法
                      "proId":project_id, //项目id
                      "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                      "entityType":_this.data_label.slice(0,3),
                      "entityName":_this.data[_this.first_data_index].commonResult[_this.data_label][_this.three_data_index].mention,
                      "articleType":_this[a][0].articleType,
                      "articleIdArr":arr,
                      },
                    success:function(data){
                      console.log(data.message)
                    _this.data[_this.first_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList=_this.data[_this.first_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList.filter(item => { return arr.indexOf(item.id) === -1; }); 
                    _this.second_tabledata=_this.data[_this.first_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList;
                    _this.search_flag=true;
                     _this.format_table('second_tabledata','second_tabledata_list');
                    }
              }); 
        };
      }else{//点击企业
          $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/domainkeyword/entity/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "mediaDtoId":_this.data[_this.first_data_index].id,//组织id
                    "domainKeyword":_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].mention,
                    "entityType":_this.data_label.slice(0,3),
                    "entityName":_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].mention,
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr,
                    },
                  success:function(data){
                    console.log(data)
                    _this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList=_this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList.filter(item => { return arr.indexOf(item.id) === -1; });
                    _this.second_tabledata= _this.data[_this.first_data_index].domainDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList;
                     _this.format_table('second_tabledata','second_tabledata_list');
                    _this.search_flag=true;
                  }
            });
      };    
    },
    table_click(a,b,c){
      /*console.log(a);
      console.log(b);
      console.log(c);*/
      console.log(a)
      if(b.type=='default'){
        if(a.url){
          window.open(a.url)
        }else{
          if(a.mention.slice(a.mention.indexOf('/'),a.mention.length)==='/PER'){
            this.data_label='perList';
          }else{
            this.data_label='keywordList';
          }
          this.currentPage_org=1;
          if(this.duibiTable_flag){
            this.dialo_org=true;
            this.compet_mention=a.mention;
            this.second_tabledata=a.eventArticleList;
            this.format_table('second_tabledata','second_tabledata_list');
            //console.log(this.duibiData)
          }else{
            this.dialo_org=true;
            this.second_tabledata=a.eventArticleList;
            this.format_table('second_tabledata','second_tabledata_list');
            if(this.second_data_index===''){
              //console.log(this.data[this.first_data_index].commonResult[this.data_label])
              for(let i=0;i<this.data[this.first_data_index].commonResult[this.data_label].length;i++){
                  if(a.mention===this.data[this.first_data_index].commonResult[this.data_label][i].mention){
                    this.three_data_index=i;
                  }
                }
            }else{
              for(let i=0;i<this.data[this.first_data_index].domainDtoList[this.second_data_index].commonResult[this.data_label].length;i++){
                  if(a.mention===this.data[this.first_data_index].domainDtoList[this.second_data_index].commonResult[this.data_label][i].mention){
                    this.three_data_index=i;
                  }
                }
            }  
        }
      }
     }
    },
    save(){
      let _this = this,project_id = GetSessionStorage('project_id'),idarr = [];
      this.loading_start_media=true;
      for(let i=0;i<this.duibiData.length;i++){
          if(this.duibiData[i].hand=='取消'){
            idarr.push(this.duibiData[i].iid)
          }
      };
      $.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/mediarelation/sysbmediarelation",
          type:"POST",
          traditional:true,
          data:{
            "method":"POST", //http方法
            "proId":project_id, //项目id
            "cpIdArr":idarr
        },
          success:function(data){
            console.log(data)
            _this.$message({
              message: data.message,
              type: 'success'
            });
            _this.loading_start_media=false;
            _this.$store.state.btn_media=true;
            _this.search_flag=false;
          }
        });
    },
    second_select(a){ this.second_selection = a; },
    dropdown_org(command){ this.current_org = command; },
    perlist_select(a){ this.perlist_selection = a; },
    keywordlist_select(a){ this.keywordlist_selection =a; },   
    articlelist_select(a){ this.articlelist_selection = a; },
    date_change (){date_change(this);},
    dropdown_jushu(command){ this.current_jushuNum = command; },
    renderContent_duibi(h, { node, data, store }) {
        if(data.hand=='删除'){
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini"  style="display:none;" on-click={ () => this.append(store,data,node) }>{data.hand}</el-button>
              <el-button size="mini" style="background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white;padding:2px 10px;" on-click={ () => this.del_org(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
        }else if(data.hand=='添加'){
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini"  style="background-color:rgba(19,206,102,.8);border-color:#13ce66;color:white;padding:2px 10px;" on-click={ () => this.append(store,data,node,event) }>{data.hand}</el-button>
              <el-button size="mini" style="display:none;background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white" on-click={ () => this.del_org(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
        }else{
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini"  style="background-color:rgba(246,166,35,.8);border-color:#f6a623;color:white;padding:2px 10px;" on-click={ () => this.append(store,data,node,event) }>{data.hand}</el-button>
              <el-button size="mini" style="display:none;background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white" on-click={ () => this.del_org(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
        }
    },
    renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini" style="display:none;" on-click={ () => this.append(store,data,node) }>详情</el-button>
              <el-button size="mini" style="background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white;padding:2px 10px;" on-click={ () => this.remove(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
    }
  }
}
</script>
 
<style lang="scss" >

  .el-message-box__close{
    display: none !important;
  }
  .org{
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
    }
    #dialog_list_org{
      .el-dialog--tiny{
        width: 600px !important;
      }
      .page{
        position: absolute;
        right: 15px; 
        bottom: 8px;
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
        .el-dialog__body{
          padding:10px 20px 45px 10px;
        }
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
  #dialog_ct,#dialo_duibi{
    .el-table td, .el-table th{
        height: 35px !important;
    }
    .el-dialog--tiny{
        width: 1200px !important;
        height: 868px !important;
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
          padding-top: 10px !important;
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
  #dialo_duibi{
   .el-dialog__body{
      padding:0px !important;
    }
    .el-dialog--tiny{
        width: 100% !important;
        //height: 868px;
        top:0px !important;
      }
  }
  .el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__expand-icon{
    display: none;
  }
 }
 
</style>