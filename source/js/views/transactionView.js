class TransactionView {
  _parent = document.querySelector(".transaction-btn");
  transactionPlate = document.querySelector(".transaction-panel");
  transactionForm = document.querySelector(".transaction-form");
  filterBtn = document.querySelector(".filter-btn");
  filter = document.querySelector(".filter");

  toggleFilterForm() {
    this.filter.classList.toggle("hidden");
  }

  toggleTransactionForm() {
    this.transactionPlate.classList.toggle("hidden");
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

  addFilterBtnHandler() {
    this.filterBtn.addEventListener("click", this.toggleFilterForm.bind(this));
  }
}

export default new TransactionView();
