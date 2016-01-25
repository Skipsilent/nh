var arry_mus=[function  () {
    audio[0].pause();
},function  () {
    audio[0].play();
}]
  $('.music').click(function  () {
                $(this).find('span').toggleClass('opa');
                var index_=$(this).find('.opa').index();
                arry_mus[index_]();
        });
XQ.download(function  () {
    $('.loading').fadeOut(800,function  () {
            $('.page1').addClass('act');
    })
   
})
$(function () {
     $('#fullpage').fullpage({
                anchors: ['Page1', 'Page2', 'Page3', 'Page4','Page5'],
                // sectionsColor: ['#384A7D', '#04060B', '#020B14','#03021D','#212F47'],
                 css3 :true,
                easing:'easeOutSine' ,
                loopHorizontal :false,
                recordHistory:false
            });
   //  $.fn.fullpage.setAllowScrolling(false) ;
       
        // $('.swiper-container ul').on('click','li',function  () {
        //     alert()
        // })
});
    var swiper,swiper2;
function http_init1 () {
    swiper=new Swiper('.x_pic_nr',{ 
     pagination: '.swiper-pagination',

 });
    swiper2=new Swiper('.x_pic_aa',{ 
 });
    swiper.params.control =swiper2;//需要在Swiper2初始化后，Swiper1控制Swiper2
swiper2.params.control = swiper;//需要在Swiper1初始化后，Swiper2控制Swiper1
        $('.txtnew ul ').each(function  () {
                 if($(this).find('li').size()>3){
                    run_($(this));
             }
        });
        $('.b_ul ul').each(function  () {
            var _this=$(this);
           if($(this).find('li').size()<=3){
                    _this.flexbox({autowidth:false,error:'-1'});
                }else{
                   _this.parent().append('<ul class="clearfix"></ul>');
                   for(var i=2;i<_this.find('li').size();i++){
                        _this.children().eq(i).appendTo(_this.next());
                   }
                   _this.next().flexbox({autowidth:false});
                   _this.flexbox({autowidth:false,error:'-1'});
                }
        });
}
var runflag=true;;
function run_ (obj) {
    var top_=0;
    run (obj);
     function run (obj) {
                   if(runflag){
                     //top_++;
                        obj.animate({'marginTop':-obj.find('li').eq(0).height()},function () {
                            obj.find('li').eq(0).appendTo(obj);
                            obj.css('margin-top',-0);
                        });
                       //if(top_>=(obj.find('li').eq(0).height())){
                   // top_=0;
                        //}
                   }
               setTimeout(run, 4000,obj) ;
           }
}

 wx.ready(function () {
 // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
wx.onMenuShareTimeline({
 title:"中国农业银行2015年十大新闻", // 分享标题
link:"url",
 imgUrl:"sharePic.jpg", // 分享图标
 success: function (res) {
}
});

 // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
wx.onMenuShareAppMessage({
 title:"中国农业银行2015年十大新闻", // 分享标题
link:"url",
 imgUrl:"sharePic.jpg", // 分享图标
 desc: '中国农业银行2015年十大新闻', // 分享描述
 type: 'link', // 分享类型,music、video或link，不填默认为link
 success: function (res) {
}
});
});