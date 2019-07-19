//javascript

$(document).ready(function () {


    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
        $('body').addClass('android');
    }

    window.goBack = function () {
        try {
            if (!window.history || window.history.length == 0 || document.referrer === void 0 || document.referrer == '') {
                window.location.href = '/';
            } else {
                window.history.back();
            }
        } catch (e) {
            window.location.href = '/';
        }
    }

    // 顶部悬浮
    if ($('.toplocking').length > 0) {

        var tabsFilter = $('.toplocking');
        var tabsParent = tabsFilter.parent();
        var tabsTop = 0;
        setTimeout(function () {
            tabsTop = tabsParent.offset().top;
        }, 100);
        setInterval(function () {
            tabsTop = tabsParent.offset().top;
        }, 1000);
        $(window).scroll(function () {
            if ($(window).scrollTop() >= tabsTop - 42) {
                tabsFilter.addClass('fixed');
            } else {
                tabsFilter.removeClass('fixed');
            }
        });
    }

    // 分类标签显示隐藏
    $('.menutabs-all a').on('click', function () {
        $('.opentags').fadeIn(200);
    });
    $('.opentags .close a').on('click', function () {
        $('.opentags').fadeOut(200);
    });


    // 排序
    $('.topsort-select a').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.topsort-list').slideUp(200);
        } else {
            $(this).addClass('on');
            $('.topsort-list').slideDown(200);
        }
    });
    $('.topsort-list ul li a').on('click', function () {
        var _thisval = $(this).text();
        if ($(this).hasClass('on')) {
            $('.topsort-select a').removeClass('on');
            $('.topsort-list').slideUp(200);
        } else {
            $('.topsort-select a span').text(_thisval);
            $('.topsort-select a').removeClass('on');
            $('.topsort-list ul li a').removeClass('on');
            $(this).addClass('on');
            $('.topsort-list').slideUp(200);
        }

    });


    // 显示筛选
    $('.topsort-filter a').on('click', function () {
        $('.openwrap').fadeIn(400);
        $('.openfilter').css({'display': 'block'});
        $('.openfilter').animate({
            'opacity': '1',
            'right': '0'
        }, 400);
    });

    // 分享显示隐藏
    $('.OPshare').on('click', function () {
        $('.openwrap').fadeIn(300);
        $('.openshare').css({'display': 'block'});
        $('.openshare').animate({
            'opacity': '1',
            'bottom': '0'
        }, 300);
    });
    $('.openshare .close').on('click', function () {
        $('.openwrap').fadeOut(300);
        $('.openshare').animate({
            'opacity': '0',
            'bottom': '-100%'
        }, 300);
        setTimeout(function () {
            $('.openshare').css({'display': 'none'});
        }, 300);
    });


    // 名校详细简介展开
    $('.schoolcon-about .more a').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parents('.schoolcon-about').find('.text').removeClass('show');
        } else {
            $(this).addClass('on');
            $(this).parents('.schoolcon-about').find('.text').addClass('show');
        }
    });


    // 名师介绍展开收起
    $('.teachercon-about .more a').on('click', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parents('.teachercon-about').find('.text').removeClass('show');
        } else {
            $(this).addClass('on');
            $(this).parents('.teachercon-about').find('.text').addClass('show');
        }
    });

    // 跳过注册资料
    $('.skipdata').on('click', function () {
        $('.openwrap').fadeIn(200);
        $('.openskip').fadeIn(200);
    });
    $('.openskip .close').on('click', function () {
        $('.openwrap').fadeOut(200);
        $('.openskip').fadeOut(200);
    });
    // 详细页标签定位跳转
    if ($('.positiontabs').length > 0) {
        var positiontabs = $('.positiontabs ul li');
        var positiontabslink = $('.positiontabs ul li a');
        var positiontabsnum = positiontabs.length;
        var positioncons = $('.positioncons .positionitem');
        var positionarr = [];
        var positionHand = false;
        for (var i = 0; i < positiontabsnum; i++) {
            positiontabs.eq(i).find('a').attr('index', i);
        }
        var updatePositiontabs = function () {
            for (var i = 0; i < positiontabsnum; i++) {
                positionarr[i] = positioncons.eq(i).offset().top - 86;
            }
            // console.log(positionarr);
        }
        setInterval(updatePositiontabs, 500);
        updatePositiontabs();
        $(window).scroll(function () {
            if (positionHand) {
                return;
            }
            var scTop = $(window).scrollTop();
            if (scTop < positionarr[1]) {
                positiontabs.find('a').removeClass('on');
                positiontabs.eq(0).find('a').addClass('on');
            } else if (scTop >= positionarr[positiontabsnum - 1]) {
                positiontabs.find('a').removeClass('on');
                positiontabs.eq(positiontabsnum - 1).find('a').addClass('on');
            }
            for (var i = 1; i < positiontabsnum - 1; i++) {
                if (scTop >= positionarr[i] && scTop < positionarr[i + 1]) {
                    positiontabs.find('a').removeClass('on');
                    positiontabs.eq(i).find('a').addClass('on');
                }
            }
        });

        positiontabslink.on('click', function () {
            var thisindex = $(this).attr('index');
            var thisgotop = positionarr[thisindex];
            positiontabs.find('a').removeClass('on');
            positiontabs.eq(thisindex).find('a').addClass('on');
            positionHand = true;
            $('body,html').animate({
                scrollTop: thisgotop
            }, 500);
            setTimeout(function () {
                positionHand = false;
            }, 550);
            return false;
        });
    }
    // 回复
    $('.discuss-area').on('click', 'a.tosay', function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var target = $(this).data('target');
        $('#relay_targetId').val(target);
        $('#relay_replyId').val(id);
        $('#relay_content').attr('placeholder', '回复@' + name);
        $('.openreply').fadeIn(200);
        $('.openwrap').fadeIn(200);
    });
    $('.openreply a.close').on('click', function () {
        $('.openreply').fadeOut(200);
        $('.openwrap').fadeOut(200);
    });

    // 绑定优惠券弹窗
    $('.OPbind').on('click', function () {
        $('.openbind').fadeIn(200);
        $('.openwrap').fadeIn(200);
    });

    $('.openbind .close').on('click', function () {
        $('.openbind').fadeOut(200);
        $('.openwrap').fadeOut(200);
    });

    //课程收藏、名师关注
    var w = $(window).width();
    var h = $(window).height();
    $(".pop-gz").css("width", w);
    $(".pop-gz").css("height", h);

    $('.close-gz-btn,.think-gz-btn').click(function () {
        $(this).parent().parent().hide();
    });

    $(".pop-sc").css("width", w);
    $(".pop-sc").css("height", h);

    $('.close-sc-btn').click(function () {
        $(this).parent().parent().hide();
    });
});