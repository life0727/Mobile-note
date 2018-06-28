<template>
  <div class="org container" style="background-color: #fff;padding-bottom: 50px;">
  <div style="margin: 15px 0;width: 1220px;">
    <!-- <div class="el-input el-input-group el-input-group--append" style="width: 720px;height: 40px;margin-left:250px;">
      <input type="text" placeholder="请输入内容(多种用逗号分隔)" autocomplete="off" class="el-input__inner" v-model="input" style="width: 570px;height: 40px;border-color: #ebebeb">
      <div class="el-input-group__append" @click="_search" style="width: 150px;text-align: center;font-size: 18px;color:white;background: #00a17c;border-color: #00a17c;cursor: pointer;" v-loading.fullscreen.lock="loading_start" element-loading-text="系统拼命加载中...">搜索</div>
    </div> -->
    
  </div> 
  <div id="content" >
    <div class="panel panel-default" style="width: 1200px;margin: 15px auto 0 auto;border-color: #ebebeb;" >
        <div class="panel-heading" style="padding: 6px 15px;height: 40px;background-color: #f7f7f7;border-color: #ebebeb">
          <h3 class="panel-title" style="color: #333333;line-height: 30px;">
            <div style="display: inline-block;" class="art_type">
              <span :class="articleType==2 ? 'warning' : '' " style="cursor: pointer;background-color: rgb(247,247,247);" @click="articleType=2;">微信</span>
              <span :class="articleType==1 ? 'warning' : '' " style="cursor: pointer;margin-left: 20px;margin-right: 10px;background-color: rgb(247,247,247);"  @click="articleType=1;">新闻</span>|
            </div>
            <span :class="time[1]-time[0]==604800000 ? 'warning' : '' " style="cursor: pointer;margin-left: 10px;background-color: rgb(247,247,247)" @click="time=[new Date(new Date().getTime()-604800000), new Date()]">一周</span>
            <span :class="time[1]-time[0]==86400000 ? 'warning' : '' " style="cursor: pointer;margin-left: 20px;background-color: rgb(247,247,247)" @click="time=[new Date(new Date().getTime()-86400000), new Date()]">今天</span>
            <span :class="time[1]-time[0]==172800000 ? 'warning' : '' " style="cursor: pointer;margin:0 20px;background-color: rgb(247,247,247)" @click="time=[new Date(new Date().getTime()-172800000), new Date()]">两天</span>
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
          <el-button  type="success"  style="padding: 1px 6px;font-size: 16px;margin-left: 10px;border-radius: 4px !important;" @click="_search" v-loading.fullscreen.lock="loading_start" element-loading-text="系统拼命加载中...">搜索</el-button>
          <el-button  type="success" :disabled="this.data_scond.length == 0" style="padding: 1px 6px;font-size: 16px;margin-left: 20px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="add_duibi_modal" >竞品对比</el-button>
          <el-button :disabled="this.$store.state.btn_org" type="success"  style="padding: 1px 6px;font-size: 16px;margin-left: 20px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="save">导出</el-button>
          </h3>
        </div>
        <div class="panel-body" :style="{width: tree_width,float: 'left',borderRight:'1px solid #ccc',borderWidth:tree_width=='50%'? '1px' :'0px'}" >
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
        <div class="panel-body" :style="{width:tree_width=='50%' ? '50%' : 0,float: 'left',transition: '1s',opacity: tree_width=='50%' ? 1 : 0}"  >
           <h4 v-show="this.duibiData==null" style="text-align: center;">暂无数据</h4>
          <el-tree
          :data="duibiData"
          empty-text=""
          node-key="id"
          :props="duibiProps"
          :render-content="renderContent_duibi"
          :load="loadNode"
          :indent="30"
          @current-change="node_expand"
          lazy
          >
           </el-tree> 
           <el-button  type="success"  style="padding: 1px 6px;font-size: 16px;position: absolute;right: 35px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;" @click="look">查看对比结果</el-button>
        </div>
      </div>
  </div> 
  
    <!-- 第一级模态框 - 列表 -->
      <el-dialog :title="dialo_title" :visible.sync="dialogCt" width="1200px" top="2%"  id="dialog_ct" >
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
      <div style="position:absolute;left: 15px;top:560px;padding: 10px;border: 1px solid rgb(235, 235, 235);width:1170px;height: 300px;" v-loading="org_articleTableLoading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)">
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
            </el-table> 
            <el-button type="danger" style="position: absolute;left: 10px; bottom: 6px;padding: 5px 10px;" @click="del_('articlelist_selection','eventArticleList','id','tabledata_articlelist','tabledata_articlelist_list')">删除</el-button>
            <el-pagination
                v-if="pageShow"
                class="page"
                @current-change="handleCurrentChange_article"
                :current-page="currentPage_art"
                :page-size="page_size_art"
                layout="total,  prev, pager, next, jumper"
                :total="this.tabledata_articlelist_total"
                v-show="this.tabledata_articlelist_total!==0">
            </el-pagination>
      </div>
     </el-dialog>

     <!-- 第二级模态框 -->
      <el-dialog title="相关新闻" :visible.sync="dialo_org"  id="dialog_list_org">
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
                v-if="pageShow"
                class="page"
                @current-change="handleCurrentChange_org"
                :current-page="currentPage_org"
                :page-size="page_size_org"
                layout="total,  prev, pager, next, jumper"
                :total="this.second_tabledata_total"
                v-show="this.second_tabledata_total!==0">
            </el-pagination>
        </el-dialog>
       <!--  对比图 -->
        <el-dialog title="对比图" :visible.sync="dialo_duibi" width="100%" top="0" id="dialo_duibi">
            <div :style="{width: '100%',height:duibi_height}" id="Duibi"></div>
        </el-dialog>
        <!-- 选择对比项目 -->
      <el-dialog title="选择对比项目" :visible.sync="dialogDuibiList" >
        <p v-show="this.duibiList.length == 0" style="margin: 10% 42%;color: #f34c81">暂无数据，请添加竞品</p>
        <el-checkbox-group v-model="checkDuibiList" :max="2">
          <el-checkbox v-for="i in duibiList" :label="i.name"></el-checkbox>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDuibiList = false">取 消</el-button>
          <el-button type="primary" @click="add_duibi">确 定</el-button>
        </span>
      </el-dialog> 
  </div>
