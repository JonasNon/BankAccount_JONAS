const { describe } = require('node:test')
'use strict'




class BankAccount {
  constructor(accountNumber, owner){
    this.accountNumber = accountNumber
    this.owner = owner
    this.transactions = []
  }

  balance(){
    let total = 0
    for (let i = 0; i < this.transactions.length; i++) {
      total += this.transactions[i].amount
    }
    return total

  }

  deposit(amt){
    if (amt >= 0){
      this.transactions.push(new Transaction(amt, this))
    }
  }

  charge(amt, payee){
    
    if (this.balance() - amt >= 0) {
      this.transactions.push(new Transaction(-amt, payee))
    } 
  }
}

class Transaction {
  constructor(amount, payee){
    this.amount = amount;
    this.payee = payee;
    this.date = new Date().getDate;
  }
  
}


// class SavingsAccount extends BankAccount {
//   constructor(interestRate){
//     super(accountNumber, owner, transactions)
//     this.interestRate = interestRate
//   }

//   accrueInterest(){
//     let newBalace = this.balance() * this.interestRate
//     this.deposit(newBalace, "Deposit")
//   }
// }









//Tests Below!!!

if (typeof describe === "function") {
  const assert = require('assert')


  describe ('#testing account creation', function() {
    it ('should create new account', function(){
      let testAccount = new BankAccount('123', 'Jonah Williams');
      assert.equal(testAccount.owner, 'Jonah Williams')
      assert.equal(testAccount.accountNumber, '123')
      assert.equal(testAccount.transactions.length, 0)
      assert.equal(testAccount.balance(), 0)

    })
  })

  describe ('#testing account balance', function() {
    it ('should test account balance', function(){
      let testAccount = new BankAccount('123', 'Jonah Williams');
      assert.equal(testAccount.balance(), 0)
      testAccount.deposit(100)
      assert.equal(testAccount.balance(), 100)
      testAccount.charge(10, "Target")
      assert.equal(testAccount.balance(), 90)

    })
  

    it ('should not allow negative deposit', function(){
      let testAccount = new BankAccount('123', 'Jonah Williams');
      assert.equal(testAccount.balance(), 0)
      testAccount.deposit(100)
      assert.equal(testAccount.balance(), 100)
      testAccount.deposit(-30)
      assert.equal(testAccount.balance(), 100)

    })

    it ('should not allow overcharging', function(){
      let testAccount = new BankAccount('123', 'Jonah Williams');
      assert.equal(testAccount.balance(), 0)
      testAccount.charge(30, "Target")
      assert.equal(testAccount.balance(), 0)


    })

    it ('should allow a refund', function(){
      let testAccount = new BankAccount('123', 'Jonah Williams');
      assert.equal(testAccount.balance(), 0)
      testAccount.charge(-30, "Target")
      assert.equal(testAccount.balance(), 30)
    })
  })

  describe ('#testing transaction creation', function() {
    it ('should create a transaction for a deposit', function(){
      let t1 = new Transaction(30, "Deposit");
      assert.equal(t1.amount, 30)
      assert.equal(t1.payee, "Deposit")
      assert.notEqual(t1.date, undefined)
      assert.notEqual(t1.date, null)

    })

    it ('should create a transaction for a charge', function(){
      let t1 = new Transaction(-100, "Target");
      assert.equal(t1.amount, -100)
      assert.equal(t1.payee, "Target")
      assert.notEqual(t1.date, undefined)
      assert.notEqual(t1.date, null)

    })
  })

  // describe ('#creation of savings account', function() {
  //   it ('should create a savings account correctly', function(){
  //     let testAccount = new SavingsAccount('123', 'Jonah Williams', .10);
  //     assert.equal(testAccount.owner, 'Jonah Williams')
  //     assert.equal(testAccount.accountNumber, '123')
  //     assert.equal(testAccount.interestRate, .10)
  //     assert.equal(testAccount.balance(), 0)

  //   })

  //   it ('accrue interest correcly', function(){
  //     let testAccount = new SavingsAccount('123', 'Jonah Williams', .10);
  //     assert.equal(testAccount.owner, 'Jonah Williams')
  //     assert.equal(testAccount.accountNumber, '123')
  //     assert.equal(testAccount.interestRate, .10)
  //     assert.equal(testAccount.balance(), 0)
  //     testAccount.deposit(100)
  //     testAccount.accrueInterest()
  //     assert.equal(testAccount.balance(), 110)

  //   })
  // })
}


