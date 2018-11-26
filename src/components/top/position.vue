<template>
  <div class="position container">
 <!--  位置提示信息配置strat -->
	  <div class="position_config container">
        <h4>位置提示信息配置</h4>
        <hr> 
        <div class="btn-group" role="group" aria-label="..." id="position_btn">
          <div v-for="i in positionconfig">
            {{i.name}}
            <i class="position_shu" >|</i>
            <el-switch
              v-model="i.val"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <i class="fa fa-times" @click="delpositionconfig(i)"></i>
          </div>
          <div class="position_add">
            <el-button icon="plus" type=info @click="positionconfig_dialog = true"></el-button>
          </div>
        </div>
     </div>
     <hr class="positionconfig_hr" style="margin-top:10px;margin-bottom:0;border-color:#ccc ">
     <button type="button" class="btn btn-default positionconfig_button"  id="position_hide_button" style="" @click="hide_positionconfig">隐藏位置提示配置<i class="fa fa-chevron-up" style="margin-left:5px;"></i></button>
     <button type="button" class="btn btn-default positionconfig_button" id="position_show_button" style="" @click="show_positionconfig">显示位置提示配置<i class="fa fa-chevron-down" style="margin-left:5px;"></i></button>
    
     <!--    添加位置提示信息配置模态框 -start -->
      <el-dialog title="添加分类" v-model="positionconfig_dialog" size="tiny">
        <span>分类名称：</span>
        <input type="text" v-model="positionconfig_input" placeholder="位置配置名称" @keyup.enter="add_positionconfig">
        <span slot="footer" class="dialog-footer">
          <el-button @click="positionconfig_dialog = false">取 消</el-button>
          <el-button type="primary" @click="add_positionconfig" >确 定</el-button>
        </span>
      </el-dialog>
    <!--    添加位置提示信息配置模态框 -end -->

<!-- 位置提示信息配置 end -->
<!-- 位置提示信息详情 strat -->
    <div class="position_details container">
      <h4>位置提示信息详情</h4>
      <hr> 
      <div class="block">
        <span class="wrapper">
          <el-button type="success"  @click="warn">提醒</el-button>
          <el-button type="warning"  @click="notwarn">不提醒</el-button>
          <el-button type="danger"  @click="del">删除</el-button>
        </span>
      </div> 
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @current-change="Changerow"
        @selection-change="Selection"
        :default-sort = "{prop: 'date', order: 'descending'}"
        :row-class-name="dd"
        ref="table"
        >
        <el-table-column
          type="selection"
          width="20">
        </el-table-column>
        <el-table-column
          prop="keyword"
          label="重点关键词"
          width="180">
        </el-table-column>
        <el-table-column
          label="文章标题"
          width="450">
          <template scope="scope">
            <span>{{scope.row.title}}</span>
          </template>          
        </el-table-column>
        <el-table-column
          label="出现位置"
          width="75">
          <template scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="medianame"
          label="媒体名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="date"
          sortable          
          label="提示时间"
          :formatter="formatter">
        </el-table-column>
      </el-table> 
<!--    分页 strart -->
      <div class="block ">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="60">
        </el-pagination>
      </div>
 <!--    分页 end -->                    
    </div>
<!-- 位置提示信息详情 end -->
  </div>
</template>

