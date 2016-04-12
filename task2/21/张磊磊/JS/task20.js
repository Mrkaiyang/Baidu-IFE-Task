
	function init($tagInput){
			this.$tagInput = $tagInput,
			this.$result = $tagInput.find('.result');
			this.$input = $tagInput.find('.input');
			this.listArr  = [];
		}
		init.prototype	 = {
			render:function(){
				var str = "";
				for (var i = 0; i < this.listArr.length; i++) {
					str += '<div>' + this.listArr[i] + '</div>'; 
				}
				console.log(this.listArr);
				console.log(str);
				this.$result.append(str);				
			},
			In:function(){
				if(!this.$input.val()){
					alert("请输入");
					return false;
				}
				else if (/[^\n\r\s 、,，0-9A-Za-z\u4e00-\u9fa5]/.test(this.$input.val())){
					alert("请输入数字");
					return false;
				}
				var splitArr = this.$input.val().trim().split(/[\s\r\n、,，]+/);
				//操作数组 
				this.listArr = splitArr.concat(this.listArr);				
			},
		}
	var tag = new init($('.tag-input'));
	var hobby = new init($('.hobby-input'));
	var $hobbyBtn = $('.confirm');
	//绑定事件
	$hobbyBtn.on('click',function(){
		hobby.In();
		hobby.render();
	})