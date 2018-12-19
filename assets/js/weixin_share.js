// JavaScript Document
     var WXENV = new (function (ticketUrl) {
        var self = this;
        self.ticketUrl = ticketUrl;
        self.ready = false;
        self.readyHandlers = [];
        self.shareData = {
            title: "标题",
            desc: "副标题",
            link: "http://bmw201805.bj2.renhe.org.cn/",
            imgUrl: "http://bmw201805.bj2.renhe.org.cn/assets/img/0.png",
            type: '',   // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
                _hmt.push(['_trackEvent', 'nav', 'click', 'share_success']);
                //分享成功后记录分享
            },
            cancel: function (res) {
                _hmt.push(['_trackEvent', 'nav', 'click', 'share_cancel']);
                // 用户取消分享后执行的回调函数
            }
        };
        self.debug = false;
        self.jsApiList =
                [
                    //'chooseWXPay',
                    //'openProductSpecificView',
                    //'addCard',
                    //'chooseCard',
                    //'openCard',
                    //以上接口为支付、小店、卡券类接口，有权限的公众号才能开启
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                ];

        self.addReadyHandler = function (callback) {
            if (self.ready) {
                callback();
            }
            else {
                self.readyHandlers.push(callback);
            }
        };

        self.updateShareData = function (data) {
            if (typeof (data) == 'undefined') {
                data = self.shareData;
            }

            if (self.ready) {
                self._updateShareData(data);
            }
            else {
                self.addReadyHandler(function () {
                    self._updateShareData(data);
                });
            }
        };

        self._updateShareData = function (data) {
            document.getElementById('myAudioNext').src="assets/media/phonecall.mp3";
            document.getElementById('myAudio').src="assets/media/slient.mp3";
            document.getElementById('myVideo').src="assets/media/myVideo.mp4";
            if($.os.ios) {
               document.getElementById('myVideo').src="assets/media/myVideoIos.mp4";
            }
            document.getElementById('myAudioNext').load();
            document.getElementById('myAudio').load();
            document.getElementById('myVideo').load();
            wx.onMenuShareTimeline({
                title: data.title,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareAppMessage({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                type: data.type,
                dataUrl: data.dataUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareQQ({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareWeibo({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });
        };

        window.WXENV_CALLBACK = function (config) {
            config.debug = self.debug;
            config.jsApiList = self.jsApiList;

            wx.config(config);
        };

        var js = document.getElementsByTagName('script')[0];

        self.onEnvReady = function () {
            var url = self.ticketUrl;
            if (url.indexOf('?') == -1) {
                url += '?';
            }
            else {
                url += '&';
            }

            url += 'url=' + encodeURIComponent(window.location.href);

            url += '&callback=WXENV_CALLBACK';

            url += '&_=' + new Date().valueOf();

            var script = document.createElement('script');
            script.src = url;
            js.parentNode.insertBefore(script, js.nextSibling);
        };

        var wxjs = document.createElement('script');
        console.log(wxjs);
        wxjs.addEventListener('load', function () {
            wx.ready(function () {
                self.ready = true;
                self.updateShareData();

                //wx.hideMenuItems({
                //    menuList: ['menuItem:profile', 'menuItem:addContact', 'menuItem:copyUrl', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari']
                //});

                //wx.hideAllNonBaseMenuItem();
                wx.showOptionMenu();
                wx.showAllNonBaseMenuItem();

                for (var i = 0; i < self.readyHandlers.length; i++) {
                    self.readyHandlers[i]();
                }

                self.readyHandlers = [];
            });
            self.onEnvReady();
        });
        wxjs.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
        js.parentNode.insertBefore(wxjs, js.nextSibling);

    })("http://wxapi.renhe.org.cn/jsticket.php");
    