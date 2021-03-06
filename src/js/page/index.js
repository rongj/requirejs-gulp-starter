require(['jquery', 'login', 'popup', 'common_01', 'common_02', '../common/todo.js', '../common/list.js'], function ($, Login) {
	"use strict";

	var login = new Login()

	var index = {
		init: function () {
			this.interActive()
		},

		/* 页面交互 */
		interActive: function () {
			// 插入riot标签
			$('.todo-test').append('<todo></todo>')
			riot.mount('todo') // 动态插入重新mount

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

			// 需要登录
			$('.login-alert').on('click', function (e) {
				login.show({
					success: function () {
						alert(1)
					},
				})
			})

			$('.login-link').on('click', function (e) {
				login.show({
					success: function () {
						location.href = 'http://www.baidu.com'
					},
				})
			})


			// 弹窗测试
			$('.popup-one').on('click', function (e) {
				$.showPopup('我知道了！')
			})

			$('.popup-two').on('click', function (e) {
				$.showPopup({
					content: '<p>提示内容字符串</p>',
					btns: [{
						text: '确认',
						click: function() {
							alert('你点了确认！')
						}
					},{
						text: '取消'
					}]
				})
			})

			$('.popup-three').on('click', function (e) {
				$.showPopup({
					title: '弹窗提示',
					className: 'popup-test',
					backdrop: true,
					content: '点击背景不关闭'
				})
			})


			// 提示测试
			$('.toast-one').on('click', function (e) {
				$.toast('提示')
			})

			$('.toast-two').on('click', function (e) {
				$.toast({
					className: 'toast-success',
					time: 5000,
					text: '5s后我自己消失'
				})
			})
		}
	}

	
	index.init()
})