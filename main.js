let highlighted = false
// document.body.addEventListener("mousemove", () => {getXYPosition()})
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
function redBorderON () {
    this.style.counterReset = this.style.border
    this.style.border = "8px solid red"


}
function redBorderOFF () {
    if (this.style.border === "8px solid red"){
        this.style.border = this.style.counterReset
    }

}
function addFocusHighlight(){
    let elements = document.body.querySelectorAll("*")
    elements.forEach(el => {
        el.addEventListener("focus", redBorderON)
        el.addEventListener("focusout", redBorderOFF)
    })
}
function removeFocusHighlight(){
    let elements = document.body.querySelectorAll("*")
    elements.forEach(el => {
        el.removeEventListener("focus", redBorderON)
        el.removeEventListener("focusout", redBorderOFF)
    })
}

function removeAll(){
    let links = document.querySelectorAll("a,button,input,area,textarea,map,track,video,embed,iframe,datalist,fieldset,details,dialog,summary,img,li,ul,ol,form,h1,h2,h3,h4,h5,h6")
    for (link of links) {
        link.removeEventListener("focus", greenBorder)
        link.style.border = "none"

    }
    document.querySelectorAll("div.appendices").forEach(el => el.remove())
    document.querySelectorAll("div.wrapper").forEach(el => {
        let parent = el.parentElement
        parent.replaceChild(el.children[0],el)
    });
    document.querySelectorAll("li.appendices").forEach(el => el.remove())
    document.querySelectorAll("label.appendices").forEach(el => el.remove())
    document.querySelectorAll("span.appendices").forEach(el => el.remove())
    document.querySelectorAll("#xy").forEach(el => el.remove())
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
function showAt(targetElem, newElem){



    let wrapper = document.createElement('div')
    wrapper.style.position = "relative"

    let parent = targetElem.parentElement
    parent.replaceChild(wrapper, targetElem)

    wrapper.append(targetElem)

    newElem.style.position = "absolute"
    newElem.style.bottom = "10%"
    newElem.style.right = "10%"

    wrapper.append(newElem)
    wrapper.classList.add("wrapper")

}

function  addImageHighlights(){
    let links = document.querySelectorAll("img")


    for (let link of links) {

        link.style.border = "3px solid red"


        let appendIt = document.createElement('p');
        if(link.alt && link.alt !== ""){
            appendIt.textContent = link.alt
        }
        else{
            appendIt.textContent = "!Missing alt text!"
        }
        appendIt.style.all = "revert"
        appendIt.style.backgroundColor = "red"
        appendIt.style.color = "white"
        appendIt.style.fontSize = "2ex"
        appendIt.style.minHeight = "50px"
        appendIt.style.minWidth = "100px"
        appendIt.style.overflow = "visible"
        appendIt.style.float = "right"

        showAt(link, appendIt)

    }
}
function removeImageHighlights(){
    document.querySelectorAll("img").forEach((el) => {el.style.border = "none"})
    document.querySelectorAll("div.wrapper").forEach(el => {
        let parent = el.parentElement
        parent.replaceChild(el.children[0],el)
    });
}

function  addVideoHighlights(){
    document.querySelectorAll("video").forEach((el) => {el.style.border = "3px solid red"})
}
function removeVideoHighlights(){
    document.querySelectorAll("video").forEach((el) => {el.style.border = "none"})
}

// code from https://stackoverflow.com/questions/9733288/how-to-programmatically-calculate-the-contrast-ratio-between-two-colors
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
    var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05)
        / (darkest + 0.05);
}

function calculateContrast(){
    let c1 = document.getElementById("c1")
    let c2 = document.getElementById("c2")

    let style = c1.value.slice(1)
    let bgstyle = c2.value.slice(1)

    // alert("https://webaim.org/resources/contrastchecker/?fcolor="+strcolors+"&bcolor="+strbgcolors+"&api");
    return fetch("https://webaim.org/resources/contrastchecker/?fcolor="+style+"&bcolor="+bgstyle+"&api")
        .then(async response => {
            document.getElementById("calcresponse").innerText =  JSON.stringify( await response.json())

        })

/*        .then(response => {
            return response.close
        })*/

}

