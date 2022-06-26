
window.onload   = load;
window.onresize = resize_div;


function load() {
	resize_div();
}

function resize_div() {
	let browserWidth  = window.innerWidth;
	let browserHeight = window.innerHeight;

	// Home
	document.querySelector('#landing').style.height = browserHeight + "px";
	document.querySelector('#landing').style.width  = browserWidth  + "px";

	// title bars
	document.querySelectorAll('#titleBar').forEach(element => {
		element.style.marginLeft    = ((browserWidth / 2) -  60) + "px";
	});
}