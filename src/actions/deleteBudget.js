import { toast } from 'react-toastify';
import { deleteItem, getAllMatching } from '../utils/storage';
import { redirect } from 'react-router-dom';

export function deleteBudget({ params }) {
  try {
    deleteItem({
      key: 'budgets',
      id: params.id,
    });

    const associatedExpense = getAllMatching({
      category: 'expenses',
      key: 'budgetID',
      value: params.id,
    });

    associatedExpense.forEach((expense) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      });
    });

    toast.success('Budget deleted successfully');
  } catch (error) {
    throw new Error('There was a problem deleting your budget.');
  }

  return redirect('/');
}
