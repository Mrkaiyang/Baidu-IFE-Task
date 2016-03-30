//var queueLength = 0;
function getNumber() {
	var reg = /^\d+$/;
	var val = document.querySelector('#input-number').value;
	if(reg.test(val)) {
		return val;
	}
	return undefined;
}

function getEle() {
	var val = getNumber();
	var newItem = document.createElement('li');
	var newContent;
	if(val === undefined) { return false; }
	newContent = document.createTextNode(val);
	newItem.appendChild(newContent);
	console.log(newItem);
	return newItem;
}

function enqueueBefore() {
	var queue = document.querySelector('.queue');
	var newItem = getEle();
	if(newItem !=false) {
		queue.insertBefore(newItem, queue.firstChild);
		//queueLength++;
	}	
}

function enqueueAfter () {
	var queue = document.querySelector('.queue');
	var newItem = getEle();
	if(newItem !=false) {
		queue.appendChild(newItem);
		//queueLength++;
	}
}

function dequeueBefore() {
	var queue = document.querySelector('.queue');
	if(queue.firstChild) {
		alert(queue.firstChild.textContent);
		queue.removeChild(queue.firstChild);
	}
	else {
		alert('没有可出列元素');
	}
}

function dequeueAfter() {
	var queue = document.querySelector('.queue');
	if(queue.lastChild) {
		alert(queue.lastChild.textContent);
		queue.removeChild(queue.lastChild);
	}
	else {
		alert('没有可出列元素');
	}
}

function deleteElement(e) {
	if(e.target.nodeName.toLowerCase() == 'li') {
		alert(e.target.textContent);
		e.target.remove();
	}
}
function initBtnHandle() {
	document.querySelector('#enqueue-before').addEventListener('click',enqueueBefore);
	document.querySelector('#enqueue-after').addEventListener('click',enqueueAfter);
	document.querySelector('#dequeue-before').addEventListener('click',dequeueBefore);
	document.querySelector('#dequeue-after').addEventListener('click',dequeueAfter);
	document.querySelector('.queue').addEventListener('click',deleteElement);
}

function init() {
	initBtnHandle();
}

init();