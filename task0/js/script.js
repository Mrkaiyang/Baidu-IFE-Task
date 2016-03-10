$(document).ready(function() {

	/*********** 张磊磊 ***********/

	/*********** 乔震 ************/

	/*********** 鲍鲍 ************/
	(function($) {

		$.fn.fadeSlider = function(options) {

			// 默认参数
			var defaults = {
				fadeSpeed: 500,		// 淡入淡出速度
				displayDuration: 5000		// 播放停留时间
			}

			var $slides = [],
				$nav,
				$slider = this,
				settings = $.extend({},defaults,options),
				namespace = 'fs-',
				methods = {};

			// 私有方法
			methods = {

				// 初始化
				init: function() {
					$slides = $slider.find('slides li');
					$nav = methods.createNav();
				},

				// 创建DOM
				createDOM: function() {

					$slides = $slides.map(function(item, index) {
						var $slide = item;
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

					$nav = $('<ol class="'namespace+'nav">'+$li.join('')+'</ol>');
					return $nav;
				}
			};

			
		}
	})(jQuery);
	/*********** 小鑫鑫 **********/

	/*********** 岳谱 ************/

})