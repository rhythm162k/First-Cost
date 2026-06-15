const logoLight = new URL("../../img/logo.png", import.meta.url).href;
const logoDark = new URL("../../img/logo-dark.png", import.meta.url).href;

class ThemeView {
  _parent = document.querySelector(".theme");
  body = document.querySelector("body");
  logoEl = document.querySelector(".brand-logo");

  theme(themeState) {
    if (themeState === "dark") {
      this._parent.textContent = "Toggle Light Mode";
      this.body.classList.add("dark");
      this.logoEl.setAttribute("src", logoDark);
    } else {
      this._parent.textContent = "Toggle Dark Mode";
      this.body.classList.remove("dark");
      this.logoEl.src = logoLight;
    }
  }

  themeBtnHandler(handler) {
    this._parent.addEventListener("click", () => {
      this.body.classList.toggle("dark");

      const isDark = this.body.classList.contains("dark");

      this._parent.textContent = isDark
        ? "Toggle Light Mode"
        : "Toggle Dark Mode";

      this.logoEl.setAttribute("src", isDark ? logoDark : logoLight);

      handler(isDark ? "dark" : "");
    });
  }
}

export default new ThemeView();
