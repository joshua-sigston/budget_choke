import React, { useEffect, useRef } from 'react';
// router
import { useFetcher } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
// styles
import classes from './forms.module.css';

const AddExpense = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      //reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <section className={classes.add_expense}>
      <p>
        Add New
        <span>{budgets && ` ${budgets.map((item) => item.name)} `}</span>
        Expense
      </p>
      <fetcher.Form method="POST" ref={formRef} className={classes.form}>
        <div className={classes.input_container}>
          <label htmlFor="newExpense">Expense Name</label>
          <input
            type="text"
            name="newExpense"
            id="newExpense"
            placeholder="e.g., matches"
            ref={focusRef}
            required
          />
        </div>
        <div className={classes.input_container}>
          <label htmlFor="expenseAmount">Amount</label>
          <input
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            placeholder="e.g., 36.00"
            inputMode="decimal"
            step="0.01"
            required
          />
        </div>
        <div className={classes.category} hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createAt - b.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating expense....</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faCoins} className={classes.coins} />
              <span>Create Expense'</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </section>
  );
};

export default AddExpense;
