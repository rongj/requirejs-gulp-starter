var Cookie = {};
Cookie = {
    /**
     * 设置cookie
     * @param name 名称
     * @param value 值
     * @param expires 有效时间（单位：小时）（可选） 默认：24h
     */
    set: function(name, value, expires, domain) {
        var expTimes = expires ? (Number(expires) * 60 * 60 * 1000) : (24 * 60 * 60 * 1000); // 毫秒
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + expTimes);
        var expString = expires ? '; expires=' + expDate.toUTCString() : '';
        var pathString = '; path=/';
        var domain = '; domain=' + domain;
        document.cookie = name + '=' + encodeURI(value) + expString + pathString + domain;
    },
    /**
     * 读cookie
     * @param name
     */
    get: function(name) {
        var cookieStr = '; ' + document.cookie + '; ';
        var index = cookieStr.indexOf('; ' + name + '=');
        if (index !== -1) {
            var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
            return decodeURI(s.substring(0, s.indexOf('; ')));
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param name
     */
    del: function(name, domain) {
        var exp = new Date(new Date().getTime() - 1);
        var s = this.get(name);
        if (s !== null) {
            document.cookie = name + '=' + s + '; expires=' + exp.toUTCString() + '; path=/; domain=' + domain;
        }
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

var qid = getQueryString('qid') || Cookie.get('qid') || 'null';
if (getQueryString('qid')) {
    Cookie.set('qid', getQueryString('qid'), 6, 'mop.com');
}


function renderGg(ids, size, display) {
    var s = "_" + Math.random().toString(36).slice(2),
        ggid = '';
    document.write('<div id="' + s + '"></div>');
    if (typeof ids === 'string') {
        ggid = ids;
    } else {
        if (ids[qid]) {
            ggid = ids[qid];
        } else {
            ggid = ids['mopdefault'];
        }
    }
    (window.slotbydup = window.slotbydup || []).push({
        id: ggid,
        container: s,
        size: size || '1000,90',
        display: display || 'inlay-fix'
    });
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左1 */
function __tv__video_index__01() {
    renderGg('4752142');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右1 */
function __tv__video_index__02() {
    renderGg('4752138');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左2 */
function __tv__video_index__03() {
    renderGg('4752144');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右2 */
function __tv__video_index__04() {
    renderGg('4752146');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左3 */
function __tv__video_index__05() {
    renderGg('4752148');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右3 */
function __tv__video_index__06() {
    renderGg('4752150');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左4 */
function __tv__video_index__07() {
    renderGg('4752152');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右4 */
function __tv__video_index__08() {
    renderGg('4752156');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左5 */
function __tv__video_index__09() {
    renderGg('4753290');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右5 */
function __tv__video_index__10() {
    renderGg('4753293');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告左6 */
function __tv__video_index__11() {
    renderGg('4753295');
}
/* 海南_猫扑_PC_视频首页_默认渠道猫扑_横幅广告右6 */
function __tv__video_index__12() {
    renderGg('4753297');
}

/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告左1 */
function __tv__video_index__13() {
    renderGg('4752495');
}
/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告右1 */
function __tv__video_index__14() {
    renderGg('4752497');
}
/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告左2 */
function __tv__video_index__15() {
    renderGg('4752499');
}
/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告右2 */
function __tv__video_index__16() {
    renderGg('4752502');
}
/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告左3 */
function __tv__video_index__17() {
    renderGg('4752504');
}
/* 海南_猫扑_PC_视频二级页面_默认渠道猫扑_横幅广告右3 */
function __tv__video_index__18() {
    renderGg('4752506');
}

/* 视频详情页 - 视频正下方左 */
function __video__index__01() {
    renderGg('4658235');
}
/* 视频详情页 - 视频正下方右 */
function __video__index__02() {
    renderGg('4658239');
}
/* 视频详情页 - 视频右1 */
function __video__index__03() {
    renderGg('4658247');
}
/* 猫扑视频详情页_播放器上方文字链 */
// function __video__index__04() {
//     renderGg('4730927');
// }
/* 猫扑视频详情页_热播推荐下方左 */
function __video__index__05() {
    renderGg('4730950');
}
/* 猫扑视频详情页_热播推荐下方右 */
function __video__index__20() {
    renderGg('4763935');
}
/* 猫扑视频详情页_右2 */
function __video__index__06() {
    renderGg('4731060');
}
/* 猫扑视频详情页_右3 */
// function __video__index__07() {
//     renderGg('4731060');
// }
/* 猫扑视频详情页_右下悬浮 */
function __video__index__08() {
    renderGg('4731142');
}
/* 猫扑视频详情页_暂停悬浮广告1 */
function __video__index__19() {
    renderGg('4764066');
}

/* 视频详情页 - 视频正下方左2 */
function __video__index__09() {
    renderGg('4752538');
}
/* 视频详情页 - 视频正下方右2 */
function __video__index__10() {
    renderGg('4752540');
}
/* 猫扑视频详情页_播放器上方文字链2 */
function __video__index__12() {
    renderGg('4730927');
}
/* 猫扑视频详情页_热播推荐下方左2 */
function __video__index__13() {
    renderGg('4752542');
}
/* 猫扑视频详情页_热播推荐下方右2 */
function __video__index__14() {
    renderGg('4761767');
}
/* 视频详情页 - 视频右12 */
function __video__index__11() {
    renderGg('4752555');
}
/* 猫扑视频详情页_右22 */
function __video__index__15() {
    renderGg('4752558');
}
/* 猫扑视频详情页_右32 */
function __video__index__16() {
    renderGg('4752560');
}
/* 猫扑视频详情页_右下悬浮2 */
function __video__index__17() {
    renderGg('4752562');
}
/* 猫扑视频详情页_暂停悬浮广告2 */
function __video__index__18() {
    // renderGg('');
}


/* 大杂烩首页 - 热门话题-圈区 */
function __dzh__index__renderGg__01() {
    // renderGg('2444842');
}

/* 大杂烩首页 - 帖子分类列表上 */
function __dzh__index__renderGg__02() {
    // renderGg('2495847');
}

/* 大杂烩首页 - 右侧广告1 */
function __dzh__index__right__renderGg__01() {
    // renderGg({
    //     'mopdefault': '4614101',
    //     '2345mz': '4623868'
    // });
}
/* 大杂烩首页 - 右侧广告2 */
function __dzh__index__right__renderGg__02() {
    // renderGg({
    //     'mopdefault': '4614133',
    //     '2345mz': '4623905'
    // });
}
/* 大杂烩首页 - 右侧广告3 */
function __dzh__index__right__renderGg__03() {
    // renderGg({
    //     'mopdefault': '4614140',
    //     '2345mz': '4623926'
    // });
}
/* 大杂烩首页 - 右侧广告4 */
function __dzh__index__right__renderGg__04() {
    // renderGg({
    //     'mopdefault': '4614149',
    //     '2345mz': '4623999'
    // });
}
/* 大杂烩首页 - 右侧广告5 */
function __dzh__index__right__renderGg__05() {
    // renderGg({
    //     'mopdefault': '4614178',
    //     '2345mz': '4624010'
    // });
}

/* 大杂烩首页 - 导航顶部广告 */
function __dzh__header__renderGg__02() {
    // renderGg({
    //     'mopdefault': '4614089',
    //     '2345mz': '4623817'
    // });
}

/* 大杂烩详情 - 导航顶部广告 */
function __dzh__header__renderGg__01() {
    // renderGg({
    //     'mopdefault': '4546545',
    //     '2345mz': '4624057'
    // });
}

/* 大杂烩详情 - 正文下方 */
function __dzh__detail__renderGg__01() {
    renderGg({
        'mopdefault': '4546564',
        '2345mz': '4624069'
    });
}

/* 大杂烩详情 - 分享下方 */
function __dzh__detail__renderGg__02() {
    renderGg({
        'mopdefault': '4546574',
        '2345mz': '4624083'
    });
}

/* 大杂烩详情 - 热门推荐下方 */
function __dzh__detail__renderGg__03() {
    renderGg({
        'mopdefault': '4546588',
        '2345mz': '4624095'
    });
}

/* 大杂烩详情 - 回复文字链 */
function __dzh__detail__renderGg__04() {
    // renderGg({
    //     'mopdefault': '4546622',
    //     '2345mz': '4624111'
    // });
}

/* 大杂烩详情 - 回复框上方 */
function __dzh__detail__renderGg__05() {
    renderGg({
        'mopdefault': '4546646',
        '2345mz': '4624125'
    });
}

/* 大杂烩详情 - 底部横幅 */
function __dzh__detail__renderGg__06() {
    // renderGg({
    //     'mopdefault': '4546661',
    //     '2345mz': '4624143'
    // });
}

/* 大杂烩详情 - 右1 */
function __dzh__detail__renderGg__07() {
    renderGg({
        'mopdefault': '4546672',
        '2345mz': '4624155'
    });
}

/* 大杂烩详情 - 右2 */
function __dzh__detail__renderGg__08() {
    renderGg({
        'mopdefault': '4546695',
        '2345mz': '4624170'
    });
}

/* 大杂烩详情 - 右3 */
function __dzh__detail__renderGg__09() {
    renderGg({
        'mopdefault': '4546757',
        '2345mz': '4624186'
    });
}

/* 大杂烩详情 - 右4 */
function __dzh__detail__renderGg__10() {
    renderGg({
        'mopdefault': '4546767',
        '2345mz': '4624197'
    });
}

/* 大杂烩详情 - 右5 */
function __dzh__detail__renderGg__11() {
    renderGg({
        'mopdefault': '4546774',
        '2345mz': '4624212'
    });
}

/* 大杂烩详情 - 图＋ */
function __dzh__detail__renderGg__12() {
    // renderGg({
    // 	'mopdefault': '4546779',
    // 	'2345mz': '4624233'
    // });
    renderGg('4546779');
}


/* 大杂烩详情 - 右侧信息流1 */
function __dzh__detail__renderGg__13() {
    renderGg({
        'mopdefault': '4695189',
        '2345mz': '4695266'
    });
}

/* 大杂烩详情 - 右侧信息流2 */
function __dzh__detail__renderGg__14() {
    renderGg({
        'mopdefault': '4695197',
        '2345mz': '4695281'
    });
}

/* 大杂烩详情 - 右侧信息流3 */
function __dzh__detail__renderGg__19() {
    renderGg({
        'mopdefault': '4695197',
        '2345mz': '4695281'
    });
}

/* 大杂烩详情 - 顶部通栏*/
function __dzh__detail__renderGg__15() {
    // renderGg('4730886');
}

/* 大杂烩详情 - 右侧信息流3*/
function __dzh__detail__renderGg__16() {
    renderGg('4730903');
}

/* 大杂烩详情 - 右下悬浮*/
function __dzh__detail__renderGg__17() {
    renderGg('4730913');
}

/* 大杂烩详情 - 右下悬浮*/
function __dzh__detail__renderGg__18() {
    // renderGg('4732339');
}



/* 贴贴详情 - 顶部通栏 */
function __tt__detail__renderGg__01() {
    renderGg({
        'mopdefault': '4743478',
        '01425': '5441560'
    });
    // renderGg('4743478');
}

/* 贴贴详情 - 顶部通栏右 */
function __tt__detail__renderGg__02() {
    renderGg({
        'mopdefault': '4743480',
        '01425': '5441620'
    });
    // renderGg('4743480');
}

/* 贴贴详情 - 正文下方 */
function __tt__detail__renderGg__03() {
    renderGg({
        'mopdefault': '4731805',
        '01425': '5441640'
    });
    // renderGg('4731805');
}

/* 贴贴详情 - 评论文字链 */
function __tt__detail__renderGg__04() {
    // renderGg({
    //     'mopdefault': '4743474',
    //     '01425': '5441642'
    // });
    // renderGg('4743474');
}

/* 贴贴详情 - 评论文字链 */
// function __tt__detail__renderGg__04 () {
// 	renderGg('4731870');
// }

/* 贴贴详情 - 回复框下面 */
function __tt__detail__renderGg__05() {
    renderGg({
        'mopdefault': '4743474',
        '01425': '5441642'
    });
    // renderGg('4743474');
}

/* 贴贴详情 - 右下悬浮 */
function __tt__detail__renderGg__06() {
    // renderGg({
    //     'mopdefault': '4743480',
    //     '01425': '5441644'
    // });
    // renderGg('4743480');
}

/* 贴贴详情 - 图+ */
function __tt__detail__renderGg__07() {
    // renderGg('4729408');
    renderGg({
        'mopdefault': '4729408',
        '01425': '5441646'
    });
}

/* 贴贴详情 - 右1 */
function __tt__detail__renderGg__08() {
    renderGg({
        'mopdefault': '4743462',
        '01425': '5439919'
    });
    // renderGg('4743462');
}

/* 贴贴详情 - 右2 */
function __tt__detail__renderGg__09() {
    renderGg({
        'mopdefault': '4743464',
        '01425': '5439933'
    });
    // renderGg('4743464');
}

/* 贴贴详情 - 右3 */
function __tt__detail__renderGg__10() {
    renderGg({
        'mopdefault': '4743466',
        '01425': '5441421'
    });
    // renderGg('4743466');
}

/* 贴贴详情 - 右4 */
function __tt__detail__renderGg__11() {
    renderGg({
        'mopdefault': '4743468',
        '01425': '5441496'
    });
    // renderGg('4743468');
}