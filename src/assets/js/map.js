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

export function jsonToStrMap (jsonStr) { 
      return new Map(JSON.parse(jsonStr));
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

export function GetLocalStorage(data){ return JSON.parse(window.localStorage.getItem(data))} //获取localStorage方法      

export function SetSessionStorage(name,data){ window.sessionStorage.setItem(name,JSON.stringify(data))} //存储localStorage方法  

export function SetLocalStorage(name,data){ window.localStorage.setItem(name,JSON.stringify(data))} //存储sessionStorage方法  

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

export function similar(data,cp_data,key){//两个对象选取重复的字段然后返回一个数组
        let own=[],cp=[];
        for(let i of data){
          own.push(i[key])
        };
        for(let i of cp_data){
          cp.push(i[key])
        };
        return Array.from(new Set([...new Set(own)].filter(x => new Set(cp).has(x))));
      }

export function changePage(_this,dta,pageSize,pageNum){//页码变化方法
  //console.log(pageNum)
    return new Promise( (resolve,reject) => {
        $.ajax({
            type: "GET",
            url: 'rsa/project/'+GetSessionStorage('project_id')+'/reputationindex/topic/'+dta.id+'/article',
            data: {
              "method": 'GET',
              "topicId": dta.id, //议题id
              "articleType": _this.articleType, //文章类型
              "pageSize": pageSize,//每页数量
              "pageNum": pageNum //页码
            },
            success:function(res){
                resolve(res)
            },
            fail:function(err){
                reject(err);
            }
        })
    })  
}

export function publicSearch(url,method,params){//通用search方法
    url = '/'+url;
    return new Promise( (resolve,reject) => {
        $.ajax({
            type:method,
            url,
            data: params,
            success:function(res){
              resolve(res)
            },
            error:function(err){
              reject(err);
            }
        })
    }) 
}  

export function successBack(data,_this){//判断成功回调
    if(data.code == 200){
        return true;
    }else if(data.code == 1000){//未登录
        _this.$router.push('/login')
        //window.location.href='/login'
        notify('提示',data.message,'warning',_this)
        return false;
    }else if(data.code == 1001){//已登录
      console.log(_this.$route)
        if(_this.$route.path == '/login'){//已登录在登录页面
          SetLocalStorage('account_A',data.data.account);//
          //_this.$router.push('main/refer')
          //window.location.href = 'main/refer';
          tipsMessage(data.message,'success',_this); 
          return false;
        }else{//已登录不在登录页面 就继续执行原页面的方法
          return true;
        }
    }else if(data.code == 1008){//注销用户
        notify('提示',data.message,'success',_this);
        _this.$router.push('/login')
        //window.location.href = '/login';
        window.sessionStorage.clear();
        localStorage.clear();
        return false;
    }else if(data.code == 1308){//项目列表小于一自动跳转添加项目模块
        _this.$router.push('/index/clever')
        window.location.href='/index/clever';
        return false;
    }else{
        tipsMessage(data.message,'warning',_this)
        return false;
    }
};

export function notify(title,message,type,_this){//通知
  return _this.$notify({
          title,
          message,
          type
        });
}  

export function tipsMessage(message,type,_this){//提示
  return _this.$message({
          message,
          type
        });
}


