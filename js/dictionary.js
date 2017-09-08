var xml = "http://www.dictionaryapi.com/api/v1/references/sd4/xml/"
            +"invincible"
            +"?key=ff737949-9dc1-4d03-81f5-2dcdbe597bdc";
$(function(){
    $.ajax({
        type: "get",
        url: xml,
        success: function(data){
            // var xmlhttp = new XMLHttpRequest();
            // xmlhttp.open("GET", xml, false);
            // xmlhttp.setRequestHeader("Content-Type", "text/xml");
            // xmlhttp.send(null);

            // // Store the xml page
            // var xmlPage = xmlhttp.responseXML;
            // var temp = xmlPage.getElementsByTagName('entry');
            // document.write(temp[0].getElementsByTagName('dt').nodeValue);
            //document.write();

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
                    document.write(result + "<br>");
                }
            }
        },
        error: function(xhr, status){
            document.write(status);
        }
    })
})

