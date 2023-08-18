import React, { useEffect, useRef } from 'react';
// router
import { Form, useFetcher } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar } from '@fortawesome/free-solid-svg-icons';
// styles
import classes from './forms.module.css';

const AddBudget = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <section className={classes.create_budget}>
      <fetcher.Form method="POST" ref={formRef} className={classes.form}>
        <div className={classes.input_container}>
          <label htmlFor="new-budget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBduget"
            placeholder="e.g., Firecrackers"
            ref={focusRef}
            required
          />
        </div>
        <div className={classes.input_container}>
          <label htmlFor="new-budget">Budget Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="e.g., $225"
            inputMode="decimal"
            step="0.01"
            required
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating budget....</span>
          ) : (
            <>
              <FontAwesomeIcon icon={faDollar} className={classes.dollar} />
              <span>Create Budge'</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </section>
  );
};

export default AddBudget;
