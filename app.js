const fs = require('fs');
const characterLimit = 80;

//I decided to implement file read in due to:
// (1) Avoid the MASSIVE string of the text from .txt
// (2) Clean output
fs.readFile('./text.txt', 'utf-8', (err, data) => {
    if (err) throw err;

    //split the data coming from the file and split into an array by line break
    let unformattedArr = data.split('\n');
    // Get the formatted text line by line in an array format.
    // I decided to create a separate format function to handle the data formation for:
    // (1) Clean code
    // (2) Debugging
    let formattedArr = format(unformattedArr);

    // Create an output txt of the formatted texts by joining each string with a new line
    fs.writeFile('output.txt', formattedArr.join('\n'), function(error) {
        if (error) return console.log(error);
    });
});

/**
 * Create an array of formatted version of each line of text to comply with the character limit of 80
 * @param {*} unformattedText 
 */
function format(unformattedText) {
    let paragraphs = [];
    //The forEach method was giving me issues that I didn't foresee until afterwards, and decided
    //to switch to a traditional loop
    for (let i = 0; i<unformattedText.length; i++) {
         //Line has characters greater than 80
         if (unformattedText[i].length > characterLimit) {

             // Created a variable to store in the event the character limit is in the middle of a word
            let wordAfterBreak = '';

            // Created a variable to store the text split by the character limit
            let wordBeforeBreak = unformattedText[i].substr(0, characterLimit+1);

            // When the character limit is in the middle of a word
            if (unformattedText[i].charAt(81) != ' ') {
                // Store the index of the last word before the break
                let indexLastWord = wordBeforeBreak.lastIndexOf(' ')+1;

                //Finding the text after the character limit without breaking a word
                wordAfterBreak = unformattedText[i].substr(indexLastWord, unformattedText[i].length);

                // Adding the text before the last word break into the array
                paragraphs.push(unformattedText[i].substr(0, indexLastWord));
            // When the character limit is NOT in the middle of a word
            } else {
                // Finding the text after the character limit
                wordAfterBreak = unformattedText[i].substr(characterLimit+1, unformattedText[i].length);

                // Adding the text formatted by the character limit into the array
                paragraphs.push(wordBeforeBreak);
            }

            // Adding the text split left over back into the array to be evaluated 
            unformattedText.splice(i+1, 0, wordAfterBreak);
         // Line has characters less or equal to 80
         } else {
             // Adding the text into the array
             paragraphs.push(unformattedText[i]);
         } 
     }
     return paragraphs;
}
