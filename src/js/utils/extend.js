;
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global'], factory);
    } else {
        factory(jQuery);
    }
}(function($) {
    /* jq扩展 */
    'use strict';
    $.fn.extend({
        /* 分页 */
        getPage: function(options) {
            //初始值//
            var pageSetting = {
                size: 1,
                index: 0,
                diffe: 2,
                pageDom: '<a href="javascript:;">${i}</a>',
                slur: ' <span>...</span>',
                thatClass: "active",
                call: function(i) {},
                pageUp: {
                    dom: '<a href="javascript:;" data-page="prev">上一页</a>',
                    hideClass: "hide"
                },
                pageDown: {
                    dom: '<a href="javascript:;" data-page="next">下一页</a>',
                    hideClass: "hide"
                },
                goPage: {
                    inputdom: '<span class="go-page">${t}跳到第<input type="text" value="${i}">页</span>',
                    submitdom: '<input type="button" value="确定" class="btn-page">'
                },
                sizeerror: function() {},
                init: false
            };
            $(this).each(function() {
                var _this = $(this);
                options = options || ({});
                var e = {};
                var init = e.init;
                var gopage;
                $.extend(e, pageSetting, options);
                e.size = Number(e.size);
                e.size < 1 ? e.size = 1 : null;
                if (e.size == 1) {
                    e.sizeerror();
                    return false;
                }
                var call = function(i) {
                    fn(i);
                    return false;
                };
                var fn = function(index) {
                    index = Number(index);
                    !index ? index = 1 : null;
                    index < 1 ? index = 1 : null;
                    index >= e.size ? index = e.size : null;
                    var begin = 0,
                        end = 0;
                    _this.empty();
                    init ? e.call(index) : null;
                    init = true;
                    begin = index <= e.diffe + 1 ? 1 : index - e.diffe - 1;
                    end = index >= e.size - e.diffe - 1 ? e.size - 1 : index + e.diffe;
                    //e.size < 3 ? begin = 1 : begin = e.size - 2;
                    var pageUp = $(e.pageUp.dom).appendTo(_this).on("click", function() {
                        if ($(this).is("." + e.pageUp.hideClass)) {
                            return false;
                        }
                        return call(Number(_this.find("." + e.thatClass).attr("data-page")) - 1);
                    });
                    var beginPage = $(GLOBAL.Util.substitute(e.pageDom, {
                        i: 1
                    })).attr("data-page", 1).appendTo(_this).on("click", function() {
                        return call(1);
                    });
                    index == 1 ? (pageUp.addClass(e.pageUp.hideClass), beginPage.addClass(e.thatClass)) : null;
                    index <= e.diffe + 2 ? null : _this.append(e.slur);
                    for (var i = begin + 1; i <= end; i++) {
                        var p = $(GLOBAL.Util.substitute(e.pageDom, {
                            i: i
                        })).attr("data-page", i).appendTo(_this).on("click", function() {
                            return call($(this).attr("data-page"));
                        });
                        if (i == index) {
                            p.addClass(e.thatClass);
                        }
                    }
                    index >= e.size - e.diffe - 1 ? null : _this.append(e.slur);
                    var endPage = $(GLOBAL.Util.substitute(e.pageDom, {
                        i: e.size
                    })).attr("data-page", e.size).appendTo(_this).on("click", function() {
                        return call(e.size);
                    });
                    var pageDown = $(e.pageDown.dom).appendTo(_this).on("click", function() {
                        if ($(this).is("." + e.pageUp.hideClass)) {
                            return false;
                        }
                        return call(Number(_this.find("." + e.thatClass).attr("data-page")) + 1);
                    });
                    index == e.size ? (pageDown.addClass(e.pageDown.hideClass), endPage.addClass(e.thatClass)) : null;
                    if (e.goPage) {
                        gopage = $(GLOBAL.Util.substitute(e.goPage.inputdom, {
                            i: index,
                            t: e.totalDom
                        })).appendTo(_this);
                        var jump = $(GLOBAL.Util.substitute(e.goPage.submitdom, {
                            i: e.index
                        })).appendTo(_this).on("click", function() {
                            return call(gopage.find("input[type='text']").val());
                        });
                    }
                };
                _this.setSize = function(num) {
                    e.size = Number(num);
                };
                fn(e.index);
                return _this;
            });
        },

        /* 大杂烩自适应滑动 */
        dzhSlider: function(options) {
            var $that = $(this);
            if (!$that) throw new Error("没有定义外层选择器！你要我滑动什么？");
            var opt = {
                wrapIn: "ul", //内部容器
                item: 'li', //滑动项
                left: '.pre', //点击滑动到上一屏的选择器
                right: '.next' //点击滑动到下一屏的选择器
            };
            $.extend(opt, options);
            $that.map(function(v, m) {
                var wrapOut = $(m); //外部容器
                var wrapOutW = wrapOut.width(); //外部容器宽度
                var wrapIn = wrapOut.find(opt.wrapIn);
                var wrapInW;
                var left = wrapOut.find(opt.left);
                var right = wrapOut.find(opt.right);
                var item = wrapIn.find(opt.item);
                var mr = item.css('margin-right') ? item.css('margin-right').substring(-1, 2) : "0";
                var itemW = item.width() + parseInt(mr);
                var itemW2 = item.width();
                wrapIn.width(wrapInW = itemW * item.length); //根据item的个数设置内部容器的宽度
                var i = Math.floor(wrapOutW / itemW2); //计算每一次要滑动的item个数
                if ((wrapOutW - i * itemW) >= item.width()) { //如果右边的item没有被盖住，则将滑动个数减少增加
                    i++;
                }
                var s = i * itemW; //每一次要滑动的距离
                var j = 0; //记录已滑动的次数
                left.on("click", function() {
                    if (j > 0) {
                        wrapIn.stop(false, true).animate({ marginLeft: "+=" + s }, 300);
                        j--;
                    } else {
                        wrapIn.stop(false, true).animate({ marginLeft: 0 }, 300);
                    }
                });
                right.on("click", function() {
                    var rest = item.length - (j + 1) * i; //当前剩余的item个数
                    if (rest > 0) {
                        if (rest > i) {
                            wrapIn.stop(false, true).animate({ marginLeft: "-=" + s }, 300);
                        } else {
                            wrapIn.stop(false, true).animate({ marginLeft: "-" + (wrapInW - rest * itemW) }, 300); //如果不够一屏则直接滑动到最后
                        }
                        j++;
                    }
                });
            });
        },

        /* 拖动排序 */
        ttSort: function(options) {
            var $doc = $(document);
            var defaultOptions = {
                down: $.noop,
                move: $.noop,
                up: $.noop,
                target: 'li',
                delay: 100,
                cloneStyle: {
                    'background-color': '#f5f5f5',
                    'border': '1px dashed #ddd'
                },
                floatStyle: {
                    // 用固定定位可以防止定位父级不是Body的情况的兼容处理，表示不兼容IE6，无妨
                    'position': 'fixed',
                    'box-shadow': '0 0 10px 0 #ccc',
                    'z-index': 3,
                    'boder': '1px solid #eee'
                }
            };

            var settings = $.extend(true, {}, defaultOptions, options);

            return this.each(function() {

                var that = $(this);
                var height = 'height';
                var width = 'width';

                if (that.css('box-sizing') == 'border-box') {
                    height = 'outerHeight';
                    width = 'outerWidth';
                }

                that.on('mousedown.ttSort touchstart.ttSort', settings.target, function(e) {

                    var startTime = new Date().getTime();

                    // 桌面端只允许鼠标左键拖动
                    if (e.type == 'mousedown' && e.which != 1) return;

                    // 防止表单元素，a 链接，可编辑元素失效
                    var tagName = e.target.tagName.toLowerCase();
                    if (tagName == 'input' || tagName == 'textarea' || tagName == 'select' ||
                        tagName == 'a' || $(e.target).prop('contenteditable') == 'true') {
                        return;
                    }

                    var self = this;
                    var $this = $(self);
                    var offset = $this.offset();

                    // 桌面端
                    var pageX = e.pageX;
                    var pageY = e.pageY;

                    // 移动端
                    var targetTouches = e.originalEvent.targetTouches;
                    if (e.type == 'touchstart' && targetTouches) {
                        pageX = targetTouches[0].pageX;
                        pageY = targetTouches[0].pageY;
                    }

                    var disX = pageX - offset.left;
                    var disY = pageY - offset.top;

                    var clone = $this.clone()
                        .css(settings.cloneStyle)
                        .css('height', $this[height]())
                        .empty();

                    var hasClone = 1;

                    // 缓存计算
                    var thisOuterHeight = $this.outerHeight();
                    var thatOuterHeight = that.outerHeight();

                    // 滚动速度
                    var upSpeed = thisOuterHeight;
                    var downSpeed = thisOuterHeight;
                    var maxSpeed = thisOuterHeight * 2;

                    settings.down.call(self);

                    $doc.on('mousemove.ttSort touchmove.ttSort', function(e) {

                            // 桌面端
                            var pageX = e.pageX;
                            var pageY = e.pageY;

                            // 移动端
                            var targetTouches = e.originalEvent.targetTouches;
                            if (e.type == 'touchmove' && targetTouches) {
                                pageX = targetTouches[0].pageX;
                                pageY = targetTouches[0].pageY;
                            }

                            if (new Date().getTime() - startTime < settings.delay) return;

                            if (hasClone) {
                                $this.before(clone)
                                    .css('width', $this[width]())
                                    .css(settings.floatStyle)
                                    .appendTo($this.parent());

                                hasClone = 0;
                            }

                            var left = pageX - disX;
                            var top = pageY - disY;

                            var prev = clone.prev();
                            var next = clone.next().not($this);

                            // 超出首屏减去页面滚动条高度或宽度
                            $this.css({
                                left: left - $doc.scrollLeft(),
                                top: top - $doc.scrollTop()
                            });

                            // 向上排序
                            if (prev.length && top < prev.offset().top + prev.outerHeight() / 2) {

                                clone.after(prev);

                                // 向下排序
                            } else if (next.length && top + thisOuterHeight > next.offset().top + next.outerHeight() / 2) {

                                clone.before(next);

                            }

                            // 处理滚动条，that 是带着滚动条的元素，这里默认以为 that 元素是这样的元素（正常情况就是这样），
                            // 如果使用者事件委托的元素不是这样的元素，那么需要提供接口出来
                            var thatScrollTop = that.scrollTop();
                            var thatOffsetTop = that.offset().top;
                            var scrollVal;

                            // 向上滚动
                            if (top < thatOffsetTop) {

                                downSpeed = thisOuterHeight;
                                upSpeed = ++upSpeed > maxSpeed ? maxSpeed : upSpeed;
                                scrollVal = thatScrollTop - upSpeed;

                                // 向下滚动
                            } else if (top + thisOuterHeight - thatOffsetTop > thatOuterHeight) {

                                upSpeed = thisOuterHeight;
                                downSpeed = ++downSpeed > maxSpeed ? maxSpeed : downSpeed;
                                scrollVal = thatScrollTop + downSpeed;
                            }

                            that.scrollTop(scrollVal);

                            settings.move.call(self, left - $doc.scrollLeft(), top - $doc.scrollTop());
                        })
                        .on('mouseup.ttSort touchend.ttSort', function() {

                            $doc.off('mousemove.ttSort mouseup.ttSort touchmove.ttSort touchend.ttSort');

                            // click 的时候也会触发 mouseup 事件，加上判断阻止这种情况
                            if (!hasClone) {
                                clone.before($this.removeAttr('style')).remove();
                                settings.up.call(self);
                            }
                        });

                    return false;
                });
            });
        }
    })

    $.extend($, {
        /* 获取用户uid */
        getUid: function() {
            var mopUid = GLOBAL.Cookie.get('mop_uid'),
                uid;
            if (mopUid) {
                uid = mopUid;
            } else {
                uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
                GLOBAL.Cookie.set('mop_uid', uid, 365, 'mop.com');
            }
            return uid;
        },

        /* 获取用户uid */
        getLogin: function() {
            var mu = GLOBAL.Cookie.get('_mu'),
                login;
            if (mu) {
                login = mu.replace(/\"/g, '').split('|')[0];
            } else {
                login = 'null';
            }
            return login;
        },

        // 获取qid
        getQid: function() {
            var DEFAULT_QID = location.href.indexOf('dzh') > -1 ? '01755' : 'null' 
            var qid = GLOBAL.Util.getQueryString('qid') || GLOBAL.Cookie.get('qid') || DEFAULT_QID;
            if (GLOBAL.Util.getQueryString('qid')) {
                GLOBAL.Cookie.set('qid', GLOBAL.Util.getQueryString('qid'), 6, 'mop.com');
            }
            return qid;
        },


        imgAttr: function(imgsrc, arg) {
            arg = arg || { w: 100, h: 100 };
            return imgsrc.replace(/(.png|.PNG|.jpg|.JPG|.gif|.GIF|.jpeg|.JPEG)$/, "$1" + arg.w + (arg.h ? ("x" + arg.h) : "") + "$1");
        },

        // 网站菜单
        siteMap: {
            list: [{
                    part: "首页",
                    link: "javascript:;",
                    subpart: [{
                            part: "推荐",
                            link: "//www.mop.com"
                        },
                        {
                            part: "大杂烩",
                            link: "//dzh.mop.com"
                        },
                        {
                            part: "贴贴",
                            link: "//tt.mop.com"
                        },
                        // {
                        //     part: "视频",
                        //     link: "//tv.mop.com"
                        // },
                        {
                            part: "猫仔队",
                            link: "//mz.mop.com"
                        },
                        {
                            part: "小说",
                            link: "//wx.mop.com"
                        },
                        {
                            part: "汽车",
                            link: "//auto.mop.com"
                        },
                        {
                            part: "体育",
                            link: "//sports.mop.com"
                        }
                    ]
                },
                {
                    part: "社区",
                    link: "javascript:;",
                    subpart: [{
                            part: "HI",
                            link: "//hi.mop.com"
                        },
                        {
                            part: "达人堂",
                            link: "//vip.mop.com"
                        }
                    ]
                },
            ]
        },


        // 友情链接
        blogroll: {
            title: '友情链接',
            content: [{
                    log: "tt|index|yqlj|0|0|0",
                    href: "http://sports.eastday.com",
                    title: "东方体育"
                },
                {
                    log: "tt|index|yqlj|1|0|0",
                    href: "http://www.hualongxiang.com/",
                    title: "化龙巷"
                },
                {
                    log: "tt|index|yqlj|2|0|0",
                    href: "http://bbs.tiexue.net",
                    title: "铁血社区"
                },
                {
                    log: "tt|index|yqlj|3|0|0",
                    href: "http://bbs.8264.com/",
                    title: "驴友论坛"
                },
                {
                    log: "tt|index|yqlj|4|0|0",
                    href: "http://bbs.hefei.cc/",
                    title: "合肥论坛"
                },
                {
                    log: "tt|index|yqlj|5|0|0",
                    href: "http://www.17k.com/",
                    title: "小说网"
                },
                {
                    log: "tt|index|yqlj|6|0|0",
                    href: "http://cd.lianjia.com/",
                    title: "成都房产网"
                }
            ]
        },
        // 关注错误提示
        followMsg: {
            "no_login": "请登录！",
            "no_user": "用户不存在",
            "-1": "请登录！",
            "-2": "对方在您的黑名单里，您不能关注他！",
            "-3": "参数传递错误！",
            "-5": "关注失败，你不能关注你自己",
            "undefined": "关注失败！"
        },

        // 大杂烩版块
        dzhPart: {
            'index': {
                'id': 1,
                'sid': '100001',
                'name': '大杂烩',
                'subPlate': [{
                        'id': '110001',
                        'name': '五花八门'
                    },
                    {
                        'id': '110002',
                        'name': '社会杂谈'
                    },
                    {
                        'id': '110003',
                        'name': '情感交流'
                    },
                    {
                        'id': '110005',
                        'name': '经济论坛'
                    },
                    {
                        'id': '110004',
                        'name': '灌水专区'
                    },
                    // {
                    //     'id': '110006',
                    //     'name': '视频烩'
                    // },
                ]
            },
            'bagua': {
                'id': 2,
                'sid': '100002',
                'name': '娱乐八卦',
                'subPlate': [{
                        'id': '110007',
                        'name': '八卦爆料'
                    },
                    {
                        'id': '110008',
                        'name': '娱评天下'
                    },
                    {
                        'id': '110009',
                        'name': '电影专区'
                    },
                    {
                        'id': '110010',
                        'name': '电视强档'
                    },
                    {
                        'id': '110011',
                        'name': '综艺节目'
                    }
                ]
            },
            'yuanchuang': {
                'id': 3,
                'sid': '100003',
                'name': '原创区',
                'subPlate': [{
                        'id': '110012',
                        'name': '原创文学'
                    },
                    {
                        'id': '110015',
                        'name': '诗词歌赋'
                    },
                    {
                        'id': '110013',
                        'name': '直播连载'
                    },
                    {
                        'id': '110014',
                        'name': '原创动漫'
                    },
                    // {
                    //     'id': '110016',
                    //     'name': '耽美文学'
                    // }
                ]
            },
            'guihua': {
                'id': 4,
                'sid': '100004',
                'name': '鬼话',
                'subPlate': [{
                        'id': '110017',
                        'name': '鬼话连篇'
                    },
                    // {
                    //     'id': '110018',
                    //     'name': '星座占卜'
                    // }
                ]
            },
            'youxi': {
                'id': 5,
                'sid': '100005',
                'name': '游戏烩',
                'subPlate': [{
                        'id': '110019',
                        'name': '综合讨论'
                    },
                    {
                        'id': '110020',
                        'name': '攻略心得'
                    },
                    {
                        'id': '110021',
                        'name': '动漫风云'
                    },
                    // {
                    //     'id': '110022',
                    //     'name': '魔兽论坛'
                    // }
                ]
            },
            'xiaohua': {
                'id': 9,
                'sid': '100009',
                'name': '冷笑话',
                'subPlate': [{
                        'id': '110035',
                        'name': '冷笑话'
                    },
                    {
                        'id': '110036',
                        'name': '爆笑猫扑'
                    }
                ]
            },
            'autoclub': {
                'id': 7,
                'sid': '100007',
                'name': '汽车烩',
                'subPlate': [{
                        'id': '110027',
                        'name': '我为车狂'
                    },
                    {
                        'id': '110029',
                        'name': '购车指南'
                    },
                    {
                        'id': '110028',
                        'name': '新车速递'
                    },
                    {
                        'id': '110030',
                        'name': '汽车图片'
                    },
                    // {
                    //     'id': '110031',
                    //     'name': '问题投诉'
                    // },
                    // {
                    //     'id': '110032',
                    //     'name': '二手车'
                    // },
                ]
            },
            'banwu': {
                'id': 11,
                'sid': '100011',
                'name': '版务',
                'subPlate': [{
                        'id': '110039',
                        'name': '版务交流'
                    },
                    {
                        'id': '110042',
                        'name': '投诉区'
                    },
                    {
                        'id': '110040',
                        'name': '小白区'
                    },
                    // {
                    //     'id': '110041',
                    //     'name': '联盟讨论'
                    // },
                ]
            }
        },

        // 贴贴版块
        ttPart: {
            '35': {
                'name': '猫女郎',
                'sid': '200009'
            },
            '44': {
                'sid': '210039',
                'name': '真我秀'
            },
            '121': {
                'sid': '210040',
                'name': 'T台秀场'
            },
            '45': {
                'sid': '210041',
                'name': '女神来了'
            },
            '46': {
                'sid': '210042',
                'name': 'Cosplay'
            },
            '94': {
                'name': '猫眼天下',
                'sid': '200010'
            },
            '100': {
                'sid': '210048',
                'name': '五花八门'
            },
            '99': {
                'sid': '210045',
                'name': '社会广角'
            },
            '98': {
                'sid': '210043',
                'name': '奇闻趣事'
            },
            '97': {
                'sid': '210046',
                'name': '人文风情'
            },
            '96': {
                'sid': '210044',
                'name': '探索发现'
            },
            '95': {
                'sid': '210047',
                'name': '史海钩沉'
            },
            '38': {
                'name': '萌宠',
                'sid': '200013'
            },
            '57': {
                'sid': '210063',
                'name': '家有萌宠'
            },
            '122': {
                'sid': '210066',
                'name': '疑难解答'
            },
            '124': {
                'sid': '210065',
                'name': '公益领养'
            },
            '132': {
                'sid': '210067',
                'name': '宠物新闻'
            },
            '36': {
                'name': '搞笑',
                'sid': '200002'
            },
            '52': {
                'sid': '210008',
                'name': '搞笑图片'
            },
            '51': {
                'sid': '210006',
                'name': '囧图神图'
            },
            '49': {
                'sid': '210007',
                'name': '爆笑漫画'
            },
            '50': {
                'sid': '210009',
                'name': 'PS恶搞'
            },
            '17': {
                'name': '旅游',
                'sid': '200005',
            },
            '104': {
                'sid': '210025',
                'name': '行行摄摄'
            },
            '103': {
                'sid': '210022',
                'name': '走遍中国'
            },
            '102': {
                'sid': '210026',
                'name': '环游世界'
            },
            '19': {
                'sid': '210024',
                'name': '自驾游'
            },
            '18': {
                'sid': '210021',
                'name': '驴友天地'
            },
            '118': {
                'sid': '210023',
                'name': '城市风景'
            },
            '39': {
                'name': '体育',
                'sid': '200001'
            },
            '58': {
                'sid': '210003',
                'name': '体育综合'
            },
            '60': {
                'sid': '210002',
                'name': '篮坛风云'
            },
            '62': {
                'sid': '210001',
                'name': '足球乐园'
            },
            '61': {
                'sid': '210004',
                'name': 'NBA烽火'
            },
            '59': {
                'sid': '210005',
                'name': 'DOTA电竞'
            },
            '37': {
                'name': '生活馆',
                'sid': '200011'
            },
            '43': {
                'sid': '210055',
                'name': '美食广场'
            },
            '125': {
                'sid': '210056',
                'name': '吃喝玩乐'
            },
            '88': {
                'sid': '210050',
                'name': '雪肌靓妆'
            },
            '126': {
                'sid': '210053',
                'name': '减肥塑身'
            },
            '92': {
                'sid': '210049',
                'name': '逛街购物'
            },
            '127': {
                'sid': '210054',
                'name': '手工DIY'
            },
            '42': {
                'sid': '210052',
                'name': '健康养生'
            },
            '41': {
                'sid': '210057',
                'name': '品味奢华'
            },
            '40': {
                'name': '数码',
                'sid': '200004'
            },
            '67': {
                'sid': '210016',
                'name': '手机之家'
            },
            '93': {
                'sid': '210018',
                'name': '数码快讯'
            },
            '66': {
                'sid': '210020',
                'name': '苹果中心'
            },
            '64': {
                'sid': '210015',
                'name': '数码摄影'
            },
            '63': {
                'sid': '210019',
                'name': 'DIY外设'
            },
            '65': {
                'sid': '210017',
                'name': '平板笔记本'
            },
            '69': {
                'name': '摄影',
                'sid': '200003'
            },
            '76': {
                'sid': '210013',
                'name': '街拍'
            },
            '108': {
                'sid': '210010',
                'name': '人像摄影'
            },
            '107': {
                'sid': '210012',
                'name': '风光摄影'
            },
            '106': {
                'sid': '210011',
                'name': '纪实民俗'
            },
            '105': {
                'sid': '210014',
                'name': '生态摄影'
            },
            '68': {
                'name': '明星',
                'sid': '200006'
            },
            '129': {
                'sid': '210032',
                'name': '明星现场'
            },
            '128': {
                'sid': '210028',
                'name': '明星写真'
            },
            '130': {
                'sid': '210034',
                'name': '人物周刊'
            },
            '131': {
                'sid': '210029',
                'name': '影视周刊'
            },
            '109': {
                'name': '校园',
                'sid': '200007'
            },
            '112': {
                'sid': '210035',
                'name': '青芜校园'
            },
            '111': {
                'sid': '210037',
                'name': '校花校草'
            },
            '110': {
                'sid': '210036',
                'name': '海外校园'
            },
            '113': {
                'name': '社区服务',
                'sid': '200012'
            },
            '116': {
                'sid': '210060',
                'name': '猫隐村'
            },
            '117': {
                'sid': '210058',
                'name': '版务交流'
            },
            '115': {
                'sid': '210059',
                'name': '联盟乐园'
            },
            '114': {
                'sid': '210061',
                'name': '投诉建议'
            }
        },

        // 回帖
        replyPostMsg: {
            "unlogin": "您尚未登录，请先登录。",
            "cacheDown": "服务器错误",
            "post-unpass": "帖子未通过审核，不能回复",
            "empty-reply": "请输入回复内容",
            "no-subject": "帖子不存在",
            "negativeMpReply": "您的mp<0，不能回帖",
            "cursed": "您已被诅咒，暂时不能回帖。使用护身符可以解除诅咒。",
            "blackHouseReply": "您已被关小黑屋，不能回帖。",
            "noCan-reply": "该帖不接受回复！",
        },

        // 神回复
        godreply: {
            "1": "楼主又被放出来了，快跑啊！",
            "2": "感觉不会再爱了~~",
            "3": "我艹",
            "4": "生日快乐！",
            "5": "么么哒~！",
            "6": "你屁股又痒了？",
            "7": "等死吧你！",
            "8": "求包养！",
            "9": "我膝盖中箭了！",
        }
    })
}));