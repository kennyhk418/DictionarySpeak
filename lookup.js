var menu = {
    "id" : "lookup",
    "title" : "Look up this word",
    "contexts" : ["selection"]
}

chrome.contextMenus.create(menu);

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "lookup" && clickData.selectionText){
        var dictUrl = "http://www.dictionary.com/browse/"
        + fixedEncodeURI(clickData.selectionText);
        // var dataObj = {
        //     "url" : dictUrl,
        //     "type" : "normal"
        // }
        // chrome.windows.create(dataObj, function(){});
        chrome.tabs.create({url: dictUrl});
    }

})