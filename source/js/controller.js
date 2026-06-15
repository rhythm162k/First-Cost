import * as model from "./model.js";
import dashboard from "./views/dashboardView.js";
import transactionView from "./views/transactionView.js";
import sidebarView from "./views/sidebarView.js";
import navigationView from "./views/navigationView.js";
import loginView from "./views/loginView.js";
import registerView from "./views/registerView.js";
import filterTransaction from "./views/filterTransaction.js";
import chartView from "./views/chartView.js";
import themeView from "./views/themeView.js";
import deleteAccView from "./views/deleteAccView.js";

let filteredTRX = [];

const readingData = function () {
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  model.init(accounts);
};

const controlDashboardAndTransaction = function () {
  const userName = model.state.fullName.trim().split(" ").slice(-1)[0];
  dashboard.updateBalance(model.state.balace);
  dashboard.updateExpense(model.state.expense);
  dashboard.updateIncome(model.state.income);
  dashboard.updateSavings(model.state.savings);
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
    crntTheme();
    controlDashboardAndTransaction();
    controlCharts();
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
  controlCharts();
  transactionView.toggleTransactionForm();
};

const controlDeleteTxn = async function (id) {
  model.deleteTranx(id);
  controlDashboardAndTransaction();
  controlCharts();
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

const controlCharts = function () {
  const transactions = model.state.transaction;
  chartView.statsState(transactions);

  const summary = transactions.reduce(
    (acc, t) => {
      acc[t.type] = (acc[t.type] || 0) + t.amount;
      return acc;
    },
    { income: 0, expense: 0, savings: 0 }
  );

  const monthly = transactions.reduce((acc, t) => {
    const date = new Date(t.date);

    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!acc[month]) {
      acc[month] = {
        income: 0,
        expense: 0,
        savings: 0,
      };
    }

    acc[month][t.type] += t.amount;

    return acc;
  }, {});

  const pieLabels = ["Income", "Expense", "Savings"];
  const pieData = [summary.income, summary.expense, summary.savings];

  const lineLabels = Object.keys(monthly);

  const incomeData = lineLabels.map((m) => monthly[m].income);
  const expenseData = lineLabels.map((m) => monthly[m].expense);
  const savingsData = lineLabels.map((m) => monthly[m].savings);

  chartView.renderExpenseChart(pieLabels, pieData);
  chartView.renderMonthlyChart(
    lineLabels,
    incomeData,
    expenseData,
    savingsData
  );
};

const crntTheme = function () {
  const theme = model.state.theme;
  themeView.theme(theme);
};

const controlTheme = function (theme) {
  model.themeControl(theme);
  chartView.updateColors();
};

const controlDeleteFrom = function (data) {
  try {
    model.deleteAcc(data);
    deleteAccView.backToStart();
  } catch (err) {
    deleteAccView.errorHandler(err.message);
  }
};

const init = function () {
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
  themeView.themeBtnHandler(controlTheme);
  deleteAccView.openModal();
  deleteAccView.formHandler(controlDeleteFrom);
  deleteAccView.closeModal();
};
init();