// code from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)
    ] : null;
}
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getActualBackgroundColor(element){
    let style = getComputedStyle(element)
    if (style.backgroundColor.slice(0,4) !== "rgba"){
        return style.backgroundColor
    }
    else{
        return getActualBackgroundColor(element.parentElement)
    }
}

function hoverCalc(elem){
    //alert(JSON.stringify(elem.target))

    let appendIt = document.getElementById('helem');
    let style = getComputedStyle(elem.target)
    appendIt.innerHTML = ""
    appendIt.innerHTML += "Current element font color: "+style.color + "<br>";
    appendIt.innerHTML += "Current element background color: " + getActualBackgroundColor(elem.target) + "<br>";


    let rgbcolor = style.color.toString()
    let colors = rgbcolor.split("(")[1].split(")")[0].split(", ").map(el => parseInt(el))
    let bgrgbcolor = getActualBackgroundColor(elem.target)
    let bgcolors = bgrgbcolor.split("(")[1].split(")")[0].split(", ").map(el => parseInt(el))

    document.getElementById('c1').value = rgbToHex(colors[0], colors[1], colors[2])
    document.getElementById('c2').value = rgbToHex(bgcolors[0], bgcolors[1], bgcolors[2])

    elem.preventDefault()


}

// code from http://www.brenz.net/snippets/xy.asp
/*var myX, myY, xyOn, myMouseX, myMouseY;
xyOn = false;
function getXYPosition(e){
    myMouseX=(e||event).clientX;
    myMouseY=(e||event).clientY;
    if (myMouseX + 100 > document.documentElement.clientWidth) {
        myX = myMouseX - (myMouseX + 80 - (document.documentElement.clientWidth));
    } else {
        myX = myMouseX + 20;
    }
    if (myMouseY + 64 > document.documentElement.clientHeight) {
        myY = myMouseY - (myMouseY + 44 - (document.documentElement.clientHeight));
    } else {
        myY = myMouseY + 20;
    }
    if (document.documentElement.scrollTop > 0) {
        myY = myY + document.documentElement.scrollTop;
        myMouseY = myMouseY + document.documentElement.scrollTop;
    }
    document.getElementById('xy').style.top = myY + "px";
    document.getElementById('xy').style.left = myX + "px";
    //document.getElementById('xy').innerHTML = "X is " + myMouseX + "<br />Y is " + myMouseY;
    if (xyOn) {
        document.getElementById('xy').style.visibility = "visible";
    } else {
        document.getElementById('xy').style.visibility = "hidden";
    }
}
function toggleXY() {
    xyOn = !xyOn;
    if (!xyOn) {
        document.getElementById('xy').style.visibility = "hidden";
    } else {
        document.getElementById('xy').style.visibility = "visible";
    }
}*/

function  addHoverHighlights(){

    let appendIt = document.createElement('div')
/*    appendIt.style.position = "absolute"
    appendIt.style.zIndex = "10"
    appendIt.style.left = "0px"
    appendIt.style.top = "0px"
    appendIt.style.width = "400px"
    appendIt.style.visibility = "hidden"
    appendIt.style.backgroundColor = "#ffffff"
    appendIt.style.border = "1px solid #66ccff"
    appendIt.id = "xy"*/
    appendIt.style.position = "absolute"
    appendIt.style.backgroundColor = "white"
    appendIt.style.fontSize = "15px"
    appendIt.style.zIndex = "99999"
    appendIt.style.left = window.scrollX.toString()+"px "
    appendIt.style.top = (window.scrollY + 500).toString()+"px"
    appendIt.style.width = "400px"
    appendIt.style.height = "250px"
    appendIt.style.overflowWrap = "anywhere"
    appendIt.style.border = "3px solid red"
    appendIt.id = "xy"

    let headerElem = document.createElement('div')
    headerElem.id = "helem"
    headerElem.textContent = "Click to begin"

    let c1 = document.createElement('input')
    c1.type = "color"
    c1.id = "c1"
    c1.value = "#000000"

    let c1label = document.createElement('label')
    c1label.setAttribute("for", "c1")
    c1label.id = "c1label"
    c1label.innerHTML = "Textcolor <br>"

    let c2 = document.createElement('input')
    c2.type = "color"
    c2.id = "c2"
    c2.value = "#000000"

    let c2label = document.createElement('label')
    c2label.setAttribute("for", "c2")
    c2label.innerHTML = "Background color <br>"
    c2label.id = "c2label"

    let calcbutton = document.createElement('button')
    calcbutton.id = "calcbutton"
    calcbutton.innerText = "Calculate contrast"
    calcbutton.addEventListener("click", calculateContrast)

    let calcresponse = document.createElement("div")
    calcresponse.innerText =""
    calcresponse.id = "calcresponse"


    appendIt.addEventListener("hover", el => el.preventDefault())
    appendIt.appendChild(headerElem)
    appendIt.appendChild(c1)
    appendIt.appendChild(c1label)
    appendIt.appendChild(c2)
    appendIt.appendChild(c2label)
    appendIt.appendChild(calcbutton)
    appendIt.appendChild(calcresponse)
    document.body.prepend(appendIt)

    // toggleXY()

    var elems = document.body.querySelectorAll("*");
    for (let elem of elems){
        if(!["xy","helem","c1","c1label","c2","c2label","calcbutton","calcresponse"].includes(elem.id)){
            elem.addEventListener("click", hoverCalc)
        }

    }
}
function removeHoverHighlights() {
    // toggleXY()
    document.querySelectorAll("#xy").forEach(el => el.remove());
    var elems = document.body.getElementsByTagName("*")
    document.body.querySelectorAll("*").forEach(elem => elem.removeEventListener("click", hoverCalc))
    // for (let elem of elems){
    //     elem.removeEventListener("hover", hoverCalc)
    // }}
}

