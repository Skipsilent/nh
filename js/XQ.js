 /**
 * Created by XQ ,this is building.
 * 需要jq
 */
/*
    jq插件：

 */
(function ($) {
    //上下居中
    $.fn.alignMid = function (options) { //定义插件的名称，这里为userCp
        var dft = {
            //以下为该插件的属性及其默认值
            ways: "margin-top", //
            error: 0 ,//
            call:function(){ return false}
        };
        var ops = $.extend(dft, options);
        var h_2 = $(this).height();
        var h_1 = $(this).parent().height();
        $(this).css(ops.ways, (h_1 - h_2) / 2 + ops.error);
        ops.call();
    }
    //两边居中
    $.fn.alignCenter= function (options) { //定义插件的名称，这里为userCp
        var dft = {
            //以下为该插件的属性及其默认值
            float:'left',
            error: 0 ,//
            call:function(){ return false}
        };
        var ops = $.extend(dft, options);
        $(this).children().css('float',ops.float)
      if(ops.float=='left'){
             $(this).children(":first-child").css('margin-left','0')
             $(this).children(":last-child").css('margin-right','0');
      }else if(ops.float=='right'){
          $(this).children(":first-child").css('margin-right','0');
          $(this).children(":last-child").css('margin-left','0');
      }
        var w=0;
        $(this).children().each(function(){
            w+=parseInt($(this).width())+parseInt($(this).css('margin-left'))+parseInt($(this).css('margin-right'));
        });
        var w_=w+ops.error;
        $(this).width(w_);
        $(this).css('margin','0 auto');
        ops.call();
    }
    //弹性盒子；水平均分width；way:
    $.fn.flexbox=function(options){
        var dtf={
          width:false,
          autowidth:true,
          way:'margin',
    resize:false,
          call:function(){return false}
        };
        var ops=$.extend(dtf,options);
        var obj=$(this);
          var w_,w_num=0,a;
        ops.width?w_=ops.width: w_=$(this).width();
     $(this).css({'box-sizing':'border-box','margin':0});
        var child_w_max=0;
        $(this).children().each(function(){
            if(child_w_max<$(this).width()){
              child_w_max=$(this).width();
            }
            w_num+=parseInt($(this).width());
        });
      $(this).children().css('text-align','center');
      var child_size=$(this).children().size();
      if(ops.autowidth){
            $(this).children().width(child_w_max);
            a=(w_ - child_size*child_w_max)/child_size/2;
        }else{a=(w_ - w_num)/child_size/2;}
        if(ops.way=='padding'){      
        obj.children().css({'padding-left':a,'padding-right':a})
          }else if(ops.way=='margin'){
         obj.children().css({'margin-left':a,'margin-right':a})
    }
      if(ops.resize){
          $(window).resize(function(){obj.flexbox()})
      }
}
})(jQuery);

    XQ = new Object();
   XQ.$=function(a){
        var $a=$(a);
        return $a
    };
    // 1,判断是否含有就是class
    XQ.hasclass = function (obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };
    // 2,移除class
    XQ.removeclass = function (obj, cls) {
        if (XQ.hasclass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    };
    // 3,添加class
    XQ.addclass = function (obj, cls) {
        if (!XQ.hasclass(obj, cls)) obj.className += " " + cls;
    };
    //.3.1找父级元素；
    XQ.part = function (v, e, a) {//v是本节点，e是父节点类；a是回调函数
        var flag = false; var chlid;
        while (flag) {
            v = v.parentNode;
            flag = XQ.hasclass(v, e);
            //x_a = v.className;
            chlid = '.' + x_a;
        }
        if (a) { a() }
        return chlid;
    }
    // 4,设置宽度随子集变化
XQ.autoWidth=function(a,b){//a是父级,b是子集;
        setTimeout(function(){var num=0;
            if(b){
                XQ.$(b).each(function(){
                    num+=$(this).width();
                });
                XQ.$(a).width(num);
                num=0;
            }else {
                XQ.$(a).children().each(function () {
                    num += $(this).width();
                });
                XQ.$(a).width(num);
                num=0;
            }
        },20)
    };
//5,窗体宽度
XQ.WinW=function(){
    var w=window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    return w
}
//6,窗体高度
XQ.WinH=function(){
    var h=window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    return h
}
 //7, 赋值窗口宽度
   XQ.autoWinW=function(a){//a是元素
    XQ.$(a).width(XQ.WinW())
};
    // 8,赋值窗口高度
  XQ.autoWinH=function(a){
    XQ.$(a).height(XQ.WinH())
};
//9,回顶部
XQ.goTop=function(a,b){//a是元素，b是距离；
     XQ.scrollShow(a, b);
    XQ.$(a).on('click',function(){
        $('html,body').animate({'scrollTop':'0'},500)
    })
}
//9.1,回顶部
 XQ.scrollShow = function (a, b) {//a是元素，b是距离；
     XQ.$(a).hide();
        var c;
        b ? c = b : c = 0.5;
        $(window).on('scroll', function () {
            var S_t = $(window).scrollTop()
            if (S_t >= XQ.WinH() * c) {
                XQ.$(a).stop(true, true).fadeIn();
            } else { XQ.$(a).stop(true, true).fadeOut() }
        })
    }
//9,获取滚动条高度
XQ.scrollTop=function(){
            var scrollTop=0;
        if(document.documentElement&&document.documentElement.scrollTop)
        {
        scrollTop=document.documentElement.scrollTop;
        }
        else if(document.body)
        {
        scrollTop=document.body.scrollTop;
        }
        return scrollTop;
}
//10,banner渐隐渐现
XQ.banFade=function  (a,b,c,d) {//a 是父级，b是子集，c是间隔时间，d是从第几个开始
    var leng=$(a).find(b).size();
    var i=0;
    if(d){i=d};
    setTimeout(function () {ban(i)},c);
    function ban (e) {
       $(a).find(b).eq(e).fadeOut(800);
       if(e>=leng-1){e=0}else{e++};
        $(a).find(b).eq(e).delay(400).fadeIn(800);
        setTimeout(function () {ban(e)},c);
    }
}

//10多选框
    XQ.checkbox = function (a, aa, b, c, d, dd, ddd, e, f, g, h) {//a=父级 aa=label的父级 b=label（label 子集是input）  c=数量 d=全选 dd=总额 ddd=总数量 e=label选中class f=label取消calss g=是否全选 h=回调函数（课返回返回选中的index值）
        //初始化是否全选
        
        if (g) {
            $(a).find(b).each(function () {
                $(this).removeClass(f).addClass(e).find('input').attr('checked', true);
            })
            $(d).removeClass(f).addClass(e).find('input').attr('checked', true);
        }
        fuzhi();
        //单选单则
        $(a).find(aa).find(b).on('tap', function () {
            if ($(this).find('input').is(':checked')) {
                $(this).removeClass(e).addClass(f);
            } else {
                $(this).removeClass(f).addClass(e);
            }
             fuzhi()
         });
          $(d).on('click', function () {
            if (!$(this).find('input').is(':checked')) {
                $(this).removeClass(e).addClass(f);
                $(a).find(aa).find(b).removeClass(e).addClass(f);
                $(a).find(aa).find(b).find('input').prop('checked',false); 
            } else {
                $(this).removeClass(f).addClass(e);
                $(a).find(aa).find(b).removeClass(f).addClass(e);
                $(a).find(aa).find(b).find('input').prop('checked', true);
            }
            fuzhi()
        });
          //赋值
        function fuzhi() {
            var ab = 0, ac = 0, ad = 0, ae = new Array();
            $(a).find(aa).each(function () {
                ad++;
                if ($(this).find(b).hasClass(e)) {
                    ab += parseInt($(this).find(c).text());
                    ac++;
                    ae[ac-1] = $(this).index();
                }
                $(dd).text(ab.toFixed(2));
                $(ddd).text(ac);
            })
            if (ac == ad && ac!=0) {
                $(d).removeClass(f).addClass(e);
                $(d).find('input').prop('checked', true);
            } else {
                $(d).removeClass(e).addClass(f);
                $(d).find('input').prop('checked', false);
            }
            if (h) { h(ae) }//返回选中的index值
        }
    }
//11设置cookie
XQ.setCookie=function (name, value, iDay,timetype) {//name是cookie的名字；value是cookie内容信息；iDay是存活时间；timetype=day
    var oDate = new Date();
    iDay ? iDay : iDay = 1;
    if (timetype == 'day' && timetype) {
        oDate.setDate(oDate.getDate() + iDay);
    } else
    {
        oDate.setTime(oDate.getTime() + iDay * 60 * 1000);
    }
    document.cookie = name+'='+value+';expires='+oDate;
    }
//12获取cookie
XQ.getCookie=function (name) {
    var arr = document.cookie.split('; ');
     for (var i = arr.length - 1; i >= 0; i--) {
        var arr2 = arr[i].split('=');
        if(arr2[0]===name){
             return arr2[1];
            }
    }
    return '';
}
//13移除cookie
XQ.removeCookie=function (name) {
    XQ.setCookie(name,1,-1)
} 
//14综合cookie
XQ.Cookie = function(name, value, options) {//name是cookie的名字；value是cookie内容信息；iDay是存活时间
        // 如果第二个参数存在
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                // 设置失效时间
                options.expires = -1;
            }
            var expires = '';
            // 如果存在事件参数项，并且类型为 number，或者具体的时间，那么分别设置事件
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '', // 设置路径
                domain = options.domain ? '; domain=' + options.domain : '', // 设置域 
                secure = options.secure ? '; secure' : ''; // 设置安全措施，为 true 则直接设置，否则为空

            // 把所有字符串信息都存入数组，然后调用 join() 方法转换为字符串，并写入 Cookie 信息
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join(''); 
        } else { // 如果第二个参数不存在
            var CookieValue = null;
            if (document.cookie && document.cookie != '') {
                var Cookie = document.cookie.split(';');
                for (var i = 0; i < Cookies.length; i++) {
                    var Cookie = (Cookie[i] || "").replace( /^\s+|\s+$/g, "");
                    if (Cookie.substring(0, name.length + 1) == (name + '=')) {
                        CookieValue = decodeURIComponent(Cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return CookieValue;
        }
    }
    //15  想上滚动
    XQ.banSwipt = function (a, b, c, d,dd,e) {//a=运行的父级，b=运行标签，c=间隔时间（ms），d=父级高度,dd=滚动误差,e=回调函数
        $(a).parent().css({ 'overflow': 'hidden', 'height':d});
        //$(b).css('margin-bottom', '20px');
        setTimeout(function () {
            swipt()
        }, c);
        function swipt() {
            $(a).animate({ 'margin-top': -$(b).height()-dd }, 500, function () {
                $(a).find(b).eq(0).appendTo($(a));
                $(a).css('margin-top', 0);
            })
            setTimeout(function () {
                swipt()
            }, c);
        }
    }
    //16、点击显示隐藏；
    XQ.clickShow=function(a,b,c,d){//a是点击显示按钮，b是点击隐藏按钮，c是执行元素，d是回调函数
        var flag =false;
        $(a).click(function(){
            if(!flag){
               for(arr in c){
                 $(c[arr]).fadeIn();
               }
               flag =true;
               if(d)setTimeout(d,400);
            }
        });
          $(b).click(function(){
            if(flag){
                 for(arr in c){
                 $(c[arr]).fadeOut();
               }
               flag=false;if(d)setTimeout(d,400);
            }
        });
    }
    //17判断手机或者pc
XQ.moborpc = function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)

}