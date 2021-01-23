const Vehicle = require("./vehicle");

class Car extends Vehicle {
    constructor(id, color, passengers) {
      super(id, 4, "beep");
      this.color = color;
      this.passengers = passengers;

    }
  
    checkPassengers() {
      if(this.passengers <=4) {
  
      }
      else {
        console.log("There are too many passengers!");
      }
    }
  
    useHorn() {
      console.log(this.sound);
    }
  }
  

  const carPassengers = [
    {
      name: "Aristotle"
    },
    {
      name: "Confucius"
    },
    {
      name: "Socrates"
    },
    {
      name: "Lao-Tzu"
    },
    {
      name: "Plato"
    }
  ];
  
  const car = new Car(15, "blue", carPassengers);
  
  console.log("---CAR---");
  car.printInfo();
  car.useHorn();
  car.checkPassengers();
  