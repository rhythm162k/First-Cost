import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";
import navigationView from "./views/navigationView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";

const controlDashboard = function () {
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.saving);
  dashboard.updateUserName(model.state.name);
};

const controlTransactions = function () {
  transactionView.render(model.state.transaction);
};

const controlNav = function (btn) {
  const id = btn.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

const controlFormData = async function (data) {
  try {
    await model.userData(data);
    controlDashboard();
    controlTransactions();
    loginView.logHandler();
  } catch (err) {
    loginView.errorHandler(err.message);
  }
};

const controlRegistration = async function (data) {
  try {
    await model.newRegistration(data);
    registerView.modalHandler();
  } catch (err) {
    registerView.errorHandler(err.message);
  }
};

const controlNewTransaction = async function (data) {
  try {
    await model.newTransaction(data);
    controlTransactions();
    controlDashboard();
  } catch (err) {
    transactionView.errorHandler(err.message);
  }
};

const init = function () {
  transactionView.addTransactionHandler();
  transactionView.addFilterBtnHandler();
  transactionView.addFormHandler(controlNewTransaction);
  sidebarView.addMenubarHandler();
  sidebarView.addOverlayHandler();
  sidebarView.sideNavHandler();
  navigationView.navigateToHandler(controlNav);
  loginView.loginHandler(controlFormData);
  loginView.logoutHandler();
  registerView.registerHandler(controlRegistration);
  registerView.openRegisterModal();
};
init();
