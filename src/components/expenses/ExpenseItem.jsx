import React from 'react';
// utils
import {
  formatCurrency,
  formatDate,
  getAllMatching,
} from '../../utils/storage';
// router
import { Link, useFetcher } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// styles
import classes from './expenses.module.css';

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const budget = getAllMatching({
    category: 'budgets',
    key: 'id',
    value: expense.budgetID,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ '--accent': budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="POST">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseID" value={expense.id} />
          <button
            type="submit"
            aria-aria-label={`Delete ${expense.name} enpense`}
            className={classes.expense_trash_can}
          >
            <FontAwesomeIcon icon={faTrash} className={classes.trash_can} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
