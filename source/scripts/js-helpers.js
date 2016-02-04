window.helpers = {
    bemMod: function ($node, m, add) {
        if (!$node.length || !m) return false;

        this.getBlockNamesFromNode($node, ($nodeItem, blockName)=> {
            $nodeItem[add ? 'addClass' : 'removeClass'](`${blockName}_${m}`);
        });
    },
    getBlockNamesFromNode: function ($node, callback) {
        $node.each((i, nodeItem)=> {
            let classNames = [...nodeItem.className.split(' ')];

            $.grep(classNames, (className, i)=> {
                if (className.indexOf('b-') === -1) return false;

                if (callback) callback($(nodeItem), className);

                return true;
            });
        });
    },
    tabs: function (options) {
        let $parent = _(options.parent);

        $parent.each(function () {
            let $tab = _(options.tab[0], $(this));
            let $content = _(options.content[0], $(this));

            $tab.click(function () {
                let i = $(this).index();

                setVisibility($tab, options.tab, i);
                setVisibility($content, options.content, i);

                return false;
            });
        });

        function handleTabClick() {

        }

        function setVisibility($node, entry, i) {
            let $activeNode = $node.eq(i);

            $activeNode.addClass(entry[1]);
            $node.not($activeNode).removeClass(entry[1]);
        }

        function _(className, context = null) {
            return $(`.${className}`, context);
        }
    },
    fancyboxFix: function (items) {
        $.extend($.fancybox.defaults, {
            beforeLoad: function() {
                $(items).css({
                    paddingRight: window.innerWidth - $(window).width()
                });
            },
            beforeClose: function () {
                $(items).css({
                    paddingRight: ''
                });
            }
        });
    },
    setItemActivity: function(item, index, $ctx) {
        $(`.${item}`, $ctx).removeClass(`${item}_active`);
        $(`.${item}`, $ctx).eq(index).addClass(`${item}_active`);
    },
    scrollTo: function ($node) {
        var element = $($node.data('scroll-to')),
            offset = element.offset().top,
            off = $node.data('off') || 0;

        $node.click(function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: offset + off
            });
        });
    },
    swiper: function ($node, options) {
        var options = options || {};
        var $items = $node.children();
        var $nextButtonNode, $prevButtonNode, $paginationNode;

        $items.wrapAll('<div class="swiper-container"><div class="swiper-wrapper"></div></div>');
        $items.wrap('<div class="swiper-slide"></div>');

        if (options.addNextButton) {
            $nextButtonNode = $('<span class="swiper-next"></span>');
            afterContainer($nextButtonNode);
        }

        if (options.addPrevButton) {
            $prevButtonNode = $('<span class="swiper-prev"></span>');
            afterContainer($prevButtonNode);
        }

        if (options.addPagination) {
            $paginationNode = $('<div class="swiper-pagination"></div>');
            afterContainer($paginationNode);
        }

        return new Swiper($('.swiper-container', $node), $.extend({}, {
            nextButton: $nextButtonNode,
            prevButton: $prevButtonNode,
            pagination: $paginationNode
        }, options));

        function afterContainer($node) {
            $items.parents('.swiper-container').after($node);
        }
    },
    scrollTo: function (offset) {
        var offset = offset || 0;

        $('[data-scroll-to]').on('click touchstart', function () {
            var $target = $($(this).data('scroll-to'));

            $.scrollTo($target, {
                duration: 500,
                offset: {
                    left: 0,
                    top: offset
                }
            });

            return false;
        });
    }
};

/**
 * Base
 */
 ;(function() {
     if ($.fancybox) {
         ;(function() {
             /**
              * Default settings
              */
             $.extend($.fancybox.defaults, {
                 padding: 0,
                 closeBtn: false,
                 closeClick: false,
                 helpers: {
                     overlay: {
                         closeClick: false
                     }
                 },
                 beforeShow: function () {
                     $('.fancybox-wrap').append('<a href="#" class="js-fancy-close"></a>').css({
                         opacity: 1
                     });
                 }
             });

             /**
              * Gallery
              */
             $('.fancybox-gallery').on('click touchstart', function () {
                 var $gallery = $($(this).data('gallery'));
                 var images = [];

                 $gallery.children().each(function () {
                     var src = $(this).attr('src');
                     if (src) images.push($('<img src="'+src+'" alt="" />'));
                 });

                 if (!images.length) return false;

                 $.fancybox(images, {
                     closeEffect: 'none',
                     closeSpeed: 0
                 });

                 return false;
             });

             $('body').on('click touchstart', '.js-fancy-close', function () {
                 close();
                 return false;
             });

             $('body').on('click touchstart', function (e) {
                 var $target = $(e.target);

                 if (
                     !$target.hasClass('fancybox') &&
                     !$target.hasClass('fancybox-nav') &&
                     !$target.parent().hasClass('fancybox-nav') &&
                     !$target.parents('.fancybox-inner').length
                 ) close();
             });

             function close() {
                 $('.fancybox-lock').removeClass('fancybox-lock');
                 $('.fancybox-margin').css('paddingRight', '').removeClass('fancybox-margin');
                 $.fancybox.close();
             }
         })();
     }

    //  if ($.fancybox) {
    //
    //  }

    //  $(window).load(function() {
    //    $('[data-scroll-to]').each(function() {
    //        helpers.scrollTo($(this));
    //    });
    //  });

 })();
