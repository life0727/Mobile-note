<template>  
    <span class="datePicker">
        <div class="block" style="display: inline-block" >
            <el-date-picker
                @change="date_change"
                :editable="edit"
                :clearable="edit"
                style="position: relative;width:170px;font-size: 12px;margin-left:25px;"
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
    </span> 
</template>
<script >
import {deepCopy,date_change}  from '../../../assets/js/map.js'
  export default{
    data : function(){ 
        return{
            edit:false, //是否手动修改日期
            time:[new Date(new Date().getTime()-604800000), new Date()],
        }
    },
    methods:{
        date_change (){ //时间变化后的事件
           date_change.call(this);
        },
    },
    watch: {

    },
  }
</script>
<style lang="scss">


</style>