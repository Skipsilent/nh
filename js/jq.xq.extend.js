/*
 *jq.xq的插件库-----v0.0.1
 *需要配合jquery;
 *alignMid();是上下居中；使用方法:alignMid({[ways],[error],[call]}),带有[]的是可选参数;ways可选，margin-top，padding-top；
 * 
 */ 
(function ($) {
 //img全屏显示图片缩放
   $.fn.fullimg=function (options){
                  var dft={
                class:'fullimg',//图片新建容器的类名
                width:null,//图片缩放宽度，可以是'auto' 'window'
                height:null,//图片缩放高度，可以是'auto' 'window'
                fullScreen:false,//是否是整屏
                resize:false,//是否随屏幕尺寸改变时改变
                align:'center',//对齐方式,显示图片的 center、left、right
                vertical:'mid',//垂直对齐方式，显示图片的top mid  bottom
                stretch:false,//是否拉伸
                call:function  () {return false}
              }
              var ops=$.extend(dft,options);
              var _this=$(this),width_img,height_img;
               if(!_this.siblings().hasClass(ops.class)){
                  _this.parent().prepend('<div class="'+ops.class+'"><div></div></div>');
              }
              //非全屏显示
              function no_fullscr () {//非全屏下图片显示
                ops.width=='window'?width_img=$(window).width():width_img=ops.width;
                ops.height=='window'?height_img=$(window).height():height_img=ops.height;
                  var _width=_this.width(),_height=_this.height(),width_=_width-width_img,height_=_height-height_img;
                
                 if(!(ops.width=='auto'||ops.height=='auto')){
                  ////console.log(width_,height_);
                           if(width_<=height_){
                               _this.width(width_img);_this.height('auto');
                              } else if(height_<width_){
                                    _this.height(height_img);_this.width('auto');
                              };
                           if(width_<=0 || height_<=0){
                                if(ops.stretch){
                                   _this.css('min-height',height_img);_this.css('min-width',width_img);
                                }
                           }
                 }else{
                         _this.height(height_img);_this.width(width_img);
                 }
                 if(!ops.fullScreen){//非全屏显示时的图的容器尺寸；
                   $('.'+ops.class).css({'width':width_img,'height':height_img,'overflow':'hidden','position':'relative'}).find('div').css({'width':_this.width(),'height':_this.height(),'position':'absolute'}).html('').append(_this);
                  switch(ops.align){
                        case 'left':
                              $('.'+ops.class).find('div').css({'left':'0'})
                            break;
                        case 'center':
                              $('.'+ops.class).find('div').css({'left':'50%','margin-left':-_this.width()/2})
                            break;
                        case 'right':
                              $('.'+ops.class).find('div').css({'right':'0'})
                            break;
                        };
                        switch(ops.vertical){
                        case 'top':
                              $('.'+ops.class).find('div').css({'top':'0'})
                            break;
                        case 'mid':
                              $('.'+ops.class).find('div').css({'top':'50%','margin-top':-_this.height()/2})
                            break;
                        case 'bottom':
                              $('.'+ops.class).find('div').css({'bottom':'0'})
                            break;
                        }
                   }
                  _this.css({'margin-left':(_this.parent().width()-_this.width())/2});//,'margin-top':(_this.parent().height()-_this.height())/2
              }
              //全屏显示
               function fullscr () {//全屏显示时的尺寸
                ops.width=ops.height='window';
                no_fullscr();
              }
              //(ops.width==null && ops.height==null)||(ops.width==$(window).width() && ops.width==$(window).height())   判断正屏显示
             if((ops.width==null && ops.height==null)||(ops.width==$(window).width() && ops.width==$(window).height())||ops.fullScreen==true){
                     fullscr();
                     size(fullscr);
                     ops.call();
              }else{
                     no_fullscr();
                     size(no_fullscr);
                     ops.call();
             }
             function size  (b) {
                var time_=300;
                function runagine () {
                    if(time_>1000){return}
                      time_+=time_;
                    b();
                    setTimeout(runagine,time_);
                }
                runagine();
                     if(ops.resize){
                        $(window).resize(b);
                        ops.call();
                      }
             }
    };
//等比例缩放
  $.fn.extend({
    scale:function  (x,options) {
           var dft={
        x:1,
        y:1,
        error:0,
        call:function  () {return false}
      }
      var ops=$.extend(dft,options);
           var i=ops.x/ops.y;
           if(x=='height'){
                $(this).height($(this).width()/i);
           }else if(x=='width'){
                $(this).width($(this).height()*i);
           }
         ops.call(this);
    }
  });
//居下显示
   $.fn.alignBottom = function  (options) {
      var dft={
        ways:'margin-top',
        error:0,
        call:function  () {return false}
      }
      var ops=$.extend(dft,options);
      var h=$(this).height();
      var h_0=$(this).parent().height();
      $(this).css(ops.ways,(h_0-h)+ops.error);
      ops.call(this);
   } 
//上下居中
    $.fn.alignMid = function (options) { //定义插件的名称，这里为userCp
        var dft = {
            //以下为该插件的属性及其默认值
            ways: "margin-top", //
            error: 0 ,//误差
            time:300,//多次延时执行间隔
            call:function(){ return false}
        };
        var ops = $.extend(dft, options);
        var time=ops.time;
        var _this=$(this);
       function do_it () {
            var h_2 =_this.height();
        var h_1 =_this.parent().height();
           _this.css(ops.ways, (h_1 - h_2) / 2 + ops.error);
            //console.log(time,h_1,h_2);
             if(time>=3000){
            return
          }
            time+=time;
               setTimeout(do_it,time);
        }
        do_it();
      $(window).resize(do_it);
       ops.call();
    }
//两边居中
    $.fn.alignCenter= function (options) { //定义插件的名称，这里为userCp
               var dft = {
                    //以下为该插件的属性及其默认值
                    float:'left',
                    children:false,//是否有子元素
                    position:false,//是否定位显示
                    error: 0 ,//误差
                    vertical:false,//是否上下居中
                    midways:'margin-top',//要是上下居中的方式
                    call:function(){ return false}
                };
                var ops = $.extend(dft, options),_this=$(this);
                //有子元素的情况下
             if(ops.children){
                _this.children().css('float',ops.float)
              if(ops.float=='left'){
                     _this.children(":first-child").css('margin-left','0')
                     _this.children(":last-child").css('margin-right','0');
              }else if(ops.float=='right'){
                  _this.children(":first-child").css('margin-right','0');
                  _this.children(":last-child").css('margin-left','0');
              }
                var w=0;
                _this.children().each(function(){
                    w+=parseInt($(this).width())+parseInt($(this).css('margin-left'))+parseInt($(this).css('padding-left'))+parseInt($(this).css('margin-right'))+parseInt($(this).css('padding-right'));
                });
                var w_=w+ops.error;
                _this.width(w_);
            }
            if(!ops.position){
                _this.css({'display':'block','margin-left':'auto','margin-right':'auto'});
                if(ops.vertical){
                _this.alignMid({ways:ops.midways});
                }
            }else{
                 _this.css({'left':'50%','margin-left':-_this.width()/2,'position':'absolute'}).parent().css('position','relative');
               if(ops.vertical){
                 _this.css({'top':'50%','margin-top':-_this.height()/2});
                }
            }
                ops.call();
    }
//弹性盒子；水平均分width；way:
    $.fn.flexbox=function(options){
        var dtf={
          width:false,
          autowidth:true,
          way:'margin',
        resize:false,
        size:null,
        error:0,
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
            w_num+=parseInt($(this).width())+parseInt($(this).css('padding-left'))+parseInt($(this).css('padding-right'));
        });
      $(this).children().css('text-align','center');
      var child_size=Math.min($(this).children().size(),ops.size||$(this).children().size());
      // if($(this).children().size()>ops.size){w_Math.ceil($(this).children().size()/ops.size)}
      if(ops.autowidth){
            $(this).children().width(child_w_max);
            a=Math.floor((w_ - child_size*child_w_max)/child_size/2)+parseInt(ops.error);
        }else{a=Math.floor((w_ - w_num)/child_size/2)+parseInt(ops.error);}
        console.log(a)
        if(ops.way=='padding'){      
        obj.children().css({'padding-left':a,'padding-right':a})
          }else if(ops.way=='margin'){
         obj.children().css({'margin-left':a,'margin-right':a})
    }
      if(ops.resize){
          $(window).resize(function(){obj.flexbox()})
      }
}
 //图片加载
 $.fn.imgLoad = function(options){  
                var opts = $.extend({  
                    time:4000, ///等待载入时间，如果超过这个时间就直接执行回调  
                    callback:function(){} //默认回调  
                }, options);  
                var $this = this,i = 0, j = 0, len = this.length;  
                $this.each(function(){  
                    var _this = this,  
                        dateSrc = $(_this).attr("date-src"),  
                        imgsrc = dateSrc?dateSrc:_this.src;  
                    var img = new Image();  
                    img.onload = function(){  
                        img.onload = null;  
                        _this.src = imgsrc;  
                        i++;  
                    };  
                    img.src = imgsrc;  
                });  
                var t = window.setInterval(function(){  
                    j++;  
                   // $("#msg").html(i);  
                    if (i==len || j*200>=opts.time){  
                        window.clearInterval(t);  
                        opts.callback();  
                    };  
                },200);  
    }  
})(jQuery);
    XQ = new Object();
XQ.download=function  (fun) {
            document.onreadystatechange = function  () {
                console.log(document.readyState)
     if(document.readyState=="complete"){
            if(fun){fun()}else{return};
            }
        }
 };