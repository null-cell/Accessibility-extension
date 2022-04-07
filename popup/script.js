let currQuestion = -1
const b1 = document.getElementById("1")
const b2 = document.getElementById("2")
const b3 = document.getElementById("3")
const b4 = document.getElementById("4")
const b5 = document.getElementById("5")
const b6 = document.getElementById("6")
const b7 = document.getElementById("7")
const b8 = document.getElementById("8")
const b9 = document.getElementById("9")
const b10 = document.getElementById("10")
const b11 = document.getElementById("11")
const b12 = document.getElementById("12")
const b13 = document.getElementById("13")
const b14 = document.getElementById("14")
const b15 = document.getElementById("15")
let highlightedQ = -1
let highlightedTF = false

const ynnaGrades = "<div class='gradeTitle'>Grade: </div>  <button id=\"g_yes\" class='ynna_button'>Yes</button>\n" +
    "    <button id=\"g_no\" class='ynna_button'>No</button>\n" +
    "    <button id=\"g_na\" class='ynna_button'>Not applicable</button>"
const g123Grades = " <div class='gradeTitle'>Grade: </div>  <button id=\"g_1\" class='g123_button'>1</button>\n" +
    "    <button id=\"g_2\" class='g123_button'>2</button>\n" +
    "    <button id=\"g_3\" class='g123_button'>3</button>"

chrome.storage.local.get("currQuestion", (e)=>{
    if(e["currQuestion"]){
        currQuestion = e["currQuestion"]
        document.getElementById(currQuestion.toString()).click()
    }
    else{
        currQuestion = -1
    }
});
chrome.storage.local.get("highlightedTF", (e)=>{
    if(e["highlightedTF"]){
        highlightedTF = e["highlightedTF"]
    }
    else{
        highlightedTF = false
    }
});
chrome.storage.local.get("highlightedQ", (e)=>{
    if(e["highlightedQ"]){
        highlightedQ = e["highlightedQ"]
    }
    else{
        highlightedQ = -1
    }
});

for(let i = 1; i<17; i++){
    chrome.storage.local.get([i.toString()], e => {
        if(e[i.toString()]){
            addHighlight(i)
        }

    })

}

b1.addEventListener("click", (e => {
    removeHighlight(currQuestion);
    currQuestion = 1
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    getCurrentTab().then(tab => {
        document.getElementById("currQuestion").textContent += 'Is the page title meaningful: ';
        document.getElementById("content").innerHTML = '<h2 style="background-color: #ff666d">'+tab.title+'</h2>'
        document.getElementById("tooltips").textContent = "The page title is displayed as the title of the browser tab. " +
            "It is also displayed and highlighted below the question."

        setYNNAGrades(currQuestion.toString())
        updateButtonColors()
    })

}))


b2.addEventListener("click", (e => {
    removeHighlight(currQuestion);
    currQuestion = 2
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});

    document.getElementById("currQuestion").textContent = currQuestion+". "

    sendMessage("getLang", retlang) //retlang changes the html of extension popup, because we're waiting on the message of the main script
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))



b3.addEventListener("click", (e => {
    removeHighlight(currQuestion);
    currQuestion = 3
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Is the focus visible when navigating by tab key?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "Try using the tab key on the website and identify its focus visibility. The site has not been altered, however if you get lost," +
        " you can toggle the highlight to show you where your focus currently is. In order to not change the focused element, close the extension by clicking on its icon."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setFocusHighlights", changeHighlightText)

    })
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b4.addEventListener("click", (e => {
    removeHighlight(currQuestion);
    currQuestion = 4
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Are all parts of the site usable by keyboard? (without mouse)"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All input fields, links and buttons have been highlighted. " +
        "After the element has been interacted with, the highlight will change color to green."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setHighlights", changeHighlightText)

    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))



b5.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 5
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Do moving content and animations have a pause button?"
    document.getElementById("tooltips").textContent = "Find this type of content and check if a pause button is visible. " +
        "There is no additional aid for this question (the site has not been altered)."
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b6.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 6
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " Is there a clear visual distinction between link texts and normal text?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All links (!including image links, which you will have to disregard for this question) have an outline to inform you of them being links. These highlights are meant only to help you " +
        "find the links on the page, after which you should remove the highlight and inspect them manually."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setLinkHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))
b7.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 7
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " Are the link texts meaningful?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All links (!including image links, which you will have to disregard for this question) have an outline to inform you of them being links. These highlights are meant only to help you " +
        "find the links on the page, after which you should remove the highlight and inspect them manually."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setLinkHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))
