/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = trim(document.querySelector('#aqi-city-input').value);
	var aqi = trim(document.querySelector('#aqi-value-input').value);

	if(!validate(city,aqi)) {return false;}

	aqiData[city] = aqi;
	console.log(aqiData);
	function validate(city,aqi) {
		console.log(city);
		var validateChineseAndEnglish = new RegExp("^[a-zA-Z\u4E00-\u9FA5]+$"),
			validateNumber = new RegExp("^[0-9]+$");

		if(!validateChineseAndEnglish.test(city)) {
			alert('城市名称必须为中英文字符');
			return false;
		}
		if(!validateNumber.test(aqi)) {
			alert('空气质量指数必须为整数');
			return false;
		}
		return true;
	}

	function trim(str) {
		return str.replace(/ /g,'');
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var list = document.querySelector('#aqi-table');
	
	while(list.firstChild) {
		list.removeChild(list.firstChild);
	}

	var header = document.createElement('tr');
	header.innerHTML = '<td>城市</td><td>空气质量</td><td>操作</td>';
	list.appendChild(header);

	for(var key in aqiData) {
		var node = document.createElement('tr');
		node.innerHTML = '<td>'+key+'</td><td>'+aqiData[key]+'</td>'+'<td><button>删除</button></td>';
		list.appendChild(node);
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  var city;
  if(e.target && e.target.nodeName.toLowerCase() == 'button') {
  	city = e.target.parentNode.parentNode.firstChild.textContent;
  	delete aqiData[city];
  }
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.querySelector('#add-btn').addEventListener('click', addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.querySelector('#aqi-table').addEventListener('click', delBtnHandle);
}

init();
