const urlString = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','0','1','2','3','4','5','6','7','8','9'];

/** The gen function below generates a random string based on the options array values provided in the urlString Variable
 The function is expecting an integer value to be passed into it which wil directly coorelate to the length of the generated url. for example gen(5) would produce a 5 digit randomly generated alphanumeric url. gen(2) a two digit etc...
* */

const gen = function(a){
       var b ='';
    while(b.length<a && a>0){
        var randomString = Math.random(); //This creates a randomly generated floating number ranging from 0 - 1 (0 inclusive and 1 exclusive)
        b+= urlString[Math.floor(randomString*36)]; // This line of code is taking the math.floor function and multiplying it by the number of available options in the array urlString. by doing this it is creating a randmoly generated index number for the array and appending it to the b variable string.

    }
 return b
};

module.exports = gen; /**this function is being exported and can be instantiated in route files by adding the line
const yourVariable = require('../../models/urlRandomizer');  then call this function by providing an integer like so : yourVariable(0);   */