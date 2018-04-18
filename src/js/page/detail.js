require(['jquery', 'login', 'common_01'], function ($, Login) {
	"use strict";

	var login = new Login()

	var index = {
		init: function () {
			this.interActive()
		},

		/* 页面交互 */
		interActive: function () {

			// 登录按钮
			$('.btn-login').on('click', function (e) {
				e.preventDefault()
				login.show({
					success: function (d) {
						if(d.name) {
							$('.header-login')
							.find('span').html('欢迎你，'+d.name)
							.end()
							.show()
							.siblings('.header-unlogin').hide();
						}
					},
				})
			})
		}
	}

	index.init()
})