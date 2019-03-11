// <li> class = "d2l-datalist-item d2l-datalist-item-actionable d2l-datalist-simpleitem"
// const notifBox = document.querySelector('');


// window.onload = hideNotifications;

//add click listner to 'load more' button
// window.addEventListener(/*'keydown'*/, hideNotifications);


/*document.addEventListener('DOMContentLoaded', function(){
	console.log("doc ready domCL");
	updateButton = document.querySelector("button[title='Update alerts']");
	updateButton.addEventListener('click', hideNotifications);
}, false);*/
/*let updateButton = null;
window.addEventListener('load', ready, false );

function ready() {
	console.log("doc ready");

	updateButton = document.querySelector("button[title='Update alerts']");
	console.log(updateButton);
	if(updateButton){
		updateButton.addEventListener('click', hideNotifications);
	}
}*/



function hideNotifications() {
	console.log("OSD notif blocker");
	
	const osdItems = document.querySelectorAll("div[title^='Content Created, OSD']")
	// console.log(osdItems);

	osdItems.forEach(function(divItem) {
		let immedParent = divItem.parentElement;
		let grandParent = immedParent.parentElement;
		console.log(divItem.innerText);
		grandParent.removeChild(immedParent);
		divItem.style.backgroundColor = "red";
	})

}

function loadMore() {

}


// set up the mutation observer
var observer = new MutationObserver(function (mutations, me) {
  // `mutations` is an array of mutations that occurred
  // `me` is the MutationObserver instance
  /*const notifBox = document.querySelector("div[id='AB_DL_PH_Grades']");
  if (notifBox) {
    hideNotifications();
    me.disconnect(); // stop observing
    return;
  }*/

	const osdItems = document.querySelectorAll("div[title*='OSD note-taking page']")
	// console.log(osdItems);
	if(osdItems){
		osdItems.forEach(function(divItem) {
			let immedParent = divItem.parentElement;
			let grandParent = immedParent.parentElement;
			console.log(divItem.innerText);
			grandParent.removeChild(immedParent);
		})
	}

});

// start observing
observer.observe(document, {
  childList: true,
  subtree: true
});




/**********************************************/

/*var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
  	if(mutation.addedNodes.length > 0){
  		console.log(mutation.addedNodes);
  		if(mutation.addedNodes.firstElementChild){
  			if(mutation.addedNodes.firstElementChild.title.substring(0,20) == "Content Created, OSD"){
	    		
	    		mutation.addedNodes.style.backgroundColor = "red";
    		}	
    	}
	}
  });
});
// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});*/