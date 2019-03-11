let currVisNotifCount = 0;
let lastSeenNotifCount = 1; //1 to account for placeholder elem

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

function countElem() {
    console.log("it was clicked");

    const notifBox = document.querySelector("div[id='AB_DL_PH_Grades']");
    // const list = notifBox.querySelector("ul[class='d2l-datalist vui-list']");
    // const notifCount = list.childElementCount;

    // const loadMoreButton = notifBox.querySelector("button[class*='d2l-loadmore-pager']");

    console.log("last seen: " + lastSeenNotifCount);
    console.log("current: " + currVisNotifCount);

    // if (notifCount == currVisNotifCount){
    //     console.log(notifCount);
    //     loadMoreButton.click();
    // 	currVisNotifCount = notifBox.querySelector("ul[class='d2l-datalist vui-list']").childElementCount;
    // } else {
    // 	//stop
    // }

    //if nothing was returned, click again
    // if (currVisNotifCount == lastSeenNotifCount) {
    // 	console.log("clicked");
    // 	loadMoreButton.click();
    // }

    /*if(currVisNotifCount == lastSeenNotifCount){
    	console.log("clicked");
    	//loadMoreButton.click();
    	loadMoreButton.removeEventListener('click', countElem);
    	simulate(loadMoreButton, "click");
    }
    lastSeenNotifCount = currVisNotifCount;*/

    const loadMoreButton = notifBox.querySelector("button[class*='d2l-loadmore-pager']");

    while (currVisNotifCount == lastSeenNotifCount) {
        simulate(loadMoreButton, "click");

    	lastSeenNotifCount = notifBox.querySelector("ul[class='d2l-datalist vui-list']").childElementCount;
    }

}


// set up the mutation observer
var observer = new MutationObserver(function(mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance

    // Delete all osd items whenever they appear
    const osdItems = document.querySelectorAll("div[title*='OSD note-taking page']")
    // console.log(osdItems);
    if (osdItems) {
        osdItems.forEach(function(divItem) {
            let immedParent = divItem.parentElement;
            let grandParent = immedParent.parentElement;
            // console.log(divItem.innerText);
            grandParent.removeChild(immedParent);
        })
    }

    // Click the load more button until something appears
    const notifBox = document.querySelector("div[id='AB_DL_PH_Grades']");
    if (notifBox) {
        // number of visible notifications after OSD deletion
        currVisNotifCount = notifBox.querySelector("ul[class='d2l-datalist vui-list']").childElementCount;

        console.log("current: " + currVisNotifCount);

        // countElem();
        // const loadMoreButton = notifBox.querySelector("button[class*='d2l-loadmore-pager']");

        //  	while(currVisNotifCount == lastSeenNotifCount){

        //  		simulate(loadMoreButton, "click");
        //  	}  
        //  		lastSeenNotifCount = currVisNotifCount;


        // loadMoreButton.addEventListener('click', countElem);
        //me.disconnect(); // stop observing
        //return;
    }

});

// start observing
observer.observe(document, {
    childList: true,
    subtree: true
});


/*****************************************/
// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
/*****************************************/
function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents') {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        } else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    } else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}