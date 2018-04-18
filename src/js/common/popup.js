;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'global'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
	/* 弹出信息 */
	'use strict';
	if (!$('#popup').length) {
		GLOBAL.Util.createCss('css/popup.css', 'popup'); // 动态引入css
	}

	var timer;

	$.extend({
		/* 显示弹框 */
		showPopup: function (opts) {
			var title = opts.title || '',
				className = opts.className || '',
				content = typeof opts === 'object' ? opts.content : opts,
				backdrop = opts.backdrop || false;  // 点击背景不关闭
			var html = '', btnhtml = '', btns = opts.btns || [{'text': '确认'}];
		    var $body = $('body');
			for (var i = 0; i < btns.length; i++) {
				btnhtml += '<span>'+btns[i].text+'</span>'
			}
			if (btns.length) {
				// 弹框面板按钮点击事件
				$body.one('click', '.popup-btns span', function () {
					var click = btns[$(this).index()].click;
					if (click && typeof click === 'function') {
						click()
						$.hidePopup();
					} else {
						$.hidePopup();
					}
				})
			}

			html = '<div class="popup-wrap '+className+'">'+
		        '<div class="popup-panel">'+
		            '<div class="popup-header">'+
		                '<h3>'+title+'</h3>'+
		                '<span></span>'+
		            '</div>'+
		            '<div class="popup-content">'+
		                '<div class="popup-text">'+content+'</div>'+
		                '<div class="popup-btns">'+btnhtml+'</div>'+
		            '</div>'+
		        '</div>'+
		    '</div>';
			$body.append(html);

			// 关闭弹框面板
			$body.on('click', '.popup-header span', function () {
				$.hidePopup()
			}).on('click', '.popup-wrap', function (e) {
				if(!$(e.target).closest('.popup-panel').length && !backdrop) {
					$.hidePopup()
				}
			})
		},

		/* 关闭弹框 */
		hidePopup: function () {
			$('.popup-wrap').remove();
		},

		/* toast提示信息 */
		toast: function (opts) {
			var html = '<div class="toast-wrap"><div class="toast '+ (opts && opts.className || '') +'">'+(typeof opts === 'object' ? opts.text : opts)+'</div></div>'
			if (!$('.toast').length) {
				$('body').append(html)
			} else {
				$('.toast-wrap').remove();
				$('body').append(html)
			}
			clearTimeout(timer)
			timer = setTimeout(function () {
				$('.toast-wrap').remove();
				if (opts.callback && typeof opts.callback === 'function') o.callback();
			}, opts.time || 2000)
		},
	})
}));