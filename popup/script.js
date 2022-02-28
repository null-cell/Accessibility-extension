var currQuestion = -1
const b1 = document.getElementById("1")
const b2 = document.getElementById("2")
const b3 = document.getElementById("3")
const b4 = document.getElementById("4")
const b5 = document.getElementById("5")
const b6 = document.getElementById("6")

const ynnaGrades = "    <button id=\"g_yes\" class='ynna_button'>Yes</button>\n" +
    "    <button id=\"g_no\" class='ynna_button'>No</button>\n" +
    "    <button id=\"g_na\" class='ynna_button'>Not applicable</button>"
const g123Grades = "    <button id=\"g_1\" class='g123_button'>1</button>\n" +
    "    <button id=\"g_2\" class='g123_button'>2</button>\n" +
    "    <button id=\"g_3\" class='g123_button'>3</button>"

chrome.storage.local.get("currQuestion", (e)=>{
    if(e){
        currQuestion = e["currQuestion"]
        document.getElementById(currQuestion.toString()).click()
    }
    else{
        currQuestion = -1
    }
});


b1.addEventListener("click", (e => {
        currQuestion = 1
        chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
        document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
        chrome.tabs.getSelected(null, (tab) => {
            document.getElementById("content").innerHTML = '<p>Is the page title meaningful: <span style="background-color: red">'+ tab.title + '</span></p>';
            setYNNAGrades(currQuestion.toString())
            updateButtonColors()

        })
}))


b2.addEventListener("click", (e => {
    currQuestion = 2
    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});

    document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
    sendMessage("getLang", retlang)
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))



b3.addEventListener("click", (e => {
    currQuestion = 3
    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
    document.getElementById("content").textContent = "Is the focus visible when navigating by tab key? (the site has not been altered)"
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

b4.addEventListener("click", (e => {
    currQuestion = 4

    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
    document.getElementById("content").innerHTML = "Are all parts of the site usable by keyboard? (without mouse) <br> <button id='highlighted'></button>"
    sendMessage("getHighlightStatus", changeHighlightText)
    document.getElementById("highlighted").addEventListener("click", (e) => {
        sendMessage("setHighlights", changeHighlightText)
    })

    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))
function changeHighlightText(high){
    if(high){
        document.getElementById("highlighted").textContent = "Highlighted"

    }
    else{
        document.getElementById("highlighted").textContent = "Highlight"

    }

}


b5.addEventListener("click", (e => {
    currQuestion = 5
    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
    document.getElementById("content").textContent = "Is the focus visible when navigating by tab key? (the site has not been altered)"
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))
b6.addEventListener("click", (e => {
    currQuestion = 6
    chrome.storage.local.set({"currQuestion": currQuestion}, function (){});
    document.getElementById("currQuestion").textContent = "Current question is "+currQuestion
    document.getElementById("content").textContent = "Is the focus visible when navigating by tab key? (the site has not been altered)"
    setYNNAGrades(currQuestion.toString())
    updateButtonColors()
}))

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

function retlang(lang){
    if(lang){
        document.getElementById("content").innerHTML = '<p>Is the page\'s language correctly identified: <span style="background-color: red">' + lang+ '</span></p>';
    }
    else{
        document.getElementById("content").innerHTML = '<p>Is the page\'s language correctly identified: <span style="background-color: red"> "NO LANGUAGE DEFINED"</span></p>';
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
                    document.getElementById(elem).style.backgroundColor = "white"
                }
            }
            else if(g123_arr.includes(r[currqstr])){
                var filtered = g123_arr.filter(function (value){
                    return r[currqstr] !== value
                })
                for (elem of filtered){
                    document.getElementById(elem).style.backgroundColor = "white"
                }
            }
            document.getElementById(r[currQuestion.toString()]).style.backgroundColor = "green"
        }
        else{
            let ynnaclass = document.getElementsByClassName("ynna_button")
            let g123class = document.getElementsByClassName("g123_button")
            if(ynnaclass){
                for (elem of ynnaclass){
                    elem.style.backgroundColor = "white"
                }
            }
            else if(g123class){
                for (elem of g123class){
                    elem.style.backgroundColor = "white"
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