import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";
import navigationView from "./views/navigationView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import filterTransaction from "./views/filterTransaction.js";

let filteredTRX = [];

const controlDashboardAndTransaction = function () {
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.saving);
  dashboard.updateUserName(model.state.name);
  transactionView.render(model.state.transaction);
};

const controlNav = function (btn) {
  const id = btn.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
};

const controlFormData = async function (data) {
  try {
    await model.userData(data);
    controlDashboardAndTransaction();
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
  model.newTransaction(data);
  controlDashboardAndTransaction();
  transactionView.toggleTransactionForm();
};

const controlDeleteTxn = async function (id) {
  model.deleteTranx(id);
  controlDashboardAndTransaction();
};

const controlFilter = async function (data) {
  filteredTRX = model.filterTRX(data);
  if (filteredTRX.length === 0) return;
  transactionView.render(filteredTRX);
};

const controlRemoveFilter = function () {
  if (filteredTRX.length === 0) return;
  transactionView.render(model.state.transaction);
};

const init = function () {
  transactionView.addTransactionHandler();
  transactionView.formHandler(controlNewTransaction);
  filterTransaction.addFilterBtnHandler();
  filterTransaction.formHandler(controlFilter);
  filterTransaction.removeFilterHandler(controlRemoveFilter);
  transactionView.deleteTransactionHandler(controlDeleteTxn);
  sidebarView.addMenubarHandler();
  sidebarView.addOverlayHandler();
  sidebarView.sideNavHandler();
  navigationView.navigateToHandler(controlNav);
  loginView.formHandler(controlFormData);
  loginView.logoutHandler();
  registerView.formHandler(controlRegistration);
  registerView.openRegisterModal();
};
init();
