var menu = {
    "id" : "lookup",
    "title" : "What is this ?",
    "contexts" : ["selection"]
}

chrome.contextMenus.create(menu);

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    var lookupword = true;
    var speakword = true;
    chrome.storage.sync.get(['lookupword','speakword'], function(data){
        if(data.lookupword || data.speakword){
            lookupword = data.lookupword;
            speakword = data.speakword;
        }

        if(clickData.menuItemId == "lookup" && clickData.selectionText){
            var dictUrl = "http://www.dictionary.com/browse/"
            + fixedEncodeURI(clickData.selectionText);
            // var dataObj = {
            //     "url" : dictUrl,
            //     "type" : "normal"
            // }
            // chrome.windows.create(dataObj, function(){});

            // Speak the selected text
            if(speakword === true){
                chrome.tts.speak(clickData.selectionText, {'rate': 0.5});
            }
            // Open a new tab
            if(lookupword === true){
                chrome.tabs.create({url: dictUrl});
            }
        }
    });

})