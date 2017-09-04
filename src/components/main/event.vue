<template>  
<div class="event container" style="background-color: #fff;padding-bottom:220px;">
<div class="block" style="padding-left:5px;margin-bottom: 10px;" >
  <div class="filter_event" style="width: 100%;;border: 1px solid #dcdcdc;background: #f7f7f7;position: relative;">
    <div class="btn-group" role="group" aria-label="..." style="margin-top: 20px;" id="type">
      <span style="position: absolute;left: 20px;line-height: 28px;"><b>事件类型:</b></span>
      <button type="button" class="btn warning" style="margin-left: 90px;" @click="btn_disabled=false;">微信</button>
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
            <el-button>{{current_sort}}<i class="fa fa-angle-down " style="margin-left: 12px;font-size: 14px;font-weight: 700"></i></el-button>    
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="i in dropdown_sort" :command="i">{{i}}</el-dropdown-item>
            </el-dropdown-menu>
    </el-dropdown>
    <hr style="width: 97%;">
    <el-button type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 480px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;" id="search" @click="_start">搜索</el-button>
    <el-button type="success" size="large" class="search_start" style="padding: 5px 12px;font-size: 14px;margin-left: 80px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;margin-bottom: 20px;" id="" @click="save">导出</el-button>
  </div>
</div>
  <div id="panel">
    <div class="panel panel-default" id="panel_person">
      <div class="panel-heading" style="padding: 6px 15px;">
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
        <div v-for="(i,$index) in personSet" class="ct" @click="ct_click(i,'perList',$index)" @mouseover="Mover_ct($index)" @mouseout="Mout_ct($index)" ref="ct" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 30px;display: inline-block;margin-top: 15px;font-size: 11px;height: 17px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span>
        <img src="../../assets/icon/del.png" style="position: absolute;bottom: 12px;left: 6px;cursor: pointer;display: none;" @click.stop="del_per(i,$index,'personSet','perList')"></div>
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
      <div class="panel-body">
        <div class="person" style="color: white;">地点</div>
        <div class="line_first"></div>
        <div class="line_second"></div>
        <div class="line_last"></div>
        <div v-for="(i,$index) in locationSet" class="ct" @click="ct_click(i,'locList',$index)" @mouseover="Mover_ct_loc($index)" @mouseout="Mout_ct_loc($index)" ref="ct_loc" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 30px;display: inline-block;margin-top: 15px;font-size: 11px;height: 17px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span>
         <img src="../../assets/icon/del.png" style="position: absolute;bottom: 12px;left: 6px;cursor: pointer;display: none;" @click.stop="del_per(i,$index,'locationSet','locList')"></div>
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
      <div class="panel-body">
        <div class="person" style="color: white;">组织</div>
        <div class="line_first"></div>
        <div class="line_second"></div>
        <div class="line_last"></div>
        <div v-for="(i,$index) in orgSet" class="ct" @click="ct_click(i,'orgList',$index)" @mouseover="Mover_ct_org($index)" @mouseout="Mout_ct_org($index)" ref="ct_org" :style="[{width:styleData[$index].width},{height:styleData[$index].height},{top:styleData[$index].top},{left:styleData[$index].left}]"><span style="color: #666;width: 40px;display: inline-block;margin-top: 15px;font-size: 11px;height: 17px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;">{{i.mention.slice(0,i.mention.indexOf('/'))}}</span> 
        <img src="../../assets/icon/del.png" style="position: absolute;bottom: 12px;left: 6px;cursor: pointer;display: none;" @click.stop="del_per(i,$index,'orgSet','orgList')"></div>
      </div>
    </div>
  </div>
  <div class="panel panel-default" id="mid">
    <div class="panel-heading">
          <h3 class="panel-title" style="color: #333333;">事件</h3>
    </div>
  </div>
  <!-- <p v-loading="this.data.length==0" element-loading-text="系统拼命加载中..." style="top:200px;" id="loading"></p> -->
  <div class="progress" style="top:120px;z-index:10 !important;position: relative;width: 500px;margin: 0 auto;"  id="loading" v-show="this.data.length==0">
    <div class="progress-bar progress-bar-striped active" role="progressbar"  aria-valuemin="0" aria-valuemax="100" :style="{width:size+'%' }" v-text="'加载中 '+size+'% 。。'"></div>
  </div>
  <div class="event_card">
    <div v-for="(i,$index) in data" :class="{ live1:$index==0 }" style="width:387px;height: 230px;border: 1px solid #ebebeb;position: relative;overflow: hidden;cursor: pointer;float: left;padding:0 ;margin: 10px 20px 10px 5px;border-radius: 8px;" ref="list" @mouseover="Mover($index)" @mouseout="Mout($index)" @click="card_click($index)">
      <div style="width: 100%;height:88px;padding: 0 5px;position: relative;">
        <div style="width: 65px;height: 76px;margin-left: 10px; " ><img src="../../assets/icon/eventnumber.png" ><span style="width:64px;height: 30px;position:absolute;left: 16px;;top:46px;color: white;font-size: 16px;text-align:center"></span></div>
        <p style="position: absolute;top: 10px;left:90px;width: 280px;font-size: 16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><img src="../../assets/icon/event-title.png" style="padding-right: 6px;color: #333333;"><span><input type="text" :value="i.label" @click.stop="input_write" @blur="blur_input($index)" ref="inpt" style="outline: none;border-width: 0;text-decoration: none;box-shadow: none;width: 260px;font-size: 16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"></span></p>
        <p style="position: absolute;top:35px;left:110px;color: rgb(242,196,70);cursor: pointer;" @click.stop="dialog_articleList(i,$index)"><img src="../../assets/icon/event-like.png" style="padding-right: 6px;">相关文章({{i.articleList.length}})</p>
      </div>
      <div @click="echart_click($index)" style="width: 100%;height:140px;padding: 0 5px;" :id="'echarts_card'+$index"></div>
    </div>
      <div id="all_event_echart" style="width: 1225px;height: 400px;position: relative;float: left;"></div>
  </div>
  
  <!-- 相关文章列表模态框 -->
    <el-dialog title="相关文章" v-model="dialoglist" size="tiny" id="dialog_list">
      <!-- <div class="el-steps is-vertical" id="steps" style="width: 1005px;height: 600px;"> -->
       <!-- </div> -->
      <div class="el-step is-vertical" style="margin-right: 0px; cursor: pointer;" v-for="(i,$index) in articleList_list" @mouseover="Mover_articleList($index)" @mouseout="Mout_articleList($index)">
       <div class="el-step__head  is-text" style="color: white;">
         <div class="el-step__line is-vertical" style="margin-right:0;width: 1px;"> </div>
         <span class="el-step__icon">
           <img v-if="$index==0" :src="fimg">
           <img v-if="$index!=0" :src="imgf">
         </span>
       </div>
       <div class="el-step__main" style="margin-left: 0">
         <div class="el-step__title "  style="width: 480px;height: 32px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;"><a :href="i.url"  target="_blank" style="font-weight: 700;color: #48576a;text-decoration: none" ref="articlelist">{{i.title}}</a></div>
         <img src="../../assets/icon/del.png" style="margin-top: -22px;margin-left: 30px;display: none;" @click="del_articleList(i,$index)">
         <div class="el-step__description " style=" color: #8391a5;">{{i.publishTime}}</div>
       </div>
      </div> 
      <el-pagination
            class="page"
            @current-change="handleCurrentChange_list"
            :current-page="currentPage_list"
            :page-sizes="[ 12, 20, 25]"
            :page-size="page_size_list"
            layout="total,  prev, pager, next, jumper"
            :total="this.articleList.length"
            v-show="this.articleList.length!==0">
        </el-pagination>
    </el-dialog>
   <!-- echarts放大图模态框 -->
    <el-dialog title="详情图" v-model="dialogEchart" size="tiny" id="dialog_echarts">
       <!--  <span>这是一段信息</span> -->
        <div style="width: 100%;height:400px;padding: 0 5px;border:1px solid #ebebeb" id="echarts_max"></div>
   </el-dialog>
   <!--  mention详情图 start -->
    <el-dialog title="详情" v-model="dialogCt" size="tiny" id="dialog_ct" >
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 出现频次: <span style="color: #666;">{{ct_size}}</span></p>
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 知识图谱: <img src="../../assets/icon/ct_link.png" style="margin-top: -3px;display: inline-block;"> <a :href="ct_url" v-if="ct_url==null" target="_blank" style="color: #fec330;text-decoration: none;">当前实体没有对应的实体链接</a><a :href="ct_url" v-else target="_blank" style="color: #fec330;text-decoration: none;">{{ct_name}}</a></p>
       <p style="font-size: 16px;color: #333;"><img src="../../assets/icon/ev_shu.png" style="margin-top: -3px;display: inline-block;margin-right: 10px;"> 相关文章</p>
       <div class="list-group" style="width: 531px;" id="dialog_ct_list">
          <div style="padding: 8px 5px;color: #999;cursor: pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;-webkit-text-overflow:ellipsis;-o-text-overflow:ellipsis;-moz-text-overflow:ellipsis;" class="list-group-item" ref="ct_list" @mouseover="Mover_ct_list($index)" @mouseout="Mout_ct_list($index)" @click="click_ct_list(i)" v-for="(i,$index) in ct_data_list">{{($index+1)+(currentPage-1)*page_size}}.&nbsp;{{i.title}}<img src="../../assets/icon/del.png" style="position: absolute;right: 8px;display: none;" @click.stop="del_threeList(i)"></div>
      </div>
      <!--    分页 strart -->
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
     <!--    分页 end -->
   </el-dialog>
   <!--  mention详情图 end -->
