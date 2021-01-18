function MiniBank(balance) {
  this.balance = balance;
  this.statement = [this.balance];

  this.getBalance = () => {
    return this.balance;
  };

  this.setBalance = (value) => {
    this.balance = value;
  }

  this.updateStatement = (num) => {
    this.statement.push(num);
  }

  this.getStatement = () => { return this.statement}


  
  
  this.printStatement = () => {
    for(let i = 0; i< this.statement.length; i++) {
      console.log(this.statement[i]);
    }
  }



  this.deposit = (value) => {
    if(value <= 0) {
      throw new Error("'value' must be a positive number!");
    }
    this.setBalance(this.getBalance() + value);
    this.updateStatement(value);

  }
  this.withdraw = (value) => {
    this.setBalance(this.getBalance() - value);
    this.updateStatement(-value);

  }

  this.printBalance = () => {
    console.log(`Balance: ${this.getBalance()}`);
  };
}


var bankJohn = new MiniBank(100);

bankJohn.printBalance();
bankJohn.deposit(200);
bankJohn.printBalance();
bankJohn.withdraw(50);
bankJohn.printBalance();
bankJohn.printStatement();