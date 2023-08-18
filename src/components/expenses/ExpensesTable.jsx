import React from 'react';
// components
import ExpenseItem from './ExpenseItem';
import { Link } from 'react-router-dom';
// styles
import classes from './expenses.module.css';

const ExpensesTable = ({ expenses, showBudget = true }) => {
  return (
    <section className={classes.expenses_table}>
      <table>
        <thead>
          <tr>
            {['Name', 'Amount', 'Date', showBudget ? 'Budget' : '', ''].map(
              (i, index) => (
                <th key={index}>{i}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ExpensesTable;
