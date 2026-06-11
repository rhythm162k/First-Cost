class RegisterView {
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

  errorHandler(msg) {
    const html = `
        <p class="error-msg">
            <span style="color: red">⚠</span> ${msg}
        </p>
    `;
    this.form.insertAdjacentHTML("afterbegin", html);
  }

  registerHandler(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorElement = document.querySelector(".error-msg");
      if (errorElement) {
        errorElement.remove();
      }
      const dataArr = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new RegisterView();
