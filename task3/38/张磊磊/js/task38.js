var TableTool = (function(Window,$,undefinded){
	init:function(opts){
		return new table(opts);
	}
	table:function(){
		
	}




	return{
		init:init
	}

})(Window,$)

var table1 = TableTool.init({
	Data:{},
	isSort:true;
	isFrozen:true;
	headColor:defaultColor;
})