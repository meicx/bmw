;
(function($) {
    function Slider(elem, options,audio) {
        options.text = "滑动开启";
        this.$container = elem;
        this.options = $.extend({}, this.default, options);
        this.audio = audio;
        this.isSuccess = false;
    }
    Slider.prototype = {
        create: function() {
            var $container = this.$container;
            var options = this.options;
            initDOM();
            // initStyle();
            function initDOM() {
                var template = '<div class="slide-to-unlock-bg"><span>' +
                    options.text +
                    '</span></div><div class="slide-to-unlock-progress"></div><div class="slide-to-unlock-handle"></div>';
                $container.html(template);
            }
            // function initStyle() {
            //     $container.css({
            //         position: 'relative',
            //     });
            // }
        },
        bindDragEvent: function() {

            var that = this;
            var $container = this.$container;
            var audio = this.audio;
            var options = this.options;
            var downX;
            var $prog = $container.find('.slide-to-unlock-progress'),
                $bg = $container.find('.slide-to-unlock-bg'),
                $handle = $container.find('.slide-to-unlock-handle');
                console.log("bg"+$bg.width())
                 console.log("bg"+$bg.width())
            $bg.show(0,function(){
            　　 var bgHeight = $bg.width();
            })
            $handle.show(0,function(){
            　　 var handleHeight = $handle.width();
            })
            var succMoveWidth = $bg.width() - $handle.width();
            $handle.on('touchstart', null, touchstartHandler);
            function getLimitNumber(num, min, max) {
                if (num > max) {
                    num = max;
                } else if (num < min) {
                    num = min;
                }
                return num;
            }

            function touchstartHandler(event) {
                audio.play();
                downX = event.changedTouches[0].clientX;
                $(document).on('touchmove', null, touchmoveHandler);
                $(document).on('touchend', null, touchendHandler);
            }

            function touchmoveHandler(event) {
                var moveX = event.changedTouches[0].clientX;
                var diffX = getLimitNumber(moveX - downX, 0, succMoveWidth);
                $prog.width(diffX);
                $handle.css("left",diffX);
                if (diffX === succMoveWidth) {
                    success();
                }
                event.preventDefault();
            }

            function touchendHandler(event) {
                if (!that.isSuccess) {
                    $prog.animate({
                        width: 0
                    }, 100);
                    $handle.animate({
                        left: 0.1*(document.documentElement.clientWidth / 7.5)
                    }, 100);
                }
                $(document).off('touchmove', null, touchmoveHandler);
                $(document).off('touchend', null, touchendHandler);
            }

            function success() {
                audio.loop = "loop";
                audio.src = "assets/media/phonecall.mp3";
                $prog.css({
                    backgroundColor: options.succColor,
                });
                $container.find('span').css({
                    color: options.succTextColor
                });
                that.isSuccess = true;
                $container.find('span').html(options.succText);
                $handle.off('touchend', null, touchstartHandler);
                $(document).off('touchmove', null, touchmoveHandler);
                setTimeout(function() {
                    options.successFunc && options.successFunc();
                }, 30);
            }
        }
    };
    $.fn.slideToUnlock = function(options,audio) {
        var slider = new Slider($(this), options,audio);
        slider.create();
        slider.bindDragEvent();       
    }
})(Zepto);
