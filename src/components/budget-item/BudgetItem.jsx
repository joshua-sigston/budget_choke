import React from 'react';
// styles
import classes from './item.module.css';
// helpers
import { formatCurrency, percentage, spentAmount } from '../../utils/storage';
// router
import { Form, Link } from 'react-router-dom';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrash } from '@fortawesome/free-solid-svg-icons';

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = spentAmount(id);

  return (
    <div className={classes.budget_card} style={{ '--accent': color }}>
      <div className="top_row">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} allowed</p>
      </div>
      <progress max={amount} value={spent}>
        {percentage(spent / amount)}
      </progress>
      <div className={classes.progress_text}>
        <p>{formatCurrency(spent)}spent</p>
        <p>{formatCurrency(amount - spent)}remaining</p>
      </div>
      {showDelete ? (
        <Form
          method="POST"
          action="delete"
          onSubmit={(e) => {
            if (!confirm('Delete data?')) {
              e.preventDefault();
            }
          }}
        >
          <button className={classes.delete_btn}>
            <FontAwesomeIcon icon={faTrash} className={classes.trash_can} />
            <span>Delete Budget</span>
          </button>
        </Form>
      ) : (
        <Link to={`/budget/${id}`}>
          <span>View Details</span>
          {/* icon */}
        </Link>
      )}
    </div>
  );
};

export default BudgetItem;
