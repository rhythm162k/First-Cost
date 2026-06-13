import Views from "./views.js";

class RegisterView extends Views {
  _parent = document.querySelector(".register-modal");
  form = document.querySelector(".register-form");
  createBtn = document.querySelector(".create-acc__btn");

  modalHandler() {
    this._parent.classList.toggle("hidden");
  }

  openRegisterModal() {
    this.createBtn.addEventListener("click", this.modalHandler.bind(this));
  }

  closeRegisterModal() {
    this._parent.addEventListener("click", (e) => {
      const content = e.target.closest(".modal-content");
      if (content) return;
      this.modalHandler();
    });
  }
}

export default new RegisterView();
