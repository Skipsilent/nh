 var app = angular.module('myApp', ["ngTouch"]);
 //服务客户控制器
 var arry=[];
app.controller('nonghang', function($scope,$http,$sce) {
    $scope.cal=true;
$http.get('json/data.json?t='+Math.random()).success(function (response) {
        if(typeof response.news != 'undefined') {
             $scope.news = response.news;
             arry=response.news;
             setTimeout(http_init1,1000);
          };
    });
$scope.show_=function(a,b) {
    if( a>=0&&b>=0){
        $scope.tet={
            ti: $scope.news[a].new[b].ti,
            time: $scope.news[a].new[b].time,
            article: $sce.trustAsHtml($scope.news[a].new[b].article)
        }
        
        runflag=false;
        $('.tanchu').addClass('mar-top');
        fuzhi();
        }else{
        $('.tanchu').removeClass('mar-top');
        runflag=true;
    }
}
$scope.pre=function  () {
    if(swiper.activeIndex==0){
        $.fn.fullpage.moveSlideLeft();
    }
}
$scope.net=function  () {
      if(swiper.activeIndex==0){
   //     $.fn.fullpage.moveSlideRight();
    }
    
}

});
function fuzhi () {
    var h_=$('.tanchu > div .top').height()+parseInt($('.tanchu > div .top').css('padding-top'))+parseInt($('.tanchu > div .top').css('padding-bottom'));
    var h_1=$('.tanchu').height()+parseInt($('.tanchu').css('padding-top'))+parseInt($('.tanchu').css('padding-top'))
      //  $(".tanchu > div .bottom").height(h_1-h_-20);
       // alert(h_+"//"+h_1)
}//