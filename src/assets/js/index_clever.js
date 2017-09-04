export function index_clever () {
    let arr = [
            [0, 1, 2]
        ];

    function Moving() {
        this.index = $(this).index();
        //console.log(this.index)
        //点击下标所在数组
        this.arr = () => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(this.index) != -1) {
                    return arr[i];
                }
            }
        };
        //对应数组位置
        this.m = arr.indexOf(this.arr());
        //数组里元素对应的位置
        this.n = this.arr().indexOf(this.index);

        //transform
        this.change = $(this).css({
            'transform':'scale(1.3)'
        });
        this.change1=$(this).find("span").css({
                    'opacity':'0.7',
                    'background':quse()
        })
        this.change1=$(this).find("i").css('color','white')
        //水平
        this.moveHorizon = (() => {
            for (let i = 0; i < this.arr().length; i++) {
                if (i < this.n) {
                    $('.icons').eq(this.arr()[i]).css('transform', 'translate(-20px)')
                }
                if (i > this.n) {
                    $('.icons').eq(this.arr()[i]).css('transform', 'translate(20px)')
                }
            }
        })();
        //竖直方向
        this.moveVertical = (() => {
            for (let i = 0; i < arr.length; i++) {
                if (i < this.m) {
                    $('.icons').eq(arr[i][this.n]).css('transform', 'translate(0,-20px)')
                }
                if (i > this.m) {
                    $('.icons').eq(arr[i][this.n]).css('transform', 'translate(0,20px)')
                }
            }
        })();
        //随机色
        function quse(){
            var str='#';
            for(var i=0;i<6;i++){
                str+=parseInt(Math.random()*16).toString(16)
            };
            return str;
        }
        //右边内容区域
        this.content = function(j) {
            switch (j) {
                case 0:
                    return [ '全部','(注：所选信息来源为 全部。)',0];
                case 1:
                    return [ '&nbsp;&nbsp 汽&nbsp;&nbsp;&nbsp; 车','(注：所选信息来源为 汽车。)',1];
                case 2:
                    return [ '银行','(注：所选信息来源为 银行。)',2];
                case 3:
                    return [ '医院','(注：所选信息来源为 新闻。)'];
                case 4:
                    return ['&nbsp学&nbsp; 校','(注：所选信息来源为 新闻。)'];
                case 5:
                    return ['&nbsp单&nbsp; 位','(注：所选信息来源为 微信,新闻。)'];
                case 6:
                    return [ '&nbsp股&nbsp; 票','(注：所选信息来源为 新闻。)'];
                case 7:
                    return [ '&nbsp体&nbsp; 育','(注：所选信息来源为 微信,新闻。)'];
                case 8:
                    return ['&nbsp品&nbsp; 牌','(注：所选信息来源为 新闻。)'];
                case 9:
                    return [ '事件','(注：所选信息来源为 新闻。)'];
                case 10:
                    return [ '&nbsp兴&nbsp; 趣','(注：所选信息来源为 微信,新闻。)'];
                case 11:
                    return [ '&nbsp其&nbsp; 他','(注：所选信息来源为 新闻。)']
            }
        }
       $(this).find("span").addClass('animated flip')
        $('#source').html(this.content(this.index)[1]);
        let simpleModelId=this.content(this.index)[2];
        window.sessionStorage.setItem('simpleModelId',JSON.stringify(simpleModelId));
        $(this).find("span").html(this.content(this.index)[0]);
    }
    $('.icons').hover(Moving, function() {
        $('.icons').css({
            transform: 'translate(0) scale(1)'
        });
        $(this).find("span").removeClass('flip');
        $(this).find("span").css('opacity','0');
        $(this).find("i").css('color','#428bca');
        $('#source').html('');
    });
    $('.icons').click(function(){
        //$('#choose-lable').html(this.content(this.index)[0]);
        //onsole.log(this.$router)
        //this.$router.go('/index/clever/clever_content_next');
    })

}