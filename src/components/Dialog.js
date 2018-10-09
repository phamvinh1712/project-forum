export function alert(message) {
	window.alert(message);
}
export function confirm(message, url) {
	if(window.confirm(message) == true) {
		window.location.href = url; // Add destination page to URL}
	}else{
		alert("cancel"); // DEMO
	}
}