</div>  
</template>
<script >
import echarts from 'echarts'
import ecStat from 'echarts-stat'
import { Map }  from '../../assets/js/map.js'
import { Sort }  from '../../assets/js/index.js'
//import { time }  from '../../assets/js/setInterval.js'
  export default{
    data : function(){ 
        return{
          styleData:[
            {'width':'16px','height':'16px','top':'150px','left':'162px'},
            {'width':'16px','height':'16px','top':'108px','left':'180px'},
            {'width':'16px','height':'16px','top':'125px','left':'241px'},
            {'width':'16px','height':'16px','top':'180px','left':'237px'},
            {'width':'16px','height':'16px','top':'196px','left':'202px'},
            {'width':'16px','height':'16px','top':'87px','left':'202px'},
            {'width':'16px','height':'16px','top':'130px','left':'265px'},
            {'width':'16px','height':'16px','top':'130px','left':'126px'},
            {'width':'16px','height':'16px','top':'88px','left':'143px'},
            {'width':'16px','height':'16px','top':'194px','left':'133px'},
            {'width':'16px','height':'16px','top':'75px','left':'260px'},
            {'width':'16px','height':'16px','top':'240px','left':'205px'},
            {'width':'16px','height':'16px','top':'40px','left':'205px'},
            {'width':'16px','height':'16px','top':'155px','left':'90px'},
            {'width':'16px','height':'16px','top':'155px','left':'313px'},
            {'width':'16px','height':'16px','top':'55px','left':'118px'},
            {'width':'16px','height':'16px','top':'205px','left':'90px'},
            {'width':'16px','height':'16px','top':'255px','left':'130px'},
            {'width':'16px','height':'16px','top':'55px','left':'300px'},
            {'width':'16px','height':'16px','top':'55px','left':'90px'}
          ],
          data:'',
          olddata:'',
          personSet:'',
          locationSet:'',
          orgSet:'',
          articleList:'',
          articleList_es:'',
          dialoglist:false,
          dialogEchart:false,
          dialo_es:false,
          dialogCt:false,
          size:0,
          articleType:2,
          current_sort:JSON.parse(window.sessionStorage.getItem('current_sort'))||'6',
          current_sort_loc:JSON.parse(window.sessionStorage.getItem('current_sort_loc'))||'10',
          current_sort_per:JSON.parse(window.sessionStorage.getItem('current_sort_per'))||'10',
          current_sort_org:JSON.parse(window.sessionStorage.getItem('current_sort_org'))||'10',
          dropdown_sort:['2','3','4','5','6','7','8','9','10'],
          sj:[1,2,3,4,5,6,7,8,9,10],
          time: [new Date(new Date().getTime()-604800000), new Date()],
          fimg:require("../../assets/icon/xiangguanwenzhang.png"),
          imgf:require("../../assets/icon/xiangguanwenzhang1.png"),
          ct_size:'',
          ct_name:'',
          ct_url:'',
          ct_data:[],
          list_type:'',
          ct_data_list:[],
          articleList_list:[],
          currentPage:1,
          currentPage_list:1,
          page_size:10,
          page_size_list:12,
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
          data_Per_index:'',//点击卡片获取相对应总数据的index
          data_second_index:''//点击人物组织圆点获取index
        }
    },
    mounted : function () {
      Map; 
        let _this=this;
        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
         //获取行业属性
        $.ajax({
          type: "GET",
          url: 'http://192.168.1.2:8080/rs0/api/v1.1/project/'+project_id+'/wxAccount/domain',
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
          url: 'http://192.168.1.2:8080/rs0/api/v1.1/project/'+project_id+'/wxAccount/customType',
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
      var itime1=setInterval(function(){
        _this.size+=1;
       if(_this.size==99){
           clearInterval(itime1)
         }
        },1000) 
     _this.format_time ();  
      Sort;            
      $.ajax({
        url:"http://192.168.1.2:8080/rs0/api/v1.1/project/"+project_id+"/event",
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
           "topicNum":_this.current_sort//议题数量
        },
        success:function(data){
          console.log(data.data)
          console.log(this.url.slice(0,this.url.indexOf('method=')))
          if(data.data==null||data.data.length==0){
             _this.$message({
                            message: '新闻数量太少,无法生成议题。请调整时间区间或增加关键词后再试。',
                            type: 'warning'
                          });
            $('#loading').css('display','none');                
          }
          for(let z=0;z<data.data.length;z++){
            if(data.data[z].locList){
              data.data[z].locList.sort(Sort('score'));
            }
            if(data.data[z].orgList){
              data.data[z].orgList.sort(Sort('score'));
            }
            if(data.data[z].perList){
              data.data[z].perList.sort(Sort('score'));
            }
          }
          _this.olddata=JSON.stringify(data.data);
          _this.$store.state.start_data=JSON.parse(_this.olddata);
          _this.data=data.data;
          console.log(9999999)
          _this.size=99;
          clearInterval(itime1)
          //console.log(_this.data);
          _this.personSet=data.data[0].perList.slice(0,_this.current_sort_per);
          _this.locationSet=data.data[0].locList.slice(0,_this.current_sort_loc);
          _this.orgSet=data.data[0].orgList.slice(0,_this.current_sort_org);
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
        },
        error:function(data){
          alert("执行了 --查询事件-- 失败----回调函数-------------------");
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
      this.personSet=this.$store.state.data[0].perList.slice(0,this.current_sort_per);
      this.locationSet=this.$store.state.data[0].locList.slice(0,this.current_sort_loc);
      this.orgSet=this.$store.state.data[0].orgList.slice(0,this.current_sort_org);
      $(document).ready(function(){
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
       if(JSON.parse(window.sessionStorage.getItem('time0'))!=null){
        _this.time=[new Date(JSON.parse(window.sessionStorage.getItem('time0'))),new Date(JSON.parse(window.sessionStorage.getItem('time1')))]
       }
       $('.el-dialog__headerbtn').not('#dialog_list_es .el-dialog__headerbtn').click(function(){
        _this.dialoglist=false;
        _this.dialogEchart=false;
        _this.dialogCt=false;
      });
       $('#search').click(function(){
        clearInterval(itime1);
       })
    },
    methods:{
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
            for(let j=0;j<_this.data[l].articleList.length;j++){
               let x_time=_this.data[l].articleList[j].publishTime.slice(0,13);
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
        let all_event_echart = echarts.init(document.getElementById('all_event_echart'));
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
      //echart气泡
      echart_qipao(){
        Sort;
        let _this=this;
       for(let i=0;i<_this.data.length;i++){
          for(let t=0;t<_this.data[i].articleList.length;t++){
                    _this.data[i].articleList[t].publishTime=new Date(_this.data[i].articleList[t].publishTime).Format("yyyy-MM-dd hh:mm:ss");
                }
              let echarts_card = echarts.init(document.getElementById('echarts_card'+i+'')); 
               _this.data[i].keywordList.sort(Sort('score'));
                let keywordArr=[];
                if(_this.data[i].keywordList.length<11){
                  keywordArr=_this.data[i].keywordList;
                }else{
                  keywordArr=_this.data[i].keywordList.slice(0,10);
                }
              /*console.log(keywordArr)*/
              let dataBJ=[];
              for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].word;
                    dataBJ.push(dataB)
                  }
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
                let option_echarts_card={
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
                              data: dataBJ
                          }
                      ]
                  };
                  echarts_card.setOption(option_echarts_card);
                  echarts_card.on('click', function (params) {
                    //console.log(params)
                   // console.log(_this.data[i].keywordList)
                    _this.qipao_idarr.push(params.data[3]);
                    _this.data[i].keywordList=_this.data[i].keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.word) === -1; });//前台删除
                   // console.log(  _this.data[i].keywordList)
                    _this.echart_qipao()
                    _this.del_keywordList(i,params.data[3],_this.qipao_idarr);
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
     _start () {
      let _this=this;
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
      _this.domain_arr=domain_arr;
      _this.custom_arr=custom_arr;
      //console.log(new Date(_this.time[0].getTime()))
      window.sessionStorage.setItem('current_sort',JSON.stringify(_this.current_sort))
      window.sessionStorage.setItem('current_sort_per',JSON.stringify(_this.current_sort_per))
      window.sessionStorage.setItem('current_sort_loc',JSON.stringify(_this.current_sort_loc))
      window.sessionStorage.setItem('current_sort_org',JSON.stringify(_this.current_sort_org))
      window.sessionStorage.setItem('time0',JSON.stringify(_this.time[0].getTime()))
      window.sessionStorage.setItem('time1',JSON.stringify(_this.time[1].getTime()))
      this.personSet=[];
      this.locationSet=[];
      this.orgSet=[];
      this.data=[];
      this.size=0; 
      $('.event_card').css('display','none')
      let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
      _this.format_time ();  
      Sort;
      var itime2=setInterval(function(){
        _this.size++;
       if(_this.size>99){
           clearInterval(itime2);
           _this.size=99;
         }
        },1000)                                        
      $.ajax({
        url:"http://192.168.1.2:8080/rs0/api/v1.1/project/"+project_id+"/event",
        type:"GET",
        data:{
          "method":"GET",
          "proId":project_id,
          "startTime":_this.time[0],//开始时间
           "endTime":_this.time[1],
           "articleType":_this.articleType,
           "topicNum":_this.current_sort,//议题数量
           "domain": domain_arr,
           "customType":custom_arr,
           "perNum":_this.current_sort_per,
           "locNum":_this.current_sort_loc,
           "orgNum":_this.current_sort_org,
        },
        success:function(data){
          console.log(window.document.location.href)
          console.log(this.url)
          if(data.data==null||data.data.length==0){
             _this.$message({
                            message: '新闻数量太少,无法生成议题。请调整时间区间或增加关键词后再试。',
                            type: 'warning'
                          });  
             $('#loading').css('display','none');  
          }
          for(let z=0;z<data.data.length;z++){
            if(data.data[z].locList){
              data.data[z].locList.sort(Sort('score'));
            }
            if(data.data[z].orgList){
              data.data[z].orgList.sort(Sort('score'));
            }
            if(data.data[z].perList){
              data.data[z].perList.sort(Sort('score'));
            }
          }
          _this.data=data.data;
          _this.size=99;
          clearInterval(itime2)
          $('.event_card').css('display','block')
          console.log(_this.data);
          _this.personSet=data.data[0].perList.slice(0,_this.current_sort_per);
          _this.locationSet=data.data[0].locList.slice(0,_this.current_sort_loc);
          _this.orgSet=data.data[0].orgList.slice(0,_this.current_sort_org);
          //全局数据
          _this.olddata=JSON.stringify(data.data);
          _this.$store.state.start_data=JSON.parse(_this.olddata);
          _this.$store.state.data=data.data; 
          window.sessionStorage.setItem('custom_arr',JSON.stringify(custom_arr));
          window.sessionStorage.setItem('domain_arr',JSON.stringify(domain_arr));
        $(document).ready(function(){
              _this.echart_qipao();
                $('.event_card>div').click(function(){
                  $(this).addClass('live').siblings().removeClass('live live1')
               })
              _this.echart_event();
            })
        },
        error:function(data){
          alert("执行了 --查询事件-- 失败----回调函数-------------------");
        }
      }); 
    },
      dialog_articleList (i,a){
        let _this=this;
        Map;
        this.data_articleList_index=a;
        _this.format_time ();  
        let num_map=new Map()
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
          _this.articleList_list=newdata;
      },
      echart_click(a){
        this.dialogEchart=true;
      },
      card_click (a) {
        let _this=this;
        Sort;
        _this.data_Per_index=a;
        _this.personSet=_this.data[a].perList.slice(0,_this.current_sort_per);
        _this.locationSet=_this.data[a].locList.slice(0,_this.current_sort_loc);;
        _this.orgSet=_this.data[a].orgList.slice(0,_this.current_sort_org);
        $(document).ready(function(){
          let echarts_max = echarts.init(document.getElementById('echarts_max'));
          _this.data[a].keywordList.sort(Sort('score'));
          let keywordArr=[];
          if(_this.data[a].keywordList.length<11){
            keywordArr=_this.data[a].keywordList;
          }else{
            keywordArr=_this.data[a].keywordList.slice(0,10);
          }
           let dataBJ=[];
          for(let k=0;k<keywordArr.length;k++){
                let dataB=new Array();
                    dataB[0]=k;
                    dataB[1]=parseInt(Math.random()*260);
                    dataB[2]=keywordArr[k].score;
                    dataB[3]=keywordArr[k].word;
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
          let option_echarts_card={
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
                  echarts_max.setOption(option_echarts_card);  
                  echarts_max.on('click', function (params) {
                    /*console.log(params)
                    console.log(_this.data[a].keywordList)*/
                    _this.qipao_idarr.push(params.data[3]);
                    _this.data[a].keywordList=_this.data[a].keywordList.filter(item => { return _this.qipao_idarr.indexOf(item.word) === -1; });//前台删除
                    _this.card_click(a)
                    _this.echart_qipao();
                    _this.del_keywordList(a,params.data[3],_this.qipao_idarr);
                  })
        })
         
      },
      del_keywordList(c,d,e){
         if(this.$store.state.ajax_data.length!==0){
              let obj=new Object();
              let flag=false;
              let t;
              for(let i=0;i<this.$store.state.ajax_data.length;i++){
                if(this.data[c].id==this.$store.state.ajax_data[i].eventId){
                  flag=true;
                  t=i;
                }      
              }
              if(!flag){
                //创建一个event{}
                obj.eventId=this.data[c].id;
                obj.delKeywords =[d];
                this.$store.state.ajax_data.push(obj);
                flag = false;
              }else{
                //已经有了event{}
                if(this.$store.state.ajax_data[t].delKeywords==null){ //如果建立一个event{}并没有创建delArticleIds时;
                      e=[];
                      e.push(d);
                      this.$store.state.ajax_data[t].delKeywords=e;
                      console.log('kong')
                    }else{
                      this.$store.state.ajax_data[t].delKeywords.push(d);
                    }
              }
          }else{
            let obj=new Object();
            obj.eventId=this.data[c].id;
            obj.delKeywords =[d];
            this.$store.state.ajax_data.push(obj);
          }
          console.log(this.$store.state.ajax_data)
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
      Mout_ct_list(i) {
        this.$refs.ct_list[i].style.color="#999"
      },
      sort_dropdown (command) {
        this.current_sort=command;
      },
      sort_dropdown_per (command) {
        this.current_sort_per=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        console.log(this.data[this.data_Per_index].perList)
        this.personSet=this.data[this.data_Per_index].perList.slice(0,command);
      },
      sort_dropdown_loc (command) {
        this.current_sort_loc=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.locationSet=this.data[this.data_Per_index].locList.slice(0,command);
      },
      sort_dropdown_org(command) {
        this.current_sort_org=command;
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.orgSet=this.data[this.data_Per_index].orgList.slice(0,command);
      },
      del_threeList(a){
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        };
        this.perList_idarr.push(a.id);
        console.log(a);
        this.ct_data=this.ct_data.filter(item => { return this.perList_idarr.indexOf(item.id) === -1; });//前台删除
        this.data[this.data_Per_index][this.list_type][this.data_second_index].eventArticleList=this.ct_data;
        this.format_tabledata();

       if(this.$store.state.ajax_data.length!==0){
        let obj=new Object();
          let flag=false;
          let q;
          for(let i=0;i<this.$store.state.ajax_data.length;i++){
            if(this.data[this.data_Per_index].id==this.$store.state.ajax_data[i].eventId){
              flag=true;
              q=i;
            }      
          };
          if(!flag){
            //创建一个event{}
            console.log('id没匹配到创建一个event')
            obj.eventId=this.data[this.data_Per_index].id;
            obj[this.list_type]=[];
            let perObj=new Object();
            perObj.mention=this.data[this.data_Per_index][this.list_type][this.data_second_index].mention;
            perObj.relationship=this.data[this.data_Per_index][this.list_type][this.data_second_index].relationShip;
            perObj.eventArticleList=[];
            let eventArticleObj=new Object();
            eventArticleObj.id=a.id;
            eventArticleObj.articleType=a.articleType;
            perObj.eventArticleList.push(eventArticleObj);
            obj[this.list_type].push(perObj);
            this.$store.state.ajax_data.push(obj);
            flag = false;
          }else{
            //已经有了event{}
             if(this.$store.state.ajax_data[q][this.list_type]==null){ //如果建立一个event{}并没有创建perliset等时;
                let arr=[];
                let perObj=new Object();
                perObj.mention=this.data[this.data_Per_index][this.list_type][this.data_second_index].mention;
                perObj.relationship=this.data[this.data_Per_index][this.list_type][this.data_second_index].relationShip;
                perObj.eventArticleList=[];
                let eventArticleObj=new Object();
                eventArticleObj.id=a.id;
                eventArticleObj.articleType=a.articleType;
                perObj.eventArticleList.push(eventArticleObj);
                arr.push(perObj);
                this.$store.state.ajax_data[q][this.list_type]=arr;
                console.log('kong')
              }else{ //找到了那个事件并且有perlist时
                let Mflag=false;
                let m;
                for(let k=0;k<this.$store.state.ajax_data[q][this.list_type].length;k++){ //查找perlist里面对应的mention
                  if(this.data[this.data_Per_index][this.list_type][this.data_second_index].mention==this.$store.state.ajax_data[q][this.list_type][k].mention){
                    Mflag=true;
                    m=k;
                  }
                }
                if(!Mflag){//找到了那个事件并且有perlist时但是找不到对应的mention时----创建一个perList其中一个{}
                  let mentionObj=new Object();
                  mentionObj.mention=this.data[this.data_Per_index][this.list_type][this.data_second_index].mention;
                  mentionObj.relationship=this.data[this.data_Per_index][this.list_type][this.data_second_index].relationShip;
                  mentionObj.eventArticleList=[];
                  let eventListObj=new Object();
                  eventListObj.id=a.id;
                  eventListObj.articleType=a.articleType;
                  mentionObj.eventArticleList.push(eventListObj);
                  this.$store.state.ajax_data[q][this.list_type].push(mentionObj);
                }else{//找到了那个事件并且有perlist时且找到对应的mention时- 
                  if(this.$store.state.ajax_data[q][this.list_type][m].eventArticleList==null){//找到了那个事件并且有perlist时且找到对应的mention时且对应的eventArticleList为空
                    let arr=[];
                    let eventListObj=new Object();
                    eventListObj.id=a.id;
                    eventListObj.articleType=a.articleType;
                    arr.push(eventListObj)
                    this.$store.state.ajax_data[q][this.list_type][m].eventArticleList=arr;
                  }else{//找到了那个事件并且有perlist时且找到对应的mention时且对应的eventArticleList不为空
                    let eventListObj=new Object();
                    eventListObj.id=a.id;
                    eventListObj.articleType=a.articleType;
                    this.$store.state.ajax_data[q][this.list_type][m].eventArticleList.push(eventListObj);
                  }
                }
                /*let perObj=new Object();
                perObj.mention=t.mention;
                perObj.relationship=t.relationShip;
                this.$store.state.ajax_data[q][b].push(perObj);*/
              }   
          }
       }else{
        console.log('data为空创建一个事件')
          let obj=new Object();
          obj.eventId=this.data[this.data_Per_index].id;
          obj[this.list_type]=[];
          let perObj=new Object();
          perObj.mention=this.data[this.data_Per_index][this.list_type][this.data_second_index].mention;
          perObj.relationship=this.data[this.data_Per_index][this.list_type][this.data_second_index].relationShip;
          perObj.eventArticleList=[];
          let eventArticleObj=new Object();
          eventArticleObj.id=a.id;
          eventArticleObj.articleType=a.articleType;
          perObj.eventArticleList.push(eventArticleObj);
          obj[this.list_type].push(perObj);
          this.$store.state.ajax_data.push(obj);
       }
       console.log(this.$store.state.ajax_data)
      },
      del_per(t,a,b,c){
        if(this.data_Per_index==''){
          this.data_Per_index=0;
        }
        this.mentionArr.push(t.mention)
        this[b]=this[b].filter(item => { return this.mentionArr.indexOf(item.mention) === -1; });//前台删除
        this.data[this.data_Per_index][c]=this.data[this.data_Per_index][c].filter(item => { return this.mentionArr.indexOf(item.mention) === -1; });
        
        if(this.$store.state.ajax_data.length!==0){
          let obj=new Object();
          let flag=false;
          let q;
          for(let i=0;i<this.$store.state.ajax_data.length;i++){
            if(this.data[this.data_Per_index].id==this.$store.state.ajax_data[i].eventId){
              flag=true;
              q=i;
            }      
          };
          if(!flag){
            //创建一个event{}
            console.log('id没匹配到创建一个event')
            obj.eventId=this.data[this.data_Per_index].id;
            obj[c]=[];
            let perObj=new Object();
            perObj.mention=t.mention;
            perObj.relationship=t.relationShip;
            obj[c].push(perObj);
            this.$store.state.ajax_data.push(obj);
            flag = false;
          }else{
            //已经有了event{}
             if(this.$store.state.ajax_data[q][c]==null){ //如果建立一个event{}并没有创建perliset等时;
                let arr=[];
                let perObj=new Object();
                perObj.mention=t.mention;
                perObj.relationship=t.relationShip;
                arr.push(perObj);
                this.$store.state.ajax_data[q][c]=arr;
                console.log('kong')
              }else{
                let Mflag=false;
                let n;
                for(let z=0;z<this.$store.state.ajax_data[q][c].length;z++){//有perlist且如果第三级已经删除了，那么mention会重复 故重置。
                  if(this.$store.state.ajax_data[q][c][z].mention==t.mention){
                    Mflag=true
                    n=z;
                  }
                }
                if(!Mflag){
                  let perObj=new Object();
                  perObj.mention=t.mention;
                  perObj.relationship=t.relationShip;
                  this.$store.state.ajax_data[q][c].push(perObj);
                  Mflag=false;
                }else{
                  this.$store.state.ajax_data[q][c][n].mention=t.mention;
                  this.$store.state.ajax_data[q][c][n].relationship=t.relationShip;
                  this.$store.state.ajax_data[q][c][n].eventArticleList=null;
                }
                
              }   
          }
        }else{
          let obj=new Object();
          obj.eventId=this.data[this.data_Per_index].id;
          obj[c]=[];
          let perObj=new Object();
          perObj.mention=t.mention;
          perObj.relationship=t.relationShip;
          obj[c].push(perObj);
          this.$store.state.ajax_data.push(obj);
        }
        console.log(this.$store.state.ajax_data)
      },
      blur_input (i){
        if(this.data[i].label!=this.$refs.inpt[i].value){
           if(this.$store.state.ajax_data.length!==0){
                let obj=new Object();
                let flag=false;
                let t;
                for(let j=0;j<this.$store.state.ajax_data.length;j++){
                  if(this.data[i].id==this.$store.state.ajax_data[j].eventId){
                    flag=true;
                    t=j;
                  }      
                }
                if(!flag){
                  //创建一个event{}
                  console.log('id没匹配到创建一个event')
                  obj.eventId=this.data[i].id;
                  obj.label=this.$refs.inpt[i].value;
                  this.$store.state.ajax_data.push(obj);
                  flag = false;
                }else{
                  //已经有了event{}
                   this.$store.state.ajax_data[t].label=this.$refs.inpt[i].value;    
                }
            }else{
              let obj=new Object();
              obj.eventId=this.data[i].id;
              obj.label=this.$refs.inpt[i].value;
              this.$store.state.ajax_data.push(obj);
            }
            console.log(this.$store.state.ajax_data)
        }
        this.data[i].label=this.$refs.inpt[i].value;
      },
      del_articleList(a,b){
        console.log(a.id);
       // console.log(this.data[this.data_articleList_index].label);
          this.articleList_idarr.push(a.id)
          this.articleList=this.articleList.filter(item => { return this.articleList_idarr.indexOf(item.id) === -1; });//前台删除
          this.data[this.data_articleList_index].articleList=this.articleList;
          let newdata=[],
          pageNum=this.currentPage_list-1;
          for(let i=this.page_size_list*pageNum;i<this.page_size_list*pageNum+this.page_size_list;i++ ){
            this.articleList[i] !== undefined ? newdata.push(this.articleList[i]) : '' 
          }
          this.articleList_list=newdata;

         if(this.$store.state.ajax_data.length!==0){
              let obj=new Object();
              let flag=false;
              let t;
              for(let i=0;i<this.$store.state.ajax_data.length;i++){
                if(this.data[this.data_articleList_index].id==this.$store.state.ajax_data[i].eventId){
                  flag=true;
                  t=i;
                }      
              }
              if(!flag){
                //创建一个event{}
                obj.eventId=this.data[this.data_articleList_index].id;
                obj.delArticleIds =[a.id];
                this.$store.state.ajax_data.push(obj);
                flag = false;
              }else{
                //已经有了event{}
                if(this.$store.state.ajax_data[t].delArticleIds==null){ //如果建立一个event{}并没有创建delArticleIds时;
                      this.articleList_idarr=[];
                      this.articleList_idarr.push(a.id);
                      this.$store.state.ajax_data[t].delArticleIds=this.articleList_idarr;
                      console.log('kong')
                    }else{
                      this.$store.state.ajax_data[t].delArticleIds.push(a.id);
                    }
              }
          }else{
            let obj=new Object();
            obj.eventId=this.data[this.data_articleList_index].id;
            obj.delArticleIds =[a.id];
            this.$store.state.ajax_data.push(obj);
          }
          //去重
          for(let j=0;j<this.$store.state.ajax_data.length;j++){
            this.$store.state.ajax_data[j].delArticleIds=Array.from(new Set(this.$store.state.ajax_data[j].delArticleIds));
          }
          console.log(this.$store.state.ajax_data)
          /*if(this.$store.state.articleList_idarr[this.data[this.data_articleList_index].id]==null){
            this.articleList_idarr=[];
            this.articleList_idarr.push(a.id);
            this.$store.state.articleList_idarr[this.data[this.data_articleList_index].id]=this.articleList_idarr;
          }else{
            this.$store.state.articleList_idarr[this.data[this.data_articleList_index].id].push(a.id);
          }
         this.$store.state.articleList_idarr[this.data[this.data_articleList_index].id] = Array.from(new Set(this.$store.state.articleList_idarr[this.data[this.data_articleList_index].id]))
          console.log(this.$store.state.articleList_idarr);
            }*/
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
      date_change () {
        if(this.time[0]==undefined||this.time[1]==undefined||this.time[1].getTime()<this.time[0].getTime()){
          this.time=[new Date(new Date().getTime()-604800000), new Date()];
          this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }
      },
      save(){
        let _this=this;
        this.$store.state.start_data= this.$store.state.data;
        let project_id=JSON.parse(window.sessionStorage.getItem('project_id'));
        $.ajax({
                type: "POST",
                url: 'http://192.168.1.2:8080/rs0/api/v1.1/project/'+project_id+'/event/update',
                data:{
                  "eventDtoList":JSON.stringify(_this.$store.state.ajax_data)
                },
                success: function(data){
                    console.log(JSON.stringify(data));
                    console.log(data.success);
                    console.log(data.message);
                }
              })
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
   #dialog_list{
    .el-dialog{
      width: 33%;
      .el-step__main:hover{
        img{
          display: inline-block !important;
        }
      }
    }
  } 
  #dialog_list,#dialog_echarts,#dialog_ct,#dialog_list_es{
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
  #dialog_echarts{
    .el-dialog--tiny{
      width: 50%;
    }
  }
  #dialog_ct{
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
      .list-group-item:hover{
        img{
          display: inline-block !important;
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
}
</style>