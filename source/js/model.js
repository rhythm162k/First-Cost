let accounts;
let crntUser;

export const init = function (data) {
  accounts = data || [];
};

export const state = {
  fullName: "",
  name: "",
  transaction: [],
  theme: "",
  balace: 0,
  income: 0,
  expense: 0,
  savings: 0,
};

export const userData = async function (data) {
  try {
    const { username, password } = data;
    crntUser = accounts.find((acc) => acc.name === username);
    if (!crntUser)
      throw new Error("User Not Found, Please Create an Account ;)");
    if (crntUser.password !== password) throw new Error("Wrong Password");
    state.fullName = crntUser.fullName;
    state.name = crntUser.name;
    state.theme = crntUser.theme;
    setInit();
    updateState(crntUser.transactions);
  } catch (err) {
    throw err;
  }
};

export const newRegistration = async function (data) {
  try {
    const found = accounts.find((acc) => acc.name === data.username);
    if (found) throw new Error("Username already Exists :(");
    if (data.password !== data.confirmPassword)
      throw new Error("Password didn't match");
    const newAcc = {
      fullName: data.fullName,
      name: data.username,
      password: data.password,
      transactions: [],
      theme: "",
    };
    accounts.push(newAcc);
    localStorage.setItem("accounts", JSON.stringify(accounts));
  } catch (err) {
    throw err;
  }
};

export const newTransaction = function (data) {
  const newTxn = {
    id: Math.ceil(Math.random() * 1000000),
    date: data.date,
    category: data.category,
    amount: +data.amount,
    type: data.type,
    description: data.description,
  };
  crntUser.transactions.unshift(newTxn);
  localStorage.setItem("accounts", JSON.stringify(accounts));
  setInit();
  updateState(crntUser.transactions);
};

export const deleteTranx = function (id) {
  crntUser.transactions.splice(
    crntUser.transactions.findIndex((trx) => trx.id === id),
    1
  );
  localStorage.setItem("accounts", JSON.stringify(accounts));
  setInit();
  updateState(crntUser.transactions);
};

export const filterTRX = function (data) {
  const filteredTRX = state.transaction.filter(
    (trx) =>
      trx.category
        .toLowerCase()
        .trim()
        .includes(data.category.toLowerCase().trim()) ||
      trx.data === data.date ||
      trx.type.toLowerCase().trim() === data.type.toLowerCase().trim()
  );
  return filteredTRX;
};

export const themeControl = function (theme) {
  crntUser.theme = theme;
  localStorage.setItem("accounts", JSON.stringify(accounts));
};

const updateState = function (transactions) {
  state.transaction = transactions;
  state.income += transactions
    .filter((trans) => trans.type === "income")
    .map((tran) => tran.amount)
    .reduce((inc, crnt) => inc + crnt, 0);
  state.expense += transactions
    .filter((trans) => trans.type === "expense")
    .map((tran) => tran.amount)
    .reduce((inc, crnt) => inc + crnt, 0);
  state.savings += transactions
    .filter((trans) => trans.type === "savings")
    .map((tran) => tran.amount)
    .reduce((inc, crnt) => inc + crnt, 0);
  state.balace = state.income - state.expense - state.savings;
};

const setInit = function () {
  state.balace = 0;
  state.income = 0;
  state.expense = 0;
  state.savings = 0;
};
