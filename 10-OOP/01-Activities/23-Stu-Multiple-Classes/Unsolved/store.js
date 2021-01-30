class Store {
  constructor(name, stock) {
    this.name = name;
    this.stock = stock;
    this.revenue = 0;
  }

  printRevenue() {
    console.log(`The revenue so far is ${this.revenue}`);
  }

  welcome() {
    console.log(`Welcome to ${this.name}!`);
  }

  processProductSale(name) {
    this.revenue = this.revenue + name.price;
//    name.count = name.count - 1;

    if(this.stock ===0) {
      console.log(`There are no more ${name}`);
    }
    else {
      name.count = name.count -1;
    }
  }

  replenishStock(name, count) {
    this.stock = this.stock + name.count;
  }


}

module.exports = Store;
