// router
import { redirect } from 'react-router-dom';
// utils function
import { deleteUser } from '../utils/storage';
// toastify
import { toast } from 'react-toastify';

export async function deleteAction() {
  //delete user
  deleteUser({ key: 'username' });
  // delete budgets
  deleteUser({ key: 'budgets' });
  // delte expenses
  deleteUser({ key: 'expenses' });
  // toastify
  toast.success('You have deleted your account!');
  //return redirect
  return redirect('/');
}
