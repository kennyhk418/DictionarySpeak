var word_to_lookup = "";

function make_url(word_to_lookup){
    var temp = "http://www.dictionaryapi.com/api/v1/references/sd4/xml/";
    temp += word_to_lookup.replace(/\s/g,"");
    temp += "?key=ff737949-9dc1-4d03-81f5-2dcdbe597bdc";
    return temp;
}

$(function(){
    // Catch the select text and put it into the dictionary
    xml = make_url("Hi");
    chrome.tabs.executeScript({
        code: "window.getSelection().toString();"
    },function(selection){
        word_to_lookup = selection[0];
        if (word_to_lookup != ""){
            xml = make_url(word_to_lookup);
        }
        // Use Ajax method to convert dictionary.api (xml) to html
        $.ajax({
            type: "get",
            url: xml,
            success: function(data){
                //Display words + meaning in collapse form (except the first one)
                $('div').removeClass('loader');

                var count = 0;
                $data = $(data);
                $data.find('entry').each(function(){
                    //Append the list of words into the html
                    var string_to_append = "";
                    string_to_append += "<ol class='single_word'>";
                    string_to_append += "<div id = '"+ count +"' class='word_name_container'>"
                    // Word name
                    var word_name = $(this).find("hw").text().replace(/\*/g,'');
                    string_to_append += "<span class='word_name'>"
                                    + word_name.charAt(0).toUpperCase()
                                    +word_name.slice(1) + "</span>";
                    // Word type
                    string_to_append += "<span class='word_type'>\[" + $(this).find("fl:first").text() + "\]</span>";
                    string_to_append += "</div><div id = 'li_"+ count +"'>"

                    $(this).find('dt').each(function(){
                        // Meaning list
                        string_to_append += "<li>"
                                        + $(this).text().replace(/:/g,'')+"</li>";
                    })
                    string_to_append += "</ol></div>";
                    $(".content").append(string_to_append);

                    // It will always show the first word's meaning
                    // and collapse the rest
                    if(count != 0){
                        $("#li_"+count+" > li").css('display','none');
                    }
                    // Add listener to each word
                    $(document).on('click','#'+count, function(){
                        $("#li_"+$(this).attr('id')+" > li").slideToggle('fast');
                    });
                    count++;
                })

                // If the word is not found, return an error msg
                if($data.find('suggestion').length != 0){
                    console.log($data.find('suggestion'));
                    $(".content").append("<div class='word_not_found'>This word is not found.</div>");
                }
            },
            error: function(xhr, status){
                document.write(status);
            }
        })

    })
})

