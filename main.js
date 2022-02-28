let highlighted = false
function greenBorder () {
    this.style.border = "3px solid green";
}
function  highlightLinks(){
    let links = document.querySelectorAll("a,button,input,area,textarea,map,track,video,embed,iframe,datalist,fieldset,details,dialog,summary")
    for (link of links) {
        if(link.style.border === "0px solid green"){
            link.style.border = "3px solid green";
        }

        else{
            link.style.border = "3px solid red"
            link.addEventListener("focus", greenBorder);
        }

    }

}

function removeHighlights(){
    let links = document.querySelectorAll("a,button,input,area,textarea,map,track,video,embed,iframe,datalist,fieldset,details,dialog,summary")
    for (link of links) {
        link.removeEventListener("focus", greenBorder)
        if(link.style.border === "3px solid green"){
            link.style.border = "0px solid green"
        }
        else{
            link.style.border = "0px solid red"
        }


    }
}
function reload(){
    location.reload()
}


// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'getLang')) {
        response(document.getElementsByTagName("html")[0].lang);
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setHighlights')) {
        if(highlighted){
            removeHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            highlightLinks()
            highlighted = true
            response(highlighted);
        }

    }
    else if ((msg.from === 'popup') && (msg.subject === 'getHighlightStatus')) {
        response(highlighted);
    }
});
