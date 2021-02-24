const fs = require('fs');
const characterLimit = 80;

fs.readFile('./text.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    let unformattedArr = data.split('\n');
    let formattedArr = format(unformattedArr);
    fs.writeFile('output.txt', formattedArr.join('\n'), function(error) {
        if (error) return console.log(error);
    });
});

function format(unformattedText) {
    let paragraphs = [];
    for (let i = 0; i<unformattedText.length; i++) {
         //line has characters greater than 80
         if (unformattedText[i].length > characterLimit) {
            let wordAfterBreak = '';
            let wordBeforeBreak = unformattedText[i].substr(0, characterLimit+1);
                // when the word is in the middle
            if (unformattedText[i].charAt(81) != ' ') {
                let indexLastWord = wordBeforeBreak.lastIndexOf(' ')+1;
                wordAfterBreak = unformattedText[i].substr(indexLastWord, unformattedText[i].length);
                paragraphs.push(unformattedText[i].substr(0, indexLastWord));
                //not in the middle of a word
            } else {
                wordAfterBreak = unformattedText[i].substr(characterLimit+1, unformattedText[i].length);
                paragraphs.push(wordBeforeBreak);
            }
            unformattedText.splice(i+1, 0, wordAfterBreak);
         // line has characters less or equal to 80
         } else {
             paragraphs.push(unformattedText[i]);
         } 
     }
     return paragraphs;
}
