// Retrieve the selected button
chrome.storage.sync.get(['lookupword','speakword'], function(data){
    if(data.lookupword && data.lookupword === true){
        $('#lookupword').prop('checked',true);
    }
    if(data.speakword && data.speakword === true){
        $('#speakword').prop('checked',true);
    }
})

// Save the checkbox results
$(function(){
    $('#submit').click(function(){
        var lookupword, speakword;
        if($('#lookupword').prop('checked')){
            chrome.storage.sync.set({'lookupword': true});
            lookupword = true;
        }
        else{
            chrome.storage.sync.set({'lookupword': false});
            lookupword = false;
        }

        if($('#speakword').prop('checked')){
            chrome.storage.sync.set({'speakword': true});
            speakword = true;
        }
        else{
            chrome.storage.sync.set({'speakword': false});
            speakword = false;
        }

        // Default message: Show which option is chosen
        var msg = "Your options have been saved:\n"
                    +"  Look up word: " + lookupword + "\n"
                    +"  Speak word: " + speakword;

        // If neither is chosen, check both options and show error msg
        if (lookupword === false && speakword === false){
            chrome.storage.sync.set({'lookupword': true});
            chrome.storage.sync.set({'speakword': true});
            lookupword = true;
            speakword = true;
            msg = "Invalid options - Please choose at lease 1.\n"
                    + "Both options will be selected";
        }

        var notiOptions = {
            type: 'basic',
            iconUrl: "../icons/48icon.png",
            title: "Custom Options",
            message: msg
        }
        chrome.notifications.create('updateNotif', notiOptions);
    });
});