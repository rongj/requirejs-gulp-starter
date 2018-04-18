;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery', 'global'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
	/* 登录 */
	'use strict';
	if (!$('#login').length) {
		GLOBAL.Util.createCss('css/login.css', 'login'); // 动态引入css
	}

	var html = '<div class="login-wrap" id="login-panel">'+
			'<div class="login-panel">'+
				'<div class="panel-header">'+
					'<h3>登录</h3>'+
					'<span class="login-close"></span>'+
				'</div>'+
				'<input type="text" placeholder="请输入用户名">'+
				'<input type="password" placeholder="请输入密码">'+
				'<span class="btn-submit">登录</span>'+
			'</div>'+
		'</div>';


	function Login() {
		this.backdrop = false;
		this.success_cb = null;
		this.hide_cb = null;
		this.ablesubmit = true;
		this.init();
	}

	Login.prototype = {
		/* 初始化 */
		init: function () {
			// 页面交互
			this.interActive()
		},

		/* 页面交互 */
		interActive: function () {
			var _this = this,
				$login = $('#login-panel');
			$(document)
			// 点击关闭按钮
			.on('click', '.login-close', function () {
				_this.hide()
			})

			// 点击背景关闭
			.on('click', '.login-wrap',function(e) {
				if(!$(e.target).closest('.login-panel').length && !_this.backdrop) {
					_this.hide()
				}
			})

			// 点击登录按钮
			.on('click', '.btn-submit', function () {
				_this.ablesubmit && _this.logined()
			})
		},

		/* 显示登录弹窗 */
		show: function (opts) {
			var _this = this;
			if(!$('#login-panel').length) {
				$('body').append(html).find('.login-wrap').show();
			} else {
				$('#login-panel').show()
			}
			if(opts) {
				opts.show && opts.show();
				_this.backdrop = opts.backdrop && opts.backdrop;
				_this.success_cb = opts.success && opts.success;
				_this.hide_cb = opts.hide && opts.hide;
			}
		},

		/* 关闭登录弹窗 */
		hide: function () {
			$('#login-panel').hide()
			this.hide_cb && this.hide_cb()
		},

		/* 登录成功 */
		logined: function () {
			var _this = this;
			_this.ablesubmit = false;
			var d = {
				'msg': '登录成功',
				'name': 'username'
			}
			setTimeout(function() {
				alert('登录成功')
				_this.ablesubmit = true;
				_this.hide();
				_this.success_cb && _this.success_cb(d)
			}, 500)
		}

	}

	return Login

}));