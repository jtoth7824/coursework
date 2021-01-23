class Character {
  constructor(name, strength, hitpoints) {
    this.name = name;
    this.strength = strength;
    this.hitpoints = hitpoints;
  }
  // method which prints all of the stats for a character
  printStats() {
    console.log(`Stats for ${this.name} are as following:`);
    console.log(`Each attack will do ${this.strength} damage.`);
    console.log(`${this.name} has ${this.hitpoints} hit points remaining!`);
    console.log("------------");
  }
  // method which determines whether or not a character's "hitPoints" are less then zero
  // and returns true or false depending upon the outcome
  isAlive() {
    if(this.hitpoints <=0) {
      return false;
    }
    else {
       return true
    }
  }

  // method which takes in a second object and decreases their "hitPoints" by this character's strength
  attack(opponent) {
    // console.log which character was attacked and how much damage was dealt
    // Then, change the opponent's hitPoints to reflect this
    console.log(`${this.name} hit ${opponent.name} for ${this.strength}`);
    opponent.hitpoints = opponent.hitpoints - this.strength;

  }
}

// Create two unique characters using the "character" class

var deer = new Character("Bambi", 50, 70);
var rabbit = new Character("Thumper", 30, 100);

// Create an interval that alternates attacks every 2000 milliseconds

let deerTurn = true
deer.printStats();
rabbit.printStats();

const whoseTurn = setInterval(() => {

  deerTurn = !deerTurn;

  if (!deer.isAlive() || !rabbit.isAlive()) {
    clearInterval(whoseTurn);
    console.log("Game over");
  } else if (deerTurn) {
    deer.attack(rabbit);
    rabbit.printStats();
  } else {
    rabbit.attack(deer);
    deer.printStats();
  }
}, 2000);
