<template>  
<div class="clever_content">
  <div class="container">
      <div class="container choose-type" id="app" style="padding: 0;">
   
<!-- <div class="row" style="margin-top:3%;">
    <div class="col-xs-3 text-center icons" >
        <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
            <i class="fa fa-heart" > <span></span></i>
        </a>
    </div>
    <div class="col-xs-3 text-center icons">
        <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
            <i class="fa fa-car" ><span style="padding: 10px 10px"></span> </i>
        </a>
    </div>
    <div class="col-xs-3 text-center icons">
        <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
            <i class="fa fa-building" ><span></span> </i>
        </a>
    </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-hospital-o" ><span style="padding: 10px 15px;"></span> </i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-flag" ><span></span> </i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-university"  > <span > </span></i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-line-chart" > <span></span></i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-futbol-o" > <span></span></i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-apple" > <span style="padding:10px 10px"> </span></i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-list-alt" ><span style="padding:10px 20px;"></span> </i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-heart" > <span></span></i>
       </a>
   </div>
   <div class="col-xs-3 text-center icons">
       <a href="#/index/clever/clever_content_next" class="icon" style="box-sizing: border-box;">
           <i class="fa fa-chain" ><span style="padding:10px 15px;"></span> </i>
       </a>
   </div>
</div> -->  
           <div class="scale" style="background-color: #f6a623;position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
               <img src="../../assets/icon/all.png" style="position: absolute;top:35px;left:45px;">
               <p style="position: absolute;top:90px;left:48px;font-size: 21px;color: white;">{{type[0].type}}</p>
           </div>
           <div  class="translate" style="display: inline-block;margin-top: 40px;position:relative;margin-left: 77px;margin-top: 40px;">
               <div style="border:1px solid #00b38a;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                   <img src="../../assets/icon/bank.png" style="position: absolute;top:61px;left:22px;"> 
               </div>
               <p style="position: absolute;top:14px;left:95px;font-size: 21px;color: black;background-color:white;z-index: 999">{{type[1].type}}</p>
            </div>
           <div class="scale" style="background-color: #3498db;position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
               <img src="../../assets/icon/car.png" style="position: absolute;top:35px;left:45px;">
               <p style="position: absolute;top:90px;left:50px;font-size: 21px;color: white;">{{type[2].type}}</p>
           </div> 
           <!-- <div class="translate"  style="position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;">
                             <div style="border:1px solid #f6a623;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                                 <img src="../../assets/icon/jinrong.png" style="position: absolute;top:61px;left:30px;">
                             </div> 
                             <p style="position: absolute;top:14px;left:95px;font-size: 21px;color: black;background-color:white;z-index: 999">{{type[3].type}}</p>
                         </div>   
                         <div class="scale" style="background-color: #fc5128;position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <img src="../../assets/icon/car.png" style="position: absolute;top:35px;left:39px;">
                             <p style="position: absolute;top:90px;left:50px;font-size: 21px;color: white;">{{type[4].type}}</p>
                         </div> 
                         <div class="translate"  style="position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <div style="border:1px solid #3498db;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                                 <img src="../../assets/icon/lvyou.png" style="position: absolute;top:61px;left:30px;">
                             </div> 
                             <p style="position: absolute;top:14px;left:95px;font-size: 21px;color: black;z-index: 999;background-color: white;">{{type[5].type}}</p>
                         </div>
                         <div class="translate" style="position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <div style="border:1px solid #fc5128;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                                 <img src="../../assets/icon/shiyao.png" style="position: absolute;top:61px;left:38px;">
                             </div> 
                             <p style="position: absolute;top:14px;left:95px;font-size: 21px;color: black;z-index: 999;background-color: white;">{{type[6].type}}</p>
                         </div>    
                         <div class="scale" style="background-color:#f6a623;position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <img src="../../assets/icon/zhengfu.png" style="position: absolute;top:35px;left:39px;">
                             <p style="position: absolute;top:90px;left:50px;font-size: 21px;color: white;">{{type[7].type}}</p>
                         </div> 
                         <div class="translate" style="position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <div style="border:1px solid #00b38a;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                                 <img src="../../assets/icon/keyan.png" style="position: absolute;top:63px;left:32px;width:56%;">
                             </div> 
                             <p style="position: absolute;top:14px;left:95px;font-size: 21px;color: black;z-index: 999;background-color: white;">{{type[8].type}}</p>
                         </div> 
                         <div class="scale" style="background-color:#3498db;position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;" >
                             <img src="../../assets/icon/zimeiti.png" style="position: absolute;top:32px;left:43px;">
                             <p style="position: absolute;top:90px;left:38px;font-size: 21px;color: white;">{{type[9].type}}</p>
                         </div> 
                         <div class="translate" style="position: relative;display: inline-block;margin-left: 77px;margin-top: 40px;width: 150px" >
                             <div style="border:1px solid #f6a623;position: relative;display: inline-block;overflow: hidden;z-index: 999" >
                                 <img src="../../assets/icon/chuban.png" style="position: absolute;top:63px;left:32px;width:61%;">
                             </div> 
                             <p style="position: absolute;top:10px;left:66px;font-size: 21px;color: black;z-index: 999;background-color: white;">{{type[10].type}}</p>
                         </div> 
                         <div class="scale" style="background-color:#fc5128;;position: relative;display: inline-block;margin-left: 64px;margin-top: 40px;" >
                             <img src="../../assets/icon/qiye.png" style="position: absolute;top:32px;left:38px;">
                             <p style="position: absolute;top:90px;left:49px;font-size: 21px;color: white;">{{type[11].type}}</p>
                         </div>  -->              
           <h5 class="text-center" id="source"></h5>
      </div>
    </div>  
    <el-dialog title="添加项目" :visible.sync="dialogVisible"  id="dialog_add">
      <clevernext></clevernext>
      <el-button @click="dialogVisible = false" style="left: 34%;color:white;background-color:#f6a623;border-color: #f6a623;padding: 9px 16px;position: absolute;bottom: 10px;bottom: 28px;">取 消</el-button>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="margin-right: 10%;color:white;background-color:#f6a623;border-color: #f6a623;padding: 7px 15px; ">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" style="margin-right: 35%;background-color:#00b38a;border-color: #00b38a;padding: 7px 15px;">确 定</el-button>
      </span> -->
    </el-dialog>
