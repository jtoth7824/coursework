const Child = require("../child");

describe("Child", () => {
    describe("Child"), () => {
        test("create object with name & age if provided valid data", () => {

            const child = new Child("John", 7);

            expect(child.name).toEqual("John");
            expect(child.age).toEqual(3);
        });
        test("throw error if no arguments", () => {

            const cb = () => new Child();

            expect(cb).toThrow();
        });
        test("throw error if no age", () => {

            const cb = () => new Child("John");
            const err = new Error("Expcted parameter 'age' to be a non-negative number");

            expect(cb).toThrowError(err);
        });

        test("throw error if 'name' is not a string", () => {
            const cb = () => new Child(3, 2);
            const err = new Error("Expected parameter 'name to be a non-empty string");
        });

        test("throw error if 'age' is not a number", () => {
            const cb = () => new Child("John", "38");
            const err = new Error("Expected parameter 'age to be a non-negative number");

            expect(cb).toThrowError(err);
        });

        test("throw an error if 'age' is < 0", () => {
            const cb = () = new Child("John", -1);
            const err = new Error("Expected parameter 'age' to be a non-negative number");
            
            expect(cb).toThrowError(err);
        });
        }
});
