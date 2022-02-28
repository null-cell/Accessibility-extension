let highlighted = false

function greenBorder () {
    this.style.border = "3px solid green";
}
function  addHighlights(){
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
function removeAll(){
    let links = document.querySelectorAll("a,button,input,area,textarea,map,track,video,embed,iframe,datalist,fieldset,details,dialog,summary,img")
    for (link of links) {
        link.removeEventListener("focus", greenBorder)
        if(link.style.border === "3px solid green"){
            link.style.border = "none"
        }
        else{
            link.style.border = "none"
        }
    }
}
function  addLinkHighlights(){
    let links = document.querySelectorAll("a")
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
function removeLinkHighlights(){
    let links = document.querySelectorAll("a")
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
function  addImageHighlights(){
    let links = document.querySelectorAll("img")
    for (let link of links) {
        link.style.border = "3px solid red"
        let appendIt = document.createElement('div');
        if(link.alt && link.alt !== ""){
            appendIt.textContent = link.alt
        }
        else{
            appendIt.textContent = "!Missing alt text!"
        }
        appendIt.style.backgroundColor = "red"
        appendIt.style.color = "white"
        appendIt.style.minHeight = "30px"
        appendIt.style.zIndex = "1111 !important"
        appendIt.classList.add("appendices")
        link.before(appendIt) //#TODO change this with absolute positioning with regards to the x,y,window width and height

    }



}

function removeImageHighlights(){
    document.querySelectorAll("img").forEach((el) => {el.style.border = "none"})
    document.querySelectorAll("div.appendices").forEach(el => el.remove());
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
            addHighlights()
            highlighted = true
            response(highlighted);
        }

    }
    else if ((msg.from === 'popup') && (msg.subject === 'setLinkHighlights')) {
        if(highlighted){
            removeLinkHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addLinkHighlights()
            highlighted = true
            response(highlighted);
        }

    }
    else if ((msg.from === 'popup') && (msg.subject === 'setImageHighlights')) {
        if(highlighted){
            removeImageHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addImageHighlights()
            highlighted = true
            response(highlighted);
        }

    }
    else if ((msg.from === 'popup') && (msg.subject === 'getHighlightStatus')) {
        response(highlighted);
    }

    else if((msg.from === 'popup')&&(msg.subject === 'removeAllHighlights')){
        removeAll();
        highlighted = false
        response(highlighted)

    }
});