b8.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 8
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " Do all images have a textual alternative?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All images are outlined and have their alternative text shown over them. " +
        "If they have no alternative text, it is replaced by !Missing text!. If the styling of the page makes the highlighting unreadable, please inspect the element manually."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setImageHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b9.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 9
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Are videos subtitled?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All videos are highlighted. " +
        "Please manually check that they contain subtitles."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setVideoHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b10.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 10
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Is there sufficient contrast between the colour of the text and the background colour?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "While having the 'highlight' popup open, the default click behaviour is prevented. On clicking on any text element, its font color and the first parent element with a background color will be shown in the popup on the left.  " +
        "If the colors do not correspond to the desired ones, please use the color pickers to change them. Then click on the calculate contrast button and evaluate the results."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setHoverHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b11.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 11
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Are all headings and subtitles correctly marked with HTML?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "Upon clicking the highlight button, all headings and subtitles are noted with their respective tags (h1 - h6) and outlined. This is only to help you show where the marked elements are to grade their suitability, " +
        "however you should still manually check, if there exist unmarked elements."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setHeadingHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b12.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 12
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " Are all lists correctly marked with HTML?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All lists (ol and ul tags) have been noted with their respective tags. " +
        "This is to help you locate the marked up lists and grade their suitability, however you should still browse the page to manually check for unmarked lists."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setListHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b13.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 13
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " Are form fields linked to their labels?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All labels and the input fields that are connected have been annotated with the same number. If the label is present in a different fashion than with for - id attribute connection between the label and the input, " +
        "there will only be one annotation explaining the label style. Should there not be a label for the input element, this will be annotated aswell. Note that sometimes there are 'hidden' input elements that likely do not have a label, but the annotations will still show up."
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setLabelHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b14.addEventListener("click", (e => {

    removeHighlight(currQuestion);
    currQuestion = 14
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += " If you make a mistake when completing a form, do you get textual help?"
    document.getElementById("content").innerHTML = "<button id='highlighted'></button>"
    document.getElementById("tooltips").textContent = "All forms have been outlined for you to locate them easier. " +
        "Please test behaviour on input mistakes manually."
        sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setFormHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b15.addEventListener("click", (e => {

    removeHighlight(currQuestion);


    currQuestion = 15
    addHighlight(currQuestion);
    removeH();

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = currQuestion+". "
    document.getElementById("currQuestion").textContent += "Do the contents reflow properly when the website is zoomed in up until 400%?"
    document.getElementById("tooltips").textContent = "Before assessing this question, please manually zoom in the page with the button combination of ctrl and + buttons until the zoom level is 400%. " +
        "Scroll the page and review how the contents reflow."
    sendMessage("getHighlightStatus", changeHighlightText)

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendMessage(subj, callbackfn = null){
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {from: 'popup', subject: subj},
            callbackfn);
    });
}

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}


function changeHighlightText(high){
    if(high){
        document.getElementById("highlighted").textContent = "Highlighted"
        document.getElementById("highlighted").classList.add("highlighton")

        highlightedQ = currQuestion
        highlightedTF = true
        chrome.storage.local.set({"highlightedQ": currQuestion}, function (){});
        chrome.storage.local.set({"highlightedTF": true}, function (){});
    }
    else{
        document.getElementById("highlighted").textContent = "Highlight"
        document.getElementById("highlighted").classList.remove("highlighton")

        highlightedQ = currQuestion
        highlightedTF = false
        chrome.storage.local.set({"highlightedQ": currQuestion}, function (){});
        chrome.storage.local.set({"highlightedTF": false}, function (){});
    }
}

function removeH(){
    document.getElementById("content").innerHTML = ""
    document.getElementById("tooltips").innerHTML = ""
    if(highlightedTF && (highlightedQ !== currQuestion)){
        sendMessage("removeAllHighlights", (e)=>{highlightedTF = e})
        highlightedQ = currQuestion
        highlightedTF = false
        chrome.storage.local.set({"highlightedQ": currQuestion}, function (){});
        chrome.storage.local.set({"highlightedTF": false}, function (){});
    }
}

function addHighlight(n){
    document.getElementById(n.toString()).classList.add("highlightnav")
}
function removeHighlight(n){
    chrome.storage.local.get([n.toString()], (r) => {
        if(!r[n.toString()] && n !== currQuestion){
            document.getElementById(n.toString()).classList.remove("highlightnav")
        }
    })
}

function retlang(lang){
    if(lang){
        document.getElementById("currQuestion").textContent += 'Is the page\'s language correctly identified:';
        document.getElementById("content").innerHTML = '<h2 style="background-color: #ff666d">' + lang+ '</h2>'

        document.getElementById("tooltips").textContent = "The defined language is displayed and highlighted below the question."
    }
    else{
        document.getElementById("currQuestion").textContent += 'Is the page\'s language correctly identified: ';
        document.getElementById("content").innerHTML = '<h2 style="background-color: #ff666d"> "NO LANGUAGE DEFINED"</h2>'

        document.getElementById("tooltips").textContent = "The defined language is displayed and highlighted below the question."
    }

}

function updateButtonColors(){
    let currqstr = currQuestion.toString()
    let ynna_arr = ["g_yes", "g_no", "g_na"]
    let g123_arr = ["g_1", "g_2", "g_3"]
    chrome.storage.local.get([currqstr], (r) => {
        if(r[currqstr]){
            if(ynna_arr.includes(r[currqstr])){
                var filtered = ynna_arr.filter(function (value){
                    return r[currqstr] !== value
                })
                for (elem of filtered){
                    document.getElementById(elem).style.color = "#5B616A"
                    document.getElementById(elem).style.backgroundColor = "#5B616A"
                }
            }
            else if(g123_arr.includes(r[currqstr])){
                var filtered = g123_arr.filter(function (value){
                    return r[currqstr] !== value
                })
                for (elem of filtered){
                    document.getElementById(elem).style.color = "#5B616A"
                    document.getElementById(elem).style.backgroundColor = "#5B616A"
                }
            }
            document.getElementById(r[currQuestion.toString()]).style.backgroundColor = "green"
            document.getElementById(r[currQuestion.toString()]).style.color = "#5B616A"
        }
        else{
            let ynnaclass = document.getElementsByClassName("ynna_button")
            let g123class = document.getElementsByClassName("g123_button")
            if(ynnaclass){
                for (elem of ynnaclass){
                    document.getElementById(elem).style.color = "#5B616A"
                    elem.style.backgroundColor = "#5B616A"
                }
            }
            else if(g123class){
                for (elem of g123class){
                    document.getElementById(elem).style.color = "#5B616A"
                    elem.style.backgroundColor = "#5B616A"
                }
            }
        }

    })
}

function setYNNAGrades(question){
    document.getElementById("grades").innerHTML = ynnaGrades
    let g_yes = document.getElementById("g_yes")
    let g_no = document.getElementById("g_no")
    let g_na = document.getElementById("g_na")
    g_yes.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_yes"}, function (){
            updateButtonColors();
        });
    }))
    g_no.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_no"}, function (){
            updateButtonColors();
        })
    }))
    g_na.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_na"},function (){
            updateButtonColors();
        })
    }))


}
function set123Grades(question){
    document.getElementById("grades").innerHTML = g123Grades
    let g_1 = document.getElementById("g_1")
    let g_2 = document.getElementById("g_2")
    let g_3 = document.getElementById("g_3")
    g_1.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_1"}, function (){});
    }))
    g_2.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_2"}, function (){})
    }))
    g_3.addEventListener("click", (e => {
        chrome.storage.local.set({[question]: "g_3"},function (){})
    }))


}

