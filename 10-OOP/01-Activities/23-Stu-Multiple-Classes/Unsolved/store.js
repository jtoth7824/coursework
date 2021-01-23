class Store {
  constructor(name, stock) {
    this.name = name;
    this.stock = stock;
    this.revenue = revenue;
  }

  printRevenue() {
    console.log(`The revenue so far is ${this.revenue}`);
  }

  welcome() {
    console.log(`Welcome to ${this.name}!`);
  }

  processProductSale(name) {
    this.revenue = this.revenue + name.price;
    this.count = this.count - 1;

    if(this.stock ===0) {
      console.log(`There are no more ${this.name}`);
    }
  }
}

module.exports = Store;
