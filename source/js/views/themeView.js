class ThemeView {
  _parent = document.querySelector(".theme");
  body = document.querySelector("body");
  logo = document.querySelector(".brand-logo");

  theme(themeState) {
    if (themeState === "dark") {
      this._parent.textContent = "Toggle Light Mode";
      this.body.classList.add("dark");
      this.logo.setAttribute("src", "./source/img/logo-dark.png");
    } else {
      this._parent.textContent = "Toggle Dark Mode";
      this.body.classList.remove("dark");
      this.logo.src = "./source/img/logo.png";
    }
  }

  themeBtnHandler(handler) {
    this._parent.addEventListener("click", () => {
      this.body.classList.toggle("dark");

      const isDark = this.body.classList.contains("dark");

      this._parent.textContent = isDark
        ? "Toggle Light Mode"
        : "Toggle Dark Mode";

      this.logo.setAttribute(
        "src",
        isDark ? "./source/img/logo-dark.png" : "./source/img/logo.png"
      );

      handler(isDark ? "dark" : "");
    });
  }
}

export default new ThemeView();
