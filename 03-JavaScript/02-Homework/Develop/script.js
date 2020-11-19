// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


function generatePassword() {

  var pwdLength = 0;
  var pwdArray = [];
  var rndNumber = 0;
  var fullArray = [];
  
  /* Define the arrays of characters to choose from */
  var num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  var lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  var spcl = [" ", "!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

  /* User needs to choose length of password */
  do {
    pwdLength = prompt("Choose length of password of at least 8 characters up to 128 charactoers");
  } while (pwdLength < 8 || pwdLength > 128);

  var lwrCase = 'n';
  var uprCase = 'n';
  var numeric = 'n';
  var special = 'n';

  /* User needs to selet which type of characters are in the password */
  while (lwrCase === 'n' && uprCase === 'n' && numeric === 'n' && special === 'n') {
    alert("Password needs to contain at least one of the 4 character types!!");
    lwrCase = prompt("Should password contain lowercase characters? (y/n)").toLowerCase();
    uprCase = prompt("Should password contain uppercase characters? (y/n)").toLowerCase();
    numeric = prompt("Should passowrd contain numeric value? (y/n)").toLowerCase();
    special = prompt("Should password contain special characters? (y/n)").toLowerCase();

  }

  /* decide which type of characters need to be in built array */
  if (lwrCase === 'y') {
    fullArray = fullArray.concat(lower);
  }
  if (uprCase === 'y') {
    fullArray = fullArray.concat(upper);
  }
  if (numeric === 'y') {
    fullArray = fullArray.concat(num);
  }
  if (special === 'y') {
    fullArray = fullArray.concat(spcl);
  }

  /* randomly pick character from built array and push to new array of selected characters */
  for (var j = 0; j < pwdLength; j++) {
    rndNumber = Math.floor(Math.random() * fullArray.length);
    pwdArray.push(fullArray[rndNumber]);
  }

  var pwdString = "";

  /* convert array to a string */
  for (var i = 0; i < pwdArray.length; i++) {
    pwdString = pwdString + pwdArray[i];
  }

  return password = pwdString;


}

/*  whichSpecial = Math.floor(Math.random() * 4);


  rndNumber = Math.floor(Math.random() * 10) + 47;
  var myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 10) + 64;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 26) + 96;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 16) + 31;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 7) + 57;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 6) + 90;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);

  rndNumber = Math.floor(Math.random() * 4) + 122;
  myString = String.fromCharCode(rndNumber);
  pwdArray.push(myString);
*/