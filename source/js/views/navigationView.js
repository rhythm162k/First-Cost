class NavigationView {
  _parent = document.querySelectorAll(".navigation");

  navigateToHandler(handler) {
    this._parent.forEach((nav) =>
      nav.addEventListener("click", function (e) {
        const btn = e.target.closest(".navigate-to");
        if (!btn) return;
        handler(btn);
      })
    );
  }
}

export default new NavigationView();
