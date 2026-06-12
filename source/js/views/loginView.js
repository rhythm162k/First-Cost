import Views from "./views.js";

class LoginView extends Views {
  _parent = document.querySelector(".login-screen");
  form = document.querySelector(".login-form");
  mainApp = document.querySelector(".app");
  logoutBtn = document.querySelector(".logout-btn");

  logHandler() {
    const errorElement = document.querySelector(".error-msg");
    if (errorElement) {
      errorElement.remove();
    }
    this._parent.classList.toggle("hidden");
    this.mainApp.classList.toggle("hidden");
  }

  logoutHandler() {
    this.logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.logHandler();
    });
  }
}
export default new LoginView();
