//var queueLength = 0;
var tagArr = [],
	hobbyArr = [];

//验证输入内容合法性并进行整形
function validateText(val) {
	var reg = /^[\da-zA-Z\u4E00-\u9FA5\r\0\n\s，,、]+$/;
	if(reg.test(val)) {
		return trimBothSides(val);
	}
	return undefined;
	function trimBothSides(str) {
		var spaceLeft = /^[\s]+/;
		var spaceRight = /[\s]+$/;
		str = str.replace(spaceLeft,'');
		str = str.replace(spaceRight,'');
		return str;
	}
}

function detectTagInput(event) {
	var text = event.target.value;
	var tagQueue;
	var lastChar = text.slice(-1);
	var keycode = event.keyCode;
	var endingReg = /[\n\s，,]/ //用正则匹配判断逗号和空格，回车无法从字符串中截取
	var endingCode = [13]; // 用keycode判断回车，空格在中文输入法下回出现bug，不能用keycode判断
	if((endingCode.indexOf(keycode)>-1)||endingReg.test(lastChar)) {
		event.preventDefault();
		text = endingCode.indexOf(keycode)>-1 ? text:text.slice(0,-1);
		tagQueue = document.querySelector('.tags');
		event.target.value = '';
		enqueueAfter(text,tagArr);
		renderQueue(tagArr,tagQueue);
	}
}

function addHobby() {
	var hobbyStr = document.querySelector('#hobby-input').value;
	var hobbyQueue = document.querySelector('.hobbies');
	if((hobbyStr = validateText(hobbyStr))!=undefined) {
		enqueueAfter(hobbyStr,hobbyArr);
		renderQueue(hobbyArr,hobbyQueue);
	}
}
function enqueueAfter(text,arr) {
	var separators = /[\r\0\n\s,，、]+/;
	var elements = [];
	if(text != undefined) {
		elements = text.split(separators);
		elements.map(function(value, index){
			if(arr.indexOf(value) == -1 && value!='') {
				arr.push(value);
				if(arr.length >= 10) {
					arr.shift();
				}
			}
		});
	}
	else {
		alert('输入内容包含非法字符！');
	}
}

function dequeueBefore() {
	if(queueArr.length) {
		queueArr.shift();
		renderQueue();
	}
	else {
		alert('没有可出列元素');
	}
}

function query() {
	var reg = /^[\da-zA-Z\u4E00-\u9FA5]+$/;
	var queryText = document.querySelector('#query-input').value;
	var queue = document.querySelector('.queue');
	var resultIndex = []; // 匹配元素在队列中的位置
	if(reg.test(queryText)) {
		queueArr.map(function(value,index){
			if(value.indexOf(queryText)!=-1) {
				resultIndex.push(index);
			}

			// 清空上次查询的高亮颜色
			document.querySelector('.queue li:nth-child('+(index+1)+')').style.backgroundColor = 'red';
		});
		resultIndex.map(function(value, index){
			var resultNode = document.querySelector('.queue li:nth-child('+(value+1)+')');
			resultNode.style.backgroundColor = 'green';
		})
	}
}

function deleteTag(e) {
	if(e.target.nodeName.toLowerCase() == 'li') {
		//alert(e.target.style.height);
		var i = nodeIndex(e.target);
		e.target.remove();
		tagArr.splice(i-1,1);
		console.log(tagArr);
	}
	// 返回此节点是其父元素的第几个子元素
	function nodeIndex(node) {
		var i=1;
		while(node = node.previousSibling) {
			if(node.nodeType ===1) { i++;}
		}
		return i;
	}
}
/**
 * @param arr: 存放要渲染数据的数组
 * @param queue: 要渲染的节点
 */
function renderQueue(arr,queue) {
	while(queue.firstChild) {
		queue.removeChild(queue.firstChild);
	}
	arr.map(function(value){
		var node = document.createElement('li');
		var content = document.createTextNode(value);
		node.appendChild(content);
		queue.appendChild(node);
	})
}

function initBtnHandle() {
	document.querySelector('#tag-input').addEventListener('keyup',detectTagInput);
	document.querySelector('.tags').addEventListener('click',deleteTag);
	document.querySelector('#hobby-btn').addEventListener('click',addHobby);
}

function init() {
	initBtnHandle();
}

init();