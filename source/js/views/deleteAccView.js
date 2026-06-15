import Views from "./views.js";

class DeleteAccView extends Views {
  _parent = document.querySelector(".delete-acc-modal");
  loginScrn = document.querySelector(".login-screen");
  form = document.querySelector(".delete-form");
  deleteAccBtn = document.querySelector(".delete-acc-btn");
  deleteAcc = document.querySelector(".delete-acc");
  mainApp = document.querySelector(".app");

  backToStart() {
    this.loginScrn.classList.toggle("hidden");
    this.mainApp.classList.toggle("hidden");
    this._parent.classList.toggle("hidden");
  }

  modalHandler() {
    this._parent.classList.toggle("hidden");
  }

  openModal() {
    this.deleteAcc.addEventListener("click", this.modalHandler.bind(this));
  }

  closeModal() {
    this._parent.addEventListener("click", (e) => {
      const content = e.target.closest(".modal-content");
      if (content) return;
      this.modalHandler();
    });
  }
}

export default new DeleteAccView();
