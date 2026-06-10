class LoginView {
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
    this.form.reset();
  }

  errorHandler(msg) {
    const html = `
        <p class="error-msg">
            <span style="color: red">⚠</span> ${msg}
        </p>
    `;
    this.form.insertAdjacentHTML("afterbegin", html);
  }

  logoutHandler() {
    this.logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.logHandler();
    });
  }

  loginHandler(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const dataArr = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}
export default new LoginView();
