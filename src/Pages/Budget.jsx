import React from 'react';
import { createExpense, deleteItem, getAllMatching } from '../utils/storage';
import { useLoaderData } from 'react-router-dom';
import { AddExpense, BudgetItem, ExpensesTable } from '../components';
import { toast } from 'react-toastify';

// loader to find budget and expenses to that budget
export async function budgetLoader({ params }) {
  const budget = await getAllMatching({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];

  const expenses = await getAllMatching({
    category: 'expenses',
    key: 'budgetID',
    value: params.id,
  });

  if (!budget) {
    throw new Error('The budget you are tring to find does not exist.');
  }

  return { budget, expenses };
}

// delete and create expense
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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
}

const Budget = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <section className="budget_page" style={{ '--accent': budget.color }}>
      <h3>{budget.name}</h3>
      <div className="components_container">
        <BudgetItem budget={budget} showDelete={true} className="budget_comp" />
        <AddExpense budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="expenses_list">
          <h3>{budget.name} Expenses</h3>
          <ExpensesTable expenses={expenses} showBudget={false} />
        </div>
      )}
    </section>
  );
};

export default Budget;
