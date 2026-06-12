import Views from "./views.js";

class TransactionView extends Views {
  data;
  _parent = document.querySelector(".transactions-list");
  addTransactionBtn = document.querySelector(".transaction-btn");
  transactionPlate = document.querySelector(".transaction-form__section");
  form = document.querySelector(".transaction-form");

  toggleTransactionForm() {
    this.transactionPlate.classList.toggle("hidden");
  }

  addTransactionHandler() {
    this.addTransactionBtn.addEventListener(
      "click",
      this.toggleTransactionForm.bind(this)
    );
  }

  deleteTransactionHandler(handler) {
    this._parent.addEventListener("click", function (e) {
      const deleteBtn = e.target.closest(".delete-btn");
      if (!deleteBtn) return;
      const id = deleteBtn.getAttribute("id");
      console.log(+id);
      handler(+id);
    });
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
          <button class="btn btn-danger delete-btn" id="${data.id}">Delete</button>
        </div>
      </article>
    `;
  }
}

export default new TransactionView();
