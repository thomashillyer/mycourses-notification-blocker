// <li> class = "d2l-datalist-item d2l-datalist-item-actionable d2l-datalist-simpleitem"
const notifBox = document.querySelector('');


window.onload = hideNotifications;

//add click listner to 'load more' button
// window.addEventListener(/*'keydown'*/, hideNotifications);

function hideNotifications() {
	const osdItems = document.querySelectorAll("div[title^='Content Created, OSD']")

	osdItems.forEach(function(divItem) {
		divItem.style.backgroundColor = "red";
	})

}