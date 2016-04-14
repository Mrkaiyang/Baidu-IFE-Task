var TableTool = (function(){
	function init(opts){
		var instance = new table(opts)
		return instance;
	}
	function table(){
		
	}
	table.prototype = {
		defaultOpts:{
			append:$('.body'),
			data:{
				thead:[],
				sort:[],
				tbody:[]
			},
			isSort:true,
			isFrozen:true,
			headColor:'defaultColor'
		},
		//设置参数
		setOpts:function(opts){
			if(typeof opts == 'object'){
			this.opts = $.extend({},this.defaultOpts,opts);
			}
			else{
				console.log('参数格式错误')；
			}
		},
		createTable:function(){
			var tableData = this.opts.data
			var tpl = ''
		}
	};



	return{
		init:init
	}

})()

var table1 = TableTool.init({
	append:$('.body'),
	data:{
		thead:[],
		sort:[],
		tbody:{
			1:[]
		}
	},
	isSort:true,
	isFrozen:true,
	headColor:'defaultColor'
})