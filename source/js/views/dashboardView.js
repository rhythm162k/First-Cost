class Dashboard {
  balance = document.querySelector(".balance");
  income = document.querySelector(".income");
  expense = document.querySelector(".expenses");
  savings = document.querySelector(".savings");

  updateBalance(bl) {
    this.balance.innerHTML = `$${bl}`;
  }
  updateIncome(inc) {
    this.income.innerHTML = `$${inc}`;
  }
  updateExpense(exp) {
    this.expense.innerHTML = `$${exp}`;
  }
  updateSavings(save) {
    this.savings.innerHTML = `$${save}`;
  }
}

export default new Dashboard();
