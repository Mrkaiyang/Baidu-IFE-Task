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
				sortSwitch:[],
				tbody:{
				}
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

		},
		renderTable:function(){
			var tableDataThead = this.opts.thead;//数组
				tableDataTbody = this.opts.tbody;//对象
			var theadStr = '',
				tbodyStr = '';
			//拼接表头数组
			for (var i = 0;i < tableDataThead.length; i++){
				var temHeadStr = '',//临时字符串清空
				temHeadStr = '<th>' + tableDataThead[i] +'<span></span></th>';
							theadStr += temHeadStr;
			}
			//拼接表身数组
			for(var Arr in tableDataTbody){
				var temBodyLineStr = '';
				var temBodyCloStr = '';
				for(var i = 0;i < tableDataTbody[Arr].length ;i++){
					var puzzleStr = '';
					puzzleStr = '<td>' + tableDataTbody[Arr][i] +'</td>';
					temBodyCloStr += puzzleStr ;
				}
				temBodyLineStr = '<tr>' + temBodyCloStr+'</tr>';
				tbodyStr += temBodyLineStr
			}
			var tpl = '<table border=1 class="table-tool">' 
					+ '<thead>' 
					+ '<tr>'
					+ theadStr 
					+ '</tr>'
					+ '</thead>'
					+ '<tbody>'
					+ tbodyStr
					+ '</tbody>'
					+ '</table>';
			this.$table = tpl;
		},
		setTable:function(){
			if(!this.opts.isSort){
				this.$table.find('span').hidden();
			}
		}
	};


	return{
		init:init
	};

})()

var table1 = TableTool.init({
	append:$('.body'),
	data:{
		thead:[],
		sortSwitch:[],
		tbody:{
			1:[],
			2:[]
		}
	},
	isSort:true,
	isFrozen:true,
	headColor:'defaultColor'
})