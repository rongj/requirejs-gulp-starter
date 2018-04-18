/* 详情页分享 */

function __mop__detail__share () {
	function getShareImg () {
	    var img = '',
	        imgs = document.querySelector('.detail-article').querySelectorAll('img');
	    if (imgs.length) {
	        img = imgs[0].getAttribute('src')
	    }
	    return img
	}

	window._bd_share_config = {
	    common: {
	        bdText: document.querySelector('title').innerHTML || "猫扑大杂烩-猫扑网",
	        bdDesc: document.querySelector('meta[name="description"]').getAttribute('content') || '',
	        bdUrl: location.href.indexOf('_iframe') > -1 ? location.href.replace('location.href').replace('_iframe', '') : location.href,
	        bdPic: getShareImg()
	    },
	    share: [{
	        "bdSize": 60
	    }],
	    slide: [{
	        bdImg: 0,
	        bdPos: "right",
	        bdTop: location.href.indexOf('_iframe') > -1 ? -9999 : 200
	    }],
	    selectShare: [{
	        "bdselectMiniList": ['qzone', 'qq', 'weixin', 'tieba', 'tsina']
	    }]
	}
	with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '//bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
}
