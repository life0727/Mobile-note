<template>
  <div>
  <p>{{childMsg}}</p>
    <div class="block" style="display: inline-block;margin-left: 9px !important;">
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
  </div>  
</template>
<script>
import { date_change }  from '../../assets/js/map.js'
export default {
  mounted:function () {  
  console.log(this.childMsg) 
  },
  data () {
    return {
       edit:false, 
       time:this.childMsg /*== '' ? this.$store.state.refer_time == '' ? [new Date(new Date().getTime()-604800000), new Date()] : this.$store.state.refer_time : this.childMsg,*/
    }
  },
  props:['childMsg'],
  methods: {
    date_change () { date_change(this); this.$emit('up',this.time); }
  }
}
</script>

<style lang="scss" >

</style>