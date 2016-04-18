var TableTool = (function(){
	function init(opts){
		var instance = new table(opts)
		return instance;
	}
	function table(opts){
		this.setOpts(opts);
		this.renderTable();
		this.setTable();
		this.bindEvent();
		
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
			var tableDataThead = this.opts.data.thead;//数组
				tableDataTbody = this.opts.data.tbody;//对象
			var theadStr = '',
				tbodyStr = '',
				tpl      = '';
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
			 tpl = '<table border=1 class="table-tool">' 
					+ '<thead class="real-head">' 
					+ '<tr>'
					+ theadStr 
					+ '</tr>'
					+ '</thead>'
					+ '<tbody>'
					+ tbodyStr
					+ '</tbody>'
					+ '</table>';
			this.$table = $(tpl);
			$(this.opts.append).html('');
			$(this.opts.append).append(this.$table)
		},
		setTable:function(){
			if(!this.opts.isSort){
				this.$table.find('span').hide();
			}
			else {
				for (var i = 0; i < this.opts.data.sortSwitch.length; i++) {
					if(this.opts.data.sortSwitch[i] == 0 ){
						this.$table.find('span').eq(i).hide();
					}
				}
			}
			if(this.opts.isFrozen){
				this.frozenTable();
				
			}
			if(this.opts.headColor  != 'defaultColor' ){
				this.$table.find('th').css({
					background : this.opts.headColor 
				});
			}
		},
		bindEvent:function(){
			var self = this ,
				spanList = this.$table.find('.real-head span'),
				sortFlag = {};
				this.sortFlag  = sortFlag ;
			for(var i = 0;i < this.opts.data.thead.length;i++ ){
				this.sortFlag[i] = true;
			}
			spanList.on('click',function(e){
				var target = e.target,
					indexSpan = spanList.index(target)-3;
					if(self.sortFlag[indexSpan] == true){	
					console.log(1);	
						self.sortUpTable(indexSpan);
						self.renderTable();
						self.setTable();
						self.bindEvent();
						self.sortFlag[indexSpan] = false;
						console.log()
					}
					else{
						console.log(2);				
						self.sortDownTable(indexSpan);
						self.renderTable();
						self.setTable();
						self.bindEvent();
						self.sortFlag[indexSpan] = true;
					}

			})
		},
		frozenTable:function(){
			var $table        = this.$table,
				$tableHead    = $table.find('thead'),
				tableH        = $table.height(),
                headW         = $tableHead.width(),
                headStyle     = $tableHead.attr('style'),
                headOffsetTop = $tableHead.offset().top,
                headOffLeft   = $tableHead.offset().left;
            var $headClone    = $tableHead.clone()
            				    .css('opacity',0)
            				    .insertBefore($tableHead)
            				    .hide();
            var self          =  this;
            	this.$headClone = $headClone;
            $(window).on('scroll',function(){
            	var scrollTop = $(this).scrollTop();
            	if (scrollTop >= (headOffsetTop + tableH)){
            		if(!!$tableHead.attr('data-fixed')){
            			$tableHead.removeAttr('data-fixed')
	                        .removeAttr('style')
	                        .attr('style',headStyle);
                   		$headClone.hide();
            		}
            	}
            	else if( scrollTop > headOffsetTop){
            		if(!!!$tableHead.attr('data-fixed')){
            			$tableHead.attr('data-fixed',true)
	                        .css({
	                            position: 'fixed',
	                            top: 0,
	                            left: headOffLeft,
	                            'z-index': 9999,
	                            width: headW,
	                            margin: 0
	                            });
	                    $table .css({
	                    	'z-index': 8888,
	                    });
	                    $headClone.show();
            		}
            	}
            	else{
            		if(!!$tableHead.attr('data-fixed')){
            			$tableHead.removeAttr('data-fixed')
	                        .removeAttr('style')
	                        .attr('style',headStyle);
                   		$headClone.hide();
            		}
            	}
            })
		},
		sortDownTable:function(index){
			var sortData = this.opts.data.tbody,
				newArr   = [] ,
				newObj   = {};
			for (key in sortData){
				newArr.push(sortData[key]);	
			}
			newArr.sort(function(a,b){
				return a[index] - b[index];
			})
			for (var i = 0; i < newArr.length; i++) {
				newObj[i+1] = newArr[i];
			}
			this.opts.data.tbody = newObj
		},
		sortUpTable:function(index){
			var sortData = this.opts.data.tbody,
				newArr   = [] ,
				newObj   = {};
			for (key in sortData){
				newArr.push(sortData[key]);	
			}
			newArr.sort(function(a,b){
				return b[index] - a[index];
			})
			for (var i = 0; i < newArr.length; i++) {
				newObj[i+1] = newArr[i];
			}
			this.opts.data.tbody = newObj;
		}
	};


	return{
		init:init
	};

})()
//调用
var table1 = TableTool.init({
	append:$('.table1'),
	data:{
		thead:['姓名','年龄','身高'],
		sortSwitch:[1,1,1],
		tbody:{
			1:['习习',52,180],
			2:['蛤蛤',10000,176],
			3:['丽媛',48,166],
			4:['小平',78,120],
			5:['高富帅',22,188],
			6:['续命',87,182],
			7:['华莱士',43652,153]
		}
	},
	isSort:true,
	isFrozen:true,
	headColor:'defaultColor'//defaultColor
})
var table1 = TableTool.init({
	append:$('.test2'),
	data:{
		thead:[3,3,3],
		sortSwitch:[1,1,1],
		tbody:{
			1:[1,6782,345],
			2:[2,562,345],
			3:[21,43652,453],
			4:[13,232,77],
			5:[14,2342,3254],
			6:[15,2,3],
			7:[1231,32,2]
		}
	},
	isSort:true,
	isFrozen:true,
	headColor:'defaultColor'//defaultColor
})