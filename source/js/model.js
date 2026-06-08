const user = "Rhythm";
const pass = 1234;

const accounts = [
  {
    name: "Rhythm",
    password: 1234,
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2300,
        type: "income",
        Description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 500,
        type: "income",
        Description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
        category: "cost",
        amount: 2500,
        type: "expense",
        Description: "my job cost",
      },
    ],
  },
  {
    name: "Saddam",
    password: 5678,
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2000,
        type: "income",
        Description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 2000,
        type: "income",
        Description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
        category: "cost",
        amount: 2000,
        type: "expense",
        Description: "my job cost",
      },
    ],
  },
  {
    name: "holud",
    password: 6789,
    transactions: [
      {
        id: 123456,
        date: "7-03-2026",
        category: "salary",
        amount: 2000,
        type: "income",
        Description: "my job salary",
      },
      {
        id: 345678,
        date: "08-03-2026",
        category: "wage",
        amount: 2000,
        type: "income",
        Description: "my job wage",
      },
      {
        id: 567890,
        date: "09-03-2026",
        category: "cost",
        amount: 2000,
        type: "expense",
        Description: "my job cost",
      },
    ],
  },
];

export const state = {
  name: "",
  balace: 0,
  income: 0,
  expense: 0,
  saving: 0,
};

const updateState = function (crntUser) {
  state.name = crntUser.name;
  state.income += crntUser.transactions
    .filter((trans) => trans.type === "income")
    .map((tran) => tran.amount)
    .reduce((inc, crnt) => inc + crnt, 0);
  console.log(state.income);
  state.expense += crntUser.transactions
    .filter((trans) => trans.type === "expense")
    .map((tran) => tran.amount)
    .reduce((inc, crnt) => inc + crnt, 0);
  console.log(state.expense);
  state.balace = state.income - state.expense;
};

const retrieveData = function () {
  const crntUser = accounts.find((acc) => acc.name === user);
  updateState(crntUser);
};

retrieveData();
