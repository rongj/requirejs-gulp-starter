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
        }
    })
}));