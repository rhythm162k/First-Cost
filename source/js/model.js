const accounts = [
  {
    fullName: "Md.Sami-El Bashar rhythm",
    name: "rhythm",
    password: "1234",
    transactions: [
      {
        id: 123456,
        date: "2026-06-01",
        category: "salary",
        amount: 2300,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "2026-06-01",
        category: "wage",
        amount: 500,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "2026-06-01",
        category: "cost",
        amount: 2500,
        type: "expense",
        description: "my job cost",
      },
    ],
  },
  {
    fullName: "Md.Rabiul Bashar Saddam",
    name: "saddam",
    password: "5678",
    transactions: [
      {
        id: 123456,
        date: "2026-06-01",
        category: "salary",
        amount: 2000,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "2026-06-01",
        category: "wage",
        amount: 2000,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "2026-06-01",
        category: "cost",
        amount: 2000,
        type: "expense",
        description: "my job cost",
      },
    ],
  },
  {
    fullName: "Md.Sami-El Bashar Holud",
    name: "holud",
    password: "6789",
    transactions: [
      {
        id: 123456,
        date: "2026-06-01",
        category: "salary",
        amount: 2000,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "2026-06-01",
        category: "wage",
        amount: 2000,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "2026-06-01",
        category: "cost",
        amount: 2000,
        type: "expense",
        description: "my job cost",
      },
    ],
  },
];

let crntUser;

export const state = {
  fullName: "",
  name: "",
  transaction: [],
  balace: 0,
  income: 0,
  expense: 0,
  saving: 0,
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
    init();
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
    };
    accounts.push(newAcc);
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
  console.log(newTxn);
  state.transaction.unshift(newTxn);
  init();
  updateState(state.transaction);
};

export const deleteTranx = function (id) {
  state.transaction.splice(
    state.transaction.findIndex((trx) => trx.id === id),
    1
  );
  init();
  updateState(state.transaction);
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
  state.balace = state.income - state.expense;
};

const init = function () {
  state.balace = 0;
  state.income = 0;
  state.expense = 0;
  state.saving = 0;
};
