$(document).ready(function() {

	/*********** 张磊磊 ***********/

	/*********** 乔震 ************/

	/*********** 鲍鲍 ************/

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