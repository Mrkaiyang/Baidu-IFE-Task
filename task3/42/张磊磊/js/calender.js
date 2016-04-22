var CalenderTool = (function(){
	function init(opts){
			var instance = new calender(opts)
			return instance;
		}
	function calender(opts){
		this.$contanier = $(opts).append
	}

	calender.prototype = {
		defaultOpts:{
			append:$('.calendar-contanier'),
			callBack:function(){},
			chooseRange:30
		},

		createCalender:function(){
			var tpl = '<div class="calendar-contanier-cover"></div>'
					+ '<dl ><dt>'
					+'<div class="pre-year"></div>'
					+'<div class="pre-month"></div>'
					+ '<div class="now-data">'
					+'<div class="now-data-month">ARRIL</div>'
					+'<div class="now-data-year">2016</div>'
					+'</div>'
					+'<div class="next-month"></div>'
					+'<div class="next-year"></div>'
					+'</dt><dd>'
					+'<ul class="cal-head">'
					+'<li>MON</li>'
					+'<li>TUE</li>'
					+'<li>WED</li>'
					+'<li>THU</li>'
					+'<li>FRI</li>'
					+'<li>SAT</li>'
					+'<li>SUN</li>'
					+'</ul>'
					+'<div class="cal-body ">'
					+'<ul></ul>'
					+'</div></dd>'
					+'<a class="cal-confirm" href="javascirpt:void(0)">Confirm</a>'
					+'</dl>';
			this.$Calender = $(tpl);

		},
		render:function(data){
			var renderYear    = data.getFullYear(),
				renderMonth   = data.getMonth(),
				renderDate    = data.getDate(),
				renderWeekDay = new Date(renderYear,renderMonth,renderDate).getDay,
				nowMonthDateCount = new Date(renderYear,renderMonth+1,0).getDate(),
				preMonthDateCount = new Date(renderYear,renderMonth,0).getDate(),
				renderSpace = this.$Canlender.find('.cal-body ul');


		}
	};
	return{
		init:init, 
	}

})();
var calender1 = Calender.init({
	append:$('.calendar-contanier'),
	callBack:function(){},
	chooseRange:30
})