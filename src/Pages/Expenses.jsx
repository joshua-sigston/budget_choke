import React from 'react';
// router
import { useLoaderData, useNavigate } from 'react-router-dom';
// helpers
import { deleteItem, fetchData } from '../utils/storage';
// components
import { ExpensesTable } from '../components';
// toast
import { toast } from 'react-toastify';
// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export async function expensesLoader() {
  const expenses = fetchData('expenses') ?? [];
  return { expenses };
}

export async function expensesAction({ request }) {
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
}

const Expenses = () => {
  const navigate = useNavigate();

  const { expenses } = useLoaderData();

  return (
    <section className="expenses_page grid">
      <div className=" top_row flex_row">
        <h5>Recent Expenses</h5>
        <small>{expenses.length} total</small>
      </div>
      <div className="link_container">
        <button onClick={() => navigate(-1)} className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Go Back</span>
        </button>
      </div>
      {expenses && expenses.length > 0 ? (
        <ExpensesTable expenses={expenses} />
      ) : (
        <h3>You have no expenses.</h3>
      )}
    </section>
  );
};

export default Expenses;
