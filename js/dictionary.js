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

            // //This is how we retreve information from dictionary now
            // $data = $(data);
            // $data.find('entry').each(function(){
            //     document.write($(this).find("hw").text()+"<br>");
            //     $current_fl = $(this);
            //     document.write($(this).find("fl:first").text() + "<br>");
            //     $(this).find('dt').each(function(){
            //         document.write($(this).text() + "<br><br>");
            //     })
            //     //console.log($(this).find("dt"));
            // })
            // console.log($data.find("suggestion"));
            // $data.find('suggestion').each(function(){
            //     document.write($(this).text() + "<br>");
            // })

            //This is how we retreve information from dictionary now
            $data = $(data);
            $data.find('entry').each(function(){
                //document.write($(this).find("hw").text()+"<br>");
                var string_to_append = "";
                string_to_append += "<ol class=\"single_word\">";
                string_to_append += $(this).find("hw").text() + "<br>";
                string_to_append += $(this).find("fl:first").text()+"</li>";

                $(this).find('dt').each(function(){
                    string_to_append += "<li>" + $(this).text()+"</li>";
                })
                string_to_append += "</ol>"
                $(".content").append(string_to_append);
            })

            // If it cant find the word
            $data.find('suggestion').each(function(){
                //document.write($(this).text() + "<br>");
            })
        },
        error: function(xhr, status){
            document.write(status);
        }
    })
})

