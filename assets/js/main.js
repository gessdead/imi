(function ($) {

    var menu_width = 0,
        cur_item_width = 0;

    function ChangeMenu(obj, e, is_debug) {
        var lvl1 = obj.find('.js-lvl1'),
            item = obj.find('.js-menuitem');

        if (parseInt(item.data('ismenu')) || 0 === 1) {

            var item_width = cur_item_width = obj.outerWidth(),
                item_index = parseInt(item.data('index')) || -1;

            switch (e) {
                case 'open':
                    lvl1.css('display', 'block');
                    lvl1.width(item_width);
                    break;
                case 'close':
                    lvl1.css('display', 'none');
                    break;
            }

            if (is_debug) {
                var debug_arr = {
                    'menu_width': menu_width,
                    'item_width': item_width,
                    'item_index': item_index
                };
                console.log(debug_arr);
            }
        }
    }

    function ChangeSubMenu(obj, e) {
        var item = obj.find('a'),
            ul = obj.closest('.js-lvl1'),
            index = obj.index(),
            padding = 35,
            height = 0;

        if (parseInt(item.data('ismenu')) || 0 === 1) {
            var sub = obj.find('.js-lvl2');

            console.log(index);

            if (index > 0) {
                $(ul.children('li')).each(function (i) {
                    if (i < index) {
                        height += $(this).outerHeight();
                        console.log("i = " + i + " | index = " + index + " | height = " + height);
                    }
                });
            }

            switch (e) {
                case 'open':
                    sub.css({'display': 'block', 'left': cur_item_width + 'px', 'top': -height - padding + 'px'});
                    sub.width(menu_width - cur_item_width);
                    break;
                case 'close':
                    sub.css('display', 'none');
                    break;
            }
        }
    }

    $(document).ready(function () {
        $('nav .js-mmenu').each(function () {
            menu_width += $(this).outerWidth();
        });

        $('#search').click(function () {
            var field = $('.js-search-box'),
                field_inp = $('.js-search-box input');
            if (!($(this).hasClass('open'))) {
                $(this).addClass('open');
                $(".search-box").show("slow");
                field.animate({'opacity': '1'}, 50, function () {
                    field_inp.focus();
                });
            } else {
                if (field_inp.val() === '') {
                    $(this).removeClass('open');
                    $(".search-box").hide("slow");
                } else {
                    $('#search-form').submit();
                }
            }
        });

        $('#search').on('click', function() {
            var field = $('.js-search-box');
            var field_inp = $('.js-search-box input');
        });

        var getHoverObj = function (e) {
            e.target.className;
        }

        $('.js-mmenu').hover(function (e) {
            ChangeMenu($(this), 'open', true);
        }, function (e) {
            ChangeMenu($(this), 'close', true);
        });

        $('.js-lvl1 li').hover(function () {
            ChangeSubMenu($(this), 'open');
        }, function () {
            ChangeSubMenu($(this), 'close');
        });

        $('#header-lk-menu').hover(function (e) {
            $('.lk-menu')
                .css('display', 'block')
                .animate({'opacity': '1'}, 300);
        }, function (e) {
            if ($('.lk-menu').has(e.target).length !== 0) {
                $('.lk-menu')
                    .animate({'opacity': '1'}, 300)
                    .css('display', 'block');
            }
        });
        $('.lk-menu').hover(function (e) {
        }, function (e) {
            if ($('#header-lk-menu').has(e.target).length === 0) {
                $('.lk-menu')
                    .animate({'opacity': '0'}, 500)
                    .css('display', 'none');
            }
        });

        $(document).mouseup(function (e) {
            var search = $('#search'),
                field = $('.js-search-box');
            if ((search.hasClass('open')) && ($('header nav').has(e.target).length === 0)) {
                search.removeClass('open');
                field.animate({'right': '-1000px', 'opacity': '0'}, 300);
            }
        });

        $('.js-alphabet').addClass('animate');


        //боковое меню слева
        (function($catalogNav) {
            if (!$catalogNav.length) {

            }

            $catalogNav.on('click', function() {
               var $navLeftItem = $(this).parent();
               var $navLeftItemList = $(this).next();
               $navLeftItem.toggleClass('nav-left-item-active');
               $navLeftItem.toggleClass('nav-left-item-disable');
               $navLeftItemList.fadeToggle('fast');
            });

        })($('.nav-left-item-header'));

        (function($cardPics) {
            if (!$cardPics.length) {
                return;
            }

            $cardPics.on('click', function() {
                $cardPics.removeClass('active');
                $(this).addClass('active');
            });

        })($('.slider-child-image .slider-main-item'));

        (function($orderTable) {
            if (!$orderTable) {
                return;
            }

            $orderTable.each(function() {
                var $that = $(this);
                var $head = $that.find('[data-id="table-lk-head"]');
                var $childs = $that.find('.child-table-lk');

                $head.on('click', function() {
                    $(this).toggleClass('table-lk-open-tab');
                    $childs.fadeToggle('fast');
                });
                console.log($head);
                console.log($childs);
            });
        })($('.table-lk table'))
    });


})(jQuery);