<script>
export default {
  mounted:function () {   
    $('.position').css('height',window.screen.height);
    $('.positionconfig_button').hover(function(){
      $(this).css('border-color','rgb(240,173,78)');
      $(this).css('color','rgb(240,173,78)');
      $('.positionconfig_hr').css('border-color','rgb(240,173,78)')
    },function(){
      $(this).css('border-color','#ccc');
      $(this).css('color','black');
      $('.positionconfig_hr').css('border-color','#ccc')        
    });
    $('.positionconfig_button').click(function(){
      $(this).css('background','white')
    });
    $('#position_btn .el-button span').click(function(e){
      console.log($(this));
      e.stopPropagation();
    })
  },
  data () {
  	return {
      val:true,
      positionconfig:[{'name':'招商银行','val':true},{'name':'招商银行银行','val':false},{'name':'招商银行2','val':true},{'name':'招商银行wdadwa','val':false},{'name':'招商行wad','val':true},{'name':'招行','val':true}],
      positionconfig_dialog:false,
      positionconfig_input:'',
      tableData:[{
          keyword:'光大',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:48:27',
          id:1,
          del:null
        }, {
          keyword:'光大',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:37:27',
          id:2,
          del:null
        }, {
          keyword:'光大',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:47:27',
          id:3,
          del:null
        }, {
          keyword:'光大',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:42:27',
          id:4,
          del:null
        }], 
        selection: [],
        currentRow: '',
        currentPage:2             
  	}
  },
  methods: {
    delpositionconfig (i) {
      this.$confirm('是否删除'+' '+i.name+' '+'的配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.each(this.positionconfig,function(j){//shanchu
          if(this.positionconfig[j].name===i.name){
            this.positionconfig.splice(j,1)
          }
        }.bind(this));
      }).catch(() => {        
      });
    },
    hide_positionconfig () {
       $('.position_config').css('display','none')
       $('#position_hide_button').css('display','none');
       $('#position_show_button').css('display','block');
    },
    show_positionconfig () {
      $('#position_hide_button').css('display','block');
      $('#position_show_button').css('display','none');
      $('.position_config').css('display','block')
    },
    add_positionconfig () {
      this.positionconfig.push({
        'name':this.positionconfig_input ? this.positionconfig_input : '无名称',
        'val':true
      })
      this.positionconfig_dialog = false;
      this.positionconfig_input = '';
    },
    formatter(row, column) {                                                                                                          
        return row.date;
    },
    Selection(val) {
        this.selection = val;
        console.log(this.selection)
    },
    Changerow (val) {
      this.currentRow = val;
      // console.log(this.currentRow)
    },
    dd (a,b) {
     if(a.select==true){
        return 'current-row'
      }  
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
    notwarn () {
      for(let j=0;j<this.selection.length;j++){
          this.selection[j].select=true;
      };
        this.$refs.table.clearSelection(this.selection);
    },
    warn () {
       for(let j=0;j<this.selection.length;j++){
          this.selection[j].select=false;
      };
      this.$refs.table.clearSelection(this.selection);      
    },
    del () {
      let idarr=[]
      for(let t=0;t<this.selection.length;t++){
        idarr.push(this.selection[t].id)
      }
      this.tableData=this.tableData.filter(item => { return idarr.indexOf(item.id) === -1; });
    }      
  }
}
</script>

<style lang="scss" >
  .position{
    position: relative;
    .positionconfig_button{
      border-top:none;
      background: snow;
      position:absolute;
      left:50%;
      margin-left:-110px;
      margin-top:-1px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      outline:none !important;
      padding:1px 12px;
    }
    #position_show_button{
      display:none; 
    }
  /*   配置 */
    .position_config{
      #position_btn{
        >div{
          margin-top:10px;
          display: inline-block;
          padding: 4px 12px 3px 8px;
          float: left;
          border:1px solid #ccc;
          border-radius: 4px;
          margin-left: 10px;
          position: relative;
          .fa-times{
            color:red ;
            font-size: 14px;
            position: absolute;
            top:0px;
            right:0px;
            display: none;
            cursor: pointer;
          }
          .position_shu{
            font-size: 16px ;
            padding: 0 8px ;
            color:#ccc ;
          }
          .el-switch{
            margin-bottom: 2px;
          }
        }
        >div:hover{
          .fa-times{
            display: inline-block;
          }
        }
        .position_add{
          padding: 0;
          border:none;
          >button{
            color:white;
            height:33px;
            padding: 8px 15px;
          }          
        }
      }
      width:100%;
      padding-bottom: 15px;    
      >h4{
        color:#f0ad4e;
      }
      >hr{
        margin: 10px 0;
      }

    }
   /*  详情 */
   .position_details{
    width: 100%;
    margin-top: 30px;
      >h4{
        color:#f0ad4e;
      }
      .block{
        margin-bottom: 8px;
        position: relative;
        .el-pagination{
          position: absolute;
          right:0;
          margin:0;
          padding: 15px;
          z-index: 999;
        }
        button{
          padding:3px 8px;
          border-radius: 4px !important;          
      }
    }
  /*   表格  */ 
   /*    表格头部 */
     thead{
      th:nth-child(1){
        .cell{
          
        }
      }
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
    .el-pagination{
      widows: 60%;
      margin-left: 40%;
      padding: 30px;
    }      
   }
  }
</style>