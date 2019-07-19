;(function($){
    $(".ecl-popkf").click(function () {
        kfBarShow();//打开
        $(".kf-ztu").hide();
        setTimeout(function () {
            kfBarHide();
            $(".kf-ztu").show();
        }, 5000);

    });
    function kfBarShow() {
        $(".ecl-popkf").animate({ right: '-0.2%' }, 500);
    }
    function kfBarHide() {
        $(".ecl-popkf").animate({ right: '-7%' }, 500);
    }

    $(".kf-zd").click(function () {
        $("html,body").animate({scrollTop: 0},600);
    });
})(jQuery);
