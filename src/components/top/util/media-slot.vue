<template>  
    <el-popover
        placement="bottom"
        @hide="dom_search"
        width="450"
        :disabled="mediaDATA.btn_disabled"
        v-model="domin_popover"
        trigger="click">
        <div class="btn-group domain" role="group" aria-label="..." style="">
        <button type="button" :class="domainSelect.length == domain.length ? 'btn warning' : 'btn'" @click="allSelect(this)" style="margin:5px 3px;border-radius: 3px;padding: 2px 10px;">全部</button>
        <button type="button" style="margin: 5px 3px;border-radius: 3px;padding: 2px 10px;" :class="i.isSelect ? 'btn warning' : 'btn'" @click="domain_click(i)"  v-for="(i) in domain" :key="i">{{i.name}}</button>
        </div>
        <hr style="margin: 10px 0;">
        <el-button type="success" size="large"  style="padding: 5px 20px;font-size: 14px;margin-left: 345px;background-color:  #00b38a;border-color:  #00b38a;border-radius: 4px !important;"  @click="dom_search" >确定</el-button>
        <span style="position: absolute;left: 313px;line-height: 45px;cursor: pointer;z-index:5" slot="reference">媒体分类 <i :class="domin_popover ? 'fa fa-angle-up' : 'fa fa-angle-down'" style="margin-left: 2px;"></i></span>
    </el-popover>
</template>
<script >
import { publicSearch,successBack }  from '../../../assets/js/map.js'
  export default{
    props: ['mediaDATA'],
    data : function(){ 
        return{
            domin_popover : false, //是否可以显示
            domain:[],//全部媒体分类
            domainSelect:[] //选择媒体分类
        }
    },
    mounted() { //页面加载完成时获取所有媒体分类
        publicSearch('rsa/wxaccount/domain',"GET",{"method":"get"}).then((data) =>{//ajax
            if(!successBack(data,this)) return;
            data.data.forEach(item => {
                this.domain.push(Object.assign({},{name:item,isSelect:false}))
            });
        });
    },  
    methods:{
        allSelect(){ //全选操作
            if(this.domainSelect.length == this.domain.length){ //全部选中了
                this.domain.forEach(i => {i.isSelect = false});
                this.domainSelect = [];
            }else{
                this.domainSelect = [];
                this.domain.forEach(i => {
                    i.isSelect = true;
                    this.domainSelect.push(i.name)
                });
            }
        },
        dom_search(){ //确定选中的操作
            this.domin_popover = false;
            this.$emit('receiveFromMediaSlot',this.domainSelect.length == this.domain.length ? [] : this.domainSelect) //默认空值是全部
        },
        domain_click(item){ //点击媒体按钮的操作
            this.domainSelect = [];
            item.isSelect = !item.isSelect;
            this.domain.forEach(i => {
                i.isSelect && this.domainSelect.push(i.name)
            })
        },
    },
    watch: {

    },
  }
</script>
<style lang="scss">


</style>