</template>

<script>
import echarts from 'echarts'
import _echart from '../../assets/js/_echart.js'
import {format_time,_Sort,date_change,tipsMessage,GetLocalStorage,publicSearch,successBack} from '../../assets/js/map.js'
export default {
  mounted :function () {
    let _this = this;
    this.search();
  //样式
  $('.art_type span').click(function(){
    $(this).addClass('warning').siblings().removeClass('warning');
  });
  $('.panel-title>span').click(function(){
    $(this).addClass('warning').siblings().removeClass('warning')
  });
  $('#dialog_list_org .el-dialog__headerbtn').click(function(){
    _this.dialo_org=false;
  })
  $('#dialog_ct .el-dialog__headerbtn').click(function(){
    _this.dialogCt=false;
    })
  $('#dialo_duibi .el-dialog__headerbtn').click(function(){
    _this.dialo_duibi=false;
    })
  $('#echart').css('opacity','0');
  },
  data () {
    return {
        input:'',
        edit:false,
        time:[new Date(new Date().getTime()-604800000), new Date()],
        sj:[1,2,3,4,5,6,7,8,9,10],
        articleType:2,
        data:'',
        page_size_org:10,
        currentPage_org:1,
        org_List:'',
        org_article_list:'',
        dialo_org:false,
        dialo_duibi:false,
        loading:false,
        dialogCt:false,
        dropdown_num:['5','10','15','20'],
        current_org:10,
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
        tree_width:'100%',
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
        current_jushuNum:3,
        loading_start:false,
        duibiList:[],//项目下的竞品数组
        duibi_height:window.document.documentElement.clientHeight-40+'px',
        duibiData:[],
        duibiProps: {
          label: 'label',
          /*hand: 'hand',
          id:'id',
          data:'data',*/
          children:'children'
          },
        dialogDuibiList:false,//选择对比项目模态框  
        checkDuibiList:[],//选中的对比项目
        load_flag:false,//判断有没有对比数据
        duibiTable_flag:false,//false 则为点击的自身项目下的组织 true 为点击竞品项目下的组织
        compet_proId:'',
        compet_orgId:'',
        compet_mention:'',//自身或竞品的实体名称
        org_articleTableLoading:false,//模态框里的相关文章loading
        orgId:'',//组织的id 查找组织下的相关文章
        pageShow:false, //page页面异步交互
        tabledata_articlelist_total:'',//组织下的文章总数
        second_tabledata_total:''//组织下的实体的文章总数        
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
    look(){
      this.dialo_duibi = true;
      let idarr = [];
      for(let i of this.duibiData){
        if(i.hand == '取消'){
          idarr.push(i.id);
        }
      }; 
      let params = {
        "method":"GET", //http方法
        "proId":GetLocalStorage('current_projectData_A').project_id, //项目id
        "cpIdList[]":idarr //竞品id数组
      };
      this.loading_start = true;
      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/cpa',"GET",params).then((data) =>{//ajax
        this.loading_start = false;
        if(successBack(data,this)){
           let cate = data.data.cateList.slice(0,idarr.length+1),cate_ = data.data.cateList.slice(idarr.length+1,data.data.cateList.length),_categories = data.data.cateList,_data = data.data.dataList,_links =  data.data.linkList;
            $(function(){
                _echart.build_graph('Duibi',cate,cate_,_categories,_data,_links);
            });
        };
       }) 
      /*
      let idarr = [];
      for(let i=0;i<this.duibiData.length;i++){
          if(this.duibiData[i].hand=='取消'){
            idarr.push(this.duibiData[i].id)
          }
      };
      this.dialo_duibi = true;
      let params = {
        "method":"GET", //http方法
        "proId":GetLocalStorage('current_projectData_A').project_id, //项目id
        "cpIdArr":idarr //竞品id数组 
      };
      publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/cpa',"GET",params).then((data) =>{//ajax
        console.log(data)
      }) */   
     /* $.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/cpa",
            type:"GET",
            traditional:true,
            data:{
              "method":"GET", //http方法
              "proId":project_id, //项目id
              "cpIdArr":idarr //竞品id数组 
            },
            success:function(data){
              
            }
          }); */  
    },
    node_expand(a,b){
      console.log('node_expand')
      console.log(a)
      console.log(b)
      if(a.label.indexOf('(') != -1){//点击的组织
        console.log('点击的组织')
        this.compet_proId = a.proId;
        this.compet_orgId = a.id;
        this.duibiTable_flag = true;
        this.dialogCt = true;
        this.dialo_title = a.label.slice(0,a.label.indexOf('('))+'组织详情'
        this.tabledata_perlist = a.data.perList;
        this.tabledata_keywordlist = a.data.keywordList;
        this.format_table('tabledata_perlist','tabledata_perlist_list');
        this.format_table('tabledata_keywordlist','tabledata_keywordlist_list');
        this.pageShow = false;
        this.tabledata_articlelist_total = a.data.articleCount;
        this.currentPage_art = 1;
        this.handleCurrentChange_article(this.currentPage_art);
      }else{//点击的竞品
        console.log('点击的竞品')
      };
    },
    loadNode(node, resolve) {
      console.log('进了nodelode')
      console.log(node)
        if(node.label){
          if(node.label.indexOf('(') != -1){//竞品下的组织
             resolve([]); 
          }else{
            this.loading_start = true;
            let Dta = {
              "proId": node.data.id, //项目id
              "articleType": this.articleType, //文章类型
              "startTime": this.time[0].getTime(),
              "endTime": this.time[1].getTime(),
              "orgTopN":this.current_org,//生成的组织数量
              "perNum": "10", //组织下人物数量
              "locNum": "10",//地点数量
              "orgNum": "10",//组织数量
              "keywordNum": "10"//关键词数量
            };
            let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
            publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org',"GET",params).then((data) =>{//ajax
              this.loading_start = false;
              if(successBack(data,this)){
                console.log(data)
                for(let i = 0;i < this.duibiData.length;i++){
                  if(node.label == this.duibiData[i].label){
                    this.duibiData[i].children = [];
                    for(let j = 0;j < data.data.orgList.length;j++){
                      let obj = {};
                      obj.label = data.data.orgList[j].name.slice(0,data.data.orgList[j].name.indexOf('/')) + '('+data.data.orgList[j].count+')';
                      obj.hand = '删除';
                      obj.id = data.data.orgList[j].id;
                      obj.proId = data.data.orgList[j].proId;
                      obj.children = [];
                      obj.data = {};
                      obj.data.keywordList = data.data.orgList[j].keywordList;
                      obj.data.perList = data.data.orgList[j].perList;
                      obj.data.articleCount = data.data.orgList[j].articleCount;
                      this.duibiData[i].children.push(obj)
                      this.$store.state.org_duibiData = this.duibiData;
                    }
                  };
                };  
                resolve(this.duibiData);
              }else{
                for(let i = 0;i < this.duibiData.length;i++){
                  if(node.label == this.duibiData[i].label){
                    this.duibiData[i].hand = '暂无数据'
                  }
                }
                resolve([]);
              }
            });  
          }
        }   
    },
    add_duibi_modal(){
      this.dialogDuibiList = true;
      let data = {
          "method": 'get',
          "project" : {
            'parentId':GetLocalStorage('current_projectData_A').project_id//当前项目id,
          }
        };
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/competitor',"GET",{'projectDto':JSON.stringify(data)}).then((data) =>{//ajax
          if(successBack(data,this)){
            this.duibiList = data.data;
            console.log(this.duibiList)
          }
        });
    },
    add_duibi(){
      this.dialogDuibiList = false;
      this.duibiData=[];
      if(this.checkDuibiList.length == 0){
        this.tree_width='100%';
        return;
      };
      this.tree_width='50%';
      for(let i of this.duibiList){
        for(let j of this.checkDuibiList){
          if(j == i.name){
            let obj = {};
                obj.label = i.name;
                obj.children = [];
                obj.hand = '加入对比';
                obj.id = i.id;
                this.duibiData.push(obj); 
                this.$store.state.org_duibiData = this.duibiData;
          }
        }
      };
      console.log(this.checkDuibiList)
      console.log(this.$store.state.org_duibiData)
    },  
    _search(){
      if(this.search_flag){
      this.$confirm('当前搜索结果已修改，是否导出？', '提示', {
          confirmButtonText: '导出',
          cancelButtonText: '继续搜索(不保存)',
          closeOnClickModal:false,
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
    search(){
        this.search_flag = false;
        this.loading_start=true;
        this.$store.state.btn_org = false;
        this.data_scond = [];
        this.duibiData = [];
        this.tree_width = '100%';
        let Dta = {
          "proId":GetLocalStorage('current_projectData_A').project_id,// GetLocalStorage('current_projectData_A').project_id, //项目id
          "articleType": this.articleType, //文章类型
          "startTime": this.time[0].getTime(),
          "endTime": this.time[1].getTime(),
          "orgTopN":this.current_org,//生成的组织数量
          "perNum": "10", //组织下人物数量
          "locNum": "10",//地点数量
          "orgNum": "10",//组织数量
          "keywordNum": "10"//关键词数量
        };
        let params = {"method": 'get',"criteriaStr":JSON.stringify(Dta)};
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org',"GET",params).then((data) =>{//ajax
          this.loading_start=false;
          if(successBack(data,this)){
            if(data.data.orgList == null || data.data.orgList.length == 0){
              tipsMessage('暂无数据,请调整时间区间或增加关键词后再试','warning',this);
              return;
            };
            data.data.orgList.sort(_Sort('count'));
            this.$store.state.org_Data = this.data = data.data.orgList; 
            for(let i = 0;i < data.data.orgList.length;i++){
                let obj = {};
                obj.label = data.data.orgList[i].name.slice(0,data.data.orgList[i].name.indexOf('/')) + '('+data.data.orgList[i].count+')';
                obj.data = {};
                obj.data.keywordList = data.data.orgList[i].keywordList;//组织下的关键词list
                obj.data.perList = data.data.orgList[i].perList;//组织下的人物list
                obj.data.articleCount = data.data.orgList[i].articleCount;//组织下的文章总数
                obj.data.orgId = data.data.orgList[i].id;//组织id
                obj.children=[];
                this.data_scond.push(obj);             
            }; 
          };
        });  
    },
    del_org(a,b,c,d){
      //console.log(b);console.log(c);
      /*console.log(a)
      console.log(b)
      console.log(c)
      console.log(d)*/
      d = d || window.event;
      if(d&&d.stopPropagation){
        d.stopPropagation();
      }else{
        window.event.cancelBubble=true;
      };
        console.log('对比组织')
        let params = {
          "method": 'POST',
          "orgIdList[]":[b.id]
        };
        console.log(this.duibiData)
        this.loading_start = true;
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org',"POST",params).then((data) =>{//ajax
          this.loading_start = false;
          if(successBack(data,this)){
            for(let i of this.duibiData){
              if(i.id == b.proId){
                i.children = i.children.filter(item => { return [b.id].indexOf(item.id) === -1; });//前台删除
                console.log(this.duibiData)
              };
            };
            this.search_flag = true;
          };
        });  
        /*$.ajax({
          url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+b.proId+"/org ",
          type:"POST",
          traditional:true,
          data:{
            "method":"DELETE", //http方法
            "proId":b.proId, //项目id
            "orgIdArr":[b.id] //组织id数组，一般只有一个
            },
          success:function(data){
            //console.log(data.message) console.log(_this.duibiData)
            for(let i=0;i<_this.duibiData.length;i++){
              if(_this.duibiData[i].id==b.proId){
                _this.duibiData[i].children=_this.duibiData[i].children.filter(item => { return [b.id].indexOf(item.id) === -1; });//前台删除
              }
            }
            _this.search_flag=true;
          }
        });*/
    },
    append(a,b,c,d){
        if(b.hand=='加入对比'){
          b.hand='取消';
        }else if(b.hand=='取消'){
          b.hand='加入对比';
        };
    },
    remove(a,b,c,d){
      let oid; 
      d.stopPropagation();
      if(c.parent.parent==null){
        //获取组织id
        /*console.log(this.data)
        console.log(b.label)*/
        for(let i of this.data){
          if(i.name.slice(0,i.name.indexOf('/')) == b.label.slice(0,b.label.indexOf('('))){
            oid = i.id;
          };
        };
        //组织id删除
        console.log('组织id删除');
        let params = {
          "method": 'POST',
          "orgIdList[]":[oid]
        };
        this.loading_start = true;
        publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org',"POST",params).then((data) =>{//ajax
          this.loading_start = false;
          if(successBack(data,this)){
            this.data_scond = this.data_scond.filter(item => { return [b.label].indexOf(item.label) === -1; });
            this.data = this.data.filter(item => { return [oid].indexOf(item.id) === -1; });//前台删除
            this.$store.state.org_Data = this.data;
            this.search_flag = true;
          };
        });  
        /*$.ajax({
            url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org ",
            type:"POST",
            traditional:true,
            data:{
              "method":"DELETE", //http方法
              "proId":project_id, //项目id
              "orgIdArr":[oid] //组织id数组，一般只有一个
              },
            success:function(data){
              _this.data_scond=_this.data_scond.filter(item => { return [b.label].indexOf(item.label) === -1; });
              _this.data=_this.data.filter(item => { return [oid].indexOf(item.id) === -1; });//前台删除
              _this.$store.state.org_Data=_this.data;
              _this.search_flag=true;
            }
          });*/
      };
        /*for(let i=0;i<this.data_scond.length;i++){
          if(c.parent.data.label===this.data_scond[i].label){
            let oid;//获取组织id
            for(let i=0;i<this.data.length;i++){
              if(this.data[i].mention===c.parent.data.label){
                oid=this.data[i].id;
                this.data[i].enterpriseDtoList=this.data[i].enterpriseDtoList.filter(item => { return [b.label.slice(0,b.label.indexOf(' '))].indexOf(item.mention) === -1; });//前台删除
                this.$store.state.org_Data=this.data;
              }
            }
            //组织下的企业删除
            console.log('组织下的企业删除')
            $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/enterprise ",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":oid,//组织id
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data_scond[i].children= _this.data_scond[i].children.filter(item => { return [b.label].indexOf(item.label) === -1; });
                    _this.search_flag=true;
                  }
              });
            }
          }*/
       
    },
    node_click(a,b,c){
      console.log('node-click')
      console.log(a)
      console.log(b)
      console.log(this.data)
      console.log(this.data_scond)
      this.second_data_index = '';
      this.first_data_index = this.data.findIndex(d => d.name.slice(0,d.name.indexOf('/')) === b.data.label.slice(0,b.data.label.indexOf('(')));//第一层下标
      this.dialo_title = a.label.slice(0,a.label.indexOf('('))+'组织详情';
      this.duibiTable_flag = false;
      this.dialogCt = true;
      this.tabledata_perlist = a.data.perList;
      this.tabledata_keywordlist = a.data.keywordList;
      this.format_table('tabledata_perlist','tabledata_perlist_list');
      this.format_table('tabledata_keywordlist','tabledata_keywordlist_list');
      this.pageShow = false;
      this.orgId = a.data.orgId;
      this.tabledata_articlelist_total = a.data.articleCount;
      this.currentPage_art = 1;
      this.handleCurrentChange_article(this.currentPage_art);
    },
    del_(a,b,c,d,e){  //('perlist_selection','perList','mention','tabledata_perlist','tabledata_perlist_list')
      //console.log(this.perlist_selection); console.log(this.first_data_index) console.log(this.second_data_index);
      let _this = this,project_id=GetLocalStorage('current_projectData_A').project_id,arr = [];
      for(let i=0;i<this[a].length;i++){
        arr.push(this[a][i][c]);
      };
      if(this.second_data_index===''){//点击父级即组织下的操作
        if(a==='articlelist_selection'){//判断删除组织父级下的文章
          if(this.duibiTable_flag){//竞品的
            let params = {
                "method": 'POST',
                "orgId":this.compet_orgId,//组织id
                "entityType":"art",
                "entityNameList[]":arr
            };
            this.loading_start = true;
            publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/article',"POST",params).then((data) =>{//ajax
              this.loading_start = false;
              if(successBack(data,this)){
                for(let i of this.duibiData){
                  if(i.id == this.compet_proId){
                    for(let j of i.children){
                      if(j.id == this.compet_orgId){
                        this[e] = this[e].filter(item => { return arr.indexOf(item[c]) === -1; });
                        this.tabledata_articlelist_total = j.data.articleCount = j.data.articleCount - arr.length;
                        //初始
                        if(this.tabledata_articlelist_total > 0){
                          this.currentPage_art * this.page_size_art > this.tabledata_articlelist_total ? this.currentPage_art = this.currentPage_art - 1 : '';
                          this.pageShow = false;    
                          this.handleCurrentChange_article(this.currentPage_art);
                        };
                      };
                    };
                  };
                };
              };  
            });    
              /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/org/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":_this.compet_proId, //项目id
                    "orgId":_this.compet_orgId,//组织id
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr
                    },
                  success:function(data){
                    console.log(data.message)
                    for(let i=0;i<_this.duibiData.length;i++){
                      if(_this.duibiData[i].id==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].id==_this.compet_orgId){
                           _this.duibiData[i].children[j].data[b]=_this.duibiData[i].children[j].data[b].filter(item => { return arr.indexOf(item[c]) === -1; });//前台删除
                           _this[d]= _this.duibiData[i].children[j].data[b];
                           _this.format_table(d,e);
                          }
                        }
                      }
                    }
                    _this.search_flag=true;
                  }
              });*/
          }else{//自身
            console.log('自身文章')
            let params = {
                "method": 'POST',
                "orgId":this.data[this.first_data_index].id,//组织id
                "entityType":"art",
                "entityNameList[]":arr
            };
            this.loading_start = true;
            publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/article',"POST",params).then((data) =>{//ajax
              this.loading_start = false;
              if(successBack(data,this)){
                this.tabledata_articlelist_total = this.data[this.first_data_index].articleCount = this.data_scond[this.first_data_index].data.articleCount = this.data[this.first_data_index].articleCount - arr.length;
                this[e] = this[e].filter(item => { return arr.indexOf(item[c]) === -1; });
                //初始
                if(this.tabledata_articlelist_total > 0){
                  this.currentPage_art * this.page_size_art > this.tabledata_articlelist_total ? this.currentPage_art = this.currentPage_art - 1 : '';
                  this.pageShow = false;    
                  this.handleCurrentChange_article(this.currentPage_art);
                };
              };
            });  
             /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":_this.data[_this.first_data_index].id,//组织id
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
              });*/
          }
        }else{//删除组织父级下的实体
             if(this.duibiTable_flag){//竞品的
              console.log('竞品实体');
              let params = {
                "method": 'POST',
                "orgId":this.compet_orgId,//组织id
                "entityType":a.slice(0,3),
                "entityNameList[]":arr
              };
              this.loading_start = true;
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity',"POST",params).then((data) =>{//ajax
                this.loading_start = false;
                if(successBack(data,this)){
                  for(let i of this.duibiData){
                    if(i.id == this.compet_proId){
                      for(let j of i.children){
                        if(j.id == this.compet_orgId){
                          j.data[b] = j.data[b].filter(item => { return arr.indexOf(item[c]) === -1; });//前台删除
                          this[d] = j.data[b];
                          this.format_table(d,e);
                          this.search_flag=true;
                        };
                      };
                    };
                  };
                };
              });  
                 /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/org/entity ",
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
                      if(_this.duibiData[i].id==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].id==_this.compet_orgId){
                           _this.duibiData[i].children[j].data[b]=_this.duibiData[i].children[j].data[b].filter(item => { return arr.indexOf(item[c]) === -1; });//前台删除
                           _this[d]= _this.duibiData[i].children[j].data[b];
                           _this.format_table(d,e);
                          }
                        }
                      }
                    }
                    _this.search_flag=true;
                  }
                });*/                 
             }else{//自身
               console.log('自身实体')
               console.log(this.data)
               console.log(this.first_data_index)
               let params = {
                "method": 'POST',
                "orgId":this.data[this.first_data_index].id,//组织id
                "entityType":a.slice(0,3),
                "entityNameList[]":arr
              };
              this.loading_start = true;
              publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity',"POST",params).then((data) =>{//ajax
                this.loading_start = false;
                if(successBack(data,this)){
                  this.data[this.first_data_index][b] = this.data[this.first_data_index][b].filter(item => { return arr.indexOf(item[c]) === -1; });
                  this.data_scond[this.first_data_index].data[b] = this.data_scond[this.first_data_index].data[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                  this[d] = this.data[this.first_data_index][b];
                  this.format_table(d,e);
                  this.search_flag = true;
                };
              });  
                /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/entity ",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":_this.data[_this.first_data_index].id,//组织id
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
                });*/
             }    
        }
      }else{//点击企业即组织下的操作
          if(a==='articlelist_selection'){//删除企业父级下的文章
              $.ajax({
                    url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/enterprise/article",
                    type:"POST",
                    traditional:true,
                    data:{
                      "method":"DELETE", //http方法
                      "proId":project_id, //项目id
                      "orgId":_this.data[_this.first_data_index].id,//组织id
                      "enterpriseName":_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].mention,
                      "articleType":_this[a][0].articleType,
                      "articleIdArr":arr
                      },
                    success:function(data){
                      console.log(data.message)
                        _this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b]=_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                        _this[d]=_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b];
                        _this.format_table(d,e);
                        _this.search_flag=true;
                    }
                });
          }else{//删除企业父级下的实体
              $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/enterprise/entity ",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":_this.data[_this.first_data_index].id,//组织id
                    "enterpriseName":_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].mention,
                    "entityType":a.slice(0,3),
                    "entityNameArr":arr,
                    },
                  success:function(data){
                    console.log(data.message)
                    _this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b]=_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b].filter(item => { return arr.indexOf(item[c]) === -1; });
                    _this[d]=_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[b];
                    _this.format_table(d,e);
                    _this.search_flag=true;
                  }
              });
          }
        } 
    },
    del_2(a,b){
      //console.log(this.second_data_index);
      //console.log(this[a]);
      let _this = this,project_id=GetLocalStorage('current_projectData_A').project_id,arr = [];
      for(let i=0;i<this[a].length;i++){
        arr.push(this[a][i][b]);
      }
      if(this.second_data_index===''){//点击父级即组织
        if(this.duibiTable_flag){//竞品的
          let params = {
              "method": 'POST',
              "orgId":this.compet_orgId,//组织id
              "entityType":this.data_label.slice(0,3),
              "mention":this.compet_mention,
              "entityNameList[]":arr
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity/article',"POST",params).then((data) =>{//ajax
            this.loading_start = false;
            if(successBack(data,this)){
              for(let i of this.duibiData){
                if(i.id == this.compet_proId){
                  for(let j of i.children){
                    if(j.id == this.compet_orgId){
                      for(let k of j.data[this.data_label]){
                        if(k.mention == this.compet_mention){
                          console.log(k)
                          this.second_tabledata_list = this.second_tabledata_list.filter(item => { return arr.indexOf(item.id) === -1; });
                          this.second_tabledata_total = k.articleCount = k.articleCount - arr.length;
                          //初始
                          if(this.second_tabledata_total > 0){
                            this.currentPage_org*this.page_size_org > this.second_tabledata_total ? this.currentPage_org = Math.ceil(this.second_tabledata_total/this.page_size_org) : '';
                            this.pageShow = false;    
                            this.handleCurrentChange_org(this.currentPage_org);
                          }else{//全选 删除实体
                            let params = {
                              "method": 'POST',
                              "orgId":this.compet_orgId,//组织id
                              "entityType":this.data_label.slice(0,3),
                              "entityNameList[]":[this.compet_mention]
                            };
                            this.loading_start = true;
                            publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity',"POST",params).then((data) =>{//ajax
                              this.loading_start = false;
                              if(successBack(data,this)){
                                let d = 'tabledata_'+this.data_label.toLowerCase();
                                let e =  'tabledata_'+this.data_label.toLowerCase()+'_list';
                                let c = 'mention';
                                j.data[this.data_label] = j.data[this.data_label].filter(item => { return [this.compet_mention].indexOf(item[c]) === -1; });//前台删除
                                this[d] = j.data[this.data_label];
                                this.format_table(d,e);
                                this.dialo_org = false;
                                this.search_flag = true;
                                /*for(let i of this.duibiData){
                                  if(i.id == this.compet_proId){
                                    for(let j of i.children){
                                      if(j.id == this.compet_orgId){
                                        
                                      };
                                    };
                                  };
                                };*/
                              };
                            });
                            //
                          }
                        };
                      };
                    };
                  };
                };
              };
            };
          });  
            /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+_this.compet_proId+"/org/entity/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":_this.compet_proId, //项目id
                    "orgId":_this.compet_orgId,//组织id
                    "entityType":_this.data_label.slice(0,3),
                    "entityName":_this.compet_mention,
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr,
                    },
                  success:function(data){
                    console.log(data.message);
                    for(let i=0;i<_this.duibiData.length;i++){
                      if(_this.duibiData[i].id==_this.compet_proId){
                        for(let j=0;j<_this.duibiData[i].children.length;j++){
                          if(_this.duibiData[i].children[j].id==_this.compet_orgId){

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
            });*/
        }else{
            let params = {
                "method": 'POST',
                "orgId":this.data[this.first_data_index].id,//组织id
                "entityType":this.data_label.slice(0,3),
                "mention":this.compet_mention,
                "entityNameList[]":arr
            };
            this.loading_start = true;
            publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity/article',"POST",params).then((data) =>{//ajax
              this.loading_start = false;
              if(successBack(data,this)){

                this.second_tabledata_total = this.data[this.first_data_index][this.data_label][this.three_data_index].articleCount =this.data[this.first_data_index][this.data_label][this.three_data_index].articleCount - arr.length;
                console.log(this.second_tabledata_total)
                this.second_tabledata_list = this.second_tabledata_list.filter(item => { return arr.indexOf(item.id) === -1; }); 
                //初始
                if(this.second_tabledata_total > 0){
                  this.currentPage_org*this.page_size_org > this.second_tabledata_total ? this.currentPage_org = Math.ceil(this.second_tabledata_total/this.page_size_org) : '';
                  this.pageShow = false;    
                  this.handleCurrentChange_org(this.currentPage_org);
                }else{//全选 就要删除实体 d e  'tabledata_perlist','tabledata_perlist_list'
                  let params = {
                    "method": 'POST',
                    "orgId":this.data[this.first_data_index].id,//组织id
                    "entityType":this.data_label.slice(0,3),
                    "entityNameList[]":[this.compet_mention]
                  };
                  let d = 'tabledata_'+this.data_label.toLowerCase();
                  let e =  'tabledata_'+this.data_label.toLowerCase()+'_list';
                  let c = 'mention';
                  this.loading_start = true;
                  publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/entity',"POST",params).then((data) =>{//ajax
                    this.loading_start = false;
                    if(successBack(data,this)){
                      this.data[this.first_data_index][this.data_label] = this.data[this.first_data_index][this.data_label].filter(item => { return [this.compet_mention].indexOf(item[c]) === -1; });
                      this.data_scond[this.first_data_index].data[this.data_label] = this.data_scond[this.first_data_index].data[this.data_label].filter(item => { return [this.compet_mention].indexOf(item[c]) === -1; });
                      this[d] = this.data[this.first_data_index][this.data_label] ;
                      this.format_table(d,e);
                      this.dialo_org = false;
                      this.search_flag = true;
                    };
                  });  
                };
              };
            });  
          /*$.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/entity/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":_this.data[_this.first_data_index].id,//组织id
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
            });*/
        }  
      }/*else{//点击企业
          $.ajax({
                  url:"http://192.168.0.3:8080/rs/api/v1.1/project/"+project_id+"/org/enterprise/entity/article",
                  type:"POST",
                  traditional:true,
                  data:{
                    "method":"DELETE", //http方法
                    "proId":project_id, //项目id
                    "orgId":_this.data[_this.first_data_index].id,//组织id
                    "enterpriseName":_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].mention,
                    "entityType":_this.data_label.slice(0,3),
                    "entityName":_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].mention,
                    "articleType":_this[a][0].articleType,
                    "articleIdArr":arr,
                    },
                  success:function(data){
                    console.log(data)
                    _this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList=_this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList.filter(item => { return arr.indexOf(item.id) === -1; });
                    _this.second_tabledata= _this.data[_this.first_data_index].enterpriseDtoList[_this.second_data_index].commonResult[_this.data_label][_this.three_data_index].eventArticleList;
                     _this.format_table('second_tabledata','second_tabledata_list');
                    _this.search_flag=true;
                  }
            });
      };*/ 
    },
    table_click(a,b,c){
      console.log(a);
      if(b.type=='default'){
        if(a.url){
          window.open(a.url);
          return;
        };
        a.mention.slice(a.mention.indexOf('/'),a.mention.length) === '/PER' ? this.data_label = 'perList' : this.data_label = 'keywordList';
        if(!this.duibiTable_flag){
          this.three_data_index = this.data[this.first_data_index][this.data_label].findIndex(d => d.mention === a.mention);//第三层下标 自身
        };
        console.log(this.three_data_index)
        this.pageShow = false;
        this.second_tabledata_total = a.articleCount;
        this.currentPage_org = 1;
        this.compet_mention = a.mention;
        this.handleCurrentChange_org(this.currentPage_org);
         /*
          this.currentPage_org=1;
          if(this.duibiTable_flag){
            this.dialo_org=true;
            this.compet_mention=a.mention;
            this.second_tabledata=a.eventArticleList;
            this.format_table('second_tabledata','second_tabledata_list');
            //console.log(this.duibiData)
          }else{
            //console.log('zishen')
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
              for(let i=0;i<this.data[this.first_data_index].enterpriseDtoList[this.second_data_index].commonResult[this.data_label].length;i++){
                  if(a.mention===this.data[this.first_data_index].enterpriseDtoList[this.second_data_index].commonResult[this.data_label][i].mention){
                    this.three_data_index=i;
                  }
                }
            }
          } */  
      }
    },
    save(){
      console.log(this.data_scond)
      console.log(this.duibiData)
      if(this.data_scond.length == 0 && this.duibiData.length == 0){
        tipsMessage('没有可导出的结果','warning',this);
        return;
      };
      let proAnaDto = {},proIdArr = [],cpAnaDtoList = [];//cpAnaDtoList竞品，proAnaDto自身
      for(let i of this.data_scond){
        proIdArr.push(i.data.orgId);//proIdArr z自身组织id数组
      };
      proAnaDto.proId = GetLocalStorage('current_projectData_A').project_id;
      proAnaDto.anaIdList = proIdArr;
      if(this.duibiData.length != 0){//有竞品
        for(let i = 0;i < this.duibiData.length;i++){
            if(this.duibiData[i].hand == '取消'){
               let obj = {},cpaIdArr = [];
               obj.proId = this.duibiData[i].id;
               for(let j of this.duibiData[i].children){
                  cpaIdArr.push(j.id);
               };
               obj.anaIdList = cpaIdArr;
               cpAnaDtoList.push(obj);
            }
         };
      };
      console.log(proAnaDto)
      console.log(cpAnaDtoList)
      this.$prompt('请输入导出组织名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
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
            'orgExptDtoStr' : JSON.stringify(data)
          };
          this.loading_start = true;
          publicSearch('rsa/project/'+GetLocalStorage('current_projectData_A').project_id+'/org/expt',"POST",params).then((data) =>{//ajax
            this.loading_start = false;
            if(successBack(data,this)){
              //清空所有数据
              this.$store.state.btn_org = true;
              this.data_scond = [];
              this.duibiData = [];
              this.tree_width = '100%';
              tipsMessage(data.message,'success',this);
            };
          });
        }).catch(() => {})   
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.format_tabledata_('currentPage','page_size','tabledata_perlist','tabledata_perlist_list');
    },
    handleCurrentChange_ky(val){
      this.currentPage_ky = val;
      this.format_tabledata_('currentPage_ky','page_size','tabledata_keywordlist','tabledata_keywordlist_list');
    },
    handleCurrentChange_article(val){//ajax 获取文章列表
      this.currentPage_art = val;
      this.org_articleTableLoading = true;
      let proId = this.duibiTable_flag ? this.compet_proId : GetLocalStorage('current_projectData_A').project_id;//项目id
      let orgId = this.duibiTable_flag ? this.compet_orgId : this.orgId;//组织id
      let params = {
            "method": 'GET',
             orgId, //组织id
            "articleType": this.articleType, //文章类型
            "pageSize": this.page_size_art,//每页数量
            "pageNum": val //页码
          };
      publicSearch('rsa/project/'+proId+'/org/'+orgId+'/article',"GET",params).then((data) =>{
        this.org_articleTableLoading = false;
        if(successBack(data,this)){
          this.tabledata_articlelist_list = data.data == null ? [] : data.data.articleList;
          this.$nextTick(function () {
            this.pageShow = true
          });
        }
      })    
    },
    handleCurrentChange_org (val) {
      this.currentPage_org = val;
      this.loading_start = true;
      this.dialo_org = true;
      let proId = this.duibiTable_flag ? this.compet_proId : GetLocalStorage('current_projectData_A').project_id;//项目id
      let orgId = this.duibiTable_flag ? this.compet_orgId : this.orgId;//组织id
      let params = {
            "method": 'GET',
             orgId, //组织id
            "articleType": this.articleType, //文章类型
            "entityType": this.compet_mention.slice(this.compet_mention.indexOf('/')+1,this.compet_mention.length) == 'PER' ? 'PER' : 'KEY', //实体类型
            "entityName": this.compet_mention, //实体名称
            "pageSize": this.page_size_org,//每页数量
            "pageNum": val //页码
          };
      publicSearch('rsa/project/'+proId+'/org/'+orgId+'/entity/article',"GET",params).then((data) =>{
        this.loading_start = false;
        if(successBack(data,this)){
          this.second_tabledata_list = data.data == null ? [] : data.data.articleList;
          this.$nextTick(function () {
            this.pageShow = true
          });
        }
      });     
    },
    dropdown_org(command){ this.current_org = command ;},
    dropdown_jushu(command){ this.current_jushuNum = command ;},
    perlist_select(a){ this.perlist_selection = a ;},
    keywordlist_select(a){ this.keywordlist_selection = a ;},
    articlelist_select(a){ this.articlelist_selection = a ;},
    second_select(a){ this.second_selection = a ;},
    date_change (){date_change(this);},
    renderContent(h, { node, data, store ,event}) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini" style="display:none;" on-click={ () => this.append(store,data,node) }>详情</el-button>
              <el-button size="mini" style="background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white;padding:2px 10px;" on-click={ (event) => this.remove(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
    },
    renderContent_duibi(h, { node, data, store}) {
        if(data.hand=='删除'){
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini"  style="display:none;" on-click={ () => this.append(store,data,node) }>{data.hand}</el-button>
              <el-button size="mini" style="background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white;padding:2px 10px;padding:2px 10px;" on-click={ (event) => this.del_org(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
        }else if(data.hand=='加入对比'){
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini"  style="background-color:rgba(19,206,102,.8);border-color:#13ce66;color:white;padding:2px 10px;" on-click={ () => this.append(store,data,node) }>{data.hand}</el-button>
              <el-button size="mini" style="display:none;background-color:rgba(255,73,73,.8);border-color:#ff4949;color:white" on-click={ () => this.del_org(store,data,node,event) }>删除</el-button>
            </span>
          </span>);
        }else if(data.hand=='暂无数据'){
          return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="position:absolute;right:20px">
              <el-button size="mini" disabled style="background-color:#ccc;border-color:#ccc;color:white;padding:2px 10px;" on-click={ () => this.append(store,data,node,event) }>{data.hand}</el-button>
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
    .el-date-editor--datetime{
        input{
          height: 23px !important;
          padding-right: 0 ;
        }
        .el-input__icon{
          line-height: 22px;
        }
       }
    #content{
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
        .el-pagination__jump{
          display: none;
        }
        .el-pager .active {
          color:#00b38a;
        }
       }
      .el-dialog{
        .el-dialog__body{
          padding:10px 20px 45px 10px;
          .el-table{
            td{
              padding: 5px 0;
            }
          }
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
      .list-group{
        a:nth-child(2n){
          background: #f2fcff;
        }
      }  
    }
  #dialog_ct,#dialo_duibi{
    .el-table td, .el-table th{
        height: 35px !important;
        padding: 0px;
    }
    .el-dialog--tiny{
        width: 1200px !important;
        height: 868px;
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
          color:#00b38a;
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
    .el-dialog__body{
          padding:10px 15px 45px 15px;
        }
    
  }
  #dialog_ct{
    .el-dialog__body{
        height: 850px;
      }
  }
  #dialo_duibi{
    .el-dialog{
      margin: 0px !important;
      .el-dialog__body{
         padding:0px !important;
      }
      .el-dialog__header{
        .el-dialog__headerbtn{
          top:13px;
        }
      }
    }
  }
  .el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__expand-icon{
    display: none;
  }
 }
 
</style>