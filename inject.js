let currVisNotifCount = 0;

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
    const list = notifBox.querySelector("ul[class='d2l-datalist vui-list']");
    const notifCount = list.childElementCount;

    const loadMoreButton = notifBox.querySelector("button[class*='d2l-loadmore-pager']");

    console.log("new: " + notifCount);
    console.log("old: " + currVisNotifCount);

    if (notifCount == currVisNotifCount){
        console.log(notifCount);
        loadMoreButton.click();
    	currVisNotifCount = notifBox.querySelector("ul[class='d2l-datalist vui-list']").childElementCount;
    } else {
    	//stop
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
            console.log(divItem.innerText);
            grandParent.removeChild(immedParent);
        })
    }

    // Click the load more button until something appears
    const notifBox = document.querySelector("div[id='AB_DL_PH_Grades']");
    if (notifBox) {
    	// number of visible notifications after OSD deletion
    	currVisNotifCount = notifBox.querySelector("ul[class='d2l-datalist vui-list']").childElementCount;
        
        const loadMoreButton = notifBox.querySelector("button[class*='d2l-loadmore-pager']");
        loadMoreButton.addEventListener('click', countElem);
        //me.disconnect(); // stop observing
        //return;
    }

});

// start observing
observer.observe(document, {
    childList: true,
    subtree: true
});