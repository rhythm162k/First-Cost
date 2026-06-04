import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";

const controlDashboard = function () {
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.saving);
};
controlDashboard();

const init = function () {
  transactionView.addTransactionHandler();
  sidebarView.addMenubarHandler();
  sidebarView.addOverlayHandler();
};
init();
