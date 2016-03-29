//var queueLength = 0;
var queueArr = [];

//验证输入内容合法性
function getText() {
	var reg = /^[\da-zA-Z\u4E00-\u9FA5\r\0\n\s，,、]+$/;
	var val = document.querySelector('#textarea').value;
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

function enqueueBefore() {
	var text = getText();
	var separators = /[\r\0\n\s,，、]+/;
	var elements = [];
	if(text != undefined) {
		elements = text.split(separators);
		elements.map(function(value, index){
			queueArr.unshift(value);
		})
		renderQueue();
	}
	else {
		alert('输入内容包含非法字符！');
	}
}

function enqueueAfter () {
	var text = getText();
	var separators = /[\r\0\n\s,，、]+/;
	var elements = [];
	if(text != undefined) {
		elements = text.split(separators);
		elements.map(function(value, index){
			queueArr.push(value);
		});
		renderQueue();
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

function dequeueAfter() {
	if(queueArr.length) {
		queueArr.pop();
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

function deleteElement(e) {
	if(e.target.nodeName.toLowerCase() == 'li') {
		//alert(e.target.style.height);
		var i = nodeIndex(e.target);
		e.target.remove();
		queueArr.splice(i-1,1);
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

function renderQueue() {
	var queue = document.querySelector('.queue');
	while(queue.firstChild) {
		queue.removeChild(queue.firstChild);
	}
	queueArr.map(function(value){
		var node = document.createElement('li');
		var content = document.createTextNode(value);
		node.appendChild(content);
		queue.appendChild(node);
	})
}
function initBtnHandle() {
	document.querySelector('#enqueue-before').addEventListener('click',enqueueBefore);
	document.querySelector('#enqueue-after').addEventListener('click',enqueueAfter);
	document.querySelector('#dequeue-before').addEventListener('click',dequeueBefore);
	document.querySelector('#dequeue-after').addEventListener('click',dequeueAfter);
	document.querySelector('.queue').addEventListener('click',deleteElement);
	document.querySelector('#query-btn').addEventListener('click',query);
}

function init() {
	initBtnHandle();
}

init();