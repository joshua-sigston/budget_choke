import React from 'react';
// router
import { useLoaderData, Link } from 'react-router-dom';
// components
import {
  AddBudget,
  Hero,
  AddExpense,
  BudgetItem,
  ExpensesTable,
} from '../components';
// toast
import { toast } from 'react-toastify';
// utils
import {
  createBudget,
  createExpense,
  fetchData,
  deleteItem,
  waait,
} from '../utils/storage';

export function homeLoader() {
  const username = fetchData('username');
  const budgets = fetchData('budgets') ?? [];
  const expenses = fetchData('expenses') ?? [];
  return { username, budgets, expenses };
}

export async function submitAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // new user submission
  if (_action === 'newUser') {
    try {
      localStorage.setItem('username', JSON.stringify(values.username));
      return toast.success(`Welcome, ${values.username}`);
    } catch (e) {
      throw new Error('There was a problem creating your account.');
    }
  }

  // create budget
  if (_action === 'createBudget') {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.amount,
      });
      return toast.success('Budget created!');
    } catch (e) {
      throw new Error('There was a problem creating your budget.');
    }
  }

  // create expense
  if (_action === 'createExpense') {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.expenseAmount,
        budgetID: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created.`);
    } catch (error) {
      throw new Error('There was a problem creating your expense.');
    }
  }

  // delete expense
  if (_action === 'deleteExpense') {
    try {
      deleteItem({
        key: 'expenses',
        id: values.expenseID,
      });
      return toast.success(`Expense deleted`);
    } catch (e) {
      throw new Error('There was a problem deleted your expense.');
    }
  }
}

const Home = () => {
  const { username, budgets, expenses } = useLoaderData();

  return (
    <section className="homepage">
      {!username ? (
        <Hero username={username} />
      ) : (
        <div className="user_display grid">
          <h3>Welcome Back {username}</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          {budgets.length <= 0 ? (
            <div className="grid">
              <h5>Create A Budget</h5>
              <AddBudget />
            </div>
          ) : (
            <section className="budget_container">
              <div className="budget_forms flex_row">
                <AddBudget />
                <AddExpense budgets={budgets} />
              </div>
              <section className="existing_budgets">
                <h4>Existing Budgets</h4>
                {budgets.map((item) => (
                  <BudgetItem key={item.id} budget={item} />
                ))}
              </section>
              <section className="expenses_container">
                {expenses && expenses.length > 0 && (
                  <ExpensesTable
                    expenses={expenses
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .slice(0, 3)}
                  />
                )}
                {expenses.length >= 3 && (
                  <Link to="expenses">View All Expenses</Link>
                )}
              </section>
            </section>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
