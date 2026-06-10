class LoginView {
  _parent = document.querySelector(".login-screen");
  form = document.querySelector(".login-form");
  mainApp = document.querySelector(".app");
  logoutBtn = document.querySelector(".logout-btn");

  logHandler(e) {
    e.preventDefault();
    this._parent.classList.toggle("hidden");
    this.mainApp.classList.toggle("hidden");
    this.form.reset();
  }

  logoutHandler() {
    this.logoutBtn.addEventListener("click", this.logHandler.bind(this));
  }

  loginHandler() {
    this.form.addEventListener("submit", this.logHandler.bind(this));
  }
}
export default new LoginView();
