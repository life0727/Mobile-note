<template>
  <div class="indexnumber container">
 <!--  指数提示信息配置strat -->
    <div class="indexnumber_config container">
        <h4>指数提示信息配置</h4>
        <hr> 
        <div class="btn-group" role="group" aria-label="..." id="indexnumber_btn">
          <div v-for="i in indexnumberconfig">
            {{i.name}}
            <i class="indexnumber_shu" >|</i>
            <el-switch
              v-model="i.val"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
            <i class="fa fa-times" @click="delindexnumberconfig(i)"></i>
            <i class="fa fa-pencil" @click="writeindexnumberconfig"></i>
          </div>
          <div class="indexnumber_add">
            <el-button icon="plus" type=info @click="indexnumberconfig_dialog = true"></el-button>
          </div>
        </div>
     </div>
     <hr class="indexnumberconfig_hr" style="margin-top:10px;margin-bottom:0;border-color:#ccc ">
     <button type="button" class="btn btn-default indexnumberconfig_button"  id="indexnumber_hide_button" style="" @click="hide_indexnumberconfig">隐藏指数提示配置<i class="fa fa-chevron-up" style="margin-left:5px;"></i></button>
     <button type="button" class="btn btn-default indexnumberconfig_button" id="indexnumber_show_button" style="" @click="show_indexnumberconfig">显示指数提示配置<i class="fa fa-chevron-down" style="margin-left:5px;"></i></button>
<!-- 指数提示信息配置 end -->

     <!--    添加位置提示信息配置模态框 -start -->
      <el-dialog title="添加分类" v-model="indexnumberconfig_dialog" size="tiny">
        <span>分类名称：</span>
        <input type="text" v-model="indexnumberconfig_input" placeholder="指数配置名称" @keyup.enter="add_indexnumberconfig">
        <span slot="footer" class="dialog-footer">
          <el-button @click="indexnumberconfig_dialog = false">取 消</el-button>
          <el-button type="primary" @click="add_indexnumberconfig" >确 定</el-button>
        </span>
      </el-dialog>
    <!--    添加位置提示信息配置模态框 -end -->

<!-- 指数提示信息详情 strat -->
    <div class="indexnumber_details container">
      <h4>指数提示信息详情</h4>
      <hr> 
      <div class="block">
        <span class="wrapper">
          <el-button type="success" @click="warn">提醒</el-button>
          <el-button type="warning" @click="notwarn">不提醒</el-button>
          <el-button type="danger" @click="del">删除</el-button>
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
          prop="newsnumber"
          label="新闻指数"
          sortable
          width="80">
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
<!-- 指数提示信息详情 end -->
  </div>
</template>

<script>

export default {
  mounted:function () {   
    $('.indexnumber').css('height',window.screen.height);
    $('.indexnumberconfig_button').hover(function(){
      $(this).css('border-color','rgb(240,173,78)');
      $(this).css('color','rgb(240,173,78)');
      $('.indexnumberconfig_hr').css('border-color','rgb(240,173,78)')
    },function(){
      $(this).css('border-color','#ccc');
      $(this).css('color','black');
      $('.indexnumberconfig_hr').css('border-color','#ccc')        
    });
  },
  data () {
    return {
      val:true,
      indexnumberconfig:[{'name':'招商银行','val':true},{'name':'招商银行银行','val':false},{'name':'招商银行招商银行','val':false},{'name':'招商银行wdadwa','val':false}],
      indexnumberconfig_dialog:false,
      indexnumberconfig_input:'',      
      tableData:[{
          keyword:'光大',
          newsnumber:'46',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:48:27',
          select:false,
          id:1
        }, {
          keyword:'光大',
          newsnumber:'4561',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:37:27',
          select:false,
          id:2
        }, {
          keyword:'光大',
          newsnumber:'6',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:47:27',
          select:false,
          id:3
        }, {
          keyword:'光大',
          newsnumber:'43356',
          title:'美媒关注中国试用军人标识牌比美军的更先进',
          position:'全国',
          medianame:'新浪财经',
          date: '2016-05-02 15:42:27',
          select:false,
          id:4
        }],
        selection: [],
        currentRow: '',
        currentPage: 1
    }
  },
  methods: {
    delindexnumberconfig (i) {
        this.$confirm('是否删除'+' '+i.name+' '+'的配置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        $.each(this.indexnumberconfig,function(j){//shanchu
          if(this.indexnumberconfig[j].name===i.name){
            this.indexnumberconfig.splice(j,1)
          }
        }.bind(this));
      }).catch(() => {        
      });
    },
    hide_indexnumberconfig () {
       $('.indexnumber_config').css('display','none')
       $('#indexnumber_hide_button').css('display','none');
       $('#indexnumber_show_button').css('display','block');
    },
    show_indexnumberconfig () {
      $('#indexnumber_hide_button').css('display','block');
      $('#indexnumber_show_button').css('display','none');
      $('.indexnumber_config').css('display','block')
    },
    add_indexnumberconfig () {
      this.indexnumberconfig.push({
        'name':this.indexnumberconfig_input ? this.indexnumberconfig_input : '无名称',
        'val':true
      })
      this.indexnumberconfig_dialog = false;
      this.indexnumberconfig_input = '';
    },
    writeindexnumberconfig () {
       alert('修改')
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
          this.selection[j].select=false
      };
      this.$refs.table.clearSelection(this.selection);      
    },
    del () {
/*      $.each(this.tableData,function(i){
        for(let t=0;t<this.selection.length;t++){
          if(this.tableData[i].id==this.selection[t].id){
            console.log(i)
          this.tableData.splice(i,1);
         }
        }      
      }.bind(this))*/
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
  .indexnumber{
    position: relative;
    .indexnumberconfig_button{
      border-top:none;
      background: snow;
      position:absolute;
      left:50%;
      margin-left:-110px;
      margin-top:-1px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      outline:none;
      padding:1px 12px;
    }
    #indexnumber_show_button{
      display:none; 
    }
  /*   配置 */
    .indexnumber_config{
      #indexnumber_btn{
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
          .fa-pencil{
            color:green;
            font-size: 14px;
            position: absolute;
            bottom:0px;
            right:0px;
            display: none; 
          }          
          .indexnumber_shu{
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
          .fa-pencil{
            display: inline-block;
          }
        }
        .indexnumber_add{
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
   .indexnumber_details{
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