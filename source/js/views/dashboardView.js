class Dashboard {
  balance = document.querySelector(".balance");
  income = document.querySelector(".income");
  expense = document.querySelector(".expenses");
  savings = document.querySelector(".savings");
  user = document.querySelector(".user-name");

  updateBalance(bl) {
    this.balance.innerHTML = `$${bl}`;
  }
  updateIncome(inc) {
    this.income.innerHTML = `$${inc}`;
  }
  updateExpense(exp) {
    this.expense.innerHTML = `-$${exp}`;
  }
  updateSavings(save) {
    this.savings.innerHTML = `$${save}`;
  }
  updateUserName(name) {
    this.user.textContent = `${name}`;
  }
}

export default new Dashboard();
