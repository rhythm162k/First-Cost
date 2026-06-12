export default class Views {
  formHandler(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const errorElement = document.querySelector(".error-msg");
      if (errorElement) {
        errorElement.remove();
      }
      const dataArr = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      this.form.reset();
    });
  }

  errorHandler(msg) {
    const html = `
        <p class="error-msg">
            <span style="color: red">⚠</span> ${msg}
        </p>
    `;
    this.form.insertAdjacentHTML("afterbegin", html);
  }
}
