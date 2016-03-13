$(document).ready(function() {

	/*********** 张磊磊 ***********/
	$('.window').find('ul').hover(
	  function(){
	  $(this).stop(true, true).animate({"top": "-=26px"}, 300);
	  },
	  function(){
	  $(this).stop(true, true).animate({"top": "-=-26px"}, 300);
	});
	$('.window > ul').eq(1).on('click',function(){
		$('body,html').animate({scrollTop:651},500);
	});
	$('.window > ul').eq(2).on('click',function(){
		$('body,html').animate({scrollTop:1551},500);
	});
	$('.window > ul').eq(3).on('click',function(){
		$('body,html').animate({scrollTop:2450},500);
	});
	$('.window > ul').eq(4).on('click',function(){
		$('body,html').animate({scrollTop:2970},500);
	});
	$('.banner').find('span').on('click',function(){
		$('body,html').animate({scrollTop:651},500);
	});



	/*********** 乔震 ************/

	/*********** 鲍鲍 ************/

	/*********** 小鑫鑫 **********/

	/*********** 岳谱 ************/
	
})