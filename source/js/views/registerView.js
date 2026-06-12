import Views from "./views.js";

class RegisterView extends Views {
  _parent = document.querySelector(".register-modal");
  form = document.querySelector(".register-form");
  createBtn = document.querySelector(".create-acc__btn");

  modalHandler() {
    this._parent.classList.toggle("hidden");
    this.form.reset();
  }

  openRegisterModal() {
    this.createBtn.addEventListener("click", this.modalHandler.bind(this));
  }
}

export default new RegisterView();
