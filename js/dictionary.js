var xml = "http://www.dictionaryapi.com/api/v1/references/sd4/xml/"
            +"man"
            +"?key=ff737949-9dc1-4d03-81f5-2dcdbe597bdc";
$(function(){
    $.ajax({
        type: "get",
        url: xml,
        success: function(data){
            // Meaning of the word
            var def = data.getElementsByTagName('dt');
            for(var i = 0; i < def.length; i++){
                var result = def[i].childNodes[0].nodeValue;

                // Remove the empty result
                if(result != ':'){
                    // Remove the first : in the result
                    result = result.slice(1);
                    // Make the first character upper case
                    result = result.charAt(0).toUpperCase()+ result.slice(1);
                    //document.write(result + "<br>");
                }
            }

            //Display words + meaning in collapse form (except the first one)
            var count = 0;
            $data = $(data);
            $data.find('entry').each(function(){
                //Append the list of words into the html
                var string_to_append = "";
                string_to_append += "<ol class='single_word'>";
                string_to_append += "<div id = '"+ count +"' style='cursor:pointer'>"
                // Word name
                var word_name = $(this).find("hw").text().replace("*","");
                string_to_append += "<span class='word_name'>"
                                + word_name.charAt(0).toUpperCase()
                                +word_name.slice(1) + "</span>";
                // Word type
                string_to_append += "<span class='word_type'>\[" + $(this).find("fl:first").text() + "\]</span>";
                string_to_append += "</div><div id = 'li_"+ count +"'>"

                $(this).find('dt').each(function(){
                    // Meaning list
                    string_to_append += "<li>"
                                    + $(this).text()+"</li>";
                })
                string_to_append += "</ol></div>";
                $(".content").append(string_to_append);

                // It will always show the first word's meaning
                if(count != 0){
                    $("#li_"+count+" > li").css('display','none');
                }
                // Add listener to each word
                $(document).on('click','#'+count, function(){
                    //$("#li_"+$(this).attr('id')+" > li").css('color','red');
                    $("#li_"+$(this).attr('id')+" > li").slideToggle('fast');
                });
                count++;


            })

            // If it cant find the word
            $data.find('suggestion').each(function(){
                string_to_append = "";
                string_to_append += $(this).text() + "<br>"
                $(".content").append(string_to_append);
            })


        },
        error: function(xhr, status){
            document.write(status);
        }
    })
})

