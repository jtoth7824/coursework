const DigitalPal = function() {
    this.hungry = false;
    this.sleepy = false;
    this.bored = true;
    this.age = 0;
    this.outside = false;
    this.houseCondition = 100;
    this.feed = () => {
        if(this.hungry === true) {
            console.log("That was yummy!");
            this.sleepy = true;
            this.hungry = false;
        }
        else {
            console.log("No thanks! I'm full.");   
        }
    }
    this.sleepy = () => {
        if(this.sleepy === true) {
            console.log("Zzzzzzz");
            this.sleepy = false;
            this.bored = true;
            this.increaseAge();
        }
        else {
            console.log("No way! I'm not tired.");
        }
    }
    this.play = () => {
        if(this.bored ===true) {
            console.log("Yay! Let's play!");
            this.bored = false;
            this.hungry = true;
        }
        else {
            console.log("Not right now. Later?");
        }
    }
    this.increaseAge = () => {
        this.age += 1;
        console.log("Happy Birthday to me! I am " + this.age + " old!");
    }
    this.bark = () => {
        console.log("Woof! Woof!");
    }
    this.goOutside = () => {
        if(this.outside === false) {
            console.log("Yay! I love the outdoors!");
            this.outside = true;
            this.bark();
        }
        else {
            console.log("We're already outside though...");
        }
    }
    this.goInside = () => {
        if(this.outside === true) {
            console.log("Do we have to? Fine...");
            this.outside = false;
        }
        else {
            console.log("I'm already inside...");
        }
    }
    this.meow = () => {
        console.log("Meow! Meow!");
    }
    this.destroyFurniture = () => {
        this.houseCondition -= 10;
        console.log("MUAHAHAHAHA! TAKE THAT FURNITURE!");
        this.bored = false;
        this.sleepy = true;
        if(this.houseCondition === 0) {
            return;
        }
    }
    this.buyNewFurniture = () => {
        this.houseCondition += 50;
        console.log("Are you sure about that?");
    }
}


var dog = new DigitalPal();

var cat = new DigitalPal();


dog.bark();
cat.meow();
dog.sleepy();
cat.goOutside();
cat.goInside();
cat.destroyFurniture();
dog.play();
dog.feed();
cat.buyNewFurniture();