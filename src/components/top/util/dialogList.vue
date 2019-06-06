<template>  
<div class="dialogList">
    <el-dialog :title="listData.title" :visible.sync="listData.switch" width="580px !important" custom-class="ev_dialogClass">
        <el-input           
            placeholder="输入查找的内容.."
            v-model="search_input">
        </el-input>
        <hr v-show="data.length == 0">
        <h4 v-show="data.length == 0">暂无数据</h4>
        <div v-if="data.length != 0">
            <el-table
                :data="data"
                stripe
                @row-click="toSend"
                style="width: 100%;text-align:center;margin-top:20px">
                <el-table-column
                :label="listData.mainName"
                style="width: 100%;text-align:center"
                show-overflow-tooltip>
                    <template scope="scope">{{ scope.row[listData.key] }}</template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="page"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="listData.pageSize"
                :pager-count="listData.pagerCount"
                layout="total,  prev, pager, next"
                :total="listData.data.length"
                v-show="listData.data.length !== 0 && search_input.trim() == ''">
            </el-pagination>
        </div>
    </el-dialog>
</div> 
</template>
<script >
import {deepCopy}  from '../../../assets/js/map.js'
  export default{
    props: ['listData'],
    data : function(){ 
        return{
            data:[], //列表表格数据
            currentPage:1, //当前页码
            search_input:'' //搜索框
        }
    },
    methods:{
        handleCurrentChange(val,data = this.listData.data ){ //页面变化方法
            this.currentPage = val;
            this.data = data.length > (val - 1) * this.listData.pageSize ? data.slice((val - 1) * this.listData.pageSize , (val - 1) * this.listData.pageSize + this.listData.pageSize) : data;
        },
        toSend(val){//向父组件传递
            this.$emit('receiveFromDialoglist',val)
            this.search_input = '';
            this.listData.switch = false
        }
    },
    watch: {
        listData: { //监听列表数据
            handler(val) {
                this.search_input = '';
                this.data = deepCopy(val.data)
                this.handleCurrentChange(this.currentPage)               
            },
            deep: true,
            //immediate:true  //是否立即执行  
        },
        search_input(val){ //监听输入框的数据
            this.data = val ? this.listData.data.filter(item => item[this.listData.key].toLowerCase().indexOf(val.toLowerCase()) != -1 ) : this.listData.data
            this.handleCurrentChange(this.currentPage,this.data)                  
        }
    },
  }
</script>
<style lang="scss">
.dialogList{
    .el-input, .el-input__inner{
        width: 200px;
        height: 24px;
    }
    ::-webkit-input-placeholder {/*Chrome/Safari*/
      color:#ccc;
      font-size: 14px;
      }
      ::-moz-input-placeholder {/*Firefox*/
      color:#ccc;
      font-size: 14px;
    }
    .el-input__inner:focus{
        border-color: #00b38a;
    }
    .el-input__inner:hover{
        border-color: #00b38a;
    }
    .el-dialog__body{
        text-align: center;
        padding:10px 60px 15px 60px;
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
        td{
            padding: 2px;
            cursor:pointer
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


</style>