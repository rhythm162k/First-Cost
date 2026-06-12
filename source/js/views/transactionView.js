import Views from "./views.js";

class TransactionView extends Views {
  data;
  _parent = document.querySelector(".transactions-list");
  addTransactionBtn = document.querySelector(".transaction-btn");
  transactionPlate = document.querySelector(".transaction-form__section");
  form = document.querySelector(".transaction-form");
  filterBtn = document.querySelector(".filter-btn");
  filter = document.querySelector(".filter");

  toggleFilterForm() {
    this.filter.classList.toggle("hidden");
  }

  toggleTransactionForm() {
    this.transactionPlate.classList.toggle("hidden");
  }

  addTransactionHandler(handler = null) {
    this.addTransactionBtn.addEventListener(
      "click",
      this.toggleTransactionForm.bind(this)
    );
  }

  addFilterBtnHandler() {
    this.filterBtn.addEventListener("click", this.toggleFilterForm.bind(this));
  }

  render(data) {
    this.data = data;
    const markup = this.data.map((obj) => this.renderMarkup(obj)).join("");
    this._parent.innerHTML = "";
    this._parent.insertAdjacentHTML("afterbegin", markup);
  }

  renderMarkup(data) {
    return `
      <article class="transaction">
        <div>
          <h4>${data.category}</h4>
          <small>${data.type} • ${data.date}</small>
        </div>

        <div class="transaction-actions">
          <span class="${data.income}">$${data.amount}</span>
          <button class="btn btn-secondary">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </div>
      </article>
    `;
  }
}

export default new TransactionView();