function  addHeadingHighlights(){
    let links = document.querySelectorAll("h1,h2,h3,h4,h5,h6")
    for (let link of links) {
        link.style.border = "3px solid red"
        let appendIt = document.createElement('div');
        appendIt.textContent = link.tagName
        appendIt.style.backgroundColor = "red"
        appendIt.style.color = "white"
        appendIt.style.minHeight = "30px"
        appendIt.style.borderRadius = "15px"
        appendIt.style.zIndex = "1111 "
        showAt(link,appendIt)
    }
}
function removeHeadingHighlights(){
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach((el) => {el.style.border = "none"})
    document.querySelectorAll("div.wrapper").forEach(el => {
        let parent = el.parentElement
        parent.replaceChild(el.children[0],el)
    });
}

function  addListHighlights(){
    let links = document.querySelectorAll("ol,ul")
    for (let link of links) {
        link.style.border = "3px solid red"
        let appendIt = link.children[0].cloneNode(false); //now creates the tag as a li node in the list to consistently show up in all css frameworks
        if(!link.children[0].value) link.children[0].value = 1 //remove this if ol's start with not 1?
        appendIt.textContent = link.tagName
        appendIt.style.backgroundColor = "red"
        appendIt.style.color = "white"
        appendIt.style.minHeight = "10px"
        appendIt.style.minWidth = "20px"
        appendIt.style.listStyle = "none"
        appendIt.style.listStyleType = "none"
/*
        appendIt.style.zIndex = "1111 !important"
        appendIt.style.position = "absolute"
        appendIt.style.top = "0px !important"
        appendIt.style.left = "0px !important"
        appendIt.style.margin = "0px !important"
        appendIt.style.padding = "0px !important"
*/

        appendIt.classList.add("appendices")
        link.prepend(appendIt) //properly places the li element
    }
}
function removeListHighlights(){
    document.querySelectorAll("ol,ul").forEach((el) => {el.style.border = "none"})
    document.querySelectorAll("li.appendices").forEach(el => el.remove());
}

