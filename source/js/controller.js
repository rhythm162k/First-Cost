import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";
import navigationView from "./views/navigationView.js";

const controlDashboard = function () {
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.saving);
  dashboard.updateUserName(model.state.name);
};
controlDashboard();

const controlNav = function (btn) {
  const id = btn.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

const init = function () {
  transactionView.addTransactionHandler();
  transactionView.addFilterBtnHandler();
  sidebarView.addMenubarHandler();
  sidebarView.addOverlayHandler();
  sidebarView.sideNavHandler();
  navigationView.navigateToHandler(controlNav);
};
init();