document.getElementById("showlocalstorage").addEventListener("click", (e)=>{
    logStorage()
})


document.getElementById("clearquestionstorage").addEventListener("click", (e)=>{
    clearQuestion()

})
function clearQuestion(){
    chrome.storage.local.remove([currQuestion.toString()], ()=>{updateButtonColors()})
}


document.getElementById("clearallstorage").addEventListener("click", (e) => clearAllLocalStorage())
function clearAllLocalStorage(){
    chrome.storage.local.clear(()=>{updateButtonColors()})
    document.querySelectorAll(".highlightnav").forEach(e => e.classList.remove("highlightnav"))
}

function writeToStorageSpace(str){
    document.getElementById("localstorage").textContent = str
}
function logStorage() {
    let retstr = ""
    if(chrome.storage) {
        chrome.storage.local.get(function(data){
            console.log("chrome.storage.local:");
            retstr += "chrome.storage.local:"
            if(chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                retstr += chrome.runtime.lastError
                writeToStorageSpace(JSON.stringify(retstr))
            } else {
                console.log(data);
                retstr += JSON.stringify(data)
                writeToStorageSpace(JSON.stringify(retstr))
            }
        });
    } else {
        console.warn("chrome.storage is not accessible, check permissions");
        retstr += "chrome.storage is not accessible, check permissions"
        writeToStorageSpace(JSON.stringify(retstr))
    }

}