function  addLabelHighlights(){ //should we leave out the hidden input areas?
    let links = document.querySelectorAll("input,textarea")
    for (let [index, link] of links.entries()) {
        link.style.counterReset = link.style.border
        link.style.border = "3px solid red"
        let appendIt = document.createElement('label');
        const selector = "label[for='" + link.id + "']"
        let specificlabel = document.querySelectorAll(selector)
        appendIt.style.backgroundColor = "red"
        appendIt.style.color = "white"
        appendIt.style.height = "30px"
        appendIt.style.minWidth = "30px"
        appendIt.style.maxWidth = "100px"
        appendIt.style.zIndex = "1111 "
        appendIt.classList.add("appendices")

        if(specificlabel.item(0) === null){

            if(link.getAttribute("aria-label")){
                appendIt.textContent = "Labelled by aria-label "+index.toString()
                let labelledby = document.querySelector(link.getAttribute("aria-label"))

            }
            else if (link.getAttribute("aria-labelledby")){
                appendIt.textContent = "Labelled by aria-labelledby "+index.toString()

            }
            else if(link.title){
                appendIt.textContent = "Labelled by title "+index.toString()

            }
            else if(link.id){
                appendIt.textContent = "No labels for this input element with id: "+link.id
            }
            else{
                appendIt.textContent = "No labels for this input element without an id"
            }
        }
        else{
            appendIt.textContent = index.toString()
            specificlabel.forEach((el) => {
                let x = document.createElement('label')
                x.style.backgroundColor = "red"
                x.style.color = "white"
                x.style.height = "30px"
                x.style.minWidth = "30px"
                x.style.maxWidth = "100px"
                x.style.zIndex = "1111"
                x.classList.add("appendices")
                x.for = el.id
                x.textContent = appendIt.textContent
                el.after(x)
            }) //adds to all labels because each input can have more than one label
        }
        appendIt.for = link.id
        link.before(appendIt)
    }
}
function removeLabelHighlights(){
    document.querySelectorAll("input,textarea").forEach((el) => {el.style.border = el.style.counterReset; el.style.removeProperty("counter-reset")})
    document.querySelectorAll("label.appendices").forEach(el => el.remove());
}


function  addFormHighlights(){
    document.querySelectorAll("form").forEach((el) => {
        el.style.counterReset = el.style.border
        el.style.border = "3px solid red"
    })
}
function removeFormHighlights(){
    document.querySelectorAll("form").forEach((el) => {el.style.border = el.style.counterReset; el.style.removeProperty("counter-reset")})
}

// function  addZoomHighlights(){
//     document.body.style.zoom = "400%";
// }
// function removeZoomHighlights(){
//     document.body.style.zoom = "100%";
// }


// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
    // First, validate the message's structure
    if ((msg.from === 'popup') && (msg.subject === 'getLang')) {
        response(document.getElementsByTagName("html")[0].lang);
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setFocusHighlights')) {
        if(highlighted){
            removeFocusHighlight()
            highlighted = false
            response(highlighted);
        }
        else{
            addFocusHighlight()
            highlighted = true
            response(highlighted);
        }

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
    else if ((msg.from === 'popup') && (msg.subject === 'setVideoHighlights')) {
        if(highlighted){
            removeVideoHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addVideoHighlights()
            highlighted = true
            response(highlighted);
        }

    }
    else if ((msg.from === 'popup') && (msg.subject === 'setHoverHighlights')){
        if(highlighted){
            removeHoverHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addHoverHighlights()
            highlighted = true
            response(highlighted);
        }
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setHeadingHighlights')){
        if(highlighted){
            removeHeadingHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addHeadingHighlights()
            highlighted = true
            response(highlighted);
        }
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setListHighlights')){
        if(highlighted){
            removeListHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addListHighlights()
            highlighted = true
            response(highlighted);
        }
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setLabelHighlights')){
        if(highlighted){
            removeLabelHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addLabelHighlights()
            highlighted = true
            response(highlighted);
        }
    }
    else if ((msg.from === 'popup') && (msg.subject === 'setFormHighlights')){
        if(highlighted){
            removeFormHighlights()
            highlighted = false
            response(highlighted);
        }
        else{
            addFormHighlights()
            highlighted = true
            response(highlighted);
        }
    }
    // else if ((msg.from === 'popup') && (msg.subject === 'setZoomHighlights')){
    //     if(highlighted){
    //         removeZoomHighlights()
    //         highlighted = false
    //         response(highlighted);
    //     }
    //     else{
    //         addZoomHighlights()
    //         highlighted = true
    //         response(highlighted);
    //     }
    // }
    else if ((msg.from === 'popup') && (msg.subject === 'getHighlightStatus')) {
        response(highlighted);
    }
    else if((msg.from === 'popup')&&(msg.subject === 'removeAllHighlights')){
        removeAll();
        removeFocusHighlight()
        // xyOn = false
        highlighted = false
        response(highlighted)

    }
});

