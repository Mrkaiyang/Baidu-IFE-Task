$(document).ready(function() {

	/*********** 张磊磊 ***********/

	/*********** 乔震 ************/

	/*********** 鲍鲍 ************/

	(function($) {

		$.fadeSlider = function(el, options) {

			// 默认参数
			var defaults = {
				displayDuration: 5000		// 播放停留时间
			}

			var curSlide = 0,
				$nav,
				$navItems,
				$slides,
				$slider = $(el),
				settings = $.extend({},defaults,options),
				namespace = 'fs-',
				methods = {};

			// 计时器
			var timer = 0;

			// 私有方法
			methods = {

				// 初始化
				init: function() {
					$slides = $slider.find('.slides li');
					$nav = methods.createNav();
					$navItems = $nav.find('li');
					methods.setup();
				},

				// 启用
				setup: function() {
					methods.createDOM();
					timer = setInterval(methods.playNext, settings.displayDuration);

					// 触发手动导航
					$('.'+namespace+'nav').on('click','li',function(){
						var index = $(this).index('.'+namespace+'nav li');

						// 清空计时器
						clearInterval(timer);
						methods.play(index);

						// 重启计时器
						timer = setInterval(methods.playNext, settings.displayDuration);
					})
				},

				// 创建DOM
				createDOM: function() {
					$slides.map(function(index, item) {
						var $slide = $(item);
						$slide.addClass('slide');
						if(index == 0) { $slide.addClass('active'); }
						return $slide;
					});
					$slider.append($nav);
				},

				// 创建索引
				createNav: function() {
					var $nav,
						$li = [];

					for(var i=0; i<$slides.length; i++) {
						$li.push($('<li><a href="#"></a></li>'));
					}

					$nav = $('<ol class="'+namespace+'nav"></ol>');
					$.each($li, function(index, el) {
						$(this).appendTo($nav);
						if(index == 0) { $(this).addClass('active'); }
					});
					return $nav;
				},

				// 播放指定slide
				// @parameter index: slide索引
				play: function(index) {
					if(index>=0 && index<$slides.length && index!=curSlide) {
						$slides.removeClass('active').eq(index).addClass('active');
						$navItems.removeClass('active').eq(index).addClass('active');
						curSlide = index;
					}
				},

				// 播放下一张slide
				playNext: function() {

					var nextIndex = curSlide+1>=$slides.length ? 0:curSlide+1;
					methods.play(nextIndex);
				}

			};

			methods.init();
		}
		

		// 外部调用此拓展方法
		$.fn.fadeSlider = function(options) {
			if(typeof options === 'object' || typeof options === 'undefined') {
				return this.each(function(index, el) {
					$.fadeSlider(this,options);
				});
			}

		}
	})(jQuery);

	(function($) {
		$(window).load(function() {

			// 初始化slider
			$('.karl-slider').fadeSlider();

			// gallery-box触发事件
			$('.karl-slider').on('click', '.cover', function(event) {
				var $img = $(this).parent().find('img');
				$('.gallery-modal img').attr('src',$img.attr('src'));
				$('.gallery-modal').fadeIn(400);
			});

			// modal
			$('.gallery-modal').on('click',function(event) {
				$(this).fadeOut(400);
			}).on('click','img',function(event) {
				event.stopPropagation();
			})
		});
		
	})(jQuery);
	/*********** 小鑫鑫 **********/
	$(function () {
		var timer,
			index = 1,
			$avatarUl = $('.yang_avatar_content ul'),
			$width = $avatarUl.find('li').outerWidth();
		$avatarUl.css({"left": -$width});
		//--自动向右滚动
		function autoRun() {
			if (index > 4) {
				index = 0;
				$avatarUl.css({"left": "0px"});
			}
			index++;
			$avatarUl.stop(true, true).animate({"left": -$width * index}, 500);
			console.log($width);
		}
		function prevRun() {
			index--;
			if (index < 0) {
				index = 4;
				$avatarUl.css({"left": -(index+1)*$width});
			}
			$avatarUl.stop(true, true).animate({"left": -$width * index}, 500);
		}
		timer = setInterval(autoRun, 2000);
		$('.yang_left').on('click', function (e) {
			prevRun();
		});
		$('.yang_right').on('click', function (e) {
			autoRun();
		});
		$('.yang_contain').hover(function () {
			clearInterval(timer);
		}, function () {
			timer = setInterval(autoRun, 2000);
		});
		//---浏览器窗口改变时
		$(window).resize(function () {
			$width = $avatarUl.find('li').outerWidth();
			$avatarUl.css({"left": -$width});
		});
	});
	/*********** 岳谱 ************/

})