const accounts = [
  {
    name: "rhythm",
    password: "1234",
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2300,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 500,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
        category: "cost",
        amount: 2500,
        type: "expense",
        description: "my job cost",
      },
    ],
  },
  {
    name: "saddam",
    password: "5678",
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2000,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 2000,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
        category: "cost",
        amount: 2000,
        type: "expense",
        description: "my job cost",
      },
    ],
  },
  {
    name: "holud",
    password: "6789",
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2000,
        type: "income",
        description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 2000,
        type: "income",
        description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
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
    state.name = crntUser.name[0].toUpperCase() + crntUser.name.slice(1);
    init();
    updateState(crntUser.transactions);
  } catch (err) {
    throw err;
  }
};

export const newRegistration = async function (data) {
  try {
    console.log(data);
    if (data.password !== data.confirmPassword)
      throw new Error("Password didn't match");
    const newAcc = {
      name: data.username,
      password: data.password,
      transactions: [],
    };
    accounts.push(newAcc);
    console.log(accounts);
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
  state.transaction.unshift(newTxn);
  init();
  updateState(state.transaction);
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
