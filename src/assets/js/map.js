export function Map () { //通用map方法
              this.data = new Object();
              this.put = function (key, value) {
                  this.data[key] = value;
              };
              this.get = function (key) {
                  return this.data[key];
              };
              this.remove = function (key) {
                  this.data[key] = null;
              };
              this.isEmpty = function () {
                  return this.data.length == 0;
              };
              this.size = function () {
                  return this.data.length;
              };
          }

export function filter_polar(data,mapData){  //地图省份数据且过滤（'正，中，负'）后的数据
        for( let l in mapData){
            let obj = new Object();
            if(l !== '正'&&l !== '中'&&l !== '负'){
              obj.province=l;
              obj.num=mapData[l];
              data.push(obj);
            }   
        }
      }

export function date_change (_this){ //Time = _this.time //通用验证时间方法
        Date.prototype.toJSON = function () { return this.toLocaleString(); }
        if(_this.time[0]==undefined||_this.time[1]==undefined||_this.time[1].getTime()<_this.time[0].getTime()){
          _this.time=[new Date(new Date().getTime()-604800000), new Date()];
          _this.$message({
              message: '请检查您的时间格式',
              type: 'warning'
            });
         }
      }

export function Sort(property){ //数组对象排序方法升序 news_top.sort(_Sort('num'));
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value1 - value2;
                            }
                        }

export function _Sort(property){  //数组对象排序方法倒序 data.sort(_Sort('num'));
                            return function(a,b){
                                var value1 = a[property];
                                var value2 = b[property];
                                return value2 - value1;
                            }
                        };   

export function Sort_up(property,c){ //数组对象排序方法升序 data.sort(Sort_down('article','publishTime'));
          return function(a,b){
              var value1 = a[property][c];
              var value2 = b[property][c];
              return value1 - value2;
          }
        }

export function Sort_down(property,c){  //数组对象排序方法倒序 data.sort(Sort_down('article','publishTime'));
          return function(a,b){
              var value1 = a[property][c];
              var value2 = b[property][c];
              return value2 - value1;
          }
        }                          

export function GetSessionStorage(data){ return JSON.parse(window.sessionStorage.getItem(data))} //获取sessionStorage方法      

export function SetSessionStorage(name,data){ window.sessionStorage.setItem(name,JSON.stringify(data))} //存储sessionStorage方法  

export function format_time () {  //通用格式化数据时间戳,时间格式方法
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
    }

