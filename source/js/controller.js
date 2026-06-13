import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";
import navigationView from "./views/navigationView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import filterTransaction from "./views/filterTransaction.js";

let filteredTRX = [];

const readingData = async function () {
  const accounts = await JSON.parse(localStorage.getItem("accounts"));
  model.init(accounts);
};

const controlDashboardAndTransaction = function () {
  const userName = model.state.fullName.trim().split(" ").slice(-1)[0];
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.saving);
  dashboard.updateUserName(
    userName[0].toUpperCase() + userName.slice(1).toLowerCase()
  );
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

const init = async function () {
  readingData();
  transactionView.addTransactionHandler();
  transactionView.formHandler(controlNewTransaction);
  transactionView.deleteTransactionHandler(controlDeleteTxn);
  filterTransaction.addFilterBtnHandler();
  filterTransaction.formHandler(controlFilter);
  filterTransaction.removeFilterHandler(controlRemoveFilter);
  sidebarView.addMenubarHandler();
  sidebarView.addOverlayHandler();
  sidebarView.sideNavHandler();
  navigationView.navigateToHandler(controlNav);
  loginView.formHandler(controlFormData);
  loginView.logoutHandler();
  registerView.formHandler(controlRegistration);
  registerView.openRegisterModal();
  registerView.closeRegisterModal();
};
init();