</div>  
</template>
<script >
import clevernext from './clever_content_next.vue'
//import { index_clever } from '../../assets/js/index_clever.js'
  export default{
    data : function(){ 
        return{
            type:[{type:'全部',data:'0'},{type:'银行',data:'2'},{type:'汽车',data:'1'},{type:'金融',data:'1'},{type:'汽车',data:'1'},{type:'旅游',data:'1'},{type:'食药',data:'1'},{type:'政府',data:'1'},{type:'科研',data:'1'},{type:'自媒体',data:'1'},{type:'出版监管',data:'1'},{type:'企业',data:'1'},],
            dialogVisible:false,
            time:0
        }
    },
    components:{
        clevernext
    },
/*    created : function () {
      //window.localStorage.setItem('sj',JSON.stringify(this.items)) 
    },*/
    methods:{

    },
    computed:{
      
    },
    mounted:function () {
      let _this=this;
      $('.choose-type .translate').hover(function(){
        $(this).find('img').css('top','37px')
      },function(){
        $(this).find('img').css('top','61px')
      })
      $('.choose-type .scale').hover(function(){
        $(this).find('img').css('transform','scale(1.2)')
      },function(){
        $(this).find('img').css('transform','scale(1)')
      });
      $('.choose-type>div').click(function(){
        let index=$(this).index();
        let simpleModelId=_this.type[index].data;
        window.sessionStorage.setItem('simpleModelId',simpleModelId)
        _this.dialogVisible=true;   
       })
      $('.el-dialog__headerbtn').click(function(){
        _this.dialogVisible=false;
      })
    }
  }
</script>
<style lang="scss" >
.clever_content{
  button:hover{
        opacity: 0.8;
      }
    .choose-type{
       div{
            width: 137px;
            height: 137px;
            border-radius: 50%;
            cursor: pointer;
            img{
                -webkit-transition: all 1s;
                -moz-transition:all 1s;  
                -ms-transition:all 1s;  
            }
        }
    }
    .choose-type>div:nth-child(1){
        margin-left: 0px !important;
    }
    .choose-type>div:nth-child(7){
        margin-left: 0px !important;
    }
    #dialog_add{
      .el-dialog{
        .el-dialog__body{
        padding: 10px 0px 30px 0px;
      }
        .el-dialog__header{
        height: 44px;
        background: #00b38a;
        padding: 10px 0;
        text-align: center;
          .el-dialog__title{
            color: white;
            font-size: 18px;
            line-height: 22px;
            padding-left: 10px;
            font-weight: 500 !important;
          }
          .el-dialog__headerbtn{
            top: 13px;
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
    }
  /* .choose-type .icons{
    margin:2rem 0 2.5rem;
    -webkit-transition: all 1s;
    -moz-transition:all 1s;  
    -ms-transition:all 1s;      
      i{
        font-size: 7rem;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        >span{
          position: absolute;
          width:100%;
          height:100%;
          top:0;
          left:0;
          opacity: 0;
          transition: all 1s;
          border-radius: 50%; 
          font-size: 2rem; 
          padding: 10px 20px; 
        }
      }
  } */
} 
</style>