import Views from "./views.js";

class FilterTransaction extends Views {
  addFilterBtn = document.querySelector(".add-filter-btn");
  filter = document.querySelector(".filter");
  form = document.querySelector(".filter-form");
  removeFilterBtn = document.querySelector(".filter-remove-btn");

  toggleFilterForm() {
    this.filter.classList.toggle("hidden");
  }

  addFilterBtnHandler() {
    this.addFilterBtn.addEventListener(
      "click",
      this.toggleFilterForm.bind(this)
    );
  }

  removeFilterHandler(handler) {
    this.removeFilterBtn.addEventListener("click", handler);
  }
}

export default new FilterTransaction();
