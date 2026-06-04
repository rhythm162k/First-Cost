export const state = {
  balace: 0,
  income: 0,
  expense: 0,
  saving: 0,
};

const doBalance = function () {
  const dash = {
    expenses: [120, 2000],
    incomes: [500, 200, 1000, 600],
    savings: [50, 50, 50, 50],
  };
  state.income += dash.incomes.reduce((inc, mov) => inc + mov, 0);
  state.expense += dash.expenses.reduce((inc, mov) => inc + mov, 0);
  state.saving += dash.savings.reduce((inc, mov) => inc + mov, 0);
  state.balace = state.balace + state.income + state.saving - state.expense;
};

doBalance();
