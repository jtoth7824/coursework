const Algo = require("../algo");

describe("Algo", () => {
  describe("reverse", () => {
    it("should reverse a given string", () => {
      const str = "Hello World!";
      const reversed = "!dlroW olleH";

      const result = new Algo().reverse(str);

      expect(result).toEqual(reversed);
    });    
  });

  describe("isPalindrome", () => {
   
  });

  describe("capitalize", () => {
    
  });
});
