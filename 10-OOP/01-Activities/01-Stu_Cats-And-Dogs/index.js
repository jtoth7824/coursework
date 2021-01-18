const dogs = {
    raining: true,
    noise: "Woof!",
    makeNoise () {
        if(this.raining===true) {
            console.log(this.noise)
        }
    }
}

const cats = {
    raining: false,
    noise: "Meow!",
    makeNoise () {
        if(this.raining === true) {
            console.log(this.noise)
        }
    }
}

dogs.makeNoise();
cats.raining = true;
cats.makeNoise();
