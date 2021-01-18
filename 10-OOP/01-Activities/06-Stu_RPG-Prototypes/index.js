function Character(name, profession, age, strength, hp) {
     this.name = name;
     this.profession = profession;
     this.age = age;
     this.strength = strength;
     this.hp = hp;
     this.printStats = () => {
         console.log(this.name);
         console.log(this.profession);
         console.log(this.age);
         console.log(this.strength);
         console.log(this.hp);
     }
}

Character.prototype.IsAlive = function() {
    if(this.hp <= 0) {
        console.log(this.name + " is no longer alive!");
    }
    else {
        console.log(this.name + " is alive!");
    }
}

Character.prototype.Attack = function (value) {
//    this.hp = this.hp - value.strength;
    value.hp = value.hp - this.strength;
}

Character.prototype.LevelUp = function() {
    this.age += 1;
    this.strength += 5;
    this.hp += 25;
}

var char1 = new Character("Mongo", "elf", 35, 60, 15);
var char2 = new Character("Debbian", "wizard", 20, 50, 100);
var char3 = new Character("Jenner", "magician", 20, 40, 100);



char1.printStats();
char1.IsAlive();
char1.Attack(char3);

char2.Attack(char1);

char1.printStats();
char1.LevelUp();
char1.printStats();


char2.printStats();
char2.IsAlive();