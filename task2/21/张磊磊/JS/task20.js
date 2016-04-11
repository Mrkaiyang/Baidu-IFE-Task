window.onload = function(){
	(function(){
		inputList = [];
		function init ($tagInput){
			$tagInput.each(function(){
				var $cal = $(this);
				if ($cal.hasClass('init')){
					return;
				}
				inputList.push(new tagInput($cal));
				$cal.addClass('init');
			})
		};
		function getList(){
			return inputList;
		}
		function tagInput($tag){
			this.$tag = $tag;
			this.$input = $tag.find('.input');
			this.$result = $tag.find('.result');
			var this.listArr = [];
		};
		function render(){
			var this.str = "";
			for (var i = 0; i < this.listArr.length; i++) {
				this.str += '<div>' + this.listArr[i] + '</div>'; 
			}
			this.result.innerHTML = this.str ;
		};
		

	})()		
}