function Algo() {}

Algo.prototype.reverse = function(str) {
    var rev = str.split("");

    rev = rev.reverse();
    rev = rev.join("");

    return rev;
};

Algo.prototype.isPalindrome = function(str) {

    return str === this.reverse(str);
};

Algo.prototype.capitalize = function(str) {

    var capital = str.split(" ");

    for (i = 0; i<capital.length; i++) {
        console.log(capital[i]);
        capital[i] = capital[i].charAt(0).toUpperCase() + capital[i].slice(1);
    }

//    capital = capital.join(" ");

    return capital.join(" ");

};

module.exports = Algo;
