const stringReplace = (str, before, after) =>
    before.toLowerCase() === before
        ?
        str.replace(before, after)
        :
        str.replace(before, after.replace(after[0], after[0].toUpperCase())) //ternery operator

const uniqueString = (value, index, self) => self.indexOf(value) === index;

const ConverText_Html = (input_Text) => {

    var input_str; // to store Input Text
    var text_input; // to store input after trim

    var output_html = "";
    var counter;

    input_str = input_Text; //get input and store it in input_str
    text_input = input_str.trim(); //trim() input

    var [urlArray, HashArray, AtArray] = [[], [], []];
    var [matchArray, matchHashArray, matchAtArray] = ["", "", ""];

    var Html_Regex = /(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g;
    var hashtags = /#[a-z]+/gi;
    var ATtags = /@[a-z]+/gi;

    while ((matchHashArray = hashtags.exec(input_Text)) !== null) {
        var Hashtoken = matchHashArray[0];
        HashArray.push(Hashtoken);
    }
    while ((matchAtArray = ATtags.exec(input_Text)) !== null) {
        var Attoken = matchAtArray[0];
        AtArray.push(Attoken)
    }

    if (text_input.length > 0) {
        output_html += "<p style='color:white;'>";
        for (counter = 0; counter < text_input.length; counter++) {
            switch (text_input[counter]) {
                case '\n':
                    if (text_input[counter + 1] === '\n') {
                        output_html += "</p>\n<p>";
                        counter++;
                    }
                    else output_html += "<br>";
                    break;
                case ' ':
                    if (text_input[counter - 1] !== ' ' && text_input[counter - 1] !== '\t')
                        output_html += " ";
                    break;
                case '\t':
                    if (text_input[counter - 1] !== '\t')
                        output_html += " ";
                    break;
                case '"':
                    output_html += "&quot;";
                    break;

                default:
                    output_html += text_input[counter];
            }
        }
        output_html += "<p/>";
    }

    while ((matchArray = Html_Regex.exec(input_Text)) !== null) {
        var token = matchArray[0];
        urlArray.push(token)
    }

    let i;
    if (urlArray.length > 0) {
        urlArray = urlArray.filter(uniqueString); //value,index,Array
        for (i = 0; urlArray.length - 1 >= i; i++) {
            output_html = stringReplace(output_html, urlArray[i], `<a style="color:green;" href=${urlArray[i]} target=_blank>${urlArray[i]}</a>`)
        }
    }
    if (HashArray.length > 0) {
        HashArray = HashArray.filter(uniqueString); //value,index,Array
        for (i = 0; HashArray.length - 1 >= i; i++) {
            output_html = stringReplace(output_html, HashArray[i], `<a style="color:red;" href=${HashArray[i]} target=_blank>${HashArray[i]}</a>`)
        }
    }
    if (AtArray.length > 0) {
        AtArray = AtArray.filter(uniqueString); //value,index,Array
        for (i = 0; AtArray.length - 1 >= i; i++) {
            output_html = stringReplace(output_html, AtArray[i], `<a style="color:yellow;" href=${AtArray[i]} target=_blank>${AtArray[i]}</a>`)
        }
    }
    return output_html;

}

function convertToHTML(){

let Text = document.getElementById("Text").value;
let result = document.getElementById("result");
if(Text)
    result.innerHTML = ConverText_Html(Text);
}