$(document).ready(function() {

	/*********** 张磊磊 ***********/

	/*********** 乔震 ************/

	/*********** 鲍鲍 ************/

	(function($) {

		$.fadeSlider = function(el, options) {

			// 默认参数
			var defaults = {
				fadeSpeed: 500,		// 淡入淡出速度
				displayDuration: 5000		// 播放停留时间
			}

			var $slides = [],
				$nav,
				$slider = $(el),
				settings = $.extend({},defaults,options),
				namespace = 'fs-',
				methods = {};

			// 私有方法
			methods = {

				// 初始化
				init: function() {
					$slides = $slider.find('.slides li');
					$nav = methods.createNav();
					methods.setup();
				},

				// 启用
				setup: function() {

					methods.createDOM();
					
				},

				// 创建DOM
				createDOM: function() {

					$slides = $slides.map(function(index, item) {
						var $slide = $(item);
						$slide.addClass('slide');
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
					});
					return $nav;
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

			/* Act on the event */
			$('.karl-slider').fadeSlider({
				fadeSpeed: 1000
			});
		});
		
	})(jQuery);
	/*********** 小鑫鑫 **********/

	/*********** 岳谱 ************/

})