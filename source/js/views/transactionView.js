class TransactionView {
  _parent = document.querySelector(".transaction-btn");
  transactionPlate = document.querySelector(".transaction-panel");
  transactionForm = document.querySelector(".transaction-form");

  toggleTransactionForm() {
    this.transactionPlate.classList.toggle("hidden");
    this._parent.classList.toggle("hidden");
  }

  addTransactionHandler(handler = null) {
    this._parent.addEventListener(
      "click",
      this.toggleTransactionForm.bind(this)
    );
  }

  addFormHandler(handler = null) {
    this.transactionForm.addEventListener(
      "submit",
      this.toggleTransactionForm.bind(this)
    );
  }
}

export default new TransactionView();
