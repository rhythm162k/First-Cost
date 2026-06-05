class SidebarView {
  _parent = document.querySelector(".menu-btn");
  sidebar = document.querySelector(".sidebar");
  overlay = document.querySelector(".overlay");
  body = document.querySelector("body");
  sideNavBar = document.querySelector(".side-nav-bar");

  toggleSidebarView() {
    this.sidebar.classList.toggle("sidebar-open");
    this.overlay.classList.toggle("hidden");
    this.body.classList.toggle("no-scroll");
  }

  revealScreen(e) {
    const btn = e.target.closest(".navigate-to");
    if (!btn) return;
    this.sidebar.classList.remove("sidebar-open");
    this.overlay.classList.add("hidden");
    this.body.classList.remove("no-scroll");
  }

  sideNavHandler() {
    this.sideNavBar.addEventListener("click", this.revealScreen.bind(this));
  }

  addMenubarHandler() {
    this._parent.addEventListener("click", this.toggleSidebarView.bind(this));
  }

  addOverlayHandler() {
    this.overlay.addEventListener("click", this.toggleSidebarView.bind(this));
  }
}

export default new SidebarView();
