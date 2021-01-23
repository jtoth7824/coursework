const Vehicle = require("./vehicle");

class Boat extends Vehicle {
    constructor(id, type, crew) {
      super(id, "0", "bonk");
      this.crew = crew;
      this.type = type;

    }
  
    crewSoundOff() {
        this.crew.forEach(member => {
          console.log(`${member.name} reporting for duty!`);
        });
      }
  
    useHorn() {
      console.log(this.sound);
    }
  }
  
  const boatPassengers = [
    {
      name: "Blackbeard"
    },
    {
      name: "Mary Read"
    },
    {
      name: "Henry Morgan"
    },
    {
      name: "Madame Cheng"
    }
  ];
  
  const boat = new Boat(16, "sailboat", boatPassengers);
  
  console.log("---BOAT---");
  boat.printInfo();
  boat.useHorn();
  boat.crewSoundOff();
  