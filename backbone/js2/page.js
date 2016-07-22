window.onload = function () {

	var but = document.getElementById('button');
	var frame = document.getElementById('iframe');
	

	but.onclick = function () {
	
		frame.contentWindow.postMessage(1,'*'); 
		
	}

}