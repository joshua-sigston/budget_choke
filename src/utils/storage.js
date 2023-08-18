// local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// generate color
const generateRandomColor = () => {
  const existingBudgets = fetchData('budgets')?.length ?? 0;

  return `${existingBudgets * 284} 65% 50%`;
};

// delete item
export const deleteUser = ({ key }) => {
  console.log('user');
  return localStorage.removeItem(key);
};

// create new budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData('budgets') ?? [];

  return localStorage.setItem(
    'budgets',
    JSON.stringify([...existingBudgets, newItem]),
  );
};

// create new expense
export const createExpense = ({ name, amount, budgetID }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetID: budgetID,
  };

  const existingExpenses = fetchData('expenses') ?? [];

  return localStorage.setItem(
    'expenses',
    JSON.stringify([...existingExpenses, newItem]),
  );
};

// delete item
export const deleteItem = ({ key, id }) => {
  const data = fetchData(key);
  console.log(data);
  console.log(id);

  if (id) {
    const newData = data.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }

  return localStorage.removeItem(key);
};

// get all items
export const getAllMatching = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// formatting currency
export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });
};

// date
export const formatDate = (epoch) => new Date(epoch).toLocaleDateString();

// total spent
export const spentAmount = (budgetID) => {
  const expenses = fetchData('expenses') ?? [];
  const spentAmount = expenses.reduce((acc, expense) => {
    // chk if expense.id === buddget.id
    if (expense.budgetID !== budgetID) return acc;

    // add current amount to total
    return (acc += expense.amount);
  }, 0);

  return spentAmount;
};

// formatting percentages
export const percentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};

// create waiting state
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 3000));
